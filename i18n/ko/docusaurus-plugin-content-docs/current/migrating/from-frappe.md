---
title: "Frappe Gantt에서 DHTMLX Gantt로 마이그레이션"
sidebar_label: "Frappe에서"
---

:::note
완전한 데모 소스 코드는 GitHub에서 확인할 수 있습니다: [https://github.com/DHTMLX/gantt-migrating-from-frappe](https://github.com/DHTMLX/gantt-migrating-from-frappe).
:::

# Frappe Gantt에서 DHTMLX Gantt로 마이그레이션

## 소개

이 가이드는 기존 애플리케이션을 [Frappe Gantt](https://frappe.io/gantt)에서 [DHTMLX Gantt](https://dhtmlx.com/docs/products/dhtmlxGantt/)로 마이그레이션하는 과정을 안내합니다. 데이터베이스 스키마 변경, 서버 측 API 수정, 클라이언트 측 코드 업데이트를 포함한 필요한 모든 단계를 다룹니다.

## 전제 조건

마이그레이션을 시작하기 전에 아래를 확인하세요:

- Frappe Gantt를 사용하는 기존의 작동 중인 애플리케이션
- Node.js (>= 20.0.0) 설치
- Frappe Gantt 데이터 구조를 가진 MySQL 데이터베이스
- Express.js 및 JavaScript에 대한 기본 지식

## 1단계: 데이터베이스 마이그레이션

### 현재 스키마 이해하기

Frappe Gantt 데모 설정을 따라왔다면 하나의 테이블이 있어야 합니다: `frappe_tasks`.

`frappe_tasks` 테이블 구조:

![Frappe tasks table](/img/migrating/frappe/frappe-tasks-table.png)

### DHTMLX 테이블 생성

DHTMLX Gantt는 작업용 테이블과 의존성 링크용 별도 테이블 두 개를 사용합니다. 동일한 데이터베이스 내에 두 테이블을 생성합니다:

```sql
USE frappe_dhtmlx;

CREATE TABLE IF NOT EXISTS gantt_tasks (
    id          VARCHAR(36)     NOT NULL DEFAULT (UUID()),
    text        VARCHAR(255)    NOT NULL,
    start_date  DATETIME        NOT NULL,
    end_date    DATETIME        NOT NULL,
    duration    INT             NOT NULL,
    progress    FLOAT           NOT NULL DEFAULT 0,
    parent      VARCHAR(36)     NOT NULL DEFAULT '0',
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS gantt_links (
    id          VARCHAR(36)     NOT NULL DEFAULT (UUID()),
    source      VARCHAR(36)     NOT NULL,
    target      VARCHAR(36)     NOT NULL,
    type        VARCHAR(1)      NOT NULL,
    PRIMARY KEY (id)
);
```

### 기존 데이터 마이그레이션

이제 기존 Frappe 데이터를 새 DHTMLX 테이블로 마이그레이션합니다.

**작업(Tasks) 마이그레이션:**

```sql
INSERT INTO gantt_tasks (id, text, start_date, end_date, duration, progress, parent)
SELECT
    id,
    name,                           -- name → text
    start,                          -- start → start_date
    end,                            -- end → end_date
    GREATEST(DATEDIFF(end, start), 1),  -- 기간(일 단위, 최소 1일)
    progress / 100.0,               -- 백분율(0-100)을 소수점(0-1)으로 변환
    '0'                             -- Frappe에는 계층 구조가 없으므로 모든 작업은 루트

FROM frappe_tasks;
```

결과를 확인할 수 있습니다:

```sql
SELECT * FROM gantt_tasks;
```

**링크(의존성) 마이그레이션**

Frappe Gantt의 데이터 구조에서 의존성은 `frappe_tasks` 테이블의 `dependencies` 열에 문자열로 저장됩니다.

DHTMLX Gantt에서 작업 및 링크는 **별도 테이블**에 저장됩니다. 각 링크는 다음과 같은 열을 가진 한 행입니다:

- `id` - 링크 ID
- `source` - 의존성이 시작되는 작업의 ID
- `target` - 의존성이 끝나는 작업의 ID
- `type` - 의존성 유형: `"0"`(FS), `"1"`(SS), `"2"`(FF), `"3"`(SF)

모든 Frappe 의존성이 FS이므로 마이그레이션 시 항상 `type = "0"`으로 설정합니다.

다음 코드를 파일 `migrate-frappe-to-dhtmlx.js`로 생성하고 아래 코드를 붙여넣으세요:

```js
import mysql from 'mysql2/promise';
import 'dotenv/config';

const dbConfig = {
  host: process.env.HOST,
  user: process.env.MYSQL_USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
};

async function migrateFrappeToDHtmlX() {
  let connection;

  try {
    connection = await mysql.createConnection(dbConfig);

    // 의존성이 있는 모든 작업 조회
    const [tasks] = await connection.execute(
      'SELECT id, dependencies FROM frappe_tasks WHERE dependencies IS NOT NULL AND dependencies != ""',
    );

    console.log(`Found ${tasks.length} tasks with dependencies`);

    if (tasks.length === 0) {
      console.log('No dependencies to migrate.');
      return;
    }

    const links = [];

    for (const task of tasks) {
      const targetId = task.id;
      const dependencies = task.dependencies;

      // 쉼표로 구분된 의존성 ID 분리
      const depIds = dependencies
        .split(',')
        .map((dep) => dep.trim())
        .filter((dep) => dep);

      console.log(`\nTask ${targetId} depends on: ${depIds.join(', ')}`);

      // 각 의존성은 FS 유형의 링크(type "0")가 됨
      for (const sourceId of depIds) {
        links.push({
          source: sourceId,
          target: targetId,
          type: '0',
        });
      }
    }

    if (links.length > 0) {
      console.log(`\nInserting ${links.length} links into gantt_links...`);

      await connection.beginTransaction();

      try {
        await connection.execute('DELETE FROM gantt_links');
        console.log('Cleared existing links from gantt_links table');

        for (const link of links) {
          await connection.execute('INSERT INTO gantt_links (source, target, type) VALUES (?, ?, ?)', [
            link.source,
            link.target,
            link.type,
          ]);
        }

        await connection.commit();
        console.log('Links inserted successfully!');
      } catch (error) {
        await connection.rollback();
        throw error;
      }
    }

    const [insertedLinks] = await connection.execute('SELECT * FROM gantt_links');
    console.log(`Total links in gantt_links: ${insertedLinks.length}`);

    console.log('\nMigration completed successfully!');
  } catch (error) {
    console.error('Migration failed:', error.message);
    process.exit(1);
  } finally {
    if (connection) {
      await connection.end();
      console.log('\nDatabase connection closed.');
    }
  }
}

migrateFrappeToDHtmlX();
```

그런 다음 이 파일을 `package.json`에 스크립트로 추가합니다:

```json
{
  "scripts": {
    "migrate": "node migrate-frappe-to-dhtmlx.js"
  }
}
```

마이그레이션을 실행합니다:

```bash
npm run migrate
```

의존성이 올바르게 마이그레이션되었는지 확인하려면:

```sql
SELECT * FROM gantt_links;
```

의존성마다 하나의 행이 생성되었고, 올바른 `source`와 `target` ID를 확인할 수 있습니다.

### Frappe Task 필드를 DHTMLX Gantt로 매핑하기

| Frappe 필드      | DHTMLX 필드    | 비고                                                                                                                             |
| ----------------- | --------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| `id`              | `id`            | Task ID                                                                                                                           |
| `name`            | `text`          | Task 이름                                                                                                                         |
| `start`           | `start_date`    | 작업의 시작 날짜                                                                                                                   |
| `end`             | `end_date`      | 작업의 종료 날짜                                                                                                                   |
| _(저장되지 않음)_ | `duration`      | 작업 기간. DHTMLX Gantt에서 지정되지 않으면 `start_date`와 `end_date` 속성으로부터 자동 계산합니다 |
| `progress`        | `progress`      | Frappe: 정수 0–100; DHTMLX: 소수점 0.0–1.0                                                                                      |
| _(지원되지 않음)_ | `parent`        | Frappe에는 계층 구조가 없으며, DHTMLX Gantt에서 부모 작업을 지정할 수 있습니다                                                               |
| `dependencies`    | _(링크 테이블)_ | Frappe는 문자열로 저장합니다; DHTMLX는 별도의 `gantt_links` 테이블을 사용합니다                                                              |

---

## 2단계: 백엔드 마이그레이션 (server.js)

### Frappe 전용 엔드포인트 및 헬퍼 제거

Frappe 서버에서 데이터 로딩 및 작업 CRUD는 `/data/tasks`를 통해 이루어집니다. 아래 모든 항목을 삭제하거나 대체합니다:

- `function formatTaskForClient(dbTask)` - Frappe 전용 응답 포매터
- `app.get('/data/tasks', ...)` - 작업 객체의 plain 배열 반환
- `app.post('/data/tasks', ...)` - 작업 생성; 응답은 전체 작업 객체
- `app.put('/data/tasks/:id', ...)` - 작업 업데이트; 응답은 업데이트된 작업 객체
- `app.delete('/data/tasks/:id', ...)` - 작업 삭제; HTTP 204를 응답으로 반환

### DHTMLX Gantt 패키지 설치

다음 설치 가이드를 따라 DHTMLX Gantt를 설치합니다.

이 튜토리얼에서는 DHTMLX Gantt의 체험판 버전을 사용합니다:

```bash
npm install @dhx/trial-gantt
```

### 데이터 로딩 엔드포인트 추가

DHTMLX는 데이터 로딩 시 작업과 링크를 단일 GET /data 응답으로 `{ tasks: [], links: [] }` 형태로 반환할 것을 기대합니다.

Frappe의 `GET /data/tasks` 엔드포인트를 아래와 같이 대체합니다:

```js
import dateFormat from 'date-format-lite';

// GET /data - Load tasks and links
app.get('/data', async (req, res) => {
  try {
    const [tasks] = await pool.query('SELECT * FROM gantt_tasks ORDER BY start_date');
    const [links] = await pool.query('SELECT * FROM gantt_links');

    tasks.forEach((task) => {
      if (task.start_date) {
        task.start_date = task.start_date.format('YYYY-MM-DD hh:mm:ss');
      }
      if (task.end_date) {
        task.end_date = task.end_date.format('YYYY-MM-DD hh:mm:ss');
      }
    });

    res.json({ tasks, links });
  } catch (error) {
    console.error('Error loading data:', error);
    res.status(500).json({ error: 'Failed to load data' });
  }
});
```

### Task와 Link에 대한 CRUD 엔드포인트 추가

DHTMLX Gantt의 `DataProcessor`는 서버와 데이터를 동기화하기 위해 RESTful 엔드포인트를 사용합니다. 각 작업(생성, 수정, 삭제)은 별도의 HTTP 요청으로 전송됩니다. 서버 사이드 통합에 대해 자세히 알아보기: [Server-side integration](guides/server-side.md).

Frappe 작업 엔드포인트(`POST /data/tasks`, `PUT /data/tasks/:id`, `DELETE /data/tasks/:id`)를 아래로 교체합니다:

```js
import { randomUUID } from 'crypto';

// POST /data/task — Create a new task
app.post('/data/task', async (req, res) => {
  try {
    const task = getTask(req.body);
    const { text, start_date, end_date, duration, progress, parent } = task;
    const id = randomUUID();

    await pool.query(
      'INSERT INTO gantt_tasks (id, text, start_date, end_date, duration, progress, parent) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [id, text, start_date, end_date, duration, progress, parent],
    );
    sendResponse(res, 'inserted', id);
  } catch (error) {
    sendResponse(res, 'error', null, error);
  }
});

// PUT /data/task/:id — Update an existing task
app.put('/data/task/:id', async (req, res) => {
  try {
    const taskId = req.params.id;
    const task = getTask(req.body);
    const { text, start_date, end_date, duration, progress, parent } = task;

    await pool.query(
      'UPDATE gantt_tasks SET text = ?, start_date = ?, end_date = ?, duration = ?, progress = ?, parent = ? WHERE id = ?',
      [text, start_date, end_date, duration, progress, parent, taskId],
    );
    sendResponse(res, 'updated');
  } catch (error) {
    sendResponse(res, 'error', null, error);
  }
});

// DELETE /data/task/:id — Delete a task
app.delete('/data/task/:id', async (req, res) => {
  try {
    const taskId = req.params.id;
    await pool.query('DELETE FROM gantt_tasks WHERE id = ?', [taskId]);
    sendResponse(res, 'deleted');
  } catch (error) {
    sendResponse(res, 'error', null, error);
  }
});
```

의존성 작업에 대한 핸들러 추가(링크):

```js
// POST /data/link — Create a new link
app.post('/data/link', async (req, res) => {
  try {
    const link = getLink(req.body);
    const id = randomUUID();

    await pool.query('INSERT INTO gantt_links (id, source, target, type) VALUES (?, ?, ?, ?)', [
      id,
      link.source,
      link.target,
      link.type,
    ]);
    sendResponse(res, 'inserted', id);
  } catch (error) {
    sendResponse(res, 'error', null, error);
  }
});

// PUT /data/link/:id — Update an existing link
app.put('/data/link/:id', async (req, res) => {
  try {
    const linkId = req.params.id;
    const link = getLink(req.body);

    await pool.query('UPDATE gantt_links SET source = ?, target = ?, type = ? WHERE id = ?', [
      link.source,
      link.target,
      link.type,
      linkId,
    ]);
    sendResponse(res, 'updated');
  } catch (error) {
    sendResponse(res, 'error', null, error);
  }
});

// DELETE /data/link/:id — Delete a link
app.delete('/data/link/:id', async (req, res) => {
  try {
    const linkId = req.params.id;
    await pool.query('DELETE FROM gantt_links WHERE id = ?', [linkId]);
    sendResponse(res, 'deleted');
  } catch (error) {
    sendResponse(res, 'error', null, error);
  }
});
```

### 헬퍼 함수 추가

Frappe의 `formatTaskForClient` 함수를 DHTMLX-호환 헬퍼로 교체합니다:

```js
// Parse task data from request body
function getTask(data) {
  return {
    text: data.text,
    start_date: data.start_date,
    end_date: data.end_date,
    duration: data.duration || 1,
    progress: parseFloat(data.progress) || 0,
    parent: data.parent || 0,
  };
}

// Parse link data from request body
function getLink(data) {
  return {
    source: data.source,
    target: data.target,
    type: data.type,
  };
}

// Send DataProcessor-compatible response
function sendResponse(res, action, tid = null, error = null) {
  if (error) {
    console.error('Error:', error);
    return res.status(500).json({ action: 'error', message: error.message });
  }
  const result = { action };
  if (tid !== null) result.tid = tid;
  res.json(result);
}
```

참고: 응답 형식은 Frappe와 다릅니다. Frappe 엔드포인트는 전체 작업 객체를 반환하거나 삭제 시 HTTP 204를 반환했습니다. DHTMLX의 `DataProcessor`는 `{ action: "inserted", tid: 5 }`, `{ action: "updated" }`, `{ action: "deleted" }`와 같은 `action` 필드를 가진 JSON 객체를 기대합니다. 자세한 내용은 [Request and Responses details](guides/server-side.md#requestresponsedetails)를 참조하세요.

### 데이터 정 sanitization (XSS 보호)

DHTMLX Gantt는 텍스트와 같은 필드를 HTML로 렌더링하고 기본적으로 이를 이스케이프하지 않으므로, 마이그레이션 데이터에 포함된 마크업(또는 이후 사용자가 입력한 내용)이 있는 경우 그대로 렌더링될 수 있어 잠재적인 XSS 벡터가 됩니다. Frappe 및 대부분의 라이브러리도 같은 방식이므로 이를 마이그레이션 단계에서 명시적으로 처리하는 것이 좋습니다.

**백엔드에서 정 sanitization 권장:** 데이터베이스에 도달하기 전에 자유 텍스트 필드를 정리합니다.

```bash
npm install isomorphic-dompurify
```

```js
import DOMPurify from 'isomorphic-dompurify';

function getTask(data) {
  return {
    text: DOMPurify.sanitize(data.text),
    // ...나머지 필드는 변경 없이 유지
  };
}
```

**프론트엔드에서 이스케이프(깊이 방어) 처리:** `src/main.js`에서 템플릿을 재정의하여 작업 텍스트를 이스케이프합니다.

```js
const escapeHTML = (value) =>
  String(value ?? '').replace(/[&<>"']/g, (ch) =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]));

gantt.templates.task_text = (start, end, task) => escapeHTML(task.text);
gantt.templates.tooltip_text = (start, end, task) => escapeHTML(task.text);
// 또한 텍스트 그리드 열도 템플릿으로 이스케이프: template: (task) => escapeHTML(task.text)
```

전체 보안 세부사항 — 콘텐츠 보안 정책(CSP), 라이트박스 정 sanitization, SQL 인젝션 가이드라인 등은 [Application Security](guides/app-security.md) 가이드를 참고하세요.

## 3단계: 프런트엔드 마이그레이션

### DHTMLX Gantt 패키지 설치

이 튜토리얼에서는 DHTMLX Gantt의 체험판을 사용합니다:

```
npm install @dhx/trial-gantt
```

### vite.config.js 업데이트

Frappe 데모에서 Vite 프록시는 `/data/tasks`로 한정되어 있었습니다:

```js
proxy: {
  '/data/tasks': {
    target: 'http://localhost:1337',
    changeOrigin: true,
  },
},
```

이 프록시를 `/data` 전체 요청으로 업데이트합니다(이제 작업 CRUD 및 링크 CRUD를 모두 포함합니다):

```js
proxy: {
  '/data': {
    target: 'http://localhost:1337',
    changeOrigin: true,
  },
},
```

### index.html 업데이트

Frappe 데모에서 `frappe-gantt`는 CDN에서 로드되었습니다. 모달, 체크박스, 컨트롤 버튼 등 복잡한 커스텀 UI도 더 이상 필요하지 않습니다. DHTMLX Gantt가 작업 편집을 위한 내장 라이트박스를 제공하기 때문입니다.

전체 `index.html` 내용을 교체합니다:

제거:

```html
<script src="https://cdn.jsdelivr.net/npm/frappe-gantt/dist/frappe-gantt.umd.js"></script>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/frappe-gantt/dist/frappe-gantt.css" />
```

또한 `<body>` 안의 모든 커스텀 UI 마크업도 제거합니다(다음 포함):

- `#add-task`, `#refresh`, `#delete-task` 버튼이 있는 `.controls` div
- 작업 체크박스가 있는 `.delete-section` div
- `#add-task-modal` 오버레이
- `<div id="gantt">` 컨테이너

다음과 같은 최소 구조로 교체합니다:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="stylesheet" href="/src/style.css" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>DHTMLX Gantt Demo</title>
  </head>
  <body>
    <div id="gantt_here"></div>
    <script type="module" src="/src/main.js"></script>
  </body>
</html>
```

### src/style.css 업데이트

Frappe 데모의 `style.css`에는 컨트롤 패널, 버튼, 모달, 체크박스 등에 대한 커스텀 스타일이 포함되어 있습니다. 모든 커스텀 UI를 제거했으므로 DHTMLX 전용 스타일로 교체합니다:

```css
html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
}

#gantt_here {
  width: 100%;
  height: 100%;
}

.weekend {
  background: var(--dhx-gantt-base-colors-background-alt);
}
```

`.weekend` 클래스는 DHTMLX Gantt 템플릿에서 주말 칼럼을 하이라이트하는 데 사용됩니다(예: `src/main.js` 참고).

### src/main.js 교체

Frappe 관련 코드를 모두 제거하고 `src/main.js`를 아래로 교체합니다:

```js
import '@dhx/trial-gantt/codebase/dhtmlxgantt.css';
import gantt from '@dhx/trial-gantt';

gantt.plugins({
  auto_scheduling: true,
  tooltip: true,
});

gantt.config.auto_scheduling = {
  enabled: true,
};

const hourToStr = gantt.date.date_to_str('%H:%i');
const hourRangeFormat = function (step) {
  return function (date) {
    const intervalEnd = new Date(gantt.date.add(date, step, 'hour') - 1);
    return hourToStr(date) + ' - ' + hourToStr(intervalEnd);
  };
};

const zoomConfig = {
  minColumnWidth: 80,
  maxColumnWidth: 150,
  levels: [
    [
      { unit: 'month', format: '%M %Y', step: 1 },
      {
        unit: 'week',
        step: 1,
        format: function (date) {
          const dateToStr = gantt.date.date_to_str('%d %M');
          const endDate = gantt.date.add(date, 7 - date.getDay(), 'day');
          const weekNum = gantt.date.date_to_str('%W')(date);
          return 'Week #' + weekNum + ', ' + dateToStr(date) + ' - ' + dateToStr(endDate);
        },
      },
    ],
    [
      { unit: 'month', format: '%M %Y', step: 1 },
      { unit: 'day', format: '%d %M', step: 1 },
    ],
    [
      { unit: 'day', format: '%d %M', step: 1 },
      { unit: 'hour', format: hourRangeFormat(12), step: 12 },
    ],
    [
      { unit: 'day', format: '%d %M', step: 1 },
      { unit: 'hour', format: hourRangeFormat(8), step: 8 },
    ],
    [
      { unit: 'day', format: '%d %M', step: 1 },
      { unit: 'hour', format: '%H:%i', step: 1 },
    ],
  ],
  useKey: 'ctrlKey',
  trigger: 'wheel',
  element: function () {
    return gantt.$root.querySelector('.gantt_task');
  },
};

gantt.ext.zoom.init(zoomConfig);

gantt.templates.scale_cell_class = function (date) {
  if (date.getDay() == 0 || date.getDay() == 6) {
    return 'weekend';
  }
};
gantt.templates.timeline_cell_class = function (item, date) {
  if (date.getDay() == 0 || date.getDay() == 6) {
    return 'weekend';
  }
};

gantt.config.date_format = '%Y-%m-%d %H:%i:%s';
gantt.config.scale_height = 50;
gantt.config.open_tree_initially = true;

gantt.init('gantt_here');
gantt.load('/data');

const dp = gantt.createDataProcessor({
  url: '/data',
  mode: 'REST',
});
```

DataProcessor는 자동으로 다음 요청을 보냅니다:

- 작업 생성 시 POST /data/task
- 작업 수정 시 PUT /data/task/:id
- 작업 삭제 시 DELETE /data/task/:id
- 의존성 링크 생성 시 POST /data/link
- 링크 수정 시 PUT /data/link/:id
- 링크 삭제 시 DELETE /data/link/:id

---

## 4단계: 마이그레이션 테스트

### 애플리케이션 실행

개발 모드에서는 두 가지 프로세스를 실행해야 합니다.

- 터미널 1 — 백엔드(Express):

```bash
npm run server
```

API 서버가 `http://localhost:1337` (또는 구성된 포트)에서 시작됩니다.

- 터미널 2 — 프런트엔드(Vite):

```bash
npm run dev
```

Vite 개발 서버가 `http://localhost:5173` 에서 시작됩니다. 브라우저를 열고 `http://localhost:5173` 로 접속하면 Vite가 `/data` 요청을 Express 백엔드로 자동 프록시합니다.

데이터베이스에서 마이그레이션된 데이터를 로드한 DHTMLX Gantt 차트를 보실 수 있습니다.

![DHTMLX Gantt Chart](/img/migrating/frappe/dhtmlx-gantt-chart.png)

## 다음 단계

- 고급 기능을 위한 DHTMLX Gantt 문서를 탐색해 보세요: [DHTMLX Gantt documentation](/)
- 커스터마이즈 옵션을 보려면 API 참조를 확인하세요: [API reference](/api/api-overview/)
- 구현 예제는 DHTMLX Gantt 샘플 [DHTMLX Gantt samples](https://docs.dhtmlx.com/gantt/samples/) 에서도 확인할 수 있습니다
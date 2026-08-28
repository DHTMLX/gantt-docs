---
title: "Миграция с Frappe Gantt на DHTMLX Gantt"
sidebar_label: "Из Frappe"
---

:::note
Полный исходный код демо-доступен на GitHub: [https://github.com/DHTMLX/gantt-migrating-from-frappe](https://github.com/DHTMLX/gantt-migrating-from-frappe).
:::

# Миграция Gantt от Frappe Gantt к DHTMLX Gantt

## Введение

Это руководство проведет васThrough процесс миграции существующего приложения из [Frappe Gantt](https://frappe.io/gantt) в [DHTMLX Gantt](https://dhtmlx.com/docs/products/dhtmlxGantt/). Мы охватим все необходимые шаги, включая изменения схемы базы данных, модификации серверного API и обновления клиентского кода.

## Требования

Перед началом миграции убедитесь, что у вас есть:

- Существующее работающее приложение, использующее Frappe Gantt
- Node.js (>= 20.0.0) установлен
- База данных MySQL со структурой данных Frappe Gantt
- Базовые знания Express.js и JavaScript

## Шаг 1: Миграция базы данных

### Понимание текущей схемы

Если вы следовали демо-установке Frappe Gantt, у вас должна быть одна таблица: `frappe_tasks`.

Структура таблицы `frappe_tasks`:

![Frappe tasks table](/img/migrating/frappe/frappe-tasks-table.png)

### Создание таблиц DHTMLX

DHTMLX Gantt использует две отдельные таблицы: одна для задач и одна для связей-зависимостей. Создайте их в той же базе данных:

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

### Миграция существующих данных

Теперь перенесите существующие данные Frappe в новые таблицы DHTMLX.

**Миграция задач:**

```sql
INSERT INTO gantt_tasks (id, text, start_date, end_date, duration, progress, parent)
SELECT
    id,
    name,                           -- name → text
    start,                          -- start → start_date
    end,                            -- end → end_date
    GREATEST(DATEDIFF(end, start), 1),  -- Duration in days (minimum 1)
    progress / 100.0,               -- Convert percentage (0-100) to decimal (0-1)
    '0'                             -- No hierarchy in Frappe, all tasks are root-level
FROM frappe_tasks;
```

Вы можете проверить результат:

```sql
SELECT * FROM gantt_tasks;
```

**Миграция ссылок (Dependencies)**

В структуре данных Frappe Gantt зависимости хранятся как строки в столбце `dependencies` таблицы `frappe_tasks`.

В DHTMLX Gantt задачи и связи хранятся в отдельныx таблицах. Каждая связь — это строка со следующими полями:

- `id` - идентификатор связи
- `source` - идентификатор задачи, от которой начинается зависимость
- `target` - идентификатор задачи, на которую заканчивается зависимость
- `type` - тип зависимости: `"0"` (FS), `"1"` (SS), `"2"` (FF), `"3"` (SF)

Поскольку все зависимости Frappe — FS, миграция всегда устанавливает `type = "0"`.

Создайте файл `migrate-frappe-to-dhtmlx.js` и вставьте в него следующий код:

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

    // Query all tasks that have dependencies
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

      // Split comma-separated dependency IDs
      const depIds = dependencies
        .split(',')
        .map((dep) => dep.trim())
        .filter((dep) => dep);

      console.log(`\nTask ${targetId} depends on: ${depIds.join(', ')}`);

      // Each dependency becomes a Finish-to-Start link (type "0")
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

Затем добавьте скрипт в ваш файл `package.json`:

```json
{
  "scripts": {
    "migrate": "node migrate-frappe-to-dhtmlx.js"
  }
}
```

Запустите миграцию:

```bash
npm run migrate
```

Вы можете проверить, что связи мигрированы корректно:

```sql
SELECT * FROM gantt_links;
```

Вы должны увидеть по одной строке на каждую зависимость, с корректными source и target.

### Соответствие полей Frappe Task полям DHTMLX Gantt

| Frappe Field      | DHTMLX Field    | Notes                                                                                                                             |
| ----------------- | --------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| `id`              | `id`            | Идентификатор задачи                                                                                                             |
| `name`            | `text`          | Имя задачи                                                                                                                        |
| `start`           | `start_date`    | Дата начала задачи                                                                                                                |
| `end`             | `end_date`      | Дата завершения задачи                                                                                                           |
| _(not stored)_    | `duration`      | Продолжительность задачи. В DHTMLX Gantt, если не указана, она рассчитывается на основе `start_date` и `end_date`              |
| `progress`        | `progress`      | Frappe: целое 0–100; DHTMLX: десятичное 0.0–1.0                                                                                |
| _(not supported)_ | `parent`        | У Frappe нет иерархии. В DHTMLX Gantt можно указать родительскую задачу                                                        |
| `dependencies`    | _(links table)_ | Frappe хранит как строки; DHTMLX использует отдельную таблицу `gantt_links`                                                       |

---

## Шаг 2: Миграция Backend (server.js)

### Удаление Endpoints и помощника, специфичных для Frappe

В Frappe-сервере загрузка данных и CRUD для задач проходят через `/data/tasks`. Удалите или замените все следующие элементы:

- `function formatTaskForClient(dbTask)` - форматирование ответа, специфичное для Frappe
- `app.get('/data/tasks', ...)` - возвращает простой массив объектов задач
- `app.post('/data/tasks', ...)` - создаёт задачу; ответ возвращает полный объект задачи
- `app.put('/data/tasks/:id', ...)` - обновляет задачу; ответ возвращает обновлённый объект задачи
- `app.delete('/data/tasks/:id', ...)` - удаляет задачу; возвращает HTTP 204 без тела

### Установка пакета DHTMLX Gantt

Установите DHTMLX Gantt, следуя [инструкции по установке](guides/installation.md).

Для этого руководства мы будем использовать пробную версию DHTMLX Gantt:

```bash
npm install @dhx/trial-gantt
```

### Добавление Endpoints загрузки данных

DHTMLX ожидает, что данные задач и связей будут возвращаться в одном ответе GET /data в формате `{ tasks: [], links: [] }`.

Замените Frappe-endpoint GET /data/tasks на:

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

### Добавление CRUD-эндпойнтов для задач и связей

DataProcessor DHTMLX Gantt использует REST-эндпойнты для синхронизации данных с сервером. Каждая операция (создание, обновление, удаление) отправляется отдельным HTTP-запросом. Узнайте больше о [Server-side integration](guides/server-side.md).

Замените эндпойнты задач Frappe (`POST /data/tasks`, `PUT /data/tasks/:id`, `DELETE /data/tasks/:id`) на:

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

Добавьте обработчики для операций с связями (зависимостями):

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

### Добавление вспомогательных функций

Замените Frappe-функцию `formatTaskForClient` на совместимые с DHTMLX помощники:

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

**Примечание:** Формат ответа отличается от Frappe. Эндпойнты Frappe возвращали полный объект задачи (или HTTP 204 для удалений). DataProcessor DHTMLX ожидает JSON-объект с полем `action` (например, `{ action: "inserted", tid: 5 }`, `{ action: "updated" }`, `{ action: "deleted" }`). Узнайте больше в разделе [Request and Responses details](guides/server-side.md#requestresponsedetails).

### Очистка данных задачи (защита от XSS)

DHTMLX Gantt рендерит поля, такие как текст задачи, как HTML, и по умолчанию не экранирует их — любой разметке в мигрированных данных (или введённой позже пользователем) будет позволено отобразиться как есть — потенциальная векторная уязвимость XSS. Frappe и большинство других библиотек ведут себя аналогично, поэтому имеет смысл обработать это явно во время миграции.

**Очистка на бэкенде (рекомендуется).** Очистите текстовые поля до попадания в базу данных:

```bash
npm install isomorphic-dompurify
```

```js
import DOMPurify from 'isomorphic-dompurify';

function getTask(data) {
  return {
    text: DOMPurify.sanitize(data.text),
    // ...остальные поля без изменений
  };
}
```

**Экранирование на фронтенде (многоступенчатая защита).** Переопределите шаблоны, которые рендерят текст задачи, в `src/main.js`:

```js
const escapeHTML = (value) =>
  String(value ?? '').replace(/[&<>"']/g, (ch) =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]));

gantt.templates.task_text = (start, end, task) => escapeHTML(task.text);
gantt.templates.tooltip_text = (start, end, task) => escapeHTML(task.text);
// также экранируйте и "text" грид-колонку через шаблон колонки: template: (task) => escapeHTML(task.text)
```

Для полного набора рекомендаций — политика безопасности содержания (Content Security Policy), очистка через lightbox и рекомендации по предотвращению SQL-инъекций — смотрите руководство [Безопасность приложения](guides/app-security.md).

## Шаг 3: Миграция фронтенда

### Установка пакета DHTMLX Gantt

Для этого руководства мы будем использовать пробную версию DHTMLX Gantt:

```
npm install @dhx/trial-gantt
```

### Обновление vite.config.js

В демо Frappe прокси Vite был ограничен для `/data/tasks`:

```js
proxy: {
  '/data/tasks': {
    target: 'http://localhost:1337',
    changeOrigin: true,
  },
},
```

Обновите его, чтобы проксировать все запросы `/data` (которые теперь покрывают задачи, CRUD задач и CRUD связей):

```js
proxy: {
  '/data': {
    target: 'http://localhost:1337',
    changeOrigin: true,
  },
},
```

### Обновление index.html

В демо Frappe `frappe-gantt` загружался с CDN. Также была сложная собственная UI с модальными окнами, флажками и кнопками управления — всё это больше не требуется, потому что DHTMLX Gantt предоставляет встроенный lightbox для редактирования задач.

Замените весь контент `index.html`:

Удалите:

```html
<script src="https://cdn.jsdelivr.net/npm/frappe-gantt/dist/frappe-gantt.umd.js"></script>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/frappe-gantt/dist/frappe-gantt.css" />
```

Также удалите весь кастомный UI-маркап внутри `<body>` включая:

- блок `.controls` с кнопками `#add-task`, `#refresh` и `#delete-task`
- блок `.delete-section` с чекбоксами задач
- оверлей `#add-task-modal`
- контейнер `<div id="gantt">`

Замените на минимальную структуру:

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

### Обновление src/style.css

CSS-файл демо Frappe содержит кастомные стили для панели управления, кнопок, модалов и чекбоксов. Так как вся эта кастомная UI удалена, замените файл стилями, специфичными для DHTMLX:

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

Класс `.weekend` используется шаблонами DHTMLX Gantt для подсветки weekend-колонок (см. `src/main.js`).

### Замена src/main.js

Удалите весь код, связанный с Frappe, и замените `src/main.js` на:

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

DataProcessor автоматически:

- отправляет POST к `/data/task` при создании задачи
- отправляет PUT к `/data/task/:id` при обновлении задачи
- отправляет DELETE к `/data/task/:id` при удалении задачи
- отправляет POST к `/data/link` при создании связи
- отправляет PUT к `/data/link/:id` при обновлении связи
- отправляет DELETE к `/data/link/:id` при удалении связи

---

## Шаг 4: Тестирование миграции

### Запуск приложения

В режиме разработки нужно запустить два процесса.

**Терминал 1 — Backend (Express):**

```bash
npm run server
```

Это запускает API-сервер на `http://localhost:1337` (или указанном вами порту).

**Терминал 2 — Frontend (Vite):**

```bash
npm run dev
```

Это запускает Vite dev-сервер на `http://localhost:5173`. Откройте браузер и перейдите по адресу `http://localhost:5173`. Vite автоматически проксирует `/data`-запросы к бекенду Express.

Вы должны увидеть диаграмму DHTMLX Gantt с мигрированными данными, загруженными из базы данных.

![DHTMLX Gantt Chart](/img/migrating/frappe/dhtmlx-gantt-chart.png)

## Дальнейшие шаги

- Изучайте [документацию DHTMLX Gantt](/) для продвинутых возможностей
- Ознакомьтесь с [API-reference](/api/api-overview/) для вариантов настройки
- Посмотрите [образцы DHTMLX Gantt](https://docs.dhtmlx.com/gantt/samples/) для примеров реализации
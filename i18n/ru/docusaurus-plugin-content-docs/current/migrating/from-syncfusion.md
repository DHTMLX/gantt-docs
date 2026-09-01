---
title: "Миграция с Syncfusion Gantt на DHTMLX Gantt"
sidebar_label: "От Syncfusion"
---

:::note
Полный исходный код демо доступен на GitHub: [https://github.com/DHTMLX/gantt-migrating-from-syncfusion](https://github.com/DHTMLX/gantt-migrating-from-syncfusion).
:::

# Миграция Syncfusion Gantt на DHTMLX Gantt

## Введение

Этот гид проведет вас через процесс миграции существующего приложения с [Syncfusion Gantt](https://www.syncfusion.com/javascript-ui-controls/js-gantt-chart) на [DHTMLX Gantt](https://dhtmlx.com/docs/products/dhtmlxGantt/). Мы рассмотрим все необходимые шаги, включая изменения в схеме базы данных, модификации серверных API и обновления клиентского кода.

## Требования

Прежде чем начать миграцию, убедитесь, что у вас есть:

- Существующее работающее приложение, использующее Syncfusion Gantt
- Node.js (>= 20.0.0) установлен
- База данных MySQL со структурой данных Syncfusion
- Базовые знания Express.js и JavaScript

## Шаг 1: Миграция базы данных

### Понимание текущей схемы

Если вы следовали настройке демо Syncfusion, у вас должна быть одна таблица: `syncfusion_tasks`.

Структура таблицы `syncfusion_tasks`:

![Таблица задач Syncfusion](/img/migrating/syncfusion/syncfusion-tasks-table.png)
![Таблица задач Syncfusion](/img/migrating/syncfusion/syncfusion-tasks-table2.png)

### Создание таблиц DHTMLX

Создайте две новые таблицы, совместимые с Gantt:

```sql
CREATE TABLE IF NOT EXISTS `gantt_tasks` (
    `id`         INT(11)        NOT NULL AUTO_INCREMENT,
    `text`       VARCHAR(255)   NOT NULL,
    `start_date` DATETIME       NOT NULL,
    `end_date`   DATETIME       NOT NULL,
    `duration`   INT(11)        NOT NULL,
    `progress`   FLOAT          NOT NULL DEFAULT 0,
    `parent`     INT(11)        NOT NULL DEFAULT 0,
    `notes`      TEXT           NULL,
    `open`       BOOLEAN        NOT NULL DEFAULT TRUE,
    PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS `gantt_links` (
    `id`         INT(11)        NOT NULL AUTO_INCREMENT,
    `source`     INT(11)        NOT NULL,
    `target`     INT(11)        NOT NULL,
    `type`       VARCHAR(1)     NOT NULL,
    `lag`        INT(11)        DEFAULT 0,
    PRIMARY KEY (`id`)
);
```

### Миграция существующих данных

Теперь мигрируйте существующие данные Syncfusion в новые таблицы DHTMLX.

**Миграция задач:**

```sql
INSERT INTO gantt_tasks (id, text, start_date, end_date, duration, progress, parent, notes, open)
SELECT
    TaskID,
    TaskName,                                           -- TaskName → text
    StartDate,
    COALESCE(EndDate,
        DATE_ADD(StartDate, INTERVAL Duration DAY)),   -- Calculate end_date if missing
    COALESCE(Duration,
        DATEDIFF(EndDate, StartDate)),                 -- Calculate duration if missing
    COALESCE(Progress, 0) / 100,                       -- Convert percentage (0-100) to decimal (0-1)
    COALESCE(ParentId, 0),                             -- ParentId → parent (0 for root tasks)
    info,                                              -- info → notes
    COALESCE(isExpand, TRUE)                           -- isExpand → open
FROM syncfusion_tasks;
```

**Миграция связей (зависимостей)**

В структуре данных Syncfusion зависимости хранятся как строки в столбце `Predecessor`:

- Примеры форматов: `"5"`, `"3,4"`, `"5FS+2"`, `"7SS-1,8FF+3"`, `"2FS-5 days"`

В DHTMLX Gantt задачи и связи хранятся в отдельных таблицах. Каждая связь — это строка с:

- `id` — идентификатор связи
- `source` — идентификатор задачи, от которой начинается зависимость
- `target` — идентификатор задачи, к которой заканчивается зависимость
- `type` — тип зависимости: `"0"` (FS), `"1"` (SS), `"2"` (FF), `"3"` (SF)
- `lag` — необязательный лаг задачи

Мы реализуем Node.js-скрипт миграции для разбора строк Syncfusion и конвертации в структурированный формат DHTMLX.

**Понимание формата предшественителя Syncfusion:**

| Пример        | Значение                             | Эквивалент DHTMLX               |
| -------------- | ----------------------------------- | ------------------------------- |
| `"5"`          | Задача зависит от задачи 5 (по умолчанию FS) | `source: 5, type: "0"`          |
| `"3,4"`        | Зависит от задач 3 и 4              | Две отдельные связи              |
| `"5FS"`        | Зависимость Finish-to-Start          | `source: 5, type: "0"`          |
| `"5FS+2"`      | FS с положительным лагом 2 дня     | `source: 5, type: "0", lag: 2`  |
| `"5FS-3"`      | FS с отрицательным лагом 3 дня      | `source: 5, type: "0", lag: -3` |
| `"2FS-5 days"` | FS с лагом, включая текст "days"    | `source: 2, type: "0", lag: -5` |

Создайте файл `migrate-dependencies.js` и вставьте в него следующий код:

```js
import { pool } from './server.js';

const LINK_TYPE_MAP = {
  FS: '0', // Finish-to-Start
  SS: '1', // Start-to-Start
  FF: '2', // Finish-to-Finish
  SF: '3', // Start-to-Finish
};

/**
 * Parse a single predecessor string like "5FS+2" или "7SS-1 days"
 * @param {string} predecessor - Single predecessor string
 * @returns {object|null} - Parsed link object or null if invalid
 */
function parseSinglePredecessor(predecessor) {
  const clean = predecessor.trim();

  // Regex pattern to match: TaskID [Type] [+/-Lag]
  // Matches: "5", "5FS", "5FS+2", "7SS-1", "3FS+2 days", "8SS-1 days"
  const pattern = /^(\d+)(FS|SS|FF|SF)?([\+\-]\d+)?(?:\s+days?)?$/i;
  const match = clean.match(pattern);

  if (!match) {
    console.warn(`Cannot parse predecessor: "${predecessor}"`);
    return null;
  }

  const source = parseInt(match[1]);
  const typeCode = match[2] ? match[2].toUpperCase() : 'FS';
  const lag = match[3] ? parseInt(match[3]) : 0;

  return {
    source,
    type: LINK_TYPE_MAP[typeCode] || '0',
    lag,
  };
}

/**
 * Parse a full predecessor string that may contain multiple dependencies
 * @param {string} predecessorString - Full predecessor string from database (e.g., "3,4FS+2,5SS-1")
 * @returns {array} - Array of link objects
 */
function parsePredecessors(predecessorString) {
  if (!predecessorString || predecessorString.trim() === '') {
    return [];
  }

  const parts = predecessorString.split(',');
  const links = [];

  for (const part of parts) {
    const link = parseSinglePredecessor(part);
    if (link) {
      links.push(link);
    }
  }

  return links;
}

async function migrateDependencies() {
  const connection = await pool.getConnection();

  try {
    console.log('Starting dependency migration...\n');

    // Step 1: Query all tasks that have predecessors
    const [tasks] = await connection.query(
      'SELECT TaskID, TaskName, Predecessor FROM syncfusion_tasks WHERE Predecessor IS NOT NULL AND Predecessor != ""'
    );

    console.log(`Found ${tasks.length} tasks with predecessors\n`);

    const linksToInsert = [];
    let skippedCount = 0;

    // Step 2: Parse each task's predecessor string
    for (const task of tasks) {
      const targetId = task.TaskID;
      const predecessorString = task.Predecessor;
      const links = parsePredecessors(predecessorString);

      if (links.length === 0) {
        console.log(`No valid links parsed`);
        skippedCount++;
        continue;
      }

      // Step 3: Create link objects for insertion
      for (const link of links) {
        linksToInsert.push({
          source: link.source,
          target: targetId,
          type: link.type,
          lag: link.lag || 0,
        });

        const typeName = Object.keys(LINK_TYPE_MAP).find((key) => LINK_TYPE_MAP[key] === link.type);
        console.log(`Link: ${link.source} -> ${targetId} (${typeName})`);
      }
    }

    console.log(`\n--- Summary ---`);
    console.log(`Tasks processed: ${tasks.length}`);
    console.log(`Links to create: ${linksToInsert.length}`);
    console.log(`Tasks skipped: ${skippedCount}\n`);

    // Step 4: Insert links into database (with transaction)
    if (linksToInsert.length > 0) {
      await connection.beginTransaction();

      try {
        // Clear existing links to avoid duplicates
        await connection.query('DELETE FROM gantt_links');
        console.log('Cleared existing links from gantt_links table');

        // Insert each link
        for (const link of linksToInsert) {
          await connection.query('INSERT INTO gantt_links (source, target, type, `lag`) VALUES (?, ?, ?, ?)', [
            link.source,
            link.target,
            link.type,
            link.lag,
          ]);
        }

        await connection.commit();
        console.log(`Successfully inserted ${linksToInsert.length} links\n`);

        const [insertedLinks] = await connection.query('SELECT * FROM gantt_links ORDER BY id');
        console.log('Inserted links:');
        console.table(insertedLinks);
      } catch (error) {
        await connection.rollback();
        throw error;
      }
    }

    console.log('\nMigration completed successfully!');
  } catch (error) {
    console.error('Error during migration:', error);
    throw error;
  } finally {
    connection.release();
    await pool.end();
  }
}

// Run the migration
migrateDependencies().catch(console.error);
```

Затем добавьте скрипт в ваш файл `dhtmlx-demo/package.json`:

```json
{
  "scripts": {
    "migrate-deps": "node migrate-dependencies.js"
  }
}
```

Запустите миграцию:

```bash
cd dhtmlx-demo
npm run migrate-deps
```

Вы можете проверить корректность миграции, выполнив следующие команды:

```sql
SELECT * FROM gantt_tasks;
SELECT * FROM gantt_links;
```

Вы должны увидеть, что все задачи и связи корректно перенесены с правильными соответствиями полей.

### Сопоставление полей Syncfusion Task с DHTMLX Gantt

| Syncfusion Field | DHTMLX Field    | Примечания                                                                 |
| ----------------- | --------------- | --------------- |
| `TaskID`          | `id`            | Идентификатор задачи                                                               |
| `TaskName`        | `text`          | Название задачи                                                       |
| `StartDate`       | `start_date`    | Дата начала задачи                                                       |
| `EndDate`         | `end_date`      | Дата конца задачи (вычисляется в DHTMLX, если не указана)                  |
| `Duration`        | `duration`      | Продолжительность задачи                                                         |
| `DurationUnit`    | _(config)_      | DHTMLX Gantt использует глобальную единицу длительности, настроенную через `gantt.config.duration_unit`. При миграции рекомендуется нормализовать все длительности к одной единице. Если вы хотите иметь разные единицы длительности для разных задач, например, показывать длительности некоторых задач в часах, а для других — в "днях", можно использовать модуль [formatter](guides/working-time.md#taskdurationindecimalformat).                     |
| `Progress`        | `progress`      | Syncfusion: 0-100%, DHTMLX: 0-1 (десятичное число)                             |
| `ParentId`        | `parent`        | Идентификатор родительской задачи (0 для корневых задач)                                     |
| `Predecessor`     | _(links table)_ | Syncfusion хранит как строку, DHTMLX использует отдельную таблицу `gantt_links` |
| `info` (notes)    | -                 | Можно добавить как пользовательский столбец. Дополнительная информация: [Как добавить настраиваемый столбец в грид](guides/how-to.md#how-to-add-a-custom-column-in-the-grid)                                            |
| `isExpand`        | `open`            | Расширение/свертывание для родительских задач                                |
| `Indicators`      | `markers`           | DHTMLX использует API `gantt.addMarker()`. Узнайте больше об [добавлении вертикальных маркеров](guides/markers.md)                                   |

## Шаг 2: Миграция бэкенда (server.js)

### Удаление конечных точек Syncfusion

Удалите следующие конечные точки, специфичные для Syncfusion, из вашего `server.js`:

- `app.post('/api/getTasks', ...)` - точка загрузки данных Syncfusion
- `app.post('/api/batchTasks', ...)` - точка пакетной синхронизации Syncfusion

### Установка DHTMLX Gantt и Vite

Удалите зависимость от Syncfusion:

```bash
npm uninstall @syncfusion/ej2
```

Установите DHTMLX Gantt, следуя руководству по установке:

```bash
npm install @dhx/trial-gantt
```

Также установим Vite в качестве инструмента сборки:

```bash
npm install --save-dev vite
```

### Добавление конечной точки загрузки данных

Будем использовать библиотеку `date-format-lite` для форматирования дат из формата MySQL DATETIME в формат, ожидаемый DHTMLX.

Установите библиотеку:

```bash
npm install date-format-lite
```

Добавьте GET-эндпойнт для загрузки данных в формате DHTMLX:

```js
import dateFormat from 'date-format-lite';

// GET /data - Load tasks and links
app.get('/data', async (req, res) => {
  try {
    const [tasks] = await pool.query('SELECT * FROM gantt_tasks ORDER BY id');
    const [links] = await pool.query('SELECT * FROM gantt_links');

    tasks.forEach((task) => {
      if (task.start_date) {
        task.start_date = task.start_date.format('YYYY-MM-DD hh:mm:ss');
      }
      if (task.end_date) {
        task.end_date = task.end_date.format('YYYY-MM-DD hh:mm:ss');
      }
    });

    res.json({
      tasks,
      links,
    });
  } catch (error) {
    console.error('Error loading data:', error);
    res.status(500).json({ error: 'Failed to load data' });
  }
});
```

**Примечание:** Формат ответа отличается от Syncfusion (`{ result: [...], count: number }`). DHTMLX ожидает `{ tasks: [], links: [] }`.

### Добавление CRUD-эндпойнтов для задач и связей

DHTMLX Gantt `DataProcessor` использует RESTful-эндпойнты для синхронизации данных с сервером. Каждая операция (создание, обновление, удаление) отправляется отдельным HTTP-запросом с соответствующим методом.
Узнайте больше о [Server-side integration](guides/server-side.md).

Добавьте обработчики для операций **задач**:

```js
// Create a new task
app.post('/data/task', async (req, res) => {
  try {
    const task = getTask(req.body);

    const [result] = await pool.query(
      `INSERT INTO gantt_tasks (text, start_date, end_date, duration, progress, parent, notes)
               VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [task.text, task.start_date, task.end_date, task.duration, task.progress, task.parent, task.notes]
    );
    sendResponse(res, 'inserted', result.insertId);
  } catch (error) {
    sendResponse(res, 'error', null, error);
  }
});

// Update an existing task
app.put('/data/task/:id', async (req, res) => {
  try {
    const taskId = req.params.id;
    const task = getTask(req.body);
    await pool.query(
      `UPDATE gantt_tasks 
               SET text = ?, start_date = ?, end_date = ?, duration = ?, progress = ?, parent = ?, notes = ?
               WHERE id = ?`,
      [task.text, task.start_date, task.end_date, task.duration, task.progress, task.parent, task.notes, taskId]
    );
    sendResponse(res, 'updated');
  } catch (error) {
    sendResponse(res, 'error', null, error);
  }
});

// Delete a task
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

Добавьте обработчики для операций над связями (зависимостями):

```js
// POST /data/link - Create new link
app.post('/data/link', async (req, res) => {
  try {
    const link = getLink(req.body);
    const [result] = await pool.query('INSERT INTO gantt_links (source, target, type) VALUES (?, ?, ?)', [
      link.source,
      link.target,
      link.type,
    ]);
    sendResponse(res, 'inserted', result.insertId);
  } catch (error) {
    sendResponse(res, 'error', null, error);
  }
});

// PUT /data/link/:id - Update existing link
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

// DELETE /data/link/:id - Delete link
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

Также добавим вспомогательные функции для обработки данных и отправки ответов:

```js
// Helper: Parse task data from request
function getTask(data) {
  return {
    text: data.text,
    start_date: data.start_date,
    end_date: data.end_date,
    duration: data.duration || 1,
    progress: parseFloat(data.progress) || 0,
    parent: data.parent || 0,
    notes: data.notes || null,
  };
}

// Helper: Parse link data from request
function getLink(data) {
  return {
    source: data.source,
    target: data.target,
    type: data.type,
  };
}

// Helper: Send response to DataProcessor
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

### Очистка данных задач (защита от XSS)

DHTMLX Gantt отображает поля, такие как текст задачи, как HTML и по умолчанию не экранирует их — поэтому любые разметки в мигрированных данных (или введенные позже пользователем) отображаются как есть — потенциальный вектор XSS. Syncfusion и большинство других библиотек ведут себя так же, поэтому стоит обрабатывать это явно во время миграции.

**Очистка на сервере (рекомендовано).** Очистите текстовые поля перед попаданием в базу данных:

```bash
npm install isomorphic-dompurify
```

```js
import DOMPurify from 'isomorphic-dompurify';

function getTask(data) {
  return {
    text: DOMPurify.sanitize(data.text),
    notes: data.notes ? DOMPurify.sanitize(data.notes) : null,
    // ...остальные поля без изменений
  };
}
```

**Экранирование на клиенте (модульная защита).** Переопределите шаблоны, которые рендерят текст задачи, в `src/app/app.ts`:

```ts
const escapeHTML = (value: unknown) =>
  String(value ?? '').replace(/[&<>"']/g, (ch) =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch] as string));

gantt.templates.task_text = (start, end, task) => escapeHTML(task.text);
// также экранируйте любой пользовательский столбец грида, который показывает текст задачи: template: (task) => escapeHTML(task.text)
```

Для полного набора рекомендаций — политики безопасности контента, очистка при загрузке изображений и руководство по предотвращению SQL-инъекций — см. руководство [Application Security](guides/app-security.md).

---

## Шаг 3: Миграция фронтенда с Vite

### Настройка конфигурации Vite

Создайте файл `vite.config.js` в корне проекта:

```javascript
import { defineConfig } from 'vite';

export default defineConfig({
  root: './src',
  server: {
    port: 5173,
    proxy: {
      '/data': {
        target: 'http://localhost:1337',
        changeOrigin: true,
      },
    },
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
});
```

Организуйте проект по следующей структуре:

```
dhtmlx-demo/
├── src/                    # Фронтенд-исходники
│   ├── app/
│   │   └── app.ts         # Инициализация Gantt
│   ├── index.html         # Главный HTML-файл
│   ├── resources/
│   └── styles/
├── e2e/                   # End-to-end тесты (опционально)
├── .env.example
├── .gitignore
├── migrate-dependencies.js  # Скрипт миграции зависимостей
├── package.json           # Зависимости проекта
├── server.js              # Express сервер
├── setup.sql              # Скрипт настройки базы данных
├── tsconfig.json          # Конфигурация TypeScript
└── vite.config.js         # Конфигурация Vite
```

### Обновление index.html

Обновите `index.html` следующим образом:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>DHTMLX Gantt Chart Demo</title>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no" />
    <meta name="description" content="DHTMLX Gantt Chart - MySQL Integration Demo" />
    <meta name="author" content="DHTMLX" />

    <style>
      html,
      body {
        margin: 0;
        padding: 0;
        height: 100%;
        width: 100%;
        font-family: Arial, sans-serif;
      }

      .container {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        padding: 20px;
        box-sizing: border-box;
      }

      h1 {
        color: #333;
        margin: 0 0 20px 0;
      }

      #gantt_here {
        flex-grow: 1;
        width: 100%;
      }
    </style>
  </head>

  <body>
    <div class="container">
      <h1>DHTMLX Gantt Chart - MySQL Integration Demo</h1>
      <div id="gantt_here"></div>
    </div>

    <script type="module" src="./app/app.ts"></script>
  </body>
</html>
```

**Примечание:** идентификатор контейнера изменён на `gantt_here`, что является обычной практикой для DHTMLX Gantt.

### Обновление src/app/app.ts

В файле `src/app/app.ts` удалите все импорты и код Syncfusion и замените их инициализацией DHTMLX Gantt:

```ts
import '@dhx/trial-gantt/codebase/dhtmlxgantt.css';
import { Gantt } from '@dhx/trial-gantt';

const gantt = Gantt.getGanttInstance();

gantt.config.date_format = '%Y-%m-%d %H:%i:%s';
gantt.config.scale_height = 50;

gantt.config.scales = [
  { unit: 'month', step: 1, format: '%F %Y' },
  { unit: 'day', step: 1, format: '%d' },
];

gantt.config.lightbox.sections = [
  { name: 'description', height: 38, map_to: 'text', type: 'textarea', focus: true },
  { name: 'time', height: 72, type: 'duration', map_to: 'auto' },
  { name: 'notes', height: 70, map_to: 'notes', type: 'textarea' },
];

gantt.init('gantt_here');
gantt.load('/data');

const dp = gantt.createDataProcessor({
  url: '/data', // Base URL for REST endpoints
  mode: 'REST', // Use RESTful mode
});
```

DataProcessor автоматически:

- будет отправлять POST-запросы на `/data/task` при создании задач
- будет отправлять PUT-запросы на `/data/task/:id` при обновлении задач
- будет отправлять DELETE-запросы на `/data/task/:id` при удалении задач
- будет обрабатывать связи аналогично через конечные точки `/data/link`

### Обновление скриптов package.json

Обновите скрипты вашего `package.json` для использования Vite:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "server": "nodemon server.js",
    "migrate-deps": "node migrate-dependencies.js"
  }
}
```

---

## Шаг 4: Тестирование миграции

### Запуск приложения

Для режима разработки требуется запустить два процесса:

#### Терминал 1 — Backend (Express):

```bash
npm run server
```

Это запускает API-сервер по адресу `http://localhost:1337` (или указанный вами порт)

#### Терминал 2 — Frontend (Vite):

```bash
npm run dev
```

Это запускает Vite dev-сервер по адресу `http://localhost:5173`. Откройте браузер и перейдите по адресу `http://localhost:5173`. Vite будет проксировать API-запросы к Express-бэкенду автоматически.

Вы должны увидеть диаграмму Gantt DHTMLX с данными, загруженными из базы данных:

![Gantt with data loaded](/img/migrating/syncfusion/dhtmlx-gantt-data-loaded.png)

## Дальнейшие шаги

- Ознакомьтесь с документацией по DHTMLX Gantt для расширенных возможностей: [DHTMLX Gantt documentation](/) 
- Просмотрите [API reference](/api/api-overview/) для вариантов кастомизации
- Посмотрите примеры [DHTMLX Gantt samples](https://docs.dhtmlx.com/gantt/demos/) для примеров реализации
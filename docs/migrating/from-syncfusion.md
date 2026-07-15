---
title: "Migrating from Syncfusion to DHTMLX Gantt"
sidebar_label: "From Syncfusion"
---

:::note
The complete demo source code is available on GitHub: [https://github.com/DHTMLX/gantt-migrating-from-syncfusion](https://github.com/DHTMLX/gantt-migrating-from-syncfusion).
:::

# Migrating from Syncfusion Gantt to DHTMLX Gantt

## Introduction

This guide will walk you through the process of migrating an existing application from [Syncfusion Gantt](https://www.syncfusion.com/javascript-ui-controls/js-gantt-chart) to [DHTMLX Gantt](https://dhtmlx.com/docs/products/dhtmlxGantt/). We'll cover all necessary steps including database schema changes, server-side API modifications, and client-side code updates.

## Prerequisites

Before starting the migration, ensure you have:

- An existing working application using Syncfusion Gantt
- Node.js (>= 20.0.0) installed
- MySQL database with Syncfusion data structure
- Basic knowledge of Express.js and JavaScript

## Step 1: Database Migration

### Understanding Current Schema

If you followed the Syncfusion demo setup, you should have one table: `syncfusion_tasks`.

The `syncfusion_tasks` table structure:

![Syncfusion tasks table](/img/migrating/syncfusion/syncfusion-tasks-table.png)
![Syncfusion tasks table](/img/migrating/syncfusion/syncfusion-tasks-table2.png)

### Create DHTMLX Tables

Create two new tables compatible with DHTMLX Gantt:

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

### Migrate Existing Data

Now migrate your existing Syncfusion data to the new DHTMLX tables.

**Migrate tasks:**

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

**Migrate links (dependencies)**

In Syncfusion Gantt's data structure, dependencies are stored as strings in the `Predecessor` column:

- Format examples: `"5"`, `"3,4"`, `"5FS+2"`, `"7SS-1,8FF+3"`, `"2FS-5 days"`

In DHTMLX Gantt, tasks and links are stored in **separate tables**. Each link is a row with:

- `id` - the link id
- `source` - the id of a task that the dependency will start from
- `target` - the id of a task that the dependency will end with.
- `type` - the dependency type: `"0"` (FS), `"1"` (SS), `"2"` (FF), `"3"` (SF)
- `lag` - optional task's lag

We'll implement a Node.js migration script to parse Syncfusion's string format and convert it to DHTMLX's structured format.

**Understanding Syncfusion Predecessor Format:**

| Example        | Meaning                             | DHTMLX Equivalent               |
| -------------- | ----------------------------------- | ------------------------------- |
| `"5"`          | Task depends on task 5 (default FS) | `source: 5, type: "0"`          |
| `"3,4"`        | Depends on tasks 3 AND 4            | Two separate links              |
| `"5FS"`        | Finish-to-Start dependency          | `source: 5, type: "0"`          |
| `"5FS+2"`      | FS with 2 days positive lag         | `source: 5, type: "0", lag: 2`  |
| `"5FS-3"`      | FS with 3 days negative lag         | `source: 5, type: "0", lag: -3` |
| `"2FS-5 days"` | FS with lag including "days" text   | `source: 2, type: "0", lag: -5` |

Create a `migrate-dependencies.js` file and paste the following code into it:

```js
import { pool } from './server.js';

const LINK_TYPE_MAP = {
  FS: '0', // Finish-to-Start
  SS: '1', // Start-to-Start
  FF: '2', // Finish-to-Finish
  SF: '3', // Start-to-Finish
};

/**
 * Parse a single predecessor string like "5FS+2" or "7SS-1 days"
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

Then add a script to your `dhtmlx-demo/package.json`:

```json
{
  "scripts": {
    "migrate-deps": "node migrate-dependencies.js"
  }
}
```

Run the migration:

```bash
cd dhtmlx-demo
npm run migrate-deps
```

You can verify that the data was migrated correctly by running the following commands:

```sql
SELECT * FROM gantt_tasks;
SELECT * FROM gantt_links;
```

You should see all your tasks and links properly transferred with the correct field mappings.

### Mapping Syncfusion Task Fields to DHTMLX Gantt

| Syncfusion Field | DHTMLX Field    | Notes                                                                 |
| ---------------- | --------------- | --------------- | 
| `TaskID`         | `id`            | Task id                                                               |
| `TaskName`       | `text`          | Task name                                                       |
| `StartDate`      | `start_date`    | Task start date                                                       |
| `EndDate`        | `end_date`      | Task end date (calculated in DHTMLX if not provided)                  |
| `Duration`       | `duration`      | Task duration                                                         |
| `DurationUnit`   | _(config)_      | DHTMLX Gantt uses a global duration unit configured via `gantt.config.duration_unit`. During migration, it's recommended to normalize all durations to a single unit. If you want to have different duration units for different tasks, i.e. to show durations of some tasks in hours and some tasks in "days", you can use the [formatter module](guides/working-time.md#taskdurationindecimalformat).                     |
| `Progress`       | `progress`      | Syncfusion: 0-100%, DHTMLX: 0-1 (decimal)                             |
| `ParentId`       | `parent`        | Parent task ID (0 for root tasks)                                     |
| `Predecessor`    | _(links table)_ | Syncfusion stores as string, DHTMLX uses separate `gantt_links` table |
| `info` (notes)   | -         | Can be added as a custom column. Check this article for more information: [How to add a custom column in the grid](guides/how-to.md/#how-to-add-a-custom-column-in-the-grid)                                            |
| `isExpand`       | `open`          | Expand/collapse state for parent tasks                                |
| `Indicators`     | `markers`       | DHTMLX uses `gantt.addMarker()` API. Learn more about [adding vertical markers](guides/markers.md)                                   |

## Step 2: Backend Migration (server.js)

### Remove Syncfusion Endpoints

Delete the following Syncfusion-specific endpoints from your `server.js`:

- `app.post('/api/getTasks', ...)` - Syncfusion data loading endpoint
- `app.post('/api/batchTasks', ...)` - Syncfusion batch sync endpoint

### Install DHTMLX Gantt Package and Vite

Remove Syncfusion dependency:

```bash
npm uninstall @syncfusion/ej2
```

Install DHTMLX Gantt following the [installation guide](guides/installation.md).

For this tutorial, we will use the trial version of DHTMLX Gantt:

```bash
npm install @dhx/trial-gantt
```

Let's also install Vite as a build tool:

```bash
npm install --save-dev vite
```

### Add Data Loading Endpoint

We'll use the `date-format-lite` library to format dates from MySQL DATETIME format to the format expected by DHTMLX.

Install the library:

```bash
npm install date-format-lite
```

Add the GET endpoint to load data in DHTMLX format:

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

**Note:** The response format is different from Syncfusion (`{ result: [...], count: number }`). DHTMLX expects `{ tasks: [], links: [] }`.

### Add CRUD Endpoints for Tasks and Links

DHTMLX Gantt's `DataProcessor` uses RESTful endpoints to synchronize data with the server. Each operation (create, update, delete) is sent as a separate HTTP request with the appropriate method.
Learn more about [Server-side integration](guides/server-side.md).

Add handlers for **task operations**:

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

Add handlers for link (dependency) operations:

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

### Add Helper Functions

Also, let's add utility functions to process data and send responses:

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

---

## Step 3: Frontend Migration with Vite

### Set Up Vite Configuration

Create a `vite.config.js` file in the root of your project:

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

Organize your project with this structure:

```
dhtmlx-demo/
├── src/                    # Frontend source code
│   ├── app/
│   │   └── app.ts         # Main Gantt initialization
│   ├── index.html         # Main HTML file
│   ├── resources/
│   └── styles/
├── e2e/                   # End-to-end tests (optional)
├── .env.example
├── .gitignore
├── migrate-dependencies.js  # Dependency migration script
├── package.json           # Project dependencies
├── server.js              # Express server
├── setup.sql              # Database setup script
├── tsconfig.json          # TypeScript configuration
└── vite.config.js         # Vite configuration
```

### Update index.html

Update `index.html` with the following code:

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

**Note:** The container ID changed to `gantt_here`, which is DHTMLX Gantt's conventional container ID.

### Update src/app/app.ts

In the `src/app/app.ts` file, remove all Syncfusion-related imports and code.

Replace with DHTMLX Gantt initialization:

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

The DataProcessor will automatically:

- Send POST requests to `/data/task` when creating tasks
- Send PUT requests to `/data/task/:id` when updating tasks
- Send DELETE requests to `/data/task/:id` when deleting tasks
- Handle links similarly with `/data/link` endpoints

### Update package.json Scripts

Update your `package.json` scripts to use Vite:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "server": "nodemon server.js",

    "serve": "gulp e2e-serve",
    "test": "gulp e2e-test",
    "migrate-deps": "node migrate-dependencies.js",
    "update-webdriver": "gulp e2e-webdriver-update"
  }
}
```

---

## Step 4: Testing the Migration

### Running the Application

For development mode, you need to run two processes:

**Terminal 1 - Backend (Express):**

```bash
npm run server
```

This starts the API server on `http://localhost:1337` (or your configured port)

**Terminal 2 - Frontend (Vite):**

```bash
npm run dev
```

This starts the Vite dev server on `http://localhost:5173`. Open your browser and navigate to `http://localhost:5173`. Vite will proxy API requests to the Express backend automatically.

You should see the DHTMLX Gantt chart with your data loaded from the database:

![Gantt with data loaded](/img/migrating/syncfusion/dhtmlx-gantt-data-loaded.png)

## Next Steps

- Explore [DHTMLX Gantt documentation](https://docs.dhtmlx.com/gantt/) for advanced features
- Review the [API reference](https://docs.dhtmlx.com/gantt/api__refs__gantt.html) for customization options
- Check out [DHTMLX Gantt samples](https://docs.dhtmlx.com/gantt/samples/) for implementation examples

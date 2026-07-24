---
title: "Migrating from DevExpress to DHTMLX Gantt"
sidebar_label: "From DevExpress"
---

:::note
The complete demo source code is available on GitHub: [https://github.com/DHTMLX/gantt-migrating-from-devexpress](https://github.com/DHTMLX/gantt-migrating-from-devexpress).
:::

# Migrating from DevExpress Gantt to DHTMLX Gantt

## Introduction

This guide will walk you through the process of migrating an existing application from [DevExpress Gantt](https://js.devexpress.com/React/Documentation/Guide/UI_Components/Gantt/Overview/) to [DHTMLX Gantt](https://dhtmlx.com/docs/products/dhtmlxGantt/). We'll cover all necessary steps including database schema changes, server-side API modifications, and client-side code updates.

## Prerequisites

Before starting the migration, ensure you have:

- An existing working application using DevExpress Gantt
- Node.js (>= 20.0.0) installed
- MySQL database with DevExpress data structure
- Basic knowledge of Express.js, React, and TypeScript

## Step 1: Database Migration

### Understanding DevExpress Schema

If you followed the DevExpress demo setup, you should
have two tables: `devexpress_tasks` and `devexpress_dependencies`.

The `devexpress_tasks` table structure:

![DevExpress tasks table](/img/migrating/devexpress/devexpress-tasks-table.png)

The `devexpress_dependencies` table structure:

![DevExpress links table](/img/migrating/devexpress/devexpress-links-table.png)

This two-table structure is already similar to DHTMLX's approach, making the migration straightforward.

### Create DHTMLX Tables

Create two new tables compatible with DHTMLX Gantt:

```sql
CREATE TABLE IF NOT EXISTS gantt_tasks (
    id               INT(11)        NOT NULL AUTO_INCREMENT,
    text             VARCHAR(255)   NOT NULL,
    start_date       DATETIME       NOT NULL,
    end_date         DATETIME       NOT NULL,
    progress         FLOAT          NOT NULL DEFAULT 0,
    parent           INT(11)        NOT NULL DEFAULT 0,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS gantt_links (
    id               INT(11)        NOT NULL AUTO_INCREMENT,
    source           INT(11)        NOT NULL,
    target           INT(11)        NOT NULL,
    type             VARCHAR(1)     NOT NULL,
    PRIMARY KEY (id)
);
```

**Note:** DHTMLX Gantt will automatically calculate `duration` based on `start_date` and `end_date`.

### Migrate Existing Data

Now migrate your existing DevExpress data to the new DHTMLX tables.

**Migrate tasks:**

```sql
INSERT INTO gantt_tasks (id, text, start_date, end_date, progress, parent)
SELECT
    id,
    title,
    start,
    end,
    progress / 100,
    COALESCE(parentId, 0)
FROM devexpress_tasks;
```

**Migrate links (dependencies):**

DevExpress already stores dependencies in a structured format in the `devexpress_dependencies` table, which makes migration straightforward:

```sql
INSERT INTO gantt_links (id, source, target, type)
SELECT
    id,
    predecessorId,              -- predecessorId → source
    successorId,                -- successorId → target
    CASE type
        WHEN 0 THEN '0'         -- Finish-to-Start
        WHEN 1 THEN '1'         -- Start-to-Start
        WHEN 2 THEN '2'         -- Finish-to-Finish
        WHEN 3 THEN '3'         -- Start-to-Finish
        ELSE '0'
    END
FROM devexpress_dependencies;
```

You can verify that the data was migrated correctly by running the following commands:

```sql
SELECT * FROM gantt_tasks;
SELECT * FROM gantt_links;
```

You should see all your tasks and links properly transferred with the correct field mappings.

### Mapping DevExpress Task Fields to DHTMLX Gantt

| DevExpress Field | DHTMLX Field | Notes                                                                            |
| ---------------- | ------------ | -------------------------------------------------------------------------------- |
| `id`             | `id`         | Task ID                                                                          |
| `title`          | `text`       | Task name                                                                        |
| `start`          | `start_date` | Task start date and time                                                         |
| `end`            | `end_date`   | Task end date and time                                                           |
| `progress`       | `progress`   | DevExpress: 0-100 (integer), DHTMLX: 0-1 (float). Divide by 100 during migration |
| `parentId`       | `parent`     | Parent task ID. NULL values → 0 for root tasks                                   |

More about task properties: [Task Properties](https://docs.dhtmlx.com/gantt/guides/task-properties/).

### Mapping DevExpress Dependency Fields to DHTMLX Links

| DevExpress Field | DHTMLX Field | Notes                                                                                    |
| ---------------- | ------------ | ---------------------------------------------------------------------------------------- |
| `id`             | `id`         | Link ID                                                                                  |
| `predecessorId`  | `source`     | ID of the task that the dependency starts from                                           |
| `successorId`    | `target`     | ID of the task that the dependency points to                                             |
| `type`           | `type`       | Dependency type. DevExpress uses numbers (0-3), DHTMLX uses strings ("0"-"3") by default |

More about link properties: [Link Properties](https://docs.dhtmlx.com/gantt/guides/link-properties/).

## Step 2: Backend Migration (server.js)

### Remove DevExpress Endpoints

Delete the following DevExpress-specific endpoints from your `server.js`:

- `app.get('/api/tasks', ...)` - DevExpress tasks loading endpoint
- `app.post('/api/tasks', ...)` - Create task endpoint
- `app.put('/api/tasks/:id', ...)` - Update task endpoint
- `app.delete('/api/tasks/:id', ...)` - Delete task endpoint
- `app.get('/api/dependencies', ...)` - DevExpress dependencies loading endpoint
- `app.post('/api/dependencies', ...)` - Create dependency endpoint
- `app.put('/api/dependencies/:id', ...)` - Update dependency endpoint
- `app.delete('/api/dependencies/:id', ...)` - Delete dependency endpoint

Also remove the CustomStore-related response format handling.

### Install DHTMLX Gantt Packages

Remove DevExpress dependencies:

```bash
npm uninstall devextreme devextreme-react
```

Install DHTMLX React Gantt following the [installation guide](https://docs.dhtmlx.com/gantt/guides/installation/).

For this tutorial, we will use the trial version of DHTMLX React Gantt:

```bash
npm install @dhtmlx/trial-react-gantt
```

Install date formatting library for MySQL DATETIME conversion:

```bash
npm install date-format-lite
```

### Add Data Loading Endpoint

Add the GET endpoint to load data in DHTMLX format. Import the `date-format-lite` library at the top of your `server.js`:

```js
import dateFormat from 'date-format-lite';
```

Then add the data loading endpoint:

```js
// GET /load - Load all tasks and links
app.get('/load', async (req, res) => {
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
      data: tasks,
      links: links,
    });
  } catch (error) {
    console.error('Error loading data:', error);
    res.status(500).json({ error: 'Failed to load data' });
  }
});
```

DevExpress returns separate arrays, DHTMLX expects `{ data: [...], links: [...] }`.

### Add CRUD Endpoints for Tasks and Links

DHTMLX React Gantt uses a custom save handler to synchronize data with the server. Each operation (create, update, delete) is sent with the appropriate HTTP method.

Add handlers for task operations:

```js
// POST /save/task - Create a new task
app.post('/save/task', async (req, res) => {
  try {
    const task = getTask(req.body);

    const [result] = await pool.query(
      'INSERT INTO gantt_tasks (text, start_date, end_date, progress, parent) VALUES (?, ?, ?, ?, ?)',
      [task.text, task.start_date, task.end_date, task.progress, task.parent],
    );

    sendResponse(res, 'inserted', result.insertId);
  } catch (error) {
    sendResponse(res, 'error', null, error);
  }
});

// PUT /save/task/:id - Update an existing task
app.put('/save/task/:id', async (req, res) => {
  try {
    const taskId = req.params.id;
    const task = getTask(req.body);

    await pool.query(
      'UPDATE gantt_tasks SET text = ?, start_date = ?, end_date = ?, progress = ?, parent = ? WHERE id = ?',
      [task.text, task.start_date, task.end_date, task.progress, task.parent, taskId],
    );

    sendResponse(res, 'updated');
  } catch (error) {
    sendResponse(res, 'error', null, error);
  }
});

// DELETE /save/task/:id - Delete a task
app.delete('/save/task/:id', async (req, res) => {
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
// POST /save/link - Create new link
app.post('/save/link', async (req, res) => {
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

// PUT /save/link/:id - Update existing link
app.put('/save/link/:id', async (req, res) => {
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

// DELETE /save/link/:id - Delete link
app.delete('/save/link/:id', async (req, res) => {
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

Add utility functions to process data and send responses:

```js
// Helper: Parse task data from request
function getTask(data) {
  return {
    text: data.text,
    start_date: data.start_date,
    end_date: data.end_date,
    progress: parseFloat(data.progress) || 0,
    parent: data.parent || 0,
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

### Sanitize Task Data (XSS Protection)

Gantt charts render free-text fields such as a task's `text`, and any HTML in that text can become an XSS vector. Always sanitize user input on the backend before storing it — clean free-text fields in the `getTask` helper:

```bash
npm install isomorphic-dompurify
```

```js
import DOMPurify from 'isomorphic-dompurify';

function getTask(data) {
  return {
    text: DOMPurify.sanitize(data.text),
    // ...the remaining fields unchanged
  };
}
```

If you add custom cell or tooltip renderers that output raw HTML, escape the values there as well. For the full set of recommendations — Content Security Policy and SQL-injection guidance — see the [Application Security](guides/app-security.md) guide.

---

## Step 3: Frontend Migration

### Remove DevExpress Components and Services

Delete CustomStore service file (`src/services/dataService.ts`) - DHTMLX React Gantt doesn't use CustomStore

Remove DevExpress CSS links from `index.html`

If you added DevExpress CSS links in your `index.html`, remove them:

```html
<!-- Remove these lines -->
<link rel="stylesheet" type="text/css" href="https://cdn3.devexpress.com/jslib/25.2.4/css/dx.fluent.blue.light.css" />
<link rel="stylesheet" type="text/css" href="https://cdn3.devexpress.com/jslib/25.2.4/css/dx-gantt.min.css" />
```

DHTMLX React Gantt includes its own styles, which are imported directly in the component:

```typescript
import '@dhtmlx/trial-react-gantt/dist/react-gantt.css';
```

### Update Vite Configuration

Update your `vite.config.ts` to proxy API requests to the backend server. This is important for development mode:

```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const PORT = process.env.PORT || 1337;

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/load': {
        target: `http://localhost:${PORT}`,
        changeOrigin: true,
      },
      '/save': {
        target: `http://localhost:${PORT}`,
        changeOrigin: true,
      },
    },
  },
});
```

### Update package.json

Make sure your `package.json` has the correct dependencies:

```json
"dependencies": {
  "@dhtmlx/trial-react-gantt": "^9.1.4",
  "body-parser": "^2.2.2",
  "cors": "^2.8.6",
  "date-format-lite": "^17.7.0",
  "dotenv": "^17.2.4",
  "express": "^5.2.1",
  "mysql2": "^3.16.3",
  "nodemon": "^3.1.11",
  "react": "^19.2.0",
  "react-dom": "^19.2.0"
},
"devDependencies": {
  "@eslint/js": "^9.39.1",
  "@types/node": "^24.10.1",
  "@types/react": "^19.2.7",
  "@types/react-dom": "^19.2.3",
  "@vitejs/plugin-react": "^5.1.1",
  "eslint": "^9.39.1",
  "eslint-plugin-react-hooks": "^7.0.1",
  "eslint-plugin-react-refresh": "^0.4.24",
  "globals": "^16.5.0",
  "typescript": "~5.9.3",
  "typescript-eslint": "^8.48.0",
  "vite": "^7.3.1"
}
```

### Update src/App.tsx

Replace your DevExpress Gantt component in `src/App.tsx` with DHTMLX React Gantt:

```typescript
import { useCallback, useMemo, useRef } from 'react';
import ReactGantt, { type GanttConfig, type Link, type ReactGanttRef, type Task } from '@dhtmlx/trial-react-gantt';
import '@dhtmlx/trial-react-gantt/dist/react-gantt.css';
import './App.css';

function App() {
  const ganttRef = useRef<ReactGanttRef>(null);

  const config: GanttConfig = useMemo(
    () => ({
      date_format: '%Y-%m-%d %H:%i:%s',
      scales: [
        { unit: 'month', step: 1, format: '%F %Y' },
        { unit: 'week', step: 1, format: 'Week #%W' },
      ],
      open_tree_initially: true,
    }),
    []
  );

  const save = useCallback(
    async (entity: string, action: 'update' | 'create' | 'delete', item: Task | Link, id: string | number) => {
      switch (action) {
        case 'create':
          return await fetch(`/save/${entity}`, {
            method: 'POST',
            body: JSON.stringify(item),
            headers: {
              'Content-Type': 'application/json',
            },
          })
            .then((response) => response.json())
            .then((result) => ({ id: result.tid }));

        case 'update':
          await fetch(`/save/${entity}/${id}`, {
            method: 'PUT',
            body: JSON.stringify(item),
            headers: {
              'Content-Type': 'application/json',
            },
          });
          break;

        case 'delete':
          await fetch(`/save/${entity}/${id}`, {
            method: 'DELETE',
          });
          break;

        default:
          throw new Error(`Invalid action: ${action}`);
      }
    },
    []
  );

  return (
    <ReactGantt
      ref={ganttRef}
      data={{
        load: '/load',
        save,
      }}
      config={config}
    />
  );
}

export default App;
```

---

### Running the Application

For development mode, you need to run two processes:

Terminal 1 - Backend (Express):

```bash
npm run server
```

This starts the API server on `http://localhost:1337` (or your configured PORT from `.env`)

You should see:

```
Server is running on port 1337
```

Terminal 2 - Frontend (Vite):

```bash
npm run dev
```

This starts the Vite dev server on `http://localhost:5173`. Open your browser and
navigate to `http://localhost:5173`. Vite will proxy API requests to the Express backend
automatically.

You should see the DHTMLX Gantt chart with your data loaded from the database:

![Gantt with data loaded](/img/migrating/devexpress/dhtmlx-gantt-data-loaded.png)

### Explore DHTMLX Gantt Features

- [DHTMLX Gantt documentation](https://docs.dhtmlx.com/gantt/)
- [API reference](https://docs.dhtmlx.com/gantt/api/api-overview/)
- [React Gantt configuration](https://docs.dhtmlx.com/gantt/integrations/react/configuration-props/)
- [React Gantt integration](https://docs.dhtmlx.com/gantt/integrations/react/)

---
title: "Migration von Syncfusion Gantt zu DHTMLX Gantt"
sidebar_label: "Von Syncfusion"
---

:::note
Der vollständige Demo-Quellcode ist auf GitHub verfügbar: [https://github.com/DHTMLX/gantt-migrating-from-syncfusion](https://github.com/DHTMLX/gantt-migrating-from-syncfusion).
:::

# Migration von Syncfusion Gantt zu DHTMLX Gantt

## Einführung

Diese Anleitung führt Sie Schritt für Schritt durch den Prozess der Migration einer bestehenden Anwendung von [Syncfusion Gantt](https://www.syncfusion.com/javascript-ui-controls/js-gantt-chart) zu [DHTMLX Gantt](https://dhtmlx.com/docs/products/dhtmlxGantt/). Wir behandeln alle notwendigen Schritte, einschließlich Änderungen des Datenbankschemas, Modifikationen der serverseitigen API und Aktualisierungen des clientseitigen Codes.

## Voraussetzungen

Bevor Sie mit der Migration beginnen, stellen Sie sicher, dass Sie:
- Eine bereits funktionierende Anwendung mit Syncfusion Gantt
- Node.js (>= 20.0.0) installiert
- Eine MySQL-Datenbank mit Syncfusion-Datenstruktur
- Grundkenntnisse in Express.js und JavaScript

## Schritt 1: Migration der Datenbank

### Verstehen des aktuellen Schemas

Wenn Sie dem Syncfusion-Demo-Setup gefolgt sind, sollten Sie eine Tabelle haben: `syncfusion_tasks`.

Die Struktur der Tabelle `syncfusion_tasks`:

![Syncfusion-Aufgabentabelle](/img/migrating/syncfusion/syncfusion-tasks-table.png)
![Syncfusion-Aufgabentabelle2](/img/migrating/syncfusion/syncfusion-tasks-table2.png)

### Erstellen Sie DHTMLX-Tabellen

Erstellen Sie zwei neue Tabellen, die mit DHTMLX Gantt kompatibel sind:

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

### Bestehende Daten migrieren

Migrieren Sie nun Ihre bestehenden Syncfusion-Daten in die neuen DHTMLX-Tabellen.

**Aufgaben migrieren:**

```sql
INSERT INTO gantt_tasks (id, text, start_date, end_date, duration, progress, parent, notes, open)
SELECT
    TaskID,
    TaskName,                                           -- TaskName → text
    StartDate,
    COALESCE(EndDate,
        DATE_ADD(StartDate, INTERVAL Duration DAY)),   -- EndDate berechnen, falls fehlt
    COALESCE(Duration,
        DATEDIFF(EndDate, StartDate)),                 -- duration berechnen, falls fehlt
    COALESCE(Progress, 0) / 100,                       -- Prozentsatz (0-100) in Dezimalzahl (0-1) umwandeln
    COALESCE(ParentId, 0),                             -- ParentId → parent (0 für Wurzelaufgaben)
    info,                                              -- info → notes
    COALESCE(isExpand, TRUE)                           -- isExpand → open
FROM syncfusion_tasks;
```

**Links migrieren (Abhängigkeiten)**

In der Datenstruktur von Syncfusion Gantt werden Abhängigkeiten als Zeichenketten in der Spalte `Predecessor` gespeichert:

- Formatbeispiele: `"5"`, `"3,4"`, `"5FS+2"`, `"7SS-1,8FF+3"`, `"2FS-5 days"`

In DHTMLX Gantt werden Aufgaben und Links in **getrennten Tabellen** gespeichert. Jede Verknüpfung ist eine Zeile mit:

- `id` - die Link-ID
- `source` - die ID einer Aufgabe, von der die Abhängigkeit beginnt
- `target` - die ID einer Aufgabe, an der die Abhängigkeit endet
- `type` - der Abhängigkeitstyp: `"0"` (FS), `"1"` (SS), `"2"` (FF), `"3"` (SF)
- `lag` - optionale Verzögerung der Aufgabe

Wir implementieren ein Node.js-Migrationsskript, um das String-Format von Syncfusion zu parsen und in das strukturierte Format von DHTMLX zu konvertieren.

**Verständnis des Predecessor-Formats von Syncfusion:**

| Beispiel        | Bedeutung                                      | DHTMLX-Entsprechung               |
| -------------- | ---------------------------------------------- | --------------------------------- |
| `"5"`          | Aufgabe hängt von Aufgabe 5 ab (Standard FS)  | `source: 5, type: "0"`              |
| `"3,4"`        | Hängt von Aufgaben 3 UND 4 ab                   | Zwei separate Links                 |
| `"5FS"`        | Finish-to-Start-Abhängigkeit                    | `source: 5, type: "0"`              |
| `"5FS+2"`      | FS mit 2 Tagen positiver Verzögerung            | `source: 5, type: "0", lag: 2`      |
| `"5FS-3"`      | FS mit 3 Tagen negativer Verzögerung            | `source: 5, type: "0", lag: -3`     |
| `"2FS-5 days"` | FS mit Verzögerung einschließlich "days"-Text  | `source: 2, type: "0", lag: -5`     |

Erstellen Sie eine Datei `migrate-dependencies.js` und fügen Sie folgenden Code ein:

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

Dann fügen Sie ein Skript zu Ihrer `dhtmlx-demo/package.json` hinzu:

```json
{
  "scripts": {
    "migrate-deps": "node migrate-dependencies.js"
  }
}
```

Führen Sie die Migration aus:

```bash
cd dhtmlx-demo
npm run migrate-deps
```

Sie können überprüfen, dass die Daten korrekt migriert wurden, indem Sie folgende Befehle ausführen:

```sql
SELECT * FROM gantt_tasks;
SELECT * FROM gantt_links;
```

Sie sollten alle Ihre Aufgaben und Links korrekt übertragen sehen mit den richtigen Feldzuordnungen.

### Zuordnung der Syncfusion-Aufgabenfelder zu DHTMLX Gantt

| Syncfusion-Feld | DHTMLX-Feld    | Hinweise                                                                 |
| ---------------- | --------------- | --------------- | 
| `TaskID`         | `id`            | Aufgaben-ID                                                               |
| `TaskName`       | `text`          | Aufgabenname                                                       |
| `StartDate`      | `start_date`    | Aufgabenstartdatum                                                       |
| `EndDate`        | `end_date`      | Aufgabenenddatum (in DHTMLX wird es berechnet, falls nicht angegeben)                  |
| `Duration`       | `duration`      | Aufgabendauer                                                         |
| `DurationUnit`   | _(config)_      | DHTMLX Gantt verwendet eine globale Dauer-Einheit, konfiguriert über `gantt.config.duration_unit`. Während der Migration wird empfohlen, alle Dauern auf eine einzige Einheit zu normalisieren. Wenn Sie unterschiedliche Dauer-Einheiten für verschiedene Aufgaben möchten, z. B. Dauern einiger Aufgaben in Stunden und anderer in "Tagen", können Sie das [formatter module](guides/working-time.md#taskdurationindecimalformat) verwenden.                     |
| `Progress`       | `progress`      | Syncfusion: 0-100%, DHTMLX: 0-1 (Dezimal)                             |
| `ParentId`       | `parent`        | Elternaufgaben-ID (0 für Wurzelaufgaben)                                     |
| `Predecessor`    | _(links table)_ | Syncfusion speichert als Zeichenkette, DHTMLX verwendet separate `gantt_links`-Tabelle |
| `info` (notes)   | -         | Kann als benutzerdefinierte Spalte hinzugefügt werden. Siehe diesen Artikel für weitere Informationen: [How to add a custom column in the grid](guides/how-to.md#how-to-add-a-custom-column-in-the-grid)                                            |
| `isExpand`       | `open`          | Expand-/Zusammenklappzustand für Elternaufgaben                                |
| `Indicators`     | `markers`       | DHTMLX verwendet die API `gantt.addMarker()`. Erfahren Sie mehr über [das Hinzufügen vertikaler Marker](guides/markers.md)                                   |

## Schritt 2: Backend-Migration (server.js)

### Entfernen Sie Syncfusion-Endpunkte

Entfernen Sie die folgenden Syncfusion-spezifischen Endpunkte aus Ihrem `server.js`:

- `app.post('/api/getTasks', ...)` - Syncfusion-Datenlade-Endpunkt
- `app.post('/api/batchTasks', ...)` - Syncfusion-Batch-Sync-Endpunkt

### Installieren Sie DHTMLX Gantt Paket und Vite

Entfernen Sie die Syncfusion-Abhängigkeit:

```bash
npm uninstall @syncfusion/ej2
```

Installieren Sie DHTMLX Gantt gemäß der [Installationsanleitung](guides/installation.md).

Für dieses Tutorial verwenden wir die Testversion von DHTMLX Gantt:

```bash
npm install @dhx/trial-gantt
```

Lassen Sie uns außerdem Vite als Build-Tool installieren:

```bash
npm install --save-dev vite
```

### Fügen Sie einen Data Loading-Endpunkt hinzu

Wir verwenden die Bibliothek `date-format-lite`, um Daten aus dem MySQL-DATETIME-Format in das von DHTMLX erwartete Format zu formatieren.

Installieren Sie die Bibliothek:

```bash
npm install date-format-lite
```

Fügen Sie den GET-Endpunkt zum Laden von Daten im DHTMLX-Format hinzu:

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

**Hinweis:** Das Antwortformat unterscheidet sich von Syncfusion (`{ result: [...], count: number }`). DHTMLX erwartet `{ tasks: [], links: [] }`.

### Fügen Sie CRUD-Endpunkte für Tasks und Links hinzu

DHTMLX Gantt's `DataProcessor` verwendet REST-Endpoints, um Daten mit dem Server zu synchronisieren. Jede Operation (Erstellen, Aktualisieren, Löschen) wird als separate HTTP-Anfrage mit der passenden Methode gesendet.
Weitere Informationen finden Sie unter [Server-side integration](guides/server-side.md).

Fügen Sie Handler für **Task-Operationen** hinzu:

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

Fügen Sie Handler für Link- (Abhängigkeits-) Operationen hinzu:

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

### Hilfsfunktionen hinzufügen

Fügen Sie außerdem Hilfsfunktionen hinzu, um Daten zu verarbeiten und Antworten zu senden:

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

### Bereinigen von Task-Daten (XSS-Schutz)

DHTMLX Gantt rendert Felder wie den Text einer Aufgabe als HTML und escaped sie standardmäßig nicht – jeder Markup in migrierten Daten (oder später vom Benutzer eingegeben) wird unverändert gerendert – potenzieller XSS-Vektor. Syncfusion und die meisten anderen Bibliotheken verhalten sich ähnlich, daher lohnt es sich, dies explizit während der Migration zu berücksichtigen.

**Bereinigung im Backend (empfohlen).** Bereinigen Sie freizügige Textfelder, bevor sie in die Datenbank gelangen:

```bash
npm install isomorphic-dompurify
```

```js
import DOMPurify from 'isomorphic-dompurify';

function getTask(data) {
  return {
    text: DOMPurify.sanitize(data.text),
    notes: data.notes ? DOMPurify.sanitize(data.notes) : null,
    // ...die verbleibenden Felder unverändert
  };
}
```

**Escape im Frontend (Defense in Depth).** Überschreiben Sie die Vorlagen, die den Task-Text in `src/app/app.ts` rendern:

```ts
const escapeHTML = (value: unknown) =>
  String(value ?? '').replace(/[&<>"']/g, (ch) =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch] as string));

gantt.templates.task_text = (start, end, task) => escapeHTML(task.text);
// auch jeden benutzerdefinierten Grid-Spalten-Text sichern: template: (task) => escapeHTML(task.text)
```

Für das vollständige Set an Empfehlungen – Content Security Policy, Lightbox-Sanitisierung und Hinweise zur SQL-Injektion – siehe den Guide [Application Security](guides/app-security.md).

---

## Schritt 3: Frontend-Migration mit Vite

### Vite-Konfiguration einrichten

Erstellen Sie eine Datei `vite.config.js` im Stamm Ihres Projekts:

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

Organisieren Sie Ihr Projekt folgender Struktur:

```
dhtmlx-demo/
├── src/                    # Frontend-Quellcode
│   ├── app/
│   │   └── app.ts         # Haupt-Gantt-Initialisierung
│   ├── index.html         # Haupt-HTML-Datei
│   ├── resources/
│   └── styles/
├── e2e/                   # End-to-End-Tests (optional)
├── .env.example
├── .gitignore
├── migrate-dependencies.js  # Abhängigkeits-Migrationsskript
├── package.json           # Projektabhängigkeiten
├── server.js              # Express-Server
├── setup.sql              # Datenbank-Setup-Skript
├── tsconfig.json          # TypeScript-Konfiguration
└── vite.config.js         # Vite-Konfiguration
```

### Aktualisieren Sie index.html

Aktualisieren Sie `index.html` mit dem folgenden Code:

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

**Hinweis:** Die Container-ID wurde zu `gantt_here` geändert, dies ist die konventionelle Container-ID von DHTMLX Gantt.

### Aktualisieren Sie `src/app/app.ts`

Entfernen Sie in der Datei `src/app/app.ts` alle Syncfusion-bezogenen Importe und Codes.

Ersetzen Sie diese durch die DHTMLX Gantt-Initialisierung:

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
  url: '/data', // Base-URL für REST-Endpunkte
  mode: 'REST', // REST-Modus verwenden
});
```

Der DataProcessor wird automatisch:

- POST-Anfragen an `/data/task` senden, wenn Aufgaben erstellt werden
- PUT-Anfragen an `/data/task/:id` senden, wenn Aufgaben aktualisiert werden
- DELETE-Anfragen an `/data/task/:id` senden, wenn Aufgaben gelöscht werden
- Links ähnlich mit `/data/link`-Endpunkten behandeln

### Aktualisieren Sie die Paket.json-Skripte

Aktualisieren Sie Ihre `package.json`-Skripte, um Vite zu verwenden:

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

## Schritt 4: Migration testen

### Anwendung ausführen

Für den Entwicklungsmodus müssen zwei Prozesse ausgeführt werden:

**Terminal 1 – Backend (Express):**

```bash
npm run server
```

Dadurch wird der API-Server auf `http://localhost:1337` gestartet (oder dem konfigurierten Port)

**Terminal 2 – Frontend (Vite):**

```bash
npm run dev
```

Dies startet den Vite-Dev-Server auf `http://localhost:5173`. Öffnen Sie Ihren Browser und navigieren Sie zu `http://localhost:5173`. Vite wird API-Anfragen automatisch an das Express-Backend weiterleiten.

Sie sollten das DHTMLX Gantt-Diagramm sehen, das Ihre Daten aus der Datenbank lädt:

![Gantt mit geladenen Daten](/img/migrating/syncfusion/dhtmlx-gantt-data-loaded.png)

## Nächste Schritte

- Erkunden Sie die [DHTMLX Gantt-Dokumentation](/) für fortgeschrittene Funktionen
- Überprüfen Sie die [API-Referenz](/api/api-overview/) für Anpassungsoptionen
- Werfen Sie einen Blick auf [DHTMLX Gantt-Beispiele](https://docs.dhtmlx.com/gantt/demos/) für Implementierungsbeispiele
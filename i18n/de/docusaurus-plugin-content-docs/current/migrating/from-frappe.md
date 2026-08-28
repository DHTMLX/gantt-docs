---
title: "Migration von Frappe Gantt zu DHTMLX Gantt"
sidebar_label: "Von Frappe"
---

:::note
Der vollständige Demo-Quellcode ist auf GitHub verfügbar: [https://github.com/DHTMLX/gantt-migrating-from-frappe](https://github.com/DHTMLX/gantt-migrating-from-frappe).
:::

# Migration von Frappe Gantt zu DHTMLX Gantt

## Einführung

Dieser Leitfaden führt Sie durch den Prozess der Migration einer bestehenden Anwendung von [Frappe Gantt](https://frappe.io/gantt) zu [DHTMLX Gantt](https://dhtmlx.com/docs/products/dhtmlxGantt/). Wir behandeln alle erforderlichen Schritte, einschließlich Änderungen am Datenbankschema, serverseitige API-Anpassungen und Aktualisierungen des Client-Codes.

## Voraussetzungen

Bevor Sie mit der Migration beginnen, stellen Sie sicher, dass Sie:
- Eine bestehende, funktionsfähige Anwendung mit Frappe Gantt
- Node.js (>= 20.0.0) installiert
- MySQL-Datenbank mit der Frappe Gantt-Datenstruktur
- Grundkenntnisse in Express.js und JavaScript

## Schritt 1: Datenbank-Migration

### Aktuelles Schema verstehen

Wenn Sie dem Demo-Setup von Frappe Gantt gefolgt sind, sollten Sie eine Tabelle haben: `frappe_tasks`.

Die Struktur der Tabelle `frappe_tasks`:

![Frappe-Aufgabentabelle](/img/migrating/frappe/frappe-tasks-table.png)

### DHTMLX-Tabellen erstellen

DHTMLX Gantt verwendet zwei separate Tabellen: eine für Aufgaben und eine für Abhängigkeitsverknüpfungen. Erstellen Sie sie in derselben Datenbank:

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

### Vorhandene Daten migrieren

Nun migrieren Sie Ihre bestehenden Frappe-Daten in die neuen DHTMLX-Tabellen.

**Aufgaben migrieren:**

```sql
INSERT INTO gantt_tasks (id, text, start_date, end_date, duration, progress, parent)
SELECT
    id,
    name,                           -- name → text
    start,                          -- start → start_date
    end,                            -- end → end_date
    GREATEST(DATEDIFF(end, start), 1),  -- Dauer in Tagen (mindestens 1)
    progress / 100.0,               -- Prozentwert (0-100) in Dezimalwert (0-1) umrechnen
    '0'                             -- In Frappe keine Hierarchie, alle Aufgaben sind Ebenen der Wurzel
FROM frappe_tasks;
```

Sie können das Ergebnis verifizieren:

```sql
SELECT * FROM gantt_tasks;
```

**Links migrieren (Abhängigkeiten)**

Im Frappe-Gantt-Datenmodell werden Abhängigkeiten als Zeichenfolgen in der Spalte `dependencies` der Tabelle `frappe_tasks` gespeichert.

Bei DHTMLX Gantt werden Aufgaben und Verknüpfungen in **getrennten Tabellen** gespeichert. Jede Verknüpfung ist eine Zeile mit:

- `id` - die Verknüpfungs-ID
- `source` - die ID der Aufgabe, von der die Abhängigkeit ausgeht
- `target` - die ID der Aufgabe, zu der die Abhängigkeit führt
- `type` - der Typ der Abhängigkeit: `"0"` (FS), `"1"` (SS), `"2"` (FF), `"3"` (SF)

Da alle Frappe-Abhängigkeiten FS sind, wird bei der Migration immer `type = "0"` gesetzt.

Erstellen Sie eine Datei `migrate-frappe-to-dhtmlx.js` und fügen Sie den folgenden Code dort ein:

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

    // Abfragen aller Aufgaben, die Abhängigkeiten haben
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

      // Aufteilen von durch Komma getrennten Abhängigkeits-IDs
      const depIds = dependencies
        .split(',')
        .map((dep) => dep.trim())
        .filter((dep) => dep);

      console.log(`\nTask ${targetId} depends on: ${depIds.join(', ')}`);

      // Jede Abhängigkeit wird zu einer Finish-to-Start-Verknüpfung (Typ "0")
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

Dann fügen Sie Ihrem `package.json` ein Skript hinzu:

```json
{
  "scripts": {
    "migrate": "node migrate-frappe-to-dhtmlx.js"
  }
}
```

Führen Sie die Migration aus:

```bash
npm run migrate
```

Sie können verifizieren, dass die Verknüpfungen korrekt migriert wurden:

```sql
SELECT * FROM gantt_links;
```

Sie sollten pro Abhängigkeit eine Zeile sehen, mit korrekten `source`- und `target`-IDs.

### Abbildung der Frappe-Aufgabeneigenschaften auf DHTMLX Gantt

| Frappe-Feld      | DHTMLX-Feld    | Hinweise                                                                                                                        |
| ----------------- | --------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| `id`              | `id`            | Aufgaben-ID                                                                                                                     |
| `name`            | `text`          | Aufgabenname                                                                                                                   |
| `start`           | `start_date`    | Startdatum der Aufgabe                                                                                                         |
| `end`             | `end_date`      | Enddatum der Aufgabe                                                                                                           |
| _(nicht gespeichert)_ | `duration`      | Die Aufgabendauer. In DHTMLX Gantt wird sie, falls nicht angegeben, anhand von `start_date` und `end_date` berechnet  |
| `progress`        | `progress`      | Frappe: Ganzzahl 0–100; DHTMLX: Dezimalwert 0,0–1,0                                                                            |
| _(nicht unterstützt)_ | `parent`        | Frappe hat keine Hierarchie. In DHTMLX Gantt können Sie die übergeordnete Aufgabe angeben                                   |
| `dependencies`    | _(links-Tabelle)_ | Frappe speichert als Zeichenfolge; DHTMLX verwendet eine separate `gantt_links`-Tabelle                                    |

---

## Schritt 2: Backend-Migration (server.js)

### Entfernen von Frappe-spezifischen Endpunkten und Hilfsfunktionen

Im Frappe-Server werden Datenladen und CRUD für Aufgaben über `/data/tasks` abgewickelt. Löschen oder Ersetzen Sie alle folgenden Punkte:

- `function formatTaskForClient(dbTask)` - der Frappe-spezifische Response-Formatter
- `app.get('/data/tasks', ...)` - gibt eine einfache Liste von Aufgabenobjekten zurück
- `app.post('/data/tasks', ...)` - erstellt eine Aufgabe; Antwort gibt das vollständige Aufgabenobjekt zurück
- `app.put('/data/tasks/:id', ...)` - aktualisiert eine Aufgabe; Antwort gibt das aktualisierte Aufgabenobjekt
- `app.delete('/data/tasks/:id', ...)` - löscht eine Aufgabe; gibt HTTP 204 mit leerem Körper zurück

### DHTMLX Gantt-Paket installieren

Installieren Sie DHTMLX Gantt gemäß der [Installationsanleitung](guides/installation.md).

Für dieses Tutorial verwenden wir die Testversion von DHTMLX Gantt:

```bash
npm install @dhx/trial-gantt
```

### Endpunkt zum Laden von Daten hinzufügen

DHTMLX erwartet, dass sowohl Aufgaben als auch Verknüpfungen in einer einzigen GET /data-Antwort zurückgegeben werden als `{ tasks: [], links: [] }`.

Ersetzen Sie den Frappe-Endpunkt `GET /data/tasks` durch:

```js
import dateFormat from 'date-format-lite';

// GET /data - Aufgaben und Verknüpfungen laden
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

### CRUD-Endpunkte für Aufgaben und Verknüpfungen hinzufügen

Der DataProcessor von DHTMLX Gantt verwendet REST-Endpoints, um Daten mit dem Server zu synchronisieren. Jede Operation (Erstellen, Aktualisieren, Löschen) wird als separierte HTTP-Anfrage gesendet. Erfahren Sie mehr über [Server-seitige Integration](guides/server-side.md).

Ersetzen Sie die Frappe-Aufgaben-Endpunkte (`POST /data/tasks`, `PUT /data/tasks/:id`, `DELETE /data/tasks/:id`) durch:

```js
import { randomUUID } from 'crypto';

// POST /data/task — Neue Aufgabe erstellen
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

// PUT /data/task/:id — Eine vorhandene Aufgabe aktualisieren
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

// DELETE /data/task/:id — Eine Aufgabe löschen
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

Hinzufügen Sie Handler für Verknüpfungen (Abhängigkeiten):

```js
// POST /data/link — Neue Verknüpfung erstellen
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

// PUT /data/link/:id — Eine vorhandene Verknüpfung aktualisieren
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

// DELETE /data/link/:id — Eine Verknüpfung löschen
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

Ersetzen Sie die Frappe-Funktion `formatTaskForClient` durch DHTMLX-kompatible Helferfunktionen:

```js
// Aufgaben-Daten aus dem Request-Body parsen
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

// Verknüpfungs-Daten aus dem Request-Body parsen
function getLink(data) {
  return {
    source: data.source,
    target: data.target,
    type: data.type,
  };
}

// DataProcessor-kompatible Antwort senden
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

Hinweis: Das Antwortformat unterscheidet sich von Frappe. Die Frappe-Endpunkte gaben das vollständige Aufgabenobjekt zurück (oder HTTP 204 bei Löschungen). Der DataProcessor von DHTMLX erwartet ein JSON-Objekt mit einem Feld `action` (z. B. `{ action: "inserted", tid: 5 }`, `{ action: "updated" }`, `{ action: "deleted" }`). Weitere Details zu Anfragen und Antworten finden Sie im Leitfaden [Server-seitige Integration](guides/server-side.md#requestresponsedetails).

### Aufgabendaten bereinigen (XSS-Schutz)

DHTMLX Gantt rendert Felder wie den Text einer Aufgabe als HTML und escaped sie standardmäßig nicht – jegliches Markup in migrierten Daten (oder später vom Nutzer eingegeben) wird unverändert angezeigt – potenzieller XSS-Vektor. Frappe und die meisten anderen Bibliotheken verhalten sich genauso, daher lohnt es sich, dies explizit während der Migration zu behandeln.

**Bereinigung im Backend (empfohlen).** Reinigt frei-textliche Felder, bevor sie in die Datenbank gelangen:

```bash
npm install isomorphic-dompurify
```

```js
import DOMPurify from 'isomorphic-dompurify';

function getTask(data) {
  return {
    text: DOMPurify.sanitize(data.text),
    // ...die verbleibenden Felder unverändert
  };
}
```

**Escape im Frontend (Defense in Depth).** Überschreiben Sie die Vorlagen, die den Task-Text in `src/main.js` rendern:

```js
const escapeHTML = (value) =>
  String(value ?? '').replace(/[&<>"']/g, (ch) =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]));

gantt.templates.task_text = (start, end, task) => escapeHTML(task.text);
gantt.templates.tooltip_text = (start, end, task) => escapeHTML(task.text);
// außerdem den "text" Grid-Spaltenwert über eine Spaltenvorlage maskieren: template: (task) => escapeHTML(task.text)
```

Für das vollständige Repertoire an Empfehlungen – Content Security Policy, Lightbox-Sanitisierung und Hinweise zur SQL-Injektion – sehen Sie den Leitfaden [Application Security](guides/app-security.md).

## Schritt 3: Frontend-Migration

### DHTMLX Gantt-Paket installieren

Für dieses Tutorial verwenden wir die Testversion von DHTMLX Gantt:

```
npm install @dhx/trial-gantt
```

### update vite.config.js

Im Frappe-Demo war der Vite-Proxy auf `/data/tasks` beschränkt:

```js
proxy: {
  '/data/tasks': {
    target: 'http://localhost:1337',
    changeOrigin: true,
  },
},
```

Aktualisieren Sie ihn, um alle `/data`-Anfragen zu proxien (diese decken nun Aufgaben, CRUD für Aufgaben und CRUD für Verknüpfungen ab):

```js
proxy: {
  '/data': {
    target: 'http://localhost:1337',
    changeOrigin: true,
  },
},
```

### index.html aktualisieren

Im Frappe-Demo wird `frappe-gantt` von einem CDN geladen. Es gibt außerdem eine komplexe benutzerdefinierte UI mit Modalen, Kontrollkästchen und Bedienelementen – all dies ist nicht mehr nötig, da DHTMLX Gantt ein integriertes Lightbox-Editor-Fenster für Aufgaben bietet.

Ersetzen Sie den gesamten Inhalt von `index.html`:

Entfernen Sie:

```html
<script src="https://cdn.jsdelivr.net/npm/frappe-gantt/dist/frappe-gantt.umd.js"></script>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/frappe-gantt/dist/frappe-gantt.css" />
```

Entfernen Sie außerdem das gesamte benutzerdefinierte UI-Markup innerhalb von `<body>` einschließlich:

- Der `.controls`-Div mit den Buttons `#add-task`, `#refresh` und `#delete-task`
- Der `.delete-section`-Div mit Aufgaben-Checkboxen
- Dem Overlay `#add-task-modal`
- Dem Container `<div id="gantt">`

Ersetzen Sie es durch eine minimale Struktur:

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

### src/style.css aktualisieren

Das CSS der Frappe-Demo enthält benutzerdefinierte Stile für das Steuerfeld, Buttons, Modale und Checkboxen. Da diese gesamte benutzerdefinierte UI entfernt wurde, ersetzen Sie die Datei durch DHTMLX-spezifische Styles:

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

Die `.weekend`-Klasse wird von DHTMLX Gantt-Vorlagen verwendet, um Wochenendspalten hervorzuheben (siehe `src/main.js`).

### src/main.js ersetzen

Entfernen Sie allen Frappe-bezogenen Code und ersetzen Sie `src/main.js` durch:

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
          return 'Woche #' + weekNum + ', ' + dateToStr(date) + ' - ' + dateToStr(endDate);
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

Der DataProcessor sorgt automatisch dafür:

- POST zu `/data/task` beim Anlegen einer Aufgabe
- PUT zu `/data/task/:id` beim Aktualisieren einer Aufgabe
- DELETE zu `/data/task/:id` beim Löschen einer Aufgabe
- POST zu `/data/link` beim Erstellen einer Abhängigkeit
- PUT zu `/data/link/:id` beim Aktualisieren einer Verknüpfung
- DELETE zu `/data/link/:id` beim Löschen einer Verknüpfung

---

## Schritt 4: Migration testen

### Anwendung ausführen

Für den Entwicklungsmodus müssen zwei Prozesse gestartet werden.

Terminal 1 — Backend (Express):

```bash
npm run server
```

Dies startet den API-Server unter `http://localhost:1337` (bzw. dem konfigurierten Port).

Terminal 2 — Frontend (Vite):

```bash
npm run dev
```

Dies startet den Vite-Entwicklungsserver unter `http://localhost:5173`. Öffnen Sie Ihren Browser und navigieren Sie zu `http://localhost:5173`. Vite leitet `/data`-Anfragen automatisch an das Express-Backend weiter.

Sie sollten das DHTMLX Gantt-Diagramm mit den aus der Datenbank geladenen Migrierungsdaten sehen.

![DHTMLX Gantt Diagramm](/img/migrating/frappe/dhtmlx-gantt-chart.png)

## Nächste Schritte

- Erfahren Sie mehr in der [DHTMLX Gantt-Dokumentation](/) zu fortgeschrittenen Funktionen
- Prüfen Sie die [API-Referenz](/api/api-overview/) für Anpassungsoptionen
- Werfen Sie einen Blick auf [DHTMLX Gantt-Beispiele](https://docs.dhtmlx.com/gantt/samples/) für Implementierungsbeispiele
---
title: "Migration von Bryntum Gantt zu DHTMLX Gantt"
sidebar_label: "Von Bryntum"
---

:::note
Der vollständige Demo-Quellcode ist auf GitHub verfügbar: [https://github.com/DHTMLX/gantt-migrating-from-bryntum](https://github.com/DHTMLX/gantt-migrating-from-bryntum).
:::

# Migration von Bryntum Gantt zu DHTMLX Gantt

## Einführung

[Bryntum Gantt](https://bryntum.com/products/gantt/) ist eine JavaScript-Gantt-Diagrammkomponente für Tools zur Projektverwaltung.

Diese Anleitung führt Sie durch den Prozess der Migration einer bestehenden Anwendung von Bryntum Gantt zu DHTMLX Gantt. Wir decken alle notwendigen Schritte ab, einschließlich Änderungen am Datenbank-Schema, Anpassungen am serverseitigen API und Updates im Client-Code.

## Voraussetzungen

Bevor Sie mit der Migration beginnen, stellen Sie sicher, dass Sie:
- eine vorhandene, funktionierende Anwendung mit Bryntum Gantt
- Node.js (>= 20.0.0) installiert
- eine MySQL-Datenbank mit Bryntum-Datenstruktur
- Grundkenntnisse von Express.js und JavaScript

## Schritt 1: Datenbank-Migration

### Verständnis des aktuellen Schemas

Wenn Sie dem Bryntum-Demoprojekt gefolgt sind, sollten Sie zwei Tabellen haben: `tasks` und `dependencies`.

Die Struktur der Tabelle `tasks`:
![Bryntum tasks table](/img/migrating/bryntum/bryntum-tasks-mysql.png)

Die Struktur der Tabelle `dependencies`:
![Bryntum dependencies table](/img/migrating/bryntum/bryntum-deps-mysql.png)

### Erstellen der DHTMLX-Tabellen

DHTMLX Gantt verwendet eine einfachere Datenbankstruktur. Erzeugen Sie zwei neue Tabellen, die mit DHTMLX Gantt kompatibel sind:

```sql
CREATE TABLE `gantt_tasks`
(
    `id`              int(11)      NOT NULL AUTO_INCREMENT,
    `text`            varchar(255) NOT NULL,
    `start_date`      datetime     NOT NULL,
    `end_date`        datetime     NOT NULL,
    `duration`        int(11)      NOT NULL,
    `progress`        float        NOT NULL,
    `parent`          int(11)      NOT NULL,
    `constraint_type` varchar(20)  DEFAULT 'asap',
    `constraint_date` datetime     DEFAULT NULL,
    PRIMARY KEY (`id`)
);

CREATE TABLE `gantt_links`
(
    `id`     int(11)    NOT NULL AUTO_INCREMENT,
    `source` int(11)    NOT NULL,
    `target` int(11)    NOT NULL,
    `type`   varchar(1) NOT NULL,
    PRIMARY KEY (`id`)
);
```

Hinweis:
- Wir haben `constraint_type`- und `constraint_date`-Felder hinzugefügt, um Auto-Scheduling mit Einschränkungen zu unterstützen. Diese Funktionalität ist sowohl in Bryntum als auch in DHTMLX Gantt verfügbar.
- Wir haben das Feld `end_date` hinzugefügt, um das genaue Enddatum zu erhalten, das vom Gantt berechnet wird. Ohne Speicherung von `end_date` würde es basierend auf `start_date` und `duration` neu berechnet werden, was je nach aktivierten Features (Auto-Scheduling, Arbeitszeit, Einschränkungen) variieren kann. Die Speicherung von `end_date` verhindert den Verlust dieser fundamentalen Information.

### Migrieren vorhandener Daten

Exportieren Sie nun Ihre bestehenden Bryntum-Daten in die neuen DHTMLX-Tabellen.

**Aufgaben migrieren:**
```sql
INSERT INTO gantt_tasks (
    `id`,
    `text`,
    `start_date`,
    `end_date`,
    `duration`,
    `progress`,
    `parent`,
    `constraint_type`,
    `constraint_date`
)
SELECT
    `id`,
    `name`,                              -- 'name' --> 'text'
    `startDate`,
    DATE_ADD(`startDate`, INTERVAL `duration` DAY), -- End_date aus Startdatum + Dauer berechnen
    `duration`,
    `percentDone`,                       -- 'percentDone' --> 'progress'
    IFNULL(`parentId`, 0),               -- 'parentId' --> 'parent' (0 für Wurzel-Aufgaben)
    CASE `constraintType`                -- Zuordnung der Einschränkungen
        WHEN 'assoonaspossible' THEN 'asap'
        WHEN 'aslateaspossible' THEN 'alap'
        WHEN 'startnoearlierthan' THEN 'snet'
        WHEN 'startnolaterthan' THEN 'snlt'
        WHEN 'finishnoearlierthan' THEN 'fnet'
        WHEN 'finishnolaterthan' THEN 'fnlt'
        WHEN 'muststarton' THEN 'mso'
        WHEN 'mustfinishon' THEN 'mfo'
        ELSE 'asap'
    END,
    `constraintDate`
FROM tasks;
```

**Migrate links (dependencies):**
```sql
INSERT INTO gantt_links (`id`, `source`, `target`, `type`)
SELECT 
    `id`, 
    `fromEvent`,               -- 'fromEvent' --> 'source'
    `toEvent`,                 -- 'toEvent' --> 'target'
    CASE `type`                -- Umwandlung Bryntum-Linktypen in DHTMLX-Format
        WHEN 0 THEN '1'        -- Start-to-Start
        WHEN 1 THEN '3'        -- Start-to-Finish
        WHEN 2 THEN '0'        -- Finish-to-Start (am häufigsten)
        WHEN 3 THEN '2'        -- Finish-to-Finish
        ELSE '0'               -- Standard zu Finish-to-Start
    END
FROM dependencies;
```

Sie können prüfen, ob die Daten korrekt migriert wurden, indem Sie die folgenden Befehle ausführen:

```sql
SELECT * FROM gantt_tasks;
SELECT * FROM gantt_links;
```

Sie sollten alle Ihre Aufgaben und Verknüpfungen mit den richtigen Feldzuordnungen sehen.

### Zuordnung der Bryntum-Task-Felder zu DHTMLX Gantt

Der TaskModel von Bryntum Gantt enthält eine Reihe von Feldern, die in DHTMLX Gantt unterschiedlich implementiert sind oder während der Migration speziell behandelt werden müssen. Die folgende Tabelle erläutert, wie die gängigsten Bryntum-Task-Felder zu DHTMLX Gantt gemappt werden:

| Bryntum Field | Description | Recommended Approach |
|--------------|-------------|---------------------|
| `effort` / `effortUnit` | Arbeitsmenge, die erforderlich ist, um eine Aufgabe abzuschließen (z. B. 16h), verwendet für Aufwand-getriebene und ressourcenbasierte Planung | DHTMLX Gantt unterstützt keine aufwandsgetriebene Planung auf Aufgabeneinheit. Als Alternative können Sie das [Resource Management](guides/resource-management.md) Modul verwenden, um Ressourcen zuzuweisen und Arbeitslast zu visualisieren. Ressourcen-Zuweisungen können Aufwand (z. B. Stunden pro Tag) darstellen, aber die Aufgabendauer wird nicht automatisch neu berechnet und muss manuell oder über benutzerdefinierte Logik verwaltet werden. |
| `durationUnit` | Einheit, die verwendet wird, um die Aufgabendauer zu interpretieren (Stunden, Tage, Wochen usw.) | DHTMLX Gantt verwendet eine globale Dauer-Einheit, die über `gantt.config.duration_unit` konfiguriert wird. Während der Migration wird empfohlen, alle Dauern auf eine einzige Einheit zu normalisieren. Wenn Sie für verschiedene Aufgaben unterschiedliche Dauer-Einheiten verwenden möchten, z. B. einige Aufgaben in Stunden und andere in „Tagen“, können Sie das [Formatter-Modul](guides/working-time.md#taskdurationindecimalformat) verwenden. |
| `schedulingMode` | Definiert, wie sich die Aufgabeneinplanung verhält (Normal, FixedDuration, FixedEffort usw.) | Keine direkte Entsprechung. DHTMLX Gantt unterstützt keine per-Aufgabe Scheduling-Modi. Sie können diesen Wert als benutzerdefiniertes Feld speichern und bei Bedarf benutzerdefiniertes Verhalten mit Gantt-Ereignissen erzwingen (z. B. [onBeforeTaskUpdate](api/event/onbeforetaskupdate.md)). |
| `note` | Freitextnotizen oder Beschreibung, die einer Aufgabe zugeordnet sind | Kann direkt als benutzerdefiniertes Textfeld migriert werden (z. B. `note` oder `description`) und im Lightbox, Tooltip oder einer benutzerdefinierten Raster-Spalte angezeigt werden. |
| `manuallyScheduled` | Gibt an, ob eine Aufgabe von der automatischen Planung ausgeschlossen ist | Verwenden Sie die `task.auto_scheduling`-Eigenschaft der Aufgabe, die es ermöglicht, einzelne Aufgaben von der automatischen Planung auszuschließen, während sie global aktiviert bleibt. Siehe [Deaktivieren der automatischen Planung für bestimmte Aufgaben](guides/auto-scheduling.md#disabling-auto-scheduling-for-specific-tasks). |
| `calendar` | Der Kalender, der der Aufgabe zugewiesen ist | DHTMLX Gantt unterstützt mehrere Arbeitskalender. Ein Kalender kann einer Aufgabe über die Eigenschaft `calendar_id` (oder eine durch `gantt.config.calendar_property` definierte benutzerdefinierte Eigenschaft) zugewiesen werden. Siehe [Zuweisen eines Kalenders zu einer Aufgabe](guides/working-time.md#assigningcalendartotask). |
| `deadline` | Ein Zieldatum, das die Aufgabe nicht überschreiten sollte | Vollständig unterstützt über die Eigenschaft `task.deadline`. Wenn angegeben, zeigt DHTMLX Gantt eine visuelle Fristmarkierung auf der Zeitleiste an. Der Wert verwendet dasselbe Datumsformat wie `start_date`. |
---

## Schritt 2: Backend-Migration (server.js)

### Bryntum-spezifischen Code entfernen

Entfernen Sie zunächst die Bryntum-Paket-Abruf-Middleware aus Ihrer `server.js`:

```js
// DELETE this line:
app.use(express.static(path.join(__dirname, '/node_modules/@bryntum/gantt')));
```

Wichtig: Mit Vite, das in diesem Demo verwendet wird, müssen Sie nicht mehr direkt `node_modules` bedienen. Entfernen Sie jegliche Middleware, die das gesamte `node_modules`-Verzeichnis freigibt:

```js
// DELETE this line if present:
app.use('/node_modules', express.static(path.join(__dirname, 'node_modules')));
```

### Bryntum-Endpunkte entfernen

Löschen Sie die folgenden bryntum-spezifischen Endpunkte und Hilfsfunktionen:
- `app.get('/load', ...)` - Bryntum-Datenlade-Endpunkt
- `app.post('/sync', ...)` - Bryntum-Sync-Endpunkt
- `applyTableChanges()` Funktion
- `createOperation()` Funktion
- `updateOperation()` Funktion
- `deleteOperation()` Funktion

### Installieren Sie DHTMLX Gantt und Vite

Entfernen Sie Abhängigkeiten von Bryntum. Wenn Sie Bryntum über npm verwenden, deinstallieren Sie es:

```bash
npm uninstall @bryntum/gantt
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

### Fügen Sie einen Data Loading Endpoint hinzu

Fügen Sie den GET-Endpunkt hinzu, um Daten im DHTMLX-Format zu laden:

```js
import dateFormat from 'date-format-lite';

// GET /data - Laden von Tasks und Links
app.get('/data', async (req, res) => {
  try {
    const [[tasks], [links]] = await Promise.all([
      db.query('SELECT * FROM gantt_tasks'),
      db.query('SELECT * FROM gantt_links'),
    ]);

    // Formatieren der Datumsangaben für DHTMLX Gantt
    for (let i = 0; i < tasks.length; i++) {
      tasks[i].start_date = tasks[i].start_date.format("YYYY-MM-DD hh:mm:ss");
      tasks[i].end_date = tasks[i].end_date.format("YYYY-MM-DD hh:mm:ss");
      // Falls constraint_date existiert, formatieren
      if (tasks[i].constraint_date) {
        tasks[i].constraint_date = tasks[i].constraint_date.format("YYYY-MM-DD hh:mm:ss");
      }
    }

    res.json({
      tasks,    
      links   
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});
```

Hinweis: Das Antwortformat unterscheidet sich von Bryntum. DHTMLX erwartet `{ tasks: [], links: [] }` statt Bryntums verschachtelter Struktur.

### Fügen Sie CRUD-Endpunkte für Tasks und Links hinzu

DHTMLX Gantt DataProcessor verwendet RESTful Endpunkte. Fügen Sie Handler für Aufgaben-Operationen hinzu:

```js
// Neue Aufgabe erstellen
app.post("/data/task", async (req, res) => {
    const task = getTask(req.body);
    const { text, start_date, end_date, duration, progress, parent, constraint_type, constraint_date } = task;

    try {
        const [result] = await db.query(
            "INSERT INTO gantt_tasks(text, start_date, end_date, duration, progress, parent, constraint_type, constraint_date) VALUES (?,?,?,?,?,?,?,?)",
            [text, start_date, end_date, duration, progress, parent, constraint_type, constraint_date]
        );
        sendResponse(res, "inserted", result.insertId);
    } catch (error) {
        sendResponse(res, "error", null, error);
    }
});

// Vorhandene Aufgabe aktualisieren
app.put("/data/task/:id", async (req, res) => {
    const sid = req.params.id;
    const task = getTask(req.body);
    const { text, start_date, end_date, duration, progress, parent, constraint_type, constraint_date } = task;

    try {
        await db.query(
            "UPDATE gantt_tasks SET text = ?, start_date = ?, end_date = ?, duration = ?, progress = ?, parent = ?, constraint_type = ?, constraint_date = ? WHERE id = ?",
            [text, start_date, end_date, duration, progress, parent, constraint_type, constraint_date, sid]
        );
        sendResponse(res, "updated");
    } catch (error) {
        sendResponse(res, "error", null, error);
    }
});

// Aufgabe löschen
app.delete("/data/task/:id", async (req, res) => {
    const sid = req.params.id;
    
    try {
        await db.query("DELETE FROM gantt_tasks WHERE id = ?", [sid]);
        sendResponse(res, "deleted");
    } catch (error) {
        sendResponse(res, "error", null, error);
    }
});
```

Fügen Sie Handler für Link- (Dependency-)Operationen hinzu:

```js
// Neuer Link erstellen
app.post("/data/link", async (req, res) => {
    const link = getLink(req.body);
    const { source, target, type } = link;

    try {
        const [result] = await db.query(
            "INSERT INTO gantt_links(source, target, type) VALUES (?,?,?)",
            [source, target, type]
        );
        sendResponse(res, "inserted", result.insertId);
    } catch (error) {
        sendResponse(res, "error", null, error);
    }
});

// Vorhandenen Link aktualisieren
app.put("/data/link/:id", async (req, res) => {
    const sid = req.params.id;
    const link = getLink(req.body);
    const { source, target, type } = link;

    try {
        await db.query(
            "UPDATE gantt_links SET source = ?, target = ?, type = ? WHERE id = ?",
            [source, target, type, sid]
        );
        sendResponse(res, "updated");
    } catch (error) {
        sendResponse(res, "error", null, error);
    }
});

// Link löschen
app.delete("/data/link/:id", async (req, res) => {
    const sid = req.params.id;
    
    try {
        await db.query("DELETE FROM gantt_links WHERE id = ?", [sid]);
        sendResponse(res, "deleted");
    } catch (error) {
        sendResponse(res, "error", null, error);
    }
});
```

### Hilfsfunktionen hinzufügen

Fügen Sie außerdem Hilfsfunktionen hinzu, um Daten zu verarbeiten und Antworten zu senden:

```js
function getTask(data) {
    return {
        text: data.text,
        start_date: data.start_date.date("YYYY-MM-DD hh:mm:ss"),
        end_date: data.end_date.date("YYYY-MM-DD hh:mm:ss"),
        duration: data.duration,
        progress: data.progress || 0,
        parent: data.parent,
        constraint_type: data.constraint_type || 'asap',
        constraint_date: data.constraint_date || null
    };
}

function getLink(data) {
    return {
        source: data.source,
        target: data.target,
        type: data.type
    };
}

function sendResponse(res, action, tid, error) {
    if (action === "error") {
        console.log(error);
    }

    const result = { action: action };

    if (tid !== undefined && tid !== null) {
        result.tid = tid;
    }

    res.send(result);
}
```

### Task-Daten bereinigen (XSS-Schutz)

DHTMLX Gantt rendert Felder wie den Task-Text als HTML und escapiert sie standardmäßig nicht — jegliches Markup in migrierten Daten (oder später vom Benutzer eingegeben) wird unverändert dargestellt — ein potenzieller XSS-Vektor. Bryntum und die meisten anderen Bibliotheken verhalten sich ähnlich, daher lohnt es sich, dies während der Migration explizit zu behandeln.

**Backend bereinigen (empfohlen).** Freitext-Felder vor dem Speichern in der Datenbank bereinigen:

```bash
npm install isomorphic-dompurify
```

```js
import DOMPurify from 'isomorphic-dompurify';

function getTask(data) {
    return {
        text: DOMPurify.sanitize(data.text),
        // ...die übrigen Felder unverändert
    };
}
```

**Auf dem Frontend escapen (Defense in Depth).** Überschreiben Sie die Vorlagen, die Text in der Datei `src/main.js` rendern:

```js
const escapeHTML = (value) =>
    String(value ?? "").replace(/[&<>"']/g, (ch) =>
        ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[ch]));

gantt.templates.task_text = (start, end, task) => escapeHTML(task.text);
gantt.templates.tooltip_text = (start, end, task) => escapeHTML(task.text);
// auch die "text"-Spalte im Grid escapen: template: (task) => escapeHTML(task.text)
```

Für die vollständige Empfehlungsliste – Content-Security-Policy, Lightbox-Sanitisierung und SQL-Injection-Guidance – siehe die Anleitung [Application Security](guides/app-security.md).

---

## Schritt 3: Frontend-Migration mit Vite

### Vite-Konfiguration einrichten

Erstellen Sie eine Datei `vite.config.js` im Stammverzeichnis Ihres Projekts:

```javascript
import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  root: '.',
  
  server: {
    port: 5173,
    proxy: {
      // Proxy-API-Anfragen an das Express-Backend
      '/data': {
        target: 'http://localhost:1337',
        changeOrigin: true,
      }
    }
  },
  
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: true,
  },
  
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
});
```

### Projektdateien umstrukturieren

Organisieren Sie Ihr Projekt mit dieser Struktur:

```
dhtmlx-demo/
├── index.html         # Vom Public-Verzeichnis in das Root-Verzeichnis verschieben
├── src/
│   └── main.js        # Diese Datei für die App-Logik erstellen
├── dist/              # Von Vite Build erzeugt
├── server.js          # Backend
├── vite.config.js     # Vite-Konfiguration
└── package.json
```

### index.html aktualisieren

Verschieben Sie `index.html` in das Projekt-Root-Verzeichnis und aktualisieren Sie es. Mit Vite müssen Sie CSS- und JS-Dateien nicht manuell einbinden – Vite bündelt sie automatisch.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>DHTMLX Gantt Demo</title>
    
    <style>
      html, body {
        margin: 0;
        padding: 0;
        height: 100%;
        width: 100%;
      }
      #gantt_here {
        width: 100%;
        height: 100%;
      }
    </style>
  </head>
  <body>
    <div id="gantt_here"></div>
        <script type="module" src="/src/main.js"></script>
  </body>
</html>
```

Hinweis: Der Container-ID hat sich zu `gantt_here` geändert, was die konventionelle Container-ID von DHTMLX Gantt ist.

### Erstellen Sie src/main.js

Erstellen Sie eine neue Datei `src/main.js` mit Ihrer DHTMLX Gantt-Initialisierung:

Bryntum-Code entfernen:
```js
// DELETE all Bryntum imports and initialization
import { Gantt, ProjectModel } from './gantt.module.js';

const project = new ProjectModel({
  taskStore: { transformFlatData: true },
  loadUrl: '/load',
  syncUrl: '/sync',
  autoLoad: true,
  autoSync: true,
});

const gantt = new Gantt({
  appendTo: document.body,
  project,
  columns: [...]
});
```

DHTMLX-Code hinzufügen in `src/main.js`:
```js
// Importieren Sie DHTMLX Gantt CSS und Bibliothek
import '@dhx/trial-gantt/codebase/dhtmlxgantt.css';
import gantt from '@dhx/trial-gantt';

// Plugins aktivieren
gantt.plugins({
  auto_scheduling: true,
  marker: true,
  tooltip: true
});

// Auto-Scheduling mit Einschränkungen konfigurieren
gantt.config.auto_scheduling = {
  enabled: true,
  show_constraints: true,
  apply_constraints: true,
  project_constraint: true,
};

// Projektstart
gantt.config.project_start = new Date(2026, 10, 5);

// Arbeitzeit aktivieren
gantt.config.work_time = true;

// Zusätzliche Features aktivieren
gantt.config.drag_project = true;   // Drag-Drops von Projekten
gantt.config.order_branch = true;   // Task-Reihenfolge innerhalb derselben Baum-Ebene vertikal neu ordnen

// Datumsformat
gantt.config.date_format = "%Y-%m-%d %H:%i:%s";
gantt.config.open_tree_initially = true;

// Spalten konfigurieren, um Constraint-Informationen anzuzeigen
gantt.config.columns = [
    { name: "text", tree: true, width: '*', resize: true, width: 150 },
    { name: "start_date", align: "center", resize: true, width: 150 },
    { name: "duration", align: "center", width: 80, resize: true, },
    {
        name: "constraint_type", align: "center", width: 100, template: function (task) {
            return gantt.locale.labels[gantt.getConstraintType(task)];
        }, resize: true, 
    },
    {
        name: "constraint_date", align: "center", width: 120, template: function (task) {
            const constraintTypes = gantt.config.constraint_types;

            if (task.constraint_date && task.constraint_type != constraintTypes.ASAP && task.constraint_type != constraintTypes.ALAP) {
                return task.constraint_date;
            }
            return "";
        }, resize: true, 
    },
    { name: "add", width: 44 }
];

// Lightbox-Sektionen konfigurieren
gantt.config.lightbox.sections = [
    { name:"description", height:38, map_to:"text", type:"textarea", focus:true},
    { name:"constraint", type:"constraint" }, 
    { name:"time", type:"duration", map_to:"auto" }
];

// Maus-Rad-Zoom konfigurieren
const hourToStr = gantt.date.date_to_str("%H:%i");
const hourRangeFormat = function(step){
	return function(date) {
		const intervalEnd = new Date(gantt.date.add(date, step, "hour") - 1)
		return hourToStr(date) + " - " + hourToStr(intervalEnd);
	};
};

const zoomConfig = {
    minColumnWidth: 80,
    maxColumnWidth: 150,
    levels: [
        [
            { unit: "month", format: "%M %Y", step: 1},
            { unit: "week", step: 1, format: function (date) {
                    const dateToStr = gantt.date.date_to_str("%d %M");
                    const endDate = gantt.date.add(date, 7 - date.getDay(), "day");
                    const weekNum = gantt.date.date_to_str("%W")(date);
                    return "Week #" + weekNum + ", " + dateToStr(date) + " - " + dateToStr(endDate);
                }}
        ],
        [
            { unit: "month", format: "%M %Y", step: 1},
            { unit: "day", format: "%d %M", step: 1}
        ],
        [
            { unit: "day", format: "%d %M", step: 1},
            { unit: "hour", format: hourRangeFormat(12), step: 12}
        ],
        [
            {unit: "day", format: "%d %M",step: 1},
            {unit: "hour",format: hourRangeFormat(6),step: 6}
        ],
        [
            { unit: "day", format: "%d %M", step: 1 },
            { unit: "hour", format: "%H:%i", step: 1}
        ]
    ],
    startDate: new Date(2026, 10, 5),
    endDate: new Date(2026, 10, 20),
    useKey: "ctrlKey",
    trigger: "wheel",
    element: function(){
        return gantt.$root.querySelector(".gantt_task");
    }
}

gantt.ext.zoom.init(zoomConfig);

// Marker für Projektstart hinzufügen
gantt.addMarker({
    start_date: gantt.config.project_start,
    text: "project start"
});

// Wochenenden im Zeitstrahl hervorheben
gantt.templates.scale_cell_class = function (date) {
    if (date.getDay() == 0 || date.getDay() == 6) {
        return "weekend";
    }
};
gantt.templates.timeline_cell_class = function (item, date) {
    if (date.getDay() == 0 || date.getDay() == 6) {
        return "weekend";
    }
};

// Gantt initialisieren
gantt.init("gantt_here");

// Daten vom Server laden
gantt.load("/data");

const dp = gantt.createDataProcessor({
  url: '/data',
  mode: 'REST'
});
```

Der DataProcessor erledigt automatisch:
- POST-Anfragen an `/data/task` beim Erstellen von Tasks
- PUT-Anfragen an `/data/task/:id` beim Aktualisieren von Tasks
- DELETE-Anfragen an `/data/task/:id` beim Löschen von Tasks
- Ebenso für Links mit `/data/link` Endpunkten

### Bryntum-Standard-Funktionen aktivieren

Wichtiger Hinweis: Um einige in Bryntum Gantt standardmäßig aktivierte Funktionen zu nutzen, müssen Sie diese in DHTMLX Gantt explizit aktivieren. Die obige Konfiguration enthält mehrere Funktionen, die in Bryntum Standard sind:

#### Auto-Scheduling mit Einschränkungen
In DHTMLX Gantt müssen Sie:
1. Das Plugin `auto_scheduling` aktivieren
2. Die Einstellungen unter `gantt.config.auto_scheduling` konfigurieren

[Time constraints for tasks](guides/auto-scheduling.md#timeconstraintsfortasks)  
[Auto Scheduling](guides/auto-scheduling.md)

#### Arbeitszeit und Wochenend-Hervorhebung
Um Nicht-Arbeitszeiten in der Timeline hervorzuheben:
- Aktivieren Sie die Konfiguration `work_time`
- Verwenden Sie `scale_cell_class` und `timeline_cell_class`-Vorlagen, um Wochenenden hervorzuheben

[Work Time Calculation](guides/working-time.md)

#### Tooltips
Aktivieren Sie das Tooltip-Plugin, um Task-Informationen beim Hover anzuzeigen.
```js
gantt.plugins({
  tooltip: true
});
```
[Tooltips for Gantt Elements](guides/tooltips.md)

#### Maus-Rad-Zoom
Konfigurieren Sie `gantt.ext.zoom`, um das Zoomen mit dem Mausrad zu ermöglichen, sodass Benutzer zwischen Tag-, Wochen-, Monats- und anderen Ansichten wechseln können.

[Zoom Extension](guides/zoom.md)

#### Drag & Drop-Funktionen
- `drag_project`: Ermöglicht Drag & Drop von Elementen des Projekttyps
- `order_branch`: Ermöglicht das vertikale Neuordnen von Aufgaben innerhalb derselben Baum-Ebene

Hinweis zur Task-Reihenfolge: Wenn `order_branch` aktiviert ist, können Benutzer Aufgaben in der UI neu ordnen. Diese Änderungen werden jedoch NICHT automatisch in der Datenbank gespeichert. Um die Aufgaben-Reihenfolge dauerhaft zu speichern, müssen Sie zusätzliche serverseitige Logik implementieren. Siehe [dieses Handbuch](integrations/node/howtostart-nodejs.md#enable-tasks-reordering-on-the-client) für detaillierte Implementierungsanweisungen.

#### Projekt-Marker
Fügen Sie visuelle Marker hinzu, um wichtige Termine (wie Projektstart) in der Timeline hervorzuheben.

[Adding Vertical Markers](guides/markers.md)

### Weekend-Styling hinzufügen

Fügen Sie Ihrem `index.html` CSS-Stile hinzu:

```html
<style>
  html, body {
    margin: 0;
    padding: 0;
    height: 100%;
    width: 100%;
  }
  #gantt_here {
    width: 100%;
    height: 100%;
  }
  
  /* Weekend-Styling */
  .weekend {
     background: var(--dhx-gantt-base-colors-background-alt);
  }
  
  [data-column-name='constraint_type'] .gantt_tree_content {
		padding: 1px;
		line-height: 17px;
		white-space: normal;
		text-align: right;
		box-sizing: border-box;
	}

	.gantt_grid_editor_placeholder[data-column-name='constraint_type'] select {
		line-height: 20px;
		white-space: normal;
	}
</style>
```

### Aktualisieren Sie die Scripts im package.json

Aktualisieren Sie Ihre `package.json`-Skripte, damit sie mit Vite arbeiten:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "server": "nodemon server.js"
  }
}
```

---

## Schritt 4: Migration testen

### Entwicklungsmodus

Für die Entwicklung benötigen Sie zwei Prozesse:

Terminal 1 – Backend (Express):
```bash
npm run server
```
Dieses startet den API-Server unter `http://localhost:1337`

Terminal 2 – Frontend (Vite):
```bash
npm run dev
```
Dies startet den Vite-Entwicklungsserver unter `http://localhost:5173`

Öffnen Sie Ihren Browser und navigieren Sie zu `http://localhost:5173`. Vite leitet API-Anfragen automatisch an das Express-Backend weiter.

Sie sollten das DHTMLX Gantt-Diagramm mit Ihren Daten aus der Datenbank laden sehen:

![Gantt with data loaded](/img/migrating/bryntum/gantt-data-loaded.png)

### Produktionsmodus

Für die Produktion bauen Sie zunächst das Frontend:

```bash
npm run build
```

Dies erstellt ein optimiertes Bundle im Ordner `dist/`. Aktualisieren Sie anschließend Ihr `server.js`, sodass die gebauten Dateien bedient werden:

```javascript
import path from 'path';

// In server.js, add this for production
const __dirname = import.meta.dirname;

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'dist')));
}
```

Nun können Sie nur das Backend ausführen:
```bash
npm run server
```

Und die Anwendung unter `http://localhost:1337` aufrufen

## Nächste Schritte

- Erkunden Sie die [DHTMLX Gantt-Dokumentation](/) für fortgeschrittene Funktionen
- Prüfen Sie die [API-Referenz](/api/api-overview/) für Anpassungsoptionen
- Werfen Sie einen Blick auf [DHTMLX Gantt-Beispiele](https://docs.dhtmlx.com/gantt/samples/) für Implementierungsbeispiele
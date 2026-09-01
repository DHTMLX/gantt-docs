--- 
title: "Migration von DevExpress Gantt zu DHTMLX Gantt" 
sidebar_label: "Von DevExpress" 
--- 

:::note
Der vollständige Demo-Quellcode ist auf GitHub verfügbar: [https://github.com/DHTMLX/gantt-migrating-from-devexpress](https://github.com/DHTMLX/gantt-migrating-from-devexpress).
:::  

# Migration von DevExpress Gantt zu DHTMLX Gantt

## Einführung

Diese Anleitung führt Sie durch den Prozess der Migration einer bestehenden Anwendung von [DevExpress Gantt](https://js.devexpress.com/React/Documentation/Guide/UI_Components/Gantt/Overview/) zu [DHTMLX Gantt](https://dhtmlx.com/docs/products/dhtmlxGantt/). Wir behandeln alle erforderlichen Schritte, einschließlich Änderungen am Datenbankschema, Modifikationen der serverseitigen API und Aktualisierungen des Client-Codes.

## Voraussetzungen

Bevor Sie mit der Migration beginnen, stellen Sie sicher, dass Sie:

- Eine bestehende, funktionsfähige Anwendung mit DevExpress Gantt
- Node.js (>= 20.0.0) installiert
- MySQL-Datenbank mit DevExpress-Datenstruktur
- Grundkenntnisse in Express.js, React und TypeScript

## Schritt 1: Datenbank-Migration

### Verständnis des DevExpress-Schemas

Wenn Sie dem Demo-Setup von DevExpress gefolgt sind, sollten Sie zwei Tabellen haben: `devexpress_tasks` und `devexpress_dependencies`.

Die Struktur der Tabelle `devexpress_tasks`:

![DevExpress tasks table](/img/migrating/devexpress/devexpress-tasks-table.png)

Die Struktur der Tabelle `devexpress_dependencies`:

![DevExpress links table](/img/migrating/devexpress/devexpress-links-table.png)

Diese Zwei-Tabellen-Struktur ähnelt bereits dem Ansatz von DHTMLX, wodurch die Migration unkompliziert wird.

### Erstellung der DHTMLX-Tabellen

Erstellen Sie zwei neue Tabellen, die mit DHTMLX Gantt kompatibel sind:

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

Hinweis: DHTMLX Gantt berechnet automatisch `duration` basierend auf `start_date` und `end_date`.

### Bestehende Daten migrieren

Migrieren Sie nun Ihre bestehenden DevExpress-Daten in die neuen DHTMLX-Tabellen.

**Aufgaben migrieren:**  

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

**Verknüpfungen (Abhängigkeiten) migrieren:**  

DevExpress speichert Abhängigkeiten bereits in einem strukturierten Format in der Tabelle `devexpress_dependencies`, was die Migration erleichtert:

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

Sie können überprüfen, dass die Daten korrekt migriert wurden, indem Sie die folgenden Befehle ausführen:

```sql
SELECT * FROM gantt_tasks;
SELECT * FROM gantt_links;
```

Sie sollten alle Aufgaben und Verknüpfungen mit den korrekten Feldzuordnungen übertragen sehen.

### Zuordnung DevExpress-Felder zu DHTMLX Gantt

| DevExpress-Feld | DHTMLX-Feld | Hinweise                                                                                |
| ---------------- | ------------ | --------------------------------------------------------------------------------------- |
| `id`             | `id`         | Aufgaben-ID                                                                           |
| `title`          | `text`       | Aufgabentitel                                                                          |
| `start`          | `start_date` | Aufgabenstartdatum und -uhrzeit                                                       |
| `end`            | `end_date`   | Aufgabenenddatum und -uhrzeit                                                         |
| `progress`       | `progress`   | DevExpress: 0-100 (Ganzzahl), DHTMLX: 0-1 (Fließkomma). Während der Migration durch 100 teilen |
| `parentId`       | `parent`     | Übergeordnete Aufgaben-ID. NULL-Werte → 0 für Wurzelaufgaben                          |

Weitere Informationen zu Aufgaben-Eigenschaften: [Task Properties](guides/task-properties.md).

### Mapping DevExpress-Abhängigkeitsfelder zu DHTMLX-Verknüpfungen

| DevExpress-Feld | DHTMLX-Feld | Hinweise                                                                                          |
| ---------------- | ------------ | ------------------------------------------------------------------------------------------------- |
| `id`             | `id`         | Verknüpfungs-ID                                                                                    |
| `predecessorId`  | `source`     | ID der Aufgabe, von der die Abhängigkeit ausgeht                                                     |
| `successorId`    | `target`     | ID der Aufgabe, auf die die Abhängigkeit verweist                                                     |
| `type`           | `type`       | Abhängigkeitstyp. DevExpress verwendet Zahlen (0-3), DHTMLX verwendet standardmäßig Strings ("0"-"3") |

Weitere Informationen zu Verknüpfungseigenschaften: [Link Properties](guides/link-properties.md).

## Schritt 2: Backend-Migration (server.js)

### DevExpress-Endpunkte entfernen

Löschen Sie die folgenden DevExpress-spezifischen Endpunkte aus Ihrer `server.js`:

- `app.get('/api/tasks', ...)` - Endpunkt zum Laden von DevExpress-Aufgaben
- `app.post('/api/tasks', ...)` - Endpunkt zum Erstellen von Aufgaben
- `app.put('/api/tasks/:id', ...)` - Endpunkt zum Aktualisieren von Aufgaben
- `app.delete('/api/tasks/:id', ...)` - Endpunkt zum Löschen von Aufgaben
- `app.get('/api/dependencies', ...)` - Endpunkt zum Laden von DevExpress-Abhängigkeiten
- `app.post('/api/dependencies', ...)` - Endpunkt zum Erstellen von Abhängigkeiten
- `app.put('/api/dependencies/:id', ...)` - Endpunkt zum Aktualisieren von Abhängigkeiten
- `app.delete('/api/dependencies/:id', ...)` - Endpunkt zum Löschen von Abhängigkeiten

Entfernen Sie außerdem die CustomStore-bezogene Antwortformat-Verarbeitung.

### DHTMLX Gantt-Pakete installieren

DevExpress-Abhängigkeiten entfernen:

```bash
npm uninstall devextreme devextreme-react
```

Installieren Sie DHTMLX React Gantt gemäß der [Installationsanleitung](guides/installation.md).

Für dieses Tutorial verwenden wir die Testversion von DHTMLX React Gantt:

```bash
npm install @dhtmlx/trial-react-gantt
```

Installieren Sie eine Datum-Formatierungsbibliothek für die MySQL-DATETIME-Konvertierung:

```bash
npm install date-format-lite
```

### Data Loading Endpoint hinzufügen

Fügen Sie den GET-Endpunkt hinzu, um Daten im DHTMLX-Format zu laden. Importieren Sie die Bibliothek `date-format-lite` oben in Ihrer `server.js`:

```js
import dateFormat from 'date-format-lite';
```

Dann fügen Sie den Data-Loading-Endpunkt hinzu:

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

DevExpress gibt separate Arrays zurück, DHTMLX erwartet `{ data: [...], links: [...] }`.

### CRUD-Endpunkte für Tasks und Links hinzufügen

DHTMLX React Gantt verwendet einen benutzerdefinierten Save-Handler, um Daten mit dem Server zu synchronisieren. Jede Operation (create, update, delete) wird mit der passenden HTTP-Methode gesendet.

Fügen Sie Handler für Aufgaben-Operationen hinzu:

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

Fügen Sie Handler für Verknüpfungs- (Abhängigkeits-) Operationen hinzu:

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

### Hilfsfunktionen hinzufügen

Fügen Sie Hilfsfunktionen hinzu, um Daten zu verarbeiten und Antworten zu senden:

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

### Task-Daten bereinigen (XSS-Schutz)

Gantt-Diagramme rendern Freitextfelder wie den Task-Text, und HTML in diesem Text kann eine XSS-Vektor darstellen. Bereinigen Sie daher Benutzereingaben im Backend, bevor Sie sie speichern – säubern Sie Freitextfelder in der `getTask`-Hilfsfunktion:

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

Wenn Sie benutzerdefinierte Zell- oder Tooltip-Renderer hinzufügen, die rohes HTML ausgeben, maskieren Sie die Werte dort ebenfalls. Für die vollständige Sammlung von Empfehlungen – Richtlinien zur Anwendungen-Sicherheit (Content Security Policy) und Hinweise zu SQL-Injektion – siehe den Leitfaden [Application Security](guides/app-security.md).

---

## Schritt 3: Frontend-Migration

### DevExpress-Komponenten und -Dienste entfernen

Löschen Sie die CustomStore-Service-Datei (`src/services/dataService.ts`) – DHTMLX React Gantt verwendet CustomStore nicht.

Entfernen Sie außerdem DevExpress-CSS-Verknüpfungen aus `index.html`.

Wenn Sie DevExpress-CSS-Verknüpfungen in Ihrer `index.html` hinzugefügt haben, entfernen Sie sie:

```html
<!-- Entfernen Sie diese Zeilen -->
<link rel="stylesheet" type="text/css" href="https://cdn3.devexpress.com/jslib/25.2.4/css/dx.fluent.blue.light.css" />
<link rel="stylesheet" type="text/css" href="https://cdn3.devexpress.com/jslib/25.2.4/css/dx-gantt.min.css" />
```

DHTMLX React Gantt beinhaltet eigene Styles, die direkt in der Komponente importiert werden:

```typescript
import '@dhtmlx/trial-react-gantt/dist/react-gantt.css';
```

### Vite-Konfiguration aktualisieren

Aktualisieren Sie Ihre `vite.config.ts`, um API-Anfragen an den Backend-Server zu proxyen. Dies ist wichtig im Entwicklungsmodus:

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

### Update von package.json

Stellen Sie sicher, dass Ihre `package.json` die richtigen Abhängigkeiten enthält:

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

### Update von src/App.tsx

Ersetzen Sie Ihre DevExpress-Gantt-Komponente in `src/App.tsx` durch DHTMLX React Gantt:

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

### Anwendung ausführen

Für den Entwicklungsmodus müssen Sie zwei Prozesse starten:

Terminal 1 – Backend (Express):

```bash
npm run server
```

Damit wird der API-Server unter `http://localhost:1337` gestartet (oder der in Ihrer `.env` konfigurierten PORT).

Sie sollten sehen:

```
Server is running on port 1337
```

Terminal 2 – Frontend (Vite):

```bash
npm run dev
```

Damit wird der Vite-Entwicklungsserver unter `http://localhost:5173` gestartet. Öffnen Sie Ihren Browser und navigieren Sie zu `http://localhost:5173`. Vite leitet API-Anfragen automatisch an das Express-Backend weiter.

Sie sollten das DHTMLX Gantt-Diagramm mit Ihren Daten sehen, die aus der Datenbank geladen wurden:

![Gantt with data loaded](/img/migrating/devexpress/dhtmlx-gantt-data-loaded.png)

### Erkundung der DHTMLX Gantt-Funktionen

- [Dokumentation zu DHTMLX Gantt](/) 
- [API-Referenz](/api/api-overview/) 
- [React Gantt-Konfiguration](integrations/react/configuration-props.md) 
- [React Gantt-Integration](integrations/react.md)
---  
title: React Gantt mit Zustand  
sidebar_label: Zustand  
description: "Erfahren Sie, wie Sie Gantt-Daten mit einem leichten Zustand-Store verwalten, Selektoren mit der Komponente verbinden und Aktualisierungen über den save-Callback in einer vorhersehbaren, minimalen Boilerplate-Konfiguration verarbeiten."  
---  


# React Gantt - Zustand Tutorial

Dieses Tutorial führt Sie durch die Erstellung einer React TypeScript-Anwendung mit Vite, die Integration der DHTMLX React Gantt-Komponente und die Verwaltung des Zustands mit Zustand.

## Voraussetzungen

- Grundkenntnisse in React, TypeScript, Vite und Zustand  
- Empfehlenswert: lesen Sie [](integrations/react/state/state-management-basics.md), um den Datenbindungsmodus und den `data.save`-Callback zu verstehen, auf dem dieses Tutorial aufbaut.

## Schnelleinrichtung - Projekt erstellen

Bevor Sie beginnen, installieren Sie [Node.js](https://nodejs.org/en/).

Erstellen Sie ein Vite React + TypeScript-Projekt:

~~~bash  
npm create vite@latest react-gantt-zustand-demo -- --template react-ts  
cd react-gantt-zustand-demo  
~~~  

Nun installieren wir die benötigten Abhängigkeiten.

* Für **npm**: 

~~~bash
npm install zustand @mui/material @mui/icons-material @emotion/react @emotion/styled
~~~  

* Für **yarn**:

~~~bash
yarn add zustand @mui/material @mui/icons-material @emotion/react @emotion/styled
~~~  

Dann müssen wir das React Gantt-Paket installieren. 

### Installation von React Gantt

Installieren Sie React Gantt wie in der [Installationsanleitung für React Gantt](integrations/react/installation.md) beschrieben.

In diesem Tutorial verwenden wir das Evaluierungspaket:

~~~bash
npm install @dhtmlx/trial-react-gantt
~~~  

oder

~~~bash
yarn add @dhtmlx/trial-react-gantt
~~~  

Falls Sie bereits das Professional-Paket verwenden, ersetzen Sie `@dhtmlx/trial-react-gantt` durch `@dhx/react-gantt` in den Befehlen und Imports.

Nun können Sie den Dev-Server starten:

~~~bash
npm run dev 
~~~  

Sie sollten Ihr React-Projekt nun unter `http://localhost:5173` laufen haben.

:::note
Um Gantt den gesamten Raum des Bodies einzunehmen, müssen Sie die Standardstile aus der `App.css`-Datei im Ordner `src` entfernen und folgenden Stil hinzufügen:

~~~css  
#root { 
  margin: 0; 
  padding: 0; 
  height: 100%; 
  width: 100%; 
} 
~~~  
:::
  
## Einrichtung von Beispieldaten und Konfiguration

Erstellen Sie Beispieldaten für unser Gantt-Diagramm in `src/seed/Seed.ts`, die die initialen Daten enthalten:

~~~ts
import type { SerializedTask, Link, GanttConfig } from '@dhtmlx/trial-react-gantt';

export type ZoomLevel = 'day' | 'month' | 'year';

export const defaultZoomLevels: NonNullable<GanttConfig['zoom']> = { 
  current: 'day', 
  levels: [ 
  { name: 'day', scale_height: 27, min_column_width: 80, scales: [{ unit: 'day', step: 1, format: '%d %M' }] }, 
  { name: 'month', scale_height: 50, min_column_width: 120, scales: [{ unit: 'month', format: '%F, %Y' }, { unit: 'week', format: 'Week #%W' }] }, 
  { name: 'year', scale_height: 50, min_column_width: 30, scales: [{ unit: 'year', step: 1, format: '%Y' }] }, 
  ], 
};

export const seedTasks: SerializedTask[] = [ 
  { id: 1, text: 'Office itinerancy', type: 'project', start_date: new Date(2025, 3, 2).toISOString(), duration: 17, progress: 0.4, parent: 0, open: true }, 
  { id: 2, text: 'Office facing', type: 'project', start_date: new Date(2025, 3, 2).toISOString(), duration: 8, progress: 0.6, parent: 1, open: true }, 
  { id: 3, text: 'Furniture installation', type: 'project', start_date: new Date(2025, 3, 11).toISOString(), duration: 8, progress: 0.6, parent: 1, open: true }, 
  { id: 4, text: 'The employee relocation', type: 'project', start_date: new Date(2025, 3, 13).toISOString(), duration: 5, progress: 0.5, parent: 1, priority: 3, open: true }, 
  { id: 5, text: 'Interior office', type: 'task', start_date: new Date(2025, 3, 3).toISOString(), duration: 7, progress: 0.6, parent: 2, priority: 1 }, 
  { id: 6, text: 'Air conditioners check', type: 'task', start_date: new Date(2025, 3, 3).toISOString(), duration: 7, progress: 0.6, parent: 2, priority: 2 }, 
  { id: 7, text: 'Workplaces preparation', type: 'task', start_date: new Date(2025, 3, 12).toISOString(), duration: 8, progress: 0.6, parent: 3 }, 
  { id: 8, text: 'Preparing workplaces', type: 'task', start_date: new Date(2025, 3, 14).toISOString(), duration: 5, progress: 0.5, parent: 4, priority: 1 }, 
  { id: 9, text: 'Workplaces importation', type: 'task', start_date: new Date(2025, 3, 21).toISOString(), duration: 4, progress: 0.5, parent: 4 }, 
  { id: 10, text: 'Workplaces exportation', type: 'task', start_date: new Date(2025, 3, 27).toISOString(), duration: 3, progress: 0.5, parent: 4, priority: 2 }
];

export const seedLinks: Link[] = [ 
  { id: 2, source: 2, target: 3, type: '0' },
  { id: 3, source: 3, target: 4, type: '0' },
  { id: 7, source: 8, target: 9, type: '0' }
]; 
~~~  

## Bau der Kontrollelement-Leiste (Toolbar)

Nun fügen wir eine **Toolbar**-Komponente in `src/components/Toolbar.tsx` hinzu.

Diese Komponente gibt den Nutzern schnellen Zugriff auf gängige Gantt-Kontrollen, wie das Zoomen zwischen den Ansichten *day*, *month* und *year*, und das Ausführen von **undo/redo**-Aktionen.

~~~tsx
import Divider from '@mui/material/Divider';  
import ButtonGroup from '@mui/material/ButtonGroup';  
import UndoIcon from '@mui/icons-material/Undo';  
import RedoIcon from '@mui/icons-material/Redo';  
import Button from '@mui/material/Button';  
import type { ZoomLevel } from '../seed/Seed';

export interface ToolbarProps {  
  onUndo?: () => void;  
  onRedo?: () => void;  
  onZoom?: (level: ZoomLevel) => void;  
  currentZoom?: ZoomLevel;  
}

export default function Toolbar({ onUndo, onRedo, onZoom, currentZoom = 'month' }: ToolbarProps) {  
  return (  
    <div style={{ display: 'flex', justifyContent: 'start', padding: '10px 10px 20px', gap: '10px' }}>  
      <ButtonGroup>  
        <Button onClick={() => onUndo?.()}>  
          <UndoIcon />  
        </Button>  
        <Button onClick={() => onRedo?.()}>  
          <RedoIcon />  
        </Button>  
      </ButtonGroup>  
      <Divider orientation="vertical"></Divider>  
      <ButtonGroup>  
        <Button onClick={() => onZoom?.('day')} variant={currentZoom === 'day' ? 'contained' : 'outlined'}>  
          Day  
        </Button>  
        <Button onClick={() => onZoom?.('month')} variant={currentZoom === 'month' ? 'contained' : 'outlined'}>  
          Month  
        </Button>  
        <Button onClick={() => onZoom?.('year')} variant={currentZoom === 'year' ? 'contained' : 'outlined'}>  
          Year  
        </Button>  
      </ButtonGroup>  
    </div>  
  );  
}
~~~  

Wir verwenden Material-UI-Komponenten (Button, ButtonGroup, Divider und Symbole), um ein einfaches, sauberes Toolbar-Layout zu erstellen, das intuitive Kontrollen für das Gantt-Diagramm bereitstellt.

Die Toolbar akzeptiert die folgenden optionalen Props, die eine nahtlose Integration mit unserem Zustand-Store ermöglichen:

- `onUndo` und `onRedo` – Callback-Funktionen für Undo/Redo-Aktionen.  
- `onZoom` – Callback, der die Zoom-Stufe in unserem Zustand-Store aktualisiert, wenn Nutzer die Zoom-Schaltflächen klicken.  
- `currentZoom` – Kennzeichnet, welche Zoom-Stufe aktuell aktiv ist, damit die Toolbar die ausgewählte Schaltfläche hervorhebt.  
- Die Schaltflächen für "Day", "Month" und "Year" rufen `onZoom('day')`, `onZoom('month')` bzw. `onZoom('year')` auf. Die ausgewählte Zoom-Stufe verwendet `variant="contained"`, während die anderen `outlined` sind – das gibt eine klare visuelle Hinweis auf den aktuellen Zustand.

Die Toolbar verbindet sich direkt mit den Aktionen des Zustand-Stores:

- Zoom-Steuerung: Wenn der Benutzer "Day" anklickt, rufen wir `setZoom('day')` aus dem Zustand-Store auf, was die Konfiguration des Gantt-Diagramms automatisch aktualisiert und eine Neenderung auslöst  
- Die Undo-Schaltfläche löst die `undo()`-Methode des Stores aus, um zu vorherigen Zuständen zurückzukehren  
- Die Redo-Schaltfläche ruft `redo()` auf, um Änderungen erneut anzuwenden  
- Alle Änderungen am Zustand (Aufgabenbearbeitung, -löschung, Zoom-Anpassungen usw.) werden in unserem benutzerdefinierten Verlaufssystem verfolgt und können nahtlos rückgängig gemacht oder erneut angewendet werden  

## Erstellen der Haupt-Gantt-Komponente

Beginnen wir mit dem Aufbau unserer Hauptkomponente, die das Gantt-Diagramm hostet. Erstellen Sie `src/components/GanttComponent.tsx`.

Zuerst importieren wir `useEffect`, `useMemo` und `useRef` aus React, die Hauptkomponente `ReactGantt` und Typen aus dem Gantt-Paket, unsere benutzerdefinierte `Toolbar`-Komponente und den `useGanttStore`-Hook aus dem Zustand-Store:

~~~tsx
import { useEffect, useMemo, useRef } from 'react';  
import ReactGantt, { ReactGanttProps, Link, ReactGanttRef, SerializedTask } from '@dhtmlx/trial-react-gantt';  
import '@dhtmlx/trial-react-gantt/dist/react-gantt.css';

import Toolbar from './Toolbar';
import { useGanttStore } from '../store';
~~~  

Jetzt richten wir die Komponente ein und verbinden sie mit unserem Zustand-Store:

~~~tsx
export default function DemoZustand() {  
  const ganttRef = useRef<ReactGanttRef>(null);

  const { tasks, links, config, setZoom, addTask, upsertTask, deleteTask, addLink, upsertLink, deleteLink, undo, redo } = useGanttStore();

  useEffect(() => {  
    document.title = 'DHTMLX React Gantt | Zustand';  
  }, []);
~~~  

- `ganttRef` bietet direkten Zugriff auf die Gantt-Instanz für imperative Operationen  
- Wir extrahieren Status und Aktionen direkt aus unserem Zustand-Store in einer einzigen Destrukturierung  
- `useEffect` setzt den Dokumenttitel, wenn die Komponente gemountet wird  

Konfigurieren wir nun die Templates des Gantt-Diagramms, die die Datumsformatierung und -parsing für eine konsistente Datenverarbeitung definieren:

:::note
Seit v9.1.3 erkennt Gantt automatisch ISO-Datumstrings, und diese Template-Überschreibungen sind nicht mehr nötig. Sie sind hier zur Kompatibilität mit früheren Gantt-Versionen gezeigt. Siehe [Loading dates in ISO format](guides/loading.md#loading-dates-in-iso-format).
:::

~~~ts
const templates: ReactGanttProps['templates'] = useMemo(
  () => ({
    format_date: (d) => d.toISOString(),
    parse_date: (s) => new Date(s),
  }),
  []
);
~~~  

Der wichtigste Teil – die Verbindung von Gantt-Datenänderungen mit unserem Zustand-Store:

~~~tsx
const data: ReactGanttProps['data'] = useMemo(  
  () => ({  
    save: (entity, action, item, id) => {  
      if (entity === 'task') {  
        const task = item as SerializedTask;  
        if (action === 'create') return addTask(task);  
        else if (action === 'update') upsertTask(task);  
        else if (action === 'delete') deleteTask(id);  
      } else if (entity === 'link') {  
        const link = item as Link;  
        if (action === 'create') return addLink(link);  
        else if (action === 'update') upsertLink(link);  
        else if (action === 'delete') deleteLink(id);  
      }  
    },  
  }),  
  [addTask, addLink, upsertTask, upsertLink, deleteTask, deleteLink]  
);
~~~  

- Der `data.save` Callback behandelt alle Datenänderungen aus dem Gantt-Diagramm  
- Er leitet verschiedene Operationen (Create, Update, Delete) an geeignete Store-Aktionen weiter  
- Das Abhängigkeits-Array sorgt dafür, dass der Callback aktualisiert wird, wenn sich Store-Aktionen ändern  

Wenn Sie eine detailliertere Erklärung zu diesem Callback benötigen, lesen Sie [Handling changes with data.save](integrations/react/state/state-management-basics.md#handlingchangeswithdatasave) im Guide Grundlagen.

Schließlich rendern wir die komplette Komponente:

~~~tsx
return (  
  <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>  
    <Toolbar onUndo={undo} onRedo={redo} currentZoom={config.zoom.current} onZoom={setZoom} />  
    <ReactGantt ref={ganttRef} tasks={tasks} links={links} config={config} templates={templates} data={data} />  
  </div>  
);  
~~~  

- Die `Toolbar` erhält Handler für Undo/Redo- und Zoom-Kontrollen  
- Die `ReactGantt`-Komponente erhält alle Daten, Konfigurationen und Callback-Funktionen

Aktualisieren Sie nun Ihre `src/App.tsx`, um unsere Gantt-Komponente zu verwenden:

~~~tsx
import './App.css';  
import GanttComponent from './components/GanttComponent';

function App() {  
  return (  
    <div style={{ height: '100vh', width: '95vw' }}>  
      <GanttComponent />  
    </div>  
  );  
}

export default App;
~~~  

## Einrichtung des Zustand-Stores

Nun erstellen wir unsere Zustandsverwaltung mit Zustand. Erstellen Sie `src/store.ts`:

~~~ts
import { create } from 'zustand';  
import type { Link, GanttConfig, SerializedTask } from '@dhtmlx/trial-react-gantt';  
import { seedTasks, seedLinks, defaultZoomLevels, type ZoomLevel } from './seed/Seed';

type Snapshot = { tasks: SerializedTask[]; links: Link[]; config: GanttConfig };  
type State = {  
  tasks: SerializedTask[];  
  links: Link[];  
  config: GanttConfig;  
  past: Snapshot[];  
  future: Snapshot[];  
  maxHistory: number;  
  recordHistory: () => void;  
  undo: () => void;  
  redo: () => void;

  setZoom: (level: ZoomLevel) => void;  
  addTask: (task: SerializedTask) => SerializedTask;  
  upsertTask: (task: SerializedTask) => void;  
  deleteTask: (id: string | number) => void;  
  addLink: (l: Link) => Link;  
  upsertLink: (l: Link) => void;  
  deleteLink: (id: string | number) => void;  
};  
~~~  

Hier deklarieren wir:

- **tasks**, **links** und **config** – die zentrale Gantt-Datenhaltung des Stores.  
- **past** und **future** – Arrays für **Undo/Redo-Historie**.  
- **recordHistory()** – Hilfsfunktion zum Erstellen von Snapshots vor jeder Änderung.  
- **setZoom**, **addTask**, **upsertTask**, **deleteTask** etc. – Zustand-Änderungsaktionen für Tasks und Links.

Nun implementieren wir die Store-Aktionen, die Zustandsaktualisierungen handhaben:

~~~ts
export const useGanttStore = create<State>((set, get) => ({  
  tasks: seedTasks,  
  links: seedLinks,  
  config: { zoom: defaultZoomLevels },

  past: [],  
  future: [],  
  maxHistory: 50,

  recordHistory: () => {  
    const { tasks, links, config, past, maxHistory } = get();  
    const snapshot = {  
      tasks: JSON.parse(JSON.stringify(tasks)),  
      links: JSON.parse(JSON.stringify(links)),  
      config: JSON.parse(JSON.stringify(config)),  
    };  
    set({  
      past: [...past.slice(-maxHistory + 1), snapshot],  
      future: [],  
    });  
  },

  undo: () => {  
    const { past, future, tasks, links, config } = get();  
    if (past.length === 0) return;  
    const previous = past[past.length - 1];  
    set({  
      tasks: previous.tasks,  
      links: previous.links,  
      past: past.slice(0, -1),  
      future: [{ tasks, links, config }, ...future],  
      config: previous.config,  
    });  
  },

  redo: () => {  
    const { past, future, tasks, links, config } = get();  
    if (future.length === 0) return;  
    const next = future[0];  
    set({  
      tasks: next.tasks,  
      links: next.links,  
      past: [...past, { tasks, links, config }],  
      config: next.config,  
      future: future.slice(1),  
    });  
  },

  setZoom: (level) => {  
    get().recordHistory();  
    set({  
      config: { ...get().config, zoom: { ...get().config.zoom, current: level } },  
    });  
  },

  addTask: (task) => {  
    get().recordHistory();  
    const newTask = { ...task, id: `DB_ID:${task.id}` };  
    set({ tasks: [...get().tasks, newTask] });  
    return newTask;  
  },

  upsertTask: (task) => {  
    get().recordHistory();  
    const tasks = get().tasks;  
    const index = tasks.findIndex((x) => String(x.id) === String(task.id));  
    if (index !== -1) {  
      set({  
        tasks: [...tasks.slice(0, index), { ...tasks[index], ...task }, ...tasks.slice(index + 1)],  
      });  
    }  
  },

  deleteTask: (id) => {  
    get().recordHistory();  
    set({ tasks: get().tasks.filter((t) => String(t.id) !== String(id)) });  
  },

  addLink: (l) => {  
    get().recordHistory();  
    const newLink = { ...l, id: `DB_ID:${l.id}` };  
    set({ links: [...get().links, newLink] });  
    return newLink;  
  },

  upsertLink: (l) => {  
    get().recordHistory();  
    const links = get().links;  
    const index = links.findIndex((x) => String(x.id) === String(l.id));  
    if (index !== -1) {  
      set({  
        links: [...links.slice(0, index), { ...links[index], ...l }, ...links.slice(index + 1)],  
      });  
    }  
  },

  deleteLink: (id) => {  
    get().recordHistory();  
    set({ links: get().links.filter((l) => String(l.id) !== String(id)) });  
  },  
}));  
~~~  

- `set` führt direkte Zustandsaktualisierungen aus  
- `get` ermöglicht den Zugriff auf aktuelle Zustandwerte  
- `setZoom` aktualisiert die Zoom-Stufe der Gantt-Konfiguration  
- `addTask` erstellt neue Tasks mit simulierten Datenbank-IDs  
- `upsertTask` behandelt Aktualisierungen eines bestehenden Tasks anhand der ID  
- `deleteTask` entfernt Tasks anhand der ID   
- Für Link-Operationen gelten ähnliche Muster

### Verlauf-Verwaltung (Undo/Redo)

Um Undo- und Redo-Funktionalität bereitzustellen, definieren wir `recordHistory`, `undo` und `redo`:

* **recordHistory()** erstellt eine tiefe Kopie („Snapshot“) des aktuellen Gantt-Zustands vor jeder Änderung.  
* **undo()** kehrt zum letzten Snapshot in `past` zurück, während der aktuelle Zustand in `future` gespeichert wird.  
* **redo()** wendet den nächsten verfügbaren Snapshot aus `future` wieder im Store an.

Diese Methoden ermöglichen es dem Benutzer, rückwärts und vorwärts durch kürzliche Gantt-Zustandsänderungen zu navigieren.

Jede Änderung, die den Zustand modifiziert, ruft `recordHistory()` **vor** der Änderung auf, um sicherzustellen, dass jeder Zustandstransition gespeichert und umkehrbar ist.

## Anwendung ausführen

Zum Schluss können wir den Dev-Server starten und unsere Anwendung testen:

~~~bash
npm run dev
~~~  

oder:
~~~bash
yarn dev 
~~~ 

## Zusammenfassung

In diesem Tutorial haben Sie:

- ein Vite + React-Projekt erstellt  
- React Gantt hinzugefügt und mit einem Zustand-Store verbunden  
- Undo/Redo basierend auf Snapshots im Store implementiert, unter Verwendung von `past`/`future`-Historienarrays  
- Die Zoom-Konfiguration, Aufgaben und Links vollständig aus dem Zustand von Zustand gesteuert  
- Den `data.save`-Callback verwendet, damit jede Änderung im Gantt-Diagramm in eine Store-Aktion umgewandelt wird.

Dadurch bleibt die Gantt-Komponente vollständig deklarativ, während sämtliche Mutationslogik und Verlaufshandhabung im Zustand-Store gekapselt sind.

## GitHub Demo-Repository

Ein vollständiges funktionsfähiges Projekt, das dieser Anleitung folgt, ist [auf GitHub verfügbar](https://github.com/dhtmlx/react-gantt-zustand-starter).

## Was kommt als Nächstes

Um weiterzugehen:

- Repräsentieren Sie die Konzepte hinter diesem Beispiel erneut in [](integrations/react/state/state-management-basics.md)
- Kombinieren Sie zustandsgesteuerte Zustände mit fortgeschrittener Konfiguration und Templating in der [React Gantt-Übersicht](integrations/react/overview.md)
- Erproben Sie dasselbe Muster mit anderen State-Management-Lösungen:
  - [React Gantt mit Redux Toolkit verwenden](integrations/react/state/redux-toolkit.md)
  - [React Gantt mit MobX verwenden](integrations/react/state/mobx.md)
  - [React Gantt mit XState verwenden](integrations/react/state/xstate.md)
  - [React Gantt mit Jotai verwenden](integrations/react/state/jotai.md)
  - [React Gantt mit Valtio verwenden](integrations/react/state/valtio.md)
---
title: React Gantt mit Valtio verwenden
sidebar_label: Valtio
description: "Anleitung zur Integration von React Gantt mit dem Valtio-Proxy-Zustand. Zeigt, wie man reaktive Snapshots der Komponente zugänglich macht und Updates aus dem save-Callback in einem idiomatischen Valtio-Workflow anwendet."
---


# React Gantt - Valtio Tutorial

Dieses Tutorial führt Sie durch die Erstellung einer React-TypeScript-Anwendung, die Integration der DHTMLX React Gantt-Komponente und die Verwaltung des Zustands mit Valtio.

## Voraussetzungen

- Grundkenntnisse in React, TypeScript, Vite und Valtio
- Empfohlen: Lesen Sie [](integrations/react/state/state-management-basics.md) um das Datenbindung-Modell und den `data.save`-Callback zu verstehen, auf dem dieses Tutorial aufbaut.

## Schnellstart – Projekt erstellen

Bevor Sie beginnen, installieren Sie Node.js.

Erstellen Sie ein Vite React + TypeScript-Projekt:

~~~bash  
npm create vite@latest react-gantt-valtio-demo -- --template react-ts  
cd react-gantt-valtio-demo  
~~~

Nun installieren wir die benötigten Abhängigkeiten.

* Für **npm**: 

~~~bash
npm install valtio @mui/material @mui/icons-material @emotion/react @emotion/styled
~~~

* Für **yarn**:

~~~bash
yarn add valtio @mui/material @mui/icons-material @emotion/react @emotion/styled
~~~

Dann müssen wir das React Gantt-Paket installieren. 

### Installation von React Gantt

Installieren Sie React Gantt wie in der [React Gantt Installationsanleitung](integrations/react/installation.md) beschrieben.

In diesem Tutorial verwenden wir das Evaluierungspaket:

~~~bash
npm install @dhtmlx/trial-react-gantt
~~~

oder

~~~bash
yarn add @dhtmlx/trial-react-gantt
~~~

Wenn Sie bereits das Professional-Paket verwenden, ersetzen Sie `@dhtmlx/trial-react-gantt` durch `@dhx/react-gantt` in den Befehlen und Importen.


Nun können Sie den Entwicklungsserver starten:

~~~bash
npm run dev 
~~~

Sie sollten nun Ihr React-Projekt unter `http://localhost:5173` laufen sehen.

:::note
Um Gantt den gesamten Platz des Bodys auszufüllen, müssen Sie die Standardstile aus der Datei `App.css` im Ordner `src` entfernen und Folgendes hinzufügen:  

~~~css  
#root { 
  margin: 0; 
  padding: 0; 
  height: 100%; 
  width: 100%; 
} 
~~~
:::

## Einrichtung von Beispiel-Daten und Konfiguration

Erstellen Sie Beispieldaten für unser Gantt-Diagramm in `src/seed/Seed.ts`, die die anfänglichen Daten enthalten:

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

## Aufbau der Toolbar-Komponente

Lassen Sie uns nun eine **Toolbar**-Komponente in `src/components/Toolbar.tsx` hinzufügen.

Diese Komponente bietet Benutzern schnellen Zugriff auf gängige Gantt-Steuerungen, wie das Zoomen zwischen Tag-, Monat- und Jahresansicht sowie das Ausführen von **Rückgängig/Wiederherstellen**-Aktionen.

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

Wir verwenden Material-UI-Komponenten (Button, ButtonGroup, Divider und Icons), um eine einfache, klare Toolbar-Anordnung zu erstellen, die intuitive Steuerelemente für das Gantt-Diagramm bietet.

Die Toolbar akzeptiert die folgenden optionalen Props, die eine einfache Anbindung an unseren Valtio-Store ermöglichen:

- `onUndo` und `onRedo` - Callback-Funktionen, die die Undo/Redo-Logik in den Valtio-Aktionen auslösen.
- `onZoom` - ein Callback, der den Zoom-Level aktualisiert, wenn Benutzer die Zoom-Tasten drücken
- `currentZoom` - gibt an, welcher Zoom-Level derzeit aktiv ist, damit die Toolbar die ausgewählte Schaltfläche hervorheben kann

Die Tasten für "Day", "Month" und "Year" rufen `onZoom('day')`, `onZoom('month')` bzw. `onZoom('year')` auf. Der aktuell ausgewählte Zoom-Level-Button verwendet `variant="contained"`, während die anderen `outlined` sind, was eine klare visuelle Anzeige des aktuellen Zustands ermöglicht. 

Im vollständigen Beispiel übergeben wir `actions.undo`, `actions.redo` und `actions.setZoom` von unserem Valtio-Store in diese Props, damit die Toolbar die Historie und den Zoom steuern kann, ohne Implementierungsdetails des Stores zu kennen.

## Erstellung der Haupt-Gantt-Komponente

Lassen Sie uns unsere Hauptkomponente erstellen, die das Gantt-Diagramm mit Valtio für das State-Management beherbergt. Erstellen Sie `src/components/GanttComponent.tsx`.

Für das State-Management verwenden wir Valtios proxy-basierten reaktiven Store, der eine automatische Snapshot-Verfolgung bietet:

~~~tsx
import { useEffect, useMemo } from 'react';  
import ReactGantt, { type ReactGanttProps, type Link, type SerializedTask } from '@dhtmlx/trial-react-gantt';  
import '@dhtmlx/trial-react-gantt/dist/react-gantt.css';  
import { useSnapshot } from 'valtio';  
import { ganttState, actions } from '../store';

import Toolbar from './Toolbar';
~~~

`useSnapshot` verbindet unsere Komponente mit dem Valtio-Proxy-Zustand und rendert automatisch neu, sobald sich der Zustand ändert.

Nun richten wir die Komponente ein und verbinden sie mit unserem Valtio-Store:

~~~tsx
export default function DemoValtio() {  
  const snap = useSnapshot(ganttState);  
  const { tasks, links, config } = snap;  
  const { addTask, updateTask, deleteTask, addLink, updateLink, deleteLink, undo, redo, setZoom } = actions;

  useEffect(() => {  
    document.title = 'DHTMLX React Gantt | Valtio';  
  }, []);
}
~~~

- `useSnapshot` liest den reaktiven Zustand aus dem Valtio-Proxy  
- `actions` enthält alle Operationen, die den Zustand ändern (addTask, updateTask, undo, redo usw.)  
- `useEffect` setzt den Dokumenttitel beim Mounten

Konfigurieren wir nun die Templates des Gantt-Diagramms, die das Datums-Formatting und Parsing für eine konsistente Datenverarbeitung definieren:

:::note
Seit v9.1.3 erkennt Gantt automatisch ISO-DatumStrings und diese Template-Overrides sind nicht länger erforderlich. Sie werden hier zur Kompatibilität mit älteren Gantt-Versionen angezeigt. Siehe [Loading dates in ISO format](guides/loading.md#loading-dates-in-iso-format).
:::

~~~tsx
const templates: ReactGanttProps['templates'] = useMemo(
  () => ({
    format_date: (date: Date) => date.toISOString(),
    parse_date: (date: string) => new Date(date),
  }),
  []
);
~~~

Der kritischste Teil besteht darin, Gantt-Datenänderungen mit unserem Valtio-gestützten Zustand zu verbinden:

~~~tsx
const data: ReactGanttProps['data'] = useMemo(  
  () => ({  
    save: (entity, action, payload, id) => {  
      if (entity === 'task') {  
        const task = payload as SerializedTask;  
        if (action === 'create') return addTask(task);  
        else if (action === 'update') updateTask(task);  
        else if (action === 'delete') deleteTask(id);  
      } else if (entity === 'link') {  
        const link = payload as Link;  
        if (action === 'create') return addLink(link);  
        else if (action === 'update') updateLink(link);  
        else if (action === 'delete') deleteLink(id);  
      }  
    },  
  }),  
  [addTask, updateTask, deleteTask, addLink, updateLink, deleteLink]  
);
~~~

- Der `data.save`-Callback behandelt alle vom Gantt-Diagramm ausgelösten Datenänderungen  
- Jede Operation (Create, Update, Delete) wird an eine entsprechende Valtio-Aktion weitergegeben  
- Valtio aktualisiert den Proxy-Zustand intern, und `useSnapshot` sorgt dafür, dass die UI automatisch neu rendert

Wenn Sie eine tiefere Erklärung dieses Callbacks benötigen, sehen Sie sich [Handling changes with data.save](integrations/react/state/state-management-basics.md#handlingchangeswithdatasave) im Basics-Guide an.

Schließlich rendern wir die vollständige Komponente:

~~~tsx
return (  
  <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>  
    <Toolbar  
      onUndo={undo}  
      onRedo={redo}  
      currentZoom={config.zoom.current}  
      onZoom={setZoom}  
    />  
    <ReactGantt tasks={tasks} links={links} config={config} templates={templates} data={data} />  
  </div>  
);  
~~~

- Die `Toolbar` erhält Valtio-Aktionen für Undo/Redo und Zoom-Steuerung  
- Die Props `tasks`, `links` und `config` werden automatisch aktualisiert, sobald sich der Valtio-Zustand ändert

Und aktualisieren Sie dann Ihre `src/App.tsx`, um unsere Gantt-Komponente zu verwenden: 

~~~tsx
import './App.css';  
import GanttComponent from './components/GanttComponent';

function App() {  
  return (  
    <div style={{ width: '95vw', height: '100vh' }}>  
      <GanttComponent />  
    </div>  
  );  
}  
export default App;
~~~

## Erstellung des Valtio-Stores für das Zustandsmanagement

Erstellen Sie nun unsere Zustandsverwaltungslösung mit Valtio. Erstellen Sie `src/store.ts`:

~~~ts
import { proxy } from 'valtio';  
import type { Link, GanttConfig, SerializedTask } from '@dhtmlx/trial-react-gantt';  
import { seedTasks, seedLinks, defaultZoomLevels, type ZoomLevel } from './seed/Seed';

interface Snapshot {  
  tasks: SerializedTask[];  
  links: Link[];  
  config: GanttConfig;  
}
~~~

- Wir importieren Valtilos `proxy`-Funktion, um reaktive Zustand-Objekte zu erstellen  
- Definieren TypeScript-Schnittstellen für unseren Zustand und die History-Snapshots  
- Importieren Beispiel-Daten und Standard-Konfigurationen aus unserer Seed-Datei

Hier definieren wir das zentrale reaktive Zustand-Objekt mittels Valtilos Proxy:  

~~~ts
export const ganttState = proxy<{  
  tasks: SerializedTask[];  
  links: Link[];  
  config: GanttConfig;  
  past: Snapshot[];  
  future: Snapshot[];  
  maxHistory: number;  
}>({  
  tasks: seedTasks,  
  links: seedLinks,  
  config: { zoom: { ...defaultZoomLevels } },  
  past: [],  
  future: [],  
  maxHistory: 50,  
});
~~~

- `ganttState` ist ein reaktives Proxy-Objekt, das Änderungen am Zustand automatisch verfolgt  
- Der Zustand umfasst Aufgaben, Verknüpfungen, Konfiguration sowie Undo/Redo-Historie  
- Wir setzen eine maximale Historie, um Speicherprobleme zu vermeiden

Implementieren Sie die Undo/Redo-Funktionalität mit Valtio:  

~~~ts
const recordHistory = () => {  
  const { tasks, links, config, past, maxHistory } = ganttState;  
  const snapshot = {  
    tasks: JSON.parse(JSON.stringify(tasks)),  
    links: JSON.parse(JSON.stringify(links)),  
    config: JSON.parse(JSON.stringify(config)),  
  };  
  ganttState.past = [...past.slice(-maxHistory + 1), snapshot];  
  ganttState.future = [];  
};

export const actions = {  
  undo() {  
    const { past, future, tasks, links, config } = ganttState;  
    if (past.length === 0) return;  
    const previous = past[past.length - 1];  
    ganttState.tasks = previous.tasks;  
    ganttState.links = previous.links;  
    ganttState.config = previous.config;  
    ganttState.past = past.slice(0, -1);  
    ganttState.future = [{ tasks, links, config }, ...future];  
  },  
  redo() {  
    const { past, future, tasks, links, config } = ganttState;  
    if (future.length === 0) return;  
    const next = future[0];  
    ganttState.tasks = next.tasks;  
    ganttState.links = next.links;  
    ganttState.config = next.config;  
    ganttState.past = [...past, { tasks, links, config }];  
    ganttState.future = future.slice(1);  
  },
}
~~~

- `recordHistory` erstellt tiefe Klone des aktuellen Zustands für History-Snapshots  
- `undo` und `redo`-Aktionen verwalten Zustandstransitionen zwischen History-Stapeln  
- Die Updates von Valtio lösen automatisch die Reaktivität aus

Jetzt implementieren wir CRUD-Operationen für Aufgaben und Verknüpfungen:  

~~~ts
addTask(task: SerializedTask) {  
  recordHistory();  
  const newTask = { ...task, id: `DB_ID:${task.id}` };  
  ganttState.tasks = [...ganttState.tasks, newTask];  
  return newTask;  
},

updateTask(task: SerializedTask) {  
  recordHistory();  
  ganttState.tasks = ganttState.tasks.map((t) => (t.id === task.id ? { ...t, ...task } : t));  
},

deleteTask(id: string | number) {  
  recordHistory();  
  ganttState.tasks = ganttState.tasks.filter((t) => String(t.id) !== String(id));  
},

addLink(link: Link) {  
  recordHistory();  
  const newLink = { ...link, id: `DB_ID:${link.id}` };  
  ganttState.links = [...ganttState.links, newLink];  
  return newLink;  
},

updateLink(link: Link) {  
  recordHistory();  
  ganttState.links = ganttState.links.map((l) => (l.id === link.id ? { ...l, ...link } : l));  
},

deleteLink(id: string | number) {  
  recordHistory();  
  ganttState.links = ganttState.links.filter((l) => String(l.id) !== String(id));  
},  
~~~

- Jede Operation ruft `recordHistory` auf, bevor Änderungen vorgenommen werden  
- `addTask, addLink` erstellen neue Aufgaben und Verknüpfungen mit simulierten Datenbank-IDs  
- `updateTask/updateLink` und `deleteTask/deleteLink` verwenden Standard-Array-Methoden für Updates

`setZoom` mutiert direkt die Zoom-Konfiguration mit automatischer Reaktivität:

~~~ts
setZoom(level: ZoomLevel) {  
  recordHistory();  
  ganttState.config.zoom.current = level;  
},
~~~

## Anwendung ausführen

Schließlich können Sie den Entwicklungsserver starten und unsere Anwendung testen: 

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
- React Gantt installiert und an einen Valtio-Proxy-Store angebunden
- Aufgaben, Verknüpfungen und Zoom-Konfiguration in einem einzelnen `ganttState`-Proxy modelliert
- eine snapshot-basierte Undo/Redo-Funktionalität mit `past`/`future`-Stapeln und einem gemeinsamen `recordHistory`-Hilfsprogramm implementiert
- Zoom-Konfiguration, Aufgaben und Verknüpfungen vollständig aus dem Valtio-Zustand gesteuert
- den `data.save`-Callback verwendet, sodass jede Änderung im Gantt-Diagramm über Valtio-Aktionen erfolgt.

Dies hält die Gantt-Komponente vollständig deklarativ, während alle Mutationslogik und die Historienverwaltung innerhalb Ihres Valtio-Stores kapselt.

## GitHub-Demoprojekt

Ein vollständiges funktionierendes Projekt, das diesem Tutorial folgt, wird auf GitHub bereitgestellt: https://github.com/dhtmlx/react-gantt-valtio-starter

## Was kommt als Nächstes

Um weiterzugehen:

- Die Konzepte hinter diesem Beispiel erneut betrachten in [](integrations/react/state/state-management-basics.md)
- Store-getriebenen Zustand mit fortgeschrittener Konfiguration und Template-Optionen im [React Gantt Überblick](integrations/react/overview.md) kombinieren
- Dasselbe Muster mit anderen State-Manageren erkunden:
  - [Verwendung von React Gantt mit Redux Toolkit](integrations/react/state/redux-toolkit.md)
  - [Verwendung von React Gantt mit MobX](integrations/react/state/mobx.md)
  - [Verwendung von React Gantt mit XState](integrations/react/state/xstate.md)
  - [Verwendung von React Gantt mit Jotai](integrations/react/state/jotai.md)
  - [Verwendung von React Gantt mit Zustand](integrations/react/state/zustand.md)
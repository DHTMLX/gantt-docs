---
title: React Gantt mit Jotai
sidebar_label: Jotai
description: "Wie man Gantt-Aufgaben, Verknüpfungen und Ressourcen in Jotai-Atomen speichert und sie über den Save-Callback aktualisiert. Ein minimalistischer, flexibler Ansatz zur Zustandsverwaltung für React Gantt."
---


# React Gantt - Jotai Tutorial

Dieses Tutorial führt Sie durch die Erstellung einer React-TypeScript-Anwendung mit Vite, die Integration der DHTMLX React Gantt-Komponente und die Verwaltung des Zustands mit Jotai.

## Voraussetzungen

- Grundkenntnisse in React, TypeScript, Vite und Jotai
- Empfehlung: Lesen Sie [](integrations/react/state/state-management-basics.md), um den Datenbindungsmodus und den `data.save`-Callback zu verstehen, auf dem dieses Tutorial aufbaut. 

## Schnellstart - Projekt erstellen

Bevor Sie beginnen, installieren Sie Node.js [Link](https://nodejs.org/en/).

Erstellen Sie ein Vite React + TypeScript-Projekt:

~~~bash  
npm create vite@latest react-gantt-jotai-demo -- --template react-ts  
cd react-gantt-jotai-demo  
~~~

Nun installieren wir die benötigten Abhängigkeiten.

* Für **npm**: 

~~~bash
npm install jotai @mui/material @mui/icons-material @emotion/react @emotion/styled
~~~

* Für **yarn**:

~~~bash
yarn add jotai @mui/material @mui/icons-material @emotion/react @emotion/styled
~~~

Dann müssen wir das React Gantt-Paket installieren. 

### Installation von React Gantt

Installieren Sie React Gantt wie im [React Gantt Installationsleitfaden](integrations/react/installation.md) beschrieben.

In diesem Tutorial verwenden wir das Evaluierungspaket:

~~~bash
npm install @dhtmlx/trial-react-gantt
~~~

oder

~~~bash
yarn add @dhtmlx/trial-react-gantt
~~~

Wenn Sie bereits das Professional-Paket verwenden, ersetzen Sie `@dhtmlx/trial-react-gantt` durch `@dhx/react-gantt` in den Befehlen und Importen.


Nun starten Sie den Dev-Server:

~~~bash
npm run dev 
~~~

Sie sollten nun Ihr React-Projekt unter `http://localhost:5173` laufen sehen.

:::note
Um Gantt den gesamten verfügbaren Platz des Bodys nutzen zu lassen, entfernen Sie die Standardstile aus der Datei `App.css` im Ordner `src` und fügen Sie Folgendes hinzu:

~~~css  
#root { 
  margin: 0; 
  padding: 0; 
  height: 100%; 
  width: 100%; 
} 
~~~
:::

## Einrichten von Beispiel-Daten und Konfiguration

Erstellen Sie Beispiel-Daten für unser Gantt-Diagramm in `src/seed/Seed.ts`, die die ursprünglichen Daten enthalten:

~~~ts
import type { SerializedTask, Link, GanttConfig } from '@dhtmlx/trial-react-gantt';

export type ZoomLevel = 'day' | 'month' | 'year';

export const defaultZoomLevels: NonNullable<GanttConfig['zoom']> = { 
  current: 'day', 
  levels: [ 
  { name: 'day', scale_height: 27, min_column_width: 80, scales: [{ unit: 'day', step: 1, format: '%d %M' }] }, 
  { name: 'month', scale_height: 50, min_column_width: 120, scales: [{ unit: 'month', format: '%F, %Y' }, { unit: 'week', format: 'Woche #%W' }] }, 
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

## Aufbau der Control Toolbar-Komponente

Nun fügen wir eine **Toolbar**-Komponente in `src/components/Toolbar.tsx` hinzu.

Diese Komponente gibt Benutzern einen schnellen Zugriff auf gängige Gantt-Steuerungen, wie das Zoomen zwischen *Tag*, *Monat* und *Jahr*-Ansichten sowie das Durchführen von **Rückgängig/Wiederherstellen**-Aktionen.

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

Wir verwenden Material-UI-Komponenten (Button, ButtonGroup, Divider und Icons), um eine einfache, klare Toolbar-Anordnung zu erstellen, die intuitive Steuerelemente für das Gantt-Diagramm bereitstellt.

Die Toolbar akzeptiert die folgenden optionalen Props, die eine nahtlose Integration mit unserem Jotai-gestützten Store ermöglichen:

- `onUndo` und `onRedo` - Callback-Funktionen, die die Undo/Redo-Logik auslösen.  
- `onZoom` - ein Callback, der das Zoom-Level aktualisiert, wenn Benutzer die Zoom-Schaltflächen klicken.  
- `currentZoom` - gibt an, welches Zoom-Level aktuell aktiv ist und ermöglicht der Toolbar, den ausgewählten Button hervorzuheben. 

Die Buttons für "Day", "Month" und "Year" rufen `onZoom('day')`, `onZoom('month')` bzw. `onZoom('year')` auf. Der Button des aktuell ausgewählten Zoom-Levels verwendet `variant="contained"`, während die anderen `outlined` sind, was eine klare visuelle Hervorhebung des aktuellen Zustands bietet. 

Im vollständigen Beispiel sind diese Callbacks mit Jotai-Schreib-Only-Atomen verbunden, die Zoom- und Verlaufaktualisierungen handhaben.

## Erstellung der Haupt-Gantt-Komponente

Lassen Sie uns unsere Hauptkomponente bauen, die das Gantt-Diagramm hostet und Jotai für die Zustandsverwaltung verwendet. Erstellen Sie `src/components/GanttComponent.tsx`.

Zuerst importieren wir die erforderlichen React-Hooks für optimale Leistung, zusammen mit der Haupt-ReactGantt-Komponente und Typen von DHTMLX. Für die Zustandsverwaltung verwenden wir den atomaren Ansatz von Jotai:

~~~tsx
import { useEffect, useMemo, useRef } from 'react';  
import ReactGantt, {  
  type ReactGanttRef,  
  type ReactGanttProps,  
  type Link,  
  type SerializedTask,  
} from '@dhtmlx/trial-react-gantt';  
import '@dhtmlx/trial-react-gantt/dist/react-gantt.css';

import { useAtom, useSetAtom } from 'jotai';  
import {  
  ganttStateAtom,  
  undoAtom,  
  redoAtom,  
  setZoomAtom,  
  addTaskAtom,  
  updateTaskAtom,  
  deleteTaskAtom,  
  addLinkAtom,  
  updateLinkAtom,  
  deleteLinkAtom,  
} from '../store';

import Toolbar from './Toolbar';
~~~

`useAtom` und `useSetAtom` Hooks verbinden unsere Komponente mit dem atomaren Zustand.

Nun richten wir die Komponente ein und verbinden sie mit unseren Jotai-Atomen:

~~~tsx
export default function DemoJotai() {  
  const ganttRef = useRef<ReactGanttRef>(null);

  const [ganttState] = useAtom(ganttStateAtom);  
  const { tasks, links, config } = ganttState;  
  const setZoomLevel = useSetAtom(setZoomAtom);  
  const undo = useSetAtom(undoAtom);  
  const redo = useSetAtom(redoAtom);  
  const addTask = useSetAtom(addTaskAtom);  
  const updateTask = useSetAtom(updateTaskAtom);  
  const deleteTask = useSetAtom(deleteTaskAtom);  
  const addLink = useSetAtom(addLinkAtom);  
  const updateLink = useSetAtom(updateLinkAtom);  
  const deleteLink = useSetAtom(deleteLinkAtom);

  useEffect(() => {  
    document.title = 'DHTMLX React Gantt | Jotai';  
  }, []);
}
~~~

- `ganttRef` bietet direkten Zugriff auf die Gantt-Instanz für imperative Operationen  
- Wir verwenden `useAtom`, um den vollständigen Gantt-Zustand zu lesen, und `useSetAtom` für einzelne Aktionen  
- Jede Aktion (setZoom, undo, redo, etc.) ist ein separates Atom, das unabhängig verwendet werden kann  
- `useEffect` setzt den Dokumententitel, wenn die Komponente gemountet wird

Lassen Sie uns die Templates des Gantt-Diagramms konfigurieren, die Datumsformate und Parsen für konsistente Datenverarbeitung definieren:

:::note
Seit v9.1.3 erkennt Gantt automatisch ISO-Datumsstrings und diese Template-Überschreibungen sind nicht mehr erforderlich. Sie werden hier zur Kompatibilität mit älteren Gantt-Versionen gezeigt. Siehe [Loading dates in ISO format](guides/loading.md#loading-dates-in-iso-format).
:::

~~~tsx
const templates: ReactGanttProps['templates'] = useMemo(
  () => ({
    format_date: (date: Date) => date.toISOString(),
    parse_date: (value: string) => new Date(value),
  }),
  []
);
~~~

Der wichtigste Teil besteht darin, Gantt-Datenänderungen mit unseren Jotai-Atomen zu verbinden:

~~~tsx
const data: ReactGanttProps['data'] = useMemo(  
  () => ({  
    save: (entity, action, item, id) => {  
      if (entity === 'task') {  
        const task = item as SerializedTask;  
        if (action === 'create') return addTask(task);  
        else if (action === 'update') updateTask(task);  
        else if (action === 'delete') deleteTask(id);  
      } else if (entity === 'link') {  
        const link = item as Link;  
        if (action === 'create') return addLink(link);  
        else if (action === 'update') updateLink(link);  
        else if (action === 'delete') deleteLink(id);  
      }  
    },  
  }),  
  [addTask, addLink, updateTask, updateLink, deleteTask, deleteLink]  
);
~~~

- Der `data.save`-Callback verarbeitet alle Datenänderungen aus dem Gantt-Diagramm  
- Es leitet verschiedene Operationen (Erstellen, Aktualisieren, Löschen) an die entsprechenden Jotai-Atomsetter weiter  
- Jeder Atomsetter aktualisiert unabhängig seinen jeweiligen Zustand  
- Das Abhängigkeits-Array sorgt dafür, dass der Callback aktualisiert wird, wenn sich die Atomsetter ändern

Wenn Sie eine tiefere Erklärung zu diesem Callback benötigen, lesen Sie [Handling changes with data.save](integrations/react/state/state-management-basics.md#handlingchangeswithdatasave) im Basics-Leitfaden.

Schließlich rendern wir die komplette Komponente:

~~~tsx
return (  
  <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>  
    <Toolbar onUndo={undo} onRedo={redo} currentZoom={config.zoom.current} onZoom={setZoomLevel} />  
    <ReactGantt ref={ganttRef} tasks={tasks} links={links} config={config} templates={templates} data={data} />  
  </div>  
);  
~~~

- Die `Toolbar` erhält Setter-Atome für Undo/Redo und Zoom-Steuerungen  
- Jede Eigenschaft (`tasks`, `links`, `config`) aktualisiert sich automatisch, wenn der entsprechende Atomwert sich ändert

Und aktualisieren Sie anschließend Ihre `src/App.tsx`, um unsere Gantt-Komponente zu verwenden:

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

## Erstellen von Jotai-Atomen für das State-Management

Nun erstellen wir unsere State-Management-Lösung mit Jotai. Erstellen Sie `src/store.ts`:  

~~~tsx
import { atom, type Getter, type Setter } from 'jotai';  
import type { Link, GanttConfig, SerializedTask } from '@dhtmlx/trial-react-gantt';  
import { seedTasks, seedLinks, defaultZoomLevels } from './seed/Seed';  
import type { ZoomLevel } from './seed/Seed';

interface GanttState {  
  tasks: SerializedTask[];  
  links: Link[];  
  config: GanttConfig;  
}
~~~

Wir importieren Jotais `atom`, `Getter` und `Setter`-Typen und definieren TypeScript-Schnittstellen für unsere Gantt-Zustandsstruktur.

Definieren wir die Hauptzustands-Atome, die unsere Gantt-Daten halten:

~~~ts
export const ganttStateAtom = atom<GanttState>({  
  tasks: seedTasks,  
  links: seedLinks,  
  config: { zoom: defaultZoomLevels },  
});

const maxHistory = 50;

export const pastAtom = atom<GanttState[]>([]);  
export const futureAtom = atom<GanttState[]>([]);
~~~

- `ganttStateAtom` hält den aktuellen Gantt-Zustand einschließlich Aufgaben, Verknüpfungen und Konfiguration  
- `pastAtom` und `futureAtom` verwalten die Undo/Redo-Historienstapel  
- Wir setzen eine maximale History-Limitierung, um Speicherprobleme zu verhindern

Hier implementieren wir die Undo/Redo-Funktionalität mit Jotai's abgeleiteten Atomen:

~~~ts
const pushHistory = (get: Getter, set: Setter, state: GanttState) => {  
  const past = [...get(pastAtom), state];  
  if (past.length > maxHistory) past.shift();  
  set(pastAtom, past);  
  set(futureAtom, []);  
};

export const undoAtom = atom(null, (get, set) => {  
  const past = get(pastAtom);  
  if (past.length === 0) return;  
  const previous = past[past.length - 1];  
  set(pastAtom, past.slice(0, -1));  
  set(futureAtom, [get(ganttStateAtom), ...get(futureAtom)]);  
  set(ganttStateAtom, previous);  
});

export const redoAtom = atom(null, (get, set) => {  
  const future = get(futureAtom);  
  if (future.length === 0) return;  
  const next = future[0];  
  set(futureAtom, future.slice(1));  
  set(pastAtom, [...get(pastAtom), get(ganttStateAtom)]);  
  set(ganttStateAtom, next);  
});
~~~

- `pushHistory` erstellt einen Schnappschuss des aktuellen Zustands und aktualisiert den Verlauf
- `undoAtom` und `redoAtom` sind Schreib-Only-Atome, die Zustandsübergänge verwalten
- Die `get`- und `set`-Funktionen von Jotai ermöglichen den Zugriff auf andere Atome
- Jeder Verlaufsvorgang bewahrt die Integrität der vergangenen und zukünftigen Stapel

Lassen Sie uns CRUD-Operationen für Aufgaben mithilfe von Jotai-Atomen implementieren:  

~~~ts
export const addTaskAtom = atom(null, (get, set, task: SerializedTask) => {  
  pushHistory(get, set, get(ganttStateAtom));  
  set(ganttStateAtom, {  
    ...get(ganttStateAtom),  
    tasks: [...get(ganttStateAtom).tasks, { ...task, id: `DB_ID:${task.id}` }],  
  });  
  return { ...task, id: `DB_ID:${task.id}` };  
});

export const updateTaskAtom = atom(null, (get, set, task: SerializedTask) => {  
  pushHistory(get, set, get(ganttStateAtom));  
  set(ganttStateAtom, {  
    ...get(ganttStateAtom),  
    tasks: get(ganttStateAtom).tasks.map((t) => (String(t.id) === String(task.id) ? { ...t, ...task } : t)),  
  });  
});

export const deleteTaskAtom = atom(null, (get, set, id: string | number) => {  
  pushHistory(get, set, get(ganttStateAtom));  
  set(ganttStateAtom, {  
    ...get(ganttStateAtom),  
    tasks: get(ganttStateAtom).tasks.filter((task) => String(task.id) !== String(id)),  
  });  
});
~~~

- Jedes Atom folgt dem Muster `atom(null, (get, set, payload) => { ... })`, wodurch schreibgeschützte Atome entstehen  
- `addTaskAtom` erstellt neue Aufgaben mit simulierten Datenbank-IDs  
- `updateTaskAtom` aktualisiert vorhandene Aufgaben  
- `deleteTaskAtom` entfernt Aufgaben nach ID  
- Alle Operationen pushen vor Änderungen zum Verlauf  
- Dasselbe Muster verwenden wir, um CRUD-Operationen für Verknüpfungen zu implementieren

Implementieren der Zoom-Level-Konfiguration:

~~~ts
export const setZoomAtom = atom(null, (get, set, level: ZoomLevel) => {  
  pushHistory(get, set, get(ganttStateAtom));  
  set(ganttStateAtom, {  
    ...get(ganttStateAtom),  
    config: { ...get(ganttStateAtom).config, zoom: { ...get(ganttStateAtom).config.zoom, current: level } },  
  });  
});
~~~

`setZoomAtom` behandelt Zoom-Level-Änderungen mit vollständiger Verlaufverfolgung.

## Anwendung ausführen

Zum Schluss können wir den Entwicklerversion-Server starten und unsere Anwendung testen: 

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
- React Gantt hinzugefügt und mit einer Reihe von Jotai-Atomen verbunden  
- Aufgaben, Verknüpfungen und Zoom-Konfiguration in einem einzigen `ganttStateAtom` modelliert  
- eine Snapshot-basierte Undo/Redo-Funktionalität mit `pastAtom`/`futureAtom` und einem gemeinsamen `pushHistory`-Hilfsprogramm implementiert  
- die Zoom-Konfiguration, Aufgaben und Verknüpfungen vollständig aus dem Jotai-Zustand gesteuert  
- den `data.save`-Callback verwendet, sodass jede Änderung im Gantt-Diagramm auf Jotai-Schreib-Atome angewendet wird  

Dies hält die Gantt-Komponente vollständig deklarativ, während alle Mutationslogik und Verlaufshandhabung innerhalb Ihres Jotai-Stores gekapselt ist.

## GitHub Demo-Repository

Ein vollständiges funktionsfähiges Projekt, das dieser Anleitung folgt, wird [auf GitHub bereitgestellt](https://github.com/dhtmlx/react-gantt-jotai-starter).

## Was als Nächstes

Um weiterzugehen:

- Die Konzepte hinter diesem Beispiel erneut betrachten in [](integrations/react/state/state-management-basics.md)
- Jotai-getriebenen Zustand mit fortgeschrittener Konfiguration und Template-Verwendung im [React Gantt Überblick](integrations/react/overview.md) kombinieren
- Dasselbe Muster mit anderen Zustands-Manageren erkunden:
  - [React Gantt mit Redux Toolkit verwenden](integrations/react/state/redux-toolkit.md)
  - [React Gantt mit MobX verwenden](integrations/react/state/mobx.md)
  - [React Gantt mit XState verwenden](integrations/react/state/xstate.md)
  - [React Gantt mit Zustand verwenden](integrations/react/state/zustand.md)
  - [React Gantt mit Valtio verwenden](integrations/react/state/valtio.md)
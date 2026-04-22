---
title: React Gantt mit Redux Toolkit verwenden
sidebar_label: Redux Toolkit
description: "Schritt-für-Schritt-Anleitung zur Integration von React Gantt mit Redux Toolkit."
---

# React Gantt – Redux Toolkit Tutorial

Dieses Tutorial führt Sie durch die Erstellung einer React-TypeScript-Anwendung mit Vite, die Integration der DHTMLX React Gantt-Komponente und die Verwaltung des Zustands mit Redux Toolkit.

## Voraussetzungen

- Grundkenntnisse in React, TypeScript und Redux
- Empfohlen: siehe [](integrations/react/state/state-management-basics.md), um das Datenbindungsmodell und den `data.save` Callback zu verstehen, auf dem dieses Tutorial aufbaut.

## Schnellstart – Projekt erstellen

Bevor Sie beginnen, installieren Sie Node.js.

Erstellen Sie ein Vite React + TypeScript-Projekt:

~~~bash  
npm create vite@latest react-gantt-redux-demo -- --template react-ts  
cd react-gantt-redux-demo  
~~~

Nun installieren wir die benötigten Abhängigkeiten.

* Für **npm**: 

~~~bash
npm install @reduxjs/toolkit react-redux @mui/material @mui/icons-material @emotion/react @emotion/styled
~~~

* Für **yarn**:

~~~bash
yarn add @reduxjs/toolkit react-redux @mui/material @mui/icons-material @emotion/react @emotion/styled
~~~

Dann müssen wir das React Gantt-Paket installieren. 

### Installation von React Gantt

Installieren Sie React Gantt wie im [React Gantt-Installationsleitfaden](integrations/react/installation.md) beschrieben.

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

Sie sollten jetzt Ihr React-Projekt unter `http://localhost:5173` laufen sehen.

:::note
Um Gantt den gesamten Raum des Bodys nutzen zu lassen, müssen Sie die Standard-Stile aus der `App.css`-Datei im `src`-Ordner entfernen und Folgendes hinzufügen:

~~~css  
#root {  
  margin: 0;  
  padding: 0;  
  height: 100%;  
  width: 100%;  
}  
~~~
:::

## Redux-Store konfigurieren

Erstellen Sie `src/redux/store.ts`. Dieser Datei verbindet den `gantt`-Slice mit dem Redux-Store:

~~~ts
import { configureStore } from '@reduxjs/toolkit';  
import ganttReducer from './ganttSlice';

export const store = configureStore({  
  reducer: {  
    gantt: ganttReducer,  
  },  
});

export type RootState = ReturnType<typeof store.getState>;  
export type AppDispatch = typeof store.dispatch;
~~~

`configureStore` richtet Redux mit sinnvollen Standardeinstellungen (DevTools, Thunk) ein. Die Typisierung von `RootState` und `AppDispatch` erleichtert das Tippen von `useSelector` und `useDispatch` in der gesamten Anwendung. 

## Erstellen des Redux-Slice

Erstellen Sie `src/redux/ganttSlice.ts`, um alle Gantt-bezogenen Daten zu verwalten: Aufgaben, Verbindungen (Dependencies) und Konfigurationseinstellungen wie den Zoom.

Dieser Slice führt außerdem **Undo/Redo-Funktionalität** über eine Snapshot-Historie ein, sodass Benutzer vorherige Änderungen im Diagramm rückgängig machen oder erneut anwenden können. 

~~~ts
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';  
import type { SerializedTask, Task, Link, GanttConfig } from '@dhtmlx/trial-react-gantt';  
import { defaultZoomLevels, seedLinks, seedTasks, type ZoomLevel } from '../common/Seed';  
import { type WritableDraft } from 'immer';

interface Snapshot {  
  tasks: SerializedTask[];  
  links: Link[];  
  config: GanttConfig;  
}

interface GanttState {  
  tasks: SerializedTask[];  
  links: Link[];  
  config: GanttConfig;  
  past: Snapshot[];  
  future: Snapshot[];  
  maxHistory: number;  
}

const initialState: GanttState = {  
  tasks: seedTasks,  
  links: seedLinks,  
  config: {  
    zoom: defaultZoomLevels,  
  },  
  past: [],  
  future: [],  
  maxHistory: 50,  
};

const createSnapshot = (state: GanttState): WritableDraft<Snapshot> => ({  
  tasks: JSON.parse(JSON.stringify(state.tasks)),  
  links: JSON.parse(JSON.stringify(state.links)),  
  config: JSON.parse(JSON.stringify(state.config)),  
});

const pushHistory = (state: GanttState) => {  
  state.past.push(createSnapshot(state) as Snapshot);  
  if (state.past.length > state.maxHistory) state.past.shift();  
  state.future = [];  
};

const ganttSlice = createSlice({  
  name: 'gantt',  
  initialState,  
  reducers: {  
    undo(state) {  
      if (state.past.length > 0) {  
        const previous = state.past[state.past.length - 1];  
        const newFuture = createSnapshot(state as GanttState);

        state.tasks = previous.tasks;  
        state.links = previous.links;  
        state.config = previous.config;  
        state.past = state.past.slice(0, -1);  
        state.future = [newFuture, ...state.future];  
      }  
    },  
    redo(state) {  
      if (state.future.length > 0) {  
        const next = state.future[0];  
        const newPast = createSnapshot(state as GanttState);

        state.tasks = next.tasks;  
        state.links = next.links;  
        state.config = next.config;  
        state.future = state.future.slice(1);  
        state.past = [...state.past, newPast];  
      }  
    },

    updateTask(state, action: PayloadAction<SerializedTask>) {  
      pushHistory(state);

      const updatedTask = action.payload;  
      const index = state.tasks.findIndex((task) => task.id === updatedTask.id);  
      if (index !== -1) {  
        state.tasks[index] = { ...state.tasks[index], ...updatedTask };  
      }  
    },  
    createTask(state, action: PayloadAction<SerializedTask>) {  
      pushHistory(state);

      state.tasks.push({ ...action.payload, id: `DB_ID:${action.payload.id}` });  
    },  
    deleteTask(state, action: PayloadAction<string>) {  
      pushHistory(state);

      state.tasks = state.tasks.filter((task) => String(task.id) !== action.payload);  
    },  
    updateLink(state, action: PayloadAction<Link>) {  
      pushHistory(state);

      const updatedLink = action.payload;  
      const index = state.links.findIndex((link) => link.id === updatedLink.id);  
      if (index !== -1) {  
        state.links[index] = { ...state.links[index], ...updatedLink };  
      }  
    },  
    createLink(state, action: PayloadAction<Link>) {  
      pushHistory(state);

      state.links.push({ ...action.payload, id: `DB_ID:${action.payload.id}` });  
    },  
    deleteLink(state, action: PayloadAction<string>) {  
      pushHistory(state);

      state.links = state.links.filter((link) => String(link.id) !== action.payload);  
    },  
    setZoom(state, action: PayloadAction<ZoomLevel>) {  
      pushHistory(state);

      state.config.zoom.current = action.payload;  
    },  
  },  
});

export const { undo, redo, updateTask, createTask, deleteTask, updateLink, createLink, deleteLink, setZoom } =  
  ganttSlice.actions;  
export default ganttSlice.reducer;
~~~

Der `GanttState` enthält drei neue Felder: `past`, `future` und `maxHistory`, die zusammen einen **Time-Travel-Mechanismus** für Undo/Redo-Aktionen ermöglichen.

Zur Unterstützung von Undo/Redo werden zwei Hilfsfunktionen verwendet:

- **`createSnapshot(state)`** – tiefe Kopie der aktuellen Gantt-Daten, um eine exakte Kopie von Tasks, Links und Config zu bewahren.  
- **`pushHistory(state)`** – speichert das aktuelle Snapshot in dem `past`-Array, bevor eine modifying-Aktion ausgeführt wird, und leert den `future`-Stack (damit Redo nur auf die jüngste Undo-Sequenz anwendbar ist).

Die ausführliche Erklärung von `ganttSlice.ts` finden Sie unten.
Die Funktion `createSlice` generiert automatisch:

1. Die **Reducers** (Funktionen, die den Zustand ändern).  
2. Die **Action Creators** (Funktionen, die Sie aus Ihrer UI heraus dispatchen können).

Jeder Reducer aktualisiert einen spezifischen Teil des Gantt-Zustands:

- **updateTask**: aktualisiert Daten einer bestehenden Aufgabe (z. B. wenn Sie einen Namen, Datum oder eine Dauer bearbeiten).  
- **createTask**: Fügt eine neue Aufgabe zum Zustand hinzu. Das vorgetäuschte `DB_ID:`-Präfix simuliert, wie ein echtes Backend eine eindeutige ID nach dem Speichern in einer Datenbank zuweisen könnte.  
- **deleteTask**: entfernt eine Aufgabe aus dem Store anhand ihrer ID.  
- **updateLink, createLink, deleteLink**: Diese arbeiten genau wie die Task-Reducer, jedoch für **Links** (Abhängigkeiten zwischen Aufgaben).  
- **setZoom**: aktualisiert die aktuelle Zoom-Stufe im Config-Objekt, mit History-Tracking.  
- **undo**: stellt das vorherige Snapshot aus `past` wieder her, verschiebt das aktuelle in `future`.  
- **redo**: wendet einen zuvor rückgängig gemachten Zustand erneut an, indem ein Snapshot von `future` zurück nach `past` verschoben wird.

Jede modifying-Aktion ruft zuerst `pushHistory(state)` auf, wodurch der Benutzer sicher jede Aufgabe, jeden Link oder jede Konfigurationsänderung rückgängig machen oder erneut anwenden kann.

## Beispiel-Daten und Konfiguration einrichten

Erstellen Sie Beispieldaten für unser Gantt-Diagramm in `src/common/Seed.ts`, die die Anfangsdaten enthalten:

~~~ts
import type { SerializedTask, Link, GanttConfig } from '@dhtmlx/trial-react-gantt';

export type ZoomLevel = 'day' | 'month' | 'year';

export const defaultZoomLevels: NonNullable<GanttConfig['zoom']> = {
  current: 'day',
  levels: [
    { 
      name: 'day',
      scale_height: 27,
      min_column_width: 80,
      scales: [{ unit: 'day', step: 1, format: '%d %M' }],
    },
    {
      name: 'month',
      scale_height: 50,
      min_column_width: 120,
      scales: [
        { unit: 'month', format: '%F, %Y' },
        { unit: 'week', format: 'Week #%W' },
      ],
    },
    {
      name: 'year',
      scale_height: 50,
      min_column_width: 30,
      scales: [{ unit: 'year', step: 1, format: '%Y' }],
    },
  ],
};

export const seedTasks: SerializedTask[] = [
  {
    id: 1,
    text: 'Office itinerancy',
    type: 'project',
    start_date: new Date(2025, 3, 2).toISOString(),
    duration: 17,
    progress: 0.4,
    parent: 0,
    open: true,
  }
  // ...
];

export const seedLinks: Link[] = [
  { id: 2, source: 2, target: 3, type: '0' },
  { id: 3, source: 3, target: 4, type: '0' },
  // ...
];
~~~

## Aufbau der Steuerleiste-Komponente (Toolbar)

Als Nächstes fügen wir eine **Toolbar**-Komponente in `src/common/Toolbar.tsx` hinzu.

Diese Komponente gewährt Benutzern schnellen Zugriff auf gängige Gantt-Steuerungen, wie das Zoomen zwischen *day*, *month* und *year*-Ansichten, sowie das Durchführen von **undo/redo**-Aktionen.

~~~tsx
import Divider from '@mui/material/Divider';  
import ButtonGroup from '@mui/material/ButtonGroup';  
import UndoIcon from '@mui/icons-material/Undo';  
import RedoIcon from '@mui/icons-material/Redo';  
import Button from '@mui/material/Button';  
import type { ZoomLevel } from './Seed';

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

Wir verwenden **Material-UI-Komponenten** (`Button`, `ButtonGroup`, `Divider` und Icons), um eine einfache, klare Toolbar-Layout zu erstellen.

Die Toolbar akzeptiert folgende optionale Props:

- `onUndo` und `onRedo` – Callback-Funktionen für Undo/Redo-Aktionen.
- `onZoom` – Callback, der ausgelöst wird, wenn der Benutzer eine der Zoom-Tasten anklickt.
- `currentZoom` – Gibt an, welche Zoom-Stufe aktuell aktiv ist, damit die ausgewählte Schaltfläche hervorgehoben werden kann. 

Die Buttons für "Day", "Month" und "Year" rufen `onZoom('day')`, `onZoom('month')` oder `onZoom('year')` auf. Die ausgewählte Zoom-Stufe nutzt `variant="contained"`, die anderen verwenden `outlined`, um eine klare visuelle Rückmeldung zum aktuellen Zustand zu geben. 

Später im Tutorial verbinden wir diese Toolbar mit unseren Store-Aktionen:

- Wenn ein Benutzer "Day" klickt, rufen wir `setZoom('day')` aus unserem Store auf  
- Die Undo-Schaltfläche löst die Methode des Stores `undo()` aus, um vorherige Zustände wiederherzustellen  
- Die Redo-Schaltfläche ruft `redo()` auf, um Änderungen erneut anzuwenden  
- Alle Zustandsänderungen (Aufgabenbearbeitung, -löschung, Zoom-Anpassungen etc.) werden in unserem benutzerdefinierten History-System verfolgt und können nahtlos rückgängig gemacht oder erneut angewendet werden

Dies aktualisiert die Konfiguration des Gantt-Diagramms im globalen Zustand, und die UI wird automatisch mit dem neuen Zoom-Level neu gerendert.

Erstellen wir die zentrale Komponente in `src/components/GanttComponent.tsx`, die DHTMLX React Gantt mit Redux Toolkit-State-Management zusammenführt. Diese Komponente dient als zentrales Element unserer Anwendung und kümmert sich um alle Interaktionen des Gantt-Diagramms sowie State-Updates.

Wir verwenden `useMemo`- und `useCallback`-Hooks, um die Leistung zu optimieren und unnötige Re-Renders zu vermeiden. `useMemo` cached berechnete Werte (wie Konfigurationsobjekte), während `useCallback` Callback-Funktionen merklbart. Dadurch werden diese Objekte und Funktionen nicht bei jedem Render neu erstellt, sofern sich ihre Abhängigkeiten nicht geändert haben.

Wir erstellen die Hauptkomponente und integrieren Redux:

~~~tsx
import React, { useRef, useEffect, useMemo, useCallback } from 'react';

import { useDispatch, useSelector } from 'react-redux';  
import ReactGantt, { GanttConfig, ReactGanttProps, Link, ReactGanttRef, SerializedTask } from '@dhtmlx/trial-react-gantt';  
import '@dhtmlx/trial-react-gantt/dist/react-gantt.css';

import {  
  undo,  
  redo,  
  updateTask,  
  createTask,  
  deleteTask,  
  updateLink,  
  createLink,  
  deleteLink,  
  setZoom,  
} from '../redux/ganttSlice';

import type { RootState, AppDispatch } from '../redux/store';  
import Toolbar from '../common/Toolbar';  
import { type ZoomLevel } from '../common/Seed';

const ReactGanttExample: React.FC = () => {  
  const ganttRef = useRef<ReactGanttRef>(null);  
  const dispatch = useDispatch<AppDispatch>();  
  const { tasks, links, config } = useSelector((state: RootState) => state.gantt);

  useEffect(() => {  
    document.title = 'DHTMLX React Gantt | Redux Toolkit';  
  }, []);
}
~~~

- `ganttRef` gibt uns direkten Zugriff auf die Gantt-Instanz, um Methoden wie undo/redo aufzurufen  
- `dispatch` ist unsere Funktion zum Versenden von Aktionen an den Redux-Store  
- Wir verwenden `useSelector`-Hooks, um Aufgaben, Verbindungen und Konfiguration aus dem Redux-State zu extrahieren  
- `useEffect` setzt den Dokumententitel, wenn die Komponente gemountet wird

Die Komponente muss Benutzeraktionen aus der Toolbar und dem Gantt-Diagramm selbst verarbeiten. Wir verwenden `useCallback`, um diese Handler-Funktionen zu speichern:

~~~tsx
const handleUndo = useCallback(() => {  
  dispatch(undo());  
}, [dispatch]);

const handleRedo = useCallback(() => {  
  dispatch(redo());  
}, [dispatch]);

const handleZoomIn = useCallback(  
  (newZoom: ZoomLevel) => {  
    dispatch(setZoom(newZoom));  
  },  
  [dispatch]  
);
~~~

- `handleZoomIn` dispatcht eine Aktion, um die Zoom-Stufe im Redux-State zu aktualisieren  
- `handleUndo` und `handleRedo` dispatchen die `undo`/`redo`-Aktionen aus dem Slice, die vorherige Schnappschüsse aus `past` bzw. `future` wiederherstellen  
- Diese Funktionen werden der Toolbar-Komponente als Callback übergeben

Nun konfigurieren wir das Gantt-Diagramm mit `useMemo`, um Konfigurationsobjekte zu cachen:

:::note
Seit v9.1.3 erkennt Gantt ISO-Datumstrings automatisch, und diese Template-Overrides sind nicht mehr nötig. Sie sind hier zur Kompatibilität mit älteren Gantt-Versionen gezeigt. Siehe [Dates in ISO-Format laden](guides/loading.md#loading-dates-in-iso-format).
:::

~~~tsx
const ganttConfig: GanttConfig = useMemo(() => ({ ...config }), [config]);

const templates: ReactGanttProps['templates'] = useMemo(
  () => ({
    format_date: (date: Date) => date.toISOString(),
    parse_date: (date: string) => new Date(date),
  }),
  []
);
~~~

Wir müssen außerdem alle Datenänderungen des Gantt-Diagramms behandeln:

~~~tsx
const data: ReactGanttProps['data'] = useMemo(  
  () => ({  
    save: (entity, action, payload, id) => {  
      if (entity === 'task') {  
        const task = payload as SerializedTask;  
        if (action === 'update') {  
          dispatch(updateTask(task));  
        } else if (action === 'create') {  
          dispatch(createTask(task));  
        } else if (action === 'delete') {  
          dispatch(deleteTask(String(id)));  
        }  
      } else if (entity === 'link') {  
        const link = payload as Link;  
        if (action === 'update') {  
          dispatch(updateLink(link));  
        } else if (action === 'create') {  
          dispatch(createLink(link));  
        } else if (action === 'delete') {  
          dispatch(deleteLink(String(id)));  
        }  
      }  
    },  
  }),  
  [dispatch]  
);
~~~

Der `data.save` Callback wird aufgerufen, wann immer eine Änderung im Gantt-Diagramm erfolgt.

Er erhält vier Parameter:  
  - `entity`: Ob es sich um eine 'task' oder eine 'link' handelt  
  - `action`: Der Typ der Operation ('create', 'update', 'delete')  
  - `payload`: Die tatsächlich modifizierten Daten  
  - `id`: Die Kennung des Elements, das modifiziert wird  

Auf Basis der Entität und Aktion dispatchen wir die entsprechende Redux-Aktion. Dies schafft eine nahtlose Verbindung zwischen dem internen Zustand des Gantt-Diagramms und Ihrem Redux-Store.

Wenn Sie eine detailliertere Erklärung dieser Callback-Funktion benötigen, lesen Sie [Handling changes with data.save](integrations/react/state/state-management-basics.md#handlingchangeswithdatasave) im Basics-Guide.

Schließlich rendern wir die vollständige Komponente:

~~~tsx
return (  
  <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>  
    <Toolbar onUndo={handleUndo} onRedo={handleRedo} onZoom={handleZoomIn} currentZoom={config.zoom.current} />

    <ReactGantt tasks={tasks} links={links} config={ganttConfig} templates={templates} data={data} ref={ganttRef} />  
  </div>  
);  
~~~

## Integration des Redux-Providers

Aktualisieren Sie Ihre Datei `src/main.tsx`, um den Redux-Provider einzubinden:  

~~~tsx
import React from 'react';  
import { createRoot } from 'react-dom/client';  
import { Provider } from 'react-redux';  
import { store } from './redux/store';  
import './index.css';  
import App from './App';

createRoot(document.getElementById('root')!).render(  
  <React.StrictMode>  
    <Provider store={store}>  
      <App />  
    </Provider>  
  </React.StrictMode>  
);
~~~

Und aktualisieren Sie anschließend Ihre Datei `src/App.tsx`, um unsere Gantt-Komponente zu verwenden:

~~~tsx
import './App.css'  
import GanttComponent from './components/GanttComponent'

function App() {  
  return (  
    <div style={{ height: '100vh', width: '95vw' }}>  
      <GanttComponent />  
    </div>  
  )  
}

export default App
~~~

Schließlich können wir den Entwicklungsserver starten und unsere Anwendung testen: 

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
- React Gantt installiert und mit einem Redux Toolkit Store verbunden
- undo/redo auf Basis von Snapshots im `ganttSlice` implementiert
- eine Material-UI-Toolbar mit Zoom- und History-Aktionen verbunden
- den `data.save`-Callback verwendet, sodass jede Änderung an Aufgaben/Verbindungen im Gantt automatisch eine Redux-Aktion wird.

Das Ergebnis ist ein Gantt-Diagramm, dessen Aufgaben, Verbindungen und Konfiguration vollständig durch den Redux-State gesteuert werden.

## GitHub-Demoprojekt

Ein vollständiges, funktionsfähiges Projekt, das diesem Tutorial folgt, finden Sie auf GitHub: [GitHub](https://github.com/dhtmlx/react-gantt-redux-starter).

## Was kommt als Nächstes

Um weiterzugehen:

- Wiederholen Sie die Konzepte hinter diesem Beispiel unter [](integrations/react/state/state-management-basics.md)
- Kombinieren Sie Redux-gesteuerten Zustand mit fortgeschrittener Konfiguration und Template-Erstellung im [React Gantt Überblick](integrations/react/overview.md)
- Erkunden Sie dasselbe Muster mit anderen State-Management-Lösungen:
  - [Using React Gantt with Zustand](integrations/react/state/zustand.md)
  - [Using React Gantt with MobX](integrations/react/state/mobx.md)
  - [Using React Gantt with XState](integrations/react/state/xstate.md)
  - [Using React Gantt with Jotai](integrations/react/state/jotai.md)
  - [Using React Gantt with Valtio](integrations/react/state/valtio.md)
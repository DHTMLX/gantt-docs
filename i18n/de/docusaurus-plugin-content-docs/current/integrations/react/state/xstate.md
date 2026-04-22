---  
title: React Gantt – XState Tutorial  
sidebar_label: XState  
description: "Erfahren Sie, wie Sie React Gantt in einer XState-gesteuerten Architektur integrieren. Behandelt die Modellierung von Gantt-Daten in einer Zustandsmaschine, die Verarbeitung von Ereignissen aus dem Save-Callback und die Koordination von UI und Geschäftslogik."  
---

# React Gantt – XState Tutorial

Diese Anleitung führt Sie durch die Erstellung einer React TypeScript-Anwendung mit Vite, die Integration der DHTMLX React Gantt-Komponente und die Verwaltung des Zustands mit XState.

## Voraussetzungen

- Grundkenntnisse in React, TypeScript, Vite und XState  
- Empfohlen: Lies [](integrations/react/state/state-management-basics.md), um das Datenbindungsmuster und den `data.save` Callback zu verstehen, auf dem dieses Tutorial aufbaut.

## Schnellstart – Projekt erstellen

Bevor Sie beginnen, installieren Sie [Node.js](https://nodejs.org/en/).

Erstellen Sie ein Vite React + TypeScript-Projekt:

~~~bash  
npm create vite@latest react-gantt-xstate-demo -- --template react-ts  
cd react-gantt-xstate-demo  
~~~  

Nun installieren wir die benötigten Abhängigkeiten.

* Für **npm**: 

~~~bash
npm install xstate @xstate/react @mui/material @mui/icons-material @emotion/react @emotion/styled
~~~  

* Für **yarn**:

~~~bash
yarn add xstate @xstate/react @mui/material @mui/icons-material @emotion/react @emotion/styled
~~~  

Dann installieren wir das React Gantt-Paket.

### Installation von React Gantt

Installieren Sie React Gantt wie in der [React Gantt-Installationsanleitung](integrations/react/installation.md) beschrieben.

In diesem Tutorial verwenden wir das Evaluierungspaket:

~~~bash
npm install @dhtmlx/trial-react-gantt
~~~  

oder

~~~bash
yarn add @dhtmlx/trial-react-gantt
~~~  

Wenn Sie bereits das Professional-Paket verwenden, ersetzen Sie `@dhtmlx/trial-react-gantt` durch `@dhx/react-gantt` in den Befehlen und Imports.


Jetzt können Sie den Entwicklungsserver starten:

~~~bash
npm run dev 
~~~  

Sie sollten nun Ihr React-Projekt unter `http://localhost:5173` laufen sehen.

:::note  
Damit Gantt den gesamten verfügbaren Platz des Bodys einnimmt, müssen Sie die Standardstile aus der `App.css`-Datei im `src`-Ordner entfernen und den folgenden Stil hinzufügen:  

~~~css  
#root { 
  margin: 0; 
  padding: 0; 
  height: 100%; 
  width: 100%; 
} 
~~~  
:::  

## Einrichten von Beispieldaten und Konfiguration

Erstellen Sie Beispieldaten für unser Gantt-Diagramm in `src/seed/Seed.ts`, die die Anfangsdaten enthalten:

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

## Aufbau der Kontrolltoolbar-Komponente

Nun fügen wir eine **Toolbar**-Komponente in `src/components/Toolbar.tsx` hinzu.

Diese Komponente gibt den Benutzern schnellen Zugriff auf gängige Gantt-Steuerelemente, wie das Zoomen zwischen *day*, *month* und *year*-Ansichten und das Ausführen von **undo/redo**-Aktionen.

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

Wir verwenden Material-UI-Komponenten (Button, ButtonGroup, Divider und Icons), um eine einfache, übersichtliche Toolbar-Layout zu erstellen, das intuitive Steuerelemente für das Gantt-Diagramm bereitstellt.

Die Toolbar akzeptiert folgende optionale Props, die eine nahtlose Integration mit unserer XState-Maschine ermöglichen:

- `onUndo` und `onRedo` – Callback-Funktionen, die Undo/Redo-Ereignisse an unsere Zustandsmaschine dispatchen.  
- `onZoom` – ein Callback, der Zoom-Update-Ereignisse an unsere Maschine sendet, wenn Benutzer die Zoom-Schaltflächen anklicken.  
- `currentZoom` – zeigt an, welcher Zoom-Level derzeit aktiv ist, sodass die Toolbar die ausgewählte Schaltfläche hervorheben kann.

Die Schaltflächen für "Day", "Month" und "Year" rufen `onZoom('day')`, `onZoom('month')` bzw. `onZoom('year')` auf. Die ausgewählte Zoom-Stufe verwendet `variant="contained"`, die anderen sind `outlined`, was eine klare visuelle Hinweis an den aktuellen Zustand gibt.

Die Toolbar verbindet sich direkt mit unserer XState-Maschine durch das Dispatchen von Ereignissen:

- Zoom-Steuerungen: Wenn der Benutzer "Day" anklickt, senden wir ein `SET_ZOOM`-Ereignis mit dem Level an unsere Zustandsmaschine, die die Gantt-Konfiguration durch vordefinierte Aktionen aktualisiert  
- Die Undo-Schaltfläche sendet ein `UNDO`-Ereignis an die Maschine, wodurch die Undo-Aktion ausgelöst wird, während die Redo-Schaltfläche ein `REDO`-Ereignis sendet, um Änderungen erneut anzuwenden  
- Alle Zustandänderungen (Aufgabenbearbeitung, Löschungen, Zoom-Anpassungen usw.) werden als diskrete Ereignisse in unserer Zustandsmaschine behandelt und können durch das History-System rückgängig gemacht oder erneut angewendet werden


## Erstellung der Haupt-Gantt-Komponente

Starten wir damit, unsere Hauptkomponente zu erstellen, die das Gantt-Diagramm hostet. Erstellen Sie `src/components/GanttComponent.tsx`.

Zuerst importieren wir `useEffect`, `useMemo` und `useRef` aus React, die Hauptkomponente `ReactGantt` und Typen aus dem Gantt-Paket, unsere benutzerdefinierte `Toolbar`-Komponente und die `ganttMachine`-Definition aus der XState-Konfiguration:

~~~tsx
import { useCallback, useEffect, useMemo } from 'react';
import { useMachine } from '@xstate/react';
import ReactGantt, {
  type ReactGanttRef,
  type ReactGanttProps,
  type Link,
  type SerializedTask,
} from '@dhtmlx/trial-react-gantt';
import '@dhtmlx/trial-react-gantt/dist/react-gantt.css';

import Toolbar from './Toolbar';
import { ganttMachine } from '../machine';
import { type ZoomLevel } from '../seed/Seed';
~~~

Nun richten wir die Komponente ein und verbinden sie mit unserer XState-Maschine:

~~~tsx
export default function DemoXState() {  
  const [state, send] = useMachine(ganttMachine);  
  const ganttRef = useRef<ReactGanttRef>(null);

  useEffect(() => {  
    document.title = 'DHTMLX React Gantt | XState';  
  }, []);
}
~~~  

- Wir verwenden den `useMachine`-Hook von `@xstate/react`, um unsere Komponente mit der Zustandsmaschine zu verbinden  
- Der Hook gibt den aktuellen `state` und eine `send`-Funktion zum Dispatchen von Ereignissen an die Maschine zurück  
- `ganttRef` bietet direkten Zugriff auf die Gantt-Instanz für imperative Operationen  
- `useEffect` setzt den Dokumententitel, wenn die Komponente gemountet wird

Lassen Sie uns die Templates der Gantt-Diagrammkonfiguration festlegen, die Datumsformatierung und -parsing für konsistente Datenverarbeitung und Event-Handler definieren:

:::note  
Seit v9.1.3 erkennt Gantt ISO-Datumsstrings automatisch und diese Template-Overrides sind nicht mehr nötig. Sie werden hier aus Kompatibilitätsgründen mit älteren Gantt-Versionen gezeigt. Siehe [Laden von Daten im ISO-Format](guides/loading.md#loading-dates-in-iso-format).  
:::  

~~~tsx
const templates: ReactGanttProps['templates'] = useMemo(
  () => ({
    format_date: (d) => d.toISOString(),
    parse_date: (s) => new Date(s),
  }),
  []
);

const handleUndo = useCallback(() => {  
  send({ type: 'UNDO' });  
}, [send]);

const handleRedo = useCallback(() => {  
  send({ type: 'REDO' });  
}, [send]);

const handleZoom = useCallback(  
  (level: ZoomLevel) => {  
    send({ type: 'SET_ZOOM', level });  
  },  
  [send]  
);
~~~  

Wir verwenden `useCallback`, um die Ereignishandler für Rückgängig, Wiederherstellen und Zoom-Operationen zu speichern. Dadurch werden unnötige Neuberechnungen der Kind-Komponenten bei Aktualisierungen der Komponente vermieden. Jeder Handler löst einen spezifischen Ereignistyp mit dem erforderlichen Payload an die Zustandsmaschine aus.

Der kritischste Teil – die Verbindung von Gantt-Datenänderungen mit unserer XState-Maschine:

~~~tsx
const data: ReactGanttProps['data'] = useMemo(  
  () => ({  
    save: (entity, action, item, id) => {  
      if (entity === 'task') {  
        const task = item as SerializedTask;  
        if (action === 'create') {  
          send({ type: 'ADD_TASK', task });  
        } else if (action === 'update') {  
          send({ type: 'UPSERT_TASK', task });  
        } else if (action === 'delete') {  
          send({ type: 'DELETE_TASK', id });  
        }  
      } else if (entity === 'link') {  
        const link = item as Link;  
        if (action === 'create') {  
          send({ type: 'ADD_LINK', link });  
        } else if (action === 'update') {  
          send({ type: 'UPSERT_LINK', link });  
        } else if (action === 'delete') {  
          send({ type: 'DELETE_LINK', id });  
        }  
      }  
    },  
  }),  
  [send]  
);
~~~  

- Der `data.save`-Callback behandelt alle Datenänderungen aus dem Gantt-Diagramm  
- Er leitet verschiedene Operationen (Erstellen, Aktualisieren, Löschen) an passende Maschinenevents mit Hilfe der `send`-Funktion weiter  
- Jede Benutzeraktion im Gantt-Diagramm wird zu einem diskreten Ereignis, das an die Zustandsmaschine gesendet wird  
- Das Abhängigkeiten-Array stellt sicher, dass der Callback aktualisiert wird, wenn sich die `send`-Funktion ändert

Wenn Sie eine tiefere Erklärung dieses Callbacks benötigen, sehen Sie sich die Anleitung [Umgang mit Änderungen mit data.save](integrations/react/state/state-management-basics.md#handlingchangeswithdatasave) im Grundlagen-Guide an.

Schließlich rendern wir die komplette Komponente:

~~~tsx
return (  
  <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>  
    <Toolbar  
      onUndo={handleUndo}  
      onRedo={handleRedo}  
      currentZoom={state.context.config.zoom.current}  
      onZoom={handleZoom}  
    />  
    <ReactGantt  
      ref={ganttRef}  
      tasks={state.context.tasks}  
      links={state.context.links}  
      config={state.context.config}  
      templates={templates}  
      data={data}  
    />  
  </div>  
);  
~~~  

- Die Toolbar erhält Ereignishandler, die `UNDO`, `REDO`- und `SET_ZOOM`-Ereignisse an die Zustandsmaschine dispatchen  
- Die ReactGantt-Komponente erhält alle Daten (`tasks`, `links`, `config`) aus dem Kontext der Maschine

Aktualisieren Sie nun Ihre `src/App.tsx`, damit sie unsere Gantt-Komponente verwendet:

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

## Einrichten der XState-Maschine

Nun erstellen wir unsere Zustandsverwaltungslösung mit XState. Erstellen Sie `src/machine.ts`:

~~~ts
import { createMachine, assign } from 'xstate';  
import type { Link, GanttConfig, SerializedTask } from '@dhtmlx/trial-react-gantt';  
import { seedTasks, seedLinks, defaultZoomLevels, type ZoomLevel } from './seed/Seed';

export interface Snapshot {  
  tasks: SerializedTask[];  
  links: Link[];  
  config: GanttConfig;  
}

export interface ContextType {  
  Tasks: SerializedTask[];  
  links: Link[];  
  config: GanttConfig;

  past: Snapshot[];  
  future: Snapshot[];  
  maxHistory: number;  
}
~~~  

- Wir definieren TypeScript-Schnittstellen für den Kontext der Maschine und das Snapshot-Format  
- `ContextType` definiert alle Gantt-bezogenen Zustände inklusive Aufgaben, Verbindungen, Konfiguration und History-Tracking  
- `Snapshot`-Schnittstelle repräsentiert die Zustandsstruktur für Undo/Redo-Funktionalität

Nun definieren wir die Ereignistypen, die unsere Maschine verarbeiten wird:

~~~ts
type SetZoomEvent = { type: 'SET_ZOOM'; level: ZoomLevel };  
type UndoEvent = { type: 'UNDO' };  
type RedoEvent = { type: 'REDO' };  
type AddTaskEvent = { type: 'ADD_TASK'; task: SerializedTask };  
type UpsertTaskEvent = { type: 'UPSERT_TASK'; task: SerializedTask };  
type DeleteTaskEvent = { type: 'DELETE_TASK'; id: string | number };  
type AddLinkEvent = { type: 'ADD_LINK'; link: Link };  
type UpsertLinkEvent = { type: 'UPSERT_LINK'; link: Link };  
type DeleteLinkEvent = { type: 'DELETE_LINK'; id: string | number };

type EventType =  
  | SetZoomEvent  
  | UndoEvent  
  | RedoEvent  
  | AddTaskEvent  
  | UpsertTaskEvent  
  | DeleteTaskEvent  
  | AddLinkEvent  
  | UpsertLinkEvent  
  | DeleteLinkEvent;
~~~  

- Jede Benutzungsinteraktion wird als diskretes Ereignis mit einem bestimmten Typ und Payload dargestellt  
- Ereignisse sind stark typisiert, was Typsicherheit in der gesamten Anwendung sicherstellt

Lassen Sie uns die Maschinenkonfiguration erstellen:

~~~ts
const createSnapshot = (ctx: ContextType): Snapshot => ({  
  tasks: structuredClone(ctx.tasks),  
  links: structuredClone(ctx.links),  
  config: structuredClone(ctx.config),  
});

export const ganttMachine = createMachine(  
  {  
    id: 'gantt',  
    types: {  
      context: {} as ContextType,  
      events: {} as EventType,  
    },  
    context: {  
      tasks: seedTasks,  
      links: seedLinks,  
      config: { zoom: defaultZoomLevels },  
      past: [],  
      future: [],  
      maxHistory: 50,  
    },  
    initial: 'ready',  
    states: {  
      ready: {  
        on: {  
          SET_ZOOM: { actions: ['pushHistory', 'setZoom'] },  
          UNDO: { actions: 'undo' },  
          REDO: { actions: 'redo' },

          ADD_TASK: { actions: ['pushHistory', 'addTask'] },  
          UPSERT_TASK: { actions: ['pushHistory', 'upsertTask'] },  
          DELETE_TASK: { actions: ['pushHistory', 'deleteTask'] },

          ADD_LINK: { actions: ['pushHistory', 'addLink'] },  
          UPSERT_LINK: { actions: ['pushHistory', 'upsertLink'] },  
          DELETE_LINK: { actions: ['pushHistory', 'deleteLink'] },  
        },  
      },  
    },  
  },  
)
~~~  

Maschinenkonfiguration:

- Die Maschine hat einen einzigen Zustand `ready`, in dem alle Gantt-Operationen verfügbar sind  
- Jedes Ereignis löst eine Sequenz von Aktionen aus, die den Kontext der Maschine aktualisieren  
- Der `context` definiert den anfänglichen Zustand mit Beispieldaten und leeren History-Arrays  
- Ereignis-Handler geben an, welche Aktionen ausgeführt werden, wenn Ereignisse empfangen werden

Nun implementieren wir die Aktionen, die die Zustandsaktualisierungen behandeln:

~~~ts
{  
  actions: {  
    pushHistory: assign(({ context }) => {  
      const snap = createSnapshot(context);  
      const past = [...context.past, snap];  
      if (past.length > context.maxHistory) past.shift();

      return {  
        past,  
        future: [],  
      };  
    }),  
    setZoom: assign(({ context, event }) => ({  
      config: {  
        ...context.config,  
        zoom: { ...context.config.zoom, current: (event as SetZoomEvent).level },  
      },  
    })),

    undo: assign(({ context }) => {  
      if (context.past.length === 0) return {};

      const previous = context.past[context.past.length - 1];  
      const future = [createSnapshot(context), ...context.future];

      return {  
        ...previous,  
        past: context.past.slice(0, -1),  
        future,  
      };  
    }),

    redo: assign(({ context }) => {  
      if (context.future.length === 0) return {};

      const next = context.future[0];  
      const past = [...context.past, createSnapshot(context)];

      return {  
        ...next,  
        past,  
        future: context.future.slice(1),  
      };  
    }),
  }
}
~~~  

Historienverwaltungsaktionen:

- `pushHistory` erstellt eine Momentaufnahme des aktuellen Zustands und fügt sie dem Historienstapel hinzu  
- `undo` stellt den vorherigen Zustand aus dem `past`-Array wieder her und verschiebt den aktuellen Zustand in `future`  
- `redo` wendet den nächsten Zustand aus `future` erneut an und speichert den aktuellen Zustand in `past`

Und implementieren wir die Gantt-spezifischen Datenoperationen:

~~~ts
addTask: assign(({ context: ctx, event }) => ({  
  tasks: [...ctx.tasks, { ...(event as AddTaskEvent).task, id: `DB_ID:${(event as AddTaskEvent).task.id}` }],  
})),

upsertTask: assign(({ context: ctx, event }) => ({  
  tasks: ctx.tasks.map((task) =>  
    String(task.id) === String((event as UpsertTaskEvent).task.id)  
      ? { ...task, ...(event as UpsertTaskEvent).task }  
      : task  
  ),  
})),

deleteTask: assign(({ context, event }) => ({  
  tasks: context.tasks.filter((t) => String(t.id) !== String((event as DeleteTaskEvent).id)),  
})),

addLink: assign(({ context, event }) => ({  
  links: [...context.links, { ...(event as AddLinkEvent).link, id: `DB_ID:${(event as AddLinkEvent).link.id}` }],  
})),

upsertLink: assign(({ context, event }) => ({  
  links: context.links.map((l) =>  
    String(l.id) === String((event as UpsertLinkEvent).link.id) ? { ...l, ...(event as UpsertLinkEvent).link } : l  
  ),  
})),

deleteLink: assign(({ context, event }) => ({  
  links: context.links.filter((l) => String(l.id) !== String((event as DeleteLinkEvent).id)),  
})),  
~~~  

- `addTask` erstellt neue Aufgaben mit simulierten Datenbank-IDs und fügt sie der Aufgabenliste hinzu  
- `upsertTask` aktualisiert existierende Aufgaben anhand der ID  
- `deleteTask` entfernt Aufgaben anhand der ID aus der Aufgabenliste  
- Ähnliche Muster werden für Verknüpfungen verwendet (`addLink`, `upsertLink`, `deleteLink`)  
- Jede Datenänderungsaktion wird mit `pushHistory` gekoppelt, um Undo/Redo-Fähigkeit sicherzustellen  
- Die `assign`-Funktion von XState wird verwendet, um den Kontext der Maschine unverändert zu aktualisieren

## Anwendung ausführen

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
- React Gantt hinzugefügt und über `useMachine` mit einer XState-Maschine verbunden  
- Aufgaben, Verbindungen und Zoom-Konfiguration im Maschinenkontext modelliert  
- eine Snapshot-basierte Undo/Redo-Funktionalität mithilfe von `past`/`future`-Historienarrays und einer `pushHistory`-Aktion implementiert  
- den `data.save` Callback verwendet, sodass jede Änderung im Gantt-Diagramm ein stark typisiertes XState-Ereignis wird

Dies hält die Gantt-Komponente vollständig deklarativ, während Mutationlogik und History-Handling innerhalb der Zustandsmaschine stattfinden.

## GitHub-Demodaten

Ein vollständiges, funktionsfähiges Projekt, das dieser Anleitung folgt, finden Sie auf GitHub: https://github.com/dhtmlx/react-gantt-xstate-starter.

## Was kommt als Nächstes

Um weiterzugehen:

- Die Konzepte hinter diesem Beispiel erneut betrachten in [](integrations/react/state/state-management-basics.md)
- Die XState-Maschine mit fortgeschrittener Konfiguration und Template-Optionen im [React Gantt-Überblick](integrations/react/overview.md) kombinieren
- Diese XState-gesteuerte Architektur mit anderen State-Managern vergleichen:
  - [Using React Gantt with Redux Toolkit](integrations/react/state/redux-toolkit.md)
  - [Using React Gantt with MobX](integrations/react/state/mobx.md)
  - [Using React Gantt with Zustand](integrations/react/state/zustand.md)
  - [Using React Gantt with Jotai](integrations/react/state/jotai.md)
  - [Using React Gantt with Valtio](integrations/react/state/valtio.md)
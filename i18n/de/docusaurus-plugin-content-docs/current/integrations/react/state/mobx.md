---
title: Using React Gantt with MobX
sidebar_label: MobX
description: "Integration von React Gantt mit MobX beobachtetem Zustand. Behandelt das Einrichten beobachtbarer Modelle, das Reagieren auf Gantt-Updates und das Synchronisieren des Diagramms über den Save-Handler."
---


# React Gantt - MobX Tutorial

Dieses Tutorial führt Sie durch die Erstellung einer React-TypeScript-Anwendung mit Vite, die Integration der DHTMLX React Gantt-Komponente und die Verwaltung des Zustands mit MobX.

## Voraussetzungen

- Grundkenntnisse in React, TypeScript, Vite und MobX
- Empfehlung: lesen Sie [](integrations/react/state/state-management-basics.md), um den Datenbindungsmodus und den `data.save` Callback zu verstehen, auf dem dieses Tutorial aufbaut.

## Schnellstart – Projekt erstellen

Bevor Sie beginnen, installieren Sie Node.js.

Erstellen Sie ein Vite React + TypeScript-Projekt:

~~~bash
npm create vite@latest react-gantt-mobx-demo -- --template react-ts  
cd react-gantt-mobx-demo  
~~~

Nun installieren wir die benötigten Abhängigkeiten.

* Für **npm**: 

~~~bash
npm install mobx mobx-react-lite @mui/material @mui/icons-material @emotion/react @emotion/styled
~~~

* Für **yarn**:

~~~bash
yarn add mobx mobx-react-lite @mui/material @mui/icons-material @emotion/react @emotion/styled
~~~

Wir verwenden `mobx-react-lite` statt des vollständigen `mobx-react`-Pakets, weil unsere Anwendung Funktionskomponenten nutzt. Die „Lite“-Version ist speziell für Funktionskomponenten und Hooks optimiert und liefert eine kleinere Bundle-Größe, behält aber alle wesentlichen MobX-React-Integrationsfunktionen, die wir benötigen.

Dann müssen wir das React Gantt-Paket installieren. 

### Installation von React Gantt

Installieren Sie React Gantt wie im [Installationsleitfaden für React Gantt](integrations/react/installation.md) beschrieben.

In diesem Tutorial verwenden wir das Evaluierungspaket:

~~~bash
npm install @dhtmlx/trial-react-gantt
~~~

oder

~~~bash
yarn add @dhtmlx/trial-react-gantt
~~~

Falls Sie bereits das Professional-Paket verwenden, ersetzen Sie `@dhtmlx/trial-react-gantt` in den Befehlen und Importen durch `@dhx/react-gantt`.

Nun starten Sie den Entwicklungsserver:

~~~bash
npm run dev 
~~~

Sie sollten nun Ihr React-Projekt unter `http://localhost:5173` laufen sehen.

:::note
Damit Gantt den gesamten Platz des Bodys einnimmt, müssen Sie die Standard-Stile aus der Datei `App.css` im Ordner `src` entfernen und die folgende Stildefinition hinzufügen:

~~~css  
#root { 
  margin: 0; 
  padding: 0; 
  height: 100%; 
  width: 100%; 
} 
~~~
:::

## Aufbau von Muster-Daten und Konfiguration

Erstellen Sie Beispiel-Daten für unser Gantt-Diagramm in `src/seed/Seed.ts`, die die anfänglichen Daten enthalten:

~~~tsx
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

## Aufbau der Steuerelemente Toolbar-Komponente

Nun fügen wir eine **Toolbar**-Komponente in `src/components/Toolbar.tsx` hinzu.

Diese Komponente bietet Benutzern schnellen Zugriff auf gängige Gantt-Steuerungen, wie das Zoomen zwischen den Ansichten Day, Month und Year und das Durchführen von Undo/Redo-Aktionen.

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

Die Toolbar akzeptiert folgende optionale Props, die eine nahtlose Integration mit unserem MobX-Store ermöglichen:

- `onUndo` und `onRedo` – Callback-Funktionen für Undo/Redo-Aktionen.
- `onZoom` – Callback, der den Zoom-Level in unserem Store aktualisiert, wenn Benutzer die Zoom-Schaltflächen klicken
- `currentZoom` – Gibt an, welcher Zoom-Level aktuell aktiv ist, und ermöglicht es der Toolbar, die ausgewählte Schaltfläche hervorzuheben

Die Buttons für „Day“, „Month“ und „Year“ rufen `onZoom('day')`, `onZoom('month')` bzw. `onZoom('year')` auf. Die Button-Variante des aktuell ausgewählten Zoom-Levels verwendet `variant="contained"`, während die anderen `outlined` bleiben, was eine klare visuelle Anzeige des aktuellen Zustands bietet. 

Die Toolbar verbindet sich direkt mit den Aktionen des MobX-Stores:

- Zoom-Steuerung: Wenn der Benutzer „Day“ klickt, rufen wir `setZoom('day')` aus dem MobX-Store auf, wodurch die Konfiguration des Gantt-Diagramms automatisch aktualisiert wird und ein erneutes Rendern ausgelöst wird  
- Der Undo-Button löst die `undo()`-Methode des Stores aus, um zum vorherigen Zustand zurückzuwechseln  
- Der Redo-Button ruft `redo()` auf, um Änderungen erneut anzuwenden  
- Alle Zustand-Änderungen (Aufgabenbearbeitung, Löschungen, Zoom-Anpassungen usw.) werden in unserem benutzerdefinierten Verlaufssystem verfolgt und können rückgängig gemacht oder erneut angewendet werden

## Erstellung der Haupt-Gantt-Komponente

Starten wir mit dem Aufbau der Hauptkomponente, die das Gantt-Diagramm hosten wird. Erstellen Sie `src/components/GanttComponent.tsx`.

Zunächst importieren wir `useEffect`, `useMemo` aus React, die Hauptkomponente `ReactGantt` und Typen aus dem Gantt-Paket, unsere benutzerdefinierte `Toolbar`-Komponente und die Instanz der MobX-Store-Klasse, die wir bald erstellen:

~~~tsx
import React, { useEffect, useMemo } from 'react';
import { observer } from 'mobx-react-lite';
import ReactGantt, { type ReactGanttProps, type SerializedTask, type Link } from '@dhtmlx/trial-react-gantt';
import '@dhtmlx/trial-react-gantt/dist/react-gantt.css';

import Toolbar from './Toolbar';
import { store } from '../store';
~~~

Nun richten wir die Komponente ein und verbinden sie mit unserem MobX-Store:

~~~tsx
const DemoMobXBasic: React.FC = observer(() => {  
  const {  
    tasks,  
    links,  
    config,  
    setZoom,  
    addTask,  
    upsertTask,  
    deleteTask,  
    addLink,  
    upsertLink,  
    deleteLink,  
    undo,  
    redo,  
  } = store;

  useEffect(() => {  
    document.title = 'DHTMLX React Gantt | MobX';  
  }, []);
}
~~~

Wir wickeln unsere Komponente mit `observer()` aus `mobx-react-lite` ein, um observable-Zustandsänderungen automatisch nachzuverfolgen. Dadurch rendert die Komponente neu, sobald relevante Store-Eigenschaften (Tasks, Links, Config) geändert werden. 

- Wir extrahieren Zustand und Aktionen direkt aus unserem MobX-Store in einer einzigen Destrukturierung  
- `useEffect` setzt den Dokumententitel, wenn die Komponente gemountet wird

Lassen Sie uns die Templates des Gantt-Diagramms konfigurieren, die das Datum-Format und Parsen für eine konsistente Datenbehandlung definieren:

:::note
Seit Version 9.1.3 erkennt Gantt ISO-Datumstrings automatisch, und diese Template-Überschreibungen sind nicht mehr nötig. Sie werden hier aus Kompatibilitätsgründen mit älteren Gantt-Versionen gezeigt. Siehe [Laden von Daten im ISO-Format](guides/loading.md#loading-dates-in-iso-format).
:::

~~~tsx
const templates: ReactGanttProps['templates'] = useMemo(
  () => ({
    format_date: (d) => d.toISOString(),
    parse_date: (s) => new Date(s),
  }),
  []
);
~~~

Der kritischste Teil – die Verbindung der Gantt-Datenänderungen mit unserem MobX-Store:

~~~tsx
const data: ReactGanttProps['data'] = useMemo(
  () => ({
    save: (entity, action, item, id) => {
      if (entity === 'task') {
        const task = item as SerializedTask;
        if (action === 'create') return addTask(task);
        if (action === 'update') return upsertTask(task);
        if (action === 'delete') return deleteTask(id);
      }
      if (entity === 'link') {
        const link = item as Link;
        if (action === 'create') return addLink(link);
        if (action === 'update') return upsertLink(link);
        if (action === 'delete') return deleteLink(id);
      }
    },
  }),
  [addTask, upsertTask, deleteTask, addLink, upsertLink, deleteLink]
);
~~~

- Der `data.save` Callback behandelt alle Datenänderungen aus dem Gantt-Diagramm  
- Er leitet verschiedene Operationen (create, update, delete) an die entsprechenden Store-Aktionen weiter  
- Das Abhängigkeits-Array sorgt dafür, dass der Callback aktualisiert wird, wenn sich Store-Aktionen ändern

Wenn Sie eine detailliertere Erklärung dieses Callbacks benötigen, sehen Sie sich die Anleitung [Handling changes with data.save](integrations/react/state/state-management-basics.md#handlingchangeswithdatasave) im Basics-Leitfaden an.

Abschließend rendern wir die vollständige Komponente:

~~~tsx
return (
  <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>  
    <Toolbar onUndo={undo} onRedo={redo} currentZoom={config.zoom.current} onZoom={setZoom} />  
    <ReactGantt tasks={tasks} links={links} config={config} templates={templates} data={data} />  
  </div>  
);  

export default DemoMobXBasic;
~~~

- Die `Toolbar` erhält Handler für Undo/Redo- und Zoom-Steuerungen  
- Die `ReactGantt`-Komponente erhält alle Daten, Konfiguration und Callback-Funktionen

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


## MobX-Store einrichten

Erstellen wir nun unsere State-Management-Lösung mit MobX. Erstellen Sie `src/store.ts`:

~~~ts
import { makeAutoObservable } from 'mobx';  
import type { Task, Link, GanttConfig, SerializedTask } from '@dhtmlx/trial-react-gantt';  
import { seedTasks, seedLinks, defaultZoomLevels, type ZoomLevel } from './seed/Seed';

interface Snapshot {  
  tasks: SerializedTask[];  
  links: Link[];  
  config: GanttConfig;  
}

export class GanttStore {  
  tasks: SerializedTask[] = seedTasks;  
  links: Link[] = seedLinks;  
  config: GanttConfig = {  
    zoom: defaultZoomLevels,  
  };  
  past: Snapshot[] = [];  
  future: Snapshot[] = [];  
  maxHistory: number = 50;

  constructor() {  
    makeAutoObservable(this, {}, { autoBind: true });  
  }
}
~~~

- Wir definieren eine `GanttStore`-Klasse, die alle Gantt-bezogenen Zustand und Logik kapselt  
- Der Store verwaltet `tasks`, `links` und `config` – die Kern-Datenstrukturen des Gantt  
- `past`- und `future`-Arrays implementieren Undo/Redo-Verlauf  
- `makeAutoObservable` markiert Felder automatisch als observierbar, Getter als berechnete Werte und Methoden als Aktionen  
- Die Option `autoBind: true` sorgt dafür, dass Methoden den richtigen `this`-Kontext behalten

Nun implementieren wir die Store-Methoden, die Zustandsaktualisierungen und die Verlauf-Verwaltung behandeln:

~~~ts
_snapshot(): Snapshot {  
  return {  
    tasks: JSON.parse(JSON.stringify(this.tasks)),  
    links: JSON.parse(JSON.stringify(this.links)),  
    config: JSON.parse(JSON.stringify(this.config)),  
  };  
}

_saveToHistory() {  
  this.past.push(this._snapshot());  
  if (this.past.length > this.maxHistory) this.past.shift();  
  this.future = [];  
}

undo() {  
  if (this.past.length === 0) return;  
  const previous = this.past.pop();  
  if (previous) {  
    this.future.unshift(this._snapshot());  
    this.tasks = previous.tasks;  
    this.links = previous.links;  
    this.config = previous.config;  
  }  
}

redo() {  
  if (this.future.length === 0) return;  
  const next = this.future.shift();  
  if (next) {  
    this.past.push(this._snapshot());  
    this.tasks = next.tasks;  
    this.links = next.links;  
    this.config = next.config;  
  }  
}
~~~

- `_snapshot()` erstellt tiefe Klone des aktuellen Zustands für die Verlauf-Verfolgung  
- `_saveToHistory()` speichert den aktuellen Zustand vor Änderungen und leert den Redo-Stack  
- `undo()` stellt den jüngsten Zustand aus `past` wieder her und verschiebt den aktuellen Zustand in `future`  
- `redo()` wendet den nächsten Zustand aus `future` erneut an und speichert den aktuellen Zustand in `past`

Nun implementieren wir die Gantt-spezifischen Aktionen:

~~~ts
setZoom(level: ZoomLevel) {  
  this._saveToHistory();  
  this.config = { ...this.config, zoom: { ...this.config.zoom, current: level } };  
}

addTask(task: SerializedTask) {  
  this._saveToHistory();  
  const newTask = { ...task, id: `DB_ID:${task.id}` };  
  this.tasks.push(newTask);  
  return newTask;  
}

upsertTask(task: SerializedTask) {  
  this._saveToHistory();  
  const index = this.tasks.findIndex((t) => String(t.id) === String(task.id));  
  if (index !== -1) this.tasks[index] = { ...this.tasks[index], ...task };  
}

deleteTask(id: string | number) {  
  this._saveToHistory();  
  this.tasks = this.tasks.filter((t) => String(t.id) !== String(id));  
}

addLink(l: Link) {  
  this._saveToHistory();  
  const newLink = { ...l, id: `DB_ID:${l.id}` };  
  this.links.push(newLink);  
  return newLink;  
}

upsertLink(l: Link) {  
  this._saveToHistory();  
  const index = this.links.findIndex((link) => String(link.id) === String(l.id));  
  if (index !== -1) this.links[index] = { ...this.links[index], ...l };  
}

deleteLink(id: string | number) {  
  this._saveToHistory();  
  this.links = this.links.filter((l) => String(l.id) !== String(id));  
}  

export const store = new GanttStore();
~~~

- `setZoom` aktualisiert die Zoom-Stufe der Konfiguration, während der Verlauf beibehalten wird  
- `addTask` erzeugt neue Aufgaben mit simulierten Datenbank-IDs und verfolgt die Operation  
- `upsertTask` aktualisiert eine vorhandene Aufgabe anhand der ID, wobei der Verlauf beibehalten wird  
- `deleteTask` entfernt Aufgaben anhand der ID mit Verlauf-Verfolgung
- Ähnliche Muster werden für Verknüpfungsoperationen verwendet (`addLink`, `upsertLink`, `deleteLink`)

Jede modifizierende Aktion ruft `this._saveToHistory()` **vor** der Durchführung der Änderungen auf, damit jeder Zustandstransition gespeichert und reversibel ist.

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
- React Gantt hinzugefügt und mit einem MobX-Store verbunden
- snapshotbasierte Undo/Redo im `GanttStore` mithilfe der Verlauf-Arrays `past`/`future` implementiert
- die Zoom-Konfiguration, Aufgaben und Links vollständig aus dem beobachtbaren MobX-Zustand gesteuert
- den `data.save` Callback verwendet, damit jede Änderung im Gantt-Diagramm in eine Store-Aktion überführt wird.

Dadurch bleibt die Gantt-Komponente vollständig deklarativ, während sämtliche Mutationslogik und Verlaufshandling im MobX-Zustand kapselt sind.

## GitHub Demo-Repository

Ein vollständiges, funktionsfähiges Projekt, das dieser Anleitung folgt, wird [auf GitHub bereitgestellt](https://github.com/dhtmlx/react-gantt-mobx-starter).

## Was kommt als Nächstes

Für weitere Schritte:

- Wiederholen Sie die Konzepte hinter diesem Beispiel in [](integrations/react/state/state-management-basics.md)
- Kombinieren Sie store-gesteuerten Zustand mit erweiterter Konfiguration und Templating im [React Gantt Overview](integrations/react/overview.md)
- Entdecken Sie dasselbe Muster mit anderen State-Management-Lösungen:
  - [React Gantt mit Redux Toolkit verwenden](integrations/react/state/redux-toolkit.md)
  - [React Gantt mit Zustand verwenden](integrations/react/state/zustand.md)
  - [React Gantt mit XState verwenden](integrations/react/state/xstate.md)
  - [React Gantt mit Jotai verwenden](integrations/react/state/jotai.md)
  - [React Gantt mit Valtio verwenden](integrations/react/state/valtio.md)
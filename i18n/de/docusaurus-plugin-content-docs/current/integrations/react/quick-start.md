---
title: Schnellstart mit React Gantt
sidebar_label: Schnellstart
description: "Schritt-für-Schritt-Anleitung zur Verwendung der React Gantt-Komponente"
---

# Schnellstart mit React Gantt

:::note
Dieses Tutorial behandelt den React-Wraper, der in den **Commercial, Enterprise und Ultimate** Editionen von DHTMLX Gantt enthalten ist. 
Falls Sie die **Individual**- oder **GPL**-Edition verwenden, folgen Sie der alternativen Anleitung: 
[How to Start with React](integrations/react/js-gantt-react.md).
:::

Die **React Gantt**-Komponente ist der offizielle Wrapper für **DHTMLX Gantt**. 
Diese Anleitung führt Sie durch das Erstellen einer kleinen React-Anwendung und das Rendern eines grundlegenden Gantt-Diagramms mit dem Trial-Paket.

Wenn Sie neu bei React sind, beginnen Sie mit der offiziellen [React-Dokumentation](https://react.dev/learn). Prüfen Sie [ein vollständiges funktionsfähiges Projekt, das dieser Anleitung folgt, auf GitHub](https://github.com/dhtmlx/react-gantt-quick-start).

## Versionsanforderungen

- React **18 oder neuer**

## Erstellen eines neuen React-Projekts

Um ein React-Projekt zu erstellen und in das Projektverzeichnis zu wechseln, führen Sie die folgenden Befehle aus:

~~~bash
npm create vite@latest react-gantt-quick-start -- --template react-ts
cd react-gantt-quick-start
~~~

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

Wenn Sie bereits das Professional-Paket verwenden, ersetzen Sie `@dhtmlx/trial-react-gantt` durch `@dhx/react-gantt` in den Befehlen und Importen.

## Demo-Daten hinzufügen

Wir verwenden statische Daten für dieses Beispiel. Erstellen Sie eine Datei namens `src/demoData.ts`:

~~~ts
import type { Task, Link } from '@dhtmlx/trial-react-gantt';

export const tasks: Task[] = [
  { id: 1, text: "Office itinerancy", type: "project", start_date: new Date(2025, 3, 2), duration: 17, progress: 0.4, parent: 0, open: true },
  ...
];

export const links: Link[] = [
  { id: 2, source: 2, target: 3, type: "0" },
  ...
];
~~~

## Erstellung einer Gantt-Komponente

Um eine Gantt-Komponente hinzuzufügen, erstellen Sie eine Datei `src/components/Gantt/Gantt.tsx` mit folgendem Inhalt:

~~~tsx
import Gantt, {
  ReactGanttRef,
  Task,
  Link,
  GanttConfig
} from '@dhtmlx/trial-react-gantt';

import '@dhtmlx/trial-react-gantt/dist/react-gantt.css';
import { useRef } from 'react';

export interface GanttProps {
  tasks: Task[];
  links: Link[];
}

export default function GanttChart({ tasks, links }: GanttProps) {
  const ganttRef = useRef<ReactGanttRef>(null);

  const config: GanttConfig = {
    grid_width: 500,
    scale_height: 90,
    scales: [
      { unit: "year", step: 1, date: "%Y" },
      { unit: "month", step: 1, date: "%M" },
      { unit: "day", step: 1, date: "%d %M" }
    ]
  };

  return (
    <Gantt
      ref={ganttRef}
      tasks={tasks}
      links={links}
      config={config}
      data={{
        save: (entity, action, data, id) => {
          console.log(`${entity} - ${action} - ${id}`, data);
        }
      }}
    />
  );
}
~~~


## Rendering Gantt in der App

Um Gantt anzuzeigen, ersetzen Sie den Code von `src/App.tsx` durch den folgenden:

~~~tsx
import GanttChart from './components/Gantt/Gantt';
import { tasks, links } from './demoData';

export default function App() {
  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      <GanttChart tasks={tasks} links={links} />
    </div>
  );
}
~~~

Führen Sie anschließend die App mit dem folgenden Befehl aus:

~~~bash
npm run dev
~~~

An diesem Punkt haben Sie eine **voll funktionsfähige React + DHTMLX Gantt-Anwendung**.

Dies entspricht der **minimale Konfiguration**, die benötigt wird, um:

- ein Gantt-Diagramm zu rendern
- Aufgaben und Verbindungen anzuzeigen
- eine grundlegende Skalenkonfiguration anzuwenden
- die Gantt-Instanz über eine React-Ref anzuhängen
- Ereignisse über den `data.save`-Callback zu empfangen

Dies ist dasselbe minimale Beispiel, das im [GitHub-Demo-Projekt](https://github.com/dhtmlx/react-gantt-quick-start) verwendet wird.

Von hier aus können Sie fortfahren, indem Sie weitere fortgeschrittene Funktionen hinzufügen:

- Synchronisierung von Daten mit dem React-State
- Laden/Speichern von Daten aus Ihrem Backend
- Vorlagen und benutzerdefinierte Renderers hinzufügen
- Plugins aktivieren (Auto-Scheduling, Critical Path)
- Ressourcen, Kalender oder Gruppierung hinzufügen

Die nächsten Abschnitte führen diese Funktionen der Reihe nach ein.


## Verwendung von React-Zustand als Quelle der Wahrheit
(empfohlen für die meisten React-Apps)

In realen Anwendungen stammen Aufgaben und Links normalerweise aus dem React-Zustand. 
Nachfolgend ein vollständiges Beispiel, bei dem Gantt Änderungen zurück an React sendet über den `data.save`-Callback.

~~~tsx
import { useState } from "react";
import Gantt from "@dhtmlx/trial-react-gantt";
import "@dhtmlx/trial-react-gantt/dist/react-gantt.css";
import { tasks as initialTasks, links as initialLinks } from "./demoData";

export default function App() {
  const [tasks, setTasks] = useState(initialTasks);
  const [links, setLinks] = useState(initialLinks);

  return (
    <div style={{ height: "100vh" }}>
      <Gantt
        tasks={tasks}
        links={links}
        data={{
          save: (entity, action, item, id) => {
            if (entity === "task") {
              if (action === "create") setTasks(tasks => [...tasks, item]);
              if (action === "update") setTasks(tasks => tasks.map(x => x.id === id ? item : x));
              if (action === "delete") setTasks(tasks => tasks.filter(x => x.id !== id));
            }
            if (entity === "link") {
              if (action === "create") setLinks(links => [...links, item]);
              if (action === "update") setLinks(links => links.map(x => x.id === id ? item : x));
              if (action === "delete") setLinks(links => links.filter(x => x.id !== id));
            }
          }
        }}
      />
    </div>
  );
}
~~~

### Warum diese Variante

- React sieht immer dieselben Daten wie die Gantt-Oberfläche
- Funktioniert perfekt mit Redux / Zustand / Jotai / MobX
- Einfach, mit Backend-APIs zu synchronisieren


## Alternative Mode: Gantt als Quelle der Wahrheit
(nützlich für sehr große Datensätze oder starke Auto-Scheduling)

In diesem Modus besitzt React keine Aufgaben/Verbindungen.

~~~tsx
<Gantt
  data={{
    load: "/api/gantt-data",
    save: "/api/gantt-data"
  }}
/>
~~~

### Wann diese Modus bevorzugen

- Zehntausende von Aufgaben
- Viele Auto-Scheduling-Updates
- Sie möchten minimalen React-Rendering-Overhead


## Vorlagen verwenden
_(React-Elemente aus Template-Funktionen zurückgeben)_

Templates ermöglichen die Anpassung fast jedes Teils des Diagramms.

~~~tsx
const templates = {
  task_text: (start, end, task) => (
    <span style={{ color: "red" }}>#{task.id}: {task.text}</span>
  )
};

<Gantt templates={templates} />
~~~

### Weitere Details

Siehe den vollständigen Abschnitt hier: [React Gantt Templates Documentation](integrations/react/configuration-props.md).


## GitHub-Demo-Repository

Ein vollständiges funktionsfähiges Projekt, das dieser Anleitung folgt, wird [auf GitHub bereitgestellt](https://github.com/dhtmlx/react-gantt-quick-start).


## Nächste Schritte

- Studieren Sie alle verfügbaren [React Gantt-Eigenschaften](integrations/react/configuration-props.md)
- Erkunden Sie fortgeschrittene Gantt-Funktionen in den [Guides](guides.md)
---
title: React Gantt mit Remix
sidebar_label: Remix
---

# React Gantt mit Remix

**Remix Schnellstart**

Sie sollten mit den grundlegenden Konzepten von [React](https://react.dev/) und [Remix](https://remix.run/) vertraut sein. Wenn nicht, beziehen Sie vor Beginn dieser Anleitung auf deren offizielle Dokumentation Bezug.

In diesem Tutorial erstellen wir eine einfache Remix-Anwendung und rendern ein Gantt-Diagramm auf einer Seite.

## Ein Projekt erstellen

Bevor Sie ein neues Projekt erstellen, stellen Sie sicher, dass [Node.js](https://nodejs.org/) installiert ist.

Da Remix nun als Teil von **React Router v7** geliefert wird, ist der empfohlene Weg zum Scaffolden eines Projekts:

~~~bash
npx create-react-router@latest
~~~

Wenn Sie dazu aufgefordert werden, wählen Sie:
- Projektname: **react-gantt-remix-quick-start**
- Die Standardvorlage verwenden (React, TypeScript, TailwindCSS, SSR)
- **Install dependencies**: Ja

Dann wechseln Sie in Ihren Projektordner:

~~~bash
cd react-gantt-remix-quick-start
~~~

Und starten Sie den Entwicklungsserver:

~~~bash
npm run dev
~~~

Ihre Anwendung wird unter `http://localhost:5173` verfügbar sein.

## Schritt 1. Installation des React Gantt-Pakets

Installieren Sie React Gantt wie im [Installationsleitfaden für React Gantt](integrations/react/installation.md) beschrieben.

In diesem Tutorial verwenden wir das Evaluierungspaket:

~~~bash
npm install @dhtmlx/trial-react-gantt
~~~

oder

~~~bash
yarn add @dhtmlx/trial-react-gantt
~~~

Wenn Sie bereits das Professional-Paket verwenden, ersetzen Sie `@dhtmlx/trial-react-gantt` durch `@dhx/react-gantt` in den Befehlen und Imports.

Nach der Installation können wir unsere Daten und Komponente vorbereiten.

## Schritt 2. Vorbereiten der Demodaten

Im Ordner `app/` erstellen Sie ein neues Verzeichnis `data/` und fügen Sie die Datei `demoData.ts` mit dem Anfangsdatensatz hinzu:

~~~ts title="data/demoData.ts"
import type { Task, Link } from '@dhtmlx/trial-react-gantt';

export const tasks: Task[] = [
  { id: 1, text: "Office itinerancy", type: "project", start_date: new Date(2025, 3, 2), duration: 17, progress: 0.4, parent: 0, open: true },
  { id: 2, text: "Office facing", type: "project", start_date: new Date(2025, 3, 2), duration: 8, progress: 0.6, parent: 1, open: true },
  { id: 3, text: "Furniture installation", type: "project", start_date: new Date(2025, 3, 11), duration: 8, progress: 0.6, parent: 1, open: true },
  // ...
];

export const links: Link[] = [
  { id: 2, source: 2, target: 3, type: "0" },
  { id: 3, source: 3, target: 4, type: "0" },
  // ...
];
~~~

Diese Daten werden unserer Gantt-Komponente übergeben.

### Schritt 3. Erstellen der Gantt-Komponente

Remix ermöglicht die Verwendung von clientseitigen Komponenten über die standardmäßige React-Architektur. Wir werden eine dedizierte Komponente erstellen, um das Gantt-Diagramm zu rendern.

Erstellen Sie den Ordner `app/components/Gantt/`. Legen Sie darin die Datei `Gantt.tsx` an. Öffnen Sie die frisch erstellte Datei und fügen Sie folgenden Code ein:

~~~tsx title="app/components/Gantt/Gantt.tsx"
import { useMemo, useRef } from 'react';
import Gantt, { type ReactGanttRef, type Task, type Link, type GanttConfig } from '@dhtmlx/trial-react-gantt';
import '@dhtmlx/trial-react-gantt/dist/react-gantt.css';


export interface GanttProps {
  tasks: Task[];
  links: Link[];
}


export default function GanttChart({ tasks, links }: GanttProps) {
  const ganttRef = useRef<ReactGanttRef>(null);


  const config: GanttConfig = useMemo(
    () => ({
      grid_width: 500,
      scale_height: 90,
      scales: [
        { unit: 'year', step: 1, date: '%Y' },
        { unit: 'month', step: 1, date: '%M' },
        { unit: 'day', step: 1, date: '%d %M' },
      ],
    }),
    []
  );


  return (
    <Gantt
      ref={ganttRef}
      tasks={tasks}
      links={links}
      config={config}
      data={{
        save: (entity: string, action: string, data: Task | Link, id: string | number) => {
          console.log(`${entity} - ${action} - ${id}`, data);
        },
      }}
    />
  );
}
~~~

Diese Komponente initialisiert das Gantt-Diagramm und stellt ihm Konfiguration, anfängliche Daten und eine `ref` für zukünftige API-Aufrufe bereit. Das `config`-Objekt definiert Layout und Skalen, während `tasks`- und `links`-Props dem Diagramm seinen Datensatz liefern.

Die `save`-Funktion innerhalb der `data`-Property dient dazu, Aktualisierungen an Aufgaben und Verbindungen innerhalb des Gantt nachzuverfolgen. In diesem Tutorial fügen wir einen einfachen Platzhalter-Handler hinzu, um Änderungen zu verfolgen. Wenn Sie Aktualisierungen an ein Backend senden oder sie an den React-Zustand binden möchten, können Sie der offiziellen Datenbindung [Anleitung](integrations/react/overview.md#bindingdata) folgen.


## Schritt 4. Rendering des Gantt auf einer Remix-Route

Öffnen Sie die Hauptseiten-Route - `app/routes/home.tsx`.
Ersetzen Sie deren Inhalt durch Folgendes:

~~~tsx title="app/routes/home.tsx"
import GanttChart from '~/components/Gantt/Gantt';
import type { Route } from './+types/home';
import { tasks, links } from '~/data/demoData';


export function meta({}: Route.MetaArgs) {
  return [
    { title: 'DHTMLX React Gantt | Remix (React Router) Quick Start' },
    { name: 'description', content: 'DHTMLX React Gantt | Remix (React Router) Quick Start' },
  ];
}


export default function Home() {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <GanttChart tasks={tasks} links={links} />
    </div>
  );
}
~~~

Jetzt wird das Gantt-Diagramm unter der Route `/` angezeigt.

## Schritt 5. Anwendung starten

Starten Sie den Entwicklungsserver:

~~~bash
npm run dev
~~~

Öffnen Sie anschließend `http://localhost:5173` in Ihrem Browser. Sie sollten nun ein funktionsfähiges Gantt-Diagramm mit dem Beispiel-Datensatz sehen.

## Zusammenfassung

Sie haben eine minimale Remix-Anwendung mit DHTMLX React Gantt erstellt, Demodaten hinzugefügt und ein vollständig interaktives Gantt-Diagramm gerendert. Dies ist eine minimale Einrichtung, die zum Einstieg erforderlich ist, und sie entspricht dem, was Sie in Produktionsumgebungen verwenden werden.

## GitHub-Demorepository

Ein vollständiges funktionsfähiges Projekt, das diesem Tutorial folgt, wird [auf GitHub](https://github.com/dhtmlx/react-gantt-remix-starter) bereitgestellt.

Von hier aus können Sie Folgendes weiter erkunden:

- Durch React gesteuerter Datenfluss (integrations/react/overview.md#bindingdata).
- Dokumentation zu React Gantt-Vorlagen (integrations/react/configuration-props.md).
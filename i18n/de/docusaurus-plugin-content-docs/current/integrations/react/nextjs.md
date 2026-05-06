---
title: React Gantt mit Next.js
sidebar_label: Next.js
---

# React Gantt mit Next.js

**Next.js Schnellstart**

Sie sollten mit den grundlegenden Konzepten von [React](https://react.dev/) und [Next.js](https://nextjs.org/docs) vertraut sein. Falls nicht, lesen Sie vor dem Start dieses Leitfadens deren offizielle Dokumentation.

DHTMLX React Gantt ist vollständig kompatibel mit Next.js. In diesem Tutorial erstellen wir eine einfache Next.js-Anwendung und rendern ein Gantt-Diagramm auf einer Seite.

## Projekt erstellen

Bevor Sie ein neues Projekt erstellen, installieren Sie [Node.js](https://nodejs.org/).

Um eine Next.js-Anwendung zu scaffolden, führen Sie Folgendes aus:

~~~bash
npx create-next-app@latest
~~~

Bei Aufforderung wählen Sie:
- Projektname: **react-gantt-nextjs-quick-start**
- Verwenden Sie die Standardvorlage (TypeScript, ESLint, Tailwind CSS, App Router, Turbopack)

Next.js erstellt die Projektstruktur und installiert die grundlegenden Abhängigkeiten.

Nach der Installation wechseln Sie in das Projektverzeichnis:

~~~bash
cd react-gantt-nextjs-quick-start
~~~

## Schritt 1. Installation des React Gantt-Pakets

Installieren Sie React Gantt wie im [React Gantt-Installationsleitfaden](integrations/react/installation.md) beschrieben.

In diesem Tutorial verwenden wir das Evaluierungspaket:

~~~bash
npm install @dhtmlx/trial-react-gantt
~~~

oder

~~~bash
yarn add @dhtmlx/trial-react-gantt
~~~

Wenn Sie bereits das Professional-Paket verwenden, ersetzen Sie `@dhtmlx/trial-react-gantt` durch `@dhx/react-gantt` in den Befehlen und Imports.

Nach der Installation können wir die Daten einrichten und die Gantt-Komponente erstellen.

## Schritt 2. Vorbereiten der Demodaten

Erstellen Sie einen Ordner `data/` im Projektstamm. Fügen Sie darin eine Datei `demoData.ts` mit den anfänglichen Aufgaben und Verknüpfungen hinzu:

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

### Schritt 3. Erstellung der Gantt-Komponente

Next.js verwendet standardmäßig Server-Komponenten, aber React Gantt sollte in den meisten praktischen Fällen in einer Client-Komponente gerendert werden.

Dies ist erforderlich, wann immer Sie:

- `ref` verwenden, um auf die Gantt-Instanz zuzugreifen
- Callback-Funktionen (Events, Templates, Daten-Handler) übergeben
- ReactGantt `hooks` verwenden
- dynamische Konfiguration oder React-Elemente bereitstellen

Daher beginnt unsere Gantt-Komponente mit "use client".

Erstellen Sie eine neue Datei unter `components/Gantt/Gantt.tsx`

~~~tsx title="components/Gantt/Gantt.tsx"
"use client";

import { useRef } from "react";
import Gantt, { ReactGanttRef, Task, Link, GanttConfig } from "@dhtmlx/trial-react-gantt";
import "@dhtmlx/trial-react-gantt/dist/react-gantt.css";

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

Diese Komponente initialisiert das Gantt-Diagramm und stellt es mit Konfiguration, anfänglichen Daten und einem `ref` für zukünftige API-Aufrufe bereit. Das `config`-Objekt definiert das Layout und die Skalen, während `tasks`- und `links`-Props dem Diagramm den Datensatz liefern.

Die `save`-Funktion im `data`-Prop wird verwendet, um Aktualisierungen von Aufgaben und Verknüpfungen im Gantt nachzuverfolgen. In diesem Tutorial fügen wir einen einfachen Platzhalter-Handler hinzu, um Änderungen zu verfolgen. Wenn Sie Updates an ein Backend senden oder sie an den React-Zustand binden möchten, können Sie der offiziellen Anleitung zur Datenbindung [guide](integrations/react/overview.md#bindingdata) folgen.

## Schritt 4. Gantt zur Seite hinzufügen

Öffnen Sie `app/page.tsx` und rendern Sie das Gantt-Diagramm auf der Hauptseite:

~~~tsx title="app/page.tsx"
import Gantt from "../components/Gantt/Gantt";
import { tasks, links } from "../data/demoData";

export default function HomePage() {
  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      <Gantt tasks={tasks} links={links} />
    </div>
  );
}
~~~

Nun wird die Seite ein Vollbild-Gantt-Diagramm anzeigen.

## Schritt 5. Anwendung starten

Starten Sie den Entwicklungsserver:

~~~bash
npm run dev
~~~

Öffnen Sie dann `http://localhost:3000` in Ihrem Browser. Sie sollten nun ein funktionsfähiges Gantt-Diagramm sehen, das mit React Gantt innerhalb einer Next.js-Anwendung gerendert wird.

## Zusammenfassung

Sie haben ein minimales Next.js-Projekt mit DHTMLX React Gantt erstellt, Demodaten hinzugefügt und ein vollständig interaktives Gantt-Diagramm gerendert. Dies ist eine minimale Grundkonfiguration, um loszulegen, und sie entspricht dem, was Sie in Produktionsumgebungen verwenden werden.

## GitHub Demo-Repository

Ein vollständiges funktionsfähiges Projekt, das dieser Anleitung folgt, wird [auf GitHub bereitgestellt](https://github.com/dhtmlx/react-gantt-nextjs-starter).

Von hier aus können Sie weiter erkunden:

- [Durch React gesteuerter Datenfluss](integrations/react/overview.md#bindingdata).
- [Dokumentation zu React Gantt-Vorlagen](integrations/react/configuration-props.md).
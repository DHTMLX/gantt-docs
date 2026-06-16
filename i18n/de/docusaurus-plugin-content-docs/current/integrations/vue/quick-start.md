--- 
title: Schnellstart mit Vue Gantt
sidebar_label: Schnellstart
description: "Schritt-für-Schritt-Anleitung zum Rendern des offiziellen Vue Gantt-Wrappers in einer Vue 3 + Vite-Anwendung."
---

# Schnellstart mit Vue Gantt

:::note
Diese Anleitung behandelt den Vue-Wrapper, der in den **Commercial, Enterprise und Ultimate**-Editionen von DHTMLX Gantt enthalten ist. 
Wenn Sie die kostenlose **Community**-Edition (v10+) verwenden, eine Legacy **GPL**-Edition (v9.x und älter) oder die **Individual**-Edition, folgen Sie der alternativen Anleitung: 
[Wie man mit Vue beginnt](integrations/vue/js-gantt-vue.md).
:::

Die **Vue Gantt**-Komponente ist der offizielle Wrapper für **DHTMLX Gantt**. 
Diese Anleitung führt Sie durch die Erstellung einer kleinen Vue 3 + Vite-Anwendung und das Rendern eines grundlegenden Gantt-Diagramms mit dem Evaluierungspaket.

Wenn Sie neu bei Vue sind, beginnen Sie mit der offiziellen [Vue-Dokumentation](https://vuejs.org/guide/introduction.html).

Überprüfen Sie [ein vollständiges funktionsfähiges Projekt, das dieser Anleitung folgt auf GitHub](https://github.com/DHTMLX/vue-gantt-quick-start).

## Voraussetzungen

- Node.js installiert
- npm oder Yarn
- Vue 3-Projekt (diese Seite zeigt, wie man eines mit Vite erstellt)
- Zugriff auf das Vue Gantt-Paket (Evaluierung oder Professional)

## 1. Erstellen Sie ein Vue 3-Projekt

~~~bash
npm create vite@latest vue-gantt-quick-start -- --template vue-ts
cd vue-gantt-quick-start
npm install
~~~

Wenn Sie Yarn bevorzugen, ersetzen Sie den Installationsschritt durch `yarn`.

## 2. Installieren Sie Vue Gantt

Installieren Sie Vue Gantt wie im [Vue Gantt Installationsleitfaden](integrations/vue/installation.md).

In diesem Tutorial verwenden wir das Evaluierungspaket:

~~~bash
npm install @dhtmlx/trial-vue-gantt
~~~

oder

~~~bash
yarn add @dhtmlx/trial-vue-gantt
~~~

Wenn Sie bereits das Professional-Paket verwenden, ersetzen Sie `@dhtmlx/trial-vue-gantt` in den Befehlen und Imports durch `@dhx/vue-gantt`.

## 3. Demo-Daten hinzufügen

Erstellen Sie `src/demoData.ts` (für extern verwaltete Daten im Vue-Zustand, bevorzugen Sie `SerializedTask` / `SerializedLink`):

~~~ts title="src/demoData.ts"
import type { SerializedLink, SerializedTask } from "@dhtmlx/trial-vue-gantt";

export const tasks: SerializedTask[] = [
  {
    id: 1,
    text: "Office itinerancy",
    type: "project",
    start_date: new Date(2026, 0, 5),
    duration: 10,
    progress: 0.4,
    open: true,
    parent: 0
  },
  {
    id: 2,
    text: "Planning",
    start_date: new Date(2026, 0, 5),
    duration: 4,
    progress: 0.6,
    parent: 1
  }
];

export const links: SerializedLink[] = [{ id: 1, source: 1, target: 2, type: "0" }];
~~~

## 4. Eine Gantt-Komponente erstellen

Erstellen Sie `src/components/GanttChart.vue`:

~~~vue title="src/components/GanttChart.vue"
<script setup lang="ts">
import { ref } from "vue";
import VueGantt, {
  type SerializedLink,
  type SerializedTask,
  type VueGanttDataConfig
} from "@dhtmlx/trial-vue-gantt";
import "@dhtmlx/trial-vue-gantt/dist/vue-gantt.css";

import { links as initialLinks, tasks as initialTasks } from "../demoData";

const tasks = ref<SerializedTask[]>(initialTasks);
const links = ref<SerializedLink[]>(initialLinks);

const data: VueGanttDataConfig = {
  save: (entity, action, item, id) => {
    console.log("save", { entity, action, item, id });
  }
};
</script>

<template>
  <div style="height: 100%; width: 100%;">
    <VueGantt :tasks="tasks" :links="links" :data="data" />
  </div>
</template>
~~~


Wenn Sie das Professional-Paket verwenden, ersetzen Sie beide Imports:

- `@dhtmlx/trial-vue-gantt` -> `@dhx/vue-gantt`
- `@dhtmlx/trial-vue-gantt/dist/vue-gantt.css` -> `@dhx/vue-gantt/dist/vue-gantt.css`

## 5. Gantt in die App-Shell rendern

Ersetzen Sie `src/App.vue`:

~~~vue title="src/App.vue"
<script setup lang="ts">
import GanttChart from "./components/GanttChart.vue";
</script>

<template>
  <div style="height: 100vh; width: 100vw;">
    <GanttChart />
  </div>
</template>
~~~

## 6. Starten Sie die App

~~~bash
npm run dev
~~~

Öffnen Sie die lokale Vite-URL. Sie sollten ein funktionsfähiges Gantt-Diagramm sehen und Konsolenprotokolle, wenn Sie Aufgaben oder Links bearbeiten.

Wenn Sie Gantt zu einer bestehenden Anwendung hinzufügen, behalten Sie das aktuelle `App.vue`-Layout bei und rendern `<GanttChart />` in der Zielseite/-Komponente. Stellen Sie sicher, dass das übergeordnete Layout eine Höhe für den Gantt-Bereich bereitstellt.

## 7. (Optional) Logging durch lokales Speichern-Handling ersetzen

Verwenden Sie dies, wenn der Vue-Zustand bei Diagrammbearbeitungen synchron bleiben soll, bevor Sie ein Backend oder einen Store hinzufügen. Aktualisieren Sie `src/components/GanttChart.vue`.

~~~ts
const data: VueGanttDataConfig = {
  save: (entity, action, item, id) => {
    if (entity === "task") {
      if (action === "create") tasks.value = [...tasks.value, item as SerializedTask];
      if (action === "update") tasks.value = tasks.value.map(t => String(t.id) === String(id) ? item as SerializedTask : t);
      if (action === "delete") tasks.value = tasks.value.filter(t => String(t.id) !== String(id));
    }

    if (entity === "link") {
      if (action === "create") links.value = [...links.value, item as SerializedLink];
      if (action === "update") links.value = links.value.map(l => String(l.id) === String(id) ? item as SerializedLink : l);
      if (action === "delete") links.value = links.value.filter(l => String(l.id) !== String(id));
    }
  }
};
~~~

Für Mehrfachänderungen (z. B. automatische Terminplanung) bevorzugen Sie `data.batchSave`.

## Ergebnis

Sie haben jetzt eine Vue 3-Anwendung, die den offiziellen Vue Gantt-Wrapper rendert mit:

- reaktiven Props `tasks` und `links`
- importierter Wrapper-CSS
- Verkabelung des `data.save`-Callbacks für Benutzereingaben

Dies ist dasselbe minimale Beispiel, das im [GitHub-Demoprojekt](https://github.com/DHTMLX/vue-gantt-quick-start) verwendet wird.

## GitHub-Demorepository

Ein vollständiges funktionsfähiges Projekt, das dieser Anleitung folgt, befindet sich [auf GitHub](https://github.com/DHTMLX/vue-gantt-quick-start).

## Was als Nächstes gelesen werden sollte

- [Vue Gantt Überblick](integrations/vue/overview.md)
- [Konfigurationsreferenz](integrations/vue/configuration-props.md)
- [Datenbindung und Grundlagen der Zustandsverwaltung](integrations/vue/state/state-management-basics.md)
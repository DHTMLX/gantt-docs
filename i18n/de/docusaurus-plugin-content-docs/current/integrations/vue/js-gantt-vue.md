---  
title: "dhtmlxGantt mit Vue.js"  
sidebar_label: "Integration auf niedriger Ebene"  
description: "Schritt-für-Schritt-Anleitung zur Verwendung des JS DHTMLX Gantt in einer Vue-Anwendung ohne den offiziellen Vue-Wrapper."  
---

# dhtmlxGantt mit Vue.js

:::note
Dieses Tutorial zeigt, wie man das JS DHTMLX Gantt-Paket direkt in einer Vue-Anwendung ohne den offiziellen Wrapper verwendet.

Wenn du Vue-Props/Ereignisse, wrapper-verwaltete Synchronisation und wrapper-Komposables brauchst, benutze stattdessen [Vue Gantt](integrations/vue.md).
:::

Diese Seite behandelt die Integration auf niedriger Ebene. Du initialisierst und verwaltest die Gantt-Instanz selbst.

## Voraussetzungen

- Node.js installiert
- Grundkenntnisse von Vue 3 (Komponenten, Refs, Lebenszyklus-Hooks)
- Ein Vue 3-Projekt (dieses Tutorial zeigt, wie man eins mit Vite erstellt)

## 1. Erstelle ein Vue-Projekt

Erstelle eine Vue 3-Anwendung mit Vite:

~~~bash
npm create vue@latest gantt-vue-app
cd gantt-vue-app
~~~

Installiere Abhängigkeiten und starte den Dev-Server einmal, um zu bestätigen, dass das Projekt funktioniert:

- npm:

~~~bash
npm install
npm run dev
~~~

- yarn:

~~~bash
yarn install
yarn dev
~~~

Die App sollte unter `http://localhost:5173` erreichbar sein.

![Gantt Vue app running](/img/gantt_vue_app_run.png)

Beende den Dev-Server (`Ctrl+C`) vor dem nächsten Schritt.

## 2. Installiere das JS Gantt-Paket

Professionelle Builds der JS Gantt-Bibliothek sind über private npm-Quellen verfügbar. Befolge die [Installationsanleitung](guides/installation.md#npmevaluationandproversions), um Zugriff zu erhalten.

Evaluations-Build (öffentliches Tutorial-Paket):

- npm:

~~~bash
npm install @dhx/trial-gantt
~~~

- yarn:

~~~bash
yarn add @dhx/trial-gantt
~~~

Professioneller Build (privates npm):

- npm:

~~~bash
npm install @dhx/gantt
~~~

- yarn:

~~~bash
yarn add @dhx/gantt
~~~

Du kannst Gantt auch aus einem lokalen Ordner installieren, weil das Paket als npm-Modul strukturiert ist.

## 3. Erstelle eine Gantt-Komponente

Erstelle `src/components/GanttView.vue` und initialisiere Gantt in den Vue-Lifecycle-Hooks.

Falls du den Evaluations-Build installiert hast, verwende diese Importe:

~~~vue title="src/components/GanttView.vue"
<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from "vue";
import { Gantt, type GanttStatic } from "@dhx/trial-gantt";
import "@dhx/trial-gantt/codebase/dhtmlxgantt.css";

const container = ref<HTMLElement | null>(null);
let gantt: GanttStatic | null = null;

onMounted(() => {
  if (!container.value) return;

  gantt = Gantt.getGanttInstance();
  gantt.init(container.value);
});

onBeforeUnmount(() => {
  gantt?.destructor();
  gantt = null;
});
</script>

<template>
  <div ref="container" class="gantt-host"></div>
</template>

<style>
.gantt-host {
  width: 100%;
  height: 600px;
}
</style>
~~~  

Falls du den professionellen Build installiert hast, ersetze die Paket-Imports wie folgt:

~~~ts
import { Gantt, type GanttStatic } from "@dhx/gantt";
import "@dhx/gantt/codebase/dhtmlxgantt.css";
~~~  

Wenn du Gantt aus einem lokalen Ordner-Paket installiert hast, sehen die Importe üblicherweise so aus:

~~~ts
import { Gantt, type GanttStatic } from "dhtmlx-gantt";
import "dhtmlx-gantt/codebase/dhtmlxgantt.css";
~~~

## 4. Die Gantt-Komponente in der App rendern

Ersetze `src/App.vue`:

~~~vue title="src/App.vue"
<script setup lang="ts">
import GanttView from "./components/GanttView.vue";
</script>

<template>
  <GanttView />
</template>
~~~  

Damit die Grafik die Seitenhöhe nutzt, aktualisiere deine globalen Styles (zum Beispiel `src/assets/main.css`):

~~~css title="src/assets/main.css"
html,
body,
#app {
  width: 100%;
  height: 100vh;
  margin: 0;
  padding: 0;
}
~~~  

Starte die App erneut. Du solltest ein leeres Gantt-Diagramm sehen.

## 5. Daten bereitstellen

Erstelle `src/demo-data.ts`:

~~~ts title="src/demo-data.ts"
export function getData() {
  return {
    data: [
      {
        id: 10,
        text: "Project #1",
        start_date: "2026-02-02 00:00",
        duration: 6,
        progress: 0.4,
        open: true
      },
      {
        id: 1,
        text: "Task #1",
        start_date: "2026-02-02 00:00",
        duration: 2,
        progress: 0.6,
        parent: 10
      },
      {
        id: 2,
        text: "Task #2",
        start_date: "2026-02-04 00:00",
        duration: 3,
        progress: 0.2,
        parent: 10
      }
    ],
    links: [{ id: 1, source: 1, target: 2, type: "0" }]
  };
}
~~~  

Aktualisiere `src/components/GanttView.vue` und parse die Daten:

~~~vue title="src/components/GanttView.vue"
<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from "vue";
import { Gantt, type GanttStatic } from "@dhx/trial-gantt";
import "@dhx/trial-gantt/codebase/dhtmlxgantt.css";
import { getData } from "../demo-data";

const container = ref<HTMLElement | null>(null);
let gantt: GanttStatic | null = null;

onMounted(() => {
  if (!container.value) return;

  gantt = Gantt.getGanttInstance();
  gantt.config.date_format = "%Y-%m-%d %H:%i";
  gantt.init(container.value);
  gantt.parse(getData());
});

onBeforeUnmount(() => {
  gantt?.destructor();
  gantt = null;
});
</script>

<template>
  <div ref="container" class="gantt-host"></div>
</template>

<style>
.gantt-host {
  width: 100%;
  height: 600px;
}
</style>
~~~  

Lade die Seite neu. Du solltest ein Gantt-Diagramm mit Aufgaben und einer Abhängigkeitsverknüpfung sehen.

## 6. Änderungen erfassen und speichern

Verwende einen [dataProcessor](api/method/dataprocessor.md), um Diagrammänderungen zu verarbeiten und an dein Backend zu senden.

Füge nach `gantt.init(...)` einen Handler hinzu:

~~~ts
gantt.createDataProcessor((entity, action, data, id) => {
  console.log("[dp]", entity, action, data, id);
});
~~~  

DHTMLX Gantt akzeptiert Promise-Antworten von `dataProcessor`-Handlern. Wenn dein Backend IDs beim Erstellen ändert, gib ein Objekt wie `{ id: newId }` oder `{ tid: newId }` zurück, damit Gantt den Datensatz neu abbilden kann.

Für vollständige Backend-Muster siehe [server-side integration](guides/server-side.md).

## Ergebnis

Du hast jetzt eine Vue-App mit direkter JS Gantt-Integration:

- Vue besitzt den Komponentenlebenszyklus
- dein Code initialisiert und zerstört die Gantt-Instanz
- Daten werden mit `gantt.parse(...)` geladen
- Änderungen können mit `gantt.createDataProcessor(...)` verarbeitet werden

## Sicherheits-Hinweis

Gantt schützt dein Backend nicht vor SQL-Injektion, XSS oder CSRF. Backend-Validierung, Autorisierung und Ausgabesäuberung bleiben deine Verantwortung.

Lies [Application Security](guides/app-security.md) zu den wichtigsten Risikobereichen und Hinweisen zu deren Minderung.

## Was Als Nächstes Zu Lesen Ist

- [Vue Gantt (offizieller Wrapper)](integrations/vue.md)
- [Vue Gantt Übersicht](integrations/vue/overview.md)
- [DHTMLX Gantt Leitfäden](guides.md)
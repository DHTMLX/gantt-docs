---
title: Vue Gantt mit Pinia
sidebar_label: Pinia
description: "Schritt-für-Schritt-Integration von Pinia in Vue Gantt: Store-Struktur, Callback-Verkettung und optionales Undo/Redo auf Store-Ebene."
---

# Vue Gantt + Pinia Tutorial

Dieses Tutorial zeigt eine store-gesteuerte Vue Gantt-Integration mit Pinia. Es folgt derselben Architektur wie die öffentlichen Vue-Beispiele: Der Store besitzt `tasks` und `links`, und Wrapper-Callbacks übertragen Diagrammbearbeitungen zurück in den Store.

## Prerequisites

- Vue 3-Projekt
- Pinia installiert (oder Berechtigung, es hinzuzufügen)
- Vue Gantt-Paket installiert
- Grundlegendes Verständnis von [Datenbindung und Grundlagen der Zustandsverwaltung](integrations/vue/state/state-management-basics.md)

## 1. Pinia installieren und registrieren

Wenn Pinia noch nicht installiert ist:

~~~bash
npm install pinia
~~~

Registrieren Sie Pinia in `src/main.ts`:

~~~ts title="src/main.ts"
import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";

createApp(App).use(createPinia()).mount("#app");
~~~

## 2. Vue Gantt installieren

Installieren Sie Vue Gantt wie in der [Vue Gantt-Installationsanleitung](integrations/vue/installation.md) beschrieben.

In diesem Tutorial verwenden wir das Evaluierungspaket:

~~~bash
npm install @dhtmlx/trial-vue-gantt
~~~

oder

~~~bash
yarn add @dhtmlx/trial-vue-gantt
~~~

Wenn Sie bereits das Professional-Paket verwenden, ersetzen Sie `@dhtmlx/trial-vue-gantt` durch `@dhx/vue-gantt` in den Befehlen und Importen.

## 3. Demo-Daten hinzufügen

Erstellen Sie `src/demoData.ts`:

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

## 4. Einen Basis-Gantt-Store erstellen

Erstellen Sie `src/stores/ganttStore.ts`:

~~~ts title="src/stores/ganttStore.ts"
import { defineStore } from "pinia";
import type { BatchChanges, SerializedLink, SerializedTask } from "@dhtmlx/trial-vue-gantt";
import { links, tasks } from "../demoData";

type ZoomLevel = "day" | "month" | "year";

const zoomLevels = [
  {
    name: "day",
    scale_height: 27,
    min_column_width: 80,
    scales: [{ unit: "day", step: 1, format: "%d %M" }]
  },
  {
    name: "month",
    scale_height: 50,
    min_column_width: 120,
    scales: [
      { unit: "month", format: "%F, %Y" },
      { unit: "week", format: "Week #%W" }
    ]
  },
  {
    name: "year",
    scale_height: 50,
    min_column_width: 36,
    scales: [{ unit: "year", step: 1, format: "%Y" }]
  }
];

function applyBatchChanges(tasks: SerializedTask[], links: SerializedLink[], changes: BatchChanges) {
  let nextTasks = [...tasks];
  let nextLinks = [...links];

  for (const change of changes.tasks || []) {
    if (change.action === "create") nextTasks.push(change.data as SerializedTask);
    if (change.action === "update") {
      nextTasks = nextTasks.map(t => String(t.id) === String(change.id) ? change.data as SerializedTask : t);
    }
    if (change.action === "delete") {
      nextTasks = nextTasks.filter(t => String(t.id) !== String(change.id));
    }
  }

  for (const change of changes.links || []) {
    if (change.action === "create") nextLinks.push(change.data as SerializedLink);
    if (change.action === "update") {
      nextLinks = nextLinks.map(l => String(l.id) === String(change.id) ? change.data as SerializedLink : l);
    }
    if (change.action === "delete") {
      nextLinks = nextLinks.filter(l => String(l.id) !== String(change.id));
    }
  }

  return { tasks: nextTasks, links: nextLinks };
}

export const useGanttStore = defineStore("gantt", {
  state: () => ({
    tasks: tasks,
    links: links,
    zoomLevel: "day" as ZoomLevel
  }),
  getters: {
    config: state => ({
      zoom: {
        current: state.zoomLevel,
        levels: zoomLevels
      }
    })
  },
  actions: {
    setZoom(level: ZoomLevel) {
      this.zoomLevel = level;
    },
    applyBatch(changes: BatchChanges) {
      const next = applyBatchChanges(this.tasks, this.links, changes);
      this.tasks = next.tasks;
      this.links = next.links;
    }
  }
});
~~~

Dieser Store bildet eine einzige Quelle der Wahrheit:

- `tasks` und `links` sind kanonische Daten
- `config` ist abgeleiteter Zustand
- `applyBatch` ist der Einstiegspunkt des Wrapper-Callbacks

## 5. Store-Zustand an `VueGantt` binden

Erstellen Sie `src/components/GanttChart.vue`:

~~~vue title="src/components/GanttChart.vue"
<script setup lang="ts">
import { storeToRefs } from "pinia";
import VueGantt, { type BatchChanges } from "@dhtmlx/trial-vue-gantt";
import "@dhtmlx/trial-vue-gantt/dist/vue-gantt.css";

import { useGanttStore } from "../stores/ganttStore";

const store = useGanttStore();
const { tasks, links, config, zoomLevel } = storeToRefs(store);

const data = {
  batchSave: (changes: BatchChanges) => store.applyBatch(changes)
};

const setZoom = (level: "day" | "month" | "year") => {
  store.setZoom(level);
};
</script>

<template>
  <section>
    <div style="display:flex; gap:8px; margin-bottom:10px;">
      <button type="button" :class="{ active: zoomLevel === 'day' }" @click="setZoom('day')">Day</button>
      <button type="button" :class="{ active: zoomLevel === 'month' }" @click="setZoom('month')">Month</button>
      <button type="button" :class="{ active: zoomLevel === 'year' }" @click="setZoom('year')">Year</button>
    </div>

    <div style="height: 80vh;">
      <VueGantt :tasks="tasks" :links="links" :config="config" :data="data" />
    </div>
  </section>
</template>
~~~

Dies ist die Kernverkabelung des Wrappers:

- store-Werte -> Wrapper-Props
- `batchSave` -> Store-Aktion
- Store-Aktion -> neuer Zustand -> Wrapper-Props erneut

## 6. Gantt in der App-Hülle rendern

Ersetzen Sie `src/App.vue`:

~~~vue title="src/App.vue"
<script setup lang="ts">
import GanttChart from "./components/GanttChart.vue";
</script>

<template>
  <div :style="{ height: '100%', width: '100%' }">
    <GanttChart />
  </div>
</template>
~~~

## 7. Den Datenfluss verifizieren

Verwenden Sie diesen Ablauf für stabile Updates:

1. Store stellt `tasks`, `links` und abgeleiteten `config` bereit.
2. `VueGantt` rendert aus Props.
3. Benutzerbearbeitungen im Diagramm lösen `data.batchSave` aus.
4. Store-Aktion (`applyBatch`) führt die Änderungen zusammen.
5. Aktualisierter Zustand fließt zurück in `VueGantt`.

Mischen Sie dies nicht mit direkten Instanz-Mutationen, es sei denn, Sie aktualisieren auch den Store.

## 8. (Optional) Undo/Redo auf Store-Ebene hinzufügen

Verwenden Sie dies, wenn Sie Undo/Redo wünschen, während Pinia die Quelle der Wahrheit bleibt.

Aktivieren Sie in diesem Modus nicht `gantt.plugins({ undo: true })`.

### 8.1 Ersetzen Sie den Store durch eine History-Version

Ersetzen Sie den Store aus Schritt 2 durch diese Version.
Er hält den Zustand vom Typ `SerializedTask[]` / `SerializedLink[]` und vermeidet `as any`-Zuweisungen beim Klonen von Datumswerten.

~~~ts title="src/stores/ganttStore.ts"
import { defineStore } from "pinia";
import type { BatchChanges, SerializedLink, SerializedTask } from "@dhtmlx/trial-vue-gantt";
import { links, tasks } from "../demoData";

type ZoomLevel = "day" | "month" | "year";

type Snapshot = {
  tasks: SerializedTask[];
  links: SerializedLink[];
  zoomLevel: ZoomLevel;
};

type HistoryState = {
  tasks: SerializedTask[];
  links: SerializedLink[];
  zoomLevel: ZoomLevel;
  past: Snapshot[];
  future: Snapshot[];
  maxHistory: number;
};

const zoomLevels = [
  {
    name: "day",
    scale_height: 27,
    min_column_width: 80,
    scales: [{ unit: "day", step: 1, format: "%d %M" }]
  },
  {
    name: "month",
    scale_height: 50,
    min_column_width: 120,
    scales: [
      { unit: "month", format: "%F, %Y" },
      { unit: "week", format: "Week #%W" }
    ]
  },
  {
    name: "year",
    scale_height: 50,
    min_column_width: 36,
    scales: [{ unit: "year", step: 1, format: "%Y" }]
  }
];

function applyBatchChanges(tasks: SerializedTask[], links: SerializedLink[], changes: BatchChanges) {
  let nextTasks = [...tasks];
  let nextLinks = [...links];

  for (const change of changes.tasks || []) {
    if (change.action === "create") nextTasks.push(change.data as SerializedTask);
    if (change.action === "update") {
      nextTasks = nextTasks.map(t => String(t.id) === String(change.id) ? change.data as SerializedTask : t);
    }
    if (change.action === "delete") {
      nextTasks = nextTasks.filter(t => String(t.id) !== String(change.id));
    }
  }

  for (const change of changes.links || []) {
    if (change.action === "create") nextLinks.push(change.data as SerializedLink);
    if (change.action === "update") {
      nextLinks = nextLinks.map(l => String(l.id) === String(change.id) ? change.data as SerializedLink : l);
    }
    if (change.action === "delete") {
      nextLinks = nextLinks.filter(l => String(l.id) !== String(change.id));
    }
  }

  return { tasks: nextTasks, links: nextLinks };
}

const cloneDate = (value: Date | string | undefined): Date | string | undefined => {
  if (value instanceof Date) return new Date(value.getTime());
  return value;
};

const cloneTask = (task: SerializedTask): SerializedTask => {
  const next: SerializedTask = { ...task };
  next.start_date = cloneDate(task.start_date);
  next.end_date = cloneDate(task.end_date);
  return next;
};

const cloneLink = (link: SerializedLink): SerializedLink => ({ ...link });

const createSnapshot = (state: HistoryState): Snapshot => ({
  tasks: state.tasks.map(cloneTask),
  links: state.links.map(cloneLink),
  zoomLevel: state.zoomLevel
});

export const useGanttStore = defineStore("gantt", {
  state: () => ({
    tasks: tasks,
    links: links,
    zoomLevel: "day" as ZoomLevel,
    past: [] as Snapshot[],
    future: [] as Snapshot[],
    maxHistory: 50
  }),
  getters: {
    config: state => ({
      zoom: {
        current: state.zoomLevel,
        levels: zoomLevels
      }
    }),
    canUndo: state => state.past.length > 0,
    canRedo: state => state.future.length > 0
  },
  actions: {
    pushHistory() {
      this.past = [...this.past, createSnapshot(this as HistoryState)];
      if (this.past.length > this.maxHistory) {
        this.past = this.past.slice(this.past.length - this.maxHistory);
      }
      this.future = [];
    },
    restoreSnapshot(snapshot: Snapshot) {
      this.tasks = snapshot.tasks.map(cloneTask);
      this.links = snapshot.links.map(cloneLink);
      this.zoomLevel = snapshot.zoomLevel;
    },
    setZoom(level: ZoomLevel) {
      if (this.zoomLevel === level) return;
      this.pushHistory();
      this.zoomLevel = level;
    },
    applyBatch(changes: BatchChanges) {
      const hasChanges = (changes.tasks?.length ?? 0) > 0 || (changes.links?.length ?? 0) > 0;
      if (!hasChanges) return;

      this.pushHistory();
      const next = applyBatchChanges(this.tasks, this.links, changes);
      this.tasks = next.tasks;
      this.links = next.links;
    },
    undo() {
      if (this.past.length === 0) return;

      const previous = this.past[this.past.length - 1];
      const current = createSnapshot(this as HistoryState);

      this.past = this.past.slice(0, -1);
      this.future = [current, ...this.future];
      this.restoreSnapshot(previous);
    },
    redo() {
      if (this.future.length === 0) return;

      const next = this.future[0];
      const current = createSnapshot(this as HistoryState);

      this.future = this.future.slice(1);
      this.past = [...this.past, current];
      if (this.past.length > this.maxHistory) {
        this.past = this.past.slice(this.past.length - this.maxHistory);
      }
      this.restoreSnapshot(next);
    }
  }
});
~~~

### 8.2 Undo/Redo-Schaltflächen zur Komponente hinzufügen

Aktualisieren Sie `src/components/GanttChart.vue`:

~~~vue title="src/components/GanttChart.vue"
<script setup lang="ts">
import { storeToRefs } from "pinia";
import VueGantt, { type BatchChanges } from "@dhtmlx/trial-vue-gantt";
import "@dhtmlx/trial-vue-gantt/dist/vue-gantt.css";

import { useGanttStore } from "../stores/ganttStore";

const store = useGanttStore();
const { tasks, links, config, zoomLevel, canUndo, canRedo } = storeToRefs(store);

const data = {
  batchSave: (changes: BatchChanges) => store.applyBatch(changes)
};

const setZoom = (level: "day" | "month" | "year") => {
  store.setZoom(level);
};
</script>

<template>
  <section>
    <div style="display:flex; gap:8px; margin-bottom:10px;">
      <button type="button" :disabled="!canUndo" @click="store.undo()">Undo</button>
      <button type="button" :disabled="!canRedo" @click="store.redo()">Redo</button>
      <button type="button" :class="{ active: zoomLevel === 'day' }" @click="setZoom('day')">Day</button>
      <button type="button" :class="{ active: zoomLevel === 'month' }" @click="setZoom('month')">Month</button>
      <button type="button" :class="{ active: zoomLevel === 'year' }" @click="setZoom('year')">Year</button>
    </div>

    <div style="height: 80vh;">
      <VueGantt :tasks="tasks" :links="links" :config="config" :data="data" />
    </div>
  </section>
</template>
~~~

### 8.3 Warum Store-Verlauf verwenden?

Verwenden Sie hier den Verlauf auf Store-Ebene, weil der Store die Quelle der Wahrheit ist:

- Die Vue-Oberfläche und das Diagramm bleiben durch dieselben Zustandsübergänge synchron
- `maxHistory` begrenzt den Speicherverbrauch
- Jede neue Mutation löscht automatisch den Redo-Verlauf
- Sie vermeiden zwei unabhängig arbeitende Verlaufssysteme

## Ergebnis

Sie haben nun eine Pinia-basierte Integration, bei der:

- Pinia besitzt `tasks` und `links`
- `data.batchSave` wendet Diagrammbearbeitungen auf den Store an
- `VueGantt` rendert erneut aus dem Store-Zustand
- Undo/Redo kann hinzugefügt werden, ohne die Eigentümerschaft an der Gantt-Instanz zu wechseln

## Häufige Fallstricke

- Den Store-Zustand mit veralteten API-Snapshots nach Diagrammbearbeitungen ersetzen
- `data.save` für Operationen mit hohem Volumen verwenden, wenn `batchSave` besser geeignet ist
- Eigentümerschaft des Stores mit direkten Instanzmutationen mischen und den Zustand nicht abgleichen
- Das integrierte Gantt-Undo-Plugin zusammen mit dem Verlauf auf Store-Ebene aktivieren

## GitHub-Demo-Repository

Ein vollständiges, funktionsfähiges Projekt, das dieser Anleitung folgt, ist [auf GitHub verfügbar](https://github.com/DHTMLX/vue-gantt-pinia-starter).

## Was Als Nächstes Lesen

- [Datenbindung und Grundlagen der Zustandsverwaltung](integrations/vue/state/state-management-basics.md)
- [Konfigurationsreferenz](integrations/vue/configuration-props.md)
- [Vue Gantt Übersicht](integrations/vue/overview.md)
- [Anpassungsmuster](integrations/vue/customization-patterns.md)
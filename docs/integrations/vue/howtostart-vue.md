---
title: "dhtmlxGantt with Vue.js"
sidebar_label: "Low-Level Integration"
description: "Step-by-step guide to using the JS DHTMLX Gantt in a Vue app without the official Vue wrapper."
---

# dhtmlxGantt with Vue.js

:::note
This tutorial shows how to use the JS DHTMLX Gantt package directly in a Vue app without the official wrapper.

If you want Vue props/events, wrapper-managed sync, and wrapper composables, use [Vue Gantt](integrations/vue/index.md) instead.
:::

This page is for low-level integration. You initialize and manage the Gantt instance yourself.

## Prerequisites

- Node.js installed
- Basic Vue 3 knowledge (components, refs, lifecycle hooks)
- A Vue 3 project (this tutorial shows how to create one with Vite)

## 1. Create A Vue Project

Create a Vue 3 app with Vite:

~~~bash
npm create vue@latest gantt-vue-app
cd gantt-vue-app
~~~

Install dependencies and start the dev server once to confirm the project works:

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

The app should be available at `http://localhost:5173`.

![Gantt Vue app running](/img/gantt_vue_app_run.png)

Stop the dev server (`Ctrl+C`) before the next step.

## 2. Install The JS Gantt Package

Professional builds of the JS Gantt library are available via private npm. Follow the [installation guide](guides/installation.md#npmevaluationandproversions) to get access.

Evaluation build (public tutorial package):

- npm:

~~~bash
npm install @dhx/trial-gantt
~~~

- yarn:

~~~bash
yarn add @dhx/trial-gantt
~~~

Professional build (private npm):

- npm:

~~~bash
npm install @dhx/gantt
~~~

- yarn:

~~~bash
yarn add @dhx/gantt
~~~

You can also [install Gantt from a local folder](guides/installation.md#installfromlocalfolder) because the package is structured as an npm module.

## 3. Create A Gantt Component

Create `src/components/GanttView.vue` and initialize Gantt in Vue lifecycle hooks.

If you installed the evaluation build, use these imports:

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

If you installed the professional build, replace the package imports:

~~~ts
import { Gantt, type GanttStatic } from "@dhx/gantt";
import "@dhx/gantt/codebase/dhtmlxgantt.css";
~~~

If you installed Gantt from a local folder package, imports usually look like this:

~~~ts
import { Gantt, type GanttStatic } from "dhtmlx-gantt";
import "dhtmlx-gantt/codebase/dhtmlxgantt.css";
~~~

## 4. Render The Gantt Component In The App

Replace `src/App.vue`:

~~~vue title="src/App.vue"
<script setup lang="ts">
import GanttView from "./components/GanttView.vue";
</script>

<template>
  <GanttView />
</template>
~~~

To let the chart use the page height, update your global styles (for example `src/assets/main.css`):

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

Start the app again. You should see an empty Gantt chart.

## 5. Provide Data

Create `src/demo-data.ts`:

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

Update `src/components/GanttView.vue` and parse the data:

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

Reload the page. You should see a Gantt chart with tasks and a dependency link.

## 6. Capture And Save Changes

Use a [dataProcessor](api/method/dataprocessor.md) to handle chart changes and send them to your backend.

Add a handler after `gantt.init(...)`:

~~~ts
gantt.createDataProcessor((entity, action, data, id) => {
  console.log("[dp]", entity, action, data, id);
});
~~~

DHTMLX Gantt accepts Promise responses from `dataProcessor` handlers. If your backend changes IDs on create, return an object like `{ id: newId }` or `{ tid: newId }` so Gantt can remap the record.

For full backend patterns, see [server-side integration](guides/server-side.md).

## Result

You now have a Vue app with direct JS Gantt integration:

- Vue owns the component lifecycle
- your code initializes and destroys the Gantt instance
- data is loaded with `gantt.parse(...)`
- edits can be handled with `gantt.createDataProcessor(...)`

## Security Note

Gantt does not protect your backend from SQL injection, XSS, or CSRF. Backend validation, authorization, and output sanitization remain your responsibility.

Read [Application Security](guides/app-security.md) for the main risk areas and mitigation guidance.

## What To Read Next

- [Vue Gantt (official wrapper)](integrations/vue/index.md)
- [Vue Gantt Overview](integrations/vue/overview.md)
- [DHTMLX Gantt Guides](guides.md)

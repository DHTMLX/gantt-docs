---
title: Vue Gantt Customization
sidebar_label: Customization
description: "Customization patterns for Vue Gantt: templates, custom lightbox, inline editors, modals, events, ready hook, and template wrapping."
---

# Vue Gantt Customization

This article focuses on high-value customization patterns that are commonly needed after initial integration.

Use this page with:

- [Vue Gantt Overview](integrations/vue/overview.md)
- [Configuration Reference](integrations/vue/configuration-props.md)

## Template-Driven Visual Customization

Use `templates` when you want to control task text, CSS classes, scale rendering, or grid cell output.

~~~vue
<script setup lang="ts">
const templates = {
  task_text: (_start, _end, task) => `#${task.id}: ${task.text}`,
  task_class: (_start, _end, task) => (task.priority === "high" ? "task--high" : "")
};
</script>

<template>
  <VueGantt :tasks="tasks" :links="links" :templates="templates" />
</template>
~~~

Choose this when your customization is representational and tied to existing gantt template APIs.

## Custom Task Form With `customLightbox`

Use `customLightbox` when built-in lightbox sections are insufficient and you need full Vue component control.

~~~vue
<script setup lang="ts">
import CustomLightbox from "./CustomLightbox.vue";

const data = {
  batchSave: changes => {
    console.log(changes);
  }
};
</script>

<template>
  <VueGantt :tasks="tasks" :links="links" :customLightbox="CustomLightbox" :data="data" />
</template>
~~~

Your custom component receives:

- `data`
- `onSave(updatedTask)`
- `onCancel()`
- `onDelete()`
- `ganttInstance`

Choose this when task-edit UX must match application-specific forms and validation flow.

## Custom Grid Inline Editors

Use `inlineEditors` when users need custom cell editor UX in grid columns.

~~~vue
<script setup lang="ts">
import TextEditor from "./editors/TextEditor.vue";

const config = {
  columns: [
    {
      name: "text",
      tree: true,
      width: 220,
      editor: { type: "TextEditor", map_to: "text" }
    }
  ]
};

const inlineEditors = {
  TextEditor
};
</script>

<template>
  <VueGantt :tasks="tasks" :links="links" :config="config" :inlineEditors="inlineEditors" :data="data" />
</template>
~~~

Choose this when editing ergonomics are core to workflow and default editors are not enough.

## Custom Delete Confirmation Modals

Use `modals` to replace built-in task/link deletion confirmations.

~~~ts
const modals = {
  onBeforeTaskDelete: ({ task, callback }) => {
    if (window.confirm(`Delete task ${task.text}?`)) callback();
  },
  onBeforeLinkDelete: ({ link, callback }) => {
    if (window.confirm(`Delete link ${link.id}?`)) callback();
  }
};
~~~

Choose this when your app needs branded confirmation UI or extra business checks before deletion.

## Event Orchestration With `events` + `@ready`

Use `events` for interaction behavior and `@ready` for one-time initialization that needs `instance`.

~~~vue
<script setup lang="ts">
import { defineGanttEvents, type GanttStatic } from "@dhtmlx/trial-vue-gantt";

const events = defineGanttEvents({
  onBeforeLightbox: taskId => {
    console.log("Open custom editor route", taskId);
    return false;
  }
});

const onReady = (instance: GanttStatic) => {
  instance.showDate(new Date());
};
</script>

<template>
  <VueGantt :events="events" @ready="onReady" />
</template>
~~~

Choose this when you need deterministic startup actions plus user-event interception.

## Shared VNode Wrapping With `templateWrapper`

Use `templateWrapper` to apply a common wrapper around VNodes produced by template-based rendering bridges.

~~~ts
import { h } from "vue";

const templateWrapper = node => h("div", { class: "template-host" }, [node]);
~~~

Choose this when you need consistent styling or context wrappers around template-rendered VNodes.

## How To Choose The Right Customization Layer

- Start with `config` and `templates` for most visual/behavioral customization.
- Move to `customLightbox` and `inlineEditors` when edit UX must be application-specific.
- Use `modals` for confirmation control.
- Use `events` and `@ready` to orchestrate routing and startup behavior.
- Keep one data ownership model (store-driven or gantt-driven) while customizing UI to avoid state drift.

## Continue With

- [Vue Gantt Overview](integrations/vue/overview.md)
- [Configuration Reference](integrations/vue/configuration-props.md)
- [Data Binding and State Management Basics](integrations/vue/state/state-management-basics.md)
- [Using Vue Gantt with Pinia](integrations/vue/state/pinia.md)

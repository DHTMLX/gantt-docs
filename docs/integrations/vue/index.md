---
title: "Vue Gantt"
sidebar_label: Vue Gantt
description: "Install, configure, and use DHTMLX Gantt in Vue with the official wrapper."
image: /img/frameworks/vue.png
---

Vue Gantt is the official Vue wrapper for DHTMLX Gantt. It is built for Vue 3 applications that want Vue-friendly composition patterns while preserving full access to the underlying Gantt API.

## What You Get With The Wrapper

- Declarative configuration via props (`config`, `templates`, `plugins`, `theme`, `locale`).
- Data synchronization for tasks/links and advanced datasets.
- Event registration through the `events` map.
- Vue lifecycle signal through `@ready` and direct access to `instance` through component refs.
- Public composables and helper factories for typed Vue integration.

~~~vue
<script setup lang="ts">
import VueGantt from "@dhtmlx/trial-vue-gantt";
import "@dhtmlx/trial-vue-gantt/dist/vue-gantt.css";
</script>

<template>
  <div style="height: 520px;">
    <VueGantt :tasks="tasks" :links="links" />
  </div>
</template>
~~~

If you want the complete capability and behavior breakdown first, read [Vue Gantt Overview](integrations/vue/overview.md).

## Recommended Learning Path

Follow this order if you are new to the wrapper:

1. [Installation](integrations/vue/installation.md): pick the correct package channel (trial vs professional) and import format.
2. [Quick Start](integrations/vue/quick-start.md): render your first chart in a Vue 3 + Vite project.
3. [Configuration Reference](integrations/vue/configuration-props.md): understand every prop and lifecycle/data callback contract.
4. [Data Binding and State Management Basics](integrations/vue/state/state-management-basics.md): choose and implement the right data ownership model.
5. [Pinia Integration Tutorial](integrations/vue/state/pinia.md): apply the model with a real Vue store.
6. [Customization Patterns](integrations/vue/customization-patterns.md): implement custom UI (templates, lightbox, inline editors, modals).

## Wrapper vs Low-Level JS Integration

Choose the integration path based on your project constraints:

- Choose the **official wrapper** (`@dhtmlx/trial-vue-gantt` or `@dhx/vue-gantt`) when you want Vue-centric patterns, typed props/composables, and built-in sync behavior.
- Choose **low-level JS integration** only when you explicitly need direct manual lifecycle control and no wrapper abstractions.

Use [dhtmlxGantt with Vue.js (Low-Level Integration)](integrations/vue/howtostart-vue.md) for the low-level path.

## Data And State Management Entry Point

Start state architecture from the Vue state section:

- [Data and State Management Section](integrations/vue/state/index.md)
- [Data Binding and State Management Basics](integrations/vue/state/state-management-basics.md)
- [Using Vue Gantt with Pinia](integrations/vue/state/pinia.md)

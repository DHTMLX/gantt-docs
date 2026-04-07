---
title: "Vue Gantt"
sidebar_label: Vue Gantt
description: "Install, configure, and use DHTMLX Gantt in Vue with the official wrapper."
image: /img/frameworks/vue.png
---

Vue Gantt is the official Vue wrapper for DHTMLX Gantt. It targets Vue 3 and keeps full access to the Gantt API while adding Vue-friendly props, events, and composables.

## What You Get With The Wrapper

- Declarative setup through props (`config`, `templates`, `plugins`, `theme`, `locale`)
- Data sync for tasks/links and advanced datasets
- Gantt event wiring through the `events` map
- Vue lifecycle entry point through `@ready`
- Component ref access to the underlying `instance`
- Typed helper factories and composables for common wrapper workflows

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

If you want the architecture and capability map first, read [Vue Gantt Overview](integrations/vue/overview.md).

## Recommended Learning Path

Use this order if you are new to the wrapper:

1. [Installation](integrations/vue/installation.md) for package channel selection and imports
2. [Quick Start](integrations/vue/quick-start.md) to render your first chart
3. [Configuration Reference](integrations/vue/configuration-props.md) for prop and callback details
4. [Data Binding and State Management Basics](integrations/vue/state/state-management-basics.md) to choose a data ownership model
5. [Pinia Integration Tutorial](integrations/vue/state/pinia.md) for a store-driven implementation
6. [Customization Patterns](integrations/vue/customization-patterns.md) for templates, lightbox, inline editors, and modals

## Wrapper Vs Low-Level JS Integration

Pick the integration path based on how much lifecycle and sync logic you want to manage yourself.

- Use the **official wrapper** (`@dhtmlx/trial-vue-gantt` or `@dhx/vue-gantt`) for Vue props/events, wrapper-managed synchronization, and typed helper APIs.
- Use **low-level JS integration** only when you want direct control over instance lifecycle and manual API orchestration.

For the low-level path, use [dhtmlxGantt with Vue.js (Low-Level Integration)](integrations/vue/howtostart-vue.md).

## Data And State Management Entry Point

Start with the state section if you already know you need store/backend synchronization:

- [Data & State Management](integrations/vue/state/index.md)
- [Data Binding and State Management Basics](integrations/vue/state/state-management-basics.md)
- [Using Vue Gantt with Pinia](integrations/vue/state/pinia.md)

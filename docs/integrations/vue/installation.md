---
title: Installing Vue Gantt
sidebar_label: Installation
description: "How to install the evaluation or professional version of Vue Gantt via npm or yarn."
---

# Installing Vue Gantt

Vue Gantt is distributed in two package channels with the same wrapper API:

1. **Evaluation package** on public npm: `@dhtmlx/trial-vue-gantt`
2. **Professional package** on DHTMLX private npm: `@dhx/vue-gantt`

## Choose Your Package Channel

### Evaluation package (`@dhtmlx/trial-vue-gantt`)

Install with npm:

~~~bash
npm install @dhtmlx/trial-vue-gantt
~~~

Install with Yarn:

~~~bash
yarn add @dhtmlx/trial-vue-gantt
~~~

### Professional package (`@dhx/vue-gantt`)


Get private npm credentials in the [Client's Area](https://dhtmlx.com/clients/), then configure registry and login:

~~~bash
npm config set @dhx:registry=https://npm.dhtmlx.com
npm login --registry=https://npm.dhtmlx.com --scope=@dhx --auth-type=legacy
~~~

Install with npm:

~~~bash
npm install @dhx/vue-gantt
~~~

Install with Yarn:

~~~bash
yarn add @dhx/vue-gantt
~~~

## Import Matrix

Use imports that match the package channel you installed:

| Package | Component import | CSS import |
| --- | --- | --- |
| `@dhtmlx/trial-vue-gantt` | `import VueGantt from "@dhtmlx/trial-vue-gantt";` | `import "@dhtmlx/trial-vue-gantt/dist/vue-gantt.css";` |
| `@dhx/vue-gantt` | `import VueGantt from "@dhx/vue-gantt";` | `import "@dhx/vue-gantt/dist/vue-gantt.css";` |

## Version Requirements

- Vue `>= 3.2.25`

## What To Read Next

- [Quick Start with Vue Gantt](integrations/vue/quick-start.md)
- [Vue Gantt Overview](integrations/vue/overview.md)
- [Configuration Reference](integrations/vue/configuration-props.md)

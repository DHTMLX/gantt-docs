---
title: Installing Vue Gantt
sidebar_label: Installation
description: "How to install the evaluation or professional version of Vue Gantt via npm or yarn."
---

# Installing Vue Gantt

Use this page to install the official Vue wrapper package and pick the correct import paths.

## Prerequisites

- Vue 3 project (or a project where you plan to add Vue 3)
- Node.js installed
- npm or Yarn available
- DHTMLX private npm access (professional package only)

## Choose The Package Channel

Vue Gantt is distributed in two package channels with the same wrapper API:

1. Evaluation package on public npm: `@dhtmlx/trial-vue-gantt`
2. Professional package on DHTMLX private npm: `@dhx/vue-gantt`

## Install The Evaluation Package (Public npm)

- npm:

~~~bash
npm install @dhtmlx/trial-vue-gantt
~~~

- Yarn:

~~~bash
yarn add @dhtmlx/trial-vue-gantt
~~~

## Install The Professional Package (Private npm)

Get private npm credentials in the [Client's Area](https://dhtmlx.com/clients/), then configure the registry and log in:

~~~bash
npm config set @dhx:registry=https://npm.dhtmlx.com
npm login --registry=https://npm.dhtmlx.com --scope=@dhx --auth-type=legacy
~~~

Install the package:

- npm:

~~~bash
npm install @dhx/vue-gantt
~~~

- Yarn:

~~~bash
yarn add @dhx/vue-gantt
~~~

## Use The Matching Imports

Use imports that match the package you installed.

| Package | Component import | CSS import |
| --- | --- | --- |
| `@dhtmlx/trial-vue-gantt` | `import VueGantt from "@dhtmlx/trial-vue-gantt";` | `import "@dhtmlx/trial-vue-gantt/dist/vue-gantt.css";` |
| `@dhx/vue-gantt` | `import VueGantt from "@dhx/vue-gantt";` | `import "@dhx/vue-gantt/dist/vue-gantt.css";` |

## Check Version Requirements

Wrapper peer dependency:

- `vue >= 3.2.25`

## What To Read Next

- [Quick Start with Vue Gantt](integrations/vue/quick-start.md)
- [Vue Gantt Overview](integrations/vue/overview.md)
- [Configuration Reference](integrations/vue/configuration-props.md)

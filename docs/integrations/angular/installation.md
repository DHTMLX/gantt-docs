---
title: Installing Angular Gantt
sidebar_label: Installation
description: "How to install the evaluation or professional version of Angular Gantt and wire imports in Angular projects."
---

# Installing Angular Gantt

Angular Gantt is distributed in two package channels with the same wrapper API:

1. **Evaluation package** on public npm: `@dhtmlx/trial-angular-gantt`
2. **Professional package** on DHTMLX private npm: `@dhx/angular-gantt`

## Choose Your Package Channel

### Evaluation package (`@dhtmlx/trial-angular-gantt`)

Install with npm:

~~~bash
npm install @dhtmlx/trial-angular-gantt
~~~

Install with Yarn:

~~~bash
yarn add @dhtmlx/trial-angular-gantt
~~~

### Professional package (`@dhx/angular-gantt`)

Get private npm credentials in the [Client's Area](https://dhtmlx.com/clients/), then configure registry and login:

~~~bash
npm config set @dhx:registry=https://npm.dhtmlx.com
npm login --registry=https://npm.dhtmlx.com --scope=@dhx --auth-type=legacy
~~~

Install with npm:

~~~bash
npm install @dhx/angular-gantt
~~~

Install with Yarn:

~~~bash
yarn add @dhx/angular-gantt
~~~

## Angular Project Requirements

Wrapper peer dependencies currently require:

- `@angular/common >= 14.0.0`
- `@angular/core >= 14.0.0`
- `rxjs >= 6.0.0`


## Import Matrix

Use imports that match the package channel you installed.

| Package | Wrapper import | CSS import |
| --- | --- | --- |
| `@dhtmlx/trial-angular-gantt` | `import { DhxGanttComponent } from "@dhtmlx/trial-angular-gantt";` | `@import "@dhtmlx/trial-angular-gantt/dist/angular-gantt.css";` |
| `@dhx/angular-gantt` | `import { DhxGanttComponent } from "@dhx/angular-gantt";` | `@import "@dhx/angular-gantt/dist/angular-gantt.css";` |

Add the CSS import in your global Angular styles (for example `src/styles.css`).

This is the recommended default for Angular apps because Gantt styles are library-wide styles and do not need Angular component scoping.

## Global vs Component CSS Import

- **Global import:** import the wrapper CSS path from the matrix above in `src/styles.css` (or register it in `angular.json` `styles`). No special component encapsulation settings are required.
- **Component stylesheet import:** you can import the same CSS in a component `styleUrl`, but then Angular's default `ViewEncapsulation.Emulated` may scope selectors and prevent Gantt internal `.dhx-*` styles/overrides from applying as expected.

If you import Gantt CSS in a component stylesheet or define overrides for internal Gantt classes (for example `.dhx-gantt-root`) in that stylesheet, set:

~~~ts
import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  // ...
  encapsulation: ViewEncapsulation.None,
})
export class GanttPageComponent {}
~~~

Use the component import pattern mainly for self-contained demos/examples. For production apps, prefer the global import.

## Standalone vs NgModule Projects

The wrapper supports both Angular styles:

- **Standalone components**: import `DhxGanttComponent` in the component `imports` array.
- **NgModule-based apps**: import `DhxGanttModule` in your Angular module.

Standalone example:

~~~ts
import { Component } from '@angular/core';
import { DhxGanttComponent } from '@dhtmlx/trial-angular-gantt';

@Component({
  standalone: true,
  imports: [DhxGanttComponent],
  template: `<dhx-gantt [tasks]="tasks" [links]="links"></dhx-gantt>`,
})
export class GanttPageComponent {
  tasks = [];
  links = [];
}
~~~

NgModule example:

~~~ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DhxGanttModule } from '@dhtmlx/trial-angular-gantt';

@NgModule({
  imports: [BrowserModule, DhxGanttModule],
})
export class AppModule {}
~~~

## What To Read Next

- [Quick Start with Angular Gantt](integrations/angular/quick-start.md)
- [Angular Gantt Overview](integrations/angular/overview.md)
- [Configuration Reference](integrations/angular/configuration-props.md)

---
title: dhtmlxGantt with Angular
sidebar_label: Low-Level Integration
description: "Step-by-step guide to using the JS DHTMLX Gantt in Angular without the official Angular wrapper."
---

# dhtmlxGantt with Angular

:::note
This tutorial shows how to use the JS DHTMLX Gantt directly in an Angular app without the official wrapper.

If you want Angular inputs/outputs, wrapper-managed sync, and Angular template component support, use [Angular Gantt](integrations/angular.md) instead.
:::

You should be familiar with basic Angular concepts (components, lifecycle hooks, services). If not, start with the [Angular documentation](https://angular.dev/overview).

DHTMLX Gantt is compatible with Angular. You can check the related demo repository on GitHub: [DHTMLX Gantt with Angular Demo](https://github.com/DHTMLX/angular-gantt-demo).

## Creating A Project

Before you start, install [Node.js](https://nodejs.org/en/) and [Angular CLI](https://angular.dev/tools/cli).

Create a new Angular app:

~~~bash
ng new my-angular-gantt-app --standalone --routing=false --style=css
cd my-angular-gantt-app
~~~

Start the app once to verify the project is working:

- npm: `npm start`
- yarn: `yarn start`
- or CLI: `ng serve`

The app should be available at `http://localhost:4200`.

## Creating Gantt

Stop the dev server (`Ctrl+C`) before installing the Gantt package.

## Step 1. Package Installation

Professional builds of the JS Gantt library are available via private npm. Follow the [installation guide](guides/installation.md#npmevaluationandproversions) to get access.

Evaluation build (public package for tutorials):

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

## Step 2. Create A Gantt Component

Create a new component for direct JS Gantt integration:

~~~bash
ng generate component gantt --skip-tests
~~~

### Import Gantt Source Files

Open `src/app/gantt/gantt.component.ts` and import the Gantt package.

If you installed the evaluation build:

~~~ts title="src/app/gantt/gantt.component.ts"
import { Gantt, type GanttStatic } from '@dhx/trial-gantt';
~~~

If you installed the professional build:

~~~ts title="src/app/gantt/gantt.component.ts"
import { Gantt, type GanttStatic } from '@dhx/gantt';
~~~

Add Gantt styles in `src/app/gantt/gantt.component.css`.

Evaluation build:

~~~css title="src/app/gantt/gantt.component.css"
@import "@dhx/trial-gantt/codebase/dhtmlxgantt.css";
~~~

Professional build:

~~~css title="src/app/gantt/gantt.component.css"
@import "@dhx/gantt/dist/dhtmlxgantt.css";
~~~

### Initialize Gantt In Angular Lifecycle Hooks

Replace `src/app/gantt/gantt.component.ts` with a minimal direct integration:

~~~ts title="src/app/gantt/gantt.component.ts"
import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild, ViewEncapsulation } from '@angular/core';
import { Gantt, type GanttStatic } from '@dhx/trial-gantt';

@Component({
  selector: 'app-gantt',
  standalone: true,
  template: `<div #ganttHost class="gantt-chart"></div>`,
  styleUrl: './gantt.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class GanttComponent implements AfterViewInit, OnDestroy {
  @ViewChild('ganttHost', { static: true }) ganttHost!: ElementRef<HTMLElement>;

  private gantt: GanttStatic | null = null;

  ngAfterViewInit(): void {
    const gantt = Gantt.getGanttInstance();
    gantt.init(this.ganttHost.nativeElement);
    this.gantt = gantt;
  }

  ngOnDestroy(): void {
    this.gantt?.destructor();
    this.gantt = null;
  }
}
~~~

Add basic container sizing to `src/app/gantt/gantt.component.css`:

~~~css title="src/app/gantt/gantt.component.css"
@import "@dhx/trial-gantt/codebase/dhtmlxgantt.css";

.gantt-chart {
  width: 100%;
  height: 600px;
}
~~~

## Step 3. Add Gantt To The App

Replace `src/app/app.component.ts` so the app renders your Gantt component:

~~~ts title="src/app/app.component.ts"
import { Component } from '@angular/core';
import { GanttComponent } from './gantt/gantt.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [GanttComponent],
  template: `<app-gantt></app-gantt>`,
})
export class AppComponent {}
~~~

After starting the app, you should see an empty Gantt chart.

## Step 4. Provide Data

Create `src/app/demo-data.ts` with a small dataset:

~~~ts title="src/app/demo-data.ts"
export function getData() {
  return {
    data: [
      {
        id: 10,
        text: 'Project #1',
        start_date: '2026-02-02 00:00',
        duration: 6,
        progress: 0.4,
        open: true,
      },
      {
        id: 1,
        text: 'Task #1',
        start_date: '2026-02-02 00:00',
        duration: 2,
        progress: 0.6,
        parent: 10,
      },
      {
        id: 2,
        text: 'Task #2',
        start_date: '2026-02-04 00:00',
        duration: 3,
        progress: 0.2,
        parent: 10,
      },
    ],
    links: [{ id: 1, source: 1, target: 2, type: '0' }],
  };
}
~~~

Now import and parse the data in `GanttComponent`:

~~~ts title="src/app/gantt/gantt.component.ts"
import { getData } from '../demo-data';

// ...inside ngAfterViewInit()
const gantt = Gantt.getGanttInstance();
gantt.config.date_format = '%Y-%m-%d %H:%i';
gantt.init(this.ganttHost.nativeElement);
gantt.parse(getData());
this.gantt = gantt;
~~~

If you reload the app, you should see a Gantt chart with tasks and a link.

## Step 5. Save Data

To capture changes made in the chart, use a [dataProcessor](api/method/dataprocessor.md). It can send changes to your backend or just log them while you build the integration.

~~~ts title="src/app/gantt/gantt.component.ts"
// ...inside ngAfterViewInit(), after gantt.init(...)
gantt.createDataProcessor((entity, action, data, id) => {
  console.log('[dp]', entity, action, data, id);
});
~~~

DHTMLX Gantt accepts Promise responses from `dataProcessor` handlers. If your backend changes IDs on create, return an object like `{ id: newId }` or `{ tid: newId }` so Gantt can remap the record.

See [server-side integration](guides/server-side.md) for full backend patterns.

## XSS, CSRF And SQL Injection Attacks

Gantt does not protect your application from backend security issues (SQL injection, XSS, CSRF). Backend validation, authorization, and output sanitization remain your responsibility.

Read [Application Security](guides/app-security.md) for the main risk areas and mitigation guidance.

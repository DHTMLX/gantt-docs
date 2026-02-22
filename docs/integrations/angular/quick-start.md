---
title: Quick Start with Angular Gantt
sidebar_label: Quick Start
description: "Step-by-step guide to render the official Angular Gantt wrapper in a standalone Angular app."
---

# Quick Start with Angular Gantt

This quick start uses a standalone Angular application and the official wrapper package. It gives you a minimal setup that already includes `data.save` callback wiring so you can extend it into real state management later.

## 1. Create An Angular Project

Create a standalone Angular app (Angular CLI):

~~~bash
ng new angular-gantt-quick-start --standalone --routing=false --style=css
cd angular-gantt-quick-start
~~~

If Angular CLI is not installed yet, install it first (`npm install -g @angular/cli`).

## 2. Install Angular Gantt

Install the evaluation package:

~~~bash
npm install @dhtmlx/trial-angular-gantt
~~~

If you use the professional package, replace `@dhtmlx/trial-angular-gantt` with `@dhx/angular-gantt` in commands and imports.

## 3. Add Global Styles

Open `src/styles.css` and add the Gantt styles:

~~~css
@import "@dhtmlx/trial-angular-gantt/src/lib/dhtmlxgantt.css";

html,
body {
  height: 100%;
  margin: 0;
}

app-root {
  display: block;
  height: 100vh;
}
~~~

## 4. Add Demo Data

Create `src/app/demo-data.ts`:

~~~ts
export const tasks = [
  {
    id: 1,
    text: 'Office itinerancy',
    type: 'project',
    start_date: '2026-02-02 00:00',
    duration: 10,
    progress: 0.4,
    open: true,
    parent: 0,
  },
  {
    id: 2,
    text: 'Planning',
    start_date: '2026-02-02 00:00',
    duration: 4,
    progress: 0.6,
    parent: 1,
  },
  {
    id: 3,
    text: 'Implementation',
    start_date: '2026-02-06 00:00',
    duration: 5,
    progress: 0.2,
    parent: 1,
  },
];

export const links = [{ id: 1, source: 2, target: 3, type: '0' }];
~~~

## 5. Render The Wrapper Component

Replace `src/app/app.component.ts`:

~~~ts
import { Component } from '@angular/core';
import {
  DhxGanttComponent,
  type AngularGanttDataConfig,
} from '@dhtmlx/trial-angular-gantt';

import { links, tasks } from './demo-data';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [DhxGanttComponent],
  template: `
    <dhx-gantt
      [tasks]="tasks"
      [links]="links"
      [config]="config"
      [data]="dataConfig">
    </dhx-gantt>
  `,
})
export class AppComponent {
  tasks = tasks;
  links = links;

  config = {
    date_format: '%Y-%m-%d %H:%i',
    columns: [
      { name: 'text', tree: true, width: '*' },
      { name: 'start_date', label: 'Start', align: 'center' },
      { name: 'duration', label: 'Duration', align: 'center' },
      { name: 'add', width: 44 },
    ],
  };

  dataConfig: AngularGanttDataConfig = {
    save: (entity, action, item, id) => {
      console.log('save', { entity, action, item, id });
    },
  };
}
~~~

## 6. Start The App

~~~bash
ng serve
~~~

Open `http://localhost:4200`. You should see a working Gantt chart that logs edits through `data.save`.

## Optional: Minimal Local Save Handling

As a next step, replace logging with local array synchronization:

~~~ts
dataConfig: AngularGanttDataConfig = {
  save: (entity, action, item, id) => {
    if (entity === 'task') {
      if (action === 'create') this.tasks = [...this.tasks, item];
      if (action === 'update') {
        this.tasks = this.tasks.map((task) => String(task.id) === String(id) ? { ...task, ...item } : task);
      }
      if (action === 'delete') {
        this.tasks = this.tasks.filter((task) => String(task.id) !== String(id));
      }
    }

    if (entity === 'link') {
      if (action === 'create') this.links = [...this.links, item];
      if (action === 'update') {
        this.links = this.links.map((link) => String(link.id) === String(id) ? { ...link, ...item } : link);
      }
      if (action === 'delete') {
        this.links = this.links.filter((link) => String(link.id) !== String(id));
      }
    }
  },
};
~~~

For multi-change operations (for example auto-scheduling), prefer `data.batchSave` and handle grouped updates instead of one-by-one callbacks.

## Continue With

- [Angular Gantt Overview](integrations/angular/overview.md)
- [Configuration Reference](integrations/angular/configuration-props.md)
- [Data Binding and State Management Basics](integrations/angular/state/state-management-basics.md)

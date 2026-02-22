---
title: "Angular Gantt"
sidebar_label: Angular Gantt
description: "Install, configure, and use DHTMLX Gantt in Angular with the official wrapper."
---

Angular Gantt is the official Angular wrapper for DHTMLX Gantt. It gives you an Angular component API for the chart while preserving access to the full Gantt engine.

## What You Get With The Wrapper

- Declarative inputs for `tasks`, `links`, `config`, `templates`, `plugins`, `theme`, and `locale`.
- Incremental synchronization for task/link updates with fallback re-parse for larger changes.
- Data transport callbacks via `data.load`, `data.save`, and `data.batchSave`.
- Event registration through the `events` map and lifecycle access through `(ready)`.
- Angular component rendering inside Gantt templates via `templateComponent(...)`.
- Support for advanced datasets and features (`resources`, `resourceAssignments`, `baselines`, `calendars`, `markers`, `groupTasks`, `resourceFilter`).

~~~ts
import { Component } from '@angular/core';
import { DhxGanttComponent } from '@dhtmlx/trial-angular-gantt';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [DhxGanttComponent],
  template: `
    <div style="height: 520px;">
      <dhx-gantt [tasks]="tasks" [links]="links"></dhx-gantt>
    </div>
  `,
})
export class AppComponent {
  tasks = [{ id: 1, text: 'Task', start_date: '2026-02-02 00:00', duration: 3, parent: 0 }];
  links = [];
}
~~~

If you want the full capability breakdown first, start with [Angular Gantt Overview](integrations/angular/overview.md).

## Recommended Learning Path

Follow this order if you are new to the wrapper:

1. [Installation](integrations/angular/installation.md): choose the correct package channel and imports.
2. [Quick Start](integrations/angular/quick-start.md): render your first chart in a standalone Angular app.
3. [Configuration Reference](integrations/angular/configuration-props.md): learn every input, output, and callback contract.
4. [Data Binding and State Management Basics](integrations/angular/state/state-management-basics.md): choose your data ownership model.
5. [RxJS State Management Tutorial](integrations/angular/state/rxjs.md): implement a store-driven pattern with `BehaviorSubject` and `AsyncPipe`.

## Wrapper vs Low-Level JS Integration

Choose the integration path based on how much Angular integration you need:

- Choose the **official wrapper** (`@dhtmlx/trial-angular-gantt` or `@dhx/angular-gantt`) when you want Angular inputs/outputs, lifecycle integration, and wrapper-managed synchronization.
- Choose **low-level JS integration** only when you need fully manual control over the Gantt lifecycle and direct DOM integration.

Use [dhtmlxGantt with Angular (Low-Level Integration)](integrations/angular/js-gantt-angular.md) for the low-level path.

## Data And State Management Entry Point

Start state architecture from the Angular state section:

- [Data & State Management](integrations/angular/state/index.md)
- [Data Binding and State Management Basics](integrations/angular/state/state-management-basics.md)
- [Using Angular Gantt with RxJS](integrations/angular/state/rxjs.md)

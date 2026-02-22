---
title: Angular Gantt Overview
sidebar_label: Overview
description: "Architecture-level overview of Angular Gantt: capabilities, data flow, events, lifecycle, and customization patterns."
---

# Angular Gantt Overview

Angular Gantt is the official Angular wrapper for DHTMLX Gantt. It exposes the Gantt chart as an Angular component (`<dhx-gantt>`) with typed inputs/outputs and keeps access to the underlying Gantt instance.

If you need installation and project setup first, start with [Quick Start with Angular Gantt](integrations/angular/quick-start.md).

## Core Capabilities

The wrapper is built for both simple and advanced Angular integrations:

- Declarative setup with inputs (`config`, `templates`, `plugins`, `theme`, `locale`).
- Data synchronization for `tasks`/`links` and advanced collections (`resources`, `resourceAssignments`, `baselines`).
- Dynamic event wiring through a single `events` input map.
- Lifecycle signal via `(ready)` with access to the initialized Gantt instance.
- Angular component rendering in templates through `templateComponent(...)`.
- Advanced features through `customLightbox`, `groupTasks`, `calendars`, `markers`, and `resourceFilter`.

## Basic Wrapper Usage

~~~ts
import { Component } from '@angular/core';
import {
  DhxGanttComponent,
  type AngularGanttDataConfig,
} from '@dhtmlx/trial-angular-gantt';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [DhxGanttComponent],
  template: `
    <div style="height: 600px;">
      <dhx-gantt
        [tasks]="tasks"
        [links]="links"
        [config]="config"
        [data]="dataConfig">
      </dhx-gantt>
    </div>
  `,
})
export class AppComponent {
  tasks = [
    { id: 1, text: 'Project', type: 'project', open: true, start_date: '2026-02-02 00:00', duration: 5, parent: 0 },
    { id: 2, text: 'Planning', start_date: '2026-02-02 00:00', duration: 2, parent: 1 },
  ];

  links = [{ id: 1, source: 1, target: 2, type: '0' }];

  config = {
    date_format: '%Y-%m-%d %H:%i',
    columns: [
      { name: 'text', tree: true, width: '*' },
      { name: 'start_date', align: 'center' },
      { name: 'duration', align: 'center' },
      { name: 'add', width: 44 },
    ],
  };

  dataConfig: AngularGanttDataConfig = {
    save: (entity, action, data, id) => {
      console.log('[data.save]', entity, action, data, id);
    },
  };
}
~~~

## Prop-Driven Sync Model And Tradeoffs

The wrapper watches input changes and syncs them into the current Gantt instance.

- `tasks` and `links` are synchronized incrementally for routine add/update/remove changes.
- For larger structural changes, the wrapper can reset and re-parse data.
- `resources`, `resourceAssignments`, and `baselines` are synchronized through related datastores.
- `config`, `templates`, `plugins`, `locale`, and `theme` are applied at runtime.
- If the `config.layout` shape changes, the wrapper may re-initialize the Gantt layout to apply the new structure.

Use [Data Binding and State Management Basics](integrations/angular/state/state-management-basics.md) for full data ownership guidance.

## `events` Map vs `(ready)`

Angular Gantt uses an `events` map for Gantt event handlers and a separate `(ready)` output for one-time lifecycle access.

~~~ts
import { Component } from '@angular/core';
import {
  DhxGanttComponent,
  type AngularGanttEvents,
  type GanttStatic,
} from '@dhtmlx/trial-angular-gantt';

@Component({
  standalone: true,
  imports: [DhxGanttComponent],
  template: `<dhx-gantt [events]="events" (ready)="onReady($event)"></dhx-gantt>`,
})
export class DemoComponent {
  events: AngularGanttEvents = {
    onTaskCreated: (task) => {
      console.log('task created', task);
      return true;
    },
    onBeforeLightbox: (taskId) => {
      console.log('before lightbox', taskId);
      return true;
    },
  };

  onReady({ instance }: { instance: GanttStatic }): void {
    console.log('ready', instance);
  }
}
~~~

Use `events` for interaction behavior. Use `(ready)` for logic that requires an initialized instance.

## ViewChild Access And Imperative Boundaries

When inputs are not enough, access the wrapper instance with `@ViewChild` and then use `.instance`.

~~~ts
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { DhxGanttComponent } from '@dhtmlx/trial-angular-gantt';

@Component({
  standalone: true,
  imports: [DhxGanttComponent],
  template: `<dhx-gantt [tasks]="tasks" [links]="links"></dhx-gantt>`,
})
export class DemoComponent implements AfterViewInit {
  @ViewChild(DhxGanttComponent) ganttCmp?: DhxGanttComponent;

  tasks = [];
  links = [];

  ngAfterViewInit(): void {
    this.ganttCmp?.instance?.showDate(new Date());
  }
}
~~~

Boundary rule: if you mutate tasks or links directly through `instance`, keep your Angular state inputs in sync. Otherwise the next input update can overwrite chart-side changes.

## Advanced Extension Points

### Custom lightbox component

Use `customLightbox` to replace the built-in task editor with an Angular component.

~~~ts
import { CustomLightboxConfig } from '@dhtmlx/trial-angular-gantt';

customLightbox: CustomLightboxConfig = {
  component: TaskEditorComponent,
  onSave: ({ id, task }) => console.log('saved', id, task),
};
~~~

Your custom component should accept `data`, `onSave`, `onCancel`, and `onDelete` inputs.

### Angular components in templates

Use `templateComponent(...)` in `templates`, column `template`, column `label`, or other template-capable slots.

~~~ts
import { templateComponent } from '@dhtmlx/trial-angular-gantt';

templates = {
  task_text: (_start: Date, _end: Date, task: any) =>
    templateComponent(TaskTextTemplateComponent, {
      task,
      onIconClick: () => this.toggleTask(task),
    }),
};
~~~

This lets Angular render components inside DOM regions managed by Gantt.

### Resource filtering and grouped/resource layouts

Use `resourceFilter` to filter resource panel rows when your config enables a resource store/layout.

~~~html
<dhx-gantt
  [tasks]="tasks"
  [links]="links"
  [resources]="resources"
  [resourceAssignments]="resourceAssignments"
  [resourceFilter]="resourceFilter"
  [config]="config">
</dhx-gantt>
~~~

### Grouping, calendars, and markers

Use `groupTasks`, `calendars`, and `markers` for advanced timeline scenarios without imperative setup code.

~~~html
<dhx-gantt
  [tasks]="tasks"
  [links]="links"
  [groupTasks]="groupConfig"
  [calendars]="calendars"
  [markers]="markers"
  [config]="config">
</dhx-gantt>
~~~

### Inline editing note

The wrapper does not expose a separate Angular-only `inlineEditors` input. Use the core Gantt inline editing config in `config.columns[].editor` (and other core inline editing APIs) when you need grid editing.

## Public Sample Scenario Map

The public Angular samples cover these wrapper scenarios:

- `basic-initialization`: baseline inputs and `data.save`.
- `configs-and-templates`: runtime `config`/`templates` updates, markers, plugins.
- `template-components`: `templateComponent(...)`, `events`, `ready`, dynamic UI in grid/task templates.
- `custom-form`: `customLightbox` integration.
- `resource-panel`: resources, assignments, resource layouts, `resourceFilter`, `(ready)` instance access.
- `calendars`: `calendars`, `templates`, locale, work-time highlighting.
- `auto-scheduling`: plugin activation and batched data changes.
- `state-management`: RxJS store-driven updates with `data.batchSave` and undo/redo.
- `inline-editors`: core Gantt inline editing configured through `config`.

## Related Articles

- [Installation](integrations/angular/installation.md)
- [Quick Start](integrations/angular/quick-start.md)
- [Configuration Reference](integrations/angular/configuration-props.md)
- [Data Binding and State Management Basics](integrations/angular/state/state-management-basics.md)
- [RxJS State Management Tutorial](integrations/angular/state/rxjs.md)
- [DHTMLX Gantt Guides](guides.md)

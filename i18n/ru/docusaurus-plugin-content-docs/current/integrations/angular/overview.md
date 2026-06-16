---
title: Обзор Angular Gantt
sidebar_label: Обзор
description: "Обзор на уровне архитектуры Angular Gantt: возможности, поток данных, события, жизненный цикл и образцы настройки."
---

# Обзор Angular Gantt

Angular Gantt — официальная обертка Angular для DHTMLX Gantt. Она предоставляет диаграмму Gantt в виде компонента Angular (`<dhx-gantt>`) с типизированными входами/выходами и сохраняет доступ к базовому экземпляру Gantt.

Если вам сначала нужен установочный процесс и настройка проекта, начните с [Быстрого старта с Angular Gantt](integrations/angular/quick-start.md).

:::tip Разработка с поддержкой ИИ
Если вы используете помощника по кодированию на базе ИИ, навык агента [DHTMLX Angular Gantt agent skill](integrations/ai-tools/agent-skills.md#available-skills) может помочь ему следовать корректным паттернам интеграции обертки и избегать распространённых ошибок, таких как несоответствие CSS-импортов, отсутствие высоты контейнера, смешанное владение между состоянием Angular и экземпляром Gantt (`instance`), и нестабильная сериализация дат через `data.save` / `data.batchSave`. Для справки по API в режиме реального времени подключите [DHTMLX MCP server](integrations/ai-tools/mcp-server.md).
:::

## Основные возможности

Обертка предназначена как для простых, так и для продвинутых интеграций Angular:

- Декларативная настройка с входами (`config`, `templates`, `plugins`, `theme`, `locale`).
- Синхронизация данных для `tasks`/`links` и продвинутых наборов данных (`resources`, `resourceAssignments`, `baselines`).
- Динамическая привязка событий через единый входной маппинг `events`.
- Сигнал жизненного цикла через `(ready)` с доступом к инициализированному экземпляру Gantt.
- Рендеринг компонентов Angular в шаблонах через `templateComponent(...)`.
- Расширенные возможности через `customLightbox`, `groupTasks`, `filter`, `calendars`, `markers` и `resourceFilter`.

## Базовое использование обертки

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
    { id: 1, text: 'Проект', type: 'project', open: true, start_date: new Date(2026, 1, 2).toISOString(), duration: 5, parent: 0 },
    { id: 2, text: 'Планирование', start_date: new Date(2026, 1, 2).toISOString(), duration: 2, parent: 1 },
  ];

  links = [{ id: 1, source: 1, target: 2, type: '0' }];

  config = {
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

## Проп-зависимая синхронизация и компромиссы

Обертка отслеживает изменения входных данных и синхронизирует их с текущим экземпляром Gantt.

- `tasks` и `links` синхронизируются пошагово для обычных операций добавления/обновления/удаления.
- Для крупных структурных изменений обертка может сбросить состояние и заново разобрать данные.
- `resources`, `resourceAssignments` и `baselines` синхронизируются через соответствующие хранилища данных.
- `config`, `templates`, `plugins`, `locale` и `theme` применяются во время выполнения.
- Если форма `config.layout` изменится, обертка может повторно инициализировать раскладку Gantt для применения новой структуры.

Используйте [Основы привязки данных и управления состоянием](integrations/angular/state/state-management-basics.md) для полного руководства по владению данными.

## `events` Map против `(ready)`

Angular Gantt использует карту `events` для обработчиков событий Gantt и отдельный выход `(ready)` для однократного доступа к жизненному циклу.

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

Используйте `events` для поведения взаимодействия. Используйте `(ready)` для логики, которая требует инициализированного экземпляра.

## Доступ через ViewChild и императивные границы

Когда входных данных недостаточно, получите доступ к обертке через `@ViewChild`, затем используйте `.instance`.

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

Пограничное правило: если вы изменяете задачи или связи напрямую через `instance`, синхронируйте входные данные Angular. Иначе следующее обновление входных данных может перезаписать изменения, сделанные на стороне диаграммы.

## Расширенные точки расширения

### Кастомный компонент lightbox

Используйте `customLightbox`, чтобы заменить встроенный редактор задач на компонент Angular.

~~~ts
import { CustomLightboxConfig } from '@dhtmlx/trial-angular-gantt';

customLightbox: CustomLightboxConfig = {
  component: TaskEditorComponent,
  onSave: ({ id, task }) => console.log('saved', id, task),
};
~~~

Ваш пользовательский компонент должен принимать входы `data`, `onSave`, `onCancel` и `onDelete`.

### Компоненты Angular в шаблонах

Используйте `templateComponent(...)` в `templates`, в `template` столбца, в `label` столбца или других слотах, поддерживающих шаблоны.

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

Это позволяет Angular рендерить компоненты внутри DOM-областей, управляемых Gantt.

### Фильтрация

Используйте вход `filter`, чтобы определить, какие задачи должны отображаться:

~~~ts
import type { TaskFilter } from '@dhtmlx/trial-angular-gantt';

taskFilter: TaskFilter = null;

showCompleted(): void {
  this.taskFilter = (task) => !!task.completed;
}

resetFilter(): void {
  this.taskFilter = null;
}
~~~ 

~~~html
<dhx-gantt
  [tasks]="tasks"
  [links]="links"
  [filter]="taskFilter">
</dhx-gantt>
~~~

Чтобы фильтровать ресурсы в панели ресурсов, используйте вход `resourceFilter`:

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

### Группировка, календари и маркеры

Используйте `groupTasks`, `calendars` и `markers` для продвинутых сценариев временной шкалы без императивного кода настройки.

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

### Примечание по встроенному редактированию

Обертка не предоставляет отдельный вход Angular-only `inlineEditors`. Используйте конфигурацию встроенного редактирования Gantt в `config.columns[].editor` (и другие API встроенного редактирования) когда вам нужно редактирование в гриде.

## Публичная карта образцов сценариев

Публичные образцы Angular охватывают следующие сценарии обёртки:

- `basic-initialization`: базовые входы и `data.save`.
- `configs-and-templates`: обновления `config`/`templates` во время выполнения, маркеры, плагины.
- `template-components`: `templateComponent(...)`, `filter`, `ready`, динамический UI в грид/шаблонах задач.
- `custom-form`: интеграция `customLightbox`.
- `resource-panel`: ресурсы, назначения, размещение ресурсов, `resourceFilter`, доступ к экземпляру через `(ready)`.
- `calendars`: `calendars`, `templates`, локаль, выделение рабочего времени.
- `auto-scheduling`: активация плагинов и пакетные изменения данных.
- `state-management`: обновления, управляемые RxJS store, с `data.batchSave` и отменой/повтором.
- `inline-editors`: базовая конфигурация встроенного редактирования Gantt через `config`.

## Связанные статьи

- [Установка](integrations/angular/installation.md)
- [Быстрый старт](integrations/angular/quick-start.md)
- [Справочник по конфигурации](integrations/angular/configuration-props.md)
- [Основы привязки данных и управления состоянием](integrations/angular/state/state-management-basics.md)
- [Учебник по RxJS управления состоянием](integrations/angular/state/rxjs.md)
- [Руководства DHTMLX Gantt](guides.md)
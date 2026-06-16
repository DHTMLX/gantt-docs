---
title: Быстрый старт с Gantt в Angular
sidebar_label: Быстрый старт
description: "Пошаговое руководство по отображению официальной обертки Angular Gantt в самостоятельном приложении Angular."
---

# Быстрый старт с Gantt в Angular

Этот быстрый старт использует самостоятельное приложение Angular и официальную обертку. Он создаёт Gantt внутри отдельного компонента Angular и монтирует этот компонент в `AppComponent`, чтобы пример оставался минимальным, но соответствовал более реалистичной структуре приложения.

## 1. Создайте проект Angular

Создайте самостоятельное приложение Angular (Angular CLI):

~~~bash
ng new angular-gantt-quick-start --standalone --routing=false --style=css
cd angular-gantt-quick-start
~~~

Если Angular CLI ещё не установлен, установите его сначала (`npm install -g @angular/cli`).

## 2. Установите Angular Gantt

Установите React Gantt, как описано в [руководстве по установке Angular Gantt](integrations/angular/installation.md).

В этом руководстве мы используем пакет-оценку:

~~~bash
npm install @dhtmlx/trial-angular-gantt
~~~

или

~~~bash
yarn add @dhtmlx/trial-angular-gantt
~~~

Если вы уже используете Professional пакет, замените `@dhtmlx/trial-angular-gantt` на `@dhx/angular-gantt` в командах и импортax.

## 3. Добавьте глобальные стили

Откройте `src/styles.css` и добавьте стили для Gantt:

~~~css title='src/styles.css'
@import "@dhtmlx/trial-angular-gantt/dist/angular-gantt.css";

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

Этот быстрый старт использует глобальный импорт CSS (`src/styles.css`), поэтому вам не нужен `ViewEncapsulation.None` в `AppComponent`.

Если позже перенесёте импорт CSS Гantt (или переопределения для внутренних классов Gantt, таких как `.dhx-gantt-root`) в файл стилей компонента, стильовая инкапсуляция Angular по умолчанию может ограничивать эти селекторы. В таком случае установите `encapsulation: ViewEncapsulation.None` в этом компоненте, или сделайте стили глобальными.

## 4. Добавьте Demo Data

Создайте `src/app/demo-data.ts`.

Обертка экспортирует `SerializedTask` и `SerializedLink` - рекомендуемые типы данных задач/ссылок, хранящихся вне Gantt. Даты могут быть строками или объектами `Date`.

~~~ts
import type { SerializedTask, SerializedLink } from '@dhtmlx/trial-angular-gantt';

export const tasks: SerializedTask[] = [
  {
    id: 1,
    text: 'Office itinerancy',
    type: 'project',
    start_date: new Date(2026, 1, 2).toISOString(),
    duration: 10,
    progress: 0.4,
    open: true,
    parent: 0,
  },
  {
    id: 2,
    text: 'Planning',
    start_date: new Date(2026, 1, 2).toISOString(),
    duration: 4,
    progress: 0.6,
    parent: 1,
  },
  {
    id: 3,
    text: 'Implementation',
    start_date: new Date(2026, 1, 6).toISOString(),
    duration: 5,
    progress: 0.2,
    parent: 1,
  },
];

export const links: SerializedLink[] = [{ id: 1, source: 2, target: 3, type: '0' }];
~~~

## 5. Создайте компонент Gantt

Создайте `src/app/gantt-chart.component.ts`:

~~~ts title='src/app/gantt-chart.component.ts'
import { Component } from '@angular/core';
import {
  DhxGanttComponent,
  type AngularGanttDataConfig,
} from '@dhtmlx/trial-angular-gantt';

import { links, tasks } from './demo-data';

@Component({
  selector: 'app-gantt-chart',
  standalone: true,
  imports: [DhxGanttComponent],
  host: { style: 'display:block;height:100%;' },
  template: `
    <dhx-gantt
      style="display:block;height:100%;"
      [tasks]="tasks"
      [links]="links"
      [config]="config"
      [data]="dataConfig">
    </dhx-gantt>
  `,
})
export class GanttChartComponent {
  tasks = tasks;
  links = links;

  config = {
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

## 6. Отобразите Gantt в оболочке приложения

Замените `src/app/app.component.ts`:

~~~ts title='src/app/app.component.ts'
import { Component } from '@angular/core';
import { GanttChartComponent } from './gantt-chart.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [GanttChartComponent],
  template: `<app-gantt-chart></app-gantt-chart>`,
})
export class AppComponent {}
~~~

## 7. Запустите приложение

~~~bash
ng serve
~~~

Откройте `http://localhost:4200`. Вы должны увидеть рабочий Gantt, который логирует редактирования через `data.save`.

Если вы добавляете Gantt в существующее приложение, сохраните текущий `AppComponent` и поместите `<app-gantt-chart>` на целевой странице/компонент вместо этого. Убедитесь, что родительская раскладка задаёт высоту области Gantt.

## Опционально: Минимальная локальная обработка сохранения

В качестве следующего шага замените вывод в логи на локальную синхронизацию массива в `src/app/gantt-chart.component.ts`:

~~~ts title='src/app/gantt-chart.component.ts'
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

Для операций с несколькими изменениями (например авто‑расписание) предпочтительней использовать `data.batchSave` и обрабатывать сгруппированные обновления вместо одного вызова за раз.

## Продолжайте с

- [Обзор Gantt для Angular](integrations/angular/overview.md)
- [Справочник по конфигурации](integrations/angular/configuration-props.md)
- [Основы привязки данных и управления состоянием](integrations/angular/state/state-management-basics.md)
--- 
title: dhtmlxGantt с Angular
sidebar_label: Низкоуровневая интеграция
description: "Пошаговое руководство по использованию JS DHTMLX Gantt в Angular без официальной обёртки."
---

# dhtmlxGantt с Angular

:::note
Этот учебник показывает, как использовать JS DHTMLX Gantt напрямую в приложении Angular без официальной обёртки.

Если вам нужны вводы/выводы Angular, синхронизация, управляемая обёрткой, и поддержка компонентов Angular в шаблоне, используйте [Angular Gantt](integrations/angular.md) вместо.
:::

Вам следует хорошо разбираться в базовых концепциях Angular (компоненты, хуки жизненного цикла, сервисы). Если нет, начните с [документации по Angular](https://angular.dev/overview).

DHTMLX Gantt совместим с Angular. Вы можете проверить соответствующий демо-репозиторий на GitHub: [Демо DHTMLX Gantt с Angular](https://github.com/DHTMLX/angular-gantt-demo).

## Создание проекта

Прежде чем начать, установите [Node.js](https://nodejs.org/en/) и [Angular CLI](https://angular.dev/tools/cli).

Создайте новое приложение Angular:

~~~bash
ng new my-angular-gantt-app --standalone --routing=false --style=css
cd my-angular-gantt-app
~~~

Запустите приложение один раз, чтобы проверить, что проект работает:

- npm: `npm start`
- yarn: `yarn start`
- или CLI: `ng serve`

Приложение должно быть доступно по адресу `http://localhost:4200`.

## Создание Gantt

Остановите сервер разработки (`Ctrl+C`) перед установкой пакета Gantt.

## Шаг 1. Установка пакета

Профессиональные сборки библиотеки JS Gantt доступны через приватный npm. Следуйте [руководству по установке](guides/installation.md#npmevaluationandproversions), чтобы получить доступ.

Оценочная сборка (публичный пакет для учебников):

- npm:

~~~bash
npm install @dhx/trial-gantt
~~~

- yarn:

~~~bash
yarn add @dhx/trial-gantt
~~~

Профессиональная сборка (приватный npm):

- npm:

~~~bash
npm install @dhx/gantt
~~~

- yarn:

~~~bash
yarn add @dhx/gantt
~~~

Вы также можете [установить Gantt из локальной папки](guides/installation.md#installfromlocalfolder), потому что пакет структурирован как npm-модуль.

## Шаг 2. Создание компонента Gantt

Создайте новый компонент для прямой интеграции JS Gantt:

~~~bash
ng generate component gantt --skip-tests
~~~

### Импорт исходников Gantt

Откройте `src/app/gantt/gantt.component.ts` и импортируйте пакет Gantt.

Если вы установили оценочную сборку:

~~~ts title="src/app/gantt/gantt.component.ts"
import { Gantt, type GanttStatic } from '@dhx/trial-gantt';
~~~

Если вы установили профессиональную сборку:

~~~ts title="src/app/gantt/gantt.component.ts"
import { Gantt, type GanttStatic } from '@dhx/gantt';
~~~

Добавьте стили Gantt в `src/app/gantt/gantt.component.css`.

Оценочная сборка:

~~~css title="src/app/gantt/gantt.component.css"
@import "@dhx/trial-gantt/codebase/dhtmlxgantt.css";
~~~

Профессиональная сборка:

~~~css title="src/app/gantt/gantt.component.css"
@import "@dhx/gantt/dist/dhtmlxgantt.css";
~~~

### Инициализация Gantt в хуках жизненного цикла Angular

Замените `src/app/gantt/gantt.component.ts` на минимальную прямую интеграцию:

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

Добавьте базовую подгонку размеров контейнера в `src/app/gantt/gantt.component.css`:

~~~css title="src/app/gantt/gantt.component.css"
@import "@dhx/trial-gantt/codebase/dhtmlxgantt.css";

.gantt-chart {
  width: 100%;
  height: 600px;
}
~~~

## Шаг 3. Добавить Gantt в приложение

Замените `src/app/app.component.ts`, чтобы приложение рендерило ваш компонент Gantt:

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

После запуска приложения вы должны увидеть пустую диаграмму Gantt.

## Шаг 4. Предоставление данных

Создайте `src/app/demo-data.ts` с небольшим набором данных:

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

Теперь импортируйте и распарсите данные в `GanttComponent`:

~~~ts title="src/app/gantt/gantt.component.ts"
import { getData } from '../demo-data';

// ...inside ngAfterViewInit()
const gantt = Gantt.getGanttInstance();
gantt.config.date_format = '%Y-%m-%d %H:%i';
gantt.init(this.ganttHost.nativeElement);
gantt.parse(getData());
this.gantt = gantt;
~~~

Если вы перезагрузите приложение, вы увидите диаграмму Gantt с задачами и связями.

## Шаг 5. Сохранение данных

Чтобы зафиксировать изменения, внесенные в диаграмму, используйте [dataProcessor](api/method/dataprocessor.md). Он может отправлять изменения на ваш бэкенд или просто логировать их во время создания интеграции.

~~~ts title="src/app/gantt/gantt.component.ts"
 // ...inside ngAfterViewInit(), after gantt.init(...)
 gantt.createDataProcessor((entity, action, data, id) => {
   console.log('[dp]', entity, action, data, id);
 });
~~~

DHTMLX Gantt принимает ответы Promise от обработчиков `dataProcessor`. Если ваш бэкенд меняет идентификаторы при создании, верните объект вроде `{ id: newId }` или `{ tid: newId }`, чтобы Gantt смог переотобразить запись.

См. [серверная интеграция](guides/server-side.md) для полноценных вариантов бэкенда.

## XSS, CSRF И SQL Инъекции

Gantt не защищает ваше приложение от проблем безопасности на стороне бэкенда (SQL инъекция, XSS, CSRF). Валидация на стороне сервера, авторизация и очистка выводимых данных остаются вашей ответственностью.

Прочтите [Безопасность приложения](guides/app-security.md) для основных зон риска и рекомендаций по их снижению.
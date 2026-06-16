---
title: "Angular Gantt"
sidebar_label: Angular Gantt
description: "Установите, настройте и используйте DHTMLX Gantt в Angular с использованием официальной обертки."
---

Angular Gantt — официальная обертка Angular для DHTMLX Gantt. Она предоставляет API компонента Angular для диаграммы, сохраняя доступ ко всей функциональности движка Gantt.

:::tip Разработка с поддержкой ИИ
Если вы используете помощника по программированию на основе ИИ, навык агента DHTMLX Angular Gantt [integrations/ai-tools/agent-skills.md#available-skills] может помочь ему придерживаться правильных паттернов интеграции обертки — подгоняя импорты CSS, обеспечивая явную цепочку высоты, выбирая модель владения данными, нормализуя даты вокруг `data.save` / `data.batchSave`, и сопоставляя тему приложения через переменные CSS Gantt. Для справочного API в реальном времени подключите [DHTMLX MCP server](integrations/ai-tools/mcp-server.md).
:::

## Что вы получаете с оберткой

- Декларативные входные параметры для `tasks`, `links`, `config`, `templates`, `plugins`, `theme` и `locale`.
- Инкрементальная синхронизация обновлений задач/ссылок с резервным повторным разбором для крупных изменений.
- Обратные вызовы передачи данных через `data.load`, `data.save` и `data.batchSave`.
- Регистрация событий через отображение `events` и доступ к жизненному циклу через `(ready)`.
- Рендеринг Angular-компонента внутри шаблонов Gantt через `templateComponent(...)`.
- Поддержка продвинутых наборов данных и функций (`resources`, `resourceAssignments`, `baselines`, `calendars`, `markers`, `groupTasks`, `resourceFilter`).

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

Если вам нужен полный разбор возможностей сначала, начните с [Обзора Angular Gantt](integrations/angular/overview.md).

## Рекомендуемый путь обучения

Следуйте этому порядку, если вы новичок в обертке:

1. [Установка](integrations/angular/installation.md): выберите правильный канал пакета и импорты.
2. [Быстрый старт](integrations/angular/quick-start.md): отобразите свою первую диаграмму в автономном приложении на Angular.
3. [Справочник по конфигурации](integrations/angular/configuration-props.md): изучите каждый вход, выход и контракт обратного вызова.
4. [Основы привязки данных и управления состоянием](integrations/angular/state/state-management-basics.md): выберите свою модель владения данными.
5. [Учебник по управлению состоянием RxJS](integrations/angular/state/rxjs.md): реализуйте паттерн, управляемый хранилищем, с `BehaviorSubject` и `AsyncPipe`.

## Примеры

Ознакомьтесь с публичными примерами Angular Gantt для запускаемых демонстраций обертки:

- [Живой демо](https://dhtmlx.github.io/angular-gantt-examples/)
- [GitHub-репозиторий](https://github.com/DHTMLX/angular-gantt-examples)

## Обертка против низкоуровневой интеграции JS

Выбирайте путь интеграции в зависимости от того, сколько интеграции с Angular вам требуется:

- Выберите **официальную обертку** (`@dhtmlx/trial-angular-gantt` или `@dhx/angular-gantt`), если вам нужны входы/выходы Angular, интеграция жизненного цикла и синхронизация, управляемая оберткой.
- Выберите **низкоуровневую интеграцию JS** только если вам нужен полный ручной контроль над жизненным циклом Gantt и прямой интеграцией с DOM.

Используйте [dhtmlxGantt with Angular (Low-Level Integration)](integrations/angular/js-gantt-angular.md) для нижнеуровневого пути.

## Точка входа в управление данными и состоянием

Начните архитектуру состояния в разделе Angular state:

- [Управление данными и состоянием](integrations/angular/state.md)
- [Основы привязки данных и управления состоянием](integrations/angular/state/state-management-basics.md): выберите свою модель владения данными.
- [Использование Angular Gantt с RxJS](integrations/angular/state/rxjs.md)

## Примеры и ресурсы для оценки

Ознакомьтесь с публичными примерами Angular Gantt для запускаемых демонстраций обертки:

- [Живой демо](https://dhtmlx.github.io/angular-gantt-examples/)
- [GitHub-репозиторий](https://github.com/DHTMLX/angular-gantt-examples)

Если вы оцениваете Angular Gantt, страница оценки предоставляет доступ к технической поддержке в течение периода оценки. См. [Установка](integrations/angular/installation.md).
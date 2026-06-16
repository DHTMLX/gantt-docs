---
title: Использование свойств DHTMLX Gantt в Angular Gantt
sidebar_label: Конфигурация
description: "Полная справка по входам, выходам, контрактам колбеков и Angular-специфичным шаблонам/настройкам."
---

# Использование свойств DHTMLX Gantt в Angular Gantt

Эта страница документирует публичную поверхность обёртки `@dhtmlx/trial-angular-gantt` и `@dhx/angular-gantt`.

## Доступные входные параметры

<table>
  <thead>
    <tr>
      <th>Вводной параметр</th>
      <th>Тип</th>
      <th>Описание</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>tasks</td>
      <td>any[]</td>
      <td>Коллекция задач, отображаемая в диаграмме/грид. Обязателен.</td>
    </tr>
    <tr>
      <td>links</td>
      <td>any[]</td>
      <td>Коллекция зависимостей. Обязательна.</td>
    </tr>
    <tr>
      <td>resources</td>
      <td>any[] | null</td>
      <td>Набор данных ресурсов для раскладки ресурсов и методов API ресурсов.</td>
    </tr>
    <tr>
      <td>resourceAssignments</td>
      <td>any[] | null</td>
      <td>Набор данных назначений ресурсов.</td>
    </tr>
    <tr>
      <td>baselines</td>
      <td>any[] | null</td>
      <td>Набор данных базовых линий.</td>
    </tr>
    <tr>
      <td>config</td>
      <td>Partial&lt;GanttConfigOptions&gt; | null</td>
      <td>Сливается в <code>gantt.config</code>.</td>
    </tr>
    <tr>
      <td>templates</td>
      <td>AngularGanttTemplates | null</td>
      <td>Сливается в <code>gantt.templates</code>; функции-шаблоны могут возвращать дескрипторы Angular-шаблонов.</td>
    </tr>
    <tr>
      <td>plugins</td>
      <td>Record&lt;string, any&gt; | null</td>
      <td>Карта активации плагинов (например: [critical_path](/guides/critical-path/), [auto_scheduling](/guides/auto-scheduling/)).</td>
    </tr>
    <tr>
      <td>calendars</td>
      <td>Calendar[] | null</td>
      <td>Определения рабочих календарей, синхронизируемые по <code>id</code>.</td>
    </tr>
    <tr>
      <td>markers</td>
      <td>Marker[] | null</td>
      <td>Вертикальные маркеры временной шкалы, синхронизируемые по <code>id</code>.</td>
    </tr>
    <tr>
      <td>locale</td>
      <td>string | null</td>
      <td>Имя локали, передаваемое в <code>gantt.i18n.setLocale(...)</code>.</td>
    </tr>
    <tr>
      <td>theme</td>
      <td>string | null</td>
      <td>Имя темы, передаваемое в <code>gantt.setSkin(...)</code> при доступности.</td>
    </tr>
    <tr>
      <td>data</td>
      <td>AngularGanttDataConfig | null</td>
      <td>Коллекции/транспорт: колбэки <code>load</code>, <code>save</code>, <code>batchSave</code>.</td>
    </tr>
    <tr>
      <td>events</td>
      <td>AngularGanttEvents | null</td>
      <td>Карта имен событий к обработчикам для событий Gantt.</td>
    </tr>
    <tr>
      <td>customLightbox</td>
      <td>CustomLightboxConfig | null</td>
      <td>Заменяет встроенный lightbox на компонент Angular.</td>
    </tr>
    <tr>
      <td>groupTasks</td>
      <td>any</td>
      <td>Конфигурация группировки, передаваемая в <code>gantt.groupBy(...)</code>; используйте <code>false</code> для отключения.</td>
    </tr>
    <tr>
      <td>filter</td>
      <td>TaskFilter</td>
      <td>Функция, используемая для фильтрации задач Gantt.</td>
    </tr>
    <tr>
      <td>resourceFilter</td>
      <td>ResourceFilter</td>
      <td>Предикат для фильтрации строк в настройенном хранилище ресурсов.</td>
    </tr>
    <tr>
      <td>htmlTemplatePolicy</td>
      <td>HtmlTemplatePolicy</td>
      <td>Контролирует, как значения строк, возвращаемые функциями-шаблона, рендерятся. <code>\"basic-sanitize\"</code> (по умолчанию) позволяет безопасно форматировать возвращаемый HTML: сохраняются безопасное форматирование, классы, ограниченные встроенные стили, <code>data-*</code> атрибуты и <code>img</code>, а скрипты, обработчики событий и опасные URL удаляются. <code>\"escape\"</code> рендерит строку как текст; <code>\"unsafe-html\"</code> рендерит исходную строку (поведение до v10); пользовательский санитайзер (<code>mode: \"sanitize\"</code> с функцией <code>sanitize(html)</code>) позволяет подключать библиотеки вроде DOMPurify. Для пост-template контроля оборачивайте отдельные функции шаблонов в экспортируемый помощник <code>allowRawHTML()</code>. [Migration notes](/migration#91---92).</td>
    </tr>
  </tbody>
</table>

## Выводы и доступ к экземпляру

### `(ready)`

Обёртка эмитирует `ready` один раз после инициализации и начальной синхронизации.

Форма полезной нагрузки события:

~~~ts
{ instance: GanttStatic }
~~~

~~~html
<dhx-gantt [tasks]="tasks" [links]="links" (ready)="onReady($event)"></dhx-gantt>
~~~

### `instance` через `@ViewChild`

Используйте `@ViewChild(DhxGanttComponent)` когда нужен прямой императивный доступ.

~~~ts
@ViewChild(DhxGanttComponent) ganttCmp?: DhxGanttComponent;

showToday(): void {
  this.ganttCmp?.instance?.showDate(new Date());
}
~~~

## Коллекции данных и синхронизация

Используйте эти входы, когда источником правды является состояние Angular или RxJS‑хранилище:

- `tasks`, `links`
- дополнительные продвинутые хранилища: `resources`, `resourceAssignments`, `baselines`

~~~html
<dhx-gantt
  [tasks]="tasks"
  [links]="links"
  [resources]="resources"
  [resourceAssignments]="resourceAssignments"
  [baselines]="baselines">
</dhx-gantt>
~~~

Краткое описание поведения синхронизации:

- обновления задач/ссылок выполняются по diff-изменениям для обычных изменений,
- обёртка может перейти к сбросу/перепарсированию, когда diff небезопасен/неэффективен,
- хранилища ресурсов/назначений/базовых линий обновляются через хранилища данных Gantt.

Используйте [Основы связывания данных и управления состоянием](integrations/angular/state/state-management-basics.md) для рассмотрения компромиссов моделей.

## Конфигурация, Шаблоны, Плагины, Тема, Локализация

Используйте эти входы для декларативной настройки диаграммы вместо императивных вызовов `instance`.

~~~ts
config = {
  scales: [
    { unit: 'year', step: 1, format: '%Y' },
    { unit: 'month', step: 1, format: '%F, %Y' },
    { unit: 'day', step: 1, format: '%d %M' },
  ],
  columns: [
    { name: 'text', tree: true, width: '*' },
    { name: 'start_date', align: 'center' },
    { name: 'duration', align: 'center' },
    { name: 'add', width: 44 },
  ],
};

templates = {
  task_text: (_start: Date, _end: Date, task: any) => `#${task.id}: ${task.text}`,
};
~~~

~~~html
<dhx-gantt
  [config]="config"
  [templates]="templates"
  [plugins]="{ auto_scheduling: true }"
  [locale]="locale"
  [theme]="theme">
</dhx-gantt>
~~~

### Поведение динамического обновления

- `locale`, `theme`, `config`, `templates` и `plugins` можно обновлять после инициализации.
- Если форма `config.layout` изменится (это не просто вложенные значения), обёртка может заново инициализировать макет Gantt.
- Сохраняйте стабильность идентичности объектов, когда изменений нет, чтобы избежать ненужного повторного применения.

## Ввод `events`

Используйте одну карту событий вместо множества Angular-выходов.

~~~ts
import type { AngularGanttEvents } from '@dhtmlx/trial-angular-gantt';

events: AngularGanttEvents = {
  onTaskCreated: (task) => {
    console.log('создано', task);
    return true;
  },
  onAfterTaskUpdate: (id, task) => {
    console.log('обновлено', id, task);
  },
  onBeforeLightbox: (taskId) => {
    console.log('перед lightbox', taskId);
    return true;
  },
};
~~~

Обёртка принимает как типизированное подмножество общих событий, так и произвольные имена событий через одну и ту же карту.

## Передача данных: `load`, `save`, `batchSave`

Форма входа `data`:

~~~ts
interface AngularGanttDataConfig {
  load?: string | ((gantt: any) => any | Promise<any>);
  save?: string | ((entity: string, action: string, data: any, id: string | number) => any);
  batchSave?: (changes: BatchChanges) => void;
}
~~~

### `load`

- URL-строка -> обёртка вызывает `gantt.load(url)`.
- Функция -> обёртка вызывает её с инстансом gantt и парсит возвращаемый синхронный/асинхронный набор данных.

~~~ts
dataConfig = {
  load: async (gantt) => {
    const response = await fetch('/api/gantt');
    const dataset = await response.json();
    return dataset;
  },
};
~~~

`load` предназначен для первоначальной загрузки. Обёртка применяет его один раз за жизненный цикл компонента.

### `save`

Колбэк на изменение или транспорт (подключён через `gantt.createDataProcessor(save)`).

~~~ts
dataConfig = {
  save: (entity, action, data, id) => {
    console.log(entity, action, data, id);
  },
};
~~~

### `batchSave`

Группированный колбэк для изменений большого объёма (автоматическое планирование, массовые правки, цепные обновления).

~~~ts
import type { BatchChanges } from '@dhtmlx/trial-angular-gantt';

dataConfig = {
  batchSave: (changes: BatchChanges) => {
    if (changes.tasks?.length) {
      console.log('task changes', changes.tasks);
    }
  },
};
~~~

Краткое описание поведения очереди:

- краткосрочная пакетная обработка (небольшое окно дребезга),
- объединение `create` + `update` в одну запись `create` с последней нагрузкой,
- удаление пар `create` + `delete`,
- удаление внутреннего `!nativeeditor_status` из полезной нагрузки.

## Ввод `customLightbox`

Используйте `customLightbox` для замены встроенного lightbox Gantt на компонент Angular.

~~~ts
import type { CustomLightboxConfig } from '@dhtmlx/trial-angular-gantt';

customLightbox: CustomLightboxConfig = {
  component: TaskEditorComponent,
  onSave: ({ id, task }) => console.log('saved', id, task),
  onCancel: () => console.log('cancel'),
  onDelete: (id) => console.log('delete', id),
};
~~~

Экземпляр пользовательского компонента получает от обёртки следующие входы:

- `data` (`{ id, task }`)
- `onSave(updatedTask)`
- `onCancel()`
- `onDelete()`

## Шаблоны и Angular-компоненты

Функции-шаблонов могут возвращать обычные строки/HTML (нативное поведение Gantt) или дескрипторы Angular-компонентов, создаваемые через `templateComponent(...)`.

~~~ts
import { templateComponent } from '@dhtmlx/trial-angular-gantt';

templates = {
  task_text: (_start: Date, _end: Date, task: any) =>
    templateComponent(TaskBadgeTemplateComponent, { task }),
};

config = {
  columns: [
    {
      name: 'status',
      label: templateComponent(HeaderFilterComponent, {
        currentFilter: this.currentFilter,
      }),
      template: (task: any) => templateComponent(StatusCellComponent, { task }),
    },
  ],
};
~~~

Используйте это для заголовков/ячейек грид, текста задачи, шкал и других поверхностей, поддерживающих шаблоны в Gantt.

## Группировка, ресурсы, фильтры, календари, маркеры

Эти входы обычно используются в продвинутых таймлайнах и представлениях ресурсов.

~~~html
<dhx-gantt
  [tasks]="tasks"
  [links]="links"
  [resources]="resources"
  [resourceAssignments]="resourceAssignments"
  [groupTasks]="groupConfig"
  [filter]="taskFilter"
  [resourceFilter]="resourceFilter"
  [calendars]="calendars"
  [markers]="markers"
  [config]="config">
</dhx-gantt>
~~~

Заметки:

- `filter` принимает функцию `(task: any) => boolean` или `null`. При установке отображаются только задачи, для которых функция возвращает `true`. Установите `null`, чтобы показать все задачи.
- `resourceFilter` работает против datastore ресурсов, сконфигурированного через `config.resource_store`.
- `groupTasks` можно включать/выключать с помощью `false` или объекта конфигурации группировки.
- `calendars` и `markers` синхронизируются по `id`, поэтому держите IDs стабильными.

### Фильтрация задач

Используйте вход `filter`, чтобы управлять видимостью задач. Обёртка под капотом добавляет слушатель `onBeforeTaskDisplay` и повторно перерисовывает при изменении ссылки на фильтр.

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

Держите стабильную ссылку, когда логика фильтра не изменилась — обёртка сравнивает по идентичности и повторно рендерит только при изменении ссылки.

## Экспортируемые типы и помощники

Полезные публичные экспортируемые элементы из пакета-обёртки:

- `DhxGanttComponent`
- `DhxGanttModule`
- `templateComponent(...)`
- `isAngularTemplateRenderable(...)`
- `AngularGanttDataConfig`
- `AngularGanttEvents`
- `BatchChanges`, `DataCallbackChange`
- `SerializedTask`, `SerializedLink`
- `TaskFilter`
- `ResourceFilter`
- `GanttStatic`
- `CustomLightboxConfig`
- `Calendar`, `Marker`

### `SerializedTask` vs `Task`

Обёртка экспортирует два типа, связанных с задачами:

- **`SerializedTask`** — использовать для данных, которыми вы владеете: хранение состояния, ответы API, исходные литералы, полезные нагрузки `batchSave`. Даты могут быть объектами `Date` или строками, совпадающими с `date_format`.
- **`Task`** (перепроецирован из `@dhx/gantt`) — для данных, которыми владеет Gantt: внутри обработчиков событий, после того как Gantt распарсит. Даты — объекты `Date`. Имеет системные свойства с префиксом `$`.
`SerializedLink` — аналогичная сторона ссылок по отношению к `SerializedTask`.

## Продолжайте с

- [Angular Gantt Overview](integrations/angular/overview.md)
- [Основы связывания данных и управления состоянием](integrations/angular/state/state-management-basics.md)
- [Учебник по управлению состоянием с RxJS](integrations/angular/state/rxjs.md)
- [dhtmlxGantt с Angular (низкоуровневая интеграция)](integrations/angular/js-gantt-angular.md)
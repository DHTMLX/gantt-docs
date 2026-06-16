---
title: Использование свойств DHTMLX Gantt в VueGantt
sidebar_label: Конфигурация
description: "Справочник по пропсам VueGantt, контрактам по данным/жизненному циклу и экспортируемым помощникам/composables Vue."
---

# Использование свойств DHTMLX Gantt в VueGantt

Эта страница документирует публичную поверхность обертки Vue для `@dhtmlx/trial-vue-gantt` и `@dhx/vue-gantt`.

Используйте её как справочник после разделов [Обзор](integrations/vue/overview.md) или [Быстрый старт](integrations/vue/quick-start.md).

## Доступные пропсы

<table>
  <thead>
    <tr>
      <th>Свойство</th>
      <th>Тип</th>
      <th>Описание</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>tasks</td>
      <td>Task[]</td>
      <td>Коллекция задач, отображаемая в диаграмме/гриду.</td>
    </tr>
    <tr>
      <td>links</td>
      <td>Link[]</td>
      <td>Коллекция зависимостей.</td>
    </tr>
    <tr>
      <td>resources</td>
      <td>any[] | null</td>
      <td>Набор данных ресурсов для раскладки ресурсов и API-методов, связанных с ресурсами.</td>
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
      <td>markers</td>
      <td>Marker[] | null</td>
      <td>Маркеры вертикальной временной шкалы.</td>
    </tr>
    <tr>
      <td>calendars</td>
      <td>(WrapperCalendar | CalendarConfig)[] | null</td>
      <td>Определения рабочих календарей (в формате WrapperCalendar или нативной конфигурации Gantt).</td>
    </tr>
    <tr>
      <td>data</td>
      <td>VueGanttDataConfig | null</td>
      <td>Callbacks передачи данных: <code>load</code>, <code>save</code>, <code>batchSave</code>.</td>
    </tr>
    <tr>
      <td>config</td>
      <td>Partial&lt;GanttConfigOptions&gt;</td>
      <td>Объединено в <code>gantt.config</code>.</td>
    </tr>
    <tr>
      <td>plugins</td>
      <td>GanttPlugins</td>
      <td>[Расширения Gantt](/guides/extensions-list/) для активации (например [auto_scheduling](/guides/auto-scheduling)).</td>
    </tr>
    <tr>
      <td>templates</td>
      <td>Partial&lt;GanttTemplates&gt;</td>
      <td>Объединено в <code>gantt.templates</code>.</td>
    </tr>
    <tr>
      <td>locale</td>
      <td>string | Record&lt;string, any&gt;</td>
      <td>Имя локали или объект локали.</td>
    </tr>
    <tr>
      <td>theme</td>
      <td>string</td>
      <td>Название скина.</td>
    </tr>
    <tr>
      <td>filter</td>
      <td>((task: Task) =&gt; boolean) | null</td>
      <td>Предикат фильтрации задач.</td>
    </tr>
    <tr>
      <td>resourceFilter</td>
      <td>((resource: any) =&gt; boolean) | null</td>
      <td>Предикат фильтрации ресурсов.</td>
    </tr>
    <tr>
      <td>modals</td>
      <td>GanttModals | null</td>
      <td>Переопределяет встроенные диалоги подтверждения удаления.</td>
    </tr>
    <tr>
      <td>groupTasks</td>
      <td>any</td>
      <td>Конфигурация группировки, передаваемая в <code>gantt.groupBy</code>.</td>
    </tr>
    <tr>
      <td>inlineEditors</td>
      <td>Record&lt;string, Component&gt;</td>
      <td>Сопоставление имен типов встроенных редакторов к компонентам Vue.</td>
    </tr>
    <tr>
      <td>customLightbox</td>
      <td>Component | null</td>
      <td>Пользовательский Vue-компонент редактора задачи.</td>
    </tr>
    <tr>
      <td>events</td>
      <td>VueGanttEvents</td>
      <td>Карта имен событий на обработчики.</td>
    </tr>
    <tr>
      <td>htmlTemplatePolicy</td>
      <td>HtmlTemplatePolicy</td>
      <td>Контролирует, как строки, возвращаемые функциями-шаблона, рендерятся. <code>"basic-sanitize"</code> (значение по умолчанию) осуществляет белый санитайзинг возвращаемого HTML: безопасное форматирование, классы, ограниченные встроенные стили, <code>data-*</code> атрибуты и <code>img</code> сохраняются, тогда как скрипты, обработчики событий и опасные URL-адреса удаляются. <code>"escape"</code> рендерит строку как текст; <code>"unsafe-html"</code> рендерит сырую строку (поведение до версии v10); настраиваемый объект санитайзера (<code>mode: "sanitize"</code> с функцией <code>sanitize(html)</code>) позволяет подключать библиотеки, например DOMPurify. Для локального контроля по каждому шаблону оборачивайте отдельные функции-шаблоны экспортируемым помощником <code>allowRawHTML()</code>.[Migration notes](/migration#91---92).</td>
    </tr>
  </tbody>
</table>

## Данные: коллекции и синхронизация

Используйте эти пропсы, когда состояние Vue является единственным источником правды:

- `tasks`, `links`
- дополнительно сложные наборы данных: `resources`, `resourceAssignments`, `baselines`

~~~js
<VueGantt
  :tasks="tasks"
  :links="links"
  :resources="resources"
  :resourceAssignments="resourceAssignments"
  :baselines="baselines"
/>
~~~

Сводка поведения синхронизации:

- обновления задач/ссылок обычно основаны на различиях (diff-based)
- обертка может перейти к сбросу/перепарсингу для крупных изменений
- сложные наборы данных перепарсятся через их хранилища данных

Для выбора модели и стратегии колбэков смотрите [Основы привязки данных и управления состоянием](integrations/vue/state/state-management-basics.md).

## Конфигурация, Шаблоны, Плагины, Theme, Locale

Используйте эти пропсы для повседневной настройки графика без императивных вызовов API.

~~~ts
<script setup lang="ts">
const config = {
  scales: [
    { unit: "year", step: 1, format: "%Y" },
    { unit: "month", step: 1, format: "%F" }
  ],
  columns: [
    { name: "text", tree: true, width: "*" },
    { name: "start_date", align: "center" },
    { name: "duration", align: "center" },
    { name: "add", width: 44 }
  ]
};

const templates = {
  task_text: (_start, _end, task) => `#${task.id}: ${task.text}`
};
</script>

<template>
  <VueGantt
    :config="config"
    :templates="templates"
    :plugins="{ auto_scheduling: true }"
    theme="terrace"
    locale="en"
  />
</template>
~~~

## События, жизненный цикл и доступ к экземпляру

### `events`

Используйте одну карту `events` вместо пропсов, специфичных для обертки, для каждого события Gantt:

~~~ts
const events = {
  onTaskCreated: task => {
    console.log(task);
    return true;
  },
  onBeforeLightbox: id => {
    console.log(id);
    return true;
  }
};
~~~

Карта типизирована как `VueGanttEvents`. Обёртка объявляет следующие известные события с полными сигнатурами типов; любое другое имя события Gantt также принимается (пользовательские события типизированы как обработчики с строковым ключом).

| Событие | Подпись | Примечания |
|---------|----------|-----------|
| `onBeforeLightbox` | `(taskId: string \| number) => boolean \| void` | Вернуть `false`, чтобы подавить встроенную световую панель (например, чтобы перенаправить к внешнему редактору). |
| `onTaskCreated` | `(task: Task) => boolean \| void` | Вернуть `false`, чтобы отменить создание задачи. |
| `onAfterTaskAdd` | `(id: string \| number, task: Task) => void` | Вызываетcя после добавления задачи. |
| `onAfterTaskUpdate` | `(id: string \| number, task: Task) => void` | Вызываетcя после обновления задачи. |
| `onAfterTaskDelete` | `(id: string \| number, task: Task) => void` | Вызываетcя после удаления задачи. |
| `onAfterLinkAdd` | `(id: string \| number, link: Link) => void` | Вызываетcя после добавления ссылки зависимости. |
| `onAfterLinkUpdate` | `(id: string \| number, link: Link) => void` | Вызываетcя после обновления ссылки зависимости. |
| `onAfterLinkDelete` | `(id: string \| number, link: Link) => void` | Вызываетcя после удаления ссылки зависимости. |

Для полного списка событий Gantt (включая события, не перечисленные выше), см. обзор событий Gantt: [Gantt events overview](api/overview/events-overview.md). Используйте `defineGanttEvents(...)` для создания карты с автодополнением по известным событиям.

### `@ready`

`ready(instance)` срабатывает один раз после инициализации и первого синха:

~~~vue
<VueGantt :events="events" @ready="onReady" />
~~~

### `instance` через ссылку на компонент

~~~ts
import { ref } from "vue";
import type { VueGanttRef } from "@dhtmlx/trial-vue-gantt";

const ganttRef = ref<VueGanttRef | null>(null);

function showToday() {
  ganttRef.value?.instance?.showDate(new Date());
}
~~~

Используйте это для продвинутых операций, которые нецелесообразно выполнять через пропсы.

## Передача данных: `load`, `save`, `batchSave`

Форма пропса `data`:

~~~ts
interface VueGanttDataConfig {
  load?: string | ((gantt: GanttStatic) => DataSet | Promise<DataSet>)));
  save?: string | RouterFunction;
  batchSave?: (changes: BatchChanges) => void;
}
~~~

### `load`

- URL-строка -> `gantt.load(url)`
- Функция -> возвращает синхронный или асинхронный набор данных

### `save`

Колбэк на каждое изменение или маршрутизатор через dataProcessor.

### `batchSave`

Группированный колбэк для больших объёмов обновлений:

- `tasks`
- `links`
- `resources`
- `resourceAssignments`

~~~ts
const data = {
  batchSave: changes => {
    if (changes.tasks?.length) {
      console.log("task changes", changes.tasks);
    }
  }
};
~~~

Используйте `batchSave`, когда одно действие графика может вызвать множество обновлений (например, авторасписывание или массовые редактирования).

## Хуки настройки

### `customLightbox`

Заменить встроенную форму задачи на компонент Vue.

### `inlineEditors`

Сопоставление имен типов встроенных редакторов Gantt с компонентами Vue.

### `modals`

Переопределять подтверждения удаления и вызывать `callback()` для подтверждения удаления.

~~~ts
const modals = {
  onBeforeTaskDelete: ({ task, callback }) => {
    if (window.confirm(`Delete task ${task.text}?`)) callback();
  }
};
~~~

Для практических примеров смотрите [Паттерны настройки](integrations/vue/customization-patterns.md).

## Группировка, Фильтрация, Ресурсы, Календари, Маркеры

Эти пропсы часто используются вместе в продвинутых представлениях временной шкалы:

~~~js
<VueGantt
  :groupTasks="groupConfig"
  :filter="taskFilter"
  :resourceFilter="resourceFilter"
  :calendars="calendars"
  :markers="markers"
  :resources="resources"
  :resourceAssignments="resourceAssignments"
/>
~~~

Обычное применение:

- `groupTasks` для представлений с группировкой
- `filter` и `resourceFilter` для сфокусированных срезов
- `calendars` и `markers` для правил расписания и подсветки временной шкалы

## Экспортируемые помощники и композируемые функции

Пакет экспортирует как дефолтный экспорт компонента `VueGantt`, так и именованные экспорты.

Из `@dhtmlx/trial-vue-gantt` или `@dhx/vue-gantt`:

### Типы экспорта

Импортируйте каждый тип прямо из самого пакета-обертки (`@dhx/vue-gantt` или `@dhtmlx/trial-vue-gantt`). Обёртка инкапсулирует движок Gantt и повторно экспортирует его типы наряду с Vue-специфичными типами — отдельного пакета вроде `@dhx/gantt` устанавливать или импортировать не нужно.

**Типы, принадлежащие обёртке**

| Экспорт | Описание |
|--------|------------|
| `SerializedTask` | Форма задачи на стороне пользователя с датами типа `Date | string`. Используется для состояния хранения, исходных данных и полез payload для `save`/`batchSave`. |
| `SerializedLink` | Форма ссылки на стороне пользователя. Используется вместе с `SerializedTask` в состоянии хранения и определениях данных. |
| `VueGanttRef` | Тип значения, возвращаемого через ref — `{ instance: GanttStatic \| null }`. |
| `VueGanttDataConfig` | Форма пропса `data` (`load`, `save`, `batchSave`). |
| `BatchChanges` | Аргумент, переданный в `data.batchSave` — сгруппированные изменения `tasks`/`links`/`resources`/`resourceAssignments`. |
| `DataCallbackChange` | Отдельная запись изменения внутри контейнера `BatchChanges` — `{ entity, action, data, id }`. |
| `Marker` | Форма элементов в пропе `markers`. |
| `WrapperCalendar` | Подходящая обёртке форма календаря, принимаемая пропом `calendars` (наряду с исходной `CalendarConfig`). |
| `GanttModals` | Форма пропса `modals` — сигнатуры колбэков `onBeforeTaskDelete` и `onBeforeLinkDelete`. |
| `CustomLightboxProps` | Свойства, получаемые вашим компонентом `customLightbox` (`data`, `onSave`, `onCancel`, `onDelete`, `ganttInstance`). |
| `InlineEditorComponentProps` | Свойства, получаемые вашими компонентами встроенных редакторов (`initialValue`, `task`, `save`, `cancel`, `ganttInstance`). |
| `VueGanttEvents` | Тип пропса `events` — известные события плюс события с произвольными строковыми ключами. |

**Часто используемые типы из движка Gantt**

Обёртка повторно экспортирует все типы из движка Gantt. Ниже перечислены те, которые чаще всего встречаются в коде обёртки — каждая строка сопоставляет базовый тип с тем местом, где он встречается в Vue API.

| Экспорт | Где встречается в коде обёртки |
|--------|------------|
| `Task`, `Link` | Время-исполняемые формы задач/ссылок (включая свойства с префиксом `$`). Используются внутри обработчиков событий, колбэках шаблонов и функциях фильтрации. |
| `GanttStatic` | Тип `ganttRef.value?.instance` и аргумента `@ready`. |
| `GanttConfigOptions` | Форма объекта, передаваемого в проп `config`. |
| `GanttTemplates` | Форма объекта, передаваемого в проп `templates`. |
| `GanttPlugins` | Форма объекта, передаваемого в проп `plugins`. |
| `CalendarConfig` | Исходная форма календаря Gantt — альтернатива `WrapperCalendar` в пропе `calendars`. |

Каждый другой тип из движка Gantt также экспортируется из обёртки — если можно импортировать имя из `@dhx/gantt` в автономной библиотеке, можно импортировать его и здесь из `@dhx/vue-gantt`.

Используйте `SerializedTask` и `SerializedLink` для данных, которые вы держите сами (состояние Pinia, `ref<>`, ответы API, исходные литералы). Используйте `Task` и `Link` для данных, которыми управляет gantt (внутри обработчиков событий, колбэков шаблонов, функций фильтрации), где объекты задач во время выполнения содержат внутренние свойства с префиксом `$`.

### Фабрики помощников

- `defineGanttConfig(config)` для типизированного написания конфигурации
- `defineGanttTemplates(templates)` для типизированных карт шаблонов
- `defineGanttEvents(events)` для типизированной авторской карты событий
- `defineInlineEditors(inlineEditors)` для типизированных карт встроенных редакторов

Это **лишь идентичности на TypeScript** — на этапе выполнения `defineGanttTemplates(x)` возвращает `x` без изменений. Их можно пропускать вовсе без изменения поведения. Их ценность — сохранение типа на литералах объектов: вы получаете автодополнение для `templates.task_text`, `config.scales[0].unit`, `events.onAfterTaskAdd` и т. д., без явной аннотации переменной.

Если пропусκть их в TypeScript, либо аннотируйте переменную сами, либо передайте литерал прямо в проп:

~~~ts
// Вариант 1: явная аннотация типа
const templates: Partial<GanttTemplates> = {
  task_text: (_s, _e, task) => task.text
};

// Вариант 2: помощник для автодополнения на литерале
const templates = defineGanttTemplates({
  task_text: (_s, _e, task) => task.text
});

// Вариант 3: inline-литерал - вывод делается через тип пропа
<VueGantt :templates="{ task_text: (_s, _e, task) => task.text }" />
~~~

### Композаблы

Обёртка предоставляет пять композаблов, которые оборачивают общие вызовы со стороны экземпляра в форме с учетом рефов и безопасного жизненного цикла. Каждый требует `Ref<VueGanttRef | null>`, чтобы можно было дождаться доступности экземпляра.

#### `useGanttActions(ganttRef)`

Возвращает действия в безопасном императивном стиле:

| Метод | Подпись | Примечания |
|--------|-----------|-------|
| `undo()` | `() => void` | Требуется `plugins: { undo: true }`. |
| `redo()` | `() => void` | Требуется `plugins: { undo: true }`. |
| `render()` | `() => void` | Принуждает перерисовку — сочетайте с `instance.eachTask(...)` для пакетных мутаций. |
| `exportToPDF()` | `() => void` | Требуется `plugins: { export_api: true }`. |
| `exportToPNG()` | `() => void` | Требуется `plugins: { export_api: true }`. |
| `exportToExcel(config?)` | `(config?: object) => void` | Требует `plugins: { export_api: true }`. Передайте опции экспорта через `config`. |
| `exportToMSProject()` | `() => void` | Требуется `plugins: { export_api: true }`. |

~~~ts
import { ref } from "vue";
import { useGanttActions, type VueGanttRef } from "@dhtmlx/trial-vue-gantt";

const ganttRef = ref<VueGanttRef | null>(null);
const actions = useGanttActions(ganttRef);

const exportPdf = () => actions.exportToPDF();
const exportExcel = () => actions.exportToExcel({ visual: "base-colors" });
~~~

#### `useWorkTime(ganttRef)`

Возвращает вычисляемый обёрточный доступ к API работы Gantt. Полезно в шаблонах и при вычислениях ограничений.

| Метод | Подпись |
|--------|-----------|
| `isWorkTime({ date, task?, unit? })` | `(args) => boolean` |
| `calculateEndDate({ start, duration, unit?, task? })` | `(args) => Date` |
| `calculateDuration({ start, end, task? })` | `(args) => number` |
| `getClosestWorkTime({ date, task?, unit, dir? })` | `(args) => Date` |

~~~ts
import { useWorkTime, type VueGanttRef } from "@dhtmlx/trial-vue-gantt";

const ganttRef = ref<VueGanttRef | null>(null);
const workTime = useWorkTime(ganttRef);

const templates = {
  scale_cell_class: (date: Date) =>
    workTime.value.isWorkTime({ date }) ? "" : "weekend"
};
~~~

#### `useGanttDatastore<T>(ganttRef, storeName)`

Возвращает вычисляемый читатель для любого хранилища данных Gantt (например, `"task"`, `"link"`, `"resource"`).

| Метод | Подпись |
|--------|-----------|
| `getItem(id)` | `(id: string \| number) => T \| null` |
| `getItems()` | `() => T[]` |
| `hasChild(id)` | `(id: string \| number) => boolean` |
| `getChildren(id)` | `(id: string \| number) => (string \| number)[]` |

~~~ts
import type { Task } from "@dhtmlx/trial-vue-gantt";
import { useGanttDatastore } from "@dhtmlx/trial-vue-gantt";

const taskStore = useGanttDatastore<Task>(ganttRef, "task");

const rootTasks = computed(() => taskStore.value.getChildren(0));
~~~

#### `useResourceAssignments(ganttRef)`

Возвращает вычисляемый читатель данных назначений ресурсов/задач.

| Метод | Подпись |
|--------|-----------|
| `getResourceAssignments(resourceId, taskId?)` | `(resourceId: string \| number, taskId?: string \| number) => any[]` |
| `getTaskResources(taskId)` | `(taskId: string \| number) => any[]` |

~~~ts
import { useResourceAssignments } from "@dhtmlx/trial-vue-gantt";

const assignments = useResourceAssignments(ganttRef);

const showAssignments = (resourceId: string | number) => {
  console.log(assignments.value.getResourceAssignments(resourceId));
};
~~~

#### `useGanttEvent(ganttRef, eventName, handler)`

Прикрепляет одно событие Gantt с корректным временем жизни. Обработчик автоматически отсоединяется при размонтировании компонента и повторно присоединяется, если изменяются `ganttRef`, `eventName` или `handler`. Возвращает `{ detach }` для ручного управления.

~~~ts
import { useGanttEvent } from "@dhtmlx/trial-vue-gantt";

const { detach } = useGanttEvent(ganttRef, "onTaskDblClick", id => {
  console.log("dbl-click", id);
});

// Опционально: отсоединить раньше
// detach();
~~~

Используйте это, когда одноразовые слушатели не помещаются в карту `events` (например, слушатели, которые нужно обновлять или отписываться на основе локального состояния).

## Что читать дальше

- [Обзор Vue Gantt](integrations/vue/overview.md)
- [Паттерны настройки](integrations/vue/customization-patterns.md)
- [Основы привязки данных и управления состоянием](integrations/vue/state/state-management-basics.md)
- [Использование Vue Gantt с Pinia](integrations/vue/state/pinia.md)
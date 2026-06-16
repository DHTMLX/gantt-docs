---
title: "Модель данных"
sidebar_label: "Модель данных"
description: "Обзор модели данных Gantt: сериализованные типы для загрузки и сохранения, типы времени выполнения, используемые внутри диаграммы, и устаревшие алиасы совместимости."
---

# Модель данных

Gantt работает с двумя основными представлениями данных о задачах и связях:

- **Serialized**: формы, совместимые с JSON, с датами в виде строк, используемые в ответах сервера, сохраняемом JSON и обмене через DataProcessor
- **Runtime**: объекты на стороне клиента с полями `Date` и вычисляемыми свойствами, начинающимися с `$`, возвращаемые методами вроде [gantt.getTask()](api/method/gettask.md) и [gantt.getLink()](api/method/getlink.md)

Когда вы *поставляете* данные в Gantt (а не читаете их обратно), поля дат могут быть либо `Date`, либо `string`. Тип [`TaskInput`](#taskinput) фиксирует эту гибкую форму ввода, чтобы вам не приходилось фиксировать `Task` или `SerializedTask` для данных, которые вы создаёте или храните в состоянии приложения.

Каноническая верхнеуровневая полезная нагрузка, передаваемая в [gantt.parse()](api/method/parse.md) — `GanttData`.

Основные типы времени выполнения и сериализованные типы экспортируются из `@dhx/gantt`. Обёртки-пакеты повторно экспортируют и потребляют эти типы в своих публичных API, но точная поверхность свойств отличается в зависимости от wrappers.

## Жизненный цикл данных

Данные проходят через две трансформации:

1. **Loading**: сериализованные данные задач и связей передаются в `gantt.parse()` или `gantt.load()`. Gantt распознаёт строки дат и преобразует их в объекты `Date`, а также добавляет вычисляемые поля, начинающиеся с `$`, создавая объекты времени выполнения `Task` и `Link`.
2. **Saving**: при отправке изменений на сервер через DataProcessor даты сериализуются обратно в строки, а временные поля с префиксом `$` удаляются.

См. [Data Loading](guides/loading.md) и [Server-Side Integration](guides/server-side.md) для подробностей поведения.

## SerializedTask

Форма задачи, совместимая с JSON. Поля даты — строки, поэтому этот объект можно безопасно передавать через `JSON.stringify()` / `JSON.parse()`.

~~~ts
interface SerializedTask {
    id?: string | number;
    start_date?: string;
    end_date?: string;
    duration?: number;
    text?: any;
    type?: string;
    parent?: string | number;
    progress?: number;
    open?: boolean;

    auto_scheduling?: boolean;
    unscheduled?: boolean;
    constraint_date?: string;
    constraint_type?: string;
    deadline?: string;

    color?: string;
    textColor?: string;
    progressColor?: string;
    bar_height?: number;
    row_height?: number;
    hide_bar?: boolean;

    baselines?: SerializedBaseline[];
    calendar_id?: string | number;
    editable?: boolean;
    readonly?: boolean;
    render?: string;
    resource?: string[];
    rollup?: boolean;
    target?: string;

    [customProperty: string]: any;
}
~~~

Для значимой запланированной задачи в сериализованном JSON укажите одну из допустимых комбинаций планирования:

- `start_date` + `duration`
- `start_date` + `end_date`
- `duration` + `end_date`

Если `unscheduled: true`, даты можно опустить.

Для подробных описаний свойств см. [Task Properties](guides/task-properties.md).

## SerializedLink

~~~ts
interface SerializedLink {
    id: string | number;
    source: string | number;
    target: string | number;
    type: string;
    lag?: number;
    readonly?: boolean;
    editable?: boolean;

    [customProperty: string]: any;
}
~~~

Для подробных описаний свойств см. [Link Properties](guides/link-properties.md).

## Runtime Task and Link

После загрузки Gantt хранит задачи как объекты времени выполнения `Task`.

Основные отличия от `SerializedTask`:

- поля дат задачи, такие как `start_date`, `end_date`, `constraint_date` и `deadline`, являются объектами `Date` JavaScript
- добавляются и поддерживаются на клиенте вычисляемые поля с префиксом `$`

Общие поля задачи времени выполнения:

| Свойство | Тип | Описание |
|----------|------|-------------|
| `$index` | number | Глобальная вертикальная позиция в видимом списке |
| `$level` | number | Глубина вложенности в иерархии задач |
| `$open` | boolean | Нужна ли раскрытая ветка на данный момент |
| `$source` | Array | ID-ссылки, исходящие из задачи |
| `$target` | Array | ID-ссылки, входящие в задачу |
| `$has_child` | boolean | Есть ли у задачи дочерние задачи |

Объект `Link` времени выполнения имеет тот же набор полей, что и `SerializedLink`, но является клиентским объектом, возвращаемым методами вроде `gantt.getLink()`.

Полные списки для времени выполнения смотрите в [Task Properties](guides/task-properties.md#dynamic-properties) и [Link Properties](guides/link-properties.md).

## TaskInput

Когда вы *подаёте* данные задач в Gantt — [gantt.parse()](api/method/parse.md), [gantt.addTask()](api/method/addtask.md), конфигурацию `tasks` или ваше собственное хранилище приложения — используйте `TaskInput`. Это гибкая форма ввода: поля даты принимают либо `Date`, либо `string`, и каждое поле (включая `id`) необязательно, так как Gantt генерирует id, если он не указан.

~~~ts
type TaskInput = Partial<SerializedTask> | Partial<Task>;
~~~

Используйте `TaskInput` для данных, которые вы создаёте или храните в состоянии приложения. Используйте `Task` (время выполнения, даты `Date`, поля с префиксом `$`) при чтении собственных объектов Gantt через методы вроде `gantt.getTask()`, и `SerializedTask` (строки дат) для JSON, который вы обмениваетесь с сервером.

~~~ts
// Задачи, данные которых принадлежат приложению, передаются в Gantt — допускаются оба формата даты:
const tasks: TaskInput[] = [
    { id: 1, text: "Task #1", start_date: new Date(2026, 3, 1), duration: 5 },
    { id: 2, text: "Task #2", start_date: "2026-04-02", duration: 3 }
];
~~~

Сохранение состояния приложения как `TaskInput[]` предпочтительнее, чем типизация как `SerializedTask[]` или `Task[]`: так мы избегаем несоответствий, когда исходные данные используют объекты `Date`, но тип ожидает строки (или наоборот). Выбирайте `Task` / `SerializedTask` только для конкретных границ, где представление даты фиксировано.

## Supporting Types

### Baseline и SerializedBaseline

~~~ts
interface Baseline {
    id: string | number;
    task_id: string | number;
    start_date: Date;
    duration: number;
    end_date: Date;
    [customProperty: string]: any;
}

interface SerializedBaseline {
    id?: string | number;
    task_id?: string | number;
    start_date?: string;
    duration?: number;
    end_date?: string;
    [customProperty: string]: any;
}
~~~

### ResourceAssignment и SerializedResourceAssignment

~~~ts
interface ResourceAssignment {
    id: string | number;
    task_id: string | number;
    resource_id: string | number;
    value: number | string;
    delay: number;
    start_date: Date;
    end_date: Date;
    duration: number;
    mode: string;
    [customProperty: string]: any;
}

interface SerializedResourceAssignment {
    id?: string | number;
    task_id: string | number;
    resource_id: string | number;
    value?: number | string;
    mode?: string;
    delay?: number;
    start_date?: string;
    duration?: number;
    end_date?: string;
    [customProperty: string]: any;
}
~~~

### ResourceItem

~~~ts
interface ResourceItem {
    id: string | number;
    text?: string;
    parent?: string | number;
    open?: boolean;
    unit?: string | number;
    default_value?: string | number;
    [customProperty: string]: any;
}
~~~

См. [Inbuilt Baselines](guides/inbuilt-baselines.md) и [Resource Management](guides/resource-management.md) для деталей по функциям.

## GanttData

Объект, передаваемый в [gantt.parse()](api/method/parse.md):

~~~ts
type GanttData =
  | {
      data: (SerializedTask | Task)[];
      tasks?: undefined;
      links?: (SerializedLink | Link)[];
      resources?: Partial<ResourceItem>[];
      assignments?: (SerializedResourceAssignment | ResourceAssignment)[];
      baselines?: (SerializedBaseline | Baseline)[];
      collections?: Record<string, Array<Record<string, unknown>>>;
    }
  | {
      tasks: (SerializedTask | Task)[];
      data?: undefined;
      links?: (SerializedLink | Link)[];
      resources?: Partial<ResourceItem>[];
      assignments?: (SerializedResourceAssignment | ResourceAssignment)[];
      baselines?: (SerializedBaseline | Baseline)[];
      collections?: Record<string, Array<Record<string, unknown>>>;
    };
~~~

Оба ключа `tasks` и `data` принимаются для массива задач. В новых кодах предпочтительнее использование `tasks`.

~~~js
gantt.parse({
    tasks: [
        { id: 1, text: "Project #1", start_date: "2026-04-01", duration: 18 },
        { id: 2, text: "Task #1", start_date: "2026-04-02", duration: 8, parent: 1 }
    ],
    links: [
        { id: 1, source: 1, target: 2, type: "0" }
    ]
});
~~~

## Алиасы совместимости устаревших API

Старые документы API и типизации по-прежнему используют несколько совместимых имен:

- `DataToLoad1`, `DataToLoad2`: устаревшие вариации ключей `GanttData`
- `NewTask`: устаревший псевдоним [`TaskInput`](#taskinput) (определён как `TaskInput | string | {}`), сохранённый ради обратной совместимости. Предпочитайте `TaskInput` в новом коде.
- `NewResourceItem`: устаревший псевдоним совместимости для `Partial<ResourceItem>`
- `NewAssignmentItem`: устаревший псевдоним совместимости для `SerializedResourceAssignment | ResourceAssignment`

Эти имена сохраняются ради обратной совместимости, но `GanttData`, `TaskInput`, `SerializedTask`, `SerializedLink`, `Task` и `Link` являются каноническими концепциями, используемыми в этом руководстве.

## Правила дат

- При обмене JSON с сервером используйте строки для полей дат
- Если вы создаёте объект JavaScript напрямую и передаёте его в `gantt.parse()`, объекты задач и назначений во время выполнения могут содержать `Date`
- После загрузки Gantt хранит даты задач как объекты `Date` во времени выполнения `Task`
- Начиная с версии v9.1.3, Gantt автоматически распознаёт строки дат в формате ISO 8601

Для деталей и примеров смотрите [Data Loading - Loading Task Dates](guides/loading.md#loadingtaskdates).

## Свойственные свойства

Все типы данных поддерживают пользовательские свойства через `[customProperty: string]: any`. Пользовательские свойства сохраняются на клиенте после загрузки и могут использоваться в шаблонах, столбцах, редакторах и в хранении на сервере.

~~~js
gantt.parse({
    tasks: [
        {
            id: 1,
            text: "Task #1",
            start_date: "2026-04-01",
            duration: 10,
            priority: "high",
            owner: "John"
        }
    ],
    links: []
});

const task = gantt.getTask(1);
console.log(task.priority); // "high"
~~~

## Порядок задач

Gantt отображает задачи в порядке, в котором они появляются в массиве `tasks`. Позиция каждого элемента в массиве — вместе с иерархией `parent` — является единственным фактором, определяющим визуальный порядок на клиенте. Свойство времени выполнения `$index` вычисляется на основе позиции в этом массиве и не сохраняется.

Это означает, что источник данных контролирует порядок отображения. Если пользователи могут [изменять порядок задач через перетаскивание](guides/reordering-tasks.md), источнику данных нужно запоминать новый порядок, чтобы последующие загрузки возвращали задачи в правильной последовательности.

Стандартный подход — числовой столбец `sortorder` в бэкенд-хранилище. Источник данных сортирует задачи по этому столбцу перед возвратом. `sortorder` — концепт только на бэкенде — Gantt не читает и не интерпретирует его на клиенте. Он передается как [собственное свойство](#custom-properties), если включен в полезную нагрузку, но не имеет встроенного эффекта.

Когда пользователь перераспределяет задачу на интерфейсе, Gantt заполняет свойство `target` на объекте задачи, отправляемом на сервер через DataProcessor. Значение указывает, куда была перемещена задача относительно её сверстников:

- `target="taskId"` — поместить эту задачу перед задачей с указанным id
- `target="next:taskId"` — поместить эту задачу после задачи с указанным id

Бэкенд использует это значение для пересчета `sortorder` для затронутых задач.

Для полного примера реализации — схемы базы данных, начальные значения и логику повторного упорядочивания — смотрите [Storing the Order of Tasks](guides/server-side.md#storingtheorderoftasks) в руководстве Server-Side Integration. Для клиентской конфигурации drag-and-drop смотрите [Reordering Tasks](guides/reordering-tasks.md).
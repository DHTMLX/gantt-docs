---
sidebar_label: parse
title: parse метод
description: "загружает данные из ресурса на стороне клиента"
---

# parse

### Description

@short: Загружает данные из ресурса на стороне клиента

@signature: parse: (data: string | GanttData, type?: string) => void

### Parameters

- `data` - (required) *string | GanttData* - строка или объект, представляющий [данные](guides/loading.md#dataproperties)
- `type` - (optional) *string* - необязательный, (`'json'`, `'xml'`) тип данных. Значение по умолчанию — `'json'`

### Example

~~~jsx
gantt.parse({
    tasks: [
        { id: 1, text: "Project #2", start_date: "2026-04-01", duration: 18 },
        { id: 2, text: "Task #1", start_date: "2026-04-02", duration: 8, progress: 0.6, parent: 1 },
        { id: 3, text: "Task #2", start_date: "2026-04-11", duration: 8, progress: 0.6, parent: 1 }
    ],
    links: [
        { id: 1, source: 1, target: 2, type: "1" },
        { id: 2, source: 2, target: 3, type: "0" }
    ]
});
~~~

### Related samples

- [Базовая инициализация](https://docs.dhtmlx.com/gantt/samples/01_initialization/01_basic_init.html)

### Details

Метод `parse()` принимает верхнеуровневый объект [GanttData](guides/data-model.md#ganttdata).

Gantt ожидает, что массив задач будет назван либо `data`, либо `tasks`, в то время как массив связей будет назван `links`.

Это список поддерживаемых свойств:

- `tasks` или `data` - (`(SerializedTask | Task)[]`) массив данных задач
- `links?` - (`(SerializedLink | Link)[]`) массив данных связей
- `resources?` - (`Partial<ResourceItem>[]`) массив данных ресурсов
- `assignments?` - (`(SerializedResourceAssignment | ResourceAssignment)[]`) массив данных назначений
- `baselines?` - (`(SerializedBaseline | Baseline)[]`) массив базовых линий
- `collections?` - (`Record<string, Array<Record<string, unknown>>>`) объект пользовательских коллекций

~~~js
gantt.parse({
    tasks: [
        { id: 1, start_date: "2026-04-01", duration: 42, text: "House Construction" },
        { id: 2, start_date: "2026-04-20", duration: 60, text: "Interior Works" }
    ],
    links: [
        { id: "1", source: "1", target: "2", type: "0" }
    ],
    resources: [
        { id: 1, text: "Anna, Architect", unit: "hours/day", default_value: 8, type: "work" }
    ],
    assignments: [
        { task_id: "1", resource_id: "1", value: "8" },
        {
            task_id: "2",
            resource_id: "1",
            value: "8",
            mode: "fixedDates",
            start_date: "2026-04-20",
            end_date: "2026-04-22",
            duration: 4,
            delay: 2
        },
        {
            task_id: "2",
            resource_id: "1",
            value: "8",
            start_date: new Date("2026-04-20T00:00:00"),
            end_date: new Date("2026-04-23T00:00:00")
        }
    ],
    baselines: [
        {
            id: "b1",
            task_id: 1,
            start_date: "2026-03-28",
            duration: 42,
            end_date: "2026-05-09"
        }
    ]
});
~~~

`data` и `tasks` являются альтернативными ключами для одного и того же массива задач. В новом коде предпочтительнее использовать `tasks`.

Если вы загружаете данные из JavaScript-объекта, созданного в коде, `Task`, `ResourceAssignment` и другие объекты времени выполнения могут содержать `Date`. При обмене данными в формате JSON с сервером поля дат должны быть строками. Гибкая форма входных данных, принимающая либо форму даты (и необязательный `id`), — [`TaskInput`](guides/data-model.md#taskinput).

### Legacy Compatibility Names

Старые API-документации и типы по-прежнему используют несколько псевдонимов совместимости:

- `DataToLoad1`, `DataToLoad2`
- `NewTask` - устаревший псевдоним для [`TaskInput`](guides/data-model.md#taskinput)
- `NewResourceItem`
- `NewAssignmentItem`

Эти имена сохранены для обратной совместимости. Каноническое описание принятых форм — статья [Модель данных](guides/data-model.md).

### Collections

Объект `collections` позволяет загружать пользовательские списки, используемые редакторами и элементами управления. Имена свойств могут быть произвольными, и каждое значение должно быть массивом элементов коллекции.

~~~js
gantt.parse({
    tasks: [
        { id: "1", text: "Task #1", priority: 1, start_date: "2026-04-01", duration: 1 },
        { id: "2", text: "Task #2", priority: 2, start_date: "2026-04-02", duration: 1 },
        { id: "3", text: "Task #3", priority: 3, start_date: "2026-04-03", duration: 1 },
        { id: "4", text: "Task #4", priority: 1, start_date: "2026-04-04", duration: 1 }
    ],
    links: [],
    collections: {
        task_priority: [
            { key: 1, label: "High" },
            { key: 2, label: "Normal" },
            { key: 3, label: "Low" }
        ]
    }
});
~~~

### Empty Task Array

Если нужно загрузить данные, не содержащие задач, все равно необходимо определить пустой массив задач:

~~~js
gantt.parse({
    tasks: [],
    links: [
        { id: 1, source: 1, target: 2, type: "1" },
        { id: 2, source: 2, target: 3, type: "0" }
    ]
});
~~~

### Related API

- [load](api/method/load.md)

### Related Guides

- [Модель данных](guides/data-model.md)
- [Загрузка данных](guides/loading.md)
- [Поддерживаемые форматы данных](guides/supported-data-formats.md)
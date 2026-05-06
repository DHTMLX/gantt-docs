---
sidebar_label: getTaskBaselines
title: getTaskBaselines метод
description: "возвращает массив базовых линий конкретной задачи из хранилища данных"
---

# getTaskBaselines

:::info
Эта функциональность доступна только в редакции PRO.
:::

### Description

@short: Возвращает массив базовых линий конкретной задачи из хранилища данных

@signature: getTaskBaselines: (taskId: string | number) =\> Baseline[]

### Parameters

- `taskId` - (required) *string | number* - идентификатор задачи

### Returns
- ` param` - (Baseline[]) - массив объектов базовых линий

### Example

~~~jsx
gantt.getTaskBaselines(5); // -> see details
~~~

### Related samples
- [Отображение базовых линий](https://docs.dhtmlx.com/gantt/samples/04_customization/15_baselines.html)

### Details

:::note
Метод **getTaskBaselines** недоступен, если конфигурация [baselines](api/config/baselines.md) отключена.
:::

Метод возвращает массив объектов **baseline**, которые имеют следующие свойства:

- **id** - (*string | number*) - идентификатор базовой линии
- **task_id** - (*string | number*) - идентификатор задачи, к которой принадлежит базовая линия
- **start_date** - (*Date*) - начальная дата базовой линии
- **duration** - (*number*) - продолжительность базовой линии
- **end_date** - (*Date | number*) - конечная дата базовой линии
- **[customProperty: string]** - (*any*) - произвольное свойство
- **className** - (*string | number*) - значение этого свойства используется Gantt как пользовательский класс для HTML-элемента


Например:

~~~js
[
    {
        task_id: 5,
        id: 1, 
        duration: 2, 
        start_date: "03-04-2019 00:00", 
        end_date: "05-04-2019 00:00"
    },
    {
        task_id: 5,
        id: 2, 
        duration: 1, 
        start_date: "06-04-2019 00:00", 
        end_date: "07-04-2019 00:00"
    }
]
~~~

### Related Guides
- [Дополнительные элементы на временной шкале](guides/inbuilt-baselines.md)

### Change log
- добавлено в версии 9.0
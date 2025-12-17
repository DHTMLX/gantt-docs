---
sidebar_label: getTaskBaselines
title: getTaskBaselines method
description: "получает массив базовых линий, связанных с конкретной задачей, из хранилища данных"
---

# getTaskBaselines
:::info
 Эта функция доступна только в PRO-версии. 
:::
### Description

@short: Получает массив базовых линий, связанных с конкретной задачей, из хранилища данных

@signature: getTaskBaselines: (taskId: string | number) =\> Baseline[]

### Parameters

- `taskId` - (required) *string | number* -    уникальный идентификатор задачи

### Returns
- ` param` - (Baseline[]) - массив объектов baseline

### Example

~~~jsx
gantt.getTaskBaselines(5); // -> см. детали
~~~

### Related samples
- [Display baselines](https://docs.dhtmlx.com/gantt/samples/04_customization/15_baselines.html)

### Details

:::note
 Метод **getTaskBaselines** не будет работать, если отключена конфигурация [baselines](api/config/baselines.md). 
:::

Этот метод возвращает массив объектов **baseline**, каждый из которых содержит следующие свойства:

- **id** - (*string | number*) - уникальный идентификатор базовой линии
- **task_id** - (*string | number*) - идентификатор задачи, к которой привязана базовая линия
- **start_date** - (*Date*) - дата начала базовой линии
- **duration** - (*number*) - продолжительность базовой линии
- **end_date** - (*Date | number*) - дата окончания базовой линии
- **[customProperty: string]** - (*any*) - любые дополнительные пользовательские свойства

Пример:

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


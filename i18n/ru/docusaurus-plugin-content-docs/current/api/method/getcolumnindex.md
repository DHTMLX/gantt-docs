---
sidebar_label: getColumnIndex
title: getColumnIndex method
description: "возвращает индекс столбца по его имени"
---

# getColumnIndex

### Description

@short: Возвращает индекс столбца по его имени

@signature: getColumnIndex: (name: string | number, excludeHidden?: boolean) =\> number

### Parameters

- `name` - (required) *string | number* - имя столбца
- `excludeHidden` - (optional) *boolean* - пропускает индексы скрытых столбцов

### Returns
- ` index` - (number) - индекс столбца

### Example

~~~jsx
var index = gantt.getColumnIndex("start_date"); // => 1
~~~

### Details

Если параметр `excludeHidden` установлен в значение *true*, метод не будет учитывать столбцы, которые [скрыты](guides/specifying-columns.md#visibility) через опцию *hide:true* в конфигурации:

~~~js
gantt.config.columns = [
    {name: "text", label: "Task name", width: "*", tree: true, resize: true },
    {name: "start_date", label: "Start time" },
    {name: "duration", label: "Duration", width: 60, hide:true  }, /*!*/
    {name: "planned_start", label: "Planned start", hide:true  },  /*!*/
    {name: "planned_end", label: "Planned end", width:80, hide:true  }, /*!*/
    {name: "add", label: "", width: 36 }
];
 
gantt.init("gantt_here");

gantt.getColumnIndex("add"); // => 5 /*!*/
gantt.getColumnIndex("add", true); // => 2 /*!*/
~~~
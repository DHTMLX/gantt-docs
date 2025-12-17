---
sidebar_label: getColumnIndex
title: getColumnIndex method
description: "возвращает позицию колонки по её имени"
---

# getColumnIndex

### Description

@short: Возвращает позицию колонки по её имени

@signature: getColumnIndex: (name: string | number, excludeHidden?: boolean) =\> number

### Parameters

- `name` - (required) *string | number* -            имя колонки
- `excludeHidden` - (required) *boolean* - игнорировать скрытые колонки при подсчёте индексов

### Returns
- ` index` - (number) - позиция колонки

### Example

~~~jsx
var index = gantt.getColumnIndex("start_date"); // => 1
~~~

### Details

Когда параметр `excludeHidden` установлен в *true*, метод пропускает колонки, которые [скрыты](guides/specifying-columns.md#visibility) с помощью настройки *hide:true* в конфигурации:

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

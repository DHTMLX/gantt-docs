---
sidebar_label: onAfterSort
title: onAfterSort event
description: "срабатывает после того, как задачи в grid были отсортированы"
---

# onAfterSort

### Description

@short: Срабатывает после того, как задачи в grid были отсортированы

@signature: onAfterSort: (field: string | GanttCallback, desc?: boolean, parent?: string | number) =\> void;

### Parameters

- `field` - (required) *string | function* - имя колонки, по которой выполнена сортировка, или пользовательская функция сортировки
- `desc` - (optional) *boolean* - необязательно, указывает порядок сортировки: <i>true</i> - по убыванию, <i>false</i> - по возрастанию<br>
- `parent` - (optional) *string | number* - необязательно, ID родительской задачи, если сортировка была ограничена этой веткой

### Example

~~~jsx
gantt.attachEvent("onAfterSort",function(field, direction, parent){
    // ваш код здесь
});
~~~

### Related API
- [sort](api/method/sort.md)
- [sort](api/config/sort.md)


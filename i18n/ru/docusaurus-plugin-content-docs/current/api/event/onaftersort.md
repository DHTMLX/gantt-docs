---
sidebar_label: onAfterSort
title: onAfterSort event
description: "срабатывает после сортировки задач в grid"
---

# onAfterSort

### Description

@short: Fires after tasks are sorted in the grid

@signature: onAfterSort: (field: string | GanttCallback, desc?: boolean, parent?: string | number) =\> void;

### Parameters

- `field` - (required) *string | function* - имя столбца, по которому grid был отсортирован, или пользовательская функция сортировки
- `desc` - (optional) *boolean* - необязательный параметр, направление сортировки: <i>true</i> — по убыванию, <i>false</i> — по возрастанию<br/>
- `parent` - (optional) *string | number* - необязательный параметр, идентификатор родительской задачи, если задачи сортировались только в ветке указанного родителя

### Example

~~~jsx
gantt.attachEvent("onAfterSort",function(field, direction, parent){
    // ваш код здесь
});
~~~

### Related API
- [sort](api/method/sort.md)
- [sort](api/config/sort.md)
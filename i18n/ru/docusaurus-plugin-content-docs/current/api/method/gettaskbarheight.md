---
sidebar_label: getTaskBarHeight
title: getTaskBarHeight method
description: "возвращает высоту (в пикселях) DOM-элемента задачи"
---

# getTaskBarHeight

### Description

@short: Возвращает высоту (в пикселях) DOM-элемента задачи

@signature: getTaskBarHeight: (taskId: number | string) =\> number

### Parameters

- `taskId` - (required) *number | string* -    ID задачи

### Returns
- ` param` - (number) - высота task bar

### Example

~~~jsx
gantt.config.bar_height = 45;
gantt.render();

gantt.getTaskBarHeight(1); // -> 45
~~~

### Details

Возвращаемое значение может соответствовать свойству **bar_height**, установленному для объекта задачи:

~~~js
const tasks = {
      data:[
         { id: 1, text: "Project #2", start_date: "01-04-2018", duration: 18, 
             progress: 0.4, open: true, bar_height: "full", row_height: 50 }, 
        { id: 2, text: "Task #1", start_date: "02-04-2018", duration: 8, 
            progress: 0.6, parent: 1, bar_height: 25, row_height: 50 },
       ]
};
gantt.init("gantt_here");
gantt.parse(tasks);

gantt.getTaskBarHeight(1); // -> 45
gantt.getTaskBarHeight(2); // -> 25
~~~

:::note
 
Если свойство **bar_height** установлено в значение "full", этот метод вычисляет фактическую высоту task bar в пикселях. 
:::

### Related API
- [bar_height](api/config/bar_height.md)

### Related Guides
- [Изменение размера строк в гриде](guides/resizing-rows.md)
- [Task Object/Id](guides/task-object-operations.md#taskheight)

### Change log
- добавлено в версии v7.1


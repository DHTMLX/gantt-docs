---
sidebar_label: open
title: open method
description: "открывает ветку, идентифицированную заданным id"
---

# open

### Description

@short: Открывает ветку, идентифицированную заданным id

@signature: open: (id: string | number) =\> void

### Parameters

- `id` - (required) *string | number* -    id ветки

### Example

~~~jsx
const tasks = {
  data:[
     {id:"p_1", text:"Project #1", start_date:"01-04-2023", duration:18},
     {id:"t_1", text:"Task #1", start_date:"02-04-2023", duration:8,
     parent:"p_1"},
     {id:"t_2", text:"Task #2", start_date:"11-04-2023", duration:8,
     parent:"p_1"}
   ]
};

gantt.init("gantt_here");
gantt.parse(tasks);
gantt.open("p_1"); /*!*/
~~~

### Details

Этот метод вызывает событие [onTaskOpened](api/event/ontaskopened.md).

### Related API
- [close](api/method/close.md)

### Related Guides
- [Настройка древовидной колонки](guides/tree-column.md)


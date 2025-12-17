---
sidebar_label: open
title: open method
description: "opens the branch with the specified id"
---

# open

### Description

@short: Opens the branch with the specified id

@signature: open: (id: string | number) =\> void

### Parameters

- `id` - (required) *string | number* -   the branch id

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

The method invokes the [onTaskOpened](api/event/ontaskopened.md) event.

### Related API
- [close](api/method/close.md)

### Related Guides
- [Configuring the Tree Column](guides/tree-column.md)


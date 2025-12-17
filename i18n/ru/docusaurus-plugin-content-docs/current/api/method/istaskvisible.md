---
sidebar_label: isTaskVisible
title: isTaskVisible method
description: "определяет, отображается ли указанная задача в данный момент на диаграмме Ганта"
---

# isTaskVisible

### Description

@short: Определяет, отображается ли указанная задача в данный момент на диаграмме Ганта

@signature: isTaskVisible: (id: string | number) =\> boolean

### Parameters

- `id` - (required) *string | number* -        уникальный идентификатор задачи

### Returns
- ` isvisible` - (boolean) - <i>true</i>, если задача в данный момент показана на диаграмме Ганта; иначе <i>false</i>

### Example

~~~jsx
const tasks = {
  data:[
     {id:"p_1", text:"Project #1", start_date:"01-04-2023", duration:18, 
     open:true},
     {id:"t_1", text:"Task #1", start_date:"02-04-2023", duration:8,
     parent:"p_1"},
     {id:"t_2", text:"Task #2", start_date:"11-04-2023", duration:8,
     parent:"p_1"}
   ]
};
gantt.init("gantt_here");
gantt.parse(tasks);
 
gantt.isTaskVisible("t_1"); // ->true  /*!*/
~~~

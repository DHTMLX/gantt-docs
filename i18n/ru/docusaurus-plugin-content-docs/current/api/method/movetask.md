---
sidebar_label: moveTask
title: moveTask method
description: "перемещает задачу на другую позицию"
---

# moveTask

### Description

@short: Перемещает задачу на другую позицию

@signature: moveTask: (sid: string | number, tindex: number, parent?: string | number) =\> boolean | void

### Parameters

- `sid` - (required) *string | number* -            идентификатор задачи, которую нужно переместить
- `tindex` - (required) *number* - целевой индекс позиции, на которую будет помещена задача <br> (индекс внутри ветки)
- `parent` - (optional) *string | number* -            идентификатор родителя. Если указан, <b>tindex</b> соответствует индексу внутри <br> ветки <b>'parent'</b>

### Returns
- ` result` - (boolean | void) - возвращает `false`, если перемещение отменено через [onBeforeTaskMove](api/event/onbeforetaskmove.md), иначе возвращает `undefined`

### Example

~~~jsx
const tasks = {
  data:[
     {id:"p_1", text:"Проект #1", start_date:"01-04-2023", duration:18, 
     open:true},
     {id:"t_1", text:"Задача #1", start_date:"02-04-2023", duration:8,
     parent:"p_1"},
     {id:"t_2", text:"Задача #2", start_date:"11-04-2023", duration:8,
     parent:"p_1"}
   ]
};
gantt.init("gantt_here");
gantt.parse(tasks);
 
gantt.moveTask("t_1", 1); /*!*/
//-> это переместит задачу "t_1" на корневой уровень
~~~

### Related API
- [getTaskIndex](api/method/gettaskindex.md)
- [onBeforeTaskMove](api/event/onbeforetaskmove.md)
- [onAfterTaskMove](api/event/onaftertaskmove.md)


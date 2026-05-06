---
sidebar_label: moveTask
title: moveTask method
description: "Перемещает задачу на новую позицию"
---

# moveTask

### Description

@short: Перемещает задачу на новую позицию

@signature: moveTask: (sid: string | number, tindex: number, parent?: string | number) =\> boolean | void

### Parameters

- `sid` - (required) *string | number* - идентификатор задачи, которую нужно переместить
- `tindex` - (required) *number* - индекс позиции, в которую будет перемещена задача <br/> (индекс внутри ветви)
- `parent`	- (optional) *string | number*	- идентификатор родителя. Если указан, значение <b>tindex</b> будет относиться к индексу в ветке <br/> <b>'parent'</b>

### Returns
- ` result` - (boolean | void) - возвращает `false`, если действие было отменено с использованием [onBeforeTaskMove](api/event/onbeforetaskmove.md), возвращает `undefined` в противном случае

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
 
gantt.moveTask("t_1", 1); /*!*/
//-> after such a move, the task "t_1" will have the root level
~~~ 

### Related API
- [getTaskIndex](api/method/gettaskindex.md)
- [onBeforeTaskMove](api/event/onbeforetaskmove.md)
- [onAfterTaskMove](api/event/onaftertaskmove.md)
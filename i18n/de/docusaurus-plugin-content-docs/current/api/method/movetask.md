---
sidebar_label: moveTask
title: moveTask Methode
description: "verschiebt eine Aufgabe an eine neue Position"
---

# moveTask

### Description

@short: Verschiebt eine Aufgabe an eine neue Position

@signature: moveTask: (sid: string | number, tindex: number, parent?: string | number) =\> boolean | void

### Parameters

- `sid` - (required) *string | number* - die ID der Aufgabe, die verschoben werden soll
- `tindex` - (required) *number* - der Index der Position, zu der die Aufgabe verschoben wird <br/> (der Index innerhalb eines Zweigs)
- `parent`	- (optional) *string | number*		- die Parent-ID. Falls angegeben, bezieht sich der <b>tindex</b> auf den Index im <br/> <b>'parent'</b> Zweig

### Returns
- ` result` - (boolean | void) - gibt `false` zurück, wenn die Aktion durch [onBeforeTaskMove](api/event/onbeforetaskmove.md) abgebrochen wurde, ansonsten `undefined`

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
//-> dies verschiebt die Aufgabe "t_1" auf die oberste Ebene
~~~

### Related API
- [getTaskIndex](api/method/gettaskindex.md)
- [onBeforeTaskMove](api/event/onbeforetaskmove.md)
- [onAfterTaskMove](api/event/onaftertaskmove.md)
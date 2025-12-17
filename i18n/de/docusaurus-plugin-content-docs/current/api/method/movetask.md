---
sidebar_label: moveTask
title: moveTask method
description: "verschiebt eine Aufgabe an eine andere Stelle"
---

# moveTask

### Description

@short: Verschiebt eine Aufgabe an eine andere Stelle

@signature: moveTask: (sid: string | number, tindex: number, parent?: string | number) =\> boolean | void

### Parameters

- `sid` - (required) *string | number* -  die Kennung der zu verschiebenden Aufgabe
- `tindex` - (required) *number* - 	der Zielpositionsindex, an dem die Aufgabe platziert wird
(der Index innerhalb eines Branches)
- `parent` - (optional) *string | number* - die ID des übergeordneten Elements. Wenn angegeben, entspricht der tindex dem Index innerhalb des
'parent' Branches

### Returns
- ` result` - (boolean | void) - gibt `false` zurück, wenn die Verschiebung über [onBeforeTaskMove](api/event/onbeforetaskmove.md) abgebrochen wird, andernfalls `undefined`

### Example

~~~jsx
const tasks = {
  data:[
     {id:"p_1", text:"Projekt #1", start_date:"01-04-2023", duration:18, 
     open:true},
     {id:"t_1", text:"Aufgabe #1", start_date:"02-04-2023", duration:8,
     parent:"p_1"},
     {id:"t_2", text:"Aufgabe #2", start_date:"11-04-2023", duration:8,
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


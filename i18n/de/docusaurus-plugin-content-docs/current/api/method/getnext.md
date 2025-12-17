---
sidebar_label: getNext
title: getNext method
description: "Liefert die ID des folgenden Elements, unabhängig von dessen Verschachtelungsebene, egal ob es sich um dasselbe oder ein anderes handelt"
---

# getNext

### Description

@short: Liefert die ID des folgenden Elements, unabhängig von dessen Verschachtelungsebene, egal ob es sich um dasselbe oder ein anderes handelt

@signature: getNext: (id: string | number) =\> string | number

### Parameters

- `id` - (required) *string | number* -    die Aufgaben-ID

### Returns
- ` id` - (string | number) - die ID des nächsten Elements

### Example

~~~jsx
const tasks = {
  data:[
     {id:"p_1", text:"Project #1", start_date:"01-04-2013", duration:18, 
     open:true},
     {id:"t_1", text:"Task #1", start_date:"02-04-2013", duration:8,
     parent:"p_1"},
     {id:"t_2", text:"Task #2", start_date:"11-04-2013", duration:8,
     parent:"p_1"}
   ]
};
gantt.init("gantt_here");
gantt.parse(tasks);

gantt.getNext("p_1"); -> "t_1" /*!*/
gantt.getNext("t_1"); -> "t_2" /*!*/
gantt.getNext("t_2"); -> null  /*!*/
~~~

### Related API
- [getPrev](api/method/getprev.md)
- [hasChild](api/method/haschild.md)
- [getChildren](api/method/getchildren.md)
- [getSiblings](api/method/getsiblings.md)
- [getNextSibling](api/method/getnextsibling.md)
- [getPrevSibling](api/method/getprevsibling.md)

### Related Guides
- ["Task Parent/Child"](guides/task-tree-operations.md)


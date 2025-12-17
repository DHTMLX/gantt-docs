---
sidebar_label: getNextSibling
title: getNextSibling method
description: "liefert die ID der nächsten Aufgabe auf derselben Ebene"
---

# getNextSibling

### Description

@short: Liefert die ID der nächsten Aufgabe auf derselben Ebene

@signature: getNextSibling: (id: string | number) =\> string | number

### Parameters

- `id` - (required) *string | number* -    die Aufgaben-ID

### Returns
- ` id` - (string | number) - die ID des nächsten Geschwisterelements

### Example

~~~jsx
const tasks = {
  data:[
     {id:"p_1", text:"Projekt #1", start_date:"01-04-2013", duration:18, 
     open:true},
     {id:"t_1", text:"Aufgabe #1", start_date:"02-04-2013", duration:8,
     parent:"p_1"},
     {id:"t_2", text:"Aufgabe #2", start_date:"11-04-2013", duration:8,
     parent:"p_1"}
   ]
};
gantt.init("gantt_here");
gantt.parse(tasks);
 
gantt.getNextSibling("t_1"); ->  "t_2"  /*!*/
gantt.getNextSibling("t_2"); ->  null (wenn kein nächstes Geschwisterelement vorhanden) /*!*/
~~~

### Related API
- [getPrevSibling](api/method/getprevsibling.md)
- [getSiblings](api/method/getsiblings.md)
- [getParent](api/method/getparent.md)
- [hasChild](api/method/haschild.md)
- [getChildren](api/method/getchildren.md)

### Related Guides
- ["Task Parent/Child"](guides/task-tree-operations.md)


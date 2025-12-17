---
sidebar_label: getPrevSibling
title: getPrevSibling method
description: "holt die ID der vorherigen Aufgabe auf derselben Ebene"
---

# getPrevSibling

### Description

@short: Holt die ID der vorherigen Aufgabe auf derselben Ebene

@signature: getPrevSibling: (id: string | number) =\> string | number

### Parameters

- `id` - (required) *string | number* -    die Aufgaben-ID

### Returns
- ` prevSibling` - (string, number) - die ID des vorherigen Geschwisterelements

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
 
gantt.getPrevSibling("t_2"); ->  "t_1" /*!*/
gantt.getPrevSibling("t_1"); ->  null (wenn kein vorheriges Geschwisterelement vorhanden) /*!*/
~~~

### Related API
- [getNextSibling](api/method/getnextsibling.md)
- [getSiblings](api/method/getsiblings.md)
- [getParent](api/method/getparent.md)
- [hasChild](api/method/haschild.md)
- [getChildren](api/method/getchildren.md)

### Related Guides
- ["Task Parent/Child"](guides/task-tree-operations.md)


---
sidebar_label: getPrevSibling
title: getPrevSibling Methode
description: "gibt die ID der vorherigen Aufgabe auf derselben Ebene zurück"
---

# getPrevSibling

### Description

@short: Gibt die ID der vorherigen Aufgabe auf derselben Ebene zurück

@signature: getPrevSibling: (id: string | number) =\> string | number

### Parameters

- `id` - (erforderlich) *string | number* -   die Aufgaben-ID

### Returns
- ` prevSibling` - (string, number) - die ID des vorherigen Geschwisterelements

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
 
gantt.getPrevSibling("t_2"); ->  "t_1" /*!*/
gantt.getPrevSibling("t_1"); ->  null (falls kein vorheriges Geschwisterelement) /*!*/
~~~

### Related API
- [getNextSibling](api/method/getnextsibling.md)
- [getSiblings](api/method/getsiblings.md)
- [getParent](api/method/getparent.md)
- [hasChild](api/method/haschild.md)
- [getChildren](api/method/getchildren.md)

### Related Guides
- [Task Parent/Child](guides/task-tree-operations.md)
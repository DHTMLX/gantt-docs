---
sidebar_label: close
title: close method
description: "schließt den Branch, der durch die angegebene ID identifiziert wird"
---

# close

### Description

@short: Schließt den Branch, der durch die angegebene ID identifiziert wird

@signature: close: (id: string | number) =\> void

### Parameters

- `id` - (required) *string | number* -    die ID des Branches

### Example

~~~jsx
var tasks = {
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

gantt.close("p_1");/*!*/
~~~

### Details

Beachten Sie, dass diese Methode das Event [onTaskClosed](api/event/ontaskclosed.md) auslöst.

### Related API
- [open](api/method/open.md)
- [onTaskClosed](api/event/ontaskclosed.md)

### Related Guides
- ["Konfiguration der Baumspalte"](guides/tree-column.md)


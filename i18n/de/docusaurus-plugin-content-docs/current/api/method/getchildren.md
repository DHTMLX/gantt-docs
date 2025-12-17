---
sidebar_label: getChildren
title: getChildren method
description: "ruft die direkten untergeordneten Aufgaben eines gegebenen übergeordneten Branches ab"
---

# getChildren

### Description

@short: Ruft die direkten untergeordneten Aufgaben eines gegebenen übergeordneten Branches ab

@signature: getChildren: (id: string | number) =\> any[]

### Parameters

- `id` - (required) *string | number* -  die ID des übergeordneten Branches

### Returns
- ` ids` - (array) - ein Array, das die IDs der untergeordneten Aufgaben enthält

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

gantt.getChildren("p_1");//->["t_1", "t_2"] /*!*/
~~~

### Related samples
- [Basic filtering](https://docs.dhtmlx.com/gantt/samples/07_grid/03_filtering.html)

### Details

Eine weitere Möglichkeit, durch untergeordnete Aufgaben einer bestimmten Aufgabe zu iterieren, ist die Verwendung von [eachTask](api/method/eachtask.md).

### Related API
- [hasChild](api/method/haschild.md)
- [getNext](api/method/getnext.md)
- [getPrev](api/method/getprev.md)
- [getSiblings](api/method/getsiblings.md)
- [getNextSibling](api/method/getnextsibling.md)
- [getPrevSibling](api/method/getprevsibling.md)
- [eachTask](api/method/eachtask.md)

### Related Guides
- ["Konfiguration der Baumspalte"](guides/tree-column.md)


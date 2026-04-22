---
sidebar_label: getSiblings
title: getSiblings Methode
description: "liefert die Geschwister der angegebenen Aufgabe zurück (einschließlich der aktuellen)"
---

# getSiblings

### Description

@short: Liefert die Geschwister der angegebenen Aufgabe (einschließlich der aktuellen)

@signature: getSiblings: (id: string | number) =\> any[]

### Parameters

- `id` - (required) *string | number* -    die Aufgaben-ID

### Returns
- ` siblings` - (array) - die IDs der Geschwister der Aufgabe

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
 
gantt.getSiblings("t_1"); ->  ["t_1", "t_2] /*!*/
~~~ 

### Details

Geschwister sind Aufgaben der gleichen Baum-Ebene

### Related API
- [getNextSibling](api/method/getnextsibling.md)
- [getPrevSibling](api/method/getprevsibling.md)
- [getParent](api/method/getparent.md)
- [hasChild](api/method/haschild.md)
- [getChildren](api/method/getchildren.md)
---
sidebar_label: getSiblings
title: getSiblings method
description: "bietet die Geschwister einer gegebenen Aufgabe, einschließlich der Aufgabe selbst"
---

# getSiblings

### Description

@short: Bietet die Geschwister einer gegebenen Aufgabe, einschließlich der Aufgabe selbst

@signature: getSiblings: (id: string | number) =\> any[]

### Parameters

- `id` - (required) *string | number* -    die ID der Aufgabe

### Returns
- ` siblings` - (array) - ein Array, das die IDs der Geschwister der Aufgabe enthält

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
 
gantt.getSiblings("t_1"); ->  ["t_1", "t_2"] /*!*/
~~~

### Details

Geschwister sind Aufgaben, die sich auf derselben Ebene in der Aufgaben-Hierarchie befinden

### Related API
- [getNextSibling](api/method/getnextsibling.md)
- [getPrevSibling](api/method/getprevsibling.md)
- [getParent](api/method/getparent.md)
- [hasChild](api/method/haschild.md)
- [getChildren](api/method/getchildren.md)


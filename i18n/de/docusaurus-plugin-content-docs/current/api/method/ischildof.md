---
sidebar_label: isChildOf
title: isChildOf method
description: "prüft, ob eine Aufgabe ein Kind einer anderen Aufgabe ist"
---

# isChildOf

### Description

@short: Prüft, ob eine Aufgabe ein Kind einer anderen Aufgabe ist

@signature: isChildOf: (childId: string | number, parentId: string | number) =\> boolean

### Parameters

- `childId` - (required) *string | number* -    die ID einer Aufgabe, die Sie als Kind überprüfen möchten
- `parentId` - (required) *string | number* -    die ID einer Aufgabe, die Sie als Elternaufgabe überprüfen möchten

### Returns
- ` isChild` - (boolean) - <i>true</i>, wenn die Aufgabe ein Kind der angegebenen Elternaufgabe ist. Andernfalls <i>false</i>

### Example

~~~jsx
const tasks = {
    "data":[
        {"id":"10", "text":"Project #10", "start_date":"01-04-2023", "duration":3, 
            "order":10,"progress":0.4, "open": true},
        {"id":"1", "text":"Task #1",    "start_date":"02-04-2023", "duration":2,  
            "order":10,"progress":0.6, "parent":"10"},
        {"id":"2", "text":"Task #2",    "start_date":"01-04-2023", "duration":2,  
            "order":20,"progress":0.6, "parent":"10"},
        {"id":"3", "text":"Task #3",    "start_date":"05-04-2023", "duration":2,  
            "order":20,"progress":0.6, "parent":"10"}
    ],
    "links":[]
}; 

gantt.isChildOf(2,10); //-> true /*!*/
gantt.isChildOf(2,3); //-> false /*!*/
~~~
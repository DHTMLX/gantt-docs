---
sidebar_label: isChildOf
title: isChildOf method
description: "bestimmt, ob eine Aufgabe ein Kind einer anderen Aufgabe ist"
---

# isChildOf

### Description

@short: Bestimmt, ob eine Aufgabe ein Kind einer anderen Aufgabe ist

@signature: isChildOf: (childId: string | number, parentId: string | number) =\> boolean

### Parameters

- `childId` - (required) *string | number* -    die ID der Aufgabe, die als Kind überprüft werden soll
- `parentId` - (required) *string | number* -    die ID der Aufgabe, die als Elternteil überprüft werden soll

### Returns
- ` isChild` - (boolean) - <i>true</i>, wenn die Aufgabe tatsächlich ein Kind der angegebenen Elternaufgabe ist; andernfalls <i>false</i>

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

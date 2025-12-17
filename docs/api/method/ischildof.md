---
sidebar_label: isChildOf
title: isChildOf method
description: "checks whether a task is a child of a different task"
---

# isChildOf

### Description

@short: Checks whether a task is a child of a different task

@signature: isChildOf: (childId: string | number, parentId: string | number) =\> boolean

### Parameters

- `childId` - (required) *string | number* -    the id of a task that you want to check as a child
- `parentId` - (required) *string | number* -    the id of a task that you want to check as a parent

### Returns
- ` isChild` - (boolean) - <i>true</i>, if the task is a child of the specified parent task. Otherwise, <i>false</i>

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

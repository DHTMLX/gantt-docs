---
sidebar_label: isChildOf
title: isChildOf method
description: "确定一个任务是否是另一个任务的子任务"
---

# isChildOf

### Description

@short: 确定一个任务是否是另一个任务的子任务

@signature: isChildOf: (childId: string | number, parentId: string | number) =\> boolean

### Parameters

- `childId` - (required) *string | number* -    要验证是否为子任务的任务ID
- `parentId` - (required) *string | number* -    要验证是否为父任务的任务ID

### Returns
- ` isChild` - (boolean) - <i>true</i> 如果该任务确实是指定父任务的子任务；否则，<i>false</i>

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

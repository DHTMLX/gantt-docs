---
sidebar_label: isChildOf
title: isChildOf method
description: "특정 작업이 다른 작업의 자식인지 여부를 결정합니다."
---

# isChildOf

### Description

@short: 특정 작업이 다른 작업의 자식인지 여부를 결정합니다.

@signature: isChildOf: (childId: string | number, parentId: string | number) =\> boolean

### Parameters

- `childId` - (required) *string | number* -    자식으로 확인할 작업의 ID
- `parentId` - (required) *string | number* -    부모로 확인할 작업의 ID

### Returns
- ` isChild` - (boolean) - <i>true</i> 해당 작업이 지정된 부모 작업의 자식인 경우; 그렇지 않으면 <i>false</i>

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

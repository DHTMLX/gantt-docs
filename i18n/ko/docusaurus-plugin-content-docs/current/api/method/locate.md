---
sidebar_label: locate
title: locate method
description: "주어진 HTML 이벤트를 기반으로 작업의 id를 가져옵니다"
---

# locate

### Description

@short: 주어진 HTML 이벤트를 기반으로 작업의 id를 가져옵니다

@signature: locate: (e: Event) =\> string | number

### Parameters

- `e` - (required) *Event* - 네이티브 이벤트 객체

### Returns
- ` id` - (string | number) - 작업의 식별자

### Example

~~~jsx
gantt.$container.addEventListener("mouseover", function(event){
    const taskId = gantt.locate(event);
    if(gantt.isTaskExists(taskId)){
       gantt.message({
         id:1,
         text:"Mouse over " + gantt.getTask(taskId).text});
    }
});
~~~

### Related API
- [task_attribute](api/config/task_attribute.md)


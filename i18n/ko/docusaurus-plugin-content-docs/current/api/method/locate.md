---
sidebar_label: locate
title: locate 메서드
description: "지정된 HTML 이벤트에서 작업의 ID를 가져옵니다"
---

# locate

### Description

@short: 지정된 HTML 이벤트에서 작업의 ID를 가져옵니다

@signature: locate: (e: Event) => string | number

### Parameters

- `e` - (필수) *Event* - 네이티브 이벤트

### Returns
- ` id` - (string | number) - 작업 ID

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
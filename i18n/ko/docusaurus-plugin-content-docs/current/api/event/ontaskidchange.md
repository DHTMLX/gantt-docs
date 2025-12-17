---
sidebar_label: onTaskIdChange
title: onTaskIdChange event
description: "작업의 ID가 업데이트될 때 트리거됩니다"
---

# onTaskIdChange

### Description

@short: 작업의 ID가 업데이트될 때 트리거됩니다

@signature: onTaskIdChange: (id: string | number, new_id: string | number) =\> void;

### Parameters

- `id` - (required) *string | number* - 현재 작업의 ID
- `new_id` - (required) *string | number* - 업데이트된 작업의 ID

### Example

~~~jsx
gantt.attachEvent("onTaskIdChange", function(id,new_id){
    //여기에 커스텀 로직 작성
});
~~~

### Related API
- [changeTaskId](api/method/changetaskid.md)


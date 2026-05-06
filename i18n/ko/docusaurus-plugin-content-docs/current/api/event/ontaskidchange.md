---
sidebar_label: onTaskIdChange
title: onTaskIdChange 이벤트
description: "작업의 ID가 변경될 때 발생합니다"
---

# onTaskIdChange

### Description

@short: 작업의 ID가 변경될 때 발생합니다

@signature: onTaskIdChange: (id: string | number, new_id: string | number) =\> void;

### Parameters

- `id` - (필수) *string | number* - 현재 작업의 ID
- `new_id` - (필수) *string | number* - 새 작업의 ID

### Example

~~~jsx
gantt.attachEvent("onTaskIdChange", function(id,new_id){
    // 여기에 코드 작성
});
~~~

### Related API
- [changeTaskId](api/method/changetaskid.md)
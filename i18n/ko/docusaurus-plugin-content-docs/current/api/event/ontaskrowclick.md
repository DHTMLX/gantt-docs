---
sidebar_label: onTaskRowClick
title: onTaskRowClick event
description: "사용자가 테이블의 행을 클릭할 때 트리거됩니다."
---

# onTaskRowClick

### Description

@short: 사용자가 테이블의 행을 클릭할 때 트리거됩니다.

@signature: onTaskRowClick: (id: string | number, row: HTMLElement) =\> void;

### Parameters

- `id` - (required) *string | number* - 작업 ID
- `row` - (required) *HTMLElement* - 클릭된 행을 나타내는 HTML 요소

### Example

~~~jsx
gantt.attachEvent("onTaskRowClick", function(id,row){
    //여기에 사용자 정의 로직 작성
});
~~~

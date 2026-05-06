---
sidebar_label: onTaskRowClick
title: onTaskRowClick 이벤트
description: "사용자가 표의 행을 클릭할 때 발생합니다"
---

# onTaskRowClick

### Description

@short: 사용자가 표의 행을 클릭할 때 발생합니다

@signature: onTaskRowClick: (id: string | number, row: HTMLElement) =\> void;

### Parameters

- `id` - (required) *string | number* - 작업 ID
- `row` - (required) *HTMLElement* - 클릭된 행의 HTML 요소

### Example

~~~jsx
gantt.attachEvent("onTaskRowClick", function(id,row){
    // 여기에 코드 작성
});
~~~
---
sidebar_label: onLightbox
title: onLightbox event
description: "사용자가 라이트박스(편집 폼)를 열 때 한 번 트리거됩니다."
---

# onLightbox

### Description

@short: 사용자가 라이트박스(편집 폼)를 열 때 한 번 트리거됩니다.

@signature: onLightbox: (task_id: string | number) =\> void;

### Parameters

- `task_id` - (required) *string | number* - 라이트박스에서 열린 작업의 ID입니다.

### Example

~~~jsx
gantt.attachEvent("onLightbox", function (task_id){
    //여기에 커스텀 로직을 추가할 수 있습니다.
});
~~~

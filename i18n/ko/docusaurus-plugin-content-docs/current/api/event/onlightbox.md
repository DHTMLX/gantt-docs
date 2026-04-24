---
sidebar_label: onLightbox
title: onLightbox event
description: "사용자가 라이트박스(편집 양식)를 연 직후에 발생합니다"
---

# onLightbox

### Description

@short: 사용자가 라이트박스(편집 양식)를 연 직후에 발생합니다

@signature: onLightbox: (task_id: string | number) =\> void;

### Parameters

- `task_id` - (필수) *string,number* - 라이트박스에서 열려 있는 작업의 ID

### Example

~~~jsx
gantt.attachEvent("onLightbox", function (task_id){
    // 여기에 코드 작성
});
~~~
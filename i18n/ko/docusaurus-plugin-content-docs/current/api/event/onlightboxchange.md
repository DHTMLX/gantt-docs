---
sidebar_label: onLightboxChange
title: onLightboxChange event
description: "라이트박스 구조가 업데이트될 때 트리거됩니다"
---

# onLightboxChange

### Description

@short: 라이트박스 구조가 업데이트될 때 트리거됩니다

@signature: onLightboxChange: (old_type: string, new_type: string) =\> void;

### Parameters

- `old_type` - (required) *string* - 기존 라이트박스 구조의 이름
- `new_type` - (required) *string* - 업데이트된 라이트박스 구조의 이름

### Example

~~~jsx
gantt.attachEvent("onLightboxChange", function(old_type, new_type){
    if(new_type == "milestone"){
        alert("작업 유형이 'milestone'으로 변경되었습니다.")
    }
});
~~~

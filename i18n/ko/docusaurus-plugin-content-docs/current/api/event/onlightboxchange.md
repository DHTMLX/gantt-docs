---
sidebar_label: onLightboxChange
title: onLightboxChange 이벤트
description: "라이트박스의 구조가 변경될 때 발생합니다"
---

# onLightboxChange

### Description

@short: 라이트박스의 구조가 변경될 때 발생합니다

@signature: onLightboxChange: (old_type: string, new_type: string) =\> void;

### Parameters

- `old_type` - (필수) *문자열* - 초기 lightbox 구조의 이름
- `new_type` - (필수) *문자열* - 새로운 lightbox 구조의 이름

### Example

~~~jsx
gantt.attachEvent("onLightboxChange", function(old_type, new_type){
    if(new_type == "milestone"){
        alert("작업의 유형을 'milestone'으로 변경했습니다")
    }
});
~~~
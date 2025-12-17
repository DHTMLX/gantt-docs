---
sidebar_label: onLightboxCancel
title: onLightboxCancel event
description: "사용자가 라이트박스에서 '취소' 버튼을 눌렀을 때 트리거됩니다."
---

# onLightboxCancel

### Description

@short: 사용자가 라이트박스에서 '취소' 버튼을 눌렀을 때 트리거됩니다.

@signature: onLightboxCancel: (id: string | number) =\> void;

### Parameters

- `id` - (required) *string | number* - 작업 ID (현재 라이트박스에 열려 있는 작업)

### Example

~~~jsx
gantt.attachEvent("onLightboxCancel", function(id){
    //여기에 사용자 정의 로직 작성
})
~~~

### Related Guides
- [onLightboxSave](api/event/onlightboxsave.md)
- [onLightboxDelete](api/event/onlightboxdelete.md)


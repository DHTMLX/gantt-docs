---
sidebar_label: onLightboxCancel
title: onLightboxCancel event
description: "lightbox에서 사용자가 '취소' 버튼을 클릭할 때 발생합니다"
---

# onLightboxCancel

### Description

@short: 라이트박스에서 사용자가 '취소' 버튼을 클릭할 때 발생합니다

@signature: onLightboxCancel: (id: string | number) =\> void;

### Parameters

- `id` - (필수) *string | number* - 라이트박스에서 열려 있는 작업의 ID

### Example

~~~jsx
gantt.attachEvent("onLightboxCancel", function(id){
    // 여기에 코드 작성
})
~~~

### Related Guides
- [onLightboxSave](api/event/onlightboxsave.md)
- [onLightboxDelete](api/event/onlightboxdelete.md)
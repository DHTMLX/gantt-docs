---
sidebar_label: onAfterLinkUpdate
title: onAfterLinkUpdate 이벤트
description: "사용자가 링크를 업데이트한 후에 발생합니다"
---

# onAfterLinkUpdate

### Description

@short: 사용자가 링크를 업데이트한 후에 발생합니다

@signature: onAfterLinkUpdate: (id: string | number, link: Link) => void;

### Parameters

- `id` - (필수) *string | number* - 링크 ID
- `link` - (필수) *Link* - 링크 객체

### Example

~~~jsx
gantt.attachEvent("onAfterLinkUpdate", function(id,link){
    // 여기에 코드 작성
});
~~~

### Related API
- [updateLink](api/method/updatelink.md)
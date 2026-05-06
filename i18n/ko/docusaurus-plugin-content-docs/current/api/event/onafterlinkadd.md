---
sidebar_label: onAfterLinkAdd
title: onAfterLinkAdd 이벤트
description: "새 링크가 Gantt 차트에 추가된 직후 발생합니다"
---

# onAfterLinkAdd

### Description

@short: 새 링크가 Gantt 차트에 추가된 직후 발생합니다

@signature: onAfterLinkAdd: (id: string | number, link: Link) => void;

### Parameters

- `id` - (필수) *string | number* - 링크 ID
- `link` - (필수) *Link* - 링크 객체

### Example

~~~jsx
gantt.attachEvent("onAfterLinkAdd", function(id,link){
    // 여기에 코드 작성
});
~~~

### Related API
- [addLink](api/method/addlink.md)
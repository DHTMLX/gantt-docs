---
sidebar_label: onLinkClick
title: onLinkClick 이벤트
description: "사용자가 링크를 클릭할 때 발생합니다."
---

# onLinkClick

### Description

@short: 사용자가 링크를 클릭할 때 발생합니다.

@signature: onLinkClick: (id: string | number, e?: Event) =\> void;

### Parameters

- `id` - (required) *string | number* - 클릭된 링크의 id

### Example

~~~jsx
gantt.attachEvent("onLinkClick", function(id,e){
    // 여기에 코드 작성
});
~~~

### Related API
- [onLinkDblClick](api/event/onlinkdblclick.md)
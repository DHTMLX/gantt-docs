---
sidebar_label: onLinkIdChange
title: onLinkIdChange 이벤트
description: "링크의 id가 변경될 때 발생합니다"
---

# onLinkIdChange

### Description

@short: 링크의 id가 변경될 때 발생합니다

@signature: onLinkIdChange: (id: string | number, new_id: string | number) =\> void;

### Parameters

- `id` - (필수) *string | number* - 현재 링크 id
- `new_id` - (필수) *string | number* - 새로운 링크 id

### Example

~~~jsx
gantt.attachEvent("onLinkIdChange", function(id,new_id){
    // 여기에 코드 작성
});
~~~

### Related API
- [changeLinkId](api/method/changelinkid.md)
---
sidebar_label: onLinkDblClick
title: onLinkDblClick 이벤트
description: "사용자가 링크를 더블 클릭할 때 발생합니다"
---

# onLinkDblClick

### Description

@short: 사용자가 링크를 더블 클릭할 때 발생

@signature: onLinkDblClick: (id: string | number, e?: Event) =\> boolean;

### Parameters

- `id` - (required) *string | number* - 클릭된 링크의 ID

### Returns
- ` result` - (boolean) - 기본 이벤트 동작이 트리거될지 여부를 정의합니다 (true일 경우 <b>true</b>, 그렇지 않으면 <b>false</b>로 취소)

### Example

~~~jsx
gantt.attachEvent("onLinkDblClick", function(id,e){
    // 여기에 코드 작성
    return true;
});
~~~

### Details

이벤트는 차단 가능합니다. false를 반환하면 기본 핸들러가 취소되어(링크 삭제) 동작이 중단됩니다

### Related API
- [onLinkClick](api/event/onlinkclick.md)
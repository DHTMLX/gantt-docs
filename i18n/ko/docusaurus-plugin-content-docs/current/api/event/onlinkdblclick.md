---
sidebar_label: onLinkDblClick
title: onLinkDblClick event
description: "링크가 더블클릭될 때 발생합니다"
---

# onLinkDblClick

### Description

@short: 링크가 더블클릭될 때 발생합니다

@signature: onLinkDblClick: (id: string | number, e?: Event) =\> boolean;

### Parameters

- `id` - (required) *string | number* - 클릭된 링크의 식별자
- `e` - (optional) *Event* - 선택 사항, 네이티브 이벤트 객체

### Returns
- ` result` - (boolean) - 기본 이벤트 동작을 진행할지(<b>true</b>) 아니면 차단할지(<b>false</b>) 결정합니다

### Example

~~~jsx
gantt.attachEvent("onLinkDblClick", function(id,e){
    //여기에 커스텀 로직을 추가할 수 있습니다
    return true;
});
~~~

### Details

이 이벤트는 차단할 수 있습니다. false를 반환하면 기본 동작인 링크 삭제가 중단됩니다.

### Related API
- [onLinkClick](api/event/onlinkclick.md)


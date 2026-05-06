---
sidebar_label: onBeforeLinkDisplay
title: onBeforeLinkDisplay event
description: "링크가 간트 차트에 로드된 후 표시되기 전에 발생합니다"
---

# onBeforeLinkDisplay

### Description

@short: 링크가 간트 차트에 로드된 후 표시되기 전에 발생합니다

@signature: onBeforeLinkDisplay: (id: string | number, link: Link) =\> boolean;

### Parameters

- `id` - (필수) *string | number* - 링크 ID
- `link` - (필수) *Link* - 링크 객체

### Returns
- ` result` - (boolean) - 기본 이벤트의 기본 동작이 트리거될지 여부를 정의합니다 (<b>true</b>) 또는 취소될 때 (<b>false</b>)

### Example

~~~jsx
gantt.attachEvent("onBeforeLinkDisplay", function(id, link){
    if (link.type == gantt.config.links.finish_to_start){
        return true;
    }
    return false;
});
~~~

### Details

이벤트는 차단 가능합니다. false를 반환하면 링크가 표시되지 않습니다

### Related API
- [onBeforeTaskDisplay](api/event/onbeforetaskdisplay.md)
---
sidebar_label: onBeforeLinkDisplay
title: onBeforeLinkDisplay event
description: "링크가 간트 차트에 로드된 후, 화면에 표시되기 직전에 트리거됩니다."
---

# onBeforeLinkDisplay

### Description

@short: 링크가 간트 차트에 로드된 후, 화면에 표시되기 직전에 트리거됩니다.

@signature: onBeforeLinkDisplay: (id: string | number, link: Link) =\> boolean;

### Parameters

- `id` - (required) *string | number* - 링크의 고유 식별자
- `link` - (required) *Link* - 링크 객체 자체

### Returns
- ` result` - (boolean) - 이벤트의 기본 동작이 진행될지(<b>true</b>) 취소될지(<b>false</b>) 결정합니다.

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

이 이벤트는 차단할 수 있습니다. false를 반환하면 링크가 표시되지 않습니다.

### Related API
- [onBeforeTaskDisplay](api/event/onbeforetaskdisplay.md)


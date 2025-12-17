---
sidebar_label: onBeforeLinkAdd
title: onBeforeLinkAdd event
description: "Gantt 차트에 새 링크가 추가되기 직전에 트리거됩니다."
---

# onBeforeLinkAdd

### Description

@short: Gantt 차트에 새 링크가 추가되기 직전에 트리거됩니다.

@signature: onBeforeLinkAdd: (id: string | number, link: Link) =\> boolean;

### Parameters

- `id` - (required) *string | number* - 링크 ID
- `link` - (required) *Link* - 링크 객체

### Returns
- ` result` - (boolean) - 이벤트의 기본 동작이 진행될지(<b>true</b>) 중단될지(<b>false</b>) 결정합니다.

### Example

~~~jsx
gantt.attachEvent("onBeforeLinkAdd", function(id,link){
    //여기에 커스텀 로직을 추가할 수 있습니다
    return true;
});
~~~

### Details

이 이벤트는 차단할 수 있습니다. *false*를 반환하면 링크가 추가되는 것을 막습니다.

~~~js
// "finish_to_start" 링크를 생성할 때 소스 작업이 타겟 작업과 겹치지 않도록 방지합니다.
gantt.attachEvent("onBeforeLinkAdd", function(id, link){
    if (link.type == 0){
        var sourceTask = gantt.getTask(link.source);
        var targetTask = gantt.getTask(link.target);
        if (sourceTask.end_date >= targetTask.start_date){
            alert("This link is illegal")
            return false;
        }
    }
});
~~~

### Related API
- [addLink](api/method/addlink.md)


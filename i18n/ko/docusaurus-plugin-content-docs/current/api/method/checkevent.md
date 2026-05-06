---
sidebar_label: checkEvent
title: checkEvent 메서드
description: "이벤트에 하나 이상의 핸들러가 지정되어 있는지 확인합니다"
---

# checkEvent

### Description

@short: 이벤트에 하나 이상의 핸들러가 지정되어 있는지 확인합니다

@signature: checkEvent: (name: string) =\> boolean

### Parameters

- `name` - (required) *string* - 이벤트의 이름

### Returns
- `isExist` - (boolean) - 이벤트에 대해 하나 이상의 핸들러가 지정되어 있으면 <i>true</i>를 반환합니다

### Example

~~~jsx
gantt.attachEvent("onTaskClick", function(id, e) {
    alert("You've just clicked an item with id="+id);
});
       
gantt.checkEvent("onTaskClick"); // 'true'를 반환합니다
~~~

### Related API
- [attachEvent](api/method/attachevent.md)

### Related Guides
- [이벤트 처리](guides/handling-events.md)


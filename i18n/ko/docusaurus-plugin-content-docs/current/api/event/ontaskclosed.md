---
sidebar_label: onTaskClosed
title: onTaskClosed event
description: "브랜치가 종료될 때 트리거됩니다"
---

# onTaskClosed

### Description

@short: 브랜치가 종료될 때 트리거됩니다

@signature: onTaskClosed: (id: string | number) =\> void;

### Parameters

- `id` - (required) *string | number* - 브랜치의 ID

### Example

~~~jsx
gantt.attachEvent("onTaskClosed", function(id) {
    alert(`id=${id}인 브랜치를 종료했습니다.`);
});
~~~

### Related API
- [close](api/method/close.md)
- [onTaskOpened](api/event/ontaskopened.md)


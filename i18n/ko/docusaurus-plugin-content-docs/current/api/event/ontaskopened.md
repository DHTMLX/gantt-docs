---
sidebar_label: onTaskOpened
title: onTaskOpened event
description: "브랜치가 열릴 때 트리거됩니다"
---

# onTaskOpened

### Description

@short: 브랜치가 열릴 때 트리거됩니다

@signature: onTaskOpened: (id: string | number) =\> void;

### Parameters

- `id` - (required) *string | number* - 브랜치의 식별자

### Example

~~~jsx
gantt.attachEvent("onTaskOpened", function(id) {
    //여기에 커스텀 로직을 작성할 수 있습니다
});
~~~

### Related API
- [open](api/method/open.md)
- [onTaskClosed](api/event/ontaskclosed.md)


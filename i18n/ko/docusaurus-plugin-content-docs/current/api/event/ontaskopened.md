---
sidebar_label: onTaskOpened
title: onTaskOpened event
description: "브랜치가 열렸을 때 트리거됩니다"
---

# onTaskOpened

### Description

@short: 브랜치가 열렸을 때 트리거됩니다

@signature: onTaskOpened: (id: string | number) =\> void;

### Parameters

- `id` - (필수) *string | number* - 브랜치 ID

### Example

~~~jsx
gantt.attachEvent("onTaskOpened", function(id) {
    // 여기에 코드 작성
});
~~~  

### Related API
- [open](api/method/open.md)
- [onTaskClosed](api/event/ontaskclosed.md)
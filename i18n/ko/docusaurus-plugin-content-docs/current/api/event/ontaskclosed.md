---
sidebar_label: onTaskClosed
title: onTaskClosed event
description: "브랜치가 닫힐 때 실행됩니다"
---

# onTaskClosed

### Description

@short: 브랜치가 닫힐 때 실행됩니다

@signature: onTaskClosed: (id: string | number) => void;

### Parameters

- `id` - (필수) *string | number* - 브랜치 ID

### Example

~~~jsx
gantt.attachEvent("onTaskClosed", function(id) {
    alert(`You've closed a branch with id=${id}`);
});
~~~

### Related API
- [close](api/method/close.md)
- [onTaskOpened](api/event/ontaskopened.md)
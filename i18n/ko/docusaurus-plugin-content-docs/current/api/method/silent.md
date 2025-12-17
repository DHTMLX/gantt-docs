---
sidebar_label: silent
title: silent method
description: "코드 내부에서 발생하는 어떠한 내부 이벤트나 서버 측 호출이 트리거되지 않도록 방지합니다."
---

# silent

### Description

@short: 코드 내부에서 발생하는 어떠한 내부 이벤트나 서버 측 호출이 트리거되지 않도록 방지합니다.

@signature: silent: (callback: GanttCallback) =\> void

### Parameters

- `callback` - (required) *function* - 콜백 함수

### Example

~~~jsx
gantt.silent(function () {
    // 작업은 클라이언트 측에서만 삭제됩니다.
    // 간트는 자동으로 다시 그려지지 않습니다.
    gantt.deleteTask(id);
});

// 준비가 되면 수동으로 간트를 다시 그립니다.
gantt.render();
~~~

### Related Guides
- [Server-Side Integration](guides/server-side.md#errorhandling)

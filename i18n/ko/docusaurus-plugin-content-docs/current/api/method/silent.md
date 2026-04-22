---
sidebar_label: silent
title: silent method
description: "그 안의 모든 코드가 내부 이벤트나 서버 측 호출을 트리거하지 않도록 합니다"
---

# silent

### Description

@short: 그 안의 모든 코드가 내부 이벤트나 서버 측 호출을 트리거하지 않도록 합니다

@signature: silent: (callback: GanttCallback) => void

### Parameters

- `callback` - (필수) *function* - 콜백 함수

### Example

~~~jsx
gantt.silent(function () {
    // 이 작업은 클라이언트 측에서만 삭제됩니다
    // Gantt 차트가 자동으로 다시 그려지지 않습니다
    gantt.deleteTask(id);
});

// 준비가 되면 Gantt를 수동으로 다시 렌더링합니다
gantt.render();
~~~

### Related Guides
- [서버 사이드 통합](guides/server-side.md#error-handling)
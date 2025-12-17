---
sidebar_label: silent
title: silent method
description: "предотвращает любые внутренние события или вызовы на стороне сервера, которые могут быть вызваны кодом внутри него"
---

# silent

### Description

@short: Предотвращает любые внутренние события или вызовы на стороне сервера, которые могут быть вызваны кодом внутри него

@signature: silent: (callback: GanttCallback) =\> void

### Parameters

- `callback` - (required) *function* - функция обратного вызова

### Example

~~~jsx
gantt.silent(function () {
    // задача будет удалена только на клиентской стороне
    // gantt не будет автоматически перерисован
    gantt.deleteTask(id);
});

// вручную перерисовать gantt, когда будет готово
gantt.render();
~~~

### Related Guides
- [Интеграция с серверной стороной](guides/server-side.md#errorhandling)

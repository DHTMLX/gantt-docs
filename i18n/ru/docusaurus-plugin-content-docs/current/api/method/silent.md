---
sidebar_label: silent
title: silent метод
description: "делает весь код внутри него таким образом, чтобы он не инициировал внутренние события и вызовы на стороне сервера"
---

# silent

### Description

@short: Делает весь код внутри него так, чтобы он не инициировал внутренние события или вызовы на стороне сервера

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

// repaint the gantt manually when ready
gantt.render();
~~~

### Related Guides
- [Интеграция на стороне сервера](guides/server-side.md#error-handling)
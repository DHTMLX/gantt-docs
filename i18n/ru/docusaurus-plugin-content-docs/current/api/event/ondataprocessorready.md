---
sidebar_label: onDataProcessorReady
title: onDataProcessorReady event
description: "срабатывает при вызове `dp.init(gantt)`"
---

# onDataProcessorReady

### Description

@short: Срабатывает при вызове `dp.init(gantt)`

@signature: onDataProcessorReady: (DataProcessor: any) =\> void;

### Parameters

- `DataProcessor` - (required) *object* - экземпляр DataProcessor

### Example

~~~jsx
gantt.attachEvent("onDataProcessorReady",function(DataProcessor){
    // разместите здесь вашу пользовательскую логику
});
~~~

### Details

Это событие позволяет вам прикреплять обработчики к DataProcessor непосредственно из кода вашего приложения.

### Related Guides
- [Интеграция с серверной стороной](guides/server-side.md)

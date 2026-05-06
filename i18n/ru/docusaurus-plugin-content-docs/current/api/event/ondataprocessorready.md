---
sidebar_label: onDataProcessorReady
title: onDataProcessorReady event
description: "fires on the `dp.init(gantt)` call"
---

# onDataProcessorReady

### Description

@short: Срабатывает при вызове `dp.init(gantt)`

@signature: onDataProcessorReady: (DataProcessor: any) => void;

### Parameters

- `DataProcessor` - (обязательный) *объект* - объект DataProcessor

### Example

~~~jsx
gantt.attachEvent("onDataProcessorReady",function(DataProcessor){
    // любая ваша логика здесь
});
~~~

### Details

Вы можете использовать это событие для добавления обработчиков DataProcessor из кода приложения.

### Related Guides
- [Серверная интеграция](guides/server-side.md)
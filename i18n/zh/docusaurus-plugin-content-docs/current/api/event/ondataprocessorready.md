---
sidebar_label: onDataProcessorReady
title: onDataProcessorReady event
description: "当调用 `dp.init(gantt)` 时触发"
---

# onDataProcessorReady

### Description

@short: 在 `dp.init(gantt)` 调用时触发

@signature: onDataProcessorReady: (DataProcessor: any) => void;

### Parameters

- `DataProcessor` - (required) *object* - DataProcessor 对象

### Example

~~~jsx
gantt.attachEvent("onDataProcessorReady",function(DataProcessor){
    // 在这里插入您的自定义逻辑 
});
~~~

### Details

您可以使用此事件从应用代码为 DataProcessor 添加处理程序。

### Related Guides
- [服务端集成](guides/server-side.md)
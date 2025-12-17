---
sidebar_label: onDataProcessorReady
title: onDataProcessorReady event
description: "当调用 `dp.init(gantt)` 时触发"
---

# onDataProcessorReady

### Description

@short: 当调用 `dp.init(gantt)` 时触发

@signature: onDataProcessorReady: (DataProcessor: any) =\> void;

### Parameters

- `DataProcessor` - (required) *object* - DataProcessor 实例

### Example

~~~jsx
gantt.attachEvent("onDataProcessorReady",function(DataProcessor){
    // 在这里编写您的自定义逻辑
});
~~~

### Details

此事件允许您直接从应用程序代码中附加处理程序到 DataProcessor。

### Related Guides
- [服务器端集成](guides/server-side.md)

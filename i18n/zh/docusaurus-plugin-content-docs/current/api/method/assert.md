---
sidebar_label: assert
title: assert method
description: "如果给定的表达式为假，则在屏幕右上角以红色弹出框显示错误信息"
---

# assert

### Description

@short: 如果给定的表达式为假，则在屏幕右上角以红色弹出框显示错误信息

@signature: assert: (expression: any, errorMessage: string) =\> void

### Parameters

- `expression` - (required) *any* - 用于确认表达式的真值，断言失败时为假值
- `errorMessage` - (required) *string* - 将在红色弹出框中显示的消息

### Example

~~~jsx
gantt.attachEvent("onLoadEnd", function(){
   gantt.assert(gantt.getTaskCount(), "no data loaded");
});
~~~

### Details

dhtmlxGantt 代码库使用 gantt.assert 来识别组件处于无效状态的情况。

错误显示方式可以通过 [show_errors](api/config/show_errors.md) 配置进行调整。

错误也可以通过 [onError](api/event/onerror.md) 事件以编程方式进行处理。


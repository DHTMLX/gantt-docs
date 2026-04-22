---
sidebar_label: assert
title: assert method
description: "如果指定的表达式为假，将在屏幕右上角的红色弹出框中显示 errorMessage"
---

# assert

### Description

@short: 如果指定的表达式为假，则在屏幕右上角的红色弹出框中显示 errorMessage

@signature: assert: (expression: any, errorMessage: string) => void

### Parameters

- `expression` - (required) *any* - 用于断言表达式的 truthy 值，若为 falsy 值则断言失败
- `errorMessage` - (required) *string* - 将在红色弹出框中显示的错误信息

### Example

~~~jsx
gantt.attachEvent("onLoadEnd", function(){
   gantt.assert(gantt.getTaskCount(), "no data loaded");
});
~~~

### Details

dhtmlxGantt 代码库使用 gantt.assert 来检测组件的无效状态

错误显示方式可以通过 [show_errors](api/config/show_errors.md) 配置进行调整。

错误也可以通过 [onError](api/event/onerror.md) 事件以编程方式进行处理。


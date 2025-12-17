---
sidebar_label: onTemplatesReady
title: onTemplatesReady event
description: "当 dhtmlxGantt 模板初始化完成时触发"
---

# onTemplatesReady

### Description

@short: 当 dhtmlxGantt 模板初始化完成时触发

@signature: onTemplatesReady: () =\> void;

### Example

~~~jsx
gantt.attachEvent("onTemplatesReady", function(){
    // 在这里放置任何自定义逻辑
});
~~~

### Details

该事件表示 dhtmlxGantt 的模板已经完全初始化。它为设置自定义视图提供了一个方便的时机。

将自定义视图创建代码放在 onTemplatesReady 事件处理函数中，可以确保视图的模板在 grid 初始化之前准备好，从而有助于自定义视图在页面上的正确显示。

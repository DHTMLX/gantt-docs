---
sidebar_label: onTemplatesReady
title: onTemplatesReady event
description: "在 dhtmlxGantt 模板初始化时触发"
---

# onTemplatesReady

### Description

@short: 当 dhtmlxGantt 模板完成初始化时触发

@signature: onTemplatesReady: () =\> void;

### Example

~~~jsx
gantt.attachEvent("onTemplatesReady", function(){
    // 在这里插入您的自定义逻辑 
});
~~~

### Details

该事件表示 dhtmlxGantt 的模板已就绪。该事件是创建自定义视图的一个良好时机。

在 onTemplatesReady 事件的处理程序中编写自定义视图创建的代码是一种良好实践。它将确保自定义视图的模板在网格初始化之前就绪，并且自定义视图将在页面上正确呈现。
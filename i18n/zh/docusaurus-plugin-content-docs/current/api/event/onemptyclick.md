---
sidebar_label: onEmptyClick
title: onEmptyClick 事件
description: "当用户点击甘特图的空白区域时触发（非任务区域）"
---

# onEmptyClick

### Description

@short: 当用户点击甘特图中空白区域时触发（非任务区域）

@signature: onEmptyClick: (e: Event) => void;

### Parameters

- `e` - (必填) *Event* - 原生事件对象

### Example

~~~jsx
gantt.attachEvent("onEmptyClick", function (e){
    // 在这里插入您的自定义逻辑 
});
~~~

### Details

The **onEmptyClick** 事件也会在用户点击链接时触发。你可以阻止该事件的这一行为。要做到这一点，需要检查 `e.target` 元素或其最近的一个元素是否包含 **link_attribute** 属性，如下所示：

~~~js
gantt.attachEvent("onEmptyClick", function (e) {
  var domHelpers = gantt.utils.dom;
  if(!domHelpers.closest(e.target, "[" + gantt.config.link_attribute + "]")){
    gantt.message("not a link");
  }else{
    gantt.message("link!"); 
  }
});
~~~
---
sidebar_label: onEmptyClick
title: onEmptyClick event
description: "当用户点击甘特图中空白区域（任务之外）时触发"
---

# onEmptyClick

### Description

@short: 当用户点击甘特图中空白区域（任务之外）时触发

@signature: onEmptyClick: (e: Event) =\> void;

### Parameters

- `e` - (required) *Event* - 原生事件对象

### Example

~~~jsx
gantt.attachEvent("onEmptyClick", function (e){
    // 可以在这里添加自定义逻辑
});
~~~

### Details

**onEmptyClick** 事件也会在用户点击链接时触发。如果你想禁用这种行为，可以检查 `e.target` 元素或其最近的祖先元素是否包含 **link_attribute** 属性，示例如下:

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

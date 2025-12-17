---
sidebar_label: utils
title: utils config
description: "各种辅助模块"
---

# utils

### Description

@short: 各种辅助模块

@signature: utils: \{ dom: DomHelpers \}

### Example

~~~jsx
var tooltips = gantt.ext.tooltips;  
tooltips.tooltipFor({  
 selector: ".gantt_scale_cell",  
 html: function (event, node) {  
  const domHelper = gantt.utils.dom;  
  const pos = domHelper.getRelativeEventPosition(event, gantt.$task_scale);  
  return gantt.templates.task_date(gantt.dateFromPos(pos.x));  
 }  
});
~~~

### Details

目前，该模块主要通过 **gantt.utils.dom** 提供 DOM 操作的辅助方法。

~~~js
var domHelpers = gantt.utils.dom;
~~~

它提供了以下方法:

- **getNodePosition (node): object** - 获取元素在屏幕上的位置，返回一个形如 `{x:number, y:number, width:number, height:number}` 的对象  
  - **_node_** - (*HTMLElement*) - 要获取位置的 DOM 元素

- **getRelativeEventPosition (e, node): object** - 获取相对于指定 DOM 元素的鼠标坐标，返回 `{x:number, y:number}`  
  - **_e_** - (*Event*) - 触发的事件  
  - **_node_** - (*HTMLElement*) - 参考的 DOM 元素

~~~js
gantt.message({
 expire: -1,
 text: ""
});

const formatDate = gantt.date.date_to_str("%Y-%m-%d %H:%i");
gantt.attachEvent("onMouseMove", function (id, e){
 const helper = gantt.utils.dom;
 if(helper.isChildOf(e.target, gantt.$task_data)){
  const textContainer = document.querySelector("#pointer-date");
  const pos = helper.getRelativeEventPosition(e, gantt.$task_data);
  const pointerDate = gantt.dateFromPos(pos.x);
  textContainer.innerText = formatDate(pointerDate);
 }
});
~~~

- **isChildOf (child, parent): boolean** - 判断第一个节点是否为第二个节点的 DOM 子节点，返回 `true` 表示是  
  - **_child_** - (*HTMLElement*) - 要验证的子节点  
  - **_parent_** - (*HTMLElement*) - 要验证的父节点

- **hasClass (node, className): boolean** - 判断指定的 `node` 是否包含某个 CSS 类，包含则返回 `true`  
  - **_node_** - (*HTMLElement*) - 要检查的 DOM 元素  
  - **_className_** - (*string*) - 要查找的 CSS 类名

- **closest (node, cssSelector): HTMLElement** - 查找最近的符合指定 CSS 选择器的祖先节点（包括自身）  
  - **_node_** - (*HTMLElement*) - 起始 DOM 元素  
  - **_cssSelector_** - (*string*) - CSS 选择器

~~~js
gantt.attachEvent("onEmptyClick", function (e) {
 const domHelpers = gantt.utils.dom;
 if(!domHelpers.closest(e.target, `[${gantt.config.link_attribute}]`)){
  gantt.message("not a link");
 }else{
  gantt.message("link!"); 
 }
});
~~~

### Related samples
 - [Custom Tooltips](https://docs.dhtmlx.com/gantt/samples/02_extensions/22_tooltip_api.html)

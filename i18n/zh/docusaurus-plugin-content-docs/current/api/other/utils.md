---
sidebar_label: utils
title: utils 配置
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

当前的模块仅包含用于 DOM 操作的辅助工具，位于 **gantt.utils.dom**

~~~js
var domHelpers = gantt.utils.dom;
~~~

这些方法具有以下功能：

- **getNodePosition (node): object** - 以 `{x:number, y:number, width:number, height:number}` 对象的格式返回屏幕上元素的位置
  - **_node_** - (*HTMLElement*) - 将要检查的 DOM 元素

- **getRelativeEventPosition (e, node): object** - 以 `{x:number, y:number}` 对象的格式返回相对于该 DOM 元素的鼠标坐标
  - **_e_** - (*Event*) - 发生的事件
  - **_node_** - (*HTMLElement*) - 将要检查的 DOM 元素


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

- **isChildOf (child, parent): boolean** - 当第一参数所提供的节点是第二参数所提供节点的 DOM 子节点时，返回 `true`
  - **_child_** - (*HTMLElement*) - 将要检查的子节点
  - **_parent_** - (*HTMLElement*) - 将要检查的父节点

- **hasClass (node, className): boolean** - 如果提供的 `node` 的 CSS 类列表包含指定的类名，则返回 `true`
  - **_node_** - (*HTMLElement*) - 将要检查的 DOM 元素
  - **_className_** - (*string*) - 将要检查的类名

- **closest (node, cssSelector): HTMLElement**> - 返回 第一个匹配所提供 cssSelector 的节点，从 `node` 属性开始，直到其 DOM 父节点分支。
  - **_node_** - (*HTMLElement*) - 将要检查的 DOM 元素
  - **_cssSelector_** - (*string*) - 目标节点的选择器

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
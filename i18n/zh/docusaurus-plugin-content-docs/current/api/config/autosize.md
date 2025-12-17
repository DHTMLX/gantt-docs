---
sidebar_label: autosize
title: autosize config
description: "自动调整甘特图大小以显示所有任务，无需滚动"
---

# autosize

### Description

@short: 自动调整甘特图大小以显示所有任务，无需滚动

@signature: autosize: boolean | string

### Example

~~~jsx
gantt.config.autosize = "xy";

gantt.init("gantt_here");
~~~

**Default value:** false

### Details

'autosize' 设置控制甘特图是通过内部滚动条在容器尺寸内适配数据，还是调整容器大小以显示所有数据而不使用内部滚动:

- [通过 CSS 设置甘特图 div 大小的示例](https://snippet.dhtmlx.com/5/b4d4d1b80) - 需要时显示内部滚动条
- [由组件计算甘特图 div 大小的示例](https://snippet.dhtmlx.com/5/c278b3859) - 关闭内部滚动条

当甘特图需要适应页面上的特定区域时，容器大小应手动管理:

- 应关闭 autosize
- div 的宽度和高度应由 HTML 布局确定（如果使用响应式布局方案），或由自定义代码决定。

## 滚动到隐藏元素

默认情况下，使用 [showTask](api/method/showtask.md) 或 [showDate](api/method/showdate.md) 方法时，甘特图会自动滚动。
然而，当 **autosize** 被启用时，甘特图会扩大其容器尺寸以使元素在页面上可见，而不是滚动到该元素。

对此没有通用的解决方案，因为页面可能包含其他也需要滚动的元素。解决方案取决于具体的页面或应用设置。

在*简单*的设置中，甘特图可能位于其他元素之前或之后，滚动页面即可正常工作。

在*复杂*的设置中，甘特图容器可能嵌套在其他容器中，这些容器又可能继续嵌套。
在这种情况下，需要手动滚动相关的元素。

一种滚动页面到指定元素的方法是使用 **element.scrollIntoView** 方法:

~~~js
var attr = gantt.config.task_attribute;
var timelineElement = document.querySelector(".gantt_task_line["+attr+"='"+id+"']");
if(timelineElement)
    timelineElement.scrollIntoView({block:"center"});
~~~

这里，`id` 指任务 ID。

另一种选择是重写甘特图的 [showTask](api/method/showtask.md) 或 [showDate](api/method/showdate.md) 方法:

~~~js
var showTask = gantt.showTask;

gantt.showTask = function(id){
  showTask.apply(this, [id]);
  var attr = gantt.config.task_attribute;
  var timelineElement = document.querySelector(".gantt_task_line["+attr+"='"+id+"']");
  if(timelineElement)
    timelineElement.scrollIntoView({block:"center"});
};
~~~

或者，你也可以创建自定义函数来显示任务:

~~~js
function showTask(id){
  gantt.showTask(id);
  var attr = gantt.config.task_attribute;
  var timelineElement = document.querySelector(".gantt_task_line["+attr+"='"+id+"']");
    if(timelineElement)
      timelineElement.scrollIntoView({block:"center"});
}
~~~

:::note
Sample: [滚动到指定元素 ](https://snippet.dhtmlx.com/or73u6a5) 
:::

### Related API
- [autosize_min_width](api/config/autosize_min_width.md)


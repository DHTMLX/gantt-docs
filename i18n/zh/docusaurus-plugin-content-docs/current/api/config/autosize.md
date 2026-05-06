---
sidebar_label: autosize
title: autosize 配置
description: "强制甘特图自动调整大小以在不滚动的情况下显示所有任务"
---

# autosize

### Description

@short: 强制甘特图自动调整大小以显示所有任务且无需滚动

@signature: autosize: boolean | string

### Example

~~~jsx
gantt.config.autosize = "xy";

gantt.init("gantt_here");
~~~

**默认值:** false

### Details

The  `autosize` 配置定义 Gantt 是否会将数据适配到初始化时所在容器的大小并显示内部滚动条，或通过修改容器的大小以在没有内部滚动条的情况下显示所有数据：

- [在 CSS 中定义 Gantt div 大小的示例](https://snippet.dhtmlx.com/2m48u5oz) - 如有需要，内部滚动条将处于活动状态
- [一个由组件计算 Gantt div 尺寸的示例](https://snippet.dhtmlx.com/syzmiqwt) - 内部滚动条被禁用

如果 Gantt 需要适应页面上的某个区域，则必须手动管理 Gantt 容器的大小：

- 应该禁用自动调整大小
- div 的宽度/高度应通过 HTML 布局计算（如果使用了某些现成的响应式布局解决方案），或通过代码手动计算

## Scrolling to hidden elements

在默认模式下，当你使用 [`showTask()`](api/method/showtask.md) 或 [`showDate()`](api/method/showdate.md) 方法时，Gantt 会自动滚动。
但当 `autosize` 启用时，Gantt 会增大其容器的大小以在页面上显示自身，而不是显示隐藏的元素。

没有一种通用的方法来解决这个问题，因为页面除了 Gantt 之外还可能包含其他元素，而且有些元素也需要滚动。因此，应该根据页面/应用程序的配置来解决这个问题。

在一个 *简单* 的配置中，Gantt 可以位于应用程序的某些元素之前或之后。如果你滚动页面，它就可以正常工作。

在一个 *复杂* 的配置中，Gantt 容器可以放置在其他容器中，这些容器也可以嵌套在某些其他容器中。在这种情况下，你只需要手动滚动你需要的元素。

让页面滚动到所需元素的一种方法是使用 `element.scrollIntoView()` 方法：

~~~js
const taskAttribute = gantt.config.task_attribute;
const timelineElement = document.querySelector(`.gantt_task_line[${taskAttribute}='${id}']`);

timelineElement?.scrollIntoView({ block: "center" });
~~~

其中 id 是你需要显示的任务 ID。

另一种方法是修改 Gantt 的 [`showTask()`](api/method/showtask.md) 或 [`showDate()`](api/method/showdate.md) 方法：

~~~js
const defaultShowTask = gantt.showTask;

gantt.showTask = function(id) {
    defaultShowTask.apply(this, [id]);
    const taskAttribute = gantt.config.task_attribute;
    const timelineElement = document.querySelector(`.gantt_task_line[${taskAttribute}='${id}']`);

    timelineElement?.scrollIntoView({ block: "center" });
};
~~~

或者创建一个显示任务的自定义函数：

~~~js
const showTask = (id) => {
    gantt.showTask(id);
    const taskAttribute = gantt.config.task_attribute;
    const timelineElement = document.querySelector(`.gantt_task_line[${taskAttribute}='${id}']`);

    timelineElement?.scrollIntoView({ block: "center" });
};
~~~

:::note
示例: [滚动到指定元素](https://snippet.dhtmlx.com/or73u6a5)
:::

### Related API
- [autosize_min_width](api/config/autosize_min_width.md)
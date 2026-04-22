---
sidebar_label: click_drag
title: click_drag config
description: "启用高级拖拽"
---

# click_drag

### Description

@short: 启用高级拖拽

@signature: click_drag: undefined | ClickDrag

### Example

~~~jsx
gantt.config.click_drag = {
    callback: function(
        startPosition,
        endPosition,
        startDate,
        endDate,
        tasksBetween,
        rowsBetween
    ){
        var parentId = gantt.config.root_id;
        if(rowsBetween.length){
            parentId = rowsBetween[0].id;
        }

        gantt.createTask({
            text: "New task",
            start_date: gantt.roundDate(startDate),
            end_date: gantt.roundDate(endDate)
        }, parentId);

    },
    singleRow: true
};
~~~

**Default value:** \{ useKey: false, ignore: ".gantt_task_line, .gantt_task_link" \}

### Details

:::note
本配置在 **click_drag** 扩展中定义，因此需要使用 [click_drag](guides/extensions-list.md) 插件通过 [gantt.plugins](api/method/plugins.md) 方法进行激活。请参阅 [Creating/Selecting Tasks with DnD](guides/advanced-dnd.md) 文章中的详细信息。 
:::

**click_drag** 扩展提供以下功能:

- 通过拖拽创建任务
- 使用拖拽为未排程的任务设定时间
- 通过拖拽选择任务
- 通过拖拽创建拆分任务的部分（PRO 版本）

The **gantt.config.click_drag** 对象包含以下属性：

- **className** -  (*string*) 为选定元素设置自定义 CSS 类
- **viewPort** -  (*HTMLElement*) 要附加事件并进行选择的元素
- **useRequestAnimationFrame** -  (*boolean*) 指定在渲染过程中是否使用 requestAnimationFrame
- **callback** -  (*function*) - 当鼠标按钮松开时将调用的函数。接受 6 个参数：
    - **startPoint** - (*object*) - 一种类型的对象： 
    `{absolute: {left: number, top: number}, relative: {left: number, top: number} }`， 
  其中 absolute 是文档左上角的坐标，relative 是用作 viewPort 的左上角元素的坐标 
    - **endPoint** - (*object*) - 一种类型的对象： 
    `{absolute: {left: number, top: number}, relative: {left: number, top: number} }`， 
  其中 absolute 是文档左上角的坐标，relative 是用作 viewPort 的左上角元素的坐标 
     - **startDate** - (*Date*) 与起点对应的日期
    - **endDate** - (*Date*) 与终点对应的日期
    - **tasksBetweenDates** - (*array*) 起始日期和结束日期之间的任务数组
    - **tasksInRows** - (*array*) 垂直方向上位于起点和终点坐标之间所选任务的数组
- **singleRow** - (*boolean*) true 时仅在一行中添加选择，且该行的高度等于一个任务的高度
- **ignore** - (*string*) CSS 选择器。与该选择器匹配的元素不会激活拖拽
- **useKey** - (*string|boolean*) 如果指定了该属性，只有在按下指定修饰键时才会激活拖拽。支持的值： "ctrlKey", "shiftKey", "metaKey", "altKey"

~~~js
gantt.config.click_drag = {
    callback: onDragEnd,
    ignore: ".gantt_task_line, .gantt_marker_content, .gantt_task_link",
    useKey: "ctrlKey"
};
~~~

- **render** - (*function*) 在拖拽过程中渲染一个元素的函数。它接收两个参数：
    - **startPoint** - (*object*) - 类型为：
    `{absolute: {left: number, top: number}, relative: {left: number, top: number} }`，
  其中 absolute 是文档左上角的坐标，relative 是用作 viewPort 的左上角元素的坐标 
    - **endPoint** - (*object*) - 类型为：
    `{absolute: {left: number, top: number}, relative: {left: number, top: number} }`，
  其中 absolute 是文档左上角的坐标，relative 是用作 viewPort 的左上角元素的坐标

**render** 函数示例实现:

~~~js
var node;
gantt.config.click_drag = {
    callback: onDragEnd,
    singleRow: true,
    render: function(start, end){
        if(!(node && node.parentNode)){
            node = document.createElement("div");
        }
        var left = Math.min(start.relative.left, end.relative.left);

        node.style.top = (start.relative.top - gantt.config.row_height) + "px";
        node.style.left = left + "px";
        node.style.width = Math.abs(start.relative.left - end.relative.left) + "px";
        node.style.height = gantt.config.row_height + "px";
        node.style.position = "absolute";
        return node;
    }
};
~~~

### Related Guides
- [通过拖拽创建/选择任务](guides/advanced-dnd.md)
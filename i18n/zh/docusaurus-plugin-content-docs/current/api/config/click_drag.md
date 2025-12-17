---
sidebar_label: click_drag
title: click_drag config
description: "启用高级拖放功能"
---

# click_drag

### Description

@short: 启用高级拖放功能

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
 此配置属于 **click_drag** 扩展的一部分，因此请确保通过 [gantt.plugins](api/method/plugins.md) 方法启用 [click_drag](guides/extensions-list.md#gaojituofang) 插件。更多详情请参见 [创建/选择任务与拖拽（DnD）](guides/advanced-dnd.md) 文章。 
:::

**click_drag** 扩展提供以下功能:

- 通过拖放创建任务
- 通过拖放为未计划任务设定时间
- 通过拖放选择任务
- 通过拖放创建拆分任务的部分（PRO 版本）

**gantt.config.click_drag** 对象具有以下属性:

- **className** -  (*string*) 指定选中元素的自定义 CSS 类
- **viewPort** - (*HTMLElement*) 定义事件绑定和选择发生的元素
- **useRequestAnimationFrame** - (*boolean*) 决定渲染时是否使用 requestAnimationFrame
- **callback** - (*function*) - 在鼠标按钮释放时调用。接收6个参数:
    - **startPoint** - (*object*) - 结构如下:<br>
    `{absolute: {left: number, top: number}, relative: {left: number, top: number} }`，<br>
  其中 absolute 表示相对于文档左上角的坐标，relative 表示相对于 viewPort 元素的坐标
    - **endPoint** - (*object*) 结构同 startPoint
     - **startDate** - (*Date*) 拖动开始位置对应的日期
    - **endDate** - (*Date*) 拖动结束位置对应的日期
    - **tasksBetweenDates** - (*array*) 在开始和结束日期之间找到的任务
    - **tasksInRows** - (*array*) 在开始和结束垂直坐标之间选中的任务
- **singleRow** - (*boolean*) 如果为 true，选择限制在与任务高度匹配的单行
- **ignore** - (*string*) 禁用拖放的元素的 CSS 选择器
- **useKey** - (*string|boolean*) 如果设置，拖放仅在按下指定的修饰键时激活。支持的键包括 "ctrlKey"、"shiftKey"、"metaKey" 和 "altKey"

~~~js
gantt.config.click_drag = {
    callback: onDragEnd,
    ignore: ".gantt_task_line, .gantt_marker_content, .gantt_task_link",
    useKey: "ctrlKey"
};
~~~

- **render** - (*function*) 生成拖动时显示的元素。接收两个参数:
    - **startPoint** - (*object*) 结构为:<br>
    `{absolute: {left: number, top: number}, relative: {left: number, top: number} }`，<br>
  absolute 和 relative 均如上所述
    - **endPoint** - (*object*) 结构同 startPoint

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
- [创建/选择任务与拖拽（DnD）](guides/advanced-dnd.md)


---
sidebar_label: drag_timeline
title: drag_timeline config
description: "设置 drag_timeline 扩展的行为方式"
---

# drag_timeline

### Description

@short: 设置 drag_timeline 扩展的行为方式

@signature: drag_timeline: null | \{ ignore?: string; useKey?: string | boolean; render?: boolean; \}

### Example

~~~jsx
gantt.config.drag_timeline = {
    ignore:".gantt_task_line, .gantt_task_link",
    useKey: false,
    render: false
};
~~~

**Default value:** \{ useKey: false, ignore: ".gantt_task_line, .gantt_task_link" \}

### Related samples
- [Drag timeline](https://docs.dhtmlx.com/gantt/samples/02_extensions/27_drag_timeline.html)

### Details

:::note
 此选项属于 **drag_timeline** 扩展，请确保启用 [drag_timeline](guides/extensions-list.md#tuodongshijianzhou) 插件。 
:::

该配置可以设置为对象或 **null**，其中设置为 **null** 表示关闭该扩展。

~~~js
gantt.config.drag_timeline = null; // 关闭该扩展
~~~

**drag_timeline** 对象支持以下属性:


- **ignore** - (*string*) - 用于指定不会触发时间轴滚动的元素的 CSS 选择器

- **useKey** - (*string | boolean*) - 如果设置，只有在按住指定的修饰键时才激活时间轴滚动。支持的键包括:"ctrlKey", "shiftKey", "metaKey", "altKey"

- **render** - (*boolean*) - 启用时，滚动开始和结束时时间轴会重新渲染

---
sidebar_label: drag_timeline
title: drag_timeline 配置
description: "配置 drag_timeline 扩展的行为"
---

# drag_timeline

### Description

@short: 配置 drag_timeline 扩展的行为

@signature: drag_timeline: null | \{ ignore?: string; useKey?: string | boolean; render?: boolean; \}

### Example

~~~jsx
gantt.config.drag_timeline = {
    ignore:".gantt_task_line, .gantt_task_link",
    useKey: false,
    render: false
};
~~~

**默认值:** \{ useKey: false, ignore: ".gantt_task_line, .gantt_task_link" \}

### Related samples
- [拖拽时间线 Drag timeline](https://docs.dhtmlx.com/gantt/samples/02_extensions/27_drag_timeline.html)

### Details

:::note
该选项在 **drag_timeline** 扩展中定义，因此你需要激活 [drag_timeline](guides/extensions-list.md#drag-timeline) 插件。 
:::

配置值可以是对象，也可以是 **null** 值，**null** 值会禁用该扩展。

~~~js
gantt.config.drag_timeline = null; // 禁用扩展
~~~

ag_timeline** 对象支持对象支持以下属性


- **ignore** - (*string*) - CSS 选择器。对匹配该选择器的元素，滚动时间轴时不会被激活

- **useKey** - (*string | boolean*) - 如果指定了该属性，只有在按下指定的修饰键时才会激活滚动时间轴。支持的值为： "ctrlKey", "shiftKey", "metaKey", "altKey"

- **render** - (*boolean*) - 如果该属性启用，开始滚动和结束滚动时，时间轴将重新渲染
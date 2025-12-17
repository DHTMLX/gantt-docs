---
sidebar_label: show_quick_info
title: show_quick_info config
description: "开启或关闭 'quick_info' 扩展（显示任务详情的弹出窗口）"
---

# show_quick_info

### Description

@short: 开启或关闭 'quick_info' 扩展（显示任务详情的弹出窗口）

@signature: show_quick_info: boolean

### Example

~~~jsx
gantt.config.show_quick_info = false;
gantt.init("gantt_here");
~~~

**Default value:** true

### Details

:::note
 该选项是 **Quick Info** 扩展的一部分，因此请确保先启用 [quick_info](guides/extensions-list.md) 插件。 
:::

### Related Guides
- ['Quick Info' 扩展的模板（触控支持）](guides/touch-templates.md)

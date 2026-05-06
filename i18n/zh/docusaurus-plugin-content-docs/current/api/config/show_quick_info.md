---
sidebar_label: show_quick_info
title: show_quick_info 配置
description: "激活/禁用 'quick_info' 扩展（弹出任务详情表单）"
---

# show_quick_info

### Description

@short: 激活/禁用 'quick_info' 扩展（弹出任务详情表单）

@signature: show_quick_info: boolean

### Example

~~~jsx
gantt.config.show_quick_info = false;
gantt.init("gantt_here");
~~~

**默认值：** true

### Details

:::note
此选项在 **Quick Info** 扩展中定义，因此您需要激活 [quick_info](guides/extensions-list.md#quick-info) 插件。
:::

### Related Guides
- [“Quick Info” 扩展的模板（触控支持）](guides/touch-templates.md)
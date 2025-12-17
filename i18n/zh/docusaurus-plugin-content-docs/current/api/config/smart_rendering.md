---
sidebar_label: smart_rendering
title: smart_rendering config
description: "激活 smart rendering 模式以显示 gantt 的任务和链接"
---

# smart_rendering

### Description

@short: 激活 smart rendering 模式以显示 gantt 的任务和链接

@signature: smart_rendering: boolean

### Example

~~~jsx
gantt.config.smart_rendering = true;
...
gantt.init("gantt_here");
~~~

**Default value:** true

### Details

自版本 6.2 起，smart rendering 默认开启，因为它已成为核心 *dhtmlxgantt.js* 文件的一部分。这意味着无需单独添加 *dhtmlxgantt_smart_rendering.js* 文件来启用 smart rendering。

:::note
 包含旧的 *dhtmlxgantt_smart_rendering.js* 文件会覆盖更新后的内置 **smart_rendering** 功能的增强效果。 
:::

### Related Guides
- [性能优化:提升方法](guides/performance.md#zhinengxuanran)

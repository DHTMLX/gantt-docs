---
sidebar_label: smart_rendering
title: smart_rendering 配置
description: "启用甘特图任务和连线渲染的智能渲染模式"
---

# smart_rendering

### Description

@short: 启用甘特图的任务和连线渲染的智能渲染模式

@signature: smart_rendering: boolean

### Example

~~~jsx
gantt.config.smart_rendering = true;
...
gantt.init("gantt_here");
~~~

**默认值：** true

### Details

从 v6.2 版本开始，智能渲染已默认开启，因为它已包含在核心文件 *dhtmlxgantt.js* 中。因此，在页面上无需再引入 *dhtmlxgantt_smart_rendering.js* 文件即可使智能渲染工作。

:::note
如果连接了来自旧版本的 *dhtmlxgantt_smart_rendering.js* 文件，它将覆盖新内置 **smart_rendering** 扩展的改进。
:::

### Related Guides
- [性能：提升方法](guides/performance.md#smart-rendering)
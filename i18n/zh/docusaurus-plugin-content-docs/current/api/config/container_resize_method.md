---
sidebar_label: container_resize_method
title: container_resize_method 配置
description: "定义甘特图是否应在时间间隔内跟踪容器的调整大小"
---

# container_resize_method

### Description

@short: 定义甘特图是否应在时间间隔内跟踪容器的调整大小

@signature: container_resize_method: string | undefined

### Example

~~~jsx
gantt.config.container_resize_method = "timeout";
~~~

**Default value:** undefined

### Details

默认情况下，Gantt 会监听窗口的 "resize" 事件，以及放置在甘特图内的 iframe 元素的 "resize" 事件。有时这些事件可能无法触发（例如，在 Salesforce 中）。

如果你需要 Gantt 在时间间隔内跟踪容器的调整大小，请将 **container_resize_method** 设置为 *"timeout"*：

~~~js
gantt.config.container_resize_method = "timeout";
~~~

### Related API
- [container_resize_timeout](api/config/container_resize_timeout.md)

### Change log
- 新增于 v7.1
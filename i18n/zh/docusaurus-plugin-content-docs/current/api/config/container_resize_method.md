---
sidebar_label: container_resize_method
title: container_resize_method config
description: "指定甘特图是否通过定时器间隔监控容器大小变化"
---

# container_resize_method

### Description

@short: 指定甘特图是否通过定时器间隔监控容器大小变化

@signature: container_resize_method: string | undefined

### Example

~~~jsx
gantt.config.container_resize_method = "timeout";
~~~

**Default value:** undefined

### Details

默认情况下，甘特图会监听 window 和甘特图内部 iframe 的 "resize" 事件来响应容器大小变化。但这些事件有时可能不会触发（例如在 Salesforce 环境中）。

若要让甘特图以固定时间间隔检查容器尺寸变化，可以将 **container_resize_method** 设置为 *"timeout"*:

~~~js
gantt.config.container_resize_method = "timeout";
~~~

### Related API
- [container_resize_timeout](api/config/container_resize_timeout.md)

### Change log
- 版本 v7.1 新增


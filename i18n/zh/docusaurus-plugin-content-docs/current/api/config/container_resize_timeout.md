---
sidebar_label: container_resize_timeout
title: container_resize_timeout config
description: "在调整容器大小时重新绘制甘特图的延迟时间（以毫秒为单位）"
---

# container_resize_timeout

### Description

@short: 指定在调整容器大小时重新绘制甘特图之前的延迟时间（以毫秒为单位）

@signature: container_resize_timeout: number

### Example

~~~jsx
gantt.config.container_resize_timeout = 300;
~~~

**Default value:** 20

### Change log
- 在 v7.0.11 中新增
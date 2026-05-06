---
sidebar_label: scroll_size
title: scroll_size 配置
description: "设置垂直（宽度）和水平（高度）滚动条的尺寸"
---

# scroll_size

### Description

@short: 设置垂直（宽度）和水平（高度）滚动条的尺寸

@signature: scroll_size: number

### Example

~~~jsx
gantt.config.scroll_size = 20;

gantt.init("gantt_here");
~~~

**默认值:** 15

### Details

如果未指定，Gantt 将使用浏览器默认的滚动条宽度，因为滚动条元素的样式会因浏览器而异。
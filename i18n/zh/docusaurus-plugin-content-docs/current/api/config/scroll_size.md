---
sidebar_label: scroll_size
title: scroll_size config
description: "指定垂直（宽度）和水平（高度）滚动条的大小"
---

# scroll_size

### Description

@short: 指定垂直（宽度）和水平（高度）滚动条的大小

@signature: scroll_size: number

### Example

~~~jsx
gantt.config.scroll_size = 20;

gantt.init("gantt_here");
~~~

**Default value:** 15

### Details

当此设置未定义时，Gantt 将依赖浏览器默认的滚动条宽度，因为不同浏览器的滚动条样式可能有所不同。

---
sidebar_label: showCover
title: showCover method
description: "显示 lightbox 模态覆盖层，阻止与屏幕其他部分的交互"
---

# showCover

### Description

@short: 显示 lightbox 模态覆盖层，阻止与屏幕其他部分的交互

@signature: showCover: (box?: HTMLElement) =\> void

### Parameters

- `box` - (optional) *HTMLElement* - 要显示的元素

### Example

~~~jsx
gantt.showCover();
~~~

### Details

当提供输入参数时，该方法会通过将元素的 display 属性设置为 "block" 来显示指定的 HTML 元素，并将其居中显示在屏幕上。

### Related API
- [hideCover](api/method/hidecover.md)


---
sidebar_label: hideCover
title: hideCover method
description: "移除阻止与屏幕其他部分交互的lightbox modal覆盖层"
---

# hideCover

### Description

@short: 移除阻止与屏幕其他部分交互的lightbox modal覆盖层

@signature: hideCover: (box?: HTMLElement) =\> void

### Parameters

- `box` - (optional) *HTMLElement* - 要隐藏的元素

### Example

~~~jsx
gantt.hideCover(gantt.getLightbox());
~~~

### Details

当提供输入参数时，该方法通过将元素的display属性设置为"none"来隐藏指定的HTML元素。

### Related API
- [showCover](api/method/showcover.md)


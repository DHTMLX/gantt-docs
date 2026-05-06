---
sidebar_label: hideCover
title: hideCover method
description: "隐藏阻止与剩余屏幕交互的灯箱模态覆盖层"
---

# hideCover

### Description

@short: 隐藏阻止剩余屏幕交互的灯箱模态覆盖层

@signature: hideCover: (box?: HTMLElement) =\> void

### Parameters

### Example

~~~jsx
gantt.hideCover(gantt.getLightbox());
~~~

### Details

如果你指定了输入参数，该方法将隐藏指定的 HTML 对象元素（通过将 display 属性设置为 "none"）。

### Related API
- [showCover](api/method/showcover.md)
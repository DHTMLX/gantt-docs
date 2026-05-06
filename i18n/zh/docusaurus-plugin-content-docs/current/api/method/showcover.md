---
sidebar_label: showCover
title: showCover 方法
description: "显示阻塞剩余屏幕交互的灯箱模态覆盖层"
---

# showCover

### Description

@short: 显示 lightbox 模态覆盖层，阻止与屏幕其他部分的交互

@signature: showCover: (box?: HTMLElement) =\> void

### Parameters
- `box` - (optional) *HTMLElement* - 一个要隐藏的元素

### Example

~~~jsx
gantt.showCover();
~~~

### Details

如果指定输入参数，该方法将显示指定的 HTML 对象元素（通过将 display 属性设为 "block"）并在屏幕中央显示。

### Related API
- [hideCover](api/method/hidecover.md)
---
sidebar_label: autoscroll
title: autoscroll config
description: "允许甘特图在拖动任务或链接超出浏览器可见区域时自动滚动"
---

# autoscroll

### Description

@short: 允许甘特图在拖动任务或链接超出浏览器可见区域时自动滚动

@signature: autoscroll: boolean

### Example

~~~jsx
gantt.config.autoscroll = false;
gantt.init("gantt_here");
~~~

**Default value:** true

### Related samples
- [Working with 30000 tasks](https://docs.dhtmlx.com/gantt/samples/02_extensions/13_smart_rendering.html)

### Details

在版本 7.1.11 之前，启用 **autoscroll** 功能时，必须使用[预留视图及其特定的滚动条 ID](guides/layout-config.md)。

~~~js
// 水平滚动条:
{view: "scrollbar", id: "scrollHor"}
// 垂直滚动条:
{view: "scrollbar", id: "scrollVer"}
~~~

使用不同的 ID 仍然会显示滚动条，但 autoscroll 功能将无法正常工作。

从版本 7.1.11 开始，滚动条可以使用任意名称，而不会影响 autoscroll。

### Related API
- [autoscroll_speed](api/config/autoscroll_speed.md)

### Change log
- added in version 4.2


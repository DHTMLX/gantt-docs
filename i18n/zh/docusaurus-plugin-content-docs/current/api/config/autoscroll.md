---
sidebar_label: autoscroll
title: autoscroll config
description: "允许甘特图在拖动任务或链接超出浏览器可见区域时自动滚动"
---

# autoscroll

### Description

@short: 启用在拖动任务或将链接拖出当前浏览器屏幕时的自动滚动

@signature: autoscroll: boolean

### Example

~~~jsx
gantt.config.autoscroll = false;
gantt.init("gantt_here");
~~~

**默认值:** true


### Related samples
- [处理 30000 个任务](https://docs.dhtmlx.com/gantt/samples/02_extensions/13_smart_rendering.html)

### Details

请注意，直到版本 7.1.11 为止，使用 [保留的视图及其用于滚动条的 ID](guides/layout-config.md) 同时使用 **autoscroll** 选项。

~~~js
// 水平滚动条:
{view: "scrollbar", id: "scrollHor"}
// 垂直滚动条:
{view: "scrollbar", id: "scrollVer"}
~~~

如果使用不同的名称，滚动条将工作，但 "autoscroll" 功能将不起作用。

从 v7.1.11 开始，滚动条可以使用任意名称。

### Related API
- [autoscroll_speed](api/config/autoscroll_speed.md)

### Change log
- 在版本 4.2 中添加
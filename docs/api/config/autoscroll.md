---
sidebar_label: autoscroll
title: autoscroll config
description: "enables autoscrolling while dragging a task or a link out of the current browser screen"
---

# autoscroll

### Description

@short: Enables autoscrolling while dragging a task or a link out of the current browser screen

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

Note that **up to version 7.1.11**
you need to use [the reserved views and their ids for scrollbars](guides/layout-config.md#required-views-and-settings) while using the **autoscroll** option. 

~~~js
// horizontal scrollbar:
{view: "scrollbar", id: "scrollHor"}
// vertical scrollbar:
{view: "scrollbar", id: "scrollVer"}
~~~

If you use different names, the scrollbars will work, but the "autoscroll" functionality won't. 

Starting from v7.1.11, you can use any names for scrollbars.

### Related API
- [autoscroll_speed](api/config/autoscroll_speed.md)

### Change log
- added in version 4.2


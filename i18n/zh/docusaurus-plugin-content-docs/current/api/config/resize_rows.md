---
sidebar_label: resize_rows
title: resize_rows config
description: "允许通过拖动来调整行的高度"
---

# resize_rows

### Description

@short: 允许通过拖动来调整行的高度

@signature: resize_rows: boolean

### Example

~~~jsx
gantt.config.resize_rows = true;
~~~

**Default value:** false

### Related samples
- [Resizable rows in grid](https://docs.dhtmlx.com/gantt/samples/02_extensions/28_row_resize.html)

### Details

![resize_row](/img/resize_row.png)

### Related API
- [onBeforeRowResize](api/event/onbeforerowresize.md)
- [onRowResize](api/event/onrowresize.md)
- [onBeforeRowResizeEnd](api/event/onbeforerowresizeend.md)
- [onAfterRowResize](api/event/onafterrowresize.md)

### Change log
- 在 v7.1 中添加


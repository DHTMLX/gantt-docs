---
sidebar_label: resize_rows
title: resize_rows-Konfiguration
description: "ermöglicht das Anpassen der Zeilenhöhe per Drag-and-Drop"
---

# resize_rows

### Description

@short: Ermöglicht das Anpassen der Zeilenhöhe per Drag-and-Drop

@signature: resize_rows: boolean

### Example

~~~jsx
gantt.config.resize_rows = true;
~~~

**Standardwert:** false

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
- hinzugefügt in v7.1
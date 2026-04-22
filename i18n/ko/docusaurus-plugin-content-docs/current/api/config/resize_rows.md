---
sidebar_label: resize_rows
title: resize_rows 설정
description: "드래그 앤 드롭으로 행 높이를 조절할 수 있도록 활성화합니다"
---

# resize_rows

### Description

@short: 드래그 앤 드롭으로 행 높이를 조절할 수 있게 해줍니다

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
- v7.1에서 추가됨
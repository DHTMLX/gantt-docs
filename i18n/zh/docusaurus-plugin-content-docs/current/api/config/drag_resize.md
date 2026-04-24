---
sidebar_label: drag_resize
title: drag_resize config
description: "通过拖放调整任务大小的功能"
---

# drag_resize

### Description

@short: 通过拖放实现对任务大小的调整

@signature: drag_resize: boolean

### Example

~~~jsx
gantt.config.drag_resize = false;
gantt.init("gantt_here");
~~~

**默认值：** true

### Details

![property_drag_resize](/img/property_drag_resize.png)

请查看 [CSS 文档的相关部分](guides/css-overview.md#resizer) 文章，以了解如何为所有任务禁用调整大小把手。

请查看时间线中的 Dragging Tasks 文章以了解对调整大小操作的更精细控制，具体包括：

- [对特定任务禁用调整大小](guides/dnd.md#disabling-resize-of-specific-tasks)
- [正在调整大小的任务的哪一边](guides/dnd.md#which-side-of-a-task-is-being-resized)
- [禁用任务的开始日期或结束日期的调整大小](guides/dnd.md#disabling-resize-of-the-start-or-the-end-date-of-a-task)

### Related Guides
- [drag_lightbox](api/config/drag_lightbox.md)
- [drag_links](api/config/drag_links.md)
- [drag_mode](api/config/drag_mode.md)
- [drag_move](api/config/drag_move.md)
- [drag_progress](api/config/drag_progress.md)
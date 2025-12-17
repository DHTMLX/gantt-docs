---
sidebar_label: drag_resize
title: drag_resize config
description: "允许通过拖放操作调整任务大小"
---

# drag_resize

### Description

@short: 允许通过拖放操作调整任务大小

@signature: drag_resize: boolean

### Example

~~~jsx
gantt.config.drag_resize = false;
gantt.init("gantt_here");
~~~

**Default value:** true

### Details

![property_drag_resize](/img/property_drag_resize.png)

关于如何移除所有任务的调整大小手柄，请参见[CSS文档中的相关章节](guides/css-overview.md#resizer)。

如需更详细地控制任务的调整大小，请参考[时间线内拖动任务](guides/dnd.md)一文，其中涵盖了:

- [禁用特定任务的调整大小](guides/dnd.md)
- [确定任务哪一侧正在被调整大小](guides/dnd.md)
- [禁用任务开始或结束日期的调整大小](guides/dnd.md)

### Related Guides
- [drag_lightbox](api/config/drag_lightbox.md)
- [drag_links](api/config/drag_links.md)
- [drag_mode](api/config/drag_mode.md)
- [drag_move](api/config/drag_move.md)
- [drag_progress](api/config/drag_progress.md)


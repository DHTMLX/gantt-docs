---
sidebar_label: redo
title: redo 方法
description: "再次将撤销的修改应用到甘特图"
---

# redo

### Description

@short: 再次将撤销的修改应用到甘特图

@signature: redo: () =\> void

### Example

~~~jsx
gantt.redo();
~~~

### Related samples
- [Undo/Redo changes in Gantt](https://docs.dhtmlx.com/gantt/samples/02_extensions/14_undo.html)

### Details

:::note
此方法定义在 **undo** 扩展中，因此需要启用 [undo](guides/extensions-list.md#undo) 插件。请在 [Undo/Redo Functionality](guides/undo-redo.md) 文章中阅读详细信息。
:::

### Related API
- [undo](api/method/undo.md)
- [getRedoStack](api/method/getredostack.md)
- [clearRedoStack](api/method/clearredostack.md)
- [onBeforeRedo](api/event/onbeforeredo.md)
- [onAfterRedo](api/event/onafterredo.md)

### Related Guides
- [Undo/Redo Functionality](guides/undo-redo.md)

### Change log
- 新增于版本 4.0
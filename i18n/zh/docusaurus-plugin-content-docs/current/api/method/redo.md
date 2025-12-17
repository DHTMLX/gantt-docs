---
sidebar_label: redo
title: redo method
description: "重新应用之前在gantt上撤销的更改"
---

# redo

### Description

@short: 重新应用之前在gantt上撤销的更改

@signature: redo: () =\> void

### Example

~~~jsx
gantt.redo();
~~~

### Related samples
- [Undo/Redo changes in Gantt](https://docs.dhtmlx.com/gantt/samples/02_extensions/14_undo.html)

### Details

:::note
 此方法是**undo**扩展的一部分，因此请确保已启用[undo](guides/extensions-list.md)插件。更多详细信息请参见[撤销/重做功能](guides/undo-redo.md)文章。 
:::

### Related API
- [undo](api/method/undo.md)
- [getRedoStack](api/method/getredostack.md)
- [clearRedoStack](api/method/clearredostack.md)
- [onBeforeRedo](api/event/onbeforeredo.md)
- [onAfterRedo](api/event/onafterredo.md)

### Related Guides
- [撤销/重做功能](guides/undo-redo.md)

### Change log
- 版本4.0新增


---
sidebar_label: undo
title: метод undo
description: "Отменяет изменения, внесённые в диаграмму Ганта"
---

# undo

### Description

@short: Отменяет изменения, внесённые в диаграмму Ганта

@signature: undo: () =\> void

### Example

~~~jsx
gantt.undo();
~~~

### Related samples
- [Undo/Redo changes in Gantt](https://docs.dhtmlx.com/gantt/samples/02_extensions/14_undo.html)

### Details

:::note
Этот метод определён в расширении **undo**, поэтому нужно активировать плагин [undo](guides/extensions-list.md#undo). Подробности читайте в статье [Функциональность Undo/Redo](guides/undo-redo.md). 
:::

### Related API
- [redo](api/method/redo.md)
- [getUndoStack](api/method/getundostack.md)
- [clearUndoStack](api/method/clearundostack.md)
- [onBeforeUndo](api/event/onbeforeundo.md)
- [onAfterUndo](api/event/onafterundo.md)

### Related Guides
- [Функциональность Undo/Redo](guides/undo-redo.md)

### Change log
- добавлено в версии 4.0
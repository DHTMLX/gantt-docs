---
sidebar_label: redo
title: redo method
description: "повторно применяет изменения, которые были ранее отменены на gantt"
---

# redo

### Description

@short: Повторно применяет изменения, которые были ранее отменены на gantt

@signature: redo: () =\> void

### Example

~~~jsx
gantt.redo();
~~~

### Related samples
- [Undo/Redo changes in Gantt](https://docs.dhtmlx.com/gantt/samples/02_extensions/14_undo.html)

### Details

:::note
 Этот метод является частью расширения **undo**, поэтому убедитесь, что плагин [undo](guides/extensions-list.md#undo) включен. Подробнее можно узнать в статье [Отмена и повтор изменений (Undo/Redo)](guides/undo-redo.md). 
:::

### Related API
- [undo](api/method/undo.md)
- [getRedoStack](api/method/getredostack.md)
- [clearRedoStack](api/method/clearredostack.md)
- [onBeforeRedo](api/event/onbeforeredo.md)
- [onAfterRedo](api/event/onafterredo.md)

### Related Guides
- [Отмена и повтор изменений (Undo/Redo)](guides/undo-redo.md)

### Change log
- добавлено в версии 4.0


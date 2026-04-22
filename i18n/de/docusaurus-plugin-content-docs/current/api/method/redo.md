---
sidebar_label: redo
title: redo method
description: "wendet die Änderungen erneut an, die zuvor im Gantt rückgängig gemacht wurden"
---

# redo

### Description

@short: Wendet die rückgängig gemachten Änderungen am Gantt-Diagramm erneut an

@signature: redo: () =\> void

### Example

~~~jsx
gantt.redo();
~~~

### Related samples
- [Undo/Redo changes in Gantt](https://docs.dhtmlx.com/gantt/samples/02_extensions/14_undo.html)

### Details

:::note
Diese Methode ist in der **undo**-Erweiterung definiert, daher müssen Sie das [undo](guides/extensions-list.md#undo)-Plugin aktivieren. Lesen Sie die Details im Artikel [Undo/Redo Functionality](guides/undo-redo.md). 
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
- hinzugefügt in Version 4.0
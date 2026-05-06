---
sidebar_label: undo_steps
title: undo_steps config
description: "setzt die Anzahl der Schritte fest, die durch die Undo-Methode rückgängig gemacht werden sollen"
---

# undo_steps

### Description

@short: Legt die Anzahl der Schritte fest, die durch die Undo-Methode rückgängig gemacht werden sollen

@signature: undo_steps: number

### Example

~~~jsx
gantt.config.undo_steps = 10;

gantt.init("gantt_here");
~~~

**Standardwert:** 10

### Related samples
- [Undo/Redo changes in Gantt](https://docs.dhtmlx.com/gantt/samples/02_extensions/14_undo.html)

### Details

:::note
Diese Option ist in der **undo**-Erweiterung definiert, daher müssen Sie das [undo](guides/extensions-list.md#undo)-Plugin aktivieren. Lesen Sie die Details im Artikel [Undo/Redo Functionality](guides/undo-redo.md). 
:::

### Related API
- [undo](api/config/undo.md)
- [undo_actions](api/config/undo_actions.md)
- [undo_types](api/config/undo_types.md)

### Related Guides
- [Undo/Redo Functionality](guides/undo-redo.md)

### Change log
- hinzugefügt in Version 4.0
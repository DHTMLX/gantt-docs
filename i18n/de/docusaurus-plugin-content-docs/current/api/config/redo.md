---
sidebar_label: redo
title: redo config
description: "ermöglicht die Verwendung der Redo-Funktion im Gantt"
---

# redo

### Description

@short: Aktiviert die Redo-Funktionalität für das Gantt

@signature: redo: boolean

### Example

~~~jsx
gantt.config.redo = true;
~~~

**Standardwert:** true

### Related samples
- [Undo/Redo changes in Gantt](https://docs.dhtmlx.com/gantt/samples/02_extensions/14_undo.html)

### Details

:::note
Diese Option ist in der **undo**-Erweiterung definiert, daher müssen Sie das [undo](guides/extensions-list.md#undo) Plugin aktivieren. Lesen Sie die Details im Artikel [Undo/Redo Functionality](guides/undo-redo.md).
:::

### Related API
- [undo](api/config/undo.md)
- [undo_actions](api/config/undo_actions.md)
- [undo_steps](api/config/undo_steps.md)
- [undo_types](api/config/undo_types.md)

### Related Guides
- [Undo/Redo Functionality](guides/undo-redo.md)

### Change log
- in Version 4.0 hinzugefügt
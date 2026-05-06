---
sidebar_label: undo
title: Undo-Konfiguration
description: "Aktiviert die Undo-Funktionalität für den Gantt"
---

# undo

### Description

@short: Aktiviert die Undo-Funktionalität für den Gantt

@signature: undo: boolean

### Example

~~~jsx
gantt.config.undo = true;
~~~

**Standardwert:** true

### Related samples
- [Rückgängig-/Wiederherstellung von Änderungen im Gantt](https://docs.dhtmlx.com/gantt/samples/02_extensions/14_undo.html)

### Details

:::note
Diese Option ist in der **undo**-Erweiterung definiert, daher müssen Sie das [undo](guides/extensions-list.md#undo) Plugin aktivieren. Lesen Sie die Details im Artikel [Undo/Redo-Funktionalität](guides/undo-redo.md). 
:::

### Related API
- [redo](api/config/redo.md)
- [undo_actions](api/config/undo_actions.md)
- [undo_steps](api/config/undo_steps.md)
- [undo_types](api/config/undo_types.md)

### Related Guides
- [Undo/Redo-Funktionalität](guides/undo-redo.md)

### Change log
- in Version 4.0 hinzugefügt
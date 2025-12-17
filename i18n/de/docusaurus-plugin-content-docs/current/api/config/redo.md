---
sidebar_label: redo
title: redo config
description: "ermöglicht die Verwendung der Redo-Funktion im Gantt"
---

# redo

### Description

@short: Ermöglicht die Verwendung der Redo-Funktion im Gantt

@signature: redo: boolean

### Example

~~~jsx
gantt.config.redo = true;
~~~

**Default value:** true

### Related samples
- [Undo/Redo changes in Gantt](https://docs.dhtmlx.com/gantt/samples/02_extensions/14_undo.html)

### Details

:::note
 Diese Einstellung ist Teil der **undo**-Erweiterung, daher stellen Sie sicher, dass das [undo](guides/extensions-list.md#undo) Plugin aktiviert ist. Weitere Informationen finden Sie im Artikel ["Undo/Redo-Funktionalität"](guides/undo-redo.md). 
:::

### Related API
- [undo](api/config/undo.md)
- [undo_actions](api/config/undo_actions.md)
- [undo_steps](api/config/undo_steps.md)
- [undo_types](api/config/undo_types.md)

### Related Guides
- ["Undo/Redo-Funktionalität"](guides/undo-redo.md)

### Change log
- hinzugefügt in Version 4.0


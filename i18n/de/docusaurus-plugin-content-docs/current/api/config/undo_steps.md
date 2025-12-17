---
sidebar_label: undo_steps
title: undo_steps config
description: "gibt an, wie viele Schritte die undo-Methode zurücksetzt"
---

# undo_steps

### Description

@short: Gibt an, wie viele Schritte die undo-Methode zurücksetzt

@signature: undo_steps: number

### Example

~~~jsx
gantt.config.undo_steps = 10;

gantt.init("gantt_here");
~~~

**Default value:** 10

### Related samples
- [Undo/Redo changes in Gantt](https://docs.dhtmlx.com/gantt/samples/02_extensions/14_undo.html)

### Details

:::note
 Diese Einstellung ist Teil der **undo**-Erweiterung. Stellen Sie daher sicher, dass das [undo](guides/extensions-list.md#undo) Plugin aktiviert ist. Weitere Details finden Sie im Artikel ["Undo/Redo-Funktionalität"](guides/undo-redo.md). 
:::

### Related API
- [undo](api/config/undo.md)
- [undo_actions](api/config/undo_actions.md)
- [undo_types](api/config/undo_types.md)

### Related Guides
- ["Undo/Redo-Funktionalität"](guides/undo-redo.md)

### Change log
- hinzugefügt in Version 4.0


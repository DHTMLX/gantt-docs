---
sidebar_label: redo
title: redo config
description: "enables the Redo functionality for the gantt"
---

# redo

### Description

@short: Enables the Redo functionality for the gantt

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
This option is defined in the **undo** extension, so you need to enable the [undo](guides/extensions-list.md#undo) plugin. Read the details in the [Undo/Redo Functionality](guides/undo-redo.md) article. 
:::

### Related API
- - [undo](api/config/undo.md)
- - [undo_actions](api/config/undo_actions.md)
- - [undo_steps](api/config/undo_steps.md)
- - [undo_types](api/config/undo_types.md)

### Related Guides
- [Undo/Redo Functionality](guides/undo-redo.md)

### Change log
- added in version 4.0


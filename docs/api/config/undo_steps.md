---
sidebar_label: undo_steps
title: undo_steps config
description: "sets the number of steps that should be reverted by the undo method"
---

# undo_steps

### Description

@short: Sets the number of steps that should be reverted by the undo method

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
This option is defined in the **undo** extension, so you need to enable the [undo](guides/extensions-list.md#undo) plugin. Read the details in the [Undo/Redo Functionality](guides/undo-redo.md) article. 
:::

### Related API
- [undo](api/config/undo.md)
- [undo_actions](api/config/undo_actions.md)
- [undo_types](api/config/undo_types.md)

### Related Guides
- [Undo/Redo Functionality](guides/undo-redo.md)

### Change log
- added in version 4.0


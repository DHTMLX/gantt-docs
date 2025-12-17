---
sidebar_label: undo_types
title: undo_types config
description: "sets the types of entities for which the Undo operation will be applied"
---

# undo_types

### Description

@short: Sets the types of entities for which the Undo operation will be applied

@signature: undo_types: \{ link?: string; task?: string; \}

### Example

~~~jsx
gantt.config.undo_types = {
    link:"link",
    task:"task"
};
~~~

### Related samples
- [Undo/Redo changes in Gantt](https://docs.dhtmlx.com/gantt/samples/02_extensions/14_undo.html)

### Details

:::note
This option is defined in the **undo** extension, so you need to enable the [undo](guides/extensions-list.md#undo) plugin. Read the details in the [Undo/Redo Functionality](guides/undo-redo.md) article. 
:::

- **link** - (*string*) - the name of the "link" entity
- **task** - (*string*) - the name of the "task" entity

### Related API
- [undo](api/config/undo.md)
- [undo_actions](api/config/undo_actions.md)
- [undo_steps](api/config/undo_steps.md)

### Related Guides
- [Undo/Redo Functionality](guides/undo-redo.md)

### Change log
- added in version 4.0


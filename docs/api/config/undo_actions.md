---
sidebar_label: undo_actions
title: undo_actions config
description: "sets the actions that the Undo operation will revert"
---

# undo_actions

### Description

@short: Sets the actions that the Undo operation will revert

@signature: undo_actions: \{ update?: string; remove?: string; add?: string; move?: string; \}

### Example

~~~jsx
gantt.config.undo_actions = {
    update: "update",
    remove: "remove", // remove an item from datastore
    add: "add",
    move: "move"
};
~~~

### Related samples
- [Undo/Redo changes in Gantt](https://docs.dhtmlx.com/gantt/samples/02_extensions/14_undo.html)

### Details

:::note
This option is defined in the **undo** extension, so you need to enable the [undo](guides/extensions-list.md#undo) plugin. Read the details in the [Undo/Redo Functionality](guides/undo-redo.md) article. 
:::

- **update** - (*string*) - the name of the "update" action
- **remove** - (*string*) - the name of the "remove" action
- **add** - (*string*) - the name of the "add" action
- **move** - (*string*) - the name of the "move" action

### Related API
- [undo](api/config/undo.md)
- [undo_types](api/config/undo_types.md)
- [undo_steps](api/config/undo_steps.md)

### Related Guides
- [Undo/Redo Functionality](guides/undo-redo.md)

### Change log
- added in version 4.0


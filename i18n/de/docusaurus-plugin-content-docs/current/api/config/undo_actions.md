---
sidebar_label: undo_actions
title: undo_actions config
description: "legt die Aktionen fest, die der Undo-Vorgang rückgängig macht"
---

# undo_actions

### Description

@short: Legt die Aktionen fest, die der Undo-Vorgang rückgängig macht

@signature: undo_actions: \{ update?: string; remove?: string; add?: string; move?: string; \}

### Example

~~~jsx
gantt.config.undo_actions = {
    update: "update",
    remove: "remove", // entfernt ein Element aus dem Datenspeicher
    add: "add",
    move: "move"
};
~~~

### Related samples
- [Undo/Redo changes in Gantt](https://docs.dhtmlx.com/gantt/samples/02_extensions/14_undo.html)

### Details

:::note
Diese Option ist in der **undo**-Erweiterung definiert, daher müssen Sie das [undo](guides/extensions-list.md#undo) Plugin aktivieren. Lesen Sie die Details im Artikel [Undo/Redo Functionality](guides/undo-redo.md). 
:::

- **update** - (*string*) - der Name der "update"-Aktion
- **remove** - (*string*) - der Name der "remove"-Aktion
- **add** - (*string*) - der Name der "add"-Aktion
- **move** - (*string*) - der Name der "move"-Aktion

### Related API
- [undo](api/config/undo.md)
- [undo_types](api/config/undo_types.md)
- [undo_steps](api/config/undo_steps.md)

### Related Guides
- [Undo/Redo Functionality](guides/undo-redo.md)

### Change log
- hinzugefügt in Version 4.0
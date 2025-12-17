---
sidebar_label: undo_actions
title: undo_actions config
description: "definiert die Aktionen, die die Undo-Funktion rückgängig machen wird"
---

# undo_actions

### Description

@short: Definiert die Aktionen, die die Undo-Funktion rückgängig machen wird

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
note Diese Option ist Teil der **undo**-Erweiterung, daher stellen Sie sicher, dass das [undo](guides/extensions-list.md#undo) Plugin aktiviert ist. Weitere Details finden Sie im Artikel ["Undo/Redo-Funktionalität"](guides/undo-redo.md). 
:::

- **update** - (*string*) - legt den Namen für die "update"-Aktion fest
- **remove** - (*string*) - legt den Namen für die "remove"-Aktion fest
- **add** - (*string*) - legt den Namen für die "add"-Aktion fest
- **move** - (*string*) - legt den Namen für die "move"-Aktion fest

### Related API
- [undo](api/config/undo.md)
- [undo_types](api/config/undo_types.md)
- [undo_steps](api/config/undo_steps.md)

### Related Guides
- ["Undo/Redo-Funktionalität"](guides/undo-redo.md)

### Change log
- hinzugefügt in Version 4.0


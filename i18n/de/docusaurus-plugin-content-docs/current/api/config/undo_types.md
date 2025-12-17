---
sidebar_label: undo_types
title: undo_types config
description: "legt fest, welche Typen von Entitäten die Undo-Aktion beeinflussen"
---

# undo_types

### Description

@short: Legt fest, welche Typen von Entitäten die Undo-Aktion beeinflussen

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
 Diese Option ist Teil der **undo**-Extension, daher stellen Sie sicher, dass das [undo](guides/extensions-list.md#undo) Plugin aktiviert ist. Weitere Details finden Sie im Artikel ["Undo/Redo-Funktionalität"](guides/undo-redo.md). 
:::

- **link** - (*string*) - der Bezeichner für die "link"-Entität
- **task** - (*string*) - der Bezeichner für die "task"-Entität

### Related API
- [undo](api/config/undo.md)
- [undo_actions](api/config/undo_actions.md)
- [undo_steps](api/config/undo_steps.md)

### Related Guides
- ["Undo/Redo-Funktionalität"](guides/undo-redo.md)

### Change log
- hinzugefügt in Version 4.0


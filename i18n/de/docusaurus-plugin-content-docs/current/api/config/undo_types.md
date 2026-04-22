---
sidebar_label: undo_types
title: undo_types Konfiguration
description: "Legt die Typen von Entitäten fest, für die der Undo-Vorgang angewendet wird"
---

# undo_types

### Description

@short: Legt die Typen von Entitäten fest, für die der Undo-Vorgang angewendet wird

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
Diese Option ist in der **undo**-Erweiterung definiert, daher müssen Sie das [undo](guides/extensions-list.md#undo) Plugin aktivieren. Lesen Sie die Details im Artikel [Undo/Redo Functionality](guides/undo-redo.md). 
:::

- **link** - (*string*) - der Name der 'link'-Entität
- **task** - (*string*) - der Name der 'task'-Entität

### Related API
- [undo](api/config/undo.md)
- [undo_actions](api/config/undo_actions.md)
- [undo_steps](api/config/undo_steps.md)

### Related Guides
- [Undo/Redo Functionality](guides/undo-redo.md)

### Change log
- in Version 4.0 hinzugefügt
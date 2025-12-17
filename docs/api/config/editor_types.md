---
sidebar_label: editor_types
title: editor_types config
description: "an object that contains definitions of inline editors"
---

# editor_types

### Description

@short: An object that contains definitions of inline editors

@signature: editor_types: \{ text?: InlineEditor; number?: InlineEditor; duration?: InlineEditor; date?: InlineEditor; select?: InlineEditor; predecessor?: InlineEditor; [customEditorName: string]: InlineEditor | undefined; \}

### Example

~~~jsx
gantt.config.editor_types.custom_editor = {// custom editor logic}
~~~

### Details

The config can be used for creation of custom editors (see the above example).

There are several predefined inline editors:

- **text** - (*InlineEditor*) - for editing text columns, e.g. task name
- **number** - (*InlineEditor*) - for editing number columns, e.g. task duration, order, etc.
- **duration** - (*InlineEditor*) - for editing duration columns, i.e. task duration.
Works only when the ***map_to:"duration"*** config is used and [the editor type](guides/inline-editing.md#types-of-editors) is set to the **"duration"** type
- **date** - (*InlineEditor*) - for editing date columns, e.g. start and end dates of the task
- **select** - (*InlineEditor*) - for choosing an option from a list
- **predecessor** - (*InlineEditor*) - for setting task-predecessor for the currently edited task. This editor gets the [WBS codes of tasks](guides/specifying-columns.md#wbscode) to set connection with the predecessor task
- **[customEditorName: string]** - (*InlineEditor | undefined*) - custom inline editors


Editors defined in this object can be attached to gantt columns:

~~~js
const textEditor = {type: "text", map_to: "text"};
const dateEditor =  {type: "date", map_to: "start_date",
    min: new Date(2018, 0, 1), max: new Date(2019, 0, 1)};

gantt.config.columns = [
    {name: "text", label: "Task name", tree: true, width: "*", editor: textEditor},
    {name: "start_date", label: "Start time", align: "center", editor: dateEditor}
];

~~~

### Related Guides
- [Inline Editing in Grid](guides/inline-editing.md#types-of-editors)

---
sidebar_label: inline_editors_multiselect_open
title: inline_editors_multiselect_open config
description: "defines whether inline editor should be opened after one click on a task when multi-task selection is enabled"
---

# inline_editors_multiselect_open

### Description

@short: Defines whether inline editor should be opened after one click on a task when multi-task selection is enabled

@signature: inline_editors_multiselect_open: boolean | undefined

### Example

~~~jsx
gantt.config.inline_editors_multiselect_open = true;

gantt.init("gantt_here");
~~~

**Default value:** undefined

### Details

In the single selection mode, Gantt opens the inline editor after you click on a task. 

In the multi selection mode, the first click on an unselected task will select it whereas the second click on the task will open the inline editor.
If you want Gantt to open the inline editor after the first click, enable the **inline_editors_multiselect_open** config.

### Related Guides
- [Inline Editing in Grid](guides/inline-editing.md)
- [Multi-Task Selection](guides/multiselection.md)

### Change log
- added in v7.1.13

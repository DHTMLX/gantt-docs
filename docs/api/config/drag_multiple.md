---
sidebar_label: drag_multiple
title: drag_multiple config
description: "enables the possibility to drag several selected tasks at once"
---

# drag_multiple

### Description

@short: Enables the possibility to drag several selected tasks at once

@signature: drag_multiple: boolean

### Example

~~~jsx
gantt.config.drag_multiple = false;
gantt.init("gantt_here");
~~~

**Default value:** true

### Related samples
- [Multiselection and Indent/Outdent tasks](https://docs.dhtmlx.com/gantt/samples/02_extensions/09_multiselection.html)

### Details

If you select multiple tasks but start moving a task that is not selected - only the unselected task will be moved.

You can also enable drag and drop of projects by setting the [drag_project](api/config/drag_project.md) config to *true*.

~~~js
gantt.config.drag_project = true;
~~~

### Related API
- [drag_project](api/config/drag_project.md)

### Related Guides
- [Multi-Task Selection](guides/multiselection.md#multitaskselectionanddragndrop)


---
sidebar_label: drag_multiple
title: конфигурация drag_multiple
description: "позволяет перетаскивать сразу несколько выбранных задач"
---

# drag_multiple

### Description

@short: Позволяет перетаскивать сразу несколько выбранных задач

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

Если вы выберете несколько задач, но начнёте перемещать задачу, которая не выбрана, будет перемещена только не выбранная задача.

Вы также можете включить drag and drop проектов, установив config [drag_project](api/config/drag_project.md) в *true*.

~~~js
gantt.config.drag_project = true;
~~~

### Related API
- [drag_project](api/config/drag_project.md)

### Related Guides
- [Multi-Task Selection](guides/multiselection.md#multitaskselectionanddragndrop)
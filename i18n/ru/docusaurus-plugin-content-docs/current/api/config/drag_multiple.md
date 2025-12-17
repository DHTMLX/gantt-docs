---
sidebar_label: drag_multiple
title: drag_multiple config
description: "позволяет одновременно перетаскивать несколько выбранных задач"
---

# drag_multiple

### Description

@short: Позволяет одновременно перетаскивать несколько выбранных задач

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

Когда выбрано несколько задач, перетаскивание задачи, которая не входит в выделение, перемещает только эту одну задачу.

Чтобы включить перетаскивание проектов, установите конфигурацию [drag_project](api/config/drag_project.md) в значение *true*.

~~~js
gantt.config.drag_project = true;
~~~

### Related API
- [drag_project](api/config/drag_project.md)

### Related Guides
- [Множественный выбор задач](guides/multiselection.md#multitaskselectionanddragndrop)


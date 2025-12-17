---
sidebar_label: show_quick_info
title: show_quick_info config
description: "activates/disables the 'quick_info' extension (pop-up task's details form)"
---

# show_quick_info

### Description

@short: Activates/disables the 'quick_info' extension (pop-up task's details form)

@signature: show_quick_info: boolean

### Example

~~~jsx
gantt.config.show_quick_info = false;
gantt.init("gantt_here");
~~~

**Default value:** true

### Details

:::note
This option is defined in the **Quick Info** extension, so you need to activate the [quick_info](guides/extensions-list.md#quick-info) plugin. 
:::

### Related Guides
- [Templates of the 'Quick Info' Extension (Touch Support)](guides/touch-templates.md)

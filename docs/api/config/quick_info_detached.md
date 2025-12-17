---
sidebar_label: quick_info_detached
title: quick_info_detached config
description: "defines whether the task form will appear from the left/right side of the screen or near the selected task"
---

# quick_info_detached

### Description

@short: Defines whether the task form will appear from the left/right side of the screen or near the selected task

@signature: quick_info_detached: boolean

### Example

~~~jsx
gantt.config.quick_info_detached = false;

gantt.init("gantt_here");
~~~

**Default value:** true (the event form will appear near the selected event)

### Related samples
- [QuickInfo extension](https://docs.dhtmlx.com/gantt/samples/02_extensions/01_quickinfo.html)

### Details

:::note
This option is defined in the **Quick Info** extension, so you need to activate the [quick_info](guides/extensions-list.md#quick-info) plugin. 
:::

### Related API
- [showQuickInfo](api/method/showquickinfo.md)
- [hideQuickInfo](api/method/hidequickinfo.md)
- [quickinfo_buttons](api/config/quickinfo_buttons.md)
- [onQuickInfo](api/event/onquickinfo.md)
- [onAfterQuickInfo](api/event/onafterquickinfo.md)

### Related Guides
- [Full List of Extensions](guides/extensions-list.md#quick-info)


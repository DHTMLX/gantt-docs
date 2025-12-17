---
sidebar_label: drag_timeline
title: drag_timeline config
description: "configures the behavior of the drag_timeline extension"
---

# drag_timeline

### Description

@short: Configures the behavior of the drag_timeline extension

@signature: drag_timeline: null | \{ ignore?: string; useKey?: string | boolean; render?: boolean; \}

### Example

~~~jsx
gantt.config.drag_timeline = {
    ignore:".gantt_task_line, .gantt_task_link",
    useKey: false,
    render: false
};
~~~

**Default value:** \{ useKey: false, ignore: ".gantt_task_line, .gantt_task_link" \}

### Related samples
- [Drag timeline](https://docs.dhtmlx.com/gantt/samples/02_extensions/27_drag_timeline.html)

### Details

:::note
This option is defined in the **drag_timeline** extension, so you need to activate the [drag_timeline](guides/extensions-list.md#drag-timeline) plugin. 
:::

The config value can be either an object or the **null** value, the **null** value disables the extension.

~~~js
gantt.config.drag_timeline = null; // disables the extension
~~~

The **drag_timeline** object includes the following properties:


- **ignore** - (*string*) - CSS selector. Scrolling the timeline won't be activated for the elements that match the selector

- **useKey** - (*string | boolean*) - if the property is specified, scrolling the timeline will be activated only when the specified modifier key is pressed. The supported values are: "ctrlKey", "shiftKey", "metaKey", "altKey"

- **render** - (*boolean*) - if the property is enabled, scrolling the timeline will be rerendered when the scroll is started and when it is ended

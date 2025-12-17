---
sidebar_label: collapse
title: collapse method
description: "collapses gantt from the full screen mode to the normal mode"
---

# collapse

### Description

@short: Collapses gantt from the full screen mode to the normal mode

@signature: collapse: () =\> void

### Example

~~~jsx
gantt.collapse();
~~~

### Related samples
- [Full Screen](https://docs.dhtmlx.com/gantt/samples/02_extensions/11_full_screen.html)

### Details

:::note
This method is defined in the **fullscreen** extension, so you need to activate the [fullscreen](guides/extensions-list.md#fullscreen) plugin using the [gantt.plugins](api/method/plugins.md) method. Read the details in the [Full Screen Mode](guides/fullscreen-mode.md) article. 
:::

### Related API
- [expand](api/method/expand.md)
- [onBeforeCollapse](api/event/onbeforecollapse.md)
- [onBeforeExpand](api/event/onbeforeexpand.md)
- [onExpand](api/event/onexpand.md)
- [onCollapse](api/event/oncollapse.md)

### Related Guides
- [Full Screen Mode](guides/fullscreen-mode.md)


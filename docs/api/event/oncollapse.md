---
sidebar_label: onCollapse
title: onCollapse event
description: "fires when gantt went back to normal mode from the full screen mode"
---

# onCollapse

### Description

@short: Fires when gantt went back to normal mode from the full screen mode

@signature: onCollapse: () =\> void;

### Example

~~~jsx
gantt.attachEvent("onCollapse", function (){
    // any custom logic here
});
~~~

### Related samples
- [Full Screen](https://docs.dhtmlx.com/gantt/samples/02_extensions/11_full_screen.html)

### Details

:::note
This event is defined in the **fullscreen** extension, so you need to activate the [fullscreen](guides/extensions-list.md#fullscreen) plugin using the [gantt.plugins](api/method/plugins.md) method. Read the details in the [Full Screen Mode](guides/fullscreen-mode.md) article. 
:::

### Related API
- [onExpand](api/event/onexpand.md)
- [onBeforeCollapse](api/event/onbeforecollapse.md)
- [onBeforeExpand](api/event/onbeforeexpand.md)
- [collapse](api/method/collapse.md)
- [expand](api/method/expand.md)

### Related Guides
- [Full Screen Mode](guides/fullscreen-mode.md)


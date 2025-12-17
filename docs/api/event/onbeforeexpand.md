---
sidebar_label: onBeforeExpand
title: onBeforeExpand event
description: "fires before gantt is expanded to full screen"
---

# onBeforeExpand

### Description

@short: Fires before gantt is expanded to full screen

@signature: onBeforeExpand: () =\> boolean;

### Returns
- ` result` - (boolean) - defines whether the default action of the event will be triggered (<b>true</b>) or canceled (<b>false</b>)

### Example

~~~jsx
gantt.attachEvent("onBeforeExpand",function(){
    // any custom logic here    
    return true;
});
~~~

### Related samples
- [Full Screen](https://docs.dhtmlx.com/gantt/samples/02_extensions/11_full_screen.html)

### Details

The event is blockable. Returning *false* will cancel further processing.

:::note
This event is defined in the **fullscreen** extension, so you need to activate the [fullscreen](guides/extensions-list.md#fullscreen) plugin using the [gantt.plugins](api/method/plugins.md) method. Read the details in the [Full Screen Mode](guides/fullscreen-mode.md) article. 
:::

### Related API
- [onBeforeCollapse](api/event/onbeforecollapse.md)
- [onCollapse](api/event/oncollapse.md)
- [onExpand](api/event/onexpand.md)
- [collapse](api/method/collapse.md)
- [expand](api/method/expand.md)

### Related Guides
- [Full Screen Mode](guides/fullscreen-mode.md)


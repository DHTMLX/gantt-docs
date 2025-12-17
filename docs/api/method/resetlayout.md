---
sidebar_label: resetLayout
title: resetLayout method
description: "rebuilds the Gantt layout using the current value of the layout config"
---

# resetLayout

### Description

@short: Rebuilds the Gantt layout using the current value of the layout config

@signature: resetLayout: () =\> void

### Example

~~~jsx
gantt.init("gantt_here");

gantt.config.layout = {
    css: "gantt_container",
    rows: [
        {
            cols: [
                {view: "grid", scrollX: "scrollHor", scrollY: "scrollVer"},
                {resizer: true, width: 1},
                {view: "timeline", scrollX: "scrollHor", scrollY: "scrollVer"},
                {view: "scrollbar", id: "scrollVer"}
            ]
        },
        {view: "scrollbar", id: "scrollHor", height: 20}
    ]
};

gantt.resetLayout();
~~~

### Details

:::note
This method removes custom layers added to the timeline area via the [addTaskLayer](api/method/addtasklayer.md) and [addLinkLayer](api/method/addlinklayer.md) methods. 
Therefore, you need to redefine these ones after calling the **gantt.resetLayout** method in order for custom layers to be displayed on a page. 
:::

### Related API
- [layout](api/config/layout.md)

### Related Guides
- [Gantt Layout](guides/layout-config.md)


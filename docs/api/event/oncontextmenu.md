---
sidebar_label: onContextMenu
title: onContextMenu event
description: "fires when a user clicks the right mouse button inside the Gantt chart (see the details)"
---

# onContextMenu

### Description

@short: Fires when a user clicks the right mouse button inside the Gantt chart (see the details)

@signature: onContextMenu: (taskId: string | number, linkId: string | number, e: Event) =\> void;

### Parameters

- `taskId` - (required) *string | number* - the task id
- `linkId` - (required) *string | number* - the link id
- `e` - (required) *Event* - a native event object

### Example

~~~jsx
gantt.attachEvent("onContextMenu", function (taskId, linkId, event) {
    const element = event.target;
    console.log("You've clicked on the ", element)
    return true;
});
~~~

### Related samples
- [Context menu to control tasks](https://docs.dhtmlx.com/gantt/samples/04_customization/10_context_menu.html)

### Details

Right clicks in the Gantt chart open the default browser context menu, if there are no other conditions. 
In the following example a click on a task shows a [DHTMLX context menu](https://docs.dhtmlx.com/menu__index.html) and hides the default browser context menu.

~~~js
//requires DHTMLX menu component
gantt.attachEvent("onContextMenu", function (taskId, linkId, event) {
    const x = event.clientX+document.body.scrollLeft+document.documentElement.scrollLeft;
    const y = event.clientY+document.body.scrollTop+document.documentElement.scrollTop;

    if (taskId) {
        menu.showContextMenu(x, y);
        return false;
    }

    return true;
});
~~~

Don't forget to include either [files of DHTMLX Menu or DHTMLX Suite](https://docs.dhtmlx.com/menu__how_to_start.html) on the page. Otherwise, the example won't work.


Check [another example](https://snippet.dhtmlx.com/xuvxhjbc) if you need to add a custom context menu in pure JavaScript.

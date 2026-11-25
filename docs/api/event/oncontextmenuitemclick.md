---
sidebar_label: onContextMenuItemClick
title: onContextMenuItemClick event
description: "Fires when a built-in or custom context menu item is selected"
---

# onContextMenuItemClick

### Description

@short: Fires when a built-in or custom context menu item is selected

@signature: onContextMenuItemClick: (id: string | number, item: UIMenuItem, context: IContextMenuEventContext) =\> void | boolean

### Parameters

- `id` - the selected item's ID
- `item` - the selected item descriptor
- `context` - the context the menu was opened with

### Example

~~~js
gantt.attachEvent("onContextMenuItemClick", function (id, item, context) {
    if (id === "delete" && context.task?.protected) return false;
    return true;
});
~~~

### Details

Requires the [context menu plugin](guides/context-menu.md). The event fires for custom and built-in items. Return `false` to cancel a built-in action.

---
sidebar_label: onBeforeContextMenu
title: onBeforeContextMenu event
description: "Fires before the built-in context menu opens"
---

# onBeforeContextMenu

### Description

@short: Fires before the built-in context menu opens

@signature: onBeforeContextMenu: (context: IContextMenuEventContext) =\> void | boolean

### Parameters

- `context` - the target zone, related data and resolved menu items

### Example

~~~js
gantt.attachEvent("onBeforeContextMenu", function (context) {
    if (context.zone === "task" && context.task?.readonly) {
        context.items = context.items.filter(item => item.id !== "delete");
    }
    return true;
});
~~~

### Details

Requires the [context menu plugin](guides/context-menu.md). Gantt resolves the items before calling the handler. Assign or mutate `context.items` to change the menu. Return `false` or leave the item list empty to skip the built-in menu.

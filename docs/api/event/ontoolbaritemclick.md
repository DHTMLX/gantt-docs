---
sidebar_label: onToolbarItemClick
title: onToolbarItemClick event
description: "Fires when a toolbar button or menu item is activated"
---

# onToolbarItemClick

### Description

@short: Fires when a toolbar button or menu item is activated

@signature: onToolbarItemClick: (id: string | number, item: UIToolbarItem, e?: Event | null) =\> void | boolean

### Parameters

- `id` - the ID of the item, or the ID of the selected leaf in a toolbar menu
- `item` - the item descriptor
- `e` - the originating event, when available

### Example

~~~js
gantt.attachEvent("onToolbarItemClick", function (id) {
    if (id === "refresh") gantt.render();
    return true;
});
~~~

### Details

Requires the [toolbar plugin](guides/toolbar.md). The event fires before a built-in action. Return `false` to cancel the action. For fields and toggles, also see [onToolbarItemChange](api/event/ontoolbaritemchange.md).

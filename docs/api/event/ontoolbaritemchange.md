---
sidebar_label: onToolbarItemChange
title: onToolbarItemChange event
description: "Fires when a value-bearing toolbar item changes"
---

# onToolbarItemChange

### Description

@short: Fires when a value-bearing toolbar item changes

@signature: onToolbarItemChange: (id: string | number, value: any, item: UIToolbarItem) =\> void | boolean

### Parameters

- `id` - the item's ID
- `value` - the new value
- `item` - the item descriptor

### Example

~~~js
gantt.attachEvent("onToolbarItemChange", function (id, value) {
    if (id === "start" && value instanceof Date) gantt.showDate(value);
    return true;
});
~~~

### Details

Requires the [toolbar plugin](guides/toolbar.md). Applies to toggle, combo, segmented, text, stepper and datepicker items. The event fires before a built-in action. Return `false` to cancel the action.

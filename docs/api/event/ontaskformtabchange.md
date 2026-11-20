---
sidebar_label: onTaskFormTabChange
title: onTaskFormTabChange event
description: "Fires when the active tab in the advanced task form changes"
---

# onTaskFormTabChange

### Description

@short: Fires when the active tab in the advanced task form changes

@signature: onTaskFormTabChange: (tabId: string, prevTabId: string) =\> void

### Parameters

- `tabId` - the ID of the new active tab
- `prevTabId` - the ID of the previous active tab

### Example

~~~js
gantt.attachEvent("onTaskFormTabChange", function (tabId, prevTabId) {
    console.log(prevTabId, tabId);
});
~~~

### Details

Requires the [advanced task form](guides/advanced-task-form.md). See its [form API](guides/advanced-task-form.md#api) to read or change the active tab.

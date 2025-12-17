---
sidebar_label: onAfterQuickInfo
title: onAfterQuickInfo event
description: "fires after the pop-up edit form is closed"
---

# onAfterQuickInfo

### Description

@short: Fires after the pop-up edit form is closed

@signature: onAfterQuickInfo: (taskId: string | number) =\> void;

### Parameters

- `taskId` - (required) *string | number* - the task id

### Example

~~~jsx
gantt.attachEvent("onAfterQuickInfo",function(taskId){
    // your code here
});
~~~

### Related samples
- [QuickInfo extension](https://docs.dhtmlx.com/gantt/samples/02_extensions/01_quickinfo.html)

### Details

:::note
This event is defined in the **Quick Info** extension, so you need to activate the [quick_info](guides/extensions-list.md#quick-info) plugin. 
:::


added in version 4.1

### Related API
- [showQuickInfo](api/method/showquickinfo.md)
- [hideQuickInfo](api/method/hidequickinfo.md)
- [quick_info_detached](api/config/quick_info_detached.md)
- [quickinfo_buttons](api/config/quickinfo_buttons.md)
- [onQuickInfo](api/event/onquickinfo.md)

### Related Guides
- [Full List of Extensions](guides/extensions-list.md#quick-info)


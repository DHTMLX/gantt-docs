---
sidebar_label: onQuickInfo
title: onQuickInfo event
description: "fires when the pop-up edit form appears"
---

# onQuickInfo

### Description

@short: Fires when the pop-up edit form appears

@signature: onQuickInfo: (taskId: string | number) =\> void;

### Parameters

- `taskId` - (required) *string | number* - the task id

### Example

~~~jsx
gantt.attachEvent("onQuickInfo",function(taskId){
    // your code here
});
~~~

### Related samples
- [QuickInfo extension](https://docs.dhtmlx.com/gantt/samples/02_extensions/01_quickinfo.html)

### Details

:::note
This event is defined in the **Quick Info** extension, so you need to activate the [quick_info](guides/extensions-list.md#quick-info) plugin. 
:::

### Related API
- [showQuickInfo](api/method/showquickinfo.md)
- [hideQuickInfo](api/method/hidequickinfo.md)
- [quick_info_detached](api/config/quick_info_detached.md)
- [quickinfo_buttons](api/config/quickinfo_buttons.md)
- [onAfterQuickInfo](api/event/onafterquickinfo.md)

### Related Guides
- [Full List of Extensions](guides/extensions-list.md#quick-info)


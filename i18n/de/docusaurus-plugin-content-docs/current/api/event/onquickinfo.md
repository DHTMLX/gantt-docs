---
sidebar_label: onQuickInfo
title: onQuickInfo event
description: "wird ausgelöst, wenn das Pop-up Bearbeitungsformular angezeigt wird"
---

# onQuickInfo

### Description

@short: Wird ausgelöst, wenn das Pop-up Bearbeitungsformular angezeigt wird

@signature: onQuickInfo: (taskId: string | number) =\> void;

### Parameters

- `taskId` - (required) *string | number* - die Task-ID

### Example

~~~jsx
gantt.attachEvent("onQuickInfo",function(taskId){  
    // Ihr Code hier  
});
~~~

### Related samples
- [QuickInfo extension](https://docs.dhtmlx.com/gantt/samples/02_extensions/01_quickinfo.html)

### Details

:::note
 Dieses Event ist Teil der **Quick Info** Erweiterung, daher stellen Sie sicher, dass das [quick_info](guides/extensions-list.md#quickinfo) Plugin aktiviert ist. 
:::

### Related API
- [showQuickInfo](api/method/showquickinfo.md)
- [hideQuickInfo](api/method/hidequickinfo.md)
- [quick_info_detached](api/config/quick_info_detached.md)
- [quickinfo_buttons](api/config/quickinfo_buttons.md)
- [onAfterQuickInfo](api/event/onafterquickinfo.md)

### Related Guides
- ["Vollständige Liste der Erweiterungen"](guides/extensions-list.md#quickinfo)


---
sidebar_label: onAfterQuickInfo
title: onAfterQuickInfo event
description: "wird ausgelöst, nachdem das Pop-up-Bearbeitungsformular geschlossen wurde"
---

# onAfterQuickInfo

### Description

@short: Wird ausgelöst, nachdem das Pop-up-Bearbeitungsformular geschlossen wurde

@signature: onAfterQuickInfo: (taskId: string | number) =\> void;

### Parameters

- `taskId` - (required) *string | number* - die ID der Aufgabe

### Example

~~~jsx
gantt.attachEvent("onAfterQuickInfo",function(taskId){
    // Ihr Code hier
});
~~~

### Related samples
- [QuickInfo extension](https://docs.dhtmlx.com/gantt/samples/02_extensions/01_quickinfo.html)

### Details

:::note
note Dieses Event ist Teil der **Quick Info**-Erweiterung, stellen Sie daher sicher, dass das [quick_info](guides/extensions-list.md#quickinfo) Plugin aktiviert ist. 
:::


hinzugefügt in Version 4.1

### Related API
- [showQuickInfo](api/method/showquickinfo.md)
- [hideQuickInfo](api/method/hidequickinfo.md)
- [quick_info_detached](api/config/quick_info_detached.md)
- [quickinfo_buttons](api/config/quickinfo_buttons.md)
- [onQuickInfo](api/event/onquickinfo.md)

### Related Guides
- ["Vollständige Liste der Erweiterungen"](guides/extensions-list.md#quickinfo)


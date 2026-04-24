---
sidebar_label: onQuickInfo
title: onQuickInfo-Ereignis
description: "feuert, wenn das Pop-up-Bearbeitungsformular erscheint"
---

# onQuickInfo

### Description

@short: Feuert, wenn das Pop-up-Bearbeitungsformular erscheint

@signature: onQuickInfo: (taskId: string | number) =\> void;

### Parameters

- `taskId` - (required) *string | number* - die Aufgaben-ID

### Example

~~~jsx
gantt.attachEvent("onQuickInfo",function(taskId){
    // Fügen Sie hier Ihre benutzerdefinierte Logik ein
});
~~~

### Related samples
- [QuickInfo extension](https://docs.dhtmlx.com/gantt/samples/02_extensions/01_quickinfo.html)

### Details

:::note
Dieses Ereignis ist in der **Quick Info** Erweiterung definiert, daher müssen Sie das [quick_info](guides/extensions-list.md#quick-info) Plugin aktivieren.
:::

### Related API
- [showQuickInfo](api/method/showquickinfo.md)
- [hideQuickInfo](api/method/hidequickinfo.md)
- [quick_info_detached](api/config/quick_info_detached.md)
- [quickinfo_buttons](api/config/quickinfo_buttons.md)
- [onAfterQuickInfo](api/event/onafterquickinfo.md)

### Related Guides
- [Full List of Extensions](guides/extensions-list.md#quick-info)
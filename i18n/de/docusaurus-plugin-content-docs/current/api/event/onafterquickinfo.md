---
sidebar_label: onAfterQuickInfo
title: onAfterQuickInfo Ereignis
description: "Wird ausgelöst, nachdem das Pop-up-Bearbeitungsformular geschlossen wurde"
---

# onAfterQuickInfo

### Description

@short: Wird ausgelöst, nachdem das Pop-up-Bearbeitungsformular geschlossen wurde

@signature: onAfterQuickInfo: (taskId: string | number) =\> void;

### Parameters

- `taskId` - (required) *string | number* - die Aufgaben-ID

### Example

~~~jsx
gantt.attachEvent("onAfterQuickInfo",function(taskId){
    // Fügen Sie hier Ihre benutzerdefinierte Logik ein
});
~~~

### Related samples
- [QuickInfo-Erweiterung](https://docs.dhtmlx.com/gantt/samples/02_extensions/01_quickinfo.html)

### Details

:::note
Dieses Ereignis ist in der **Quick Info**-Erweiterung definiert, daher müssen Sie das [quick_info](guides/extensions-list.md#quick-info) Plugin aktivieren.
:::

Hinzugefügt in Version 4.1

### Related API
- [showQuickInfo](api/method/showquickinfo.md)
- [hideQuickInfo](api/method/hidequickinfo.md)
- [quick_info_detached](api/config/quick_info_detached.md)
- [quickinfo_buttons](api/config/quickinfo_buttons.md)
- [onQuickInfo](api/event/onquickinfo.md)

### Related Guides
- [Full List of Extensions](guides/extensions-list.md#quick-info)
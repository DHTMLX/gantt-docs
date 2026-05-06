---
sidebar_label: showQuickInfo
title: showQuickInfo Methode
description: "Zeigt das Pop-up-Aufgabenformular für die angegebene Aufgabe an"
---

# showQuickInfo

### Description

@short: Zeigt das Pop-up-Aufgabenformular für die angegebene Aufgabe an

@signature: showQuickInfo: (id: string | number) =\> void

### Parameters

- `id` - (erforderlich) *string | number* - die Aufgaben-ID

### Example

~~~jsx
gantt.addTask({
    id:10,
    text:"Task #5",
    start_date:"02-09-2013",
    duration:28
}, "project_2");

window.setTimeout(function(){
    gantt.showQuickInfo(10);    
},1);
~~~

### Related samples
- [QuickInfo-Erweiterung](https://docs.dhtmlx.com/gantt/samples/02_extensions/01_quickinfo.html)

### Details

:::note
Hinweis: Diese Methode ist in der **Quick Info**-Erweiterung definiert, daher müssen Sie das [quick_info](guides/extensions-list.md#quick-info) Plugin aktivieren.
:::

### Related API
- [hideQuickInfo](api/method/hidequickinfo.md)
- [quick_info_detached](api/config/quick_info_detached.md)
- [quickinfo_buttons](api/config/quickinfo_buttons.md)
- [onQuickInfo](api/event/onquickinfo.md)
- [onAfterQuickInfo](api/event/onafterquickinfo.md)

### Related Guides
- [Vollständige Liste der Erweiterungen](guides/extensions-list.md#quick-info)
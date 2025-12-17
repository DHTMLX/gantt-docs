---
sidebar_label: showQuickInfo
title: showQuickInfo method
description: "öffnet das Pop-up Task-Formular für eine bestimmte Aufgabe"
---

# showQuickInfo

### Description

@short: Öffnet das Pop-up Task-Formular für eine bestimmte Aufgabe

@signature: showQuickInfo: (id: string | number) =\> void

### Parameters

- `id` - (required) *string | number* -     die eindeutige Kennung der Aufgabe

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
- [QuickInfo extension](https://docs.dhtmlx.com/gantt/samples/02_extensions/01_quickinfo.html)

### Details

:::note
 Diese Methode stammt aus der **Quick Info**-Erweiterung, daher stellen Sie sicher, dass das [quick_info](guides/extensions-list.md#quickinfo) Plugin aktiviert ist. 
:::

### Related API
- [hideQuickInfo](api/method/hidequickinfo.md)
- [quick_info_detached](api/config/quick_info_detached.md)
- [quickinfo_buttons](api/config/quickinfo_buttons.md)
- [onQuickInfo](api/event/onquickinfo.md)
- [onAfterQuickInfo](api/event/onafterquickinfo.md)

### Related Guides
- ["Vollständige Liste der Erweiterungen"](guides/extensions-list.md#quickinfo)


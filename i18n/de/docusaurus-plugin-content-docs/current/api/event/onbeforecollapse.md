---
sidebar_label: onBeforeCollapse
title: onBeforeCollapse event
description: "wird ausgelöst, kurz bevor der Gantt aus dem Vollbildmodus wechselt und zur normalen Ansicht zurückkehrt"
---

# onBeforeCollapse

### Description

@short: Wird ausgelöst, kurz bevor der Gantt aus dem Vollbildmodus wechselt und zur normalen Ansicht zurückkehrt

@signature: onBeforeCollapse: () =\> boolean;

### Returns
- ` result` - (boolean) - bestimmt, ob die Standardaktion des Events fortgesetzt wird (<b>true</b>) oder gestoppt wird (<b>false</b>)

### Example

~~~jsx
gantt.attachEvent("onBeforeCollapse",function(){  
    // hier Ihre benutzerdefinierte Logik einfügen  
    return true;  
});
~~~

### Related samples
- [Full Screen](https://docs.dhtmlx.com/gantt/samples/02_extensions/11_full_screen.html)

### Details

Dieses Event kann blockiert werden. Die Rückgabe von *false* verhindert weitere Aktionen.

:::note
 Dieses Event ist Teil der **fullscreen**-Erweiterung, daher stellen Sie sicher, dass das [fullscreen](guides/extensions-list.md#fullscreen) Plugin über die Methode [gantt.plugins](api/method/plugins.md) aktiviert ist. Weitere Details finden Sie im Artikel ["Vollbildmodus"](guides/fullscreen-mode.md). 
:::

### Related API
- [onBeforeExpand](api/event/onbeforeexpand.md)
- [onCollapse](api/event/oncollapse.md)
- [onExpand](api/event/onexpand.md)
- [collapse](api/method/collapse.md)
- [expand](api/method/expand.md)

### Related Guides
- ["Vollbildmodus"](guides/fullscreen-mode.md)


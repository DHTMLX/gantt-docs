---
sidebar_label: onCollapse
title: onCollapse event
description: "Löst aus, wenn die Gantt-Ansicht vom Vollbildmodus zurück in den Normalmodus wechselt."
---

# onCollapse

### Description

@short: Löst aus, wenn die Gantt-Ansicht vom Vollbildmodus zurück in den Normalmodus wechselt.

@signature: onCollapse: () =\> void;

### Example

~~~jsx
gantt.attachEvent("onCollapse", function (){
    // beliebige benutzerdefinierte Logik hier
});
~~~

### Related samples
- [Full Screen](https://docs.dhtmlx.com/gantt/samples/02_extensions/11_full_screen.html)

### Details

:::note
 Dieses Event ist Teil der **fullscreen**-Erweiterung. Stellen Sie daher sicher, dass Sie das [fullscreen](guides/extensions-list.md#fullscreen) Plugin über die Methode [gantt.plugins](api/method/plugins.md) aktivieren. Weitere Details finden Sie im Artikel ["Vollbildmodus"](guides/fullscreen-mode.md). 
:::

### Related API
- [onExpand](api/event/onexpand.md)
- [onBeforeCollapse](api/event/onbeforecollapse.md)
- [onBeforeExpand](api/event/onbeforeexpand.md)
- [collapse](api/method/collapse.md)
- [expand](api/method/expand.md)

### Related Guides
- ["Vollbildmodus"](guides/fullscreen-mode.md)


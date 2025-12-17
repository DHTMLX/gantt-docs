---
sidebar_label: onBeforeExpand
title: onBeforeExpand event
description: "wird ausgelöst kurz bevor der Gantt in den Vollbildmodus wechselt"
---

# onBeforeExpand

### Description

@short: Wird ausgelöst kurz bevor der Gantt in den Vollbildmodus wechselt

@signature: onBeforeExpand: () =\> boolean;

### Returns
- ` result` - (boolean) - bestimmt, ob die Standardaktion des Events ausgeführt wird (<b>true</b>) oder abgebrochen wird (<b>false</b>)

### Example

~~~jsx
gantt.attachEvent("onBeforeExpand",function(){
    // hier eigene Logik hinzufügen    
    return true;
});
~~~

### Related samples
- [Full Screen](https://docs.dhtmlx.com/gantt/samples/02_extensions/11_full_screen.html)

### Details

Dieses Event kann blockiert werden. Die Rückgabe von *false* verhindert jegliche weitere Aktion.

:::note
 Dieses Event gehört zur **fullscreen** Extension, daher muss das [fullscreen](guides/extensions-list.md#fullscreen) Plugin über die [gantt.plugins](api/method/plugins.md) Methode aktiviert werden. Weitere Informationen finden Sie im Artikel ["Vollbildmodus"](guides/fullscreen-mode.md). 
:::

### Related API
- [onBeforeCollapse](api/event/onbeforecollapse.md)
- [onCollapse](api/event/oncollapse.md)
- [onExpand](api/event/onexpand.md)
- [collapse](api/method/collapse.md)
- [expand](api/method/expand.md)

### Related Guides
- ["Vollbildmodus"](guides/fullscreen-mode.md)


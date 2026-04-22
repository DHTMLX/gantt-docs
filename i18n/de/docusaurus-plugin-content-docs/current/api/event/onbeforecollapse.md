---
sidebar_label: onBeforeCollapse
title: onBeforeCollapse event
description: "Bevor Gantt den Vollbildmodus verlässt und in den normalen Modus zurückkehrt"
---

# onBeforeCollapse

### Description

@short: Bevor Gantt den Vollbildmodus verlässt und in den normalen Modus zurückkehrt

@signature: onBeforeCollapse: () =\> boolean;

### Returns
- ` result` - (boolean) - definiert, ob die Standardaktion des Events ausgelöst wird (<b>true</b>) oder abgebrochen wird (<b>false</b>)

### Example

~~~jsx
gantt.attachEvent("onBeforeCollapse",function(){
    // Fügen Sie hier Ihre benutzerdefinierte Logik ein 
    return true;
});
~~~

### Related samples
- [Full Screen](https://docs.dhtmlx.com/gantt/samples/02_extensions/11_full_screen.html)

### Details

Das Ereignis ist blockierbar. Die Rückgabe von *false* wird die weitere Verarbeitung abbrechen.

:::note
Dieses Ereignis ist in der **fullscreen**-Erweiterung definiert, daher müssen Sie das [fullscreen](guides/extensions-list.md#fullscreen) Plugin über die Methode [gantt.plugins](api/method/plugins.md) aktivieren. Lesen Sie die Details im Artikel [Full Screen Mode](guides/fullscreen-mode.md). 
:::

### Related API
- [onBeforeExpand](api/event/onbeforeexpand.md)
- [onCollapse](api/event/oncollapse.md)
- [onExpand](api/event/onexpand.md)
- [collapse](api/method/collapse.md)
- [expand](api/method/expand.md)

### Related Guides
- [Full Screen Mode](guides/fullscreen-mode.md)
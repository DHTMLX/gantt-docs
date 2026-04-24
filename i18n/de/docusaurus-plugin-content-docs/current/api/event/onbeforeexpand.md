---
sidebar_label: onBeforeExpand
title: onBeforeExpand Ereignis
description: "Wird ausgelöst, bevor das Gantt-Diagramm auf Vollbild erweitert wird"
---

# onBeforeExpand

### Description

@short: Wird ausgelöst, bevor das Gantt-Diagramm auf Vollbild erweitert wird

@signature: onBeforeExpand: () =\> boolean;

### Returns
- ` result` - (boolean) - definiert, ob die Standardaktion des Ereignisses ausgelöst wird (<b>true</b>) oder abgebrochen wird (<b>false</b>)

### Example

~~~jsx
gantt.attachEvent("onBeforeExpand",function(){
    // Fügen Sie hier Ihre benutzerdefinierte Logik ein   
    return true;
});
~~~

### Related samples
- [Vollbild](https://docs.dhtmlx.com/gantt/samples/02_extensions/11_full_screen.html)

### Details

Das Ereignis ist blockierbar. Die Rückgabe von *false* verhindert die weitere Verarbeitung.

:::note
Dieses Ereignis ist in der **Vollbild**-Erweiterung definiert, daher müssen Sie das [Vollbild](guides/extensions-list.md#fullscreen) Plugin aktivieren, indem Sie die [gantt.plugins](api/method/plugins.md) Methode verwenden. Lesen Sie die Details im Artikel [Vollbildmodus](guides/fullscreen-mode.md).
:::

### Related API
- [onBeforeCollapse](api/event/onbeforecollapse.md)
- [onCollapse](api/event/oncollapse.md)
- [onExpand](api/event/onexpand.md)
- [collapse](api/method/collapse.md)
- [expand](api/method/expand.md)

### Related Guides
- [Vollbildmodus](guides/fullscreen-mode.md)
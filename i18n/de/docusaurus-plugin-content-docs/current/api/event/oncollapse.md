---
sidebar_label: onCollapse
title: onCollapse event
description: "Wird ausgelöst, wenn das Gantt-Diagramm vom Vollbildmodus wieder in den Normalmodus wechselt"
---

# onCollapse

### Description

@short: Wird ausgelöst, wenn das Gantt-Diagramm vom Vollbildmodus wieder in den Normalmodus wechselt

@signature: onCollapse: () =\> void;

### Example

~~~jsx
gantt.attachEvent("onCollapse", function (){
    // Fügen Sie hier Ihre benutzerdefinierte Logik ein
});
~~~

### Related samples
- [Full Screen](https://docs.dhtmlx.com/gantt/samples/02_extensions/11_full_screen.html)

### Details

:::note
Dieses Ereignis ist in der **Vollbild-Erweiterung** definiert, daher müssen Sie das Vollbild-Plugin mithilfe der [gantt.plugins](api/method/plugins.md) Methode aktivieren. Lesen Sie die Details im Artikel [Full Screen Mode](guides/fullscreen-mode.md). 
:::

### Related API
- [onExpand](api/event/onexpand.md)
- [onBeforeCollapse](api/event/onbeforecollapse.md)
- [onBeforeExpand](api/event/onbeforeexpand.md)
- [collapse](api/method/collapse.md)
- [expand](api/method/expand.md)

### Related Guides
- [Full Screen Mode](guides/fullscreen-mode.md)
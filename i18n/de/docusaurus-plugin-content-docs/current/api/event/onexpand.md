---
sidebar_label: onExpand
title: onExpand-Ereignis
description: "Wird ausgelöst, wenn Gantt in den Vollbildmodus erweitert wird"
---

# onExpand

### Description

@short: Wird ausgelöst, wenn Gantt in den Vollbildmodus erweitert wird

@signature: onExpand: () =\> void;

### Example

~~~jsx
gantt.attachEvent("onExpand", function (){
    // Fügen Sie hier Ihre benutzerdefinierte Logik ein
});
~~~

### Related samples
- [Vollbild](https://docs.dhtmlx.com/gantt/samples/02_extensions/11_full_screen.html)

### Details

:::note
Dieses Event ist in der **fullscreen**-Erweiterung definiert, daher müssen Sie das [fullscreen](guides/extensions-list.md#fullscreen) Plugin mit der [gantt.plugins](api/method/plugins.md) Methode aktivieren. Lesen Sie die Details im Artikel [Vollbildmodus](guides/fullscreen-mode.md). 
:::

### Related API
- [onCollapse](api/event/oncollapse.md)
- [onBeforeCollapse](api/event/onbeforecollapse.md)
- [onBeforeExpand](api/event/onbeforeexpand.md)
- [collapse](api/method/collapse.md)
- [expand](api/method/expand.md)

### Related Guides
- [Vollbildmodus](guides/fullscreen-mode.md)
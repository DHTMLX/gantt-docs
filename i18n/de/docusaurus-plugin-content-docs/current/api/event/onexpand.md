---
sidebar_label: onExpand
title: onExpand event
description: "wird ausgelöst, wenn der Gantt in den Vollbildmodus wechselt"
---

# onExpand

### Description

@short: Wird ausgelöst, wenn der Gantt in den Vollbildmodus wechselt

@signature: onExpand: () =\> void;

### Example

~~~jsx
gantt.attachEvent("onExpand", function (){
    // hier Ihre benutzerdefinierte Logik einfügen
});
~~~

### Related samples
- [Full Screen](https://docs.dhtmlx.com/gantt/samples/02_extensions/11_full_screen.html)

### Details

:::note
 Dieses Event stammt von der **fullscreen**-Erweiterung, daher stellen Sie sicher, dass das [fullscreen](guides/extensions-list.md#fullscreen) Plugin über die Methode [gantt.plugins](api/method/plugins.md) aktiviert ist. Für weitere Informationen lesen Sie den Artikel ["Vollbildmodus"](guides/fullscreen-mode.md). 
:::

### Related API
- [onCollapse](api/event/oncollapse.md)
- [onBeforeCollapse](api/event/onbeforecollapse.md)
- [onBeforeExpand](api/event/onbeforeexpand.md)
- [collapse](api/method/collapse.md)
- [expand](api/method/expand.md)

### Related Guides
- ["Vollbildmodus"](guides/fullscreen-mode.md)


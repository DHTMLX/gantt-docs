---
sidebar_label: collapse
title: collapse method
description: "Schaltet die Gantt-Ansicht vom Vollbildmodus zurück in den regulären Modus"
---

# collapse

### Description

@short: Schaltet die Gantt-Ansicht vom Vollbildmodus zurück in den regulären Modus

@signature: collapse: () =\> void

### Example

~~~jsx
gantt.collapse();
~~~

### Related samples
- [Full Screen](https://docs.dhtmlx.com/gantt/samples/02_extensions/11_full_screen.html)

### Details

:::note
 Diese Methode stammt aus der **fullscreen**-Extension, daher stellen Sie sicher, dass das [fullscreen](guides/extensions-list.md#fullscreen) Plugin über die Methode [gantt.plugins](api/method/plugins.md) aktiviert ist. Weitere Details finden Sie im Artikel ["Vollbildmodus"](guides/fullscreen-mode.md). 
:::

### Related API
- [expand](api/method/expand.md)
- [onBeforeCollapse](api/event/onbeforecollapse.md)
- [onBeforeExpand](api/event/onbeforeexpand.md)
- [onExpand](api/event/onexpand.md)
- [onCollapse](api/event/oncollapse.md)

### Related Guides
- ["Vollbildmodus"](guides/fullscreen-mode.md)


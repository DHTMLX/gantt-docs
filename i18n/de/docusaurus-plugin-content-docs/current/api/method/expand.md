---
sidebar_label: expand
title: expand method
description: "Schaltet das Gantt-Diagramm in den Vollbildmodus, sodass es den gesamten Bildschirmbereich einnimmt."
---

# expand

### Description

@short: Schaltet das Gantt-Diagramm in den Vollbildmodus, sodass es den gesamten Bildschirmbereich einnimmt.

@signature: expand: () =\> void

### Example

~~~jsx
gantt.expand();
~~~

### Related samples
- [Full Screen](https://docs.dhtmlx.com/gantt/samples/02_extensions/11_full_screen.html)

### Details

:::note
 Diese Methode ist Teil der **fullscreen**-Erweiterung und erfordert daher das Aktivieren des [fullscreen](guides/extensions-list.md#fullscreen) Plugins über die Methode [gantt.plugins](api/method/plugins.md). Weitere Informationen finden Sie in der ausführlichen Erklärung im Artikel ["Vollbildmodus"](guides/fullscreen-mode.md). 
:::

### Related API
- [collapse](api/method/collapse.md)
- [onBeforeCollapse](api/event/onbeforecollapse.md)
- [onBeforeExpand](api/event/onbeforeexpand.md)
- [onExpand](api/event/onexpand.md)
- [onCollapse](api/event/oncollapse.md)

### Related Guides
- ["Vollbildmodus"](guides/fullscreen-mode.md)


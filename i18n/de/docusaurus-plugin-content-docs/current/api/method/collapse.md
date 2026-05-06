---
sidebar_label: collapse
title: collapse method
description: "Faltet den Gantt vom Vollbildmodus in den Normalmodus zusammen."
---

# collapse

### Description

@short: Faltet den Gantt vom Vollbildmodus in den Normalmodus zusammen

@signature: collapse: () =\> void

### Example

~~~jsx
gantt.collapse();
~~~

### Related samples
- [Full Screen](https://docs.dhtmlx.com/gantt/samples/02_extensions/11_full_screen.html)

### Details

:::note
Diese Methode ist in der **fullscreen**-Erweiterung definiert, daher müssen Sie das [fullscreen](guides/extensions-list.md#fullscreen) Plugin über die [gantt.plugins](api/method/plugins.md) Methode aktivieren. Lesen Sie die Details im Artikel [Full Screen Mode](guides/fullscreen-mode.md).
 :::

### Related API
- [expand](api/method/expand.md)
- [onBeforeCollapse](api/event/onbeforecollapse.md)
- [onBeforeExpand](api/event/onbeforeexpand.md)
- [onExpand](api/event/onexpand.md)
- [onCollapse](api/event/oncollapse.md)

### Related Guides
- [Full Screen Mode](guides/fullscreen-mode.md)
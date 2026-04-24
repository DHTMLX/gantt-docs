---
sidebar_label: expand
title: expand method
description: "Schaltet das Gantt-Diagramm in den Vollbildmodus, sodass es den gesamten Bildschirmbereich einnimmt."
---

# expand

### Description

@short: Vergrößert das Gantt-Diagramm in den Vollbildmodus

@signature: expand: () =\> void

### Example

~~~jsx
gantt.expand();
~~~

### Related samples
- [Vollbild](https://docs.dhtmlx.com/gantt/samples/02_extensions/11_full_screen.html)

### Details

:::note
Diese Methode ist in der **fullscreen**-Erweiterung definiert, daher müssen Sie das [fullscreen](guides/extensions-list.md#fullscreen)-Plugin über die [gantt.plugins](api/method/plugins.md) Methode aktivieren. Lesen Sie die Details im Artikel [Vollbildmodus](guides/fullscreen-mode.md).
:::

### Related API
- [collapse](api/method/collapse.md)
- [onBeforeCollapse](api/event/onbeforecollapse.md)
- [onBeforeExpand](api/event/onbeforeexpand.md)
- [onExpand](api/event/onexpand.md)
- [onCollapse](api/event/oncollapse.md)

### Related Guides
- [Vollbildmodus](guides/fullscreen-mode.md)
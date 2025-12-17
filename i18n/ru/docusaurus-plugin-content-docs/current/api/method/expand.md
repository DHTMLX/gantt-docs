---
sidebar_label: expand
title: expand method
description: "Переключает диаграмму Ганта в полноэкранный режим, занимая всё пространство экрана."
---

# expand

### Description

@short: Переключает диаграмму Ганта в полноэкранный режим, занимая всё пространство экрана.

@signature: expand: () =\> void

### Example

~~~jsx
gantt.expand();
~~~

### Related samples
- [Full Screen](https://docs.dhtmlx.com/gantt/samples/02_extensions/11_full_screen.html)

### Details

:::note
 Этот метод является частью расширения **fullscreen**, поэтому требует включения плагина [fullscreen](guides/extensions-list.md#fullscreen) через метод [gantt.plugins](api/method/plugins.md). Для получения подробной информации ознакомьтесь со статьёй [Полноэкранный режим](guides/fullscreen-mode.md). 
:::

### Related API
- [collapse](api/method/collapse.md)
- [onBeforeCollapse](api/event/onbeforecollapse.md)
- [onBeforeExpand](api/event/onbeforeexpand.md)
- [onExpand](api/event/onexpand.md)
- [onCollapse](api/event/oncollapse.md)

### Related Guides
- [Полноэкранный режим](guides/fullscreen-mode.md)


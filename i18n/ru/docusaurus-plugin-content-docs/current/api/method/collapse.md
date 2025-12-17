---
sidebar_label: collapse
title: collapse method
description: "переключает отображение gantt из полноэкранного режима обратно в обычный режим"
---

# collapse

### Description

@short: Переключает отображение gantt из полноэкранного режима обратно в обычный режим

@signature: collapse: () =\> void

### Example

~~~jsx
gantt.collapse();
~~~

### Related samples
- [Full Screen](https://docs.dhtmlx.com/gantt/samples/02_extensions/11_full_screen.html)

### Details

:::note
 Этот метод принадлежит расширению **fullscreen**, поэтому убедитесь, что плагин [fullscreen](guides/extensions-list.md#fullscreen) включён с помощью метода [gantt.plugins](api/method/plugins.md). Подробнее об этом можно узнать в статье [Полноэкранный режим](guides/fullscreen-mode.md). 
:::

### Related API
- [expand](api/method/expand.md)
- [onBeforeCollapse](api/event/onbeforecollapse.md)
- [onBeforeExpand](api/event/onbeforeexpand.md)
- [onExpand](api/event/onexpand.md)
- [onCollapse](api/event/oncollapse.md)

### Related Guides
- [Полноэкранный режим](guides/fullscreen-mode.md)


---
sidebar_label: expand
title: expand method
description: "Переключает диаграмму Ганта в полноэкранный режим, занимая всё пространство экрана."
---

# expand

### Description

@short: Расширяет gantt до полноэкранного режима

@signature: expand: () =\> void

### Example

~~~jsx
gantt.expand();
~~~

### Related samples
- [Полноэкранный режим](https://docs.dhtmlx.com/gantt/samples/02_extensions/11_full_screen.html)

### Details

:::note
Этот метод определяется в расширении **fullscreen**, поэтому вам нужно активировать плагин [fullscreen](guides/extensions-list.md#fullscreen) с помощью метода [gantt.plugins](api/method/plugins.md). Подробности смотрите в статье [Полноэкранный режим](guides/fullscreen-mode.md).
:::

### Related API
- [collapse](api/method/collapse.md)
- [onBeforeCollapse](api/event/onbeforecollapse.md)
- [onBeforeExpand](api/event/onbeforeexpand.md)
- [onExpand](api/event/onexpand.md)
- [onCollapse](api/event/oncollapse.md)

### Related Guides
- [Полноэкранный режим](guides/fullscreen-mode.md)
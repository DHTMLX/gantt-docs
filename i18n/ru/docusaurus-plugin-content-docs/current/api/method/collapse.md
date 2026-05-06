--- 
sidebar_label: свернуть
title: collapse method
description: "сворачивает диаграмму Ганта из полноэкранного режима в обычный режим"
---

# collapse

### Description

@short: Свертывает диаграмму Ганта из полноэкранного режима в обычный режим

### @signature: collapse: () =\> void

### Example

~~~jsx
gantt.collapse();
~~~

### Related samples
- [Полный экран](https://docs.dhtmlx.com/gantt/samples/02_extensions/11_full_screen.html)

### Details

:::note
Этот метод определяется в расширении **fullscreen**, поэтому вам нужно активировать плагин [fullscreen](guides/extensions-list.md#fullscreen) с помощью метода [gantt.plugins](api/method/plugins.md). Подробнее читайте в статье [Режим полного экрана](guides/fullscreen-mode.md).
:::

### Related API
- [expand](api/method/expand.md)
- [onBeforeCollapse](api/event/onbeforecollapse.md)
- [onBeforeExpand](api/event/onbeforeexpand.md)
- [onExpand](api/event/onexpand.md)
- [onCollapse](api/event/oncollapse.md)

### Related Guides
- [Режим полного экрана](guides/fullscreen-mode.md)
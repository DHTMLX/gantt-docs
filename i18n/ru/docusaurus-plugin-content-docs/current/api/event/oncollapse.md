---
sidebar_label: onCollapse
title: onCollapse event
description: "Срабатывает, когда представление gantt переключается из полноэкранного режима обратно в обычный режим."
---

# onCollapse

### Description

@short: Срабатывает, когда представление gantt переключается из полноэкранного режима обратно в обычный режим.

@signature: onCollapse: () =\> void;

### Example

~~~jsx
gantt.attachEvent("onCollapse", function (){
    // любая ваша логика здесь
});
~~~

### Related samples
- [Full Screen](https://docs.dhtmlx.com/gantt/samples/02_extensions/11_full_screen.html)

### Details

:::note
 Это событие является частью расширения **fullscreen**, поэтому убедитесь, что плагин [fullscreen](guides/extensions-list.md#fullscreen) включен с помощью метода [gantt.plugins](api/method/plugins.md). Подробнее об этом можно узнать в статье [Полноэкранный режим](guides/fullscreen-mode.md). 
:::

### Related API
- [onExpand](api/event/onexpand.md)
- [onBeforeCollapse](api/event/onbeforecollapse.md)
- [onBeforeExpand](api/event/onbeforeexpand.md)
- [collapse](api/method/collapse.md)
- [expand](api/method/expand.md)

### Related Guides
- [Полноэкранный режим](guides/fullscreen-mode.md)


---
sidebar_label: onCollapse
title: Событие onCollapse
description: "срабатывает, когда gantt возвращается в обычный режим из полноэкранного режима"
---

# onCollapse

### Описание

@short: Срабатывает, когда gantt возвращается в обычный режим из полноэкранного режима

@signature: onCollapse: () =\> void;

### Пример

~~~jsx
gantt.attachEvent("onCollapse", function (){
    // любая ваша логика здесь
});
~~~

### Связанные примеры
- [Полноэкранный режим](https://docs.dhtmlx.com/gantt/samples/02_extensions/11_full_screen.html)

### Подробности

:::note
Это событие определяется в расширении **fullscreen**, поэтому необходимо активировать плагин [fullscreen](guides/extensions-list.md#fullscreen) с использованием метода [gantt.plugins](api/method/plugins.md). Подробности см. в статье [Полноэкранный режим](guides/fullscreen-mode.md).
:::

### Связанные API
- [onExpand](api/event/onexpand.md)
- [onBeforeCollapse](api/event/onbeforecollapse.md)
- [onBeforeExpand](api/event/onbeforeexpand.md)
- [collapse](api/method/collapse.md)
- [expand](api/method/expand.md)

### Связанные руководства
- [Полноэкранный режим](guides/fullscreen-mode.md)
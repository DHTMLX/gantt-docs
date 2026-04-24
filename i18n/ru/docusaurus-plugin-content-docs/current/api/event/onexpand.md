---
sidebar_label: onExpand
title: onExpand событие
description: "срабатывает, когда gantt разворачивается на полный экран"
---

# onExpand

### Description

@short: Срабатывает, когда gantt разворачивается на полный экран

@signature: onExpand: () =\> void;

### Example

~~~jsx
gantt.attachEvent("onExpand", function (){
    // любая ваша логика здесь
});
~~~

### Related samples
- [Полный экран](https://docs.dhtmlx.com/gantt/samples/02_extensions/11_full_screen.html)

### Details

:::note
Это событие определяется в расширении **fullscreen**, поэтому вам нужно активировать плагин [fullscreen](guides/extensions-list.md#fullscreen) с помощью метода [gantt.plugins](api/method/plugins.md). Подробнее читайте в статье [Full Screen Mode](guides/fullscreen-mode.md).
:::

### Related API
- [onCollapse](api/event/oncollapse.md)
- [onBeforeCollapse](api/event/onbeforecollapse.md)
- [onBeforeExpand](api/event/onbeforeexpand.md)
- [collapse](api/method/collapse.md)
- [expand](api/method/expand.md)

### Related Guides
- [Full Screen Mode](guides/fullscreen-mode.md)
---
sidebar_label: onExpand
title: onExpand event
description: "срабатывает при переключении gantt в полноэкранный режим"
---

# onExpand

### Description

@short: Срабатывает при переключении gantt в полноэкранный режим

@signature: onExpand: () =\> void;

### Example

~~~jsx
gantt.attachEvent("onExpand", function (){
    // разместите здесь вашу пользовательскую логику
});
~~~

### Related samples
- [Full Screen](https://docs.dhtmlx.com/gantt/samples/02_extensions/11_full_screen.html)

### Details

:::note
 Это событие исходит из расширения **fullscreen**, поэтому убедитесь, что плагин [fullscreen](guides/extensions-list.md#fullscreen) включен через метод [gantt.plugins](api/method/plugins.md). Для получения дополнительной информации ознакомьтесь со статьей [Полноэкранный режим](guides/fullscreen-mode.md). 
:::

### Related API
- [onCollapse](api/event/oncollapse.md)
- [onBeforeCollapse](api/event/onbeforecollapse.md)
- [onBeforeExpand](api/event/onbeforeexpand.md)
- [collapse](api/method/collapse.md)
- [expand](api/method/expand.md)

### Related Guides
- [Полноэкранный режим](guides/fullscreen-mode.md)


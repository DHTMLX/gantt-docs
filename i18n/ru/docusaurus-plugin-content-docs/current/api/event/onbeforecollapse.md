---
sidebar_label: onBeforeCollapse
title: onBeforeCollapse event
description: "срабатывает непосредственно перед выходом gantt из полноэкранного режима и возвратом к обычному виду"
---

# onBeforeCollapse

### Description

@short: Срабатывает непосредственно перед выходом gantt из полноэкранного режима и возвратом к обычному виду

@signature: onBeforeCollapse: () =\> boolean;

### Returns
- ` result` - (boolean) - определяет, будет ли выполнено действие по умолчанию события (<b>true</b>) или оно будет остановлено (<b>false</b>)

### Example

~~~jsx
gantt.attachEvent("onBeforeCollapse",function(){
    // разместите здесь вашу пользовательскую логику    
    return true;
});
~~~

### Related samples
- [Full Screen](https://docs.dhtmlx.com/gantt/samples/02_extensions/11_full_screen.html)

### Details

Это событие можно заблокировать. Возврат *false* предотвратит дальнейшие действия.

:::note
 Это событие является частью расширения **fullscreen**, поэтому убедитесь, что плагин [fullscreen](guides/extensions-list.md#fullscreen) включен через метод [gantt.plugins](api/method/plugins.md). Подробнее см. в статье [Полноэкранный режим](guides/fullscreen-mode.md). 
:::

### Related API
- [onBeforeExpand](api/event/onbeforeexpand.md)
- [onCollapse](api/event/oncollapse.md)
- [onExpand](api/event/onexpand.md)
- [collapse](api/method/collapse.md)
- [expand](api/method/expand.md)

### Related Guides
- [Полноэкранный режим](guides/fullscreen-mode.md)


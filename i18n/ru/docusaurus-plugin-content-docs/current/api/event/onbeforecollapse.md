---
sidebar_label: onBeforeCollapse
title: onBeforeCollapse event
description: "перед выходом диаграммы Ганта из полноэкранного режима и возвращением к обычному режиму"
---

# onBeforeCollapse

### Description

@short: Перед выходом диаграммы Ганта из полноэкранного режима и возвращением к обычному режиму

@signature: onBeforeCollapse: () =\> boolean;

### Returns
- ` result` - (boolean) - определяет, будет ли по умолчанию выполнено действие события (<b>true</b>) или отменено (<b>false</b>)

### Example

~~~jsx
gantt.attachEvent("onBeforeCollapse",function(){
    // любая собственная логика здесь    
    return true;
});
~~~

### Related samples
- [Full Screen](https://docs.dhtmlx.com/gantt/samples/02_extensions/11_full_screen.html)

### Details

Событие можно блокировать. Возврат значения *false* отменит дальнейшую обработку.

:::note
Это событие определено в расширении **fullscreen**, поэтому вам нужно активировать плагин [fullscreen](guides/extensions-list.md#fullscreen) с помощью метода [gantt.plugins](api/method/plugins.md). Прочитайте детали в статье [Full Screen Mode](guides/fullscreen-mode.md). 
:::

### Related API
- [onBeforeExpand](api/event/onbeforeexpand.md)
- [onCollapse](api/event/oncollapse.md)
- [onExpand](api/event/onexpand.md)
- [collapse](api/method/collapse.md)
- [expand](api/method/expand.md)

### Related Guides
- [Full Screen Mode](guides/fullscreen-mode.md)
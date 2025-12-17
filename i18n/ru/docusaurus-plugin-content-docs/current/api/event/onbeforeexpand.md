---
sidebar_label: onBeforeExpand
title: onBeforeExpand event
description: "срабатывает непосредственно перед переключением диаграммы Ганта в полноэкранный режим"
---

# onBeforeExpand

### Description

@short: Срабатывает непосредственно перед переключением диаграммы Ганта в полноэкранный режим

@signature: onBeforeExpand: () =\> boolean;

### Returns
- ` result` - (boolean) - определяет, будет ли выполнено действие по умолчанию (<b>true</b>) или отменено (<b>false</b>)

### Example

~~~jsx
gantt.attachEvent("onBeforeExpand",function(){
    // добавьте здесь вашу пользовательскую логику    
    return true;
});
~~~

### Related samples
- [Full Screen](https://docs.dhtmlx.com/gantt/samples/02_extensions/11_full_screen.html)

### Details

Это событие можно заблокировать. Возврат *false* остановит дальнейшее выполнение действия.

:::note
 Это событие принадлежит расширению **fullscreen**, поэтому убедитесь, что плагин [fullscreen](guides/extensions-list.md#fullscreen) активирован через метод [gantt.plugins](api/method/plugins.md). Дополнительная информация доступна в статье [Полноэкранный режим](guides/fullscreen-mode.md). 
:::

### Related API
- [onBeforeCollapse](api/event/onbeforecollapse.md)
- [onCollapse](api/event/oncollapse.md)
- [onExpand](api/event/onexpand.md)
- [collapse](api/method/collapse.md)
- [expand](api/method/expand.md)

### Related Guides
- [Полноэкранный режим](guides/fullscreen-mode.md)


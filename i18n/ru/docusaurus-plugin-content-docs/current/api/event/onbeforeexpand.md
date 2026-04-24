---
sidebar_label: onBeforeExpand
title: onBeforeExpand event
description: "срабатывает перед развёртыванием диаграммы Ганта в полноэкранный режим"
---

# onBeforeExpand

### Description

@short: Срабатывает перед развёртыванием диаграммы Ганта на полный экран

@signature: onBeforeExpand: () =\> boolean;

### Returns
- ` result` - (boolean) - определяет, будет ли выполнено действие по умолчанию этого события (<b>true</b>) или отменено (<b>false</b>)

### Example

~~~jsx
gantt.attachEvent("onBeforeExpand",function(){
    // любая ваша логика здесь
    return true;
});
~~~

### Related samples
- [Full Screen](https://docs.dhtmlx.com/gantt/samples/02_extensions/11_full_screen.html)

### Details

Событие блокируемое. Возврат *false* отменяет дальнейшую обработку.

:::note
Это событие определяется в расширении **fullscreen**, поэтому вам нужно активировать плагин [fullscreen](guides/extensions-list.md#fullscreen) с использованием метода [gantt.plugins](api/method/plugins.md). Прочитайте детали в статье [Full Screen Mode](guides/fullscreen-mode.md). 
:::

### Related API
- [onBeforeCollapse](api/event/onbeforecollapse.md)
- [onCollapse](api/event/oncollapse.md)
- [onExpand](api/event/onexpand.md)
- [collapse](api/method/collapse.md)
- [expand](api/method/expand.md)

### Related Guides
- [Full Screen Mode](guides/fullscreen-mode.md)
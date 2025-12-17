---
sidebar_label: onLinkDblClick
title: onLinkDblClick event
description: "срабатывает при двойном клике на ссылку"
---

# onLinkDblClick

### Description

@short: Срабатывает при двойном клике на ссылку

@signature: onLinkDblClick: (id: string | number, e?: Event) =\> boolean;

### Parameters

- `id` - (required) *string | number* - идентификатор кликнутой ссылки
- `e` - (required) *Event* - необязательный, нативный объект события

### Returns
- ` result` - (boolean) - определяет, будет ли выполнено действие по умолчанию (<b>true</b>) или оно будет предотвращено (<b>false</b>)

### Example

~~~jsx
gantt.attachEvent("onLinkDblClick", function(id,e){
    // здесь можно добавить кастомную логику
    return true;
});
~~~

### Details

Это событие можно блокировать. Возврат false останавливает действие по умолчанию, которым является удаление ссылки.

### Related API
- [onLinkClick](api/event/onlinkclick.md)


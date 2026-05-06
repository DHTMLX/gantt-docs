---
sidebar_label: onLinkDblClick
title: onLinkDblClick event
description: "срабатывает при двойном клике по ссылке"
---

# onLinkDblClick

### Description

@short: Срабатывает при двойном клике по ссылке

@signature: onLinkDblClick: (id: string | number, e?: Event) =\> boolean;

### Parameters

- `id` - (обязательный) *string | number* - идентификатор кликаемой ссылки

### Returns
- ` result` - (boolean) - определяет, будет ли выполнено действие по умолчанию события (<b>true</b>) или отменено (<b>false</b>)

### Example

~~~jsx
gantt.attachEvent("onLinkDblClick", function(id,e){
    //любая собственная логика здесь
    return true;
});
~~~

### Details

Событие можно заблокировать. Возврат false отменит обработчик по умолчанию (удаление ссылки)

### Related API
- [onLinkClick](api/event/onlinkclick.md)
---
sidebar_label: onTaskDblClick
title: onTaskDblClick event
description: "срабатывает, когда пользователь дважды кликает по задаче"
---

# onTaskDblClick

### Description

@short: Срабатывает, когда пользователь дважды кликает по задаче

@signature: onTaskDblClick: (id: string, e?: Event) =\> boolean;

### Parameters

- `id` - (required) *string* - идентификатор задачи, по которой был выполнен двойной клик

### Returns
- ` result` - (boolean) - определяет, будет ли выполнено действие по умолчанию события (<b>true</b>) или отменено (<b>false</b>)

### Example

~~~jsx
gantt.attachEvent("onTaskDblClick", function(id,e){
    // любая ваша логика здесь
    return true;
});
~~~

### Details

Событие можно заблокировать. Возврат false отменит обработчик по умолчанию (открытие сведений о задаче)

### Related API
- [onTaskClick](api/event/ontaskclick.md)
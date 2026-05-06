---
sidebar_label: onBeforeTaskSelected
title: onBeforeTaskSelected event
description: "срабатывает до того, как пользователь выберет задачу"
---

# onBeforeTaskSelected

### Description

@short: Срабатывает до того, как пользователь выберет задачу

@signature: onBeforeTaskSelected: (id: string | number) =\> boolean;

### Parameters

- `id` - (required) *string | number* - идентификатор задачи

### Returns
- ` result` - (boolean) - определяет, будет ли выполнено действие по умолчанию события (<b>true</b>) или отменено (<b>false</b>)

### Example

~~~jsx
gantt.attachEvent("onBeforeTaskSelected", function(id){
    // любая ваша логика здесь
    return true;
});
~~~

### Details

Событие можно заблокировать. Вернуть *false*, чтобы отменить обработку по умолчанию.

### Related API
- [onTaskSelected](api/event/ontaskselected.md)
- [onTaskUnselected](api/event/ontaskunselected.md)
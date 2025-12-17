---
sidebar_label: onBeforeTaskSelected
title: onBeforeTaskSelected event
description: "срабатывает непосредственно перед выбором задачи"
---

# onBeforeTaskSelected

### Description

@short: Срабатывает непосредственно перед выбором задачи

@signature: onBeforeTaskSelected: (id: string | number) =\> boolean;

### Parameters

- `id` - (required) *string | number* - ID задачи

### Returns
- ` result` - (boolean) - определяет, будет ли выполнено действие по умолчанию события (<b>true</b>) или оно будет остановлено (<b>false</b>)

### Example

~~~jsx
gantt.attachEvent("onBeforeTaskSelected", function(id){
    // здесь можно добавить кастомную логику
    return true;
});
~~~

### Details

Это событие можно заблокировать. Возврат *false* предотвратит выполнение действия по умолчанию.

### Related API
- [onTaskSelected](api/event/ontaskselected.md)
- [onTaskUnselected](api/event/ontaskunselected.md)


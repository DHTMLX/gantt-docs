---
sidebar_label: onGridHeaderClick
title: onGridHeaderClick event
description: "срабатывает при клике пользователя на заголовок grid"
---

# onGridHeaderClick

### Description

@short: Срабатывает при клике пользователя на заголовок grid

@signature: onGridHeaderClick: (name: string, e: Event) =\> boolean;

### Parameters

- `name` - (required) *string* - имя атрибута колонки заголовка, по которой был произведён клик
- `e` - (required) *Event* - нативный объект события

### Returns
- ` result` - (boolean) - определяет, будет ли выполнено действие по умолчанию события (<b>true</b>) или оно будет отменено (<b>false</b>)

### Example

~~~jsx
gantt.attachEvent("onGridHeaderClick", function(name, e){
    // здесь можно добавить кастомную логику
    return true;
});
~~~

### Details

Возврат false останавливает стандартное поведение, например, добавление новой задачи через кнопку "плюс" или сортировку колонки.

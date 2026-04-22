---
sidebar_label: onGridHeaderClick
title: onGridHeaderClick event
description: "срабатывает, когда пользователь кликает по заголовку grid"
---

# onGridHeaderClick

### Description

@short: Срабатывает, когда пользователь кликает по заголовку grid

@signature: onGridHeaderClick: (name: string, e: Event) => boolean;

### Parameters

- `name` - (required) *string* - атрибут name столбца, заголовок которого кликает пользователь
- `e` - (required) *Event* - объект нативного события

### Returns
- ` result` - (boolean) - определяет, будет ли выполнено действие по умолчанию события (<b>true</b>) или отменено (<b>false</b>)

### Example

~~~jsx
gantt.attachEvent("onGridHeaderClick", function(name, e){
    // любая ваша логика здесь
    return true;
});
~~~

### Details

Возврат значения false отменяет обработчик по умолчанию (добавление новой задачи при нажатии на кнопку «плюс» или сортировка столбца)
---
sidebar_label: onTaskRowClick
title: Событие onTaskRowClick
description: "Срабатывает, когда пользователь кликает по строке в таблице"
---

# onTaskRowClick

### Description

@short: Срабатывает, когда пользователь кликает по строке в таблице

@signature: onTaskRowClick: (id: string | number, row: HTMLElement) =\> void;

### Parameters

- `id` - (обязательный) *string | number* - идентификатор задачи
- `row` - (обязательный) *HTMLElement* - HTML-элемент нажатой строки

### Example

~~~jsx
gantt.attachEvent("onTaskRowClick", function(id,row){
    // любая ваша логика здесь
});
~~~
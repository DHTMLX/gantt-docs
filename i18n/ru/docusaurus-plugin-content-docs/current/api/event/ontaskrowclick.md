---
sidebar_label: onTaskRowClick
title: onTaskRowClick event
description: "срабатывает, когда пользователь кликает на строку в таблице"
---

# onTaskRowClick

### Description

@short: Срабатывает, когда пользователь кликает на строку в таблице

@signature: onTaskRowClick: (id: string | number, row: HTMLElement) =\> void;

### Parameters

- `id` - (required) *string | number* - id задачи
- `row` - (required) *HTMLElement* - HTML-элемент, представляющий кликнутую строку

### Example

~~~jsx
gantt.attachEvent("onTaskRowClick", function(id,row){
    //любая пользовательская логика здесь
});
~~~

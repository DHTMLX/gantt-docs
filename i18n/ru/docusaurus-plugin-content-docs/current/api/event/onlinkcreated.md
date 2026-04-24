---
sidebar_label: onLinkCreated
title: onLinkCreated event
description: "срабатывает, когда пользователь создаёт новую связь между задачами"
---

# onLinkCreated

### Description

@short: Срабатывает, когда пользователь создаёт новую связь между задачами

@signature: onLinkCreated: (link: Link) =\> boolean;

### Parameters

- `link` - (обязательный) *Link* - объект новой связи

### Returns
- ` result` - (boolean) - возвращает `false` — отменяет создание новой связи, возвращает `true` — продолжает обработку по умолчанию

### Example

~~~jsx
gantt.attachEvent("onLinkCreated", function(link){
    // любая ваша логика здесь
    return true;
});
~~~

### Details

Событие срабатывает до отображения новой связи, что позволяет вам **отменить создание** связи.

### Change log
- добавлено в версии v6.2.2
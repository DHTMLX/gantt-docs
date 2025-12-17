---
sidebar_label: onLinkCreated
title: onLinkCreated event
description: "срабатывает, когда пользователь устанавливает новую связь между задачами"
---

# onLinkCreated

### Description

@short: Срабатывает, когда пользователь устанавливает новую связь между задачами

@signature: onLinkCreated: (link: Link) =\> boolean;

### Parameters

- `link` - (required) *Link* - объект вновь созданной связи

### Returns
- ` result` - (boolean) - возврат `false` предотвращает создание новой связи, возврат `true` позволяет выполнить действие по умолчанию

### Example

~~~jsx
gantt.attachEvent("onLinkCreated", function(link){
    // ваш код здесь
    return true;
});
~~~

### Details

Это событие происходит непосредственно перед появлением новой связи, предоставляя возможность **предотвратить создание связи**.

### Change log
- добавлено в v6.2.2

---
sidebar_label: link_class
title: Шаблон link_class
description: "определяет CSS класс, который будет применяться к ссылке"
---

# link_class

### Description

@short: Задает CSS класс, который будет применяться к ссылке

@signature: link_class: (link: Link) =\> string | void;

### Parameters

- `link` - (обязательный) *Link* - объект ссылки

### Returns
- ` text` - (string | void) - CSS класс для соответствующего элемента

### Example

~~~jsx
gantt.templates.link_class = function(link){
    return "";
};
~~~

### Related Guides
- [Шаблоны зависимых связей](guides/dependency-templates.md)
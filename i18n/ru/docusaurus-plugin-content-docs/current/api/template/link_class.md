---
sidebar_label: link_class
title: link_class template
description: "определяет CSS класс, назначаемый ссылке"
---

# link_class

### Description

@short: Определяет CSS класс, назначаемый ссылке

@signature: link_class: (link: Link) =\> string | void;

### Parameters

- `link` - (required) *Link* - объект ссылки

### Returns
- ` text` - (string | void) - CSS класс для соответствующего элемента

### Example

~~~jsx
gantt.templates.link_class = function(link){
    return "";
};
~~~

### Related Guides
- [Шаблоны связей зависимостей](guides/dependency-templates.md)

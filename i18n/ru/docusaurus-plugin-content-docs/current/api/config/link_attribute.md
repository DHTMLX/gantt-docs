---
sidebar_label: link_attribute
title: конфигурация link_attribute
description: "задает имя атрибута, который будет указывать идентификатор HTML-элемента ссылки"
---

# link_attribute

### Description

@short: Sets the name of the attribute that will specify the id of the link's HTML element

@signature: link_attribute: string

### Example

~~~jsx
gantt.config.link_attribute = "data-link-id"
~~~

**Значение по умолчанию:** "data-link-id"

### Details

![data_link_id](/img/data_link_id.png)

Атрибут *link_id* включён для сохранения обратной совместимости с предыдущими версиями.
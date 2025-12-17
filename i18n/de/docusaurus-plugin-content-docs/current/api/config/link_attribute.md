---
sidebar_label: link_attribute
title: link_attribute config
description: "definiert den Attributnamen, der verwendet wird, um die ID des HTML-Elements des Links anzugeben"
---

# link_attribute

### Description

@short: Definiert den Attributnamen, der verwendet wird, um die ID des HTML-Elements des Links anzugeben

@signature: link_attribute: string

### Example

~~~jsx
gantt.config.link_attribute = "data-link-id"
~~~

**Default value:** "data-link-id"

### Details

![data_link_id](/img/data_link_id.png)

Das Attribut *link_id* wird aus Gründen der Abwärtskompatibilität mit früheren Versionen beibehalten.

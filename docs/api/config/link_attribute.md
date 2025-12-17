---
sidebar_label: link_attribute
title: link_attribute config
description: "sets the name of the attribute that will specify the id of the link's HTML element"
---

# link_attribute

### Description

@short: Sets the name of the attribute that will specify the id of the link's HTML element

@signature: link_attribute: string

### Example

~~~jsx
gantt.config.link_attribute = "data-link-id"
~~~

**Default value:** "data-link-id"

### Details

![data_link_id](/img/data_link_id.png)

The *link_id* attribute is included to remain backward compatibility with previous versions.

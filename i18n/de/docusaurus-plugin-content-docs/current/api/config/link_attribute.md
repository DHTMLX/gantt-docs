---
sidebar_label: link_attribute
title: link_attribute Konfiguration
description: "Legt den Namen des Attributs fest, das die ID des HTML-Elements des Links angibt"
---

# link_attribute

### Description

@short: Legt den Namen des Attributs fest, das die ID des HTML-Elements des Links angibt

@signature: link_attribute: string

### Example

~~~jsx
gantt.config.link_attribute = "data-link-id"
~~~

**Standardwert:** "data-link-id"

### Details

![data_link_id](/img/data_link_id.png)

Das *link_id*-Attribut ist enthalten, um die Abwärtskompatibilität mit früheren Versionen sicherzustellen.
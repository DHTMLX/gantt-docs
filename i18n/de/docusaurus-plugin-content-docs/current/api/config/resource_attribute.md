---
sidebar_label: resource_attribute
title: resource_attribute config
description: "definiert den Attributnamen, den Gantt verwendet, um zu erkennen, welcher Resource eine Aufgabenzeile im Resource Grid oder in der Timeline zugeordnet ist."
---

# resource_attribute
:::info
 Diese Funktion ist nur in der PRO-Edition verfügbar. 
:::
### Description

@short: Definiert den Attributnamen, den Gantt verwendet, um zu erkennen, welcher Resource eine Aufgabenzeile im Resource Grid oder in der Timeline zugeordnet ist.

@signature: resource_attribute: string

### Example

~~~jsx
gantt.config.resource_attribute = "data-resource-id";
~~~

**Default value:** data-resource-id

### Details


:::note
 Jedes Resource-Element enthält das Attribut *data-resource-id*, das das DOM-Element mit der entsprechenden Resource verknüpft. 
:::


![resource_attribute](/img/resource_attribute.png)<br>
:::note
Sample: [Resourse_attribute](https://snippet.dhtmlx.com/5/66401acf0) 
:::

---
sidebar_label: resource_attribute
title: resource_attribute конфигурация
description: "изменяет имя атрибута, которое Gantt использует для определения ресурса, к которому относится строка задачи в сетке ресурсов/таймлайне"
---

# resource_attribute
:::info
This functionality is available in the PRO edition only. 
:::
### Description

@short: Изменяет имя атрибута, которое Gantt использует для определения ресурса, к которому относится строка задачи в сетке ресурсов/таймлайне

@signature: resource_attribute: string

### Example

~~~jsx
gantt.config.resource_attribute = "data-resource-id";
~~~

**Default value:** data-resource-id

### Details

![resource_attribute](/img/resource_attribute.png)

:::note
Каждый элемент ресурса имеет атрибут *data-resource-id*, который используется для определения того, к какому ресурсу прикреплен DOM-элемент. 
::: 

:::note
sample: [Resourse_attribute ](https://snippet.dhtmlx.com/5/66401acf0)
:::
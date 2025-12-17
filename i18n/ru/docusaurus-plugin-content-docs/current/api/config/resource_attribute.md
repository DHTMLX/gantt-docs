---
sidebar_label: resource_attribute
title: resource_attribute config
description: "определяет имя атрибута, который Gantt использует для идентификации ресурса, соответствующего строке задачи в resource grid или timeline."
---

# resource_attribute
:::info
 Эта функция доступна только в PRO-версии. 
:::
### Description

@short: Определяет имя атрибута, который Gantt использует для идентификации ресурса, соответствующего строке задачи в resource grid или timeline.

@signature: resource_attribute: string

### Example

~~~jsx
gantt.config.resource_attribute = "data-resource-id";
~~~

**Default value:** data-resource-id

### Details

:::note
 Каждый элемент ресурса включает атрибут *data-resource-id*, который связывает DOM-элемент с соответствующим ресурсом. 
:::

![resource_attribute](/img/resource_attribute.png)<br>
:::note
Sample: [Resourse_attribute](https://snippet.dhtmlx.com/5/66401acf0 ) 
:::

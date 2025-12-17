---
sidebar_label: resource_attribute
title: resource_attribute config
description: "定义 Gantt 用于识别资源网格或时间轴中任务行对应的资源的属性名称。"
---

# resource_attribute
:::info
 此功能仅在 PRO 版本中可用。 
:::
### Description

@short: 定义 Gantt 用于识别资源网格或时间轴中任务行对应的资源的属性名称。

@signature: resource_attribute: string

### Example

~~~jsx
gantt.config.resource_attribute = "data-resource-id";
~~~

**Default value:** data-resource-id

### Details

:::note
 每个资源元素都包含 *data-resource-id* 属性，该属性将 DOM 元素与其对应的资源关联起来。 
:::


![resource_attribute](/img/resource_attribute.png)<br>
:::note
Sample: [Resourse_attribute ](https://snippet.dhtmlx.com/5/66401acf0)
:::

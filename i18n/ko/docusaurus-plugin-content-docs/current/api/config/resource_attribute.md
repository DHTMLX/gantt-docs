---
sidebar_label: resource_attribute
title: resource_attribute config
description: "Gantt가 리소스 그리드/타임라인의 작업 행이 어떤 리소스를 참조하는지 찾는 데 사용하는 속성의 이름을 변경합니다"
---

# resource_attribute
:::info
이 기능은 PRO 에디션에서만 사용할 수 있습니다. 
:::
### Description

@short: Gantt가 리소스 그리드/타임라인의 작업 행이 어떤 리소스를 참조하는지 찾는 데 사용하는 속성의 이름을 변경합니다

@signature: resource_attribute: string

### Example

~~~jsx
gantt.config.resource_attribute = "data-resource-id";
~~~

**Default value:** data-resource-id

### Details

![resource_attribute](/img/resource_attribute.png)

:::note
각 리소스 요소에는 DOM 요소가 어느 리소스에 연결되어 있는지 찾는 데 사용되는 *data-resource-id* 속성이 있습니다. 
:::

:::note
sample: [Resourse_attribute ](https://snippet.dhtmlx.com/5/66401acf0)
:::
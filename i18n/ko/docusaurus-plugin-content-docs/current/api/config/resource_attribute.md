---
sidebar_label: resource_attribute
title: resource_attribute config
description: "Gantt가 리소스 그리드나 타임라인에서 작업 행이 어떤 리소스에 해당하는지 식별하기 위해 사용하는 속성 이름을 정의합니다."
---

# resource_attribute
:::info
이 기능은 PRO 에디션에서만 사용할 수 있습니다. 
:::
### Description

@short: Gantt가 리소스 그리드나 타임라인에서 작업 행이 어떤 리소스에 해당하는지 식별하기 위해 사용하는 속성 이름을 정의합니다.

@signature: resource_attribute: string

### Example

~~~jsx
gantt.config.resource_attribute = "data-resource-id";
~~~

**Default value:** data-resource-id

### Details


:::note
 각 리소스 요소는 *data-resource-id* 속성을 포함하며, 이는 DOM 요소를 해당 리소스와 연결합니다. 
:::


![resource_attribute](/img/resource_attribute.png)<br>
:::note

**Related example:** [Resourse_attribute](https://snippet.dhtmlx.com/5/66401acf0)

:::

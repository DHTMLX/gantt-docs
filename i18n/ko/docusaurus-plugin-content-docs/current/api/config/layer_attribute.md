---
sidebar_label: layer_attribute
title: layer_attribute 설정
description: "태스크 레이어의 DOM 요소 속성 이름을 설정합니다"
---

# layer_attribute

:::info
이 기능은 PRO 에디션에서만 사용할 수 있습니다.
:::

### Description

@short: 태스크 레이어의 DOM 요소 속성 이름을 설정합니다

@signature: layer_attribute: string

### Example

~~~jsx
gantt.config.layer_attribute = "tasklayer";
~~~

**Default value:** "data-layer"

### Related samples
- [Displaying deadlines](https://docs.dhtmlx.com/gantt/samples/04_customization/14_deadline.html)
- [Display baselines](https://docs.dhtmlx.com/gantt/samples/04_customization/15_baselines.html)


### Related API
- [addTaskLayer](api/method/addtasklayer.md)
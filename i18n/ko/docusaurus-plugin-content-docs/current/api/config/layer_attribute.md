---
sidebar_label: layer_attribute
title: layer_attribute config
description: "작업 레이어의 DOM 요소에 대한 attribute 이름을 정의합니다."
---

# layer_attribute
:::info
이 기능은 PRO 에디션에서만 사용할 수 있습니다. 
:::
### Description

@short: 작업 레이어의 DOM 요소에 대한 attribute 이름을 정의합니다.

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


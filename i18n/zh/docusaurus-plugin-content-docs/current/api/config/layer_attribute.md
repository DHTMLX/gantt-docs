---
sidebar_label: layer_attribute
title: layer_attribute 配置
description: "设置任务图层的 DOM 元素属性名称"
---

# layer_attribute

:::info
 此功能仅限于 PRO 版本使用。 
:::

### Description

@short: 设置任务图层的 DOM 元素属性名称

@signature: layer_attribute: string

### Example

~~~jsx
gantt.config.layer_attribute = "tasklayer";
~~~

**默认值：** "data-layer"

### Related samples
- [显示截止日期](https://docs.dhtmlx.com/gantt/samples/04_customization/14_deadline.html)
- [显示基线](https://docs.dhtmlx.com/gantt/samples/04_customization/15_baselines.html)


### Related API
- [addTaskLayer](api/method/addtasklayer.md)
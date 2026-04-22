---
sidebar_label: getLabel
title: getLabel 方法
description: "在 lightbox 中获取 select 控件的标签"
---

# getLabel

### Description

@short: 在 lightbox 中获取 select 控件的标签

@signature: getLabel: (property: string, key: string | number) =\> string

### Parameters

- `property` - (required) *string* - 控件映射到的数据属性的名称
- `key` - (required) *string | number* - 选项的 id。此参数与任务的数据属性进行比较，以将该下拉选项分配给任务

### Returns
- ` label` - (string) - lightbox 中 select 控件的标签

### Example

~~~jsx
gantt.config.lightbox.sections=[
    {name:"custom", type:"select", map_to:"unit_id", options:[
        {key:1, label:"James Smith"}, 
        {key:2, label:"John Williams"}]}
];

const holder2 = gantt.getLabel("unit_id", 2);// ->"John Williams"
~~~

### Details

:::note
该方法仅应用于 lightbox 中的 'select' 控件，以获取特定选项的标签。
:::
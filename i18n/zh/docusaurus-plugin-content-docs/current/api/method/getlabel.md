---
sidebar_label: getLabel
title: getLabel method
description: "获取 lightbox 中 select 控件的标签"
---

# getLabel

### Description

@short: 获取 lightbox 中 select 控件的标签

@signature: getLabel: (property: string, key: string | number) =\> string

### Parameters

- `property` - (required) *string* - 控件对应的数据属性名称  
- `key` - (required) *string | number* -    选项的标识符。该值会与任务的数据属性匹配，<br>将 select 的选项与任务关联

### Returns
- ` label` - (string) - 与 lightbox 中 select 控件关联的标签

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
  
此方法专门用于 lightbox 中的 'select' 控件，用于获取指定选项的标签。 
 
:::

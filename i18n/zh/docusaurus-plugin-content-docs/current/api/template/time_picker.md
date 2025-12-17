---
sidebar_label: time_picker
title: time_picker template
description: "定义 lightbox 中下拉时间选择器使用的格式"
---

# time_picker

### Description

@short: 定义 lightbox 中下拉时间选择器使用的格式

@signature: time_picker: string

### Parameters

- `date` - (required) *Date* - 需要格式化的日期

### Returns
- ` text` - (string) - 将在 gantt 中显示的 html 内容

### Example

~~~jsx
gantt.config.lightbox.sections = [
    {name:"description", height:38, map_to:"text", type:"textarea", focus:true},
    {name:"time",type:"duration",map_to:"auto",time_format:["%d","%m","%Y","%H:%i"]}
];

gantt.templates.time_picker = function(date){
    return gantt.date.date_to_str(gantt.config.time_picker)(date);
};
~~~

### Related Guides
- [Lightbox 的模板](guides/lightbox-templates.md)

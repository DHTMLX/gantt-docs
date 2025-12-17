---
sidebar_label: time_picker
title: time_picker template
description: "라이트박스 내 드롭다운 시간 선택기에 사용되는 형식을 정의합니다."
---

# time_picker

### Description

@short: 라이트박스 내 드롭다운 시간 선택기에 사용되는 형식을 정의합니다.

@signature: time_picker: string

### Parameters

- `date` - (required) *Date* - 형식을 지정해야 하는 날짜입니다.

### Returns
- ` text` - (string) - gantt에 표시될 html 콘텐츠입니다.

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
- [라이트박스의 템플릿](guides/lightbox-templates.md)

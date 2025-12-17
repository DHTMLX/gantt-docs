---
sidebar_label: scale_row_class
title: scale_row_class template
description: "타임 스케일에 적용되는 CSS 클래스를 정의합니다."
---

# scale_row_class

### Description

@short: 타임 스케일에 적용되는 CSS 클래스를 정의합니다.

@signature: scale_row_class: (scale: Scale) =\> string | void;

### Parameters

- `scale` - (required) *Scale* - 스케일 구성 객체

### Returns
- ` text` - (string | void) - 해당 항목에 할당된 CSS 클래스

### Example

~~~jsx
<style>
 .day_scale{ background-color: #C3C7D4;}
 .week_scale{ background-color: #E5DFE8;}
 .month_scale{ background-color: #DFE8DF;}
</style>
~~~
~~~js
gantt.templates.scale_row_class = function(scale){
    switch(scale.unit){
        case "day":
        return "day_scale";
           
        case "month":
        return "month_scale";
           
        default:// "week"
           return "week_scale";
    }
}
~~~

### Related API
- [scale_cell_class](api/template/scale_cell_class.md)

### Related Guides
- [타임라인 영역의 템플릿](guides/timeline-templates.md)


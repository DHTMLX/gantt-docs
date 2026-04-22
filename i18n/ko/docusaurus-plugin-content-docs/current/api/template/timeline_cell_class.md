---
sidebar_label: timeline_cell_class
title: timeline_cell_class template
description: "타임라인 영역의 셀에 적용될 CSS 클래스를 지정합니다"
---

# timeline_cell_class

### Description

@short: 타임라인 영역의 셀에 적용될 CSS 클래스를 지정합니다

@signature: timeline_cell_class: (item: any, date: Date) =\> string | void;

### Parameters

- `item` - (필수) *Task | 객체* - 행에 할당된 작업의 객체 또는 자원 객체 중 하나
- `date` - (필수) *Date* - 셀의 날짜

### Returns
- ` text` - (string | void) - 해당 항목에 대한 CSS 클래스

### Example

~~~jsx
<style>
.weekend{ background: #f4f7f4 !important;}
</style>

gantt.templates.timeline_cell_class = function(task,date){
    if(date.getDay()==0||date.getDay()==6){
        return "weekend";
    }
};
~~~

### Related samples
- [주말 하이라이트](https://docs.dhtmlx.com/gantt/samples/04_customization/06_highlight_weekend.html)

### Details

Note that while using [work time calculations](guides/working-time.md), you can use [isWorkTime](api/method/isworktime.md) instead of hardcoded values:

~~~js
gantt.config.work_time = true;

gantt.templates.timeline_cell_class = function(task,date){
    if(!gantt.isWorkTime({task:task, date:date}))
        return "weekend";
};
~~~

### Related API
- [scale_cell_class](api/template/scale_cell_class.md)
- [task_row_class](api/template/task_row_class.md)
- [task_class](api/template/task_class.md)
- [timeline_placeholder](api/config/timeline_placeholder.md)

### Related Guides
- [타임라인 영역의 템플릿](guides/timeline-templates.md)
- [시간 슬롯 하이라이트](guides/highlighting-time-slots.md)
- [작업 시간 계산](guides/working-time.md)
---
sidebar_label: timeline_cell_class
title: timeline_cell_class template
description: "타임라인 영역 내 셀에 적용되는 CSS 클래스를 정의합니다."
---

# timeline_cell_class

### Description

@short: 타임라인 영역 내 셀에 적용되는 CSS 클래스를 정의합니다.

@signature: timeline_cell_class: (item: any, date: Date) =\> string | void;

### Parameters

- `item` - (required) *Task* - | object        행과 연결된 작업 또는 리소스 객체
- `date` - (required) *Date* - 셀의 특정 날짜

### Returns
- ` text` - (string | void) - 주어진 item에 대한 CSS 클래스 이름

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
- [Highlighting weekends](https://docs.dhtmlx.com/gantt/samples/04_customization/06_highlight_weekend.html)

### Details

[work time 계산](guides/working-time.md)을 할 때는 고정 값 대신 [isWorkTime](api/method/isworktime.md)를 사용하는 것이 좋습니다:

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
- [타임 슬롯 하이라이트하기](guides/highlighting-time-slots.md)
- [작업 시간 계산](guides/working-time.md)


---
title: "타임 슬롯 하이라이트하기"
sidebar_label: "타임 슬롯 하이라이트하기"
---

# 타임 슬롯 하이라이트하기

특정 타임 슬롯에 주목시키기 위해 하이라이트할 수 있습니다.

- 타임라인 영역 내 셀을 하이라이트하려면 [timeline_cell_class](api/template/timeline_cell_class.md) 템플릿을 사용하세요.
- 타임라인의 타임 스케일 셀을 하이라이트하려면 [scale_cell_class](api/template/scale_cell_class.md) 템플릿을 사용하세요.

이 템플릿들은 모든 날짜를 순회하며 지정된 CSS 클래스를 해당 셀에 할당하는 함수입니다.

![highlighting_weekends](/img/highlighting_weekends.png)

예를 들어, 주말을 하이라이트하면 스케일을 주 단위로 시각적으로 구분하는 데 도움이 됩니다:

~~~js
<style>
.weekend{ background: #f4f7f4 !important;}
</style>
~~~


~~~js
gantt.templates.scale_cell_class = function(date){
    if(date.getDay()==0||date.getDay()==6){
        return "weekend";
    }
};
gantt.templates.timeline_cell_class = function(task,date){
    if(date.getDay()==0||date.getDay()==6){ 
        return "weekend" ;
    }
};
gantt.init("gantt_here");
~~~

[work time 계산](guides/working-time.md)을 사용하는 경우, 값을 하드코딩하는 대신 [isWorkTime](api/method/isworktime.md)을(를) 사용하는 것이 더 좋습니다:

~~~js
gantt.config.work_time = true;

gantt.templates.scale_cell_class = function(date){
    if(!gantt.isWorkTime(date)){
        return "weekend";
    }
};
gantt.templates.timeline_cell_class = function(task,date){
    if(!gantt.isWorkTime({task:task, date:date})){
        return "weekend" ;
    }
};
gantt.init("gantt_here");
~~~



[Highlighting weekends](https://docs.dhtmlx.com/gantt/samples/04_customization/06_highlight_weekend.html)


:::note
'important' 키워드를 포함하면 CSS 속성이 셀에 의도대로 적용되는 것을 보장합니다.
:::


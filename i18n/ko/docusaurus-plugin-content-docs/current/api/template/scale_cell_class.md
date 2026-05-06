---
sidebar_label: scale_cell_class
title: scale_cell_class 템플릿
description: "타임라인 영역의 시간 눈금 셀에 적용될 CSS 클래스를 지정합니다"
---

# scale_cell_class

### Description

@short: 타임라인 영역의 시간 눈금 셀에 적용될 CSS 클래스를 지정합니다

@signature: scale_cell_class: (date: Date) =\> string | void;

### Parameters

- `date` - (필수) *Date* - 셀의 날짜

### Returns
- `text` - (string | void) - 해당 항목의 CSS 클래스

### Example

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
~~~

### Related samples
- [Highlighting weekends](https://docs.dhtmlx.com/gantt/samples/04_customization/06_highlight_weekend.html)

### Details

참고: [work time calculations](guides/working-time.md)을 사용할 때, 하드코딩된 값 대신 [isWorkTime](api/method/isworktime.md)을 사용할 수 있습니다:

~~~js
gantt.config.work_time = true;

gantt.templates.scale_cell_class = function(date){
       if(!gantt.isWorkTime(date))
          return true;
};
~~~

여러 스케일을 [gantt.config.scales](api/config/scales.md) 속성으로 지정한 경우, 템플릿은 첫 번째 스케일에만 적용됩니다. 다른 스케일의 셀에 CSS 클래스를 지정하려면 [gantt.config.scales](api/config/scales.md)의 css 속성을 사용하세요:

~~~js
gantt.config.scales = [
    { unit: "month", step: 1, date: "%F" },
    { unit: "week", step: 1, date: "%W" },
    {
        unit: "day", step: 1, date: "%d", css: function (date) { /*!*/
            if (!gantt.isWorkTime({ date: date })) { /*!*/
                return "weekend"; /*!*/
            } /*!*/
        } /*!*/
    },
];
~~~

### Related API
- [scale_row_class](api/template/scale_row_class.md)
- [timeline_cell_class](api/template/timeline_cell_class.md)

### Related Guides
- [타임라인 영역의 템플릿](guides/timeline-templates.md)
- [스케일에서 시간 단위 숨기기](guides/custom-scale.md)
- [타임 슬롯 하이라이트하기](guides/highlighting-time-slots.md)
- [작업 시간 계산](guides/working-time.md)
- [스케일 설정하기](guides/configuring-time-scale.md#styling)


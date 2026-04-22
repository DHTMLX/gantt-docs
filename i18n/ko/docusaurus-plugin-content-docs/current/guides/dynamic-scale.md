---
title: "스케일 설정의 동적 변경"
sidebar_label: "스케일 설정의 동적 변경"
---

# 스케일 설정의 동적 변경

실시간으로 스케일을 변경하면 Gantt 차트를 더 유연하게 만들어 사용자의 필요에 맞출 수 있습니다. 

예를 들어, 관리자가 1년짜리 프로젝트를 가지고 있습니다. 프로젝트의 전체 그림을 파악하려면 월 단위로 보는 것이 더 좋습니다. 그러나 특정 작업의 세부 정보를 알아내려면, 주 단위나 일 단위로 계획하는 것이 더 적합합니다.

어떤 단위를 선택할까요? 모두 가능합니다! 그리고 사용자가 적용할 단위를 직접 선택할 수 있는 가능성을 제공합니다. 


## 구성 설정

dhtmlxGantt가 초기화된 후에도 스케일의 설정(예: step, sub-scale)을 동적으로 변경하려면 다음 방법을 사용합니다:

1. 관련 구성 옵션의 새 값을 설정합니다.

 *예를 들어, 스케일의 단위를 "month"에서 "day"로 변경하려면 [scales](api/config/scales.md) 속성의 **unit** 프로퍼티를 사용합니다.* 
2. 필요한 경우 관련 템플릿을 재정의합니다. 

 *예를 들어, [highlight weekends in the scale](guides/highlighting-time-slots.md)처럼 주말을 강조하려면 [scale_cell_class](api/template/scale_cell_class.md) 템플릿을 사용합니다.* 
2. [render](api/method/render.md) 메서드를 사용하여 Gantt 차트를 다시 그립니다.

**스케일 구성의 동적 변경**
~~~js
gantt.config.scales = [
    {unit: "month", step: 1, format: "%F, %Y"},
];

gantt.init("gantt_here");


gantt.config.scales = [                            /*!*/
    {unit: "day", step: 1, format: "%d %M, %D"} /*!*/
];                                                /*!*/
gantt.templates.scale_cell_class = function(date){/*!*/
    if(date.getDay()==0||date.getDay()==6){/*!*/
        return "weekend";/*!*/
    }/*!*/
};/*!*/
gantt.render(); /*!*/
~~~
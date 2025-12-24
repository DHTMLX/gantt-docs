---
title: "스케일 설정의 동적 변경"
sidebar_label: "스케일 설정의 동적 변경"
---

# 스케일 설정의 동적 변경  


실시간으로 스케일을 조정하면 Gantt 차트가 더 유연해져 다양한 사용자 요구에 맞출 수 있습니다.

예를 들어, 1년짜리 프로젝트를 진행하는 관리자는 전체 일정을 한눈에 보기 위해 월 단위로 일정을 보고 싶어할 수 있습니다. 그러나 특정 작업의 세부 사항에 집중할 때는 주간 또는 일간 스케일로 전환하면 더 자세한 정보를 얻을 수 있습니다.

굳이 하나만 선택할 필요가 있을까요? 모든 옵션을 제공하고 사용자가 가장 적합한 스케일을 직접 선택하도록 하는 것이 가장 좋습니다.


## 설정 구성

dhtmlxGantt가 초기화된 후 스케일의 설정을 동적으로 업데이트하려면 다음 단계를 따르세요:

1. 관련 구성 옵션에 새 값을 할당합니다.

 *예를 들어, 스케일의 단위를 "month"에서 "day"로 변경하려면 **unit** 속성을 [scales](api/config/scales.md) 설정에서 업데이트하세요.*
2. 필요한 경우 관련 템플릿을 수정합니다.

 *예를 들어, [스케일에서 주말을 강조 표시](guides/highlighting-time-slots.md)하려면 [scale_cell_class](api/template/scale_cell_class.md) 템플릿을 수정하세요.*
2. [render](api/method/render.md) 메서드를 사용해 Gantt 차트를 다시 그립니다.

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


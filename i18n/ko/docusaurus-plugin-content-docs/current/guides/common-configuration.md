---
title: "Configuration"
sidebar_label: "Configuration"
---

# Configuration

원하는 Gantt 차트의 외관을 얻기 위해 dhtmlxGantt는 두 가지 주요 객체를 제공합니다:

- [gantt.config](api/overview/properties-overview.md) - 날짜, 스케일, 컨트롤 등과 관련된 구성 옵션을 포함합니다.
- [gantt.templates](api/overview/templates-overview.md) - Gantt 차트에 표시되는 날짜와 레이블의 포맷팅 템플릿을 포함합니다.

## 'gantt.config' 객체 {#ganttconfigobject}

모든 구성 설정은 **gantt.config** 객체 내에서 지정됩니다.

옵션을 적용하려면, 이 문서에서 설명한 대로 해당 값을 할당하면 됩니다.

구성 옵션은 dhtmlxGantt 초기화 코드 이전에 설정해야 한다는 점을 기억하세요.

~~~js
gantt.scales = [
    { unit: "year", step: 1, format: "%Y" }
];

gantt.init("gantt_here");
~~~

**gantt.config**에서 사용할 수 있는 모든 속성의 전체 목록은 ["Gantt API:Properties"](api/overview/properties-overview.md)에서 확인할 수 있습니다.


[Month view](https://docs.dhtmlx.com/gantt/samples/03_scales/02_month_days.html)


## 'gantt.templates' 객체

템플릿을 사용하면 날짜와 레이블이 표시되는 방식을 사용자 정의할 수 있습니다.

템플릿을 정의하려면, 문서에 나온 예시처럼 값을 할당하세요. 템플릿 역시 dhtmlxGantt를 초기화하기 전에 선언해야 합니다.

~~~js
gantt.templates.task_text = function(start, end, task){
    return "<b>Text:</b> " + task.text + ",<b> Holders:</b> " + task.users;
};
gantt.init("gantt_here");
~~~

![gantt_templates](/img/gantt_templates.png)

사용 가능한 템플릿의 전체 목록은 [Gantt API:Templates](api/overview/templates-overview.md) 섹션에서 확인할 수 있습니다.


[Styling task bars with events](https://docs.dhtmlx.com/gantt/samples/04_customization/08_templates.html)

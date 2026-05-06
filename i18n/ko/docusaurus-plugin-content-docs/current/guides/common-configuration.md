---
title: "Configuration"
sidebar_label: "Configuration"
---

# 구성

Gantt 차트에서 원하는 모양을 얻기 위해 dhtmlxGantt는 2개의 객체를 제공합니다:

- [gantt.config](api/overview/properties-overview.md) - 날짜, 눈금, 컨트롤 등에 대한 구성 옵션.
- [gantt.templates](api/overview/templates-overview.md) - Gantt 차트에서 사용되는 날짜 및 레이블의 포맷 템플릿.

## 'gantt.config' object {#ganttconfigobject}

모든 구성 옵션은 **gantt.config** 객체에 선언됩니다. 

원하는 옵션을 설정하려면 이 문서에 명시된 대로 작성하면 됩니다.
  
주의: 구성 옵션은 dhtmlxGantt 초기화가 있는 코드 행 앞에 위치해야 합니다.


~~~js
gantt.scales = [
    { unit: "year", step: 1, format: "%Y" }
];

gantt.init("gantt_here");
~~~

전체 **gantt.config** 속성 목록은 ["Gantt API:Properties"](api/overview/properties-overview.md) 섹션에서 확인할 수 있습니다.


**관련 예제**: [월 보기](https://docs.dhtmlx.com/gantt/samples/03_scales/02_month_days.html)


## 'gantt.templates' object {#gantttemplatesobject}

템플릿은 날짜와 레이블의 표시를 변경하는 데 사용할 수 있습니다.

템플릿을 정의하려면 이 문서에 명시된 대로 작성하면 됩니다. 템플릿 정의는 dhtmlxGantt 초기화가 있는 코드 라인 앞에 위치해야 한다는 점을 기억하세요.


~~~js
gantt.templates.task_text =
    (start, end, task) => `<b>Text:</b> ${task.text},<b> Holders:</b> ${task.users}`;

gantt.init("gantt_here");
~~~


![gantt_templates](/img/gantt_templates.png)

사용 가능한 템플릿의 전체 목록은 [Gantt API:Templates](api/overview/templates-overview.md) 섹션에서 확인할 수 있습니다. 


**관련 샘플**: [이벤트로 작업 막대 스타일링](https://docs.dhtmlx.com/gantt/samples/04_customization/08_templates.html)
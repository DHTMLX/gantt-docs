---
title: "제약 제어"  
sidebar_label: "제약 제어"  
---

# 제약 제어

:::info  
이 기능은 PRO Edition에서만 이용 가능합니다.  
:::

간트 차트 작업의 시간 제약을 설정하는 복합 컨트롤입니다.  

![제약 컨트롤](/img/constraint_control.png)

~~~js
gantt.config.lightbox.sections = [
    { name:"description", height:38, map_to:"text", type:"textarea", focus:true},
    { name:"constraint", type:"constraint" },  /*!*/
    { name:"time", type:"duration", map_to:"auto" }
];
~~~

[프로젝트 시작 및 제약 조건으로 자동 스케줄링](https://docs.dhtmlx.com/gantt/samples/02_extensions/19_constraints_scheduling.html)


## Initialization

To add the **constraint** control to the lightbox, follow the steps below:

다음 단계에 따라 lightbox에 **constraint** 컨트롤을 추가합니다:

1. 라이트박스 구성에 섹션을 추가합니다:

~~~js
gantt.config.lightbox.sections = [
    { name:"description", height:38, map_to:"text", type:"textarea", focus:true},
    { name:"constraint", type:"constraint" },  /*!*/
    { name:"time", type:"duration", map_to:"auto" }
];
~~~

2. 섹션에 레이블을 설정합니다:

~~~js
gantt.locale.labels.section_constraint = "Constraint";
~~~

[프로젝트 시작 및 제약 조건으로 자동 스케줄링](https://docs.dhtmlx.com/gantt/samples/02_extensions/19_constraints_scheduling.html)


## Properties

다음 속성은 주로 중요하고 **constraint** 컨트롤에 일반적으로 설정됩니다(전체 목록은 [여기](api/config/lightbox.md)를 참조하십시오):

- **name** - (*string*) 섹션 이름  
- **type** - (*string*) [section control](guides/default-edit-form.md#lightboxcontrols)의 유형
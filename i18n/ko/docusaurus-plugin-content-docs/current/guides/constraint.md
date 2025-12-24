---
title: "제약 컨트롤"
sidebar_label: "제약 컨트롤"
---

# 제약 컨트롤


:::info
이 기능은 PRO Edition에만 포함되어 있습니다.
:::

이 컨트롤은 [간트 작업의 시간 제약](guides/auto-scheduling.md#timeconstraintsfortasks)을 지정하기 위해 설계된 특수 컨트롤입니다.

![Constraint control](/img/constraint_control.png)

~~~js
gantt.config.lightbox.sections = [
    { name:"description", height:38, map_to:"text", type:"textarea", focus:true},
    { name:"constraint", type:"constraint" },  /*!*/
    { name:"time", type:"duration", map_to:"auto" }
];
~~~


[Auto-Schedule From Project Start & Constraints](https://docs.dhtmlx.com/gantt/samples/02_extensions/19_constraints_scheduling.html)


## 초기화


**constraint** 컨트롤을 라이트박스에 추가하려면 다음 단계를 따르세요:

1. 라이트박스 설정에 섹션을 추가합니다:

~~~js
gantt.config.lightbox.sections = [
    { name:"description", height:38, map_to:"text", type:"textarea", focus:true},
    { name:"constraint", type:"constraint" },  /*!*/
    { name:"time", type:"duration", map_to:"auto" }
];
~~~

2. 섹션에 대한 레이블을 정의합니다:

~~~js
gantt.locale.labels.section_constraint = "Constraint";
~~~


[Auto-Schedule From Project Start & Constraints](https://docs.dhtmlx.com/gantt/samples/02_extensions/19_constraints_scheduling.html)


## 속성


**constraint** 컨트롤에 일반적으로 사용되는 주요 속성은 다음과 같습니다 (전체 목록은 [여기](api/config/lightbox.md)에서 확인할 수 있습니다):

- **name** - (*string*) 섹션 이름을 식별합니다
- **type** - (*string*) [section control](guides/default-edit-form.md#lightboxcontrols)의 타입을 지정합니다




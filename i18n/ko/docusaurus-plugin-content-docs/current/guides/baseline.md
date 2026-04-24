--- 
title: "기준선 제어"
sidebar_label: "기준선 제어"
---

# 기준선 제어

:::info
이 기능은 PRO 에디션에서만 사용할 수 있습니다.
:::

작업의 시작 날짜와 기간(일)을 지정하여 작업의 [baselines](guides/inbuilt-baselines.md)를 설정하기 위한 선택자 모음.

~~~js
gantt.config.lightbox.sections = [
    { name: "description", height: 38, map_to: "text", type: "textarea", focus: true },
    { name: "time", type: "duration", map_to: "auto" },
    { name: "baselines", height: 100, type: "baselines", map_to: "baselines" }, /*!*/
];
~~~

[Display baselines](https://docs.dhtmlx.com/gantt/samples/04_customization/15_baselines.html)


## Initialization

라이트박스에 **baselines** 제어를 추가하려면 아래 단계를 따르세요:

1) 라이트박스 구성에 섹션 추가:

~~~js
gantt.config.lightbox.sections = [
    { name:"description", height:38, map_to:"text", type:"textarea", focus:true},
    { name:"baselines", type:"baselines" },  /*!*/
    { name:"time", type:"duration", map_to:"auto" }
];
~~~

2) 섹션의 레이블 설정:

~~~js
gantt.locale.labels.section_baselines = "Baselines";
~~~

## Properties

다음 속성은 주로 중요하며 **baselines** 제어에 대해 일반적으로 설정됩니다(전체 목록은 [여기](api/config/lightbox.md)에서 확인):

- **name** - (*string*) 섹션 이름 
- **height** - (*number*) 섹션 높이
- **map_to** - (*string*) 이를 "baselines"로 설정
- **formatter** - (object) [durationFormatter](guides/working-time.md#taskdurationindecimalformat) 객체의 인스턴스
- **type** - (*string*) [section control](guides/default-edit-form.md#lightboxcontrols)의 유형
- **focus** - (*boolean*) 값이 *true*로 설정되면 라이트박스를 열 때 해당 섹션에 포커스가 가짐
- **readonly** - (*boolean*) 값을 "true"로 설정하면 해당 섹션은 읽기 전용이 됨
- **year_range** - (*array,number*) 연도 선택기의 범위를 설정합니다. 범위는 2가지 방법으로 설정할 수 있습니다: 
    - *year_range: [2005, 2025]* - 2005년부터 2025년까지의 기간 
    - *year_range: 10*  - 현재 연도에서 -10년에서 +10년까지의 기간
- **single_date** - (*boolean*) 값을 "true"로 설정하면 섹션에 오직 *시작 날짜* 선택기만 표시됩니다. 편집된 작업은 시작 날짜로만 지정되고 지속 기간이 0입니다. 이는 [milestones](guides/task-types.md#milestones)에만 해당됩니다
- **time_format** - (*string*) 날짜-시간 선택기의 순서를 설정

## Localization

다음 요소의 레이블을 **baselines** 제어에 대해 지역화할 수 있습니다:

- **gantt.locale.labels.baselines_section_placeholder** - baselines가 추가되지 않았을 때 표시되는 텍스트
- **gantt.locale.labels.baselines_remove_button** - baselines를 제거하는 버튼의 텍스트 (*"Remove"* 기본값)
- **gantt.locale.labels.baselines_add_button** - 새로운 baselines를 추가하는 버튼의 텍스트 (*"Add Baseline"* 기본값)
- **gantt.locale.labels.baselines_remove_all_button** - 모든 baselines를 제거하는 버튼의 텍스트 (*"Remove All"* 기본값)
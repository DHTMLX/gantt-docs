---
title: "베이스라인 컨트롤"
sidebar_label: "베이스라인 컨트롤"
---

# 베이스라인 컨트롤


:::info
이 기능은 PRO 에디션에만 포함되어 있습니다.
:::

이 컨트롤은 작업의 시작 날짜와 기간(일 단위)을 정의하여 [베이스라인](guides/inbuilt-baselines.md)을 설정할 수 있는 셀렉터 모음입니다.

~~~js
gantt.config.lightbox.sections = [
    { name: "description", height: 38, map_to: "text", type: "textarea", focus: true },
    { name: "time", type: "duration", map_to: "auto" },
    { name: "baselines", height: 100, type: "baselines", map_to: "baselines" }, /*!*/
];
~~~


[Display baselines](https://docs.dhtmlx.com/gantt/samples/04_customization/15_baselines.html)



## 초기화


**baselines** 컨트롤을 라이트박스에 포함시키려면 다음 단계를 따라주세요:

1) 라이트박스 설정에 섹션을 추가합니다:

~~~js
gantt.config.lightbox.sections = [
    { name:"description", height:38, map_to:"text", type:"textarea", focus:true},
    { name:"baselines", type:"baselines" },  /*!*/
    { name:"time", type:"duration", map_to:"auto" }
];
~~~
    
2) 이 섹션에 대한 라벨을 정의합니다:

~~~js
gantt.locale.labels.section_baselines = "Baselines";
~~~

## 속성


**baselines** 컨트롤에서 주로 사용되는 주요 속성들은 다음과 같습니다 (전체 목록은 [여기](api/config/lightbox.md)에서 확인할 수 있습니다):

- **name** - (*string*) 섹션의 식별자
- **height** - (*number*) 섹션의 높이
- **map_to** - (*string*) "baselines"로 설정해야 함
- **formatter** - (object) [durationFormatter](guides/working-time.md#taskdurationindecimalformat) 객체의 인스턴스
- **type** - (*string*) [섹션 컨트롤](guides/default-edit-form.md#lightboxcontrols)의 타입
- **focus** - (*boolean*) true로 설정하면 라이트박스가 열릴 때 해당 섹션에 포커스가 이동함
- **readonly** - (*boolean*) true로 설정하면 섹션이 읽기 전용이 됨
- **year_range** - (*array,number*) 연도 선택기의 범위를 정의함. 두 가지 방식으로 설정 가능: 
    - *year_range: [2005, 2025]* - 2005년부터 2025년까지 
    - *year_range: 10*  - (현재 연도 - 10)부터 (현재 연도 + 10)까지
- **single_date** - (*boolean*) true로 설정하면 *시작 날짜* 선택기만 표시됨. 이렇게 편집된 작업은 기간이 0이 되며, 주로 [마일스톤](guides/task-types.md#milestones)에 유용함
- **time_format** - (*string*) 날짜-시간 선택기의 순서를 지정

## 지역화


**baselines** 컨트롤의 다음 부분에 대한 라벨을 사용자 지정할 수 있습니다:

- **gantt.locale.labels.baselines_section_placeholder** - 베이스라인이 추가되지 않았을 때 표시되는 텍스트
- **gantt.locale.labels.baselines_remove_button** - 베이스라인을 삭제하는 버튼의 라벨 (기본값: *"Remove"*)
- **gantt.locale.labels.baselines_add_button** - 새로운 베이스라인을 추가하는 버튼의 라벨 (기본값: *"Add Baseline"*)
- **gantt.locale.labels.baselines_remove_all_button** - 모든 베이스라인을 삭제하는 버튼의 라벨 (기본값: *"Remove All"*)


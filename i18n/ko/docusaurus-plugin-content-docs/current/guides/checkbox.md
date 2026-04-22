---
title: "체크박스 제어"
sidebar_label: "체크박스 제어"
---

# 체크박스 제어

두 상태의 체크박스. 이 컨트롤은 옵션 하나 또는 여러 값의 켜기/끄기를 전환하는 데 사용됩니다.

예를 들어, 다음에 유용합니다:

- [작업에 리소스 할당하기](guides/resource-management.md)

![체크박스 컨트롤](/img/checkbox_control.png)

[체크박스 컨트롤](https://docs.dhtmlx.com/gantt/samples/05_lightbox/02_checkbox.html)

- [분할 작업의 분할 모드와 트리 모드 간 전환](guides/split-tasks.md)

![분할 작업 체크박스](/img/split_task_checkbox.png)

~~~js
gantt.config.lightbox.project_sections = [
    {name: "description", height: 70, map_to: "text", type: "textarea", focus: true},
    {name: "split", type:"checkbox", map_to: "render", options:[    /*!*/
        {key:"split", label:"Split Task"}                            /*!*/                        
    ]},                                                                /*!*/
    {name: "time", type: "duration", readonly: true, map_to: "auto"}
];
~~~

[분할 작업](https://docs.dhtmlx.com/gantt/samples/04_customization/11_split_task.html)

## Initialization

Lightbox에 **checkbox** 컨트롤을 추가하려면 아래 단계를 따릅니다:

1) Lightbox 구성에 섹션 추가:

~~~js
var opts = [
    {key:"split", label:"Split Task"}                                        
];

gantt.config.lightbox.sections = [
    {name: "description", height: 70, map_to: "text", type: "textarea", focus: true},
    {name: "split", type:"checkbox", map_to: "render", options:opts},            /*!*/
    {name: "time", type: "duration", readonly: true, map_to: "auto"}
];
~~~

2) 섹션의 레이블 설정:

~~~js
gantt.locale.labels.section_split = "Display";
~~~

[분할 작업](https://docs.dhtmlx.com/gantt/samples/04_customization/11_split_task.html)

## Properties

다음 속성은 주로 중요하고 일반적으로 **checkbox** 컨트롤에 대해 설정됩니다(전체 목록은 [여기](api/config/lightbox.md)를 참조하세요):

- **name** - (*string*) 섹션 이름
- **map_to** - (*string*) 섹션에 매핑될 데이터 속성의 이름
- **type** - (*string*) [섹션 컨트롤의 유형](guides/default-edit-form.md#lightboxcontrols)
- **options** - (*array*) 객체 배열. 컨트롤의 선택 옵션을 정의합니다 (*선택, 체크박스 및 라디오 컨트롤에 사용됨*). 배열의 각 객체는 단일 옵션을 지정하며 다음 속성을 가집니다:
    - **key** - (*string*) 옵션 ID. 이 속성은 작업 데이터 속성과 비교되어 작업에 옵션을 할당합니다
    - **label** - (*string*) 옵션 레이블
- **focus** - (*boolean*) true로 설정되면, 라이트박스를 열 때 해당 섹션에 포커스가 설정됩니다
- **default_value** - (*any*) 섹션 컨트롤의 기본값. 입력 값이 정의되지 않은 경우에만 적용됩니다

## 데이터로 컨트롤 채우기

일반적으로 **checkbox** 컨트롤의 값을 설정하려면 [options](api/config/lightbox.md) 매개변수를 사용합니다:

~~~js
gantt.config.lightbox.sections = [
    {name: "split", type:"checkbox", map_to: "render", options:[
        {key:"split", label:"Split Task"}
    ]}                                                                
];
~~~

[options](api/config/lightbox.md) 매개변수의 항목에는 2개의 필수 속성이 있습니다:

- **key** - 옵션 ID
- **label** - 옵션 레이블
---
title: "Typeselect 컨트롤"
sidebar_label: "Typeselect 컨트롤"
---

Typeselect 컨트롤
======================

:::info
이 기능은 PRO Edition에서만 사용할 수 있습니다.
:::

이 컨트롤은 [작업 유형 변경](guides/task-types.md)을 위해 설계된 셀렉트 박스입니다.

 옵션은 
[types](api/config/types.md) 객체에서 가져오며, 기본 onchange 핸들러를 사용합니다. 그 외에는 [Select Control](guides/select.md)에서 설명된 컨트롤과 동일하게 동작합니다.
 

![typeselect_control](/img/typeselect_control.png)

~~~js
gantt.config.lightbox.sections = [
    {name:"description", height:38, map_to:"text", type:"textarea", focus:true},
    {name: "type", type: "typeselect", map_to: "type"},                             /*!*/
    {name: "time", height: 72, type: "duration", map_to: "auto"}
];
~~~


[Projects and milestones](https://docs.dhtmlx.com/gantt/samples/01_initialization/16_projects_and_milestones.html)



초기화
---------------------

**typeselect** 컨트롤을 lightbox에 포함하려면, 다음과 같이 lightbox 설정에 섹션을 추가하세요:

~~~js
gantt.config.lightbox.sections = [
    {name:"description", height:38, map_to:"text", type:"textarea",focus:true},
    {name: "type", type: "typeselect", map_to: "type"},                             /*!*/
    {name: "time", height: 72, type: "duration", map_to: "auto"}
];
~~~


[Projects and milestones](https://docs.dhtmlx.com/gantt/samples/01_initialization/16_projects_and_milestones.html)


- 각 작업 유형마다 [개별 lightbox](guides/task-types.md#specificlightboxpertasktype)를 가질 수 있습니다. 새로운 작업 유형을 생성하고, 해당 유형을 위한 맞춤 lightbox 레이아웃을 정의할 수 있습니다.
- 사용자가 이 컨트롤을 이용해 [작업 유형](guides/task-types.md)을 변경하면, lightbox 구조가 선택된 유형에 맞게 업데이트됩니다.
- 컨트롤은 [types](api/config/types.md) 객체에서 옵션을 가져오며, 기본 onchange 핸들러를 사용합니다.
- **name="type"**인 섹션에는 기본적으로 "Type"이라는 레이블이 제공됩니다. 이 레이블을 사용자 정의하려면, 다음 코드를 사용하세요:

~~~js
gantt.locale.labels.section_type = "섹션에 대한 새로운 레이블";
~~~
    

속성
----------------

**typeselect** 컨트롤에서 일반적으로 사용하는 주요 속성은 다음과 같습니다. (전체 목록은 [여기](api/config/lightbox.md)에서 확인하세요):

- **name** - (*string*) 섹션의 이름 
- **height** - (*number*) 섹션의 높이
- **map_to** - (*string*) 섹션이 매핑되는 데이터 속성
- **type** - (*string*) [섹션 컨트롤의 유형](guides/default-edit-form.md#lightboxcontrols)
- **focus** - (*boolean*) *true*로 설정하면 lightbox가 열릴 때 해당 섹션에 포커스가 이동합니다
- **filter** - (*function*) 작업 유형을 필터링하는 함수로, 유형 이름을 인자로 받습니다


---
title: "타입선택 컨트롤"
sidebar_label: "타입선택 컨트롤"
---

# 타입선택 컨트롤

:::info
이 기능은 PRO 에디션에서만 사용할 수 있습니다.
:::

작업의 [타입](guides/task-types.md)을 변경하기 위한 선택 상자입니다. 

 컨트롤은 [types](api/config/types.md) 객체에서 옵션을 로드하며 기본 onchange 핸들러를 가집니다. 나머지 내용은 [Select Control](guides/select.md)와 동일합니다.
 

![typeselect_control](/img/typeselect_control.png)

~~~js
gantt.config.lightbox.sections = [
    {name:"description", height:38, map_to:"text", type:"textarea", focus:true},
    {name: "type", type: "typeselect", map_to: "type"},                             /*!*/
    {name: "time", height: 72, type: "duration", map_to: "auto"}
];
~~~


[프로젝트 및 마일스톤](https://docs.dhtmlx.com/gantt/samples/01_initialization/16_projects_and_milestones.html)


## 초기화

라이트박스에 **typeselect** 컨트롤을 추가하려면, 아래와 같이 lightbox 구성에 섹션을 추가하면 됩니다:

~~~js
gantt.config.lightbox.sections = [
    {name:"description", height:38, map_to:"text", type:"textarea",focus:true},
    {name: "type", type: "typeselect", map_to: "type"},                             /*!*/
    {name: "time", height: 72, type: "duration", map_to: "auto"}
];
~~~


[프로젝트 및 마일스톤](https://docs.dhtmlx.com/gantt/samples/01_initialization/16_projects_and_milestones.html)


- [각 작업 타입마다 고유한 라이트박스가 있습니다](guides/task-types.md#specificlightboxpertasktype). 이 타입에 대해 고유한 라이트박스 구조를 만들고 정의할 수 있습니다.
- 컨트롤을 통해 사용자가 [작업의 타입](guides/task-types.md)을 변경하면, 선택된 값에 따라 라이트박스 구조가 새로 고쳐집니다. 
- 컨트롤은 [types](api/config/types.md) 객체에서 옵션을 로드하며 기본 onchange 핸들러를 가집니다.
- **name="type"**인 섹션은 이미 "Type"으로 레이블이 지정되어 있습니다. 섹션의 레이블을 다르게 설정하려면 아래 코드를 사용합니다: 

~~~js
gantt.locale.labels.section_type = "New label for the section";
~~~
  

## 속성

다음 속성은 주로 중요하며 **typeselect** 컨트롤에 일반적으로 설정됩니다(전체 목록은 [여기](api/config/lightbox.md)를 참조하십시오):

- **name** - (*string*) 섹션 이름
- **height** - (*number*) 섹션 높이
- **map_to** - (*string*) 섹션에 매핑될 데이터 속성의 이름
- **type** - (*string*) [섹션 컨트롤의 유형](guides/default-edit-form.md#lightboxcontrols)
- **focus** - (*boolean*) *true*로 설정되면, 라이트박스를 열 때 해당 섹션에 포커스가 설정됩니다
- **filter** - (*function*) 작업 타입에 대한 필터 함수를 설정합니다. 매개변수로 타입 이름을 받습니다
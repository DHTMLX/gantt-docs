---
title: "Textarea 컨트롤"
sidebar_label: "Textarea 컨트롤"
---

# Textarea 컨트롤

다중 행 텍스트 필드입니다.

![textarea_control](/img/textarea_control.png)

## Initialization

기본적으로 라이트박스에 하나의 **textarea** 컨트롤이 추가됩니다. 다른 하나를 추가하려면 아래 단계를 따라주세요:

1) 라이트박스 구성에 섹션을 추가합니다:

~~~js
gantt.config.lightbox.sections = [
    {name:"description", height:38, map_to:"desc", type:"textarea",focus:true},
    {name:"details",     height:38, map_to:"text", type:"textarea"}, /*!*/
    {name:"time",        height:72, map_to:"auto", type:"duration"}
];
~~~


2) 섹션에 레이블을 설정합니다:

~~~js
gantt.locale.labels.section_details = "Details";
~~~
  

## Properties

다음 속성은 **textarea** 컨트롤에 대해 가장 중요하고 일반적으로 설정됩니다(전체 목록은 [here](api/config/lightbox.md)를 참조하세요):

- **name** - (*string*) 섹션 이름
- **height** - (*number*) 섹션 높이
- **map_to** - (*string*) 섹션에 매핑될 데이터 속성의 이름
- **type** - (*string*) [섹션 컨트롤의 유형](guides/default-edit-form.md#lightboxcontrols)
- **focus** - (*boolean*) 만약 *true*로 설정되면, 라이트박스를 열 때 해당 섹션이 포커스를 받습니다
- **default_value** - (*any*) 섹션 컨트롤의 기본 값. 입력 값이 정의되지 않은 경우에만 적용됩니다. *map_to:"text"*와 함께는 작동하지 않습니다
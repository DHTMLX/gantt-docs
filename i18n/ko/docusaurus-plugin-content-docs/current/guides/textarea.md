---
title: "Textarea 컨트롤"
sidebar_label: "Textarea 컨트롤"
---

# Textarea 컨트롤


이 컨트롤은 여러 줄의 텍스트 필드를 제공합니다.

![textarea_control](/img/textarea_control.png)

## 초기화


기본적으로 라이트박스에는 하나의 **textarea** 컨트롤이 포함되어 있습니다. 추가로 textarea 컨트롤을 추가하려면 다음 단계를 따르세요:

1) 라이트박스 설정에 섹션을 추가합니다:

~~~js
gantt.config.lightbox.sections = [
    {name:"description", height:38, map_to:"desc", type:"textarea",focus:true},
    {name:"details",     height:38, map_to:"text", type:"textarea"}, /*!*/
    {name:"time",        height:72, map_to:"auto", type:"duration"}
];
~~~

2) 새 섹션에 라벨을 정의합니다:

~~~js
gantt.locale.labels.section_details = "Details";
~~~

## 속성


**textarea** 컨트롤에서 일반적으로 사용되는 주요 속성은 다음과 같습니다 (전체 목록은 [여기](api/config/lightbox.md)에서 확인할 수 있습니다):

- **name** - (*string*) 해당 섹션의 식별자
- **height** - (*number*) 섹션의 높이
- **map_to** - (*string*) 섹션과 연결된 데이터 속성
- **type** - (*string*) [섹션 컨트롤](guides/default-edit-form.md#lightboxcontrols)의 타입
- **focus** - (*boolean*) *true*로 설정하면 라이트박스가 열릴 때 이 섹션에 포커스가 이동합니다
- **default_value** - (*any*) 입력값이 정의되지 않은 경우에만 적용되는 컨트롤의 초기값. 단, *map_to:"text"*와 함께 사용할 때는 동작하지 않습니다.


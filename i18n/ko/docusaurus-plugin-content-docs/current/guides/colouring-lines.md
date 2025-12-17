---
title: "링크 색상 및 스타일링"
sidebar_label: "링크 색상 및 스타일링"
---

링크 색상 및 스타일링
================================

Gantt 차트에서 작업을 연결하는 링크의 외관을 원하는 대로 커스터마이즈할 수 있습니다. 종속성 링크에 다양한 색상을 사용하면 사용자가 각 링크를 쉽게 구분할 수 있습니다.

![coloring_links](/img/coloring_links.png)

링크에 사용자 정의 스타일을 지정하는 방법에는 두 가지가 있습니다:

1. [기본 링크 템플릿 재정의하기](guides/colouring-lines.md#redefiningthelinkstemplate)
2. [링크 객체의 속성에 스타일 값 지정하기](guides/colouring-lines.md#specifyingcolorinthepropertiesofthelinkobject)

먼저, 링크 DOM 구조를 살펴보고 각 부분이 어떻게 배치되고 크기가 지정되며, 기본적으로 어떻게 동작하고 스타일링되는지 이해해 보겠습니다.

## 링크 DOM 요소의 구조 {#structureofthelinkdomelement}
----------------------

링크의 DOM 요소는 다음과 같이 구성됩니다:

- **.gantt_task_link**  - 정적 위치와 0 크기를 가짐
    - **.gantt_line_wrapper/gantt_link_arrow/gantt_link_corner** - 절대 위치 지정
        - **.gantt_link_line_down(/up/right/left)** - 래퍼 내부에 정적으로 위치함
        
DOM 구조 예시는 다음과 같습니다:

~~~html
<div class="gantt_task_link" link_id="3">
    <div class="gantt_line_wrapper">
        <div class="gantt_link_line_left"></div>
      </div>
    <div class="gantt_line_wrapper">
        <div class="gantt_link_line_left"></div>
      </div>
    <div class="gantt_link_corner gantt_link_corner_left_down"></div>
    <div class="gantt_line_wrapper">
        <div class="gantt_link_line_down"></div>
      </div>
    <div class="gantt_link_corner gantt_link_corner_down_right"></div>
    <div class="gantt_line_wrapper">
        <div class="gantt_link_line_right"></div>
      </div>
    <div class="gantt_link_arrow gantt_link_arrow_right"></div>
</div>
~~~

각 부분의 역할은 다음과 같습니다:

- **gantt_task_link** - 이 요소는 크기가 0이고 정적 위치를 가지며, 모든 링크 부분의 공통 부모 역할을 하여 스타일 적용을 쉽게 만듭니다:

~~~css
.gantt_task_link{
   --dhx-gantt-link-background:red;
} 
~~~

이 요소에 [link_class](api/template/link_class.md) 템플릿에서 클래스를 적용할 수도 있습니다.

#### 중요 링크(Critical links)

중요 링크는 **gantt_task_link** 요소에 **gantt_critical_link** 클래스를 추가하여 스타일이 지정됩니다.

- **gantt_line_wrapper**는 링크의 위치와 크기를 제어합니다. 이 요소는 투명하고 절대 위치를 가지며, 링크 라인 자체보다 약간 더 커서 마우스 선택 정확도를 높입니다.

이 요소의 너비는 [link_wrapper_width](api/config/link_wrapper_width.md) 속성으로 제어할 수 있습니다:

~~~js
gantt.config.link_wrapper_width = 30;
~~~

- **gantt_link_arrow**는 링크의 화살표를 나타냅니다. 절대 위치를 가지며, 방향에 따라 다음과 같은 추가 클래스를 가질 수 있습니다: 
    - **gantt_link_arrow_right**,
    - **gantt_link_arrow_left**,
    - **gantt_link_arrow_up**,
    - **gantt_link_arrow_down**.

현재는 **gantt_link_arrow_right**와 **gantt_link_arrow_down**만 사용됩니다.

화살표의 크기는 [link_arrow_size](api/config/link_arrow_size.md) 속성으로 정의됩니다:

~~~js
gantt.config.link_arrow_size = 8;
~~~

- **gantt_link_line_(dir)**는 링크 라인의 실제 보이는 부분입니다. **dir** 부분을 **left**, **right**, **up**, **down** 중 하나로 대체합니다.

이 라인의 두께는 [link_line_width](api/config/link_line_width.md) 속성으로 조정할 수 있습니다:

~~~js
gantt.config.link_line_width = 3;
~~~

- **gantt_link_corner**는 링크 라인의 둥근 모서리 부분입니다. 모서리 반지름은 [link_radius](api/config/link_radius.md)로 설정합니다:

~~~js
gantt.config.link_radius = 2;
~~~

**gantt.config.link_radius = 1**로 설정하면 둥근 모서리가 제거됩니다.

## 링크 템플릿 재정의하기 {#redefiningthelinkstemplate}
-----------------------------------------

종속성 링크를 커스터마이즈하려면 [link_class](api/template/link_class.md) 템플릿을 사용합니다. 예를 들어, 작업 우선순위에 따라 링크 색상을 지정하려면 다음과 같이 코드를 작성할 수 있습니다:

**의존성 타입에 따라 링크 색상 지정하기**
~~~js
gantt.templates.link_class = function(link){
    var types = gantt.config.links;
    switch (link.type){
        case types.finish_to_start:
            return "finish_to_start";
            break;
        case types.start_to_start:
            return "start_to_start";
            break;
        case types.finish_to_finish:
            return "finish_to_finish";
            break;
        case types.start_to_finish:
            return "start_to_finish";
            break;
    }
};
~~~


[Link styles](https://docs.dhtmlx.com/gantt/samples/04_customization/03_link_styles.html)


:::note
종속성 링크의 다른 부분을 스타일링하려면 [의존성 링크 템플릿](guides/dependency-templates.md) 문서의 템플릿을 참고하세요.
:::

동일한 방법을 작업에도 적용할 수 있습니다. 자세한 내용은 [여기](guides/colouring-tasks.md#redefiningthetaskstemplate)에서 확인할 수 있습니다.

## 링크 객체 속성에 색상 지정하기 {#specifyingcolorinthepropertiesofthelinkobject}
-----------------------------------------------------

데이터 객체에 속성을 추가하여 종속성 링크에 사용자 정의 색상을 지정할 수도 있습니다:

- **color** - 링크의 색상을 정의합니다

![link_color_property](/img/link_color_property.png)

:::note
이 속성은 특별한 속성입니다. Gantt는 링크에 이 속성이 있으면 해당 값을 링크에 적용합니다. 없으면 기본 색상이 사용됩니다.
:::

**데이터 객체에서 링크 색상 지정하기**
~~~js
var tasks = {
  data:[
     {id:1, text:"Project #1", start_date:"01-04-2013", duration:18},
     {id:2, text:"Task #1",    start_date:"02-04-2013", duration:8, parent:1},
     {id:3, text:"Task #2",    start_date:"11-04-2013", duration:8, parent:1}
  ],
  links:[
     {id:1, source:1, target:2, type:"1", color:"red"}, /*!*/
     {id:2, source:2, target:3, type:"0", color:"blue"},/*!*/
     {id:3, source:3, target:4, type:"0", color:"blue"},/*!*/
     {id:4, source:2, target:5, type:"2", color:"green"}/*!*/
  ]
};

gantt.init("gantt_here");
gantt.parse(tasks);

gantt.getLink(4).color = "green";
~~~


**Related example:** [Link colors from the "color" property](https://snippet.dhtmlx.com/e5utei5g)


:::note
**color** 속성을 통해 사용자 정의 색상을 추가하면 인라인 스타일이 적용되어 다른 스타일보다 우선 적용됩니다. 이로 인해 중요 경로가 강조 표시되지 않으며, 링크 색상을 변경하는 사용자 정의 스타일도 적용되지 않습니다.
:::

링크를 중요하게 표시하려면 다음 CSS를 사용할 수 있습니다:

~~~css
.gantt_critical_link {
  --dhx-gantt-link-background: #e63030 !important;
}
~~~


**Related example:** [Coloring critical tasks and links](https://snippet.dhtmlx.com/xipdml7a)


링크 객체의 어떤 속성이든 지정하면 해당 링크에 **"gantt_link_inline_color"** 클래스가 추가됩니다. 이 클래스는 해당 링크의 다른 스타일을 오버라이드하는 데 사용할 수 있습니다:

~~~css
.gantt_link_inline_color {
    opacity:0.4
}
~~~

color 속성은 모든 유효한 CSS 색상 형식을 사용할 수 있습니다. 예를 들어:

~~~js
link.color = "#FF0000";
link.color = "red";
link.color = "rgb(255,0,0)";
~~~

동일한 접근 방식은 작업에도 사용할 수 있습니다. 자세한 정보는 [여기](guides/colouring-tasks.md#specifyingstyleinthepropertiesofataskobject)에서 확인할 수 있습니다.


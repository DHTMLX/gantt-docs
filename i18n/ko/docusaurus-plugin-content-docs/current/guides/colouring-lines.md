---
title: "링크 색상 및 스타일링"  
sidebar_label: "링크 색상 및 스타일링"  
---

# 링크 색상 및 스타일링

작업을 연결하는 링크의 스타일을 변경하여 간트 차트의 원하는 모습과 분위기를 얻을 수 있습니다. 다양한 색상으로 의존 링크를 색상화하면 사용자가 이를 시각적으로 구분할 수 있습니다.

![coloring_links](/img/coloring_links.png)

링크에 대한 사용자 정의 스타일을 설정하려면 아래 방법 중 하나를 사용할 수 있습니다:

1. [To redefine the default link's template](guides/colouring-lines.md#redefiningthelinkstemplate)  
2. [To set style values in the properties of the link object](guides/colouring-lines.md#specifyingcolorinthepropertiesofthelinkobject)

우선, 링크 구조의 요소를 살펴보며 위치 지정, 크기, 기능 및 기본 스타일의 로직을 이해해 봅시다.

## 링크 DOM 요소의 구조 {#structureofthelinkdomelement}

링크의 DOM 요소는 다음과 같은 구조를 가집니다:

- **.gantt_task_link**  - 정적 위치 지정, 제로 사이즈
    - **.gantt_line_wrapper/gantt_link_arrow/gantt_link_corner** - 절대 위치 지정
        - **.gantt_link_line_down(/up/right/left)** - 래퍼 요소 안에서의 정적 위치 지정
  
다음과 같이 DOM이 보입니다:

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

where: 

- **gantt_task_link** - 크기가 0이고 정적 위치 지정을 가진 요소입니다. 이 요소는 링크의 모든 부분에 공통으로 부모로 사용되어, 예를 들어 스타일을 적용하는 데 사용됩니다:

~~~css
.gantt_task_link{
   --dhx-gantt-link-background:red;
} 
~~~  

이 요소에는 [link_class](api/template/link_class.md) 템플릿의 클래스를 적용할 수 있습니다. 

#### 중요한 링크

중요 링크의 스타일링은 **gantt_task_link** 요소에 **gantt_critical_link** 클래스를 추가함으로써 정의됩니다.

- **gantt_line_wrapper** 는 링크의 위치와 크기에 책임이 있습니다. 투명하며 절대 위치 지정되어 있고, 링크 선보다 약간 더 큼으로써 마우스로 링크를 선택하는 데 편리합니다. 

이 요소의 너비는 [link_wrapper_width](api/config/link_wrapper_width.md) 구성 속성으로 정의됩니다.

~~~js
gantt.config.link_wrapper_width = 30;
~~~

- **gantt_link_arrow** - 링크 화살표. 절대 위치 지정되어 있습니다. 화살표가 향하는 방향에 따라 해당하는 추가 클래스를 가질 수 있습니다: 
    - **gantt_link_arrow_right**,
    - **gantt_link_arrow_left**,
    - **gantt_link_arrow_up**, 또는
    - **gantt_link_arrow_down**.

지금은 오직 **gantt_link_arrow_right**와 **gantt_link_arrow_down**만 사용됩니다.

**gantt_link_arrow** 요소의 크기는 [link_arrow_size](api/config/link_arrow_size.md) 구성 속성으로 정의됩니다.

~~~js
gantt.config.link_arrow_size = 8;
~~~

- **gantt_link_line_(dir)** - 링크의 보이는 요소. 요소 이름의 **dir** 부분 대신 **left/right/up/down**를 사용하면 됩니다.

이 요소의 너비는 [link_line_width](api/config/link_line_width.md) 구성 속성으로 변경할 수 있습니다:

~~~js
gantt.config.link_line_width = 3;
~~~

- **gantt_link_corner** - 링크 선의 둥근 모서리. 모서리 반경은 [link_radius](api/config/link_radius.md)로 정의됩니다:

~~~js
gantt.config.link_radius = 2;
~~~

Setting **gantt.config.link_radius = 1** will remove rounded corners.  
  
## 링크 템플릿 재정의 {#redefiningthelinkstemplate}

의존 링크의 스타일을 지정하려면 [link_class](api/template/link_class.md) 템플릿을 사용합니다. 예를 들어 작업의 우선순위에 따라 링크의 색상을 다르게 하려면 아래와 같은 코드를 사용합니다:

**의존성 유형에 따라 링크 색상 지정**
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

[링크 스타일](https://docs.dhtmlx.com/gantt/samples/04_customization/03_link_styles.html)

:::note
의존 링크의 다른 요소의 스타일링은 [Templates of Dependency Links](guides/dependency-templates.md) 문서에 나열된 템플릿들을 사용하십시오.
:::

태스크에도 동일한 방식이 적용될 수 있습니다. 자세한 내용은 [여기](guides/colouring-tasks.md#redefiningthetaskstemplate)를 참고하십시오.  

## 링크 객체의 속성에서 색상 지정 {#specifyingcolorinthepropertiesofthelinkobject}

의존 링크에 대해 사용자 정의 색상을 지정하려면 데이터 객체에 추가 속성을 더하면 됩니다:

- **color** - 링크의 색상

![link_color_property](/img/link_color_property.png)

:::note
참고: 이것은 특수한 속성입니다. 기본적으로 Gantt는 링크에 이 속성이 있는지 확인하고, 있으면 해당 값을 링크에 적용합니다. 그렇지 않으면 미리 정의된 색상이 적용됩니다.
:::

**데이터 객체에서 링크의 색상 설정**
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

**관련 샘플** [Link colors from the "color" property](https://snippet.dhtmlx.com/e5utei5g)

:::note
색상 속성으로 사용자 정의 색상을 추가하면 인라인 스타일이 동반되며, 이 스타일은 다른 스타일들보다 우선 순위가 높습니다. 그 결과 중요한 경로가 강조 표시되지 않을 수 있으며, 링크 색상을 변경하기 위해 추가한 다른 스타일이 적용되지 않습니다.
:::

링크를 중요하게 보이도록 만들려면 아래 코드를 사용할 수 있습니다:

~~~css
.gantt_critical_link {
  --dhx-gantt-link-background: #e63030 !important;
}
~~~

**관련 샘플** [Coloring critical tasks and links](https://snippet.dhtmlx.com/xipdml7a)

링크 객체의 속성 중 하나라도 할당되면 링크에는 추가 클래스 **"gantt_link_inline_color"**이 부여됩니다. 이 클래스를 사용하여 링크의 일부 스타일을 재정의할 수 있습니다:

~~~css
.gantt_link_inline_color {
    opacity:0.4
}
~~~

속성은 어떤 유효한 CSS 색상 값이든 가질 수 있으며, 예를 들어 아래의 모든 표기법이 유효합니다:

~~~js
link.color = "#FF0000";
link.color = "red";
link.color = "rgb(255,0,0)";
~~~

태스크에도 유사한 방법을 적용할 수 있습니다. 자세한 내용은 [여기](guides/colouring-tasks.md#specifyingstyleinthepropertiesofataskobject)를 참조하십시오.
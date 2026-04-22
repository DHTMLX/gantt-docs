---
title: "jQuery와의 통합"
sidebar_label: "jQuery와의 통합"
---

# jQuery와의 통합

jQuery 라이브러리를 사용하는 경우, 일반 구문으로 페이지에 Gantt 차트를 렌더링할 수 있습니다.

JQuery로 초기화된 표준 Gantt 차트는 JQuery로 초기화하는 방법과 같습니다. 초기화 예는 다음과 같습니다:

**JQuery로 초기화된 Gantt 차트**
~~~js
$(".mygantt").dhx_gantt({
    data:demo_tasks,
    scales:[
        { unit:"year",step:1,format:"%Y"}
    ]
});
$("#gantt1").dhx_gantt().parse(tasksA);
~~~

~~~html
<div class="mygantt" id='gantt1' style='width:100%; height:30%;'></div>
~~~

[jQuery integration](https://docs.dhtmlx.com/gantt/samples/01_initialization/07_jquery.html)

다음과 같이 설명합니다:

- **".mygantt"** - 컨테이너의 jQuery 호환 CSS 선택자이며, 그 안에 Gantt 차트가 생성됩니다
- **dhx_gantt()** 메서드는 dhtmlxGantt를 인스턴스화합니다. 매개변수로 구성 객체를 받습니다:
  - **data** - (*object*) Gantt 차트에 로드될 데이터 세트
  - **[scales](api/config/scales.md)** - (*array*) 시간 축의 구성 설정이 담긴 배열
  
:::note
JQuery를 통해 초기화된 Gantt 차트는 표준(JavaScript를 통해 초기화된) Gantt 차트와 동일한 구성 및 API를 사용합니다.
:::

[jQuery integration](https://docs.dhtmlx.com/gantt/samples/01_initialization/07_jquery.html)
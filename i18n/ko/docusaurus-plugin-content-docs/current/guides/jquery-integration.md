---
title: "JQuery와의 통합"
sidebar_label: "JQuery와의 통합"
---

JQuery와의 통합
==========================================

JQuery 라이브러리를 사용할 때, Gantt 차트는 익숙한 문법을 사용하여 페이지에 추가할 수 있습니다.

아래는 JQuery로 Gantt 차트를 기본적으로 설정하는 방법입니다:

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


상세 설명:

- **".mygantt"** - Gantt 차트가 렌더링될 컨테이너를 식별하는 jQuery와 호환되는 CSS 선택자입니다.
- **dhx_gantt()** 메서드는 dhtmlxGantt 인스턴스를 생성합니다. 이 메서드는 구성 객체를 파라미터로 받습니다:
  - **data** - (*object*) Gantt 차트에 로드될 데이터셋
  - **[scales](api/config/scales.md)** - (*array*) 시간 스케일을 정의하는 설정 목록
  
:::note
jQuery를 통해 초기화된 Gantt 차트는 JavaScript로 직접 생성한 경우와 동일한 구성 옵션과 API를 사용합니다.
:::


[jQuery integration](https://docs.dhtmlx.com/gantt/samples/01_initialization/07_jquery.html)


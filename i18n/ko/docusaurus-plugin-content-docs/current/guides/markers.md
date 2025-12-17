---
title: "수직 마커 추가하기"
sidebar_label: "수직 마커 추가하기"
---

수직 마커 추가하기
=========================================================

이 라이브러리는 **marker** 확장 기능을 포함하고 있어, 타임라인에 특정 날짜나 날짜 범위를 강조 표시할 수 있습니다.

<div style="text-align:center;">![today_marker](/img/today_marker.png)</div>

:::note
이 확장 기능을 사용하려면, [gantt.plugins](api/method/plugins.md) 메서드를 호출하여 **marker** 플러그인을 활성화해야 합니다.
:::

~~~js
<!DOCTYPE html>
<html>
<head>
   <script src="codebase/dhtmlxgantt.js"></script>   
   <link href="codebase/dhtmlxgantt.css" rel="stylesheet">   
</head>
<body>
    gantt.plugins({ /*!*/
        marker: true /*!*/
    }); /*!*/
    //여기에 코드를 작성하세요
</body>
</html>
~~~

[Today and Status lines in Gantt (vertical markers)](https://docs.dhtmlx.com/gantt/samples/02_extensions/05_today_line.html)



## 마커 추가하기

타임라인에 마커(예: 오늘 날짜의 마커)를 표시하려면, [addMarker](api/method/addmarker.md) 메서드를 사용하세요:

~~~js
var dateToStr = gantt.date.date_to_str(gantt.config.task_date);
var markerId = gantt.addMarker({
    start_date: new Date(), // 마커의 날짜를 지정하는 Date 객체
    css: "today", // 마커에 적용할 CSS 클래스
    text: "Now", // 마커 레이블
    title: dateToStr(new Date()) // 마커의 툴팁 텍스트
});
~~~

[Today and Status lines in Gantt (vertical markers)](https://docs.dhtmlx.com/gantt/samples/02_extensions/05_today_line.html)


:::note
'text' 속성에는 HTML 콘텐츠도 사용할 수 있습니다.
:::


추가된 마커 객체를 가져오려면, [getMarker](api/method/getmarker.md) 메서드를 사용하세요:

~~~js
var dateToStr = gantt.date.date_to_str(gantt.config.task_date);
var markerId = gantt.addMarker({  /*!*/
    start_date: new Date(), 
    css: "today", 
    text: "Now", 
    title: dateToStr(new Date()) 
});
gantt.getMarker(markerId); // {css:"today", text:"Now", id:...} 형태의 객체 반환
~~~

[Today and Status lines in Gantt (vertical markers)](https://docs.dhtmlx.com/gantt/samples/02_extensions/05_today_line.html)


## 마커 제거하기

이전에 추가한 마커를 삭제하려면, [deleteMarker](api/method/deletemarker.md) 메서드를 사용하세요: 

~~~js
var dateToStr = gantt.date.date_to_str(gantt.config.task_date);
var markerId = gantt.addMarker({  /*!*/
    start_date: new Date(), 
    css: "today", 
    text: "Now", 
    title: dateToStr(new Date()) 
});

gantt.deleteMarker(markerId); /*!*/
~~~

## 마커 숨기기

추가된 모든 마커를 숨기려면, [show_markers](api/config/show_markers.md) 옵션을 'false'로 설정하세요: 

~~~js
var marker1 = gantt.addMarker({ ...}); 
var marker2 = gantt.addMarker({ ...}); 
var marker3 = gantt.addMarker({ ...}); 

gantt.config.show_markers = false; // 세 개의 마커 모두 숨김
~~~

## 마커 업데이트하기

마커를 수정하려면, [updateMarker](api/method/updatemarker.md) 메서드를 사용하세요:

~~~js
var dateToStr = gantt.date.date_to_str(gantt.config.task_date);
var markerId = gantt.addMarker({  /*!*/
    start_date: new Date(), 
    css: "today", 
    text: "Now", 
    title: dateToStr(new Date()) 
});

gantt.getMarker(markerId).css = "today_new";
gantt.updateMarker(markerId); /*!*/
~~~

모든 마커를 한 번에 새로고침하려면, [renderMarkers](api/method/rendermarkers.md) 메서드를 사용하세요: 

~~~js
var marker1 = gantt.addMarker({ ...}); 
var marker2 = gantt.addMarker({ ...}); 
var marker3 = gantt.addMarker({ ...}); 

gantt.renderMarkers(); /*!*/
~~~

마커 스타일링 
----------------------------

마커는 [gantt.templates.marker_class](api/template/marker_class.md) 템플릿을 사용하여 스타일을 지정할 수 있습니다:

~~~js
var showAdvancedMarkers;
gantt.templates.marker_class = function(marker){
    if (showAdvancedMarkers)
    return "advanced_marker";
    return "hidden";
}
~~~

오늘의 마커
-------------------------------------

간트 차트에 오늘 날짜를 표시하는 마커를 추가하려면, 마커를 추가하고 시간이 지남에 따라 위치를 업데이트하는 함수도 제공해야 합니다. 다음 코드를 참고하세요:

~~~js
var dateToStr = gantt.date.date_to_str(gantt.config.task_date);

var id = gantt.addMarker({ 
    start_date: new Date(), 
    css: "today", 
    title: dateToStr(new Date())
});
setInterval(function(){
    var today = gantt.getMarker(id);
    today.start_date = new Date();
    today.title = dateToStr(today.start_date);
    gantt.updateMarker(id);
}, 1000*60);
~~~

[Today and Status lines in Gantt (vertical markers)](https://docs.dhtmlx.com/gantt/samples/02_extensions/05_today_line.html)


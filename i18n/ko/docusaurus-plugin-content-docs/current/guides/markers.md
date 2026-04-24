---
title: "세로 마커 추가"
sidebar_label: "세로 마커 추가"
---

# 세로 마커 추가

라이브러리는 특정 날짜나 날짜 범위를 표시(강조)할 수 있는 **marker** 확장을 제공합니다.

<div style="text-align:center;">![today_marker](/img/today_marker.png)</div>

:::note
확장 기능을 사용하려면 [gantt.plugins](api/method/plugins.md) 메서드를 사용하여 **marker** 플러그인을 활성화하세요.
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
    //your code will be here
</body>
</html>
~~~

[간트 차트의 오늘 및 상태 선(세로 마커)](https://docs.dhtmlx.com/gantt/samples/02_extensions/05_today_line.html)


## 마커 추가

타임라인 영역에 마커를 추가하려면 예를 들어 오늘의 마커처럼 [addMarker](api/method/addmarker.md) 메서드를 호출합니다:

~~~js
var dateToStr = gantt.date.date_to_str(gantt.config.task_date);
var markerId = gantt.addMarker({
    start_date: new Date(), //마커의 날짜를 설정하는 Date 객체
    css: "today", //마커에 적용되는 CSS 클래스
    text: "Now", //마커의 제목
    title: dateToStr( new Date()) // 마커의 툴팁
});
~~~

[간트 차트의 오늘 및 상태 선(세로 마커)](https://docs.dhtmlx.com/gantt/samples/02_extensions/05_today_line.html)


:::note
참고로, 'text' 속성의 값으로 HTML을 임의로 사용할 수 있습니다.
:::


추가된 마커의 객체를 얻으려면 [getMarker](api/method/getmarker.md) 메서드를 사용합니다:

~~~js
var dateToStr = gantt.date.date_to_str(gantt.config.task_date);
var markerId = gantt.addMarker({  /*!*/
    start_date: new Date(), 
    css: "today", 
    text: "Now", 
    title: dateToStr(new Date()) 
});
gantt.getMarker(markerId); //->{css:"today", text:"Now", id:...}
~~~

[간트 차트의 오늘 및 상태 선(세로 마커)](https://docs.dhtmlx.com/gantt/samples/02_extensions/05_today_line.html)


## 마커 제거

추가한 마커를 제거하려면 [deleteMarker](api/method/deletemarker.md) 메서드를 사용합니다: 

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

추가된 모든 마커를 숨기려면 [show_markers](api/config/show_markers.md) 구성 옵션을 'false'로 설정합니다: 

~~~js
var marker1 = gantt.addMarker({ ...}); 
var marker2 = gantt.addMarker({ ...}); 
var marker3 = gantt.addMarker({ ...}); 

gantt.config.show_markers = false;// hides all 3 markers
~~~


## 마커 업데이트

마커를 업데이트하려면 [updateMarker](api/method/updatemarker.md) 메서드를 사용합니다:

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


모든 추가 마커를 업데이트하려면 [renderMarkers](api/method/rendermarkers.md) 메서드를 사용합니다: 

~~~js
var marker1 = gantt.addMarker({ ...}); 
var marker2 = gantt.addMarker({ ...}); 
var marker3 = gantt.addMarker({ ...}); 

gantt.renderMarkers(); /*!*/
~~~


## 마커 스타일링

마커의 스타일을 지정하려면 [gantt.templates.marker_class](api/template/marker_class.md) 템플릿을 사용합니다:

~~~js
var showAdvancedMarkers;
gantt.templates.marker_class = function(marker){
    if (showAdvancedMarkers)
    return "advanced_marker";
    return "hidden";
}
~~~


## 오늘의 마커

간트 차트에서 오늘의 마커를 표시하고자 한다고 가정해 봅니다. 이 경우 두 가지가 필요합니다: 페이지에 마커를 추가하고 시간이 흐름에 따라 마커를 이동시킬 함수를 제공하는 것. 아래 코드를 사용하면 됩니다:

~~~js
var dateToStr = gantt.date.date_to_str(gantt.config.task_date);

var id = gantt.addMarker({ 
    start_date: new Date(), 
    css: "today", 
    title:dateToStr(new Date())
});
setInterval(function(){
    var today = gantt.getMarker(id);
    today.start_date = new Date();
    today.title = date_to_str(today.start_date);
    gantt.updateMarker(id);
}, 1000*60);
~~~

[간트 차트의 오늘 및 상태 선(세로 마커)](https://docs.dhtmlx.com/gantt/samples/02_extensions/05_today_line.html)
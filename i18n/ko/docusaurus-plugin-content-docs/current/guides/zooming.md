---
title: "줌(Zooming)"
sidebar_label: "줌(Zooming)"
---

# 줌(Zooming)


dhtmlxGantt는 타임 스케일 줌 관리를 간편하게 해주는 내장 모듈을 제공합니다. 기본 줌 동작을 조정하고 싶다면, 타임 스케일 설정을 동적으로 변경할 수 있는 [유연한 API](guides/zoom.md)도 사용할 수 있습니다.

## 내장 줌 모듈


통합된 [줌 모듈](guides/zoom.md)은 **gantt.ext.zoom** 확장에 포함되어 있습니다. 활성화하려면 **gantt.ext.zoom.init(zoomConfig)**를 호출하고, 다양한 줌 레벨 배열을 포함하는 **zoomConfig** 객체를 전달합니다. 예시는 다음과 같습니다:

~~~js
var zoomConfig = {
    levels: [
      {
        name:"day",
        scale_height: 27,
        min_column_width:80,
        scales:[
            {unit: "day", step: 1, format: "%d %M"}
        ]
      },
      {
         name:"week",
         scale_height: 50,
         min_column_width:50,
         scales:[
          {unit: "week", step: 1, format: function (date) {
           var dateToStr = gantt.date.date_to_str("%d %M");
           var endDate = gantt.date.add(date, 6, "day");
           var weekNum = gantt.date.date_to_str("%W")(date);
           return "#" + weekNum + ", " + dateToStr(date) + " - " + dateToStr(endDate);
           }},
           {unit: "day", step: 1, format: "%j %D"}
         ]
       },
       {
         name:"month",
         scale_height: 50,
         min_column_width:120,
         scales:[
             {unit: "month", format: "%F, %Y"},
             {unit: "week", format: "Week #%W"}
         ]
        },
        {
         name:"quarter",
         height: 50,
         min_column_width:90,
         scales:[
          {unit: "month", step: 1, format: "%M"},
          {
           unit: "quarter", step: 1, format: function (date) {
            var dateToStr = gantt.date.date_to_str("%M");
            var endDate = gantt.date.add(gantt.date.add(date, 3, "month"), -1, "day");
            return dateToStr(date) + " - " + dateToStr(endDate);
           }
         }
          ]},
        {
          name:"year",
          scale_height: 50,
          min_column_width: 30,
          scales:[
              {unit: "year", step: 1, format: "%Y"}
        ]}
    ]
};

gantt.ext.zoom.init(zoomConfig);
~~~

:::note
줌 모듈과 해당 API의 자세한 정보는 [Zoom Extension](guides/zoom.md) 문서에서 확인할 수 있습니다.
:::


[Mouse wheel zoom](https://docs.dhtmlx.com/gantt/samples/03_scales/14_scale_zoom_by_wheelmouse.html)


## 커스텀 줌 설정


줌 모듈을 사용하지 않고 직접 스케일 설정을 제어하고 싶다면, 관련 구성 옵션을 조정하여 구현할 수 있습니다.

기본적으로 줌 기능을 추가한다는 것은 타임 스케일(줌 레벨)에 대한 몇 가지 프리셋을 정의하고, 사용자가 이들 사이를 전환할 수 있도록 만드는 것입니다.

타임 스케일을 구성할 때 필요한 주요 설정은 다음과 같습니다:

- [gantt.config.scales](api/config/scales.md) - 원하는 만큼의 타임 스케일 행을 설정할 수 있습니다.

- [gantt.config.min_column_width](api/config/min_column_width.md), [gantt.config.scale_height](api/config/scale_height.md) - 스케일 열의 너비와 전체 타임 스케일 높이를 제어합니다.

다음은 예시 프리셋입니다:

~~~js
/* global gantt */
function setScaleConfig(level) {
    switch (level) {
        case "day":
            gantt.config.scales = [
                  {unit: "day", step: 1, format: "%d %M"}
            ];
            gantt.config.scale_height = 27;
            break;
        case "week":
            var weekScaleTemplate = function (date) {
              var dateToStr = gantt.date.date_to_str("%d %M");
              var endDate = gantt.date.add(gantt.date.add(date, 1, "week"), -1, "day");
              return dateToStr(date) + " - " + dateToStr(endDate);
            };
             gantt.config.scales = [
                {unit: "week", step: 1, format: weekScaleTemplate},
                {unit: "day", step: 1, format: "%D"}
            ];
            gantt.config.scale_height = 50;
            break;
        case "month":
             gantt.config.scales = [
                {unit: "month", step: 1, format: "%F, %Y"},
                {unit: "day", step: 1, format: "%j, %D"}
            ];
            gantt.config.scale_height = 50;
            break;
        case "year":
            gantt.config.scales = [
                {unit: "year", step: 1, format: "%Y"},
                {unit: "month", step: 1, format: "%M"}
            ];
            gantt.config.scale_height = 90;
            break;
    }
}
~~~

이 함수는 gantt 객체에 대해 "day"부터 "year"까지 네 가지 미리 정의된 구성을 설정합니다. 변경 사항을 적용하려면 gantt 차트를 완전히 다시 그려야 합니다:

~~~js
setScaleConfig("year");
gantt.init("gantt_here");
~~~

그리고 사용자가 줌 레벨을 선택할 수 있도록 간단한 UI를 만들 수 있습니다:





~~~html
<label><input type="radio" name="scale" value="day" checked/>Day scale</label>
<label><input type="radio" name="scale" value="week"/>Week scale</label>
<label><input type="radio" name="scale" value="month"/>Month scale</label>
<label><input type="radio" name="scale" value="year"/>Year scale</label> 
~~~




~~~js
var els = document.querySelectorAll("input[name='scale']");
for (var i = 0; i < els.length; i++) {
    els[i].onclick = function(e){
        var el = e.target;
        var value = el.value;
        setScaleConfig(value);
        gantt.render();
    };
}
~~~


[Dynamic scales](https://docs.dhtmlx.com/gantt/samples/03_scales/05_dynamic_scales.html)


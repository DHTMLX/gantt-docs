---
title: "缩放功能"
sidebar_label: "缩放功能"
---

# 缩放功能


dhtmlxGantt 内置了一个模块，使时间轴缩放的管理变得简单。如果你希望调整默认的缩放行为，可以使用[灵活的 API](guides/zoom.md)，动态更改时间轴设置。

## 内置缩放模块


集成的[缩放模块](guides/zoom.md)属于 **gantt.ext.zoom** 扩展。要启用它，只需调用 **gantt.ext.zoom.init(zoomConfig)** 并传入包含缩放级别数组的 **zoomConfig** 对象。例如:

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
有关缩放模块及其 API 的详细信息，请参阅文章 [Zoom Extension](guides/zoom.md)。
:::


[Mouse wheel zoom](https://docs.dhtmlx.com/gantt/samples/03_scales/14_scale_zoom_by_wheelmouse.html)


## 自定义缩放设置


如果你不想使用缩放模块，而是希望自行控制时间轴设置，只需调整相关的配置项即可。

通常，实现缩放功能意味着为时间轴定义几个预设（缩放级别），并允许用户在它们之间切换。

以下是配置时间轴所需的设置:

- [gantt.config.scales](api/config/scales.md) - 允许你设置任意数量的时间轴行。

- [gantt.config.min_column_width](api/config/min_column_width.md)、[gantt.config.scale_height](api/config/scale_height.md) - 控制时间轴列的宽度和总高度。

下面是一些预设的示例:

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

该函数为 gantt 对象设置了四种预定义配置之一，从"天"到"年"级别。要应用更改，需要完全重绘甘特图:

~~~js
setScaleConfig("year");
gantt.init("gantt_here");
~~~

你可以创建一个简单的界面，让用户切换缩放级别:


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


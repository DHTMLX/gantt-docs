---
title: "Масштабирование"
sidebar_label: "Масштабирование"
---

# Масштабирование

dhtmlxGantt включает встроенный модуль, который облегчает управление масштабированием временной шкалы. Если вы хотите изменить стандартное поведение масштабирования, доступен [гибкий API](guides/zoom.md), позволяющий динамически изменять настройки временной шкалы.

## Встроенный модуль масштабирования

Интегрированный [модуль масштабирования](guides/zoom.md) является частью расширения **gantt.ext.zoom**. Чтобы его активировать, просто вызовите **gantt.ext.zoom.init(zoomConfig)** и передайте объект **zoomConfig**, содержащий массив уровней масштабирования. Например:

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
Подробная информация о модуле масштабирования и его API приведена в статье [Расширение Zoom](guides/zoom.md).
:::


[Mouse wheel zoom](https://docs.dhtmlx.com/gantt/samples/03_scales/14_scale_zoom_by_wheelmouse.html)


## Пользовательские настройки масштабирования

Если вы предпочитаете не использовать модуль масштабирования и хотите самостоятельно управлять настройками шкалы, вы можете сделать это, изменяя соответствующие параметры конфигурации.

В целом, добавление масштабирования означает определение нескольких пресетов для временной шкалы (уровней масштабирования) и предоставление пользователю возможности переключаться между ними.

Вот параметры, которые вам понадобятся для настройки временной шкалы:

- [gantt.config.scales](api/config/scales.md) - позволяет задать любое количество строк временной шкалы.

- [gantt.config.min_column_width](api/config/min_column_width.md), [gantt.config.scale_height](api/config/scale_height.md) - управляют шириной колонок шкалы и общей высотой временной шкалы.

Рассмотрим несколько примеров пресетов:

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


Эта функция настраивает объект gantt с одной из четырех предопределённых конфигураций, начиная от масштаба "день" до "год". Для применения изменений необходимо полностью перерисовать диаграмму Ганта:

~~~js
setScaleConfig("year");
gantt.init("gantt_here");
~~~


Затем вы можете создать простой интерфейс для переключения уровня масштабирования пользователем:


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


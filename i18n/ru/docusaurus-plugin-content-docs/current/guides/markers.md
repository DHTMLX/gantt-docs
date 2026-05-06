---
title: "Добавление вертикальных маркеров"
sidebar_label: "Добавление вертикальных маркеров"
---

# Добавление вертикальных маркеров

Библиотека предоставляет расширение **marker**, которое позволяет помечать (выделять) конкретные даты или диапазоны дат.

<div style="text-align:center;">![today_marker](/img/today_marker.png)</div>

:::note
Чтобы начать использовать расширение, включите плагин **marker** с помощью метода [gantt.plugins](api/method/plugins.md).
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

[Сегодня и линии статуса в Gantt (вертикальные маркеры)](https://docs.dhtmlx.com/gantt/samples/02_extensions/05_today_line.html)


## Добавление маркера

Чтобы добавить маркер на временную шкалу, например маркер сегодняшнего дня, вызовите метод [addMarker](api/method/addmarker.md):

~~~js
var dateToStr = gantt.date.date_to_str(gantt.config.task_date);
var markerId = gantt.addMarker({
    start_date: new Date(), //a Date object that sets the marker's date
    css: "today", //a CSS class applied to the marker
    text: "Now", //the marker title
    title: dateToStr( new Date()) // the marker's tooltip
});
~~~

[Сегодня и линии статуса в Gantt (вертикальные маркеры)](https://docs.dhtmlx.com/gantt/samples/02_extensions/05_today_line.html)


:::note
Примечание: значение свойства 'text' может принимать любой HTML
:::

Чтобы получить объект добавленного маркера, используйте метод [getMarker](api/method/getmarker.md):

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

[Сегодня и линии статуса в Gantt (вертикальные маркеры)](https://docs.dhtmlx.com/gantt/samples/02_extensions/05_today_line.html)


## Удаление маркера

Чтобы удалить ранее добавленный маркер, используйте метод [deleteMarker](api/method/deletemarker.md): 

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

## Скрытие маркеров

Чтобы скрыть все добавленные маркеры, установите конфигурационный параметр [show_markers](api/config/show_markers.md) в значение 'false': 

~~~js
var marker1 = gantt.addMarker({ ...}); 
var marker2 = gantt.addMarker({ ...}); 
var marker3 = gantt.addMarker({ ...}); 

gantt.config.show_markers = false;// hides all 3 markers
~~~ 

## Обновление маркера

Чтобы обновить маркер, используйте метод [updateMarker](api/method/updatemarker.md):

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

Чтобы обновить все добавленные маркеры, используйте метод [renderMarkers](api/method/rendermarkers.md): 

~~~js
var marker1 = gantt.addMarker({ ...}); 
var marker2 = gantt.addMarker({ ...}); 
var marker3 = gantt.addMarker({ ...}); 

gantt.renderMarkers(); /*!*/
~~~

## Стилизация маркеров

Чтобы стилизовать маркеры, используйте шаблон [gantt.templates.marker_class](api/template/marker_class.md):

~~~js
var showAdvancedMarkers;
gantt.templates.marker_class = function(marker){
    if (showAdvancedMarkers)
    return "advanced_marker";
    return "hidden";
}
~~~

## Маркер сегодняшнего дня

Предположим, что вы хотите иметь на диаграмме Ганта маркер сегодняшнего дня. В этом случае вам понадобятся оба действия: добавить маркер на страницу и предоставить функцию, которая будет перемещать маркер по мере изменения времени. Это можно сделать с помощью следующего кода:

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

[Сегодня и линии статуса в Gantt (вертикальные маркеры)](https://docs.dhtmlx.com/gantt/samples/02_extensions/05_today_line.html)
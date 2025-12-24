---
title: "Добавление вертикальных маркеров"
sidebar_label: "Добавление вертикальных маркеров"
---

# Добавление вертикальных маркеров


Библиотека включает расширение **marker**, которое позволяет выделять определённые даты или диапазоны дат на временной шкале.

<div style="text-align:center;">![today_marker](/img/today_marker.png)</div>

:::note
Чтобы начать использовать это расширение, включите плагин **marker**, вызвав метод [gantt.plugins](api/method/plugins.md).
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
    //ваш код будет здесь
</body>
</html>
~~~

[Today and Status lines in Gantt (vertical markers)](https://docs.dhtmlx.com/gantt/samples/02_extensions/05_today_line.html)


## Добавление маркера

Чтобы разместить маркер на временной шкале, например, маркер для сегодняшней даты, используйте метод [addMarker](api/method/addmarker.md):

~~~js
var dateToStr = gantt.date.date_to_str(gantt.config.task_date);
var markerId = gantt.addMarker({
    start_date: new Date(), // объект Date, указывающий дату маркера
    css: "today", // CSS-класс, применяемый к маркеру
    text: "Now", // подпись маркера
    title: dateToStr(new Date()) // текст тултипа для маркера
});
~~~

[Today and Status lines in Gantt (vertical markers)](https://docs.dhtmlx.com/gantt/samples/02_extensions/05_today_line.html)


:::note
Обратите внимание, что свойство 'text' может принимать любой HTML-контент.
:::

Чтобы получить объект, представляющий добавленный маркер, используйте метод [getMarker](api/method/getmarker.md):

~~~js
var dateToStr = gantt.date.date_to_str(gantt.config.task_date);
var markerId = gantt.addMarker({  /*!*/
    start_date: new Date(), 
    css: "today", 
    text: "Now", 
    title: dateToStr(new Date()) 
});
gantt.getMarker(markerId); // возвращает {css:"today", text:"Now", id:...}
~~~

[Today and Status lines in Gantt (vertical markers)](https://docs.dhtmlx.com/gantt/samples/02_extensions/05_today_line.html)


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

Чтобы скрыть все добавленные маркеры, установите опцию [show_markers](api/config/show_markers.md) в значение 'false': 

~~~js
var marker1 = gantt.addMarker({ ...}); 
var marker2 = gantt.addMarker({ ...}); 
var marker3 = gantt.addMarker({ ...}); 

gantt.config.show_markers = false; // скрывает все 3 маркера
~~~

## Обновление маркера

Чтобы изменить маркер, используйте метод [updateMarker](api/method/updatemarker.md):

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

Чтобы обновить все маркеры одновременно, используйте метод [renderMarkers](api/method/rendermarkers.md): 

~~~js
var marker1 = gantt.addMarker({ ...}); 
var marker2 = gantt.addMarker({ ...}); 
var marker3 = gantt.addMarker({ ...}); 

gantt.renderMarkers(); /*!*/
~~~

## Стилизация маркеров 


Маркер можно стилизовать с помощью шаблона [gantt.templates.marker_class](api/template/marker_class.md):

~~~js
var showAdvancedMarkers;
gantt.templates.marker_class = function(marker){
    if (showAdvancedMarkers)
    return "advanced_marker";
    return "hidden";
}
~~~

## Маркер сегодняшнего дня


Если вы хотите отображать маркер для текущего дня в вашем Gantt, необходимо не только добавить маркер, но и реализовать функцию для обновления его позиции по мере изменения времени. Это можно сделать следующим образом:

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


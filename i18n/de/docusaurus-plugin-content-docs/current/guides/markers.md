--- 
title: "Vertikale Marker hinzufügen"
sidebar_label: "Vertikale Marker hinzufügen"
---

# Vertikale Marker hinzufügen

Die Bibliothek bietet die Erweiterung **marker**, die es Ihnen ermöglicht, bestimmte Daten oder Datumsbereiche zu markieren (hervorzuheben).

<div style="text-align:center;">![today_marker](/img/today_marker.png)</div>

:::note
Hinweis: Um die Erweiterung zu verwenden, aktivieren Sie das **marker**-Plugin mit der Methode [gantt.plugins](api/method/plugins.md).
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

[Heute- und Statuszeilen in Gantt (vertikale Marker)](https://docs.dhtmlx.com/gantt/samples/02_extensions/05_today_line.html)


## Marker hinzufügen

Um einen Marker in den Zeitachsenbereich hinzuzufügen, z. B. den Marker für heute, rufen Sie die Methode [addMarker](api/method/addmarker.md) auf:

~~~js
var dateToStr = gantt.date.date_to_str(gantt.config.task_date);
var markerId = gantt.addMarker({
    start_date: new Date(), // Ein Date-Objekt, das das Markierungsdatum angibt
    css: "today", // CSS-Klasse, die auf die Markierung angewendet wird
    text: "Now", // Markierungsbeschriftung
    title: dateToStr(new Date()) // Tooltip-Text für die Markierung
});
~~~

[Heute- und Statuszeilen in Gantt (vertikale Marker)](https://docs.dhtmlx.com/gantt/samples/02_extensions/05_today_line.html)


:::note
Hinweis: Als Wert der Eigenschaft 'text' kann die Methode beliebiges HTML verwenden.
:::


Um ein Objekt des hinzugefügten Markers zu erhalten, verwenden Sie die Methode [getMarker](api/method/getmarker.md):

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

[Heute- und Statuszeilen in Gantt (vertikale Marker)](https://docs.dhtmlx.com/gantt/samples/02_extensions/05_today_line.html)


## Marker entfernen

Um einen zuvor hinzugefügten Marker zu entfernen, verwenden Sie die Methode [deleteMarker](api/method/deletemarker.md): 

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

## Marker ausblenden

Um alle hinzugefügten Marker auszublenden, setzen Sie die Konfigurationsoption [show_markers](api/config/show_markers.md) auf 'false': 

~~~js
var marker1 = gantt.addMarker({ ...}); 
var marker2 = gantt.addMarker({ ...}); 
var marker3 = gantt.addMarker({ ...}); 

gantt.config.show_markers = false;// hides all 3 markers
~~~

## Marker aktualisieren

Um einen Marker zu aktualisieren, verwenden Sie die Methode [updateMarker](api/method/updatemarker.md):

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

Um alle hinzugefügten Marker zu aktualisieren, verwenden Sie die Methode [renderMarkers](api/method/rendermarkers.md):

~~~js
var marker1 = gantt.addMarker({ ...}); 
var marker2 = gantt.addMarker({ ...}); 
var marker3 = gantt.addMarker({ ...}); 

gantt.renderMarkers(); /*!*/
~~~

## Marker stylen

Um Marker zu stylen, verwenden Sie das Template [gantt.templates.marker_class](api/template/marker_class.md):

~~~js
var showAdvancedMarkers;
gantt.templates.marker_class = function(marker){
    if (showAdvancedMarkers)
    return "advanced_marker";
    return "hidden";
}
~~~

## Heutiger Marker

Angenommen, Sie möchten den heutigen Marker in Ihrem Gantt-Diagramm anzeigen. In diesem Fall benötigen Sie beides: Einen Marker auf der Seite hinzufügen und eine Funktion bereitstellen, die den Marker mit der Zeitänderung verschiebt. Dies können Sie mit folgendem Code erreichen:

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

[Heute- und Statuszeilen in Gantt (vertikale Marker)](https://docs.dhtmlx.com/gantt/samples/02_extensions/05_today_line.html)
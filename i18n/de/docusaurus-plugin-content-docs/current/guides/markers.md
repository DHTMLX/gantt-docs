---
title: "Hinzufügen von vertikalen Markierungen"
sidebar_label: "Hinzufügen von vertikalen Markierungen"
---

# Hinzufügen von vertikalen Markierungen


Die Bibliothek enthält die **marker**-Erweiterung, mit der Sie bestimmte Daten oder Datumsbereiche auf der Zeitleiste hervorheben können.

<div style="text-align:center;">![today_marker](/img/today_marker.png)</div>

:::note
Um diese Erweiterung zu verwenden, aktivieren Sie das **marker**-Plugin, indem Sie die Methode [gantt.plugins](api/method/plugins.md) aufrufen.
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
    //Ihr Code kommt hier hin
</body>
</html>
~~~

[Today and Status lines in Gantt (vertical markers)](https://docs.dhtmlx.com/gantt/samples/02_extensions/05_today_line.html)


## Hinzufügen einer Markierung

Um eine Markierung auf der Zeitleiste zu platzieren, zum Beispiel für das heutige Datum, verwenden Sie die Methode [addMarker](api/method/addmarker.md):

~~~js
var dateToStr = gantt.date.date_to_str(gantt.config.task_date);
var markerId = gantt.addMarker({
    start_date: new Date(), // Ein Date-Objekt, das das Markierungsdatum angibt
    css: "today", // CSS-Klasse, die auf die Markierung angewendet wird
    text: "Now", // Markierungsbeschriftung
    title: dateToStr(new Date()) // Tooltip-Text für die Markierung
});
~~~

[Today and Status lines in Gantt (vertical markers)](https://docs.dhtmlx.com/gantt/samples/02_extensions/05_today_line.html)


:::note
Beachten Sie, dass die Eigenschaft 'text' beliebigen HTML-Inhalt akzeptieren kann.
:::


Um ein Objekt abzurufen, das die hinzugefügte Markierung repräsentiert, verwenden Sie die Methode [getMarker](api/method/getmarker.md):

~~~js
var dateToStr = gantt.date.date_to_str(gantt.config.task_date);
var markerId = gantt.addMarker({  /*!*/
    start_date: new Date(), 
    css: "today", 
    text: "Now", 
    title: dateToStr(new Date()) 
});
gantt.getMarker(markerId); // gibt {css:"today", text:"Now", id:...} zurück
~~~

[Today and Status lines in Gantt (vertical markers)](https://docs.dhtmlx.com/gantt/samples/02_extensions/05_today_line.html)


## Entfernen einer Markierung

Um eine zuvor hinzugefügte Markierung zu löschen, verwenden Sie die Methode [deleteMarker](api/method/deletemarker.md): 

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

## Markierungen ausblenden

Um alle hinzugefügten Markierungen auszublenden, setzen Sie die Option [show_markers](api/config/show_markers.md) auf 'false': 

~~~js
var marker1 = gantt.addMarker({ ...}); 
var marker2 = gantt.addMarker({ ...}); 
var marker3 = gantt.addMarker({ ...}); 

gantt.config.show_markers = false; // blendet alle 3 Markierungen aus
~~~

## Aktualisieren einer Markierung

Um eine Markierung zu ändern, verwenden Sie die Methode [updateMarker](api/method/updatemarker.md):

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

Um alle Markierungen gleichzeitig zu aktualisieren, verwenden Sie die Methode [renderMarkers](api/method/rendermarkers.md): 

~~~js
var marker1 = gantt.addMarker({ ...}); 
var marker2 = gantt.addMarker({ ...}); 
var marker3 = gantt.addMarker({ ...}); 

gantt.renderMarkers(); /*!*/
~~~

## Markierungen gestalten 


Markierungen können mit der Vorlage [gantt.templates.marker_class](api/template/marker_class.md) gestaltet werden:

~~~js
var showAdvancedMarkers;
gantt.templates.marker_class = function(marker){
    if (showAdvancedMarkers)
    return "advanced_marker";
    return "hidden";
}
~~~

## Markierung für den heutigen Tag


Wenn Sie eine Markierung für den aktuellen Tag in Ihrem Gantt-Diagramm anzeigen möchten, müssen Sie sowohl die Markierung hinzufügen als auch eine Funktion bereitstellen, die ihre Position mit fortschreitender Zeit aktualisiert. Dies kann mit folgendem Code erreicht werden:

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


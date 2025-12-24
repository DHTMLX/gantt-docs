---
title: "Zooming"
sidebar_label: "Zooming"
---

# Zooming


dhtmlxGantt enthält ein integriertes Modul, das das Verwalten des Zooms der Zeitskala besonders einfach macht. Wenn Sie das Standardverhalten beim Zoomen anpassen möchten, steht Ihnen eine [flexible API](guides/zoom.md) zur Verfügung, mit der Sie die Einstellungen der Zeitskala dynamisch ändern können.

## Eingebautes Zoom-Modul


Das integrierte [Zoom-Modul](guides/zoom.md) ist Teil der **gantt.ext.zoom**-Erweiterung. Um es zu aktivieren, rufen Sie einfach **gantt.ext.zoom.init(zoomConfig)** auf und übergeben ein **zoomConfig**-Objekt, das ein Array von Zoomstufen enthält. Zum Beispiel:

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
Ausführliche Informationen über das Zoom-Modul und seine API finden Sie im Artikel [Zoom Extension](guides/zoom.md).
:::


[Mouse wheel zoom](https://docs.dhtmlx.com/gantt/samples/03_scales/14_scale_zoom_by_wheelmouse.html)


## Benutzerdefinierte Zoom-Einstellungen


Wenn Sie das Zoom-Modul nicht verwenden und die Einstellungen der Zeitskala selbst steuern möchten, können Sie dies tun, indem Sie die entsprechenden Konfigurationsoptionen anpassen.

Im Wesentlichen bedeutet das Hinzufügen von Zoomfunktionen, einige Voreinstellungen für die Zeitskala (Zoomstufen) zu definieren und dem Benutzer das Umschalten zwischen ihnen zu ermöglichen.

Hier sind die Einstellungen, die Sie für die Konfiguration der Zeitskala benötigen:

- [gantt.config.scales](api/config/scales.md) - ermöglicht das Festlegen beliebig vieler Zeitskalen-Zeilen.

- [gantt.config.min_column_width](api/config/min_column_width.md), [gantt.config.scale_height](api/config/scale_height.md) - steuern die Breite der Skalen-Spalten und die Gesamthöhe der Zeitskala.

Schauen wir uns einige Beispiel-Voreinstellungen an:

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

Diese Funktion richtet das gantt-Objekt mit einer von vier vordefinierten Konfigurationen ein, die von "day" bis "year" reichen. Um die Änderungen anzuwenden, muss das Gantt-Diagramm vollständig neu gezeichnet werden:

~~~js
setScaleConfig("year");
gantt.init("gantt_here");
~~~

Sie können dann eine einfache Benutzeroberfläche erstellen, mit der Benutzer die Zoomstufe wechseln können:


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


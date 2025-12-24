---
title: "Zoom-Erweiterung"
sidebar_label: "Zoom-Erweiterung"
---

# Zoom-Erweiterung


Weitere Details zur Zoom-Erweiterung finden Sie im Artikel [Zooming](guides/zooming.md). Dieses Dokument konzentriert sich auf die API-Referenz für das **zoom**-Objekt:

## Zoom-Stufen

Die Zoom-Erweiterung arbeitet mit einer Reihe von Skaleneinstellungen, die ein schnelles Umschalten zwischen diesen ermöglichen.

**ZoomLevel** ist ein Objekt, das die Skaleneinstellungen repräsentiert und folgende Eigenschaften besitzt:

- <span class="subproperty">**name**</span> - (*string*) - der Name, der der Stufe zugeordnet ist
- <span class="subproperty">**scale_height?**</span> - (*number*) - die Höhe der Skala
- <span class="subproperty">**height?**</span> - (*number*) - die Höhe der Skala
- <span class="subproperty">**min_column_width?**</span> - (*number*) - die minimale Spaltenbreite; hat Vorrang vor minColumnWidth und maxColumnWidth
- <span class="subproperty">**scales**</span> - (*Scales*) - ein Array von Skalen, zwischen denen beim Hinein- oder Herauszoomen auf dieser Stufe gewechselt werden kann

## Methoden

- <span class="submethod">**init (zoomConfig): void**</span> - initialisiert die Erweiterung mit der angegebenen Konfiguration.
    - **_zoomConfig_** - (*object*) - Konfigurationsobjekt, das das *levels*-Array mit den Zoom-Stufen enthält sowie mehrere optionale Eigenschaften:
        - **_levels_** - (*ZoomLevel[]*) - erforderlich, ein Array, das die Zoom-Stufen definiert
        - **_handler?_** - (*Function*): void - ermöglicht die Definition eines eigenen Mausrad-Handlers für die manuelle Zoom-Steuerung
            - **_e_** - (*Event*) - das native Event-Objekt
        - **_startDate?_** - (*Date*) - Startpunkt für das Zoomen auf der Zeitskala
        - **_endDate?_** - (*Date*) - Endpunkt für das Zoomen auf der Zeitskala
        - **_activeLevelIndex?_** - (*number*) - Index der standardmäßig aktiven Zoom-Stufe
        - **_widthStep?_** - (*number*) - Schrittweite für die Breitenänderung bei Wechsel der Zoom-Stufe
        - **_minColumnWidth?_** - (*number*) - minimale Spaltenbreite, die das Umschalten auf eine vorherige Zoom-Stufe erlaubt
        - **_maxColumnWidth?_** - (*number*) - maximale Spaltenbreite, die das Umschalten auf die nächste Zoom-Stufe erlaubt
        - **_useKey?_** - (*string*) - bestimmt, mit welcher Taste das Zoomen per Mausrad aktiviert wird: "ctrlKey" | "altKey" | "shiftKey"
        - **_trigger?_** - (*string | null | undefined*) - definiert den Zoom-Auslöser: "wheel" | null | undefined 
        - **_element?_** - (*HTMLElement | Function*): HTMLElement - das DOM-Element, das das Zoomen auslöst, oder eine Funktion, die ein solches Element zurückgibt

Hier sind zwei Beispiele, wie die **zoom**-Erweiterung konfiguriert werden kann:

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


// alternativ können die Stufen auch einfach als Arrays von Skalen definiert werden
var hourToStr = gantt.date.date_to_str("%H:%i");
var hourRangeFormat = function(step){
    return function(date){
        var intervalEnd = new Date(gantt.date.add(date, step, "hour") - 1)
        return hourToStr(date) + " - " + hourToStr(intervalEnd);
    };
};
var zoomConfig = {
    levels: [
        [
            { unit: "month", format: "%M %Y", step: 1},
        ],
        [
            { unit: "month", format: "%M %Y", step: 1},
            { unit: "day", format: "%d %M", step: 1}
        ],
        [
            { unit: "day", format: "%d %M", step: 1},
            { unit: "hour", format: hourRangeFormat(12), step: 12}
        ],
        [
            {unit: "day", format: "%d %M",step: 1},
            {unit: "hour",format: hourRangeFormat(6),step: 6}
        ],
        [
            { unit: "day", format: "%d %M", step: 1 },
            { unit: "hour", format: "%H:%i", step: 1}
        ]
    ]
}

gantt.ext.zoom.init(zoomConfig);
~~~

- <span class="submethod">**getCurrentLevel (): number**</span> - gibt den Index der aktuellen Zoom-Stufe zurück

~~~js
gantt.ext.zoom.getCurrentLevel();
~~~

- <span class="submethod">**setLevel (level): void**</span> - wechselt zur angegebenen Zoom-Stufe.
    - **_level_** - (*number | string*) - kann entweder der Name der Stufe als String (z.B. "year") oder ihr Index im Levels-Array sein

~~~js
gantt.ext.zoom.setLevel("year");
// oder 
gantt.ext.zoom.setLevel(5);
~~~

- <span class="submethod">**getLevels (): ZoomLevel[]**</span> - gibt alle definierten Zoom-Stufen zurück

~~~js
gantt.ext.zoom.getLevels();
~~~

Dies gibt das Array der Zoom-Stufen (*ZoomLevels[]*) zurück, das an die **init()**-Methode übergeben wurde.

- <span class="submethod">**zoomIn (): void**</span> - wechselt zu einer höheren Zoom-Stufe

~~~js
gantt.ext.zoom.zoomIn();
~~~

Alternativ ist dies auch möglich mit:

~~~js
gantt.ext.zoom.setLevel(zoom.getCurrentLevel() - 1)
~~~

- <span class="submethod">**zoomOut (): void**</span> - wechselt zu einer niedrigeren Zoom-Stufe

~~~js
gantt.ext.zoom.zoomOut();
~~~

Alternativ können Sie verwenden:

~~~js
gantt.ext.zoom.setLevel(zoom.getCurrentLevel() + 1)
~~~

- <span class="submethod">**attachEvent (name, handler): string**</span> - fügt einen Ereignis-Handler hinzu
    - **_name_** - (*string*) - Name des Ereignisses, das überwacht werden soll
    - **_handler_** - (*Function*) - Funktion, die beim Eintreten des Ereignisses ausgeführt wird

- <span class="submethod">**detachEvent (id): void**</span> - entfernt einen zuvor hinzugefügten Ereignis-Handler
    - **_id_** - (*string*) - die Kennung des zu entfernenden Ereignis-Handlers

- <span class="submethod">**callEvent (name, params): boolean**</span> - löst ein internes Ereignis aus
    - **_name_** - (*string*) - Name des Ereignisses, Groß-/Kleinschreibung wird ignoriert
    - **_params_** - (*Array&lt;any&gt;*) - optionales Array mit Daten zum Ereignis

- <span class="submethod">**checkEvent (name): boolean**</span> - prüft, ob für ein bestimmtes Ereignis Handler registriert sind
    - **_name_** - (*string*) - Name des Ereignisses

Gibt <i>true</i> zurück, wenn mindestens ein Handler für das Ereignis registriert ist.

## Ereignisse

- **<span class="eventname">onAfterZoom</span>** - wird ausgelöst, wenn sich die Zoom-Stufe ändert.
Das Ereignis liefert folgende Argumente: 
<span class="eventarguments">
    - **_level_** - (*number | string*) - der Index oder Name der Zoom-Stufe
    - **_config_** - (*ZoomLevel*) - das Konfigurationsobjekt für die Zoom-Stufe
</span>

~~~js
gantt.ext.zoom.attachEvent("onAfterZoom", function(level, config){ 
    document.querySelector(".gantt_radio[value='" +config.name+ "']").checked = true;
}); 
~~~

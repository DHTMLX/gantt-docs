--- 
title: "Zoom-Erweiterung" 
sidebar_label: "Zoom-Erweiterung" 
--- 

# Zoom-Erweiterung

Details zur Zoom-Erweiterung finden Sie im Artikel [Zooming](guides/zooming.md).

Der vorliegende Artikel enthält die API-Referenz des **zoom**-Objekts:


## Zoom-Stufen

Die Zoom-Erweiterung verwendet eine Reihe von Skalen-Einstellungen und ermöglicht das schnelle Wechseln zwischen ihnen.

**ZoomLevel** ist ein Objekt, das die Skalen-Einstellungen enthält. Es hat folgende Eigenschaften:

- <span class="subproperty">**name**</span> - (*string*) - der Name der Stufe
- <span class="subproperty">**scale_height?**</span> - (*number*) - die Höhe der Skala
- <span class="subproperty">**height?**</span> - (*number*) - die Höhe der Skala
- <span class="subproperty">**min_column_width?**</span> - (*number*) - die minimale Breite einer Spalte. Sie hat eine höhere Priorität als minColumnWidth und maxColumnWidth
- <span class="subproperty">**scales**</span> - (*Scales*) - ein Array von Skalen, zwischen denen beim Zoomen hinein/heraus auf dieser Ebene gewechselt wird


## Methoden

- <span class="submethod">**init (zoomConfig): void**</span> - initialisiert die Erweiterung mit der übergebenen Konfiguration.
    - **_zoomConfig_** - (*object*) - ein Objekt mit Konfigurationseinstellungen, das das *levels*-Array von Zoom-Leveln und eine Reihe zusätzlicher Eigenschaften enthält:
        - **_levels_** - (*ZoomLevel[]*) - erforderlich, ein Array von ZoomLevel-Objekten
        - **_handler?_** - (*Function*): void - ermöglicht das Festlegen eines benutzerdefinierten Mausrad-Handlers zur manuellen Steuerung des Zoomings
            - **_e_** - (*Event*) - ein natives Event-Objekt.
        - **_startDate?_** - (*Date*) - der Startwert der Zeit-Skala-Zoomung
        - **_endDate?_** - (*Date*) - der Endwert der Zeit-Skala-Zoomung
        - **_activeLevelIndex?_** - (*number*) - die Nummer des standardmäßig aktiven Levels
        - **_widthStep?_** - (*number*) - der Schritt zum Erhöhen/Verringern der Breite der Skala beim Wechsel zum nächsten/vorherigen Zoom-Level
        - **_minColumnWidth?_** - (*number*) - die minimale Breite einer Spalte, die einen Wechsel zum vorherigen Zoom-Level ermöglicht
        - **_maxColumnWidth?_** - (*number*) - die maximale Breite einer Spalte, die einen Wechsel zum nächsten Zoom-Level ermöglicht
        - **_useKey?_** - (*string*) - die Taste, die das Zoomen durch Scrollen mit dem Mausrad aktiviert: "ctrlKey" | "altKey" | "shiftKey"
        - **_trigger?_** - (*string | null | undefined*) - der Auslöser des Zoomens: "wheel" | null | undefined 
        - **_element?_** - (*HTMLElement | Function*): HTMLElement - ein DOM-Element, über dem Zoomen ausgelöst wird oder eine Funktion, die ein DOM-Element zurückgibt

Dies sind zwei Beispiele zur Einstellung der **zoom**-Konfiguration:

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


// oder, in einer einfacheren Weise können Ebenen auch als Skalen-Arrays dargestellt werden
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

- <span class="submethod">**getCurrentLevel (): number**</span> - Gibt die Nummer (Index) des aktuellen Zoom-Level zurück

~~~js
gantt.ext.zoom.getCurrentLevel();
~~~

- <span class="submethod">**setLevel (level): void**</span> - wechselt zum angegebenen Zoom-Level.
    - **_level_** - (*number | string*) - Das Level wird entweder durch einen String definiert (den Namen des Levels aus der Konfiguration, z. B. "year"), oder durch seine Nummer im Array der Levels

~~~js
gantt.ext.zoom.setLevel("year");
// oder 
gantt.ext.zoom.setLevel(5);
~~~

- <span class="submethod">**getLevels (): ZoomLevel[]**</span> - ermöglicht das Abrufen aller Zoom-Level

~~~js
gantt.ext.zoom.getLevels();
~~~

Gibt ein Array von Zoom-Leveln (*ZoomLevel[]*) zurück, das an die Methode **init()** übergeben wurde, die die Erweiterung initialisiert.

- <span class="submethod">**zoomIn (): void**</span> - erhöht das aktuelle Zoom-Level

~~~js
gantt.ext.zoom.zoomIn();
~~~

Für denselben Zweck können Sie auch Folgendes verwenden:

~~~js
gantt.ext.zoom.setLevel(zoom.getCurrentLevel() - 1)
~~~

- <span class="submethod">**zoomOut (): void**</span> - verringert das aktuelle Zoom-Level

~~~js
gantt.ext.zoom.zoomOut();
~~~

Für denselben Zweck können Sie auch Folgendes verwenden:

~~~js
gantt.ext.zoom.setLevel(zoom.getCurrentLevel() + 1)
~~~

- <span class="submethod">**attachEvent (name, handler): string**</span> - hängt einen Ereignis-Handler an
    - **_name_** - (*string*) - der Name des Ereignis-Handlers
    - **_handler_** - (*Function*) - die Funktion, die aufgerufen wird, wenn das Ereignis ausgelöst wird

- <span class="submethod">**detachEvent (id): void**</span> - trennt einen Handler von einem Ereignis
    - **_id_** - (*string*) - die ID des angehängten Ereignis-Handlers

- <span class="submethod">**callEvent (name, params): boolean**</span> - ruft ein internes Ereignis auf
    - **_name_** - (*string*) - der Name des Ereignisses, case-insensitive
    - **_params_** - (*Array&lt;any&gt;*) - optional, ein Array von ereignisbezogenen Daten

- <span class="submethod">**checkEvent (name): boolean**</span> - prüft, ob für ein Ereignis irgendein Handler angegeben ist
    - **_name_** - (*string*) - der Name des Ereignisses

Gibt <i>true</i> zurück, wenn für das Ereignis ein Handler angegeben ist.


## Ereignisse

- **<span class="eventname">onAfterZoom</span>** - löst während des Wechsels des Zoom-Levels aus.
Die Argumente sind: 
<span class="eventarguments">
    - **_level_** - (*number | string*) - die Nummer des Levels
    - **_config_** - (*ZoomLevel*) - die Konfiguration des Levels
</span>

~~~js
gantt.ext.zoom.attachEvent("onAfterZoom", function(level, config){ 
    document.querySelector(".gantt_radio[value='" +config.name+ "']").checked = true;
}); 
~~~
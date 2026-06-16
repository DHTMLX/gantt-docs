--- 
title: "Zoom-Erweiterung" 
sidebar_label: "Zoom-Erweiterung" 
--- 

# Zoom-Erweiterung

Sie können Details zur Zoom-Erweiterung im Artikel [Zooming](guides/zooming.md) lesen. Der aktuelle Artikel bietet die API-Referenz des `zoom`-Objekts:

## Zoom-Stufen

Die Zoom-Erweiterung verwendet eine Reihe von Skaleneinstellungen und ermöglicht ein schnelles Umschalten zwischen ihnen.

`ZoomLevel` ist ein Objekt, das die Skaleneinstellungen enthält. Es besitzt die folgenden Eigenschaften:

- <span class="subproperty">**name**</span> - (*string*) - der Name der Stufe
- <span class="subproperty">**scale_height?**</span> - (*number*) - die Höhe der Skala
- <span class="subproperty">**height?**</span> - (*number*) - die Höhe der Skala
- <span class="subproperty">**min_column_width?**</span> - (*number*) - die minimale Breite einer Spalte. Sie hat eine höhere Priorität als minColumnWidth und maxColumnWidth
- <span class="subproperty">**scales**</span> - (*Scales*) - ein Array von Skalen, zwischen denen beim Zoomen innerhalb dieser Stufe gewechselt wird


## Methoden

- <span class="submethod">**init(zoomConfig): void**</span> - initialisiert die Erweiterung mit der übergebenen Konfiguration.
    - **_zoomConfig?_** - (*object*) - ein Objekt mit Konfigurationseinstellungen, das das *levels*-Array der Zoom-Stufen und eine Reihe zusätzlicher Eigenschaften enthält:
        - **_levels?_** - (*ZoomLevel[]*) - ein Array von Zoom-Stufen. Optional – wird es weggelassen, verwendet man ein Set von [Standard benannten Ebenen](guides/zooming.md#default-zoom-levels) ("hour", "day", "week", "month", "year")
        - **_handler?_** - (*Function*): void - ermöglicht das Spezifizieren eines benutzerdefinierten Handlers für das Mausrad, um das Zoomen manuell zu steuern
            - **_e_** - (*Event*) - ein natives Ereignisobjekt.
        - **_startDate?_** - (*Date*) - der Startwert der Zeitmaßstab-Zoomung
        - **_endDate?_** - (*Date*) - der Endwert der Zeitmaßstab-Zoomung
        - **_activeLevelIndex?_** - (*number*) - die Nummer des standardmäßig aktiven Levels
        - **_widthStep?_** - (*number*) - der Schritt zum Erhöhen/verkleinern der Breite der Skala beim Wechsel zum nächsten/vorherigen Zoom-Level
        - **_minColumnWidth?_** - (*number*) - die minimale Breite einer Spalte, die den Wechsel zum vorherigen Zoom-Level ermöglicht
        - **_maxColumnWidth?_** - (*number*) - die maximale Breite einer Spalte, die den Wechsel zum nächsten Zoom-Level ermöglicht
        - **_useKey?_** - (*string*) - die Taste, die das Zoomen durch Scrollen der Maus aktiviert: "ctrlKey" | "altKey" | "shiftKey"
        - **_trigger?_** - (*string | null | undefined*) - der Auslöser des Zoomens: "wheel" | null | undefined 
        - **_element?_** - (*HTMLElement | Function*): HTMLElement - ein DOM-Element, über dem Zoomen ausgelöst wird, oder eine Funktion, die ein DOM-Element zurückgibt
        - **_fit?_** - (*object*) - die Standard [zoom-to-fit](#zoom-to-fit)-Einstellungen. Zusammen mit den unten aufgeführten Optionen von `zoomToFit` akzeptiert es *levels* (ein eigener Satz von Skalen, der ausschließlich zum Anpassen verwendet wird) und *handler* (eine Funktion, die die Level-Auswahl überschreibt)

Dies sind zwei Beispiele zur Einstellung der `zoom`-Konfiguration:

~~~js
const zoomConfig = {
    levels: [
        {
            name: "day",
            scale_height: 27,
            min_column_width: 80,
            scales: [{ unit: "day", step: 1, format: "%d %M" }]
        },
        {
            name: "week",
            scale_height: 50,
            min_column_width: 50,
            scales: [
                {
                    unit: "week",
                    step: 1,
                    format: (date) => {
                        const dateToStr = gantt.date.date_to_str("%d %M");
                        const endDate = gantt.date.add(date, 6, "day");
                        const weekNumber = gantt.date.date_to_str("%W")(date);

                        return `#${weekNumber}, ${dateToStr(date)} - ${dateToStr(endDate)}`;
                    }
                },
                { unit: "day", step: 1, format: "%j %D" }
            ]
        },
        {
            name: "month",
            scale_height: 50,
            min_column_width: 120,
            scales: [{ unit: "month", format: "%F, %Y" }, { unit: "week", format: "Week #%W" }]
        },
        {
            name: "quarter",
            height: 50,
            min_column_width: 90,
            scales: [
                { unit: "month", step: 1, format: "%M" },
                {
                    unit: "quarter",
                    step: 1,
                    format: (date) => {
                        const dateToStr = gantt.date.date_to_str("%M");
                        const endDate = gantt.date.add(gantt.date.add(date, 3, "month"), -1, "day");

                        return `${dateToStr(date)} - ${dateToStr(endDate)}`;
                    }
                }
            ]
        },
        {
            name: "year",
            scale_height: 50,
            min_column_width: 30,
            scales: [{ unit: "year", step: 1, format: "%Y" }]
        }
    ]
};

gantt.ext.zoom.init(zoomConfig);


// or, in a more simple way levels can be presented as scale arrays
const hourToStr = gantt.date.date_to_str("%H:%i");
const hourRangeFormat = (step) => {
    return (date) => {
        const intervalEnd = new Date(gantt.date.add(date, step, "hour") - 1);

        return `${hourToStr(date)} - ${hourToStr(intervalEnd)}`;
    };
};
const simpleZoomConfig = {
    levels: [
        [
            { unit: "month", format: "%M %Y", step: 1 }
        ],
        [
            { unit: "month", format: "%M %Y", step: 1 },
            { unit: "day", format: "%d %M", step: 1 }
        ],
        [
            { unit: "day", format: "%d %M", step: 1 },
            { unit: "hour", format: hourRangeFormat(12), step: 12 }
        ],
        [
            { unit: "day", format: "%d %M", step: 1 },
            { unit: "hour", format: hourRangeFormat(6), step: 6 }
        ],
        [
            { unit: "day", format: "%d %M", step: 1 },
            { unit: "hour", format: "%H:%i", step: 1 }
        ]
    ]
};

gantt.ext.zoom.init(simpleZoomConfig);
~~~

- <span class="submethod">**getCurrentLevel(): number**</span> - gibt die Nummer (den Index) der aktuellen Zoom-Stufe zurück

~~~js
gantt.ext.zoom.getCurrentLevel();
~~~

- <span class="submethod">**setLevel(level): void**</span> - wechselt zur angegebenen Zoom-Stufe.
    - **_level_** - (*number | string*) - Die Stufe wird entweder durch einen Namen aus der Konfiguration (z. B. "year") oder durch ihre Nummer im Array der Ebenen definiert

~~~js
gantt.ext.zoom.setLevel("year");
// oder 
gantt.ext.zoom.setLevel(5);
~~~

- <span class="submethod">**getLevels(): ZoomLevel[]**</span> - ermöglicht das Abrufen aller Zoom-Stufen

~~~js
gantt.ext.zoom.getLevels();
~~~

Gibt ein Array von Zoom-Stufen (*ZoomLevel[]*) zurück, das an `init()` übergeben wurde und die Erweiterung initialisiert.

- <span class="submethod">**zoomIn(): void**</span> - erhöht die aktuelle Zoom-Stufe

~~~js
gantt.ext.zoom.zoomIn();
~~~

Für denselben Zweck können Sie auch verwenden:

~~~js
gantt.ext.zoom.setLevel(gantt.ext.zoom.getCurrentLevel() - 1);
~~~

- <span class="submethod">**zoomOut(): void**</span> - reduziert die aktuelle Zoom-Stufe

~~~js
gantt.ext.zoom.zoomOut();
~~~

Für denselben Zweck können Sie auch verwenden:

~~~js
gantt.ext.zoom.setLevel(gantt.ext.zoom.getCurrentLevel() + 1);
~~~

- <span class="submethod">**zoomToFit(options?): boolean**</span> - wählt die detaillierteste Zoom-Stufe aus, bei der die Zielaufgaben in die Timeline-Breite passen, ohne horizontal zu scrollen, und wendet sie an. Siehe [Zoom to fit](#zoom-to-fit) für die Liste der Optionen. Die Methode ist idempotent und gibt *true* zurück, wenn eine passende Stufe angewendet wurde, *false* sonst.

~~~js
gantt.ext.zoom.zoomToFit();
// oder nur die aktuell sichtbaren (erweiterten) Zeilen anpassen
gantt.ext.zoom.zoomToFit({ scope: "visible" });
~~~

- <span class="submethod">**resetZoom(): boolean**</span> - stellt das Zoom-Level und den Zeitmaßstab wieder her, die vor dem ersten Aufruf von `zoomToFit()` aktiv waren. Gibt *true* zurück, wenn eine gespeicherte Skala wiederhergestellt wurde, *false* wenn nichts wiederhergestellt werden kann.

~~~js
gantt.ext.zoom.resetZoom();
~~~

- <span class="submethod">**attachEvent(name, handler): string**</span> - hängt einen Event-Handler an
    - **_name_** - (*string*) - der Name des Ereignis-Handler
    - **_handler_** - (*Function*) - die Funktion, die aufgerufen wird, wenn das Ereignis ausgelöst wird

- <span class="submethod">**detachEvent(id): void**</span> - trennt einen Handler von einem Ereignis
    - **_id_** - (*string*) - die ID des angehängten Ereignis-Handlers

- <span class="submethod">**callEvent(name, params): boolean**</span> - ruft ein internes Ereignis auf
    - **_name_** - (*string*) - der Name des Ereignisses, Groß-/Kleinschreibung ignoriert
    - **_params_** - (*Array&lt;any&gt;*) - optional, ein Array der ereignisbezogenen Daten

- <span class="submethod">**checkEvent(name): boolean**</span> - prüft, ob für das Ereignis ein Handler angegeben ist
    - **_name_** - (*string*) - der Name des Ereignisses

Gibt <i>true</i> zurück, wenn für das Ereignis ein Handler angegeben ist.

## Zoom-to-fit

[`zoomToFit(options)`](#methods) und die `fit`-Einstellung von [`init()`](#methods) akzeptieren folgende Optionen:

- <span class="subproperty">**scope?**</span> - (*"all" | "visible"*) - welche Aufgaben angepasst werden sollen: *"all"* (Standard) passt jede geladene Aufgabe, einschließlich Aufgaben unter zusammengeklappten Zweigen; *"visible"* passt nur die derzeit erweiterten Zeilen
- <span class="subproperty">**taskId?**</span> - (*string | number*) - passt eine einzelne Aufgabe zusammen mit ihrem Teilbaum
- <span class="subproperty">**range?**</span> - (*object*) - passt einen expliziten Datumsbereich mit den Eigenschaften *start_date* und *end_date* (*Date*)
- <span class="subproperty">**rangeMode?**</span> - (*"auto" | "preserve" | "target"*) - ob der angezeigte `start_date`/`end_date` durch den angepassten Bereich überschrieben wird. *"target"* setzt immer den angepassten Bereich, *"preserve"* behält die aktuellen Grenzen, *"auto"* (Standard) behält explizite Grenzen bei, wenn sie gesetzt sind, und setzt andernfalls den angepassten Bereich
- <span class="subproperty">**padding?**</span> - (*number*) - die Anzahl zusätzlicher Spalten vor dem ersten und nach dem letzten passenden Datum. Standard: *1*
- <span class="subproperty">**minLevel?**</span> - (*string | number*) - die detaillierteste Zoom-Stufe, die `zoomToFit` auswählen darf
- <span class="subproperty">**maxLevel?**</span> - (*string | number*) - die grobste Zoom-Stufe, die `zoomToFit` auswählen darf

Wenn via die `fit`-Eigenschaft von `init()` gesetzt, akzeptiert die Konfiguration zusätzlich:

- <span class="subproperty">**levels?**</span> - (*ZoomLevel[]*) - ein dediziertes Set von Zoom-Stufen, das nur von `zoomToFit` berücksichtigt wird. Wird ausgelassen, werden die interaktiven Zoom-Stufen verwendet
- <span class="subproperty">**handler?**</span> - (*Function*): string | number | boolean | void - überschreibt die Level-Auswahl. Es erhält ein *context*-Objekt und sollte einen Level-Namen bzw. Index zurückgeben, um anzuwenden, `false`, um die Anpassung abzubrechen, oder nichts, um das berechnete Level beizubehalten
    - **_context_** - (*object*) - ein Objekt `{ range, viewportWidth, levels, padding, defaultLevel }`, wobei *defaultLevel* der Level-Index ist, den der eingebaute Algorithmus gewählt hat

Optionen, die direkt an `zoomToFit()` übergeben werden, überschreiben die Standards, die über `init({ fit })` festgelegt wurden.

~~~js
gantt.ext.zoom.init({
    fit: {
        scope: "all",
        // ein dediziertes Satz von Skalen, der nur zum Anpassen verwendet wird
        levels: [
            { name: "weeks", scale_height: 50, scales: [{ unit: "week", step: 1, format: "Week #%W" }] },
            { name: "months", scale_height: 50, scales: [{ unit: "month", step: 1, format: "%F, %Y" }] }
        ],
        handler: (context) => {
            // geben Sie einen Level-Namen/Index zurück, false zum Abbruch oder nichts, um das Standard-Verhalten beizubehalten
            return context.defaultLevel;
        }
    }
});

gantt.ext.zoom.zoomToFit();
~~~

- <span class="eventname">onAfterZoom</span> Ereignis
-  löst beim Wechsel der Zoom-Stufe aus. Die Argumente sind:
<span class="eventarguments">
    - <span class="eventargument">_level_</span> - (*number | string*) - die Nummer der Stufe
    - <span class="eventargument">_config_</span> - (*ZoomLevel*) - die Konfiguration der Stufe
</span>

~~~js
gantt.ext.zoom.attachEvent("onAfterZoom", (level, config) => {
    document.querySelector(`.gantt_radio[value='${config.name}']`).checked = true;
});
~~~
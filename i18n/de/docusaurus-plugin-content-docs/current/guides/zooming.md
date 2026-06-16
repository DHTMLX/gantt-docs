--- 
title: "Zoomen"
sidebar_label: "Zoomen"
---

# Zoomen

dhtmlxGantt bietet ein integriertes Modul zur bequemen Steuerung des Zooms des Zeitrasters. Falls Sie das Standardverhalten des Zoomings anpassen möchten, steht eine [flexible API](guides/zoom.md) zur Verfügung, mit der Sie die Einstellungen des Zeitrasters dynamisch ändern können.

## Integriertes Zoom-Modul

Das eingebettete [Zoom-Modul](guides/zoom.md) ist in der Erweiterung `gantt.ext.zoom` deklariert. Um das Modul zu aktivieren, müssen Sie `gantt.ext.zoom.init(zoomConfig)` aufrufen und ein `zoomConfig`-Objekt mit Konfigurationseinstellungen übergeben, das ein Array von Zoom-Stufen enthält. Zum Beispiel:

~~~js
const zoomConfig = {
    levels: [
        {
            name: "day",
            scale_height: 27,
            min_column_width: 80,
            scales: [
                { unit: "day", step: 1, format: "%d %M" }
            ]
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
                        const formatDate = gantt.date.date_to_str("%d %M");
                        const endDate = gantt.date.add(date, 6, "day");
                        const weekNumber = gantt.date.date_to_str("%W")(date);
                        return `#${weekNumber}, ${formatDate(date)} - ${formatDate(endDate)}`;
                    }
                },
                { unit: "day", step: 1, format: "%j %D" }
            ]
        },
        {
            name: "month",
            scale_height: 50,
            min_column_width: 120,
            scales: [
                { unit: "month", format: "%F, %Y" },
                { unit: "week", format: "Week #%W" }
            ]
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
                        const formatDate = gantt.date.date_to_str("%M");
                        const endDate = gantt.date.add(gantt.date.add(date, 3, "month"), -1, "day");
                        return `${formatDate(date)} - ${formatDate(endDate)}`;
                    }
                }
            ]
        },
        {
            name: "year",
            scale_height: 50,
            min_column_width: 30,
            scales: [
                { unit: "year", step: 1, format: "%Y" }
            ]
        }
    ]
};

gantt.ext.zoom.init(zoomConfig);
~~~

:::note
Detailed information about the zooming module and its API is given in the article [Zoom Extension](guides/zoom.md).
:::

**Related sample**: [Zoom per Mausrad](https://docs.dhtmlx.com/gantt/samples/03_scales/14_scale_zoom_by_wheelmouse.html)

### Standard-Zoomstufen

Wenn Sie `gantt.ext.zoom.init()` ohne die Einstellung `levels` aufrufen, verwendet die Erweiterung eine Reihe vorkonfigurierter, benannter Zoom-Stufen – **"hour"**, **"day"**, **"week"**, **"month"** und **"year"**. Dadurch können Sie das Zoomen mit einem einzigen Aufruf aktivieren und die Skala nach Namen wechseln:

~~~js
gantt.ext.zoom.init();

gantt.ext.zoom.setLevel("week");
~~~

Geben Sie das `levels`-Array an, wenn Sie benutzerdefinierte Skalen oder Bezeichnungen benötigen.

## Zoom to fit

Die Zoom-Erweiterung kann automatisch die detaillierteste Zoom-Stufe auswählen, bei der alle Aufgaben in die Timeline-Breite passen, ohne horizontal zu scrollen. Rufen Sie [`gantt.ext.zoom.zoomToFit()`](guides/zoom.md#methods) auf und, wenn Sie wieder zur vorherigen Skala zurückkehren möchten, [`gantt.ext.zoom.resetZoom()`](guides/zoom.md#methods):

~~~js
gantt.ext.zoom.init();

// alle geladenen Aufgaben in den sichtbaren Timeline-Bereich anpassen
gantt.ext.zoom.zoomToFit();

// die Skala wiederherstellen, die vor dem ersten zoomToFit() aktiv war
gantt.ext.zoom.resetZoom();
~~~

`zoomToFit()` gibt `true` zurück, wenn eine passende Stufe angewendet wurde, andernfalls `false` (z. B. bei einem leeren Diagramm).

Standardmäßig passt `zoomToFit()` alle geladenen Aufgaben. Sie können festlegen, was angepasst wird, und sogar die Auswahllogik über die `fit`-Einstellung von `init()` oder über die Optionen, die an `zoomToFit()` übergeben werden, neu definieren:

~~~js
gantt.ext.zoom.init({
    levels: [ /* interaktive Zoom-Stufen */ ],
    fit: {
        scope: "all", // "all" (Standard) passt jede geladene Aufgabe, "visible" - nur erweiterte Zeilen
        levels: [ /* optional, ein Satz von Skalen, die nur zum Anpassen verwendet werden */ ],
        handler: (context) => {
            // context: { range, viewportWidth, levels, padding, defaultLevel }
            return context.defaultLevel; // gebe einen Namen/Index einer Stufe zurück oder false, um abzubrechen
        }
    }
});

// Pro-Aufruf-Optionen überschreiben die Defaults von init()
gantt.ext.zoom.zoomToFit({ scope: "visible" });               // passt nur die erweiterten Zeilen
gantt.ext.zoom.zoomToFit({ taskId: 5 });                      // passt eine Aufgabe und ihren Teilbaum an
gantt.ext.zoom.zoomToFit({ range: { start_date, end_date } });// passt einen expliziten Datumsbereich an
~~~

Die vollständige Liste der Optionen finden Sie im Artikel [Zoom Extension](guides/zoom.md#zoom-to-fit).

**Related sample**: [Zoom zum Anpassen](https://docs.dhtmlx.com/gantt/samples/03_scales/13_zoom_to_fit.html)

## Benutzerdefinierte Zoom-Einstellungen

Falls Sie das Zoom-Modul nicht verwenden möchten und die Skalen-Einstellungen manuell steuern möchten, können Sie dies über entsprechende Konfigurationsoptionen tun.

Tatsächlich bedeutet die Implementierung einer Zoom-Funktion das Definieren mehrerer Presets der Zeitachsen-Konfiguration (Zoom-Stufen) und dem Benutzer die Möglichkeit zu geben, zwischen ihnen zu wechseln.

Sie benötigen die folgenden Einstellungen, um die Zeitachse zu konfigurieren:

- [`gantt.config.scales`](api/config/scales.md) - ermöglicht das Festlegen beliebig vieler Zeitachsenzeilen
- [`gantt.config.min_column_width`](api/config/min_column_width.md), [`gantt.config.scale_height`](api/config/scale_height.md) - die Breite einer Zeitachsen-Spalte und die Gesamthöhe der Zeitachse

Lassen Sie uns die folgenden Presets betrachten:

~~~js
/* global gantt */
const setScaleConfig = (level) => {
    switch (level) {
        case "day":
            gantt.config.scales = [
                { unit: "day", step: 1, format: "%d %M" }
            ];
            gantt.config.scale_height = 27;
            break;
        case "week": {
            const formatWeekScale = (date) => {
                const formatDate = gantt.date.date_to_str("%d %M");
                const endDate = gantt.date.add(gantt.date.add(date, 1, "week"), -1, "day");
                return `${formatDate(date)} - ${formatDate(endDate)}`;
            };

            gantt.config.scales = [
                { unit: "week", step: 1, format: formatWeekScale },
                { unit: "day", step: 1, format: "%D" }
            ];
            gantt.config.scale_height = 50;
            break;
        }
        case "month":
            gantt.config.scales = [
                { unit: "month", step: 1, format: "%F, %Y" },
                { unit: "day", step: 1, format: "%j, %D" }
            ];
            gantt.config.scale_height = 50;
            break;
        case "year":
            gantt.config.scales = [
                { unit: "year", step: 1, format: "%Y" },
                { unit: "month", step: 1, format: "%M" }
            ];
            gantt.config.scale_height = 90;
            break;
    }
};
~~~

Die beschriebene Funktion kann das gantt-Objekt mit einer der vier vordefinierten Konfigurationen konfigurieren, von der Zeitachse "day" bis "year". Gantt erfordert eine vollständige Neuzeichnung, um die Änderung der Konfiguration anzuzeigen:

~~~js
setScaleConfig("year");
gantt.init("gantt_here");
~~~

Dann können Sie eine Benutzeroberfläche implementieren, damit der Benutzer die Zoom-Stufe wechseln kann:

~~~html
<label><input type="radio" name="scale" value="day" checked/>Tag-Skala</label>
<label><input type="radio" name="scale" value="week"/>Wochen-Skala</label>
<label><input type="radio" name="scale" value="month"/>Monats-Skala</label>
<label><input type="radio" name="scale" value="year"/>Jahres-Skala</label>
~~~

~~~js
const scaleInputs = document.querySelectorAll("input[name='scale']");

scaleInputs.forEach((input) => {
    input.onclick = (event) => {
        const selectedScale = event.target.value;
        setScaleConfig(selectedScale);
        gantt.render();
    };
});
~~~

**Related sample**: [Dynamische Skalen](https://docs.dhtmlx.com/gantt/samples/03_scales/05_dynamic_scales.html)
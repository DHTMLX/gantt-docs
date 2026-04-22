--- 
title: "Zoomen"
sidebar_label: "Zoomen"
---

# Zoomen

dhtmlxGantt bietet ein integriertes Modul zur bequemen Verwaltung des Zooms der Zeitachse. Falls Sie das standardmäßige Zoom-Verhalten anpassen möchten, gibt es eine [flexible API](guides/zoom.md), die es Ihnen ermöglicht, die Einstellungen der Zeitachse dynamisch zu ändern.

## Eingebautes Zoom-Modul

Das eingebundene [Zoom-Modul](guides/zoom.md) ist in der Erweiterung `gantt.ext.zoom` deklariert. Um das Modul zu aktivieren, müssen Sie `gantt.ext.zoom.init(zoomConfig)` aufrufen und ein `zoomConfig`-Objekt mit Konfigurationsparametern übergeben, das ein Array von Zoom-Stufen enthält. Zum Beispiel:

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
Detaillierte Informationen zum Zoom-Modul und seiner API finden Sie im Artikel [Zoom Extension](guides/zoom.md).
:::

**Beispiel**: [Mouse wheel zoom](https://docs.dhtmlx.com/gantt/samples/03_scales/14_scale_zoom_by_wheelmouse.html)

## Benutzerdefinierte Zoom-Einstellungen

Falls Sie das Zoom-Modul nicht verwenden möchten und die Skaleneinstellungen manuell steuern möchten, können Sie dies über entsprechende Konfigurationsoptionen tun.

Tatsächlich bedeutet die Implementierung einer Zoom-Funktion das Definieren mehrerer Voreinstellungen der Zeitachsen-Konfiguration (Zoom-Stufen) und dem Benutzer die Möglichkeit zu geben, zwischen ihnen zu wechseln.

Sie benötigen die folgenden Einstellungen, um die Zeitachse zu konfigurieren:

- [`gantt.config.scales`](api/config/scales.md) - ermöglicht das Festlegen beliebiger Zeitachsenzeilen
- [`gantt.config.min_column_width`](api/config/min_column_width.md), [`gantt.config.scale_height`](api/config/scale_height.md) - die Breite der Spalten der Zeitachse und die Gesamthöhe der Zeitachse

Betrachten wir die folgenden Voreinstellungen:

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

Die beschriebene Funktion kann das gantt-Objekt mit einer der vier vordefinierten Konfigurationen konfigurieren, von der "day"-Zeitachse bis zur "year"-Zeitachse.
Gantt wird eine vollständige Neuzeichnung benötigen, um die Änderung der Konfiguration anzuzeigen:

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

**Beispiel:** [Dynamische Skalen](https://docs.dhtmlx.com/gantt/samples/03_scales/05_dynamic_scales.html)
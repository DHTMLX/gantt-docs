--- 
title: "Leistung: Wege zur Verbesserung"
sidebar_label: "Leistung: Wege zur Verbesserung"
---

# Leistung: Wege zur Verbesserung

## Gängige Techniken {#common-techniques}

Gantt von DHTMLX unterstützt große Datensätze. Veröffentlichte Leistungsmessungen für Datensätze mit bis zu 100.000 Aufgaben finden Sie in den [JavaScript-Gantt-Benchmarks](https://github.com/DHTMLX/js-gantt-benchmarks). Um Gantt mit einem großen Datensatz zu sehen, öffnen Sie die [Demo mit großem Datensatz](https://docs.dhtmlx.com/gantt/demos/large-dataset-performance/).

Die Leistung in einer Anwendung hängt von ihrer Konfiguration, den Aufgabenabhängigkeiten, den Kalendern, dem benutzerdefinierten Rendering, dem Browser und der Hardware ab. Messen Sie die Serverantwort und die Datenübertragung getrennt vom clientseitigen Rendering und von der Planung.

Lassen Sie das [Smart Rendering](#smart-rendering) (Rendering-Virtualisierung) bei der Arbeit mit großen Datensätzen aktiviert. Wenn ein Vorgang in Ihrer Anwendung langsam ist, messen Sie ihn und wenden Sie die passenden der folgenden Techniken an:

1. Um das Hintergrundbild für den Timeline-Bereich statt der tatsächlichen Linien zu setzen (setzen Sie die [static_background](api/config/static_background.md) Option auf 'true'; Zellen mit benutzerdefinierten CSS-Klassen werden weiterhin als Zellen gerendert) (**PRO**-Funktionalität, [lesen Sie die Details unten](#working-with-a-large-date-range))
2. Um die anfängliche Datenübertragung und die Speichernutzung des Browsers zu verringern, wenn nur einige Zweige benötigt werden, verwenden Sie das [dynamische Laden](guides/dynamic-loading.md) (setzen Sie die [branch_loading](api/config/branch_loading.md) Option auf 'true', **PRO**-Funktionalität)
3. Um eine gröbere Zeitskala zu verwenden (setzen Sie die **unit**-Eigenschaft der [scales](api/config/scales.md) Option auf "month" oder "year" oder erhöhen Sie deren **step**)
4. Um den Bereich der anzeigbaren Daten zu verkleinern (verwenden Sie die [start_date](api/config/start_date.md) und [end_date](api/config/end_date.md) Optionen)
5. Um die Geschwindigkeit der Skalen-Darstellung zu erhöhen (aktivieren Sie die [smart_scales](api/config/smart_scales.md) Option, falls sie deaktiviert ist)
6. Wenn Sie [Arbeitszeitkalender](guides/working-time.md) verwenden, stellen Sie sicher, dass die Arbeitszeiteinstellungen vor dem Laden der Daten in den Gantt festgelegt werden. Wenn Sie die Arbeitszeiteinstellungen nach dem Laden ändern, müssen die Dauern der betroffenen Aufgaben neu berechnet werden. Das geschieht möglicherweise nicht automatisch, daher muss Ihr Code dies gegebenenfalls übernehmen ([siehe hier](guides/working-time.md#kalender-dynamisch-ändern)). Solche Neuberechnungen können die Initialisierungszeit Ihrer Anwendung erhöhen.
7. Wenn Sie die [duration_unit](api/config/duration_unit.md) Konfiguration auf "hour" oder "minute" festlegen, setzen Sie außerdem [duration_step](api/config/duration_step.md) auf 1. Eine solche Kombination aktiviert bestimmte Optimierungen bei der Berechnung der Arbeitszeit, die nur funktionieren, wenn der Schritt auf 1 gesetzt ist. Beachten Sie, dass es wesentliche Leistungsunterschiede zwischen "optimized" und "non-optimized" Modi gibt.
8. Um mehrere Änderungen an Aufgaben oder Verknüpfungen mit einem einzigen Neuzeichnen anzuwenden, verwenden Sie [batchUpdate](api/method/batchupdate.md).
9. Damit das Smart Rendering wirksam bleibt, aktivieren Sie die [autosize](api/config/autosize.md) Option bei großen Diagrammen nicht. Im Autosize-Modus vergrößert Gantt seinen Container, um alle Aufgaben anzuzeigen, sodass sich alle Zeilen im sichtbaren Bereich befinden und alle gerendert werden.
10. Um zusätzliche Neuzeichnungen zu vermeiden, aktivieren Sie [highlight_critical_path](api/config/highlight_critical_path.md) nur dann, wenn Benutzer den [kritischen Pfad](guides/critical-path.md) sehen müssen. Solange diese Option aktiviert ist, wird bei jeder Änderung einer Aufgabe oder Verknüpfung das gesamte Diagramm neu gezeichnet.
11. Um den Rendering-Aufwand in der Timeline zu verringern, entfernen Sie die [benutzerdefinierten Ebenen](guides/baselines.md), die Sie nicht benötigen, insbesondere Ebenen, die häufig neu gezeichnet werden.
12. Um den Aufwand bei jeder Änderung zu verringern, prüfen Sie den benutzerdefinierten Code, der in Gantt-Event-Handlern und Templates ausgeführt wird. Wenn Ihr Code zum Beispiel den Fortschritt von Projekten berechnet, berechnen Sie ihn nur neu, wenn sich der Fortschritt einer Aufgabe ändert, nicht bei jeder Aktualisierung oder jedem Neuzeichnen. Dasselbe gilt für die Daten, die benutzerdefinierte Ebenen anzeigen.


**Zugehöriges Beispiel**: [Leistungsoptimierungen](https://docs.dhtmlx.com/gantt/samples/08_api/10_performance_tweaks.html)


## Smart Rendering

Smart Rendering ist die Implementierung der Rendering-Virtualisierung in DHTMLX Gantt. Es verbessert die Leistung bei großen Datensätzen, indem nur die Aufgaben und Verknüpfungen gerendert werden, die im Viewport sichtbar sind, während alle geladenen Daten verfügbar bleiben.

Ab Version v6.2 ist das Smart Rendering standardmäßig aktiviert, da es in die Kern-Datei *dhtmlxgantt.js* eingebettet ist. Daher müssen Sie die Datei *dhtmlxgantt_smart_rendering.js* nicht mehr in die Seite einbinden, damit Smart Rendering funktioniert.

:::note
Wenn Sie die Datei *dhtmlxgantt_smart_rendering.js*, die aus der alten Version stammt, einbinden, wird sie die Verbesserungen der neuen integrierten **smart_rendering**-Erweiterung überschreiben.
:::

~~~js
gantt.config.smart_rendering = false;
~~~

**Zugehöriges Beispiel**: [Arbeiten mit 30000 Aufgaben](https://docs.dhtmlx.com/gantt/samples/02_extensions/13_smart_rendering.html)

Das Smart Rendering von [custom layers](guides/baselines.md) ermöglicht standardmäßig nur das vertikale Smart Rendering. Das bedeutet, dass die benutzerdefinierten Ebenen gerendert werden, wenn die Zeile der angegebenen Aufgabe im Viewport sichtbar ist. Aber die genauen Koordinaten eines benutzerdefinierten Elements können nicht berechnet werden, und die gesamte Zeile der Aufgabe in der Timeline wird als deren Position genommen.

 *Siehe den Artikel [addTaskLayer](api/method/addtasklayer.md#smart-rendering-for-custom-layers), um zu erfahren, wie Sie das horizontale Smart Rendering für benutzerdefinierte Ebenen aktivieren.*

### Arbeiten mit einem großen Datumsbereich {#working-with-a-large-date-range}

:::note
Diese Funktionalität ist nur in der PRO-Version verfügbar
:::

Wenn Sie in Ihrem Projekt einen großen Datumsbereich verwenden, können Sie zusätzlich zum Smart Rendering den [static_background](api/config/static_background.md) Parameter aktivieren, um das Hintergrundbild für den Zeitleistenbereich statt der tatsächlichen Linien zu rendern. Die Option ist standardmäßig deaktiviert.

~~~js
gantt.config.static_background = true;
~~~

In diesem Modus werden die Zellen, die über die Templates [timeline_cell_class](api/template/timeline_cell_class.md) oder [timeline_cell_content](api/template/timeline_cell_content.md) eine CSS-Klasse oder Inhalt erhalten, weiterhin als Zellen über dem Hintergrundbild gerendert. Dafür müssen die Optionen [show_task_cells](api/config/show_task_cells.md) und [static_background_cells](api/config/static_background_cells.md) aktiviert sein (sie sind standardmäßig aktiviert).

Ab v6.3 rendert das Smart Rendering nur die Zellen im sichtbaren Teil der Timeline, daher ist der Effekt dieser Option geringer als in früheren Versionen. Die Option verringert außerdem die Größe der Anfrage an den Export-Server beim Exportieren von Daten.

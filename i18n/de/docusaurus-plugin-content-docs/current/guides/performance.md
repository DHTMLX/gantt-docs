--- 
title: "Leistung: Wege zur Verbesserung"
sidebar_label: "Leistung: Wege zur Verbesserung"
---

# Leistung: Wege zur Verbesserung

## Gängige Techniken

Ab 10.000–20.000 Aufgaben, abhängig von den verwendeten Konfigurationsoptionen und Plugins, kann es zu Verzögerungen bei der Darstellung des Gantt-Diagramms auf der Seite kommen.

Es gibt folgende Möglichkeiten, dieses Problem zu lösen:

1. Um das Rendern einzelner Zellen zu deaktivieren und nur das Rendern von Zeilen zu belassen (setzen Sie die [show_task_cells](api/config/show_task_cells.md) Option auf 'false') 
2. Um das Hintergrundbild für den Timeline-Bereich statt der tatsächlichen Linien zu setzen (setzen Sie die [static_background](api/config/static_background.md) Option auf 'true') (**PRO**-Funktionalität, für Versionen vor v6.3, [lesen Sie die Details unten](#working-with-a-large-date-range))
3. Um das dynamische Laden zu aktivieren (setzen Sie die [branch_loading](api/config/branch_loading.md) Option auf 'true')
4. Um den Schritt der Skala zu erhöhen (setzen Sie die **unit**-Eigenschaft der [scales](api/config/scales.md) Option auf "month" oder "year")
5. Um den Bereich der anzeigbaren Daten zu verkleinern (verwenden Sie die [start_date](api/config/start_date.md) und [end_date](api/config/end_date.md) Optionen)
6. Um Fortschrittsbalken aus den Aufgaben zu entfernen (setzen Sie die [show_progress](api/config/show_progress.md) Option auf 'false')
7. Um die Geschwindigkeit der Skalen-Darstellung zu erhöhen (aktivieren Sie die [smart_scales](api/config/smart_scales.md) Option, falls sie deaktiviert ist)
8. Wenn Sie [Arbeitszeitkalender](guides/working-time.md) verwenden, stellen Sie sicher, dass die Arbeitszeiteinstellungen vor dem Laden der Daten in den Gantt festgelegt werden. Andernfalls werden die Dauern aller Aufgaben zweimal neu berechnet – zuerst, wenn die Aufgaben geladen werden, und dann, wenn der neue Kalender angewendet wird. In jedem Fall sollte alles korrekt funktionieren, aber solche Neuberechnungen können die Initialisierungszeit Ihrer Anwendung erhöhen.
9. Wenn Sie die [duration_unit](api/config/duration_unit.md) Konfiguration auf "hour" oder "minute" festlegen, setzen Sie außerdem [duration_step](api/config/duration_step.md) auf 1. Eine solche Kombination aktiviert bestimmte Optimierungen bei der Berechnung der Arbeitszeit, die nur funktionieren, wenn der Schritt auf 1 gesetzt ist. Beachten Sie, dass es wesentliche Leistungsunterschiede zwischen "optimized" und "non-optimized" Modi gibt.


**Zugehöriges Beispiel**: [Leistungsoptimierungen](https://docs.dhtmlx.com/gantt/samples/08_api/10_performance_tweaks.html)


## Smart Rendering

Die Smart Rendering-Technik ermöglicht eine deutlich schnellere Darstellung von Daten, wenn mit großen Datenmengen gearbeitet wird. In diesem Modus werden nur die Eigenschaften und Verknüpfungen gerendert, die zum aktu­ellen Zeitpunkt auf dem Bildschirm sichtbar sind.

Ab Version v6.2 ist das Smart Rendering standardmäßig aktiviert, da es in die Kern-Datei *dhtmlxgantt.js* eingebettet ist. Daher müssen Sie die Datei *dhtmlxgantt_smart_rendering.js* nicht mehr in die Seite einbinden, damit Smart Rendering funktioniert.

:::note
Wenn Sie die Datei *dhtmlxgantt_smart_rendering.js*, die aus der alten Version stammt, einbinden, wird sie die Verbesserungen der neuen integrierten **smart_rendering**-Erweiterung überschreiben.
:::

~~~js
gantt.config.smart_rendering = false;
~~~

**Zugehöriges Beispiel**: [Arbeiten mit 30000 Aufgaben](https://docs.dhtmlx.com/gantt/samples/02_extensions/13_smart_rendering.html)

Der Prozess des üblichen Smart Renderings besteht darin zu prüfen, ob die Position eines Gantt-Elements in den Bereich fällt, der auf dem Bildschirm sichtbar ist, und festzulegen, ob es angezeigt wird oder nicht.

Allerdings ermöglicht das Smart Rendering von [custom layers](guides/baselines.md) standardmäßig nur das vertikale Smart Rendering. Das bedeutet, dass die benutzerdefinierten Ebenen gerendert werden, wenn die Zeile der angegebenen Aufgabe im Viewport sichtbar ist. Aber die genauen Koordinaten eines benutzerdefinierten Elements können nicht berechnet werden, und die gesamte Zeile der Aufgabe in der Timeline wird als deren Position genommen.

 *Siehe den Artikel [addTaskLayer](api/method/addtasklayer.md#smart-rendering-for-custom-layers), um zu erfahren, wie Sie das horizontale Smart Rendering für benutzerdefinierte Ebenen aktivieren.*

### Arbeiten mit einem großen Datumsbereich

:::note
Diese Funktionalität ist nur in der PRO-Version verfügbar
:::

Wenn Sie in Ihrem Projekt einen großen Datumsbereich verwenden und die Gantt-Version vor v6.3 liegt, können Sie zusätzlich zum Smart Rendering den [static_background](api/config/static_background.md) Parameter aktivieren, um das Hintergrundbild für den Zeitleistenbereich statt der tatsächlichen Linien zu rendern. 

~~~js
gantt.config.static_background = true;
~~~

Für Gantt-Versionen über v6.3 ist diese Konfigurationsoption nur dann nützlich, wenn Sie die Größe der Anfragen an den Export-Server beim Exportieren von Daten verringern möchten.
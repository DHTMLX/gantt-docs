---
title: "Performance: Möglichkeiten zur Verbesserung"
sidebar_label: "Performance: Möglichkeiten zur Verbesserung"
---

# Performance: Möglichkeiten zur Verbesserung

## Allgemeine Techniken

Bei der Verarbeitung von 10.000 bis 20.000 Aufgaben kann es - abhängig von Ihrer Konfiguration und den verwendeten Plugins - zu Verzögerungen beim Rendern des Gantt-Diagramms auf der Seite kommen.

Hier sind verschiedene Ansätze, um dieses Problem zu beheben:

1. Deaktivieren Sie das Rendern einzelner Zellen und rendern Sie nur die Zeilen (setzen Sie die Option [show_task_cells](api/config/show_task_cells.md) auf 'false').
2. Verwenden Sie ein Hintergrundbild für den Zeitachsenbereich, anstatt die tatsächlichen Linien zu rendern (setzen Sie die Option [static_background](api/config/static_background.md) auf 'true') (**PRO**-Feature, für Versionen vor v6.3, [siehe Details unten](#static_background)).
3. Aktivieren Sie das dynamische Laden (setzen Sie die Option [branch_loading](api/config/branch_loading.md) auf 'true').
4. Erhöhen Sie die Schrittweite der Zeitskala, indem Sie die **unit**-Eigenschaft der Option [scales](api/config/scales.md) auf "month" oder "year" setzen.
5. Begrenzen Sie den darstellbaren Datumsbereich (verwenden Sie die Optionen [start_date](api/config/start_date.md) und [end_date](api/config/end_date.md)).
6. Entfernen Sie Fortschrittsbalken aus Aufgaben (setzen Sie die Option [show_progress](api/config/show_progress.md) auf 'false').
7. Beschleunigen Sie das Rendern der Skala, indem Sie die Option [smart_scales](api/config/smart_scales.md) aktivieren, falls sie nicht bereits aktiviert ist.
8. Wenn Sie [Arbeitszeitkalender](guides/working-time.md) verwenden, konfigurieren Sie die Arbeitszeiteinstellungen, bevor Sie Daten in das Gantt laden. Andernfalls werden die Aufgabendauern zweimal neu berechnet - einmal beim Laden der Aufgaben und erneut beim Anwenden des neuen Kalenders. Dies führt zwar nicht zu Fehlern, kann aber die Initialisierungszeit Ihrer Anwendung erhöhen.
9. Wenn Sie die Konfiguration [duration_unit](api/config/duration_unit.md) auf "hour" oder "minute" setzen, stellen Sie sicher, dass [duration_step](api/config/duration_step.md) auf 1 gesetzt ist. Diese Kombination aktiviert bestimmte Optimierungen für Arbeitszeitberechnungen, die nur funktionieren, wenn der Schritt 1 beträgt. Beachten Sie, dass es einen erheblichen Leistungsunterschied zwischen dem "optimierten" und "nicht-optimierten" Modus gibt.


[Performance tweaks](https://docs.dhtmlx.com/gantt/samples/08_api/10_performance_tweaks.html)


## Smart Rendering {#smartrendering}

Smart Rendering steigert die Geschwindigkeit der Datenanzeige erheblich, wenn Sie mit großen Datenmengen arbeiten. In diesem Modus werden nur die Aufgaben und Verknüpfungen gerendert, die aktuell im sichtbaren Bereich sind.

Seit v6.2 ist Smart Rendering standardmäßig im Kern der *dhtmlxgantt.js*-Datei aktiviert, sodass das Einbinden der *dhtmlxgantt_smart_rendering.js*-Datei nicht mehr notwendig ist.

:::note
Wenn Sie die alte *dhtmlxgantt_smart_rendering.js*-Datei einbinden, überschreibt diese die Verbesserungen der neuen integrierten **smart_rendering**-Erweiterung.
:::

Um Smart Rendering zu deaktivieren, setzen Sie den Konfigurationsparameter auf false:

~~~js
gantt.config.smart_rendering = false;
~~~


[Working with 30000 tasks](https://docs.dhtmlx.com/gantt/samples/02_extensions/13_smart_rendering.html)


Der normale Smart Rendering-Prozess prüft, ob sich die Position eines Gantt-Elements im sichtbaren Bereich befindet, und entscheidet, ob es angezeigt wird.

Allerdings unterstützt Smart Rendering für [benutzerdefinierte Layer](guides/baselines.md) standardmäßig nur vertikales Smart Rendering. Das bedeutet, dass benutzerdefinierte Layer gerendert werden, wenn die Zeile der Aufgabe sichtbar ist. Die genaue horizontale Position eines benutzerdefinierten Elements kann jedoch nicht berechnet werden, sodass die gesamte Aufgabenzeile als Position betrachtet wird.

 *Weitere Informationen zur Aktivierung des horizontalen Smart Renderings für benutzerdefinierte Layer finden Sie im Artikel [addTaskLayer](api/method/addtasklayer.md).*


### Arbeiten mit einem großen Datumsbereich {#static_background}

:::note
Diese Funktion ist nur in der PRO-Version verfügbar
:::

Wenn Ihr Projekt einen großen Datumsbereich verwendet und Sie eine Gantt-Version vor v6.3 einsetzen, können Sie die Option [static_background](api/config/static_background.md) zusammen mit Smart Rendering aktivieren, um ein Hintergrundbild für den Zeitachsenbereich zu verwenden, anstatt die tatsächlichen Linien zu rendern.

~~~js
gantt.config.static_background = true;
~~~

Für Gantt-Versionen ab v6.3 hilft diese Option hauptsächlich dabei, die Größe der beim Datenexport an den Exportserver gesendeten Anfragen zu reduzieren.


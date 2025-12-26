---
title: "Vollständige Liste der Erweiterungen"
sidebar_label: "Vollständige Liste der Erweiterungen"
---

# Vollständige Liste der Erweiterungen

dhtmlxGantt bietet eine Vielzahl von Erweiterungen, die die Grundfunktionalität erweitern.

Um eine Erweiterung zu aktivieren, schalten Sie einfach das Plugin mit der Methode [gantt.plugins](api/method/plugins.md) ein.

## Erweitertes Drag-and-Drop {#advanceddragndrop}

Mit dieser Erweiterung können Sie Aufgaben per Drag-and-Drop erstellen und auswählen.

~~~js
gantt.plugins({
    click_drag: true
});
~~~

#### Verwandte Ressourcen

Artikel: [Creating/Selecting Tasks with DnD](guides/advanced-dnd.md)


API: [click_drag](api/config/click_drag.md)


[Create new tasks by Drag and Drop](https://docs.dhtmlx.com/gantt/samples/02_extensions/24_click_drag.html)


## Automatische Terminplanung {#autoscheduling}

:::info
Diese Erweiterung ist nur in der PRO-Version verfügbar
:::

Diese Funktion plant Aufgaben automatisch basierend auf den Beziehungen zwischen ihnen.

~~~js
gantt.plugins({
    auto_scheduling: true
});
~~~

#### Verwandte Ressourcen

Artikel: [Auto Scheduling](guides/auto-scheduling.md)


API: [auto_scheduling](api/config/auto_scheduling.md)


[Auto Scheduling extension](https://docs.dhtmlx.com/gantt/samples/02_extensions/12_auto_scheduling.html)


## Kritischer Pfad {#criticalpath}

:::info
Diese Erweiterung ist nur in der PRO-Version verfügbar
:::

Zeigt die Abfolge von Aufgaben an, die rechtzeitig abgeschlossen werden müssen, um Verzögerungen im gesamten Projekt zu vermeiden. Es wird außerdem die kürzest mögliche Projektdauer angezeigt.

~~~js
gantt.plugins({
    critical_path: true
});
~~~

#### Verwandte Ressourcen

Artikel: [Critical Path](guides/critical-path.md)


API: [highlight_critical_path](api/config/highlight_critical_path.md)


[Critical path](https://docs.dhtmlx.com/gantt/samples/02_extensions/03_critical_path.html)


## Zeitachse ziehen {#dragtimeline}

Ermöglicht das Scrollen durch die Zeitachsenansicht per Ziehen mit der Maus.

~~~js
gantt.plugins({
    drag_timeline: true
});
~~~

#### Verwandte Ressourcen

API: [drag_timeline](api/config/drag_timeline.md)


[Drag timeline](https://docs.dhtmlx.com/gantt/samples/02_extensions/27_drag_timeline.html)


## Zusätzliche Überlagerung {#overlay}

:::info
Diese Erweiterung ist nur in der PRO-Version verfügbar.
:::

Ermöglicht das Hinzufügen einer zusätzlichen Ebene über das Gantt-Diagramm, um benutzerdefinierte Inhalte zu platzieren.

~~~js
gantt.plugins({
    overlay: true
});
~~~

#### Verwandte Ressourcen

Artikel: [Custom Elements in Timeline Area](guides/baselines.md#extraoverlayforthechart)


[Gantt chart with overlay and zoom (S-Curve)](https://docs.dhtmlx.com/gantt/samples/02_extensions/21_overlay.html)


## Exportdienst {#exportservice}

Aktiviert den Online-Exportdienst.

~~~js
gantt.plugins({
      export_api: true
});
~~~

#### Verwandte Ressourcen

Artikel: [Exporting and Importing Data](guides/export-common.md)

## Vollbildmodus {#fullscreen}

Zeigt das Gantt-Diagramm im Vollbildmodus an.

~~~js
gantt.plugins({
    fullscreen: true
});
~~~

#### Verwandte Ressourcen

Artikel: [Full Screen Mode](guides/fullscreen-mode.md) 


[Full Screen](https://docs.dhtmlx.com/gantt/samples/02_extensions/11_full_screen.html)


## Gruppierung {#grouping}

:::info
Diese Erweiterung ist nur in der PRO-Version verfügbar
:::

Ermöglicht das Gruppieren von Aufgaben nach beliebigen Aufgabenattributen.

~~~js
gantt.plugins({
    grouping: true
});
~~~

#### Verwandte Ressourcen

Artikel: [Grouping Tasks](guides/grouping.md)


API: [groupBy](api/method/groupby.md)


[Tasks grouping](https://docs.dhtmlx.com/gantt/samples/02_extensions/08_tasks_grouping.html)


## Tastaturnavigation {#keyboardnavigation}

Bietet eine Navigation im Gantt-Diagramm über die Tastatur.

~~~js
gantt.plugins({
    keyboard_navigation: true
});
~~~

#### Verwandte Ressourcen

Artikel: [Accessibility](guides/accessibility.md#keyboardnavigation), [Keyboard Navigation](guides/keyboard-navigation.md)


API: [keyboard_navigation](api/config/keyboard_navigation.md),[keyboard_navigation_cells](api/config/keyboard_navigation_cells.md)


## Mehrfachauswahl von Aufgaben {#multitaskselection}

Ermöglicht das gleichzeitige Auswählen mehrerer Aufgaben im Gantt-Diagramm.

~~~js
gantt.plugins({
    multiselect: true
});
~~~

#### Verwandte Ressourcen

Artikel: [Multi-Task Selection](guides/multiselection.md)


API: [multiselect](api/config/multiselect.md)


[Multiselection and Indent/Outdent tasks](https://docs.dhtmlx.com/gantt/samples/02_extensions/09_multiselection.html)


## Quick info {#quickinfo}

Zeigt ein Popup mit Aufgabendetails an.

~~~js
gantt.plugins({
    quick_info: true
});
~~~

#### Verwandte Ressourcen

Artikel: [Templates of the 'Quick Info' Extension (Touch Support)](guides/touch-templates.md), 


[Quick Info (Touch Support)](guides/quick-info.md)


[QuickInfo extension](https://docs.dhtmlx.com/gantt/samples/02_extensions/01_quickinfo.html)


## Tooltip {#tooltip}

Fügt zusätzliche Informationen für Benutzer hinzu, ohne die Ansicht zu überladen.

~~~js
gantt.plugins({
    tooltip: true
});
~~~

#### Verwandte Ressourcen

Artikel: [Tooltips for Gantt Elements](guides/tooltips.md)


[Tooltip](https://docs.dhtmlx.com/gantt/samples/02_extensions/02_tooltip.html)


## Rückgängig machen (Undo) {#undo}

Bietet Rückgängig- und Wiederherstellen-Funktionen für vorgenommene Änderungen.

~~~js
gantt.plugins({
    undo: true
});
~~~

#### Verwandte Ressourcen

Artikel: [Undo/Redo Functionality](guides/undo-redo.md)


API: [undo](api/config/undo.md), [redo](api/config/redo.md)


[Undo/Redo changes in Gantt](https://docs.dhtmlx.com/gantt/samples/02_extensions/14_undo.html)


## Vertikaler Marker {#verticalmarker}

Hebt bestimmte Daten oder Zeiträume hervor.

~~~js
gantt.plugins({
    marker: true
});
~~~

#### Verwandte Ressourcen

Artikel: [Adding Vertical Markers](guides/markers.md)


API: [addMarker](api/method/addmarker.md),[show_markers](api/config/show_markers.md)


[Today and Status lines in Gantt (vertical markers)](https://docs.dhtmlx.com/gantt/samples/02_extensions/05_today_line.html)


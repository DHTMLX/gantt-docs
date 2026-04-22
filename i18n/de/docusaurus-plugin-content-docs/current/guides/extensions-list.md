--- 
title: "Vollständige Liste der Erweiterungen" 
sidebar_label: "Vollständige Liste der Erweiterungen" 
--- 

# Vollständige Liste der Erweiterungen

dhtmlxGantt enthält eine Reihe von Erweiterungen, die dem Standardverhalten zusätzliche Funktionen hinzufügen.

Um eine Erweiterung zu verwenden, sollten Sie das Plugin mithilfe der Methode [gantt.plugins](api/method/plugins.md) aktivieren.

## Fortgeschrittenes Drag-and-Drop

Bietet die Möglichkeit, Aufgaben per Drag-and-Drop zu erstellen und auszuwählen.

~~~js
gantt.plugins({
    click_drag: true
});
~~~

#### Zugehörige Ressourcen

Artikel: [Erstellen/Auswählen von Aufgaben mit DnD](guides/advanced-dnd.md)

API: [click_drag](api/config/click_drag.md)

Beispiel: [Neue Aufgaben durch Drag-and-Drop erstellen](https://docs.dhtmlx.com/gantt/samples/02_extensions/24_click_drag.html)

## Automatische Planung {#autoscheduling}

:::note
Diese Erweiterung ist nur in der PRO-Version verfügbar
:::

Ermöglicht das automatische Planen von Aufgaben abhängig von den Beziehungen zwischen ihnen.

~~~js
gantt.plugins({
    auto_scheduling: true
});
~~~

#### Zugehörige Ressourcen

Artikel: [Automatische Planung](guides/auto-scheduling.md)

API: [auto_scheduling](api/config/auto_scheduling.md)

Beispiel: [Auto Scheduling-Erweiterung](https://docs.dhtmlx.com/gantt/samples/02_extensions/12_auto_scheduling.html)

## Kritischer Pfad

:::note
Diese Erweiterung ist nur in der PRO-Version verfügbar
:::

Stellt eine Abfolge von Aufgaben dar, die nicht verzögert werden darf, ohne die Frist des gesamten Projekts zu beeinflussen.
Der kritische Pfad bestimmt auch die kürzeste Zeit, die das Projekt dauern kann.

~~~js
gantt.plugins({
    critical_path: true
});
~~~

#### Zugehörige Ressourcen

Artikel: [Kritischer Pfad](guides/critical-path.md)

API: [highlight_critical_path](api/config/highlight_critical_path.md)

Beispiel: [Kritischer Pfad](https://docs.dhtmlx.com/gantt/samples/02_extensions/03_critical_path.html)

## Drag-Timeline

Ermöglicht das Scrollen von Timeline-Ansichten durch Ziehen mit der Maus.

~~~js
gantt.plugins({
    drag_timeline: true
});
~~~

#### Zugehörige Ressourcen

API: [drag_timeline](api/config/drag_timeline.md)

Beispiel: [Drag-Timeline](https://docs.dhtmlx.com/gantt/samples/02_extensions/27_drag_timeline.html)

## Zusätzliche Overlay-Ebene

:::note
Diese Erweiterung ist nur in der PRO-Version verfügbar.
:::

Bietet die Möglichkeit, eine zusätzliche Ebene über dem Gantt-Diagramm zu platzieren, um benutzerdefinierten Inhalt hineinzufügen.

~~~js
gantt.plugins({
    overlay: true
});
~~~

#### Zugehörige Ressourcen

Artikel: [Benutzerdefinierte Elemente im Timeline-Bereich](guides/baselines.md#extra-overlay-for-the-chart)

Beispiel: [Gantt-Diagramm mit Overlay und Zoom (S-Kurve)](https://docs.dhtmlx.com/gantt/samples/02_extensions/21_overlay.html)

## Export-Service

Bietet die Möglichkeit, den Online-Export-Service zu aktivieren.

~~~js
gantt.plugins({
    export_api: true
});
~~~

#### Zugehörige Ressourcen

Artikel: [Daten exportieren und importieren](guides/export-common.md)

## Vollbildmodus {#fullscreen}

Zeigt Gantt im Vollbildmodus an.

~~~js
gantt.plugins({
    fullscreen: true
});
~~~

#### Zugehörige Ressourcen

Artikel: [Vollbildmodus](guides/fullscreen-mode.md) 

Beispiel: [Vollbild](https://docs.dhtmlx.com/gantt/samples/02_extensions/11_full_screen.html)

## Gruppierung

:::note
Diese Erweiterung ist nur in der PRO-Version verfügbar
:::

Ermöglicht das Gruppieren von Aufgaben nach beliebigen Aufgabenattributen.

~~~js
gantt.plugins({
    grouping: true
});
~~~

#### Zugehörige Ressourcen

Artikel: [Aufgaben gruppieren](guides/grouping.md)

API: [groupBy](api/method/groupby.md)

Beispiel: [Aufgaben gruppieren](https://docs.dhtmlx.com/gantt/samples/02_extensions/08_tasks_grouping.html)

## Tastaturnavigation {#keyboardnavigation}

Ermöglicht das Navigieren im Gantt-Diagramm mit der Tastatur.

~~~js
gantt.plugins({
    keyboard_navigation: true
});
~~~

#### Zugehörige Ressourcen

Artikel: [Barrierefreiheit](guides/accessibility.md), [Tastaturnavigation](guides/keyboard-navigation.md)

API: [keyboard_navigation](api/config/keyboard_navigation.md),[keyboard_navigation_cells](api/config/keyboard_navigation_cells.md)

## Mehrfachauswahl {#multitaskselection}

Ermöglicht das gleichzeitige Auswählen mehrerer Aufgaben im Gantt-Diagramm.

~~~js
gantt.plugins({
    multiselect: true
});
~~~

#### Zugehörige Ressourcen

Artikel: [Mehrfachauswahl von Aufgaben](guides/multiselection.md)

API: [multiselect](api/config/multiselect.md)

Beispiel: [Mehrfachauswahl und Einrücken/Ausrücken von Aufgaben](https://docs.dhtmlx.com/gantt/samples/02_extensions/09_multiselection.html)

## Schnellinfo

Bietet ein Popup-Fenster mit Details zur Aufgabe.

~~~js
gantt.plugins({
    quick_info: true
});
~~~

#### Zugehörige Ressourcen

Artikel: [Vorlagen der 'Quick Info'-Erweiterung (Touch-Unterstützung)](guides/touch-templates.md), 

[Schnelle Infos (Touch-Unterstützung)](guides/quick-info.md)

Beispiel: [QuickInfo-Erweiterung](https://docs.dhtmlx.com/gantt/samples/02_extensions/01_quickinfo.html)

## Tooltip

Bietet die Möglichkeit, zusätzliche Informationen für Benutzer bereitzustellen, ohne den Bildschirm mit Text zu überladen.

~~~js
gantt.plugins({
    tooltip: true
});
~~~

#### Zugehörige Ressourcen

Artikel: [Tooltips für Gantt-Elemente](guides/tooltips.md)

Beispiel: [Tooltip](https://docs.dhtmlx.com/gantt/samples/02_extensions/02_tooltip.html)

## Undo

Ermöglicht das Rückgängig-/Wiederherstellen der vorgenommenen Änderungen.

~~~js
gantt.plugins({
    undo: true
});
~~~

#### Zugehörige Ressourcen

Artikel: [Undo/Redo Functionality](guides/undo-redo.md)

API: [undo](api/config/undo.md), [redo](api/config/redo.md)

Beispiel: [Rückgängig/Wiederherstellen von Änderungen im Gantt](https://docs.dhtmlx.com/gantt/samples/02_extensions/14_undo.html)

## Vertikale Marker

Hebt bestimmte Daten oder Datumsbereiche hervor.

~~~js
gantt.plugins({
    marker: true
});
~~~

#### Zugehörige Ressourcen

Artikel: [Vertikale Marker hinzufügen](guides/markers.md)

API: [addMarker](api/method/addmarker.md),[show_markers](api/config/show_markers.md)

Beispiel: [Heute- und Statuszeilen im Gantt (vertikale Marker)](https://docs.dhtmlx.com/gantt/samples/02_extensions/05_today_line.html)
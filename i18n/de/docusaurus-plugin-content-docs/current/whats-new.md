---
title: "Was ist neu"
sidebar_label: "Was ist neu"
---

Was ist neu
===========


Wenn Ihre aktuelle Version von dhtmlxGantt älter als 2.0 ist, lesen Sie die [Migration von älteren Versionen](migration.md) für Details zum Update.

9.0.11
---------------
<span class='release_date'>27. Mai 2025. Bugfix-Release</span>

### Fehlerbehebungen

- Behebt das Problem, bei dem [mergeCalendars](api/method/mergecalendars.md) `customWeeks`-Werte falsch zusammengeführt hat
- Behebt den Fehler, der in der `onrender`-Funktion auftrat, wenn der [Spaltenname](guides/specifying-columns.md#wbscode) Leerzeichen enthielt
- Behebt das Problem, dass Gantt im schreibgeschützten Modus blieb, nachdem die Timeline per [click_drag](guides/extensions-list.md#advanceddragndrop) verschoben wurde, während das [S-Curve Overlay](guides/baselines.md#extraoverlayforthechart) aktiviert war
- Behebt das Problem, dass die Aufgabendauer auf `0` zurückgesetzt wurde, wenn ein [Ressourcenkalender](guides/resource-management.md) verwendet und der [Ressourcenbereich](guides/resource-management.md#resourceviewpanel) unterhalb des Dauerbereichs des [Lightbox](guides/default-edit-form.md) platziert war
- Behebt den Konsolenfehler, der durch die Warnung "This is a Trial version" ausgelöst wurde, wenn Gantt im **React StrictMode** genutzt wurde
- Behebt das Problem, dass die Funktion [adjustTaskHeightForBaselines](api/method/adjusttaskheightforbaselines.md) die Zeilenhöhe nicht neu berechnete, wenn [gantt.config.baselines.render_mode](api/config/baselines.md#rendermode) deaktiviert war
- Behebt das Problem, das die Anzeige von Aufgaben verhinderte, wenn die Timeline in der Salesforce-Umgebung [ausgeblendet](api/config/show_chart.md) war
- Behebt das Problem, dass Kalender nicht von übergeordneten Aufgaben geerbt werden, wenn die [dynamic_resource_calendars](api/config/dynamic_resource_calendars.md) Konfiguration deaktiviert ist
- Behebt das Problem, dass die Scroll-Position beim erneuten Rendern zurückgesetzt wurde, wenn sich [ReactGantt](integrations/react.md) im groupBy-Modus befand

### Aktualisierungen

- Hinzufügen des `isSalesforce`-Flags zu [gantt.env](api/other/env.md)
- Hinzufügen der `groupTasks`-Eigenschaft zu [React Gantt](integrations/react.md#groupingtasks)

9.0.10
---------------
<span class='release_date'>22. April 2025. Bugfix-Release</span>

### Fehlerbehebungen

- Behebt das Problem, das Änderungen am `parent`-Feldwert im [Lightbox](guides/default-edit-form.md) verhinderte
- Behebt zu schnelles Scrollen mit dem Mausrad in Firefox 88 und neuer
- Behebt das Problem, dass [Projektaufgaben](guides/task-types.md#projecttasks) nicht verschoben werden konnten, wenn ein Unteraufgabe nicht geplant und ohne Datumsangaben war
- Stellt sicher, dass [gantt.render()](api/method/render.md) nicht unerwartet während der [gantt.silent](api/method/silent.md)-Operation aufgerufen wird, wenn die Methoden [open](api/method/open.md) oder [close](api/method/close.md) verwendet werden
- Behebt das Problem, dass [Projektaufgaben](guides/task-types.md#projecttasks) nicht neu gezeichnet werden, wenn das Ereignis [onBeforeTaskChanged](api/event/onbeforetaskchanged.md) `false` zurückgibt
- Stellt sicher, dass Fortschrittsbalken die gesamte Breite der Aufgabe abdecken, wenn erwartet
- Entfernt ungültige WAI-ARIA-Attribute von schreibgeschützten Aufgabenverknüpfungen zur Verbesserung der [Barrierefreiheit](guides/accessibility.md#waiariaattributes)
- Behebt das Problem, dass Aufgabenbalken-Resizer sich nicht an Änderungen der Aufgabenbalkenhöhe anpassen

9.0.9
---------------
<span class='release_date'>16. April 2025. Bugfix-Release</span>

### Aktualisierungen

- Beispiele für [React Gantt](integrations/react.md) wurden zu den Commercial-, Enterprise-, Ultimate- und Evaluation-Paketen hinzugefügt

### Fehlerbehebungen

- Behebt das Problem, dass das Zoomen mit dem Mausrad nach Aufruf der [resetLayout](api/method/resetlayout.md)-Methode nicht mehr funktionierte
- Behebt das Problem, dass das [Quick Info](guides/quick-info.md)-Popup nach Klick auf die Auf-/Zuklapp-Schaltfläche in der [Timeline](guides/configuring-time-scale.md) oder [Grid](guides/specifying-columns.md) Ansicht erschien
- Behebt den Fehler, der beim Zerstören von Gantt ohne Initialisierung der Grid-Ansicht auftrat
- Behebt den Fehler, der beim Laden einer Aufgabe mit nicht vorhandenem Elternteil auftrat, während die [Undo-Erweiterung](guides/undo-redo.md) aktiviert war
- Behebt das Problem, dass die [click_drag](guides/extensions-list.md#advanceddragndrop)-Erweiterung auf Touch-Geräten nicht funktionierte
- Verbessert das Scrollverhalten im Grid auf Touch-Geräten

9.0.7
---------------
<span class='release_date'>27. März 2025. Bugfix-Release</span>

### Fehlerbehebungen

- Behebt den Fehler, der auftritt, wenn auf eine Aufgabe in der Timeline ohne Grid geklickt wird, während [keyboard_navigation](guides/keyboard-navigation.md) aktiviert ist
- Korrigiert die Berechnung des [WBS-Codes](guides/specifying-columns.md#wbscode) für sortierte Aufgaben, die eine [Platzhalteraufgabe](api/config/placeholder_task.md) enthalten
- Behebt das Problem, dass Skalenzellen in der Ressourcentimeline beim Zusammenklappen von Aufgaben oder [Größenänderung des Grids](guides/layout-config.md#defaultlayout) verschwinden
- Stellt sicher, dass die richtige Aufgabenreihenfolge beibehalten wird, wenn sowohl Kind- als auch Elternaufgaben innerhalb der [`gantt.silent`](api/method/silent.md)-Funktion hinzugefügt werden
- Erhält den Fokus in bearbeitbaren [Ressourcenzellen](guides/resource-management.md#resourcecellvalue) nach der Bearbeitung des Wertes
- Verhindert, dass Gantt beim Klicken auf eine Aufgabe ganz nach links scrollt
- Behält die `group`-Eigenschaft bei, wenn neue Aufgaben im [Gruppenmodus](api/method/groupby.md) hinzugefügt werden
- Behebt das Problem, dass [Marker](guides/markers.md) nicht angezeigt werden, wenn die Timeline initial deaktiviert war
- Verhindert doppelte [Marker](guides/markers.md), wenn das Diagramm in der Layout-Konfiguration initial nicht angezeigt wird
- Behebt das Verschwinden von Drag-Handles (Verknüpfung, Fortschritt, Aufgaben-Resize) nach [Ziehen der Timeline](api/config/drag_timeline.md)
- Stellt sicher, dass der [Predecessor Inline Editor](guides/inline-editors-ext.md#predecessoreditor) korrekt funktioniert, wenn der Link-ID-Typ numerisch ist
- Verhindert die Duplizierung der `gantt_marker_area`-Elemente
- Behebt die [Undo](guides/undo-redo.md)-Funktionalität mit der `changeTaskId`-Aktion

9.0.6
---------------
<span class='release_date'>18. März 2025. Bugfix-Release</span>

### Fehlerbehebungen

- Behebt das Problem, dass die Schaltflächen im [Lightbox](guides/default-edit-form.md) erst nach einer Neuinitialisierung von Gantt die aktuelle Sprache anzeigten
- Behebt einen Fehler, der beim Löschen von Verknüpfungen mit teilweise geladenen Aufgaben auftrat
- Verhindert, dass Aufgaben nach Änderung des Typs der `parent`-Eigenschaft von numerisch auf String fälschlicherweise an das Ende ihres Zweigs verschoben werden
- Verbessert das Verhalten der Scrollleisten durch Anpassung der Resizer in der Nähe der Scrollbars
- Stellt sicher, dass [Ressourcenzuweisungen](guides/resource-management.md#assigningresources) beim Hinzufügen von Aufgaben innerhalb von [gantt.batchUpdate](api/method/batchupdate.md) erhalten bleiben
- Behebt ein Problem, bei dem Aufgaben während Drag-and-Drop-Aktionen in der [unendlichen Zeitskala](guides/configuring-time-scale.md#infinitescroll) verschwanden
- Stellt die korrekte Anzeige von Ressourcennamen im [Lightbox](guides/default-edit-form.md) nach mehrfachem Parsen der Daten sicher
- Behebt eine falsche Datumsberechnung in [`getClosestWorkTime`](api/method/getclosestworktime.md) bei Verwendung der [duration_step](api/config/duration_step.md)-Konfiguration
- Ermöglicht das Abbrechen des [onColumnDragMove](api/config/reorder_grid_columns.md)-Events
- Behebt ein Kompatibilitätsproblem, das verhinderte, dass der Trial-Build in Lightning Web Components (LWC) ausgeführt werden konnte
- Behebt Probleme im Zusammenhang mit `fetchTasks` und [deepcopy_on_parse](api/config/deepcopy_on_parse.md)-Konfigurationen, die das [Ressourcenpanel](guides/resource-management.md#resourceviewpanel) beeinflussten
- Korrigiert das Erscheinungsbild von Schrift-Icons während der Gantt-Initialisierung

9.0.5
---------------
<span class='release_date'>28. Februar 2025. Bugfix-Release</span>

- Behebt den Fehler beim Größenändern von Zeilen im [Ressourcen-Grid](guides/resource-management.md#resourceviewpanel)
- Stellt sicher, dass das letzte Jahr im Bereich, der durch die **year_range**-Eigenschaft des [Zeit-Steuerelements](guides/time.md#properties) festgelegt ist, angegeben wird
- Korrigiert die Position von Verknüpfungspfeilen, die durch den CSS-Stil `line-height` beeinflusst wurden
- Behebt den Fehler beim Laden von [Sammlungen](guides/supported-data-formats.md#jsonwithcollections) ohne das `links`-Array
- Behebt das Problem mit `gantt.config.baselines`, wenn es "falsy" ist, aber nicht explizit auf `false` gesetzt wurde
- Behebt das Problem, dass [click_drag](guides/extensions-list.md#advanceddragndrop) nach Aufruf von [resetLayout](api/method/resetlayout.md) nicht funktioniert
- Stellt sicher, dass ausgewählte Unteraufgaben nicht über ihren Eltern angezeigt werden, wenn [keyboard_navigation](guides/keyboard-navigation.md) aktiviert ist
- Behebt Probleme mit der Tastaturnavigation, wenn Aufgaben-IDs einfache Anführungszeichen enthalten
- Korrigiert das Verhalten von [calculateEndDate](api/method/calculateenddate.md), wenn die Dauer negativ ist
- Behebt den Fehler beim Laden von Datensätzen mit [Baselines](guides/inbuilt-baselines.md) ohne aktive Timeline
- Stellt sicher, dass Grid-Zellen fokussiert werden, auch wenn Aufgaben außerhalb des Diagrammzeitraums liegen
- Behebt den Fehler beim teilweisen Löschen eines Datumswerts im [Inline-Editor](guides/inline-editors-ext.md)
- Behebt das Problem, dass das [Ressourcenpanel](guides/resource-management.md#resourceviewpanel) nach dem Filtern falsch angezeigt wird, wenn `fetchTasks` aktiviert ist

9.0.4
---------------
<span class='release_date'>3. Dezember 2024. Bugfix-Release</span>

- Behebt das Problem, dass das [SNET-Constraint](guides/auto-scheduling.md#timeconstraintsfortasks)-Datum nicht über den [Inline-Editor](guides/inline-editors-ext.md) geändert werden konnte
- Behebt das Problem, dass Gantt den globalen [Kalender](guides/working-time.md) statt des Ressourcenkalenders für Aufgaben mit einer einzigen [Ressourcenzuweisung](guides/resource-management.md#assigningresources) zurückgibt, wenn die [dynamic_resource_calendars](api/config/dynamic_resource_calendars.md)-Konfiguration deaktiviert ist
- Behebt das [Constraint](guides/auto-scheduling.md#timeconstraintsfortasks)-Datumsproblem beim Ändern des Startdatums über den Inline-Editor nach [Neuinitialisierung](api/method/init.md) von Gantt oder [Zurücksetzen des Layouts](api/method/resetlayout.md)
- Behebt den Skriptfehler mit einigen Konfigurationen von [gantt.plugins](api/method/plugins.md), wenn die Methode [gantt.getGanttInstance](guides/multiple-gantts.md) ohne Angabe eines Containers verwendet wird
- Behebt das Problem, dass Gantt nicht mehr funktioniert, wenn die [auto_scheduling_project_constraint](api/config/auto_scheduling_project_constraint.md)-Konfiguration aktiviert und Aufgaben [gruppiert](api/method/groupby.md) sind
- Stellt sicher, dass Gantt die Aufgaben-[Constraint](guides/auto-scheduling.md#timeconstraintsfortasks) nach dem Ziehen einer Aufgabe beibehält

9.0.3
---------------
<span class='release_date'>19. November 2024. Bugfix-Release</span>

- Behebt die Regression in den Styles für das [Quick Info](guides/quick-info.md)-Popup
- Behebt Build-Warnungen von PostCSS durch die Verwendung von 'start'/'end' anstelle von 'flex-start'/'flex-end'
- Verhindert, dass [Ressourcenzuweisungen](guides/resource-management.md#assigningresources) entfernt werden, wenn sie über das Lightbox aktualisiert werden
- Behebt das Problem mit einem leeren Aufgabenarray in [resource_cell_value](api/template/resource_cell_value.md) an arbeitsfreien Tagen, wenn [resource_render_empty_cells](api/config/resource_render_empty_cells.md) aktiviert ist
- Korrigiert den Fehler, der beim Klicken auf Schaltflächen auftritt, die in Bereiche des [Lightbox](guides/default-edit-form.md) eingebettet sind
- Stellt sicher, dass das [Ressourcenpanel](guides/resource-management.md#resourceviewpanel) und [Zoomstufen](guides/zooming.md#builtinzoomingmodule) synchron bleiben
- Verhindert, dass [Inline-Editoren](guides/inline-editors-ext.md)-Events nach [Neuinitialisierung](api/method/init.md) von Gantt oder [Zurücksetzen des Layouts](api/method/resetlayout.md) entfernt werden
- Behebt das Problem, dass der Offen-Status nach [Wiederherstellung](guides/undo-redo.md) von Änderungen nicht wiederhergestellt wird

9.0.2
---------------
<span class='release_date'>11. November 2024. Bugfix-Release</span>

### Fehlerbehebungen

- Behebung der Regression, die zu falschen Stilen für Aufgabenrahmen und Fortschritt führte, wenn die Aufgabenfarbe über [Eigenschaften eines Aufgabenobjekts](guides/colouring-tasks.md#specifyingstyleinthepropertiesofataskobject) festgelegt wurde
- Wiederherstellung der Funktionalität der [marker_class](api/template/marker_class.md) Vorlage
- Wiederherstellung des fehlenden Klassennamens im [Textarea](guides/textarea.md)-Abschnitt des Lightbox
- Korrektur des Problems, bei dem [Deadlines](guides/inbuilt-baselines.md#deadlinesandconstraints) außerhalb der Aufgabenzeile angezeigt und nicht vollständig zentriert wurden
- Sicherstellung, dass Links beim Mouseover über anderen Links angezeigt werden
- Behebung des Problems, bei dem [Baseline](guides/inbuilt-baselines.md)-Daten beim Laden über die Methode [parse](api/method/parse.md) nicht berechnet wurden
- Korrekte Positionierung von [Constraints](guides/inbuilt-baselines.md#deadlinesandconstraints) sowohl für reguläre als auch für [RTL](guides/rtl-mode.md)-Ansichten
- Verhinderung unnötiger Link-Schleifen beim Verknüpfen von Teilen aufgeteilter Aufgaben
- Behebung des Problems, bei dem [Quick Info](guides/quick-info.md) im [detached mode](api/config/quick_info_detached.md) aufgrund erhöhter Breite und festkodierter Stile nicht ausgeblendet wurde
- Aktualisierung der [Export API](api/method/exporttoexcel.md) zur Unterstützung der Baum-Einrückung beim Excel-Export
- Behebung des Problems, das die Auswahl von Aufgaben verhinderte, wenn [multiselect_one_level](api/config/multiselect_one_level.md) aktiviert war und eine Aufgabe auf einer anderen Baumebene ausgewählt wurde
- Wiederherstellung der Funktionalität des [export_api](api/method/exporttopdf.md)-Plugins in der TypeScript-Umgebung
- Aktualisierung der Typdefinitionen

9.0.1
---------------

<span class='release_date'>21. Oktober 2024. Bugfix-Release</span>

### Fehlerbehebungen

- Behebung der Regression mit der falschen Linkposition beim Ziehen mit aktiviertem [smart_rendering](api/config/smart_rendering.md)
- Behebung der Regression, bei der die [Resource Control](guides/resources.md) des [Lightbox](guides/default-edit-form.md) über ihren Container hinaus erweitert wurde
- Korrektur der fehlenden unteren Rahmenlinie von [Zeitskalen](guides/configuring-time-scale.md)-Zellen in der letzten Zeile, wenn Zellen mit benutzerdefiniertem CSS hervorgehoben werden
- Behebung des falschen Verhaltens von [Sticky Labels](guides/configuring-time-scale.md#stickylabels), wenn [smart_scales](api/config/smart_scales.md) deaktiviert ist
- Behebung des Problems, bei dem Gantt nach einem Rechtsklick weiterhin eine Aufgabe [vertikal verschiebt](api/config/order_branch.md)
- Behebung des Problems, bei dem der Aufruf von [resetLayout](api/method/resetlayout.md) die Funktionalität des [S-Curve Overlay](guides/baselines.md#extraoverlayforthechart)-Plugins unterbrach
- Verhinderung der Erstellung von doppelten Links durch den [Predecessor Editor](guides/inline-editing.md#typesofeditors)

<b>9.0</b>
---------------

<span class='release_date'>17. Oktober 2024. Haupt-Update</span>

[Übersicht des Releases im Blog](https://dhtmlx.com/blog/dhtmlx-gantt-9-0/)

### Breaking Changes

Dieses Update bringt einige Änderungen in der Struktur des Gantt-Pakets und im Verhalten der Funktionalität mit sich. Bitte lesen Sie die 
[Migrationshinweise](migration.md#80---90), um auf der sicheren Seite zu sein.

### Neue Funktionen

- [Skins-Anpassung](guides/custom-skins.md) mit CSS-Variablen
- Neues [Dark Skin](guides/skins.md#darkskin) eingeführt
- Eingebaute Unterstützung für [Baselines](guides/inbuilt-baselines.md) hinzugefügt
- [Manuell geplante Sammelaufgaben](guides/custom-projects-dates.md) werden jetzt unterstützt
- [Sticky Labels für Zeitskalen](guides/configuring-time-scale.md#stickylabels)

### Updates

- [Terrace Skin](guides/skins.md#terraceskin) wurde aktualisiert
- Standardmäßige Anzeige von [Deadlines](guides/inbuilt-baselines.md#deadlinesandconstraints) hinzugefügt
- Standardmäßige Anzeige von [Task Constraints](guides/inbuilt-baselines.md#taskconstraints) hinzugefügt
- [Quell-Dateien der Skins](guides/custom-skins.md) sind jetzt im Paket enthalten
- Die Methoden `setUndoStack` und `setRedoStack` wurden dem [Undo-Plugin](guides/undo-redo.md) zum Verwalten der Undo/Redo-Stacks hinzugefügt
- Möglichkeit, [die Professional-Versionen von Gantt über npm zu installieren](guides/installation.md)
- [Bluebird Promise](api/method/promise.md) Bibliothek wurde aus der Kernbibliothek **entfernt**
- Verschiedene Verbesserungen für die Skalierung auf hochauflösenden Bildschirmen und die Reaktionsfähigkeit auf kleineren Bildschirmen
- Aktualisierte Typdefinitionen

### Fehlerbehebungen

- Korrektur der falschen Linkpositionen für Meilensteine, wenn die übergeordnete Aufgabe eine größere Höhe hat
- Behebung des Fehlers, der während des [Auto Scheduling](guides/auto-scheduling.md) auftritt, wenn die automatische Planung für eine Aufgabe abgebrochen wird
- Sicherstellung, dass [Split Tasks](guides/split-tasks.md) korrekt innerhalb der übergeordneten Split-Zeile dargestellt werden
- Korrektur des [Auto Scheduling](guides/auto-scheduling.md#summaryscheduling) von Projekten, wenn ein Subtask-Link einen Lag von 0 hat
- Behebung falscher Linkpositionen für [Split Tasks](guides/split-tasks.md), die unterschiedliche Zeilenhöhen haben
- Sicherstellung, dass Gantt Projekte mit 2 Ebenen von Aufgaben korrekt automatisch plant
- Behebung des Problems, dass Gantt das fixedDate "assignments" im [resource_cell_value](guides/resource-management.md#resourcecellvalue) nicht zurückgibt, wenn sich die Aufgabe außerhalb des angegebenen Datumsbereichs befindet

8.0.11
----------

<span class='release_date'>8. Oktober 2024. Bugfix-Release</span>

### Fehlerbehebungen

- Behebung des Problems, dass das Grid nicht mit der Timeline scrollt, wenn ein [Spalten-Resizer](guides/specifying-columns.md#resizing) in der rechten Spalte vorhanden ist
- Verhindern, dass das [Lightbox](guides/default-edit-form.md) beim Hinzufügen des [Time section](guides/time.md) in den [wide_form](api/config/wide_form.md) Modus wechselt
- Sicherstellen, dass der [Number Editor](guides/inline-editing.md) die min- und max-Eigenschaften beachtet und keine Werte außerhalb des Bereichs zulässt
- Behebung des Fehlers beim Löschen einer Aufgabe innerhalb der [gantt.batchUpdate](api/method/batchupdate.md)-Methode, während Aufgaben im [Resource Panel](guides/resource-management.md) angezeigt werden
- Korrekte Zentrierung des [Lightbox](guides/default-edit-form.md) im Salesforce-Umfeld
- Behebung des Problems, dass die [Tastaturnavigation](guides/keyboard-navigation.md) aufgrund der [row_height](api/config/row_height.md)-Einstellung stoppt
- Korrektur der Daten für das Projekt-[Auto Scheduling](guides/auto-scheduling.md) in einigen Szenarien, sodass nur ein Auto-Scheduling-Aufruf für genaue Ergebnisse erforderlich ist
- Behebung des Problems mit der [Tastaturnavigation](guides/keyboard-navigation.md), wenn das [Resource Histogram](guides/resource-management.md#resourceviewpanel) auf der Seite vorhanden ist
- Behebung des Initialisierungsfehlers auf Touch-Geräten, wenn [gantt.getGanttInstance](guides/multiple-gantts.md) mit Konfigurationsparametern aufgerufen wird
- Die Methode [gantt.load](api/method/load.md) wurde aus der Node.js-Version entfernt
- Behebung des Fehlers, der von Gantt ausgelöst wird, wenn eine benutzerdefinierte [getVisibleRange](api/method/addtasklayer.md)-Funktion definiert wird
- Behebung der Regression, durch die Gantt nach der Aktualisierung einer Aufgabe zu dieser scrollt, wenn [Tastaturnavigation](guides/keyboard-navigation.md) aktiviert ist
- Sicherstellung, dass [Grid-Sortierung](api/config/sort.md) korrekt funktioniert, wenn auf das Sortier-Symbol im Header geklickt wird
- Behebung inkonsistenter Aufgaben-Neuzeichnung, wenn [drag_timeline](api/config/drag_timeline.md) aktiviert ist

8.0.10
----------

<span class='release_date'>23. August 2024. Bugfix-Release</span>

### Fehlerbehebungen

- Behebung des Problems, bei dem Gantt die [Zusammenführung](guides/working-time.md#mergingcalendars)" von Datumseinstellungen aus dem zweiten [Kalender](guides/working-time.md) nicht vorgenommen hat
- Behebung des Problems, bei dem [Resources](guides/resource-management.md) nicht zugewiesen wurden, wenn die Option ["hide empty"](guides/resources.md) aktiviert war
- Behebung der [getLightboxSection](api/method/getlightboxsection.md)-Methode, die für den [Resource Section](guides/resources.md) `null` zurückgab, bis ein Wert geändert wurde
- Behebung des Problems, bei dem Templates des [Resource Histogram](guides/resource-management.md#resourceviewpanel) nicht für Aufgaben aufgerufen wurden, die vor dem Mindestdatum begannen, aber innerhalb des angezeigten Datumsbereichs endeten
- Behebung des Problems, bei dem [Resource Assignments](guides/resource-management.md) nach Änderung des Aufgaben-[Typs](guides/typeselect.md) nicht gespeichert wurden
- Behebung des Problems, bei dem der 'project'-Aufgabentyp im Lightbox nicht gesetzt wurde
- Behebung des Problems, bei dem [Worktime-Einstellungen](guides/working-time.md) des [zusammengeführten](guides/working-time.md#mergingcalendars)" Kalenders als Wochenenden behandelt wurden
- Behebung des Problems, das das [Gruppieren](api/method/groupby.md) nach Ressourcen verhinderte, wenn eine Aufgabe [Resource Assignments](guides/resource-management.md) an unterschiedlichen Daten hatte
- Behebung des Fehlers, der beim Versuch, [Split Tasks zu filtern](guides/split-tasks.md#filteringsplittasks), die keine Kinder haben, mit dem Event [onBeforeSplitTaskDisplay](api/event/onbeforesplittaskdisplay.md) auftrat
- Behebung des Problems, bei dem [Resource Assignments](guides/resource-management.md) nach [Verschieben des Projekts mit Unteraufgaben](api/config/drag_project.md) nicht aktualisiert wurden

8.0.9
----------

<span class='release_date'>18. Juni 2024. Bugfix-Release</span>

### Fehlerbehebungen

- Behebung des Problems, bei dem Aufgaben nach mehrmaligem Ein- oder Ausrücken mit [Tastenkombinationen](guides/keyboard-navigation.md) verschwinden
- Behebung des Problems, das das erneute Öffnen des [Inline Editor](guides/inline-editing.md) nach vertikalem Scrollen im Gantt verhinderte
- Behebung des Problems, dass der [DataProcessor](guides/server-side.md#resources_crud) benutzerdefinierte Header ignorierte, die in der Methode [gantt.createDataProcessor](api/method/createdataprocessor.md) angegeben wurden
- Behebung des Darstellungsproblems bei Aufgaben, das auftritt, wenn der [onBeforeLightbox](api/event/onbeforelightbox.md)-Handler beim Erstellen einer neuen Aufgabe `false` zurückgibt
- Behebung der falschen Höhe von [Markern](guides/markers.md), wenn die [timeline_placeholder](api/config/timeline_placeholder.md)-Konfiguration aktiviert ist
- Behebung des Problems, dass der [Formatter](guides/formatters-ext.md) nur mit lateinischen Symbolen funktionierte
- Behebung des Problems, das dazu führte, dass Aufgaben nach [vertikalem Verschieben](api/config/order_branch.md) einer übergeordneten Aufgabe verschwinden
- Behebung der falschen Funktion der [Tastenkombination](guides/keyboard-navigation.md) zum Scrollen, wenn [smart_rendering](api/config/smart_rendering.md) aktiviert ist
- Behebung des Problems, dass benutzerdefinierte Eigenschaften von [Resource Assignments](guides/resource-management.md)-Objekten nach dem Parsen nicht enthalten waren
- Aktualisierung der TypeScript-Typdefinitionen

8.0.8
----------

<span class='release_date'>31. Mai 2024. Bugfix-Release</span>

### Fehlerbehebungen

- Behebung des Problems, das dazu führte, dass die [Undo-Erweiterung](guides/undo-redo.md) einige Aktionen bei Massenoperationen übersprang
- Behebung des Skriptfehlers, der auftritt, wenn [gantt.deleteLink](api/method/deletelink.md) aus der Funktion [gantt.silent](api/method/silent.md) aufgerufen wird
- Behebung des falschen Verhaltens von [Auto Scheduling](guides/auto-scheduling.md), wenn zwei verbundene Aufgaben unterschiedliche [Kalender](guides/working-time.md) haben
- Behebung des Skriptfehlers, der nach dem Erstellen eines [Circular Link](api/method/iscircularlink.md) auftritt
- Behebung des Skriptfehlers, der nach dem [Zerstören](api/method/destructor.md) des Gantt auftritt, wenn ein bearbeitbares [Resource Panel](guides/resource-management.md) vorhanden war
- Behebung des Problems, das dazu führte, dass das [Tooltip](guides/tooltips.md) in einigen Browsern verschwand

8.0.7
----------

<span class='release_date'>16. Mai 2024. Bugfix-Release</span>

### Fehlerbehebungen

- Behebung des Skriptfehlers, der im Test-Build auf SalesForce auftritt
- Das Ereignis [onAfterTaskUpdate](api/event/onaftertaskupdate.md) wird jetzt vor den [Auto Scheduling](guides/auto-scheduling.md)-Ereignissen nach dem Verschieben von Aufgaben in der Zeitleiste ausgelöst
- Behebung des doppelten Auslösens von Ereignissen bei Interaktion mit einer ausgewählten Aufgabe, wenn die [Multiselect](guides/multiselection.md)-Erweiterung aktiviert ist
- Behebung des Skriptfehlers, der auftrat, wenn die erste Aufgabe im Diagramm keine Daten enthielt
- Der Name des Abschnitts aus dem [lightbox](guides/default-edit-form.md) wird nun als Klassenname dem Abschnitts-Element hinzugefügt, um eine bessere Identifikation zu ermöglichen
- Behebung der Unmöglichkeit, Aufgaben aus dem [lightbox](guides/default-edit-form.md) zu terminieren, wenn [Auto Scheduling](guides/auto-scheduling.md) aktiviert ist
- Behebung der Marker-Positionierung in [resize_rows](api/config/resize_rows.md) beim Scrollen des Gantt-Diagramms
- Verhindern der [Auto Scheduling](guides/auto-scheduling.md) von verknüpften [unscheduled tasks](guides/unscheduled-tasks.md)
- Behebung eines Absturzes von Gantt beim Hinzufügen von [Rollup](guides/milestones.md#rolluptasksandmilestones)-Aufgaben mit deaktiviertem Smart Rendering
- Behebung des Ziehens von [split tasks](guides/split-tasks.md) auf Touch-Geräten
- Behebung von Fehlern, die mit den Methoden [isCriticalTask](api/method/iscriticaltask.md), [getFreeSlack](api/method/getfreeslack.md) und [getTotalSlack](api/method/gettotalslack.md) für [unscheduled tasks](guides/unscheduled-tasks.md) auftraten
- Behebung des Fehlers, der auftrat, wenn ein verknüpftes Projekt nur [unscheduled](guides/unscheduled-tasks.md) Unteraufgaben enthielt

8.0.6
----------

<span class='release_date'>25. September 2023. Bugfix-Release</span>

### Fehlerbehebungen

- Verbesserungen und Korrekturen bei der Verwendung von [WAI-ARIA-Attributen](guides/accessibility.md#waiariaattributes) für eine bessere Barrierefreiheit
- Behebung des Problems der verringernden Breite des Grids nach dem Neuzeichnen, wenn die [`grid_elastic_columns`](api/config/grid_elastic_columns.md)-Konfiguration aktiviert ist
- Die Standardanzahl der [`undo_steps`](guides/undo-redo.md#configuringtheundofunctionality) wurde von 10 auf 100 erhöht
- Der [Export API Client](guides/extensions-list.md#exportservice) ist nun in die GPL-Version von Gantt integriert, zuvor war er nur in PRO-Versionen enthalten
- Unterstützung für https Export-[Serverendpunkte](guides/export.md#parametersoftheexportmethods) in der [Node.js-Version von Gantt](guides/using-gantt-on-server.md) hinzugefügt

8.0.5
----------

<span class='release_date'>1. September 2023. Bugfix-Release</span>

### Fehlerbehebungen

- Behebung falscher Warnungen, die durch das Aktivieren von Erweiterungen über die [gantt.getGanttInstance](guides/multiple-gantts.md)-Konfiguration ausgelöst wurden
- Behebung der fehlerhaften Funktion von [gantt.exportToExcel()](api/method/exporttoexcel.md), wenn die [skip_off_time](api/config/skip_off_time.md)-Konfiguration aktiviert ist
- Verbesserungen für den [Samples Viewer](https://docs.dhtmlx.com/gantt/samples/)

8.0.4
----------

<span class='release_date'>31. Juli 2023. Bugfix-Release</span>

### Fehlerbehebungen

- Behebung eines Problems, bei dem der [DataProcessor](guides/server-side.md#resources_crud) Änderungen im [Resource Datastore](guides/resource-management.md#workingwithresourceviewpanel) nicht verfolgte
- Behebung eines Fehlers, der nach dem Verschieben einer Aufgabe auftrat, wenn die [process_resource_assignments](api/config/process_resource_assignments.md)-Konfiguration deaktiviert war
- Behebung der fehlerhaften Funktion von [gantt.calculateEndDate](api/method/calculateenddate.md) beim Subtrahieren von Datumswerten in Minuten
- Kleine Leistungsverbesserung für Layouts mit [visibility groups](guides/layout-config.md#visibilitygroups)

8.0.3
----------

<span class='release_date'>14. Juni 2023. Bugfix-Release</span>

### Fehlerbehebungen

- Leistungsverbesserungen für das [Resource Panel](guides/resource-management.md)
- Behebung der falschen Berechnung von [Free Slack](guides/critical-path.md#gettingfreeandtotalslack) für Aufgaben mit [negativem Lag](guides/auto-scheduling.md#settinglagandleadtimesbetweentasks)
- Behebung der fehlerhaften Berechnung des [Critical Path](guides/critical-path.md) für Aufgaben mit 100 % Fortschritt

8.0.2
----------

<span class='release_date'>31. Mai 2023. Bugfix-Release</span>

### Fehlerbehebungen

- Behebung von [Export](guides/export-common.md)-Fehlern, die auftreten, wenn [LinkFormatters](guides/formatters-ext.md#linkformatter) verwendet werden
- Behebung der fehlerhaften Funktion der [Undo-Erweiterung](guides/undo-redo.md) mit [Ressourcen und Ressourcen-Zuweisungen](guides/resource-management.md)
- Aktualisierte Typdefinitionen
- Leistungsverbesserungen beim Rendern von [Rollup](guides/milestones.md#rolluptasksandmilestones)-Aufgaben
- Leistungsverbesserung beim Rendern von [Split Tasks](guides/split-tasks.md)
- Weitere Leistungsverbesserungen

8.0.1
----------

<span class='release_date'>30. März 2023. Bugfix-Release</span>

### Fehlerbehebungen

- Behebung eines Fehlers, der von [gantt.showCover()](api/method/showcover.md) ausgelöst wurde, wenn das [lightbox](guides/default-edit-form.md) nicht geöffnet war
- Behebung einer Regression bei [split tasks](guides/split-tasks.md), die einen Skriptfehler für außerhalb der Zeitskala angezeigte Split Tasks verursachte
- Behebung einer Regression in der Methode [gantt.addLinkLayer()](api/method/addlinklayer.md)
- Behebung der fehlerhaften Funktion von [auto scheduling](guides/auto-scheduling.md) mit [MSO-, FNET- und FNLT-Beschränkungen](guides/auto-scheduling.md#timeconstraintsfortasks), wenn die [Einstellungen der Arbeitszeit](guides/working-time.md#globalsettings) einen Minutenanteil enthalten
- Behebung der Funktion des [onBeforeSplitTaskDisplay](api/event/onbeforesplittaskdisplay.md)-Ereignisses beim Scrollen

<b>8.0</b>
--------------

<span class='release_date'>20. März 2023. Haupt-Update</span>

[Review des Releases im Blog](https://dhtmlx.com/blog/dhtmlx-gantt-8-0/)

### Breaking Changes

Lesen Sie den [Migrationsartikel](migration.md#71---80), um mit der neuesten Version Schritt zu halten.

### Neue Funktionen

- Aktualisiertes Ressourcenmanagement:
    - Ressourcen und Ressourcen-Zuweisungen können jetzt [zusammen mit den Daten geladen werden](guides/supported-data-formats.md#json)
    - Änderungen an Ressourcen und Ressourcen-Zuweisungen können mit dem [DataProcessor](guides/server-side.md#resources_crud) erfasst werden
    - Reduzierter Boilerplate-Code für die Nutzung des [Resource panel](guides/resource-management.md#workingwithresourceviewpanel)
- Gruppierungsfunktion für Aufgaben kann jetzt die ursprüngliche Gantt-Baumstruktur innerhalb von Gruppen beibehalten:
    - Neuer **save_tree_structure**-Parameter der [groupBy()](api/method/groupby.md)-Methode
- [Leerer Status-Bildschirm](guides/empty-state-screen.md):
    - Neue [show_empty_state](api/config/show_empty_state.md)-Eigenschaft
    - Neue [emptyStateElement-Erweiterung](guides/empty-state-element-ext.md)
- Möglichkeit, das Hintergrundraster der Zeitleiste auf den gesamten Container auszuweiten:
    - Neue [timeline_placeholder](api/config/timeline_placeholder.md)-Eigenschaft
- Verbesserungen für Rollup-Elemente und Split Tasks:
    - Möglichkeit, einzelne [Rollup-Elemente](guides/milestones.md#stylingseparaterollupitems) und [Split Tasks](guides/split-tasks.md#styling) zu stylen
    - Möglichkeit, [alle Rollup-Elemente aus der Projektaufgabe auszublenden](guides/milestones.md#hidingtasksandmilestones)
    - Möglichkeit zu steuern, wo Rollup-Elemente angezeigt werden (neues [onBeforeRollupTaskDisplay](api/event/onbeforerolluptaskdisplay.md)-Ereignis)
    - Möglichkeit, [Split Tasks zu filtern](guides/split-tasks.md#filteringsplittasks) (neues [onBeforeSplitTaskDisplay](api/event/onbeforesplittaskdisplay.md)-Ereignis)
    - Performance-Optimierung für die Anzeige von Split Tasks
- Möglichkeit, Elemente erst nach Bestätigung vom Backend zu löschen:
    - Neuer **deleteAfterConfirmation**-Parameter des [dataProcessor-Konfigurationsobjekts](api/method/createdataprocessor.md)
- Aktualisiertes Auto Scheduling & Constraint-Berechnung:
    - Aufgaben können jetzt den Constraint-Typ von übergeordneten Projekten erben:
        - Neue [auto_scheduling_project_constraint](api/config/auto_scheduling_project_constraint.md)-Eigenschaft
- Verbesserungen für Critical Path, Slack und Auto Scheduling:
    - Critical Path-, Slack- und Auto Scheduling-Algorithmen können jetzt den Fortschritt einer Aufgabe berücksichtigen:
        - Neue [auto_scheduling_use_progress](api/config/auto_scheduling_use_progress.md)-Eigenschaft
     - [Total Slack](guides/critical-path.md#gettingfreeandtotalslack) kann jetzt für Projekte berechnet werden
     - Deutliche Leistungsverbesserung bei der Berechnung des Critical Path
- Die [getTaskBy()](api/method/gettaskby.md)-Methode ermöglicht jetzt die Auswahl von 'Projekt'-Aufgaben:
    - Neuer **types**-Parameter der [getTaskBy()](api/method/gettaskby.md)-Methode
- Möglichkeit, beliebigen HTML-Inhalt in die Zellen der Zeitleiste einzufügen:
    - Neues [timeline_cell_content](api/template/timeline_cell_content.md)-Template
- Die Export-API ist jetzt in [gantt.plugins](guides/extensions-list.md#exportservice) enthalten und erfordert keine zusätzliche JS-Datei mehr. Siehe [Migration](migration.md#71---80)

### Updates

- Aktualisierte TypeScript-Typdefinitionen

### Fehlerbehebungen

- Behebung des Problems bei der [Dauerberechnung](guides/working-time.md) mit Minuten-[duration_unit](api/config/duration_unit.md) und benutzerdefinierten [Arbeitszeiteinstellungen](guides/working-time.md#globalsettings)
- Behebung verschiedener Probleme bei der Slack-Berechnung
- Behebung eines Skriptfehlers beim Laden von Daten, wenn [Slack-Berechnungen](guides/critical-path.md#gettingfreeandtotalslack) aktiviert sind
- Die Methode [setWorkTime](api/method/setworktime.md) unterstützt jetzt das Setzen von Regeln für Daten innerhalb von customWeeks
- Behebung des Problems mit Smart Rendering, das leere Bereiche anstelle von Daten im Gantt verursacht
- Behebung des Problems mit [vertikalem Reordering](guides/reordering-tasks.md) von Zeilen im Grid, wenn einige Zeilen [benutzerdefinierte Höhen](guides/resizing-rows.md#settingtherowheight) haben
- Behebung der fehlerhaften Funktion von [Inline-Editoren](guides/inline-editing.md), wenn die [Multiselect](guides/multiselection.md)-Erweiterung aktiviert ist
- Behebung der fehlerhaften Anzeige des [Quick Info](guides/quick-info.md)-Popups, wenn die [gantt.config.quick_info_detached](api/config/quick_info_detached.md)-Konfiguration auf `false` gesetzt ist
- Korrekte Argumente der `is_valid`-Funktion des [Inline Editor](guides/inline-editing.md#custominlineeditor)-Interfaces. Die Funktion erhält nun das Spaltenobjekt
- Sicherstellung, dass die `parent`-Eigenschaft der Aufgabe korrekt gespeichert wird, wenn die Aufgabe mit aktiviertem [gantt.groupBy](guides/grouping.md) erstellt wird
- Behebung des Problems mit unerwartetem vertikalem Scrollen, wenn [placeholder tasks](api/config/placeholder_task.md) und [Keyboard navigation](guides/keyboard-navigation.md) aktiviert sind
- Behebung des Problems, dass der [DataProcessor](guides/server-side.md) nach [Auto Scheduling](guides/auto-scheduling.md) einige Änderungen nicht an das Backend übermittelt
- Behebung der fehlerhaften Funktion von [vertikalem Reordering](guides/reordering-tasks.md), durch die Aufgabenzeilen außerhalb des Gantt gezogen werden konnten
- Behebung der falschen Reihenfolge der `odd`-CSS-Klassen von Zeilen im [Resource panel](guides/resource-management.md#resourceviewpanel)

7.1.13
----------

<span class='release_date'>4. November 2022. Bugfix-Release</span>

### Fehlerbehebungen

- Behebt das fehlerhafte Verhalten der Methode [gantt.addLinkLayer()](api/method/addlinklayer.md) zusammen mit der Eigenschaft [smart_rendering](api/config/smart_rendering.md)
- Behebt Darstellungsprobleme des [S-Kurven-Overlays](guides/baselines.md#extraoverlayforthechart) in Kombination mit verschiedenen [Zeitskalen](guides/configuring-time-scale.md)
- Behebt das Problem beim [Größenanpassen der Spalten im Grid](guides/specifying-columns.md#resizing), wenn die Eigenschaft [grid_elastic_columns](api/config/grid_elastic_columns.md) aktiviert ist
- Behebt das Problem, dass Gantt die Position des vertikalen Scrollbalkens nach dem Löschen einer Aufgabe über die [Tastaturnavigation](guides/keyboard-navigation.md) zurücksetzt
- Behebt das fehlerhafte Verhalten der Methode [treeDatastore.move()](api/other/treedatastore.md)
- Behebt das Problem mit der Methode [gantt.parse()](api/method/parse.md); [extra collections](guides/supported-data-formats.md#jsonwithcollections) aus dem Datensatz sollten über die Methode [gantt.serverList()](api/method/serverlist.md) verfügbar sein
- Behebt das Problem mit der Methode [gantt.groupBy()](api/method/groupby.md), bei dem der Auswahlstatus nach dem Gruppieren zurückgesetzt wurde
- Behebt Kompatibilitätsprobleme mit Vue.js v3.x
- Behebt den Skriptfehler, der von der Methode [gantt.getConstraintLimitations()](api/method/getconstraintlimitations.md) ausgelöst wurde, wenn die angegebene Aufgabe kein 'constraint_date' hatte
- Behebt Kompatibilitätsprobleme mit SalesForce Web Security
- Behebt das Problem, dass der Fokus nach einem Klick außerhalb des Gantt-Containers wieder auf Gantt zurückgesetzt wurde, wenn die [Tastaturnavigation](guides/keyboard-navigation.md#focusbehaviorduringkeyboardnavigation) aktiviert war
- [Deutsche Lokalisierung](guides/localization.md#activatingalocale) wurde aktualisiert
- Es ist jetzt möglich, den Inline-Editor nach einem Klick auf eine Aufgabe im Multi-Selektionsmodus zu öffnen (die Eigenschaft [inline_editors_multiselect_open](api/config/inline_editors_multiselect_open.md) wurde hinzugefügt)

7.1.12
-----------

<span class='release_date'>16. Juni 2022. Bugfix-Release</span>

### Fehlerbehebungen

- Behebt das fehlerhafte Verhalten der Methode [gantt.isWorkTime()](api/method/isworktime.md) mit der Zeiteinheit "week"
- Behebt das Problem, das verhinderte, dass Aufgaben und Verknüpfungen gerendert wurden, wenn sie über die Methode [gantt.silent()](api/method/silent.md) hinzugefügt wurden
- Behebt das Problem, das in einigen Fällen nach dem Laden von Daten die Fehlermeldung "Task not found" angezeigt wurde
- Behebt das fehlerhafte Verhalten der Methode [gantt.changeLightboxType()](api/method/changelightboxtype.md), bei dem alte Lightbox-Elemente im DOM verblieben
- Behebt die falsche Berechnung der Enddaten von Aufgaben, wenn sich Aufgaben nach der Sommer-/Winterzeitumstellung überschneiden
- Behebt das Problem, dass das [Resource Grid](guides/resource-management.md#resourceviewpanel) verschwand, wenn der Benutzer einen Ressourcenwert mit dem Zelleneditor bearbeitete
- Behebt den Skriptfehler, der auftrat, wenn das [Gantt-Layout](guides/layout-config.md) die Ansichten ["resourceGrid"/"resourceTimeline"](guides/resource-management.md#resourceviewpanel), aber nicht die Ansichten "grid"/"timeline" enthielt
- Behebt das fehlerhafte Verhalten der [autosize](api/config/autosize.md)-Konfiguration, wenn das Gantt-Layout das [Resource Panel](guides/resource-management.md#resourceviewpanel) enthielt
- Behebt die [Lightbox](guides/default-edit-form.md) für [Split-Aufgaben](guides/split-tasks.md), die Lightbox sollte jetzt beim Doppelklick auf eine Split-Aufgabe angezeigt werden

7.1.11
-----------

<span class='release_date'>27. April 2022. Bugfix-Release</span>

### Fehlerbehebungen

- Behebt Sourcemaps für komprimierte Gantt-Dateien
- Behebt die falsche Position von [Markierungen](guides/markers.md), wenn [autosize = 'y'](api/config/autosize.md) angewendet wurde
- Behebt die falsche Position des [Tooltips](guides/tooltips.md) und einiger anderer Gantt-Elemente, wenn der Gantt-Container zusätzlichen Rand oder vertikale Versätze hatte
- Behebt das Problem, dass sich die Reihenfolge der Zeilen im [editierbaren Ressourcen-Diagramm](guides/resource-management.md) nach der Bearbeitung der ersten Zelle der Ressourcen-Zuweisung änderte
- Behebt das Problem, das das fehlerhafte Verhalten des [smart rendering](api/config/smart_rendering.md) nach dem Erweitern oder Reduzieren von Aufgaben in einigen Fällen verursachte
- Behebt das Problem mit dem [onBeforeDrag](guides/advanced-dnd.md)-Event, das die Standardaktionen nicht blockierte, wenn die Erweiterungen [click_drag](guides/extensions-list.md#advanceddragndrop) und [drag_timeline](guides/extensions-list.md#dragtimeline) aktiviert waren
- Behebt den Skriptfehler, der ausgelöst wurde, wenn die Methode [changeId()](api/other/datastore.md) für den [resource assignments store](guides/resource-management.md#assigningresources) aufgerufen wurde
- Die Scrollbars des Standard-[Gantt-Layouts](guides/layout-config.md#defaultlayout) benötigen keine festen **scrollVer**/**scrollHor**-Namen mehr, um korrekt zu funktionieren
- [Split-Aufgaben](guides/split-tasks.md) erhalten jetzt die Klasse 'gantt_selected' bei [Auswahl](api/config/select_task.md), genauso wie reguläre Aufgaben

7.1.10
-----------

<span class='release_date'>16. März 2022. Bugfix-Release</span>

### Fehlerbehebungen

- Behebt das Problem, dass eine [Projektaufgabe](guides/task-types.md#projecttasks) nicht gerendert wurde, wenn sie keine Unteraufgaben hatte und der Parameter `start_date` für die Aufgabe angegeben war
- Behebt das Problem beim [Größenanpassen einer Aufgabenzeile per Drag & Drop](guides/resizing-rows.md#resizingrowsbydraganddrop), wenn die Aufgaben-ID entweder ein Nicht-Zahlenwert oder eine numerische Zeichenkette mit mehr als 16 Symbolen war
- Behebt das fehlerhafte Verhalten von [visibility groups](guides/layout-config.md#visibilitygroups), das verhinderte, dass die Größen von Grid und Zeitskala im [komplexen Layout](guides/layout-config.md) synchronisiert wurden
- Behebt Probleme mit Aufgabendaten nach dem gleichzeitigen horizontalen Verschieben mehrerer Aufgaben
- Behebt das Problem, dass [dataProcessor](guides/server-side.md) nicht alle Updates aus verschiedenen Datastores sendete, wenn der [auto-update mode](https://docs.dhtmlx.com/api__dataprocessor_setupdatemode.html) deaktiviert war
- Behebt das Problem, dass der [milestone](guides/milestones.md) mit dem [FF-Link](api/config/links.md) auf den nächsten Tag verschoben wurde
- Behebt die falsche Berechnung des `end_date` von Meilensteinen bei Verwendung von [backward scheduling](guides/auto-scheduling.md#forwardbackwardplanning) und Einstellung von [project_end](api/config/project_end.md) auf die Nicht-Arbeitszeit
- Behebt das fehlerhafte Verhalten beim Umordnen von Aufgaben, wenn HTML-Elemente über dem Gantt angezeigt wurden
- Behebt das Problem mit der Methode [unsetWorkTime()](api/method/unsetworktime.md), wenn die Datums-/Tageskonfiguration aus dem Kalender entfernt wurde, aber die Änderungen nicht sofort angewendet wurden
- Behebt das Problem mit der Methode [clearAll()](api/method/clearall.md), die ausgewählte Aufgaben nicht löschte, wenn die [multiselect](guides/extensions-list.md#multitaskselection)-Erweiterung aktiviert war
- Behebt den Fehler, der beim Anwenden der Methode [exportToExcel()](api/method/exporttoexcel.md) mit dem Parameter `visual: true` und der Einstellung der [duration_unit](api/config/duration_unit.md)-Konfiguration auf 'hour' auftrat

7.1.9
-----------

<span class='release_date'>10. Januar 2022. Bugfix-Release</span>

### Fehlerbehebungen

- Behebt das Problem mit der Ausrichtung von Unteraufgaben nach dem Verschieben eines Projekts in der "year"-Skala und [dynamischem Wechsel der Skalen](guides/dynamic-scale.md)
- Behebt das Problem, das die Projektdauer nach dem [Verschieben des Projekts mit Unteraufgaben](api/config/drag_project.md) in der ["month"](api/config/scales.md)-Skala veränderte
- Behebt das Problem mit [Auto Scheduling](guides/auto-scheduling.md), das den [constraint type](guides/auto-scheduling.md#timeconstraintsfortasks) nach Änderung der Aufgabendauer von "ASAP" zu "SNET" änderte
- Behebt das fehlerhafte Verhalten von [backward scheduling](guides/auto-scheduling.md#forwardbackwardplanning) nach Änderung von Start- und Enddatum über Inline-Editoren, wenn [schedule_from_end](api/config/schedule_from_end.md) aktiviert ist
- Es ist jetzt möglich, die Lightbox [für schreibgeschützte Aufgaben im Read-Only-Modus](guides/readonly-mode.md#readonlymodeforspecifictaskslinks) zu öffnen
- Es ist jetzt nicht mehr möglich, schreibgeschützte Aufgaben über die Lightbox zu bearbeiten
- Behebt das Problem mit der Lightbox, die sich nicht für [bearbeitbare Aufgaben im Read-Only-Modus](guides/readonly-mode.md#readonlymodefortheentiregantt) öffnen ließ (aufgetreten in v6.3.1)
- Behebt das Problem beim Größenanpassen von Spalten im Grid nach dem Ausblenden der Zeitleiste über [show_chart](api/config/show_chart.md)
- Behebt das Problem mit [Auto Scheduling](guides/auto-scheduling.md), das nach Änderung der Werte von [project_start](api/config/project_start.md) und [project_end](api/config/project_end.md) nicht abgebrochen werden konnte
- Behebt das Problem, dass Gantt Aufgaben mit deaktiviertem Auto-Scheduling trotzdem Einschränkungen zuwies
- Behebt das Problem bei der Definition eines Jahresbereichs durch die Lightbox, wenn der Aufgabenzeitraum mehr als 10 Jahre beträgt und [kein Bereich für den Jahresselektor angegeben ist](guides/duration.md)
- Behebt den Skriptfehler, der nach dem Laden von Gantt auftrat, wenn ein horizontaler Scrollbalken an 3 oder mehr vertikale Ansichten angehängt war
- Behebt das fehlerhafte Verhalten des [onBeforeTaskAutoSchedule](api/event/onbeforeautoschedule.md)-Events nach Setzen der [ASAP-Einschränkung](guides/auto-scheduling.md#timeconstraintsfortasks) für eine Aufgabe ohne Verknüpfungen, wenn der [strict mode](api/config/auto_scheduling_strict.md) aktiviert ist
- Behebt den Fehler, der beim Ausführen von minifizierten Gantt-Versionen in Next.js-Projekten auftrat
- Behebt das Problem, dass sich die Breite von Gantt nach der Initialisierung der [gantt instance](guides/multiple-gantts.md#ganttinstanceconfiguration) in einem leeren Container änderte

7.1.8
-----------

<span class='release_date'>30. November 2021. Bugfix-Release</span>

### Fehlerbehebungen

- Behebt den Skriptfehler, der von der Methode [gantt.groupBy](guides/grouping.md) ausgelöst wurde, wenn das [Resource Histogram](guides/resource-management.md#resourceviewpanel) und die [fit_tasks](api/config/fit_tasks.md)-Konfiguration aktiviert waren
- Behebt das fehlerhafte Verhalten der [Undo-Erweiterung](guides/undo-redo.md), die keine Updates [an den Server](guides/server-side.md) sendete, wenn [vertikales Umordnen](guides/reordering-tasks.md) rückgängig gemacht wurde
- Behebt das Problem mit dem [Export nach MS Project](guides/export-msproject.md)-Modul, das in einigen Fällen zu einem `Unknown error` führte, wenn benutzerdefinierte Eigenschaften beim Export gesendet wurden
- Behebt das fehlerhafte Verhalten der Methode [gantt.silent](api/method/silent.md), die nicht verhinderte, dass [gantt.changeTaskId](api/method/changetaskid.md) API-Events und Neuzeichnungen auslöste
- Behebt das fehlerhafte Verhalten der Methode [gantt.undo](api/config/undo.md), die die ursprüngliche vertikale Position des zurückgesetzten Elements nicht wiederherstellte
- Behebt das fehlerhafte Verhalten des [Formulars zur Ressourcen-Zuweisung](guides/resources.md), das dazu führte, dass Gantt die vom Benutzer angegebene ID der [resource assignment](guides/resource-management.md#assigningresources) durch einen automatisch generierten Wert ersetzte
- Behebt das fehlerhafte Verhalten von [gantt.changeTaskId](api/method/changetaskid.md) in Fällen, in denen die betroffenen Aufgaben verschachtelte Elemente hatten, was dazu führte, dass die Ebene der verschachtelten Elemente falsch berechnet wurde

7.1.7
-----------

<span class='release_date'>5. Oktober 2021. Bugfix-Release</span>

### Fehlerbehebungen

- Behebung von Problemen bei der fehlerhaften Berechnung der [total slack](api/method/gettotalslack.md) Werte
- Performance-Verbesserung bei der Berechnung von [total slack](guides/critical-path.md#gettingfreeandtotalslack)
- Stilkorrekturen für das [lightbox](guides/edit-form.md) im [Material](guides/skins.md#materialskin) Skin
- Behebung des Problems mit dem [Zoom plugin](guides/zooming.md#builtinzoomingmodule), das verhinderte, dass die [zoom.init](guides/zoom.md) Methode funktioniert, wenn sie nach [gantt.init](api/method/init.md) aufgerufen wurde
- Behebung eines Skriptfehlers, der bei Verwendung der [inherit_calendar](guides/working-time.md#assigningcalendartoproject) Konfiguration zusammen mit der [gantt.groupBy](guides/grouping.md) Methode auftrat
- Behebung eines Skriptfehlers beim Hinzufügen von Aufgaben über [gantt.batchUpdate](api/method/batchupdate.md), wenn die [placeholder task](api/config/placeholder_task.md) aktiv ist
- Behebung des Problems, das es erlaubte, die [placeholder task](api/config/placeholder_task.md) zu sortieren, neu anzuordnen oder Unteraufgaben zu akzeptieren
- Behebung von Problemen mit der falschen Größe der [grid columns](guides/specifying-columns.md)
- Behebung des fehlerhaften Verhaltens der [column's resizers](guides/specifying-columns.md#resizing), das mit dem [reordering of the columns](api/config/reorder_grid_columns.md) kollidierte

7.1.6
---------------

<span class='release_date'>23. August 2021. Bugfix-Release</span>

### Fehlerbehebungen

- Behebung des fehlerhaften Verhaltens der [auto_scheduling_move_projects](api/config/auto_scheduling_move_projects.md) Konfiguration, wenn [schedule_from_end](api/config/schedule_from_end.md) aktiviert ist
- Behebung des fehlerhaften Verhaltens des [onrender](api/config/columns.md) Callbacks der Spalte, das dazu führte, dass benutzerdefinierte Elemente beim schnellen Scrollen im Grid verschwanden
- Behebung der Regression (aufgetreten in v7.1.5), die dazu führte, dass Zeilen im Grid nach dem Ändern der Größe einer Zelle in komplexen Layouts verschwanden
- Behebung des fehlerhaften Verhaltens der [size/visibility groups](guides/layout-config.md#visibilitygroups), das verhinderte, dass die Größen der Spalten im komplexen Layout synchronisiert wurden
- Verbesserte Darstellung des Grids, wenn das Gantt in einem kleinen Container gerendert wird

7.1.5
---------------

<span class='release_date'>22. Juli 2021. Bugfix-Release</span>

### Fehlerbehebungen

- Behebung des fehlerhaften Verhaltens beim vertikalen Umordnen von Aufgaben im ["marker" mode](guides/reordering-tasks.md#improvingperformancewithlargedatasets), wenn Gantt-Zeilen unterschiedliche Höhen haben
- Behebung des Problems mit den Größen der Zeitleiste und des Grids in einigen Layouts, wenn die [show_grid](api/config/show_grid.md) und [show_chart](api/config/show_chart.md) Konfigurationen deaktiviert sind
- Die Attribute `data-column-name` und `data-column-index` werden für Zellen des Grid-Headers hinzugefügt
- Behebung der fehlerhaften Anzeige des Grids nach der [Reinitialisierung](api/method/init.md) des Gantt, nachdem alle Spalten [aus der Konfiguration](guides/specifying-columns.md#overview) entfernt wurden
- Behebung eines Problems, das dazu führte, dass die Resource-Panel-Konfiguration [die Hauptkonfiguration](guides/common-configuration.md#ganttconfigobject) des Gantt in Vue.js-Anwendungen überschreibt
- Hinzufügen der Möglichkeit, die Konfiguration des [resource panel](guides/resource-management.md#resourceviewpanel) dynamisch zu ändern, indem das Konfigurationsobjekt für das [resource layout](guides/layout-config.md#configsandtemplatesofviews) angepasst wird

7.1.4
---------

<span class='release_date'>30. Juni 2021. Bugfix-Release</span>

### Fehlerbehebungen

- Behebung des fehlerhaften Verhaltens von [unsetWorkTime](api/method/unsetworktime.md), das dazu führte, dass betroffene Daten falsche Arbeitszeiten hatten
- Behebung eines Skriptfehlers im [Resource histogram](guides/resource-management.md#resourceviewpanel) nach Scrollen, wenn [resource_render_empty_cells](api/config/resource_render_empty_cells.md) auf false und [smart_rendering](api/config/smart_rendering.md) aktiviert ist
- Behebung des fehlerhaften Verhaltens der Methoden `editNextRow` und `editPrevRow` des [Inline Editors](guides/inline-editors-ext.md) Moduls
- Behebung des fehlerhaften Verhaltens des [Quick Info](guides/extensions-list.md#quickinfo) Popups, das dazu führte, dass das Popup nach einem Klick auf die "add"-Schaltfläche im Grid angezeigt wurde
- Behebung des fehlerhaften Verhaltens der [ASAP constraints](guides/auto-scheduling.md#timeconstraintsfortasks), das verhinderte, dass Aufgaben auf das früheste Datum des Projekts verschoben wurden
- Behebung des fehlerhaften Verhaltens von [Inline Editors](guides/inline-editors-ext.md), das die Bearbeitung von [constraints](guides/auto-scheduling.md#timeconstraintsfortasks) über den Inline-Editor verhinderte
- Behebung des fehlerhaften Scrollverhaltens bei der [Keyboard Navigation](guides/keyboard-navigation.md), das ein unnötiges Scrollen auslöste, wenn ausgewählte Aufgabenleisten sichtbar sind
- Behebung eines Skriptfehlers, wenn die Maus den Container verlässt und die [click_drag](guides/extensions-list.md#advanceddragndrop) Erweiterung aktiviert ist
- Performance-Verbesserungen für die [auto_types](api/config/auto_types.md) Konfiguration von Gantt

7.1.3
------

<span class='release_date'>25. Mai 2021. Bugfix-Release</span>

### Fehlerbehebungen

- Behebung eines Skriptfehlers beim Aufruf von [gantt.moveTask](api/method/movetask.md), wenn einige Aufgaben über das [onBeforeTaskDisplay](api/event/onbeforetaskdisplay.md) Event ausgeblendet werden
- Behebung eines Problems mit der Scrollgeschwindigkeit im neuesten Firefox-Browser
- Performance-Verbesserung für [Berechnungen der Arbeitszeit](guides/working-time.md)

7.1.2
------

<span class='release_date'>26. April 2021. Bugfix-Release</span>

### Fehlerbehebungen

- Deutliche Performance-Verbesserung des [resource panel](guides/resource-management.md#resourceviewpanel)
- Behebung eines Skriptfehlers beim Aufruf von [gantt.destructor](api/method/destructor.md), während [gantt.load](api/method/load.md) noch läuft
- Behebung des fehlerhaften Verhaltens von [split tasks](guides/split-tasks.md) beim Ändern der Aufgaben-ID
- Behebung des fehlerhaften Scrollverhaltens mit dem Mausrad in Angular

7.1.1
------

<span class='release_date'>19. April 2021. Bugfix-Release</span>

### Fehlerbehebungen

- Behebung der Regression im [click_drag](guides/extensions-list.md#advanceddragndrop) Plugin
- Behebung des Security Violation Fehlers, der beim Setzen der [gantt.config.csp](api/config/csp.md) Konfiguration auf "auto" ausgelöst wurde
- Korrektur der Build-Einstellungen, die dazu führten, dass der Paketcode v7.1.0 ES6-Syntax enthielt; die Bibliothek ist wieder ES5-kompatibel
- Behebung eines Skriptfehlers beim Versuch, eine Grid-Spalte zu skalieren, wenn die [gantt.config.reorder_grid_columns](api/config/reorder_grid_columns.md) Konfiguration aktiviert ist
- Aktualisierung der TypeScript-Typdefinitionen
- Hinzufügen des [onDestroy](api/other/datastore.md#ondestroy) Events zum [datastore](api/other/datastore.md)
- Performance-Verbesserung für Gantt-Diagramme mit einer großen Anzahl von [task calendars](guides/working-time.md#assigningcalendartotask)
- Performance-Verbesserung für [Berechnungen von Ressourcen-Zuweisungen](guides/resource-management.md#managingresourceassignments) während [batchUpdate](api/method/batchupdate.md) und [autoScheduling](guides/auto-scheduling.md)

7.1
----------

<span class='release_date'>8. April 2021. Minor Update</span>

[Review of release on the blog](https://dhtmlx.com/blog/dhtmlx-gantt-7-1-part-time-resource-assignment-rollup-tasks/)
### Breaking Changes

Dieses Update bringt Änderungen an einigen Teilen der Komponente mit sich. Auch wenn keine Änderungen am bestehenden Code erforderlich sind, überprüfen Sie bitte den Artikel zur [Migration](migration.md#70---71).

### Neue Funktionen

- [Die Möglichkeit, Ressourcen bestimmten Daten einer Aufgabe zuzuweisen](guides/resource-management.md#resourceassignmenttime)
- Die neue [gantt.getTaskAssignments()](api/method/gettaskassignments.md) Methode
- [Die Möglichkeit, Ressourcen-Zuweisungen](guides/resource-management.md#managingresourceassignments) über die neue [gantt.config.process_resource_assignments](api/config/process_resource_assignments.md) und [gantt.updateTaskAssignments()](api/method/updatetaskassignments.md) Gantt API zu verwalten
- [Rollup-Aufgaben und Meilensteine](guides/milestones.md#rolluptasksandmilestones)
- [Die Möglichkeit, Aufgabenleisten und Meilensteine im Zeitachsenbereich auszublenden](guides/milestones.md#hidingtasksandmilestones)
- [Die Möglichkeit, unterschiedliche Arbeitszeiten für verschiedene Zeiträume festzulegen](guides/working-time.md#rules_for_periods)
- [Die Möglichkeit, die Höhe einer einzelnen Zeile im Grid festzulegen](guides/resizing-rows.md#settingtherowheight)
- [Die Möglichkeit, eine Zeile im Grid per Drag-and-Drop zu skalieren](guides/resizing-rows.md#resizingrowsbydraganddrop)
- Möglichkeit, die Höhe des DOM-Elements einer Aufgabe über die [gantt.getTaskBarHeight()](api/method/gettaskbarheight.md) Methode abzurufen
- Neue Events: [onBeforeRowResize](api/event/onbeforerowresize.md), [onRowResize](api/event/onrowresize.md), [onBeforeRowResizeEnd](api/event/onbeforerowresizeend.md), [onAfterRowResize](api/event/onafterrowresize.md)
- Das [onrender](guides/specifying-columns.md#modifyingcellsafterrendering) Callback für das Rendern einer Grid-Zelle im DOM wurde hinzugefügt
- Das [onrender](api/method/addtasklayer.md) Callback für das Rendern eines benutzerdefinierten Elements der Task-Layer im DOM wurde hinzugefügt

### Fehlerbehebungen

- Behebung eines Problems beim vertikalen Umordnen von Aufgaben in der Ressourcenansicht, wenn Ressourcen Werte zugewiesen wurden
- Behebung eines Problems, das dazu führte, dass "resource_cell_value" nicht aufgerufen und die Ressourcenmarkierungen nicht gerendert wurden, wenn eine Aufgabe nicht am Anfang der Timeline-Zelle beginnt
- Behebung eines Problems, das dazu führte, dass Gantt nicht mehr funktionierte, wenn eine Aufgabe mit einer bereits im Datastore vorhandenen ID gelöscht wurde
- Behebung eines Skriptfehlers beim Angeben des Werts 0 als Aufgaben-ID, auch wenn der "root_id"-Parameter gesetzt ist
- Behebung eines Problems, das dazu führte, dass der Resizer-Listener in Salesforce-Umgebungen nicht funktionierte
- Behebung eines Skriptfehlers beim mehrmaligen Anwenden der [Fullscreen Extension](guides/fullscreen-ext.md) zusammen mit ihren Methoden
- Behebung eines Problems mit der [Keyboard Navigation Extension](guides/keynav-ext.md), das dazu führte, dass die Navigation im Grid nicht mehr funktionierte, wenn das Plugin mehrmals hinzugefügt wurde
- Behebung eines Problems mit [Inline Editors](guides/inline-editing.md), bei dem der Editor in einer Zelle, die nach einer über [hide:true](guides/specifying-columns.md#visibility) ausgeblendeten Spalte liegt, nicht geöffnet werden konnte

7.0.13
------

<span class='release_date'>15. Februar 2021. Bugfix-Release</span>

### Fehlerbehebungen

- Behebung eines Skriptfehlers, der auftrat, wenn die [layout configuration](guides/layout-config.md#layoutcustomization) dynamisch geändert und [gantt.addTaskLayer](api/method/addtasklayer.md) verwendet wurde
- Behebung eines Problems mit der anfänglichen inneren Höhe des [resource histogram](guides/resource-management.md#resourceviewpanel), wenn die Option `fetchTasks` verwendet wurde
- Behebung des fehlerhaften Verhaltens des [predecessor editor](guides/inline-editing.md#typesofeditors), das dazu führte, dass bestehende Links beim Bearbeiten des Werts gelöscht wurden
- Behebung des fehlerhaften Verhaltens des Gantt, wenn eine [task with a non-unique ID](guides/task-object-operations.md) über [gantt.addTask](api/method/addtask.md) und [gantt.parse](api/method/parse.md) hinzugefügt wurde
- Performance-Verbesserung für Drag-and-Drop, wenn die Optionen [auto_types](api/config/auto_types.md) und [drag_project](api/config/drag_project.md) aktiviert sind
- Performance-Verbesserung für die [Berechnung der Arbeitszeit](guides/working-time.md), wenn [duration_unit](api/config/duration_unit.md) auf "day" gesetzt ist

7.0.12
------

<span class='release_date'>14. Januar 2021. Bugfix-Release</span>

### Fehlerbehebungen

- Behebung einiger kleiner Probleme mit [vertikalem Drag-and-Drop](guides/reordering-tasks.md#draganddropacrosstheentireganttstructure) in großen Projekten
- Behebung des Problems mit der inkorrekten Größe des Containers bei Verwendung der [autosize](api/config/autosize.md) Konfiguration
- [Tastaturnavigation](guides/keyboard-navigation.md) funktioniert jetzt korrekt mit dem horizontalen Scrollen des Grids
- [HTML-Ansichten](guides/layout-config.md#htmlasinnerview) des Layouts unterstützen jetzt externe [Scrollbars](guides/layout-config.md#scrollbar)
- Behebung des Problems, das nach dem [Verschieben von Aufgaben](guides/reordering-tasks.md#draganddropacrosstheentireganttstructure) einen inkorrekten Zustand des Grids verursachte, wenn das [zusätzliche Grid](https://docs.dhtmlx.com/gantt/samples/10_layout/01_rightside_columns.html) dem Layout hinzugefügt wurde
- Behebung eines Skriptfehlers, der nach dem Leeren und erneuten Laden des [Ressourcen-Panels](guides/resource-management.md) auftrat, wenn eine Ressource ausgewählt war
- Hinzufügen der Möglichkeit, die automatische Korrektur des Enddatums im [Zeit](guides/time.md)-Abschnitt der Lightbox zu deaktivieren, die angewendet wurde, wenn das ausgewählte Startdatum größer als das Enddatum war
- Behebung eines Tippfehlers in der Standardkonfiguration des [Duration Formatter](guides/formatters-ext.md)
- Behebung eines Skriptfehlers, der ausgelöst wurde, wenn das Gantt-Diagramm [zerstört](api/method/destructor.md) wurde, während eine [Popup-Nachricht](guides/message-boxes.md#basicpopupmessage) angezeigt wurde
- Behebung der anfänglichen Position des horizontalen Scrolls in Grid und Timeline im [RTL](guides/rtl-mode.md)-Modus
- Behebung des Problems mit der Lightbox, das dazu führte, dass der ausgewählte Typ einer Aufgabe nicht gespeichert wurde, wenn das [typeselect](guides/typeselect.md) Steuerelement nicht zur Lightbox-Konfiguration hinzugefügt wurde
- Behebung des Problems, das dazu führte, dass [Marker](guides/markers.md) nach dem Aufruf der Methode [gantt.resetLayout()](api/method/resetlayout.md) verschwanden
- Behebung eines Performance-Problems mit der [drag_project](api/config/drag_project.md) Konfiguration bei großen Projekten
- Behebung des Problems, das verhinderte, dass das [QuickInfo](api/method/showquickinfo.md) Popup im [Nur-Lese](guides/readonly-mode.md)-Modus angezeigt wurde, wenn benutzerdefinierte Buttons zur Konfiguration hinzugefügt wurden

7.0.11
------

<span class='release_date'>11. November 2020. Bugfix-Release</span>

### Aktualisierungen

- Hinzufügen der [container_resize_timeout](api/config/container_resize_timeout.md) Konfiguration, um das Timeout vor dem Neuzeichnen des Gantt-Diagramms beim Ändern der Containergröße zu ändern
- Hinzufügen der [wheel_scroll_sensitivity](api/config/wheel_scroll_sensitivity.md) Konfiguration, um die Scrollgeschwindigkeit des Gantt-Diagramms mit dem Mausrad zu ändern

### Fehlerbehebungen

- Behebung des Fehlers mit [Auto Scheduling](guides/auto-scheduling.md) bei Verwendung verschiedener Arbeitskalender
- Behebung des Konflikts zwischen [placeholder](api/config/placeholder_task.md)-Aufgaben und [Auto Scheduling](guides/auto-scheduling.md)
- Behebung von überflüssigen Neuzeichnungen, wenn [sort](api/config/sort.md) aktiviert ist
- Behebung des Problems mit [Inline-Editoren](guides/inline-editing.md) und einem scrollbaren Grid, wenn Inline-Editoren direkt nach dem Klick den Fokus verlieren
- Behebung des Problems, das dazu führte, dass Gantt das [Quick Info](guides/extensions-list.md#quickinfo) Popup schloss, wenn der Benutzer darauf klickte

7.0.10
------

<span class='release_date'>22. September 2020. Bugfix-Release</span>

### Fehlerbehebungen

- Behebung des fehlerhaften Verhaltens von [vertikalen Resizern](guides/layout-config.md#defaultlayout) (Regression in v7.0.9)
- Verhindern eines unerwarteten Seiten-Reloads, der beim vertikalen Neuordnen von Aufgaben auf Android Chrome (Pull-to-Refresh) auftrat
- Behebung eines Skriptfehlers, der beim Erstellen eines Links auf mobilen Firefox-Geräten ausgelöst wurde
- Behebung des fehlerhaften Verhaltens der Aufgabenauswahl, wenn die [multiselect](api/config/multiselect.md) Konfiguration aktiviert ist, aber das [multiselect](guides/extensions-list.md#multitaskselection) Plugin nicht aktiviert ist
- Verbesserung der Arbeit von HTML-Select-Steuerelementen innerhalb von [Inline-Editoren](guides/inline-editing.md)
- Behebung des fehlerhaften Verhaltens von [Auto Scheduling](guides/auto-scheduling.md), wenn verknüpfte Aufgaben verschiedene [Arbeitskalender](guides/working-time.md) verwenden
- Die Methode [gantt.plugins](api/method/plugins.md) aktiviert keine Plugins mehr, die mit dem Wert `false` angegeben sind
- Behebung des Konflikts zwischen [Inline-Editoren](guides/inline-editing.md) und [Tastaturnavigation](guides/keyboard-navigation.md)
- Behebung des Problems, das dazu führte, dass [Inline-Editoren](guides/inline-editing.md) bei Doppelklick geschlossen wurden

7.0.9
-------

<span class='release_date'>27. August 2020. Bugfix-Release</span>

### Fehlerbehebungen

- Behebung eines Skriptfehlers bei der zweiten [Initialisierung](api/method/init.md) von Gantt, wenn [benutzerdefinierte Datastores](api/method/createdatastore.md) hinzugefügt wurden
- Behebung des fehlerhaften Verhaltens von [Auto Scheduling](guides/auto-scheduling.md) bei Verwendung mit [FF- und SS-Links](api/config/links.md) und wenn Quell- und Zielaufgaben [verschiedene Arbeitskalender](guides/working-time.md#multipleworktimecalendars) verwenden
- Behebung der fehlerhaften [Berechnung der Arbeitszeit](guides/working-time.md), wenn [duration_unit](api/config/duration_unit.md) auf "minute" gesetzt ist und die Startzeit in die Mitte eines arbeitsfreien Tages fällt
- Behebung des Touch-Supports für Safari iPad auf iPadOS v13.6
- Behebung der Größen der [Lightbox](guides/default-edit-form.md) Modal-Überlagerung auf mobilen Geräten
- Behebung der inkorrekten Anzeige von [Lightbox-Buttons](guides/custom-button.md) in einigen Browsern
- Unterstützung von italienischen und portugiesischen Lokalisierungen im [gantt.i18n](api/other/i18n.md) Modul verbessert
- Behebung des Fehlers im [Parent control](guides/parent.md) der [Lightbox](guides/default-edit-form.md), der bei Aufgaben auf Root-Level zu fehlerhaftem Verhalten führte
- Behebung eines Skriptfehlers, der bei der Initialisierung eines Gantt-Diagramms innerhalb eines iframes auftrat
- Behebung des fehlerhaften Verhaltens der [redo](api/config/redo.md) Konfiguration, wenn die [undo](api/config/undo.md) Konfiguration deaktiviert ist

7.0.8
-------

<span class='release_date'>24. Juli 2020. Bugfix-Release</span>

### Fehlerbehebungen

- Behebung einiger Probleme mit Touch-Support auf Android/iOS-Geräten
- Behebung einer Regression (aufgetreten in v7.0.6) bei der Linkerstellung und der Methode [gantt.isLinkAllowed](api/method/islinkallowed.md)
- Behebung eines Skriptfehlers, der ausgelöst wurde, wenn der 'locale'-Parameter in [gantt.getGanttInstance](guides/multiple-gantts.md) verwendet wurde
- Behebung eines Skriptfehlers, der von [gantt.destructor](api/method/destructor.md) ausgelöst wurde, wenn die [Tastaturnavigation](guides/extensions-list.md#keyboardnavigation) und die [Quick Info](guides/extensions-list.md#quickinfo) Erweiterungen verwendet wurden

7.0.7
--------

<span class='release_date'>17. Juli 2020. Bugfix-Release</span>

- Behebung eines Syntaxfehlers in der Typdefinition von [gantt.Promise](api/method/promise.md)

7.0.6
--------

<span class='release_date'>16. Juli 2020. Bugfix-Release</span>

### Fehlerbehebungen

- Behebung von Skriptfehlern, die auf Touch-Geräten während [Drag-and-Drop](guides/dnd.md) ausgelöst wurden
- Behebung des fehlerhaften Verhaltens der [Auto Scheduling](guides/auto-scheduling.md) Erweiterung, wenn [Linktypen](api/config/links.md) mit numerischen Werten definiert wurden
- Reduzierung der Anzahl überflüssiger Neuzeichnungen des [Ressourcen-Histogramms](guides/resource-management.md#resourceviewpanel)
- Performance-Verbesserungen für die [Gruppierungs](guides/grouping.md)-Erweiterung für Aufgaben
- Behebung der Möglichkeit, eine Ressourcen-Timeline auf Touch-Geräten zu scrollen
- Behebung des fehlerhaften Verhaltens der [resource control](guides/resource-management.md), wenn der 'hide empty'-Button verwendet wird
- Der Rückgabetyp von [gantt.Promise](api/method/promise.md) in Typdefinitionen wurde korrigiert

7.0.5
--------

<span class='release_date'>19. Juni 2020. Bugfix-Release</span>

### Aktualisierungen

- Performance-Verbesserungen für die [Arbeitszeitberechnung](guides/working-time.md), wenn die [duration_unit](api/config/duration_unit.md) Konfiguration auf "hour" gesetzt ist
- Performance-Verbesserungen für die [Arbeitszeitberechnung](guides/working-time.md), wenn die [duration_unit](api/config/duration_unit.md) Konfiguration auf "minute" gesetzt ist
- Möglichkeit hinzugefügt, Arbeitskalender im Konfigurationsobjekt von [`Gantt.getGanttInstance`](guides/multiple-gantts.md#ganttinstanceconfiguration) anzugeben

7.0.4
------

<span class='release_date'>4. Juni 2020. Bugfix-Release</span>

### Fehlerbehebungen

- Das 10000px-Limit für die Gantt-Größe im Autosize-Modus wurde entfernt, was das [Drucken](api/method/exporttopdf.md) größerer Diagramme ermöglichen sollte
- [Drag-and-Drop](guides/dnd.md) wird jetzt beendet, wenn die Maustaste über irgendeinem Teil des Dokumentenbodys losgelassen wird, nicht nur über dem Gantt-Container
- [Portugiesische Lokalisierung](guides/localization.md) wurde aktualisiert
- Der Rückgabetyp von [gantt.columnIndexByDate](api/method/columnindexbydate.md) in Typdefinitionen wurde korrigiert
- Behebung von Skriptfehlern, die auftraten, wenn die Gantt-Instanz [zerstört](api/method/destructor.md) wurde während [Drag-and-Drop](guides/dnd.md)
- Behebung der inkorrekten Berechnung von [end_date](api/method/calculateenddate.md)/[duration](api/method/calculateduration.md), wenn [duration_unit](api/config/duration_unit.md) auf "minute" gesetzt ist und [das letzte Arbeitszeitintervall](api/method/setworktime.md) nach 23:00 endet
- Behebung des Problems, das dazu führte, dass Gruppen der [Gruppierungs-Erweiterung](guides/grouping.md) sich ausklappten, wenn der Benutzer eine beliebige Aufgabe bearbeitete
- Behebung des Problems, das dazu führte, dass der zweite Parameter von [dataProcessor.setTransactionMode](guides/server-side.md#technique) ignoriert wurde, wenn ein Objekt als erster Parameter übergeben wurde
- Behebung des Problems, das dazu führte, dass der aktive [Inline-Editor](guides/inline-editing.md) nach [Neuzeichnen von Gantt](api/method/render.md) verschwand
- Behebung des Problems mit der [static_background](api/config/static_background.md) Erweiterung, das dazu führte, dass Mausklicks auf leere Zellen als Klicks auf Aufgabenelemente interpretiert wurden
- Gantt zeichnet jetzt Links zwischen [Split-Aufgaben](guides/split-tasks.md) während Drag-and-Drop dynamisch neu
- Behebung eines Skriptfehlers, der von [gantt.addTask](api/method/addtask.md) im [node.js-Paket](guides/using-gantt-on-server.md) ausgelöst wurde
- Behebung eines Skriptfehlers, der von [gantt.destructor](api/method/destructor.md) im [node.js-Paket](guides/using-gantt-on-server.md) ausgelöst wurde

7.0.3
------

<span class='release_date'>14. Mai 2020. Bugfix-Release</span>

### Fehlerbehebungen

- Behebung einer Regression in der [setWorkTime-Methode](api/method/setworktime.md), die einen Skriptfehler verursachte, wenn die Arbeitszeit für einen bestimmten Tag gesetzt wurde
- Behebung des fehlerhaften Verhaltens der [Tastaturnavigation](guides/keyboard-navigation.md) Erweiterung, wenn Gantt innerhalb einer [SalesForce Lightning Web Component](https://github.com/DHTMLX/salesforce-gantt-demo) verwendet wird

7.0.2
------

<span class='release_date'>30. April 2020. Bugfix-Release</span>

### Fehlerbehebungen

- Behebung des fehlerhaften Verhaltens von [Datumsformatierern](api/other/date.md), wenn [gantt.config.csp](api/config/csp.md) auf true gesetzt ist
- Behebung einer Regression in den [click_drag](guides/extensions-list.md#advanceddragndrop)- und [drag_timeline](guides/extensions-list.md#dragtimeline)-Erweiterungen, die zu fehlerhaftem Verhalten führte, wenn [mehrere Gantt-Instanzen](guides/multiple-gantts.md) erstellt wurden
- Behebung der inkorrekten CSS-Klasse eines Aufgabenzeilen-Elements nach Rückgabe des Fehlerstatus aus der [dataProcessor router function](guides/server-side.md#customrouting)
- Behebung des fehlerhaften Verhaltens von [Inline-Editoren](guides/inline-editing.md) innerhalb von Shadow DOM

7.0.1
-----

<span class='release_date'>16. April 2020. Bugfix-Release</span>

### Fehlerbehebungen

- Deutliche Leistungsverbesserung bei der [Berechnung der Aufgabendauer in Arbeitsminuten](guides/working-time.md)
- Behebung einer Regression in den Erweiterungen [Tooltip](guides/tooltips.md) und [Undo](guides/undo-redo.md), die zu fehlerhaftem Verhalten bei mehreren Gantt-Instanzen führte
- Behebung des Problems bei der [Neuanordnung von Spalten im Grid](api/config/reorder_grid_columns.md), das dazu führte, dass die Zeitleiste beim Ziehen und Ablegen an den Rand des Grids scrollte
- Behebung der [falschen Position einer Spalte nach deren Ziehen und Ablegen auf die rechte Seite des Grid-Randes](api/config/reorder_grid_columns.md)
- [dataProcessor custom router](guides/server-side.md#customrouting) funktioniert jetzt korrekt mit abgelehnten Promises
- Behebung der Regression im [Smart Rendering](guides/performance.md#smartrendering), durch die einige Verknüpfungen nicht sichtbar waren
- [Geteilte Aufgaben](guides/split-tasks.md) zeigen jetzt nicht nur die untergeordneten Aufgaben der ersten Ebene, sondern auch alle verschachtelten Unteraufgaben an
- Behebung des Problems mit [geteilten Aufgaben](guides/split-tasks.md) und Smart Rendering, das auftrat, wenn eine geteilte Aufgabe den Typ 'task' hatte
- Behebung des Problems mit [geteilten Aufgaben](guides/split-tasks.md), das dazu führte, dass Gantt die Dauer von 'project'-Aufgaben, die in einer geteilten Aufgabe verschachtelt sind, nicht berechnete
- Behebung der falschen Position eines Platzhalters nach dem Öffnen eines [Inline-Editors](guides/inline-editing.md) im [RTL-Modus](guides/rtl-mode.md)


<b>7.0</b>
--------------

<span class='release_date'>7. April 2020. Major Update</span>

[Review of release on the blog](https://dhtmlx.com/blog/dhtmlx-gantt-7-0-node-js-server-module-merging-multiple-calendars-reordering-grid-columns-drag-n-drop-new-customization-options/)
### Breaking Changes

Das Update bringt zahlreiche Änderungen in den API-Methoden mit sich. Siehe den Artikel zur [Migration](migration.md#63---70), um mit der neuesten Version Schritt zu halten.

### Neue Funktionen

- Möglichkeit, [eine Gantt-Instanz in Node.js zu erstellen](guides/using-gantt-on-server.md)
- Die Konfiguration [grid_elastic_columns](api/config/grid_elastic_columns.md) zum Anpassen der Spaltengröße bei Änderung der Grid-Größe wurde hinzugefügt
- [Möglichkeit, Spalten im Grid per Drag & Drop neu anzuordnen](api/config/reorder_grid_columns.md)
- Die [QuickInfo](guides/quick-info.md) Erweiterung bietet jetzt die Möglichkeit, das Popup manuell über die [Methoden des gantt.ext.quickInfo Objekts](guides/quickinfo-ext.md) zu steuern
- Möglichkeit, [langen Text in Grid-Spalten mit Auslassungszeichen abzuschneiden](guides/styling-guide.md#customizationgridcolumns)
- Die Konfiguration [dynamic_resource_calendars](api/config/dynamic_resource_calendars.md) und die Methode [mergeCalendars](api/method/mergecalendars.md) wurden hinzugefügt, [um mehrere Kalender automatisch und manuell zusammenzuführen](guides/working-time.md#mergingcalendars)
- Die Methode [getResourceCalendar](api/method/getresourcecalendar.md) wurde hinzugefügt
- Möglichkeit, [Arbeitszeit in Minuten anzugeben](guides/working-time.md#globalsettings)


### Aktualisierungen

- Sprachdateien wurden aus dem Paket entfernt, [neue API](api/other/i18n.md) für die Lokalisierung des Gantt-Diagramms wurde hinzugefügt
- Alle Erweiterungen müssen nun über die Methode [plugins](api/method/plugins.md) aktiviert werden
- `Gantt.getGanttInstance` [kann jetzt ein Konfigurationsobjekt entgegennehmen](guides/multiple-gantts.md#ganttinstanceconfiguration), wenn eine neue Gantt-Instanz erstellt wird
- Die CSP-Erweiterung wurde aus dem Paket entfernt, der [csp mode ist standardmäßig aktiviert](api/config/csp.md)
- Das settings-Objekt als dritter Parameter der Methode [attachEvent](api/method/attachevent.md) wurde hinzugefügt
- Das Format zur Festlegung der Arbeitszeiten in der Methode [setWorkTime](api/method/setworktime.md) wurde vereinfacht
- Die Standardarbeitszeiten wurden von 8:00-17:00 auf 8:00-12:00, 13:00-17:00 geändert
- Das Format der Konfiguration [gantt.config.resource_calendars](api/config/resource_calendars.md) wurde vereinfacht
- [Videoanleitungen](guides/video-guides.md) wurden zur Dokumentation hinzugefügt

### Fehlerbehebungen

- Behebung des Fehlers, der dazu führte, dass sich die Spaltenbreite nach dem Ausblenden und erneuten Anzeigen der Spalte änderte
- Behebung des Fehlers, der die Auswahl einer Aufgabe verhinderte, wenn die Multiselect-Erweiterung über die `multiselect` Konfiguration deaktiviert war
- Behebung des fehlerhaften Verhaltens von `gantt.sort` für Aufgaben mit gleichem Startdatum
- Behebung des Problems beim Ziehen und Ablegen einer Verknüpfung, wenn Gantt innerhalb einer Web-Komponente initialisiert ist

6.3.7
-----

<span class='release_date'>12. Februar 2020. Bugfix-Release</span>

### Fehlerbehebungen

- Deutliche Leistungsverbesserung beim Smart Rendering von Diagramm und Ressourcenpanel

6.3.6
-----

<span class='release_date'>10. Februar 2020. Bugfix-Release</span>

### Fehlerbehebungen

- Behebung der Regression in [gantt.resetLayout](api/method/resetlayout.md), die zu einem Skriptfehler führte
- Behebung des Problems mit dem [QuickInfo-Popup](https://docs.dhtmlx.com/gantt/desktop__extensions_list.html#quickinfo ), das in einigen Fällen hinter dem [Ressourcenpanel](https://docs.dhtmlx.com/gantt/desktop__resource_management.html#resourceviewpanel) positioniert wurde
- Behebung des Skriptfehlers, der von der Methode [gantt.getShortcutHandler](api/method/getshortcuthandler.md) ausgelöst wurde
- Behebung des Skriptfehlers, der von der Methode [tooltip.show(x, y)](https://docs.dhtmlx.com/gantt/desktop__tooltips_ext.html) ausgelöst wurde
- [gantt.getTaskNode](api/method/gettasknode.md) gibt jetzt das korrekte HTML-Element für [geteilte Aufgaben](https://docs.dhtmlx.com/gantt/desktop__split_tasks.html) zurück
- Behebung des Problems mit [horizontalen Scrollbars](https://docs.dhtmlx.com/gantt/desktop__specifying_columns.html#horizontalscrollbar), die nicht angezeigt wurden, wenn [Sichtbarkeitsgruppen](https://docs.dhtmlx.com/gantt/desktop__layout_config.html#visibilitygroups) in bestimmten Layout-Konfigurationen angegeben waren

6.3.5
-----

<span class='release_date'>31. Januar 2020. Bugfix-Release</span>

### Fehlerbehebungen

- Behebung des Problems mit der Aufgaben-[Gruppierung](guides/grouping.md), das dazu führte, dass die vertikale Scrollposition nach dem Verschieben einer Aufgabe per Drag & Drop zurückgesetzt wurde
- Behebung des Skriptfehlers, der auftrat, wenn die Konfiguration [drag_timeline](api/config/drag_timeline.md) auf `null` gesetzt wurde
- Behebung der falschen Position von hervorgehobenen Zellen, wenn [static_background](api/config/static_background.md) und [static_background_cells](api/config/static_background_cells.md) aktiviert und [smart_rendering](api/config/smart_rendering.md) deaktiviert sind
- Behebung des Problems, dass das Event [onAfterBranchLoading](api/event/onafterbranchloading.md) nicht aufgerufen wurde
- Behebung des fehlerhaften Verhaltens von [Smart Rendering](guides/performance.md#smartrendering), wenn der Wert von [task_height](api/config/task_height.md) kleiner als der Wert von [row_height](api/config/row_height.md) ist

### Aktualisierungen

- [Eine öffentliche Methode zum Neuaufbau des Gantt-Layouts nach Änderung der Konfiguration](api/method/resetlayout.md) wurde hinzugefügt

6.3.4
-----

<span class='release_date'>27. Dezember 2019. Bugfix-Release</span>

### Fehlerbehebungen

- Behebung von Abstürzen des [Ressourcenlastdiagramms](guides/resource-management.md#resourceviewpanel), wenn [Smart Rendering](guides/performance.md#smartrendering) deaktiviert ist
- Behebung eines Problems mit der benutzerdefinierten Aufgaben-Eigenschaft "unit", da Gantt diese als Dauer-Einheit interpretierte und die Aufgabendauer nach dem Ziehen vervielfachte
- Behebung der falschen [Tooltip](guides/tooltips.md)-Position, wenn die [autosize](api/config/autosize.md) Konfiguration aktiviert ist
- Behebung des falschen Ausrichtungsverhaltens von Grid-Zellen, wenn sowohl die [scrollable](guides/specifying-columns.md#horizontalscrollbar)-Eigenschaft als auch die [autofit](api/config/autofit.md) Konfiguration auf true gesetzt sind
- Das Erstellen einer Verknüpfung zwischen einer Aufgabe in der Zeitleiste und [einem Platzhalter](api/config/placeholder_task.md) im Grid ist jetzt blockiert
- Behebung des Fehlers mit der [Auto Scheduling Erweiterung](guides/auto-scheduling.md), der dazu führte, dass Gantt einfriert, wenn eine Aufgabe [den Constraint-Typ (SNET/FNET/SNLT/FNLT)](guides/auto-scheduling.md#timeconstraintsfortasks) ohne Datum oder mit ungültigem Datum hat

6.3.3
-----

<span class='release_date'>18. Dezember 2019. Bugfix-Release</span>

### Fehlerbehebungen

- Behebung des [falschen Verhaltens beim Ändern der Gridgröße](guides/specifying-columns.md#resizing), das in einigen Fällen die Zeitleiste deaktivierte
- [gantt.parse](api/method/parse.md) aktualisiert jetzt korrekt den Projektbaum, wenn eine übergeordnete Aufgabe nach ihren untergeordneten Aufgaben geladen wird
- Kompatibilität mit SalesForce Lightning Aura Components Framework (Evaluation Build) hergestellt
- Behebung der falschen Position des [Tooltip](guides/tooltips.md) in der SalesForce-Umgebung
- Behebung der falschen [Tooltip](guides/tooltips.md)-Position, wenn der Gantt-Container einen vertikalen Rand hat
- Fehlende [WAI-ARIA](guides/accessibility.md#waiariaattributes)-Attribute zu Elementen innerhalb des Gantt hinzugefügt
- Behebung des fehlerhaften Verhaltens der Konfiguration [min_duration](api/config/min_duration.md)
- Behebung des fehlerhaften Verhaltens von [Link-Formatierern](guides/formatters-ext.md#linkformatter) mit benutzerdefinierten [Gantt-Instanzen](guides/multiple-gantts.md)

6.3.2
-----

<span class='release_date'>10. Dezember 2019. Bugfix-Release</span>

### Fehlerbehebungen

- Behebung des Skriptfehlers, der auftrat, wenn [gantt.destructor](api/method/destructor.md) aufgerufen wurde, während das [Click-Drag-Feature](guides/advanced-dnd.md) aktiviert war
- [gantt.parse](api/method/parse.md) verändert keine an die Argumente übergebenen Datenobjekte mehr, stattdessen werden Deep Copies erstellt

### Aktualisierungen

- TypeScript-Typdefinitionen wurden aktualisiert
- Öffentliche Events [onBeforeBranchLoading](api/event/onbeforebranchloading.md) und [onAfterBranchLoading](api/event/onafterbranchloading.md) wurden hinzugefügt, um die URL oder dynamische Parameter von [dynamischen Ladevorgängen](guides/dynamic-loading.md) zu ändern
- Öffentliche Methode zum Ändern der URL des [dataProcessor](guides/server-side.md) nach dessen Initialisierung wurde hinzugefügt

6.3.1
-----

<span class='release_date'>29. November 2019. Bugfix-Release</span>

### Fehlerbehebungen

- Behebung der Regression im [Smart Rendering](api/method/addtasklayer.md#smartrenderingforcustomlayers), die dazu führte, dass Links in einigen Fällen nicht gerendert wurden
- Behebung des Fehlers, der das Bearbeiten und Erstellen neuer Aufgaben mit [Tastaturnavigation](guides/keyboard-navigation.md) ermöglichte, wenn der [Read-only-Modus](guides/readonly-mode.md) aktiviert war
- Behebung des Darstellungsproblems mit der [Fullscreen-Erweiterung](guides/fullscreen-mode.md), bei dem einige Seitenelemente im Vollbildmodus über dem Gantt angezeigt wurden
- Behebung des Fehlers, der dazu führte, dass die [drag-timeline Erweiterung](guides/extensions-list.md#dragtimeline) den Wert der [readonly config](guides/readonly-mode.md) zurücksetzte

6.3
-------

<span class='release_date'>14. November 2019. Minor Update</span>

[Review of release on the blog](https://dhtmlx.com/blog/dhtmlx-gantt-chart-6-3-decimal-durations-link-formatting-drag-n-drop-multiple-tasks-even-smarter-rendering/)
### Breaking Changes

Das Update bringt zahlreiche Änderungen in den API-Methoden mit sich. Siehe den Artikel zur [Migration](migration.md#62---63), um mit der neuesten Version Schritt zu halten.

### Neue Funktionen

- [Möglichkeit, Dezimalstellen für die Aufgabendauer anzugeben](guides/working-time.md#taskdurationindecimalformat)
- [Möglichkeit, die Zeitleiste per Mausklick und Ziehen zu scrollen](guides/extensions-list.md#dragtimeline)
- [Möglichkeit, mehrere Aufgaben horizontal per Drag & Drop zu verschieben](guides/multiselection.md#multitaskselectionanddragndrop)


### Updates

- Möglichkeit, [Tasks außerhalb des expliziten Bereichs](api/config/show_tasks_outside_timescale.md) von [start_date](api/config/start_date.md) und [end_date](api/config/end_date.md) der [Zeitachse](guides/configuring-time-scale.md#range) anzuzeigen
- Neues [task_end_date](api/template/task_end_date.md) Template zum Formatieren von Enddaten von Tasks hinzugefügt
- Möglichkeit, benutzerdefinierte Aktionen zum [Undo-Stack](guides/undo-redo.md#undoingredoingchangesmadefromcode) hinzuzufügen
- Möglichkeit, benutzerdefinierte Layer mit dem [Smart Rendering](api/method/addtasklayer.md#smartrenderingforcustomlayers) zu verbinden
- [Inline-Editoren](guides/inline-editing.md) für **Vorgänger** unterstützen jetzt formatierte Werte von Links
- Entfernen der Standardlimits für Eingabewerte in Datum-[Inline-Editoren](migration.md#inline_editors)
- Möglichkeit, den Root-Knoten für die [Fullscreen-Erweiterung](guides/fullscreen-mode.md) anzugeben
- Möglichkeit, das [horizontale Scrollen](api/config/horizontal_scroll_key.md) mit `shiftKey`+`mousewheel` zu ändern oder zu deaktivieren
- Die Roboto-Schrift wurde aus dem [Material Skin](guides/skins.md#materialskin) entfernt und muss manuell importiert werden

### Fixes

- Absturz der [Ressourcen-Histogramm](guides/resource-management.md#resourceviewpanel) behoben, wenn [Smart Rendering](guides/performance.md#smartrendering) ausgeschaltet ist
- Kompatibilität mit r.js Kompressor behoben
- Verschiedene Konflikte zwischen [Tastaturnavigation](guides/keyboard-navigation.md) und [Inline-Editoren](guides/inline-editing.md) behoben
- Falscher Status des [DataProcessor](guides/server-side.md#customrouting) behoben, wenn Tasks und Links nacheinander über einen [benutzerdefinierten Router](guides/server-side.md#customrouting) geändert wurden
- Ein korrektes Datenobjekt von Task/Link wird nun auch beim **delete**-Aufruf eines [benutzerdefinierten Routers](guides/server-side.md#customrouting) übergeben

6.2.7
-----

<span class='release_date'>11. Oktober 2019. Bugfix-Release</span>

### Fixes

- Problem mit vertikalem Resizing von [Grids mit horizontalem Scroll](guides/specifying-columns.md#horizontalscrollbar) in [komplexen Layouts](guides/resource-management.md#resourceviewpanel) behoben
- Falsche Arbeitsweise des [Ressourcen-Histogramms](guides/resource-management.md#resourceviewpanel) behoben, wenn der [Skalenschritt](guides/configuring-time-scale.md#timestep) größer als eins ist
- Wiederauftretender Fehler mit eingeklappten Zweigen nach Aufruf von [gantt.parse](api/method/parse.md) aus dem Bugfix [v6.2.4](#624) behoben

6.2.6
-----

<span class='release_date'>19. September 2019. Bugfix-Release</span>

### Fixes

- Regression im [v6.2 Smart Rendering](#62) behoben, die in einigen Fällen zu falschen vertikalen Positionen von Tasks nach der [Re-Initialisierung](api/method/init.md) des Gantt führte
- Problem mit [QuickInfo-Popup](guides/extensions-list.md#quickinfo) behoben, das bei [ungeplanten Tasks](guides/unscheduled-tasks.md) nicht angezeigt wurde
- Fehlerhafte Arbeitsweise von Erweiterungsdateien mit dem Ultimate Build von Gantt behoben

6.2.5
-----

<span class='release_date'>12. September 2019. Bugfix-Release</span>

### Fixes

- Falsche Initialwerte von Subtasks im [onBeforeTaskChanged](api/event/onbeforetaskchanged.md) Event-Handler nach [Verschieben eines Projekts mit Subtasks](api/config/drag_project.md) behoben
- Fehlerhafte Arbeitsweise der [Gruppierungs-Erweiterung](guides/grouping.md) behoben, wenn [Auto Task Types](api/config/auto_types.md) aktiviert sind
- Skriptfehler nach Rückgabe des *false*-Werts aus dem [onTaskLoading](api/event/ontaskloading.md) Event-Handler behoben
- Klarere Fehlermeldungen für Ausnahmen hinzugefügt, die von [gantt.load](api/method/load.md) und [gantt.parse](api/method/parse.md) ausgelöst werden können

6.2.4
-----

<span class='release_date'>5. September 2019. Bugfix-Release</span>

### Fixes

- Problem mit eingeklappten Task-Zweigen nach Datenaktualisierung mittels [parse](api/method/parse.md) Methode behoben
- Fehlerhafte Arbeitsweise von [Smart Rendering](guides/performance.md#smartrendering) in der [Ressourcenansicht](guides/resource-management.md#resourceviewpanel) behoben
- Problem behoben, das dazu führte, dass das [Zoom-Modul](guides/zooming.md) bei jeder [Re-Initialisierung](api/method/init.md) von Gantt überflüssige DOM-Event-Handler anhängte

6.2.3
-----

<span class='release_date'>29. August 2019. Bugfix-Release</span>

### Fixes

- Fehlerhafte Arbeitsweise der [Constraint-Steuerung](guides/auto-scheduling.md#timeconstraintsfortasks) in IE11 und MS Edge behoben
- Größe des Gantt-Elements im [Fullscreen-Modus](guides/fullscreen-mode.md) korrigiert
- Problem behoben, dass [onExpand](api/event/onexpand.md) und [onCollapse](api/event/oncollapse.md) Events nicht aus dem [Fullscreen-Modus](guides/fullscreen-mode.md) aufgerufen wurden
- Korrekte Position des [Tooltip](guides/tooltips.md), wenn sich der Mauszeiger nahe am linken/rechten Bildschirmrand befindet
- Der [Tooltip](guides/tooltips.md) wird jetzt ausgeblendet, wenn das [Lightbox](guides/default-edit-form.md) geöffnet ist
- Der [Tooltip](guides/tooltips.md) wird jetzt ausgeblendet, wenn das Chart gescrollt wird
- Fehlerhafte Arbeitsweise von [Tooltip](guides/tooltips.md) behoben, wodurch das Tooltip nicht aktualisiert wurde, wenn der Mauszeiger zwischen zwei Elementen mit demselben Selektor wechselte
- Fehlerhafte Arbeitsweise von [getTaskBy](api/method/gettaskby.md) behoben, wenn `null` oder `0` als zweites Argument übergeben wird
- Problem mit der [WBS](api/method/getwbscode.md) Spalte behoben, die nach dem [Sortieren](guides/sorting.md) des Gantt nicht aktualisiert wurde
- Fehlerhafte Anzeige von [static_background](api/config/static_background.md) im [Material Skin](guides/skins.md#materialskin) behoben

6.2.2
-----

<span class='release_date'>13. August 2019. Bugfix-Release</span>

### Updates

- Die [gantt.license](api/other/license.md) Property wurde hinzugefügt
- Das [onLinkCreated](api/event/onlinkcreated.md) API-Event für neue Links hinzugefügt, ähnlich wie die Funktionalität von [onTaskCreated](api/event/ontaskcreated.md) für neue Tasks
- [moveTask](api/method/movetask.md) gibt `false` zurück, wenn die Aktion mit [onBeforeTaskMove](api/event/onbeforetaskmove.md) verhindert wird

### Fixes

- Problem behoben, das dazu führte, dass eine Link-Linie verschwand, wenn die [render](api/method/render.md) Methode während der Erstellung [eines neuen Links](guides/dependencies.md) aufgerufen wurde
- Problem behoben, dass [Marker](guides/markers.md) nicht angezeigt wurden, wenn ihr Startdatum vor dem Minimaldatum der [Zeitachse](guides/configuring-time-scale.md#range) lag
- Problem behoben, dass [Marker](guides/markers.md) nicht angezeigt wurden, wenn Gantt mit [gantt.config.show_chart = false](api/config/show_chart.md) initialisiert wurde
- Verschwindende modale Überlagerung des [Lightbox](guides/default-edit-form.md) behoben, wenn der [Typ eines Tasks](guides/typeselect.md) geändert wurde
- [Problem in Tastaturnavigations-Presets](https://docs.dhtmlx.com/gantt/desktop__keyboard_navigation.html#comment-4488512513) behoben, bei dem [onAfterTaskUpdate](api/event/onaftertaskupdate.md) nach **Shift+Pfeil links** ausgelöst wurde, selbst wenn die Aktion mit [onBeforeTaskMove](api/event/onbeforetaskmove.md) abgebrochen wurde

6.2.1
-----

<span class='release_date'>7. August 2019. Bugfix-Release</span>

### Fixes

- IE11-Kompatibilität des [Click-Drag-Features](guides/advanced-dnd.md) behoben
- Skriptfehler behoben, der auftrat, wenn ein Benutzer versuchte, einen neuen Task in ein leeres Chart mit Ressourcenansicht hinzuzufügen
- Fehlerhaftes Verhalten der [Gruppierungs-Erweiterung](guides/grouping.md) behoben, das dazu führte, dass neuen Tasks ein falscher Gruppenwert zugewiesen wurde
- Skriptfehler in der [Tastaturnavigation](guides/keyboard-navigation.md) behoben, der durch das Alt+Pfeil-Tastenkürzel ausgelöst wurde
- Das Filtern in der [Ressourcensteuerung](guides/resource-management.md) ignoriert jetzt die Groß-/Kleinschreibung
- Task-Dragging und Drag-and-Drop können jetzt bei Mouseup auf jedem Gantt-Element beendet werden
- Skriptfehler behoben, der nach dem Speichern eines [ungeplanten Tasks](guides/unscheduled-tasks.md) auftrat

6.2
-------

<span class='release_date'>16. Juli 2019. Minor Update</span>

[Review of release on the blog](https://dhtmlx.com/blog/dhtmlxgantt-6-2-minor-update-boosting-gantt-chart-performance-zooming-mouse-wheel-much/)

### Breaking changes

Das Update bringt mehrere Änderungen in den API-Methoden. Siehe den [Migrationsartikel](migration.md#61---62), um mit der neuesten Version Schritt zu halten.

### Neue Funktionalität

- [Erstellen und Auswählen von Tasks per Drag-n-Drop](guides/advanced-dnd.md)
- Sanftes [Zoomen](guides/zooming.md) per Mausrad
- Möglichkeit, [Split-Tasks ein- und auszuklappen](guides/split-tasks.md#expandingandcollapsingsplittasks) (PRO)

### Updates

- Deutliche Performance-Verbesserung für Chart und Ressourcenpanel
- Änderung des Start-/Enddatums eines Tasks über [Inline-Editoren](guides/inline-editing.md) passt die Dauer des Tasks entsprechend an
- Der Prozess zur [Einrichtung der Zeitachsen-Skala](guides/configuring-time-scale.md) wurde vereinfacht
- Neue [Zooming](guides/zoom.md) und [Scales](api/config/scales.md) API

### Fixes

- Mehrfaches Hervorheben von Tasks wird nach dem Rendern zurückgesetzt
- Skriptfehler beim Zerstören von Gantt aus dem Data Processor Handler

6.1.7
-----

<span class='release_date'>27. Juni 2019. Bugfix-Release</span>

### Fixes

- Fehlerhaftes Verhalten von [getClosestWorkTime](api/method/getclosestworktime.md) behoben
- Problem mit [autoscroll](api/config/autoscroll.md) behoben, das nach dem [Umschalten der Sichtbarkeit](api/config/show_chart.md) der Zeitachse auftrat
- Bug in der [Multiselect-Erweiterung](guides/multiselection.md) behoben, der dazu führte, dass ausgewählte Tasks nach dem Neuladen des Charts nicht mehr hervorgehoben wurden
- Skriptfehler nach [vertikalem Drag-and-Drop](guides/reordering-tasks.md) behoben, wenn [Smart Rendering](guides/performance.md#smartrendering) und [Tastaturnavigation](guides/keyboard-navigation.md) aktiviert waren
- Fehlerhaftes Verhalten beim Wechsel zwischen [Inline-Editoren](guides/inline-editing.md) mit der `Tab`-Taste behoben, wenn einige Spalten im Grid [ausgeblendet](guides/specifying-columns.md#visibility) waren
- Unerwartetes Verhalten behoben, das verhinderte, dass [Lightbox](guides/edit-form.md) und [Inline-Editoren](guides/inline-editing.md) [Constraint-Daten](guides/auto-scheduling.md#timeconstraintsfortasks) überschreiben konnten

6.1.6
-----

<span class='release_date'>14. Mai 2019. Bugfix-Release</span>

### Fixes

- Problem mit nicht funktionierenden [Click-Handlern](api/config/quickinfo_buttons.md) des [QuickInfo-Popups](guides/extensions-list.md#quickinfo) nach einem zweiten [init](api/method/init.md) Aufruf behoben
- Problem mit [QuickInfo-Popup](guides/extensions-list.md#quickinfo) behoben, das nicht angezeigt wurde, wenn [show_chart](api/config/show_chart.md) auf false gesetzt war
- Falsches `action`-Argument für [dataProcessor Router](guides/server-side.md#customrouting) nach [vertikalem Drag-and-Drop](guides/reordering-tasks.md) behoben
- Problem behoben, dass [createTask](api/method/createtask.md) den `index`-Parameter ignoriert hat

6.1.5
-----

<span class='release_date'>25. April 2019. Bugfix-Release</span>

### Fixes

- Skriptfehler beim zweiten [init](api/method/init.md) Aufruf, wenn [show_chart](api/config/show_chart.md) deaktiviert ist, behoben
- Falsche Position des [vertikalen Drag-and-Drop](guides/reordering-tasks.md) Platzhalters im [Marker-Modus](guides/reordering-tasks.md#improvingperformancewithlargedatasets) behoben

6.1.4
-----

<span class='release_date'>18. April 2019. Bugfix-Release</span>

### Fixes

- Skriptfehler bei [Reinitialisierung](api/method/init.md) von Gantt im IE-Browser behoben
- Falsches Verhalten der [Tooltip-Erweiterung](guides/tooltips.md) behoben, wenn [gantt.destructor](api/method/destructor.md) aufgerufen wird
- Fehlerhafte Arbeitsweise von [Inline-Editoren](guides/inline-editing.md) im [keyboard_navigation_cells](api/config/keyboard_navigation_cells.md) Modus behoben, wenn das Grid [ausgeblendete Spalten](guides/specifying-columns.md#visibility) enthält
- Bug in der [Undo](guides/undo-redo.md) Erweiterung behoben, bei dem die Redo-Aktion für das Wiederherstellen neuer Tasks nicht alle Eigenschaften wiederherstellte
- Regression im GPL-Build behoben, die zu einem Skriptfehler bei einem zweiten [gantt.init](api/method/init.md) Aufruf führte

6.1.3
-----

<span class='release_date'>15. April 2019. Bugfix-Release</span>

### Fehlerbehebungen

- [gantt.createTask](api/method/createtask.md)/[gantt.addTask](api/method/addtask.md) verwendet jetzt den [root_id](api/config/root_id.md) Konfigurationswert anstelle der fest codierten 0 als ID
- Performance-Verbesserung bei [Arbeitszeitberechnungen](guides/working-time.md) für die `minute` und `hour` [Dauereinheiten](api/config/duration_unit.md)
- Geringe Performance-Steigerung beim Rendern großer Aufgabenlisten im [Smart Rendering](guides/performance.md#smartrendering) Modus
- Sicherstellen, dass [vertikales Drag-and-Drop](guides/reordering-tasks.md) nicht startet, wenn der Benutzer Text in einem [Inline-Editor](guides/inline-editing.md) markiert
- Behebung eines Skriptfehlers bei der [Reinitialisierung](api/method/init.md) von Gantt im IE-Browser
- Behebung eines Skriptfehlers bei der [Tastaturnavigation](guides/keyboard-navigation.md) im `cell`-Modus nach dem Löschen der letzten Aufgaben aus dem Diagramm
- Gantt entfernt automatisch generierte [statische Hintergrund](api/config/static_background.md) Stil-Elemente nach Zerstörung oder Reinitialisierung
- [Inline-Editoren](guides/inline-editing.md) sind nicht aktiv, wenn der [Nur-Lese-Modus](guides/readonly-mode.md) aktiviert ist
- Behebung einer fehlerhaften Auswahl von Rasterkopf-Zellen im `cell`-Modus der [Tastaturnavigation](guides/keyboard-navigation.md), wenn die `sort`-Konfiguration aktiviert ist
- Behebung einer Regression in der [auto_types](api/config/auto_types.md) Konfiguration, die einen automatischen Typwechsel beim Hinzufügen neuer Aufgaben verhinderte
- Behebung eines Fehlers, bei dem das Zurückgeben von `false` aus [onTaskDblClick](api/event/ontaskdblclick.md) auch [onLinkDblClick](api/event/onlinkdblclick.md) blockierte
- Behebung eines Skriptfehlers beim Parsen von [Constraint-Daten](guides/auto-scheduling.md#timeconstraintsfortasks) aus JSON-Daten
- Behebung einer falschen Positionierung von Aufgaben und [Markierungen](guides/markers.md) mit der [skip_off_time](api/config/skip_off_time.md) Konfiguration
- Behebung einer falschen Höhe von [Markierungen](guides/markers.md) nach dem Umordnen von Aufgaben per [Drag and Drop](guides/reordering-tasks.md)
- Neue Aufgaben erhalten den Anfangswert der `progress` Eigenschaft
- Behebung einer falschen Aufgabenposition nach vertikalem Drag and Drop im [Marker](guides/reordering-tasks.md#improvingperformancewithlargedatasets) Modus
- Behebung eines Skriptfehlers von [gantt.destructor](api/method/destructor.md), wenn das [Ressourcen-Panel](guides/resource-management.md#resourceviewpanel) aktiviert ist
- Behebung eines Fehlers, bei dem eine leere Zeile in einem [typeselect](guides/typeselect.md) Block angezeigt wurde
- Behebung eines Fehlers, bei dem eine Aufgabe nach einer [ID-Änderung](api/method/changetaskid.md) nicht mehr als Teil des [kritischen Pfads](guides/critical-path.md) erkannt wurde

6.1.2
-----

<span class='release_date'>26. März 2019. Bugfix-Release</span>

### Aktualisierungen

- [Tastaturnavigation](guides/keyboard-navigation.md): Methode zum Abrufen der aktiven Zelle hinzugefügt

### Fehlerbehebungen

- Behebung einer fehlerhaften Funktion des [Ressourcen-Panels](guides/resource-management.md#resourceviewpanel) nach Erstellen eines neuen Datenspeichers zum Überschreiben des vorherigen
- Behebung fehlerhafter Werte der Abfrageparameter im POST-Modus des [dataProcessor](guides/server-side.md)
- Behebung eines fehlerhaften Ergebnisses von [gantt.getClosestWorkTime](api/method/getclosestworktime.md), wenn ohne Angabe einer Richtung aufgerufen
- Behebung eines Problems, bei dem das englische Sprachpaket eine zuvor hinzugefügte Sprache nicht überschreiben konnte
- Behebung eines Skriptfehlers mit [gantt.undo](api/config/undo.md) und Einrückaktionen im Raster
- Behebung der SalesForce-Kompatibilität: Neuer Resize-Listener war in SF defekt, Fallback wurde hinzugefügt

6.1.1
-----

<span class='release_date'>5. März 2019. Bugfix-Release</span>

### Fehlerbehebungen

- Fehlende Sprachoptionen für die [Resource Lightbox Control](guides/resources.md) hinzugefügt
- Behebung eines Skriptfehlers bei der Verwendung von [gantt.destructor](api/method/destructor.md) zusammen mit dem dataProcessor
- Behebung eines Skriptfehlers bei der Verwendung von [gantt.destructor](api/method/destructor.md) zusammen mit dem [Ressourcen-Panel](guides/resource-management.md#resourceviewpanel)
- Behebung der Dateigröße der [Tooltip-Erweiterung](guides/tooltips.md)
- Behebung eines unerwarteten Aufrufs des [onTaskDblClick](api/event/ontaskdblclick.md) Events beim Doppelklick auf ein Link-Element
- Behebung eines festhängenden [Lightbox](api/config/lightbox.md) Covers, wenn [gantt.init](api/method/init.md) aufgerufen wird, während die Lightbox geöffnet ist
- Behebung von Problemen mit [Lightbox](api/config/lightbox.md) und der [Tooltip-Erweiterung](guides/tooltips.md) im [Vollbildmodus](guides/fullscreen-mode.md)

6.1
------

<span class='release_date'>21. Februar 2019. Minor Update</span>

[Review of release on the blog](https://dhtmlx.com/blog/dhtmlxgantt-6-1-time-constraints-backward-scheduling-s-curve/)

### Neue Funktionen

- [Möglichkeit, ein Overlay für das Gantt-Diagramm hinzuzufügen](guides/baselines.md#extraoverlayforthechart) (PRO)
- [Zeitliche Einschränkungen für Aufgaben](guides/auto-scheduling.md#timeconstraintsfortasks) (PRO)
- [Rückwärtsterminierung](guides/auto-scheduling.md#backwardscheduling) (PRO)
- TypeScript-Typdefinitionen sind im Paket enthalten

### Aktualisierungen

- Möglichkeit, [Tooltips für alle Elemente](guides/tooltips.md#tooltipsfordifferentelements) von dhtmlxGantt zu erstellen
- [Routing-Optionen für dataProcessor](guides/server-side.md#customrouting)
- [Projektweite Arbeitskalender](guides/working-time.md#assigningcalendartoproject) (PRO)
- Möglichkeit, [dhtmlxGantt als ES6-Modul zu importieren](guides/initializing-gantt-chart.md#moduleimport)

6.0.7
-----

<span class='release_date'>16. Januar 2019. Bugfix-Release</span>

### Fehlerbehebungen

- Reduzierte Anzahl überflüssiger Neuzeichnungen des [Ressourcendiagramms](guides/resource-management.md#resourceviewpanel)
- Behebung eines Skriptfehlers im [Ressourcendiagramm](guides/resource-management.md#resourceviewpanel) nach dem Löschen einer Aufgabe
- Behebung eines Skriptfehlers in der [Fullscreen-Erweiterung](guides/fullscreen-mode.md) nach Verlassen des Vollbildmodus mit der `Esc`-Taste
- Behebung eines fehlerhaften Zustands von Link-Drag-and-Drop beim Ziehen eines Links zwischen mehreren Diagrammen auf der Seite. Das Erstellen von Links zwischen Gantts wird nicht unterstützt
- Behebung eines Skriptfehlers nach dem Löschen von [mehreren ausgewählten Aufgaben](guides/multiselection.md) mittels [Tastaturnavigation](guides/keyboard-navigation.md)
- Behebung des Standard-Mappings von [Inline-Editoren](guides/inline-editing.md). Inline-Editoren sollten Tastaturkürzel auf Aufgaben-Zellen nicht blockieren

6.0.4
-----

<span class='release_date'>27. Dezember 2018. Bugfix-Release</span>

### Fehlerbehebungen

- Behebung einer falschen Aufgabenposition nach vertikalem DnD im Modus `order_branch='marker'`
- Behebung eines Skriptfehlers nach dem Löschen eines Unterbaums, der eine ausgewählte Aufgabe enthält
- Behebung eines Skriptfehlers beim Speichern/Abbrechen einer Lightbox mit Ressourcenfiltern

6.0.2
-----

<span class='release_date'>6. Dezember 2018. Bugfix-Release</span>

### Fehlerbehebungen

- Behebung von `ReferenceError: getResourceAssignments is not defined` beim Importieren von Gantt in ein Vue.js-Projekt
- Behebung eines Skriptfehlers beim Löschen einer Aufgabe nach Zuweisung einer Ressource über das Ressourcenformular
- Behebung eines Skriptfehlers im Ressourcendiagramm nach dem zweiten Aufruf von `gantt.init`
- Behebung eines Skriptfehlers beim Umschalten der Zeitachsen-Sichtbarkeit, wenn die Marker-Erweiterung verwendet wird
- Behebung eines Seiten-Freeze bei `gantt.parse`, wenn der Aufgabenbaum zyklische Verweise enthält, stattdessen wird ein Skriptfehler ausgelöst

<b>6.0</b>
----------

<span class='release_date'>5. November 2018. Major Update</span>

[Review of release on the blog](https://dhtmlx.com/blog/dhtmlxgantt-6-0-major-update-advanced-resource-management/)

### Funktionen

- [Zuweisung mehrerer Ressourcen zu einer Aufgabe](guides/resource-management.md#assigningresources) (PRO Version)
- [Gruppierung von Aufgaben nach mehreren Ressourcen](guides/resource-management.md#balancingresourceload) (PRO Version)
- [Ressourcen-Histogramm](guides/resource-management.md#resourceviewpanel) zusätzlich zum Ressourcenlast-Diagramm (PRO Version)
- Möglichkeit, [freien/gesamten Puffer einer Aufgabe zu ermitteln](guides/critical-path.md#gettingfreeandtotalslack) beim [Berechnen des kritischen Pfads](guides/critical-path.md) (PRO Version)
- [Import von Projekten aus Excel](guides/excel.md#importfromexcel)
- [REST-JSON DataProcessor-Modus](guides/server-side.md#restjson) zur Verarbeitung komplexer Datensätze auf beliebigen Serverplattformen
- Automatische Größenanpassung bei Änderung der Containergröße

### Konfiguration

- [Ressourcensteuerung](guides/resources.md) in der Lightbox zur Ressourcenzuweisung zu einer Aufgabe (PRO Version)
- [Verbesserte Performance beim Umordnen von Aufgaben](guides/reordering-tasks.md#improvingperformancewithlargedatasets) im "Branch"-Modus
- Performance-Update für die [auto_types](api/config/auto_types.md) Konfiguration (PRO Version)

### API

- "Marker"-Modus für die [order_branch](api/config/order_branch.md) Konfiguration zur Beschleunigung des Umordnens von Aufgaben innerhalb eines Branches
- Das [onBeforeRowDragMove](api/event/onbeforerowdragmove.md) Event zur Zusammenarbeit mit der [order_branch](api/config/order_branch.md) Konfiguration im "Marker"-Modus
- Die Methoden [getTotalSlack](api/method/gettotalslack.md) / [getFreeSlack](api/method/getfreeslack.md) für die Arbeit mit Puffern anstelle der getSlack()-Methode (PRO)
- Die Methode [importFromExcel](api/method/importfromexcel.md)
- Die *delimiter*-Option in der [groupBy](api/method/groupby.md) Methode zur Gruppierung von Ressourcen

5.2
--------------

<span class='release_date'>6. Juli 2018. Minor Update</span>

[Review of release on the blog](https://dhtmlx.com/blog/dhtmlxgantt-5-2/)

### Funktionen

- [Inline-Bearbeitung im Grid](guides/inline-editing.md)
- [Aufgaben teilen](guides/split-tasks.md) (PRO Version)
- Aktualisierte [Tastaturnavigation](guides/keyboard-navigation.md#existingshortcuts)
- Performance-Verbesserungen beim [Auto Scheduling](guides/auto-scheduling.md)

### Konfiguration

- Möglichkeit, [Aufgabentypen automatisch zu setzen](api/config/auto_types.md) (PRO Version)
- Möglichkeit, [eine Platzhalterzeile](api/config/placeholder_task.md) für das Erstellen neuer Aufgaben zu verwenden
- [Checkbox](guides/checkbox.md) und [Radiobutton](guides/radio.md) Controls für die Lightbox
- Aktualisierte [Content Security Policy](guides/content-security-policy.md) Erweiterung

### API

- Neue Methoden und Events für [Undo](guides/undo-redo.md) und [Autoscheduling](guides/auto-scheduling.md) Erweiterungen.

5.1
----------

<span class='release_date'>27. Februar 2018. Minor Update</span>

[Review of release on the blog](https://dhtmlx.com/blog/dhtmlxgantt-5-1-resource-management-rtl-mode-and-more/)

### Funktionen

- [Ressourcenmanagement](guides/resource-management.md) (PRO Version)
- [RTL-Modus](guides/rtl-mode.md)
- [Horizontaler Bildlauf für das Grid](guides/specifying-columns.md#horizontalscrollbar) und [weitere Layout-Verbesserungen](guides/layout-config.md)
- [Destruktoren für Gantt- und DataProcessor-Instanzen](guides/multiple-gantts.md#destructorofganttanddataprocessorinstances)

### Konfiguration

- [Möglichkeit, min/max Breiten für Grid-Spalten zu setzen](guides/specifying-columns.md#width)
- [Möglichkeit, Projekte mit ihren Unteraufgaben per Drag and Drop zu verschieben](guides/dnd.md#draggingprojectsalongwiththeirsubtasks) (PRO Version)
- [Erweiterte Parameter für die Exportmethoden](guides/export-common.md)

### API

- [Aktualisierte API-Events](guides/multiselection.md#apievents) für die [Multi-Task-Auswahl](guides/multiselection.md) Erweiterung

### Fehlerbehebungen

- Behebung von Problemen mit der Tastaturnavigation im Smart Rendering Modus

<b>5.0</b>
---------

<span class='release_date'>12. Dezember 2017. Major Update</span>

[Review of release on the blog](https://dhtmlx.com/blog/large-scale-update-dhtmlxgantt-version-5-0/)

### Funktionen

- [Flexibles Gantt-Layout](guides/layout-config.md)
- [Serverseitige Integration mit REST API](guides/server-side.md). Siehe auch [Tutorials für verschiedene Serverplattformen](integrations/howtostart-guides.md)

### Styling

- Neues ["Material"-Skin](guides/skins.md#materialskin)

4.2
------------

<span class='release_date'>17. August 2017. Minor Update</span>

[Review of release on the blog](https://dhtmlx.com/blog/dhtmlxgantt-4-2-manage-working-days-hours-individual-tasks/)

### Funktionalität

- [Arbeitszeitkalender auf Aufgaben- und Ressourcenebene](guides/working-time.md#multipleworktimecalendars)
- [Berechnung des WBS-Codes (Gliederungsnummern)](guides/specifying-columns.md#wbscode)
- [Autoscroll bei Drag-and-Drop-Operationen](guides/dnd.md#autoscrollwhiledraggingtasks)
- [Persische (Farsi) Lokalisierung wurde hinzugefügt](guides/localization.md#predefinedlocales)

### Konfiguration

- [Getter-Funktion für Tastaturnavigation-Shortcuts](api/method/getshortcuthandler.md) wurde hinzugefügt
- [Konfiguration für das kaskadierende Löschen von verschachtelten Aufgaben und Verknüpfungen](api/config/cascade_delete.md) wurde hinzugefügt
- Die Möglichkeit, [die Zeitleiste horizontal durch *Shift+Mausradbewegung* zu scrollen](guides/keyboard-navigation.md#builtinshortcutforhorizontaltimelinescrolling), wurde hinzugefügt
- Deutsche und italienische Lokalisierungen wurden aktualisiert
- GIF-Bilder in den Gantt-Skins wurden durch PNG ersetzt


4.1
---------

<span class='release_date'>1. September 2016. Minor Update</span>

[Übersicht zum Release im Blog](https://dhtmlx.com/blog/dhtmlxgantt-4-1-full-accessibility-support/)

### Funktionalität

- [Tastaturnavigation](guides/keyboard-navigation.md)
- [WAI-ARIA-Unterstützung](guides/accessibility.md#waiariaattributes)
- [High-Contrast-Themes](guides/accessibility.md#highcontrastthemes)
- Aktualisierte [Auto Scheduling](guides/auto-scheduling.md) und [Critical Path](guides/critical-path.md) Berechnungen (PRO-Version)

### Konfiguration

- Performance-Verbesserungen bei [Arbeitszeitberechnung](guides/working-time.md) und [Zeitskalen-Rendering](guides/performance.md)
- [Öffentliche Methode zum Entfernen von Arbeitszeiten](api/method/unsetworktime.md) hinzugefügt
- [API-Events für QuickInfo-Popup](api/overview/events-overview.md) hinzugefügt
- [Kroatische Lokalisierung](guides/localization.md#predefinedlocales) hinzugefügt
- [Türkische Lokalisierung](guides/localization.md#predefinedlocales) aktualisiert


<b>4.0</b>
---------

<span class='release_date'>1. Dezember 2015. Major Update</span>

### Funktionalität

- [Smart Rendering](guides/performance.md#smartrendering) für große Datenmengen
- [Undo/Redo](guides/undo-redo.md) Erweiterungen

### Konfiguration

- [Kritischer Pfad Berechnung](guides/critical-path.md) - Unterstützung für [Lag/Lead von Verknüpfungen](guides/auto-scheduling.md#settinglagandleadtimesbetweentasks) hinzugefügt (PRO-Version)
- Spanische und chinesische [Lokalisierungen](guides/localization.md#predefinedlocales) aktualisiert

### API

- Verbesserungen der öffentlichen API - öffentliche Helfer für [ajax](https://docs.dhtmlx.com/api__refs__dhtmlxajax.html), [Umgebungsvariablen](api/other/env.md)
- [API-Bereinigung](migration.md#3x---40) - überflüssige globale Objekte entfernt, Konflikte mit dhtmlxSuite gelöst
- Öffentliche Helfer für [Popup-Nachrichten](guides/message-boxes.md) hinzugefügt


3.3
----------

<span class='release_date'>21. Juli 2015. Minor Update</span>

### Funktionalität

- Abhängigkeits-[Auto Scheduling](guides/auto-scheduling.md) Funktion (PRO-Version)
- [Vollbildmodus](guides/fullscreen-mode.md)
- Unterstützung für [ungeplante Aufgaben](guides/unscheduled-tasks.md)
- [Rückwärtsplanung](guides/loading.md#loadingtaskdates)

### Konfiguration

- Erste Unterstützung für [Content Security Policy](guides/content-security-policy.md)
- Möglichkeit, [Spaltensortierung pro Spalte im Grid](guides/sorting.md#sortingpercolumninthegrid) einzustellen
- Verbesserte Reihenfolgenfunktion - [Drag-and-Drop zwischen Ebenen](guides/reordering-tasks.md#draganddropacrosstheentireganttstructure)

### API

- [REST-Modus für Ajax-Laden/Speichern](guides/server-side.md)


3.2
----------------

<span class='release_date'>18. März 2015. Minor Update</span>

### Funktionalität

- [Gruppierung von Aufgaben](guides/grouping.md) (PRO-Version)
- [Multi-Task-Auswahl](guides/multiselection.md)
- [Datenexport in iCal- und Excel-Formate](guides/excel.md)
- [Deutliche Performance-Verbesserung bei Arbeitszeit- und Kritischer-Pfad-Berechnung](guides/performance.md)


### Konfiguration

- [Möglichkeit, den Bereich für den Jahresauswahl-Selektor in der Lightbox festzulegen](guides/time.md#mapping)


### API

- [Events zur Steuerung der verfügbaren Zielpositionen beim Umordnen von Aufgaben](guides/reordering-tasks.md#restrictingdroppositions)
- [Events zur Steuerung des Ladevorgangs](guides/loading.md#eventsflow)
- Neue Beispiele, Methoden, Events


3.1
----------------

<span class='release_date'>25. Oktober 2014. Minor Update</span>

### Funktionalität

- Möglichkeit, Aufgaben auf Touch-Geräten zu verschieben

### Konfiguration

- [Standardabstand zwischen der ersten und letzten Aufgabe auf einer Skala geändert](api/config/scale_offset_minimal.md)

### Fehlerbehebungen

- Falsches Verhalten des Tooltips beim Erweitern/Reduzieren des Aufgabenbaums
- Reihenfolge der API-Events während der Gantt-Initialisierung
- Falsches Verhalten von vertikalen Markierungen, wenn Gantt geleert oder neu initialisiert wird


<b>3.0</b>
----------------

<span class='release_date'>11. September 2014. Major Update</span>

### Konfiguration

- [Möglichkeit, die Steuerelemente 'Zeit' und 'Dauer' auf benutzerdefinierte Datumseigenschaften abzubilden](guides/time.md#mapping)

### Funktionalität

- [Dynamisches Laden](guides/dynamic-loading.md) (PRO-Version)
- [Möglichkeit, Spalten und das gesamte Grid per Drag-&-Drop zu skalieren](guides/specifying-columns.md)
- [Möglichkeit, Spalten dynamisch ein-/auszublenden](guides/specifying-columns.md#visibility) (PRO-Version)
- [Möglichkeit, zusätzliche Elemente im Zeitleistenbereich anzuzeigen](guides/baselines.md) (PRO-Version)
- [Unterstützung für den kritischen Pfad](guides/critical-path.md) (PRO-Version)
- [Neue Möglichkeiten für den Nur-Lese-Modus](guides/readonly-mode.md)
- [Markierungen für heute und andere vertikale Marker](guides/markers.md)
- [Komplette Neudefinition des Renderings verschiedener Aufgabentypen (Projekte, Meilensteine, etc.) möglich](guides/baselines.md) (PRO-Version)
- [Aufgaben-Styling durch spezielle Datenattribute](guides/colouring-tasks.md#specifyingstyleinthepropertiesofataskobject)
- [Link-Styling durch spezielle Datenattribute](guides/colouring-lines.md#specifyingcolorinthepropertiesofthelinkobject)


### API

- [Neue Methoden für Baumoperationen](guides/task-tree-operations.md)

2.1
-------------

<span class='release_date'>28. März 2014. Minor Update</span>

### Global

- Lokalisierungen aktualisiert
- Viele Fehler wurden behoben

### Konfiguration

- [Individuelle Konfiguration der Lightbox für verschiedene Aufgabentypen](guides/task-types.md#specificlightboxpertasktype)
- [Nichtlineare Skalen, Möglichkeit Zeit aus der Skala auszublenden](guides/custom-scale.md) (PRO-Version)

### Funktionalität

- [Meilensteine](guides/milestones.md) und [Projekte](guides/task-types.md#projecttasks) Unterstützung (PRO-Version)
- [Möglichkeit, die Aufgabendauer in Arbeitstagen/-stunden statt in Kalenderzeit zu berechnen](guides/working-time.md)
- [Unterstützung für mehrere Gantt-Diagramme auf einer Seite](guides/multiple-gantts.md) (PRO-Version)

### API

- Weitere Konfigurationen, Methoden, Events hinzugefügt


<b>2.0</b>
-------------------------------------

<span class='release_date'>18. Oktober 2013. Major Update</span>

### Global

- [jQuery-Integration](guides/jquery-integration.md)
- Große Performance-Verbesserungen
- [Fertige PHP-Integration](guides/server-side.md)

### Konfiguration

- [Konfigurierbare mehrzeilige Skalen](guides/configuring-time-scale.md)
- [Konfigurierbares mehrspaltiges Grid mit optionaler Sortierung und Drag-and-Drop](guides/reordering-tasks.md)
- [Konfigurierbares Popup-Formular zur Aufgabenbearbeitung](guides/edit-form.md)
- [Alle Textelemente können über Templates definiert werden](guides/common-configuration.md#gantttemplatesobject)
- [Alle Datumsangaben sind konfigurierbar](guides/common-configuration.md#ganttconfigobject)
- [Alle Textbezeichnungen können lokalisiert werden](guides/localization.md)

### Styling

- [Standard-Skin auf "terrace" geändert](guides/skins.md#terraceskin)
- [3 neue Skins](guides/skins.md)
- [Balken können optional einen inneren Resizer haben](api/config/drag_resize.md)
- [Optionale UI für die Aufgabenerstellung](guides/overview.md)
- [Vertikale und horizontale Linien können nach eigenen Regeln eingefärbt werden](guides/highlighting-time-slots.md)

### Funktionalität

- [Laden und Serialisieren aus JSON](guides/supported-data-formats.md#json)
- [Laden und Serialisieren mit vereinfachtem XML-Format](guides/supported-data-formats.md#xmldhtmlxgantt20)
- [3 Arten der Aufgabenverknüpfung](api/config/links.md)
- Gantt-Diagramme funktionieren auf Touch-Geräten


### API

- [Viele Events hinzugefügt](api/overview/events-overview.md)
- [Templates](api/overview/templates-overview.md) und [Konfigurationsoptionen](api/overview/properties-overview.md) hinzugefügt
- [API vereinfacht, es wird nur noch ein Gantt-Objekt statt vieler verschiedener Objekte verwendet](migration.md)


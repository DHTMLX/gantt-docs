---
title: "Migration von älteren Versionen"
sidebar_label: "Migration von älteren Versionen"
---

Migration von älteren Versionen
=================================================


8.0 -> 9.0
-------------

Das Update auf v9.0 bringt mehrere Breaking Changes mit sich.


### Skins auf CSS-Variablen umgestellt

CSS-Skins (Themes) wurden komplett überarbeitet und nutzen jetzt CSS-Variablen. Während die HTML-Struktur der Komponente und die CSS-Klassennamen größtenteils unverändert geblieben sind, funktionieren CSS-Styles, die für ältere Versionen des Gantt geschrieben wurden, unter Umständen nicht mehr wie erwartet mit v9.0.

Beispielsweise wurde folgender Stil verwendet, um Aufgaben je nach Priorität einzufärben:

~~~html
<style>
    /* allgemeine Styles zum Überschreiben von Rahmen-/Fortschrittsfarbe */
    .gantt_task_line{
        border-color: rgba(0, 0, 0, 0.25);
    }
    .gantt_task_line .gantt_task_progress {
        background-color: rgba(0, 0, 0, 0.25);
    }

    /* hoch */
    .gantt_task_line.high {
        background-color: #03A9F4;
    }
    .gantt_task_line.high .gantt_task_content {
        color: #fff;
    }

    /* mittel */
    .gantt_task_line.medium {
        background-color: #f57730;
    }
    .gantt_task_line.medium .gantt_task_content {
        color: #fff;
    }

    /* niedrig */
    .gantt_task_line.low {
        background-color: #e157de;
    }
    .gantt_task_line.low .gantt_task_content {
        color: #fff;
    }
</style>
~~~

Ab v9.0 wird derselbe Effekt mit folgendem Stil erreicht:

~~~html
<style>
    /* hoch */
    .gantt_task_line.high {
        --dhx-gantt-task-background: #d96c49;
        --dhx-gantt-task-color: #fff;
    }

    /* mittel */
    .gantt_task_line.medium {
        --dhx-gantt-task-background: #f57730;
        --dhx-gantt-task-color: #fff;
    }

    /* niedrig */
    .gantt_task_line.low {
        --dhx-gantt-task-background: #fff;
        --dhx-gantt-task-color: #fff;
    }
</style>
~~~

Die verfügbaren Variablen finden Sie auf der Seite [Skins-Anpassung](guides/custom-skins.md).

:::note
Bei der Migration ist es wahrscheinlich notwendig, bestehendes CSS zu aktualisieren, um das gewünschte Design zu erzielen.
:::

### Einzelne CSS-Datei

Alle Themes sind jetzt in einer einzigen **dhtmlxgantt.css** Datei enthalten.

Um ein bestimmtes Skin zu aktivieren, verwenden Sie die Eigenschaft `gantt.skin`:

~~~js
gantt.skin = "material";
~~~

Oder die Methode [setSkin](api/method/setskin.md):

~~~js
gantt.setSkin("material");
~~~

:::note
Beachten Sie, dass `gantt.setSkin()` das Gantt neu zeichnet.
:::

Wenn Sie ein Skin außer **terrace** verwenden, sind folgende Migrationsschritte erforderlich:

1) Ersetzen Sie die CSS-Datei des Skins durch die Datei `dhtmlxgantt.css`:

~~~html
<!-- ALT -->
<link rel="stylesheet" href="./codebase/dhtmlxgantt_material.css" type="text/css">
<!-- NEU -->
<link rel="stylesheet" href="./codebase/dhtmlxgantt.css" type="text/css">
~~~

2) Aktivieren Sie das gewünschte Skin per JavaScript:

~~~js
gantt.setSkin("material");
gantt.init("gantt_here");
~~~

### Eingebaute Unterstützung für Baselines, Deadlines und Constraints

Früher mussten Baselines manuell über die API `gantt.addTaskLayer` hinzugefügt werden. Mit Gantt 9.0 gibt es nun eine eingebaute Unterstützung für Baseline-Entitäten sowie
Deadlines und Aufgaben-Constraints.

Falls Sie die Standardeinstellungen deaktivieren und Baselines und Deadlines manuell rendern möchten, können Sie die entsprechenden Konfigurationsoptionen verwenden: [baselines](api/config/baselines.md) und [deadlines](api/config/deadlines.md):

~~~js
// eingebaute Baseline-Funktionalität deaktivieren
gantt.config.baselines = false;

// eingebaute Deadlines-Funktionalität deaktivieren
gantt.config.deadlines = false;
~~~

Die eingebaute Anzeige von Aufgaben-Constraints kann ebenfalls über die erweiterte [auto_scheduling](api/config/auto_scheduling.md)-Konfiguration deaktiviert werden:

~~~js
gantt.config.auto_scheduling = {
  enabled: true, 
  show_constraints: false /*!*/
};
~~~

Dadurch wird die Standardanzeige von Aufgaben-Constraints deaktiviert, während die Auto-Scheduling-Funktionalität weiterhin aktiv bleibt.

### Feste Labels in der Timeline

Ab v9.0 sind Zeitskalen-Labels standardmäßig "sticky". Das bedeutet, dass die Labels beim Scrollen sichtbar bleiben und dem Viewport folgen, bis sie natürlich aus dem Bildbereich verschwinden. In früheren Versionen waren die Labels zentriert in ihren Zellen und blieben beim Scrollen nicht sichtbar.

Wenn Sie das alte Verhalten wiederherstellen und die festen Labels deaktivieren möchten, können Sie die Eigenschaft `sticky` des [scale](guides/configuring-time-scale.md) Objekts auf false setzen:

~~~js
gantt.config.scales = [
  {unit: "year", step: 1, format: "%Y", sticky: false},
  {unit: "month", step: 1, format: "%F", sticky: false},
  {unit: "day", step:1, format: "%j", sticky: false}
];
~~~

### Promise-Implementierung

Die **Bluebird**-Bibliothek wurde aus dem Gantt-Bundle entfernt. [Promise](api/method/promise.md) verwendet jetzt die native Promise-Implementierung.

### Lightbox-Größenanpassung

Seit v9.0 ist die Methode [resizeLightbox](api/method/resizelightbox.md) veraltet und wurde aus dem Gantt-Code entfernt. Sie wird nicht mehr benötigt, da die Größenanpassung der Lightbox jetzt automatisch funktioniert.
Beachten Sie, dass Sie die Methode **resizeLightbox()** aus Ihrer Konfiguration entfernen sollten, um Fehler zu vermeiden, falls sie noch vorhanden ist.

7.1 -> 8.0
-------------

### Ressourcen-Zuweisungen

In früheren Versionen von DHTMLX Gantt wurden Änderungen an Ressourcen-Zuweisungen als Eigenschaften von Aufgabenobjekten an das Backend gesendet, was die Integration mit Backend-APIs in manchen Fällen unnötig erschwerte.

Ab DHTMLX Gantt v8.0 können Änderungen an Ressourcen und Ressourcen-Zuweisungen über den dataProcessor geleitet werden. Weitere Informationen finden Sie im Abschnitt [Routing CRUD actions of resources and resource assignments](guides/server-side.md#resources_crud).

### Export-Service

Ab v8.0 ist die Import/Export-Funktionalität in die Gantt-Bibliothek integriert.

Falls Sie bereits **https://export.dhtmlx.com/gantt/api.js** auf Ihrer Seite eingebunden haben, um den Online-Export-Service zu nutzen, z.B.:

~~~js
<script src="codebase/dhtmlxgantt.js"></script>
<script src="https://export.dhtmlx.com/gantt/api.js"></script>
~~~

müssen Sie die Datei entfernen und die **export_api**-Erweiterung mit der **gantt.plugins** Methode aktivieren:

~~~js
gantt.plugins({
    export_api: true
});
~~~

### Veraltete Klassennamen

Seit v8.0 wurden die folgenden veralteten Klassennamen entfernt und durch neue ersetzt:

- ".dhtmlx-info" -> **".gantt-info"**
- ".dhtmlx-error" -> **".gantt-info"**
- ".dhtmlx_popup_title" -> **".gantt_popup_title"**
- ".dhtmlx_popup_text" -> **".gantt_popup_text"**
- ".dhtmlx_popup_controls" -> **".gantt_popup_controls"**
- ".dhtmlx_ok_button" -> **".gantt_ok_button"**
- ".dhtmlx_click_me_button" -> **".gantt_click_me_button"**
- ".dhtmlx_popup_button" -> **".gantt_popup_button"**
- ".dhtmlx_modal_box" -> **".gantt_modal_box"**
- ".dhtmlx-" + config.type -> **".gantt-" + config.type**
- ".dhtmlx_" + btn.label.toLowerCase() + "_button" -> **".gantt_" + btn.label.toLowerCase() + "_button"**

7.0 -> 7.1
-------------

Version 7.1 bringt keine Breaking Changes mit sich, die eine Anpassung des bestehenden Codes erfordern würden.

Es gibt eine kleine visuelle Änderung in der Darstellung von Meilensteinen, die bei Bedarf per Code wieder rückgängig gemacht werden kann.
Große Projekte, die das Ressourcen-Panel verwenden, können eine mögliche Performance-Verschlechterung durch die neue Logik der Ressourcen-Zuweisungen erfahren. Diese kann durch das Deaktivieren der nicht benötigten Logik gemindert werden.

### Meilensteine

Die Größe der Meilenstein-Elemente wurde im Vergleich zu früheren Versionen geändert, damit die Meilensteine die gleiche Höhe wie reguläre Balken haben.

Wenn Sie möchten, dass die Meilensteine wie in früheren Versionen aussehen, können Sie die Höhe der Meilenstein-Elemente mit der Eigenschaft **bar_height** anpassen:

~~~js
{
    id:23, text:"Mediate milestone", start_date:"13-04-2018", 
    type:"milestone", parent:"15", bar_height: 35
}
~~~

### Ressourcen-Zuweisungen

Version 7.1 fügt eine komplexe Logik für Ressourcen-Zuweisungen hinzu, die es ermöglicht, Daten der Ressourcen-Zuweisungen anzugeben und mit den Ressourcen-Zuweisungen über DataStore zu arbeiten.
Dies sollte den bestehenden Code nicht beeinflussen, kann jedoch zu spürbarem Performance-Overhead bei Ressourcenberechnungen führen.

Wenn Sie keine Ressourcen bestimmten Terminen von Aufgaben zuweisen müssen, können Sie die neue Funktionalität mit der Konfiguration **process_resource_assignments** deaktivieren, um die Performance zu verbessern:

~~~js
gantt.config.process_resource_assignments = false;
~~~

### Neue optionale Eigenschaften von Aufgabenobjekten

Folgende Eigenschaften des Aufgabenobjekts werden jetzt vom Gantt verarbeitet und beeinflussen die Anzeige der Aufgaben:

- "task.row_height"
- "task.bar_height"
- "task.hide_bar"
- "task.rollup"
  
Wenn Sie benutzerdefinierte Eigenschaften mit denselben Namen verwenden, sollten Sie diese umbenennen, um Konflikte zu vermeiden.

### Deep Copy beim Daten-Parsing

Gantt hat von [v6.3.2](whats-new.md#632) bis v7.1 eine Deep Copy von Datenobjekten beim Parsing durchgeführt.


Ab v7.1 ist diese Funktionalität standardmäßig deaktiviert.

Sie können das alte Verhalten wieder aktivieren, indem Sie [gantt.config.deepcopy_on_parse](api/config/deepcopy_on_parse.md) auf *true* setzen:

~~~js
gantt.config.deepcopy_on_parse = true;
~~~

### Veraltete Konfiguration

Die Eigenschaft **gantt.config.task_height** ist seit v7.1 veraltet. Obwohl die Eigenschaft weiterhin funktioniert und die **task_height**-Konfiguration verwendet wird, wenn sie angegeben ist, sollten Sie besser die neue Option [gantt.config.bar_height](api/config/bar_height.md) verwenden:

~~~js
gantt.config.bar_height = 50;
~~~


6.3 -> 7.0
---------------------

### Erweiterungen und Sprachdateien

Das neueste Update v7.0 bringt zwei große Änderungen in der Struktur des Gantt-Pakets:

1) Alle Dateien der Erweiterungen sind jetzt im *dhtmlxgantt.js*-File gebündelt.
Um eine der zusätzlichen Erweiterungen von dhtmlxGantt zu aktivieren, müssen Sie einen API-Aufruf verwenden.

- Falls Sie bereits eine Erweiterungsdatei aus dem integrierten Paket auf Ihrer Seite eingebunden haben, z.B.:

~~~js
<script src="../codebase/dhtmlxgantt.js"></script>
<script src="../codebase/ext/dhtmlxgantt_auto_scheduling.js"></script>
~~~

oder

~~~js
import "dhtmlx-gantt";
import "dhtmlx-gantt/ext/dhtmlxgantt_auto_scheduling";
~~~

müssen Sie die Erweiterungsdatei entfernen und die Erweiterung mit der **gantt.plugins** Methode aktivieren:

~~~js
gantt.plugins({
   auto_scheduling: true
});
~~~

Die vollständige Liste der Erweiterungen finden Sie [hier](guides/extensions-list.md).

- Wenn Sie eine modifizierte Version von Erweiterungsdateien verwenden oder eigene Erweiterungen entwickelt haben, können Sie diese wie bisher als Datei auf einer Seite einbinden und sie funktionieren weiterhin.

- **Hinweis**: Die Erweiterungen **dhtmlxgantt_smart_rendering.js** und **dhtmlxgantt_csp.js** wurden komplett entfernt und müssen nicht mehr manuell aktiviert werden.


2) Alle Sprachdateien sind jetzt im *dhtmlxgantt.js*-File enthalten. Um sie zu aktivieren, verwenden Sie einen API-Aufruf.

- Wenn Sie eine Sprachdatei auf einer Seite eingebunden haben, müssen Sie diese entfernen und die gewünschte Sprache mit **gantt.i18n.setLocale** aktivieren:

~~~js
gantt.i18n.setLocale("de");
~~~

- Wenn Sie eine eigene Sprachdatei verwenden, kann diese wie bisher geladen werden.

### Standard-Arbeitszeit-Einstellungen geändert

In allen Versionen vor 7.0 waren die Standard-Arbeitszeiten von 8:00 bis 17:00 Uhr, also 9 Stunden pro Tag.


Ab v7.0 sind die Arbeitszeiten 8:00-12:00, 13:00-17:00 Uhr, also 8 Stunden pro Tag.

Wenn Sie zu den vorherigen Einstellungen zurückkehren möchten, müssen Sie diese manuell setzen:

~~~js
gantt.setWorkTime({hours: [8, 17]});
~~~


### Content Security Policy

Die **ext/dhtmlxgantt_csp.js**-Erweiterung wird nicht mehr benötigt, da sie entfernt und durch die [csp config](api/config/csp.md) ersetzt wurde, die standardmäßig aktiviert ist; die Erweiterung sollte aus dem Gantt entfernt werden.

Da die **csp**-Eigenschaft zur dhtmlxGantt-Bibliothek hinzugefügt wurde, werden gültige HTML5-Attribute, die in jedem Browser mit HTML5-Doctype verwendet werden können, allen Elementen des Gantt zugewiesen.


Daher empfehlen wir, bereits bestehende Attribute durch die neuen zu ersetzen:

- "task_id" -> ["data-task-id"](api/config/task_attribute.md)
- "link_id" -> ["data-link-id"](api/config/link_attribute.md)
- "resource_id" -> ["data-resource-id"](api/config/resource_attribute.md)
- "column_index" -> ["data-column-index"](api/config/grid_resizer_column_attribute.md)

Die alten Attribute sind jedoch weiterhin im Markup enthalten. Wenn Sie die Namen der Attribute nicht ändern, funktioniert Ihr Code weiterhin.

### Styling von Gitterzellen

Früher wurde die Ausrichtung der Gitterzellen über `display:inline-block` realisiert. Ab Version 7.0 wird stattdessen `display:flex` verwendet und die Zellen werden in einem Flex-Container positioniert.

Diese Änderung hat keine Auswirkungen auf die für den Benutzer sichtbare Benutzeroberfläche (sie bleibt zu 100% identisch) und sollte keine Migrationsprobleme verursachen.
Allerdings können einige Regressionen beim Styling der Gitterzellen mit diesem Update zusammenhängen.

### "xml_date"-Konfiguration und -Template sowie "xml_format"-Templates entfernt

In Version 6.2 veraltete Konfigurationen und Templates wurden in Version 7.0 entfernt und durch neue ersetzt:

- gantt.config.xml_date →  [gantt.config.date_format](api/config/date_format.md)
- gantt.templates.xml_date → [gantt.templates.parse_date](api/template/parse_date.md)
- gantt.templates.xml_format → [gantt.templates.format_date](api/template/format_date.md)

Falls Sie die alten Namen bereits in Ihrem Code definiert haben, funktionieren diese weiterhin. Andernfalls verwenden Sie bitte die neuere Version der API.

6.2 -> 6.3
---------------

### Multi-Task-Auswahl

Seit Version 6.3 ermöglicht die **ext/dhtmlxgantt_multiselect.js**-Erweiterung automatisch das horizontale Verschieben mehrerer gleichzeitig ausgewählter Aufgaben.
Wenn Sie diese Funktion deaktivieren möchten, verwenden Sie die [drag_multiple](api/config/drag_multiple.md)-Eigenschaft und setzen Sie sie auf *false* (standardmäßig ist sie aktiviert).

~~~js
gantt.config.drag_multiple = false;
~~~

### Google Roboto-Schriftart ist nicht mehr im Material-Skin enthalten

Bis Version 6.3 war die Google [Roboto](https://fonts.google.com/specimen/Roboto)-Schriftart über die `import`-Anweisung in den ['Material'-Skin](guides/skins.md#materialskin) von dhtmlxGantt eingebunden.
Ab Version 6.3 wurde der Import entfernt, daher müssen Sie die `Roboto`-Schriftart manuell hinzufügen:

~~~html
<link rel="stylesheet" href="https://fonts.googleapis.com/css?family="Open+Sans|Roboto:regular,medium,thin,bold"">
~~~

### Verwendung mit Require.JS

Früher konnten Sie beliebige Namen für verschiedene Dateien der dhtmlxGantt-Bibliothek verwenden, die in eine auf RequireJS basierende App eingebunden wurden:

~~~js
requirejs.config({
  paths: {
    "gantt": "../../codebase/dhtmlxgantt",
    "tooltip": "../../codebase/ext/dhtmlxgantt_tooltip",
    "marker": "../../codebase/ext/dhtmlxgantt_marker",
    "locale_de": "../../codebase/locale/locale_de",
  },
  shim: {
    "tooltip": ["gantt"],
    "marker": ["gantt"],
    "locale_de": ["gantt"],
  }
});
requirejs(["gantt", "tooltip", "marker", "locale_de"],
function (dhx) {
  var gantt = dhx.gantt;
 ...
});
~~~

Ab Version 6.3 müssen die Namen der Module entsprechend der Ordnerstruktur der dhtmlxGantt-Bibliothek festgelegt werden:

~~~js
requirejs.config({
  paths: {
    "dhtmlxgantt": "../../codebase/dhtmlxgantt",
    "ext/dhtmlxgantt_tooltip": "../../codebase/ext/dhtmlxgantt_tooltip",
    "ext/dhtmlxgantt_critical_path": "../../codebase/ext/dhtmlxgantt_critical_path",
    "locale/locale_de": "../../codebase/locale/locale_de",
  },
  shim: {
    "ext/dhtmlxgantt_tooltip": ["dhtmlxgantt"],
    "ext/dhtmlxgantt_critical_path": ["dhtmlxgantt"],
    "locale/locale_de": ["dhtmlxgantt"],
  }
});
 
requirejs(["dhtmlxgantt", "ext/dhtmlxgantt_tooltip", "ext/dhtmlxgantt_critical_path", 
            "locale/locale_de"], 
function (dhx) {
  var gantt = dhx.gantt;
...
});
~~~

Stellen Sie sicher, dass der Modulname für jede Datei im Paket als *relativer Pfad innerhalb des 'codebase'-Ordners des Pakets* plus *Dateiname* angegeben wird, zum Beispiel:

**Kernbibliothek:**

- "dhtmlxgantt": "./vendor/dhtmlxgantt/dhtmlxgantt"

**Erweiterungen:**

- "ext/dhtmlxgantt_critical_path": "./vendor/dhtmlxgantt/ext/dhtmlxgantt_critical_path"
- "ext/dhtmlxgantt_tooltip": "./vendor/dhtmlxgantt/ext/dhtmlxgantt_tooltip"

**Sprachpakete:**

- "locale/locale_de": "./vendor/dhtmlxgantt/locale/locale_de"
- "locale/locale_be": "./vendor/dhtmlxgantt/locale/locale_be"

### Inline-Editoren {#inline_editors}

Vor Version 6.3 waren die minimalen und maximalen Werte des **date** [Inline-Editors](guides/inline-editing.md#typesofeditors) auf die im Zeitstrahl sichtbaren Daten beschränkt, sofern keine benutzerdefinierten Min-/Max-Werte angegeben wurden.

Ab Version 6.3 gibt es keine Standardgrenzen für die minimalen und maximalen Werte von Datumseditoren mehr.

Um das vorherige Verhalten wiederherzustellen, können Sie dynamische **min**/**max**-Werte angeben:

~~~js
const dateEditor = {type: "date", map_to: "start_date", 
  min: function(taskId){
    return gantt.getState().min_date
  },
  max: function( taskId ){
    return gantt.getState().max_date
  }
};
~~~

6.1 -> 6.2
---------------

Das Update auf Version 6.2 ist im Allgemeinen kompatibel mit Version 6.1 und sollte keine Codeänderungen erfordern.
Allerdings wurde das Verhalten einiger Komponenten geändert (das alte Verhalten kann über die Konfiguration wiederhergestellt werden) und einige APIs wurden als veraltet markiert.

### Smart Rendering und statischer Hintergrund

Die Smart-Rendering-Funktionalität wurde aktualisiert und ist jetzt in die Komponente eingebettet. Sie funktioniert nun sowohl im Haupt-Timeline-Bereich als auch in Ressourcen-Panels. Ab sofort sollten alle Zeitachsen nur noch die aktuell sichtbaren Zeilen und Zellen rendern.

Smart Rendering kann über die **smart_rendering**-Konfiguration deaktiviert werden, wodurch Gantt wieder das Standardverhalten von Version 6.1 annimmt:

~~~js
gantt.config.smart_rendering = false;
~~~

Die **dhtmlxgantt_smart_rendering**-Erweiterung wird nicht mehr benötigt und sollte aus Gantt entfernt werden. Die Erweiterung selbst ist weiterhin im Paket enthalten, falls es zu Kompatibilitätsproblemen kommt.
Wenn die Erweiterung der Seite hinzugefügt wird, wechselt Gantt in den Smart-Rendering-Modus von Version 6.1.

Das Verhalten der **[static_background](api/config/static_background.md)**-Konfiguration wurde ebenfalls aktualisiert. Ab Version 6.2 werden PNG-Hintergründe UND alle Zellen gerendert, denen über eine Template-Funktion eine CSS-Klasse zugewiesen wurde.

Wenn Sie zum Verhalten von Version 6.1 zurückkehren möchten, verwenden Sie die **static_background_cells**-Konfiguration:

~~~js
gantt.config.static_background_cells = false;
~~~

### Zeitskalen-Einstellungen

Die Konfiguration der Zeitskala wurde vereinfacht. Anstatt für jede Skala eine Vielzahl von Einstellungen separat anzugeben, sollten Sie nun eine einzige Konfigurationsoption [scales](api/config/scales.md) verwenden, die mehrere Skalenobjekte mit deren Einstellungen enthält.

Insgesamt sind folgende Zeitskalen-APIs veraltet:

- gantt.config.scale_unit
- gantt.config.step
- gantt.config.date_scale
- gantt.templates.date_scale
- gantt.config.subscales

Beispielsweise sieht der folgende Code:

~~~js
gantt.config.scale_unit = "day"; 
gantt.config.step = 1; 
gantt.config.date_scale = "%d %M"; 
gantt.templates.date_scale = null; 
gantt.config.subscales = [];
~~~

Jetzt so aus:

~~~js
gantt.config.scales = [ { unit:"day", step: 1, format: "%d %M"} ];
~~~

#### task_cell_class-Template umbenannt

Das Template, das die CSS-Klasse für die Zellen im Timeline-Bereich definiert, wurde wie folgt umbenannt:

- gantt.templates.task_cell_class → [gantt.templates.timeline_cell_class](api/template/timeline_cell_class.md)

Ein Beispiel für die Verwendung des umbenannten Templates:

~~~js
<style>
.weekend{ background: #f4f7f4 !important;}
</style>
 
gantt.templates.timeline_cell_class = function(task,date){
    if(date.getDay()==0||date.getDay()==6){
        return "weekend";
    }
};
~~~

### "xml_date"-Konfiguration und -Template sowie "xml_format"-Templates umbenannt

Nachfolgend das Schema zum Ersetzen der bisher verwendeten API:

- gantt.config.xml_date →  [gantt.config.date_format](api/config/date_format.md)
- gantt.templates.xml_date → [gantt.templates.parse_date](api/template/parse_date.md)
- gantt.templates.xml_format → [gantt.templates.format_date](api/template/format_date.md)

Seit Version 6.2 sind die Standardwerte der **xml_date**-Konfiguration und der **xml_date**- und **xml_format**-Templates *undefined*. Wenn Sie ihnen also keinen Wert zuweisen, funktionieren sie nicht.

Gantt verwendet jedoch weiterhin die alten Namen der Konfiguration und Templates. Wenn Sie diese APIs in Ihrem Code überschrieben haben, funktionieren sie wie zuvor. Zum Beispiel:

~~~js
// funktioniert weiterhin korrekt
gantt.templates.xml_date = function(datestring){
    return new Date(datestring);
};
~~~

### Nicht verwendete API entfernt

Die **gantt.config.api_date**-Konfiguration und das **gantt.templates.api_date**-Template wurden aus der API entfernt, da sie im Gantt-Code nicht verwendet wurden. Falls Sie diese in Ihrem Code verwendet haben, müssen Sie sie erneut deklarieren.

~~~js
gantt.config.api_date = "%d-%m-%Y %H:%i";
gantt.templates.api_date = gantt.date.date_to_str(gantt.config.api_date);
~~~

6.0 -> 6.1 
-------------

### Zeitliche Einschränkungen und automatisches Scheduling

Die **dhtmlxgantt_auto_scheduling.js**-Erweiterung wurde um die [tasks constraints](guides/auto-scheduling.md#timeconstraintsfortasks)-Funktionalität erweitert. Da diese Funktion das Standardverhalten des automatischen Schedulings ändert,
unterstützt Gantt einen Kompatibilitätsmodus, mit dem Sie das vorherige Verhalten wiederherstellen und Aufgabenbeschränkungen beim automatischen Scheduling ignorieren können.

Um den Kompatibilitätsmodus zu aktivieren, verwenden Sie folgende Konfigurationsoption:

~~~js
gantt.config.auto_scheduling_compatibility = true;
~~~

### Anzeigebereich für Tooltips

Vor Version 6.1 wurden [Tooltips](guides/tooltips.md) nur innerhalb des Timeline-Bereichs angezeigt. Ab Version 6.1 ist die Anzeige von Tooltips nicht mehr eingeschränkt, und ein Tooltip folgt der Bewegung des Mauszeigers.

Falls erforderlich, können Sie das vorherige Verhalten wiederherstellen, indem Sie den folgenden Code vor der Initialisierung von Gantt verwenden:

~~~js
gantt.attachEvent("onGanttReady", function(){
    var tooltips = gantt.ext.tooltips;
     tooltips.tooltip.setViewport(gantt.$task_data);
});

gantt.init("gantt_here");
gantt.parse(demo_tasks);
~~~

5.2 -> 6.0
------------------

In Version 6.0 ist die Methode **getSlack()** veraltet. Stattdessen wurden zwei Methoden hinzugefügt:

- [getFreeSlack](api/method/getfreeslack.md) - gibt den freien Puffer (free slack) einer Aufgabe zurück
- [getTotalSlack](api/method/gettotalslack.md) - gibt den gesamten Puffer (total slack) einer Aufgabe zurück

Methoden, die in v[4.0](#3x---40) als veraltet markiert wurden, funktionieren in v6.0 nicht mehr. Die Definition des **dhtmlx**-Objekts wurde aus *dhtmlxgantt.js* entfernt.

Falls Sie eine der veralteten Methoden verwenden, müssen Sie diese gemäß der untenstehenden Tabelle durch unterstützte Implementierungen ersetzen. Es wurden keine Änderungen an den Argumenten oder am Verhalten der Methoden vorgenommen.

<table class="my_table">

<tr><td class="version_info">Veraltete Methoden</td><td class="version_info">Funktionierende Methoden</td></tr>

<tr><td>dhtmlx.alert</td><td>gantt.alert</td></tr>
<tr><td>dhtmlx.confirm</td><td>gantt.confirm</td></tr>
<tr><td>dhtmlx.modalbox</td><td>gantt.modalbox</td></tr>
<tr><td>dhtmlx.uid</td><td>gantt.uid</td></tr>
<tr><td>dhtmlx.copy</td><td>gantt.copy</td></tr>
<tr><td>dhtmlx.mixin</td><td>gantt.mixin</td></tr>
<tr><td>dhtmlx.defined</td><td>gantt.defined</td></tr>
<tr><td>dhtmlx.bind</td><td>gantt.bind</td></tr>
<tr><td>dhtmlx.assert</td><td>gantt.assert</td></tr>
<tr><td>window.dataProcessor</td><td>gantt.dataProcessor</td></tr>
</table>


3.x -> 4.0
------------

Version 4.0 bringt einige Änderungen in der öffentlichen API mit sich, insbesondere:

- Legacy-Module sowie Module, die mit dhtmlxSuite-Modulen überschneiden, werden von der dhtmlxGantt-Bibliothek nicht mehr definiert
- Häufig verwendete Module wie dhtmlxMessage, dataProcessor, Ajax wurden in den **window.gantt**-Namespace verschoben und sind nun Teil der öffentlichen API von dhtmlxGantt

Ein Fallback zur alten API ist in v4.x enthalten, sodass Code, der für v3.3 und früher geschrieben wurde, weiterhin funktioniert. In einigen Fällen sind jedoch Anpassungen erforderlich.
Im Allgemeinen sind alle globalen Deklarationen außer **window.gantt** und **window.Gantt** (nur Enterprise-Version) veraltet und werden in Version 5.0 entfernt.

### Veraltete API

Es gibt Methoden, die als veraltet markiert wurden. Sie funktionieren weiterhin in v4.x, lösen jedoch bei jedem Aufruf eine Konsolenwarnung aus (für Endnutzer nicht sichtbar). 

![gantt_deprecated_warning](/img/gantt_deprecated_warning.png)

Überblick:

- Das dhtmlxMessage-Modul wurde vom **window.dhtmlx**-Objekt zum **window.gantt**-Objekt verschoben. Mehr zu Message Boxes [hier](guides/message-boxes.md)
- Der dhtmlxDataProcessor-Konstruktor wurde von **window.dataProcessor** zu **window.gantt.dataProcessor** verschoben
- Hilfsmethoden wie **dhtmlx.copy**, **dhtmlx.uid** und **dhtmlx.mixin** wurden zum **window.gantt**-Objekt verschoben

Wenn Sie diese Methoden verwenden, funktioniert Ihre Anwendung nach dem Update auf v4.0 weiterhin ohne sofortige Änderungen. Zukünftig wird empfohlen, auf die neuere API-Version umzusteigen.

Die vollständige Liste der veralteten Methoden umfasst:

<table class="my_table">

<tr><td class="version_info">Bis Version 3.3</td><td class="version_info">Ab Version 4.0</td></tr>

<tr><td>dhtmlx.alert</td><td>gantt.alert</td></tr>
<tr><td>dhtmlx.confirm</td><td>gantt.confirm</td></tr>
<tr><td>dhtmlx.modalbox</td><td>gantt.modalbox</td></tr>
<tr><td>dhtmlx.uid</td><td>gantt.uid</td></tr>
<tr><td>dhtmlx.copy</td><td>gantt.copy</td></tr>
<tr><td>dhtmlx.mixin</td><td>gantt.mixin</td></tr>
<tr><td>dhtmlx.defined</td><td>gantt.defined</td></tr>
<tr><td>dhtmlx.bind</td><td>gantt.bind</td></tr>
<tr><td>dhtmlx.assert</td><td>gantt.assert</td></tr>
<tr><td>window.dataProcessor</td><td>gantt.dataProcessor</td></tr>
</table>

###Überholte API

Einige Methoden sind überholt und werden in v4.x nicht mehr verwendet.
Wenn Sie diese Methoden oder Objekte noch nutzen, müssen Sie entweder den Code der Anwendung anpassen oder die Datei **dhtmlxgantt_deprecated.js** in die Seite einbinden.

Überblick:

- **window.dhx4** wird von **dhtmlxgantt.js** nicht mehr definiert
- Umgebungsvariablen, die zuvor in **window.dhx4** definiert waren, sind jetzt im Objekt **gantt.env** verfügbar
- Das Ajax-Modul wurde von **dhx4.ajax** zu **gantt.ajax** verschoben
- **gantt.event**, **gantt.eventRemove** sollten anstelle von **dhtmlxEvent/dhtmlxDetachEvent** verwendet werden

Die vollständige Liste der überholten API ist unten aufgeführt:

<table class="my_table">

<tr><td class="version_info">Bis Version 3.3</td><td class="version_info">Ab Version 4.0</td></tr>
<tr><td>window.dhtmlxEvent</td><td>gantt.event</td></tr>
<tr><td>window.dhtmlxDetachEvent</td><td>gantt.eventRemove</td></tr>
<tr><td>window.dhx4.isIE</td><td>gantt.env.isIE</td></tr>
<tr><td>window.dhx4.isIE6</td><td>gantt.env.isIE6</td></tr>
<tr><td>window.dhx4.isIE7</td><td>gantt.env.isIE7</td></tr>
<tr><td>window.dhx4.isIE8</td><td>gantt.env.isIE8</td></tr>
<tr><td>window.dhx4.isOpera</td><td>gantt.env.isOpera</td></tr>
<tr><td>window.dhx4.isChrome</td><td>gantt.env.isChrome</td></tr>
<tr><td>window.dhx4.isKHTML</td><td>gantt.env.isKHTML</td></tr>
<tr><td>window.dhx4.isFF</td><td>gantt.env.isFF</td></tr>
<tr><td>window.dhx4.isIPad</td><td>gantt.env.isIPad</td></tr>
</table>


2.0 -> 3.0
----------------------
1) Um CSS-Konflikte mit dhtmlxScheduler zu vermeiden, wurden die Klassennamen, die von beiden Komponenten verwendet wurden, in dhtmlxGantt umbenannt (alle Klassen bezogen sich auf die Lightbox).
Wenn Sie das Styling der Lightbox angepasst haben, besteht die Migration darin, die Klassen entsprechend umzubenennen.

Es gibt zwei umbenannte Muster:

- Ersetzen Sie <b>'.dhx_gantt_'</b> durch <b>'.gantt_'</b> (.dhx_gantt_duration -> .gantt_duration)
- Ersetzen Sie das Präfix <b>'.dhx_'</b> durch <b>'.gantt_'</b> (.dhx_custom_button -> .gantt_custom_button)

*Falls Sie Schwierigkeiten bei der Migration der CSS-Klassen haben, finden Sie die vollständige Liste der umbenannten Klassen [hier](guides/migrating-renamedcss.md).*


2) Die Standardwerte der Konfigurationen [buttons_right](api/config/buttons_right.md) und [buttons_left](api/config/buttons_left.md) wurden wie folgt geändert:

~~~js
gantt.config.buttons_left = [
        "dhx_save_btn",
        "dhx_cancel_btn"
];
gantt.config.buttons_right = [
        "dhx_delete_btn"
],

-->

gantt.config.buttons_left = [
        "gantt_save_btn",
        "gantt_cancel_btn"
];
gantt.config.buttons_right = [
        "gantt_delete_btn"
];
~~~

Alte Konfigurationen ("dhx_save_btn", "dhx_cancel_btn", "gantt_delete_btn") funktionieren weiterhin. Änderungen beeinträchtigen kein bestehendes Verhalten.

3) Die folgenden Funktionen sind jetzt nur noch in der Commercial- oder Enterprise-Version der Komponente verfügbar (nicht in der GPL-Version von dhtmlxGantt):

- Möglichkeit, Tage in Wochen-, Monats- und Timeline-Ansicht auszublenden
- Projekte, Meilensteine und andere benutzerdefinierte Typen

1.0 -> 2.0
----------------------

1) Verschiedene Objekte (**GanttProjectInfo**, **GanttTaskInfo**, **GanttChart**, **GanttProject**, **GanttTask**) wurden durch ein statisches Objekt ersetzt - **gantt**. 


Das **gantt**-Objekt enthält eine Reihe von Methoden und zwei Haupt-Properties: [config](api/overview/properties-overview.md) und [templates](api/overview/templates-overview.md).

- [config](api/overview/properties-overview.md) - Konfigurationsoptionen für Daten, Skala, Steuerelemente usw.
- [templates](api/overview/templates-overview.md) - Formatvorlagen für Datums- und Beschriftungsanzeigen im Gantt-Diagramm.


2) dhtmlxGantt wird über die Methode [init](api/method/init.md) initialisiert 

  <code> var gantt = new GanttChart()</code> -> <code>gantt.init("gantt_div")</code>.


3) Anstelle von GanttProject und GanttTask werden die Daten als [ein Array von einfachen Objekten mit einer Reihe von Pflichtfeldern und beliebigen benutzerdefinierten Eigenschaften](guides/loading.md#dataproperties) gespeichert:

~~~js
{
    data:[
        {id:1, text:"Project #2", start_date:"01-04-2013", duration:18,
    progress:0.4, open: true},
        {id:2, text:"Task #1",    start_date:"02-04-2013", duration:8,
    progress:0.6, parent:1},
        {id:3, text:"Task #2",    start_date:"11-04-2013", duration:8,
    progress:0.6, parent:1}
    ],
    links:[
        { id:1, source:1, target:2, type:"1"},
        { id:2, source:2, target:3, type:"0"},
        { id:3, source:3, target:4, type:"0"},
        { id:4, source:2, target:5, type:"2"},
  ]
}
~~~


4) Das [XML-Format](guides/supported-data-formats.md#xmldhtmlxgantt20) wurde geändert, aber das [alte XML-Format](guides/supported-data-formats.md#xmldhtmlxganttlt20) kann weiterhin [geladen](api/method/load.md) werden.

~~~js
gantt.load("tasks.xml","oldxml");
~~~

[Loading data in Gantt 1.6 format](https://docs.dhtmlx.com/gantt/samples/01_initialization/09_backward_compatibility.html)


5) **Designzeit-Objekte**:

- Methoden des **<i>GanttProjectInfo</i>**-Objekts wurden ersetzt durch:
  - addTask  -> [gantt.addTask()](api/method/addtask.md)
  - deleteTask  ->  [gantt.deleteTask()](api/method/deletetask.md)
  - getTaskById  -> [gantt.getTask()](api/method/gettask.md)
- Methoden des **<i>GanttTaskInfo</i>**-Objekts wurden ersetzt durch:
  - addChildTask -> [gantt.addTask()](api/method/addtask.md) (Eigenschaft "parent" des Task-Objekts legt das übergeordnete Element fest)


6) **Laufzeit-Objekte**:

dhtmlxGantt 2.0 verwendet keine unterschiedlichen Typen mehr für Projekt- und Aufgabenobjekte. Stattdessen kann jedes Aufgabenobjekt ein übergeordnetes Objekt und beliebig viele untergeordnete Aufgaben haben.

- **<i>GanttProject</i>**
  - Anstelle von getDuration(), getId(), getName(), getPercentCompleted(), getStartDate() werden Projekteigenschaften über **gantt.getTask(projectTaskId).(name_of_property)** abgerufen
- **<i>GanttTask</i>**
  - Anstelle von getDuration(), getId(), getName(), getParentTaskId(), getPercentCompleted(), getPredecessorTaskId(), setDuration(, ) werden Aufgaben-Eigenschaften über **gantt.getTask(taskId).(name_of_property)** abgerufen
  
Eine Liste der Methoden zum Abrufen von Eltern-/Kindobjekten:

- [getTask](api/method/gettask.md)
- [hasChild](api/method/haschild.md)
- [getChildren](api/method/getchildren.md)

:::note
Die ID der übergeordneten Aufgabe kann über **gantt.getTask(task_id).parent** abgerufen werden. Das Wurzelelement hat keine 'parent'-Eigenschaft.
:::


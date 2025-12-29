---
title: "Inline-Bearbeitung im Grid"
sidebar_label: "Inline-Bearbeitung im Grid"
---

# Inline-Bearbeitung im Grid

dhtmlxGantt bietet zwei Möglichkeiten zur Bearbeitung von Inhalten:

- mit dem [Lightbox](guides/default-edit-form.md) Bearbeitungsformular
- mit Inline-Editoren direkt im Grid-Bereich

Mit der Inline-Bearbeitung können Änderungen direkt im Grid vorgenommen werden: Aufgaben erstellen und aktualisieren, Verknüpfungen zwischen ihnen setzen, Start- und Enddaten definieren oder die Dauer anpassen - alles über integrierte Editoren.

![Inline grid editing](/img/inline_grid_editing.png)

Um die Inline-Bearbeitung zu aktivieren, müssen Sie:

- die Liste der Editor-Konfigurationen definieren und die **map_to**-Eigenschaft in einem Editor-Objekt verwenden, um den Editor mit der entsprechenden Grid-Spalte zu verknüpfen

~~~js
var textEditor = {type: "text", map_to: "text"};
var dateEditor = {type: "date", map_to: "start_date", min: new Date(2018, 0, 1), 
    max: new Date(2019, 0, 1)};
var durationEditor = {type: "number", map_to: "duration", min:0, max: 100};
~~~

- die **editor**-Eigenschaft in der Spaltenkonfiguration angeben, um den Editor der jeweiligen Spalte zuzuweisen

~~~js
gantt.config.columns = [
    {name: "text", tree: true, width: '*', resize: true, editor: textEditor},
    {name: "start_date", align: "center", resize: true, editor: dateEditor},
    {name: "duration", align: "center", editor: durationEditor},
    {name: "add", width: 44}
];
~~~


[Inline editing](https://docs.dhtmlx.com/gantt/samples/07_grid/11_inline_edit_basic.html)


:::note
Details zur *inlineEditors* Objekt-API finden Sie im Artikel [Inline Editors Extension](guides/inline-editors-ext.md).
:::

Es gibt auch eine Videoanleitung, die zeigt, wie die Inline-Bearbeitung im Grid implementiert wird.

<iframe width="704" height="400" src="https://www.youtube.com/embed/0rIPrC0GtME" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Editor-Typen

Die Inline-Editoren werden im Konfigurationsobjekt [editor_types](api/config/editor_types.md) definiert.

Es sind mehrere Inline-Editoren vordefiniert:

- **text** Editor - für Textspalten wie den Aufgabennamen
- **number** Editor - für numerische Spalten wie Aufgabendauer oder Reihenfolge
- **duration** Editor - für Dauerspalten, speziell wenn **map_to: "duration"** verwendet wird und der Editor-Typ **"duration"** ist:

~~~js
{ type: "duration", map_to: "duration", formatter: formatter }
~~~

Dieser Editor-Typ ist hilfreich, wenn Dauern angegeben werden, die sowohl eine Zahl als auch eine [Dauereinheit](api/config/duration_unit.md) enthalten, z. B.: `5 days`. Standardmäßig wird der [Duration Formatter](guides/formatters-ext.md#durationformatter) verwendet. Sie können die Konfiguration auch anpassen oder einen [benutzerdefinierten Formatter](guides/formatters-ext.md#customformatter) bereitstellen.

- **date** Editor - zum Bearbeiten von Datumsspalten wie Start- und Enddatum
- **select** Editor - um eine Option aus einer Liste auszuwählen
- **predecessor** Editor - zum Setzen von Vorgänger-Aufgaben für die aktuelle Aufgabe. Dieser Editor verwendet die [WBS-Codes der Aufgaben](guides/specifying-columns.md#wbscode), um Verknüpfungen zu Vorgängeraufgaben herzustellen.

~~~js
var editors = {
    text: {type: "text", map_to: "text"},
    start_date: {type: "date", map_to: "start_date", min: new Date(2018, 0, 1), 
        max: new Date(2019, 0, 1)},
    end_date: {type: "date", map_to: "end_date", min: new Date(2018, 0, 1), 
        max: new Date(2019, 0, 1)},
    duration: {type: "number", map_to: "duration", min:0, max: 100},
    priority: {type:"select", map_to:"priority", options:gantt.serverList("priority")},
    predecessors: {type: "predecessor", map_to: "auto"}
};
~~~


### Datumsgrenzen im Date-Editor {#dateslimits}

Seit v6.3 gibt es keine voreingestellten Minimal- oder Maximalwerte für **date** Inline-Editoren.

Wenn Sie möchten, dass die sichtbaren Daten auf der Zeitskala die min- und max-Werte des **date** Inline-Editors bestimmen (sofern keine eigenen min/max-Werte gesetzt sind), können Sie dynamische **min/max** Funktionen angeben:

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

### Editor für inklusive Enddaten {#inclusiveenddate}

Wenn Sie das [Format für inklusive Enddaten](api/template/task_end_date.md) für Aufgaben verwenden und die Inline-Bearbeitung im Grid korrekt unterstützen möchten, benötigen Sie einen speziellen Editor für inklusive Enddaten, z. B.:

~~~js
// inklusiver Editor für Enddaten
// Verwenden Sie den Standardeditor, aber überschreiben Sie die set_value/get_value-Methoden
var dateEditor = gantt.config.editor_types.date;
gantt.config.editor_types.end_date = gantt.mixin({
   set_value: function(value, id, column, node){
        var correctedValue = gantt.date.add(value, -1, "day");
        return dateEditor.set_value.apply(this, [correctedValue, id, column, node]);
   },
   get_value: function(id, column, node) {
        var selectedValue = dateEditor.get_value.apply(this, [id, column, node]);
        return gantt.date.add(selectedValue, 1, "day");
   },
}, dateEditor);

var textEditor = {type: "text", map_to: "text"};
var startDateEditor = {type: "date", map_to: "start_date"};
var endDateEditor = {type: "end_date", map_to: "end_date"};
var durationEditor = {type: "number", map_to: "duration", min:0, max: 100};

gantt.config.columns = [
    {name: "text", label: "Name", tree: true, width: 200, editor: textEditor, 
        resize: true},
    {name: "duration", label: "Duration", width:80, align: "center", 
        editor: durationEditor, resize: true},
    {name: "start_date", label: "Start", width:140, align: "center", 
        editor: startDateEditor, resize: true},
    {name: "end_date", label: "Finish", width:140, align: "center", 
        editor: endDateEditor, resize: true}
];

// Lightbox und Grid-Templates aktualisieren, um inklusive Enddaten anzuzeigen
gantt.templates.task_end_date = function(date){
    return gantt.templates.task_date(new Date(date.valueOf() - 1)); 
};


var gridDateToStr = gantt.date.date_to_str("%Y-%m-%d");
gantt.templates.grid_date_format = function(date, column){
    if(column === "end_date"){
        return gridDateToStr(new Date(date.valueOf() - 1)); 
    }else{
        return gridDateToStr(date); 
    }
}
~~~

**Related example:** [Inclusive end date editor](https://snippet.dhtmlx.com/ds28tk3c)

Weitere Informationen zur Formatierung von Enddaten finden Sie im Artikel [Task end date display & Inclusive end dates](guides/loading.md#taskenddatedisplayampinclusiveenddates).

### Formatierung der Werte des Predecessor-Editors {#linkformatter}

:::note
Diese Funktion ist nur in der PRO Edition verfügbar.
:::

Ab Version 6.3 unterstützt Gantt die Angabe von Link-Typen sowie Zeitabständen (Lag/Lead) direkt im Inline-Editor.

Um dies zu ermöglichen, verwenden Sie das [Link Formatter](guides/formatters-ext.md#linkformatter) Modul und übergeben eine Instanz von *LinksFormatter* an den **predecessor** Editor:

~~~js
var formatter = gantt.ext.formatters.durationFormatter({
    enter: "day", 
    store: "day", 
    format: "auto"
});
var linksFormatter = gantt.ext.formatters.linkFormatter({durationFormatter: formatter});
 
var editors = {
    text: {type: "text", map_to: "text"},
    start_date: {type: "date", map_to: "start_date", 
                min: new Date(2018, 0, 1), max: new Date(2019, 0, 1)},
    end_date: {type: "date", map_to: "end_date", 
                min: new Date(2018, 0, 1), max: new Date(2019, 0, 1)},
    duration: {type: "duration", map_to: "duration", 
                min:0, max: 100, formatter: formatter},
    priority: {type: "select", map_to: "priority", 
                options:gantt.serverList("priority")},
    predecessors: {type: "predecessor", map_to: "auto", formatter: linksFormatter} /*!*/
};
 
gantt.config.columns = [
    {name: "wbs", label: "#", width: 60, align: "center", template: gantt.getWBSCode},
    {name: "text", label: "Name", tree: true, width: 200, editor: editors.text, 
        resize: true},
    {name: "start_date", label: "Start", width:80, align: "center", 
      editor: editors.start_date, resize: true},
    {name: "predecessors", label: "Predecessors",width:80, align: "left", 
      editor: editors.predecessors, resize: true, template: function(task){
            var links = task.$target;
            var labels = [];
            for(var i = 0; i < links.length; i++){
                var link = gantt.getLink(links[i]);
                labels.push(linksFormatter.format(link)); /*!*/
            }
            return labels.join(", ")
        }},
    {name:"add"}
];
~~~


[Inline editing - keyboard navigation mode](https://docs.dhtmlx.com/gantt/samples/07_grid/12_inline_edit_key_nav.html)


Nachfolgend finden Sie Codebeispiele für benutzerdefinierte Editoren wie:

- [Einfaches numerisches Eingabefeld](guides/inline-editing.md#custominlineeditor)
- [JQuery Datepicker-Eingabefeld](guides/inline-editing.md#jquery_datepicker)

## Benutzerdefinierter Inline-Editor

Es ist möglich, einen eigenen Inline-Editor zu erstellen, indem Sie ein neues Editor-Objekt wie folgt definieren:

~~~js
gantt.config.editor_types.custom_editor = {
  show: function (id, column, config, placeholder) {
    // Wird aufgerufen, wenn das Eingabefeld angezeigt wird. HTML-Markup in placeholder einfügen 
    // und ggf. Editoren initialisieren:
    var html = "<div><input type='text' name='" + column.name + "'></div>";
       placeholder.innerHTML = html;
  },
  hide: function () {
    // Wird aufgerufen, wenn das Eingabefeld ausgeblendet wird. 
    // Hier können komplexe Editoren bereinigt oder Event-Listener entfernt werden
  },
  
  set_value: function (value, id, column, node) {
    // Wert in das Eingabefeld setzen
  },
  
  get_value: function (id, column, node) {
    // Wert aus dem Eingabefeld zurückgeben
  },
  
  is_changed: function (value, id, column, node) {
    // Wird vor dem Speichern/Schließen aufgerufen. true zurückgeben, wenn sich der neue Wert geändert hat
    // true löst das Speichern aus, false überspringt das Speichern 
  },
  
  is_valid: function (value, id, column, node) {
    // Eingabe validieren, false verwirft Änderungen
    return true/false;
  },

  save: function (id, column, node) {
     // Für Eingaben mit map_to:auto. Komplexe Speicherlogik wird hier implementiert
  },
  focus: function (node) {
  }
}
~~~

Hier eine Übersicht der Methoden:

- <span class="submethod">**show (id, column, config, placeholder): void**</span> - Wird ausgelöst, wenn der Inline-Editor geöffnet wird. Fügen Sie hier DOM-Elemente hinzu und initialisieren Sie Bibliotheken. Parameter:
    - **_id_** - (*string | number*) - Aufgaben-ID
    - **_column_** - (*GridColumn*) - Spaltenkonfigurationsobjekt
    - **_config_** - (*any*) - benutzerdefiniertes Editor-Konfigurationsobjekt
    - **_placeholder_** - (*HTMLElement*) - Inline-Editor DOM-Element
- <span class="submethod">**hide? (): void**</span> - optional, wird beim Schließen des Editors aufgerufen
- <span class="submethod">**set_value (value, id, column, node): void**</span> - Wird nach **show** aufgerufen, um Werte aus dem Aufgabenobjekt zu setzen. Parameter:
    - **_value_** - (*any*) - Aufgabenattributwert
    - **_id_** - (*string | number*) - Aufgaben-ID
    - **_column_** - (*GridColumn*) - Spaltenkonfigurationsobjekt
    - **_node_** - (*HTMLElement*) - Inline-Editor DOM-Element
- <span class="submethod">**get_value (id, column, node): any**</span> - Wird vor dem Schließen aufgerufen, um Werte aus dem Editor zu holen. Parameter:
    - **_id_** - (*string | number*) - Aufgaben-ID
    - **_column_** - (*GridColumn*) - Spaltenkonfigurationsobjekt
    - **_node_** - (*HTMLElement*) - Inline-Editor DOM-Element
- <span class="submethod">**is_changed? (value, id, column, node): boolean**</span> - optional, wird vor dem Schließen ausgelöst. **true** zurückgeben, um Änderungen zu speichern, **false** zum Verwerfen. Parameter:
    - **_value_** - (*any*) - Aufgabenattributwert
    - **_id_** - (*string | number*) - Aufgaben-ID
    - **_column_** - (*GridColumn*) - Spaltenkonfigurationsobjekt
    - **_node_** - (*HTMLElement*) - Inline-Editor DOM-Element
- <span class="submethod">**is_valid? (value, id, column, node): boolean**</span> - optionale Validierungsmethode. **false** zurückgeben, um Änderungen zu verwerfen. Parameter:
    - **_value_** - (*any*) - Aufgabenattributwert
    - **_id_** - (*string | number*) - Aufgaben-ID
    - **_column_** - (*GridColumn*) - Spaltenkonfigurationsobjekt
    - **_node_** - (*HTMLElement*) - Inline-Editor DOM-Element
- <span class="submethod">**save? (id, column, node): void**</span> - optional, für komplexes Speichern mit `map_to:auto`. Parameter:
    - **_id_** - (*string | number*) - Aufgaben-ID
    - **_column_** - (*GridColumn*) - Spaltenkonfigurationsobjekt
    - **_node_** - (*HTMLElement*) - Aufgabenobjekt
- <span class="submethod">**focus? (node): void**</span> - optional, wird aufgerufen, wenn der Editor den Fokus erhält.
    - **_node_** - (*HTMLElement*) - Inline-Editor DOM-Element

Wichtige Hinweise für wiederverwendbare Editoren:

- Im Allgemeinen sollte **`get_value`** nur den aktuellen Wert des Editors zurückgeben, ohne das Aufgabenobjekt zu verändern. Wenn gültig, aktualisiert Gantt die Aufgabe automatisch.
- Verwenden Sie die **`map_to`**-Option, um anzugeben, welches Aufgabenattribut der Editor aktualisiert, um die Wiederverwendbarkeit sicherzustellen.
- Die **`hide`**-Methode kann meist leer bleiben, es sei denn, Sie müssen Event-Handler entfernen oder komplexe Widgets zerstören.
- Implementieren Sie die Methoden **`is_changed`** und **`is_valid`**:
  - **`is_changed`** sollte nur true zurückgeben, wenn sich der Wert tatsächlich geändert hat, um unnötige Updates zu vermeiden.
  - **`is_valid`** verhindert ungültige Eingaben.
- Für Editoren, die mehr als nur ein Attribut aktualisieren (wie der eingebaute [predecessor editor](guides/inline-editing.md#typesofeditors)), implementieren Sie die Logik in **`save`** und setzen **`map_to`** auf *"auto"*. In diesem Fall ändert Gantt das Aufgabenobjekt nicht direkt, sondern ruft **`save`** auf, um Änderungen anzuwenden.

Hier ein Beispiel für einen einfachen numerischen Eingabeeditor. Die **`hide`**-Methode bleibt leer, und **`save`** wird nicht implementiert.

~~~js
var getInput = function(node){
    return node.querySelector("input");
};

gantt.config.editor_types.simpleNumber = {
    show: function (id, column, config, placeholder) {
        var min = config.min || 0,
        max = config.max || 100;

        var html = "<div><input type='number' min='" + min + 
                      "' max='" + max + "' name='" + column.name + "'></div>";
        placeholder.innerHTML = html;
    },
    hide: function () {
      // leer, da nach Entfernen des Editors keine Bereinigung notwendig ist
    },
    set_value: function (value, id, column, node) {
        getInput(node).value = value;
    },
    get_value: function (id, column, node) {
        return getInput(node).value || 0;
    },
    is_changed: function (value, id, column, node) {
        var currentValue = this.get_value(id, column, node);
        return Number(value) !== Number(currentValue);
    },
    is_valid: function (value, id, column, node) {
        return !isNaN(parseInt(value, 10));
    },
    focus: function (node) {
        var input = getInput(node);
        if (!input) {
            return;
        }
        if (input.focus) {
            input.focus();
        }

        if (input.select) {
          input.select();
        }
    }
};
~~~

Danach können Sie ihn wie einen integrierten Editor verwenden:

~~~js
var numberEditor = {type: "simpleNumber", map_to: "quantity", min:0, max: 50}; 

gantt.config.columns = [
    ...
    {name: "quantity", label: "Quantity", width: 80, editor: numberEditor, 
        resize: true},
    ...
];
~~~

Da Gantt das Editor-DOM-Element automatisch entfernt, ist in **`hide`** keine zusätzliche Bereinigung notwendig.

### editor.hide {#jquery_datepicker}

Wenn Sie komplexere Widgets in Inline-Editoren verwenden, ist es sinnvoll, eine **`hide`**-Methode zur Bereinigung hinzuzufügen.

Hier ein Beispiel für eine DatePicker-Eingabe mit jQuery UI. Das Datepicker-Widget muss zerstört werden, wenn der Editor aus dem DOM entfernt wird.

Voraussetzungen:

~~~js
<link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
<script src="https://code.jquery.com/jquery-1.12.4.js"></script>
<script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
~~~

Editor:

~~~js
gantt.config.editor_types.custom_datepicker_editor = {
    show: function (id, column, config, placeholder) {
        placeholder.innerHTML = "<div><input type='text' id='datepicker' name='" + 
                                  column.name + "'></div>";
        $("#datepicker").datepicker({
            dateFormat: "yy-mm-dd",
            onSelect: function(dateStr){
                gantt.ext.inlineEditors.save()
            }
        });
    },
    hide: function (node) {
        $("#datepicker").datepicker( "destroy" );
    },

    set_value: function (value, id, column, node) {
        $("#datepicker").datepicker("setDate", value);
    },

    get_value: function (id, column, node) {
        return $("#datepicker").datepicker( "getDate" );
    },

    is_changed: function (value, id, column, node) {
        return (+$("#datepicker").datepicker( "getDate" ) !== +value);
    },
    is_valid: function (value, id, column, node) {
        return !(isNaN(+$("#datepicker").datepicker( "getDate" )))
    },
    save: function (id, column, node) {
    },
    focus: function (node) {
    }
};

let dateEditor = {
    type: "custom_datepicker_editor",
    map_to: "start_date"
};

gantt.config.columns = [
    {name: "text", tree: true, width: '*', resize: true},
    {name: "start_date", align: "center", resize: true, editor: dateEditor},
    {name: "duration", align: "center"},
    {name: "add", width: 44}
];
~~~

**Related example:** [Using jQuery Datepicker in the editor](https://plnkr.co/edit/U3vHJvleRBJ1Js0N?preview)

### editor.save

Die **`save`**-Funktion ist nützlich, wenn der Editor mehrere Eigenschaften einer Aufgabe gleichzeitig aktualisieren muss oder wenn er Objekte außer Aufgaben ändern soll.

In solchen Fällen können Sie weiterhin **`get_value`** für die eingebaute Validierung implementieren, aber Gantt versucht nicht, den Wert des Editors direkt auf die Aufgabe anzuwenden. Stattdessen wird die **`save`**-Funktion aufgerufen.

Sobald **`save`** aufgerufen wird, sollten Sie die Eingabewerte interpretieren und die erforderlichen Änderungen am Gantt-Diagramm mit Ihrem eigenen Code vornehmen. Nachdem die **`save`**-Methode abgeschlossen ist, löst Gantt das [onSave](guides/inline-editors-ext.md#events)-Event aus. Es wird jedoch kein [gantt.updateTask](api/method/updatetask.md) für die aktualisierte Zeile aufgerufen.

**Hinweis!** Die **`save`**-Methode wird nur aufgerufen, wenn Sie **`map_to:"auto"`** in der Editor-Konfiguration setzen:

~~~js
var editors = {
    ...
    predecessors: {type: "predecessor", map_to: "auto"}
};
~~~

Ein gutes Beispiel hierfür ist der eingebaute Vorgänger-Editor. Eine vereinfachte Implementierung finden Sie im zugehörigen Beispiel:

**Related example:** [Built-in predecessor editor](https://snippet.dhtmlx.com/xz6192wd)


## Inline-Bearbeitungsmodi

### Grundlegende Inline-Bearbeitung

Dieser Modus geht davon aus, dass Sie mit der Maus Zellen fokussieren und mit Tastenkombinationen zwischen ihnen navigieren:

- Tab - bewegt den Fokus zum nächsten Editor
- Shift+Tab - bewegt den Fokus zurück zum vorherigen Editor


[Inline editing](https://docs.dhtmlx.com/gantt/samples/07_grid/11_inline_edit_basic.html)


### Tastaturnavigationsmodus

Hier wird die Tastatur sowohl zur Navigation als auch zur Bearbeitung von Rasterzellen mit vordefinierten Tasten oder Tastenkombinationen verwendet:

- Enter - öffnet oder schließt den Editor
- Leertaste - öffnet den Editor
- Pfeiltasten - navigieren zwischen den Rasterzellen
- Shift+Pfeil nach rechts - verschiebt eine Aufgabe nach rechts, verschachtelt sie und die darüberliegende Aufgabe wird zum Projekt
- Shift+Pfeil nach links - wandelt ein Projekt in eine einfache Aufgabe um
- Shift+Pfeil nach oben - klappt einen Aufgaben-Branch ein
- Shift+Pfeil nach unten - klappt einen Aufgaben-Branch aus

Um die Tastaturnavigation für die Bearbeitung zu aktivieren, müssen Sie:

- das **keyboard_navigation**-Plugin mit der [gantt.plugins](api/method/plugins.md)-Methode aktivieren:

~~~js
gantt.plugins({
    keyboard_navigation: true
});
~~~

- [keyboard navigation](guides/keyboard-navigation.md) und Zellennavigation aktivieren:

~~~js
gantt.config.keyboard_navigation = true;
gantt.config.keyboard_navigation_cells = true;
~~~

Sie können auch eine [Platzhalterzeile](api/config/placeholder_task.md) aktivieren, die als leere Zeile am Ende der Aufgabenliste angezeigt wird. Benutzer können diese Zeile bearbeiten, um neue Aufgaben hinzuzufügen.

~~~js
gantt.config.placeholder_task = true;
~~~

Alternativ kann der Fokus direkt nach dem Hinzufügen einer neuen Aufgabe auf die Platzhalteraufgabe verschoben werden:

~~~js
gantt.config.placeholder_task = {
    focusOnCreate: true
};
~~~

Falls erforderlich, können Sie auch die [automatische Erkennung von Aufgabentypen](api/config/auto_types.md) aktivieren:

~~~js
gantt.config.auto_types = true;
~~~


[Inline editing - keyboard navigation mode](https://docs.dhtmlx.com/gantt/samples/07_grid/12_inline_edit_key_nav.html)


### Benutzerdefinierte Inline-Bearbeitung

Es ist möglich, eigene Tastaturzuweisungen zu definieren - Sie können festlegen, wie Editoren geöffnet werden und Editor-Ereignisse wie Öffnen, Schließen, Bearbeitungsbeginn und -ende behandeln. Dazu erstellen Sie ein separates Objekt mit dieser Logik und übergeben es an eine spezielle Methode, um Ihre Belegung anzuwenden:

~~~js
var mapping = {
 init: function(inlineEditors){
  // inlineEditor-Modul initialisiert
  // globale Listener für Bearbeitungsbeginn/-ende hinzufügen
 },

 onShow: function(inlineEditors, node){
  // Editor wird angezeigt
 },

 onHide: function(inlineEditors, node){
  // Editor wird ausgeblendet
  // Änderungen aus onShow ggf. bereinigen
 }
};

gantt.ext.inlineEditors.setMapping(mapping);
~~~


[Inline editing - Custom keyboard mapping](https://docs.dhtmlx.com/gantt/samples/07_grid/13_custom_mapping.html)


### Benutzerdefinierte Zuordnung für Platzhalteraufgaben

Stellen Sie sich vor, Sie verwenden Tastaturnavigation, Inline-Editoren und eine Platzhalteraufgabe in Ihrem Gantt-Diagramm. Zwei typische Szenarien:

**Szenario 1.** Nach Eingabe eines Namens für eine neue Platzhalteraufgabe und Drücken von Tab erwarten Sie, dass Gantt die nächste Zelle dieser Aufgabe öffnet. Stattdessen wird der Fokus auf die nächste Platzhalteraufgabe darunter verschoben und der Inline-Editor nicht geöffnet.

**Szenario 2.** Nach Eingabe eines Namens für eine neue Platzhalteraufgabe und Klicken auf die nächste Zelle verschiebt Gantt den Fokus auf die nächste Platzhalteraufgabe statt auf die Zelle, auf die Sie geklickt haben.

Mit einer benutzerdefinierten Zuordnung können Sie festlegen, wie der Inline-Editor auf Maus- und Tastaturaktionen reagieren soll. Hier ein Beispiel:

**Related example:** [Gantt. Custom mapping for placeholder task](https://snippet.dhtmlx.com/xcgiommu)
))

## Validierung von Eingabewerten

Beim Bearbeiten von Zellen im Grid können Fehler auftreten.

Um das Speichern ungültiger Werte zu verhindern, sollten Sie die Eingaben vor dem Schließen des Editors validieren. Dies kann auf zwei Arten erfolgen:

- über die **is_valid**-Methode eines [benutzerdefinierten Editor-Objekts](guides/inline-editing.md#custominlineeditor)
- mit dem **onBeforeSave**-Event des [inlineEditors-Objekts](guides/inline-editors-ext.md)

So wirkt sich die Validierung auf das Editorverhalten aus:

Wenn Sie einen Editor in einer Grid-Zelle mit der Maus öffnen, gilt Folgendes:

- Escape schließt den Editor, ohne Änderungen zu speichern.
- Enter speichert und schließt den Editor, wenn der Wert gültig ist. Ist der Wert ungültig, wird die Eingabe verworfen.
- Tab oder Klicken außerhalb speichert den gültigen Wert und verschiebt den Fokus auf eine andere Zelle; ungültige Werte werden zurückgesetzt und der Editor geschlossen.

:::note
Weitere Informationen zu clientseitiger oder serverseitiger Validierung finden Sie im Artikel [Validation](guides/validation.md).
:::

### Verhindern, dass der Editor geschlossen wird

Wenn die Validierung aktiviert ist, setzt Gantt ungültige Eingaben zurück und schließt den Editor. Sie müssen die Zelle erneut öffnen, um Werte zu korrigieren.

Eine praktische Möglichkeit, dies zu vermeiden, ist das Anzeigen eines Hinweises, der den Benutzer zur Korrektur auffordert. Dies lässt sich mit einer benutzerdefinierten Tastaturbelegung umsetzen, zum Beispiel:

~~~js
function editAnotherCell(inlineEditors){
  var value = inlineEditors.getValue();
  if(confirm(`does '${value}' look ok to you?`)){
    inlineEditors.save();
  }
}

var mapping = {
  init: function(inlineEditors){
    gantt.attachEvent("onTaskClick", function (id, e) {
      var cell = inlineEditors.locateCell(e.target);
      if (cell && inlineEditors.getEditorConfig(cell.columnName)) {
        if (inlineEditors.isVisible()) editAnotherCell(inlineEditors)
        else inlineEditors.startEdit(cell.id, cell.columnName);
        return false;
      }
      return true;
    });
    gantt.attachEvent("onEmptyClick", function () {
      inlineEditors.hide();
      return true;
    });
  },

  onShow: function(inlineEditors, node){

    node.onkeydown = function (e) {
      e = e || window.event;
      if(e.defaultPrevented){
        return;
      }

      var keyboard = gantt.constants.KEY_CODES;

      var shouldPrevent = true;
      switch (e.keyCode) {
        case gantt.keys.edit_save:
          var value = inlineEditors.getValue();
          if(confirm(`does '${value}' look ok to you?`)){
            inlineEditors.save();
          }
          
          break;
        case gantt.keys.edit_cancel:
          inlineEditors.hide();
          break;
        case keyboard.TAB:
          if(e.shiftKey){
            if (inlineEditors.isVisible()) editAnotherCell(inlineEditors)
            else inlineEditors.editPrevCell(true);
          }else{
            if (inlineEditors.isVisible()) editAnotherCell(inlineEditors)
            else inlineEditors.editNextCell(true);
          }
          break;
        default:
          shouldPrevent = false;
          break;
      }

      if(shouldPrevent){
        e.preventDefault();
      }
    };
  },

  onHide: function(inlineEditors, node){}
};

gantt.ext.inlineEditors.setMapping(mapping);

gantt.init("gantt_here");
~~~

**Related example:** [Custom keyboard mapping](https://snippet.dhtmlx.com/5/5da351260)

## Editor mit einem Klick öffnen

Im Einzel-Auswahlmodus öffnet ein Klick auf eine Aufgabe sofort den Inline-Editor.

Im [Multi-Auswahlmodus](guides/multiselection.md) wird beim Klicken auf eine nicht ausgewählte Aufgabe diese ausgewählt, aber der Inline-Editor öffnet sich erst nach einem zweiten Klick. Soll der Editor bereits beim ersten Klick geöffnet werden, aktivieren Sie die Konfiguration [inline_editors_multiselect_open](api/config/inline_editors_multiselect_open.md):

~~~js
gantt.plugins({
  multiselect: true
});

...

gantt.config.inline_editors_multiselect_open = true;
~~~


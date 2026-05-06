---
title: "Inline Editing im Grid"
sidebar_label: "Inline Editing im Grid"
---

# Inline-Bearbeitung im Grid

dhtmlxGantt bietet zwei Optionen zur Bearbeitung des Inhalts:

- mit Hilfe des [Lightbox](guides/default-edit-form.md) Bearbeitungsformular
- durch die Verwendung von Inline-Editoren im Grid-Bereich

Inline-Bearbeitung ermöglicht es Ihnen, Änderungen direkt im Grid vorzunehmen: Aufgaben erstellen und aktualisieren, Verbindungen zwischen ihnen herstellen, Start- und Endtermin festlegen oder die Dauer ändern – alles über die integrierten Editor-Komponenten.

![Inline grid editing](/img/inline_grid_editing.png)

Um Inline-Bearbeitung zu aktivieren, müssen Sie:

- die Liste der Editor-Konfigurationen angeben und die Eigenschaft **map_to** eines Editor-Objekts verwenden, um den erforderlichen Editor einer Grid-Spalte zuzuordnen

~~~js
const textEditor = { type: "text", map_to: "text" };
const dateEditor = { type: "date", map_to: "start_date", min: new Date(2025, 0, 1),
    max: new Date(2026, 0, 1) };
const durationEditor = { type: "number", map_to: "duration", min: 0, max: 100 };
~~~

- in der Spaltenkonfiguration die **editor**-Eigenschaft verwenden, um den Editor festzulegen, der in der Spalte verwendet werden soll

~~~js
gantt.config.columns = [
    { name: "text", tree: true, width: "*", editor: textEditor, resize: true },
    { name: "start_date", align: "center", editor: dateEditor, resize: true },
    { name: "duration", align: "center", editor: durationEditor },
    { name: "add", width: 44 }
];
~~~


[Inline editing](https://docs.dhtmlx.com/gantt/samples/07_grid/11_inline_edit_basic.html)


:::note
Lesen Sie Details zur API des *inlineEditors*-Objekts im Artikel [Inline Editors Extension](guides/inline-editors-ext.md).
:::

Sie können sich die Videoanleitung ansehen, die zeigt, wie man Inline-Bearbeitung im Grid implementiert.

<iframe width="704" height="400" src="https://www.youtube.com/embed/0rIPrC0GtME" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Typen von Editoren

Die Inline-Editoren werden im Konfigurationsobjekt [editor_types](api/config/editor_types.md) verwaltet.

Es gibt mehrere vordefinierte Inline-Editoren:

- **text** Editor – zum Bearbeiten von Textspalten, z. B. dem Aufgabenamen
- **number** Editor – zum Bearbeiten von Zahlen-Spalten, z. B. Aufgaben-Dauer, Reihenfolge usw.
- **duration** Editor – zum Bearbeiten von Dauer-Spalten, d. h. der Aufgaben-Dauer. Funktioniert nur, wenn die Konfiguration **map_to: "duration"** verwendet wird und der Editor-Typ auf **"duration"** gesetzt ist:

~~~js
{ type: "duration", map_to: "duration", formatter: formatter }
~~~

Dieser Typ eines Inline-Editors ist nützlich, wenn Sie die Dauer angeben müssen, die sowohl eine Zahl als auch die [duration unit](api/config/duration_unit.md) enthält. 
Zum Beispiel: `5 days`.
Verwendet standardmäßig den [Duration Formatter](guides/formatters-ext.md#durationformatter).
Anstelle des Standard-Dauer-Formatters können Sie auch dessen Konfiguration ändern oder einen [benutzerdefinierten Formatter](guides/formatters-ext.md#customformatter) festlegen.

- **date** Editor – zum Bearbeiten von Datumsspalten, z. B. Start- und Enddaten der Aufgabe
- **select** Editor – zur Auswahl einer Option aus einer Liste
- **predecessor** Editor – zum Festlegen des Vorgängers der aktuell bearbeiteten Aufgabe. Dieser Editor erhält die [WBS-Codes der Aufgaben](guides/specifying-columns.md#wbscode), um die Verbindung zum Vorgänger herzustellen.

~~~js
const editors = {
    text: { type: "text", map_to: "text" },
    start_date: { type: "date", map_to: "start_date", min: new Date(2025, 0, 1),
        max: new Date(2026, 0, 1) },
    end_date: { type: "date", map_to: "end_date", min: new Date(2025, 0, 1), 
        max: new Date(2026, 0, 1) },
    duration: { type: "number", map_to: "duration", min: 0, max: 100 },
    priority: { type: "select", map_to: "priority",
        options: gantt.serverList("priority") },
    predecessors: { type: "predecessor", map_to: "auto" }
};
~~~


### Dates limits im Date-Editor {#dateslimits}

Ab Version 6.3 gibt es keine Standardgrenzen mehr für minimale und maximale Eingabewerte der **date** Inline-Editoren.

Wenn Sie möchten, dass die auf der Zeitachse sichtbaren Daten die minimalen und maximalen Werte des **date** Inline-Editors begrenzen (sofern keine benutzerdefinierten min/max-Werte angegeben sind), können Sie dynamische **min/max** Werte angeben:

~~~js
const dateEditor = {
    type: "date",
    map_to: "start_date",
    min: taskId => gantt.getState().min_date,
    max: taskId => gantt.getState().max_date
};
~~~

### Editor für inklusive Endtermine {#inclusiveenddate}

Wenn Sie das [Format für inklusive Endtermine](api/template/task_end_date.md) von Aufgaben verwenden und es mit Inline-Bearbeitung im Grid korrekt funktionieren soll, müssen Sie einen speziellen Editor zum Bearbeiten inklusiver Endtermine der Aufgaben erstellen, wie folgt:

~~~js
// inklusiver Editor für Enddaten
// verwenden Sie den Standard-Editor, überschreiben Sie aber die set_value/get_value-Methoden
const dateEditor = gantt.config.editor_types.date;

gantt.config.editor_types.end_date = gantt.mixin({
    set_value: function(value, id, column, node) {
        const correctedValue = gantt.date.add(value, -1, "day");
        return dateEditor.set_value.apply(this, [correctedValue, id, column, node]);
    },
    get_value: function(id, column, node) {
        const selectedValue = dateEditor.get_value.apply(this, [id, column, node]);
        return gantt.date.add(selectedValue, 1, "day");
    }
}, dateEditor);

const textEditor = { type: "text", map_to: "text" };
const startDateEditor = { type: "date", map_to: "start_date" };
const endDateEditor = { type: "end_date", map_to: "end_date" };
const durationEditor = { type: "number", map_to: "duration", min: 0, max: 100 };

gantt.config.columns = [
    { name: "text", label: "Name", tree: true, width: 200, editor: textEditor, 
        resize: true },
    { name: "duration", label: "Duration", width: 80, align: "center", 
        editor: durationEditor, resize: true },
    { name: "start_date", label: "Start", width: 140, align: "center", 
        editor: startDateEditor, resize: true },
    { name: "end_date", label: "Finish", width: 140, align: "center", 
        editor: endDateEditor, resize: true }
];

// ändern Sie Lightbox- und Grid-Templates, um Datumsangaben der Aufgaben im inklusiven Format anzuzeigen
gantt.templates.task_end_date = date => 
    gantt.templates.task_date(new Date(date.valueOf() - 1));

const gridDateToStr = gantt.date.date_to_str("%Y-%m-%d");
gantt.templates.grid_date_format = (date, column) =>
    column === "end_date"
        ? gridDateToStr(new Date(date.valueOf() - 1))
        : gridDateToStr(date);
~~~

**Related sample** [Inclusive end date editor]

Für weitere Details zur Formatierung von Enddaten siehe den Artikel [Task end date display & Inclusive end dates](guides/loading.md#taskenddatedisplayampinclusiveenddates).

### Formatieren der Werte des Predecessor-Editors {#linkformatter}

:::note
Diese Funktionalität ist nur in der PRO-Edition verfügbar.
:::

Ab Version 6.3 ermöglicht Gantt das direkte Spezifizieren von Link-Typen sowie Lag/Lead-Werten direkt aus dem Inline-Editor.

Dazu müssen Sie das [Link Formatter](guides/formatters-ext.md#linkformatter) Modul verwenden und eine Instanz des *LinksFormatter* in den **predecessor**-Editor einbinden:

~~~js
const formatter = gantt.ext.formatters.durationFormatter({
    enter: "day",
    store: "day",
    format: "auto"
});

const linksFormatter = gantt.ext.formatters.linkFormatter({
    durationFormatter: formatter
});

const editors = {
    text: { type: "text", map_to: "text" },
    start_date: { type: "date", map_to: "start_date", min: new Date(2025, 0, 1),
        max: new Date(2026, 0, 1) },
    end_date: { type: "date", map_to: "end_date", min: new Date(2025, 0, 1),
        max: new Date(2026, 0, 1) },
    duration: { type: "duration", map_to: "duration", min: 0,
        max: 100, formatter: formatter },
    priority: { type: "select", map_to: "priority",
        options: gantt.serverList("priority") },
    predecessors: { type: "predecessor", map_to: "auto", formatter: linksFormatter }
};

gantt.config.columns = [
    { name: "wbs", label: "#", width: 60, align: "center", template: gantt.getWBSCode },
    { name: "text", label: "Name", tree: true, width: 200,
        editor: editors.text, resize: true },
    { name: "start_date", label: "Start", width: 80, align: "center",
        editor: editors.start_date, resize: true },
    { name: "predecessors", label: "Predecessors", width: 80, align: "left",
        editor: editors.predecessors, resize: true, template: task => {
            const links = task.$target || [];
            const labels = links.map(id => {
                const link = gantt.getLink(id);
                return linksFormatter.format(link);
            });
            return labels.join(", ");
        }
    },
    { name: "add" }
];
~~~


[Inline editing - keyboard navigation mode](https://docs.dhtmlx.com/gantt/samples/07_grid/12_inline_edit_key_nav.html)


Die folgende Sektion bietet Ihnen Code-Beispiele für die folgenden benutzerdefinierten Editoren:

- [Simple numeric input](guides/inline-editing.md#custominlineeditor)
- [JQuery Datepicker input](guides/inline-editing.md#jquery_datepicker)

## Benutzerdefinierter Inline-Editor {#custominlineeditor}

Sie können auch einen benutzerdefinierten Inline-Editor angeben. Dazu müssen Sie ein neues Editor-Objekt wie folgt erstellen:

~~~js
gantt.config.editor_types.custom_editor = {
    show: (id, column, config, placeholder) => {
        // wird geöffnet, wenn der Inline-Editor angezeigt wird. Legen Sie hier
        // den HTML-Markup des Editors in den placeholder und initialisieren Sie
        // ggf. Ihre Editor-Bibliothek
        const html = "<div><input type='text' name='" + column.name + "'></div>";
        placeholder.innerHTML = html;
    },
    hide: () => {
        // wird aufgerufen, wenn der Editor versteckt wird
        // zerstören Sie komplexe Editor-Instanzen oder lösen Sie hier Event-Listener
    },
    set_value: (value, id, column, node) => {
        // Wert in das Eingabefeld setzen
    },
    get_value: (id, column, node) => {
        // Wert aus dem Inline-Editor zurückgeben
    },
    is_changed: (value, id, column, node) => {
        // vor dem Speichern auf Änderungen prüfen
        // true zurückgeben, wenn der neue Wert vom ursprünglichen abweicht
    },
    is_valid: (value, id, column, node) => {
        // Validierung durchführen, Änderungen verwerfen, wenn false
        return true/false;
    },
    save: (id, column, node) => {
        // nur für Eingaben mit map_to:auto. Komplexes Speichern-Verhalten hier
    },
    focus: (node) => {
        // Fokuslogik
    }
};
~~~

Hier eine detailliertere Typbeschreibung:

- <span class="submethod">**show (id, column, config, placeholder): void**</span> - Die Funktion wird aufgerufen, wenn Sie den Inline-Editor öffnen. Hier können Sie einen Container für die DOM-Elemente hinzufügen und ggf. Drittanbieter-Bibliotheken initialisieren. Die Parameter sind:
    - **_id_** - (*string | number*) - Aufgaben-ID
    - **_column_** - (*GridColumn*) - Spaltenkonfigurationsobjekt
    - **_config_** - (*any*) - Konfigurationsobjekt des benutzerdefinierten Inline-Editors
    - **_placeholder_** - (*HTMLElement*) - DOM-Element des Inline-Editors
- <span class="submethod">**hide? (): void**</span> - optional, die Funktion wird aufgerufen, wenn der Inline-Editor ausgeblendet wird
- <span class="submethod">**set_value (value, id, column, node): void**</span> - Die Funktion wird nach der **show**-Funktion aufgerufen. Dort müssen Sie die Werte in die Elemente des Inline-Editors aus dem Task-Objekt setzen. Die Parameter sind:
    - **_value_** - (*any*) - der Wert der Task-Eigenschaft
    - **_id_** - (*string | number*) - Aufgaben-ID
    - **_column_** - (*GridColumn*) - Spaltenkonfigurationsobjekt
    - **_node_** - (*HTMLElement*) - DOM-Element des Inline-Editors
- <span class="submethod">**get_value (id, column, node): any**</span> - Die Funktion wird vor dem Verbergen des Inline-Editors aufgerufen. Sie müssen die Werte aus dem Inline-Editor abrufen und dem Task-Objekt hinzufügen. Die Parameter sind:
    - **_id_** - (*string | number*) - Aufgaben-ID
    - **_column_** - (*GridColumn*) - Spaltenkonfigurationsobjekt
    - **_node_** - (*HTMLElement*) - DOM-Element des Inline-Editors
- <span class="submethod">**is_changed? (value, id, column, node): boolean**</span> - optional, die Funktion wird vor dem Verbergen des Inline-Editors aufgerufen. Wenn Sie true zurückgeben, werden die Änderungen gespeichert, andernfalls verworfen. Die Parameter sind:
    - **_value_** - (*any*) - der Wert der Task-Eigenschaft
    - **_id_** - (*string | number*) - Aufgaben-ID
    - **_column_** - (*GridColumn*) - Spaltenkonfigurationsobjekt
    - **_node_** - (*HTMLElement*) - DOM-Element des Inline-Editors
- <span class="submethod">**is_valid? (value, id, column, node): boolean**</span> - optional, Funktion, in der Sie Validierung hinzufügen können. Wenn Sie false zurückgeben, werden die Änderungen verworfen. Die Parameter sind:
    - **_value_** - (*any*) - der Wert der Task-Eigenschaft
    - **_id_** - (*string | number*) - Aufgaben-ID
    - **_column_** - (*GridColumn*) - Spaltenkonfigurationsobjekt
    - **_node_** - (*HTMLElement*) - DOM-Element des Inline-Editors
- <span class="submethod">**save? (id, column, node): void**</span> - optional, die Funktion für ein komplexes Speichern-Verhalten, wenn der Editor die Eigenschaft map_to:auto hat. Die Parameter sind:
    - **_id_** - (*string | number*) - Aufgaben-ID
    - **_column_** - (*GridColumn*) - Spaltenkonfigurationsobjekt
    - **_node_** - (*HTMLElement*) - das Task-Objekt
- <span class="submethod">**focus? (node): void**</span> - optional, diese Funktion wird aufgerufen, wenn der Inline-Editor Fokus erhält.
    - **_node_** - (*HTMLElement*) - DOM-Element des Inline-Editors


Es gibt einige zentrale Punkte, die Sie beachten sollten, um einen wiederverwendbaren Editor zu implementieren:

- Grundsätzlich verändert **`get_value`** das Task-Objekt nicht. Die Methode gibt lediglich den aktuellen Wert des Inline-Editors zurück. Ist der Wert gültig, aktualisiert Gantt automatisch die zugehörige Aufgabe mit diesem Wert.
- Verwenden Sie die Konfigurationsoption **map_to** des Editors, um festzulegen, welche Eigenschaft der Aufgabe durch den Editor aktualisiert werden soll, aber hardcodieren Sie dies nicht direkt in den Editor. Auf diese Weise können Sie den Editor für verschiedene Spalten wiederverwenden.
- Falls Sie keinen komplexen JavaScript-Widget verwenden, benötigen Sie keine Logik in der **`hide`**-Funktion; Sie können sie leer lassen. Andernfalls nutzen Sie diese Methode, um einen Destruktor aufzurufen oder alle Event-Handler, die Sie beim Anzeigen des Editors angehängt haben, aufzuräumen.
- Stellen Sie sicher, dass Sie die Funktionen **`is_changed`** und **`is_valid`** implementieren:
  - Wenn **`is_changed`** immer true zurückgibt, löst der Editor beim Schließen jedes Mal ein Update aus (das ggf. an das Backend gesendet wird). Diese Methode sollte true nur dann zurückgeben, wenn der Eingabewert sich tatsächlich vom ursprünglichen Zustand unterscheidet.
  - **`is_valid`** dient der Verhinderung ungültiger Werte.
- Wenn Sie einen Editor implementieren, der etwas Komplizierteres als das Schreiben eines Wertes in eine Eigenschaft einer Aufgabe macht – z. B. der integrierte [predecessor editor](guides/inline-editing.md#types-of-editors) – müssen Sie eine entsprechende Logik in der **save**-Funktion implementieren und die **map_to**-Option des Eingabefelds auf *"auto"* setzen. In diesem Fall modifiziert gantt das Task-Objekt nicht, sondern ruft die **save**-Funktion auf, wenn die Änderungen am Editor angewendet werden sollen.

Hier ist ein Beispiel für die Implementierung eines einfachen Zahlen-Eingabefelds.
Beachten Sie, dass die **`hide`**-Methode leer sein kann und die **`save`**-Methode komplett übersprungen werden kann.

~~~js
const getInput = node => node.querySelector("input");

gantt.config.editor_types.simpleNumber = {
    show: (id, column, config, placeholder) => {
        const min = config.min ?? 0,
            max = config.max ?? 100;
        const html = "<div><input type='number' min='" + min + 
            "' max='" + max + 
            "' name='" + column.name + "'></div>";
        placeholder.innerHTML = html;
    },
    hide: () => {
        // kann leer sein, da wir nichts bereinigen müssen, wenn der Editor
        // vom DOM getrennt wird
    },
    set_value: (value, id, column, node) => {
        getInput(node).value = value;
    },
    get_value: (id, column, node) => {
        return getInput(node).value || 0;
    },
    is_changed: function(value, id, column, node) {
        const currentValue = this.get_value(id, column, node);
        return Number(value) !== Number(currentValue);
    },
    is_valid: (value, id, column, node) => {
        return !isNaN(parseInt(value, 10));
    },
    focus: node => {
        const input = getInput(node);
        if (!input) return;
        if (input.focus) input.focus();
        if (input.select) input.select();
    }
};
~~~

Danach können Sie den Editor wie integrierte Editoren verwenden:

~~~js
const numberEditor = { type: "simpleNumber", map_to: "quantity", min: 0, max: 50 };

gantt.config.columns = [
    ...
    { name: "quantity", label: "Quantity", width: 80, editor: numberEditor,
        resize: true },
    ...
];
~~~

Beachten Sie, dass wir in diesem Fall die **`hide`**-Methode nicht implementieren müssen, da Gantt das DOM-Element des Editors automatisch trennt und nichts weiter bereinigt werden muss, nachdem der Editor geschlossen wird.

### editor.hide {#jquery_datepicker}

Sie benötigen möglicherweise eine **`hide`**-Logik, wenn Sie ein komplexes Widget innerhalb eines Inline-Editors verwenden.

Betrachten wir zum Beispiel die folgende Implementierung des DatePicker-Eingabefelds mit jQuery.
In diesem Fall müssen wir das DatePicker-Widget nach der Abkopplung vom DOM zerstören.

Voraussetzungen:

~~~js
<link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
<script src="https://code.jquery.com/jquery-1.12.4.js"></script>
<script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
~~~

Editor:

~~~js
gantt.config.editor_types.custom_datepicker_editor = {
    show: (id, column, config, placeholder) => {
        placeholder.innerHTML =
            `<div><input type="text" id="datepicker" name="${column.name}"></div>`;
        $("#datepicker").datepicker({
            dateFormat: "yy-mm-dd",
            onSelect: () => gantt.ext.inlineEditors.save()
        });
    },
    hide: (node) => {
        $("#datepicker").datepicker("destroy");
    },
    set_value: (value, id, column, node) => {
        $("#datepicker").datepicker("setDate", value);
    },
    get_value: (id, column, node) => {
        return $("#datepicker").datepicker("getDate");
    },
    is_changed: (value, id, column, node) => {
        return +$("#datepicker").datepicker("getDate") !== +value;
    },
    is_valid: (value, id, column, node) => {
        return !isNaN(+$("#datepicker").datepicker("getDate"));
    },
    save: (id, column, node) => {
    },
    focus: (node) => {
    }
};

const dateEditor = { type: "custom_datepicker_editor", map_to: "start_date" };

gantt.config.columns = [
    { name: "text", tree: true, width: '*', resize: true },
    { name: "start_date", align: "center", resize: true, editor: dateEditor },
    { name: "duration", align: "center" },
    { name: "add", width: 44 }
];
~~~

**Related sample** [Using jQuery Datepicker in the editor](https://plnkr.co/edit/U3vHJvleRBJ1Js0N?preview)

### editor.save

Sie müssen die **`save`**-Funktion nur verwenden, wenn Ihr Editor mehrere Eigenschaften der Aufgabe gleichzeitig ändern muss oder wenn er Objekte verändert, die sich von Aufgaben unterscheiden.

In diesem Fall können Sie eine ordentliche Implementierung von **`get_value`** im Hinblick auf integrierte Validierung beibehalten, aber gantt wird den Editor-Wert nicht direkt auf die Aufgabe anwenden und stattdessen die **`save`**-Funktion aufrufen, sobald Änderungen am Editor angewendet werden sollen.

Nachdem **`save`** aufgerufen wurde, müssen Sie die Eingabewerte interpretieren und Änderungen am Gantt mit eigenem Code anwenden.
Gantt ruft das Event [onSave](guides/inline-editors-ext.md#events) auf, nachdem die **`save`**-Methode abgeschlossen wurde, aber ruft [gantt.updateTask](api/method/updatetask.md) für die bearbeitete Zeile nicht auf.

**Hinweis!** Die **`save`**-Methode wird nur dann aufgerufen, wenn Sie **`map_to:"auto"`** in der Editor-Konfiguration angeben:

~~~js
const editors = {
    ...
    predecessors: { type: "predecessor", map_to: "auto" }
};
~~~

Ein gutes Beispiel für eine solche Steuerung ist der integrierte Vorgänger-Editor. Die vereinfachte Implementierung finden Sie im entsprechenden Beispiel:

**Related sample** [Built-in predecessor editor](https://snippet.dhtmlx.com/xz6192wd)


## Inline-Bearbeitungsmodi

### Grundlegende Inline-Bearbeitung 

Dieser Modus setzt voraus, dass der Mauszeiger verwendet wird, um den Fokus auf Zellen zu setzen, sowie Tastenkombinationen zum Navigieren zwischen Zellen:

- Tab – Fokus zur nächsten Editor-Spalte verschieben
- Shift+Tab – Fokus zur vorherigen Editor-Spalte zurück
  

[Inline editing](https://docs.dhtmlx.com/gantt/samples/07_grid/11_inline_edit_basic.html)


### Tastaturnavigations-Modus

In diesem Modus werden Tastatur und Editor-Interaktion sowohl zum Navigieren als auch zum Bearbeiten der Grid-Zellen verwendet, mit Hilfe der vordefinierten Tasten oder Tastenkombinationen.

- Enter – Editor öffnen/schließen
- Space-Taste – Editor öffnen
- Pfeiltasten – Grid-Zellen navigieren
- Shift+Rechte Pfeiltaste – eine Aufgabe nach rechts verschieben, d. h. eine verschachtelte Aufgabe erstellen, wobei die vorhergehende Aufgabe zu einem Projekt wird
- Shift+Linke Pfeiltaste – ein Projekt in eine einfache Aufgabe umwandeln
- Shift+Aufwärtspfeil – Zweig mit Aufgaben zusammenfassen
- Shift+Abwärtspfeil – Zweig mit Aufgaben erweitern
 
Um die Tastaturnavigation für das Bearbeiten zu aktivieren, müssen Sie:

- das Keyboard-Navigation-Plugin über die Methode [gantt.plugins](api/method/plugins.md) aktivieren.

~~~js
gantt.plugins({
    keyboard_navigation: true
});
~~~

- [Tastaturnavigation](guides/keyboard-navigation.md) und Navigation nach Zellen aktivieren:

~~~js
gantt.config.keyboard_navigation = true;
gantt.config.keyboard_navigation_cells = true;
~~~

Zusätzlich können Sie eine [Platzhalterzeile](api/config/placeholder_task.md) aktivieren, eine leere Zeile, die am Ende der Aufgabenliste angezeigt wird. Ihr Endbenutzer kann sie bearbeiten, um neue Aufgaben in den Gantt hinzuzufügen.

~~~js
gantt.config.placeholder_task = true;
~~~

Alternativ, wenn Sie möchten, dass der Fokus nach dem Hinzufügen einer neuen Aufgabe auf der Platzhalteraufgabe liegt, verwenden Sie folgende Konfiguration:

~~~js
gantt.config.placeholder_task = {
    focusOnCreate: true
};
~~~

Falls nötig, können Sie auch die [automatische Erkennung der Typen von Aufgaben](api/config/auto_types.md) hinzufügen:

~~~js
gantt.config.auto_types = true;
~~~


[Inline editing - keyboard navigation mode](https://docs.dhtmlx.com/gantt/samples/07_grid/12_inline_edit_key_nav.html)


### Benutzerdefinierte Inline-Bearbeitung

Sie können auch eine benutzerdefinierte Tastenzuordnung bereitstellen, d. h. die Logik, wie Editor-Fenster geöffnet werden, die Handler von Editor-bezogenen Ereignissen (Öffnen, Schließen von Editoren, Start und Ende des Bearbeitens usw.) in einem separaten Objekt beschreiben und dieses Objekt anschließend an die spezielle Methode übergeben, die Ihr Zuordnungs-Schema anwendet:

~~~js
const mapping = {
    init: (inlineEditors) => {
        // InlineEditor-Modul wird initialisiert
        // globale Listener zum Starten/Beenden der Bearbeitung hinzufügen
    },

    onShow: (inlineEditors, node) => {
        // der Editor wird angezeigt
    },

    onHide: (inlineEditors, node) => {
        // der Editor wird versteckt
        // ggf. Änderungen in onShow rückgängig machen
    }
};

gantt.ext.inlineEditors.setMapping(mapping);
~~~


[Inline editing - Custom keyboard mapping](https://docs.dhtmlx.com/gantt/samples/07_grid/13_custom_mapping.html)


### Benutzerdefinierte Zuordnung für Platzhalteraufgabe

Stellen Sie sich vor, Sie verwenden Tastaturnavigation, Inline-Editoren und eine Platzhalteraufgabe in Ihrem Gantt und betrachten zwei reale Szenarien.

Szenario 1. Wenn Sie den Namen einer neuen Platzhalteraufgabe eingeben und anschließend Tab drücken, erwarten Sie, dass Gantt die nächste Zelle für diese Aufgabe öffnet. Stattdessen verschiebt Gantt den Fokus auf die neue Platzhalteraufgabe darunter und öffnet den Inline-Editor nicht.

Szenario 2. Wenn Sie den Namen einer neuen Platzhalteraufgabe eingeben und dann auf die nächste Zelle klicken, verschiebt Gantt den Fokus zur nächsten Platzhalteraufgabe, statt ihn auf die Zelle zu setzen, die Sie angeklickt haben.

Die benutzerdefinierte Zuordnung hilft Ihnen, die oben beschriebenen Probleme zu lösen. Sie müssen lediglich die Logik festlegen, wie der Inline-Editor Maus- und Tastaturklicks behandeln soll. Sehen Sie sich das Beispiel an:

**Related sample** [Gantt. Custom mapping for placeholder task](https://snippet.dhtmlx.com/xcgiommu)


## Validierung von Eingabewerten

Beim Bearbeiten einer Zelle im Grid können Fehler auftreten.

Um das Speichern falscher Werte zu verhindern, müssen die Eingabewerte vor dem Schließen eines Editors validiert werden. Dies kann auf zwei Arten implementiert werden:

- über die Methode **is_valid** des [custom editor object](guides/inline-editing.md#custominlineeditor)
- über das **onBeforeSave**-Ereignis des [inlineEditors-Objekts](guides/inline-editors-ext.md)  

Betrachten wir das Verhalten des Editors, wenn die Validierung aktiviert ist.

Beispiel: Sie haben den Editor in einer Grid-Zelle per Mausklick geöffnet. Folgendes Vorgehen gilt für Ihre weitere Aktion:

- Drücken von Escape nach dem Bearbeiten einer Zelle schließt den Editor ohne Änderungen zu speichern. 
- Drücken von Enter bestätigt und schließt den Editor, wenn der Wert gültig ist; andernfalls wird der Eingabewert verworfen.
- Drücken von Tab oder Verwenden der Maus während des Bearbeitens einer Zelle speichert den gültigen Wert und bewegt den Fokus in eine andere Zelle, während der ungültige Wert zurückgesetzt wird und der Editor geschlossen wird.


:::note
Für Informationen darüber, wie die Validierung clientseitig oder serverseitig durchgeführt wird, siehe den Artikel [Validation](guides/validation.md).
:::

### Verhindern des Schließens des Editors

Wenn die Validierung der Editoren aktiviert ist, speichert Gantt keine falschen Eingaben, sondern setzt sie zurück und schließt den Editor. Sie müssen die Zelle erneut öffnen und die Werte erneut ändern. 

Eine gute Methode, um das Schließen des Editors zu verhindern, besteht darin, eine Warnmeldung anzuzeigen, die dem Benutzer die Möglichkeit gibt, den falschen Wert zu korrigieren. Dafür benötigen Sie eine benutzerdefinierte Tastatur-Zuordnung, wie in:

~~~js
function customValidation() {
    const state = gantt.ext.inlineEditors.getState()
    if (!state.id){
        return
    }
    const value = gantt.ext.inlineEditors.getValue()
    if (state.columnName == "start_date" || state.columnName == "end_date") {
        if (value.getFullYear() != 2025) {
            gantt.message({ text: "Validation failed", type: "error" })
            return false
        }
    }
    if (state.columnName == "duration") {
        if (value > 4) {
            gantt.message({ text: "Validation failed", type: "error" })
            return false
        }
    }

    return true
}

const mapping = {
    init: function (inlineEditors) {
        keyNav.attachEvent("onBeforeFocus", function (e) {
            if (gantt.ext.inlineEditors.isVisible()) {
                return false;
            }
        });

        gantt.attachEvent("onTaskClick", function (id, e) {
            const cell = inlineEditors.locateCell(e.target);
            if (!gantt.ext.inlineEditors.isVisible()) {
                if (cell && inlineEditors.getEditorConfig(cell.columnName)) {
                    inlineEditors.startEdit(cell.id, cell.columnName);
                    return false;
                }
            }
            return true;

        });

        keyNav.attachEvent("onKeyDown", function (id, e) {

            const editorOpened = gantt.ext.inlineEditors.isVisible();
            if (editorOpened && e.keyCode >= 37 && e.keyCode <= 40) return false;
            return true;
        });

        gantt.attachEvent("onEmptyClick", function () {

            if (customValidation()) {
                inlineEditors.hide();
            }
            return true;
        });
    },

    onShow: function (inlineEditors, node) {

        node.onkeydown = function (e) {
            e = e || window.event;
            if (e.defaultPrevented) {
                return;
            }

            const keyboard = gantt.constants.KEY_CODES;

            let shouldPrevent = true;
            switch (e.keyCode) {
                case gantt.keys.edit_save:
                    if (customValidation()) {
                        inlineEditors.save();
                    }

                    break;
                case gantt.keys.edit_cancel:
                    inlineEditors.hide();

                    break;
                case keyboard.TAB:
                    if (e.shiftKey) {
                        inlineEditors.editPrevCell(true);
                    } else {
                        inlineEditors.editNextCell(true);
                    }
                    break;
                default:
                    shouldPrevent = false;
                    break;
            }


            if (shouldPrevent) {
                e.preventDefault();
            }
        };
    },

    onHide: function (inlineEditors, node) { }
};

gantt.ext.inlineEditors.setMapping(mapping);
gantt.init("gantt_here");
~~~

**Related sample** [Validation for inline editors via custom mapping]

## Öffnen des Editors mit einem Klick

Im Single-Selection-Modus öffnet Gantt den Inline-Editor, nachdem Sie auf eine Aufgabe geklickt haben. 

Im [Mehrfach-Auswahl-Modus](guides/multiselection.md) wird nach dem ersten Klick auf eine nicht ausgewählte Aufgabe diese ausgewählt, und der Inline-Editor öffnet sich erst beim zweiten Klick. 
Wenn Sie möchten, dass Gantt den Inline-Editor nach dem ersten Klick öffnet, aktivieren Sie die [inline_editors_multiselect_open](api/config/inline_editors_multiselect_open.md) -Konfiguration.

~~~js
gantt.plugins({
  multiselect: true
});

...

gantt.config.inline_editors_multiselect_open = true;
~~~
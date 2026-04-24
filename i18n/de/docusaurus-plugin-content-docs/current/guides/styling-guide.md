---
title: "Arbeiten mit Gantt-Stilen"
sidebar_label: "Arbeiten mit Gantt-Stilen"
---

# Arbeiten mit Gantt-Stilen

dhtmlxGantt bietet Ihnen eine breite Palette an Optionen zur Anpassung des Erscheinungsbilds. Sie können sowohl das allgemeine Erscheinungsbild des Gantt-Diagramms durch die Verwendung einer der vordefinierten Skins ändern als auch die Stile einzelner Elemente (Aufgaben, Verknüpfungen, Zeitskala, Raster usw.) der Komponente anpassen. 

In diesem Leitfaden sind allgemeine Hinweise zum Arbeiten mit Stilen der Gantt-Teile zusammengefasst, um Ihnen die Navigation durch die Dokumentation zu erleichtern. 
Detaillierte Informationen zu jedem einzelnen Element finden Sie in den jeweiligen Artikeln.



## Styling des Gitters (Grid)

Sie können den Stil des Grid-Bereichs über die entsprechenden [Vorlagen des Grid](guides/table-templates.md) ändern.

### Kopfzeilen der Grid-Spalten

Es gibt eine [grid_header_class](api/template/grid_header_class.md) Vorlage, die es Ihnen ermöglicht, einen benutzerdefinierten Stil auf die Kopfzeilen der Grid-Spalten anzuwenden. Beispielsweise können Sie die Hintergrundfarbe bestimmter Kopfzeilen der Grid-Spalten wie folgt ändern:

~~~jsx
<style>
    .gantt-grid__header--highlighted {
        background-color: #ffeb8a !important;
    }
</style>

gantt.templates.grid_header_class = (columnName) =>
    (columnName === 'duration' || columnName === 'text')
        ? 'gantt-grid__header--highlighted'
        : '';
~~~

![styling_columns_headers](/img/styling_columns_headers.png)

**Related sample**: [Styling Headers of Grid Columns](https://snippet.dhtmlx.com/j01gqhtj)

### Benutzerdefinierte Elemente in der Grid-Kopfzeile

Es ist möglich, benutzerdefinierte Elemente (wie Buttons, Icons, Eingaben usw.) in die Kopfzeile des Grids einzufügen. Um ein Element hinzuzufügen, müssen Sie dessen HTML-Code als Wert der **label**-Eigenschaft innerhalb der
[**gantt.config.columns**](api/config/columns.md) Konfigurationsoption setzen:

~~~jsx
gantt.config.columns = [
    {
        name: "text",
        label: `<div class="gantt-grid__header-search-wrapper">Task name
                    <input id="task-search" type="text" placeholder="Search tasks...">
                </div>`, 
        width: 250, tree: true
    },
    // other columns
];
~~~

Die Implementierung der Suchfunktion sieht so aus:

~~~jsx 
const taskSearchInput = document.getElementById('task-search');

taskSearchInput.addEventListener('input', () => {
    gantt.refreshData();
});

function hasSubstring(parentId, searchValue) {
    const task = gantt.getTask(parentId);
    if (!task) return false;

    if (task.text.toLowerCase().includes(searchValue)) {
        return true;
    }

    const children = gantt.getChildren(parentId);
    for (let i = 0; i < children.length; i++) {
        if (hasSubstring(children[i], searchValue)) {
            return true;
        }
    }

    return false;
}

gantt.attachEvent('onBeforeTaskDisplay', (id) => {
    const searchValue = taskSearchInput.value.toLowerCase().trim();
    if (!searchValue) return true;
    return hasSubstring(id, searchValue);
});
~~~

![custom_elements_grid_header](/img/custom_elements_grid_header.png)

**Related sample**: [Custom Elements in Grid Header](https://snippet.dhtmlx.com/8jilpcrg)

#### Icons und Bilder in der Grid-Kopfzeile

Um ein Bild oder Symbol in die Kopfzeile einzufügen, können Sie es auch in das innere HTML der Zelle über die **label**-Eigenschaft setzen:

~~~jsx
const textLabel = `
    <div class="gantt-grid__header-label">
        <img src="http://docs.dhtmlx.com/scheduler/assets/index/icon1.png" alt="icon">
        <span>Text</span>
    </div>
`;

gantt.config.columns = [
    { name: "text", label: textLabel, tree: true, width: "*", resize: true },
    { name: "start_date", align: "center", resize: true },
    { name: "duration", align: "center" },
    { name: "add", width: 44 }
];
~~~

**Related sample**: [Images in Grid Header: Columns Config](https://snippet.dhtmlx.com/10y58pbv)

Alternativ können Sie eine Kopfzeilenzelle auch per CSS mit dem Selektor **.gantt_grid_head_<columnName>** festlegen:

~~~css
.gantt_grid_head_text {
    background-image: url("http://docs.dhtmlx.com/scheduler/assets/index/icon1.png");
    background-repeat: no-repeat;
}
~~~

![custom_elements_grid_header_image](/img/custom_elements_grid_header_image.png)

**Related sample**: [Images in Grid Header:CSS](https://snippet.dhtmlx.com/gvcsrpmb)

### Mehrzeiliger Text in der Grid-Kopfzeile

Folgen Sie dem im Abschnitt [How to display several lines in the grid cell/header](guides/how-to.md#how-to-display-several-lines-in-the-grid-cellheader) gezeigten Beispiel.

### Hintergrundfarbe der Grid-Reihen

Sie können eine benutzerdefinierte Farbe für alle oder einzelne Grid-Reihen mit Aufgaben über die [grid_row_class](api/template/grid_row_class.md) Vorlage anwenden. Zum Beispiel können Sie die Hintergrundfarbe einer bestimmten Zeile so ändern:

~~~jsx
<style>
    .gantt-grid__row--highlight {
        background-color: #ffeb8a !important;
    }
</style>

gantt.templates.grid_row_class = (start, end, task) =>
    task.id === 3 ? "gantt-grid__row--highlight" : "";
~~~

![grid_row_bg](/img/grid_row_bg.png)

**Related sample**: [Coloring Grid Rows](https://snippet.dhtmlx.com/y0dbph4x)

### Farbe der Grid-Reihen beim Überfahren mit der Maus

Sie können die Grid-Reihe beim Überfahren mithilfe der folgenden Stilregeln hervorheben:

~~~css
.gantt_grid_data .gantt_row.odd:hover, .gantt_grid_data .gantt_row:hover,
.gantt_grid_data .gantt_row.gantt_selected,
.gantt_grid_data .gantt_row.odd.gantt_selected,
.gantt_task_row.gantt_selected {
    background-color: cyan; 
}
~~~

![grid_row_hover_color](/img/grid_row_hover_color.png)

**Related sample**: [Coloring Grid Rows on Hover](https://snippet.dhtmlx.com/730ig4ck)

### Anpassung der Grid-Spalten {#customizationgridcolumns}

dhtmlxGantt bietet die Möglichkeit, das Standardaussehen der Grid-Spalten über das **template**-Attribut der [**gantt.config.columns**](api/config/columns.md) Konfigurationsoption zu modifizieren.

Das **template**-Attribut ist eine Funktion, die ein Datenobjekt als Parameter übernimmt und die endgültige Datenvorlage zurückgibt. Die Funktionsdefinition ermöglicht es, nahezu jeden Inhalt darzustellen. Zum Beispiel können Sie
die Standardfarbe des Textes in Grid-Reihen ändern oder benutzerdefinierte Elemente in Grid-Spalten verwenden.

#### Textfarbe in Grid-Reihen

Sie können eine spezielle Farbe für den Text der Aufgaben je nach Priorität definieren, wie in:

~~~jsx
gantt.config.columns = [
    { name: "text", label: "Task name", tree: true, width: 230,
        template: gridTaskTextTemplate 
    },
    { name: "start_date", label: "Start time", align: "center" },
    { name: "duration", label: "Duration", align: "center" }
];

function gridTaskTextTemplate (task) {
    const text = `${task.text} (${task.users})`;
    if (task.priority === 1) {
        return `<div class="gantt-grid__text--important">${text}</div>`;
    }
    return text;
}
~~~

![columns_text_color](/img/columns_text_color.png)


**Related sample**: [Template for tree nodes](https://docs.dhtmlx.com/gantt/samples/04_customization/05_tree_template.html)

#### Benutzerdefinierte Elemente in den Grid-Spalten

Um ein benutzerdefiniertes Element, z. B. eine Schaltfläche, ein Eingabefeld usw., in die Grid-Spalten einzufügen, sollten Sie den HTML-Code des Elements als Wert des **template**-Attributs der Spalte setzen:

~~~jsx
function gridColumnTemplate (task) {
    return `
        <i class="fa fa-pencil" onclick="clickGridButton(${task.id}, 'edit')"></i>
        <i class="fa fa-plus" onclick="clickGridButton(${task.id}, 'add')"></i>
        <i class="fa fa-times" onclick="clickGridButton(${task.id}, 'delete')"></i>
    `;
}

gantt.config.columns = [
    { name: "text", tree: true, width: "*", resize: true },
    { name: "start_date", align: "center", resize: true },
    { name: "duration", align: "center" },
    { name: "buttons", width: 75, label: gridColumnHeaderTemplate,
        template: gridColumnTemplate /*!*/
    }
];
~~~

![custom_elements_grid_columns](/img/custom_elements_grid_columns.png)


**Related sample**: [Custom Buttons in a Grid](https://docs.dhtmlx.com/gantt/samples/07_grid/07_custom_buttons.html)


#### Mehrzeiliger Text in Grid-Zellen

Folgen Sie dem im Abschnitt [How to display several lines in the grid cell/header](guides/how-to.md#how-to-display-several-lines-in-the-grid-cellheader) gezeigten Beispiel.

## Styling der Zeitskala (Scale)

Der Stil der Zeitskala wird durch die entsprechenden Vorlagen des Timeline-Bereichs gesteuert.


### Skalenzeile

Sie können die Zeile der Skala mithilfe der [scale_row_class]-Vorlage stylen. Beispielsweise definieren Sie die Hintergrundfarbe:

~~~jsx
<style>
    .gantt-scale__row--highlight {
        background-color: #ffeb8a !important;
    }
</style>
~~~

~~~jsx
gantt.templates.scale_row_class = (scale) => "gantt-scale__row--highlight";
~~~

![color_scale_row](/img/color_scale_row.png)
 
**Related sample**: [Styling Row of the Scale](https://snippet.dhtmlx.com/7ngm6yzk)

### Skalenzellen 

Es ist auch möglich, bestimmte Zellen der Skala über die **scale_cell_class**-Vorlage zu gestalten. Zum Beispiel können Sie bestimmte Tage des Timeline-Bereichs einfärben:

~~~jsx
gantt.templates.scale_cell_class = date =>
    date.getDay() === 0 || date.getDay() === 6 ? "gantt-scale__cell--highlight" : "";
~~~

![styling_scale_cells](/img/styling_scale_cells.png)

**Related sample**: [Styling Separate Cells on the Scale](https://snippet.dhtmlx.com/emdjgwln)

Lesen Sie mehr zu diesem Thema in den verwandten Artikeln: [Setting up Scale](guides/configuring-time-scale.md#styling) und [Highlighting Time Slots](guides/highlighting-time-slots.md).

### Subscale

Sie können einen neuen Stil für eine Skala über das css-Attribut der [scales](api/config/scales.md)-Eigenschaft festlegen. Zum Beispiel können Sie die Wochenenden wie folgt farblich kennzeichnen:

~~~jsx
<style type="text/css">
    .weekend{
        background: #F0DFE5 !important;
    }
</style>
~~~

~~~jsx
const isWeekendStyle = (date) => {
    const day = gantt.date.day_start(date).getDay();
    return (day === 0 || day === 6) ? "gantt-scale__cell--weekend" : "";
};

gantt.config.scales = [
    // other scales
    { unit: "day", format: "%D", css: isWeekendStyle }
];
~~~

![styling_subscale](/img/styling_subscale.png)


**Related sample**: [Multiple scales](https://docs.dhtmlx.com/gantt/samples/03_scales/01_multiple_scales.html)


## Styling der Aufgaben (Tasks)

Sie können das Styling von Aufgaben über die entsprechenden Vorlagen des Timeline-Bereichs ändern.

### Task-Balken

Sie können die [task_class](api/template/task_class.md)-Vorlage neu definieren, um die Stile einer Aufgabe zu aktualisieren. 
Die Details finden Sie im Artikel [Tasks Coloring](guides/colouring-tasks.md#redefiningthetaskstemplate).

~~~jsx
gantt.templates.task_class = (start, end, task) => "";
~~~

![coloring_tasks](/img/coloring_tasks.png)


**Related sample**: [Task styles](https://docs.dhtmlx.com/gantt/samples/04_customization/04_task_styles.html)


Vorlagen ermöglichen es, Stile dynamisch anzuwenden. Beispielsweise können Sie Farben je nach Fortschritt der Aufgabe ändern:

~~~jsx
gantt.templates.task_class = (start, end, task) =>
    task.progress > 0.5 ? "" : "task--low-progress";
~~~

![dynamic_styling](/img/dynamic_styling.png)


**Related sample**: [Styling task bars with events](https://docs.dhtmlx.com/gantt/samples/04_customization/08_templates.html)


### Text der Task-Balken

Die [task_text](api/template/task_text.md)-Vorlage erlaubt die Verwendung von Inline-Stilen, um den Stil des Textes im Task-Balken zu ändern:

~~~jsx
gantt.templates.task_text = (start, end, task) =>
    task.id === 12 ? `<span style="color:red">${task.text}</span>` : task.text;
~~~

![inline_styling_task_text](/img/inline_styling_task_text.png)

**Related sample**: [Inline Styling of the Task Text](https://snippet.dhtmlx.com/us1g45wg)


#### Mehrzeiliger Text

Folgen Sie dem im Abschnitt [How to display several lines in the grid cell/header](guides/how-to.md#how-to-display-several-lines-in-the-grid-cellheader) gezeigten Beispiel.

### Benutzerdefinierte Elemente in Task-Bars

Sie können benutzerdefinierte Elemente auch über die task_text-Vorlage in Task-Bars einfügen. Beispielsweise können Sie Schaltflächen in Task-Bars wie folgt hinzufügen:

~~~jsx
gantt.templates.task_text = (start, end, task) => `${task.text} <button>Text</button>`;  
~~~

![custom_elements_task_bars](/img/custom_elements_task_bars.png)

**Related sample**: [Custom Elements in Task Bars](https://snippet.dhtmlx.com/fahpyr58)

### Stil setzen über Eigenschaften eines Task-Objekts

Sie können dem Task-Objekt weitere Eigenschaften hinzufügen, um eine benutzerdefinierte Farbe für eine Aufgabe festzulegen. Dazu gehören: **color**, **textColor** und **progressColor**.

~~~jsx
const data = {
    tasks: [
        { id: 1, text: "Task #1", start_date: "01-04-2026", duration: 2, color:"red" },
        { id: 2, text: "Task #2", start_date: "02-04-2026", duration: 3, color:"blue" }
    ]
};

gantt.init("gantt_here");
gantt.parse(data);

const task = gantt.getTask(2);
task.color = "red";
~~~

Lesen Sie den entsprechenden Abschnitt des Artikels [Tasks Coloring](guides/colouring-tasks.md#specifyingstyleinthepropertiesofataskobject), um die Details zu erfahren.

### Styling der Task-Bars via das Lightbox

Sie können eine Reihe vordefinierter Farben definieren und diese als Optionen in der Lightbox-Konfiguration festlegen, um die Text- oder Hintergrundfarbe einer Aufgabe festzulegen:

~~~jsx
const colors = [
    { key: "", label: "Default" },
    { key: "#4B0082", label: "Indigo" },
    { key: "#FFFFF0", label: "Ivory" },
    { key: "#F0E68C", label: "Khaki" }
    // more colors
];

gantt.config.lightbox.sections = [
    { name: "description", height: 38, map_to: "text", type: "textarea", focus: true },
    { name: "priority", height: 22, map_to: "color", type: "select", options: colors },
    { name: "textColor", height: 22, map_to: "textColor", type: "select",
        options: colors
    },
    { name: "time", type: "duration", map_to: "auto" }
];
~~~

![task_style_property](/img/task_style_property.png)


**Related sample**: [Specify inline colors for Tasks and Links](https://docs.dhtmlx.com/gantt/samples/04_customization/16_inline_task_colors.html)


### Reihen des Timeline-Bereichs

Das [task_row_class](api/template/task_row_class.md) Template ermöglicht es Ihnen, die Farbe der Reihen des Timeline-Bereichs (die hinter den Gantt-Aufgaben liegen) zu ändern.

~~~jsx
<style>
    .gantt-timeline__row--highlight {
        background-color: #ffeb8a !important;
    }
</style>

gantt.templates.task_row_class = (start, end, task) =>
    task.id === 3 ? "gantt-timeline__row--highlight" : "";
~~~

![styling_timeline_row](/img/styling_timeline_row.png)

**Related sample**: [Styling Rows of the Timeline Area](https://snippet.dhtmlx.com/33jfmwsp)


**Related sample**: [Custom tree formatting](https://docs.dhtmlx.com/gantt/samples/04_customization/02_custom_tree.html)


### Hervorheben von Timeline-Zellen

Sie können die benötigten Timeline-Zellen je nach Wochentag mit der **timeline_cell_class**-Vorlage hervorheben. Die Vorlagenfunktion wird über die Zellen iterieren und die gewünschte CSS-Klasse auf die angegebenen Zellen anwenden. Beispielsweise können Sie Wochenenden wie folgt hervorheben:

~~~jsx
<style>
    .gantt-timeline__cell--weekend {
        background-color: #f4f7f4;
    }
</style>

gantt.templates.timeline_cell_class = (task, date) =>
    (date.getDay() === 0 || date.getDay() === 6) ? "gantt-timeline__cell--weekend" :"";
~~~

![styling_timeline_cells](/img/styling_timeline_cells.png)


**Related sample**: [Highlighting weekends](https://docs.dhtmlx.com/gantt/samples/04_customization/06_highlight_weekend.html)


Lesen Sie mehr zu diesem Thema im Artikel [Highlighting Time Slots](guides/highlighting-time-slots.md).

### Anzeigen externer Elemente (Baselines, Deadlines, usw.)

:::note
Diese Funktionalität ist nur in der PRO-Edition verfügbar.
:::


Sie können zusätzliche Elemente, wie Baselines oder Deadline-Marker, im Gantt anzeigen. Dazu müssen Sie eine neue anzeigbare Schicht über die Methode [addTaskLayer](api/method/addtasklayer.md) erstellen und dort benutzerdefinierte Elemente platzieren.
Als Parameter nimmt die Methode eine Funktion, die ein Task-Objekt erhält und entweder ein DOM-Element zurückgibt, das angezeigt wird, oder *false* (das Element für eine Aufgabe soll ausgeblendet werden):

~~~jsx
gantt.addTaskLayer(function createTaskLayerElement(task) {
    const layerElement = document.createElement('div');
    // your code here
    return layerElement;
});
~~~

Beispiele für externe Elemente sind:

- Baselines

![show_baselines](/img/show_baselines.png)


**Related sample**: [Display baselines](https://docs.dhtmlx.com/gantt/samples/04_customization/15_baselines.html)


- Deadlines

![show_deadlines](/img/show_deadlines.png)


**Related sample**: [Displaying deadlines](https://docs.dhtmlx.com/gantt/samples/04_customization/14_deadline.html)


Lesen Sie mehr über das Anzeigen externer Elemente im Gantt im Artikel [Custom Elements in Timeline Area](guides/baselines.md).

### Tooltips für Aufgaben

Sie können Tooltips für Aufgaben bereitstellen, um deren Details kompakt anzuzeigen.

![default_task_tooltip](/img/default_task_tooltip.png)

Standard-Tooltips werden automatisch für Aufgaben angezeigt, sobald Sie das [tooltip](guides/extensions-list.md#tooltip) Plugin aktivieren. 

#### Benutzerdefinierter Text für Tooltips

Um einen benutzerdefinierten Text für Tooltips festzulegen, verwenden Sie die [tooltip_text](api/template/tooltip_text.md) Vorlage:

~~~jsx
gantt.templates.tooltip_text = (start, end, task) =>
    `<b>Task:</b> ${task.text}<br/><b>Duration:</b> ${task.duration}`;
~~~

Weitere Informationen zu Tooltips in Gantt finden Sie im Artikel [Tooltips for Gantt Elements](guides/tooltips.md).

## Styling von Verknüpfungen (Links)

Sie können den Stil der Abhängigkeitsverknüpfungen über die entsprechenden [Vorlagen der Abhängigkeitsverknüpfungen](guides/dependency-templates.md) ändern.

### Linien der Abhängigkeitsverknüpfungen

Sie können die Farbe der Verknüpfungslinie über die [link_class](api/template/link_class.md) Vorlage ändern.

~~~jsx
gantt.templates.link_class = (link) => "";
~~~

![coloring_links](/img/coloring_links.png)


**Related sample**: [Link styles](https://docs.dhtmlx.com/gantt/samples/04_customization/03_link_styles.html)


Es gibt weitere Informationen im zugehörigen Artikel [Links Coloring and Styling](guides/colouring-lines.md).

### Verfärben von Verknüpfungen über die Eigenschaft eines Link-Objekts

Sie können auch eine benutzerdefinierte Farbe für eine Abhängigkeit-Verknüpfung festlegen, indem Sie die Eigenschaft **color** im Link-Objekt angeben:

~~~jsx
const data = {
    tasks: [
        // tasks configuration
    ],
    links: [
        { id: 1, source: 1, target: 2, type: "1", color: "red" },
        { id: 2, source: 2, target: 3, type: "0", color: "blue" }
    ]
};

gantt.init("gantt_here");
gantt.parse(data);

gantt.getLink(2).color = "blue";
~~~

Lesen Sie den entsprechenden Abschnitt des Artikels [Links Coloring and Styling](guides/colouring-lines.md#specifyingcolorinthepropertiesofthelinkobject), um die Details zu erfahren.

### Linkfarbe beim Hover

Es ist möglich, die Farbe eines Links beim Hover über CSS zu ändern:

~~~css
.gantt_task_link:hover .gantt_line_wrapper div {
    box-shadow: 0 0 5px 0 yellowgreen;
    background: yellowgreen
}

.gantt_task_link:hover .gantt_link_arrow_left,
.gantt_task_link:hover .gantt_link_arrow_right {
    border-left-color: yellowgreen !important;
    border-right-color: yellowgreen !important;
}
~~~

![link_hover_color](/img/link_hover_color.png)

Für weitere Informationen lesen Sie den zugehörigen Artikel [Links Coloring and Styling](guides/colouring-lines.md).

### Popups der Verknüpfungs-Linien

Die [drag_link_class](api/template/drag_link_class.md) Vorlage ermöglicht das Styling des Popups, das erscheint, wenn ein Benutzer beginnt, eine Abhängigkeitslinie zwischen Aufgaben zu ziehen. Beispielsweise können Sie den Hintergrund des Popups färben und die Textfarbe des Popups ändern:

~~~jsx
<style>
    .gantt_link_tooltip {
        color: red;
        background-color: yellow;
    }
</style>

gantt.templates.drag_link_class = (from, from_start, to, to_start) =>
    `gantt_link_tooltip`;
~~~

![styling_link_popup](/img/styling_link_popup.png)

**Related sample**: [Styling the Popup of Dependency Link](https://snippet.dhtmlx.com/7o5f261z)

Weitere Details zum Thema finden Sie im Artikel [Templates of Dependency Links](guides/dependency-templates.md).

### Bearbeiten von Link-Werten über die UI

Obwohl es Lightboxes zum Bearbeiten und Stylen der Aufgabenbalken gibt, gibt es kein integriertes UI zum Bearbeiten von Verknüpfungen. Sie können jedoch eine solche UI selbst erstellen, indem Sie die im
[dedizierten Artikel](guides/crud-dependency.md#editing-link-values-from-ui) beschriebene Technik verwenden.

![link_edit_ui](/img/link_edit_ui.png)

**Related sample**: [Custom UI for Editing Link Values](https://snippet.dhtmlx.com/2208ic0t)

## Styling des Quick Info Popups

Die Stilierung des Quick Info-Popups ist über die [Templates of the 'Quick Info' Extension (Touch Support)](guides/touch-templates.md) Vorlagen definiert.

Sie können das erforderliche Styling auf das Popup-Edit-Formular mithilfe der [quick_info_class](api/template/quick_info_class.md) Vorlage anwenden. Beispielsweise können Sie Quick-Info-Popups für bestimmte Aufgaben wie folgt stylen:

~~~jsx
<style>
    .quick-info-highlight {
        background-color: #ffeb8a !important;
    }
    .quick-info-highlight .gantt_cal_qi_title {
        background-color: #ffeb8a !important;
    }
</style>

gantt.templates.quick_info_class = (start, end, task) =>
    task.id === "2" ? "quick-info-highlight" : "";
~~~

![styling_quick_info](/img/styling_quick_info.png)

**Related sample**: [Styling Quick Info Popup](https://snippet.dhtmlx.com/b92gyqwu)
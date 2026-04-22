---
title: "CSS-Dokumentation"
sidebar_label: "CSS-Dokumentation"
---

# CSS-Dokumentation

Dieser Artikel zeigt Ihnen die Möglichkeiten, die standardmäßigen Farbeinstellungen der Elemente des Gantt-Diagramms mit benutzerdefinierten Farben zu überschreiben. Der Artikel behandelt die Hauptklassen-Selektoren und Templates für das Styling der folgenden Teile des Gantt: [Grid-Bereich](guides/css-overview.md#styling-grid), [Timeline-Bereich](guides/css-overview.md#styling-timeline), [Resource-Panel](guides/css-overview.md#resource-panel).

## Rastergestaltung

In diesem Abschnitt finden Sie CSS-Selektoren zum Styling der Hauptelemente des [Grid-Bereichs](guides/table.md).

![grid_area](/img/grid_area.png)

Die allgemeine Struktur des DOM-Elements des Grids ist unten angegeben:

~~~js
- .gantt_grid
    - .gantt_grid_scale
        - .gantt_grid_head_cell
    - .gantt_grid_data
        - .gantt_row.odd
        - .gantt_row
        - .gantt_row.gantt_row_task
        - .gantt_row.gantt_row_project
        - .gantt_row.gantt_row_milestone
            - gantt_cell.gantt_cell_tree
                - .gantt_tree_indent
                - .gantt_tree_icon.gantt_close
                - .gantt_tree_icon.gantt_open
                - .gantt_tree_content
            - gantt_cell
                - .gantt_tree_content
~~~

### Rasterkopfzeile

Sie können die Gestaltung des Rasterkopfzeilen-Elements über den Klassenselektor `.gantt_grid_scale` ändern.

Hier ist ein Beispiel für die Anwendung von Hintergrund- und Schriftfarbe für die Kopfzeilen des Grids und der Timeline:

~~~css
.gantt_grid_scale, .gantt_task_scale, .gantt_task_vscroll {
    background-color: #eee;
}
.gantt_grid_scale, .gantt_task_scale,
.gantt_task .gantt_task_scale .gantt_scale_cell,
.gantt_grid_scale .gantt_grid_head_cell {
    color: #000;
    font-size: 12px;
    border-bottom: 1px solid #cecece;
}
~~~

![grid_header](/img/grid_header.png)

**Verwandtes Beispiel**: [Styling grid and timeline headers](https://snippet.dhtmlx.com/akr9tz4h)

### Skalenhöhe {#scale_height}

Verändern Sie die Höhe des Rasterkopfs und der Zeitachse nicht über CSS.

Die Höhe der Skala muss über die [scale_height](api/config/scale_height.md) Konfigurations-Eigenschaft von Gantt festgelegt werden:

~~~js
gantt.config.scale_height = 50;
~~~

### Eine Zelle der Rasterkopfzeile {#grid_header_cell}

Sie können einer Zelle der Rasterkopfzeile einen benutzerdefinierten Stil zuweisen über `.gantt_grid_head_cell`.

Die Selektoren zur Stilgebung einer Zelle sind unten angegeben:

- `.gantt_grid_head_cell[data-column-id="columnName"]` – wählt eine Zelle einer bestimmten Spalte aus;

**columnName** entspricht dem Wert der **name** Eigenschaft der [Spalte](guides/specifying-columns.md):

~~~css
<style>
    .gantt_grid_head_cell[data-column-id="columnName"] {
        background-color: #ededed;
        color: black;
    }
</style>
~~~

~~~js
gantt.config.columns = [
    ...
    { name: "columnName", align: "center" },
    ...
];
~~~

![header_cell](/img/header_cell.png)

**Verwandtes Beispiel**: [Styling a particular cell in the grid header](https://snippet.dhtmlx.com/pf5q56kl)

- `.gantt_grid_head_cell[data-column-index="1"]` – wählt eine bestimmte Spalte nach ihrem Index aus;

- `.gantt_grid_head_cell[data-column-name="start_date"]` – wählt eine bestimmte Spalte nach dem Namen aus.

### Rasterkörper

Sie können dem Rasterkörper-Element eine benutzerdefinierte Farbe hinzufügen, indem Sie CSS-Stile auf den Selektor `.gantt_grid_data` anwenden.

![grid_body](/img/grid_body.png)

### Styling der Rasterzeilen {#styling_grid_rows}

Der Stil der Rasterzeile wird über `.gantt_row` angepasst.

![grid_row](/img/grid_row.png)

#### Jede zweite Zeile

Um jede zweite Zeile des Grids zu färben, müssen Sie CSS-Stile für den Selektor `.gantt_row.odd` festlegen, zum Beispiel:

~~~css
.gantt_row.odd {
    background-color: #f4f4fb;
}
~~~

![odd_row_style](/img/odd_row_style.png)

**Verwandtes Beispiel**: [Styling every other row in grid](https://snippet.dhtmlx.com/ayr3sgov)

Sie sehen, dass die geraden Zeilen auf dem Bildschirm hervorgehoben werden statt der ungeraden. Wenn Sie jedoch die [Indexes der Zeilen](api/method/gettaskindex.md) überprüfen, werden Sie sehen, dass der Stil auf Zeilen mit ungeraden Indizes (1, 3, 5 usw.) angewendet wird.

#### Ausgewählte Zeile

Sie können eine ausgewählte Zeile im Grid mithilfe des Selektors `.gantt_row.gantt_selected` stylen:

~~~css
.gantt_grid_data .gantt_row.gantt_selected,
.gantt_grid_data .gantt_row.odd.gantt_selected,
.gantt_task_row.gantt_selected {
    background-color: #fff3a1;
}
~~~

**Verwandtes Beispiel**: [Styling selected row](https://snippet.dhtmlx.com/c177qsgx)

#### Aufgabenzeilen, Projektzeilen und Meilensteine

Um Zeilen von Aufgaben, Projekten oder Meilensteinen zu stylen, verwenden Sie die folgenden Selektoren:

- `.gantt_row.gantt_row_task`
- `.gantt_row.gantt_row_project`
- `.gantt_row.gantt_row_milestone`

Zum Beispiel:

~~~css
.gantt_row.gantt_row_project {
    background-color: #fafafa;
    font-weight: bold;
}
~~~

**Verwandtes Beispiel**: [Styling rows of project tasks](https://snippet.dhtmlx.com/g5oxrq5v)

#### Bestimmte Zeilen

Wenn Sie einer bestimmten Zeile benutzerdefinierte Klassen hinzufügen möchten, können Sie die [grid_row_class](api/template/grid_row_class.md) Vorlage wie folgt verwenden:

~~~css
<style>
    .highlighted_task.gantt_row {
        background-color: #ff9668;
        border-color: rgba(0,0,0,0.3);
    }
</style>
~~~

~~~js {3}
gantt.templates.grid_row_class = (startDate, endDate, task) => {
    if (task.highlight) {
        return "highlighted_task";
    }
    return "";
};
~~~

**Verwandtes Beispiel**: [Styling a particular row in the grid](https://snippet.dhtmlx.com/9o8pbq8z)

#### Zeilenhöhe

Die Höhe der Zeile kann entweder durch die Verwendung der [row_height](api/config/row_height.md) Konfiguration geändert werden:

~~~js
gantt.config.row_height = 40;
~~~

oder über die [row_height](guides/resizing-rows.md#setting-the-row-height) Eigenschaft einer Aufgabe:

~~~js
{ id: 2, text: "Task #1", start_date: "02-04-2028", duration: 8, row_height: 40 },
~~~

Versuchen Sie nicht, die Zeilenhöhe über CSS zu ändern, dies bricht das Layout.

### Styling von Zellen/Spalten des Grids {#styling_grid_cells}

Das Styling von Zellen oder Spalten des Grids kann über `.gantt_row .gantt_cell` implementiert werden.

Sie können CSS-Stile auf eine bestimmte Spalte auf zwei Arten anwenden:

- über den Selektor `.gantt_row .gantt_cell[data-column-name="columnName"]`, der die Spalte nach ihrem Namen definiert, zum Beispiel:

~~~css
.gantt_grid_head_cell[data-column-id="start_date"],
.gantt_row .gantt_cell[data-column-name="start_date"] {
    background-color: #ededed;
    color: black;
}
~~~

**Verwandtes Beispiel**: [Styling a column in grid](https://snippet.dhtmlx.com/hq5q2hpz)

Beachten Sie, dass `.gantt_grid_head_cell` und `.gantt_cell` verschiedene Datenattribute verwenden: `data-column-id` bzw. `data-column-name`. Diese Inkonsistenz in den CSS-Regeln von Gantt wird in einer der zukünftigen Versionen behoben.

- oder Sie können dasselbe Ergebnis erzielen, indem Sie den Selektor `.gantt_row .gantt_cell[data-column-index="1"]` anwenden, der die Spalte nach ihrem Index definiert.

## Styling der Timeline

Der Abschnitt "Styling Timeline" wird Sie durch die CSS-Selektoren führen, die Sie anwenden können, um die Standard-Stile der Elemente des [Timeline-Bereichs](guides/time-scale.md) zu ändern.

![timeline](/img/timeline.png)

Die allgemeine Struktur des DOM-Elements des Timeline-Bereichs wird unten dargestellt:

~~~js
- .gantt_task
    - .gantt_task_scale
        - .gantt_scale_line
            - .gantt_scale_cell
    - .gantt_data_area
        - .gantt_task_bg
            - .gantt_task_row
            - .gantt_task_row.odd
                - .gantt_task_cell
        - .gantt_links_area
            - .gantt_task_link
        - .gantt_bars_area
            - .gantt_task_line
                - .gantt_task_progress_wrapper
                    - .gantt_task_progress
                - .gantt_task_progress_drag
                - .gantt_task_content
                - .gantt_task_drag.task_start_date
                - .gantt_task_drag.task_end_date
                - .gantt_link_control.task_start_date
                - .gantt_link_control.task_end_date
                    - .gantt_link_point
        - div - benutzerdefinierte Ebenen
~~~

### Zeitmaßstab

Das DOM-Element des Zeitmaßstabs hat folgende Struktur:

~~~js
- .gantt_task_scale
    - .gantt_scale_line
        - .gantt_scale_cell
~~~

### Zeitmaßstabs-Container {#time_scale_container}

Der `.gantt_task_scale` Selektor wird verwendet, um benutzerdefiniertes CSS auf den Container des Zeitmaßstabs anzuwenden.

Beispielsweise sieht das Ändern der Schriftfarbe und der Umrandungen des Zeitmaßstabs so aus:

~~~css
.gantt_grid_scale, .gantt_task_scale {
    border-bottom: 1px solid #0e0e0e;
}

.gantt_task .gantt_task_scale .gantt_scale_cell {
    color: #000;
}

.gantt_grid_scale .gantt_grid_head_cell {
    color: #000;
}
~~~

**Verwandtes Beispiel**: [Styling text and borders of the time scale](https://snippet.dhtmlx.com/qt0ttw64)

### Zeitskalen {#time_scales}

Der Selektor `.gantt_scale_line` wird verwendet, um die gesamte Zeitachse zu färben. Um eine bestimmte Zeitstufe nach ihrer Reihenfolge anzusprechen, verwenden Sie einfach den Selektor `.gantt_scale_line:nth-child(n)`.

Ein Beispiel zur Festlegung der Hintergrundfarbe der Zeitachse:

~~~css
.gantt_scale_line:nth-child(1) {
    font-weight: bold;
    background-color: #eee;
}

.gantt_scale_line:nth-child(2) {
    background-color: #fff;
}
~~~

**Verwandtes Beispiel**: [Background color of the time scale](https://snippet.dhtmlx.com/jl1k7kxr)

Standardmäßig gibt es keine CSS-Klassen, um Zeitstufen nach Einheiten zu adressieren, aber Sie können solche Klassen über die Vorlage [scale_row_class](api/template/scale_row_class.md) hinzufügen.

Beispiel zum Festlegen unterschiedlicher Stile für die **Monats-, Wochen- und Tages-Skalen** finden Sie unten:

~~~css
<style>
    .gantt_scale_line.month_scale {
        font-weight: bold;
        background-color: #ddd;
    }

    .gantt_scale_line.week_scale {
        background-color: #e1e1e1;
    }

    .gantt_scale_line.day_scale {
        background-color: #efefef;
    }
</style>
~~~

~~~js
gantt.templates.scale_row_class = (scaleConfig) => `${scaleConfig.unit}_scale`;
~~~

**Verwandtes Beispiel**: [Styling different time scales](https://snippet.dhtmlx.com/g6ogfvvb)

### Zellen der Zeitachse {#timescale_cells}

Sie können den Zellen der Zeitachse eigene Stile hinzufügen, indem Sie den Selektor `.gantt_scale_cell` verwenden.
Beispielsweise können Sie die Schriftfarbe und die Umrandungen der Zellen ändern:

~~~css
.gantt_task .gantt_task_scale .gantt_scale_cell {
    color: #a6a6a6;
    border-right: 1px solid #ebebeb;
}
~~~

**Verwandtes Beispiel**: [Styling text and borders of the scale cells](https://snippet.dhtmlx.com/dcfo1yek)

Um bestimmte Daten zu färben, verwenden Sie die CSS-Eigenschaft des [gantt.config.scales](api/config/scales.md) Objekts, wie unten gezeigt:

~~~js
gantt.config.scales = [
    { unit: "month", step: 1, format: "%Y %M" },
    { unit: "day", step: 1, format: "%l, %F %d", css: (date) => {
        if (!gantt.isWorkTime({ date: date, unit: "day" })) {
            return "weekend";
        }
        return "";
    } }
];
~~~

~~~css
<style>
    .gantt_scale_cell.weekend {
        background-color: #F5F5F5;
    }
</style>
~~~

**Verwandtes Beispiel**: [Duration includes only working days](https://docs.dhtmlx.com/gantt/samples/09_worktime/02_working_days.html)

Wenn Sie die gesamte Spalte färben müssen, verwenden Sie die **timeline_cell_class** Vorlage, wie unten beschrieben.

### Datenbereich

Das DOM-Element des Datenbereichs hat folgende Struktur:

~~~js
- .gantt_data_area
    - .gantt_task_bg
        - .gantt_task_row
        - .gantt_task_row.odd
            - .gantt_task_cell
    - .gantt_links_area
        - .gantt_task_link
    - .gantt_bars_area
        - .gantt_task_line
            - .gantt_task_progress_wrapper
                - .gantt_task_progress
            - .gantt_task_progress_drag
            - .gantt_task_content
            - .gantt_task_drag.task_start_date
            - .gantt_task_drag.task_end_date
            - .gantt_link_control.task_start_date
            - .gantt_link_control.task_end_date
                - .gantt_link_point
    - div - benutzerdefinierte Ebenen
~~~

### Aufgabe {#task}

#### Aufgabenbalken

Um das Aussehen des Aufgabenbalkens zu ändern, sollten Sie einen benutzerdefinierten Stil im Selektor `.gantt_task_line` deklarieren.

Ein Beispiel zur Änderung des Rahmenstils des Balkens ist unten angegeben:

~~~css
.gantt_task_line {
    border-radius: 14px;
}
~~~

**Verwandtes Beispiel**: [Styling borders of the task bars](https://snippet.dhtmlx.com/c24kdh89)

Um die Farbe der Aufgabenbalken zu ändern, müssen Sie die folgenden zwei Schritte ausführen:

1. Überschreiben Sie die Stile der Rahmenlinien und Fortschrittsbalken, damit deren Farben zu jeder benutzerdefinierten Farbe passen, die auf den Balken angewendet wird:

~~~css
.gantt_task_line {
    border-color: rgba(0, 0, 0, 0.25); /* Schwarze Farbe mit 25% Transparenz/Alpha */
}

.gantt_task_line .gantt_task_progress {
    background-color: rgba(0, 0, 0, 0.25);
}
~~~

2. Wenden Sie die notwendige Farbe sowohl auf den Balken als auch auf den Inhalt innerhalb des Balkens an:

~~~css
.gantt_task_line {
    background-color: #03A9F4;
}

.gantt_task_line.gantt_task_content {
    color: #fff;
}
~~~

Sie finden ein Beispiel für das Anwenden einer gemeinsamen Rahmen- und Fortschrittfarbe auf die Aufgabenbalken mit unterschiedlichen Farben im Artikel [Task Coloring](guides/colouring-tasks.md#redefiningthetaskstemplate).

Um Zeilen von [Aufgaben](guides/task-types.md#regular-tasks), [Projekten](guides/task-types.md#project-tasks) oder [Meilensteinen](guides/task-types.md#milestones) zu färben, müssen Sie benutzerdefiniertes CSS zur entsprechenden Klassen-Selektor hinzufügen:

- `.gantt_task_line.gantt_bar_task`
- `.gantt_task_line.gantt_bar_project`
- `.gantt_task_line.gantt_bar_milestone`

Ein Beispiel zum Styling eines ausgewählten Balkens:

~~~css
.gantt_task_line.gantt_selected {
    box-shadow: 0 2px 5px #000;
}

.gantt_task_line.gantt_bar_project.gantt_selected {
    box-shadow: 0 2px 5px #000;
}
~~~

**Verwandtes Beispiel**: [Styling selected bar](https://snippet.dhtmlx.com/9c6w6o78)

Aufgaben eines [benutzerdefinierten Typs](guides/task-types.md#creating-a-custom-type) erhalten den entsprechenden Klassennamen:

~~~js {3}
{ id: 2, text: "Task #1", start_date: "02-04-2028", duration: 8, type: "custom_type" },
~~~

Der Aufgabenbalken erhält die CSS-Klasse `.gantt_task_line.gantt_bar_custom_type`.

#### Geteilte Aufgaben (Split tasks)

[Split tasks](guides/split-tasks.md) sind als Unteraufgaben eines übergeordneten Elements definiert, und der hellgrüne Balken im Hintergrund ist der Balken dieses übergeordneten Elements mit zusätzlichen angewendeten Stilen.

![](/img/split_parent_css.png)

**Verwandtes Beispiel**: [Expand and collapse split tasks](https://docs.dhtmlx.com/gantt/samples/04_customization/21_open_split_task.html)

Wenn Sie das Beispiel öffnen und „Task #2“ erweitern, sehen Sie einen grünen Balken des zusammengefassten Elements „Task #2“.

Wenn Split-Aufgaben in einer einzigen Zeile angezeigt werden, wird dieser grüne Balken immer noch an derselben Position gerendert, jedoch mit modifizierten Opacity- und Z-Index-Werten.

Sie können ihn auf dieselbe Weise stylen, wie Sie es auch bei allen Balken im [Timeline]-Bereich tun können, und ihn vollständig mit dem folgenden CSS ausblenden:

~~~css
.gantt_task_line.gantt_split_parent {
    display: none;
}
~~~

Wenn Sie nur eine einzige Split-Aufgabe haben, wird das Zusammenfassungs-Element (`type: "project"`) unsichtbar, da es vollständig von der Split-Aufgabe überdeckt wird. Falls es keine Split-Unteraufgaben gibt, hat das Zusammenfassungs-Element ein Standarddatum und eine Standarddauer.

#### Fortschrittsbalken

Die folgenden Selektoren können verwendet werden, um den Fortschrittsbalken zu färben:

- `.gantt_task_progress` – zum Ändern der Farbe der Fortschrittsanzeige;
- `.gantt_task_progress_drag` – zum Stylen des Griffs zum Ziehen des Fortschrittsbalkens.

Sie können das Aussehen der Aufgaben- und Fortschrittsbalken durch Anwendung von CSS-Regeln wie folgt ändern:

- ein Beispiel zur Änderung von Hintergrund-, Vordergrund- und Fortschrittsfarben:

~~~css
/* task */

/* Hintergrundfarbe der Aufgabenbalken*/
.gantt_task_line {
    background-color: #3db9d3;
    border: 1px solid #2898b0;
}

/* Textfarbe */
.gantt_task_line .gantt_task_content {
    color: #fff;
}

/* Fortschrittsfüllung */
.gantt_task_progress {
    background: #299cb4;
}
~~~

- ein Beispiel zur Stilgebung von Projekt-(Zusammenfassungs) Balken:

~~~css
/* project */
/* Hintergrundfarbe der Projektbalken*/
.gantt_task_line.gantt_bar_project {
    background-color: #65c16f;
    border: 1px solid #3c9445;
}

/* Fortschritt der Projektbalken */
.gantt_task_line.gantt_bar_project .gantt_task_progress {
    background-color: #46ad51;
}
~~~

- ein Beispiel zur Stilgebung von Meilenstein-Balken:

~~~css
/* milestone */
.gantt_task_line.gantt_milestone {
    background-color: #d33daf;
    border: 0 solid #61164f;
}
~~~

**Verwandtes Beispiel**: [Background, foreground, and progress colors. Styling Project and Milestone bars.](https://snippet.dhtmlx.com/f2rmc1oc)

#### Benutzerdefinierte Farbe für bestimmte Aufgabenbalken

Wenn Sie eine Farbe für bestimmte Aufgabenbalken festlegen möchten, müssen Sie ihnen eine benutzerdefinierte Klasse über das [gantt.templates.task_class](api/template/task_class.md) Template zuweisen:

~~~js
gantt.templates.task_class = (startDate, endDate, task) => {
    if (task.highlight) {
        return "highlighted_task";
    }
    return "";
};
~~~

und diese benutzerdefinierte Klasse im Selektor verwenden:

~~~css
.highlighted_task.gantt_task_line {
    background-color: #ff9668;
    border-color: rgba(0,0,0,0.3);
}

.highlighted_task .gantt_task_progress {
    text-align: center;
    z-index: 0;
    background: rgba(0,0,0,0.3);
}
~~~

**Verwandtes Beispiel**: [Styling particular task bars](https://snippet.dhtmlx.com/yyoe31vo)

#### Hervorhebung von Bereichen innerhalb des Aufgabenbalkens

Wenn Sie einige Bereiche innerhalb des Aufgabenbalkens hervorheben möchten, müssen Sie zusätzliche Elemente in den Balken über das [gantt.templates.task_text](api/template/task_text.md) Template einfügen:

~~~js
gantt.templates.task_text = (startDate, endDate, task) => `
    <div class="custom_progress warm_up" style="width: 20%"></div>
    <div class="custom_progress in_progress" style="width: 60%">${task.text}</div>
    <div class="custom_progress cool_down" style="width: 20%"></div>
`;
~~~

und CSS anwenden:

~~~css
.custom_progress {
    display: inline-block;
    vertical-align: top;
    text-align: center;
    height: 100%;
}

.custom_progress.nearly_done {
    background-color: #4CC259;
}

.custom_progress.in_progress {
    background-color: #88BFF5;
}

.custom_progress.idle {
    background-color: #d96c49;
}
~~~

**Verwandtes Beispiel**: [Custom html content (Stackbar)](https://docs.dhtmlx.com/gantt/samples/04_customization/09_html_content.html)

### Verknüpfung {#link}

Die Struktur des DOM-Elements der Verknüpfung ist unten angegeben:

~~~js
- .gantt_task_link
    - .gantt_line_wrapper
    - .gantt_link_line_right
    - .gantt_link_line_left
    - .gantt_link_line_up
    - .gantt_link_line_down
- .gantt_link_arrow.gantt_link_arrow_right
- .gantt_link_arrow.gantt_link_arrow_left
~~~

Hier ist ein Beispiel, wie Sie die Elemente der Abhängigkeitsverbindungen färben können:

~~~css
.gantt_line_wrapper div {
    background-color: #ffa011;
}
.gantt_link_arrow_right {
    border-left-color: #ffa011;
}
.gantt_link_arrow_left {
    border-right-color: #ffa011;
}
.gantt_task_link:hover .gantt_line_wrapper div {
    box-shadow: 0 0 5px 0 #ffa011;
}
~~~

**Verwandtes Beispiel**: [Styling links](https://snippet.dhtmlx.com/unlr4jbw)

Die Dicke der Verbindungs-Linie wird über die Konfiguration [gantt.config.link_line_width](api/config/link_line_width.md) festgelegt.

### Resizer {#resizer}

Die folgenden Selektoren können angewendet werden, um das DOM-Element des Resizers zu stylen:

- `.gantt_task_drag`
- `.gantt_task_drag.task_start_date`
- `.gantt_task_drag.task_end_date`

Ein Beispiel zum Deaktivieren des Resizers des Startdatums:

~~~css
.gantt_task_line:hover .gantt_task_drag.task_start_date {
    display: none;
}
~~~

**Verwandtes Beispiel**: [Disabling resizer of the start date](https://snippet.dhtmlx.com/x8lpcu2d)

Ein Beispiel zum Deaktivieren des Resizers des Enddatums:

~~~css
.gantt_task_line:hover .gantt_task_drag.task_end_date {
    display: none;
}
~~~

**Verwandtes Beispiel**: [Disabling resizer of the end date](https://snippet.dhtmlx.com/9gtsg4s8)

### Verknüpfungssteuerung {#link_control}

Die folgenden Selektoren können verwendet werden, um Stile auf das Element des runden Griffs am Anfang (Ende) der Aufgabe anzuwenden:

- `.gantt_link_control .gantt_link_point`
- `.gantt_link_control.task_start_date .gantt_link_point`
- `.gantt_link_control.task_end_date .gantt_link_point`

### Hintergrund-Raster {#background_grid}

Die Struktur des DOM-Elements des Hintergrund-Rasters sieht wie folgt aus:

~~~js
- .gantt_data_area
    - .gantt_task_bg
        - .gantt_task_row
        - .gantt_task_row.odd
            - .gantt_task_cell
~~~

#### Hintergrundzeilen:

Um die Standardstil-Einstellungen der Hintergrundzeilen zu ändern, müssen Sie dem Selektor `.gantt_task_row` einen benutzerdefinierten Stil hinzufügen. Zum Beispiel:

~~~css
.gantt_row,
.gantt_task_row {
    border-bottom: 1px solid #ebebeb;
    background-color: #fff;
}
~~~

Um jede zweite Hintergrundzeile zu färben, sollten Sie benutzerdefinierte CSS-Eigenschaften im Selektor `.gantt_task_row.odd` definieren.

Sie können einfach benutzerdefinierte Farben für die ausgewählte Zeile festlegen, zum Beispiel:

~~~css
.gantt_grid_data .gantt_row.gantt_selected,
.gantt_grid_data .gantt_row.odd.gantt_selected,
.gantt_task_row.gantt_selected {
    background-color: #fff3a1;
}
.gantt_task_row.gantt_selected .gantt_task_cell {
    border-right-color: #ffec6e;
}
~~~

**Verwandtes Beispiel**: [Styling selected row](https://snippet.dhtmlx.com/y393xnmv)

#### Hintergrundzellen

Um die Standardeinstellungen der Hintergrundzellen zu ändern, sollten Sie einen benutzerdefinierten Stil im Selektor `.gantt_task_cell` festlegen.

Um die Hintergrundspalten zu färben, verwenden Sie die Vorlage [timeline_cell_class](api/template/timeline_cell_class.md):

~~~js
gantt.templates.timeline_cell_class = (task, date) => {
    if (!gantt.isWorkTime({ date: date, unit: "day", task: task })) {
        return "weekend";
    }
    return "";
};
~~~

und CSS anwenden:

~~~css
.gantt_task_cell.weekend {
    background-color: #F5F5F5;
}

.gantt_task_row.gantt_selected .gantt_task_cell.weekend {
    background-color: #F8EC9C;
}
~~~

**Verwandtes Beispiel**: [Duration includes only working days](https://docs.dhtmlx.com/gantt/samples/09_worktime/02_working_days.html)

## Ressourcenbereich

Der [Ressourcenbereich](guides/resource-management.md#resourceviewpanel) besteht aus Grids und Timelines, ähnlich dem Haupt-Gantt-Bereich.

Standardmäßig verwenden Grids und Timelines der Ressourcenansicht globale Templates und Konfigurationen. Sie können unterschiedliche Konfigurationen und Templates für den Ressourcenbereich verwenden, indem Sie diese in die [layout config](guides/layout-config.md#configs-and-templates-of-views) übergeben.

Sie können das Ressourcen-Grid und die Ressourcen-Timeline anhand des entsprechenden View-Namens im CSS-Selektor anvisieren:

~~~css
.resourceGrid_cell .gantt_row,
.resourceHistogram_cell .gantt_task_row {
    border-bottom: 1px solid #ebebeb;
    background-color: #fff;
}
~~~

Die allgemeine Struktur des DOM-Elements des Ressourcenbereichs sieht unten so aus:

~~~js
- .gantt_layout_root
    - .grid_cell
    - .timeline_cell
    - .resourceGrid_cell
    - .resourceHistogram_cell
    - .resourceTimeline_cell
~~~

Die Namen der Klassen unter `.gantt_layout_root` stammen aus der Layout-Konfiguration und stimmen mit dem Wert der Eigenschaft **view** einer Layout-Zelle überein:

~~~js {6,14,16}
gantt.config.layout = {
    css: "gantt_container",
    rows: [
        {
            cols: [
                { view: "grid", group: "grids", scrollY: "scrollVer" },
                ...
            ]
        },
        ...
        {
            id: "resources",
            cols: [
                { view: "resourceGrid", group: "grids", scrollY: "resourceVScroll" },
                ...
                { view: "resourceHistogram", capacity: 24, scrollX: "scrollHor",
                    scrollY: "resourceVScroll" },
                ...
            ]
        },
        ...
    ]
};
~~~

### Ressourcengrid {#resource_grid}

![resource_grid](/img/resource_grid.png)

Sie können dieselben Selektoren wie beim Aufgaben-Grid verwenden, der oberste Selektor ist `.resourceGrid_cell`:

~~~css
.resourceGrid_cell .gantt_row,
.resourceGrid_cell .gantt_row.odd {
    background-color: rgba(232, 232, 232, 0.6);
}
~~~

### Ressourcenhistogramm {#resource_histogram}

![resource_histogram_css](/img/resource_histogram_css.png)

Das Ressourcenhistogramm hat die gleichen Elemente wie die Haupt-Timeline. Standardmäßig zielen alle Selektoren, die auf die Haupt-Timeline abzielen, auch auf die Ressourcen-Timeline ab, sofern Sie nicht die Layout-Zellenklasse (`.timeline_cell`, `.resourceHistogram_cell`) in Ihren Selektoren verwenden.

Sie können das Ressourcenhistogramm mit dem folgenden Selektor anvisieren: `.resourceHistogram_cell`.

Die allgemeine Struktur des DOM-Elements des Ressourcenhistogramms:

~~~js
- .gantt_task_bg
- .gantt_bars_area
    - div
        - .gantt_histogram_fill
        - .gantt_histogram_cell
    - div
        - .gantt_histogram_hor_bar
        - .gantt_histogram_vert_bar
~~~

Ein Beispiel zur Änderung der Farbe der Histogramm-Elemente:

~~~css
.gantt_histogram_cell {
    color: #000;
}

.gantt_histogram_label {
    font-weight: 700;
    font-size: 13px;
}

.gantt_histogram_fill {
    background-color: rgba(41,157,180,.2);
}
~~~

Um die Farbe bestimmter Zellen zu ändern, verwenden Sie die [gantt.templates.histogram_cell_class](api/template/histogram_cell_class.md) Vorlage:

~~~js
gantt.templates.histogram_cell_class = (startDate, endDate, resource, resourceTasks) => {
    if (getAllocatedValue(resourceTasks, resource) > getCapacity(startDate, resource)) {
        return "column_overload";
    }
};
~~~

und CSS anwenden:

~~~css
.column_overload .gantt_histogram_fill {
    background-color: #ffa9a9;
}
~~~

Um die Histogramm-Linie zu färben, können Sie benutzerdefinierte CSS auf die folgenden Klassen-Selektoren anwenden:

- `.gantt_histogram_hor_bar`
- `.gantt_histogram_vert_bar`

Die Farbe der Histogramm-Linie ändern Sie so:

~~~css
.gantt_histogram_hor_bar, .gantt_histogram_vert_bar {
    background: #299db4;
}
~~~

### Ressourcen-Diagramm {#resource_diagram}

![resource_diagram](/img/resource_diagram.png)

Das Ressourcen-Diagramm hat dieselben Elemente wie die Haupttimeline. Standardmäßig zielen alle Selektoren, die auf die Haupttimeline abzielen, auch auf die Ressourcen-Timeline ab, sofern Sie nicht die Layout-Zellenklasse (`.timeline_cell`, `.resourceTimeline_cell`) in Ihren Selektoren verwenden.

Sie können das Ressourcen-Diagramm mit dem folgenden Selektor anvisieren: `.resourceTimeline_cell`.

Die allgemeine Struktur des DOM-Elements des Ressourcen-Diagramms:

~~~js
- .gantt_task_bg
- .gantt_bars_area
    - div
        - .gantt_resource_marker
            - div
~~~

Der oberste Selektor ist `.resourceTimeline_cell`.

Beispiel für Style der Beschriftungen des Ressourcen-Diagramms:

~~~css
.gantt_resource_marker div {
    background: #51c185;
    width: 28px;
    height: 28px;
    line-height: 29px;
    display: inline-block;
    color: #FFF;
    margin: 3px;
}
~~~

Um Styles bestimmter Marker zu ändern, verwenden Sie die [gantt.templates.resource_cell_class](api/template/resource_cell_class.md) Vorlage:

~~~css
<style>
    .resource_marker.workday_over div {
        border-radius: 3px;
        background: #ff8686;
    }
~~~

~~~js
gantt.templates.resource_cell_class = (startDate, endDate, resource, resourceTasks) => {
    const cssClasses = [];
    cssClasses.push("resource_marker");
    if (resourceTasks.length <= 1) {
        cssClasses.push("workday_ok");
    } else {
        cssClasses.push("workday_over");
    }
    return cssClasses.join(" ");
};
~~~
---
title: "CSS Dokumentation"
sidebar_label: "CSS Dokumentation"
---

# CSS Dokumentation


Dieser Artikel erklärt, wie Sie die Standardfarbeinstellungen der Gantt-Diagramm-Elemente mit eigenen benutzerdefinierten Stilen überschreiben können. Er behandelt die wichtigsten Klassenselektoren und Templates zum Stylen verschiedener Bereiche des Gantt-Diagramms: des [Gitterbereichs](guides/css-overview.md#stylinggrid), des [Zeitachsenbereichs](guides/css-overview.md#stylingtimeline) und des [Ressourcenpanels](guides/css-overview.md#resourcepanel).

## Styling des Gitters {#stylinggrid}


Hier finden Sie die CSS-Selektoren, die verwendet werden, um die Hauptelemente des [Gitterbereichs](guides/table.md) zu gestalten.

![grid_area](/img/grid_area.png)

Die DOM-Struktur des Gitterelements sieht folgendermaßen aus:

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

<h3 id="grid_header"><b>Gitterkopfzeile</b></h3>

Der Stil der Gitterkopfzeile kann mit dem Klassenselektor **.gantt_grid_scale** angepasst werden.

Hier ein Beispiel, wie Sie einen gemeinsamen Hintergrund und Schriftfarbe für die Kopfzeilen von Gitter und Zeitachse setzen:

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

**Related example:** [Styling grid and timeline headers](https://snippet.dhtmlx.com/akr9tz4h)

### Skalenhöhe {#scale_height}

Vermeiden Sie es, die Höhe der Gitterkopfzeile und der Zeitskala per CSS zu ändern.

Stellen Sie stattdessen die Skalenhöhe über die [scale_height](api/config/scale_height.md) Konfigurationseigenschaft von Gantt ein:

~~~js
gantt.config.scale_height = 50;
~~~

### Eine Zelle der Gitterkopfzeile {#grid_header_cell}

Um eine Zelle in der Gitterkopfzeile zu gestalten, verwenden Sie den Selektor **.gantt_grid_head_cell**.

Selektoren, um eine Zelle gezielt anzusprechen, sind:

- **.gantt_grid_head_cell[data-column-id='columnName']** - wählt eine Zelle in einer bestimmten Spalte aus;

Hierbei entspricht **columnName** der **name**-Eigenschaft der [Spalte](guides/specifying-columns.md):

~~~css
<style>
    .gantt_grid_head_cell[data-column-id='columnName'] {
        background-color: #ededed;
        color:black;
    }
</style>
~~~

~~~js
gantt.config.columns = [
    ...
    {name: "columnName", align: "center"},
    ...
];
~~~

![header_cell](/img/header_cell.png)

**Related example:** [Styling a particular cell in the grid header](https://snippet.dhtmlx.com/pf5q56kl)

- **.gantt_grid_head_cell[data-column-index='1']** - wählt eine Spalte anhand ihres Index aus;

- **.gantt_grid_head_cell[data-column-name='start_date']** - wählt eine Spalte anhand ihres Namens aus.

<h3 id="grid_body"><b>Gitterkörper</b></h3>

Sie können die Farbe des Gitterkörpers anpassen, indem Sie CSS-Stile auf den Selektor **.gantt_grid_data** anwenden.

![grid_body](/img/grid_body.png)

### Styling der Gitterzeilen {#styling_grid_rows}

Der Stil der Gitterzeilen kann mit dem Selektor **.gantt_row** geändert werden.

![grid_row](/img/grid_row.png)

#### Jede zweite Zeile

Um abwechselnde Zeilen zu gestalten, wenden Sie CSS auf den Selektor **.gantt_row.odd** an, zum Beispiel:

~~~css
.gantt_row.odd{
    background-color:#f4f4fb;
}
~~~

![odd_row_style](/img/odd_row_style.png)

**Related example:** [Styling every other row in grid](https://snippet.dhtmlx.com/ayr3sgov)

Obwohl die geraden Zeilen auf dem Bildschirm hervorgehoben erscheinen, wird der Stil auf Zeilen mit ungeraden Indizes (1, 3, 5 usw.) angewendet, wie in den [Zeilenindizes](api/method/gettaskindex.md) dargestellt.

#### Ausgewählte Zeile

Um eine ausgewählte Zeile im Gitter zu gestalten, verwenden Sie den Selektor **.gantt_row.gantt_selected**:

~~~css
.gantt_grid_data .gantt_row.gantt_selected,
.gantt_grid_data .gantt_row.odd.gantt_selected,
.gantt_task_row.gantt_selected {
    background-color: #fff3a1;
}
~~~

**Related example:** [Styling selected row](https://snippet.dhtmlx.com/c177qsgx)

#### Aufgaben-, Projekt- und Meilensteinzeilen

Zeilen, die Aufgaben, Projekte oder Meilensteine darstellen, können mit diesen Selektoren gestaltet werden:

- **.gantt_row.gantt_row_task**
- **.gantt_row.gantt_row_project**
- **.gantt_row.gantt_row_milestone**

Zum Beispiel:

~~~css
.gantt_row.gantt_row_project{
   background-color:#fafafa;
   font-weight: bold;
}
~~~

**Related example:** [Styling rows of project tasks](https://snippet.dhtmlx.com/g5oxrq5v)

#### Bestimmte Zeilen

Um benutzerdefinierte Klassen zu bestimmten Zeilen hinzuzufügen, verwenden Sie das [grid_row_class](api/template/grid_row_class.md) Template wie folgt:

~~~css
<style>
    .highlighted_task.gantt_row { 
        background-color: #ff9668;
        border-color: rgba(0,0,0,0.3);
    }    
</style>
~~~

~~~js
gantt.templates.grid_row_class = function(start, end, task){
    if(task.highlight){
        return "highlighted_task"; /*!*/
    }
    return "";
};
~~~

**Related example:** [Styling a particular row in the grid](https://snippet.dhtmlx.com/9o8pbq8z)

#### Zeilenhöhe

Die Zeilenhöhe kann entweder durch Setzen der [row_height](api/config/row_height.md) Konfiguration angepasst werden:

~~~js
gantt.config.row_height = 40;
~~~

oder durch die Angabe der [row_height](guides/resizing-rows.md#settingtherowheight) Eigenschaft für eine Aufgabe:

~~~js
{ id: 2, text: "Task #1", start_date: "02-04-2018", 
    duration: 8, row_height:40, parent: 1 },
~~~

Vermeiden Sie es, die Zeilenhöhe per CSS zu ändern, da dies das Layout beschädigen kann.

### Styling der Zellen/Spalten des Gitters {#styling_grid_cells}

Zellen oder Spalten des Gitters können über **.gantt_row .gantt_cell** gestaltet werden.

Um eine bestimmte Spalte zu stylen, können Sie verwenden:

- **.gantt_row .gantt_cell[data-column-name='columnName']** - spricht die Spalte anhand des Namens an, zum Beispiel:

~~~css
.gantt_grid_head_cell[data-column-id='start_date'],
.gantt_row .gantt_cell[data-column-name='start_date'] {
    background-color: #ededed;
    color:black;
}
~~~

**Related example:** [Styling a column in grid](https://snippet.dhtmlx.com/hq5q2hpz)

Beachten Sie, dass **.gantt_grid_head_cell** und **.gantt_cell** unterschiedliche Datenattribute verwenden: `data-column-id` bzw. `data-column-name`. Diese Inkonsistenz wird in einer zukünftigen Version behoben.

- Alternativ können Sie **.gantt_row .gantt_cell[data-column-index='1']** verwenden, um eine Spalte anhand ihres Index anzusprechen.

## Styling der Zeitachse {#stylingtimeline}


In diesem Abschnitt werden die CSS-Selektoren beschrieben, die zum Anpassen der Standardstile von Elementen im [Zeitachsenbereich](guides/time-scale.md) verfügbar sind.

![timeline](/img/timeline.png)

Die DOM-Struktur des Zeitachsenbereichs ist wie folgt:

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
        - div - custom layers
~~~

<h3 id="time_scale"><b>Zeitskala</b></h3>

Die DOM-Struktur der Zeitskala ist:

~~~js
- .gantt_task_scale
    - .gantt_scale_line
        - .gantt_scale_cell
~~~

### Zeitskalen-Container {#time_scale_container}

Der Selektor **.gantt_task_scale** spricht den Container der Zeitskala an.

Zum Beispiel, um Schriftfarbe und Rahmen der Zeitskala zu ändern:

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

**Related example:** [Styling text and borders of the time scale](https://snippet.dhtmlx.com/qt0ttw64)


### Zeitskalen {#time_scales}

Verwenden Sie den Selektor **.gantt_scale_line**, um die gesamte Zeitskala zu gestalten. Um eine bestimmte Zeitskala anhand ihrer Position anzusprechen, verwenden Sie **.gantt_scale_line:nth-child(n)**.

Zum Beispiel, um verschiedene Hintergrundfarben für unterschiedliche Skalen zu setzen:

~~~css
.gantt_scale_line:nth-child(1){
    font-weight:bold;
    background-color:#eee;
}
.gantt_scale_line:nth-child(2){
    background-color:#fff;
}
~~~

**Related example:** [Background color of the time scale](https://snippet.dhtmlx.com/jl1k7kxr)

Standardmäßig gibt es keine CSS-Klassen, um Zeitskalen anhand ihrer Einheiten anzusprechen, aber Sie können diese Klassen mit dem [scale_row_class](api/template/scale_row_class.md) Template hinzufügen.

So gestalten Sie verschiedene Skalen wie **month**, **week** und **day**:

~~~css
<style>
    .gantt_scale_line.month_scale{
        font-weight:bold;
        background-color:#ddd;
    }
    .gantt_scale_line.week_scale{
        background-color:#e1e1e1;
    }  
  
    .gantt_scale_line.day_scale{
        background-color:#efefef;
    }
</style>
~~~

~~~js
gantt.templates.scale_row_class = function(scale){
    return scale.unit + "_scale";
};
~~~

**Related example:** [Styling different time scales](https://snippet.dhtmlx.com/g6ogfvvb)

### Zellen der Zeitskala {#timescale_cells}

Sie können einzelne Zellen der Zeitskala mit dem Selektor **.gantt_scale_cell** gestalten.

Zum Beispiel, um Schriftfarbe und Rahmen zu ändern:

~~~css
.gantt_task .gantt_task_scale .gantt_scale_cell {
    color: #a6a6a6;
    border-right: 1px solid #ebebeb;
}
~~~

**Related example:** [Styling text and borders of the scale cells](https://snippet.dhtmlx.com/dcfo1yek)

Um [bestimmte Daten hervorzuheben](guides/configuring-time-scale.md#styling) in der Zeitskala, verwenden Sie die **css**-Eigenschaft des [gantt.config.scales](api/config/scales.md) Objekts wie folgt:

~~~js
gantt.config.scales = [
    {unit: "month", step: 1, format: "%Y %M"},
    {unit: "day", step: 1, format: "%l, %F %d", css: function(date){
        if(!gantt.isWorkTime({date: date, unit: "day"})){
            return "weekend";
        }
        return "";
    }}
];
~~~

~~~css
<style>
    .gantt_scale_cell.weekend {
        background-color: #F5F5F5;
    }
</style>
~~~


[Duration includes only working days](https://docs.dhtmlx.com/gantt/samples/09_worktime/02_working_days.html)


Wenn Sie eine ganze Spalte einfärben möchten, verwenden Sie das Template **timeline_cell_class**, das später beschrieben wird.

<h3 id="data_area"><b>Datenbereich</b></h3>

Die DOM-Struktur des Datenbereichs ist:

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
    - div - custom layers
~~~

### Aufgabe {#task}


#### Taskleiste

Um das Aussehen der Taskleiste anzupassen, definieren Sie Ihren eigenen Stil im **.gantt_task_line**-Selektor.

Hier ein Beispiel, das den Rahmenstil der Leiste ändert:

~~~css
.gantt_task_line {
    border-radius: 14px;
}
~~~

**Related example:** [Styling borders of the task bars](https://snippet.dhtmlx.com/c24kdh89)


Um die Farbe der Taskleisten anzupassen, gehen Sie wie folgt vor:

1. Überschreiben Sie die Stile für Rahmen und Fortschrittsbalken, sodass deren Farben zu den benutzerdefinierten Farben der Taskleiste passen:

~~~css
.gantt_task_line{
    border-color: rgba(0, 0, 0, 0.25); /* Schwarze Farbe mit 25% Transparenz */
}
.gantt_task_line .gantt_task_progress {
    background-color: rgba(0, 0, 0, 0.25);
}
~~~

2. Legen Sie die gewünschte Farbe für die Taskleiste und deren Inhalt fest:

~~~css
.gantt_task_line{
    background-color: #03A9F4;
}
.gantt_task_line.gantt_task_content {
    color: #fff;
}
~~~

Ein Beispiel, wie passende Farben für Rahmen und Fortschrittsbalken bei Taskleisten mit unterschiedlichen Farben angewendet werden können, finden Sie im Artikel [Task Coloring](guides/colouring-tasks.md#redefiningthetaskstemplate).


Um Zeilen für [Tasks](guides/task-types.md#regulartasks), [Projekte](guides/task-types.md#projecttasks) oder [Meilensteine](guides/task-types.md#milestones) einzufärben, fügen Sie benutzerdefiniertes CSS für die entsprechenden Klassen-Selektoren hinzu:

- **.gantt_task_line.gantt_bar_task**
- **.gantt_task_line.gantt_bar_project**
- **.gantt_task_line.gantt_bar_milestone**

Hier ein Beispiel für das Styling einer ausgewählten Leiste:

~~~css
.gantt_task_line.gantt_selected {
    box-shadow: 0 2px 5px #000;
}

.gantt_task_line.gantt_bar_project.gantt_selected {
    box-shadow: 0 2px 5px #000;
}
~~~

**Related example:** [Styling selected bar](https://snippet.dhtmlx.com/9c6w6o78)

Tasks eines [benutzerdefinierten Typs](guides/task-types.md#creatingacustomtype) erhalten einen Klassennamen, der diesen Typ widerspiegelt:

~~~js
{ 
    id: 2, text: "Task #1", start_date: "02-04-2018", duration: 8, 
    type:"custom_type", parent: 1 /*!*/
},
~~~

Dies entspricht dem Selektor **.gantt_task_line.gantt_bar_custom_type**.

#### Geteilte Tasks

[Geteilte Tasks](guides/split-tasks.md) sind Unteraufgaben eines übergeordneten Elements. Der hellgrüne Balken im Hintergrund stellt den Balken des übergeordneten Elements dar und ist anders gestylt.

![](/img/split_parent_css.png)


[Expand and collapse split tasks](https://docs.dhtmlx.com/gantt/samples/04_customization/21_open_split_task.html)


Wenn Sie [das Beispiel](https://docs.dhtmlx.com/gantt/samples/) öffnen und „Task #2" erweitern, sehen Sie den grünen Balken des „Task #2"-Summenelements.

Wenn geteilte Tasks in einer einzigen Zeile erscheinen, bleibt dieser grüne Balken an derselben Position, jedoch mit angepasster Transparenz und z-index.

Sie können ihn wie jeden anderen Balken in der [Zeitleiste](guides/css-overview.md#stylingtimeline) stylen oder komplett mit folgendem CSS ausblenden:

~~~css
.gantt_task_line.gantt_split_parent {
    display: none;
}
~~~


Wenn es nur einen geteilten Task gibt, wird das Summenelement (type="„project")" unsichtbar, da es vollständig vom geteilten Task überdeckt wird. Existieren keine geteilten Unteraufgaben, behält das Summenelement ein Standarddatum und eine Standarddauer.

#### Fortschrittsbalken

Verwenden Sie diese Selektoren, um den Fortschrittsbalken zu stylen:

- **.gantt_task_progress** - zum Ändern der Füllfarbe des Fortschrittsbalkens;
- **.gantt_task_progress_drag** - zum Stylen des Ziehgriffs des Fortschrittsbalkens.

Hier einige Beispiele zur Anpassung von Task- und Fortschrittsbalken mit CSS:

- Hintergrund, Text und Fortschrittsfarben ändern:

~~~css
/* task */

/* Hintergrundfarbe der Taskleisten */
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

- Styling von Projekt-(Summary-)Balken:

~~~css
/* project */
/* Hintergrundfarbe der Projektbalken */
.gantt_task_line.gantt_bar_project {
    background-color: #65c16f;
    border: 1px solid #3c9445;
}

/* Fortschritt der Projektbalken */
.gantt_task_line.gantt_bar_project .gantt_task_progress {
    background-color: #46ad51;
}
~~~

- Styling von Meilenstein-Balken:

~~~css
/* milestone */
.gantt_task_line.gantt_milestone {
    background-color: #d33daf;
    border: 0 solid #61164f;
}
~~~

**Related example:** [Background, foreground, and progress colors. Styling Project and Milestone bars.](https://snippet.dhtmlx.com/f2rmc1oc)

#### Benutzerdefinierte Farbe für bestimmte Taskleisten

Um bestimmten Taskleisten Farben zuzuweisen, fügen Sie eine benutzerdefinierte Klasse über das Template [gantt.templates.task_class](api/template/task_class.md) hinzu:

~~~js
gantt.templates.task_class = function(start, end, task){
    if(task.highlight){
        return "highlighted_task";
    }
    return "";
};
~~~

Stylen Sie diese Klasse dann im CSS:

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

**Related example:** [Styling particular task bars](https://snippet.dhtmlx.com/yyoe31vo)

#### Bereich innerhalb der Taskleiste hervorheben

Um bestimmte Bereiche innerhalb einer Taskleiste hervorzuheben, fügen Sie mit dem Template [gantt.templates.task_text](api/template/task_text.md) zusätzliche Elemente in die Leiste ein:

~~~js
gantt.templates.task_text = function(start, end, task){
    return '<div class="custom_progress warm_up" style="width:20%"></div>' +
      '<div class="custom_progress in_progress" style="width:60%">'+task.text+'</div>'
      '<div class="custom_progress cool_down" style="width:20%"></div>';
};
~~~

Definieren Sie anschließend die Stile für diese Elemente:

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


[Custom html content (Stackbar)](https://docs.dhtmlx.com/gantt/samples/04_customization/09_html_content.html)


### Verbindung {#link}

Die DOM-Struktur einer Verbindung sieht folgendermaßen aus:

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

Hier ein Beispiel, wie Sie die Elemente der Abhängigkeitsverbindung einfärben können:

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

**Related example:** [Styling links](https://snippet.dhtmlx.com/unlr4jbw)

Die Dicke der Verbindungslinie wird über die Einstellung [gantt.config.link_line_width](api/config/link_line_width.md) gesteuert.

## Resizer {#.resizer}

Diese Selektoren richten sich an die Resizer-Elemente:

- **.gantt_task_drag**
- **.gantt_task_drag.task_start_date**
- **.gantt_task_drag.task_end_date**

Um den Resizer für das Startdatum zu deaktivieren, verwenden Sie:

~~~css
.gantt_task_line:hover .gantt_task_drag.task_start_date{
    display: none;
}
~~~

**Related example:** [Disabling resizer of the start date](https://snippet.dhtmlx.com/x8lpcu2d)

Um den Resizer für das Enddatum zu deaktivieren, verwenden Sie:

~~~css
.gantt_task_line:hover .gantt_task_drag.task_end_date{
    display: none;
}
~~~

**Related example:** [Disabling resizer of the end date](https://snippet.dhtmlx.com/9gtsg4s8)

### Verbindungssteuerung {#link_control}

Verwenden Sie diese Selektoren, um die runden Handle-Elemente am Anfang oder Ende eines Tasks zu stylen:

- **.gantt_link_control .gantt_link_point**
- **.gantt_link_control.task_start_date .gantt_link_point**
- **.gantt_link_control.task_end_date .gantt_link_point**

### Hintergrundraster {#background_grid}

Die DOM-Struktur des Hintergrundrasters ist wie folgt:

~~~js
- .gantt_data_area
    - .gantt_task_bg
        - .gantt_task_row
        - .gantt_task_row.odd
            - .gantt_task_cell
~~~


#### Hintergrundzeilen:

Um den Standardstil der Hintergrundzeilen anzupassen, fügen Sie eigene Stile zum **.gantt_task_row**-Selektor hinzu. Zum Beispiel:

~~~css
.gantt_row,
.gantt_task_row {
    border-bottom: 1px solid #ebebeb;
    background-color: #fff;
}
~~~

Um jede zweite Hintergrundzeile unterschiedlich einzufärben, definieren Sie benutzerdefinierte Stile im **.gantt_task_row.odd**-Selektor.

Sie können auch Stile für ausgewählte Zeilen wie folgt festlegen:

~~~css
.gantt_grid_data .gantt_row.gantt_selected,
.gantt_grid_data .gantt_row.odd.gantt_selected,
.gantt_task_row.gantt_selected {
    background-color: #fff3a1;
}
.gantt_task_row.gantt_selected .gantt_task_cell{
    border-right-color: #ffec6e;
}
~~~

**Related example:** [Styling selected row](https://snippet.dhtmlx.com/y393xnmv)

#### Hintergrundzellen

Um den Standardstil der Hintergrundzellen anzupassen, definieren Sie einen benutzerdefinierten Stil mit dem **.gantt_task_cell**-Selektor.

Zum Einfärben von Hintergrundspalten verwenden Sie das [timeline_cell_class](api/template/timeline_cell_class.md) Template:

~~~js
gantt.templates.timeline_cell_class = function (task, date) {
    if(!gantt.isWorkTime({date: date, unit: "day", task: task})){
        return "weekend";
    }
    return "";
};
~~~

Anschließend wenden Sie folgendes CSS an:

~~~css
.gantt_task_cell.weekend {
    background-color: #F5F5F5;
}

.gantt_task_row.gantt_selected .gantt_task_cell.weekend {
    background-color: #F8EC9C;
}
~~~


[Duration includes only working days](https://docs.dhtmlx.com/gantt/samples/09_worktime/02_working_days.html)


## Ressourcen-Panel {#resourcepanel}


Das [Ressourcen-Panel](guides/resource-management.md#resourceviewpanel) enthält Grids und Zeitachsen, ähnlich wie im Hauptbereich von Gantt.

Standardmäßig verwenden die Grids und Zeitachsen in der Ressourcenansicht globale Templates und Konfigurationen. Sie können jedoch spezifische Templates und Konfigurationen für das Ressourcen-Panel zuweisen, indem Sie diese in der [layout config](guides/layout-config.md#configsandtemplatesofviews) übergeben.

Um das Ressourcen-Grid und die Zeitachse zu stylen, verwenden Sie CSS-Selektoren, die auf die entsprechenden View-Namen abzielen:

~~~css
.resourceGrid_cell .gantt_row,
.resourceHistogram_cell .gantt_task_row {
    border-bottom: 1px solid #ebebeb;
    background-color: #fff;
}
~~~

Die DOM-Struktur des Ressourcen-Panels sieht folgendermaßen aus:

~~~js
- .gantt_layout_root
    - .grid_cell 
    - .timeline_cell 
    - .resourceGrid_cell 
    - .resourceHistogram_cell 
    - .resourceTimeline_cell
~~~

Die Klassennamen unter **.gantt_layout_root** entsprechen den **view**-Eigenschaften in der Layout-Konfiguration:

~~~js
gantt.config.layout = {
    css: "gantt_container",
    rows: [
        {
            cols: [
                {view: "grid", group:"grids", scrollY: "scrollVer"}, /*!*/
                ...
            ]
        },
        ...
        {
            id: "resources",
            cols: [
                { view: "resourceGrid", group:"grids", scrollY: "resourceVScroll" }, /*!*/
                ...
                { view: "resourceHistogram", capacity:24, scrollX: "scrollHor", /*!*/ 
                    scrollY: "resourceVScroll" }, 
                ...
            ]
        },
        ...
    ]
};
~~~

### Ressourcen-Grid {#resource_grid}

![](//img/resource_grid.png)

Das Ressourcen-Grid verwendet die gleichen Selektoren wie das Aufgaben-Grid, wobei **.resourceGrid_cell** als Top-Level-Selektor dient:

~~~css
.resourceGrid_cell .gantt_row,
.resourceGrid_cell .gantt_row.odd{
    background-color: rgba(232, 232, 232, 0.6);
}
~~~

### Ressourcen-Histogramm {#resource_histogram}

![](//img/resource_histogram_css.png)

Das Ressourcen-Histogramm teilt sich Elemente mit der Haupt-Zeitachse. Standardmäßig gelten Selektoren, die auf die Haupt-Zeitachse abzielen, auch für die Ressourcen-Zeitachse, sofern die Selektoren nicht speziell Klassen wie **.timeline_cell** oder **.resourceHistogram_cell** verwenden.

Um gezielt das Ressourcen-Histogramm anzusprechen, nutzen Sie den Selektor **.resourceHistogram_cell**.

Die DOM-Struktur des Ressourcen-Histogramms beinhaltet:

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

Hier ein Beispiel für das Styling von Histogramm-Elementen:

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

Um bestimmte Zellen zu stylen, verwenden Sie das [gantt.templates.histogram_cell_class](api/template/histogram_cell_class.md) Template:

~~~js
gantt.templates.histogram_cell_class = function(start_date,end_date,resource,tasks) {
    if (getAllocatedValue(tasks, resource) > getCapacity(start_date, resource)) {
        return "column_overload"
    }
};
~~~

Wenden Sie CSS an, um diese Zellen hervorzuheben:

~~~css
.column_overload .gantt_histogram_fill {
    background-color: #ffa9a9;
}
~~~

Um die Histogramm-Linien anzupassen, verwenden Sie CSS für die folgenden Selektoren:

- **.gantt_histogram_hor_bar**
- **.gantt_histogram_vert_bar**

Beispielsweise können Sie deren Farbe so ändern:

~~~css
.gantt_histogram_hor_bar, .gantt_histogram_vert_bar {
    background: #299db4;
}
~~~

### Ressourcen-Diagramm {#resource_diagram}

![](//img/resource_diagram.png)

Das Ressourcen-Diagramm verwendet die gleichen Elemente wie die Haupt-Zeitachse. Standardmäßig gelten Selektoren, die auf die Haupt-Zeitachse abzielen, auch hier, sofern sie nicht mit layout cell-Klassen wie **.timeline_cell** oder **.resourceTimeline_cell** eingeschränkt sind.

Mit dem Selektor **.resourceTimeline_cell** können Sie gezielt das Ressourcen-Diagramm ansprechen.

Die DOM-Struktur des Ressourcen-Diagramms umfasst:

~~~js
- .gantt_task_bg
- .gantt_bars_area
    - div
        - .gantt_resource_marker
            - div
~~~

Der Top-Level-Selektor ist **.resourceTimeline_cell**.

Ein Beispielstil für Ressourcen-Diagramm-Labels:

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

Um Stile für spezifische Marker anzupassen, verwenden Sie das [gantt.templates.resource_cell_class](api/template/resource_cell_class.md) Template:

~~~css
<style>
    .resource_marker.workday_over div {
        border-radius: 3px;
        background: #ff8686;
    }
~~~

~~~js
gantt.templates.resource_cell_class = function(start_date, end_date, resource, tasks){
    var css = [];
    css.push("resource_marker");
    if (tasks.length <= 1) {
        css.push("workday_ok");
    } else {
        css.push("workday_over");
    }
    return css.join(" ");
};
~~~


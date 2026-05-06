--- 
title: "Spalten festlegen"
sidebar_label: "Spalten festlegen"
---

# Spalten festlegen

Grid-Spalten werden mit dem Parameter [columns](api/config/columns.md) konfiguriert. 

![gantt_left](/img/gantt_left.png)

~~~js
// Standard-Spalten-Definition
gantt.config.columns = [
    { name: "text",       label: "Task name",  width: "*", tree: true },
    { name: "start_date", label: "Start time", align: "center" },
    { name: "duration",   label: "Duration",   align: "center" },
    { name: "add",        label: "",           width: 44 }
];
~~~

Sie können sich das Video-Tutorial ansehen, das beschreibt, wie man Spalten des Grids festlegt.

<iframe width="676" height="400" src="https://www.youtube.com/embed/-BoznxJmJIo" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


## Überblick

Standardmäßig enthält das Grid vier Spalten:

1. Aufgabenname
2. Startdatum
3. Dauer 
4. '+'-Spalte. Eine spezielle Spalte mit dem <code>name="add"</code>, die das '+'-Zeichen anzeigt und es den Benutzern ermöglicht, Unteraufgaben zu einer Aufgabe hinzuzufügen.

:::note
Hinweis: Sie müssen den [columns](api/config/columns.md) Parameter nicht angeben, um die Standardspalten im Grid zu zeigen.
:::

Der [columns](api/config/columns.md) Parameter ist ein Array, von dem jedes Objekt eine einzelne Spalte darstellt. 
Also beispielsweise, um 5 Spalten im Grid zu definieren: 'Task', 'Start Date', 'End Date', 'Holder', 'Progress', geben Sie den [columns](api/config/columns.md) Parameter wie folgt an:

~~~js
gantt.config.columns = [
    { name: "text",       label: "Task name",  tree: true, width: "*" },
    { name: "holder",     label: "Holder",     align: "center" },
    { name: "start_date", label: "Start time", align: "center" },
    { name: "end_date",   label: "End date",   align: "center" },
    { name: "progress",   label: "Progress",   align: "center" }
];

gantt.init("gantt_here");
~~~

wobei 'text', 'holder', 'start_date', 'end_date', 'progress' [die Namen der Daten-Eigenschaften](guides/specifying-columns.md#datamappingandtemplates) sind.


## Anzeigen des Enddatums von Aufgaben

Wenn Aufgabendaten Objekte Start- und Enddaten im Format "%Y-%m-%d" oder "%d-%m-%Y" enthalten (d. h. ohne Stunden-Minuten-Teil), können die resultierenden Daten im Standardformat Werte aufweisen, die nicht erwartet werden. Für weitere Details zur Formatierung von Enddaten lesen Sie den Artikel [Task end date display & Inclusive end dates](guides/loading.md#taskenddatedisplayampinclusiveenddates).


## Ausblenden der "Add"-Schaltfläche für bestimmte Aufgaben

Eine recht einfache Möglichkeit, zu verhindern, dass Benutzer Unteraufgaben zu bestimmten Aufgaben hinzufügen, besteht darin, die 'Add'-Schaltfläche über CSS auszublenden.

Zuerst weisen Sie jeder Aufgabenzeile eine CSS-Klasse zu, indem Sie die [grid_row_class](api/template/grid_row_class.md) Vorlage verwenden:

~~~js
gantt.templates.grid_row_class = ( start, end, task ) => {
    if ( task.$level > 1 ) {
        return "nested_task"
    }

    return "";
};
~~~
Dann blenden Sie die 'Add'-Schaltfläche für solche Zeilen aus:

~~~css
.nested_task .gantt_add {
    display: none !important;
}
~~~

**Zugehöriges Beispiel**: [Predefined Project Structure](https://docs.dhtmlx.com/gantt/samples/08_api/11_project_structure.html)


## Breite

Um die Breite einer Spalte festzulegen, verwenden Sie das Attribut [width](api/config/columns.md) im entsprechenden Spaltenobjekt:

~~~js
gantt.config.columns = [
    { name: "text",       label: "Task name",  width: "*", tree: true },
    { name: "start_date", label: "Start time", width: 150 },
    { name: "duration",   label: "Duration",   width: 120 }
];

gantt.init("gantt_here");
~~~

:::note
Verwenden Sie den '*'-Wert, um die Spalte den restlichen Platz einnehmen zu lassen.
:::

Beachten Sie, dass die Breite der Grid-Spalten von zwei Attributen abhängt: dem [width] der Spalte und [grid_width]. Wenn die Summe der Breiten der Spalten nicht der Breite des Grids entspricht, ändert Gantt einen der Parameter.

- Bei der Initialisierung des Gantt über [gantt.init()](api/method/init.md) hat der [width] der Spalte Priorität. 

 
Beispiel: [Column width priority over grid width at initialization](https://snippet.dhtmlx.com/itnvg6z9)

- Beim Rendern des Gantt über [gantt.render()](api/method/render.md) hat [grid_width](api/config/grid_width.md) Priorität. 

 
Beispiel: [Grid width priority over column width during rendering](https://snippet.dhtmlx.com/4nb67z61)

- Bei der Initialisierung von gantt über [gantt.init()](api/method/init.md) und entweder die Breite der Spalte nicht angegeben oder auf `'*'` gesetzt ist, hat [grid_width](api/config/grid_width.md) Priorität. 

Beispiel: [Grid width priority when column width is undefined or set to `'*'` at initialization](https://snippet.dhtmlx.com/qej8w5ix)

### Minimal-/Maximal-Spaltenbreite

Die Eigenschaften **min_width/max_width** können verwendet werden, um die Spaltenbreite bei Größenänderungen zu begrenzen:

~~~js
gantt.config.columns = [
    { name: "text",       label: "Task name",  width: "*", tree: true, min_width: 150, max_width: 300 },
    { name: "start_date", label: "Start time", width: 150 },
    { name: "duration",   label: "Duration",   width: 120 }
];

gantt.init("gantt_here");
~~~

:::note
Die Eigenschaft **min_width** einer Spalte hat Priorität gegenüber der Eigenschaft [min_grid_column_width](api/config/min_grid_column_width.md) des gantt.
:::

### Minimale Grid-Breite beim Verändern der Größe

Die minimale Breite, auf die das Grid beim Verändern der Spaltengröße reduziert werden kann, wird über die Option [gantt.config.min_grid_column_width](api/config/min_grid_column_width.md) festgelegt. Die Option definiert die minimale Breite, auf die jede Spalte beim Verändern der Grid-Breite verkleinert werden kann:

~~~js
gantt.config.columns = [
    { name: "text",       label: "Task name",  width: 150, tree: true },
    { name: "start_date", label: "Start time", width: 100 },
    { name: "duration",   label: "Duration",   width: 50 }
];

gantt.config.min_grid_column_width = 30; // das Grid kann auf 90 px verkleinert werden

gantt.init("gantt_here");
~~~

:::note
Die minimale Breite des Grids beim Verändern der Größe hängt auch von der minimalen Breite der 'add'-Spalte ab (standardmäßig 44). Um das Grid auf einen Wert kleiner als 44 px zu verkleinern, geben Sie die [min_width](api/config/columns.md) Option im Objekt der 'add'-Spalte an:

~~~js
{ name: "add", label: "", min_width: 1 }
~~~

## Datenzuordnung und Vorlagen {#datamappingandtemplates}

Standardmäßig füllt dhtmlxGantt das Grid mit Daten-Eigenschaften, die den Namen der Spalten entsprechen.
Wenn Sie beispielsweise für eine Spalte **name:"holder"** festlegen, sucht dhtmlxGantt nach einer solchen Daten-Eigenschaft in den eingehenden JSON-Daten, und falls eine solche Eigenschaft existiert, wird sie in die Spalte geladen.

#### Verwendung von Vorlagen für Spalten-Daten

Wenn Sie eine Mischung mehrerer Daten-Eigenschaften in einer Spalte darstellen möchten, können Sie jeden Namen für die Spalte verwenden, aber die Daten-Vorlage über das **template**-Attribut des [columns](api/config/columns.md) Parameters festlegen.
Beispielsweise können Sie für eine Spalte den Namen **name:"staff"** festlegen und eine Vorlagenfunktion definieren, die die Daten-Eigenschaften holder und progress in die Spalte lädt, z. B.:

~~~js
gantt.config.columns = [
    { name: "text",        label: "Task name",  tree: true, width: "*" },
    { name: "start_date",  label: "Start time", align: "center" },
    { name: "staff",       label: "Holder(s)", template: (obj) => {
        return `${obj.holder} (${obj.progress})`;
    } }
];

gantt.init("gantt_here");
~~~

## Textausrichtung 

Um die horizontale Ausrichtung des Textes in einer Spalte festzulegen, verwenden Sie das [align](api/config/columns.md) Attribut im entsprechenden Spaltenobjekt:

~~~js
gantt.config.columns = [
    { name: "text",       label: "Task name",  align: "center", tree: true },
    { name: "start_date", label: "Start time", align: "center" },
    { name: "duration",   label: "Duration",   align: "center" }
];

gantt.init("gantt_here");
~~~


## WBS-Code {#wbscode}

Sie können eine Spalte hinzufügen, die die Outline-Nummern der Aufgaben (ihren WBS-Code) anzeigt. Dazu müssen Sie die [getWBSCode](api/method/getwbscode.md) Methode in der Spaltenvorlage verwenden.

~~~js
gantt.config.columns = [
    { name: "wbs",        label: "WBS",        width: 40,  template: gantt.getWBSCode }, 
    { name: "text",       label: "Task name",  width: 170, tree: true },
    { name: "start_date", label: "Start time", width: 90,  align: "center" },
    { name: "duration",   label: "Duration",   width: 60,  align: "center" },
    { name: "add",        width: 40 }
];
~~~


**Zugehöriges Beispiel**: [Show Task WBS Codes (Outline Numbers)](https://docs.dhtmlx.com/gantt/samples/07_grid/09_wbs_column.html)


### Ermitteln des WBS-Codes der Aufgabe

Die [getWBSCode](api/method/getwbscode.md) Methode gibt den WBS-Code der benötigten Aufgabe zurück. Beispielsweise laden wir folgende Aufgaben in gantt:

~~~js
gantt.parse({
    tasks: [
        { id: 1, text: "Project", start_date: "28-03-2025", duration: 5, open: true },
        { id: 2, text: "Task #1", start_date: "01-04-2025", duration: 3, parent: 1 },
        { id: 3, text: "Task #2", start_date: "02-04-2025", duration: 4, parent: 1 }
    ],
    links: []
});
~~~

und wir möchten den WBS-Code der Aufgabe mit der id="3" erhalten. Dafür übergeben wir das Objekt einer Aufgabe als Parameter an die [getWBSCode](api/method/getwbscode.md) Methode. Sie gibt einen String mit dem WBS-Code der Aufgabe zurück:

~~~js
const wbsCode = gantt.getWBSCode(gantt.getTask(3)); // -> returns "1.2"
~~~


### Erhalten einer Aufgabe via WBS-Code

Sie können auch das Objekt einer Aufgabe erhalten, indem Sie ihren WBS-Code an die [getWBSCode](api/method/gettaskbywbscode.md) Methode übergeben:

~~~js
const task = gantt.getTaskByWBSCode("1.2");
// => { id: 3, text: "Task #2", start_date: …}
~~~


## Zeitliche Einschränkungen für Aufgaben {#timeconstraintsfortasks}

Sie können separate Grid-Spalten hinzufügen, die es ermöglichen, den Typ der [time constraint](guides/auto-scheduling.md#timeconstraintsfortasks) für eine Aufgabe und das Datum der Einschränkung festzulegen, falls der gewählte Typ dies erfordert.
Diese Spalten tragen die Namen "constraint_type" und "constraint_date" bzw. entsprechend. 

~~~js
gantt.config.columns = [
    { name: "constraint_type", align: "center", width: 100, resize: true,
        editor: constraintTypeEditor, template: (task) => { //template logic }
    },
    { name: "constraint_date", align: "center", width: 120, resize: true,
        editor: constraintDateEditor, template: (task) => { //template logic }
    },
    ...
];
~~~

Die Spalten sind mit Objekten von Inline-Editoren verknüpft, die es ermöglichen, den notwendigen Typ der Einschränkung für eine Aufgabe auszuwählen und ihr Datum direkt im Grid zu bearbeiten.

~~~js
const constraintTypeEditor = {
    type: "select", map_to: "constraint_type", options: [
        { key: "asap", label: gantt.locale.labels.asap },
        { key: "alap", label: gantt.locale.labels.alap },
        { key: "snet", label: gantt.locale.labels.snet },
        { key: "snlt", label: gantt.locale.labels.snlt },
        { key: "fnet", label: gantt.locale.labels.fnet },
        { key: "fnlt", label: gantt.locale.labels.fnlt },
        { key: "mso", label: gantt.locale.labels.mso },
        { key: "mfo", label: gantt.locale.labels.mfo }
    ]
};

const constraintDateEditor = {
    type: "date", 
    map_to: "constraint_date", 
    min: new Date(2025, 0, 1), 
    max: new Date(2030, 0, 1)
};
~~~


**Zugehöriges Beispiel**: [Auto-Schedule From Project Start & Constraints](https://docs.dhtmlx.com/gantt/samples/02_extensions/19_constraints_scheduling.html)


## Spaltengrößen ändern {#resizing}

:::info
Diese Funktionalität ist nur in der PRO-Edition verfügbar
:::

Um Benutzern die Möglichkeit zu geben, eine Spalte durch Ziehen des rechten Spaltenrandes zu vergrößern/verkleinern, verwenden Sie das [resize](api/config/columns.md) Attribut im entsprechenden Spaltenobjekt:

~~~js
gantt.config.columns = [
    { name: "text",       resize: true, tree: true, width: "*" }, // 'resize' aktiv
    { name: "start_date", resize: true, min_width: 100 }, // durch 'min_width' begrenzt
    { name: "duration",   align: "center" },              // kein Resize
    { name: "add",        width: "44" }
];
~~~


**Zugehöriges Beispiel**: [Grid columns resize events](https://docs.dhtmlx.com/gantt/samples/02_extensions/04_grid_resize.html)


Um das gesamte Grid durch Ziehen des Grid-Randes resizebar zu machen, verwenden Sie die [gantt.config.layout](api/config/layout.md) Option und geben Grid- und Resizer-Objekte mit der nötigen Konfiguration darin an.

~~~js
gantt.config.layout = {
    css: "gantt_container",
    rows: [
        {
            cols: [
                { view: "grid", id: "grid", scrollX: "scrollHor",
                    scrollY: "scrollVer"
                },
                { resizer: true, width: 1 },
                { view: "timeline", id: "timeline", scrollX: "scrollHor",
                    scrollY: "scrollVer"
                },
                { view: "scrollbar", id: "scrollVer", scroll: "y" }
            ]
        },
        { view: "scrollbar", id: "scrollHor", scroll: "x", height: 20 }
    ]
};
~~~ 

Da Sie separate Scrollleisten für Grid und Timeline anzeigen, möchten Sie möglicherweise deren Sichtbarkeit synchronisieren, sodass beide Scrollleisten gleichzeitig sichtbar oder versteckt sind. 


![scrollable_grid](/img/scrollable_grid.png)

Es lässt sich erreichen, indem Sie beide Scrollleisten derselben *Sichtbarkeitsgruppe* zuordnen:

~~~js
gantt.config.layout = {
    css: "gantt_container",
    cols: [
        {
            width: 400,
            minWidth: 200,
            maxWidth: 600,
            rows: [
                { view: "grid", scrollX: "gridScroll", scrollable: true,
                    scrollY: "scrollVer"
                },
                // horizontale Scrollleiste für das Grid
                { view: "scrollbar", id: "gridScroll", group: "horizontal" } 
            ]
        },
        { resizer: true, width: 1 },
        {
            rows: [
                { view: "timeline", scrollX: "scrollHor", scrollY: "scrollVer" },
                // horizontale Scrollleiste für die Timeline
                { view: "scrollbar", id: "scrollHor", group: "horizontal" } 
            ]
        },
        { view: "scrollbar", id: "scrollVer" }
    ]
};
~~~ 

Wenn mindestens eine der Scrollleisten der gleichen Gruppe sichtbar ist, werden alle Scrollleisten der Gruppe sichtbar sein.


**Zugehöriges Beispiel**: [Horizontal scroll inside Grid](https://docs.dhtmlx.com/gantt/samples/07_grid/10_scrollable_grid.html)


## Styling

Für Informationen zum Stylen von Zellen des Grids lesen Sie [Work with Gantt Styles](guides/styling-guide.md#styling-grid).
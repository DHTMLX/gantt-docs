---
title: "Spalten festlegen"
sidebar_label: "Spalten festlegen"
---

# Spalten festlegen


Die Spalten des Grids werden über den Parameter [columns](api/config/columns.md) konfiguriert.

![gantt_left](/img/gantt_left.png)

~~~js
// Standard-Spaltendefinition
gantt.config.columns = [
    { name: "text",       label: "Task name",  width: "*", tree: true },
    { name: "start_date", label: "Start time", align: "center" },
    { name: "duration",   label: "Duration",   align: "center" },
    { name: "add",        label: "",           width: 44 }
];
~~~

Es gibt auch eine Videoanleitung, die zeigt, wie man die Spalten des Grids konfiguriert.

<iframe width="676" height="400" src="https://www.youtube.com/embed/-BoznxJmJIo" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Überblick


Standardmäßig zeigt das Grid 4 Spalten an:

1. Task name
2. Start date
3. Duration 
4. Die '+'-Spalte. Diese spezielle Spalte mit <code>name="add"</code> zeigt ein '+'-Symbol an, mit dem Benutzer Unteraufgaben hinzufügen können.

:::note
Beachten Sie, dass Sie den Parameter [columns](api/config/columns.md) nicht angeben müssen, um die Standardspalten im Grid anzuzeigen.
:::

Der Parameter [columns](api/config/columns.md) ist ein Array, wobei jedes Objekt eine Spalte definiert.
Um zum Beispiel 5 Spalten mit den Namen 'Task', 'Start Date', 'End Date', 'Holder' und 'Progress' zu definieren, konfigurieren Sie den Parameter [columns](api/config/columns.md) folgendermaßen:

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

Hier entsprechen 'text', 'holder', 'start_date', 'end_date' und 'progress' [den Namen der Daten-Properties](guides/specifying-columns.md#datamappingandtemplates).

## Anzeige des Enddatums von Aufgaben


Wenn die Aufgabenobjekte sowohl Start- als auch Enddaten im Format "%Y-%m-%d" oder "%d-%m-%Y" (ohne Stunden und Minuten) enthalten, kann das angezeigte Enddatum im Standardformat von den Erwartungen abweichen. Weitere Informationen zur Formatierung von Enddaten finden Sie im Artikel [Task end date display & Inclusive end dates](guides/loading.md#taskenddatedisplayampinclusiveenddates).

## Das "Add"-Button für bestimmte Aufgaben ausblenden {#hidingtheaddbuttonforcertaintasks}


Eine einfache Möglichkeit, das Hinzufügen von Unteraufgaben für bestimmte Aufgaben zu verhindern, ist das Ausblenden des "Add"-Buttons per CSS.

1. Weisen Sie zunächst jeder Aufgabenzeile eine CSS-Klasse mit dem Template [grid_row_class](api/template/grid_row_class.md) zu:
~~~js
gantt.templates.grid_row_class = ( start, end, task ) => {
    if ( task.$level > 1 ) {
        return "nested_task"
    }

    return "";
};
~~~
2. Blenden Sie dann den "Add"-Button in diesen Zeilen per CSS aus:

~~~css
.nested_task .gantt_add {
    display: none !important;
}
~~~


[Predefined Project Structure](https://docs.dhtmlx.com/gantt/samples/08_api/11_project_structure.html)


## Breite


Um die Breite einer Spalte zu steuern, verwenden Sie das [width](api/config/columns.md)-Attribut im Konfigurationsobjekt der Spalte:

~~~js
gantt.config.columns = [
    { name: "text",       label: "Task name",  width: "*", tree: true },
    { name: "start_date", label: "Start time", width: 150 },
    { name: "duration",   label: "Duration",   width: 120 }
];

gantt.init("gantt_here");
~~~

:::note
Die Verwendung von '*' bei width bewirkt, dass die Spalte den gesamten verbleibenden Platz einnimmt.
:::

Beachten Sie, dass die Breite der Grid-Spalten von zwei Einstellungen abhängt: der [width](api/config/columns.md) der einzelnen Spalte und der gesamten [grid_width](api/config/grid_width.md). Wenn die Gesamtsumme der Spaltenbreiten nicht mit der Grid-Breite übereinstimmt, passt Gantt einen dieser Werte an.

- Beim Initialisieren von gantt mit [gantt.init()](api/method/init.md) hat die [width](api/config/columns.md) der Spalte Vorrang. 


Sample: [Priorität der Spaltenbreite gegenüber Grid-Breite bei der Initialisierung](https://snippet.dhtmlx.com/itnvg6z9) 
- Beim Rendern von gantt mit [gantt.render()](api/method/render.md) hat die [grid_width](api/config/grid_width.md) Vorrang. 


Sample: [Priorität der Grid-Breite beim Rendern gegenüber Spaltenbreite](https://snippet.dhtmlx.com/4nb67z61) 
- Wenn gantt über [gantt.init()](api/method/init.md) initialisiert wird und die Spaltenbreite fehlt oder auf **'*'** gesetzt ist, hat die [grid_width](api/config/grid_width.md) Vorrang. 

Sample: [Priorität der Grid-Breite, wenn die Spaltenbreite nicht definiert oder auf '*' gesetzt ist](https://snippet.dhtmlx.com/qej8w5ix) 

### Min/max Spaltenbreite

Sie können die **min_width**- und **max_width**-Eigenschaften verwenden, um die Spaltenbreite beim Vergrößern oder Verkleinern einzuschränken:

~~~js
gantt.config.columns = [
    { name: "text",       label: "Task name",  width: "*", tree: true, min_width: 150,
        max_width: 300
    },
    { name: "start_date", label: "Start time", width: 150 },
    { name: "duration",   label: "Duration",   width: 120 }
];

gantt.init("gantt_here");
~~~

:::note
Die **min_width**-Eigenschaft einer Spalte überschreibt die Einstellung [min_grid_column_width](api/config/min_grid_column_width.md) von gantt.
:::

### Minimale Grid-Breite beim Verkleinern

Die kleinste Breite, auf die das Grid verkleinert werden kann, wird durch [gantt.config.min_grid_column_width](api/config/min_grid_column_width.md) festgelegt. Diese Option definiert die minimale Breite, die jede Spalte beim Verkleinern des Grids haben kann:

~~~js
gantt.config.columns = [
    { name: "text",       label: "Task name",  width: 150, tree: true },
    { name: "start_date", label: "Start time", width: 100 },
    { name: "duration",   label: "Duration",   width: 50 }
];

gantt.config.min_grid_column_width = 30; // das Grid kann auf insgesamt 90 px verkleinert werden

gantt.init("gantt_here");
~~~

Sample: [Minimale Grid-Breite](https://snippet.dhtmlx.com/zdza8tws) 

Beachten Sie außerdem, dass die minimale Grid-Breite beim Verkleinern von der minimalen Breite der 'add'-Spalte abhängt (Standard: 44). Um das Grid kleiner als 44 px zu machen, setzen Sie die [min_width](api/config/columns.md) für die 'add'-Spalte wie folgt:

~~~js
{ name: "add", label: "", min_width: 1 }
~~~

## Datenzuordnung und Templates {#datamappingandtemplates}


Standardmäßig füllt dhtmlxGantt das Grid mit Daten-Properties, deren Namen mit den Spaltennamen übereinstimmen. Wenn eine Spalte z.B. **name:"holder"** hat, sucht dhtmlxGantt nach einer 'holder'-Eigenschaft im JSON-Datensatz und zeigt deren Wert in dieser Spalte an.

#### Verwendung von Templates für Spaltendaten 

Wenn Sie eine Kombination mehrerer Daten-Properties in einer Spalte anzeigen möchten, können Sie einen beliebigen Namen für die Spalte wählen und ein Datentemplate mit dem **template**-Attribut im Parameter [columns](api/config/columns.md) festlegen.

Sie könnten beispielsweise eine Spalte **name:"staff"** nennen und eine Template-Funktion angeben, die sowohl *holder* als auch *progress* kombiniert zurückgibt:

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


Um den Text in einer Spalte horizontal auszurichten, verwenden Sie das [align](api/config/columns.md)-Attribut in der Spaltenkonfiguration:

~~~js
gantt.config.columns = [
    { name: "text",       label: "Task name",  align: "center", tree: true },
    { name: "start_date", label: "Start time", align: "center" },
    { name: "duration",   label: "Duration",   align: "center" }
];

gantt.init("gantt_here");
~~~

### WBS-Code {#wbscode}


Sie können eine Spalte hinzufügen, um die Gliederungsnummern (WBS-Codes) der Aufgaben anzuzeigen. Verwenden Sie dazu die Methode [getWBSCode](api/method/getwbscode.md) im Template der Spalte.

~~~js
gantt.config.columns = [
    { name: "wbs",        label: "WBS",        width: 40, template: gantt.getWBSCode }, /*!*/
    { name: "text",       label: "Task name",  width: 170, tree: true },
    { name: "start_date", label: "Start time", width: 90,  align: "center" },
    { name: "duration",   label: "Duration",   width: 60,  align: "center" },
    { name: "add",        width: 40 }
];
~~~


[Show Task WBS Codes (Outline Numbers)](https://docs.dhtmlx.com/gantt/samples/07_grid/09_wbs_column.html)


### WBS-Code einer Aufgabe abrufen

Die Methode [getWBSCode](api/method/getwbscode.md) gibt den WBS-Code für eine bestimmte Aufgabe zurück. Wenn Sie z.B. diese Aufgaben in gantt laden:

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

und den WBS-Code für die Aufgabe mit id="3" benötigen, übergeben Sie das Aufgabenobjekt an [getWBSCode](api/method/getwbscode.md). Die Methode gibt den WBS-Code als String zurück:

~~~js
const wbsCode = gantt.getWBSCode(gantt.getTask(3)); // -> gibt "1.2" zurück
~~~

### Aufgabe per WBS-Code abrufen

Es ist möglich, ein Aufgabenobjekt abzurufen, indem Sie dessen WBS-Code an die Methode [getTaskByWBSCode](api/method/gettaskbywbscode.md) übergeben:

~~~js
const task = gantt.getTaskByWBSCode("1.2");
// => { id: 3, text: "Task #2", start_date: …}
~~~


## Zeitliche Einschränkungen für Aufgaben


:::info
Diese Funktionalität ist nur in der PRO-Edition verfügbar
:::

Sie können spezifische Spalten im Grid hinzufügen, die das Setzen des Typs einer [zeitlichen Einschränkung](guides/auto-scheduling.md#timeconstraintsfortasks) für eine Aufgabe ermöglichen, zusammen mit dem Einschränkungsdatum, falls der gewählte Typ dies erfordert. Diese Spalten heißen "constraint_type" bzw. "constraint_date".

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

Diese Spalten sind mit Inline-Editor-Objekten verbunden, die es ermöglichen, den notwendigen Einschränkungstyp für eine Aufgabe auszuwählen und dessen Datum direkt im Grid zu bearbeiten.

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


[Auto-Schedule From Project Start & Constraints](https://docs.dhtmlx.com/gantt/samples/02_extensions/19_constraints_scheduling.html)


## Größenänderung {#resizing}


:::info
Diese Funktionalität ist nur in der PRO-Edition verfügbar
:::

Um Benutzern das Anpassen der Spaltenbreite durch Ziehen des rechten Randes zu ermöglichen, aktivieren Sie das Attribut [resize](api/config/columns.md) in der jeweiligen Spaltenkonfiguration:

~~~js
gantt.config.columns = [
    { name: "text",       resize: true, tree: true, width: "*" }, // 'resize' aktiviert
    { name: "start_date", resize: true, min_width: 100 }, // begrenzt durch 'min_width'
    { name: "duration",   align: "center" },              // Größenänderung deaktiviert
    { name: "add",        width: "44" }
];
~~~


[Grid columns resize events](https://docs.dhtmlx.com/gantt/samples/02_extensions/04_grid_resize.html)


Um das gesamte Grid durch Ziehen seines Rahmens größenverstellbar zu machen, nutzen Sie die Option [gantt.config.layout](api/config/layout.md) und definieren Sie Grid- und Resizer-Objekte mit den passenden Einstellungen:

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

gantt.init("gantt_here");
~~~

Um die Breite des Grids beim Anpassen der Spalten fest zu halten, setzen Sie die Option [keep_grid_width](api/config/keep_grid_width.md) auf *true*:

~~~js
gantt.config.columns = [
    { name: "text",       width: "*", tree: true, resize: true },
    { name: "start_date", width: 100, align: "center" },
    { name: "duration",   width: 70, align: "center" },
    { name: "add",        width: 44 }
];

gantt.config.keep_grid_width = true; /*!*/
gantt.init("gantt_here");
~~~


[Grid columns resize events](https://docs.dhtmlx.com/gantt/samples/02_extensions/04_grid_resize.html)


### Events

dhtmlxGantt bietet 6 Events im Zusammenhang mit der Größenänderung:

- [onColumnResizeStart](api/event/oncolumnresizestart.md) - wird ausgelöst, bevor der Benutzer beginnt, den Rand einer Spalte zum Anpassen der Breite zu ziehen
- [onColumnResize](api/event/oncolumnresize.md) - wird ausgelöst, während der Benutzer den Spaltenrand zieht
- [onColumnResizeEnd](api/event/oncolumnresizeend.md) - wird ausgelöst, nachdem der Benutzer das Ziehen beendet hat


- [onGridResizeStart](api/event/ongridresizestart.md) - wird ausgelöst, bevor der Benutzer beginnt, den Rand des Grids zu ziehen
- [onGridResize](api/event/ongridresize.md) - wird ausgelöst, während der Benutzer das Grid zieht
- [onGridResizeEnd](api/event/ongridresizeend.md) - wird ausgelöst, nachdem der Benutzer das Ziehen des Grids beendet hat


## Sichtbarkeit


Um die Sichtbarkeit einer Spalte zu steuern, verwenden Sie das Attribut [hide](api/config/columns.md) in der Spaltenkonfiguration.

 
Die Sichtbarkeit kann dynamisch geändert werden, indem die 'hide'-Eigenschaft aktualisiert und das Gantt-Diagramm aktualisiert wird:

:::info
Diese Funktionalität ist nur in der PRO-Edition verfügbar
:::

**Umschalten zwischen Basis- und Detailansicht**
~~~
gantt.config.columns = [
    { name: "text",          label: "Task name", width: "*", tree: true, resize: true },
    { name: "start_date",    label: "Start time" },
    { name: "duration",      label: "Duration",      width: 60, hide: true }, /*!*/
    { name: "planned_start", label: "Planned start", width: 80, hide: true }, /*!*/
    { name: "planned_end",   label: "Planned end",   width: 80, hide: true }, /*!*/
    { name: "add",           label: "",              width: 36 }
];

const showDetails = false;

function toggleView() {
    showDetails = !showDetails;
    gantt.getGridColumn("duration").hide = !showDetails;
    gantt.getGridColumn("planned_start").hide = !showDetails;
    gantt.getGridColumn("planned_end").hide = !showDetails;

    if (showDetails) {
        gantt.config.grid_width = 600;
    } else {
        gantt.config.grid_width = 300;
    }

    gantt.render();
};

gantt.init("gantt_here");
~~~


[Hiding grid columns](https://docs.dhtmlx.com/gantt/samples/02_extensions/07_managing_grid_columns.html)


Es gibt auch ein Video-Tutorial, das zeigt, wie die Sichtbarkeit von Spalten im Grid verwaltet werden kann.

<iframe width="676" height="400" src="https://www.youtube.com/embed/rqYrqqoaI_U" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


## Zellen nach dem Rendern modifizieren


Manchmal ist es notwendig, das Aussehen oder Verhalten einer Zelle im Grid nach dem Rendern anzupassen.

Seit Version 7.1 bietet die Bibliothek das Attribut **onrender** in der [columns](api/config/columns.md) Konfiguration, das verwendet werden kann, um eine Zelle nach dem Rendern zu verändern, zum Beispiel:

~~~js
gantt.config.columns = [
    { name: "text", tree: true, width: "*", resize: true },
    { name: "start_date", align: "center", resize: true },
    { name: "duration",   align: "center", onrender: (task, node) => {
        node.setAttribute("title", task.text);
    } },
    { name: "add", width: 44 }
];
~~~


Ein weiterer Anwendungsfall für den **onrender**-Callback ist das Einfügen externer Komponenten in Grid-Zellen. Wenn Sie beispielsweise DHTMLX Gantt mit React verwenden und eine React-Komponente innerhalb einer Grid-Zelle einfügen möchten, zeigt der folgende Code, wie dies möglich ist:

~~~js
gantt.config.columns = [
    { name: "text",       label: "Task name", tree: true, width: "*" },
    { name: "start_date", label: "Start time", align: "center" },
    { name: "duration",   label: "Duration",   align: "center" },
    { 
        name: "external", label: "Element 1",  align: "center",
        onrender: (item, node) => {
            return <DemoButton
                text="Edit 1"
                onClick="{()" => alert("Element as React Component")}
            />
        }
    }
];
~~~

Um das Rendern der React-Komponente zu ermöglichen, muss die Konfiguration [gantt.config.external_render](api/config/external_render.md) angegeben werden:

~~~js
import ReactDOM from 'react-dom';
import React from 'react';

gantt.config.external_render = { 
    // prüft, ob das Element ein React-Element ist
    isElement: (element) => {
        return React.isValidElement(element);
    },
    // rendert das React-Element im DOM
    renderElement: (element, container) => {
        ReactDOM.render(element, container);
    }
};
~~~

Der Ablauf ist wie folgt:

- Das vom **onrender**-Callback zurückgegebene Objekt wird an die Funktion **isElement** übergeben, um zu prüfen, ob es sich um ein renderbares Objekt für das verwendete Framework oder die Bibliothek handelt.
- Gibt **isElement** *true* zurück, wird das Objekt an **renderElement** übergeben, das die Komponente im DOM-Element der Zelle initialisiert.


## Horizontaler Scrollbalken


Das Grid kann scrollbar gemacht werden, indem die Eigenschaft **scrollable** in der [layout](guides/layout-config.md) Konfiguration aktiviert wird. 
[Mehr erfahren über das Binden von Layout-Ansichten an einen Scrollbalken](guides/layout-config.md#scrollbar).

Das Hinzufügen eines horizontalen Scrollbalkens zum Grid ermöglicht es Gantt, die Spaltenbreiten beim Ändern der Grid-Größe automatisch anzupassen. [Weitere Details zur Aktivierung dieser Funktion](api/config/grid_elastic_columns.md). 

Neben dem Setzen des **scrollable**-Attributs müssen Sie ein *horizontales Scrollbalken-Element* zum Layout hinzufügen und es wie folgt mit dem Grid verbinden:

~~~js
gantt.config.layout = {
    css: "gantt_container",
    cols: [
        {
            width: 400,
            minWidth: 200,
            maxWidth: 600,

            // Hinzufügen des horizontalen Scrollbalkens zum Grid über das scrollX-Attribut
            rows: [
                { view: "grid", scrollX: "gridScroll", scrollable: true, /*!*/
                    scrollY: "scrollVer" /*!*/
                }, /*!*/
                { view: "scrollbar", id: "gridScroll" } /*!*/
            ]
        },
        { resizer: true, width: 1 },
        {
            rows: [
                { view: "timeline", scrollX: "scrollHor", scrollY: "scrollVer" },
                { view: "scrollbar", id: "scrollHor" }
            ]
        },
        { view: "scrollbar", id: "scrollVer" }
    ]
};
~~~

Wenn separate Scrollbalken für Grid und Timeline verwendet werden, sorgt die Synchronisierung ihrer Sichtbarkeit dafür, dass beide gemeinsam angezeigt oder ausgeblendet werden.

![scrollable_grid](/img/scrollable_grid.png)

Dies erreichen Sie, indem Sie beiden Scrollbalken die gleiche *visibility group* zuweisen:

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
                // horizontaler Scrollbalken für das Grid
                { view: "scrollbar", id: "gridScroll", group: "horizontal" } /*!*/
            ]
        },
        { resizer: true, width: 1 },
        {
            rows: [
                { view: "timeline", scrollX: "scrollHor", scrollY: "scrollVer" },
                // horizontaler Scrollbalken für die Timeline
                { view: "scrollbar", id: "scrollHor", group: "horizontal" } /*!*/
            ]
        },
        { view: "scrollbar", id: "scrollVer" }
    ]
};
~~~

Wenn einer der Scrollbalken in der Gruppe sichtbar ist, werden alle Scrollbalken dieser Gruppe angezeigt.


[Horizontal scroll inside Grid](https://docs.dhtmlx.com/gantt/samples/07_grid/10_scrollable_grid.html)


## Styling


Weitere Informationen zum Styling von Grid-Zellen finden Sie unter [Work with Gantt Styles](guides/styling-guide.md#stylinggrid).


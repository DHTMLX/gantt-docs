---
title: "How-tos"
sidebar_label: "How-tos"
---

# How-tos


## So schalten Sie das Grid/Chart um {#howtotogglegridchart}

Bei Verwendung der Standard-Layout-Konfiguration kann das Grid oder das Chart umgeschaltet werden, indem die Parameter [show_grid](api/config/show_grid.md) oder [show_chart](api/config/show_chart.md) geändert werden. Anschließend muss die Methode [render()](api/method/render.md) aufgerufen werden, um die Anzeige zu aktualisieren.

~~~js
function toggleGrid(){
    gantt.config.show_grid = !gantt.config.show_grid;
    gantt.render();
}
~~~

**Related example:** [Gantt. Toggle grid (default layout)](https://snippet.dhtmlx.com/gnloz505)

~~~js
function toggleChart(){
    gantt.config.show_chart = !gantt.config.show_chart;
    gantt.render();
}
~~~

**Related example:** [Gantt. Toggle timeline (default layout)](https://snippet.dhtmlx.com/kqe1hqp2)
 
Für benutzerdefinierte Layout-Konfigurationen müssen separate Layouts mit und ohne Grid oder Timeline erstellt werden. Das Umschalten erfolgt durch Aktualisieren des Parameters [gantt.config.layout](api/config/layout.md) und erneutes Initialisieren mit der Methode [init()](api/method/init.md), um die Änderungen anzuwenden:

~~~js
let showGrid = true;
function toggleGrid() {
    showGrid = !showGrid;
    if (showGrid) {
        gantt.config.layout = gridAndChart; // Layout mit Grid und Timeline
    }
    else {
        gantt.config.layout = onlyChart; // Layout nur mit Timeline

    }
    gantt.init("gantt_here");
}
~~~

**Related example:** [Gantt. Toggle grid (custom layout)](https://snippet.dhtmlx.com/omk98l0x)

~~~js
let showChart = true;
function toggleChart() {
    showChart = !showChart;
    if (showChart) {
        gantt.config.layout = gridAndChart; // Layout mit Grid und Timeline
    }
    else {
        gantt.config.layout = onlyGrid; // Layout nur mit Grid

    }
    gantt.init("gantt_here");
}
~~~

**Related example:** [Gantt. Toggle timeline (custom layout)](https://snippet.dhtmlx.com/aukjyqc8)

## So schalten Sie die Ressourcenansicht um {#howtotoggletheresourceview}

Ähnlich wie beim Umschalten von Grid oder Timeline müssen mehrere Layout-Konfigurationen mit und ohne Ressourcenansicht vorbereitet werden. Das Umschalten erfolgt durch Aktualisieren des Parameters [gantt.config.layout](api/config/layout.md) und Aufruf der Methode [init()](api/method/init.md), um die Änderungen zu übernehmen:

~~~js
let resourceChart = true;

function layoutChange() {
    resourceChart = !resourceChart;
    if (resourceChart) {
        gantt.config.layout = resourceLayout;
    }
    else {
        gantt.config.layout = noresourceLayout;
    }
    gantt.init("gantt_here");
};
~~~

**Related example:** [Gantt. Toggle resource load diagram](https://snippet.dhtmlx.com/vbaczl07)

~~~js
let histogramView = true;

function layoutChange() {
    histogramView = !histogramView;
    if (histogramView) {
        gantt.config.layout = histogramLayout;
    }
    else {
        gantt.config.layout = simpleLayout;
    }
    gantt.init("gantt_here");
};
~~~

**Related example:** [Gantt. Toggle resource histogram](https://snippet.dhtmlx.com/isn2ger4)

Eine andere Möglichkeit besteht darin, das Layout dynamisch mithilfe von Layout-Views zu generieren und Gantt neu zu initialisieren, um die Anzeige zu aktualisieren:

**Related example:** [Gantt. Generate layout](https://snippet.dhtmlx.com/3dnzfhit)

## So aktivieren Sie das unendliche Scrollen in der Timeline {#howtohaveaninfinitescrollinthetimeline}

Unendliches Scrollen kann auf verschiedene Arten implementiert werden, typischerweise jedoch durch Anpassen des angezeigten Datumsbereichs über die Parameter [gantt.config.start_date](api/config/start_date.md) und [gantt.config.end_date](api/config/end_date.md):

### Beim Verwenden der Scrollbar 

Durch Überwachen der [Scrollposition](api/event/onganttscroll.md) kann der Datumsbereich erweitert werden, wenn der Benutzer nahe an die Ränder scrollt. Um Performance-Probleme zu vermeiden, sollte das Neuzeichnen des Gantt-Diagramms mit einer Verzögerung per Timeout erfolgen:

~~~js
gantt.init("gantt_here");
gantt.parse(tasks);

gantt.attachEvent("onGanttScroll", function (left, top) {
    const left_date = gantt.dateFromPos(left)
    const right_date = gantt.dateFromPos(left + gantt.$task.offsetWidth)

    gantt.config.start_date = gantt.config.start_date || gantt.getState().min_date;
    gantt.config.end_date = gantt.config.end_date || gantt.getState().max_date;

    const min_allowed_date = gantt.date.add(gantt.config.start_date, 1, "day");
    const max_allowed_date = gantt.date.add(gantt.config.end_date, -2, "day");

    let repaint = false;
    if (+left_date <= +min_allowed_date) {
        gantt.config.start_date = gantt.date.add(gantt.config.start_date, -2, "day");
        repaint = true;
    }
    if (+right_date >= +max_allowed_date) {
        gantt.config.end_date = gantt.date.add(gantt.config.end_date, 2, "day");
        repaint = true;
    }

    if (repaint) {
        setTimeout(function () {
            gantt.render()
            gantt.showDate(left_date)
        }, 20)
    }
});
~~~

**Related example:** [Gantt. Infinite scroll while using scrollbar](https://snippet.dhtmlx.com/4u52p5g3)

### Beim Ziehen der Timeline

Durch Erkennen der aktuellen Scrollposition während des Ziehens der Timeline kann der Datumsbereich erweitert werden, wenn der Scrollbereich nahe am Anfang oder Ende der Timeline liegt:

~~~js
gantt.attachEvent("onMouseMove", function (id, e) {
  if (!gantt.getState().drag_id && e.buttons == 1) {
    const left_date = gantt.dateFromPos(gantt.getScrollState().x);
    const right_date = gantt.dateFromPos(
      gantt.getScrollState().x + gantt.$task.offsetWidth - 1
    );
    if (left_date && +left_date <= +gantt.config.start_date) {
      gantt.config.start_date = gantt.date.add(gantt.config.start_date, -1, 'day');
      gantt.render();
    }
    if (right_date && +gantt.config.end_date < +gantt.date.add(right_date, 1, 'day')) {
      gantt.config.end_date = gantt.date.add(gantt.config.end_date, 1, 'day');
      gantt.render();
    }
  }
});
~~~

**Related example:** [Gantt. Infinite scroll while dragging the timeline](https://snippet.dhtmlx.com/zqob7lz5)

### Beim Ziehen eines Tasks

Wenn der Datumsbereich nicht explizit gesetzt ist, kann durch Aufruf von [render()](api/method/render.md) jedes Mal, wenn ein Task nahe an die Timeline-Ränder gezogen wird, der sichtbare Bereich beibehalten werden:

~~~js
gantt.init("gantt_here");
gantt.parse(tasks);

gantt.attachEvent("onTaskDrag", function (id, mode, task, original) {
    if (task.start_date <= gantt.getState().min_date ||
        task.end_date >= gantt.getState().max_date) {
        gantt.render()
    }
});
~~~

**Related example:** [Gantt. Infinite scroll while dragging a task (default range settings)](https://snippet.dhtmlx.com/44qcunjc)

Wenn der [Datumsbereich](api/config/start_date.md) explizit gesetzt ist, muss er beim Ziehen von Tasks nahe an die Ränder aktualisiert werden:

~~~js
gantt.init("gantt_here");
gantt.parse(tasks);

gantt.config.start_date = new Date(2025, 02, 28)
gantt.config.end_date = new Date(2025, 03, 10)
gantt.render();

gantt.attachEvent("onTaskDrag", function (id, mode, task, original) {
    if (+task.start_date <= +gantt.config.start_date) {
        gantt.config.start_date = gantt.date.add(
            gantt.config.start_date, -1, gantt.config.duration_unit
        );
        gantt.render()
    }
    if (+task.end_date >= +gantt.config.end_date) {
        gantt.config.end_date = gantt.date.add(
            gantt.config.end_date, 1, gantt.config.duration_unit
        );
        gantt.render()
    }
});
~~~

**Related example:** [Gantt. Infinite scroll while dragging a task (explicit range settings)](https://snippet.dhtmlx.com/3lrm0wyp)

## So laden Sie Tasks dynamisch {#howtoloadtasksdynamically}

Durch Erkennen, wann beim Scrollen der letzte sichtbare Task erreicht wird, mithilfe des [onGanttScroll](api/event/onganttscroll.md)-Events, können zusätzliche Tasks dynamisch geladen werden, indem die Methode [parse()](api/method/parse.md) aufgerufen wird:

~~~js
gantt.attachEvent("onGanttScroll", function (left, top) {
    const visibleTasks = gantt.getVisibleTaskCount();
    const lastVisibleTask = gantt.getTaskByIndex(visibleTasks - 1)

    if (gantt.getTaskRowNode(lastVisibleTask.id)) {
        const tasks = load_tasks()
        gantt.parse(tasks);
    }
});
~~~

**Related example:** [Gantt. Load data dynamically](https://snippet.dhtmlx.com/39l7o0rm)

## So erweitern/reduzieren Sie alle Tasks mit einem Button {#howtoexpandcollapsealltaskswithabutton}

Die Methoden [open()](api/method/open.md) und [close()](api/method/close.md) können verwendet werden, um einzelne Tasks zu erweitern oder zu reduzieren. Um dies auf alle Tasks anzuwenden, können diese Methoden mit der Funktion [eachTask()](api/method/eachtask.md) kombiniert werden. Durch das Einbetten des Vorgangs in [batchUpdate()](api/method/batchupdate.md) wird sichergestellt, dass das Diagramm nur einmal neu gezeichnet wird:

~~~js
function collapseAll() {
    gantt.batchUpdate(function () {
        gantt.eachTask(function (task) {
            gantt.close(task.id)
        })
    })
}

function expandAll() {
    gantt.batchUpdate(function () {
        gantt.eachTask(function (task) {
            gantt.open(task.id)
        })
    })
}
~~~

**Related example:** [Gantt. Add collapse/expand buttons into Gantt header](https://snippet.dhtmlx.com/z7o5qt9s)

**Related example:** [Gantt. Collapse/expand all tasks](https://snippet.dhtmlx.com/72zahagy)

## So zeigen Sie mehrere Zeilen in der Grid-Zelle/Kopfzeile an {#howtodisplayseverallinesinthegridcellheader}

Mehrzeiliger Text in Grid-Kopfzeilen oder -Zellen kann durch Anwendung spezifischer CSS-Stile angezeigt werden.

Für die Grid-Kopfzeile:

~~~css
.gantt_grid_head_text{
    line-height: 12px;
    white-space:normal;
}
~~~

**Related example:** [Gantt. Multiline text in the grid header](https://snippet.dhtmlx.com/lx70v5hw)

Für die Grid-Zellen:

~~~css
.gantt_tree_content, .gantt_task_content{
    line-height: 12px;
    white-space:normal;
    overflow-wrap: break-word; 
}
~~~

**Related example:** [Gantt. Multiline text in Grid cells and Timeline](https://snippet.dhtmlx.com/55uy7ibo)

**Related example:** [Gantt. Multiline text in cells of a Grid column](https://snippet.dhtmlx.com/bwil9sxs)

## So fügen Sie eine benutzerdefinierte Spalte im Grid hinzu {#howtoaddacustomcolumninthegrid}

Das Hinzufügen einer benutzerdefinierten Spalte erfolgt durch Anpassen des Parameters [gantt.config.columns](api/config/columns.md). Durch Angabe der **name**-Eigenschaft zeigt Gantt den entsprechenden Wert der Task-Eigenschaft an. Alternativ kann die Funktion [template()](guides/specifying-columns.md#datamappingandtemplates) verwendet werden, um angepasste Daten oder HTML-Elemente zurückzugeben.

~~~js
gantt.config.columns = [
    /*
    other columns
    */
    {
        name: "progress", label: "Progress", width: 50, resize: true, align: "center", 
        template: function (task) {
            return Math.round(task.progress * 100) + "%"
        }
    },
    /*
    other columns
    */
];
~~~

**Related example:** [Gantt. Custom column with template for task progress](https://snippet.dhtmlx.com/t5ba0gzu)

**Related example:** [Gantt. Custom column with template for action buttons](https://snippet.dhtmlx.com/gfsdp121)

## So fügen Sie einen eigenen Hinzufügen-(+)-Button hinzu {#howtoaddacustomaddbutton}

Ein benutzerdefinierter Hinzufügen-Button kann durch Definition einer eigenen Spalte über den Parameter [gantt.config.columns](api/config/columns.md) erstellt werden. Der Spaltenname sollte nicht *add* sein, da dies die Standard-Hinzufügen-Spalte auslöst. Mit der Funktion [template](guides/specifying-columns.md#datamappingandtemplates) kann beliebiger HTML-Inhalt wie ein Button zurückgegeben und ein Klick-Event zum Hinzufügen von Tasks angebunden werden.

~~~js
gantt.config.columns = [
    /*
    other columns
    */
    {
        name: "add_tasks", label: "+", width: 50, resize: true, align: "center", 
        template: function (task) {
            return `<button onclick='addTask(${task.id})';>`
        }
    },
];
~~~

**Related example:** [Gantt. Custom columns with templates for add (+) buttons](https://snippet.dhtmlx.com/o36jnko3)


## So fügen Sie eine benutzerdefinierte Zeitskala hinzu {#howtoaddacustomscale}

Um eine benutzerdefinierte Zeitskala hinzuzufügen, erstellen Sie zunächst eine [benutzerdefinierte Skalaeinheit](guides/configuring-time-scale.md#customtimeunits) und implementieren Sie die Logik zur Berechnung der Daten.

Hier ist ein Beispiel für eine benutzerdefinierte Skala, die Arbeitsschichtstunden (06:30, 18:30) darstellt:

~~~js
gantt.date.custom_scale_start = function (date) {
    return date;
};

gantt.date.add_custom_scale = function (date, inc) {
    let next = new Date(date)
    if (!next.getMinutes()) {
        gantt.date.day_start(next)
        next = gantt.date.add(next, 6, "hour");
        next = gantt.date.add(next, 30, "minute");
    }
    else {
        next = gantt.date.add(next, 12 * inc, "hour");
    }
    return next
};

gantt.config.scales = [
    { unit: "day", step: 1, date: "%d" },
    { unit: "custom_scale", step: 1, date: "%H:%i" },
];
~~~

**Related example:** [Gantt. Benutzerdefinierte Arbeitsschichtstunden auf der Skala](https://snippet.dhtmlx.com/0l49yvp2)

Hier ist ein weiteres Beispiel, das eine benutzerdefinierte Skala zeigt, die Zahlen anstelle von Tagen verwendet:

~~~js
gantt.config.scales = [
    {
        unit: "day", step: 1, format: function (date) {
            return gantt.getScale().trace_indexes[+date] + 1
        }
    }
]
~~~

**Related example:** [Gantt. Tagesnummern auf der Skala](https://snippet.dhtmlx.com/06bp4wdl)

Dieses Beispiel demonstriert eine benutzerdefinierte Skala für 5-Tage-Arbeitswochen:

~~~js
const weekScaleTemplate = function (date) {
    const dateToStr = gantt.date.date_to_str("%d");
    const endDate = gantt.date.add(gantt.date.add(date, 5, "day"), -1, "day");
    return dateToStr(date) + " - " + dateToStr(endDate);
};

gantt.date.five_days_start = function (date) {
    return date;
};

gantt.date.add_five_days = function (date, inc) {
    if (date.getDay() == 0 || date.getDay() == 6) {
        return gantt.date.add(date, 1 * inc, "day");
    }
    gantt.date.week_start(date);
    return gantt.date.add(date, 5 * inc, "day");
};


gantt.config.scales = [
    { unit: "month", step: 1, format: "%F, %Y" },
    { unit: "five_days", step: 1, format: weekScaleTemplate },
];

gantt.ignore_time = function (date) {
    return date.getDay() == 0 || date.getDay() == 6;
};
~~~

**Related example:** [5-Tage-Arbeitswochen auf der Skala](https://snippet.dhtmlx.com/eq70o558)

Hier ist ein Beispiel für eine benutzerdefinierte Skala, die die Wochen des Jahres anzeigt, wobei die Wochennummer vom ersten Tag des Jahres an beginnt:

~~~js
gantt.date.custom_week_start = function (date) {
    return date;
};

gantt.date.add_custom_week = function (date, inc) {
    const year_start = new Date(date);
    gantt.date.year_start(year_start);
    const week_number = Math.round(gantt.calculateDuration(year_start, date) / 7);

    const next_week = gantt.date.add(year_start, week_number + 1, "week");
    if (next_week.getYear() != date.getYear()) {
        gantt.date.year_start(next_week)
    }
    return next_week;
};


const custom_week_template = function (date) {
    const year_start = gantt.date.year_start(new Date(date));
    const week_number = Math.round(gantt.calculateDuration(year_start, date) / 7) + 1;

    return "Week:" + week_number
}

gantt.config.scales = [
    { unit: 'custom_week', step: 1, template: custom_week_template },
    { unit: 'day', step: 1, format: "%d, %M" },
];
~~~

**Related example:** [Gantt. Wochen des Jahres auf der Skala](https://snippet.dhtmlx.com/gbowxpmr)

## So kopieren und einfügen Sie Aufgaben {#howtocopyandpastetasks}

Die Methode [copy()](api/method/copy.md) kann verwendet werden, um eine tiefe Kopie eines Aufgabenobjekts zu erstellen. Nach dem Kopieren können Sie der geklonten Aufgabe eine neue ID zuweisen und sie mit den Methoden [addTask()](api/method/addtask.md) oder [createTask()](api/method/createtask.md) hinzufügen.

Im Folgenden finden Sie ein Beispiel, wie Sie eine Schaltfläche hinzufügen, die eine Aufgabe klont:

~~~js
function clone_task(id) {
    const task = gantt.getTask(id);
    const clone = gantt.copy(task);
    clone.id = +(new Date());
    gantt.addTask(clone, clone.parent, clone.$index)
}

gantt.config.columns = [
    /*
    andere Spalten
    */
    {
        name: "clone", label: "clone", width: 44, template: function (task) {
            return "<input type="button" value='V' onclick="clone_task("" + task.id + ")>"
        }
    }
];
~~~

**Related example:** [Gantt. Aufgabe klonen](https://snippet.dhtmlx.com/ii9u6wbe)

Das folgende Beispiel zeigt, wie man eine Aufgabe zusammen mit allen Unteraufgaben und Verknüpfungen klonen kann:

~~~js
let child_links;
let clone_original_ids_table;

function obtain_link_ids(id) {
  const task = gantt.getTask(id);
  const source_links = task.$source;
  for (let i = 0; i < source_links.length; i++) {
    child_links.push(source_links[i]);
  }
}

function create_clone_original_ids_table(original_id, clone_id) {
  clone_original_ids_table[original_id] = clone_id;
}

function clone_child_links() {
 for (let i = 0; i < child_links.length; i++) {
  const link = gantt.getLink(child_links[i]);
  if (clone_original_ids_table[link.source] && clone_original_ids_table[link.target]){
    const clone_link = {};
    clone_link.id = gantt.uid();
    clone_link.target = clone_original_ids_table[link.target];
    clone_link.source = clone_original_ids_table[link.source];
    clone_link.type = link.type;
    gantt.addLink(clone_link)
  }
 }
}

function clone_children(id, new_parent) {
  const children = gantt.getChildren(id)
  for (let i = 0; i < children.length; i++) {
    const child_original = gantt.getTask(children[i]);
    const child_clone = gantt.copy(child_original);
    child_clone.id = gantt.uid();
    child_clone.parent = new_parent;
    gantt.addTask(child_clone, child_clone.parent, child_clone.$index);

    obtain_link_ids(child_original.id);
    create_clone_original_ids_table(child_original.id, child_clone.id);

    if (gantt.hasChild(child_original.id)) clone_children(
      child_original.id, child_clone.id
    );
  }
}

function clone_task(id) {
  const task = gantt.getTask(id);
  const clone = gantt.copy(task);
  clone.id = gantt.uid();
  gantt.addTask(clone, clone.parent, clone.$index);

  child_links = [];
  obtain_link_ids(id);

  clone_original_ids_table = {};
  create_clone_original_ids_table(task.id, clone.id);

  if (gantt.hasChild(id)) {
    clone_children(id, clone.id)
  }

  clone_child_links()
}

gantt.config.order_branch = true;
gantt.config.order_branch_free = true;

gantt.config.columns = [
  /*
  andere Spalten
  */
  {
    name: "clone", label: "clone", width: 44, template: function (task) {
      return "<input type="button" value='V' onclick="clone_task("" + task.id + ")>"
    }
  }
];
~~~

**Related example:** [Gantt. Aufgabe mit allen Unteraufgaben und Verknüpfungen klonen](https://snippet.dhtmlx.com/b33jfmws)

Ein weiteres Beispiel zeigt, wie das Kopieren über Tastenkombinationen implementiert werden kann: Wählen Sie Aufgaben aus, drücken Sie *Strg + C*, um sie zu kopieren, und *Strg + V*, um sie als Unteraufgaben der ausgewählten Aufgabe einzufügen:

~~~js
gantt.plugins({
    keyboard_navigation: true,
    multiselect: true,
})

let tasks_to_copy = [];

gantt.ext.keyboardNavigation.addShortcut("ctrl+c", function (e) {
    tasks_to_copy = [];
    gantt.eachSelectedTask(function (task_id) {
        tasks_to_copy.push(task_id);
    });
}, "taskRow");
gantt.ext.keyboardNavigation.addShortcut("ctrl+v", function (e) {
    const new_parent = gantt.getSelectedId();
    for (let i = 0; i < tasks_to_copy.length; i++) {
        const task = gantt.copy(gantt.getTask(tasks_to_copy[i]));
        task.id = +new Date() + '+' + Math.floor(Math.random() * 10);
        gantt.addTask(task, new_parent)
    }
    gantt.getTask(new_parent).$open = true;
    gantt.render()
}, "taskRow");
~~~

**Related example:** [Gantt. Aufgaben per Strg+C, Strg+V kopieren und einfügen](https://snippet.dhtmlx.com/kck3pnmh)

## So fügen Sie ein Ressourcen-Diagramm oder benutzerdefinierte Stile in die exportierte PDF-Datei ein {#howtoaddresourcechartorcustomstylesintheexportedpdffile}

Um benutzerdefinierte Stile oder Ressourcen-Diagramme in die exportierte PDF-Datei einzufügen, exportieren Sie die Daten im [raw](guides/export.md#exportingcustommarkupandstyles)-Modus und fügen Sie die Stile in die Parameter [header](guides/export.md#customstylefortheoutputfile) oder [footer](guides/export.md#customstylefortheoutputfile) der Exportfunktion ein.

Zum Beispiel können Sie benutzerdefinierte Stile in einer Variablen speichern und diese dann im Parameter [header](guides/export.md#customstylefortheoutputfile) verwenden:

~~~js
const header = `
    .gantt_bar_task {
        background: orange;
    }

    .gantt_task_progress {
        background-color: rgba(33, 33, 33, 0.17);
    }
`

gantt.exportToPDF({
       header: "<style>" + header + "</style>"
});
~~~

**Related example:** [Gantt. Export Gantt nach PDF (Stile aus einer Variablen)](https://snippet.dhtmlx.com/51ds6zwa)

Alternativ können Sie den Inhalt eines &lt;style&gt;-Elements von der Seite abrufen und wie folgt hinzufügen:

~~~js
gantt.exportToPDF({
    raw: true,
    header: "<style>" + document.getElementById("styles").innerHTML + "</style>"
});

<style id='styles'>
    .gantt_bar_task {
        background: orange;
    }

    .gantt_task_progress {
        background-color: rgba(33, 33, 33, 0.17);
    }
</style>
~~~

**Related example:** [Gantt. Export Gantt nach PDF (Stile aus &lt;style&gt;-Element)](https://snippet.dhtmlx.com/6qwzclr2)

**Related example:** [Gantt. Export Gantt mit benutzerdefinierten Icons nach PDF](https://snippet.dhtmlx.com/2lqhkfhh)

Hier ist ein Beispiel für den Export eines Gantt-Diagramms mit einer Legende:

**Related example:** [Gantt. Export Gantt mit Legende nach PDF](https://snippet.dhtmlx.com/gz4ddlnl)

Beispiele für den Export von Ressourcenauslastungsdiagrammen und Histogrammen:

**Related example:** [Gantt. Export Gantt mit Ressourcenauslastungsdiagramm nach PDF](https://snippet.dhtmlx.com/lw5xcm31)

**Related example:** [Gantt. Export Gantt mit Ressourcenhistogramm nach PDF](https://snippet.dhtmlx.com/i9me4oxl)

## So berechnen Sie den Aufgabenfortschritt abhängig von untergeordneten Aufgaben {#howtocalculatetaskprogressdependingonchildtasks}

Ein einfacher Ansatz besteht darin, den Fortschritt einer übergeordneten Aufgabe direkt nach einer Änderung einer untergeordneten Aufgabe zu aktualisieren. Um durch übergeordnete Aufgaben zu iterieren, eignet sich die Methode [eachParent()](api/method/eachparent.md) hervorragend.

Im folgenden Beispiel basiert der Fortschritt der übergeordneten Aufgaben ausschließlich auf dem Fortschritt ihrer untergeordneten Aufgaben:

~~~js
gantt.config.auto_types = true;

gantt.templates.progress_text = function (start, end, task) {
    return "<span style='text-align:left;'>" + Math.round(task.progress * 100) 
          + "% </span>";
};

gantt.init("gantt_here");
gantt.parse({
    "data": [
        ...
    ]
});

gantt.attachEvent("onAfterTaskUpdate", function (id, task) {
    parentProgress(id)
});
gantt.attachEvent("onTaskDrag", function (id, mode, task, original) {
    if (mode == "progress") {
        parentProgress(id)
    }
});
gantt.attachEvent("onAfterTaskAdd", function (id) {
    parentProgress(id)
});
gantt.attachEvent("onAfterTaskDelete", function (id, task) {
    if (task.parent) {
        const siblings = gantt.getChildren(task.parent);
        if (siblings.length) {
            parentProgress(siblings[0])
        }
    }
});

function parentProgress(id) {
    gantt.eachParent(function (task) {
        const children = gantt.getChildren(task.id);
        let childProgress = 0;
        for (let i = 0; i < children.length; i++) {
            const child = gantt.getTask(children[i])
            childProgress += (child.progress * 100);
        }
        task.progress = childProgress / children.length / 100;
    }, id)
    gantt.render();
}
~~~

**Related example:** [Gantt. Berechnung des Fortschritts einer übergeordneten Aufgabe dynamisch](https://snippet.dhtmlx.com/xuicd1q7)

Im nächsten Beispiel wird der Fortschritt der übergeordneten Aufgaben sowohl auf Basis des Fortschritts als auch der Dauer der untergeordneten Aufgaben berechnet:

~~~js
function calculateSummaryProgress(task) {
    if (task.type != gantt.config.types.project)
        return task.progress;
    var totalToDo = 0;
    var totalDone = 0;
    gantt.eachTask(function (child) {
        if (child.type != gantt.config.types.project) {
            totalToDo += child.duration;
            totalDone += (child.progress || 0) * child.duration;
        }
    }, task.id);
    if (!totalToDo) return 0;
    else return totalDone / totalToDo;
}

function refreshSummaryProgress(id, submit) {
    if (!gantt.isTaskExists(id))
        return;

    var task = gantt.getTask(id);
    var newProgress = calculateSummaryProgress(task);
    
    if (newProgress !== task.progress) {
        task.progress = newProgress;

        if (!submit) {
            gantt.refreshTask(id);
        } else {
            gantt.updateTask(id);
        }
    }

    if (!submit && gantt.getParent(id) !== gantt.config.root_id) {
        refreshSummaryProgress(gantt.getParent(id), submit);
    }
}


gantt.attachEvent("onParse", function () {
    gantt.eachTask(function (task) {
        task.progress = calculateSummaryProgress(task);
    });
});

gantt.attachEvent("onAfterTaskUpdate", function (id) {
    refreshSummaryProgress(gantt.getParent(id), true);
});

gantt.attachEvent("onTaskDrag", function (id) {
    refreshSummaryProgress(gantt.getParent(id), false);
});
gantt.attachEvent("onAfterTaskAdd", function (id) {
    refreshSummaryProgress(gantt.getParent(id), true);
});


(function () {
    var idParentBeforeDeleteTask = 0;
    gantt.attachEvent("onBeforeTaskDelete", function (id) {
        idParentBeforeDeleteTask = gantt.getParent(id);
    });
    gantt.attachEvent("onAfterTaskDelete", function () {
        refreshSummaryProgress(idParentBeforeDeleteTask, true);
    });
})();

...

gantt.config.auto_types = true;

gantt.templates.progress_text = function (start, end, task) {
    return "<span style='text-align:left;'>" + Math.round(task.progress * 100) 
          + "% </span>";
};

gantt.templates.task_class = function (start, end, task) {
    if (task.type == gantt.config.types.project)
        return "hide_project_progress_drag";
};
~~~


[Calculate Progress of Summary Tasks](https://docs.dhtmlx.com/gantt/samples/08_api/16_dynamic_progress.html)


## So ordnen Sie Aufgaben in der Timeline vertikal neu an {#howtoverticallyreordertasksinthetimeline}

Mit der Methode [addTaskLayer()](api/method/addtasklayer.md) können benutzerdefinierte HTML-Elemente zur Timeline hinzugefügt werden, die sowohl vertikal als auch horizontal verschoben werden können.

Das folgende Beispiel zeigt, wie Aufgaben in der Timeline vertikal neu angeordnet werden können, ähnlich wie Aufgaben im Grid umsortiert werden können:

**Related example:** [Gantt. Aufgaben in der Timeline vertikal umsortieren](https://snippet.dhtmlx.com/fla78m0y)

Ein weiteres Beispiel zeigt, wie geteilte Aufgaben neu angeordnet und Aufgaben in derselben Zeile positioniert werden können:

**Related example:** [Gantt. Geteilte Aufgaben in der Timeline vertikal umsortieren](https://snippet.dhtmlx.com/usfulweq)

## So frieren Sie Spalten im Grid ein/fixieren sie {#howtofreezefixcolumnsinthegrid}

Dieser Effekt kann mit CSS erreicht werden. Die Spalte, die Sie fixieren möchten, sollte eine 'relative' Position haben. Die Eigenschaft 'left' sollte der aktuellen Position des Scrollbalkens entsprechen. Um dies aktuell zu halten, können Sie einen Event Listener für den Scrollbalken hinzufügen und die CSS-Variable entsprechend anpassen:

~~~js
gantt.attachEvent("onGanttReady", function () {
    const el = document.querySelector(".gantt_hor_scroll");
    if (el) {
        el.addEventListener('scroll', function () {
            document.documentElement.style.setProperty(
              '--gantt-frozen-column-scroll-left', el.scrollLeft + "px"
            );
        });
    }
});

const textEditor = { type: "text", map_to: "text" };
const start_dateEditor = { type: "date", map_to: "start_date" };
const end_dateEditor = { type: "date", map_to: "end_date" };
const durationEditor = { type: "number", map_to: "duration", min: 0, max: 100 };


gantt.config.columns = [
    { name: "text", tree: true, width: 150, resize: true, editor: textEditor },
    { name: "start_date", align: "center", width: 120, resize: true, 
      editor: start_dateEditor },
    { name: "end_date", label: "End Time", align: "center", width: 120, 
      resize: true, editor: end_dateEditor },
    { name: "duration", align: "center", width: 80, resize: true, 
      editor: durationEditor },
    { name: "progress", label: "Progress", width: 80, align: "center", 
      resize: true },
    {
        name: "custom", label: "Custom", width: 180, align: "center", 
        resize: true, template: function (task) {
            return Math.round(Math.random() * 100)
        }
    },
    { name: "add", width: 44 }
];

gantt.config.layout = {
    css: "gantt_container",
    cols: [
        {
            rows: [
                {
                    view: "grid", scrollable: true, 
                    scrollX: "scrollHor1", scrollY: "scrollVer"
                },
                {
                    view: "scrollbar", id: "scrollHor1",
                    scroll: 'x', group: 'hor'
                },
            ]
        },
        { resizer: true, width: 1 },
        {
            rows: [
                {
                    view: "timeline", scrollX: "scrollHor", scrollY: "scrollVer"
                },
                {
                    view: "scrollbar", id: "scrollHor",
                    scroll: 'x', group: 'hor'
                },
            ]
        },
        { view: "scrollbar", id: "scrollVer" }
    ]
}
~~~

Fügen Sie dazu die folgenden CSS-Styles hinzu:

~~~css
:root {
    --gantt-frozen-column-scroll-left: 0px;
}

.gantt_cell:nth-child(1),
.gantt_grid_head_cell:nth-child(1) {
    background: Azure;
    position: relative;
    left: var(--gantt-frozen-column-scroll-left);
}

.gantt_grid_editor_placeholder[data-column-name="text"] {
    left: var(--gantt-frozen-column-scroll-left) !important;
}

.gantt_grid_head_cell:nth-child(1) {
    z-index: 1;
}
~~~

**Related example:** [Gantt. Fixierte Spalte im Grid (via CSS)](https://snippet.dhtmlx.com/jbiplpjz)

Alternativ können Sie [mehrere Grid-Ansichten](guides/layout-config.md) einrichten, allerdings funktioniert dieser Ansatz nicht gut mit Inline-Editoren:

~~~js
gantt.config.columns = [
    { name: "start_date", align: "center", width: 80, resize: true },
    { name: "end_date", label: "End Date", align: "center", width: 80, resize: true },
    { name: "duration", width: 60, align: "center", resize: true },
    { name: "progress", label: "Progress", width: 60, align: "center", resize: true },
    { name: "add", width: 44 }
];


const fixedColumn = {
    columns: [
        { name: "text", tree: true, width: 200, resize: true },
    ]
};

gantt.config.layout = {
  css: "gantt_container",
  cols: [
    {
      width: 400,
      //min_width: 100,
      rows: [
        {
          group: "gantt",
          cols: [
            {
              rows: [
                { view: 'grid', config: fixedColumn, bind: "task", 
                  scrollY: 'gridScrollY' }
              ]
            },
            {
              rows: [
                { view: 'grid', bind: "task", scrollX: 'gridScrollX', 
                  scrollable: true, scrollY: 'gridScrollY' },
                { view: 'scrollbar', id: 'gridScrollX' }
              ]
            },
            { view: 'scrollbar', id: 'gridScrollY' }
          ]
        }
      ]
    },
    { resizer: true, width: 1 },
    {
      rows: [
        {
          group: "gantt",
          cols: [
            {
              rows: [
                { view: "timeline", scrollX: "scrollHor", scrollY: "scrollVer" },
                { view: "scrollbar", id: "scrollHor" }
              ]
            },
            { view: 'scrollbar', id: 'scrollVer' }
          ]
        }
      ]
    }
  ]
}
~~~

**Related example:** [Gantt. Fixierte Spalte im Grid (mehrere Grid-Ansichten)](https://snippet.dhtmlx.com/8dg2r8m9)

## So fügen Sie dem Gantt eine Legende hinzu {#howtoaddlegendtothegantt}

Es gibt keine integrierte Funktion zum Hinzufügen einer Legende im Gantt. Die nächstliegende Option ist die [Overlay-Erweiterung](guides/baselines.md#extraoverlayforthechart), diese bietet jedoch nur eingeschränkte Anpassungsmöglichkeiten und ist nicht ganz dasselbe.

Das Hinzufügen einer Legende ist dennoch recht einfach. Sie können das Legendenelement in HTML erstellen und es dann wie folgt in den Gantt-Container einfügen:

~~~js
gantt.$root.appendChild(legend);
~~~

Hier ein Live-Beispiel, bei dem die Legende nach dem Klick auf die Schaltfläche "Toggle legend" oberhalb des Gantt erscheint:

**Related example:** [Gantt. Informationslegende hinzufügen](https://snippet.dhtmlx.com/1ui0lim5)
))

Um Interaktivität zu ermöglichen, können Event Listener direkt am Legendenelement angebracht werden oder Sie können Ereignisse auf Root-Ebene des Gantt mit Event Delegation behandeln:

~~~js
gantt.event(gantt.$root, "click", function(e){
    var closest = gantt.utils.dom.closest;
    if(closest(e.target, ".gantt-legend")) {
        gantt.message("Mouse click inside the legend element");
    }
});
~~~


---
title: "How-tos"
sidebar_label: "How-tos"
---

# How-tos

## Wie man Raster/Diagramm umschaltet

Wenn Sie die Standardlayout-Konfiguration verwenden, können Sie die Parameter [show_grid](api/config/show_grid.md) oder [show_chart](api/config/show_chart.md) ändern und die [render()](api/method/render.md) Methode verwenden, um die Änderungen neu zu zeichnen.

~~~js
function toggleGrid(){
    gantt.config.show_grid = !gantt.config.show_grid;
    gantt.render();
}
~~~

**Zugehöriges Beispiel** [Gantt. Raster umschalten (Standardlayout)](https://snippet.dhtmlx.com/gnloz505)

~~~js
function toggleChart(){
    gantt.config.show_chart = !gantt.config.show_chart;
    gantt.render();
}
~~~

**Zugehöriges Beispiel** [Gantt. Zeitleiste umschalten (Standardlayout)](https://snippet.dhtmlx.com/kqe1hqp2)
 
Wenn Sie eine benutzerdefinierte Layout-Konfiguration verwenden, müssen Sie mehrere Layout-Konfigurationen erstellen – mit und ohne Raster/Zeitleiste. Um zwischen ihnen zu wechseln, müssen Sie den Parameter [gantt.config.layout](api/config/layout.md) ändern und die [init()](api/method/init.md) Methode anwenden, um die Änderungen zu sehen:

~~~js
let showGrid = true;

function toggleGrid() {
    showGrid = !showGrid;
    if (showGrid) {
        gantt.config.layout = gridAndChart; // Layout mit Raster und Timeline
    }
    else {
        gantt.config.layout = onlyChart; // Layout nur mit Timeline

    }
    gantt.init("gantt_here");
}
~~~

**Zugehöriges Beispiel** [Gantt. Raster umschalten (benutzerdefiniertes Layout)](https://snippet.dhtmlx.com/omk98l0x)

~~~js
let showChart = true;

function toggleChart() {
    showChart = !showChart;
    if (showChart) {
        gantt.config.layout = gridAndChart; // Layout mit Raster und Timeline
    }
    else {
        gantt.config.layout = onlyGrid; // Layout nur mit Raster

    }
    gantt.init("gantt_here");
}
~~~

**Zugehöriges Beispiel** [Gantt. Zeitleiste umschalten (benutzerdefiniertes Layout)](https://snippet.dhtmlx.com/aukjyqc8)

## Wie man die Ressourcenansicht umschaltet

Wie beim vorherigen Anwendungsfall müssen Sie mehrere Layout-Konfigurationen erstellen – mit und ohne Ressourcenansicht. Um zwischen ihnen zu wechseln, müssen Sie den Parameter [gantt.config.layout](api/config/layout.md) ändern und die [init()](api/method/init.md) Methode anwenden, um die Änderungen zu sehen:

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

**Zugehöriges Beispiel** [Gantt. Ressourcenlastendiagramm umschalten](https://snippet.dhtmlx.com/vbaczl07)

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

**Zugehöriges Beispiel** [Gantt. Histogramm der Ressourcen umschalten](https://snippet.dhtmlx.com/isn2ger4)

Alternativ können Sie das Layout auch über die Layout-Ansichten erzeugen und Gantt neu initialisieren, um die Änderungen zu sehen:

**Zugehöriges Beispiel** [Gantt. Layout erzeugen](https://snippet.dhtmlx.com/3dnzfhit)

## Wie man unendliches Scrollen in der Timeline ermöglicht

Es gibt mehrere Möglichkeiten, unendliches Scrollen zu implementieren. In den meisten Fällen müssen Sie jedoch den dargestellten Datumsbereich ([gantt.config.start_date](api/config/start_date.md) und [gantt.config.end_date](api/config/end_date.md) Parameter) anpassen:

### Während der Nutzung des Scrollbars

Sie müssen die [Scroll-Position](api/event/onganttscroll.md) abrufen und den Datumsbereich erhöhen. Beachten Sie, dass ein zu häufiges Neurendern von Gantt die Leistung beeinträchtigen kann, daher sollten Sie dies nach einer Wartezeit tun:

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

**Zugehöriges Beispiel** [Gantt. Infinite scroll while using scrollbar]

### Während des Ziehens der Timeline

Sie müssen die aktuelle Scroll-Position erhalten und falls sie nahe dem Start- oder Ende der Timeline liegt, den angezeigten Datumsbereich erweitern:

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

**Zugehöriges Beispiel** [Gantt. Infinite scroll while dragging the timeline]

### Während des Ziehens einer Aufgabe

Wenn der Datumsbereich nicht festgelegt ist, können Sie bei jedem Ziehen einer Aufgabe nahe dem Start- oder Endpunkt der Timeline die [render()]-Methode aufrufen:

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

**Zugehöriges Beispiel** [Gantt. Infinite scroll while dragging a task (default range settings)](https://snippet.dhtmlx.com/44qcunjc)

Wenn der [date range](api/config/start_date.md) gesetzt ist, müssen Sie ihn ändern:

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

**Zugehöriges Beispiel** [Gantt. Infinite scroll while dragging a task (explicit range settings)](https://snippet.dhtmlx.com/3lrm0wyp)

## Wie man Aufgaben dynamisch lädt

Sie können erkennen, dass Sie zum letzten sichtbaren Task gescrollt haben, im [onGanttScroll](api/event/onganttscroll.md) Ereignis, und die [parse()](api/method/parse.md) Methode verwenden, um neue Aufgaben zu laden:

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

**Zugehöriges Beispiel** [Gantt. Load data dynamically](https://snippet.dhtmlx.com/39l7o0rm)

## Wie man alle Aufgaben mit einem Button erweitert/einklappen

Sie können die [open()](api/method/open.md) und [close()](api/method/close.md) Methoden verwenden, um eine Aufgabe zu öffnen bzw. zu schließen. Um dies auch mit allen Aufgaben im Diagramm zu tun, müssen Sie die Methode innerhalb der [eachTask()](api/method/eachtask.md) Funktion verwenden. Um die Änderungen nur einmal neu zu zeichnen, können Sie die Funktion in der [batchUpdate()](api/method/batchupdate.md) Methode einhüllen:

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

**Zugehöriges Beispiel** [Gantt. Buttons zum Aus-/Einklappen in den Gantt-Header integrieren]
**Zugehöriges Beispiel** [Gantt. Alle Aufgaben einklappen/ausklappen]

## Wie man mehrere Zeilen in der Grid-Zelle/ im Grid-Header anzeigt

Dies kann erreicht werden, indem einige Stilregeln hinzugefügt werden.

Für den Grid-Header:

~~~css
.gantt_grid_head_text{
    line-height: 12px;
    white-space:normal;
}
~~~

**Zugehöriges Beispiel** [Gantt. Mehrzeiliger Text im Grid-Header] 

Für die Grid-Zellen:

~~~css
.gantt_tree_content, .gantt_task_content{
    line-height: 12px;
    white-space:normal;
    overflow-wrap: break-word; 
}
~~~

**Zugehöriges Beispiel** [Gantt. Mehrzeiliger Text in Grid-Zellen und Timeline]

**Zugehöriges Beispiel** [Gantt. Mehrzeiliger Text in Zellen einer Grid-Spalte]

## Wie man eine benutzerdefinierte Spalte im Grid hinzufügt

Um eine benutzerdefinierte Spalte hinzuzufügen, müssen Sie den Parameter [gantt.config.columns](api/config/columns.md) ändern. Wenn Sie den **name**-Parameter festlegen, gibt Gantt den Wert der Task-Eigenschaft mit demselben Namen zurück. Sie können auch die [template()](guides/specifying-columns.md#datamappingandtemplates) Funktion verwenden, um beliebige benutzerdefinierte Daten oder HTML-Elemente zurückzugeben.

~~~js
gantt.config.columns = [
    /*
    andere Spalten
    */
    {
        name: "progress", label: "Progress", width: 50, resize: true, align: "center", 
        template: function (task) {
            return Math.round(task.progress * 100) + "%"
        }
    },
    /*
    andere Spalten
    */
];
~~~

**Zugehöriges Beispiel** [Gantt. Benutzerdefinierte Spalte mit Template für Task-Fortschritt]
**Zugehöriges Beispiel** [Gantt. Benutzerdefinierte Spalte mit Template für Aktions-Schaltflächen]

## Wie man eine benutzerdefinierte Add(+) Schaltfläche hinzufügt

Sie müssen eine benutzerdefinierte Spalte über den [gantt.config.columns](api/config/columns.md) Parameter erstellen. Sie können jeden Namen für diese Spalte verwenden, außer *add*. Andernfalls fügt Gantt die Standard-Spalte *add* hinzu.
Es ist möglich, beliebige HTML-Elemente in der Grid-Spalte mithilfe der [template](guides/specifying-columns.md#datamappingandtemplates) Funktion zurückzugeben. Das bedeutet, dass Sie eine Schaltfläche zurückgeben und ein Klick-Ereignis daran anhängen können, mit einer benutzerdefinierten Funktion zum Hinzufügen von Aufgaben.

~~~js
gantt.config.columns = [
    /*
    andere Spalten
    */
    {
        name: "add_tasks", label: "+", width: 50, resize: true, align: "center", 
        template: function (task) {
            return `<button onclick='addTask(${task.id})';>`
        }
    },
];
~~~

**Zugehöriges Beispiel**  [Gantt. Benutzerdefinierte Spalten mit Templates für Add (+)-Schaltflächen]
## Wie man eine benutzerdefinierte Skala hinzufügt

Sie müssen eine [benutzerdefinierte Skalen-Einheit](guides/configuring-time-scale.md#customtimeunits) erstellen und eine Logik hinzufügen, um die Daten zu berechnen.

Ein Beispiel einer benutzerdefinierten Skala mit Arbeitsstunden (06:30, 18:30):

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

**Zugehöriges Beispiel** [Gantt. Benutzerdefinierte Arbeitsstunden auf der Skala]

Ein Beispiel einer benutzerdefinierten Skala mit Zahlen statt Tagen:

~~~js
gantt.config.scales = [
    {
        unit: "day", step: 1, format: function (date) {
            return gantt.getScale().trace_indexes[+date] + 1
        }
    }
]
~~~

**Zugehöriges Beispiel** [Gantt. Zahlen der Tage auf der Skala]

Ein Beispiel einer benutzerdefinierten Skala mit einer 5-Tage-Arbeitswoche:

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

**Zugehöriges Beispiel** [5-Tage-Arbeitswochen auf der Skala]

Ein Beispiel einer benutzerdefinierten Skala mit Wochen des Jahres (die Wochennummer beginnt am ersten Tag des Jahres):

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

**Zugehöriges Beispiel** [Gantt. Wochen des Jahres auf der Skala]
 
## Wie man Aufgaben kopiert und einfügt

Sie können die [copy()](api/method/copy.md) Methode verwenden, um eine tiefe Kopie des Aufgabenobjekts zu erstellen. Dann können Sie die ID der geklonten Aufgabe ändern. Danach können Sie die geklonte Aufgabe mit den Methoden [addTask()](api/method/addtask.md) oder [createTask()](api/method/createtask.md) hinzufügen.

So können Sie eine Schaltfläche hinzufügen, um eine Aufgabe zu klonen:

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

**Zugehöriges Beispiel**  [Gantt. Clone a task]

Das folgende Beispiel zeigt, wie man eine Aufgabe mit allen Unteraufgaben und Verknüpfungen klont:

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

**Zugehöriges Beispiel**  [Gantt. Clone a task with all its subtasks and links]

Eine weitere Beispiel zeigt, wie das Kopieren über die Tastaturnavigation umgesetzt wird (Aufgaben auswählen, die Tastenkombination Ctrl + C verwenden, um sie zu kopieren, und Ctrl + V, um sie als Unteraufgaben der ausgewählten Aufgabe einzufügen):

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

**Zugehöriges Beispiel** [Gantt. Copy and paste tasks via Ctrl+C, Ctrl+V]

## Wie man Ressourcen-Diagramm oder benutzerdefinierte Stile in die exportierte PDF-Datei hinzufügt

Sie müssen die Daten im [raw](guides/export.md#exportingcustommarkupandstyles) Modus exportieren und die Stile in der [header](guides/export.md#customstylefortheoutputfile) oder [footer](guides/export.md#customstylefortheoutputfile) Parameter der Export-Funktion einbinden.

Zum Beispiel können Sie benutzerdefinierte Stile in einer Variable speichern und diese dann dem [header](guides/export.md#customstylefortheoutputfile) Parameter hinzufügen

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

**Zugehöriges Beispiel** [Gantt. Export Gantt to PDF (styles from a variable)](https://snippet.dhtmlx.com/51ds6zwa)

Oder Sie finden das &lt;style&gt; Element auf der Seite und fügen dessen Inhalt wie folgt hinzu:

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

**Zugehöriges Beispiel** [Gantt. Export Gantt to PDF (styles from &lt;style&gt; element)](https://snippet.dhtmlx.com/6qwzclr2)

**Zugehöriges Beispiel** [Gantt. Export Gantt with custom icons to PDF](https://snippet.dhtmlx.com/2lqhkfhh)

Ein Beispiel für den Export von Gantt mit einer Legende:

**Zugehöriges Beispiel** [Gantt. Export Gantt with legend to PDF](https://snippet.dhtmlx.com/gz4ddlnl)

Beispiele für den Export von Ressourcenlastendiagramm und Histogramm:

**Zugehöriges Beispiel** [Gantt. Export Gantt with resource load diagram to PDF](https://snippet.dhtmlx.com/lw5xcm31)

**Zugehöriges Beispiel** [Gantt. Export Gantt with resource histogram to PDF](https://snippet.dhtmlx.com/i9me4oxl)

## Wie man den Fortschritt einer Aufgabe abhängig von Kind-Aufgaben berechnet

Eine einfache Möglichkeit, dies zu realisieren, besteht darin, den Fortschritt einer Elternaufgabe zu berechnen, nachdem Sie eine Kindaufgabe aktualisiert haben. Um über Elternaufgaben zu iterieren, können Sie die Methode [eachParent()](api/method/eachparent.md) verwenden.

Im folgenden Beispiel hängt der Fortschritt der Elternaufgaben nur vom Fortschritt der Kindaufgaben ab:

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

**Zugehöriges Beispiel** [Gantt. Fortschritt eines Elterntasks dynamisch berechnen]

Im nächsten Beispiel hängt der Fortschritt der Elternaufgaben vom Fortschritt der Kindaufgaben und deren Dauer ab:

~~~js
function calculateSummaryProgress(task) {
    if (task.type !== gantt.config.types.project) return task.progress;

    let totalToDo = 0;
    let totalDone = 0;

    gantt.eachTask(child => {
        if (child.type !== gantt.config.types.project) {
            totalToDo += child.duration;
            totalDone += (child.progress || 0) * child.duration;
        }
    }, task.id);

    return totalToDo ? totalDone / totalToDo : 0;
}

function refreshSummaryProgress(id, submit) {
    if (!gantt.isTaskExists(id)) return;

    const task = gantt.getTask(id);
    const newProgress = calculateSummaryProgress(task);

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

gantt.attachEvent("onParse", () => {
    gantt.eachTask(task => {
        task.progress = calculateSummaryProgress(task);
    });
});

gantt.attachEvent("onAfterTaskUpdate", id => {
    refreshSummaryProgress(gantt.getParent(id), true);
});

gantt.attachEvent("onTaskDrag", id => {
    refreshSummaryProgress(gantt.getParent(id), false);
});

gantt.attachEvent("onAfterTaskAdd", id => {
    refreshSummaryProgress(gantt.getParent(id), true);
});

(() => {
    let idParentBeforeDeleteTask = 0;

    gantt.attachEvent("onBeforeTaskDelete", id => {
        idParentBeforeDeleteTask = gantt.getParent(id);
    });

    gantt.attachEvent("onAfterTaskDelete", () => {
        refreshSummaryProgress(idParentBeforeDeleteTask, true);
    });
})();

gantt.config.auto_types = true;

gantt.templates.progress_text = (start, end, task) =>
    `<span style='text-align:left;'>${Math.round(task.progress * 100)}% </span>`;

gantt.templates.task_class = (start, end, task) =>
    task.type === gantt.config.types.project ? "hide_project_progress_drag" : "";
~~~


[Calculate Progress of Summary Tasks](https://docs.dhtmlx.com/gantt/samples/08_api/16_dynamic_progress.html)


## Wie man Aufgaben in der Timeline vertikal neu anordnet

Sie können die [addTaskLayer()](api/method/addtasklayer.md) Methode verwenden, um benutzerdefinierte HTML-Elemente in der Timeline anzuzeigen und Funktionen zum vertikalen und horizontalen Ziehen hinzuzufügen.

Im folgenden Beispiel funktioniert es wie eine normale Neuanordnung der Aufgaben im Raster:

**Zugehöriges Beispiel** [Gantt. Aufgaben vertical neu anordnen in der Timeline](https://snippet.dhtmlx.com/fla78m0y)

Im folgenden Beispiel können Sie geteilte Aufgaben neu anordnen und Aufgaben in derselben Zeile platzieren:

**Zugehöriges Beispiel** [Gantt. Getrennte Aufgaben vertikal in der Timeline neu anordnen](https://snippet.dhtmlx.com/usfulweq)

## Wie man Spalten im Grid einfriert/festsetzt

Dies kann durch CSS erfolgen. Sie müssen die 'relative' Position der Spalte festlegen, die fixiert werden soll. Der 'left'-Parameter sollte denselben Wert wie die Position des Scrollbalkens haben, damit Sie dem Scrollbalken-Element einen Ereignis-Handler hinzufügen und die CSS-Variable aktualisieren können:

~~~js
gantt.attachEvent("onGanttReady", () => {
    const el = document.querySelector(".gantt_hor_scroll");
    if (el) {
        el.addEventListener("scroll", () => {
            document.documentElement.style.setProperty(
                "--gantt-frozen-column-scroll-left",
                `${el.scrollLeft}px`
            );
        });
    }
});

const textEditor = { type: "text", map_to: "text" };
const startDateEditor = { type: "date", map_to: "start_date" };
const endDateEditor = { type: "date", map_to: "end_date" };
const durationEditor = { type: "number", map_to: "duration", min: 0, max: 100 };

gantt.config.columns = [
    { name: "text", tree: true, width: 150, resize: true, editor: textEditor },
    { name: "start_date", align: "center", width: 120, resize: true,
        editor: startDateEditor },
    { name: "end_date", label: "End Time", align: "center", width: 120, resize: true,
        editor: endDateEditor },
    { name: "duration", align: "center", width: 80, resize: true,
        editor: durationEditor },
    { name: "progress", label: "Progress", width: 80, align: "center", resize: true },
    { name: "custom", label: "Custom", width: 180, align: "center", resize: true,
        template: task => Math.round(Math.random() * 100) },
    { name: "add", width: 44 }
];

gantt.config.layout = {
    css: "gantt_container",
    cols: [
        {
            rows: [
                { view: "grid", scrollable: true, scrollX: "scrollHor1",
                    scrollY: "scrollVer" },
                { view: "scrollbar", id: "scrollHor1", croll: "x", group: "hor" }
            ]
        },
        { resizer: true, width: 1 },
        {
            rows: [
                { view: "timeline", scrollX: "scrollHor", scrollY: "scrollVer" },
                { view: "scrollbar", id: "scrollHor", scroll: "x", group: "hor" }
            ]
        },
        { view: "scrollbar", id: "scrollVer" }
    ]
};
~~~

Und fügen Sie CSS-Stile hinzu:

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

**Zugehöriges Beispiel** [Gantt. Gefrorene Spalte im Grid (über CSS)](https://snippet.dhtmlx.com/jbiplpjz)

Eine andere Möglichkeit ist das Hinzufügen von [mehreren Grid-Ansichten](guides/layout-config.md), aber es funktioniert nicht gut mit den Inline-Editoren:

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
            rows: [
                {
                    group: "gantt",
                    cols: [
                        {
                            rows: [
                                { view: "grid", config: fixedColumn, bind: "task",
                                    scrollY: "gridScrollY" }
                            ]
                        },
                        {
                            rows: [
                                { view: "grid", bind: "task", scrollX: "gridScrollX",
                                    scrollable: true, scrollY: "gridScrollY" },
                                { view: "scrollbar", id: "gridScrollX" }
                            ]
                        },
                        { view: "scrollbar", id: "gridScrollY" }
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
                                { view: "timeline", scrollX: "scrollHor",
                                    scrollY: "scrollVer" },
                                { view: "scrollbar", id: "scrollHor" }
                            ]
                        },
                        { view: "scrollbar", id: "scrollVer" }
                    ]
                }
            ]
        }
    ]
};
~~~

**Zugehöriges Beispiel** [Gantt. Feststehende Spalte im Grid (mehrere Grid-Ansichten)](https://snippet.dhtmlx.com/8dg2r8m9)

## Wie man eine Legende zum Gantt hinzufügt

Es gibt keine integrierte Methode, um eine Legende im Gantt anzuzeigen; das Nächstliegende ist die [Overlay-Erweiterung](guides/baselines.md#extra-overlay-for-the-chart), aber sie ist nicht genau dasselbe und lässt sich nicht so einfach anpassen.

Legenden lassen sich jedoch relativ einfach implementieren. Sie können das Legendenelement in HTML codieren und es dann einfach in den Gantt-Knoten einfügen:

~~~js
gantt.$root.appendChild(legend);
~~~

Hier ist ein Live-Beispiel. Um die Legende anzuzeigen, drücken Sie den Button "Toggle legend" oben am Gantt:

**Zugehöriges Beispiel** [Gantt. Add information legend](https://snippet.dhtmlx.com/1ui0lim5)

Um Interaktivität hinzuzufügen, können Sie Listener für DOM-Ereignisse direkt dem Legendenelement hinzufügen, oder Sie können DOM-Ereignisse auf der Root-Ebene des Gantt überwachen (Event-Delegation):

~~~js
gantt.event(gantt.$root, "click", function(e){
    const closest = gantt.utils.dom.closest;
    if(closest(e.target, ".gantt-legend")) {
        gantt.message("Mouse click inside the legend element");
    }
});
~~~
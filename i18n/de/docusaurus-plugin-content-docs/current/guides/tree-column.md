--- 
title: "Die Baumspalte konfigurieren"
sidebar_label: "Die Baumspalte konfigurieren"
---

# Die Baumspalte konfigurieren

Um sich über die verfügbaren baumbezogenen Methoden zu informieren, lesen Sie den Artikel [Task Parent/Child](guides/task-tree-operations.md).

## Ein- und Ausklappen eines Aufgabenastes

- Um einen Aufgabenast zu öffnen, verwenden Sie die Methode [`open()`](api/method/open.md):

~~~js {7}
const data = {
    tasks: [
        { id: "p_1", text: "Project #1", start_date: "2027-04-01", duration: 18 },
        { id: "t_1", text: "Task #1", start_date: "2027-04-02", duration: 8, parent: "p_1" }
    ]
};
gantt.open("p_1");
~~~

- Um einen Aufgabenast zu schließen, verwenden Sie die Methode [`close()`](api/method/close.md):

~~~js {7}
const data = {
    tasks: [
        { id: "p_1", text: "Project #1", start_date: "2027-04-01", duration: 18 },
        { id: "t_1", text: "Task #1", start_date: "2027-04-02", duration: 8, parent: "p_1" }
    ]
};
gantt.close("p_1");
~~~ 

## Ein- bzw. Ausklappen mehrerer Zweige

Wenn Sie mehrere Aufgabenäste öffnen oder schließen müssen, ist der schnellste Weg, den entsprechenden booleschen Wert (`true` zum Öffnen, `false` zum Schließen) programmgesteuert der Eigenschaft `.$open` der benötigten Aufgaben zuzuweisen und anschließend Gantt neu zu zeichnen.

- Alle Aufgaben öffnen (true):

~~~js
gantt.eachTask((task) => {
    task.$open = true;
});
gantt.render();
~~~

- Alle Aufgaben schließen (false):

~~~js
gantt.eachTask((task) => {
    task.$open = false;
});
gantt.render();
~~~

:::note
Wenn Sie alle Aufgaben auf einmal mit einem Knopf ein- bzw. ausklappen möchten, gehen Sie zum Abschnitt [How to expand/collapse all tasks with a button](guides/how-to.md#how-to-expandcollapse-all-tasks-with-a-button).
:::

## Die Kinder eines Aufgabenastes abrufen

Um die Kinder eines Aufgabenastes zu erhalten, verwenden Sie die Methode [`getChildren()`](api/method/getchildren.md):

~~~js {7}
const data = {
    tasks: [
        { id: "p_1", text: "Project #1", start_date: "2027-04-01", duration: 18 },
        { id: "t_1", text: "Task #1", start_date: "2027-04-02", duration: 8, parent: "p_1" }
    ]
};
gantt.getChildren("p_1"); // -> ["t_1"]
~~~

*Weitere baumbezogene Methoden finden Sie im Artikel Task Parent/Child.*  

## Die Symbole des Baums ändern

### Elterneinträge
Um das Symbol für die Elterneinträge festzulegen, verwenden Sie die Vorlage [`grid_folder`](api/template/grid_folder.md):

~~~js
gantt.templates.grid_folder = (item) => `<div class="gantt_tree_icon gantt_folder_${item.$open ? "open" : "closed"}"></div>`;
~~~

### Kindknoten
Um das Symbol für die Kindknoten festzulegen, verwenden Sie die Vorlage [`grid_file`](api/template/grid_file.md):

~~~js
gantt.templates.grid_file = (item) => `<div class="gantt_tree_icon gantt_file"></div>`;
~~~

### Öffnen/Schließen-Symbol
Um das Symbol für das Öffnen/Schließen-Symbol festzulegen, verwenden Sie die Vorlage [`grid_open`](api/template/grid_open.md):

~~~js
gantt.templates.grid_open = (item) => `<div class="gantt_tree_icon gantt_${item.$open ? "close" : "open"}"></div>`;
~~~

## Festlegen der Einrückung der Kindaufgaben in einem Zweig

Um die Einrückung der Kindaufgaben in einem Zweig festzulegen, verwenden Sie die Vorlage [`grid_indent`](api/template/grid_indent.md) und ändern Sie die CSS-Eigenschaft `width`:

~~~js
gantt.templates.grid_indent = (task) => `<div style="width:20px; float:left; height:100%"></div>`;
~~~

## Hinzufügen von Kontrollkästchen zu Baumknoten

Um Kontrollkästchen oder anderen HTML-Inhalt zu Baumknoten hinzuzufügen, verwenden Sie die Vorlage [`grid_blank`](api/template/grid_blank.md):

~~~js
gantt.templates.grid_blank = (task) => `<input id="ch1" type="checkbox" onclick="someFunc()">`;
~~~

## Die Vorlage für Baumknoten festlegen

Um die Vorlage für Baumknoten festzulegen, verwenden Sie das `template`-Attribut in der [columns](api/config/columns.md) Eigenschaft.

Der Rückgabewert der `template`-Funktion wird als Inner HTML hinzugefügt. Daher können Sie im Attribut beliebige HTML-Strukturen verwenden.

:::note
Wenn Sie [dhtmlxConnector](https://docs.dhtmlx.com/connector__php__index.html) nicht verwenden, um sich mit der Server-Seite zu integrieren, müssen Sie die Daten, die Sie in das Gantt-Diagramm laden, sanitieren, um mögliche XSS-Angriffe zu verhindern. [dhtmlxConnector](https://docs.dhtmlx.com/connector__php__index.html) erledigt das automatisch.
:::
~~~js
gantt.config.columns = [
    { name: "text", label: "Task name", tree: true, width: 230, template: taskTemplate },
    { name: "start_date", label: "Start time", align: "center" },
    { name: "duration", label: "Duration", align: "center" }
];
gantt.init("gantt_here");

function taskTemplate(task) {
    if (task.priority === 1) {
        return `<div class="important">${task.text} (${task.users})</div>`;
    }

    return `${task.text} (${task.users})`;
};
~~~


**Zugehöriges Beispiel**: [Template for tree nodes](https://docs.dhtmlx.com/gantt/samples/04_customization/05_tree_template.html)
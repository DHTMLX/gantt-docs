---
title: "Konfiguration der Baum-Spalte"
sidebar_label: "Konfiguration der Baum-Spalte"
---

# Konfiguration der Baum-Spalte

Um sich über die verfügbaren baumbezogenen Methoden zu informieren, lesen Sie bitte den [Task Parent/Child](guides/task-tree-operations.md) Artikel.

## Aufgabenzweig erweitern/verkleinern

- Zum Öffnen eines Aufgabenzweigs verwenden Sie die [open](api/method/open.md) Methode:

~~~js
var data = {
  tasks:[
     {id:"p_1", text:"Project #1", start_date:"01-04-2020", duration:18},
     {id:"t_1", text:"Task #1",    start_date:"02-04-2020", duration:8,
     parent:"p_1"}
]};
gantt.open("p_1"); /*!*/
~~~

- Zum Schließen eines Aufgabenzweigs verwenden Sie die [close](api/method/close.md) Methode:

~~~js
var data = {
  tasks:[
     {id:"p_1", text:"Project #1", start_date:"01-04-2020", duration:18},
     {id:"t_1", text:"Task #1",    start_date:"02-04-2020", duration:8,
     parent:"p_1"}
]};
gantt.close("p_1"); /*!*/
~~~ 

## Mehrere Zweige erweitern/verkleinern

Wenn Sie mehrere Aufgabenzweige öffnen/geschlossen benötigen, ist der schnellste Weg, den entsprechenden Boolean-Wert (true - öffnen, false - schließen) programmatisch der benötigten Tasks-Eigenschaft *.$open* zuzuweisen und anschließend den Gantt neu zu zeichnen.

- Alle Aufgaben erweitern:

~~~js
gantt.eachTask(function(task){
    task.$open = true;
});
gantt.render();
~~~

- Alle Aufgaben verkleinern:

~~~js
gantt.eachTask(function(task){
    task.$open = false;
});
gantt.render();
~~~

:::note
Hinweis: Wenn Sie alle Aufgaben auf einmal mit einem Button zusammenklappen/aufklappen möchten, gehen Sie zum Abschnitt [How to expand/collapse all tasks with a button](guides/how-to.md#how-to-expandcollapse-all-tasks-with-a-button).
:::

## Die Kinder eines Tasks abrufen

Um die Kinder eines Zweigauftrags abzurufen, verwenden Sie die [getChildren](api/method/getchildren.md) Methode:

~~~js
var data = {
  tasks:[
     {id:"p_1", text:"Project #1", start_date:"01-04-2020", duration:18},
     {id:"t_1", text:"Task #1",    start_date:"02-04-2020", duration:8,
     parent:"p_1"}
]};
gantt.getChildren("p_1");//->["t_1"] /*!*/
~~~

*Weitere baumbezogene Methoden finden Sie im Artikel [Task Parent/Child](guides/task-tree-operations.md).*

## Die Symbole des Baums ändern

### Elterneinträge
Um das Symbol für die Elterneinträge festzulegen, verwenden Sie das Template [grid_folder](api/template/grid_folder.md):

~~~js
gantt.templates.grid_folder = function(item) {
    return "<div class='gantt_tree_icon gantt_folder_" +
    (item.$open ? "open" : "closed") + "'></div>";
};
~~~


### Kindelemente
Um das Symbol für die Kindelemente festzulegen, verwenden Sie das Template [grid_file](api/template/grid_file.md):

~~~js
gantt.templates.grid_file = function(item) {
    return "<div class='gantt_tree_icon gantt_file'></div>";
};
~~~


### Öffnen/Schließen-Symbol
Um das Symbol für das Öffnen/Schließen-Symbol festzulegen, verwenden Sie das Template [grid_open](api/template/grid_open.md):

~~~js
gantt.templates.grid_open = function(item) {
    return "<div class='gantt_tree_icon gantt_" + 
    (item.$open ? "close" : "open") + "'></div>";
};
~~~


## Die Einrückung von Kindern in einem Zweig festlegen

Um die Einrückung der Kindaufgaben in einem Zweig festzulegen, verwenden Sie das Template [grid_indent](api/template/grid_indent.md) (ändern Sie die CSS-Eigenschaft **width**):

~~~js
gantt.templates.grid_indent="function(task){"
    return "<div style='width:20px; float:left; height:100%'></div>"
};
~~~


## Checkboxen zu Baumknoten hinzufügen

Um Checkboxen (oder beliebigen anderen HTML-Inhalt) zu Baumknoten hinzuzufügen, verwenden Sie das Template [grid_blank](api/template/grid_blank.md):

~~~js
gantt.templates.grid_blank="function(task){"
    return "<input id='ch1' type='checkbox' onClick='someFunc()'></input>"
};
~~~


## Die Vorlage (Template) für Baumknoten festlegen

Um die Vorlage für Baumknoten festzulegen, verwenden Sie das **template** Attribut in der [columns](api/config/columns.md) Eigenschaft. 

 Der Rückgabewert der Funktion des **template**-Attributs wird als inneres HTML hinzugefügt. Deshalb können Sie beliebige HTML-Strukturen im Attribut verwenden.

:::note
Hinweis: Falls Sie [dhtmlxConnector](https://docs.dhtmlx.com/connector__php__index.html) nicht verwenden, um mit der Serverseite zu integrieren, müssen Sie die Daten, die Sie in das Gantt-Diagramm laden, bereinigen, um mögliche XSS-Angriffe zu verhindern ([dhtmlxConnector](https://docs.dhtmlx.com/connector__php__index.html) macht dies automatisch).
:::

~~~js
gantt.config.columns="["
    {name:"text",       label:"Task name",  tree:true, width:230, template:myFunc },
    {name:"start_date", label:"Start time", align: "center" },
    {name:"duration",   label:"Duration",   align: "center" }
];
gantt.init("gantt_here");
    
function myFunc(task){
    if(task.priority ==1)
        return "<div class='important'>"+task.text+" ("+task.users+") </div>";
    return task.text+" ("+task.users+")";
};
~~~


[Vorlage für Baumknoten](https://docs.dhtmlx.com/gantt/samples/04_customization/05_tree_template.html)
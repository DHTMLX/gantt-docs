---
title: "Konfiguration der Baumspalte"
sidebar_label: "Konfiguration der Baumspalte"
---

# Konfiguration der Baumspalte

Weitere Informationen zu verfügbaren baumbezogenen Methoden finden Sie im Artikel [Task Parent/Child](guides/task-tree-operations.md).

## Auf- und Zuklappen eines Aufgabenastes

- Um einen Aufgabenast aufzuklappen, verwenden Sie die Methode [open](api/method/open.md):

~~~js
var data = {
  tasks:[
     {id:"p_1", text:"Project #1", start_date:"01-04-2020", duration:18},
     {id:"t_1", text:"Task #1",    start_date:"02-04-2020", duration:8,
     parent:"p_1"}
]};
gantt.open("p_1"); /*!*/
~~~

- Um einen Aufgabenast zuzuklappen, verwenden Sie die Methode [close](api/method/close.md):

~~~js
var data = {
  tasks:[
     {id:"p_1", text:"Project #1", start_date:"01-04-2020", duration:18},
     {id:"t_1", text:"Task #1",    start_date:"02-04-2020", duration:8,
     parent:"p_1"}
]};
gantt.close("p_1"); /*!*/
~~~ 

## Mehrere Äste auf- oder zuklappen

Wenn Sie mehrere Aufgabenäste gleichzeitig öffnen oder schließen möchten, können Sie am schnellsten den booleschen Wert (true für geöffnet, false für geschlossen) der *.$open*-Eigenschaft der jeweiligen Aufgaben zuweisen und anschließend das Gantt-Diagramm neu rendern.

- Alle Aufgaben aufklappen:

~~~js
gantt.eachTask(function(task){
    task.$open = true;
});
gantt.render();
~~~

- Alle Aufgaben zuklappen:

~~~js
gantt.eachTask(function(task){
    task.$open = false;
});
gantt.render();
~~~

:::note
Um einen Button hinzuzufügen, der alle Aufgaben gleichzeitig auf- oder zuklappt, siehe den Abschnitt [How to expand/collapse all tasks with a button](guides/how-to.md#howtoexpandcollapsealltaskswithabutton).
:::

## Kinder einer Aufgabe abrufen

Um die Kinder eines Aufgabenastes abzurufen, verwenden Sie die Methode [getChildren](api/method/getchildren.md):

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

## Baum-Icons ändern

### Elternelemente
Um das Icon für Elternelemente anzupassen, verwenden Sie das Template [grid_folder](api/template/grid_folder.md):

~~~js
gantt.templates.grid_folder = function(item) {
    return "<div class='gantt_tree_icon gantt_folder_" +
    (item.$open ? "open" : "closed") + "'></div>";
};
~~~

### Kindelemente
Um das Icon für Kindelemente anzupassen, verwenden Sie das Template [grid_file](api/template/grid_file.md):

~~~js
gantt.templates.grid_file = function(item) {
    return "<div class='gantt_tree_icon gantt_file'></div>";
};
~~~

### Auf-/Zu-Symbol
Um das Icon für das Auf-/Zu-Symbol zu individualisieren, verwenden Sie das Template [grid_open](api/template/grid_open.md):

~~~js
gantt.templates.grid_open = function(item) {
    return "<div class='gantt_tree_icon gantt_" + 
    (item.$open ? "close" : "open") + "'></div>";
};
~~~

## Einzug der Kinder in einem Ast festlegen

Um den Einzug der Kindaufgaben innerhalb eines Astes anzupassen, verwenden Sie das Template [grid_indent](api/template/grid_indent.md), indem Sie die **width**-CSS-Eigenschaft ändern:

~~~js
gantt.templates.grid_indent="function(task){"
    return "<div style='width:20px; float:left; height:100%'></div>"
};
~~~

## Checkboxen zu Baumknoten hinzufügen

Um Checkboxen (oder beliebigen anderen HTML-Inhalt) in Baumknoten einzufügen, verwenden Sie das Template [grid_blank](api/template/grid_blank.md):

~~~js
gantt.templates.grid_blank="function(task){"
    return "<input id='ch1' type='checkbox' onClick='someFunc()'></input>"
};
~~~

## Template für Baumknoten festlegen

Um das Template für Baumknoten zu definieren, verwenden Sie das **template**-Attribut in der Eigenschaft [columns](api/config/columns.md). 

 Der Rückgabewert der **template**-Funktion wird als inneres HTML hinzugefügt, sodass jede HTML-Struktur verwendet werden kann.

:::note
Beachten Sie: Wenn Sie nicht [dhtmlxConnector](https://docs.dhtmlx.com/connector__php__index.html) für die [Server-seitige Integration](guides/server-side.md) verwenden, ist es wichtig, die in das Gantt-Diagramm geladenen Daten zu bereinigen, um mögliche XSS-Sicherheitslücken zu vermeiden (dhtmlxConnector übernimmt dies automatisch).
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


[Template for tree nodes](https://docs.dhtmlx.com/gantt/samples/04_customization/05_tree_template.html)


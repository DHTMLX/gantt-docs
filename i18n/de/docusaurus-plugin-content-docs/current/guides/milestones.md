---
title: "Meilensteine"
sidebar_label: "Meilensteine"
---

# Meilensteine


:::info
Diese Funktionalität ist nur in der PRO-Edition verfügbar
:::

Meilensteine sind Aufgaben mit einer Dauer von null, die dazu dienen, wichtige Projektdaten, Schlüsselmomente oder Ziele zu markieren. Sie können beispielsweise verwendet werden, um Termine für Review-Meetings oder erwartete Abschlussdaten von Projektphasen hervorzuheben.


Aus Programmierperspektive ist ein Meilenstein einer der [vordefinierten Aufgabentypen](guides/task-types.md). Er verhält sich jedoch wie [eine reguläre Aufgabe](guides/task-types.md) und löst die gleichen Events und Templates aus.

![type_milestone](/img/type_milestone.png)

[Projects and milestones](https://docs.dhtmlx.com/gantt/samples/01_initialization/16_projects_and_milestones.html)


**Um das Hinzufügen von Meilensteinen zu einem Diagramm zu ermöglichen, gehen Sie im Allgemeinen wie folgt vor:**

1. Fügen Sie der Lightbox eine zusätzliche Sektion hinzu - siehe [Typeselect Control](guides/typeselect.md) - damit Benutzer den Aufgabentyp ändern und Meilensteine auswählen können.

~~~js
gantt.config.lightbox.sections = [
    {name: "description", height: 70, map_to: "text", type: "textarea"},
    {name: "type", type: "typeselect", map_to: "type"},
    {name: "time", height: 72, type: "duration", map_to: "auto"}
];
~~~
2. Definieren Sie das Template [rightside_text](api/template/rightside_text.md) oder [leftside_text](api/template/leftside_text.md), um eine Textbeschriftung für Meilensteine festzulegen. <i>Beachten Sie, dass die mit dem Template [task_text](api/template/task_text.md) gesetzte Beschriftung nicht angezeigt wird, da Meilensteine keine Dauer haben.</i>

~~~js
gantt.templates.rightside_text = function(start, end, task){
    if(task.type == gantt.config.types.milestone){
        return task.text;
    }
    return "";
};
~~~
3. Aktivieren Sie die Eigenschaft [order_branch](api/config/order_branch.md), um die Bedienung für Benutzer zu erleichtern. <i>Mit dieser Option können Aufgaben innerhalb des übergeordneten Zweigs verschoben werden, sodass Meilensteine an beliebiger Stelle erstellt und anschließend an die richtige Position verschoben werden können.</i>


~~~js
gantt.config.order_branch = true;
~~~


Nach diesen Schritten ist das Gantt-Diagramm vollständig für die Arbeit mit Meilensteinen eingerichtet.

![milestone_lightbox](/img/milestone_lightbox.png)


[Projects and milestones](https://docs.dhtmlx.com/gantt/samples/01_initialization/16_projects_and_milestones.html)


## Meilensteine im Datensatz angeben


Um Meilensteine in den Anfangsdaten zu definieren, setzen Sie die [type](guides/loading.md#dataproperties)-Eigenschaft eines Elements auf **'milestone'** (die Werte sind im Objekt [types](api/config/types.md) gespeichert):
~~~js
var data = {
    tasks:[
        {id:1, text:"Project #1",    type:gantt.config.types.project,    open:true}, 
        {id:2, text:"Task #1",       start_date:"12-04-2020", duration:3, parent:1},
        {id:3, text:"Alpha release", type:gantt.config.types.milestone,   parent:1, /*!*/
            start_date:"14-04-2020"}],                                              /*!*/
    links:[]
};
~~~

## Rollup-Aufgaben und Meilensteine {#rolluptasksandmilestones}

Ab Version 7.1 können Aufgaben und Meilensteine auch auf ihren übergeordneten Projekten angezeigt werden. Dafür setzen Sie die Eigenschaft **rollup** eines Datenobjekts auf *true*:

~~~js
var data = {
    tasks:[
        {id:11, text:"Project #1", type:"project", progress: 0.6, open: true},
        {id:12, text:"Task #1", start_date:"03-04-2018", duration:"3",
            parent:"11", progress: 1, open: true},
        {id:13, text:"Task #2", start_date:"03-04-2018", type:"project", 
            parent:"11", progress: 0.5, open: true},
        {id:16, text:"Final milestone", start_date:"08-04-2018", type:"milestone",  /*!*/
            rollup: true, parent:"11", progress: 0, open: true},  /*!*/
        {id:17, text:"Task #2.1", start_date:"03-04-2018", duration:"2", 
            parent:"13", progress: 1, open: true},
        {id:18, text:"Task #2.2", start_date:"06-04-2018", duration:"1",   
            parent:"13", progress: 0.8, open: true}],  
    links:[]
};
~~~

Das ergibt folgendes Ergebnis:

![rollup_milestone](/img/rollup_milestone.png)

Sie können die Rollup-Funktion auch mit der **Rollup**-Checkbox in der Lightbox ein- oder ausschalten:

~~~js
gantt.config.lightbox.milestone_sections = [
    {name: "description", height: 70, map_to: "text", type: "textarea", focus: true},
    {name: "rollup", type: "checkbox", map_to: "rollup"},/*!*/
    {name: "hide_bar", type: "checkbox", map_to: "hide_bar"},
    {name: "type", type: "typeselect", map_to: "type"},
    {name: "time", type: "duration", map_to: "auto"}
];
~~~

![rollup](/img/rollup.png)


[Rollup tasks and milestones](https://docs.dhtmlx.com/gantt/samples/01_initialization/21_rollup_tasks.html)


## Aufgaben und Meilensteine ausblenden


Seit Version 7.1 ist es möglich, [Aufgabenbalken](guides/task-types.md#regulartasks) und [Meilensteine](guides/task-types.md#milestones) in der Zeitleiste auszublenden, indem Sie die Eigenschaft **hide_bar: true** für ein Datenobjekt setzen:

~~~js
var data = {
    tasks:[
        {id:11, text:"Project #1", type:"project", progress: 0.6, open: true},
        {id:12, text:"Task #1", start_date:"03-04-2018", duration:"3",
            parent:"11", progress: 1},
        {id:13, text:"Task #2", start_date:"03-04-2018", type:"project", 
            parent:"11", progress: 0.5, open: true},
        {id:16, text:"Final milestone", start_date:"08-04-2018", type:"milestone",  /*!*/
            rollup: true, hide_bar: true, parent:"11", progress: 0},  /*!*/
        {id:17, text:"Task #2.1", start_date:"03-04-2018", duration:"2", 
            parent:"13", progress: 1},
        {id:18, text:"Task #2.2", start_date:"06-04-2018", duration:"1",   
            parent:"13", progress: 0.8}],  
    links:[]
};
~~~

Das sieht dann so aus:

![hide_milestone](/img/hide_milestone.png)

**Beachten Sie**, dass wenn sowohl **hide_bar:true** als auch **rollup:true** für ein Element gesetzt sind, dieses in der Zeitleiste ausgeblendet wird, aber weiterhin im übergeordneten Projekt angezeigt wird.

:::note
Um alle Rollup-Elemente im übergeordneten Projekt auszublenden, setzen Sie **rollup:false** im [Projekt](guides/task-types.md#projecttasks)-Objekt (verfügbar ab v8.0):

~~~js
{ id:11, text:"Project #1", type:"project", rollup:false, open: true }
~~~
:::


Sie können Aufgaben oder Meilensteine auch über die **Hide bar**-Checkbox in der Lightbox in der Zeitleiste ausblenden:

~~~js
gantt.config.lightbox.sections = [
    {name: "description", height: 70, map_to: "text", type: "textarea", focus: true},
    {name: "rollup", type: "checkbox", map_to: "rollup"},
    {name: "hide_bar", type: "checkbox", map_to: "hide_bar"},  /*!*/
    {name: "type", type: "typeselect", map_to: "type"},
    {name: "time", type: "duration", map_to: "auto"}
];

gantt.config.lightbox.milestone_sections = [
    {name: "description", height: 70, map_to: "text", type: "textarea", focus: true},
    {name: "rollup", type: "checkbox", map_to: "rollup"},
    {name: "hide_bar", type: "checkbox", map_to: "hide_bar"},  /*!*/
    {name: "type", type: "typeselect", map_to: "type"},
    {name: "time", type: "duration", map_to: "auto"}
];

gantt.config.lightbox.project_sections = [
    {name: "description", height: 70, map_to: "text", type: "textarea", focus: true},
    {name: "hide_bar", type: "checkbox", map_to: "hide_bar"},  /*!*/
    {name: "type", type: "typeselect", map_to: "type"},
    {name: "time", type: "duration", map_to: "auto"}
];

~~~

![hide_bar](/img/hide_bar.png)


[Rollup tasks and milestones](https://docs.dhtmlx.com/gantt/samples/01_initialization/21_rollup_tasks.html)


## API-Übersicht

Es gibt ein Event, um die Sichtbarkeit von Rollup-Aufgaben auf deren übergeordneten Projekten zu steuern:

- [onBeforeRollupTaskDisplay](api/event/onbeforerolluptaskdisplay.md)

~~~js
// bevor die Rollup-Aufgabe im übergeordneten Projekt angezeigt wird
gantt.attachEvent("onBeforeRollupTaskDisplay", function(taskId, task, parentId){
    // benutzerdefinierte Logik hier
    return false;
});
~~~

## Styling einzelner Rollup-Elemente

Ab Version 8.0 enthalten Rollup-Elemente die Eigenschaft *task.$rendered_at*, die die ID der Zeile enthält, in der das Rollup-Element dargestellt wird. Damit können Sie bestimmte Rollup-Elemente je nach Anzeigereihe über das Template [task_class](api/template/task_class.md) stylen:

~~~js
gantt.templates.task_class = function(start, end, task) {
    if(task.$rendered_at) {
        if(gantt.calculateTaskLevel(gantt.getTask(task.$rendered_at)) === 1) {
            return "phase-level-rollup";
        }
    }
    return "";
};
~~~


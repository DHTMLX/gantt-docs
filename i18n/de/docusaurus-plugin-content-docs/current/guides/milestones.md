---
title: "Meilensteine"
sidebar_label: "Meilensteine"
---

# Meilensteine

:::info
Diese Funktionalität ist nur in der PRO-Edition verfügbar
:::

Meilensteine sind Aufgaben mit null Dauer, die verwendet werden, um wichtige Termine des Projekts, einige Schlüsselerge­bnisse oder Ziele zu kennzeichnen. 
Sie können Meilensteine beispielsweise verwenden, um Termine von Review-Meetings oder erwartete Fertigstellungstermine von Projektphasen hervorzuheben. 


Programmgesteuert ist ein Meilenstein eine der [vordefinierten Aufgabentypen](guides/task-types.md). Er wird jedoch wie [eine reguläre Aufgabe](guides/task-types.md) behandelt, d. h. er löst dieselben Ereignisse und Vorlagen aus. 

![type_milestone](/img/type_milestone.png)

**Zugehöriges Beispiel**: [Projects and milestones](https://docs.dhtmlx.com/gantt/samples/01_initialization/16_projects_and_milestones.html)

**Allgemein, um die Möglichkeit zu bieten, Meilensteine zu einem Diagramm hinzuzufügen:**

Fügen Sie dem Lightbox-Dialog eine zusätzliche Sektion hinzu - [Typeselect-Steuerung](guides/typeselect.md) - die es Ihren Benutzern ermöglicht, den Typ der Aufgaben zu ändern und Meilensteine auszuwählen. 

~~~js
gantt.config.lightbox.sections = [
    {name: "description", height: 70, map_to: "text", type: "textarea"},
    {name: "type", type: "typeselect", map_to: "type"},
    {name: "time", height: 72, type: "duration", map_to: "auto"}
];
~~~
Definieren Sie die [rightside_text](api/template/rightside_text.md) oder [leftside_text](api/template/leftside_text.md) Vorlage, um eine Textbeschriftung für einen Meilenstein festzulegen. <i> Hinweis: Das mit der [task_text](api/template/task_text.md) Vorlage festgelegte Etikett wird nicht angezeigt, da Meilensteine eine Dauer von Null haben.</i>


~~~js
gantt.templates.rightside_text = function(start, end, task){
    if(task.type == gantt.config.types.milestone){
        return task.text;
    }
    return "";
};
~~~
Aktivieren Sie die [order_branch](api/config/order_branch.md)-Eigenschaft, um die Bedienung für Ihre Endbenutzer zu vereinfachen. <i>Die Option ermöglicht das Ziehen von Aufgaben innerhalb des übergeordneten Zweigs und ermöglicht es Ihren Benutzern, Meilensteine überall zu erstellen, diese dann jedoch an die richtigen Positionen zu ziehen.</i> 

~~~js
gantt.config.order_branch = true;
~~~


Nachdem Sie diese Schritte abgeschlossen haben, ist Ihr Gantt-Diagramm vollständig bereit, mit Meilensteinen zu arbeiten.

![milestone_lightbox](/img/milestone_lightbox.png)


**Zugehöriges Beispiel**: [Projects and milestones](https://docs.dhtmlx.com/gantt/samples/01_initialization/16_projects_and_milestones.html)


## Spezifizierung von Meilensteinen in einem Datensatz

Um Meilensteine im anfänglichen Datensatz zu definieren, setzen Sie die [type](guides/loading.md#dataproperties) Eigenschaft eines Datenelements auf den Wert **'milestone'** (*Werte werden im [types](api/config/types.md) Objekt gespeichert*):
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

Ab Version 7.1 gibt es die Möglichkeit, [Aufgaben](guides/task-types.md#regular-tasks) und [Meilensteine](guides/task-types.md#milestones) in ihren übergeordneten Projekten anzuzeigen. Dafür muss die **rollup**-Eigenschaft eines Datenelements auf *true* gesetzt werden:

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

Das Ergebnis sieht so aus:

![rollup_milestone](/img/rollup_milestone.png)

Es besteht außerdem die Möglichkeit, die Rollup-Funktionalität über das Rollup-Kontrollkästchen im Lightbox umzuschalten:


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


**Zugehöriges Beispiel**: [Rollup task and milestones](https://docs.dhtmlx.com/gantt/samples/01_initialization/21_rollup_tasks.html)


## Verbergen von Aufgaben und Meilensteinen

Ab Version 7.1 können Sie [Aufgabenleisten](guides/task-types.md#regular-tasks) und [Meilensteine](guides/task-types.md#milestones) im Timeline-Bereich ausblenden, indem Sie die Eigenschaft **hide_bar: true** eines Datenelements setzen:

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

Das Ergebnis sieht folgendermaßen aus:

![hide_milestone](/img/hide_milestone.png)

**Hinweis**, dass, wenn sowohl die Eigenschaften **hide_bar:true** und **rollup:true** für das Datenelement festgelegt sind, das Element im Zeitstrahl ausgeblendet, aber im übergeordneten Projekt angezeigt wird.

:::note
Um alle Rollup-Elemente aus dem übergeordneten Projekt auszublenden, setzen Sie **rollup:false** im [project](guides/task-types.md#project-tasks)-Objekt (ab Version 8.0):

~~~js
{ id:11, text:"Project #1", type:"project", rollup:false, open: true }
~~~
:::


Sie können das notwendige Aufgaben-/Meilenstein-Element im Timeline-Bereich ausblenden, indem Sie das Kontrollkästchen **Hide bar** im Lightbox umschalten:

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

**Zugehöriges Beispiel**: [Rollup tasks and milestones](https://docs.dhtmlx.com/gantt/samples/01_initialization/21_rollup_tasks.html)


## API-Übersicht

Es gibt ein Ereignis, das verwendet werden kann, um die Sichtbarkeit von Rollup-Aufgaben auf ihren übergeordneten Projekten zu steuern:

- [onBeforeRollupTaskDisplay](api/event/onbeforerolluptaskdisplay.md)

~~~js
// bevor die Rollup-Aufgabe auf ihrem übergeordneten Projekt angezeigt wird 
gantt.attachEvent("onBeforeRollupTaskDisplay", function(taskId, task, parentId){
    // benutzerdefinierte Logik hier
    return false;
});
~~~

## Styling separater Rollup-Elemente {#stylingseparaterollupitems}

Ab Version 8.0 gelangen Rollup-Elemente in Template-Funktionen mit der Eigenschaft *task.$rendered_at*, die die ID der Zeile enthält, in der das Rollup-Element gerendert wird. Um bestimmte Rollup-Elemente basierend auf der Zeile, in der sie angezeigt werden, zu gestalten, können Sie die [task_class](api/template/task_class.md) Vorlage verwenden:

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
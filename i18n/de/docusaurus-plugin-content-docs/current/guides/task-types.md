---
title: "Aufgabentypen"
sidebar_label: "Aufgabentypen"
---

Aufgabentypen
==============

:::info
Dieses Feature ist ausschließlich in der PRO-Edition verfügbar.
:::

Es gibt drei vordefinierte Aufgabentypen, die Sie in einem Gantt-Diagramm anzeigen können ([Sie können auch einen benutzerdefinierten Typ erstellen](guides/task-types.md#creatingacustomtype)):

1. [Eine reguläre Aufgabe (Standard)](guides/task-types.md#regulartasks).
2. [Eine Projektaufgabe](guides/task-types.md#projecttasks).
3. [Ein Meilenstein](guides/task-types.md#milestones).


![task_types](/img/task_types.png)


Um einen Aufgabentyp zuzuweisen, verwenden Sie die [type](guides/loading.md#dataproperties)-Eigenschaft innerhalb eines Datenobjekts (*die Werte entsprechen dem Objekt [types](api/config/types.md)*):

**Typ einer Aufgabe im Datensatz angeben**
~~~js
var data = {
    task:[
        {id:1, text:"Project #1",    type:"project",    open:true},   /*!*/
        {id:2, text:"Task #1",          start_date:"12-04-2020", duration:3, parent:1},
        {id:3, text:"Alpha release", type:"milestone",   parent:1, /*!*/
            start_date:"14-04-2020"},                                                /*!*/
        {id:4, text:"Task #2",          start_date:"17-04-2020", duration:3, parent:1}],
    links:[]
};
~~~

[Projects and milestones](https://docs.dhtmlx.com/gantt/samples/01_initialization/16_projects_and_milestones.html)


## Reguläre Aufgaben {#regulartasks}
-----------------

Standardmäßig erstellt dhtmlxGantt reguläre Aufgaben (Tasks mit **type="task"**).

![type_task](/img/type_task.png)

**Reguläre Aufgaben angeben**
~~~js
var data = {
    tasks:[{id:2, text:"Task #1", start_date:"12-04-2020", duration:3}],  /*!*/
    links:[]
};
//oder
var data = {
     tasks:[{id:2, text:"Task #1", start_date:"12-04-2020", duration:3, /*!*/
            type:"task"}],  /*!*/
    links:[]
};
~~~

[Projects and milestones](https://docs.dhtmlx.com/gantt/samples/01_initialization/16_projects_and_milestones.html)


Mit **type="task"** markierte Aufgaben besitzen folgende Eigenschaften:

- Können einen Elternknoten und mehrere Kindaufgaben haben.
- Sind verschiebbar und in der Größe veränderbar.
- Passen sich nicht automatisch an Kindaufgaben an; das Verschieben einer Kindaufgabe beeinflusst nicht die Dauer oder den Fortschritt der Elternaufgabe.
- Können in übergeordneten Projekten angezeigt werden. Siehe [Details](guides/milestones.md#rolluptasksandmilestones).
- Können in der Zeitleiste ausgeblendet werden. Siehe [Details](guides/milestones.md#hidingtasksandmilestones).


## Projektaufgaben {#projecttasks}
-----------------

Eine Projektaufgabe erstreckt sich vom Beginn der frühesten Kindaufgabe bis zum Ende der letzten Kindaufgabe.

:::note
Der Hauptunterschied zwischen Projekt- und regulären Aufgaben besteht darin, dass sich die Dauer einer Projektaufgabe nach ihren Kindaufgaben richtet und entsprechend aktualisiert wird.
:::

![type_project](/img/type_project.png)


**Projektaufgaben angeben**
~~~js
var data = {
    tasks:[
        {id:1, text:"Project #1",    type:"project",    open:true}, /*!*/
        {id:2, text:"Task #1",       start_date:"12-04-2020", duration:3, parent:1},
        {id:3, text:"Alpha release", type:"milestone",   parent:1,
            start_date:"14-04-2020"}],
    links:[]
};
~~~


[Projects and milestones](https://docs.dhtmlx.com/gantt/samples/01_initialization/16_projects_and_milestones.html)


Aufgaben mit **type="project"** besitzen folgende Eigenschaften:

- Können einen Elternknoten und mehrere Kindaufgaben haben.
- Sind nicht verschiebbar oder in der Größe veränderbar, es sei denn, Drag&Drop wird explizit über die [drag_project](api/config/drag_project.md) aktiviert.
- Hängen von ihren Kindaufgaben ab; das Verschieben einer Kindaufgabe aktualisiert die Dauer der Projektaufgabe.
- Ignorieren die Eigenschaften **start_date**, **end_date** und **duration**.
- Können nicht verschoben werden, wenn sie keine Kindaufgaben besitzen.
- Der **progress**-Wert eines Projekts wird standardmäßig manuell gesetzt und spiegelt nicht automatisch den Fortschritt der Unteraufgaben wider. Um den Fortschritt automatisch zu berechnen, ist eigener Code nötig. [Siehe Beispiele](guides/how-to.md#howtocalculatetaskprogressdependingonchildtasks).

:::note
Wie Sie das Hinzufügen von Projektaufgaben ermöglichen, erfahren Sie unter [Milestones](guides/milestones.md). Die Aktivierung der Meilenstein-Erstellung sorgt auch dafür, dass Nutzer Projektaufgaben hinzufügen können.
:::

## Meilensteine {#milestones}
--------------------------------------------------------

Ein [Meilenstein](guides/milestones.md) ist eine Aufgabe mit einer Dauer von null, die verwendet wird, um wichtige Termine in einem Projekt hervorzuheben ([mehr Infos](guides/milestones.md)).

![type_milestone](/img/type_milestone.png)


**Meilensteine angeben**
~~~js
var data = {
    tasks:[
        {id:1, text:"Project #1",    type:"project",    open:true},
        {id:2, text:"Task #1",       start_date:"12-04-2020", duration:3, parent:1},
        {id:3, text:"Alpha release", type:"milestone",   parent:1, /*!*/
            start_date:"14-04-2020"}],/*!*/
    links:[]
};
~~~

[Projects and milestones](https://docs.dhtmlx.com/gantt/samples/01_initialization/16_projects_and_milestones.html)


Aufgaben mit **type="milestone"** besitzen folgende Eigenschaften:

- Können einen Elternknoten und mehrere Kindaufgaben haben.
- Sind nicht verschiebbar oder in der Größe veränderbar.
- Haben immer eine Dauer von null.
- Ignorieren die Eigenschaften **end_date**, **duration** und **progress**.
- Können in übergeordneten Projekten angezeigt werden. Siehe [Details](guides/milestones.md#rolluptasksandmilestones).
- Können in der Zeitleiste ausgeblendet werden. Siehe [Details](guides/milestones.md#hidingtasksandmilestones).

:::note
Wie Sie die Erstellung von Meilensteinen ermöglichen, erfahren Sie unter [Milestones](guides/milestones.md).
:::

## Spezifisches Lightbox-Formular pro Aufgabentyp {#specificlightboxpertasktype}
----------------------------------------------

Jeder Aufgabentyp hat eigene Eigenschaften, daher kann das Detailformular (Lightbox) individuell pro Typ konfiguriert werden.
Die Konfigurationen werden im Objekt [lightbox](api/config/lightbox.md) gespeichert.

Sie umfassen:

- **gantt.config.lightbox.sections** - für reguläre Aufgaben.
- **gantt.config.lightbox.project_sections** - für Projektaufgaben.
- **gantt.config.lightbox.milestone_sections** - für Meilensteine.

Die Standard-Konfigurationen sehen so aus:

~~~js
gantt.config.lightbox.sections = [
    {name: "description", height: 70, map_to: "text", type: "textarea", focus: true},
    {name: "time", type: "duration", map_to: "auto"}
];
gantt.config.lightbox.project_sections= [
    {name: "description", height: 70, map_to: "text", type: "textarea", focus: true},
    {name: "type", type: "typeselect", map_to: "type"},
    {name: "time", type: "duration", readonly: true, map_to: "auto"}
];
gantt.config.lightbox.milestone_sections= [
    {name: "description", height: 70, map_to: "text", type: "textarea", focus: true},
    {name: "type", type: "typeselect", map_to: "type"},
    {name: "time", type: "duration", single_date: true, map_to: "auto"}
];
~~~

Wenn der Aufgabentyp im Auswahlfeld geändert wird, passt sich die Lightbox dynamisch an die neue Konfiguration an.

Sie können [einen benutzerdefinierten Aufgabentyp erstellen](guides/task-types.md#creatingacustomtype) und ebenfalls dessen Lightbox-Struktur definieren.

Weitere Informationen zur Lightbox-Konfiguration finden Sie im Kapitel [Configuring Edit Form](guides/edit-form.md).


## Einen benutzerdefinierten Typ erstellen {#creatingacustomtype}
-----------------------------------------------

Alle Aufgabentypen sind im Objekt [types](api/config/types.md) definiert. 

Um einen benutzerdefinierten Aufgabentyp hinzuzufügen, gehen Sie im Allgemeinen wie folgt vor:

1. Fügen Sie einen neuen Eintrag zum Objekt [types](api/config/types.md) hinzu.
2. Definieren Sie die Einstellungen, die für den neuen Typ spezifisch sind.


Beispiel: Um einen neuen Typ namens **meeting** hinzuzufügen, der sich wie eine reguläre Aufgabe verhält, aber eine eigene Farbe und eigene Lightbox-Felder besitzt:

![custom_task_type](/img/custom_task_type.png)


Definieren Sie den neuen Typ **meeting** und seine Lightbox wie folgt:

1. Fügen Sie den neuen Typ dem Objekt [types](api/config/types.md) hinzu:

~~~js
gantt.config.types.meeting = "type_id";
~~~
<i>Hier steht "meeting" als programmatischer Name für Klarheit und Lesbarkeit."type_id" ist die eindeutige Kennung, die in der Datenbank und im [types](api/config/types.md)-Objekt gespeichert wird.</i>

2. Legen Sie die Bezeichnung für den neuen Typ im "typeselect"-Control fest:

~~~js
gantt.locale.labels.type_meeting = "Meeting";
~~~

3. Definieren Sie die Lightbox-Struktur für den neuen Typ:

~~~js
gantt.config.lightbox.meeting_sections = [
    {name:"title", height:20, map_to:"text", type:"textarea", focus:true},
    {name:"details", height:70, map_to: "details", type: "textarea"},
    {name:"type", type:"typeselect", map_to:"type"},
    {name:"time", height:72, type:"time", map_to:"auto"}
];
gantt.locale.labels.section_title = "Betreff";
gantt.locale.labels.section_details = "Details";
~~~
4. Definieren Sie Styles für den neuen Typ und wenden Sie diese mit der [task_class](api/template/task_class.md)-Vorlage an:

~~~css
.meeting_task{
    border:2px solid #BFC518;
    color:#6ba8e3;
    background: #F2F67E;
}
.meeting_task .gantt_task_progress{
    background:#D9DF29;
}
~~~

~~~js
gantt.templates.task_class = function(start, end, task){
    if(task.type == gantt.config.types.meeting){
        return "meeting_task";
    }
    return "";
};
~~~

5. Passen Sie den Aufgabentext für "meeting"-Aufgaben mit der [task_text](api/template/task_text.md)-Vorlage an: 


~~~js
gantt.templates.task_text = function(start, end, task){
    if(task.type == gantt.config.types.meeting){
        return "Meeting: <b>" + task.text + "</b>";
    }
    return task.text;
};
~~~

[Custom task type](https://docs.dhtmlx.com/gantt/samples/04_customization/12_custom_task_type.html)


## Individuelle Darstellung von Aufgabentypen {#customdisplayoftasktypes}
-----------------------------------------------------------------

Um das Aussehen vorhandener Aufgabentypen zu ändern, verwenden Sie die Option [type_renderers](api/config/type_renderers.md). Damit können Sie die Funktionen überschreiben, die steuern, wie Aufgabentypen auf der Seite gerendert werden.

![custom_look](/img/custom_look.png)

~~~js
gantt.config.type_renderers["project"]=function(task, defaultRender){
    var main_el = document.createElement("div");
    main_el.setAttribute(gantt.config.task_attribute, task.id);
    var size = gantt.getTaskPosition(task);
    main_el.innerHTML = [
        "<div class='project-left'></div>",
        "<div class='project-right'></div>"
    ].join('');
    main_el.className = "custom-project";

    main_el.style.left = size.left + "px";
    main_el.style.top = size.top + 7 + "px";
    main_el.style.width = size.width + "px";

    return main_el;
};
~~~

[Classic Look](https://docs.dhtmlx.com/gantt/samples/04_customization/17_classic_gantt_look.html)


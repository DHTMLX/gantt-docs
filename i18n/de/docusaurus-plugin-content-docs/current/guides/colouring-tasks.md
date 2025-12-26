---
title: "Tasks Coloring"
sidebar_label: "Tasks Coloring"
---

# Tasks Coloring 

Das Einfärben von Aufgaben hilft dabei, bestimmte Aufgaben hervorzuheben und die Aufmerksamkeit gezielt darauf zu lenken.

![coloring_tasks](/img/coloring_tasks.png)

Es gibt mehrere Möglichkeiten, den Stil von Aufgaben anzupassen:

1. [Standard-Aufgabenvorlage umdefinieren](guides/colouring-tasks.md#redefiningthetaskstemplate)
2. [Stilwerte direkt in den Eigenschaften des Aufgabenobjekts festlegen](guides/colouring-tasks.md#specifyingstyleinthepropertiesofataskobject)
3. [Stile dynamisch aus Daten generieren](guides/colouring-tasks.md#loadingcolorswithdata)

## Umdefinieren der Aufgabenvorlage {#redefiningthetaskstemplate}

Um den Stil einer Aufgabe mit einer Vorlage anzupassen, wird die [task_class](api/template/task_class.md) Vorlage verwendet. Beispielsweise können Sie Aufgaben je nach Priorität einfärben, indem Sie folgenden Code verwenden:

**Coloring tasks depending on their priority**
~~~css
<style>

    /* high */
    .gantt_task_line.high {
        --dhx-gantt-task-background: #d96c49;
        --dhx-gantt-task-color: #fff;
    }

    /* medium */
    .gantt_task_line.medium {
        --dhx-gantt-task-background: #f57730;
        --dhx-gantt-task-color: #fff;
    }

    /* low */
    .gantt_task_line.low {
        --dhx-gantt-task-background: #fff;
        --dhx-gantt-task-color: #fff;
    }

</style>
~~~

~~~js
gantt.templates.task_class  = function(start, end, task){
    switch (task.priority){
        case "1":
            return "high";
            break;
        case "2":
            return "medium";
            break;
        case "3":
            return "low";
            break;
    }
};
~~~

[Task styles](https://docs.dhtmlx.com/gantt/samples/04_customization/04_task_styles.html)


:::note
Um andere Teile der Aufgaben zu stylen, siehe die in [Templates of the Timeline Area](guides/timeline-templates.md) aufgelisteten Vorlagen.
:::

Eine ähnliche Methode kann auch für Verknüpfungen verwendet werden. Weitere Details finden Sie [hier](guides/colouring-lines.md#redefiningthelinkstemplate).

## Festlegen des Stils in den Eigenschaften eines Aufgabenobjekts {#specifyingstyleinthepropertiesofataskobject}

Sie können das Erscheinungsbild einer Aufgabe anpassen, indem Sie dem Aufgaben-Datenobjekt bis zu drei spezielle Eigenschaften hinzufügen:

- **color** - legt die Hintergrundfarbe der Aufgabenleiste fest
- **textColor** - legt die Textfarbe innerhalb der Aufgabenleiste fest (betrifft nicht Aufgaben vom Typ "milestone")
- **progressColor** - legt die Farbe der Fortschrittsleiste fest (standardmäßig ist die Fortschrittsleiste ein etwas dunklerer Farbton der Aufgabenfarbe, gestylt als 'background-color: rgb(54, 54, 54); opacity: 0.2')

![task_color_properties](/img/task_color_properties.png)

:::note
Diese Eigenschaften werden speziell behandelt. Gantt übernimmt ihre Werte automatisch, wenn sie bei einer Aufgabe vorhanden sind; andernfalls werden die Standardfarben verwendet.
:::

**Setting the task's color in the data object**
~~~js
var tasks = {
  data:[
     {id:1, text:"Project #1", start_date:"01-04-2013", duration:18, color:"red"},
     {id:2, text:"Task #1", start_date:"02-04-2013", 
         duration:8, color:"blue", parent:1},
     {id:3, text:"Task #2", start_date:"11-04-2013", 
         duration:8, color:"blue", parent:1}
   ]
};
gantt.init("gantt_here");
gantt.parse(tasks);

gantt.getTask(1).color = "red";
~~~


[Specify inline colors for Tasks and Links](https://docs.dhtmlx.com/gantt/samples/04_customization/16_inline_task_colors.html)


:::note
Wenn Sie eine benutzerdefinierte Farbe mit der **color**-Eigenschaft hinzufügen, wird ein Inline-Stil angewendet, der andere Stile überschreibt. Das bedeutet, dass die Hervorhebung des kritischen Pfads und alle anderen benutzerdefinierten Hintergrund- oder Textfarb-Stile nicht angewendet werden.
:::

Um Aufgaben als kritisch darzustellen, können Sie folgendes CSS verwenden:

~~~css
.gantt_critical_task {
  --dhx-gantt-task-background: #e63030 !important;
}
~~~

**Related example:** [Coloring critical tasks and links](https://snippet.dhtmlx.com/xipdml7a)

Wenn eine dieser Eigenschaften bei einer Aufgabe gesetzt ist, erhält die Aufgabe zusätzlich die Klasse **"gantt_task_inline_color"**. 


Diese Klasse kann gezielt verwendet werden, um andere Stile zu überschreiben, zum Beispiel mit dem Selektor "*.gantt_task_line.gantt_task_inline_color*":

~~~css
.gantt_task_line.gantt_task_inline_color .gantt_task_progress {
    background-color: rgb(54, 54, 54);
    opacity: 0.2;
}
~~~

Diese Eigenschaften akzeptieren jedes gültige CSS-Farbformat, zum Beispiel:

~~~js
task.color = "#FF0000";
task.color = "red";
task.color = "rgb(255,0,0)";
~~~

Ein ähnliches Vorgehen gilt für Verknüpfungen. Mehr Informationen finden Sie [hier](guides/colouring-lines.md#specifyingcolorinthepropertiesofthelinkobject).

## Laden von Farben mit Daten {#loadingcolorswithdata}

Wenn Aufgabenfarben aus Backend-Daten stammen - zum Beispiel, wenn Farben an Phasen oder Ressourcen gebunden sind, die Aufgaben zugewiesen werden, und nicht fest im Code stehen - ist es sinnvoll, Stile dynamisch aus Ihren Daten zu generieren.

Angenommen, Sie haben eine Liste von Benutzern, die Aufgaben zugewiesen werden können, und jeder Benutzer hat zugehörige Farben:

~~~js
[
    {"key":1, "label":"John", "backgroundColor":"#03A9F4", "textColor":"#FFF"},
    {"key":2, "label":"Mike", "backgroundColor":"#f57730", "textColor":"#FFF"},
    {"key":3, "label":"Anna", "backgroundColor":"#e157de", "textColor":"#FFF"},
    {"key":4, "label":"Bill", "backgroundColor":"#78909C", "textColor":"#FFF"},
    {"key":7, "label":"Floe", "backgroundColor":"#8D6E63", "textColor":"#FFF"}
]
~~~

In diesem Fall werden Benutzer und ihre Farben separat verwaltet, und gantt kennt ihre IDs oder Farben nicht im Voraus.

So können Sie vorgehen:

- Definieren Sie eine benannte serverList für diese Sammlung:

~~~js
gantt.serverList("people");
~~~

- Laden Sie die Optionen auf die Seite, entweder [im gantt Datenformat](guides/supported-data-formats.md#jsonwithcollections) oder per eigenem XHR-Request.

- Sobald die Optionen geladen sind, generieren Sie CSS-Stile basierend auf den Daten:

~~~js
gantt.attachEvent("onLoadEnd", function(){
    // verwenden Sie eine beliebige ID für das Style-Element
    var styleId = "dynamicGanttStyles";
    
    // bei erneutem Laden von Optionen mit Farben, das bestehende Style-Element wiederverwenden
    
    var element = document.getElementById(styleId);
    if(!element){
        element = document.createElement("style");
        element.id = styleId;
        document.querySelector("head").appendChild(element);
    }
    var html = [];
    var resources = gantt.serverList("people");

    // CSS-Stile für jede Option erstellen und in das Style-Element einfügen
    
    resources.forEach(function(r){
        if(r.backgroundColor && r.textColor){
            html.push(".gantt_task_line.gantt_resource_" + r.key + "{" +
                "--dhx-gantt-task-background:"+r.backgroundColor+"; " +
                "--dhx-gantt-task-color:"+r.textColor+"; " +
            "}");

        }
    });
    element.innerHTML = html.join("");
});
~~~

Wenn Sie den [resource datastore](api/config/resource_store.md) verwenden, nutzen Sie *r.id* anstelle von *r.key* für die Ressourcen-ID.

- Danach können Sie die generierten Klassen mit dem task_class-Template den Aufgaben zuweisen:

~~~js
gantt.templates.task_class = function (start, end, task) {
    var css = [];

    if(task.owner_id){
        css.push("gantt_resource_" + task.owner_id);
    }

    return css.join(" ");
};
~~~


[Assigning owners to tasks](https://docs.dhtmlx.com/gantt/samples/11_resources/01_assigning_resources.html)


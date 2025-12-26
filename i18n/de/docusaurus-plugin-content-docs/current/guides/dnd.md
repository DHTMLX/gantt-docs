---
title: "Verschieben von Aufgaben innerhalb der Zeitleiste"
sidebar_label: "Verschieben von Aufgaben innerhalb der Zeitleiste"
---

# Verschieben von Aufgaben innerhalb der Zeitleiste

Das Ziehen ermöglicht es, Start- oder Enddaten sowie die Dauer von Aufgaben einfach anzupassen. 


Standardmäßig ist Drag-and-Drop aktiviert, sodass Benutzer Aufgaben entlang ihrer Zeilen in der Zeitleiste verschieben können.

Um das Drag-and-Drop-Verhalten anzupassen, können die folgenden Events verwendet werden:

- [onBeforeTaskDrag](api/event/onbeforetaskdrag.md) - um das Verschieben bestimmter Aufgaben zu blockieren
- [onTaskDrag](api/event/ontaskdrag.md) - um den Verschiebebereich einzuschränken oder eigene Logik während des Ziehens anzuwenden
- [onAfterTaskDrag](api/event/onaftertaskdrag.md) - um Aufgaben nach dem Verschieben zu verarbeiten

Hier sind einige typische Szenarien, in denen die Anpassung des Standard-Drag-Verhaltens sinnvoll ist:


1. [Blockieren des Verschiebens für bestimmte Aufgaben](#denyingdraggingofspecifictasks).
2. [Verhindern, dass Aufgaben außerhalb bestimmter Daten verschoben werden](#denyingdraggingtasksoutofspecificdates).
3. [Verschieben von untergeordneten Aufgaben zusammen mit ihrer übergeordneten Aufgabe](#draggingchildrentogetherwiththeparent).
4. [Verschieben von Projekten zusammen mit deren Unteraufgaben](#draggingprojectswithsubtasks).
5. [Festlegen einer minimalen Aufgabendauer](#settingminimaltaskduration).
6. [Aktivieren des automatischen Bildlaufs beim Verschieben von Aufgaben](#autoscrollduringtasksdragging).


## Blockieren des Verschiebens für bestimmte Aufgaben {#denyingdraggingofspecifictasks}

Um das Verschieben bestimmter Aufgaben zu deaktivieren, nutzen Sie das Event [onBeforeTaskDrag](api/event/onbeforetaskdrag.md):

~~~js
gantt.attachEvent("onBeforeTaskDrag", function(id, mode, e){
    if(gantt.getGlobalTaskIndex(id)%2==0){
        return false;      // blockiert das Verschieben, wenn der globale Aufgabenindex ungerade ist
    }
    return true;           // erlaubt das Verschieben, wenn der globale Aufgabenindex gerade ist
});
~~~


## Verhindern, dass Aufgaben außerhalb bestimmter Daten verschoben werden {#denyingdraggingtasksoutofspecificdates}

Um zu verhindern, dass Aufgaben außerhalb eines bestimmten Datumsbereichs verschoben werden, verwenden Sie das Event [onTaskDrag](api/event/ontaskdrag.md).

<p style="margin-top: 20px; font-weight: bold;"> Das onTaskDrag-Event: </p>

<ul style="margin-top:5px;">
  <li>Wird jedes Mal ausgelöst, wenn der Benutzer die Maus bewegt, während er eine Aufgabe in der Zeitleiste verschiebt, die Größe ändert oder den Fortschritt aktualisiert.</li>
  <li>Die Art der Drag-Aktion wird als zweites Argument übergeben - <b>mode</b>.</li> 
  <li>Alle möglichen Drag-Modi sind in der Eigenschaft [drag_mode](api/config/drag_mode.md) aufgeführt.</li>
</ul>

<p style="margin-top: 20px; font-weight: bold;">Kurz zusammengefasst läuft der Prozess wie folgt ab:</p>

<ol style="margin-top:5px;">
  <li>Der Benutzer zieht die Aufgabe.</li>
  <li>dhtmlxGantt berechnet das Datum der Aufgabe basierend auf der neuen Position neu.</li>
  <li>dhtmlxGantt löst das Event [onTaskDrag](api/event/ontaskdrag.md) aus.</li>
  <li>dhtmlxGantt zeichnet die Aufgabe im Diagramm neu. <i>Da das Event [onTaskDrag](api/event/ontaskdrag.md) nach der Neuberechnung ausgelöst wird, können Sie im Event-Handler eigene Werte für die verschobene Aufgabe festlegen, ohne befürchten zu müssen, dass diese überschrieben werden. So wird sichergestellt, dass die Aufgabe genau dort angezeigt wird, wo Sie es möchten.</i></li>
</ol>


Um beispielsweise zu verhindern, dass Benutzer Aufgaben außerhalb des Bereichs **"31. März 2020 - 11. April 2020"** verschieben:

![custom_dnd](/img/custom_dnd.png)

Können Sie diesen Code verwenden:

[Verschieben von Aufgaben außerhalb des Intervalls verweigern - [31.03.2020, 11.04.2020]](Verschieben von Aufgaben außerhalb des Intervalls verweigern - [31.03.2020, 11.04.2020])
~~~js
var leftLimit = new Date(2020, 2 ,31), rightLimit = new Date(2020, 3 ,12);

gantt.attachEvent("onTaskDrag", function(id, mode, task, original){
    var modes = gantt.config.drag_mode;
    if(mode == modes.move || mode == modes.resize){
    
        var diff = original.duration*(1000*60*60*24);
       
        if(+task.end_date > +rightLimit){
            task.end_date = new Date(rightLimit);
            if(mode == modes.move)
                task.start_date = new Date(task.end_date - diff);
            }
        if(+task.start_date < +leftLimit){
            task.start_date = new Date(leftLimit);
            if(mode == modes.move)
                task.end_date = new Date(+task.start_date + diff);
        }
    }
});
~~~


[Drag parent task with its children](https://docs.dhtmlx.com/gantt/samples/08_api/05_limit_drag_dates.html)


## Verschieben von untergeordneten Aufgaben zusammen mit der übergeordneten Aufgabe {#draggingchildrentogetherwiththeparent}

Um das Verschieben von untergeordneten Aufgaben zu ermöglichen, wenn die übergeordnete Aufgabe verschoben wird, verwenden Sie das Event [onTaskDrag](api/event/ontaskdrag.md) (weitere Details zu diesem Event finden Sie [oben](guides/dnd.md#preventingdraggingtasksoutsidecertaindates)):

~~~js
gantt.attachEvent("onTaskDrag", function(id, mode, task, original){
    var modes = gantt.config.drag_mode;
    if(mode == modes.move){
        var diff = task.start_date - original.start_date;
        gantt.eachTask(function(child){
            child.start_date = new Date(+child.start_date + diff);
            child.end_date = new Date(+child.end_date + diff);
            gantt.refreshTask(child.id, true);
        },id );
    }
});
// Rundet die Positionen der untergeordneten Aufgaben auf die aktuelle Skala
gantt.attachEvent("onAfterTaskDrag", function(id, mode, e){
    var modes = gantt.config.drag_mode;
    if(mode == modes.move ){
        var state = gantt.getState();
        gantt.eachTask(function(child){          
            child.start_date = gantt.roundDate({
                date:child.start_date, 
                unit:state.scale_unit, 
                step:state.scale_step
              });            
              child.end_date = gantt.calculateEndDate(child.start_date, 
                child.duration, gantt.config.duration_unit);
              gantt.updateTask(child.id);
        },id );
    }
});
~~~

## Verschieben von Projekten zusammen mit deren Unteraufgaben

:::note
Dieses Feature ist nur in der Gantt PRO Edition verfügbar.
:::

Standardmäßig können Aufgaben vom [Typ Projekt](api/config/types.md) nicht verschoben werden.
Sie können das Verschieben von Projekten aktivieren, indem Sie die Option [drag_project](api/config/drag_project.md) setzen:

~~~js
gantt.config.drag_project = true;
~~~


[Draggable projects](https://docs.dhtmlx.com/gantt/samples/08_api/19_draggable_projects.html)


## Verschieben von abhängigen Aufgaben zusammen mit unabhängigen Aufgaben

Es gibt verschiedene Ansätze, um Aufgaben gemeinsam mit ihren abhängigen Aufgaben zu verschieben.
Detaillierte Informationen finden Sie in einem eigenen Artikel: [Dragging Tasks Together with Their Dependent Tasks](guides/dragging-dependent-tasks.md).


## Festlegen einer minimalen Aufgabendauer 

Die minimale Aufgabendauer kann über die Einstellung [min_duration](api/config/min_duration.md) festgelegt werden.

Diese Option legt die kleinste erlaubte Aufgabengröße beim Ändern der Größe fest und verhindert, dass Aufgaben eine Dauer von Null haben.

Der Wert wird in Millisekunden angegeben:
~~~js
// 1 Tag
gantt.config.min_duration = 24*60*60*1000;

//ODER

// 1 Stunde
gantt.config.min_duration = 60*60*1000;
~~~

## Automatischer Bildlauf beim Ziehen von Aufgaben

Beim Arbeiten mit großen Gantt-Diagrammen kann das Ziehen einer Aufgabe über eine große Entfernung oder das Erstellen von Verbindungen zwischen weit entfernten Aufgaben schwierig sein.

Die **Autoscroll**-Funktion unterstützt Sie, indem das Diagramm während des Ziehens automatisch gescrollt wird. Sie ist standardmäßig aktiviert, kann aber über die Option [autoscroll](api/config/autoscroll.md) gesteuert werden.

~~~js
gantt.config.autoscroll = false;
gantt.init("gantt_here");
~~~

Sie können die Geschwindigkeit des automatischen Bildlaufs in Millisekunden mit der Eigenschaft [autoscroll_speed](api/config/autoscroll_speed.md) anpassen:

~~~js
gantt.config.autoscroll = true;
gantt.config.autoscroll_speed = 50;
 
gantt.init("gantt_here");
~~~

## Deaktivieren der Größenänderung bestimmter Aufgaben {#disablingresizingofspecifictasks}

Um zu verhindern, dass bestimmte Aufgaben in der Größe verändert werden, gibt es zwei Ansätze:

1. Blenden Sie die Anfasser zur Größenänderung im UI per CSS aus.
Nutzen Sie das Template **task_class**, um einer bestimmten Aufgabe eine eigene CSS-Klasse zuzuweisen:

~~~js
gantt.templates.task_class = function(start, end, task){
    if(task.no_resize) { // no_resize ist eine benutzerdefinierte Eigenschaft zur Demonstration
        return "no_resize";
    }
    return "";
~~~

Blenden Sie dann die Anfasser mit folgendem CSS aus:

~~~css
.no_resize .gantt_task_drag{
   display: none !important;
}
~~~

2. Blockieren Sie die Größenänderung programmatisch mit dem [onBeforeTaskDrag](api/event/onbeforetaskdrag.md) Event.
Wird *false* vom Handler zurückgegeben, wird die Größenänderung verhindert:

~~~js
gantt.attachEvent("onBeforeTaskDrag", function(id, mode, e){
    if(mode === "resize" && gantt.getTask(id).no_resize){
        return false;
    }
    return true;
});
~~~

## Erkennen, welche Seite einer Aufgabe in der Größe verändert wird {#identifyingwhichsideofataskisbeingresized}

Der "resize"-Modus beim Drag-and-Drop bedeutet, dass der Benutzer entweder das Start- oder das Enddatum einer Aufgabe ändert.

Um zu erkennen, welches Datum geändert wird, prüfen Sie das Flag **gantt.getState().drag_from_start**:

~~~js
gantt.attachEvent("onBeforeTaskDrag", function(id, mode, e){
    if(mode === "resize"){
        if(gantt.getState().drag_from_start === true) {
            // Das Startdatum wird geändert
        } else {
            // Das Enddatum wird geändert
        }
    }
    return true;
});
~~~

## Deaktivieren der Größenänderung des Start- oder Enddatums einer Aufgabe {#disablingresizingofthestartorenddateofatask}

Die Anfasser zur Größenänderung können mit folgenden Selektoren angesprochen werden:

- .gantt_task_drag[data-bind-property="start_date"]
- .gantt_task_drag[data-bind-property="end_date"]

Um die Größenänderung des Startdatums zu deaktivieren, verwenden Sie dieses CSS:

~~~css
.gantt_task_drag[data-bind-property="start_date"]{
   display: none !important;
}
~~~

Ebenso können Sie die Größenänderung des Enddatums deaktivieren:

~~~css
.gantt_task_drag[data-bind-property="end_date"]{
   display: none !important;
}
~~~

Alternativ können Sie die Größenänderung über das [onBeforeTaskDrag](api/event/onbeforetaskdrag.md) Event blockieren.
Wird *false* vom Handler zurückgegeben, wird die Größenänderung verhindert:

~~~js
gantt.attachEvent("onBeforeTaskDrag", function(id, mode, e){
    if(mode === "resize"){
        if(gantt.getState().drag_from_start === true) {
             return false;
        } else {
             // Das Ändern des Enddatums ist erlaubt
        }
    }
    return true;
});
~~~


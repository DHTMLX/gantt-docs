---
title: "Aufgaben innerhalb der Timeline ziehen"
sidebar_label: "Aufgaben innerhalb der Timeline ziehen"
---

# Aufgaben innerhalb der Timeline ziehen

Durch Ziehen können Benutzer schnell die Start- (End-)Daten der Aufgaben sowie deren Dauer ändern. 
Standardmäßig ist Drag-and-Drop aktiviert, und der Benutzer kann eine Aufgabe entlang ihrer Zeile in der Timeline ziehen.

Um das Drag-and-Drop-Verhalten anzupassen, verwenden Sie die folgenden Events:

- [onBeforeTaskDrag](api/event/onbeforetaskdrag.md) - um das Ziehen bestimmter Aufgaben zu verweigern
- [onTaskDrag](api/event/ontaskdrag.md) - um den Bereich für das Ziehen zu begrenzen oder eine andere Logik bereitzustellen, wenn der Benutzer eine Aufgabe zieht
- [onAfterTaskDrag](api/event/onaftertaskdrag.md) - um Aufgaben nach dem Verschieben an einen neuen Ort nachzubearbeiten

Betrachten wir typische Fälle, in denen das Standard-Drag-Verhalten angepasst werden muss:

1. [Verweigern des Ziehens bestimmter Aufgaben](#denying-dragging-of-specific-tasks).
2. [Verweigern des Ziehens von Aufgaben außerhalb bestimmter Termine](#denying-dragging-tasks-out-of-specific-dates).
3. [Ziehen von Kindern zusammen mit der Elternaufgabe](#dragging-children-together-with-the-parent).
4. [Ziehen von Projekten mit Unteraufgaben](#draggingprojectswithsubtasks).
5. [Festlegen der minimalen Aufgabendauer](#setting-minimal-task-duration).
6. [Autoscroll während des Ziehens von Aufgaben](#autoscrollduringtasksdragging).

## Verweigern des Ziehens bestimmter Aufgaben

Um das Ziehen bestimmter Aufgaben zu verweigern, verwenden Sie das [onBeforeTaskDrag](api/event/onbeforetaskdrag.md) Event:

~~~js
gantt.attachEvent("onBeforeTaskDrag", (taskId, dragMode, event) => {
    if (gantt.getGlobalTaskIndex(taskId) % 2 === 0) {
        return false; // verweigert das Ziehen, wenn der globale Aufgabenindex gerade ist
    }
    return true; // erlaubt das Ziehen, wenn der globale Aufgabenindex ungerade ist
});
~~~

## Verweigern des Ziehens von Aufgaben außerhalb bestimmter Termine

Um das Ziehen von Aufgaben außerhalb bestimmter Termine zu verweigern, verwenden Sie das [onTaskDrag](api/event/ontaskdrag.md) Event.

<p style="margin-top: 20px; font-weight: bold;"> Das onTaskDrag-Ereignis: </p>

<ul style="margin-top:5px;">
  <li>Wird jedes Mal ausgelöst, wenn der Benutzer eine Drag-Bewegung mit der Maus im Timeline-Bereich ausführt: Verschieben, Ändern der Größe einer Aufgabe oder Ändern des Fortschritts der Aufgabe.</li>
  <li>Der Typ einer Drag-Bewegung wird als zweites Argument übergeben - <b>mode</b>.</li>
  <li>Alle verfügbaren Werte des Typs der Drag-Bewegung sind in der [drag_mode](api/config/drag_mode.md)-Eigenschaft gespeichert.</li>
</ul>

<p style="margin-top: 20px; font-weight: bold;">Kurz gesagt, läuft alles in folgender Reihenfolge ab:</p>

<ol style="margin-top:5px;">
    <li>Der Benutzer führt eine Bewegung aus.</li>
    <li>dhtmlxGantt berechnet das Datum der Aufgabe entsprechend der neuen Position neu.</li>
    <li>dhtmlxGantt löst das [onTaskDrag](api/event/ontaskdrag.md) Event aus.</li>
    <li>dhtmlxGantt rendert die Aufgabe im Gantt-Diagramm neu. <br><i>Da das [onTaskDrag](api/event/ontaskdrag.md) Event nach der Neuberechnung ausgelöst wird, können Sie beliebige benutzerdefinierte Werte für die verschobene Aufgabe im Handler des Events festlegen, ohne befürchten zu müssen, dass diese Werte überschrieben werden. Dadurch wird die Aufgabe in der gewünschten Position dargestellt.</i></li>
</ol>

Angenommen, Sie möchten verhindern, dass Benutzer Aufgaben außerhalb des **„31. März 2028 – 11. April 2028“** Intervalls ziehen.

![custom_dnd](/img/custom_dnd.png)

Dann können Sie den Code wie folgt verwenden:

~~~js
const leftLimit = new Date(2028, 2, 31);
const rightLimit = new Date(2028, 3, 12);
const millisecondsInDay = 24 * 60 * 60 * 1000;

gantt.attachEvent("onTaskDrag", (taskId, dragMode, task, originalTask) => {
    const dragModes = gantt.config.drag_mode;

    if (dragMode === dragModes.move || dragMode === dragModes.resize) {
        const taskDuration = originalTask.duration * millisecondsInDay;

        if (+task.end_date > +rightLimit) {
            task.end_date = new Date(rightLimit);
            if (dragMode === dragModes.move) {
                task.start_date = new Date(task.end_date - taskDuration);
            }
        }

        if (+task.start_date < +leftLimit) {
            task.start_date = new Date(leftLimit);
            if (dragMode === dragModes.move) {
                task.end_date = new Date(+task.start_date + taskDuration);
            }
        }
    }
});
~~~

## Ziehen von Kindaufgaben zusammen mit der Elternaufgabe

Um das Ziehen von Kindaufgaben zu ermöglichen, während der Benutzer die Aufgabe des Elternteils zieht, verwenden Sie das [onTaskDrag](api/event/ontaskdrag.md) Event (siehe weiter oben auf das Event [oben](guides/dnd.md#denying-dragging-tasks-out-of-specific-dates)):

~~~js
gantt.attachEvent("onTaskDrag", (taskId, dragMode, task, originalTask) => {
    const dragModes = gantt.config.drag_mode;

    if (dragMode === dragModes.move) {
        const dateShift = task.start_date - originalTask.start_date;
        gantt.eachTask((child) => {
            child.start_date = new Date(+child.start_date + dateShift);
            child.end_date = new Date(+child.end_date + dateShift);
            gantt.refreshTask(child.id, true);
        }, taskId);
    }
});

// rundet die Positionen der Kindobjekte an den Maßstab an
gantt.attachEvent("onAfterTaskDrag", (taskId, dragMode, event) => {
    const dragModes = gantt.config.drag_mode;

    if (dragMode === dragModes.move) {
        const ganttState = gantt.getState();
        gantt.eachTask((child) => {
            child.start_date = gantt.roundDate({
                date: child.start_date,
                unit: ganttState.scale_unit,
                step: ganttState.scale_step
            });
            child.end_date = gantt.calculateEndDate(
                child.start_date,
                child.duration,
                gantt.config.duration_unit
            );
            gantt.updateTask(child.id);
        }, taskId);
    }
});
~~~

**Related sample**: [Drag parent task with its children](https://docs.dhtmlx.com/gantt/samples/08_api/05_limit_drag_dates.html)

## Ziehen von Projekten mit Unteraufgaben {#draggingprojectswithsubtasks}

:::info
Diese Funktionalität ist nur in der Gantt PRO-Edition verfügbar.
:::

Aufgaben des [Projekt-Typs](api/config/types.md) sind standardmäßig nicht verschiebbar. 
Sie können Drag & Drop von Projekten über die Konfiguration [drag_project](api/config/drag_project.md) aktivieren:

~~~js
gantt.config.drag_project = true;
~~~

**Related sample**: [Draggable projects](https://docs.dhtmlx.com/gantt/samples/08_api/19_draggable_projects.html)

## Ziehen abhängiger Aufgaben zusammen mit unabhängigen Aufgaben

Es gibt mehrere Wege, Aufgaben zusammen mit ihren abhängigen Aufgaben zu verschieben.
Sie können alles darüber in einem separaten Artikel [Dragging Tasks Together with Their Dependent Tasks](guides/dragging-dependent-tasks.md) nachlesen.

## Minimale Aufgabendauer festlegen

Die minimale Aufgabendauer kann über die Einstellung [min_duration](api/config/min_duration.md) festgelegt werden.

Die Option definiert die minimale Größe der Aufgabe, die beim Ändern der Größe festgelegt werden kann, und kann verwendet werden, um zu verhindern, dass Benutzer eine Null-Dauer festlegen.

Der Wert wird in Millisekunden festgelegt:
~~~js
// 1 Tag
gantt.config.min_duration = 24 * 60 * 60 * 1000;

// ODER

// 1 Stunde
gantt.config.min_duration = 60 * 60 * 1000;
~~~

## Autoscroll während des Ziehens von Aufgaben {#autoscrollduringtasksdragging}

Wenn Sie einen großen Datensatz im Gantt-Diagramm haben, müssen Sie oft eine Aufgabe zu einer weit entfernten Position ziehen oder Verbindungen zwischen Aufgaben herstellen, die weit voneinander entfernt liegen.

In diesem Fall ist die Autoscroll-Funktionalität sehr hilfreich. Sie ist standardmäßig aktiviert, aber Sie können dieses Verhalten über
die Konfigurationsoption [autoscroll](api/config/autoscroll.md) steuern.

~~~js
gantt.config.autoscroll = false;
gantt.init("gantt_here");
~~~

Außerdem können Sie die Geschwindigkeit des Autoscrollings in Millisekunden mit der entsprechenden Eigenschaft - [autoscroll_speed](api/config/autoscroll_speed.md) - anpassen:

~~~js
gantt.config.autoscroll = true;
gantt.config.autoscroll_speed = 50;

gantt.init("gantt_here");
~~~

## Deaktivieren der Größenänderung bestimmter Aufgaben

Wenn Sie verhindern möchten, dass bestimmte Aufgaben ihre Größe ändern, gibt es zwei Möglichkeiten:

1. Entfernen Sie die Griffe zum Ändern der Größe einer Aufgabe aus der Benutzeroberfläche über CSS.
Dazu verwenden Sie die **task_class**-Vorlage, um den betreffenden Elementen eine zusätzliche CSS-Klasse hinzuzufügen, sodass Sie sie über den Selektor finden können:

~~~js
gantt.templates.task_class = (startDate, endDate, task) => {
    if (task.no_resize) { // no_resize ist eine benutzerdefinierte Eigenschaft, die der Demonstration dient
        return "no_resize";
    }
    return "";
};
~~~

Dann können Sie die Griffe zum Ändern der Größe mit folgendem CSS ausblenden:

~~~css
.no_resize .gantt_task_drag {
    display: none !important;
}
~~~

2. Verhindern Sie Drag & Drop aus dem Code über das [onBeforeTaskDrag](api/event/onbeforetaskdrag.md) Event.
Wenn der Handler false zurückgibt, wird das Größenändern verhindert:

~~~js
gantt.attachEvent("onBeforeTaskDrag", (taskId, dragMode, event) => {
    if (dragMode === "resize" && gantt.getTask(taskId).no_resize) {
        return false;
    }
    return true;
});
~~~
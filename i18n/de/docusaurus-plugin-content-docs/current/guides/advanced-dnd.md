---
title: "Erstellen/Auswählen von Aufgaben mit Drag-and-Drop"
sidebar_label: "Erstellen/Auswählen von Aufgaben mit Drag-and-Drop"
---

# Erstellen/Auswählen von Aufgaben mit Drag-and-Drop

Die dhtmlxGantt-Bibliothek bietet eine Erweiterung, die fortschrittliche Drag-and-Drop-Funktionalität bei der Arbeit mit Aufgaben in der Timeline umfasst.

Insgesamt ermöglicht die **click_drag**-Erweiterung Folgendes:

- [Aufgaben mit Drag-and-Drop erstellen](#creating-tasks-with-drag-n-drop)
- [Zeiten für ungeplante Aufgaben mit Drag-and-Drop festlegen](#setting-time-for-unscheduled-tasks)
- [Aufgaben per Drag-and-Drop auswählen](#selecting-tasks-with-drag-n-drop)
- [Teile von gesplitteten Aufgaben per Drag-and-Drop erstellen](#creating-parts-of-split-tasks) (PRO-Version)

:::note
Um die Erweiterung zu verwenden, aktivieren Sie das Plugin [click_drag] mithilfe der [gantt.plugins]-Methode.
:::

Um fortgeschrittenes Drag-and-Drop zu aktivieren, geben Sie die [click_drag]-Konfigurationsoption an und legen Sie die erforderlichen Eigenschaften aus der untenstehenden Liste innerhalb ihres Objekts fest:

~~~js
gantt.config.click_drag = {
    callback: onDragEnd,
    singleRow: true
};
~~~

- **className** - (*string*) legt eine benutzerdefinierte CSS-Klasse für ein ausgewähltes Element fest
- **render** - (*function*) eine Funktion, die ein während des Draggens gerendertes Element erstellt. Nimmt zwei Parameter entgegen: 
    - **startPoint** - (*object*) - ein Objekt des Typs:


    `(absolute: (left: number, top: number), relative: (left: number, top: number) )`, 


  wobei absolute die Koordinaten der linken oberen Ecke des Dokuments sind und relative die Koordinaten des linken oberen Elements, das als ViewPort verwendet wird 
    - **endPoint** - (*object*) ein Objekt des Typs: 


    `(absolute: (left: number, top: number), relative: (left: number, top: number) )`, 


  wobei absolute die Koordinaten der linken oberen Ecke des Dokuments sind und relative die Koordinaten des linken oberen Elements, das als ViewPort verwendet wird 
- **viewPort** - (*HTMLElement*) das Element, an das ein Ereignis angehängt wird und das ausgewählt wird
- **useRequestAnimationFrame** - (*boolean*) definiert, ob während des Renderings requestAnimationFrame verwendet wird
- **callback** - (*function*) - eine Funktion, die aufgerufen wird, wenn die Maustaste losgelassen wird. Nimmt 6 Parameter entgegen:
    - **startPoint** - (*object*) - ein Objekt des Typs: 


    `(absolute: (left: number, top: number), relative: (left: number, top: number) )`, 


  wobei absolute die Koordinaten der linken oberen Ecke des Dokuments sind und relative die Koordinaten des linken oberen Elements, das als ViewPort verwendet wird 
    - **endPoint** - (*object*) ein Objekt des Typs: 


    `(absolute: (left: number, top: number), relative: (left: number, top: number) )`, 


  wobei absolute die Koordinaten der linken oberen Ecke des Dokuments sind und relative die Koordinaten des linken oberen Elements, das als ViewPort verwendet wird 
     - **startDate** - (*Date*) das Datum, das dem Startpunkt entspricht
    - **endDate** - (*Date*) das Datum, das dem Endpunkt entspricht
    - **tasksBetweenDates** - (*array*) ein Array von Aufgaben zwischen dem Start- und Enddatum
    - **tasksInRows** - (*array*) ein Array von Aufgaben, die vertikal zwischen den Start- und Endkoordinaten ausgewählt sind
- **singleRow** - (*boolean*) true, um die Auswahl nur in einer Zeile in der Höhe einer Aufgabe vorzunehmen

Sie können die folgenden Ereignisse dem Element des Timeline-Viewports (gantt.$task_data ist standardmäßig ein Teil der Timeline mit Aufgabenleisten) anhängen:

- **onBeforeDrag** - löst sich aus, nachdem die Maustaste gedrückt wurde, bevor das Ziehen beginnt
- **onDrag** - löst sich jedes Mal aus, nachdem das Ziehen gestartet wurde, bevor die Maustaste losgelassen wird
- **onBeforeDragEnd** - löst sich nach dem Loslassen der Maustaste, aber bevor das gerenderte Element gelöscht wird und Aufgaben, die unter die Auswahl fallen, gesucht werden
- **onDragEnd** - löst sich nach dem Entfernen eines gerenderten Elements und dem Finden von Aufgaben, die unter die Auswahl fallen, bevor der Callback aufgerufen wird (falls angegeben)

~~~js
gantt.$task_data.attachEvent("onBeforeDrag", function (coords) {
    gantt.message("onBeforeDrag event");
});
~~~

**Zugehöriges Beispiel** [Anbinden von Ereignishandling für die "click_drag"-Erweiterung](https://snippet.dhtmlx.com/l13f1cxl)

:::note
Beachten Sie, dass die Ereignishandler auch nur für ein bereits vorhandenes Element hinzugefügt werden können. Daher sollten Sie Ereignishandler nach der Initialisierung von Gantt hinzufügen, andernfalls funktionieren sie nicht, da die Elemente noch nicht erstellt wurden.
:::

## Aufgaben mit Drag-and-Drop erstellen

Sie können Aufgaben direkt auf der Timeline mit Drag-and-Drop erstellen, indem Sie an einer leeren Stelle klicken, um das Startdatum einer Aufgabe festzulegen, und nach rechts ziehen, um deren Dauer festzulegen.

~~~js
gantt.config.click_drag = {
    callback: onDragEnd,
    singleRow: true
};

gantt.init("gantt_here");
gantt.parse(tasks);
function onDragEnd(startPoint,endPoint,startDate,endDate,tasksBetweenDates,tasksInRow){
    if (tasksInRow.length === 1) {
        var parent = tasksInRow[0];
        gantt.createTask({
            text:"Subtask of " + parent.text,
            start_date: gantt.roundDate(startDate),
            end_date: gantt.roundDate(endDate)
        }, parent.id);
    } else if (tasksInRow.length === 0) {
        gantt.createTask({
            text:"New task",
            start_date: gantt.roundDate(startDate),
            end_date: gantt.roundDate(endDate)
        });
    }
}
~~~


[Neue Aufgaben per Drag-and-Drop erstellen](https://docs.dhtmlx.com/gantt/samples/02_extensions/24_click_drag.html)


## Festlegen der Zeit für ungeplante Aufgaben

Die **click_drag**-Erweiterung ermöglicht das Festlegen von Zeiten für [ungeplante Aufgaben](guides/unscheduled-tasks.md) mit Drag-and-Drop.

## Aufgaben per Drag-and-Drop auswählen

Es ist möglich, Aufgaben mit Drag-and-Drop in mehreren Modi auszuwählen: nach Datum, nach Zeilen oder innerhalb von Begrenzungen.

~~~js
gantt.config.multiselect = true;
gantt.config.click_drag = {
    callback: onDragEnd
};

gantt.config.autoscroll = true;
gantt.config.autoscroll_speed = 50;
gantt.init("gantt_here");
gantt.parse(tasks);
function onDragEnd(startPoint,endPoint,startDate,endDate,tasksBetweenDates,tasksInRows){
    var mode = document.querySelector("input[name="selectMode]:checked"").value;
        switch(mode) {
            case "1":
                unselectTasks();
                tasksBetweenDates.forEach(function(item) {
                    gantt.selectTask(item.id);
                });
            break;
            case "2":
                unselectTasks();
                tasksInRows.forEach(function(item) {
                    gantt.selectTask(item.id);
                });
            break;
            case "3":
                unselectTasks();
                for (var i="0;" i<tasksBetweenDates.length; i++) {
                    for (var j="0;" j<tasksInRows.length; j++) {
                        if (tasksBetweenDates[i] === tasksInRows[j]) {
                            gantt.selectTask(tasksBetweenDates[i].id);
                        }
                    }
                }
            break;
            return;
        }
}
~~~


[Mehrere Aufgaben per Drag-and-Drop auswählen](https://docs.dhtmlx.com/gantt/samples/02_extensions/25_click_drag_select_by_drag.html)


## Erstellen von Teilen gesplitteter Aufgaben

:::info
Diese Funktionalität ist nur in der PRO-Edition verfügbar.
:::
Sie können ebenfalls Teile von [Split-Aufgaben](guides/split-tasks.md) per Drag-and-Drop erstellen. 

~~~js
gantt.config.click_drag = {
    callback: onDragEnd,
    singleRow: true
}

gantt.init("gantt_here");
gantt.parse(tasks);
function onDragEnd(startPoint,endPoint,startDate,endDate,tasksBetweenDates,tasksInRow){
    if (tasksInRow.length === 1) {
        var currentTask = tasksInRow[0];
        if (currentTask.type === "project") {
            currentTask.render = "split";
            gantt.addTask({
                text:"Subtask of " + currentTask.text,
                start_date: gantt.roundDate(startDate),
                end_date: gantt.roundDate(endDate)
            }, currentTask.id);
        } else {
            var projectName = "new Project " + currentTask.text;
            var newProject = gantt.addTask({
                text: projectName,
                render: "split",
                type: "project",
            }, currentTask.parent);
            gantt.moveTask(
                newProject,
                gantt.getTaskIndex(currentTask.id),
                gantt.getParent(currentTask.id)
            );
            gantt.moveTask(currentTask.id, 0, newProject);
            gantt.calculateTaskLevel(currentTask)

            var newTask = gantt.addTask({
                text:"Subtask of " + projectName,
                start_date: gantt.roundDate(startDate),
                end_date: gantt.roundDate(endDate)
            }, newProject);
            gantt.calculateTaskLevel(newTask);
        }
    } else if (tasksInRow.length === 0) {
        gantt.createTask({
            text:"New task",
            start_date: gantt.roundDate(startDate),
            end_date: gantt.roundDate(endDate)
        });
    }
}
~~~


[Split-Aufgaben per Drag-and-Drop erstellen](https://docs.dhtmlx.com/gantt/samples/02_extensions/23_click_drag_splittask.html)
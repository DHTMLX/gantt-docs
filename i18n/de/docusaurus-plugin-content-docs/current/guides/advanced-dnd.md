---
title: "Erstellen/Auswählen von Aufgaben mit Drag-and-Drop"
sidebar_label: "Erstellen/Auswählen von Aufgaben mit Drag-and-Drop"
---

# Erstellen/Auswählen von Aufgaben mit Drag-and-Drop


Die dhtmlxGantt-Bibliothek bietet eine Erweiterung, die erweiterte Drag-and-Drop-Funktionen zur Verwaltung von Aufgaben auf der Zeitleiste bereitstellt.

Zusammengefasst unterstützt die **click_drag**-Erweiterung:

- [Erstellen von Aufgaben per Drag-and-Drop](#creatingtaskswithdragndrop)
- [Festlegen von Zeiträumen für nicht geplante Aufgaben per Ziehen](#settingtimeforunscheduledtasks)
- [Auswählen von Aufgaben per Drag-and-Drop](#selectingtaskswithdragndrop)
- [Erstellen von Teilen gesplitteter Aufgaben per Drag-and-Drop](#creatingpartsofsplittasks) (PRO-Version)

:::note
Um die Erweiterung zu verwenden, aktivieren Sie das [click_drag](guides/extensions-list.md#advanceddragndrop) Plugin mit der [gantt.plugins](api/method/plugins.md) Methode.
:::

Um Drag-and-Drop zu aktivieren, setzen Sie die [click_drag](api/config/click_drag.md) Konfigurationsoption und fügen Sie die benötigten Eigenschaften aus der untenstehenden Liste in das Objekt ein:

~~~js
gantt.config.click_drag = {
    callback: onDragEnd,
    singleRow: true
};
~~~

- **className** -  (*string*) wendet eine benutzerdefinierte CSS-Klasse auf das ausgewählte Element an
- **render** - (*function*) eine Funktion, die das während des Ziehens angezeigte Element erstellt. Sie erhält zwei Parameter:
    - **startPoint** - (*object*) - ein Objekt mit folgender Struktur:


    `(absolute: (left: number, top: number), relative: (left: number, top: number) )`, 


  wobei absolute die Koordinaten der oberen linken Ecke des Dokuments und relative die Koordinaten der oberen linken Ecke des viewPort-Elements darstellt
    - **endPoint** - (*object*) ähnlich wie startPoint:


    `(absolute: (left: number, top: number), relative: (left: number, top: number) )`, 


  mit absoluten und relativen Koordinaten wie oben beschrieben
- **viewPort** - (*HTMLElement*) das Element, an dem Ereignisse angehängt werden und Auswahlen erfolgen
- **useRequestAnimationFrame** - (*boolean*) gibt an, ob requestAnimationFrame beim Rendern verwendet werden soll
- **callback** - (*function*) wird ausgelöst, wenn die Maustaste losgelassen wird. Erhält 6 Parameter:
    - **startPoint** - (*object*) mit der oben beschriebenen Struktur
    - **endPoint** - (*object*) mit der oben beschriebenen Struktur
     - **startDate** - (*Date*) das Datum, das dem Beginn des Ziehvorgangs entspricht
    - **endDate** - (*Date*) das Datum, das dem Ende des Ziehvorgangs entspricht
    - **tasksBetweenDates** - (*array*) Aufgaben, die zwischen dem Start- und Enddatum liegen
    - **tasksInRows** - (*array*) Aufgaben, die vertikal zwischen den Start- und Endkoordinaten ausgewählt wurden
- **singleRow** - (*boolean*) wenn true, ist die Auswahl auf eine Zeile begrenzt, die der Höhe einer Aufgabe entspricht

Sie können diese Ereignisse an das Timeline-Viewport-Element anhängen (standardmäßig gantt.$task_data, das die Aufgabenbalken enthält):

- **onBeforeDrag** - wird nach dem Drücken der Maustaste ausgelöst, bevor das Ziehen beginnt
- **onDrag** - wird wiederholt ausgelöst, nachdem das Ziehen begonnen hat, aber bevor die Maustaste losgelassen wird
- **onBeforeDragEnd** - wird nach dem Loslassen der Maustaste ausgelöst, aber bevor das gezogene Element entfernt und die ausgewählten Aufgaben ermittelt werden
- **onDragEnd** - wird ausgelöst, nachdem das gezogene Element entfernt und die ausgewählten Aufgaben gefunden wurden, aber bevor die Callback-Funktion aufgerufen wird (falls gesetzt)

~~~js
gantt.$task_data.attachEvent("onBeforeDrag", function (coords) {
    gantt.message("onBeforeDrag event");
});
~~~

**Related example:** [Attaching event handlers for the "click_drag" extension](https://snippet.dhtmlx.com/l13f1cxl)

:::note
Beachten Sie, dass Ereignis-Handler nur an bereits existierende Elemente angehängt werden können. Fügen Sie daher die Ereignis-Handler nach der Initialisierung von Gantt hinzu, da die Elemente sonst noch nicht erstellt wurden und die Handler nicht funktionieren.
:::

## Aufgaben mit Drag-and-Drop erstellen


Aufgaben können direkt auf der Zeitleiste erstellt werden, indem Sie auf eine freie Stelle klicken, um das Startdatum festzulegen, und dann nach rechts ziehen, um die Dauer zu bestimmen.

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


[Create new tasks by Drag and Drop](https://docs.dhtmlx.com/gantt/samples/02_extensions/24_click_drag.html)


## Zeiträume für nicht geplante Aufgaben festlegen


Die **click_drag**-Erweiterung ermöglicht es außerdem, Zeitintervalle für [nicht geplante Aufgaben](guides/unscheduled-tasks.md) per Drag-and-Drop festzulegen.

## Aufgaben mit Drag-and-Drop auswählen


Das Auswählen von Aufgaben per Drag-and-Drop wird in mehreren Modi unterstützt: nach Datum, nach Zeilen oder innerhalb von Begrenzungen.

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


[Select multiple tasks by Drag and Drop](https://docs.dhtmlx.com/gantt/samples/02_extensions/25_click_drag_select_by_drag.html)


## Teile von gesplitteten Aufgaben erstellen


Mit Drag-and-Drop können auch Teile von [gesplitteten Aufgaben](guides/split-tasks.md) erstellt werden.

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


[Create split tasks by Drag and Drop](https://docs.dhtmlx.com/gantt/samples/02_extensions/23_click_drag_splittask.html)


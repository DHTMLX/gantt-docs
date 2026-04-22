--- 
title: "Mehrfachauswahl" 
sidebar_label: "Mehrfachauswahl" 
--- 

# Mehrfachauswahl

Ab Version 3.2 bietet die Bibliothek die Erweiterung **multiselect**, die es Ihnen ermöglicht, mehrere Aufgaben gleichzeitig auszuwählen.

<div style="text-align:center;">![multiselection](/img/multiselection.png)</div>


## Aktivierung der Mehrfachauswahl

Um die Mehrfachauswahl für Aufgaben zu aktivieren, aktivieren Sie sie über die [gantt.plugins](api/method/plugins.md) Methode:

~~~js
<!DOCTYPE html>
<html>
<head>
   <script src="codebase/dhtmlxgantt.js"></script>   
   <link href="codebase/dhtmlxgantt.css" rel="stylesheet">   
</head>
<body>
    gantt.plugins({ /*!*/
        multiselect: true /*!*/
    }); /*!*/
    //your code will be here
</body>
</html>
~~~

[Multiselection and Indent/Outdent tasks](https://docs.dhtmlx.com/gantt/samples/02_extensions/09_multiselection.html)

Sobald die Erweiterung aktiviert ist, wird die Mehrfachauswahl automatisch aktiviert.


Um die Erweiterung zu deaktivieren, verwenden Sie die [multiselect](api/config/multiselect.md) Option:
**Deaktivierung der Mehrfachauswahl**
~~~js
gantt.config.multiselect = false; 
~~~


## Einmalige Aktualisierung mehrerer Aufgaben

Um mehrere Aufgaben/Verknüpfungen gleichzeitig zu aktualisieren, verwenden Sie die [batchUpdate](api/method/batchupdate.md) Methode:

~~~js
gantt.batchUpdate(function () {
    var tasks = gantt.getTaskByTime();
    for(var i = 0; i < tasks.length; i++){
        var task = tasks[i];
        task.start_date = gantt.date.add(task.start_date, 1, "day");
        task.end_date = gantt.calculateEndDate(task.start_date, task.duration);
        gantt.updateTask(task.id);
    }
});
~~~
Die Methode ermöglicht das gleichzeitige Aktualisieren mehrerer Aufgaben/Verknüpfungen auf einmal mit nur einem Neuzeichnen statt mehrerer Updates mit mehreren Neuzeichnungen.


[Multiselection and Indent/Outdent tasks](https://docs.dhtmlx.com/gantt/samples/02_extensions/09_multiselection.html)


## Iterator

Um alle ausgewählten Aufgaben im Gantt-Diagramm zu iterieren, verwenden Sie die [eachSelectedTask](api/method/eachselectedtask.md) Methode:

~~~js
gantt.batchUpdate(function () {
    gantt.eachSelectedTask(function(task_id){
        if(gantt.isTaskExists(task_id))
            gantt.deleteTask(task_id);
    });
});
~~~


[Multiselection and Indent/Outdent tasks](https://docs.dhtmlx.com/gantt/samples/02_extensions/09_multiselection.html)


## Simultane Ein-/Ausrückung

Die Mehrfachauswahl ermöglicht es Ihnen, gleichzeitig verschiedene Operationen auf mehrere Aufgaben anzuwenden. Beispielsweise können Sie eine Einrückung/Ausrückung hinzufügen und damit Aufgaben in Unteraufgaben verwandeln bzw. umgekehrt.


[Multiselection and Indent/Outdent tasks](https://docs.dhtmlx.com/gantt/samples/02_extensions/09_multiselection.html)


## Überprüfen, ob eine Aufgabe ausgewählt ist

Um zu prüfen, ob eine Aufgabe derzeit ausgewählt ist, verwenden Sie die [isSelectedTask](api/method/isselectedtask.md) Methode:

~~~js
gantt.templates.task_class = 
gantt.templates.grid_row_class = 
gantt.templates.task_row_class = function (start, end, task) {
    if (gantt.isSelectedTask(task.id))
        return "gantt_selected";
};
~~~


[Multiselection and Indent/Outdent tasks](https://docs.dhtmlx.com/gantt/samples/02_extensions/09_multiselection.html)


Um zwischen ausgewählten und nicht ausgewählten Zuständen umzuschalten, verwenden Sie die [toggleTaskSelection](api/method/toggletaskselection.md) Methode:

~~~js
gantt.toggleTaskSelection("t_1"); //"t_1" is the task's id
gantt.render();
~~~


## Alle ausgewählten Aufgaben erhalten

Um alle aktuell ausgewählten Aufgaben abzurufen, verwenden Sie die [getSelectedTasks](api/method/getselectedtasks.md) Methode:

~~~js
gantt.getSelectedTasks();
~~~


Um die zuletzt ausgewählte Aufgabe abzurufen, verwenden Sie die [getLastSelectedTask](api/method/getlastselectedtask.md) Methode:

~~~js
gantt.getLastSelectedTask();
~~~


## Einschränkung der Mehrfachauswahl auf eine Ebene

Um das Auswählen von Aufgaben aus unterschiedlichen Ebenen zu verweigern, verwenden Sie die Option [multiselect_one_level](api/config/multiselect_one_level.md):

~~~js
gantt.config.multiselect_one_level = true; 
gantt.init('gantt_here');
~~~


## Mehrfachauswahl und Drag-and-Drop {#multitaskselectionanddragndrop}

Wenn die **multiselect.js** Erweiterung aktiviert ist, können Sie mehrere Aufgaben auswählen, indem Sie entweder die Ctrl- oder die Umschalttaste gedrückt halten und die ausgewählten Aufgaben horizontal gleichzeitig ziehen.

Um diese Funktionalität zu deaktivieren, setzen Sie die [drag_multiple](api/config/drag_multiple.md) Methode auf *false*:

~~~js
gantt.config.drag_multiple = true; 
~~~


[Multiselection and Indent/Outdent tasks](https://docs.dhtmlx.com/gantt/samples/02_extensions/09_multiselection.html)


## Editor mit einem Klick öffnen

Im Einzel-Auswahlmodus öffnet Gantt den Inline-Editor, nachdem Sie auf eine Aufgabe geklickt haben. 

Im **Mehrfachauswahl**-Modus wird nach dem ersten Klick auf eine unmarkierte Aufgabe diese ausgewählt und der Inline-Editor wird erst nach dem zweiten Klick geöffnet. 
Wenn Sie möchten, dass Gantt den Inline-Editor nach dem ersten Klick öffnet, aktivieren Sie die [inline_editors_multiselect_open](api/config/inline_editors_multiselect_open.md) Konfiguration.

~~~js
gantt.plugins({
  multiselect: true
});

...

gantt.config.inline_editors_multiselect_open = true;
~~~


## API-Ereignisse {#apievents}

Wenn die Mehrfachauswahl aktiviert ist, löst das Auswählen einer Aufgabe oder eines Bereichs von Aufgaben sowohl die allgemeinen [onTaskSelected] / [onTaskUnselected] Ereignisse aus, als auch Ereignisse, die speziell für die Multiselect-Erweiterung gelten.

Mehrfachauswahl folgt dem folgenden Ereignisfluss:

- [onBeforeMultiSelect] - löst vor dem Auswählen einer Aufgabe oder eines Bereichs von Aufgaben aus, blockierbar
- [onBeforeTaskMultiSelect] - löst aus, bevor sich der Auswahlszustand der Aufgabe ändert (die Aufgabe wird ausgewählt oder abgewählt), blockierbar
- [onTaskMultiSelect] - löst aus, nachdem der Auswahlszustand der Aufgabe geändert wurde (die Aufgabe wurde ausgewählt/abgewählt)
- [onTaskUnselected] - wird für jede Aufgabe des Multiselection-Bereichs aufgerufen
- [onTaskSelected] - wird für jede Aufgabe des Multiselection-Bereichs aufgerufen
- [onMultiSelect] - löst nach Abschluss der Auswahl einer Aufgabe oder eines Bereichs von Aufgaben aus
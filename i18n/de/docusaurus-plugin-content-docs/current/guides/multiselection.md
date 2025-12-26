---
title: "Multi-Task-Auswahl"
sidebar_label: "Multi-Task-Auswahl"
---

# Multi-Task-Auswahl 

Ab Version 3.2 enthält die Bibliothek die **multiselect**-Erweiterung, mit der Sie mehrere Aufgaben gleichzeitig auswählen können.

<div style="text-align:center;">![multiselection](/img/multiselection.png)</div>

## Aktivierung der Multi-Task-Auswahl

Um die Multi-Task-Auswahl für Aufgaben zu aktivieren, nutzen Sie die Methode [gantt.plugins](api/method/plugins.md):

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
    //Ihr Code kommt hier hin
</body>
</html>
~~~

[Multiselection and Indent/Outdent tasks](https://docs.dhtmlx.com/gantt/samples/02_extensions/09_multiselection.html)


Sobald aktiviert, ist die Multi-Task-Auswahl automatisch aktiv.


Um die Erweiterung zu deaktivieren, verwenden Sie die Option [multiselect](api/config/multiselect.md):
**Disabling multi-task selection**
~~~js
gantt.config.multiselect = false; 
~~~

## Einmaliges Update für mehrere Aufgaben

Um mehrere Aufgaben oder Verknüpfungen gleichzeitig zu bearbeiten, nutzen Sie die Methode [batchUpdate](api/method/batchupdate.md):

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
Mit dieser Methode können Sie mehrere Aufgaben oder Verknüpfungen mit nur einer einzigen Neudarstellung aktualisieren, anstatt durch mehrere Updates mehrere Neudarstellungen auszulösen.


[Multiselection and Indent/Outdent tasks](https://docs.dhtmlx.com/gantt/samples/02_extensions/09_multiselection.html)


## Iterator

Um alle ausgewählten Aufgaben im Gantt-Diagramm zu durchlaufen, verwenden Sie die Methode [eachSelectedTask](api/method/eachselectedtask.md):

~~~js
gantt.batchUpdate(function () {
    gantt.eachSelectedTask(function(task_id){
        if(gantt.isTaskExists(task_id))
            gantt.deleteTask(task_id);
    });
});
~~~


[Multiselection and Indent/Outdent tasks](https://docs.dhtmlx.com/gantt/samples/02_extensions/09_multiselection.html)


## Gleichzeitiges Einrücken/Ausrücken

Mit der Multi-Task-Auswahl können Sie Operationen auf mehrere Aufgaben gleichzeitig anwenden. Zum Beispiel können Sie Aufgaben einrücken oder ausrücken, sie also zu Unteraufgaben machen oder Unteraufgaben wieder zu Hauptaufgaben hochstufen.


[Multiselection and Indent/Outdent tasks](https://docs.dhtmlx.com/gantt/samples/02_extensions/09_multiselection.html)


## Prüfen, ob eine Aufgabe ausgewählt ist

Um herauszufinden, ob eine Aufgabe aktuell ausgewählt ist, verwenden Sie die Methode [isSelectedTask](api/method/isselectedtask.md):

~~~js
gantt.templates.task_class = 
gantt.templates.grid_row_class = 
gantt.templates.task_row_class = function (start, end, task) {
    if (gantt.isSelectedTask(task.id))
        return "gantt_selected";
};
~~~

[Multiselection and Indent/Outdent tasks](https://docs.dhtmlx.com/gantt/samples/02_extensions/09_multiselection.html)


Um den Auswahlsstatus einer Aufgabe umzuschalten, verwenden Sie die Methode [toggleTaskSelection](api/method/toggletaskselection.md):

~~~js
gantt.toggleTaskSelection("t_1"); //"t_1" ist die ID der Aufgabe
gantt.render();
~~~

## Alle ausgewählten Aufgaben abrufen

Um alle aktuell ausgewählten Aufgaben abzurufen, verwenden Sie die Methode [getSelectedTasks](api/method/getselectedtasks.md):

~~~js
gantt.getSelectedTasks();
~~~

Um die zuletzt ausgewählte Aufgabe zu erhalten, verwenden Sie die Methode [getLastSelectedTask](api/method/getlastselectedtask.md):

~~~js
gantt.getLastSelectedTask();
~~~

## Multi-Task-Auswahl auf eine Ebene beschränken

Wenn Sie die Auswahl auf Aufgaben derselben Ebene beschränken möchten, nutzen Sie die Option [multiselect_one_level](api/config/multiselect_one_level.md):

~~~js
gantt.config.multiselect_one_level = true; 
gantt.init('gantt_here');
~~~

## Multi-Task-Auswahl und Drag-n-Drop {#multitaskselectionanddragndrop}

Mit aktivierter **multiselect.js**-Erweiterung können Sie durch Halten von Strg oder Shift mehrere Aufgaben auswählen und diese dann gemeinsam horizontal verschieben.

Um diese Funktion zu deaktivieren, setzen Sie die Option [drag_multiple](api/config/drag_multiple.md) auf *false*:

~~~js
gantt.config.drag_multiple = true; 
~~~


[Multiselection and Indent/Outdent tasks](https://docs.dhtmlx.com/gantt/samples/02_extensions/09_multiselection.html)


## Editor mit einem Klick öffnen

Im Einzel-Auswahlmodus öffnet ein Klick auf eine Aufgabe sofort den Inline-Editor.

Im **Multi-Auswahlmodus** wird durch einen Klick auf eine nicht ausgewählte Aufgabe diese zunächst ausgewählt, der Inline-Editor öffnet sich jedoch erst beim zweiten Klick. 
Um den Editor auch im Multi-Auswahlmodus bereits beim ersten Klick zu öffnen, aktivieren Sie die Konfiguration [inline_editors_multiselect_open](api/config/inline_editors_multiselect_open.md).

~~~js
gantt.plugins({
  multiselect: true
});

...

gantt.config.inline_editors_multiselect_open = true;
~~~

## API-Events

Wenn die Multi-Task-Auswahl aktiv ist, lösen das Auswählen einer oder mehrerer Aufgaben sowohl die allgemeinen [onTaskSelected](api/event/ontaskselected.md) / [onTaskUnselected](api/event/ontaskunselected.md) Events als auch speziell für die Multiselect-Erweiterung vorgesehene Events aus.

Die Multi-Task-Auswahl löst folgende Event-Reihenfolge aus:

- [onBeforeMultiSelect](api/event/onbeforemultiselect.md) - wird ausgelöst, bevor eine Aufgabe oder ein Aufgabenbereich ausgewählt wird; dieses Event kann blockiert werden
- [onBeforeTaskMultiSelect](api/event/onbeforetaskmultiselect.md) - wird ausgelöst, bevor sich der Auswahlstatus einer Aufgabe ändert (ausgewählt oder abgewählt); dieses Event kann blockiert werden
- [onTaskMultiSelect](api/event/ontaskmultiselect.md) - wird ausgelöst, nachdem sich der Auswahlstatus einer Aufgabe geändert hat
- [onTaskUnselected](api/event/ontaskunselected.md) - wird für jede Aufgabe aufgerufen, die im Bereich abgewählt wurde
- [onTaskSelected](api/event/ontaskselected.md) - wird für jede Aufgabe aufgerufen, die im Bereich ausgewählt wurde
- [onMultiSelect](api/event/onmultiselect.md) - wird ausgelöst, nachdem die Auswahl einer Aufgabe oder eines Aufgabenbereichs abgeschlossen ist


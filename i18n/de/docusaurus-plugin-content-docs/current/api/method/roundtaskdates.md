---
sidebar_label: roundTaskDates
title: roundTaskDates method
description: "passt die Start- und Enddaten einer Aufgabe so an, dass sie mit den nächstgelegenen Daten auf der Timeline-Skala übereinstimmen"
---

# roundTaskDates

### Description

@short: Passt die Start- und Enddaten einer Aufgabe so an, dass sie mit den nächstgelegenen Daten auf der Timeline-Skala übereinstimmen

@signature: roundTaskDates: (task: Task) =\> void

### Parameters

- `task` - (required) *Task* - das Aufgabenobjekt

### Example

~~~jsx
// Verschieben von Child-Elementen zusammen mit dem Parent
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
    return true;
});

// Rundet die Positionen der Child-Elemente auf die Skala
gantt.attachEvent("onAfterTaskDrag", function(id, mode, e){
     var modes = gantt.config.drag_mode;
     if(mode == modes.move ){
         gantt.eachTask(function(child){
            gantt.roundTaskDates(child);  /*!*/
            gantt.refreshTask(child.id, true);
         },id );
     }
});
~~~

### Details

- Diese Methode berücksichtigt die konfigurierten Arbeitszeit-Einstellungen.
- Sie kann die Dauer der Aufgabe im Rahmen der Anpassung verändern.
- Wenn sie innerhalb des onbeforedragend-Events verwendet wird, passt sich das Rundungsverhalten basierend auf der Drag-and-Drop-Aktion an: Zum Beispiel passt die "move"-Aktion die Aufgabendaten an, ohne die Dauer zu ändern, während die "resize"-Aktion sowohl die Dauer als auch das Start- oder Enddatum ändert, abhängig von der Richtung der Größenänderung.

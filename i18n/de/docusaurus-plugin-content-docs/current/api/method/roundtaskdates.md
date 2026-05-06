---
sidebar_label: roundTaskDates
title: roundTaskDates Methode
description: "Rundet die Start- und Enddaten der Aufgabe auf die nächstgelegenen Daten im Zeitmaßstab"
---

# roundTaskDates

### Description

@short: Rundet die Start- und Enddaten der Aufgabe auf die nächstgelegenen Daten im Zeitmaßstab

@signature: roundTaskDates: (task: Task) => void

### Parameters

- `task` - (erforderlich) *Task* - das Task-Objekt

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

- Die Methode berücksichtigt die festgelegte Arbeitszeit.
- Die Methode kann die Dauer der Aufgabe ändern.
- Wenn die Methode aus dem onbeforedragend-Aufruf aufgerufen wird, werden die Daten unter Berücksichtigung der Art der Drag-&-Drop-Operation gerundet (z.B. die "move"-Operation wird die Start- und Enddaten der Aufgabe ändern, ohne die Dauer zu beeinflussen; die "resize"-Operation wird die Dauer der Aufgabe ändern und eines der Datumswerte der Aufgabe: Start oder Ende, je nach Richtung der Resize).
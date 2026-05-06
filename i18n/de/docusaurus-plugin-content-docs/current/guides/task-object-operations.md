---
title: "Aufgabenobjekt/ID"
sidebar_label: "Aufgabenobjekt/ID"
---

# Aufgabenobjekt/ID

Um mit Daten im Gantt-Diagramm zu arbeiten, müssen Sie wissen, wie Sie das Objekt oder die ID eines Datenelements erhalten. Erstens nehmen die meisten Methoden das Datenobjekt/die ID als Parameter. 
Zweitens kann kein datenbezogenes Codeszenario implementiert werden, ohne sich auf das Datenobjekt/die ID zu beziehen.

*Um sich über die verfügbaren baumbezogenen Methoden für Aufgaben zu informieren, lesen Sie den [Aufgaben-Elternteil/Kind](guides/task-tree-operations.md) Artikel.*

## Aufgabenobjekt

Um ein Aufgabenobjekt zu erhalten, verwenden Sie die [getTask](api/method/gettask.md) Methode:

~~~js
gantt.getTask("t1");
//->{id:"t1", text:"Task #5", start_date:"02-09-2020", duration:28, 
// progress:0.6, parent:"pr_2", $source:[3,5], $target:[2,1], ...}
~~~

## Elternteil einer Aufgabe

Um den Elternteil einer Aufgabe zu erhalten, verwenden Sie die [getParent](api/method/getparent.md) Methode oder die **parent**-Eigenschaft des Aufgabenobjekts:

~~~js
gantt.getParent("t1"); //->"pr_2".Wenn es kein Elternteil gibt, gibt die Methode die Wurzel-ID zurück
//oder
var taskObj = gantt.getTask("t1"); //-> {id:"t1", text:"Task #5", parent:"pr_2", ...}
var taskParent = taskObj.parent;  //-> "pr_2"
~~~

*Um alle Methoden im Zusammenhang mit der Baumeigenschaft des Gantt-Diagramms zu sehen, lesen Sie den [Aufgaben-Elternteil/Kind](guides/task-tree-operations.md) Artikel.*

## Verknüpfungen zu einer Aufgabe

Für Details darüber, wie man alle Verknüpfungen erhält, die mit einer bestimmten Aufgabe verbunden sind, lesen Sie den Artikel [Erhalten des Link-Objekts/der ID](guides/link-object-operations.md#getting-the-links-related-to-a-certain-task).


## Dauer der Aufgabe

Um die Dauer einer Aufgabe zu erhalten, verwenden Sie die [calculateDuration](api/method/calculateduration.md) Methode:

~~~js
gantt.calculateDuration(new Date(2020,03,30),new Date (2020,04,02)); // ->16
~~~

Die Methode funktioniert nicht, nachdem nur der **duration**-Parameter geändert und das Aufgabenobjekt aktualisiert wurde. Um sie verwenden zu können, müssen Sie auch den **end_date**-Parameter über die [calculateEndDate](api/method/calculateenddate.md) Methode aktualisieren. [Siehe das Beispiel](https://snippet.dhtmlx.com/f6keqhy5).

Hinweis: Wenn die [work_time](api/config/work_time.md) Option aktiviert ist, berechnet die [calculateDuration](api/method/calculateduration.md) Methode die Dauer der Aufgabe in der Arbeitszeit. 

## Aufgabenhöhe

Um die Höhe des DOM-Elements der Aufgabe zu erhalten, verwenden Sie die [getTaskBarHeight](api/method/gettaskbarheight.md) Methode:

~~~js
gantt.config.bar_height = 45;
gantt.render();
 
gantt.getTaskBarHeight(1); // -> 45
~~~

Der Rückgabewert kann auch dem im Task-Objekt angegebenen **bar_height**-Wert entsprechen:

~~~js
var tasks = {
      data:[
         { id: 1, text: "Project #2", start_date: "01-04-2018", duration: 18, 
             progress: 0.4, open: true, bar_height: "full", row:height: 50 }, 
        { id: 2, text: "Task #1", start_date: "02-04-2018", duration: 8, 
            progress: 0.6, parent: 1, bar_height: 25, row:height: 50 },
       ]
};
gantt.init("gantt_here");
gantt.parse(tasks);

gantt.getTaskBarHeight(1); // -> 45
gantt.getTaskBarHeight(2); // -> 25
~~~

Hinweis: Wenn die Eigenschaft **bar_height** auf "full" gesetzt ist, berechnet die Methode die Höhe der Aufgabenleiste in Pixeln.

## Enddatum der Aufgabe

Um das Enddatum einer Aufgabe zu erhalten, verwenden Sie die [calculateEndDate](api/method/calculateenddate.md) Methode:

~~~js
gantt.calculateEndDate(new Date(2020,03,30),48,"hour"); //-> Thu May 07 2020 17:00:00
~~~

Hinweis: Wenn die [work_time](api/config/work_time.md) Option aktiviert ist, berücksichtigt die Methode die Dauer als Arbeitszeit. 


## Ausgewählte Aufgabe

Um die aktuell ausgewählte Aufgabe zu erhalten, verwenden Sie die [getSelectedId](api/method/getselectedid.md) Methode: 

~~~js
gantt.selectTask("t_1"); 
gantt.getSelectedId();  //-> "t_1" - die ID der ausgewählten Aufgabe
~~~

## Aufgaben aus einem bestimmten Zeitraum

Um eine Sammlung von Aufgaben zu erhalten, die im angegebenen Zeitraum auftreten, verwenden Sie die [getTaskByTime](api/method/gettaskbytime.md) Methode:

~~~js
var tasks = gantt.getTaskByTime(new Date(2020,03,05),new Date(2020,03,15)); 
// where tasks is an array of tasks' objects
~~~

## Alle Aufgaben des Gantt 

Um alle im Gantt-Diagramm dargestellten Aufgaben zu erhalten, verwenden Sie die [getTaskByTime](api/method/gettaskbytime.md) Methode wie folgt:

~~~js
var tasks = gantt.getTaskByTime();  //erfolgt alle Aufgaben als Array von Objekten
~~~

Sie können auch die [serialize](api/method/serialize.md) Methode aufrufen.


## Verknüpfungen einer bestimmten Aufgabe

Um Verknüpfungen zu einer Aufgabe zu erhalten, verwenden Sie die **$source**, **$target** Eigenschaften des Aufgabenobjekts. Die Eigenschaften werden automatisch generiert und speichern die IDs der zugehörigen Verknüpfungen:

- **$source** - Verknüpfungen, die von der Aufgabe ausgehen.
- **$target** - Verknüpfungen, die zur Aufgabe hineinführen.

~~~js
var taskObj = gantt.getTask("t1");

var sourceLinks = taskObj.$source;  //-> ["l1","l4"] - IDs der ausgehenden Verknüpfungen  /*!*/
var targetLinks = taskObj.$target;  //-> ["l5","l8"] - IDs der eingehenden Verknüpfungen  /*!*/
~~~


## Nächste aufkommende Aufgabe

Um die nächste aufkommende Aufgabe zu erhalten, verwenden Sie die [getTaskByTime](api/method/gettaskbytime.md) Methode wie folgt:

~~~js
var tasks = gantt.getTaskByTime(new Date(), new Date(9999,1,1);    
// tasks - die Liste aller aufkommenden Aufgaben
tasks.sort(function(a,b){ return (a.start_date > b.start_date ? 1 : -1); });
// tasks[0] - die nächste aufkommende Aufgabe
~~~

## Task-ID

Allgemein können Sie die ID einer Aufgabe aus dem "data"-Objekt des Datensatzes abrufen. 

~~~js
{
    tasks:[
        {id:1, text:"Task #1", start_date:"01-04-2020", duration:18, progress:0.4}, /*!*/
        {id:2, text:"Task #2", start_date:"02-04-2020", duration:8,  progress:0.6}  /*!*/
    ],
    links:[...]
}
~~~

Wenn Sie die ID der Aufgabe nicht aus dem Datensatz erhalten können, verwenden Sie die [getTaskByTime](api/method/gettaskbytime.md) Methode wie folgt:

~~~js
var tasks = gantt.getTaskByTime();   //liefert alle Aufgaben
for(var i="0;i" < tasks.length; i++){  //geht über alle Aufgaben, um die benötigte zu finden
    if (tasks[i].text == "Task #3") 
        var taskId = tasks[i].id;
};
~~~

*Wenn Sie eine ungefähre Zeit kennen, zu der die benötigte Aufgabe auftritt, sollten Sie die zurückgegebene Sammlung von Aufgaben einschränken, um die App-Geschwindigkeit zu erhöhen:*\

~~~js
var tasks = gantt.getTaskByTime(new Date(2020,05,01),new Date(2020,05,10)); 
for(var i="0;i" < tasks.length; i++){  
    if (tasks[i].text == "Task #3") 
        var taskId = tasks[i].id;
};
~~~

### Ändern der ID einer Aufgabe

Um die aktuelle ID einer Aufgabe zu ändern, verwenden Sie die [changeTaskId](api/method/changetaskid.md) Methode:

~~~js
gantt.changeTaskId("t1", "t11");  //ändert die Aufgaben-ID von "t1" zu "t11" 
~~~


## Öffnen/Schließen von Aufgabenästen

Der offene Zustand eines Aufgabenastes wird durch die **task.$open**-Eigenschaft definiert, die nach dem Laden der Aufgaben in Gantt verfügbar ist.
Sobald der Wert geändert wird, werden die Änderungen nach der nächsten Neuzeichnung des Gantt angezeigt:

~~~js
// alle Äste erweitern
gantt.eachTask(function(task){
    task.$open = true;
});
gantt.render();

// alle Äste zusammenklappen
gantt.eachTask(function(task){
    task.$open = false;
});
gantt.render();
~~~

Um eine einzelne Aufgabe zu öffnen/zu schließen, können Sie die [open](api/method/open.md) und [close](api/method/close.md) Methoden verwenden. Sie ändern den internen Zustand der Aufgabe und lösen Neuzeichnungen aus. 
Wenn Sie jedoch viele Aufgaben ändern müssen, ist es besser, direkt mit **task.$open** zu arbeiten, um unnötige Neuzeichnungen zu vermeiden.

## Kopieren/Einfügen von Aufgaben

Folgen Sie den Beispielen im Abschnitt [Wie man Aufgaben kopiert und einfügt](guides/how-to.md#how-to-copy-and-paste-tasks).
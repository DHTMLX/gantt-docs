---
title: "Task-Objekt/Id"
sidebar_label: "Task-Objekt/Id"
---

# Task-Objekt/Id


Beim Arbeiten mit Daten im Gantt-Diagramm ist es wichtig zu wissen, wie man auf das Objekt oder die Id eines Datenobjekts zugreift. Die meisten Methoden erfordern das Datenobjekt oder die Id als Parameter. Darüber hinaus basieren alle datenbezogenen Operationen auf dem Verweis auf das Datenobjekt oder die Id.

*Informationen zu verfügbaren baumbezogenen Methoden für Aufgaben finden Sie im Artikel [Task Parent/Child](guides/task-tree-operations.md).*

## Task-Objekt


Um ein Task-Objekt abzurufen, verwenden Sie die Methode [getTask](api/method/gettask.md):

~~~js
gantt.getTask("t1");
//->{id:"t1", text:"Task #5", start_date:"02-09-2020", duration:28, 
// progress:0.6, parent:"pr_2", $source:[3,5], $target:[2,1], ...}
~~~

## Elternelement einer Aufgabe


Um das Elternelement einer Aufgabe zu ermitteln, können Sie die Methode [getParent](api/method/getparent.md) verwenden oder auf die **parent**-Eigenschaft des Task-Objekts zugreifen:

~~~js
gantt.getParent("t1"); //->"pr_2". Gibt es keinen Parent, wird die Root-Id zurückgegeben
//oder
var taskObj = gantt.getTask("t1"); //-> {id:"t1", text:"Task #5", parent:"pr_2", ...}
var taskParent = taskObj.parent;  //-> "pr_2"
~~~

*Alle Methoden im Zusammenhang mit der Baumstruktur des Gantt-Diagramms finden Sie im Artikel [Task Parent/Child](guides/task-tree-operations.md).*

## Verknüpfungen, die mit einer Aufgabe verbunden sind


Wie Sie alle Links abrufen, die mit einer bestimmten Aufgabe verbunden sind, erfahren Sie im Artikel [Getting the Link Object/Id](guides/link-object-operations.md#gettingthelinksrelatedtoacertaintask).

## Aufgabendauer


Um die Dauer einer Aufgabe zu bestimmen, verwenden Sie die Methode [calculateDuration](api/method/calculateduration.md):

~~~js
gantt.calculateDuration(new Date(2020,03,30),new Date (2020,04,02)); // ->16
~~~

Diese Methode funktioniert nicht korrekt, wenn nur der **duration**-Parameter geändert und das Task-Objekt aktualisiert wird. Damit sie funktioniert, muss auch der **end_date**-Parameter mit der Methode [calculateEndDate](api/method/calculateenddate.md) aktualisiert werden. [Siehe das Beispiel](https://snippet.dhtmlx.com/f6keqhy5).

Beachten Sie, dass bei aktivierter Option [work_time](api/config/work_time.md) die Methode [calculateDuration](api/method/calculateduration.md) die Dauer der Aufgabe anhand der Arbeitszeit berechnet.

## Task-Höhe


Um die Höhe des DOM-Elements einer Aufgabe zu erhalten, verwenden Sie die Methode [getTaskBarHeight](api/method/gettaskbarheight.md):

~~~js
gantt.config.bar_height = 45;
gantt.render();
 
gantt.getTaskBarHeight(1); // -> 45
~~~

Der zurückgegebene Wert kann auch der **bar_height**-Eigenschaft entsprechen, die am Task-Objekt gesetzt wurde:

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

Beachten Sie: Wenn die **bar_height**-Eigenschaft auf "full" gesetzt ist, berechnet die Methode die Höhe der Task-Bar in Pixel.

## Enddatum einer Aufgabe


Um das Enddatum einer Aufgabe zu erhalten, verwenden Sie die Methode [calculateEndDate](api/method/calculateenddate.md):

~~~js
gantt.calculateEndDate(new Date(2020,03,30),48,"hour"); //-> Thu May 07 2020 17:00:00
~~~

Wenn die Option [work_time](api/config/work_time.md) aktiviert ist, behandelt die Methode die Dauer als Arbeitszeit.

## Ausgewählte Aufgabe


Um die aktuell ausgewählte Aufgabe zu erhalten, verwenden Sie die Methode [getSelectedId](api/method/getselectedid.md): 

~~~js
gantt.selectTask("t_1"); 
gantt.getSelectedId();  //-> "t_1" - die Id der ausgewählten Aufgabe
~~~

## Aufgaben aus einem bestimmten Zeitraum


Um eine Liste von Aufgaben zu erhalten, die in einem bestimmten Zeitraum stattfinden, verwenden Sie die Methode [getTaskByTime](api/method/gettaskbytime.md):

~~~js
var tasks = gantt.getTaskByTime(new Date(2020,03,05),new Date(2020,03,15)); 
// tasks ist ein Array von Task-Objekten
~~~

## Alle Aufgaben im Gantt


Um alle im Gantt-Diagramm angezeigten Aufgaben abzurufen, rufen Sie die Methode [getTaskByTime](api/method/gettaskbytime.md) ohne Parameter auf:

~~~js
var tasks = gantt.getTaskByTime();  //gibt alle Aufgaben als Array von Objekten zurück
~~~

Alternativ kann die Methode [serialize](api/method/serialize.md) verwendet werden.

## Links einer bestimmten Aufgabe


Um Links zu einer bestimmten Aufgabe zu erhalten, verwenden Sie die Eigenschaften **$source** und **$target** des Task-Objekts. Diese Eigenschaften werden automatisch generiert und enthalten die Ids der zugehörigen Links:

- **$source** - Links, die von der Aufgabe ausgehen.
- **$target** - Links, die auf die Aufgabe zeigen.

~~~js
var taskObj = gantt.getTask("t1");

var sourceLinks = taskObj.$source;  //-> ["l1","l4"] - Ids ausgehender Links  /*!*/
var targetLinks = taskObj.$target;  //-> ["l5","l8"] - Ids eingehender Links  /*!*/
~~~

## Nächste bevorstehende Aufgabe


Um die nächste bevorstehende Aufgabe zu finden, verwenden Sie die Methode [getTaskByTime](api/method/gettaskbytime.md) wie folgt:

~~~js
var tasks = gantt.getTaskByTime(new Date(), new Date(9999,1,1));    
// tasks enthält alle bevorstehenden Aufgaben
tasks.sort(function(a,b){ return (a.start_date > b.start_date ? 1 : -1); });
// tasks[0] ist die nächste bevorstehende Aufgabe
~~~

## Task-Id


In der Regel ist die Id einer Aufgabe im "data"-Objekt des Datensatzes verfügbar:

~~~js
{
    tasks:[
        {id:1, text:"Task #1", start_date:"01-04-2020", duration:18, progress:0.4}, /*!*/
        {id:2, text:"Task #2", start_date:"02-04-2020", duration:8,  progress:0.6}  /*!*/
    ],
    links:[...]
}
~~~

Ist die Id der Aufgabe nicht aus dem Datensatz zugänglich, verwenden Sie die Methode [getTaskByTime](api/method/gettaskbytime.md) wie folgt:

~~~js
var tasks = gantt.getTaskByTime();   //gibt alle Aufgaben zurück
for(var i="0;i" < tasks.length; i++){  //durchläuft alle Aufgaben, um die benötigte zu finden
    if (tasks[i].text == "Task #3") 
        var taskId = tasks[i].id;
};
~~~

*Wenn der ungefähre Zeitpunkt der Aufgabe bekannt ist, ist es effizienter, den Zeitraum einzugrenzen, um die Suche zu beschleunigen:*

~~~js
var tasks = gantt.getTaskByTime(new Date(2020,05,01),new Date(2020,05,10)); 
for(var i="0;i" < tasks.length; i++){  
    if (tasks[i].text == "Task #3") 
        var taskId = tasks[i].id;
};
~~~

### Id einer Aufgabe ändern

Um die Id einer Aufgabe zu aktualisieren, verwenden Sie die Methode [changeTaskId](api/method/changetaskid.md):

~~~js
gantt.changeTaskId("t1", "t11");  //ändert die Task-Id von "t1" zu "t11" 
~~~

## Öffnen/Schließen von Aufgaben-Ästen


Der offene Zustand eines Aufgabenastes wird durch die Eigenschaft **task.$open** gesteuert, die nach dem Laden der Aufgaben in gantt verfügbar ist. Eine Änderung dieses Wertes wird nach dem nächsten Neuzeichnen von gantt übernommen:

~~~js
// alle Äste ausklappen
gantt.eachTask(function(task){
    task.$open = true;
});
gantt.render();

// alle Äste einklappen
gantt.eachTask(function(task){
    task.$open = false;
});
gantt.render();
~~~

Um einen einzelnen Task zu öffnen oder zu schließen, können die Methoden [open](api/method/open.md) und [close](api/method/close.md) verwendet werden. Diese Methoden aktualisieren den internen Zustand und lösen ein Neuzeichnen aus. Beim Ändern mehrerer Aufgaben ist das direkte Setzen von **task.$open** effizienter, da unnötige Neuzeichnungen vermieden werden.

## Kopieren/Einfügen von Aufgaben


Beispiele zum Kopieren und Einfügen von Aufgaben finden Sie im Abschnitt [How to copy and paste tasks](guides/how-to.md#howtocopyandpastetasks).


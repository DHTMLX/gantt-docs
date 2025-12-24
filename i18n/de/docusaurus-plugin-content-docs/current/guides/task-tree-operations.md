---
title: "Task Parent/Child"
sidebar_label: "Task Parent/Child"
---

# Task Parent/Child


Dieser Artikel behandelt Methoden, die mit der hierarchischen Struktur von Aufgaben im Gantt-Diagramm arbeiten.

*Für grundlegende Operationen wie das Abrufen des Aufgabenobjekts oder der ID siehe den Artikel [Task Object/Id](guides/task-object-operations.md).*

## Elternelement einer Aufgabe

Um das Elternelement einer Aufgabe zu finden, können Sie die Methode [getParent](api/method/getparent.md) verwenden oder auf die Eigenschaft "**parent**" des Aufgabenobjekts zugreifen:

~~~js
gantt.getParent("t1");//->"pr_2"
//oder
var taskObj = gantt.getTask("t1");//-> {id:"t1", text:"Task #5", parent:"pr_2", ...}
var taskParent = taskObj.parent;  //-> "pr_2"
~~~
Beachten Sie, dass die Methode, falls die Aufgabe kein Elternelement hat, die [root id](api/config/root_id.md) zurückgibt.

## Kinder einer Aufgabe

Um die Kinder einer übergeordneten Aufgabe abzurufen, verwenden Sie die Methode [getChildren](api/method/getchildren.md):

~~~js
var data = {
  tasks:[
     {id:"p_1", text:"Project #1", start_date:"01-04-2020", duration:18},
     {id:"t_1", text:"Task #1",    start_date:"02-04-2020", duration:8,
     parent:"p_1"}
]};
gantt.getChildren("p_1");//->["t_1"]
~~~

Wenn Sie alle Kinder einer Aufgabe (nicht nur die direkten) erhalten möchten, verwenden Sie die Methode [eachTask()](api/method/eachtask.md) mit der ID der übergeordneten Aufgabe als zweites Argument:

~~~js
const children = [];
// Alle Kinder einer Aufgabe durchlaufen
gantt.eachTask(function(child){
    children.push(child)
}, 11);
~~~

## Prüfen, ob eine Aufgabe Kinder hat

Um festzustellen, ob eine Aufgabe untergeordnete Aufgaben hat, verwenden Sie die Methode [hasChild](api/method/haschild.md):

~~~js
var data = {
  tasks:[
     {id:"p_1", text:"Project #1", start_date:"01-04-2020", duration:18, 
     open:true},
     {id:"t_1", text:"Task #1", start_date:"02-04-2020", duration:8,
     parent:"p_1"},
     {id:"t_2", text:"Task #2", start_date:"11-04-2020", duration:8,
     parent:"p_1"}
   ]
};
gantt.init("gantt_here");
gantt.parse(data);
 
gantt.hasChild("p_1"); //-> true  /*!*/
gantt.hasChild("t_1"); //-> false /*!*/
~~~

## Nächste Aufgabe im Baum

Um das Aufgabenobjekt zu erhalten, das nach einer bestimmten Aufgabe kommt, verwenden Sie die Methode [getNext](api/method/getnext.md):

~~~js
var data = {
  tasks:[
     {id:"p_1", text:"Project #1", start_date:"01-04-2020", duration:18, 
     open:true},
     {id:"t_1", text:"Task #1", start_date:"02-04-2020", duration:8,
     parent:"p_1"},
     {id:"t_2", text:"Task #2", start_date:"11-04-2020", duration:8,
     parent:"p_1"}
   ]
};
gantt.init("gantt_here");
gantt.parse(data);
 
gantt.getNext("p_1"); -> "t_1"   /*!*/
gantt.getNext("t_1"); -> "t_2"   /*!*/
gantt.getNext("t_2"); -> null    /*!*/
~~~

Beachten Sie, dass gantt Aufgaben unabhängig von ihrer Baumebene gleich behandelt.

## Vorherige Aufgabe im Baum

Um das Aufgabenobjekt zu erhalten, das vor einer bestimmten Aufgabe kommt, verwenden Sie die Methode [getPrev](api/method/getprev.md):

~~~js
var data = {
  tasks:[
     {id:"p_1", text:"Project #1", start_date:"01-04-2020", duration:18, 
     open:true},
     {id:"t_1", text:"Task #1", start_date:"02-04-2020", duration:8,
     parent:"p_1"},
     {id:"t_2", text:"Task #2", start_date:"11-04-2020", duration:8,
     parent:"p_1"}
   ]
};
gantt.init("gantt_here");
gantt.parse(data);
 
gantt.getPrev("p_1"); ->  null   /*!*/
gantt.getPrev("t_1"); -> "p_1"   /*!*/
gantt.getPrev("t_2"); -> "t_1"   /*!*/
~~~

Auch hier werden Aufgaben unabhängig von ihrer Baumebene betrachtet.

## Geschwister einer Aufgabe

Um die Geschwister einer bestimmten Aufgabe zu erhalten, verwenden Sie die Methode [getSiblings](api/method/getsiblings.md):

~~~js
var data = {
  tasks:[
     {id:"p_1", text:"Project #1", start_date:"01-04-2020", duration:18, 
     open:true},
     {id:"t_1", text:"Task #1", start_date:"02-04-2020", duration:8,
     parent:"p_1"},
     {id:"t_2", text:"Task #2", start_date:"11-04-2020", duration:8,
     parent:"p_1"}
   ]
};
gantt.init("gantt_here");
gantt.parse(data);
 
gantt.getSiblings("t_1"); ->  ["t_1", "t_2"] /*!*/
~~~


## Nächstes Geschwister einer Aufgabe

Um das nächste Geschwister einer Aufgabe zu finden, verwenden Sie die Methode [getNextSibling](api/method/getnextsibling.md):

~~~js
var data = {
  tasks:[
     {id:"p_1", text:"Project #1", start_date:"01-04-2020", duration:18, 
     open:true},
     {id:"t_1", text:"Task #1", start_date:"02-04-2020", duration:8,
     parent:"p_1"},
     {id:"t_2", text:"Task #2", start_date:"11-04-2020", duration:8,
     parent:"p_1"}
   ]
};
gantt.init("gantt_here");
gantt.parse(data);
 
gantt.getNextSibling("t_1"); ->  "t_2" /*!*/
gantt.getNextSibling("t_2"); ->  null (wenn kein nächstes Geschwister vorhanden ist) /*!*/
~~~


## Vorheriges Geschwister einer Aufgabe

Um das vorherige Geschwister einer Aufgabe zu erhalten, verwenden Sie die Methode [getPrevSibling](api/method/getprevsibling.md):

~~~js
var data = {
  tasks:[
     {id:"p_1", text:"Project #1", start_date:"01-04-2020", duration:18, 
     open:true},
     {id:"t_1", text:"Task #1", start_date:"02-04-2020", duration:8,
     parent:"p_1"},
     {id:"t_2", text:"Task #2", start_date:"11-04-2020", duration:8,
     parent:"p_1"}
   ]
};
gantt.init("gantt_here");
gantt.parse(data);
 
gantt.getPrevSibling("t_2"); ->  "t_1" /*!*/
gantt.getPrevSibling("t_1"); ->  null (wenn kein vorheriges Geschwister vorhanden ist) /*!*/
~~~


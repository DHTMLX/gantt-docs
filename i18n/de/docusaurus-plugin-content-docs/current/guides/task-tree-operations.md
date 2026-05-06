---
title: "Aufgabe: Elternteil/Kind"
sidebar_label: "Aufgabe: Elternteil/Kind"
---

# Aufgabe: Elternteil/Kind

In diesem Artikel finden Sie Methoden, die sich auf die baumartige Struktur der Gantt-Diagramm-Aufgaben beziehen.

*Um grundlegende Operationen zum Abrufen des Task-Objekts/der ID zu lernen, lesen Sie den Artikel [Task Object/Id](guides/task-object-operations.md).*

## Elternteil einer Aufgabe

Um das Elternelement einer Aufgabe zu erhalten, verwenden Sie die [getParent](api/method/getparent.md) Methode oder die **parent**-Eigenschaft des Aufgabenobjekts:

~~~js
gantt.getParent("t1");//->"pr_2"
//oder
var taskObj = gantt.getTask("t1");//-> {id:"t1", text:"Task #5", parent:"pr_2", ...}
var taskParent = taskObj.parent;  //-> "pr_2"
~~~
Hinweis: Falls es kein Elternelement für die angegebene Aufgabe gibt, gibt die Methode die [root id](api/config/root_id.md) zurück.


## Kinder einer Aufgabe

Um die Kinder einer Elternaufgabe zu erhalten, verwenden Sie die [getChildren](api/method/getchildren.md) Methode:

~~~js
var data = {
  tasks:[
     {id:"p_1", text:"Project #1", start_date:"01-04-2020", duration:18},
     {id:"t_1", text:"Task #1",    start_date:"02-04-2020", duration:8,
     parent:"p_1"}
]};
gantt.getChildren("p_1");//->["t_1"]
~~~

Um alle Kinder einer Aufgabe zu erhalten (nicht nur die Kinder der ersten Ebene), wenden Sie die [eachTask()](api/method/eachtask.md) Methode an und übergeben Sie die ID der Elterne-Aufgabe als zweites Argument:

~~~js
const children = [];
// durchläuft alle Kinder einer Aufgabe
gantt.eachTask(function(child){
    children.push(child)
}, 11);
~~~


## Prüfen, ob eine Aufgabe ein Kind hat

Um zu prüfen, ob eine Aufgabe ein Kind hat, verwenden Sie die [hasChild](api/method/haschild.md) Methode:

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


## Nächste Aufgabe in der Baumstruktur

Um das Objekt der Aufgabe zu erhalten, die neben der angegebenen liegt, verwenden Sie die [getNext](api/method/getnext.md) Methode:

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


Hinweis: Der Gantt berücksichtigt Aufgaben unabhängig von der Baumebene


## Vorherige Aufgabe in der Baumstruktur

Um das Objekt der Aufgabe neben der angegebenen zu erhalten, verwenden Sie die [getPrev](api/method/getprev.md) Methode:

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


Hinweis: Der Gantt berücksichtigt Aufgaben unabhängig von der Baumebene


## Geschwister einer Aufgabe

Um die Geschwister der angegebenen Aufgabe zu erhalten, verwenden Sie die [getSiblings](api/method/getsiblings.md) Methode:

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
 
gantt.getSiblings("t_1"); ->  ["t_1", "t_2] /*!*/
~~~


## Nächstes Geschwisterteil einer Aufgabe

Um das nächste Geschwisterteil einer angegebenen Aufgabe zu erhalten, verwenden Sie die [getNextSibling](api/method/getnextsibling.md) Methode:

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
gantt.getNextSibling("t_2"); ->  null (if no next sibling) /*!*/
~~~


## Vorheriges Geschwisterteil einer Aufgabe

Um das vorherige Geschwisterteil der angegebenen Aufgabe zu erhalten, verwenden Sie die [getPrevSibling](api/method/getprevsibling.md) Methode:

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
gantt.getPrevSibling("t_1"); ->  null (if no previous sibling) /*!*/
~~~
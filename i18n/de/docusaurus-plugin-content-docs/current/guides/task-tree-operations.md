---
title: "Aufgabe Elternteil/Kind"
sidebar_label: "Aufgabe Elternteil/Kind"
---

# Elternteil/Kind einer Aufgabe

In diesem Artikel finden Sie Methoden, die sich auf die Baumstruktur der Gantt-Diagramm-Aufgaben beziehen.

*Um sich über grundlegende Operationen zum Abrufen des Task-Objekts oder der ID zu informieren, lesen Sie den Artikel [Task Object/Id](guides/task-object-operations.md).*

## Elternteil einer Aufgabe

Um das Elternelement einer Aufgabe zu erhalten, verwenden Sie die Methode [`getParent()`](api/method/getparent.md) oder die `"parent"`-Eigenschaft des Task-Objekts:

~~~js
gantt.getParent("t1"); // -> "pr_2"
// oder
const task = gantt.getTask("t1"); // -> { id: "t1", text: "Task #5", parent: "pr_2", ... }
const parentId = task.parent; // -> "pr_2"
~~~

Wenn es kein Elternelement für die angegebene Aufgabe gibt, gibt die Methode die [Wurzel-ID](api/config/root_id.md) zurück.

## Kinder einer Aufgabe

Um die Kinder einer Verzweigungsaufgabe zu erhalten, verwenden Sie die [`getChildren()`](api/method/getchildren.md) Methode:

~~~js
const taskData = {
    tasks: [
        { id: "p_1", text: "Projekt #1", start_date: "2027-04-01", duration: 18 },
        { id: "t_1", text: "Aufgabe #1", start_date: "2027-04-02", duration: 8, parent: "p_1" }
    ]
};

gantt.getChildren("p_1"); // -> ["t_1"]
~~~

Um alle Kinder einer Aufgabe zu erhalten, nicht nur direkte Unteraufgaben der ersten Ebene, verwenden Sie die [`eachTask()`](api/method/eachtask.md) Methode und übergeben die ID der Elternaufgabe als zweiten Parameter:

~~~js
const childTasks = [];

// Alle Kinder einer Aufgabe iterieren.
gantt.eachTask((childTask) => {
    childTasks.push(childTask);
}, 11);
~~~

## Prüfen, ob eine Aufgabe ein Kind hat

Um zu prüfen, ob eine Aufgabe ein Kind hat, verwenden Sie die [`hasChild()`](api/method/haschild.md) Methode:

~~~js {11-12}
const taskData = {
    tasks: [
        { id: "p_1", text: "Projekt #1", start_date: "2027-04-01", duration: 18, open: true },
        { id: "t_1", text: "Aufgabe #1", start_date: "2027-04-02", duration: 8, parent: "p_1" }
    ]
};
gantt.init("gantt_here");
gantt.parse(taskData);

gantt.hasChild("p_1"); // -> true
gantt.hasChild("t_1"); // -> false
~~~

## Nächste Aufgabe im Baum

Um die ID der Aufgabe zu erhalten, die der angegebenen Folgeaufgabe folgt, verwenden Sie die [`getNext()`](api/method/getnext.md) Methode:

~~~js {11-13}
const taskData = {
    tasks: [
        { id: "p_1", text: "Projekt #1", start_date: "2027-04-01", duration: 18, open: true },
        { id: "t_1", text: "Aufgabe #1", start_date: "2027-04-02", duration: 8, parent: "p_1" },
        { id: "t_2", text: "Aufgabe #2", start_date: "2027-04-11", duration: 8, parent: "p_1" }
    ]
};
gantt.init("gantt_here");
gantt.parse(taskData);

gantt.getNext("p_1"); // -> "t_1"
gantt.getNext("t_1"); // -> "t_2"
gantt.getNext("t_2"); // -> null
~~~

Gantt berücksichtigt Aufgaben unabhängig von der Baumebene.

## Vorherige Aufgabe im Baum

Um die ID der Vorgängeraufgabe der angegebenen Aufgabe zu erhalten, verwenden Sie die [`getPrev()`](api/method/getprev.md) Methode:

~~~js {11-13}
const taskData = {
    tasks: [
        { id: "p_1", text: "Projekt #1", start_date: "2027-04-01", duration: 18, open: true },
        { id: "t_1", text: "Aufgabe #1", start_date: "2027-04-02", duration: 8, parent: "p_1" },
        { id: "t_2", text: "Aufgabe #2", start_date: "2027-04-11", duration: 8, parent: "p_1" }
    ]
};
gantt.init("gantt_here");
gantt.parse(taskData);

gantt.getPrev("p_1"); // -> null
gantt.getPrev("t_1"); // -> "p_1"
gantt.getPrev("t_2"); // -> "t_1"
~~~

Gantt berücksichtigt Aufgaben unabhängig von der Baumebene.

## Geschwister einer Aufgabe

Um die Geschwister der angegebenen Aufgabe zu erhalten, verwenden Sie die [`getSiblings()`](api/method/getsiblings.md) Methode:

~~~js {11}
const taskData = {
    tasks: [
        { id: "p_1", text: "Projekt #1", start_date: "2027-04-01", duration: 18, open: true },
        { id: "t_1", text: "Aufgabe #1", start_date: "2027-04-02", duration: 8, parent: "p_1" },
        { id: "t_2", text: "Aufgabe #2", start_date: "2027-04-11", duration: 8, parent: "p_1" }
    ]
};
gantt.init("gantt_here");
gantt.parse(taskData);

gantt.getSiblings("t_1"); // -> ["t_1", "t_2"]
~~~

## Nächstes Geschwisterteil einer Aufgabe

Um das nächste Geschwisterteil der angegebenen Aufgabe zu erhalten, verwenden Sie die [`getNextSibling()`](api/method/getnextsibling.md) Methode:

~~~js {11-12}
const taskData = {
    tasks: [
        { id: "p_1", text: "Projekt #1", start_date: "2027-04-01", duration: 18, open: true },
        { id: "t_1", text: "Aufgabe #1", start_date: "2027-04-02", duration: 8, parent: "p_1" },
        { id: "t_2", text: "Aufgabe #2", start_date: "2027-04-11", duration: 8, parent: "p_1" }
    ]
};
gantt.init("gantt_here");
gantt.parse(taskData);

gantt.getNextSibling("t_1"); // -> "t_2"
gantt.getNextSibling("t_2"); // -> null
~~~

## Vorheriges Geschwisterteil einer Aufgabe

Um das vorherige Geschwisterteil der angegebenen Aufgabe zu erhalten, verwenden Sie die [`getPrevSibling()`](api/method/getprevsibling.md) Methode:

~~~js {11-12}
const taskData = {
    tasks: [
        { id: "p_1", text: "Projekt #1", start_date: "2027-04-01", duration: 18, open: true },
        { id: "t_1", text: "Aufgabe #1", start_date: "2027-04-02", duration: 8, parent: "p_1" },
        { id: "t_2", text: "Aufgabe #2", start_date: "2027-04-11", duration: 8, parent: "p_1" }
    ]
};
gantt.init("gantt_here");
gantt.parse(taskData);

gantt.getPrevSibling("t_2"); // -> "t_1"
gantt.getPrevSibling("t_1"); // -> null
~~~
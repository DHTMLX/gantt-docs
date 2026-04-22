---
title: "Inhalte von Aufgaben anzeigen"
sidebar_label: "Inhalte von Aufgaben anzeigen"
---

# Inhalte von Aufgaben anzeigen

Ein Text in der Nähe des Aufgabenbalkens ermöglicht es, zusätzliche Informationen zur Aufgabe anzuzeigen. In den meisten Fällen handelt es sich um eine zugewiesene Ressource – Personen, Materialien usw. 

![assigned_text](/img/assigned_text.png)

## Anpassung des Formats der Aufgabenbalken

Um das Standardformat der Aufgabenbalken zu ändern, können Sie die [task_text](api/template/task_text.md)-Vorlage verwenden:

~~~js
gantt.templates.task_text="function(start,end,task){"
    return "<b>Text:</b> "+task.text+",<b> Holders:</b> "+task.users;
};
~~~

Es kann jeden HTML-Inhalt enthalten, der innerhalb des Aufgabenbalkens angezeigt werden soll.


[Styling der Aufgabenbalken mit Ereignissen](https://docs.dhtmlx.com/gantt/samples/04_customization/08_templates.html)


![task_text](/img/task_text.png)

## Text links vom Balken zuweisen

Um einen Texblock auf der linken Seite eines Aufgabenbalkens zu platzieren, verwenden Sie die [leftside_text](api/template/leftside_text.md) Vorlage:

~~~js
gantt.templates.leftside_text = function(start, end, task){
    return "<b>Priority: </b>" +task.priority;
};
~~~

[Seiteninhalt definieren](https://docs.dhtmlx.com/gantt/samples/04_customization/01_outer_content.html)


## Text rechts vom Balken zuweisen

Um einen Texblock rechts neben dem Aufgabenbalken zu platzieren, verwenden Sie die [rightside_text](api/template/rightside_text.md) Vorlage:

~~~js
gantt.templates.rightside_text = function(start, end, task){
    return "<b>Holders: </b>" + task.users;
};
~~~

[Seiteninhalt definieren](https://docs.dhtmlx.com/gantt/samples/04_customization/01_outer_content.html)
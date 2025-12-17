---
title: "Anzeigen von Aufgabeninhalten"
sidebar_label: "Anzeigen von Aufgabeninhalten"
---

Anzeigen von Aufgabeninhalten
====================================
Ein Label neben einer Aufgabenleiste kann verwendet werden, um zusätzliche Details zur Aufgabe anzuzeigen. 
In der Regel beinhaltet dies Informationen wie zugewiesene Ressourcen, zum Beispiel Personen, Materialien usw.

![assigned_text](/img/assigned_text.png)

Anpassen des Formats von Aufgabenleisten
-------------------------------------------------
Um das Standardaussehen der Aufgabenleisten zu ändern, können Sie die Vorlage [task_text](api/template/task_text.md) verwenden:

~~~js
gantt.templates.task_text="function(start,end,task){"
    return "<b>Text:</b> "+task.text+",<b> Holders:</b> "+task.users;
};
~~~

Diese Vorlage kann beliebigen HTML-Inhalt enthalten, den Sie innerhalb der Aufgabenleiste anzeigen möchten.


[Styling task bars with events](https://docs.dhtmlx.com/gantt/samples/04_customization/08_templates.html)


![task_text](/img/task_text.png)

Text auf der linken Seite einer Leiste zuweisen
-------------------------------------------------
Um einen Textblock auf der linken Seite einer Aufgabenleiste hinzuzufügen, verwenden Sie die Vorlage [leftside_text](api/template/leftside_text.md):

~~~js
gantt.templates.leftside_text = function(start, end, task){
    return "<b>Priority: </b>" +task.priority;
};
~~~

[Define side content](https://docs.dhtmlx.com/gantt/samples/04_customization/01_outer_content.html)


Text auf der rechten Seite einer Leiste zuweisen
-------------------------------------------------
Um einen Textblock auf der rechten Seite einer Aufgabenleiste hinzuzufügen, verwenden Sie die Vorlage [rightside_text](api/template/rightside_text.md):

~~~js
gantt.templates.rightside_text = function(start, end, task){
    return "<b>Holders: </b>" + task.users;
};
~~~


[Define side content](https://docs.dhtmlx.com/gantt/samples/04_customization/01_outer_content.html)


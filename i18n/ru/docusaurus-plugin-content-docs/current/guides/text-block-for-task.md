---
title: "Отображение содержимого задач"
sidebar_label: "Отображение содержимого задач"
---

Отображение содержимого задач
====================================
Рядом с полосой задачи может отображаться метка, содержащая дополнительные сведения о задаче. Обычно здесь указывается информация, такая как назначенные ресурсы: люди, материалы и так далее.

![assigned_text](/img/assigned_text.png)

Настройка формата полос задач
-------------------------------------------------
Для изменения стандартного вида полос задач вы можете использовать шаблон [task_text](api/template/task_text.md):

~~~js
gantt.templates.task_text="function(start,end,task){"
    return "<b>Text:</b> "+task.text+",<b> Holders:</b> "+task.users;
};
~~~

В этот шаблон можно добавить любой HTML-контент, который вы хотите отобразить внутри полосы задачи.


[Styling task bars with events](https://docs.dhtmlx.com/gantt/samples/04_customization/08_templates.html)


![task_text](/img/task_text.png)

Назначение текста слева от полосы
-------------------------------------------------
Чтобы добавить текстовый блок слева от полосы задачи, используйте шаблон [leftside_text](api/template/leftside_text.md):

~~~js
gantt.templates.leftside_text = function(start, end, task){
    return "<b>Priority: </b>" +task.priority;
};
~~~

[Define side content](https://docs.dhtmlx.com/gantt/samples/04_customization/01_outer_content.html)


Назначение текста справа от полосы
-------------------------------------------------
Чтобы добавить текстовый блок справа от полосы задачи, используйте шаблон [rightside_text](api/template/rightside_text.md):

~~~js
gantt.templates.rightside_text = function(start, end, task){
    return "<b>Holders: </b>" + task.users;
};
~~~


[Define side content](https://docs.dhtmlx.com/gantt/samples/04_customization/01_outer_content.html)


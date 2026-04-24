---
title: "Отображение содержимого задач"
sidebar_label: "Отображение содержимого задач"
---

# Отображение содержания задач

Текст, расположенный рядом с полосой задачи, позволяет отобразить дополнительную информацию, связанную с задачей.
В большинстве случаев это назначенный ресурс — люди, материалы и т. п.

![assigned_text](/img/assigned_text.png)

## Настройка формата полос задач

Чтобы изменить формат по умолчанию полос задач, можно использовать шаблон [task_text](api/template/task_text.md):

~~~js
gantt.templates.task_text="function(start,end,task){"
    return "<b>Text:</b> "+task.text+",<b> Holders:</b> "+task.users;
};
~~~

Он может содержать любой HTML‑контент, который должен отображаться внутри полосы задачи.


[Стилизация полос задач через события](https://docs.dhtmlx.com/gantt/samples/04_customization/08_templates.html)


![task_text](/img/task_text.png)

## Размещение текста слева от полосы задачи

Чтобы разместить текстовый блок слева от полосы задачи, используйте шаблон [leftside_text](api/template/leftside_text.md):

~~~js
gantt.templates.leftside_text = function(start, end, task){
    return "<b>Priority: </b>" +task.priority;
};
~~~

[Определение бокового содержимого](https://docs.dhtmlx.com/gantt/samples/04_customization/01_outer_content.html)


## Размещение текста справа от полосы задачи

Чтобы разместить текстовый блок справа от полосы задачи, используйте шаблон [rightside_text](api/template/rightside_text.md):

~~~js
gantt.templates.rightside_text = function(start, end, task){
    return "<b>Holders: </b>" + task.users;
};
~~~


[Определение бокового содержимого](https://docs.dhtmlx.com/gantt/samples/04_customization/01_outer_content.html)
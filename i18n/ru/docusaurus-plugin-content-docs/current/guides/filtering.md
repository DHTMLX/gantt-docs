---
title: "Фильтрация задач" 
sidebar_label: "Фильтрация задач" 
---

# Фильтрация задач

Фильтрация позволяет управлять количеством и характером задач, отображаемых на диаграмме Gantt. Например, вы можете использовать фильтрацию, чтобы отобразить задачи, назначенные конкретному сотруднику, или задачи с срочным приоритетом.

Примечание: dhtmlxGantt поддерживает фильтрацию на стороне клиента.

![filtering](/img/filtering.png)

Чтобы отфильтровать данные, используйте событие [onBeforeTaskDisplay](api/event/onbeforetaskdisplay.md) и возвращайте:

- *true*, для задачи, которую вы хотите отобразить
- *false*, для задачи, которую не следует отображать

**Отображение только задач с высоким приоритетом**
~~~js
gantt.attachEvent("onBeforeTaskDisplay", function(id, task){
    if (task.priority == "high"){
        return true;
    }
    return false;
});
~~~

[Базовая фильтрация](https://docs.dhtmlx.com/gantt/samples/07_grid/03_filtering.html)

Чтобы отфильтровать данные разделённой задачи, примените событие [onBeforeSplitTaskDisplay](api/event/onbeforesplittaskdisplay.md).

Вы можете взглянуть на видеогид, который показывает, как реализовать фильтрацию задач.

<iframe width="676" height="400" src="https://www.youtube.com/embed/LyJ3zKSrmH4" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
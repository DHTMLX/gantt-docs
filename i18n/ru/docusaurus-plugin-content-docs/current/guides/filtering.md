---
title: "Фильтрация задач"
sidebar_label: "Фильтрация задач"
---

Фильтрация задач
============================

Фильтрация позволяет управлять тем, какие задачи отображаются в диаграмме Gantt, ограничивая их количество и тип. Например, с помощью фильтрации можно показать только задачи, назначенные определённому сотруднику, или задачи, помеченные как срочные.

Имейте в виду, что dhtmlxGantt поддерживает фильтрацию на стороне клиента.

![filtering](/img/filtering.png)

Для применения фильтрации используйте событие @[onBeforeTaskDisplay](api/event/onbeforetaskdisplay.md) и возвращайте:

- *true* - чтобы показать задачу
- *false* - чтобы скрыть задачу

**Отображение только задач с высоким приоритетом**
~~~js
gantt.attachEvent("onBeforeTaskDisplay", function(id, task){
    if (task.priority == "high"){
        return true;
    }
    return false;
});
~~~


[Basic filtering](https://docs.dhtmlx.com/gantt/samples/07_grid/03_filtering.html)


Для фильтрации частей составной задачи используйте событие @[onBeforeSplitTaskDisplay](api/event/onbeforesplittaskdisplay.md).

Также доступна видеоинструкция, демонстрирующая настройку фильтрации задач.

<iframe width="676" height="400" src="https://www.youtube.com/embed/LyJ3zKSrmH4" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


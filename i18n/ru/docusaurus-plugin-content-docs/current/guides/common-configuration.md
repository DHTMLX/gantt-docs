---
title: "Конфигурация"
sidebar_label: "Конфигурация"
---

Конфигурация
================================================

Для настройки внешнего вида диаграммы Gantt, dhtmlxGantt предоставляет два основных объекта:

- [gantt.config](api/overview/properties-overview.md) - содержит параметры конфигурации, связанные с датами, шкалами, элементами управления и другими аспектами.
- [gantt.templates](api/overview/templates-overview.md) - включает шаблоны форматирования для дат и подписей, отображаемых в диаграмме Gantt.

## Объект 'gantt.config' {#ganttconfigobject}

Все параметры конфигурации указываются внутри объекта **gantt.config**.

Чтобы применить опцию, просто присвойте её, как описано в данной документации.

Обратите внимание, что параметры конфигурации должны быть заданы до строки инициализации dhtmlxGantt.

~~~js
gantt.scales = [
    { unit: "year", step: 1, format: "%Y" }
];

gantt.init("gantt_here");
~~~

Полный список свойств, доступных в **gantt.config**, смотрите в разделе ["Gantt API:Properties"](api/overview/properties-overview.md).


[Month view](https://docs.dhtmlx.com/gantt/samples/03_scales/02_month_days.html)


Объект 'gantt.templates'
-------------------------------------

Шаблоны позволяют настраивать отображение дат и подписей.

Определите шаблон, присвоив его, как показано в документации. Не забудьте объявить шаблоны до инициализации dhtmlxGantt.

~~~js
gantt.templates.task_text = function(start, end, task){
    return "<b>Text:</b> " + task.text + ",<b> Holders:</b> " + task.users;
};
gantt.init("gantt_here");
~~~

![gantt_templates](/img/gantt_templates.png)

Полный список доступных шаблонов представлен в разделе [Gantt API:Templates](api/overview/templates-overview.md).


[Styling task bars with events](https://docs.dhtmlx.com/gantt/samples/04_customization/08_templates.html)

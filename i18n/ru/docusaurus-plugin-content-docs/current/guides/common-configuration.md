---
title: "Конфигурация"
sidebar_label: "Конфигурация"
---

# Конфигурация

Чтобы добиться нужного внешнего вида диаграммы Gantt, dhtmlxGantt предоставляет 2 объекта: 

- [gantt.config] - конфигурационные параметры для дат, шкалы, элементов управления и т.д.
- [gantt.templates] - форматы оформления дат и меток, используемых в диаграмме Gantt.

## 'gantt.config' object {#ganttconfigobject}

Все параметры конфигурации объявлены в объекте **gantt.config**. 

Чтобы задать нужную опцию, просто запишите ее так, как она указана в этой документации.
  
Имейте в виду, параметры конфигурации должны располагаться перед строкой кода инициализации dhtmlxGantt.


~~~js
gantt.scales = [
    { unit: "year", step: 1, format: "%Y" }
];

gantt.init("gantt_here");
~~~

Смотрите полный список свойств **gantt.config** в разделе ["Gantt API:Properties"](api/overview/properties-overview.md).


**Связанный пример**: [Просмотр по месяцам](https://docs.dhtmlx.com/gantt/samples/03_scales/02_month_days.html)


## 'gantt.templates' object {#gantttemplatesobject}

Шаблоны можно использовать для изменения отображения дат и меток.

Чтобы определить шаблон, просто запишите его так, как он указан в этой документации. Помните, определения шаблонов должны располагаться перед строкой кода инициализации dhtmlxGantt.


~~~js
gantt.templates.task_text =
    (start, end, task) => `<b>Text:</b> ${task.text},<b> Holders:</b> ${task.users}`;

gantt.init("gantt_here");
~~~


![gantt_templates](/img/gantt_templates.png)

Смотрите полный список доступных шаблонов в разделе [Gantt API:Templates](api/overview/templates-overview.md)


**Связанный пример**: [Стилизация полос задач с помощью событий](https://docs.dhtmlx.com/gantt/samples/04_customization/08_templates.html)
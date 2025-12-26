---
title: "Интеграция с JQuery"
sidebar_label: "Интеграция с JQuery"
---

# Интеграция с JQuery

При работе с библиотекой JQuery диаграмма Gantt может быть добавлена на страницу с помощью привычного синтаксиса.

Вот как выглядит базовая инициализация диаграммы Gantt с использованием JQuery:

**Диаграмма Gantt, инициализированная с помощью JQuery**
~~~js
$(".mygantt").dhx_gantt({
    data:demo_tasks,
    scales:[
        { unit:"year",step:1,format:"%Y"}
    ]
});
$("#gantt1").dhx_gantt().parse(tasksA);
~~~

~~~html
<div class="mygantt" id='gantt1' style='width:100%; height:30%;'></div>
~~~


[jQuery integration](https://docs.dhtmlx.com/gantt/samples/01_initialization/07_jquery.html)


Подробности:

- **".mygantt"** - CSS-селектор, совместимый с jQuery, который определяет контейнер, в котором будет отображаться диаграмма Gantt
- Метод **dhx_gantt()** создает экземпляр dhtmlxGantt. В качестве параметра принимает объект конфигурации:
  - **data** - (*object*) набор данных, который будет загружен в диаграмму Gantt
  - **[scales](api/config/scales.md)** - (*array*) список настроек, определяющих временную шкалу

:::note
Диаграмма Gantt, инициализированная через jQuery, использует те же параметры конфигурации и API, что и созданная напрямую на JavaScript.
:::


[jQuery integration](https://docs.dhtmlx.com/gantt/samples/01_initialization/07_jquery.html)


---
title: "Интеграция с JQuery"
sidebar_label: "Интеграция с JQuery"
---

# Интеграция с JQuery

Если вы используете библиотеку JQuery, вы можете отобразить диаграмму Gantt на странице, используя обычный синтаксис.

Стандартную диаграмму Gantt с помощью JQuery можно инициализировать следующим образом:

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

[интеграция с jQuery](https://docs.dhtmlx.com/gantt/samples/01_initialization/07_jquery.html)


где:

- **".mygantt"** - совместимый с jQuery CSS-селектор контейнера, в котором будет создана диаграмма Gantt
- **dhx_gantt()** - метод инициализирует dhtmlxGantt. В качестве параметра метод принимает объект конфигурации:
  - **data** - (*object*) набор данных, который будет загружен в диаграмму Gantt
  - **[scales](api/config/scales.md)** - (*array*) массив конфигурационных настроек временного масштаба
  
:::note
Диаграмма Gantt, инициализированная через вызов jQuery, использует ту же конфигурацию и API, что и стандартная диаграмма Gantt, инициализированная через JavaScript.
:::

[интеграция с jQuery](https://docs.dhtmlx.com/gantt/samples/01_initialization/07_jquery.html)
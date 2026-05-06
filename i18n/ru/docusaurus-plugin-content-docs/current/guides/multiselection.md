---
title: "Множественный выбор задач"
sidebar_label: "Множественный выбор задач"
---

# Множественный выбор задач 

Начиная с версии 3.2, библиотека предоставляет расширение **multiselect**, которое позволяет выбрать несколько задач одновременно.

<div style="text-align:center;">![multiselection](/img/multiselection.png)</div>


## Активация множественного выбора задач

Чтобы активировать множественный выбор задач для задач, включите его с помощью метода [gantt.plugins](api/method/plugins.md):

~~~js
<!DOCTYPE html>
<html>
<head>
   <script src="codebase/dhtmlxgantt.js"></script>   
   <link href="codebase/dhtmlxgantt.css" rel="stylesheet">   
</head>
<body>
    gantt.plugins({ /*!*/
        multiselect: true /*!*/
    }); /*!*/
    //your code will be here
</body>
</html>
~~~

[Множественный выбор и увеличение/уменьшение отступа задач](https://docs.dhtmlx.com/gantt/samples/02_extensions/09_multiselection.html)


После активации расширения множественный выбор задач будет автоматически включен.


Чтобы отключить расширение, используйте опцию [multiselect](api/config/multiselect.md):

**Отключение множественного выбора задач**
~~~js
gantt.config.multiselect = false; 
~~~


## Одноразовое обновление для нескольких задач

Чтобы обновлять сразу несколько задач/ссылок, используйте метод [batchUpdate](api/method/batchupdate.md):

~~~js
gantt.batchUpdate(function () {
    var tasks = gantt.getTaskByTime();
    for(var i = 0; i < tasks.length; i++){
        var task = tasks[i];
        task.start_date = gantt.date.add(task.start_date, 1, "day");
        task.end_date = gantt.calculateEndDate(task.start_date, task.duration);
        gantt.updateTask(task.id);
    }
});
~~~
Метод позволяет обновлять сразу несколько задач/ссылок одним повторным рендерингом, вместо выполнения множества обновлений с несколькими рендерингами.


[Множественный выбор и увеличение/уменьшение отступа задач](https://docs.dhtmlx.com/gantt/samples/02_extensions/09_multiselection.html)


## Итератор

Чтобы пройтись по всем выбранным задачам на диаграмме Gantt, используйте метод [eachSelectedTask](api/method/eachselectedtask.md):

~~~js
gantt.batchUpdate(function () {
    gantt.eachSelectedTask(function(task_id){
        if (gantt.isTaskExists(task_id))
            gantt.deleteTask(task_id);
    });
});
~~~


[Множественный выбор и увеличение/уменьшение отступа задач](https://docs.dhtmlx.com/gantt/samples/02_extensions/09_multiselection.html)


## Одновременное увеличение/уменьшение отступа

Множественный выбор задач позволяет применять различные операции к нескольким задачам одновременно. Например, можно выполнить увеличение/уменьшение отступа, тем самым преобразуя задачи в подзадачи и наоборот.


[Множественный выбор и увеличение/уменьшение отступа задач](https://docs.dhtmlx.com/gantt/samples/02_extensions/09_multiselection.html)


## Проверка, выбрана ли задача

Чтобы проверить, выбрана ли задача в данный момент, используйте метод [isSelectedTask](api/method/isselectedtask.md):

~~~js
gantt.templates.task_class = 
gantt.templates.grid_row_class = 
gantt.templates.task_row_class = function (start, end, task) {
    if (gantt.isSelectedTask(task.id))
        return "gantt_selected";
};
~~~

[Множественный выбор и увеличение/уменьшение отступа задач](https://docs.dhtmlx.com/gantt/samples/02_extensions/09_multiselection.html)


Чтобы переключаться между выбранным и невыбранным состояниями, используйте метод [toggleTaskSelection](api/method/toggletaskselection.md):

~~~js
gantt.toggleTaskSelection("t_1"); //"t_1" is the task's id
gantt.render();
~~~

## Получение всех выбранных задач

Чтобы получить все задачи, которые в данный момент выбраны, используйте метод [getSelectedTasks](api/method/getselectedtasks.md):

~~~js
gantt.getSelectedTasks();
~~~

Чтобы получить последнюю выбранную задачу, используйте метод [getLastSelectedTask](api/method/getlastselectedtask.md):

~~~js
gantt.getLastSelectedTask();
~~~

## Ограничение множественного выбора внутри одного уровня

Чтобы запретить выбор задач с разных уровней, используйте опцию [multiselect_one_level](api/config/multiselect_one_level.md):

~~~js
gantt.config.multiselect_one_level = true; 
gantt.init('gantt_here');
~~~

## Множественный выбор и перетаскивание {#multitaskselectionanddragndrop}

Когда активировано расширение **multiselect.js**, можно выбрать несколько задач, удерживая клавишу Ctrl или Shift и перетаскивая выбранные задачи горизонтально сразу.

Чтобы отключить эту функциональность, установите метод [drag_multiple](api/config/drag_multiple.md) в *false*:

~~~js
gantt.config.drag_multiple = true; 
~~~


[Множественный выбор и увеличение/уменьшение отступа задач](https://docs.dhtmlx.com/gantt/samples/02_extensions/09_multiselection.html)


## Открытие редактора одним кликом

В режиме одиночного выбора Gantt открывает встроенный inline-редактор после клика по задаче. 

В режиме **множественного выбора** после клика по невыбранной задаче Gantt выберет её и откроет [inline editor](guides/inline-editing.md) только после второго клика. 
Если вы хотите, чтобы Gantt открывал inline-editor после первого клика, включите конфигурацию [inline_editors_multiselect_open](api/config/inline_editors_multiselect_open.md).

~~~js
gantt.plugins({
  multiselect: true
});

...

gantt.config.inline_editors_multiselect_open = true;
~~~

## События API {#apievents}

Когда включен множественный выбор задач, выбор задачи или диапазона задач будет вызывать как общие события [onTaskSelected] / [onTaskUnselected], так и события, специфичные для расширения multiselect.

У множественного выбора задач есть следующий поток событий:

- [onBeforeMultiSelect] - срабатывает до выбора задачи или диапазона задач, блокируемое
- [onBeforeTaskMultiSelect] - срабатывает до изменения состояния выбора задачи (задача будет выбрана или снята с выбора), блокируемое
- [onTaskMultiSelect] - срабатывает после изменения состояния выбора задачи (задача выбрана/снята с выбора)
- [onTaskUnselected] - вызывается для каждой задачи диапазона множественного выбора
- [onTaskSelected] - вызывается для каждой задачи диапазона множественного выбора
- [onMultiSelect] - срабатывает после завершения выбора задачи или диапазона задач
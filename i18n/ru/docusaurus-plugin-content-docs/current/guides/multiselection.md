---
title: "Множественный выбор задач"
sidebar_label: "Множественный выбор задач"
---

# Множественный выбор задач


Начиная с версии 3.2, библиотека включает расширение **multiselect**, которое позволяет выбирать несколько задач одновременно.

<div style="text-align:center;">![multiselection](/img/multiselection.png)</div>

## Активация множественного выбора задач

Чтобы включить множественный выбор задач, активируйте его с помощью метода [gantt.plugins](api/method/plugins.md):

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
    //ваш код будет здесь
</body>
</html>
~~~

[Multiselection and Indent/Outdent tasks](https://docs.dhtmlx.com/gantt/samples/02_extensions/09_multiselection.html)


После включения множественный выбор задач становится активным автоматически.


Чтобы отключить расширение, используйте опцию [multiselect](api/config/multiselect.md):
**Disabling multi-task selection**
~~~js
gantt.config.multiselect = false; 
~~~

## Одновременное обновление нескольких задач

Чтобы изменить несколько задач или связей одновременно, используйте метод [batchUpdate](api/method/batchupdate.md):

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
Этот метод позволяет обновлять сразу несколько задач или связей за одно повторное отображение, вместо нескольких обновлений и рендеров.


[Multiselection and Indent/Outdent tasks](https://docs.dhtmlx.com/gantt/samples/02_extensions/09_multiselection.html)


## Итератор

Чтобы перебрать все выбранные задачи в Gantt, используйте метод [eachSelectedTask](api/method/eachselectedtask.md):

~~~js
gantt.batchUpdate(function () {
    gantt.eachSelectedTask(function(task_id){
        if(gantt.isTaskExists(task_id))
            gantt.deleteTask(task_id);
    });
});
~~~


[Multiselection and Indent/Outdent tasks](https://docs.dhtmlx.com/gantt/samples/02_extensions/09_multiselection.html)


## Одновременное увеличение/уменьшение отступа

С помощью множественного выбора можно применять операции сразу к нескольким задачам. Например, вы можете сдвигать задачи вправо или влево, превращая их в подзадачи или возвращая обратно на основной уровень.


[Multiselection and Indent/Outdent tasks](https://docs.dhtmlx.com/gantt/samples/02_extensions/09_multiselection.html)


## Проверка, выбрана ли задача

Чтобы узнать, выбрана ли задача в данный момент, используйте метод [isSelectedTask](api/method/isselectedtask.md):

~~~js
gantt.templates.task_class = 
gantt.templates.grid_row_class = 
gantt.templates.task_row_class = function (start, end, task) {
    if (gantt.isSelectedTask(task.id))
        return "gantt_selected";
};
~~~

[Multiselection and Indent/Outdent tasks](https://docs.dhtmlx.com/gantt/samples/02_extensions/09_multiselection.html)


Чтобы переключить задачу между выбранным и невыбранным состоянием, используйте метод [toggleTaskSelection](api/method/toggletaskselection.md):

~~~js
gantt.toggleTaskSelection("t_1"); //"t_1" - идентификатор задачи
gantt.render();
~~~

## Получение всех выбранных задач

Чтобы получить все выбранные в данный момент задачи, используйте метод [getSelectedTasks](api/method/getselectedtasks.md):

~~~js
gantt.getSelectedTasks();
~~~

Чтобы получить последнюю выбранную задачу, используйте метод [getLastSelectedTask](api/method/getlastselectedtask.md):

~~~js
gantt.getLastSelectedTask();
~~~

## Ограничение выбора задач одним уровнем

Если вы хотите ограничить выбор задачами только на одном уровне, используйте опцию [multiselect_one_level](api/config/multiselect_one_level.md):

~~~js
gantt.config.multiselect_one_level = true; 
gantt.init('gantt_here');
~~~

## Множественный выбор задач и drag-n-drop {#multitaskselectionanddragndrop}

С включённым расширением **multiselect.js** при удерживании Ctrl или Shift можно выбрать несколько задач и перетаскивать их горизонтально вместе.

Чтобы отключить эту возможность, установите опцию [drag_multiple](api/config/drag_multiple.md) в *false*:

~~~js
gantt.config.drag_multiple = true; 
~~~


[Multiselection and Indent/Outdent tasks](https://docs.dhtmlx.com/gantt/samples/02_extensions/09_multiselection.html)


## Открытие редактора в один клик


В режиме одиночного выбора клик по задаче сразу открывает встроенный редактор.

В режиме **множественного выбора** клик по невыбранной задаче выделяет её, а редактор откроется только после второго клика. 
Чтобы редактор открывался при первом клике даже в режиме множественного выбора, включите настройку [inline_editors_multiselect_open](api/config/inline_editors_multiselect_open.md).

~~~js
gantt.plugins({
  multiselect: true
});

...

gantt.config.inline_editors_multiselect_open = true;
~~~

## События API


Когда активен множественный выбор задач, выделение одной или нескольких задач вызывает как общие события [onTaskSelected](api/event/ontaskselected.md) / [onTaskUnselected](api/event/ontaskunselected.md), так и события, специфичные для расширения multiselect.

Множественный выбор задач вызывает следующий поток событий:

- [onBeforeMultiSelect](api/event/onbeforemultiselect.md) - срабатывает перед выбором задачи или диапазона задач; событие можно заблокировать
- [onBeforeTaskMultiSelect](api/event/onbeforetaskmultiselect.md) - срабатывает перед изменением состояния выбора отдельной задачи (выделение или снятие выделения); событие можно заблокировать
- [onTaskMultiSelect](api/event/ontaskmultiselect.md) - срабатывает после изменения состояния выбора задачи
- [onTaskUnselected](api/event/ontaskunselected.md) - вызывается для каждой задачи, с которой снято выделение в диапазоне
- [onTaskSelected](api/event/ontaskselected.md) - вызывается для каждой задачи, которая была выбрана в диапазоне
- [onMultiSelect](api/event/onmultiselect.md) - срабатывает после завершения выбора задачи или диапазона задач


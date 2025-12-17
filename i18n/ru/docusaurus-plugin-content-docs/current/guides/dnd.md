---
title: "Перетаскивание задач на временной шкале"
sidebar_label: "Перетаскивание задач на временной шкале"
---

Перетаскивание задач на временной шкале
=============================================

Перетаскивание облегчает изменение дат начала и окончания задач, а также их длительности. 


По умолчанию функция drag-and-drop включена, что позволяет пользователям перемещать задачи по своим строкам на временной шкале.

Для настройки поведения drag-and-drop можно использовать следующие события:

- [onBeforeTaskDrag](api/event/onbeforetaskdrag.md) - для блокировки перетаскивания отдельных задач
- [onTaskDrag](api/event/ontaskdrag.md) - для ограничения области перетаскивания или применения пользовательской логики во время перетаскивания задачи
- [onAfterTaskDrag](api/event/onaftertaskdrag.md) - для обработки задач после их перемещения

Вот несколько распространённых сценариев, когда настройка поведения перетаскивания может быть полезна:


1. [Блокировка перетаскивания для определённых задач](#denyingdraggingofspecifictasks).
2. [Запрет перетаскивания задач за пределы определённых дат](#denyingdraggingtasksoutofspecificdates).
3. [Перетаскивание дочерних задач вместе с родительской](#draggingchildrentogetherwiththeparent).
4. [Перетаскивание проектов вместе с подзадачами](#draggingprojectswithsubtasks).
5. [Установка минимальной длительности задачи](#settingminimaltaskduration).
6. [Включение автопрокрутки при перетаскивании задач](#autoscrollduringtasksdragging).


## Блокировка перетаскивания для определённых задач {#denyingdraggingofspecifictasks}
-------------------------------------------------------

Чтобы отключить перетаскивание для некоторых задач, используйте событие [onBeforeTaskDrag](api/event/onbeforetaskdrag.md):

~~~js
gantt.attachEvent("onBeforeTaskDrag", function(id, mode, e){
    if(gantt.getGlobalTaskIndex(id)%2==0){
        return false;      // блокирует перетаскивание, если глобальный индекс задачи нечётный
    }
    return true;           // разрешает перетаскивание, если глобальный индекс задачи чётный
});
~~~


## Запрет перетаскивания задач за пределы определённых дат {#denyingdraggingtasksoutofspecificdates}
-------------------------------------------------------
Чтобы ограничить возможность перетаскивания задач за пределы определённых дат, используйте событие [onTaskDrag](api/event/ontaskdrag.md).

<p> Событие onTaskDrag: </p>

<ul>
  <li>Вызывается каждый раз, когда пользователь перемещает мышь при перетаскивании, изменении размера или обновлении прогресса задачи на временной шкале.</li>
  <li>Тип действия перетаскивания передаётся вторым аргументом - <b>mode</b>.</li> 
  <li>Все возможные режимы перетаскивания перечислены в свойстве [drag_mode](api/config/drag_mode.md).</li>
</ul>

<p>Вкратце, процесс выглядит так:</p>

<ol>
  <li>Пользователь перетаскивает задачу.</li>
  <li>dhtmlxGantt пересчитывает дату задачи на основе нового положения.</li>
  <li>dhtmlxGantt вызывает событие [onTaskDrag](api/event/ontaskdrag.md).</li>
  <li>dhtmlxGantt перерисовывает задачу на диаграмме. <i>Поскольку событие [onTaskDrag](api/event/ontaskdrag.md) вызывается после пересчёта, вы можете безопасно задать пользовательские значения для перетаскиваемой задачи внутри обработчика события - они не будут перезаписаны. Это гарантирует, что задача отобразится именно там, где вы хотите.</i></li>
</ol>


Например, чтобы запретить пользователям перетаскивать задачи за пределы диапазона **"31 марта 2020 - 11 апреля 2020"**:

![custom_dnd](/img/custom_dnd.png)

Используйте следующий код:

[Запрет перетаскивания задач за пределы интервала - [31.03.2020, 11.04.2020]](Запрет перетаскивания задач за пределы интервала - [31.03.2020, 11.04.2020])
~~~js
var leftLimit = new Date(2020, 2 ,31), rightLimit = new Date(2020, 3 ,12);

gantt.attachEvent("onTaskDrag", function(id, mode, task, original){
    var modes = gantt.config.drag_mode;
    if(mode == modes.move || mode == modes.resize){
    
        var diff = original.duration*(1000*60*60*24);
       
        if(+task.end_date > +rightLimit){
            task.end_date = new Date(rightLimit);
            if(mode == modes.move)
                task.start_date = new Date(task.end_date - diff);
            }
        if(+task.start_date < +leftLimit){
            task.start_date = new Date(leftLimit);
            if(mode == modes.move)
                task.end_date = new Date(+task.start_date + diff);
        }
    }
});
~~~


[Drag parent task with its children](https://docs.dhtmlx.com/gantt/samples/08_api/05_limit_drag_dates.html)


## Перетаскивание дочерних задач вместе с родительской {#draggingchildrentogetherwiththeparent}
-----------------------------------------------------

Чтобы при перемещении родительской задачи перетаскивались и её дочерние задачи, используйте событие [onTaskDrag](api/event/ontaskdrag.md) (подробнее об этом событии см. [выше](guides/dnd.md#preventingdraggingtasksoutsidecertaindates)):

~~~js
gantt.attachEvent("onTaskDrag", function(id, mode, task, original){
    var modes = gantt.config.drag_mode;
    if(mode == modes.move){
        var diff = task.start_date - original.start_date;
        gantt.eachTask(function(child){
            child.start_date = new Date(+child.start_date + diff);
            child.end_date = new Date(+child.end_date + diff);
            gantt.refreshTask(child.id, true);
        },id );
    }
});
// округляет позиции дочерних задач по текущему масштабу
gantt.attachEvent("onAfterTaskDrag", function(id, mode, e){
    var modes = gantt.config.drag_mode;
    if(mode == modes.move ){
        var state = gantt.getState();
        gantt.eachTask(function(child){          
            child.start_date = gantt.roundDate({
                date:child.start_date, 
                unit:state.scale_unit, 
                step:state.scale_step
              });            
              child.end_date = gantt.calculateEndDate(child.start_date, 
                child.duration, gantt.config.duration_unit);
              gantt.updateTask(child.id);
        },id );
    }
});
~~~

## Перетаскивание проектов вместе с подзадачами {#draggingprojectswithsubtasks}
-------------------------------------------

:::info
Эта возможность доступна только в редакции Gantt PRO.
:::

По умолчанию задачи, помеченные как [тип project](api/config/types.md), не могут быть перетаскиваемыми.
Вы можете включить перетаскивание проектов с помощью опции [drag_project](api/config/drag_project.md):

~~~js
gantt.config.drag_project = true;
~~~


[Draggable projects](https://docs.dhtmlx.com/gantt/samples/08_api/19_draggable_projects.html)


## Перетаскивание зависимых задач вместе с независимыми {#draggingdependenttaskstogetherwithindependenttasks}
----------------------------------------------------

Существует несколько способов перемещения задач вместе с их зависимыми задачами.
Подробную информацию вы найдёте в отдельной статье: [Перетаскивание задач вместе с их зависимыми задачами](guides/dragging-dependent-tasks.md).


## Установка минимальной длительности задачи {#settingminimaltaskduration}
-------------------------------------------

Вы можете задать минимальную длительность задачи с помощью настройки [min_duration](api/config/min_duration.md).

Этот параметр определяет минимальный размер задачи при изменении её длительности и предотвращает появление задач с нулевой длительностью.

Значение указывается в миллисекундах:
~~~js
// 1 день
gantt.config.min_duration = 24*60*60*1000;

//ИЛИ

// 1 час
gantt.config.min_duration = 60*60*1000;
~~~

## Автопрокрутка при перетаскивании задач {#autoscrollduringtasksdragging}
---------------------------------

При работе с крупными Gantt-диаграммами перетаскивание задачи на большое расстояние или создание связей между удалёнными задачами может быть затруднено.

Функция **autoscroll** помогает автоматически прокручивать диаграмму во время перетаскивания. Она включена по умолчанию, но может быть управляемой через опцию [autoscroll](api/config/autoscroll.md).

~~~js
gantt.config.autoscroll = false;
gantt.init("gantt_here");
~~~

Также вы можете настроить скорость автопрокрутки (в миллисекундах) с помощью свойства [autoscroll_speed](api/config/autoscroll_speed.md):

~~~js
gantt.config.autoscroll = true;
gantt.config.autoscroll_speed = 50;
 
gantt.init("gantt_here");
~~~

## Отключение изменения размера для определённых задач {#disablingresizeofspecifictasks}
---------------------------------------------------

Чтобы запретить изменение размера некоторых задач, есть два подхода:

1. Скрыть ручки изменения размера в интерфейсе с помощью CSS.
Используйте шаблон **task_class**, чтобы добавить пользовательский CSS-класс для определённых задач:

~~~js
gantt.templates.task_class = function(start, end, task){
    if(task.no_resize) { // no_resize - это пользовательское свойство для примера
        return "no_resize";
    }
    return "";
~~~

Затем скройте ручки изменения размера с помощью CSS:

~~~css
.no_resize .gantt_task_drag{
   display: none !important;
}
~~~

2. Заблокировать изменение размера программно с помощью события [onBeforeTaskDrag](api/event/onbeforetaskdrag.md).
Если обработчик возвращает *false*, изменение размера будет запрещено:

~~~js
gantt.attachEvent("onBeforeTaskDrag", function(id, mode, e){
    if(mode === "resize" && gantt.getTask(id).no_resize){
        return false;
    }
    return true;
});
~~~

## Определение, какая сторона задачи изменяется по размеру {#whichsideofataskisbeingresized}
-------------------------------------------------------

Режим "resize" в drag-and-drop означает, что пользователь изменяет либо дату начала, либо дату окончания задачи.

Чтобы определить, какая дата изменяется, проверьте флаг **gantt.getState().drag_from_start**:

~~~js
gantt.attachEvent("onBeforeTaskDrag", function(id, mode, e){
    if(mode === "resize"){
        if(gantt.getState().drag_from_start === true) {
            // изменяется дата начала
        } else {
            // изменяется дата окончания
        }
    }
    return true;
});
~~~

## Отключение изменения даты начала или окончания задачи {#disablingresizeofthestartortheenddateofatask}
---------------------------------------------------------

Ручки изменения размера можно выбрать с помощью следующих селекторов:

- .gantt_task_drag[data-bind-property="start_date"]
- .gantt_task_drag[data-bind-property="end_date"]

Чтобы отключить изменение даты начала, используйте такой CSS:

~~~css
.gantt_task_drag[data-bind-property="start_date"]{
   display: none !important;
}
~~~

Аналогично, чтобы отключить изменение даты окончания:

~~~css
.gantt_task_drag[data-bind-property="end_date"]{
   display: none !important;
}
~~~

В качестве альтернативы, вы можете запретить изменение размера через событие [onBeforeTaskDrag](api/event/onbeforetaskdrag.md).
Если обработчик возвращает *false*, изменение размера будет запрещено:

~~~js
gantt.attachEvent("onBeforeTaskDrag", function(id, mode, e){
    if(mode === "resize"){
        if(gantt.getState().drag_from_start === true) {
             return false;
        } else {
             // изменение даты окончания разрешено
        }
    }
    return true;
});
~~~


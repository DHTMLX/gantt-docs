---
title: "Изменение порядка задач"
sidebar_label: "Изменение порядка задач"
---

# Переупорядочение задач

dhtmlxGantt предоставляет 2 способа переупорядочения задач в гриде:

1. Перетаскивание.
2. Сортировка (см. [подробности](guides/sorting.md)).

Эти способы являются альтернативами. По умолчанию оба режима отключены.

Чтобы включить переупорядочивание перетаскиванием, используйте опцию [order_branch](api/config/order_branch.md): 

~~~js
gantt.config.order_branch = true;
gantt.init("gantt_here");
~~~


[Упорядочение ветвей](https://docs.dhtmlx.com/gantt/samples/07_grid/02_branch_ordering.html)

 
Вы можете посмотреть видеоруководство, которое демонстрирует, как сортировать и переупорядочивать задачи в гриде.

<iframe width="676" height="400" src="https://www.youtube.com/embed/srtb3nYOb-E" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Перетаскивание внутри всей структуры Gantt

Опция [order_branch] позволяет перетаскивать задачи внутри одного уровня дерева.

Также можно включить режим, в котором задачи можно переупорядочивать внутри всего Gantt. Это означает, что задача может заменить другую задачу любого уровня дерева.
Чтобы использовать такой тип переупорядочивания задач, используйте опцию [order_branch_free]:

~~~js
// переупорядочивание задач внутри всего gantt
gantt.config.order_branch = true;
gantt.config.order_branch_free = true;
 
gantt.init("gantt_here");
~~~

[Перетаскивание строк в грид](https://docs.dhtmlx.com/gantt/samples/07_grid/08_drag_between_levels.html)


## Запрещение сброса в конкретные позиции {#denyingdroppingtospecificpositions}

Чтобы запретить сброс задач в конкретные позиции, используйте событие [onBeforeTaskMove] или [onBeforeRowDragEnd]:

~~~js
//предотвращение перемещения в другую подветку:
gantt.attachEvent("onBeforeTaskMove", function(id, parent, tindex){
    var task = gantt.getTask(id);
    if(task.parent != parent)
        return false;
    return true;
});

//или
gantt.attachEvent("onBeforeRowDragEnd", function(id, parent, tindex){
      var task = gantt.getTask(id);
    if(task.parent != parent)
        return false;
    return true;
});
~~~


## Улучшение производительности для больших наборов данных

Если в вашем Gantt много задач, режим переупорядочивания ветвей по умолчанию может замедлять работу.
Чтобы ускорить его, можно использовать режим «marker».

~~~js
gantt.config.order_branch = "marker";
~~~


[Упорядочение ветвей - режим подсветки](https://docs.dhtmlx.com/gantt/samples/07_grid/14_branch_ordering_highlight.html)


В этом режиме переупорядочивается только имя задачи (при удерживании левой кнопки мыши), и Gantt перерисовывается только тогда, когда задача отпускается в целевую позицию (при отпускании клавиши).
В отличие от режима по умолчанию изменение позиции задачи не приводит к срабатыванию событий onBeforeTaskMove/onAfterTaskMove.

Чтобы предотвратить сброс задачи в конкретной позиции, используйте событие [onBeforeRowDragMove] вместо этого (работает только в режиме «marker»).


## Подсветка доступных мест назначения во время перетаскивания

Чтобы подсветить доступные места назначения во время перетаскивания (например, невозможно переместить узел корня под другим корнем, и вы хотите визуально информировать пользователя об этом), используйте события [onRowDragStart] и [onRowDragEnd]:

~~~js
gantt.config.order_branch = true;// order tasks only inside a branch
gantt.init("gantt_here");
gantt.parse(demo_tasks);

var drag_id = null;
gantt.attachEvent("onRowDragStart", function(id, target, e) {
    drag_id = id;
    return true;
});
gantt.attachEvent("onRowDragEnd", function(id, target) {
    drag_id = null;
    gantt.render();
});

gantt.templates.grid_row_class = function(start, end, task){
    if(drag_id && task.id != drag_id){
        if(task.$level != gantt.getTask(drag_id).$level)
            return "cant-drop";
        }
    return "";
};
~~~

## Вертикальное переупорядочение задач во временной шкале

Следуйте примерам, приведённым в разделе [Решения по вертикальному переупорядочению задач во временной шкале](guides/how-to.md#how-to-vertically-reorder-tasks-in-the-timeline).
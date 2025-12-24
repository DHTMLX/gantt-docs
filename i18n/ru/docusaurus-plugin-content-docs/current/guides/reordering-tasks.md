---
title: "Изменение порядка задач"
sidebar_label: "Изменение порядка задач"
---

# Изменение порядка задач


dhtmlxGantt предоставляет два способа изменения порядка задач в гриде:

1. Перетаскивание (drag-and-drop).
2. Сортировка (см. [детали](guides/sorting.md)).

Эти методы взаимоисключающие. По умолчанию оба отключены.

Чтобы включить изменение порядка задач с помощью drag-and-drop, установите опцию @[order_branch](api/config/order_branch.md):

~~~js
gantt.config.order_branch = true;
gantt.init("gantt_here");
~~~


[Branch ordering](https://docs.dhtmlx.com/gantt/samples/07_grid/02_branch_ordering.html)


Также доступен видеоурок, демонстрирующий, как сортировать и изменять порядок задач в гриде.

<iframe width="676" height="400" src="https://www.youtube.com/embed/srtb3nYOb-E" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Перетаскивание по всей структуре Gantt {#dragndropwithinthewholeganttstructure}


Опция @[order_branch](api/config/order_branch.md) ограничивает перетаскивание задачами внутри одного уровня дерева.

Однако можно включить режим, в котором задачи можно перемещать в любое место Gantt, позволяя задаче заменять другую на любом уровне дерева. Для этого используйте опцию @[order_branch_free](api/config/order_branch_free.md):

~~~js
// изменение порядка задач по всей структуре gantt
gantt.config.order_branch = true;
gantt.config.order_branch_free = true;

gantt.init("gantt_here");
~~~


[Drag and drop rows in Grid](https://docs.dhtmlx.com/gantt/samples/07_grid/08_drag_between_levels.html)


## Ограничение позиций для перемещения {#denyingdroppingtospecificpositions}


Чтобы запретить сброс задач в определённые позиции, используйте события @[onBeforeTaskMove](api/event/onbeforetaskmove.md) или @[onBeforeRowDragEnd](api/event/onbeforerowdragend.md):

~~~js
// запретить перемещение в другую подветку:
gantt.attachEvent("onBeforeTaskMove", function(id, parent, tindex){
    var task = gantt.getTask(id);
    if(task.parent != parent)
        return false;
    return true;
});

// или
gantt.attachEvent("onBeforeRowDragEnd", function(id, parent, tindex){
    var task = gantt.getTask(id);
    if(task.parent != parent)
        return false;
    return true;
});
~~~

## Повышение производительности при больших наборах данных {#improvingperformanceforlargedatasets}


При работе с большим количеством задач стандартный режим изменения порядка веток может замедлять работу. Для улучшения производительности можно использовать режим "marker".

~~~js
gantt.config.order_branch = "marker";
~~~


[Branch ordering - highlighting mode](https://docs.dhtmlx.com/gantt/samples/07_grid/14_branch_ordering_highlight.html)


В этом режиме при удержании левой кнопки мыши перемещается только имя задачи, а перерисовка Gantt происходит только после отпускания задачи. В отличие от стандартного режима, изменение позиций задач не вызывает события onBeforeTaskMove или onAfterTaskMove.

Чтобы ограничить сброс задач в определённые позиции в этом режиме, используйте событие @[onBeforeRowDragMove](api/event/onbeforerowdragmove.md) (работает только в режиме "marker").

## Подсветка доступных позиций для сброса при перетаскивании {#highlightingavailabledropplaceswhiledragampdrop}


Чтобы визуально выделять допустимые позиции для сброса во время перетаскивания (например, чтобы не позволить перетаскивать корневой узел под другой корневой), используйте события @[onRowDragStart](api/event/onrowdragstart.md) и @[onRowDragEnd](api/event/onrowdragend.md):

~~~js
gantt.config.order_branch = true; // изменение порядка задач только внутри ветки
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

## Вертикальное изменение порядка задач на временной шкале {#reorderingtasksverticallyinthetimeline}


См. примеры в разделе [Решения: Как вертикально изменить порядок задач на временной шкале](guides/how-to.md#howtoverticallyreordertasksinthetimeline).


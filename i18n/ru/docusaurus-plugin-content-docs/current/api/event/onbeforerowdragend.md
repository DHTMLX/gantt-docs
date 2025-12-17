---
sidebar_label: onBeforeRowDragEnd
title: onBeforeRowDragEnd event
description: "Срабатывает, когда пользователь отпускает строку внутри grid."
---

# onBeforeRowDragEnd

### Description

@short: Срабатывает, когда пользователь отпускает строку внутри grid.

@signature: onBeforeRowDragEnd: (sid: string | number, parent: string | number, tindex: number) =\> boolean;

### Parameters

- `sid` - (required) *string | number* - ID задачи, которая перемещается  
- `parent` - (required) *string | number* - ID родителя. Подробнее описано ниже  
- `tindex` - (required) *number* - индекс позиции, с которой задача перемещается <br> (индекс внутри всего дерева). Если указан, <b>tindex</b> соответствует индексу в ветке 'parent'. Подробнее см. ниже

### Returns
- ` result` - (boolean) - определяет, будет ли выполнено действие по умолчанию (<b>true</b>) или отменено (<b>false</b>)

### Example

~~~jsx
gantt.attachEvent("onBeforeRowDragEnd", function(id, parent, tindex){  
    const task = gantt.getTask(id);  
    if(task.parent != parent)  
        return false;  
    return true;  
});
~~~

### Related samples
- [Branch ordering](https://docs.dhtmlx.com/gantt/samples/07_grid/02_branch_ordering.html)

### Details

:::note
  
Это событие происходит, когда задача перемещается с помощью мыши в левой grid, если включена настройка [order_branch](api/config/order_branch.md). Если переупорядочивание веток отключено, событие не сработает. 
 
:::

- В момент срабатывания события задача уже перемещена на новое место, но изменение еще можно отменить  
- Событие можно заблокировать. Возврат *false* отменяет операцию и возвращает задачу на исходную позицию  
- Исходная позиция (родитель и индекс) передается в обработчик в виде аргументов  
- Целевая позиция доступна через объект задачи по [task.parent](guides/task-tree-operations.md#parentofatask) и [gantt.getGlobalTaskIndex(taskId)](api/method/getglobaltaskindex.md)  
- Параметры **parent** и **tindex** зависят от режима [order_branch](api/config/order_branch.md):  
    - В стандартном режиме ("true"):  
        - параметр **parent** указывает на *оригинального* родителя задачи (до перемещения)  
        - параметр **tindex** указывает на *оригинальный* локальный индекс  
    - В режиме "marker":  
        - параметр **parent** указывает на нового родителя задачи  
        - параметр **tindex** указывает на новый локальный индекс

### Related API
- [onRowDragEnd](api/event/onrowdragend.md)
- [onRowDragStart](api/event/onrowdragstart.md)
- [order_branch](api/config/order_branch.md)

### Related Guides
- [Изменение порядка задач](guides/reordering-tasks.md)


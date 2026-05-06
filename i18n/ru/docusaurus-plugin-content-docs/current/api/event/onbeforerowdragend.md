---
sidebar_label: onBeforeRowDragEnd
title: onBeforeRowDragEnd event
description: "срабатывает, когда пользователь отпускает строку в сетке"
---

# onBeforeRowDragEnd

### Description

@short: Срабатывает, когда пользователь отпускает строку в сетке

@signature: onBeforeRowDragEnd: (sid: string | number, parent: string | number, tindex: number) =\> boolean;

### Parameters

- `sid` - (required) *string | number* - идентификатор задачи, которая будет перемещена
- `parent` - (required) *string | number* - идентификатор родительского элемента. См. подробности ниже
- `tindex` - (required) *number* - индекс позиции, с которой задача будет перемещена <br/> (индекс во всем дереве). Если указан, <b>tindex</b> будет относиться к индексу в ветке 'parent'. См. подробности ниже

### Returns
- ` result` - (boolean) - определяет, будет ли выполнено действие по умолчанию события (<b>true</b>) или отменено (<b>false</b>)

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
- [Упорядочение ветвей](https://docs.dhtmlx.com/gantt/samples/07_grid/02_branch_ordering.html)

### Details

:::note
Событие срабатывает, когда задача перемещается указателем мыши в левой сетке, при включенной настройке [order_branch](api/config/order_branch.md). Если переупорядочение ветвей отключено, событие никогда не будет вызываться.
:::

- Когда событие срабатывает, задача уже перемещена на новую позицию, но изменить можно
  вернуть обратно
- Событие можно блокировать. Верните *false*, чтобы операция не выполнялась и переместите задачу обратно в исходное место
- Исходное положение (parent и index) доступны из аргументов обработчика
- Целевая позиция может быть получена из объекта задачи как [task.parent](guides/task-tree-operations.md#parent-of-a-task) и [gantt.getGlobalTaskIndex(taskId)](api/method/getglobaltaskindex.md)
- Параметры **parent** и **tindex** зависят от установленного режима [order_branch](api/config/order_branch.md):
    - В обычном режиме ("true"):
        - параметр **parent** относится к *оригинальному* родителю задачи (родителю задачи до её перемещения)
        - параметр **tindex** относится к *оригинальному* локальному индексу
    - В режиме "marker":
        - параметр **parent** относится к новому родителю задачи
        - параметр **tindex** относится к новому локальному индексу

### Related API
- [onRowDragEnd](api/event/onrowdragend.md)
- [onRowDragStart](api/event/onrowdragstart.md)
- [order_branch](api/config/order_branch.md)

### Related Guides
- [Переупорядочение задач](guides/reordering-tasks.md)
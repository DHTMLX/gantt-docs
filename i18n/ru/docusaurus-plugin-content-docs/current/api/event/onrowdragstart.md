---
sidebar_label: onRowDragStart
title: onRowDragStart event
description: "срабатывает перед тем, как пользователь начнет перетаскивать строку в сетке для вертикального изменения порядка"
---

# onRowDragStart

### Description

@short: Срабатывает до того, как пользователь начнет перетаскивать строку в сетке для вертикального изменения порядка

@signature: onRowDragStart: (id: string | number, target: HTMLElement, e: Event) =\> boolean;

### Parameters

- `id` - (required) *string | number* - идентификатор задачи, которую пользователь перетаскивает в сетке
- `target` - (required) *HTMLElement* - HTML-элемент задачи, которую пользователь перетаскивает
- `e` - (required) *Event* - нативный объект события

### Returns
- ```result``` - (boolean) - определяет, будет ли выполнено действие по умолчанию у события (true) или отменено (false)

### Example

~~~jsx
gantt.attachEvent("onRowDragStart", function(id, target, e) {
    // здесь можно добавить любую пользовательскую логику
    return true;
});
~~~

### Related samples
- [Упорядочивание ветвей](https://docs.dhtmlx.com/gantt/samples/07_grid/02_branch_ordering.html)

### Details

:::note
Событие срабатывает, когда задача перемещается указателем мыши в левой части сетки, при включенной настройке [order_branch](api/config/order_branch.md). Если переупорядочение ветвей отключено, событие не будет вызвано.
:::

Событие можно отменить. Верните *false* для отмены перетаскивания.

### Related API
- [onRowDragEnd](api/event/onrowdragend.md)
- [order_branch](api/config/order_branch.md)

### Related Guides
- [Переупорядочение задач](guides/reordering-tasks.md)
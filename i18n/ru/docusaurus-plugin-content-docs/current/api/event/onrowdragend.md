---
sidebar_label: onRowDragEnd
title: onRowDragEnd event
description: "срабатывает после того, как пользователь отпускает строку, которая была перемещена вертикально в grid"
---

# onRowDragEnd

### Description

@short: Срабатывает после того, как пользователь отпускает строку, которая была перемещена вертикально в grid

@signature: onRowDragEnd: (id: string | number, target: string | number) =\> void;

### Parameters

- `id` - (required) *string | number* - ID задачи, которая была перетащена вертикально внутри grid
- `target` - (required) *string | number* - ID задачи, позицию которой заняла перетаскиваемая строка

### Example

~~~jsx
gantt.attachEvent("onRowDragEnd", function(id, target) {
    // здесь можно добавить пользовательскую логику
});
~~~

### Related samples
- [Branch ordering](https://docs.dhtmlx.com/gantt/samples/07_grid/02_branch_ordering.html)

### Details

:::note

Это событие срабатывает, когда задача перемещается с помощью мыши в левой части grid, при условии, что включена настройка [order_branch](api/config/order_branch.md). Если перестановка веток отключена, это событие вызвано не будет.
 
:::

Параметр **target** содержит ID ближайшей задачи, которая находится либо непосредственно перед, либо непосредственно после перемещённой задачи.

Существует два возможных формата этого значения:

- *target=targetId* - перемещённая задача должна быть размещена прямо **перед** задачей с targetId
- *target=next:targetId* - перемещённая задача должна быть размещена прямо **после** задачи с targetId (так происходит, если заменяется последняя задача в диаграмме)

Пример того, как извлечь ID задачи из формата *next:targetId*:

~~~js
gantt.attachEvent("onRowDragEnd", function(id, target) {
      if(typeof(target) === "string"){
        targetTaskId  = target.substr("next:".length);
        nextTask = true;
      } else {
        targetTaskId  = target;
        nextTask = false;
      }
});
~~~

### Related API
- [onBeforeRowDragEnd](api/event/onbeforerowdragend.md)
- [onRowDragStart](api/event/onrowdragstart.md)
- [order_branch](api/config/order_branch.md)

### Related Guides
- [Изменение порядка задач](guides/reordering-tasks.md)


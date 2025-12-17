---
sidebar_label: onRowDragStart
title: onRowDragStart event
description: "срабатывает непосредственно перед тем, как строка в grid будет перетащена для вертикального изменения порядка"
---

# onRowDragStart

### Description

@short: Срабатывает непосредственно перед тем, как строка в grid будет перетащена для вертикального изменения порядка

@signature: onRowDragStart: (id: string | number, target: HTMLElement, e: Event) =\> boolean;

### Parameters

- `id` - (required) *string | number* - ID задачи, которую перетаскивают внутри grid
- `target` - (required) *HTMLElement* - HTML-элемент, представляющий перетаскиваемую задачу
- `e` - (required) *Event* - нативный объект события, связанный с действием drag

### Returns
- ` result` - (boolean) - определяет, будет ли выполнено действие по умолчанию для события (<b>true</b>) или оно будет остановлено (<b>false</b>)

### Example

~~~jsx
gantt.attachEvent("onRowDragStart", function(id, target, e) {
    // здесь можно добавить кастомную логику
    return true;
});
~~~

### Related samples
- [Branch ordering](https://docs.dhtmlx.com/gantt/samples/07_grid/02_branch_ordering.html)

### Details

:::note

Это событие срабатывает, когда задача перетаскивается мышью в левой области grid, и применимо только если активирована опция [order_branch](api/config/order_branch.md). Если переупорядочивание веток отключено, событие не происходит.
 
:::


Это событие можно заблокировать, вернув *false*, что предотвратит начало перетаскивания.

### Related API
- [onRowDragEnd](api/event/onrowdragend.md)
- [order_branch](api/config/order_branch.md)

### Related Guides
- [Изменение порядка задач](guides/reordering-tasks.md)


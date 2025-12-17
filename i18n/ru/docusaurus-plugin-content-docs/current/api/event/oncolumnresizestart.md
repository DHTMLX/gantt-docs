---
sidebar_label: onColumnResizeStart
title: onColumnResizeStart event
description: "срабатывает непосредственно перед тем, как пользователь начинает перетаскивать границу колонки для её изменения размера"
---

# onColumnResizeStart
:::info
 Эта функция доступна только в PRO-версии. 
:::
### Description

@short: Срабатывает непосредственно перед тем, как пользователь начинает перетаскивать границу колонки для её изменения размера

@signature: onColumnResizeStart: (index: number, column: GridColumn) =\> boolean;

### Parameters

- `index` - (required) *number* - индекс колонки
- `column` - (required) *GridColumn* - объект колонки

### Returns
- ` result` - (boolean) - определяет, будет ли выполнено действие по умолчанию события (<b>true</b>) или оно будет отменено (<b>false</b>)

### Example

~~~jsx
// вернуть false, чтобы отменить действие изменения размера
gantt.attachEvent("onColumnResizeStart", function(index, column){
    gantt.message("Начало изменения размера " + gantt.locale.labels["column_"+column.name]);
    return true;
});
~~~

### Related samples
- [Grid columns resize events](https://docs.dhtmlx.com/gantt/samples/02_extensions/04_grid_resize.html)

### Details


Это событие можно заблокировать. Возврат *false* предотвратит изменение размера колонки.

### Related API
- [onColumnResize](api/event/oncolumnresize.md)
- [onColumnResizeEnd](api/event/oncolumnresizeend.md)
- [onGridResizeStart](api/event/ongridresizestart.md)

### Related Guides
- [Указание колонок](guides/specifying-columns.md#resizing)


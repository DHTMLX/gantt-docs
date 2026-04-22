---
sidebar_label: onColumnResizeStart
title: onColumnResizeStart event
description: "срабатывает до того, как пользователь начнет перетаскивать границу столбца, чтобы изменить размер столбца"
---

# onColumnResizeStart
:::info
 Эта функция доступна только в PRO-версии. 
:::
### Description

@short: Срабатывает до того, как пользователь начнет перетаскивать границу столбца для изменения его размера

@signature: onColumnResizeStart: (index: number, column: GridColumn) =\> boolean;

### Parameters

- `index` - (required) *число* - индекс столбца
- `column` - (required) *GridColumn* - объект столбца

### Returns
- ` result` - (boolean) - определяет, будет ли выполнено действие по умолчанию события (<b>true</b>) или отменено (<b>false</b>)

### Example

~~~jsx
// вернуть false, чтобы отменить действие изменения размера
gantt.attachEvent("onColumnResizeStart", function(index, column){
    gantt.message("Start resizing " + gantt.locale.labels["column_"+column.name]);
    return true;
});
~~~

### Related samples
- [Grid columns resize events](https://docs.dhtmlx.com/gantt/samples/02_extensions/04_grid_resize.html)

### Details

Событие можно заблокировать. Возврат значения <b>false</b> не позволит выполнить изменение размера столбца.

### Related API
- [onColumnResize](api/event/oncolumnresize.md)
- [onColumnResizeEnd](api/event/oncolumnresizeend.md)
- [onGridResizeStart](api/event/ongridresizestart.md)

### Related Guides
- [Указание колонок](guides/specifying-columns.md#resizing)
---
sidebar_label: onColumnResizeEnd
title: onColumnResizeEnd event
description: "срабатывает после того, как пользователь завершил перетаскивание границы столбца для изменения его ширины"
---

# onColumnResizeEnd
:::info
Эта функциональность доступна только в версии PRO.
:::
### Description

@short: Срабатывает после того, как пользователь завершил перетаскивание границы столбца для изменения его ширины

@signature: onColumnResizeEnd: (index: number, column: GridColumn, new_width: number) =\> boolean;

### Parameters

- `index` - (required) *number* - индекс столбца
- `column` - (required) *GridColumn* - объект столбца
- `new_width` - (required) *number* - новая ширина столбца

### Returns
- `result` - (boolean) - определяет, будет ли выполнено действие по умолчанию обработчика события (<b>true</b>) или отменено (<b>false</b>)

### Example

~~~jsx
// возврат false отменяет операцию изменения размера
gantt.attachEvent("onColumnResizeEnd", function(index, column, new_width){
    gantt.message.hide(message);
    message = null;
    gantt.message(`Column <b>${gantt.locale.labels["column_"+column.name]}
    </b> is now ${new_width}px width`);
    return true;
});
~~~

### Related samples
- [События изменения размера столбцов Grid](https://docs.dhtmlx.com/gantt/samples/02_extensions/04_grid_resize.html)

### Details

Событие можно заблокировать. Возврат значения *false* отменит изменение размера столбца.

### Related API
- [onColumnResize](api/event/oncolumnresize.md)
- [onColumnResizeStart](api/event/oncolumnresizestart.md)
- [onGridResizeEnd](api/event/ongridresizeend.md)

### Related Guides
- [Указание столбцов](guides/specifying-columns.md#resizing)
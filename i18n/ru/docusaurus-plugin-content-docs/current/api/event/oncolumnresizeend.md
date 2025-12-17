---
sidebar_label: onColumnResizeEnd
title: onColumnResizeEnd event
description: "срабатывает один раз, когда пользователь заканчивает перетаскивать границу колонки для изменения её ширины"
---

# onColumnResizeEnd
:::info
 Эта функция доступна только в PRO-версии. 
:::
### Description

@short: Срабатывает один раз, когда пользователь заканчивает перетаскивать границу колонки для изменения её ширины

@signature: onColumnResizeEnd: (index: number, column: GridColumn, new_width: number) =\> boolean;

### Parameters

- `index` - (required) *number* - индекс колонки
- `column` - (required) *GridColumn* - объект колонки
- `new_width` - (required) *number* - обновленная ширина колонки

### Returns
- ` result` - (boolean) - определяет, будет ли выполнено действие по умолчанию (<b>true</b>) или оно будет отменено (<b>false</b>)

### Example

~~~jsx
// возврат false отменяет операцию изменения размера
gantt.attachEvent("onColumnResizeEnd", function(index, column, new_width){
    gantt.message.hide(message);
    message = null;
    gantt.message(`Колонка <b>${gantt.locale.labels["column_"+column.name]}
    </b> была изменена до ${new_width}px`);
    return true;
});
~~~

### Related samples
- [Grid columns resize events](https://docs.dhtmlx.com/gantt/samples/02_extensions/04_grid_resize.html)


Это событие можно заблокировать. Возврат *false* предотвращает изменение размера колонки.

### Related API
- [onColumnResize](api/event/oncolumnresize.md)
- [onColumnResizeStart](api/event/oncolumnresizestart.md)
- [onGridResizeEnd](api/event/ongridresizeend.md)

### Related Guides
- [Указание колонок](guides/specifying-columns.md#resizing)


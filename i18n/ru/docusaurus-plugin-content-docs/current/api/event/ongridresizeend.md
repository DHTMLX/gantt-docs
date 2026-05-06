---
sidebar_label: onGridResizeEnd
title: onGridResizeEnd event
description: "срабатывает после того, как пользователь завершил перетаскивание границы grid для изменения размера grid"
---

# onGridResizeEnd
:::info
 Эта функция доступна только в PRO-версии. 
:::
### Description

@short: Срабатывает после того, как пользователь завершил перетаскивание границы grid для изменения размера grid

@signature: onGridResizeEnd: (old_width: number, new_width: number) =\> boolean;

### Parameters

- `old_width` - (required) *number* - начальная ширина grid
- `new_width` - (required) *number* - новая ширина grid

### Returns
- ` result` - (boolean) - определяет, будет ли выполнено действие по умолчанию этого события (<b>true</b>) или отменено (<b>false</b>)

### Example

~~~jsx
// возвращение false отменит операцию изменения размера  
gantt.attachEvent("onGridResizeEnd", function(old_width, new_width){  
    gantt.message.hide(message);  
    message = null;  
    gantt.message(`Grid теперь имеет ширину <b>${new_width}</b>px`);  
    return true;  
});
~~~

### Related samples
- [События изменения ширины столбцов grid](https://docs.dhtmlx.com/gantt/samples/02_extensions/04_grid_resize.html)

### Details

Событие можно блокировать. Возврат *false* отменит изменение размера grid.

### Related API
- [onGridResize](api/event/ongridresize.md)
- [onGridResizeStart](api/event/ongridresizestart.md)
- [onColumnResizeEnd](api/event/oncolumnresizeend.md)

### Related Guides
- [Указание столбцов](guides/specifying-columns.md#resizing)
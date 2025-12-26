---
sidebar_label: onGridResizeEnd
title: onGridResizeEnd event
description: "срабатывает сразу после того, как пользователь завершает перетаскивание границы grid для изменения его размера"
---

# onGridResizeEnd
:::info
 Эта функция доступна только в PRO-версии. 
:::
### Description

@short: Срабатывает сразу после того, как пользователь завершает перетаскивание границы grid для изменения его размера

@signature: onGridResizeEnd: (old_width: number, new_width: number) =\> boolean;

### Parameters

- `old_width` - (required) *number* - ширина grid до изменения размера  
- `new_width` - (required) *number* - обновлённая ширина grid

### Returns
- ` result` - (boolean) - определяет, должно ли выполняться стандартное поведение события (<b>true</b>) или быть отменено (<b>false</b>)

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
- [Grid columns resize events](https://docs.dhtmlx.com/gantt/samples/02_extensions/04_grid_resize.html)

### Details

Это событие можно заблокировать. Возврат *false* предотвращает изменение размера grid.

### Related API
- [onGridResize](api/event/ongridresize.md)
- [onGridResizeStart](api/event/ongridresizestart.md)
- [onColumnResizeEnd](api/event/oncolumnresizeend.md)

### Related Guides
- [Указание колонок](guides/specifying-columns.md#resizing)


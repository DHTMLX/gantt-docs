---
sidebar_label: onLightboxDelete
title: onLightboxDelete event
description: "срабатывает, когда пользователь нажимает кнопку 'Delete' в lightbox"
---

# onLightboxDelete

### Description

@short: Вызывает, когда пользователь нажимает кнопку 'Delete' в lightbox

@signature: onLightboxDelete: (id: string | number) =\> boolean;

### Parameters

- `id` - (required) *string | number* - идентификатор задачи (задача, открытая в lightbox)

### Returns
- `result` - (boolean) - определяет, будет ли выполнено действие по умолчанию события (<b>true</b>) или отменено (<b>false</b>)

### Example

~~~jsx
gantt.attachEvent("onLightboxDelete", function(id){
    const task = gantt.getTask(id);
    if (task.duration > 60){
        alert("The duration is too long. Please, try again");
        return false;
    }
    return true;
})
~~~

### Details

Событие можно заблокировать. Возвращение *false* отменяет операцию удаления и lightbox остается открытым.

### Related Guides
- [onLightboxCancel](api/event/onlightboxcancel.md)
- [onLightboxSave](api/event/onlightboxsave.md)
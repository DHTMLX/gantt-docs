---
sidebar_label: onLightboxDelete
title: onLightboxDelete event
description: "Срабатывает, когда пользователь нажимает кнопку 'Delete' в лайтбоксе"
---

# onLightboxDelete

### Description

@short: Срабатывает, когда пользователь нажимает кнопку «Delete» в лайтбоксе

@signature: onLightboxDelete: (id: string | number) =\> boolean;

### Parameters

- `id` - (required) *string | number* - идентификатор задачи (задача, открытая в данный момент в лайтбоксе)

### Returns
- ` result` - (boolean) - определяет, будет ли выполнено действие по умолчанию (<b>true</b>) или оно будет отменено (<b>false</b>)

### Example

~~~jsx
gantt.attachEvent("onLightboxDelete", function(id){
    const task = gantt.getTask(id);
    if (task.duration > 60){
        alert("Длительность слишком большая. Пожалуйста, попробуйте снова");
        return false;
    }
    return true;
})
~~~

### Details

Это событие можно блокировать. Возврат *false* остановит действие удаления и оставит лайтбокс открытым.

### Related Guides
- [onLightboxCancel](api/event/onlightboxcancel.md)
- [onLightboxSave](api/event/onlightboxsave.md)


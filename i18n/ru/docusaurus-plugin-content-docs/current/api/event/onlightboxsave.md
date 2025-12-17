---
sidebar_label: onLightboxSave
title: onLightboxSave event
description: "Срабатывает, когда пользователь нажимает кнопку «Save» в лайтбоксе"
---

# onLightboxSave

### Description

@short: Срабатывает, когда пользователь нажимает кнопку «Save» в лайтбоксе

@signature: onLightboxSave: (id: string | number, task: Task, is_new: boolean) =\> boolean;

### Parameters

- `id` - (required) *string | number* - ID неизменённой задачи. Учтите, что на этом этапе значения из лайтбокса ещё не применены к объекту задачи, поэтому вы можете получить доступ к исходной задаче через gantt.getTask(id)
- `task` - (required) *Task* - обновлённый объект задачи
- `is_new` - (required) *boolean* - указывает, был ли лайтбокс открыт для создания новой задачи (<i>true</i>)<br> или для редактирования существующей (<i>false</i>)

### Returns
- ` result` - (boolean) - определяет, будет ли выполнено действие по умолчанию (<b>true</b>) или отменено (<b>false</b>)

### Example

~~~jsx
gantt.attachEvent("onLightboxSave", function(id, task, is_new){
    // здесь можно добавить свою логику
    return true;
})
~~~

### Details

Это событие можно заблокировать. Возврат *false* отменит операцию «save» и оставит лайтбокс открытым.

### Related Guides
- [onLightboxCancel](api/event/onlightboxcancel.md)
- [onLightboxDelete](api/event/onlightboxdelete.md)


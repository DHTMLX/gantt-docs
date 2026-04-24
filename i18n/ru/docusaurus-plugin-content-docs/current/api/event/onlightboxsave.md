---
sidebar_label: onLightboxSave
title: onLightboxSave event
description: "срабатывает, когда пользователь нажимает кнопку 'Save' в lightbox"
---

# onLightboxSave

### Description

@short: Срабатывает, когда пользователь нажимает кнопку 'Save' в lightbox

@signature: onLightboxSave: (id: string | number, task: Task, is_new: boolean) =\> boolean;

### Parameters

- `id` - (required) *string | number* - идентификатор неизменённой задачи. Примечание: на этом этапе значения из lightbox ещё не применяются к объекту задачи, и вы можете обратиться к исходной задаче, используя gantt.getTask(id)
- `task` - (required) *Task* - изменённый объект задачи
- `is_new` - (required) *boolean* - указывает, открывает ли пользователь lightbox для создания новой задачи (<i>true</i>)<br/> или обновления существующей (<i>false</i>)

### Returns
- ` result` - (boolean) - определяет, будет ли выполнено действие по умолчанию события (<b>true</b>) или отменено (<b>false</b>)

### Example

~~~jsx
gantt.attachEvent("onLightboxSave", function(id, task, is_new){
    // любая ваша логика здесь
    return true;
})
~~~

### Details

Событие можно заблокировать. Верните <b>false</b>, чтобы отменить операцию сохранения и оставить lightbox открытым.

### Related Guides
- [onLightboxCancel](api/event/onlightboxcancel.md)
- [onLightboxDelete](api/event/onlightboxdelete.md)
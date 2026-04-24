---
sidebar_label: onBeforeTaskChanged
title: onBeforeTaskChanged event
description: "срабатывает после того, как пользователь завершил перетаскивание и отпустил кнопку мыши, но до применения изменений"
---

# onBeforeTaskChanged

### Description

@short: Срабатывает после того, как пользователь завершил перетаскивание и отпустил кнопку мыши, но до применения изменений

@signature: onBeforeTaskChanged: (id: string | number, mode: string, task: Task) =\> boolean;

### Parameters

- `id` - (required) *string | number* - идентификатор задачи
- `mode` - (required) *string* - режим перетаскивания и отпускания мыши ("resize", "progress", "move", "ignore")
- `task` - (required) *Task* - копия объекта Task в исходном состоянии (до перетаскивания)

### Returns
- ` result` - (boolean) - определяет, будет ли выполнено действие по умолчанию события (true) или отменено (false)

### Example

~~~jsx
gantt.attachEvent("onBeforeTaskChanged", function(id, mode, task){
    // любая ваша логика здесь
    return true;
});
~~~

### Details

- Событие срабатывает, когда пользователь перетаскивает задачу в области временной шкалы.
- Событие можно заблокировать. Верните *false*, чтобы отменить операцию перетаскивания.
- Событие срабатывает до события [onAfterTaskDrag](api/event/onaftertaskdrag.md).

Аргумент **task** содержит исходный (не изменённый) объект задачи, в то время как тот же объект данных, доступный через метод **gantt.getTask(id)**, уже изменён.
Этот объект можно использовать, чтобы проверить точные изменения, внесённые перемещением по сравнению с исходным состоянием задачи — например, увеличилась или уменьшилась длительность, дата начала сместилась вперёд или назад и т. д.
Если из метода вернёт значение *false*, объект задачи в gantt откатится к значениям исходного объекта задачи.

### Related API
- [drag_mode](api/config/drag_mode.md)
- [onAfterTaskDrag](api/event/onaftertaskdrag.md)
---
sidebar_label: onBeforeTaskChanged
title: onBeforeTaskChanged event
description: "срабатывает после того, как пользователь закончил перетаскивание и отпустил кнопку мыши, но до применения каких-либо изменений"
---

# onBeforeTaskChanged

### Description

@short: Срабатывает после того, как пользователь закончил перетаскивание и отпустил кнопку мыши, но до применения каких-либо изменений

@signature: onBeforeTaskChanged: (id: string | number, mode: string, task: Task) =\> boolean;

### Parameters

- `id` - (required) *string | number* - идентификатор задачи
- `mode` - (required) *string* - режим drag-and-drop ("resize", "progress", "move", "ignore")
- `task` - (required) *Task* - копия объекта задачи в её исходном состоянии (до перетаскивания)

### Returns
- ` result` - (boolean) - определяет, будет ли выполнено действие по умолчанию (<b>true</b>) или отменено (<b>false</b>)

### Example

~~~jsx
gantt.attachEvent("onBeforeTaskChanged", function(id, mode, task){
    // здесь можно добавить пользовательскую логику
    return true;
});
~~~

### Details

- Это событие происходит, когда задача перетаскивается внутри области timeline.
- Его можно заблокировать, вернув *false*, что отменит операцию перетаскивания.
- Срабатывает до события [onAfterTaskDrag](api/event/onaftertaskdrag.md).

Параметр **task** представляет исходный (неизменённый) объект задачи, в то время как данные задачи, получаемые через **gantt.getTask(id)**, отражают обновлённое состояние.
Это позволяет сравнивать и определить, что изменилось во время drag-and-drop - например, увеличилась или уменьшилась длительность, или сдвинулась дата начала вперёд или назад.<br>
Возврат *false* из этого события приведёт к тому, что задача в Gantt вернётся к исходным значениям.

### Related API
- [drag_mode](api/config/drag_mode.md)
- [onAfterTaskDrag](api/event/onaftertaskdrag.md)


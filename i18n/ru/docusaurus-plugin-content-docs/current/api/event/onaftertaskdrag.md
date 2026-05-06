---
sidebar_label: onAfterTaskDrag
title: onAfterTaskDrag событие
description: "срабатывает после того, как пользователь закончил перетаскивать и отпустил кнопку мыши"
---

# onAfterTaskDrag

### Description

@short: Срабатывает после того, как пользователь закончил перетаскивать и отпустил кнопку мыши

@signature: onAfterTaskDrag: (id: string | number, mode: string, e: Event) =\> void;

### Parameters

- `id` - (required) *string | number* - идентификатор задачи
- `mode` - (required) *string* - режим drag-and-drop ("resize", "progress", "move", "ignore")
- `e` - (required) *Event* - нативный объект события

### Example

~~~jsx
gantt.attachEvent("onAfterTaskDrag", function(id, mode, e){
    //любая ваша логика здесь
});
~~~

### Details

Событие срабатывает, когда пользователь перетаскивает задачу в области таймлайна.

### Related API
- [drag_mode](api/config/drag_mode.md)
- [onBeforeTaskDrag](api/event/onbeforetaskdrag.md)
- [onBeforeTaskChanged](api/event/onbeforetaskchanged.md)
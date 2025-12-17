---
sidebar_label: onAfterTaskDrag
title: onAfterTaskDrag event
description: "срабатывает после того, как пользователь закончил перетаскивание и отпустил кнопку мыши"
---

# onAfterTaskDrag

### Description

@short: Срабатывает после того, как пользователь закончил перетаскивание и отпустил кнопку мыши

@signature: onAfterTaskDrag: (id: string | number, mode: string, e: Event) =\> void;

### Parameters

- `id` - (required) *string | number* - идентификатор задачи
- `mode` - (required) *string* - режим drag-and-drop ("resize", "progress", "move", "ignore")
- `e` - (required) *Event* - объект нативного события

### Example

~~~jsx
gantt.attachEvent("onAfterTaskDrag", function(id, mode, e){
    //любая ваша логика здесь
});
~~~

### Details

Это событие происходит, когда задача была перетащена в пределах timeline.

### Related API
- [drag_mode](api/config/drag_mode.md)
- [onBeforeTaskDrag](api/event/onbeforetaskdrag.md)
- [onBeforeTaskChanged](api/event/onbeforetaskchanged.md)


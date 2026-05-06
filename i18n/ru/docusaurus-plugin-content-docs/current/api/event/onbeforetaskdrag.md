---
sidebar_label: onBeforeTaskDrag
title: Событие onBeforeTaskDrag
description: "срабатывает после того, как пользователь нажал кнопку мыши и начал перетаскивать, но до того, как dhtmlxGantt инициирует операцию drag-and-drop"
---

# onBeforeTaskDrag

### Description

@short: Срабатывает после того, как пользователь нажал кнопку мыши и начал перетаскивать, но до того, как dhtmlxGantt инициирует операцию drag-and-drop

@signature: onBeforeTaskDrag: (id: string | number, mode: string, e: Event) =\> boolean;

### Parameters

- `id` - (required) *string | number* - идентификатор задачи
- `mode` - (required) *string* - режим drag-and-drop ("resize", "progress", "move", "ignore")
- `e` - (required) *Event* - встроенный объект события

### Returns
- ` result` - (boolean) - определяет, будет ли выполнено действие по умолчанию события (<b>true</b>) или отменено (<b>false</b>)

### Example

~~~jsx
gantt.attachEvent("onBeforeTaskDrag", function(id, mode, e){
    // любая ваша логика здесь
    return true;
});
~~~

### Related samples
- [D'n'D Events](https://docs.dhtmlx.com/gantt/samples/08_api/01_dnd_events.html)

### Details

Событие срабатывает, когда пользователь перетаскивает задачу в области временной шкалы.

Событие можно прервать. Верните *false*, и задача вернётся в исходную позицию.

### Related API
- [drag_mode](api/config/drag_mode.md)
- [onAfterTaskDrag](api/event/onaftertaskdrag.md)
- [onBeforeTaskChanged](api/event/onbeforetaskchanged.md)

### Related Guides
- [Dragging Tasks within the Timeline](guides/dnd.md)
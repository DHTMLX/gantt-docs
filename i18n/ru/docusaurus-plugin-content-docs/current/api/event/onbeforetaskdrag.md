---
sidebar_label: onBeforeTaskDrag
title: onBeforeTaskDrag event
description: "срабатывает сразу после того, как пользователь нажимает кнопку мыши и начинает перетаскивание, но до того, как dhtmlxGantt начнет процесс drag-and-drop."
---

# onBeforeTaskDrag

### Description

@short: Срабатывает сразу после того, как пользователь нажимает кнопку мыши и начинает перетаскивание, но до того, как dhtmlxGantt начнет процесс drag-and-drop.

@signature: onBeforeTaskDrag: (id: string | number, mode: string, e: Event) =\> boolean;

### Parameters

- `id` - (required) *string | number* - идентификатор задачи
- `mode` - (required) *string* - режим drag-and-drop ("resize", "progress", "move", "ignore")
- `e` - (required) *Event* - объект нативного события

### Returns
- ` result` - (boolean) - определяет, будет ли выполнено действие по умолчанию (<b>true</b>) или оно будет отменено (<b>false</b>)

### Example

~~~jsx
gantt.attachEvent("onBeforeTaskDrag", function(id, mode, e){
    //любая пользовательская логика здесь
    return true;
});
~~~

### Related samples
- [D'n'D Events](https://docs.dhtmlx.com/gantt/samples/08_api/01_dnd_events.html)

### Details

Это событие происходит при перетаскивании задачи внутри timeline.

Его можно заблокировать, вернув *false*, что приведет к сбросу задачи в исходное положение.

### Related API
- [drag_mode](api/config/drag_mode.md)
- [onAfterTaskDrag](api/event/onaftertaskdrag.md)
- [onBeforeTaskChanged](api/event/onbeforetaskchanged.md)

### Related Guides
- [Перетаскивание задач на временной шкале](guides/dnd.md)


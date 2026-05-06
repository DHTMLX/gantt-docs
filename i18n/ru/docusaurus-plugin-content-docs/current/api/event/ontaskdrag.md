---
sidebar_label: onTaskDrag
title: событие onTaskDrag
description: "срабатывает, когда пользователь перетаскивает задачу"
---

# onTaskDrag

### Description

@short: Срабатывает, когда пользователь перетаскивает задачу

@signature: onTaskDrag: (id: string | number, mode: string, task: Task, original: Task, e: Event) =\> void;

### Parameters

- `id` - (required) *string | number* - идентификатор задачи
- `mode` - (required) *string* - режим перетаскивания ("resize", "progress", "move", "ignore")
- `task` - (required) *Task* - текущий (перетаскиваемый) объект задачи
- `original` - (required) *Task* - исходный (первоначальный) объект задачи
- `e` - (required) *Event* - нативный объект события

### Example

~~~jsx
gantt.attachEvent("onTaskDrag", function(id, mode, task, original){
    // любая ваша логика здесь
});
~~~

### Related samples
- [Перетащить родительскую задачу вместе с её дочерними задачами](https://docs.dhtmlx.com/gantt/samples/08_api/05_limit_drag_dates.html)
- [Ограничить даты перетаскивания и отпускания](https://docs.dhtmlx.com/gantt/samples/08_api/02_constraints.html)

### Details

The event:

- Вызывается каждый раз, когда пользователь выполняет перемещение мыши в области временной шкалы: перемещает, изменяет размер задачи или прогресс задачи.
- Тип перемещения, используемого при перетаскивании, передаётся как второй аргумент - **mode**.
- Все доступные значения типа перемещения перетаскивания хранятся в свойстве [drag_mode](api/config/drag_mode.md).

Кратко, всё происходит в следующем порядке:

1. Пользователь выполняет перемещение.
2. dhtmlxGantt перерасчитывает дату задачи в соответствии с новым положением.
3. dhtmlxGantt возбуждает событие [onTaskDrag](api/event/ontaskdrag.md).
4. dhtmlxGantt повторно отрисовывает задачу на диаграмме Ганта.

### Related API
- [onBeforeTaskDrag](api/event/onbeforetaskdrag.md)
- [onAfterTaskDrag](api/event/onaftertaskdrag.md)
- [drag_mode](api/config/drag_mode.md)

### Related Guides
- [Перетаскивание задач в Timeline](guides/dnd.md#denying-dragging-tasks-out-of-specific-dates)
- [Как сделать бесконечную прокрутку в timeline](guides/how-to.md#how-to-have-an-infinite-scroll-in-the-timeline)
---
sidebar_label: onTaskDrag
title: onTaskDrag event
description: "срабатывает, когда пользователь перетаскивает задачу"
---

# onTaskDrag

### Description

@short: Срабатывает, когда пользователь перетаскивает задачу

@signature: onTaskDrag: (id: string | number, mode: string, task: Task, original: Task, e: Event) =\> void;

### Parameters

- `id` - (required) *string | number* - id задачи
- `mode` - (required) *string* - режим перетаскивания ("resize", "progress", "move", "ignore")
- `task` - (required) *Task* - текущий (перетаскиваемый) объект задачи
- `original` - (required) *Task* - оригинальный (начальный) объект задачи
- `e` - (required) *Event* - нативный объект события

### Example

~~~jsx
gantt.attachEvent("onTaskDrag", function(id, mode, task, original){
    //любая ваша логика здесь
});
~~~

### Related samples
- [Drag parent task with its children](https://docs.dhtmlx.com/gantt/samples/08_api/05_limit_drag_dates.html)
- [Limit drag and drop dates](https://docs.dhtmlx.com/gantt/samples/08_api/02_constraints.html)

### Details

Это событие происходит каждый раз, когда пользователь перетаскивает мышь в области timeline, чтобы переместить, изменить размер задачи или обновить прогресс задачи. Тип перетаскивания указывается во втором аргументе - **mode**. Все возможные значения режима перетаскивания можно найти в файле [drag_mode](api/config/drag_mode.md).

Вкратце процесс выглядит так:

1. Пользователь начинает действие перетаскивания.
2. dhtmlxGantt пересчитывает даты задачи на основе нового положения.
3. dhtmlxGantt вызывает событие [onTaskDrag](api/event/ontaskdrag.md).
4. dhtmlxGantt обновляет отображение задачи на диаграмме Ганта.

### Related API
- [onBeforeTaskDrag](api/event/onbeforetaskdrag.md)
- [onAfterTaskDrag](api/event/onaftertaskdrag.md)
- [drag_mode](api/config/drag_mode.md)

### Related Guides
- [Перетаскивание задач на временной шкале](guides/dnd.md#preventingdraggingtasksoutsidecertaindates)
- [Решения](guides/how-to.md#howtohaveaninfinitescrollinthetimeline)


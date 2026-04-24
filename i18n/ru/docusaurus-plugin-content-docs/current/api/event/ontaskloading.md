---
sidebar_label: onTaskLoading
title: onTaskLoading event
description: "срабатывает, когда задача загружается из источника данных"
---

# onTaskLoading

### Description

@short: Срабатывает, когда задача загружается из источника данных

@signature: onTaskLoading: (task: Task) => boolean;

### Parameters

- `task` - (required) *Task* - объект задачи

### Returns
- ` result` - (boolean) - определяет, будет ли выполнено действие по умолчанию события (<b>true</b>) или отменено (<b>false</b>)

### Example

~~~jsx
gantt.attachEvent("onTaskLoading", function(task){
    // любая ваша логика здесь
    return true;
});
~~~

### Details

- Событие срабатывает для каждой задачи в источнике данных.
- Событие можно блокировать. Вернуть *false* — и задача не будет загружена в диаграмму Ганта.

### Related API
- [onLoadStart](api/event/onloadstart.md)
- [onBeforeParse](api/event/onbeforeparse.md)
- [onParse](api/event/onparse.md)
- [onBeforeGanttRender](api/event/onbeforeganttrender.md)
- [onBeforeDataRender](api/event/onbeforedatarender.md)
- [onDataRender](api/event/ondatarender.md)
- [onGanttRender](api/event/onganttrender.md)
- [onLoadEnd](api/event/onloadend.md)
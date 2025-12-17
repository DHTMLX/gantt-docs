---
sidebar_label: onTaskLoading
title: onTaskLoading event
description: "Срабатывает при загрузке задачи из источника данных."
---

# onTaskLoading

### Description

@short: Срабатывает при загрузке задачи из источника данных.

@signature: onTaskLoading: (task: Task) =\> boolean;

### Parameters

- `task` - (required) *Task* - объект задачи, которая загружается

### Returns
- ` result` - (boolean) - определяет, будет ли выполнено действие по умолчанию события (<b>true</b>) или оно будет остановлено (<b>false</b>)

### Example

~~~jsx
gantt.attachEvent("onTaskLoading", function(task){
    // здесь можно добавить пользовательскую логику
    return true;
});
~~~

### Details

- Это событие происходит для каждой задачи, поступающей из источника данных.
- Его можно заблокировать. Возврат *false* предотвращает загрузку задачи в диаграмму Ганта.

### Related API
- [onLoadStart](api/event/onloadstart.md)
- [onBeforeParse](api/event/onbeforeparse.md)
- [onParse](api/event/onparse.md)
- [onBeforeGanttRender](api/event/onbeforeganttrender.md)
- [onBeforeDataRender](api/event/onbeforedatarender.md)
- [onDataRender](api/event/ondatarender.md)
- [onGanttRender](api/event/onganttrender.md)
- [onLoadEnd](api/event/onloadend.md)


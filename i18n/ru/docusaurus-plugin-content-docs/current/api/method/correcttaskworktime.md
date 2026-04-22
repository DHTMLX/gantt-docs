---
sidebar_label: correctTaskWorkTime
title: метод correctTaskWorkTime
description: "пересчитывает длительность задачи в рамках рабочего времени"
---

# correctTaskWorkTime

### Description

@short: Пересчитывает длительность задачи в рамках рабочего времени

@signature: correctTaskWorkTime: (task: Task) => void

### Parameters

- `task` - (required) *Task* - объект задачи

### Example

~~~jsx
gantt.attachEvent("onTaskDrag", function(id, mode, task, original){
    gantt.correctTaskWorkTime(task);
});
~~~

### Details

Метод требует указания следующих параметров конфигурации:

~~~js
gantt.config.work_time = true;
gantt.config.correct_work_time = true;
~~~

### Related Guides
- [Расчет рабочего времени](guides/working-time.md)
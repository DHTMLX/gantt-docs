---
sidebar_label: correctTaskWorkTime
title: correctTaskWorkTime method
description: "пересчитывает продолжительность задачи на основе рабочего времени"
---

# correctTaskWorkTime

### Description

@short: Пересчитывает продолжительность задачи на основе рабочего времени

@signature: correctTaskWorkTime: (task: Task) =\> void

### Parameters

- `task` - (required) *Task* - объект задачи

### Example

~~~jsx
gantt.attachEvent("onTaskDrag", function(id, mode, task, original){
    gantt.correctTaskWorkTime(task);
});
~~~

### Details

Этот метод работает при включённых следующих опциях конфигурации:

~~~js
gantt.config.work_time = true;
gantt.config.correct_work_time = true;
~~~

### Related Guides
- [Расчёт рабочего времени](guides/working-time.md)

---
sidebar_label: eachParent
title: Метод eachParent
description: "перебирает все родительские задачи указанной задачи на диаграмме Гантта"
---

# eachParent

### Description

@short: Перебирает все родительские задачи указанной задачи на диаграмме Гантта

@signature: eachParent: (code: GanttCallback, startTask: string | number, master?: any) => void

### Parameters

- `code` - (обязательно) *function* - функция, которая будет перебирать задачи. Принимает объект задачи в качестве параметра
- `startTask` - (обязательно) *string | number* - id элемента, родительские задачи которого следует перебирать

### Example

~~~jsx
gantt.eachParent(function(task){
    alert(task.text);
}, taskId);
~~~

### Related API
- [calculateTaskLevel](api/method/calculatetasklevel.md)
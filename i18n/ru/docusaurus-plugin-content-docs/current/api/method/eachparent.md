---
sidebar_label: eachParent
title: eachParent method
description: "перебирает всех родительских задач для заданной задачи на диаграмме Ганта"
---

# eachParent

### Description

@short: Перебирает всех родительских задач для заданной задачи на диаграмме Ганта

@signature: eachParent: (code: GanttCallback, startTask: string | number, master?: any) =\> void

### Parameters

- `code` - (required) *function* - функция обратного вызова, которая обрабатывает каждый объект задачи
- `startTask` - (required) *string | number* -             ID задачи, для которой будут перебраны родительские задачи
- `master` - (optional) *object* - контекстный объект, используемый как 'this' внутри функции обратного вызова

### Example

~~~jsx
gantt.eachParent(function(task){
    alert(task.text);
}, taskId);
~~~

### Related API
- [calculateTaskLevel](api/method/calculatetasklevel.md)


---
sidebar_label: eachTask
title: eachTask method
description: "проходит по всем дочерним задачам конкретной задачи или по всему Gantt chart"
---

# eachTask

### Description

@short: Проходит по всем дочерним задачам конкретной задачи или по всему Gantt chart

@signature: eachTask: (code: GanttCallback, parent?: string | number, master?: any) =\> void

### Parameters

- `code` - (required) *function* - функция, которая будет вызвана для каждой задачи. В качестве аргумента она получает объект задачи
- `parent` - (optional) *string | optional* - id родителя. Если указан, функция будет итерироваться по дочерним задачам <br> указанного родителя    
- `master` - (optional) *object* - объект, который будет использоваться как 'this' внутри функции

### Example

~~~jsx
gantt.eachTask(function(task){alert(task.text);})
~~~

### Details

Этот метод выполняет [обход дерева в глубину](https://en.wikipedia.org/wiki/Tree_traversal#Pre-order_(NLR)) слева направо, посещая каждую задачу. Родительские задачи обрабатываются до их дочерних.

### Related API
- [eachSelectedTask](api/method/eachselectedtask.md)


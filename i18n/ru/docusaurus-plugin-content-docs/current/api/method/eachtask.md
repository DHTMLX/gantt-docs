---
sidebar_label: eachTask
title: метод eachTask
description: "перебирает все дочерние задачи конкретной задачи или всей диаграммы Ганта"
---

# eachTask

### Description

@short: Перебирает все дочерние задачи конкретной задачи или всей диаграммы Ганта

@signature: eachTask: (code: GanttCallback, parent?: string | number, master?: any) =\> void

### Parameters

- `code` - (required) *function* - функция, которая будет перебирать задачи. Принимает объект задачи в качестве параметра
- `parent` - (optional) *string | number* - идентификатор родителя. Если указан, функция будет перебирать детей указанного родителя
- `master` - (optional) *object* - объект, на который будет ссылаться this

### Example

~~~jsx
gantt.eachTask(function(task){alert(task.text);})
~~~

### Details

Метод использует обход дерева в глубину слева направо для перебора всех задач. Каждый родительский узел посещается перед своим дочерним узлом. [depth-first tree traversal](https://en.wikipedia.org/wiki/Tree_traversal#Pre-order_(NLR)) слева направо.

### Related API
- [eachSelectedTask](api/method/eachselectedtask.md)
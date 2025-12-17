---
sidebar_label: root_id
title: root_id config
description: "задаёт id виртуального корневого элемента"
---

# root_id

### Description

@short: Задаёт id виртуального корневого элемента

@signature: root_id: string | number

### Example

~~~jsx
gantt.config.root_id = "root"; /*!*/

var tasks =  {
    data:[
      {id:1, text:"Project #2", start_date:"01-04-2013", duration:18, parent:"root"}, /*!*/
      {id:2, text:"Task #1",     start_date:"02-04-2013", duration:8,  parent:1},
      {id:3, text:"Task #2",    start_date:"11-04-2013", duration:8,  parent:1}
    ],
    links:[]
};

gantt.init("gantt_here");

gantt.parse(tasks);
~~~

**Default value:** "0"

### Details

**root_id** определяет виртуальный корневой узел в дереве задач.
Если свойство *parent* задачи совпадает со значением **root_id**, эта задача отображается на верхнем уровне дерева gantt.

- Свойство [parent](guides/loading.md#dataproperties) задачи должно указывать id родительской задачи в дереве задач.
- Задачи, у которых значение parent совпадает с [существующей задачей](api/method/istaskexists.md), будут отображаться как подзадачи этой задачи.
- Задачи, у которых parent равен *gantt.config.root_id* (по умолчанию числовой 0) или не определён, будут показаны на верхнем уровне дерева задач.
- Задачи, у которых parent ссылается на [несуществующий id задачи](api/method/istaskexists.md) и при этом [не строго равен](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Strict_equality) **root_id**, не будут отображаться в дереве задач.


---
sidebar_label: root_id
title: root_id config
description: "sets the id of the virtual root element"
---

# root_id

### Description

@short: Устанавливает идентификатор виртуального корневого элемента

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

**Значение по умолчанию:** "0"

### Details

**root_id** относится к виртуальному корневому узлу дерева задач.
Если значение свойства *parent* задачи равно значению конфигурации **root_id**, такая задача будет отображаться на верхнем уровне дерева задач в диаграмме Ганта.

- Свойство [parent](guides/loading.md#dataproperties) задачи должно содержать идентификатор родительской задачи в дереве задач.
- Задачи, чьё значение свойства parent содержит идентификатор существующей задачи (см. [existing task](api/method/istaskexists.md)), будут отображаться как подпозиции указанных элементов.
- Задачи, у которых значение parent равно *gantt.config.root_id* (число 0 по умолчанию) или не определено, будут располагаться на верхнем уровне дерева задач.
- Задачи, у которых значение parent содержит идентификатор несуществующей задачи (см. [non-existing task](api/method/istaskexists.md)) и не строго равно **root_id**, не будут отображаться в дереве задач.
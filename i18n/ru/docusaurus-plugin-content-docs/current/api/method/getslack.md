---
sidebar_label: getSlack
title: метод getSlack
description: "проверяет, сколько времени (в текущей единице длительности) задача имеет до момента, когда она начнет влиять на другие задачи"
---

# getSlack

:::info
Метод **getSlack** доступен только в PRO-версии.
:::

### Description

@short: Проверяет, сколько времени (в текущей единице длительности) задача имеет до момента, когда она начнет влиять на другие задачи

### Parameters

- `task1` - (обязательно) *объект* - объект первой задачи, для которой нужно проверить запас
- `task2` - (обязательно) *объект* - объект второй задачи, для которой нужно проверить запас

### Returns
- ` slack` - (число, строка) - запас между задачами в текущих единицах длительности или 'Infinity', если задачи не связаны

### Example

~~~jsx
const tasks = {
    data:[
       {id:1, text:"Project #1", start_date:"01-04-2013", duration:18, type:"project"},
       {id:2, text:"Task #1", start_date:"02-04-2013",duration:8, parent:1},
       {id:3, text:"Task #2", start_date:"13-04-2013",duration:8, parent:1}
    ],
    links:[
       {id:1, source:1, target:2, type:"1"},
       {id:2, source:2, target:3, type:"0"}
    ]
};
 
gantt.config.highlight_critical_path = true; 
gantt.init("gantt_here");
gantt.parse(tasks);

gantt.getSlack(gantt.getTask(2), gantt.getTask(3)); // -> 1  /*!*/
~~~

### Related samples
- [Критический путь](https://docs.dhtmlx.com/gantt/samples/02_extensions/03_critical_path.html)

### Details

:::warning
Метод **getSlack** устарел. Используйте следующие методы, чтобы получить свободный/общий запас задачи: 
~~~

~~~js
gantt.getFreeSlack(task);

gantt.getTotalSlack(task);
~~~

:::note
Этот метод определён в расширении **critical_path**, поэтому его нужно подключить на странице. Прочитайте детали в статье [Critical Path](guides/critical-path.md). 
:::

### Related API
- [highlight_critical_path](api/config/highlight_critical_path.md)
- [isCriticalTask](api/method/iscriticaltask.md)
- [isCriticalLink](api/method/iscriticallink.md)

### Related Guides
- [Критический путь](guides/critical-path.md)
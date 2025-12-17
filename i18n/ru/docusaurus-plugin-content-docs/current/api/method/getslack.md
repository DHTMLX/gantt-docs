---
sidebar_label: getSlack
title: getSlack method
description: "определяет, сколько времени (в текущих единицах длительности) у задачи есть, прежде чем она повлияет на другие задачи"
---

# getSlack
:::info
 Эта функция доступна только в PRO-версии. 
:::
### Description

@short: Определяет, сколько времени (в текущих единицах длительности) у задачи есть, прежде чем она повлияет на другие задачи

### Parameters

- `task1` - (required) *object* - первый объект задачи для проверки slack
- `task2` - (required) *object* - второй объект задачи для проверки slack

### Returns
- ` slack` - (number,string) - запаздывание между задачами в текущих единицах длительности или 'Infinity', если задачи не связаны

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
- [Critical path](https://docs.dhtmlx.com/gantt/samples/02_extensions/03_critical_path.html)

### Details

:::note
 Метод **getSlack** устарел. Вместо него используйте следующие методы для получения свободного или общего запаздывания задачи: 
:::

~~~js
gantt.getFreeSlack(task);

gantt.getTotalSlack(task);
~~~

<br>

:::note
 Этот метод является частью расширения **critical_path**, поэтому убедитесь, что оно подключено на вашей странице. Подробнее в статье [Критический путь](guides/critical-path.md). 
:::

![iscritical_path](/img/iscritical_path.png)

### Related API
- [highlight_critical_path](api/config/highlight_critical_path.md)
- [isCriticalTask](api/method/iscriticaltask.md)
- [isCriticalLink](api/method/iscriticallink.md)

### Related Guides
- [Критический путь](guides/critical-path.md)


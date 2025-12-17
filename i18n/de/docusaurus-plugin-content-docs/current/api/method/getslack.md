---
sidebar_label: getSlack
title: getSlack method
description: "bestimmt, wie viel Zeit (in der aktuellen Dauereinheit) eine Aufgabe hat, bevor sie andere Aufgaben beeinflusst"
---

# getSlack
:::info
 Die **getSlack** Methode ist nur in der PRO Edition verfügbar. 
:::
### Description

@short: Bestimmt, wie viel Zeit (in der aktuellen Dauereinheit) eine Aufgabe hat, bevor sie andere Aufgaben beeinflusst

### Parameters

- `task1` - (required) *object* - die erste Aufgabenobjekt, für das der Slack überprüft wird
- `task2` - (required) *object* - die zweite Aufgabenobjekt, für das der Slack überprüft wird

### Returns
- ` slack` - (number,string) - der Slack zwischen den Aufgaben in den aktuellen Dauereinheiten oder 'Infinity', wenn die Aufgaben nicht verknüpft sind

### Example

~~~jsx
const tasks = {
    data:[
       {id:1, text:"Projekt #1", start_date:"01-04-2013", duration:18, type:"project"},
       {id:2, text:"Aufgabe #1", start_date:"02-04-2013",duration:8, parent:1},
       {id:3, text:"Aufgabe #2", start_date:"13-04-2013",duration:8, parent:1}
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
 Die **getSlack** Methode ist veraltet. Verwenden Sie stattdessen diese Methoden, um den freien oder gesamten Slack einer Aufgabe zu erhalten: 
:::

~~~js
gantt.getFreeSlack(task);

gantt.getTotalSlack(task);
~~~

<br>


:::note
 Diese Methode ist Teil der **critical_path** Extension, stellen Sie also sicher, dass Sie diese auf Ihrer Seite einbinden. Weitere Details finden Sie im Artikel ["Kritischer Pfad"](guides/critical-path.md). 
:::

![iscritical_path](/img/iscritical_path.png)

### Related API
- [highlight_critical_path](api/config/highlight_critical_path.md)
- [isCriticalTask](api/method/iscriticaltask.md)
- [isCriticalLink](api/method/iscriticallink.md)

### Related Guides
- ["Kritischer Pfad"](guides/critical-path.md)


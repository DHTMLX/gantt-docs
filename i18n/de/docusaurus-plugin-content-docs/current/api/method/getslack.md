---
sidebar_label: getSlack
title: getSlack Methode
description: "Prüft, wie viel Zeit (in der aktuellen Dauer-Einheit) eine Aufgabe hat, bevor sie andere Aufgaben zu beeinflussen beginnt"
---

# getSlack

:::info
Die Methode **getSlack** ist nur in der PRO-Edition verfügbar.
:::

### Description

@short: Prüft, wie viel Zeit (in der aktuellen Dauer-Einheit) eine Aufgabe hat, bevor sie andere Aufgaben zu beeinflussen beginnt

### Parameters

- `task1` - (erforderlich) *Objekt* - das Objekt der ersten Aufgabe, für die der Pufferzeit geprüft werden soll
- `task2` - (erforderlich) *Objekt* - das Objekt der zweiten Aufgabe, für die der Pufferzeit geprüft werden soll

### Returns
- ` slack` - (number,string) - eine Pufferzeit zwischen den Aufgaben in den aktuellen Dauer-Einheiten oder 'Infinity', falls die Aufgaben nicht verknüpft sind

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
- [Kritischer Pfad](https://docs.dhtmlx.com/gantt/samples/02_extensions/03_critical_path.html)

### Details

:::warning
Die **getSlack**-Methode ist veraltet. Verwenden Sie die folgenden Methoden, um die freie/gesamte Pufferzeit einer Aufgabe zu erhalten: 
:::

~~~js
gantt.getFreeSlack(task);

gantt.getTotalSlack(task);
~~~

:::note
Diese Methode ist in der **critical_path**-Erweiterung definiert, daher müssen Sie sie auf der Seite einbinden. Lesen Sie die Details im Artikel [Kritischer Pfad](guides/critical-path.md). 
:::

### Related API
- [highlight_critical_path](api/config/highlight_critical_path.md)
- [isCriticalTask](api/method/iscriticaltask.md)
- [isCriticalLink](api/method/iscriticallink.md)

### Related Guides
- [Kritischer Pfad](guides/critical-path.md)
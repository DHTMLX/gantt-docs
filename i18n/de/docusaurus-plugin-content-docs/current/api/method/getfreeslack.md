---
sidebar_label: getFreeSlack
title: getFreeSlack method
description: "gibt den freien Slack einer Aufgabe zurück"
---

# getFreeSlack
:::info
 Diese Funktion ist nur in der PRO-Edition verfügbar. 
:::
### Description

@short: Gibt den freien Slack einer Aufgabe zurück

@signature: getFreeSlack: (task: Task) =\> number

### Parameters

- `task` - (required) *Task* - das Objekt einer Aufgabe

### Returns
- ` free_slack` - (number) - der freie Slack einer Aufgabe

### Example

~~~jsx
const task = gantt.getTask(7);
gantt.getFreeSlack(task);
~~~

### Related samples
- [Show Slack time](https://docs.dhtmlx.com/gantt/samples/08_api/17_show_task_slack.html)

### Details

:::note
 Diese Methode ist Teil der **critical_path**-Erweiterung. Stellen Sie daher sicher, dass Sie das [critical_path](guides/extensions-list.md#criticalpath) Plugin über die Methode [gantt.plugins](api/method/plugins.md) aktivieren. Weitere Informationen finden Sie im Artikel ["Kritischer Pfad"](guides/critical-path.md). 
:::

Freier Slack bezeichnet die Zeitspanne, die zur Dauer einer Aufgabe hinzugefügt oder auf der Timeline verschoben werden kann, ohne dass nachfolgende verbundene Aufgaben beeinflusst werden.

### Related API
- [getTotalSlack](api/method/gettotalslack.md)

### Related Guides
- ["Kritischer Pfad"](guides/critical-path.md#gettingfreeandtotalslack)


---
sidebar_label: getFreeSlack
title: getFreeSlack Methode
description: "liefert die freie Pufferzeit einer Aufgabe"
---

# getFreeSlack

:::info 
Diese Funktionalität ist nur in der PRO-Edition verfügbar.
:::

### Description

@short: Gibt die freie Pufferzeit einer Aufgabe zurück

@signature: getFreeSlack: (task: Task) => number

### Parameters

- `task` - (erforderlich) *Task* - das Objekt einer Aufgabe

### Returns
- `free_slack` - (number) - die freie Pufferzeit einer Aufgabe

### Example

~~~jsx
const task = gantt.getTask(7);
gantt.getFreeSlack(task);
~~~

### Related samples
- [Show Slack time](https://docs.dhtmlx.com/gantt/samples/08_api/17_show_task_slack.html)

### Details

:::note
Diese Methode ist in der **critical_path**-Erweiterung definiert, daher müssen Sie das [critical_path](guides/extensions-list.md#critical-path)-Plugin mit der [gantt.plugins](api/method/plugins.md) Methode aktivieren. Lesen Sie die Details im Artikel zum Critical Path. 
:::

Die freie Pufferzeit ist ein Zeitraum, der verwendet werden kann, um die Dauer einer Aufgabe zu erhöhen oder sie auf der Zeitachse zu verschieben, ohne die nächste verknüpfte Aufgabe zu beeinflussen.

### Related API
- [getTotalSlack](api/method/gettotalslack.md)

### Related Guides
- [Kritischer Pfad](guides/critical-path.md#gettingfreeandtotalslack)
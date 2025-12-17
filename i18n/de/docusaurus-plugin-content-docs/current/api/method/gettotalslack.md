---
sidebar_label: getTotalSlack
title: getTotalSlack method
description: "gibt den Gesamtslack für eine Aufgabe zurück"
---

# getTotalSlack
:::info
 Diese Funktion ist nur in der PRO-Version verfügbar. 
:::
### Description

@short: Gibt den Gesamtslack für eine Aufgabe zurück

@signature: getTotalSlack: (task?: Task | string | number) =\> any

### Parameters
- `task` - (optional) *Task | string | number* - Angabe, das Aufgabenobjekt oder dessen ID


### Returns
- ` total_slack` - (number | object) - gibt den Gesamtslack einer Aufgabe zurück oder, falls der Parameter <i>task</i> nicht angegeben ist, ein Objekt, das Aufgaben-IDs ihren Gesamtslackwerten zuordnet

### Example

~~~jsx
var task = gantt.getTask(7);
gantt.getTotalSlack(task);

gantt.getTotalSlack(7);
~~~

### Related samples
- [Show Slack time](https://docs.dhtmlx.com/gantt/samples/08_api/17_show_task_slack.html)

### Details


:::note
 Diese Methode ist Teil der **critical_path** Erweiterung. Stellen Sie daher sicher, dass das [critical_path](guides/extensions-list.md#criticalpath) Plugin über die [gantt.plugins](api/method/plugins.md) Methode aktiviert ist. Weitere Informationen finden Sie im Artikel ["Kritischer Pfad"](guides/critical-path.md). 
:::


Der Gesamtslack gibt an, um wie viel die Dauer einer Aufgabe verlängert oder zeitlich verschoben werden kann, ohne den Abschluss des gesamten Projekts zu verzögern.

### Related API
- [getFreeSlack](api/method/getfreeslack.md)

### Related Guides
- ["Kritischer Pfad"](guides/critical-path.md#gettingfreeandtotalslack)


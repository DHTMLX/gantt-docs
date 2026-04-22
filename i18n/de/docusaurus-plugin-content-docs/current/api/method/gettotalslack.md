---
sidebar_label: getTotalSlack
title: getTotalSlack Methode
description: "liefert die Gesamtpufferzeit einer Aufgabe"
---

# getTotalSlack

:::info
Diese Funktionalität ist nur in der PRO-Edition verfügbar.
:::

### Description

@short: Gibt die Gesamtpufferzeit einer Aufgabe zurück

@signature: getTotalSlack: (task?: Task | string | number) =\> any

### Parameters

- `task`-	(optional) *Task | string | number*	-	optional, das Objekt einer Aufgabe oder deren ID

### Returns
- ` total_slack` - (number | object) - entweder die Gesamtpufferzeit einer Aufgabe oder, falls der <i>task</i>-Parameter nicht angegeben ist, ein Objekt mit Schlüssel-Wert-Paaren, wobei der Schlüssel die ID einer Aufgabe ist und der Wert die Gesamtpufferzeit der Aufgabe

### Example

~~~jsx
var task = gantt.getTask(7);
gantt.getTotalSlack(task);

gantt.getTotalSlack(7);
~~~

### Related samples
- [Slack-Zeit anzeigen](https://docs.dhtmlx.com/gantt/samples/08_api/17_show_task_slack.html)

### Details

:::note
Diese Methode ist in der **critical_path** Erweiterung definiert, daher müssen Sie das [critical_path](guides/extensions-list.md#critical-path) Plugin über die [gantt.plugins](api/method/plugins.md) Methode aktivieren. Lesen Sie die Details im Artikel [Critical Path](guides/critical-path.md) .
:::


Total slack ist ein Zeitraum, der verwendet werden kann, um die Dauer einer Aufgabe zu erhöhen oder sie auf der Timeline zu verschieben, ohne die Endzeit des gesamten Projekts zu beeinflussen.

### Related API
- [getFreeSlack](api/method/getfreeslack.md)

### Related Guides
- [Critical Path](guides/critical-path.md#gettingfreeandtotalslack)
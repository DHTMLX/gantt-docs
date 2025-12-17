---
sidebar_label: getConnectedGroup
title: getConnectedGroup method
description: "gibt alle Aufgaben und Verbindungen zurück, die mit einer bestimmten Aufgabe verbunden sind"
---

# getConnectedGroup

### Description

@short: Gibt alle Aufgaben und Verbindungen zurück, die mit einer bestimmten Aufgabe verbunden sind

@signature: getConnectedGroup: (id?: string | number) =\> any

### Parameters
- `id` - (optional) *string | number* - optionale ID einer Aufgabe

### Returns
- ` connections` - (object) - ein Objekt, das Aufgaben und Verbindungen enthält, die mit der angegebenen Aufgabe verbunden sind

### Example

~~~jsx
gantt.getConnectedGroup(18);
// => {links:["16", "17", "18"], tasks:[18, 17, 19, 20]}
~~~

### Details

Wenn diese Methode ohne Parameter aufgerufen wird, gibt sie alle Gruppen von Aufgaben und Verbindungen zurück, die Verknüpfungen bilden.

:::note
 Diese Funktionalität ist nur in der PRO-Version verfügbar. 
:::

:::note
 Die Methode erfordert das [auto_scheduling](guides/extensions-list.md#autoscheduling) Plugin, das auf der Seite eingebunden sein muss. 
:::

### Related Guides
- ["Auto Scheduling"](guides/auto-scheduling.md)

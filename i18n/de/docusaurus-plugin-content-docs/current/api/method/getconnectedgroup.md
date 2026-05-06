---
sidebar_label: getConnectedGroup
title: getConnectedGroup method
description: "gibt alle Aufgaben und Verknüpfungen zurück, mit denen eine Aufgabe verbunden ist"
---

# getConnectedGroup

:::info
Diese Funktionalität ist nur in der PRO-Edition verfügbar.
:::

### Description

@short: Gibt alle Aufgaben und Verknüpfungen zurück, mit denen eine Aufgabe verbunden ist

@signature: getConnectedGroup: (id?: string | number) =\> any

### Parameters
- `name` - (optional) *string | number* - die ID einer Aufgabe

### Returns
- ` connections` - (object) - ein Objekt mit Aufgaben und Links, mit denen eine Aufgabe verbunden ist

### Example

~~~jsx
gantt.getConnectedGroup(18);
// => {links:["16", "17", "18"], tasks:[18, 17, 19, 20]}
~~~

### Details

Ohne Parameter gibt die Methode alle Gruppen von Aufgaben und Links zurück, die Verbindungen zwischen Aufgaben herstellen.

:::note
 Die Methode erfordert das [auto_scheduling](guides/extensions-list.md#autoscheduling)-Plugin, das auf der Seite eingebunden sein muss. 
:::

### Related Guides
- [Auto Scheduling](guides/auto-scheduling.md)
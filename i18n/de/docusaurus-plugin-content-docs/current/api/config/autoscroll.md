---
sidebar_label: autoscroll
title: Autoscroll-Konfiguration
description: "aktiviert Autoscrolling, während Sie eine Aufgabe oder einen Link außerhalb des aktuellen Browserfensters ziehen"
--- 

# autoscroll

### Description

@short: Aktiviert Autoscrolling, während Sie eine Aufgabe oder einen Link außerhalb des aktuellen Browserfensters ziehen

@signature: autoscroll: boolean

### Example

~~~jsx
gantt.config.autoscroll = false;
gantt.init("gantt_here");
~~~

**Standardwert:** true


### Related samples
- [Arbeiten mit 30000 Aufgaben](https://docs.dhtmlx.com/gantt/samples/02_extensions/13_smart_rendering.html)

### Details

Beachten Sie, dass bis Version 7.1.11 Sie [die reservierten Ansichten und deren IDs für Scrollleisten] verwenden müssen, während Sie die **autoscroll**-Option verwenden. 

~~~js
// horizontal scrollbar:
{view: "scrollbar", id: "scrollHor"}
// vertical scrollbar:
{view: "scrollbar", id: "scrollVer"}
~~~

Wenn Sie andere Namen verwenden, funktionieren die Scrollleisten zwar, aber die "autoscroll" Funktionalität wird nicht funktionieren. 

Ab Version 7.1.11 können Sie beliebige Namen für Scrollleisten verwenden.

### Related API
- [autoscroll_speed](api/config/autoscroll_speed.md)

### Change log
- in Version 4.2 hinzugefügt
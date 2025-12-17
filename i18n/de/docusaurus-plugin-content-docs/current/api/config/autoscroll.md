---
sidebar_label: autoscroll
title: autoscroll config
description: "ermöglicht es dem Gantt-Diagramm, beim Ziehen einer Aufgabe oder eines Links über den sichtbaren Browserbereich hinaus automatisch zu scrollen"
---

# autoscroll

### Description

@short: Ermöglicht es dem Gantt-Diagramm, beim Ziehen einer Aufgabe oder eines Links über den sichtbaren Browserbereich hinaus automatisch zu scrollen

@signature: autoscroll: boolean

### Example

~~~jsx
gantt.config.autoscroll = false;
gantt.init("gantt_here");
~~~

**Default value:** true

### Related samples
- [Working with 30000 tasks](https://docs.dhtmlx.com/gantt/samples/02_extensions/13_smart_rendering.html)

### Details

Bis Version 7.1.11 war es erforderlich, [die reservierten Views und deren spezifische IDs für Scrollbars](guides/layout-config.md#requiredviewsandsettings) zu verwenden, wenn die **autoscroll**-Funktion aktiviert wurde.

~~~js
// horizontale Scrollbar:
{view: "scrollbar", id: "scrollHor"}
// vertikale Scrollbar:
{view: "scrollbar", id: "scrollVer"}
~~~

Die Verwendung anderer IDs zeigt zwar weiterhin die Scrollbars an, aber die autoscroll-Funktionalität funktioniert dann nicht korrekt.

Ab Version 7.1.11 können Scrollbars beliebige Namen haben, ohne dass dies autoscroll beeinträchtigt.

### Related API
- [autoscroll_speed](api/config/autoscroll_speed.md)

### Change log
- hinzugefügt in Version 4.2


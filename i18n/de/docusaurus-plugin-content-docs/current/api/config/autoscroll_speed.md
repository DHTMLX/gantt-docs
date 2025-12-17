---
sidebar_label: autoscroll_speed
title: autoscroll_speed config
description: "definiert, wie schnell das Autoscroll (in ms) erfolgt, wenn eine Aufgabe oder ein Link über die aktuelle Browseransicht hinaus gezogen wird"
---

# autoscroll_speed

### Description

@short: Definiert, wie schnell das Autoscroll (in ms) erfolgt, wenn eine Aufgabe oder ein Link über die aktuelle Browseransicht hinaus gezogen wird

@signature: autoscroll_speed: number

### Example

~~~jsx
gantt.config.autoscroll = true;
gantt.config.autoscroll_speed = 50;

gantt.init("gantt_here");
~~~

**Default value:** 30

### Details

eingeführt in Version 4.2

Die "autoscroll"-Funktion wird über die Option in [autoscroll](api/config/autoscroll.md) gesteuert.

### Related API
- [autoscroll](api/config/autoscroll.md)


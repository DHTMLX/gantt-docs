---
sidebar_label: autoscroll_speed
title: autoscroll_speed Konfiguration
description: "definiert die Geschwindigkeit des Autoscrollings (in ms), während eine Aufgabe oder ein Link außerhalb des aktuellen Browserfensters gezogen wird"
---

# autoscroll_speed

### Description

@short: Definiert die Geschwindigkeit des Autoscrollings (in ms), während das Ziehen einer Aufgabe oder eines Links außerhalb des aktuellen Browserfensters erfolgt

@signature: autoscroll_speed: number

### Example

~~~jsx
gantt.config.autoscroll = true;
gantt.config.autoscroll_speed = 50;

gantt.init("gantt_here");
~~~

**Standardwert:** 30


### Details

eingeführt in Version 4.2

Die Autoscroll-Funktionalität ist durch die Option autoscroll aktiviert.

### Related API
- [autoscroll](api/config/autoscroll.md)
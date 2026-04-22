---
sidebar_label: scroll_size
title: scroll_size Konfiguration
description: "Legen Sie die Größen der vertikalen (Breite) und horizontalen (Höhe) Scrollleisten fest"
---

# scroll_size

### Description

@short: Legen Sie die Größen der vertikalen (Breite) und horizontalen (Höhe) Scrollleisten fest

@signature: scroll_size: number

### Example

~~~jsx
gantt.config.scroll_size = 20;

gantt.init("gantt_here");
~~~

**Standardwert:** 15

### Details

Wenn nichts angegeben wird, verwendet Gantt die Standardbreite der Scrollleiste des Browsers, da die Stile des Scrollleisten-Elements je nach Browser variieren.
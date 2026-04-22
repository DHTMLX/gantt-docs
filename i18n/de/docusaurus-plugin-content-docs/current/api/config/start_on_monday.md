---
sidebar_label: start_on_monday
title: start_on_monday config
description: "setzt den Starttag der Woche fest"
---

# start_on_monday

### Description

@short: Legt den Starttag der Woche fest

@signature: start_on_monday: boolean

### Example

~~~jsx
// Wochen beginnen am Sonntag
gantt.config.start_on_monday = false;
gantt.init("gantt_here");
~~~

**Standardwert:** true

### Details

Wenn der Parameter auf true gesetzt ist, beginnt eine Woche am Montag (ansonsten am Sonntag).
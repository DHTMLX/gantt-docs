---
sidebar_label: start_on_monday
title: start_on_monday config
description: "legt den Starttag der Woche fest"
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

**Default value:** true

### Details

Wenn diese Option aktiviert ist (<i>true</i>), beginnt die Woche am Montag. Ist sie deaktiviert, startet die Woche stattdessen am Sonntag.

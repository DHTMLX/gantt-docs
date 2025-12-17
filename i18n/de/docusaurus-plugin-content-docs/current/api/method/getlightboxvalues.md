---
sidebar_label: getLightboxValues
title: getLightboxValues method
description: "ruft die Werte aus den Sektionen der Lightbox ab"
---

# getLightboxValues

### Description

@short: Ruft die Werte aus den Sektionen der Lightbox ab

@signature: getLightboxValues: () =\> any

### Returns
- ` obj` - (object) - ein Objekt, das die Werte enthält

### Example

~~~jsx
gantt.getLightboxValues();
~~~

### Details

Diese Methode liefert die Werte als Objekt mit *'section_name:value'*-Paaren

~~~js
const values = gantt.getLightboxValues();
~~~

~~~js
values = {
    duration: 2,
    end_date: Fri Apr 05 2013 00:00:00 GMT+0300 (GTB Daylight Time),
    start_date: Wed Apr 03 2013 00:00:00 GMT+0300 (GTB Daylight Time),
    text: "Task #2.1"
}
~~~

### Related Guides
- [getLightboxSection](api/method/getlightboxsection.md)


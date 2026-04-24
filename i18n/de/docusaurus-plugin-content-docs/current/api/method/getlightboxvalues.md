---
sidebar_label: getLightboxValues
title: getLightboxValues method
description: "liefert Werte der Abschnitte der Lightbox"
---

# getLightboxValues

### Description

@short: Liefert Werte der Abschnitte der Lightbox

@signature: getLightboxValues: () =\> any

### Returns
- ` obj` - (Objekt) - das Objekt der Werte

### Example

~~~jsx
gantt.getLightboxValues();
~~~

### Details

Die Methode gibt die Werte als Hash von *'section_name:value'* Paaren zurück 

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
---
sidebar_label: bar_height_padding
title: bar_height_padding config
description: "passt den Abstand rund um die Aufgabenbalken in der Timeline an, wenn `bar_height` auf 'voll' gesetzt ist"
---

# bar_height_padding

### Description

@short: Passt den Abstand rund um die Aufgabenbalken in der Timeline, wenn `bar_height` auf "voll" gesetzt ist

@signature: bar_height_padding: number

### Example

~~~jsx
gantt.config.bar_height_padding = 5;
gantt.init("gantt_here");
~~~

**Standardwert:** 9

### Details

Die `bar_height_padding`-Konfiguration legt den vertikalen Abstand der Aufgabenbalken in der Timeline fest, wenn `gantt.config.bar_height` auf "voll" gesetzt ist. Die Höhe eines Aufgabenbalkens berechnet sich als `gantt.config.row_height - gantt.config.bar_height_padding`. 

- Wenn diese Konfiguration auf `0` gesetzt wird, nehmen die Aufgabenbalken die volle Höhe der Zeile ein.
- Durch Erhöhen des Wertes wird mehr Platz oberhalb und unterhalb der Balken geschaffen.

Das folgende Beispiel zeigt einen kleineren Padding-Wert, der weniger Platz um die Aufgabenbalken herum lässt:

~~~js
gantt.config.bar_height_padding = 3;
~~~

![bar_height_padding_small](/img/bar_height_padding_small.png)

In diesem Beispiel lässt ein größerer Padding-Wert mehr freien Platz oberhalb und unterhalb der Aufgabenbalken entstehen:

~~~js
gantt.config.bar_height_padding = 14;
~~~

![bar_height_padding_large](/img/bar_height_padding_large.png)

### Related API
- [bar_height](api/config/bar_height.md)
- [row_height](api/config/row_height.md)

### Change log
- hinzugefügt in v9.0
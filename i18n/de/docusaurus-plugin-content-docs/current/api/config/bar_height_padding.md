---
sidebar_label: bar_height_padding
title: bar_height_padding config
description: "steuert den Abstand um Task-Bars in der Timeline, wenn `bar_height` auf 'full' gesetzt ist"
---

# bar_height_padding

### Description

@short: Steuert den Abstand um Task-Bars in der Timeline, wenn `bar_height` auf "full" gesetzt ist

@signature: bar_height_padding: number

### Example

~~~jsx
gantt.config.bar_height_padding = 5;
gantt.init("gantt_here");
~~~

**Default value:** 9

### Details

Die Einstellung `bar_height_padding` passt den vertikalen Abstand um die Task-Bars in der Timeline an, wenn `gantt.config.bar_height` auf "full" gesetzt ist. Die Höhe jeder Task-Bar wird berechnet als `gantt.config.row_height - gantt.config.bar_height_padding`.

- Wird dieser Wert auf `0` gesetzt, füllen die Task-Bars die gesamte Höhe der Zeile aus.
- Eine Erhöhung des Werts fügt mehr Abstand ober- und unterhalb der Task-Bars hinzu.

Das folgende Beispiel verwendet einen kleineren Padding-Wert, wodurch weniger Abstand um die Task-Bars entsteht:

~~~js
gantt.config.bar_height_padding = 3;
~~~

![bar_height_padding_small](/img/bar_height_padding_small.png)

In diesem Beispiel erzeugt ein größerer Padding-Wert mehr freien Raum ober- und unterhalb der Task-Bars:

~~~js
gantt.config.bar_height_padding = 14;
~~~

![bar_height_padding_large](/img/bar_height_padding_large.png)

### Related API
- [bar_height](api/config/bar_height.md)
- [row_height](api/config/row_height.md)

### Change log
- hinzugefügt in v9.0


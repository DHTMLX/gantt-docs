---
sidebar_label: scroll_size
title: scroll_size config
description: "gibt die Größe für die vertikalen (Breite) und horizontalen (Höhe) Scrollbars an"
---

# scroll_size

### Description

@short: Gibt die Größe für die vertikalen (Breite) und horizontalen (Höhe) Scrollbars an

@signature: scroll_size: number

### Example

~~~jsx
gantt.config.scroll_size = 20;

gantt.init("gantt_here");
~~~

**Default value:** 15

### Details

Wenn diese Einstellung nicht definiert ist, verwendet Gantt die standardmäßige Scrollbar-Breite des Browsers, da die Scrollbar-Stile je nach Browser variieren können.

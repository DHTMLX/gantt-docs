---
sidebar_label: smart_scales
title: smart_scales config
description: "gibt an, dass nur der sichtbare Teil der Zeitskala auf dem Bildschirm dargestellt wird"
---

# smart_scales

### Description

@short: Gibt an, dass nur der sichtbare Teil der Zeitskala auf dem Bildschirm dargestellt wird

@signature: smart_scales: boolean

### Example

~~~jsx
gantt.config.smart_scales = true;
~~~

**Default value:** true

### Details

eingeführt in Version 4.1

Das Aktivieren dieser Einstellung kann die Performance beim Rendern von Charts erheblich verbessern, insbesondere bei sehr langen Zeitskalen.

### Related Guides
- ["Performance: Möglichkeiten zur Verbesserung"](guides/performance.md#commontechniques)

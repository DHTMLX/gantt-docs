---
sidebar_label: smart_scales
title: smart_scales Konfiguration
description: "Bestimmt, dass nur der sichtbare Teil des Zeitrasters auf dem Bildschirm gerendert wird"
---

# smart_scales

### Description

@short: Bestimmt, dass nur der sichtbare Teil des Zeitrasters auf dem Bildschirm gerendert wird

@signature: smart_scales: boolean

### Example

~~~jsx
gantt.config.smart_scales = true;
~~~

**Standardwert:** true

### Details

Hinzugefügt in Version 4.1

Die Nutzung dieser Konfiguration beschleunigt das Rendern des Diagramms erheblich, wenn Sie eine sehr lange Zeitachse haben.

### Related Guides
- [Performance: Wege zur Verbesserung](guides/performance.md#common-techniques)
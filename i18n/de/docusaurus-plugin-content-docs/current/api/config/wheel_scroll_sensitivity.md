---
sidebar_label: wheel_scroll_sensitivity
title: wheel_scroll_sensitivity Konfiguration
description: "Bestimmt die Geschwindigkeit des Scrollens des Gantt-Diagramms mit dem Mausrad"
---

# wheel_scroll_sensitivity

### Description

@short: Bestimmt die Geschwindigkeit des Scrollens des Gantt-Diagramms mit dem Mausrad

@signature: wheel_scroll_sensitivity: undefined | number | \{ x?: number; y?: number; \}

### Example

~~~jsx
// scrollen mit doppelter Geschwindigkeit
gantt.config.wheel_scroll_sensitivity = 2;

// scrollen mit halber Geschwindigkeit
gantt.config.wheel_scroll_sensitivity = 0.5;

// oder mit unterschiedlichen Geschwindigkeiten auf verschiedenen Achsen scrollen
gantt.config.wheel_scroll_sensitivity = {
      x: 1,
      y: 0.5
};
~~~

**Default value:** undefined

### Details

Die Objektkonfiguration hat folgende Eigenschaften:

- **x** - (*number*) - die horizontale Geschwindigkeit
- **y** - (*number*) - die vertikale Geschwindigkeit

### Change log
- hinzugefügt in v7.0.11
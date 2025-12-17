---
sidebar_label: wheel_scroll_sensitivity
title: wheel_scroll_sensitivity config
description: "steuert, wie schnell das Gantt mit dem Mausrad scrollt"
---

# wheel_scroll_sensitivity

### Description

@short: Steuert, wie schnell das Gantt mit dem Mausrad scrollt

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

Dieses Konfigurationsobjekt enthält folgende Eigenschaften:

- **x** - (*number*) - steuert die horizontale Scrollgeschwindigkeit
- **y** - (*number*) - steuert die vertikale Scrollgeschwindigkeit

### Change log
- hinzugefügt in v7.0.11

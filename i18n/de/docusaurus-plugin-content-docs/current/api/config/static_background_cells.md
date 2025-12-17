---
sidebar_label: static_background_cells
title: static_background_cells config
description: "Ermöglicht das Rendern von hervorgehobenen Zellen bei Verwendung des static_background Modus"
---

# static_background_cells

### Description

@short: Ermöglicht das Rendern von hervorgehobenen Zellen bei Verwendung des static_background Modus

@signature: static_background_cells: boolean

### Example

~~~jsx
gantt.config.static_background_cells = false;
~~~

**Default value:** true

### Details

:::note
 Dieses Feature ist nur in der PRO Edition verfügbar. 
:::

Diese Einstellung arbeitet zusammen mit der [static_background](api/config/static_background.md) Konfiguration.
Wenn sowohl **static background** als auch **static_background_cells** aktiviert sind und gantt.config.static_background_cells auf true gesetzt ist (Standardwert), rendert gantt sowohl das PNG-Grid als auch die hervorgehobenen Zellen (jene, denen eine CSS-Klasse aus der timeline_cell_class Vorlage zugewiesen wurde).

~~~js
gantt.config.static_background = true;
gantt.config.static_background_cells = true; // standardmäßig aktiviert
~~~

Wenn **static_background** aktiviert, aber **static_background_cells** deaktiviert ist, rendert gantt nur das PNG-Grid, so wie es vor Version 6.2 der Fall war.

~~~js
gantt.config.static_background = true;
gantt.config.static_background_cells = false;
~~~

Wenn **static_background** deaktiviert ist, hat die Einstellung **static_background_cells** keine Auswirkung.

~~~js
gantt.config.static_background = false;
~~~

Diese Option kann verwendet werden, um das Verhalten von **static_background** auf die Version 6.1 zurückzusetzen.

### Related API
- [static_background](api/config/static_background.md)

### Change log
- Hinzugefügt in v6.2 zur Wahrung der Kompatibilität mit v6.1


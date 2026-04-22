---
sidebar_label: static_background_cells
title: static_background_cells Konfiguration
description: "Aktiviert das Rendering hervorgehobener Zellen im static_background-Modus"
---

# static_background_cells
:::info
 Diese Funktionalität ist ausschließlich in der PRO-Edition verfügbar. 
:::
### Description

@short: Aktiviert das Rendering hervorgehobener Zellen im static_background-Modus

@signature: static_background_cells: boolean

### Example

~~~jsx
gantt.config.static_background_cells = false;
~~~

**Standardwert:** true

### Details

Diese Konfiguration wird in Verbindung mit der [static_background](api/config/static_background.md) Konfiguration verwendet.
Wenn sowohl der **static_background**-Modus als auch **static_background_cells** aktiviert sind, 
gantt.config.static_background_cells = true(default), gantt wird sowohl das PNG-Gitter als auch hervorgehobene Zellen rendern (jene, denen vom timeline_cell_class template eine CSS-Klasse zugewiesen wird)

~~~js
gantt.config.static_background = true;
gantt.config.static_background_cells = true;// enabled by default
~~~

Wenn **static_background** aktiviert ist und **static_background_cells** deaktiviert ist, rendert gantt nur das PNG-Gitter, wie es in Versionen vor 6.2 funktioniert hat.

~~~js
gantt.config.static_background = true;
gantt.config.static_background_cells = false;
~~~

Wenn **static_background** deaktiviert ist, hat **static_background_cells** keinerlei Auswirkungen.

~~~js
gantt.config.static_background = false;
~~~

Diese Konfiguration kann verwendet werden, um **static_background** auf v6.1 zurückzusetzen.

### Related API
- [static_background](api/config/static_background.md)

### Change log
- hinzugefügt in v6.2 zur Kompatibilität mit v6.1
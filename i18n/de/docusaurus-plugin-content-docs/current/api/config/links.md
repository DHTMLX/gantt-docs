---
sidebar_label: Links
title: Link-Konfiguration
description: "Speichert die Typen der Link-Abhängigkeiten"
---

# Links

### Description

@short: Speichert die Typen der Link-Abhängigkeiten

@signature: links: \{ finish_to_start?: string | number; start_to_start?: string | number; finish_to_finish?: string | number; start_to_finish?: string | number; \}

### Example

~~~jsx
var type1 = gantt.config.links.finish_to_start;
~~~

**Standardwert:**\{ "finish_to_start":"0", "start_to_start":"1", "finish_to_finish":"2", "start_to_finish":"3" \}

### Details

- **finish_to_start** - (*string | number*) - Die Zielaufgabe kann nicht starten, bevor die Quellaufgabe endet (aber sie kann später starten).
- **start_to_start** - (*string | number*) - Die Zielaufgabe kann erst starten, nachdem die Quellaufgabe gestartet wurde (aber sie kann später starten).
- **finish_to_finish** - (*string | number*) - Die Zielaufgabe kann nicht enden, bevor die Quellaufgabe endet (aber sie kann später enden).
- **start_to_finish** - (*string | number*) - Die Zielaufgabe kann nicht enden, bevor die Quellaufgabe beginnt (aber sie kann später enden).

### Related Guides
- [Daten laden](guides/loading.md#dataproperties)
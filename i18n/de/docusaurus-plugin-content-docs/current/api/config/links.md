---
sidebar_label: links
title: links config
description: "Speichert die Typen von Link-Abhängigkeiten"
---

# links

### Description

@short: Speichert die Typen von Link-Abhängigkeiten

@signature: links: \{ finish_to_start?: string | number; start_to_start?: string | number; finish_to_finish?: string | number; start_to_finish?: string | number; \}

### Example

~~~jsx
var type1 = gantt.config.links.finish_to_start;
~~~

**Default value:** \{
  "finish_to_start":"0",
  "start_to_start":"1",
  "finish_to_finish":"2",
  "start_to_finish":"3"
\}

### Details

- **finish_to_start** - (*string | number*) - Die Zielaufgabe darf nicht starten, bevor die Quellaufgabe beendet ist, kann aber jederzeit danach beginnen.
- **start_to_start** - (*string | number*) - Die Zielaufgabe darf nicht starten, bevor die Quellaufgabe startet, kann aber später beginnen.
- **finish_to_finish** - (*string | number*) - Die Zielaufgabe darf nicht enden, bevor die Quellaufgabe endet, kann aber danach enden.
- **start_to_finish** - (*string | number*) - Die Zielaufgabe darf nicht enden, bevor die Quellaufgabe startet, kann aber später enden.

### Related Guides
- ["Datenladen"](guides/loading.md#dataproperties)

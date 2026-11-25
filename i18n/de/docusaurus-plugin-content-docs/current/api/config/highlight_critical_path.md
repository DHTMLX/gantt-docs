---
sidebar_label: highlight_critical_path
title: highlight_critical_path Konfiguration
description: "zeigt den kritischen Pfad im Diagramm an"
---

# highlight_critical_path

:::info
Diese Funktionalität ist nur in der PRO-Edition verfügbar.
:::

### Description

@short: Zeigt den kritischen Pfad im Diagramm an

@signature: highlight_critical_path: boolean

### Example

~~~jsx
gantt.config.highlight_critical_path = true; /*!*/

gantt.init("gantt_here");
~~~

**Standardwert:** false

### Related samples
- [Kritischer Pfad](https://docs.dhtmlx.com/gantt/samples/02_extensions/03_critical_path.html)

### Details

:::note
Diese Option ist in der **critical_path**-Erweiterung definiert, daher müssen Sie das [critical_path](guides/extensions-list.md#critical-path) Plugin aktivieren. Lesen Sie die Details im Artikel [Kritischer Pfad](guides/critical-path.md). 
:::

Solange die Option aktiviert ist, wird bei jeder Änderung einer Aufgabe oder Verknüpfung das gesamte Diagramm neu gezeichnet. Aktivieren Sie die Option bei großen Diagrammen nur dann, wenn Benutzer den kritischen Pfad sehen müssen, oder fassen Sie Änderungen mit [batchUpdate](api/method/batchupdate.md) zusammen.

### Related API
- [isCriticalTask](api/method/iscriticaltask.md)
- [isCriticalLink](api/method/iscriticallink.md)

### Related Guides
- [Kritischer Pfad](guides/critical-path.md)
- [Leistung: Wege zur Verbesserung](guides/performance.md#common-techniques)
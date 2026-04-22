---
sidebar_label: wai_aria_attributes
title: wai_aria_attributes Konfiguration
description: "Aktiviert WAI-ARIA-Unterstützung, damit die Komponente für Bildschirmleser erkennbar ist"
---

# wai_aria_attributes

### Description

@short: Aktiviert WAI-ARIA-Unterstützung, damit die Komponente für Bildschirmleser erkennbar ist

@signature: wai_aria_attributes: boolean

### Example

~~~jsx
gantt.config.wai_aria_attributes = true;
...
gantt.init("gantt_here");
~~~

**Standardwert:** true

### Details

Hinzugefügt in Version 4.1

### Related Guides
- [Accessibility](guides/accessibility.md#wai-aria-attributes)
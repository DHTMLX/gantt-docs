---
sidebar_label: wai_aria_attributes
title: wai_aria_attributes config
description: "aktiviert die WAI-ARIA-Unterstützung, sodass die Komponente von Screenreadern korrekt erkannt werden kann"
---

# wai_aria_attributes

### Description

@short: Aktiviert die WAI-ARIA-Unterstützung, sodass die Komponente von Screenreadern korrekt erkannt werden kann

@signature: wai_aria_attributes: boolean

### Example

~~~jsx
gantt.config.wai_aria_attributes = true;
...
gantt.init("gantt_here");
~~~

**Default value:** true

### Details

eingeführt in Version 4.1

### Related Guides
- ["Barrierefreiheit"](guides/accessibility.md#waiariaattributes)

---
sidebar_label: wai_aria_attributes
title: wai_aria_attributes config
description: "включает поддержку WAI-ARIA, чтобы компонент мог корректно распознаваться экранными читалками"
---

# wai_aria_attributes

### Description

@short: Включает поддержку WAI-ARIA, чтобы компонент мог корректно распознаваться экранными читалками

@signature: wai_aria_attributes: boolean

### Example

~~~jsx
gantt.config.wai_aria_attributes = true;
...
gantt.init("gantt_here");
~~~

**Default value:** true

### Details

введено в версии 4.1

### Related Guides
- [Доступность](guides/accessibility.md#waiariaattributes)

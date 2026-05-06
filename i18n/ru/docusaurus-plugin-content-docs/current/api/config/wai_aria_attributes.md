---
sidebar_label: wai_aria_attributes
title: wai_aria_attributes конфигурация
description: "Включает поддержку WAI-ARIA, чтобы компонент распознавался скринридерами"
---

# wai_aria_attributes

### Description

@short: Включает поддержку WAI-ARIA, чтобы компонент распознавался скринридерами

@signature: wai_aria_attributes: boolean

### Example

~~~jsx
gantt.config.wai_aria_attributes = true;
...
gantt.init("gantt_here");
~~~

**Значение по умолчанию:** true

### Details

добавлено в версии 4.1

### Related Guides
- [Доступность](guides/accessibility.md#wai-aria-attributes)
---
sidebar_label: license
title: license config
description: "возвращает название license dhtmlxGantt"
---

# license

### Description

@short: Возвращает название license dhtmlxGantt

@signature: license: string

### Returns
- ` license` - (string) - название license

### Example

~~~jsx
console.log(gantt.license);
// -> "enterprise"
~~~

### Details

Этот метод возвращает краткое название license, полезное для диагностических целей.

Возможные значения включают:

- "gpl"
- "evaluation"
- "individual"
- "commercial"
- "enterprise"
- "ultimate"
- "site"

### Change log
- добавлено в v6.2.2

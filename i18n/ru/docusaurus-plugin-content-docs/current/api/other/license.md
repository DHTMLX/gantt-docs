---
sidebar_label: license
title: license config
description: "возвращает название license dhtmlxGantt"
---

# license

### Description

@short: Возвращает имя лицензии dhtmlxGantt

@signature: license: string

### Returns
- ` license` - (string) - название лицензии

### Example

~~~jsx
console.log(gantt.license);
// -> "enterprise"
~~~

### Details

Этот метод возвращает краткое имя лицензии, которое можно использовать для диагностики. 

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
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

Этот метод возвращает короткое имя лицензии, которое можно использовать для диагностики. 

Possible values are:

- "mit" - бесплатная Community edition (v10 и позже)
- "gpl" - устаревшая бесплатная edition (v9.x и ранее)
- "evaluation" - оценочная лицензия
- "individual" - индивидуальная лицензия
- "commercial" - коммерческая лицензия
- "enterprise" - корпоративная лицензия
- "ultimate" - ультимативная лицензия
- "site" - лицензия на сайт

### Change log
- значение "mit" добавлено в версии v10.0
- добавлено в версии v6.2.2
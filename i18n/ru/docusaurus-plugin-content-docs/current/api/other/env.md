---
sidebar_label: env
title: env конфигурация
description: "набор флагов, описывающих текущую среду"
---

# env

### Description

@short: Набор флагов, описывающих текущую среду

@signature: env: any

### Example

~~~jsx
if (gantt.env.isEdge) {
    // your code
}
~~~

### Details

Возможные флаги:

- isChrome    - установлено в true, если браузер Chrome
- isSafari    - установлено в true, если браузер Safari
- isEdge    - установлено в true, если браузер Edge
- isSalesforce - установлено в true, если Gantt запускается внутри приложения SalesForce
- isFF        - установлено в true, если браузер Firefox
- isIE        - установлено в true, если браузер Internet Explorer
- isOpera    - установлено в true, если браузер Opera
- isIPad    - установлено в true, если браузер Safari на iPad

### Change log
- добавлено в версии 4.0
- обновлено в версии 9.0.11
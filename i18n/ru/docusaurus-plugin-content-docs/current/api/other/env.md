---
sidebar_label: env
title: env config
description: "коллекция флагов, указывающих на текущее окружение"
---

# env

### Description

@short: Коллекция флагов, указывающих на текущее окружение

@signature: env: any

### Example

~~~jsx
if (gantt.env.isEdge) {
    // ваш код
}
~~~

### Details

Вот флаги, с которыми вы можете столкнуться:

- isChrome    - true, если браузер Chrome
- isSafari    - true, если браузер Safari
- isEdge    - true, если браузер Edge
- isSalesforce - true, если Gantt запущен внутри приложения SalesForce
- isFF        - true, если браузер Firefox
- isIE        - true, если браузер Internet Explorer
- isOpera    - true, если браузер Opera
- isIPad    - true, если браузер Safari на iPad

### Change log
- добавлено в версии 4.0
- обновлено в 9.0.11

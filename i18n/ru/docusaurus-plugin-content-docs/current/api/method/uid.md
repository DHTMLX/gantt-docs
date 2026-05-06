---
sidebar_label: uid
title: uid метод
description: "возвращает уникальный id"
---

# uid

### Description

@short: Возвращает уникальный id

@signature: uid: () => number

### Returns
- ` id` - (number) - уникальный id

### Example

~~~jsx
var id = gantt.uid();
~~~

### Details

Сгенерированный id уникален для текущей страницы, но не глобально.
Поэтому вы можете использовать этот метод в логике на странице. Он не годится для использования в качестве идентификатора базы данных.

### Change log
- добавлено в версии 4.0
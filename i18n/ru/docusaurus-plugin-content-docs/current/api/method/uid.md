---
sidebar_label: uid
title: uid method
description: "возвращает уникальный id"
---

# uid

### Description

@short: Возвращает уникальный id

@signature: uid: () =\> number

### Returns
- ` id` - (number) - уникальный id

### Example

~~~jsx
var id = gantt.uid();
~~~

### Details

Сгенерированный id уникален в пределах текущей сессии страницы. 
Он подходит для использования в логике на странице, но не должен использоваться в качестве идентификатора в базе данных.

### Change log
- добавлено в версии 4.0

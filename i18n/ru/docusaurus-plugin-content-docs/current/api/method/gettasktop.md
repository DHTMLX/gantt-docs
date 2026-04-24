---
sidebar_label: getTaskTop
title: Метод getTaskTop
description: "получает верхнюю позицию DOM-элемента задачи на временной шкале"
---

# getTaskTop

### Description

@short: Получает верхнюю позицию DOM-элемента задачи на временной шкале

@signature: getTaskTop: (id: number | string) => number

### Parameters

- `id` - (обязательный) *number | string* - идентификатор задачи

### Returns
- `top` - (number) - положение CSS top у DOM-элемента задачи в пикселях

### Example

~~~jsx
gantt.getTaskTop(2);
~~~

### Related API
- [getTaskPosition](api/method/gettaskposition.md)
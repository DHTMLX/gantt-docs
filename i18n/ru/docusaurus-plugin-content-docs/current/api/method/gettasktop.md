---
sidebar_label: getTaskTop
title: getTaskTop method
description: "получает верхнюю позицию DOM-элемента задачи в области timeline"
---

# getTaskTop

### Description

@short: Получает верхнюю позицию DOM-элемента задачи в области timeline

@signature: getTaskTop: (id: number | string) =\> number

### Parameters

- `id` - (required) *number | string* -    ID задачи

### Returns
- ` top` - (number) - CSS-свойство top для DOM-элемента задачи в пикселях

### Example

~~~jsx
gantt.getTaskTop(2);
~~~

### Related API
- [getTaskPosition](api/method/gettaskposition.md)


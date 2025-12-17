---
sidebar_label: serialize
title: serialize method
description: "преобразует данные в формат JSON или XML"
---

# serialize

### Description

@short: Преобразует данные в формат JSON или XML

@signature: serialize: (type?: string) =\> any

### Parameters

- `type` - (optional) *string* - устанавливает формат для сериализации. <br> Возможные значения: 'json' (<i>по умолчанию</i>), 'xml'.

### Returns
- ` data` - (object) - возвращает объект данных gantt

### Example

~~~jsx
gantt.serialize('xml');
~~~

### Related API
- [parse](api/method/parse.md)

### Related Guides
- [Сериализация данных в XML и JSON](guides/serialization.md)
- [Поддерживаемые форматы данных](guides/supported-data-formats.md)


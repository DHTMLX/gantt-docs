---
sidebar_label: serialize
title: serialize method
description: "Сериализует данные в формат JSON или XML"
---

# serialize

### Description

@short: Сериализует данные в формат JSON или XML

@signature: serialize: (type?: string) => any

### Parameters

- `type` -	(optional) *string*   - 	формат, в который будут сериализованы данные. <br/> Возможные значения: 'json' (<i>default</i> ), 'xml'. 

### Returns
- `data` - (object) - объект данных диаграммы Ганта

### Example

~~~jsx
gantt.serialize('xml');
~~~

### Related API
- [parse](api/method/parse.md)

### Related Guides
- [Сериализация данных в XML и JSON](guides/serialization.md)
- [Поддерживаемые форматы данных](guides/supported-data-formats.md)
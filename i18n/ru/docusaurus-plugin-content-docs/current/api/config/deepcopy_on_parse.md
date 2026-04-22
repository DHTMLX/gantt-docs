---
sidebar_label: deepcopy_on_parse
title: deepcopy_on_parse config
description: "определяет, будет ли gantt выполнять глубокую копию объектов данных, переданных в метод gantt.parse()"
---

# deepcopy_on_parse

### Description

@short: Определяет, будет ли gantt выполнять глубокую копию объектов данных, переданных в метод gantt.parse()

@signature: deepcopy_on_parse: boolean

### Example

~~~jsx
gantt.config.deepcopy_on_parse = true;
~~~

**Default value:** false

### Details

- Если свойство установлено в *true*, gantt попытается выполнить глубокое копирование объектов данных, переданных в метод [gantt.parse](api/method/parse.md). В результате внутренние объекты данных gantt будут отделены от исходных объектов данных, и любые изменения, внесённые в gantt, не повлияют на исходный объект данных.
- Если свойство установлено в *false* (по умолчанию), gantt будет повторно использовать объекты данных, переданные в метод [gantt.parse](api/method/parse.md) (поверхностное копирование). Объекты будут соединены, и изменения, внесённые в gantt, будут применяться к исходному объекту данных.

### Change log
- добавлено в версии v7.1
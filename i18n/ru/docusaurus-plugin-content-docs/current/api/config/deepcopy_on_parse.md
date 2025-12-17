---
sidebar_label: deepcopy_on_parse
title: deepcopy_on_parse config
description: "управляет тем, создает ли gantt глубокую копию объектов данных, переданных в метод gantt.parse()"
---

# deepcopy_on_parse

### Description

@short: Управляет тем, создает ли gantt глубокую копию объектов данных, переданных в метод gantt.parse()

@signature: deepcopy_on_parse: boolean

### Example

~~~jsx
gantt.config.deepcopy_on_parse = true;
~~~

**Default value:** false

### Details

- Если установлено в *true*, gantt создает глубокую копию объектов данных, переданных в метод [gantt.parse](api/method/parse.md). Это означает, что внутренние объекты данных gantt отделены от исходных, и любые изменения внутри gantt не повлияют на исходные данные.
- Если установлено в *false* (по умолчанию), gantt использует те же объекты данных, что и в методе [gantt.parse](api/method/parse.md) (поверхностное копирование). В этом случае объекты остаются связанными, и изменения внутри gantt обновят исходные данные.

### Change log
- добавлено в версии v7.1


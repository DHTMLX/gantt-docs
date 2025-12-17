---
sidebar_label: oldxml
title: oldxml config
description: "обрабатывает сериализацию и парсинг XML формата в dhtmlxGantt 1.0"
---

# oldxml

### Description

@short: Обрабатывает сериализацию и парсинг XML формата в dhtmlxGantt 1.0

@signature: oldxml: any

### Example

~~~jsx
var obj = gantt.oldxml; // -> { parse(text,loader){...}, serialize(){... 
:::
~~~

### Details

Объект XML включает два основных метода:

- **parse()** - управляет тем, как dhtmlxGantt читает данные из XML формата.
- **serialize()** - управляет тем, как dhtmlxGantt преобразует данные обратно в XML формат.

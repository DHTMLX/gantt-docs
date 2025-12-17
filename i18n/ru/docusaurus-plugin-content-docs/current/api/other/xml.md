---
sidebar_label: xml
title: xml config
description: "определяет сериализацию и парсинг XML"
---

# xml

### Description

@short: Определяет сериализацию и парсинг XML

@signature: xml: any

### Example

~~~jsx
const obj = gantt.xml; // -> { parse(text,loader){...}, serialize(){... }}
~~~

### Details

Объект XML включает два основных метода:

- **parse()** метод - отвечает за то, как dhtmlxGantt читает и интерпретирует данные в формате XML.
- **serialize()** метод - управляет тем, как dhtmlxGantt преобразует данные обратно в формат XML.

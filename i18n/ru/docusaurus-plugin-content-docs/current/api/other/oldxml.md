---
sidebar_label: oldxml
title: oldxml config
description: "определяет сериализацию и разбор XML-формата dhtmlxGantt 1.0"
---

# oldxml

### Description

@short: Определяет сериализацию и разбор XML-формата dhtmlxGantt 1.0

@signature: oldxml: any

### Example

~~~jsx
const obj = gantt.oldxml; // -> { parse(text,loader){...}, serialize(){... }}
~~~

### Details

XML-объект содержит 2 элемента:

- **parse()** метод  - определяет, как dhtmlxGantt будет парсить данные в формате XML.
- **serialize()** метод - определяет, как dhtmlxGantt будет сериализовать данные в формате XML.
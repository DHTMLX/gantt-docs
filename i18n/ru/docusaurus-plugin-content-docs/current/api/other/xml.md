---
sidebar_label: xml
title: XML конфигурация
description: "задает сериализацию и разбор XML"
---

# XML

### Description

@short: Задаёт сериализацию и разбор XML

@signature: xml: any

### Example

~~~jsx
const obj = gantt.xml; // -> { parse(text,loader){...}, serialize(){... }}
~~~

### Details

Объект XML содержит 2 свойства:

- **parse()** метод  - определяет, как dhtmlxGantt будет парсить данные в формате XML.
- **serialize()** метод - определяет, как dhtmlxGantt будет сериализовать данные в формате XML.
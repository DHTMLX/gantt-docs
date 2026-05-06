---
sidebar_label: json
title: Конфигурация JSON
description: "определяет сериализацию и разбор JSON"
---

# json

### Description

@short: Определяет сериализацию и разбор JSON

@signature: json: any

### Example

~~~jsx
const obj = gantt.json; // -> { parse(data){... }}
~~~

### Details

Объект JSON содержит единственный член — метод **parse()**, который определяет, как dhtmlxGantt будет разбирать данные в формате JSON.
---
sidebar_label: oldxml
title: oldxml 설정
description: "dhtmlxGantt 1.0의 XML 형식으로의 직렬화 및 구문 분석을 지정합니다"
---

# oldxml

### Description

@short: dhtmlxGantt 1.0의 XML 형식으로의 직렬화 및 구문 분석을 지정합니다

@signature: oldxml: any

### Example

~~~jsx
const obj = gantt.oldxml; // -> { parse(text,loader){...}, serialize(){... }}
~~~

### Details

XML 객체에는 2개의 멤버가 포함되어 있습니다:

- **parse()** 메서드  - dhtmlxGantt가 XML 형식의 데이터를 구문 분석하는 방법을 정의합니다.
- **serialize()** 메서드 - dhtmlxGantt가 XML 형식으로 데이터를 직렬화하는 방법을 정의합니다.
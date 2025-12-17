---
sidebar_label: xml
title: xml config
description: "XML 직렬화 및 파싱 지정"
---

# xml

### Description

@short: XML 직렬화 및 파싱 지정

@signature: xml: any

### Example

~~~jsx
const obj = gantt.xml; // -> { parse(text,loader){...}, serialize(){... }}
~~~

### Details

XML 객체는 두 가지 주요 메서드를 포함합니다:

- **parse()** 메서드 - dhtmlxGantt가 XML 형식의 데이터를 읽고 해석하는 방식을 처리합니다.
- **serialize()** 메서드 - dhtmlxGantt가 데이터를 다시 XML 형식으로 변환하는 방식을 관리합니다.

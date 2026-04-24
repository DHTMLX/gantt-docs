---
sidebar_label: xml
title: XML 설정
description: "XML 직렬화 및 구문 분석을 지정합니다"
---

# XML

### Description

@short: XML 직렬화 및 구문 분석을 지정합니다

@signature: xml: any

### Example

~~~jsx
const obj = gantt.xml; // -> { parse(text,loader){...}, serialize(){... }}
~~~ 

### Details

- **parse()** 메서드 - dhtmlxGantt가 XML 형식의 데이터를 구문 분석하는 방법을 정의합니다.
- **serialize()** 메서드 - dhtmlxGantt가 XML 형식으로 데이터를 직렬화하는 방법을 정의합니다.
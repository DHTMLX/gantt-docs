---
sidebar_label: oldxml
title: oldxml config
description: "dhtmlxGantt 1.0에서 XML 포맷의 직렬화와 파싱을 처리합니다."
---

# oldxml

### Description

@short: DhtmlxGantt 1.0에서 XML 포맷의 직렬화와 파싱을 처리합니다.

@signature: oldxml: any

### Example

~~~jsx
var obj = gantt.oldxml; // -> { parse(text,loader){...}, serialize(){... 
:::
~~~

### Details

XML 객체는 두 가지 주요 메서드를 포함합니다:

- **parse()** - dhtmlxGantt가 XML 포맷에서 데이터를 읽는 방식을 관리합니다.
- **serialize()** - dhtmlxGantt가 데이터를 다시 XML 포맷으로 변환하는 방식을 관리합니다.

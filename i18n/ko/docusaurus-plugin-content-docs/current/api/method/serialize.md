---
sidebar_label: serialize
title: serialize method
description: "데이터를 JSON 또는 XML 형식으로 변환합니다."
---

# serialize

### Description

@short: 데이터를 JSON 또는 XML 형식으로 변환합니다.

@signature: serialize: (type?: string) =\> any

### Parameters

- `type` - (optional) *string* - 직렬화할 형식을 지정합니다. <br> 가능한 값: 'json' (<i>기본값</i> ), 'xml'.

### Returns
- ` data` - (object) - 간트 데이터 객체를 반환합니다.

### Example

~~~jsx
gantt.serialize('xml');
~~~

### Related API
- [parse](api/method/parse.md)

### Related Guides
- [데이터를 XML 및 JSON으로 직렬화하기](guides/serialization.md)
- [지원되는 데이터 형식](guides/supported-data-formats.md)


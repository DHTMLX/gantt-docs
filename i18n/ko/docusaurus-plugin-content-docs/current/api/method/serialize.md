---
sidebar_label: serialize
title: serialize 메서드
description: "데이터를 JSON 또는 XML 형식으로 직렬화합니다"
---

# serialize

### Description

@short: 데이터를 JSON 또는 XML 형식으로 직렬화합니다

@signature: serialize: (type?: string) => any

### Parameters

- `type` -	(optional) *string*   - 	데이터가 직렬화될 형식. <br/> 가능한 값: 'json' (<i>기본값</i> ), 'xml'. 

### Returns
- ` data` - (object) - gantt 데이터 객체

### Example

~~~jsx
gantt.serialize('xml');
~~~

### Related API
- [parse](api/method/parse.md)

### Related Guides
- [XML 및 JSON으로 데이터 직렬화](guides/serialization.md)
- [지원 가능한 데이터 포맷](guides/supported-data-formats.md)
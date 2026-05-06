---
sidebar_label: deepcopy_on_parse
title: deepcopy_on_parse 설정
description: "gantt가 gantt.parse() 메서드에 전달된 데이터 객체를 깊은 복사할지 여부를 정의합니다"
---

# deepcopy_on_parse

### Description

@short: gantt가 gantt.parse() 메서드에 전달된 데이터 객체를 깊은 복사할지 여부를 정의합니다

@signature: deepcopy_on_parse: boolean

### Example

~~~jsx
gantt.config.deepcopy_on_parse = true;
~~~

**Default value:** false

### Details

- 속성이 *true*로 설정되면, gantt는 [gantt.parse](api/method/parse.md) 메서드에 전달된 데이터 객체의 깊은 복사를 시도합니다. 그 결과, 내부의 gantt 데이터 객체는 원본 데이터 객체와 분리되며, gantt에 대한 변경은 원본 데이터 객체에 영향을 주지 않습니다.
- 속성이 *false* (기본값)로 설정되면, gantt는 [gantt.parse](api/method/parse.md) 메서드로 제공된 데이터 객체를 재사용합니다(얕은 복사). 객체들은 연결되며, gantt에 대한 변경은 원본 데이터 객체에 적용됩니다.

### Change log
- v7.1에서 추가되었습니다
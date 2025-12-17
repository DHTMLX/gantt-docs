---
sidebar_label: deepcopy_on_parse
title: deepcopy_on_parse config
description: "gantt.parse() 메서드에 전달된 데이터 객체를 gantt가 깊은 복사할지 여부를 제어합니다."
---

# deepcopy_on_parse

### Description

@short: Gantt.parse() 메서드에 전달된 데이터 객체를 gantt가 깊은 복사할지 여부를 제어합니다.

@signature: deepcopy_on_parse: boolean

### Example

~~~jsx
gantt.config.deepcopy_on_parse = true;
~~~

**Default value:** false

### Details

- *true*로 설정하면, gantt는 [gantt.parse](api/method/parse.md) 메서드에 전달된 데이터 객체를 깊은 복사합니다. 즉, 내부 gantt 데이터 객체가 원본과 분리되어 gantt 내부에서의 변경이 원본 데이터에 영향을 주지 않습니다.
- *false*로 설정하면 (기본값), gantt는 [gantt.parse](api/method/parse.md) 메서드에 전달된 동일한 데이터 객체(얕은 복사)를 사용합니다. 이 경우 객체들이 연결되어 있어 gantt 내부의 변경이 원본 데이터에 반영됩니다.

### Change log
- v7.1 버전에 추가됨


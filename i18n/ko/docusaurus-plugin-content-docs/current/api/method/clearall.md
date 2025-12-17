---
sidebar_label: clearAll
title: clearAll method
description: "Gantt 차트에서 모든 작업과 마커와 같은 추가 요소를 제거합니다."
---

# clearAll

### Description

@short: Gantt 차트에서 모든 작업과 마커와 같은 추가 요소를 제거합니다.

@signature: clearAll: () =\> void

### Example

~~~jsx
// Gantt 차트의 데이터를 다시 로드합니다.
gantt.load("url1");

gantt.clearAll(); /*!*/
gantt.load("url2");/*!*/
~~~

### Details

이 메서드는 [onClear](api/event/onclear.md) 이벤트를 트리거한다는 점을 기억하세요.

### Related API
- [onClear](api/event/onclear.md)

### Related Guides
- [작업의 기본 작업](guides/crud-task.md)


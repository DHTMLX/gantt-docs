---
sidebar_label: clearAll
title: clearAll 메서드
description: "간트 차트에서 모든 작업 및 추가 요소(마커 포함)를 제거합니다"
---

# clearAll

### Description

@short: 간트 차트에서 모든 작업 및 추가 요소(마커 포함)를 제거합니다

@signature: clearAll: () =\> void

### Example

~~~jsx
// 간트 차트의 데이터를 다시 불러옵니다
gantt.load("url1");

gantt.clearAll(); /*!*/
gantt.load("url2");/*!*/
~~~


### Details

참고: 이 메서드는 [onClear](api/event/onclear.md) 이벤트를 트리거합니다.

### Related API
- [onClear](api/event/onclear.md)

### Related Guides
- [작업의 기본 작업](guides/crud-task.md)


---
sidebar_label: destructor
title: destructor method
description: "간트 인스턴스를 정리합니다"
---

# destructor

### Description

@short: 간트 인스턴스를 정리합니다

@signature: destructor: () =\> void

### Example

~~~jsx
const myGantt = Gantt.getGanttInstance();

//간트 인스턴스 제거
myGantt.destructor();
~~~

### Details

이 메서드는 간트 인스턴스를 정리하고 [onDestroy](api/event/ondestroy.md) 이벤트를 트리거합니다.

destructor가 호출되면 다음 작업이 수행됩니다:

- 간트 인스턴스에 로드된 모든 데이터를 삭제합니다
- 간트에 연결된 [dataProcessor](api/method/dataprocessor.md)가 있다면 제거합니다
- 간트를 DOM에서 분리합니다
- [event](api/method/event.md) 메서드를 통해 추가된 모든 DOM 이벤트 핸들러를 제거합니다

:::note

GPL 또는 Individual 에디션과 같이 다중 간트 인스턴스를 지원하지 않는 패키지를 사용하는 경우, destructor를 호출하면 페이지가 새로고침될 때까지 간트를 사용할 수 없게 됩니다.
 
:::

### Related API
- [onDestroy](api/event/ondestroy.md)

### Related Guides
- [여러 개의 차트를 한 페이지에 표시하기](guides/multiple-gantts.md#destructorofganttanddataprocessorinstances)

### Change log
- 버전 5.1에 추가됨


---
title: "Gantt 인스턴스의 특이점"
sidebar_label: "Gantt 인스턴스의 특이점"
---

Gantt 인스턴스의 특이점
=========================

이 문서에서는 Gantt 인스턴스를 사용할 때의 핵심적인 사항들을 다룹니다.

여러 페이지, 탭 또는 뷰를 가진 애플리케이션을 구축하는 일반적인 시나리오를 살펴보겠습니다.

다음 방법은 Angular 기반(또는 React 기반) 애플리케이션에 적용되며, dhtmlxGantt의 Commercial, Enterprise, Ultimate 에디션에서만 사용할 수 있습니다(GPL 또는 Individual 에디션에서는 지원되지 않습니다):

- Gantt 차트가 포함된 페이지, 탭 또는 뷰를 열 때마다 새로운 Gantt 인스턴스를 생성해야 합니다.
- 다른 페이지, 탭 또는 뷰로 전환할 때, 현재 Gantt 인스턴스를 [destroy](guides/multiple-gantts.md#destructorofganttanddataprocessorinstances) 해야 합니다.

**또는** (이 방법은 모든 버전에서 동작합니다) 모든 것을 수동으로 초기화할 수도 있습니다. 



:::note
[예제](https://snippet.dhtmlx.com/5/abec296e0)를 확인해 보세요. 이 방식이 어떻게 구현될 수 있는지 보여줍니다. 


**Recreate Gantt** 버튼을 클릭하면 Gantt가 초기화되고, 작업이 로드되며, 이벤트가 연결됩니다. Gantt를 destroy 하면 해당 이벤트가 해제됩니다.
:::

이 수동 초기화 방식을 사용할 때 유의해야 할 중요한 사항들은 다음과 같습니다:

## 커스텀 이벤트

Gantt가 포함된 페이지가 로드될 때, 이벤트를 추가하기 전에 이벤트 ID를 배열에 저장하세요:

~~~js
const onTaskClick = gantt.attachEvent('onTaskClick', (id) => {
    gantt.message(`onTaskClick: Task ID: ${id}`);
    return true;
}, '');
eventIDs.push(onTaskClick);
~~~

다른 페이지로 전환할 때, 저장된 ID를 사용하여 이벤트를 수동으로 해제하세요:

~~~js
eventIDs.forEach(event => gantt.detachEvent(event));
eventIDs = [];
~~~

자세한 내용은 [이벤트 해제](guides/handling-events.md#detachingevents) 섹션을 참고하세요.

## Data Processor

[dataProcessor](api/method/dataprocessor.md)는 수동으로 destroy 해주어야 합니다:

~~~js
dp.destructor();
~~~

여기서 Gantt 인스턴스 자체가 아닌 dataProcessor만 destroy 해야 한다는 점에 유의하세요. Gantt를 destroy 하면 페이지를 새로 고치기 전까지 더 이상 사용할 수 없습니다.

## 작업, 링크, 리소스 데이터, 마커, 커스텀 단축키

이 항목들은 [clearAll()](api/method/clearall.md) 메서드를 사용하여 안전하게 Gantt 인스턴스에서 제거할 수 있습니다.

## Gantt 설정

Gantt 설정을 기본값으로 저장하거나 초기화하는 내장 옵션은 없습니다. 대부분의 설정은 [gantt.config](api/overview/properties-overview.md) 객체 내에 저장됩니다.

## CSS

커스텀 CSS를 추가했고 문제가 발생한다면, 수동으로 제거해야 합니다.

## 캘린더 설정

캘린더 설정은 [gantt.deleteCalendar()](api/method/deletecalendar.md) 메서드를 사용하여 수동으로 삭제해야 합니다.

## 기타 경우

위에서 언급한 사항 이외에도 추가적인 처리가 필요한 시나리오가 있을 수 있습니다. 하지만 이 방식으로 가능한 모든 경우가 완전히 테스트된 것은 아닙니다.


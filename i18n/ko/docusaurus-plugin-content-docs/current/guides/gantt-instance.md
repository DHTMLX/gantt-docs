---
title: "Gantt 인스턴스의 특이점"
sidebar_label: "Gantt 인스턴스의 특이점"
---

# Gantt 인스턴스의 특이점

이 문서는 Gantt 인스턴스 사용의 주요 특징에 대해 설명합니다.

가장 일반적인 경우를 살펴보겠습니다 — 여러 페이지/탭/뷰가 있는 애플리케이션을 구축하는 경우.  

다음 방법은 Angular 기반(또는 React 기반) 앱에 적용될 수 있으며, dhtmlxGantt의 Commercial, Enterprise 또는 Ultimate 버전에서만 사용할 수 있습니다(GPL 또는 Individual 에디션에서는 사용할 수 없습니다):

- Gantt가 있는 페이지/탭/뷰를 열 때 새 Gantt 인스턴스를 생성해야 합니다;
- 다른 페이지/탭/뷰로 전환할 때 [Gantt 인스턴스를 제거합니다](guides/multiple-gantts.md#destructorofganttanddataprocessorinstances).

대안적 방법(모든 버전에서 작동하는 방법)은 사용자가 모든 것을 직접 수동으로 재설정하는 것입니다.

:::note
다음 예제([example](https://snippet.dhtmlx.com/5/abec296e0))를 확인하여 이 방법이 어떻게 구현될 수 있는지 살펴보세요.

**Recreate Gantt** 버튼을 클릭하면 Gantt가 초기화되고, 작업이 로드되며, 이벤트가 연결됩니다. Gantt를 제거하면 이벤트가 분리됩니다.
:::

다음과 같이 이 방법을 사용할 때 염두에 두어야 할 항목이 있습니다:

## Custom events

Gantt가 있는 페이지를 로드할 때, 먼저 이벤트의 ID를 배열에 수동으로 저장한 다음에 추가해야 합니다:

~~~js
const onTaskClick = gantt.attachEvent('onTaskClick', (id) => {
    gantt.message(`onTaskClick: Task ID: ${id}`);
    return true;
}, '');
eventIDs.push(onTaskClick);
~~~

다른 페이지로 전환할 때는 배열에 저장한 ID를 사용하여 이벤트를 수동으로 분리해야 합니다:

~~~js
eventIDs.forEach(event => gantt.detachEvent(event));
eventIDs = [];
~~~

자세한 내용은 [Detaching events](guides/handling-events.md#detaching-events) 섹션을 참고하십시오.

## Data Processor

데이터 프로세서 [dataProcessor]를 수동으로 제거해야 합니다:

~~~js
dp.destructor();
~~~

데이터 프로세서만 제거해야 하며 Gantt는 제거하지 말아야 합니다. 그렇지 않으면 페이지를 다시 로드할 때까지 Gantt를 사용할 수 없게 됩니다.

## Tasks, links, resource data, markers, custom hotkeys 

다음 데이터를 Gantt 인스턴스에서 안전하게 제거하려면 [clearAll()](api/method/clearall.md) 메서드를 사용하세요.

## Gantt 구성

기본 설정을 저장하거나 기본값으로 재설정하는 내장 방법은 없습니다. Gantt 구성의 대부분은 [gantt.config](api/overview/properties-overview.md) 객체 안에 저장됩니다.

## CSS

사용자 정의 CSS를 추가했다면 문제가 발생하면 이를 수동으로 제거해야 합니다.

## Calendar settings

[gantt.deleteCalendar()](api/method/deletecalendar.md) 메서드를 사용하여 수동으로 제거해야 합니다.

## Other cases

위에 설명된 항목 이외에도 다른 옵션을 구현해야 할 수도 있지만, 이 접근 방식의 모든 가능한 시나리오를 아직 모두 테스트하지는 않았습니다.
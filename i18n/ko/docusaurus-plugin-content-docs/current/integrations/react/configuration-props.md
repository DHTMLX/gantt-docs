---
title: ReactGantt에서 DHTMLX Gantt 속성 사용
sidebar_label: 구성
description: "Gantt 구성, 템플릿, 이벤트 및 데이터 저장소에 매핑된 래퍼 props의 전체 참조"
---

# ReactGantt에서 DHTMLX Gantt 속성 사용

이 페이지는 React Gantt가 수용하는 props와 이들이 DHTMLX Gantt 기능에 어떻게 매핑되는지 설명합니다.

## 사용 가능한 Prop

<table>
  <thead>
  <tr>
  <th>속성</th>
  <th>유형</th>
  <th>설명</th>
  </tr>
  </thead>
  <tbody>
  <tr>
  <td>tasks</td>
  <td>Task[]</td>
  <td>작업 객체들의 배열([task objects](guides/supported-data-formats.md)).</td>
  </tr>
  <tr>
  <td>links</td>
  <td>Link[]</td>
  <td>링크 객체들의 배열([link objects](guides/supported-data-formats.md)).</td>
  </tr>
  <tr>
  <td>templates</td>
  <td>GanttTemplates</td>
  <td>[gantt.templates](api/other/templates.md)을 재정의합니다. 예: [task_text](api/template/task_text.md), [task_class](api/template/task_class.md), [scale_cell_class](api/template/scale_cell_class.md).</td>
  </tr>
  <tr>
  <td>config</td>
  <td>GanttConfig</td>
  <td>[gantt.config](api/overview/properties-overview.md)에 병합됩니다. 예: [scales_config](api/config/scales.md), [columns_config](api/config/columns.md), [autosize_config](api/config/autosize.md).</td>
  </tr>
  <tr>
  <td>calendars</td>
  <td>Calendar[]</td>
  <td>작업 캘린더 배열. 예: [Working Calendars](integrations/react/overview.md#working-calendars).</td>
  </tr>
  <tr>
  <td>resources</td>
  <td>Resource[]</td>
  <td>[resource objects](/guides/resource-management#manual-creation-of-data-store)의 배열.</td>
  </tr>
  <tr>
  <td>baselines</td>
  <td>Baseline[]</td>
  <td>[baseline objects](/guides/inbuilt-baselines#loading-baselines-with-tasks)의 배열.</td>
  </tr>
  <tr>
  <td>markers</td>
  <td>Marker[]</td>
  <td>[timeline markers](/guides/markers)을 위한 마커 객체 배열.</td>
  </tr>
  <tr>
  <td>plugins</td>
  <td>GanttPlugins</td>
  <td>[Gantt extensions](/guides/extensions-list/) 중 활성화가 필요한 것들(예: [critical_path](/guides/critical-path/), [auto_scheduling](/guides/auto-scheduling/)).</td>
  </tr>
  <tr>
  <td>data</td>
  <td>( load?: string, save?: string|RouterFunction, batchSave?: BatchChanges)</td>
  <td>내장 Gantt transport를 통한 데이터 로딩을 허용하고, Gantt 데이터에 대한 변경에 대한 콜백을 제공합니다.</td>
  </tr>
  <tr>
  <td>locale</td>
  <td>string</td>
  <td>[gantt.i18n.setLocale(locale)](/guides/localization/) 설정. 기본값은 "en".</td>
  </tr>
  <tr>
  <td>theme</td>
  <td>string</td>
  <td>[gantt.setSkin(theme)](/guides/skins/) 적용. 기본값은 "terrace".</td>
  </tr>
  <tr>
  <td>customLightbox</td>
  <td>ReactElement | null</td>
  <td>built-in Lightbox를 대체하는 React 컴포넌트(참조: [Custom Lightbox](/guides/custom-edit-form/).).</td>
  </tr>
  <tr>
  <td>inlineEditors</td>
  <td>( [editorType: string]: React.ComponentType )</td>
  <td>DHTMLX의 inline editor 인터페이스에 React 기반의 inline 에디터를 매핑할 수 있습니다.</td>
  </tr>
  <tr>
  <td>groupTasks</td>
  <td>GroupConfig | boolean | null</td>
  <td>그룹화 구성 객체 또는 그룹화를 비활성화하려면 false/null을 사용합니다([Grouping Tasks](api/method/groupby.md) 참조).</td>
  </tr>
  <tr>
  <td>filter</td>
  <td>((task: Task) =&gt; boolean) | null</td>
  <td>Gantt 태스크를 필터링하는 함수.</td>
  </tr>
  <tr>
  <td>resourceFilter</td>
  <td>((resource: Resource) =&gt; boolean) | null</td>
  <td>[Resource Panel](/guides/resource-management/)의 자원 필터링에 사용되는 함수.</td>
  </tr>
  <tr>
  <td>modals</td>
  <td>GanttModals</td>
  <td>onBeforeTaskDelete 및 onBeforeLinkDelete 모달을 커스텀 컴포넌트로 대체할 수 있습니다.</td>
  </tr>
  <tr>
  <td>(Event Props)</td>
  <td>Function</td>
  <td>래퍼는 또한 DHTMLX Gantt 이벤트에 해당하는 이벤트 핸들러 prop를 전달하는 것을 지원합니다. 예: onTaskClick, onAfterTaskAdd 등. prop 이름이 이벤트 이름과 일치하면 자동으로 연결됩니다.</td>
  </tr>
  </tbody>
</table>

## 사용 예

~~~jsx
<ReactGantt
  tasks={tasks}
  links={links}
  theme="material"
  locale="en"
  config={{
    scales: [
      { unit: "year", step: 1, format: "%Y" },
      { unit: "month", step: 1, format: "%M" }
    ],
    columns: [
      { name: "text", tree: true, width: '*' },
      { name: "start_date", align: "center" },
      { name: "duration", align: "center" },
      { name: "add" }
    ],
    // 원하는 다른 gantt.config 설정
  }}
  onTaskClick={(id, e) => {
    console.log('Task clicked:', id);
    return true; 
  }}
  templates={{
    task_text: (start, end, task) => `#${task.id}: ${task.text}`,
  }}
/>
~~~

## 이벤트 Prop 사용하기

다음과 같이 DHTMLX Gantt 이벤트에 해당하는 prop을 전달할 수 있습니다. 예를 들면:

~~~js
<ReactGantt

  onTaskClick={(id, e) => {
    console.log('Task clicked:', id);
    return true; 
  }}

/>
~~~
내부적으로 래퍼는 `onBeforeTaskAdd`라는 prop를 전달받으면 [gantt.attachEvent("onBeforeTaskAdd", handler)](api/method/attachevent.md)을 호출합니다. 전체 이벤트 목록은 [DHTMLX Gantt API](api/overview/events-overview.md)를 참조하십시오.


## Props와 DHTMLX API의 결합

`@dhx/react-gantt` 라이브러리는 일상적으로 가능한 한 선언형으로 설계되어 있습니다. 대부분의 사용 사례는 기본 props(예: tasks, links, resources, templates 등)로 해결될 수 있습니다. 그러나 아래와 같이 Gantt 엔진에 더 깊이 접근해야 하는 시나리오가 있을 수 있습니다.

- [근무 시간 계산](guides/working-time.md)
- [자동 스케줄링](guides/auto-scheduling.md) 로직 또는 [리소스 계산](guides/resource-management.md)과 같은 고급 기능
- [Gantt API](api/api-overview.md)의 특수 메서드 호출

이럴 때 underlying DHTMLX Gantt 기능에 접근하기 위한 두 가지 보조 방법이 있습니다:

- 래퍼가 제공하는 React 훅을 사용하여 Gantt의 데이터 저장소와 스케줄링 로직을 연결하는 방법
- 내장 훅이 모든 요구를 커버하지 않을 때 `ref`를 통해 Gantt 인스턴스에 직접 접속하는 방법

### 내장 훅 사용

`@dhx/react-gantt` 라이브러리는 내부 Gantt API와 React 컴포넌트를 연결하는 선택적 훅들을 제공합니다. 이 훅들은 Gantt의 기본 메서드와 데이터 저장소에 대한 '브리지'를 제공합니다. 컴포넌트에서 직접 호출하거나 자신만의 커스텀 훅으로 재구성하여 자원 히스토그램과 같은 특수 기능에 사용할 수 있습니다.

#### useGanttDatastore&lt;T&gt;(ganttRef, storeName)

`useGanttDatastore` 훅은 특정 Gantt 데이터 저장소에 읽기 전용으로 접근합니다.
주로 자원 저장소, 베이스라인 또는 다른 내장 또는 커스텀 저장소에 접근하는 경우가 많습니다.

다음 함수들을 제공합니다:

- `getItem(id)` - 데이터 저장소에서 지정된 아이템을 반환
- `getItems()` - 지정된 데이터 저장소의 모든 아이템을 반환
- `hasChild(id: string | number)` - 아이템이 자식을 가지는지 확인
- `getChildren(id: string | number)` - 자식 아이템들을 조회

~~~js
import { useMemo } from 'react';
import { useGanttDatastore } from '@dhx/react-gantt';

function MyResourceList({ ganttRef }) {
  const resourceStore = useGanttDatastore(ganttRef, 'resource');

  const resourceIds = resourceStore.getItems().map(item => item.id);

  // 예시로 데이터 로깅
  useMemo(() => {
    console.log('Resource IDs:', resourceIds);
  }, [resourceIds]);

  return null; 
}
~~~

특정 데이터 저장소에서 직접적인 로우레벨 데이터가 필요할 때 이 훅을 사용할 수 있습니다. 예를 들어 자원이 그룹인지 개별 항목인지 확인할 때 유용합니다.

#### useResourceAssignments(ganttRef)

`useResourceAssignments` 훅은 자원과 연관된 메서드를 노출합니다. 예를 들어 자원에 대한 할당을 가져오거나 주어진 태스크에 할당된 자원을 열거하는 기능을 제공합니다.

다음 함수들을 제공합니다:

- `getResourceAssignments(resourceId, taskId?)` - 브리지 to [](api/method/getresourceassignments.md)
- `getTaskResources(taskId)` - 브리지 to [](api/method/gettaskresources.md)

~~~js
import React from 'react';
import { useResourceAssignments } from '@dhx/react-gantt';

export function ResourceUsage({ ganttRef, taskId }) {
  const { getTaskResources } = useResourceAssignments(ganttRef);

  const resources = getTaskResources(taskId);
  return (
    <div>
      Task {taskId} assigned to: 
      {resources.map(r => r.text).join(', ')}
    </div>
  );
}
~~~

이 훅은 예를 들어 자원 사용에 대한 커스텀 로직(할당 시간 계산, 소유자별 그룹화 등)에 필요할 수 있습니다.

#### useWorkTime(ganttRef)

내장된 DHTMLX Gantt 작업 시간 기능에 대한 직접 브리지를 제공합니다. 예: [](api/method/isworktime.md), [](api/method/calculateenddate.md), [](api/method/calculateduration.md).

작업 캘린더 설정에 따라 근무/비근무 시간을 강조 표기하고 날짜 연산에도 이 훅이 필요합니다.

다음 함수들을 제공합니다:

- `isWorkTime({ date:Date, unit?: string, task?:Task })` - 브리지 to [](api/method/isworktime.md)
- `calculateEndDate({start:Date, duration:number, unit?: string, task?: Task})` - 브리지 to [](api/method/calculateenddate.md)
- `calculateDuration({start:Date, end:Date, task?: Task})` - 브리지 to [](api/method/calculateduration.md)
- `getClosestWorkTime({ date:Date, unit?: string, task?: Task, dir?: "past"|"future" })` - 브리지 to [](api/method/getclosestworktime.md)


~~~js
import { useEffect, useRef, useState } from 'react';
import ReactGantt, {GanttTemplates, useWorkTime} from "@dhx/react-gantt";
import "@dhx/react-gantt/dist/react-gantt.css";

export default function GanttTemplatesDemo() {
  const ganttRef = useRef<ReactGanttRef>(null);

  const { isWorkTime }= useWorkTime(ganttRef);
  ...
  const templates: GanttTemplates = {
    timeline_cell_class: (task: Task, date: Date) => {
      return isWorkTime({date, task}) ? "" : "weekend";
    }
  };
  ...
~~~

#### 커스텀 훅으로 훅 합치기

좋은 관행은 이 기본 브리지 훅을 사용하여 도메인별 또는 프로젝트별 고유 훅을 만드는 것입니다. 예를 들어 자원 히스토그램을 만들고자 한다면 용량 값을 캐시하고 자원 사용량을 합산하는 커스텀 훅을 만들 수 있습니다:

~~~js
import { useMemo } from 'react';
import { useGanttDatastore, useResourceAssignments } from '@dhx/react-gantt';

export function useResourceHistogram(ganttRef) {
  const resourceStore = useGanttDatastore(ganttRef, 'resource');
  const { getResourceAssignments } = useResourceAssignments(ganttRef);

  // 커스텀 로직: 용량 캐싱, 그룹 탐지 등
  // ...
  return {
    // 예: getCapacity, getAllocatedValue
  };
}
~~~

### ref를 사용한 Gantt 인스턴스에 직접 접근

이 훅들이 대부분의 고급 요구를 다루지만, 전체 Gantt 인스턴스에 직접 접근하고자 하는 경우가 여전히 있을 수 있습니다. 이 경우 ref 방식을 사용할 수 있습니다:

~~~jsx
import React, { useRef, useEffect } from 'react';
import ReactGantt, { ReactGanttRef } from '@dhx/react-gantt';

export function DirectRefExample({ tasks, links }) {
  const ganttRef = useRef<ReactGanttRef>(null);

  useEffect(() => {
    const gantt = ganttRef.current?.instance;
    if (!gantt) return;

    // 여기에 ANY Gantt API 메서드를 호출할 수 있습니다
    console.log('All tasks:', gantt.getTaskByTime());
    gantt.showDate(new Date());
  }, []);

  return (
    <ReactGantt
      ref={ganttRef}
      tasks={tasks}
      links={links}
    />
  );
}
~~~

:::note
info 작업/링크를 React props로도 공급하는 경우 동기화를 유지하거나 데이터를 재구성해야 합니다를 유의하십시오.
:::

원격으로 prop으로 노출되지 않는 작업을 수행하고 싶다면 Gantt 메서드를 직접 호출할 수 있습니다. 자세한 내용은 [Accessing the Underlying Gantt API](integrations/react/overview.md#accessingtheunderlyingganttapi)를 참조하십시오.
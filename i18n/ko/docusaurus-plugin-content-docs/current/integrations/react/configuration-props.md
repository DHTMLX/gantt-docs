---
title: "DHTMLX Gantt 속성의 ReactGantt 사용법"
sidebar_label: "구성"
---

DHTMLX Gantt 속성의 ReactGantt 사용법
===============

이 페이지에서는 React Gantt에서 지원하는 props와 이들이 DHTMLX Gantt 기능과 어떻게 연결되는지에 대해 설명합니다.

사용 가능한 Props
-----------------

<table>
  <thead>
    <tr>
      <th>Prop</th>
      <th>Type</th>
      <th>설명</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>tasks</td>
      <td>Task[]</td>
      <td>[task 객체](guides/supported-data-formats.md#json)의 배열입니다.</td>
    </tr>
    <tr>
      <td>links</td>
      <td>Link[]</td>
      <td>[link 객체](guides/supported-data-formats.md#json)의 배열입니다.</td>
    </tr>
    <tr>
      <td>templates</td>
      <td>GanttTemplates</td>
      <td>[gantt.templates](api/overview/templates-overview.md)를 오버라이드합니다. 예시: [task_text](api/template/task_text.md), [task_class](api/template/task_class.md), [scale_cell_class](api/template/scale_cell_class.md) 등.</td>
    </tr>
    <tr>
      <td>config</td>
      <td>GanttConfig</td>
      <td>[gantt.config](api/overview/properties-overview.md)에 병합됩니다. 예시: [scales](api/config/scales.md), [columns](api/config/columns.md), [autosize](api/config/autosize.md) 등.</td>
    </tr>
    <tr>
      <td>resources</td>
      <td>Resource[]</td>
      <td>[resource 객체](guides/resource-management.md)의 배열입니다.</td>
    </tr>
    <tr>
      <td>baselines</td>
      <td>Baseline[]</td>
      <td>[baseline 객체](guides/inbuilt-baselines.md)의 배열입니다.</td>
    </tr>
    <tr>
      <td>markers</td>
      <td>Marker[]</td>
      <td>[타임라인 마커](guides/markers.md)를 위한 marker 객체의 배열입니다.</td>
    </tr>
    <tr>
      <td>plugins</td>
      <td>GanttPlugins</td>
      <td>활성화해야 하는 [Gantt 확장](guides/extensions-list.md)입니다. 예: [critical_path](guides/critical-path.md), [auto_scheduling](guides/auto-scheduling.md) 등.</td>
    </tr>
    <tr>
      <td>data</td>
      <td>( load?: string, save?: string|RouterFunction, batchSave?: BatchChanges)</td>
      <td>내장 Gantt transport를 통한 데이터 로딩을 지원하며, Gantt 데이터 변경 시 콜백을 제공합니다.</td>
    </tr>
    <tr>
      <td>locale</td>
      <td>string</td>
      <td>[gantt.i18n.setLocale(locale)](guides/localization.md)를 설정합니다. 기본값은 "en"입니다.</td>
    </tr>
    <tr>
      <td>theme</td>
      <td>string</td>
      <td>[gantt.setSkin(theme)](guides/skins.md)을 적용합니다. 기본값은 "terrace"입니다.</td>
    </tr>
    <tr>
      <td>customLightbox</td>
      <td>ReactElement | null</td>
      <td>기본 Lightbox를 대체하는 React 컴포넌트입니다. (자세한 내용은 [Custom Lightbox](guides/custom-edit-form.md) 참고)</td>
    </tr>
    <tr>
      <td>inlineEditors</td>
      <td>( [editorType: string]: React.ComponentType )</td>
      <td>React 기반 인라인 에디터를 DHTMLX의 인라인 에디터 인터페이스에 매핑할 수 있습니다.</td>
    </tr>
    <tr>
      <td>groupTasks</td>
      <td>GroupConfig | boolean | null</td>
      <td>그룹화 구성을 지정하거나 false 또는 null로 비활성화할 수 있습니다. ([Grouping Tasks](api/method/groupby.md) 참고)</td>
    </tr>
    <tr>
      <td>filter</td>
      <td>((task: Task) =&gt; boolean) | null</td>
      <td>표시할 Gantt 태스크를 필터링하는 함수입니다.</td>
    </tr>
    <tr>
      <td>resourceFilter</td>
      <td>((resource: Resource) =&gt; boolean) | null</td>
      <td>[Resource Panel](guides/resource-management.md)에 표시되는 리소스를 필터링합니다.</td>
    </tr>
    <tr>
      <td>modals</td>
      <td>GanttModals</td>
      <td><code>onBeforeTaskDelete</code> 및 <code>onBeforeLinkDelete</code> 모달을 사용자 정의 컴포넌트로 대체할 수 있습니다.</td>
    </tr>
    <tr>
      <td>(Event Props)</td>
      <td>Function</td>
      <td>DHTMLX Gantt 이벤트와 일치하는 이벤트 핸들러 props를 지원합니다. 예: onTaskClick, onAfterTaskAdd 등. 이름이 일치하는 props는 자동으로 연결됩니다.</td>
    </tr>
  </tbody>
</table>

사용 예시
-------------------

~~~js
<ReactGantt
  tasks="{tasks}"
  links="{links}"
  theme="material"
  locale="en"
  config="{" {
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
    // 원하는 기타 gantt.config 항목
  } }
  onTaskClick="{(id," e) => {
    console.log('Task clicked:', id);
    return true; 
  }}
  templates="{" {
    task_text: (start, end, task) => `#${task.id}: ${task.text}`,
  } }
/>
~~~

이벤트 Props 사용하기
----------------

모든 DHTMLX Gantt 이벤트는 prop으로 전달할 수 있습니다. 예시:

~~~js
<ReactGantt

  onTaskClick="{(id," e) => {
    console.log('Task clicked:', id);
    return true; 
  }}

/>
~~~
`onBeforeTaskAdd`와 같은 prop을 제공하면, 래퍼는 내부적으로 [gantt.attachEvent("onBeforeTaskAdd", handler)](api/method/attachevent.md)를 호출합니다. 전체 이벤트 목록은 [DHTMLX Gantt API](api/overview/events-overview.md)를 참고하세요.


Props와 DHTMLX API의 결합 사용
---------------

`@dhx/react-gantt` 라이브러리는 일상적인 사용에서 최대한 선언적으로 동작하도록 설계되었으며, tasks, links, resources, templates 등과 같은 표준 props로 대부분의 요구사항을 충족합니다. 하지만, 다음과 같은 더 깊은 Gantt 엔진 접근이 필요한 상황도 있습니다:

- [작업 시간 계산](guides/working-time.md)
- [자동 스케줄링](guides/auto-scheduling.md) 또는 [리소스 계산](guides/resource-management.md)과 같은 고급 기능
- [Gantt API](api/api-overview.md)의 특정 메서드 사용

이런 경우, DHTMLX Gantt 기능에 직접 접근할 수 있는 두 가지 방법이 있습니다:

- Gantt의 데이터 저장소 및 스케줄링 로직에 연결되는 **React hooks** 사용

- hooks로 커버되지 않는 요구사항이 있을 경우, `ref`를 통한 **Gantt 인스턴스 직접 접근**

### 내장 hooks 사용하기

`@dhx/react-gantt` 라이브러리는 React 컴포넌트를 내부 Gantt API에 연결할 수 있는 여러 선택적 hook을 제공합니다. 이 hook들은 Gantt의 메서드 및 데이터 저장소에 접근할 수 있는 다리 역할을 합니다. 컴포넌트 내에서 직접 사용하거나, 리소스 히스토그램 등 특정 기능을 위한 커스텀 hook으로 조합할 수 있습니다.

#### useGanttDatastore\<T\>(ganttRef, storeName)

`useGanttDatastore` hook은 특정 Gantt 데이터 저장소에 대한 읽기 전용 접근을 제공합니다. 주로 리소스 저장소, 베이스라인, 기타 내장 또는 커스텀 저장소에 접근할 때 사용됩니다.

다음과 같은 함수가 포함되어 있습니다:

- `getItem(id)` - 저장소에서 특정 항목을 조회

- `getItems()` - 저장소의 모든 항목 반환

- `hasChild(id: string | number)` - 항목에 자식이 있는지 확인

- `getChildren(id: string | number)` - 자식 항목 가져오기

~~~js
import { useMemo } from 'react';
import { useGanttDatastore } from '@dhx/react-gantt';

function MyResourceList({ ganttRef }) {
  const resourceStore = useGanttDatastore(ganttRef, 'resource');

  const resourceIds = resourceStore.getItems().map(item => item.id);

  // 예시로 데이터를 로그로 출력
  useMemo(() => {
    console.log('Resource IDs:', resourceIds);
  }, [resourceIds]);

  return null; 
}
~~~

이 hook은 특정 데이터 저장소의 저수준 데이터에 직접 접근해야 할 때 유용하며, 예를 들어 리소스가 그룹인지 개인인지 판별할 수 있습니다.

#### useResourceAssignments(ganttRef)

`useResourceAssignments` hook은 리소스 관련 메서드를 제공합니다. 예를 들어, 특정 리소스에 할당된 작업 조회 또는 작업에 할당된 리소스 목록을 가져올 수 있습니다.

다음과 같은 함수가 제공됩니다:

- `getResourceAssignments(resourceId, taskId?)` - [getResourceAssignments](api/method/getresourceassignments.md)에 해당

- `getTaskResources(taskId)` - [getTaskResources](api/method/gettaskresources.md)에 해당

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

이 hook은 리소스 사용량 계산, 소유자별 작업 그룹화 등 리소스 활용에 관한 커스텀 로직 구현 시 유용합니다.

#### useWorkTime(ganttRef)

이 hook은 [isWorkTime](api/method/isworktime.md), [calculateEndDate](api/method/calculateenddate.md), [calculateDuration](api/method/calculateduration.md) 등 DHTMLX Gantt의 내장 작업 시간 함수에 접근할 수 있습니다.

Gantt의 작업 시간 캘린더 설정에 따라 근무 시간/비근무 시간을 강조하거나, 근무 캘린더에 맞춘 날짜 계산을 할 때 유용합니다.

제공 함수:

- `isWorkTime(( date:Date, unit?: string, task?:Task ))` - [isWorkTime](api/method/isworktime.md)에 해당

- `calculateEndDate((start:Date, duration:number, unit?: string, task?: Task))` - [calculateEndDate](api/method/calculateenddate.md)에 해당

- `calculateDuration((start:Date, end:Date, task?: Task))` - [calculateDuration](api/method/calculateduration.md)에 해당

- `getClosestWorkTime(( date:Date, unit?: string, task?: Task, dir?: "past"|"future" ))` - [getClosestWorkTime](api/method/getclosestworktime.md)에 해당

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

#### 커스텀 hook으로 조합하기

이러한 기본 hook들을 조합하여 도메인 또는 프로젝트별 커스텀 hook을 만드는 것이 권장됩니다. 예를 들어, 리소스 히스토그램을 만들기 위해 용량 캐싱 및 리소스 사용량 합산 로직을 포함한 커스텀 hook을 만들 수 있습니다:

~~~js
import { useMemo } from 'react';
import { useGanttDatastore, useResourceAssignments } from '@dhx/react-gantt';

export function useResourceHistogram(ganttRef) {
  const resourceStore = useGanttDatastore(ganttRef, 'resource');
  const { getResourceAssignments } = useResourceAssignments(ganttRef);

  // 커스텀 로직: 용량 캐싱, 그룹 판별 등
  // ...
  return {
    // 예시: getCapacity, getAllocatedValue
  };
}
~~~

### ref를 통한 Gantt 인스턴스 직접 접근

hooks로 대부분의 고급 요구사항을 충족할 수 있지만, 전체 Gantt 인스턴스에 직접 접근하려면 `ref`를 사용할 수 있습니다:

~~~js
import React, { useRef, useEffect } from 'react';
import ReactGantt, { ReactGanttRef } from '@dhx/react-gantt';

export function DirectRefExample({ tasks, links }) {
  const ganttRef = useRef<ReactGanttRef>(null);

  useEffect(() => {
    const gantt = ganttRef.current?.instance;
    if (!gantt) return;

    // 여기서 Gantt의 모든 API 메서드를 호출할 수 있습니다
    console.log('All tasks:', gantt.getTaskByTime());
    gantt.showDate(new Date());
  }, []);

  return (
    <ReactGantt
      ref="{ganttRef}"
      tasks="{tasks}"
      links="{links}"
    />
  );
}
~~~

:::info
 tasks나 links를 React props로 제공하면서 Gantt 인스턴스에서 직접 수정하는 경우, 동기화하거나 데이터를 다시 파싱해야 합니다. 그렇지 않으면 React의 다음 렌더링 시 수동 변경사항이 덮어써질 수 있습니다. 
:::

props로 처리할 수 없는 동작이 필요하다면, gantt 메서드를 직접 호출하는 것도 가능합니다. 자세한 내용은 [Accessing the Underlying Gantt API](integrations/react.md#accessingtheunderlyingganttapi)를 참고하세요.


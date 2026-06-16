---
title: "리액트 Gantt 훅 모음"
sidebar_label: "훅"
description: "DHTMLX Gantt를 위한 내장 React 훅 모음 - 이벤트 구독, 리소스 할당, 되돌리기/다시 실행, 확대/축소, 선택, 데이터스토어, 그리고 작업 시간 계산."
---

# React Gantt Hooks

`@dhx/react-gantt` 래퍼는 컴포넌트를 Gantt의 내부 API와 연결해 주는 일련의 React 훅을 제공합니다. 이 훅들은 Gantt 인스턴스에 직접 접근할 필요 없이 동작합니다. 이 훅들은 라이프사이클 관리를 자동으로 처리합니다 - 구독은 마운트 시 생성되고 언마운트 시 정리됩니다.

모든 훅은 `ganttRef` 매개변수를 받습니다 - `ReactGantt` 컴포넌트에 대한 React ref 입니다:

~~~tsx
import { useRef } from 'react';
import ReactGantt, { ReactGanttRef } from '@dhx/react-gantt';

function MyGanttApp() {
  const ganttRef = useRef<ReactGanttRef>(null);

  // 모든 훅에 ganttRef 전달
  return <ReactGantt ref={ganttRef} tasks={tasks} links={links} />;
}
~~~

## useGanttEvent

자동 라이프사이클 관리가 가능한 Gantt 이벤트 구독. 마운트 시 핸들러를 연결하고 언마운트 시 연결을 해제합니다.

~~~ts
import { useGanttEvent } from '@dhx/react-gantt';
~~~

**시그니처:**
~~~ts
useGanttEvent(ganttRef, eventName, handler, options?)
~~~

**매개변수:**

- `ganttRef` - ReactGantt 컴포넌트에 대한 ref
- `eventName` - Gantt 이벤트 이름(예: `'onAfterTaskUpdate'`, `'onStoreUpdated'`)
- `handler` - 콜백 함수
- `options.target` - *(선택적)* Gantt 인스턴스에서 이벤트 소스를 해석하는 접근자 함수. 생략하면 이벤트가 Gantt 인스턴스 자체에 연결됩니다.

`attachEvent`/`detachEvent`를 구현하는 모든 객체와 잘 작동합니다 - Gantt 인스턴스, 확장, 데이터스토어, UI 모듈:

~~~tsx
import { useGanttEvent } from '@dhx/react-gantt';

function MyComponent({ ganttRef }) {
  // Gantt 인스턴스 이벤트 (기본 대상)
  useGanttEvent(ganttRef, 'onAfterTaskUpdate', (id, task) => {
    console.log('Task updated:', id);
  });

  // 확장 이벤트 - 대상 접근자 전달
  useGanttEvent(ganttRef, 'onAfterZoom', (level) => {
    console.log('Zoomed to level:', level);
  }, { target: (gantt) => gantt.ext.zoom });

  // 데이터스토어 이벤트
  useGanttEvent(ganttRef, 'onStoreUpdated', () => {
    console.log('Resource store changed');
  }, { target: (gantt) => gantt.getDatastore('resource') });

  return null;
}
~~~

이벤트나 대상이 사용 가능하지 않으면(예: 플러그인이 활성화되지 않음) 훅은 조용히 아무 것도 하지 않습니다.

## useResourceAssignments

Gantt의 리소스 할당 및 리소스 관리 메서드에 접근합니다.

~~~ts
import { useResourceAssignments } from '@dhx/react-gantt';
~~~

**반환 값:**

- `getResourceAssignments(resourceId, taskId?)` - [](api/method/getresourceassignments.md)으로의 브릿지. 리소스에 대한 할당을 반환하며, 필요 시 태스크로 필터링합니다.
- `getTaskResources(taskId)` - [](api/method/gettaskresources.md)으로의 브릿지. 태스크에 할당된 고유 리소스를 반환합니다.
- `getTaskAssignments(taskId)` - [](api/method/gettaskassignments.md)으로의 브릿지. 태스크에 대한 모든 할당을 반환합니다.
- `getAllResources()` - 리소스 데이터스토어의 모든 항목을 반환합니다.
- `setTaskAssignments(taskId, assignments)` - 특정 태스크의 모든 할당을 교체합니다. 각 할당은 `resource_id`를 가져야 하며, 필요 시 `value`도 포함할 수 있습니다.

~~~tsx
import { useResourceAssignments } from '@dhx/react-gantt';

function ResourcePanel({ ganttRef, taskId }) {
  const { getTaskAssignments, getAllResources, setTaskAssignments } = 
    useResourceAssignments(ganttRef);

  const assignments = getTaskAssignments(taskId);
  const resources = getAllResources();

  function reassign() {
    setTaskAssignments(taskId, [
      { resource_id: 1, value: 8 },
      { resource_id: 3, value: 4 }
    ]);
  }

  return (
    <div>
      <p>Assigned: {assignments.map(a => a.resource_id).join(', ')}</p>
      <p>Available: {resources.map(r => r.text).join(', ')}</p>
      <button onClick={reassign}>Reassign</button>
    </div>
  );
}
~~~

## useGanttDatastore

읽기 전용으로 Gantt의 데이터스토어에 접근합니다 - 작업, 링크, 리소스, 할당, 기준선, 혹은 커스텀 스토어 등.

~~~ts
import { useGanttDatastore } from '@dhx/react-gantt';
~~~

**시그니처:**
~~~ts
const store = useGanttDatastore<T>(ganttRef, storeName)
~~~

**반환 값:**

- `getItem(id)` - ID로 단일 아이템을 반환
- `getItems()` - 모든 아이템을 반환
- `hasChild(id)` - 트리 데이터스토어에서 자식이 있는지 확인
- `getChildren(id)` - 자식 ID를 반환(트리 데이터스토어)
- `eachItem(callback)` - 데이터스토어의 모든 아이템을 순회
- `find(filter)` - predicate 함수와 일치하는 아이템을 반환
- `count()` - 전체 아이템 수를 반환
- `exists(id)` - 아이템이 존재하는지 확인

~~~tsx
import { useGanttDatastore, ResourceItem } from '@dhx/react-gantt';

function ResourceList({ ganttRef }) {
  const store = useGanttDatastore<ResourceItem>(ganttRef, 'resource');

  // 모든 리프(비그룹) 리소스 찾기
  const individuals = store.find(r => !store.hasChild(r.id));

  // 모든 리소스 순회
  store.eachItem(resource => {
    console.log(resource.text, store.hasChild(resource.id) ? '(group)' : '');
  });

  return (
    <ul>
      {individuals.map(r => <li key={r.id}>{r.text}</li>)}
    </ul>
  );
}
~~~

## useUndoRedo

Undo/Redo 스택의 상태를 추적하고 액션을 제공합니다. 작업 및 링크 변경 이벤트를 자동으로 구독하여 상태를 최신 상태로 유지합니다.

~~~ts
import { useUndoRedo } from '@dhx/react-gantt';
~~~

**반환 값:**

- `canUndo` - `boolean`, Undo 스택이 비어 있지 않으면 true
- `canRedo` - `boolean`, Redo 스택이 비어 있지 않으면 true
- `undo()` - Undo 작업 수행
- `redo()` - Redo 작업 수행

Undo 플러그인이 활성화되지 않으면 반환되는 상태는 비활성화 상태(`canUndo: false, canRedo: false`)입니다.

~~~tsx
import { useUndoRedo } from '@dhx/react-gantt';

function UndoRedoButtons({ ganttRef }) {
  const { canUndo, canRedo, undo, redo } = useUndoRedo(ganttRef);

  return (
    <div>
      <button onClick={undo} disabled={!canUndo}>Undo</button>
      <button onClick={redo} disabled={!canRedo}>Redo</button>
    </div>
  );
}
~~~

:::note
이 훅이 작동하려면 Undo 플러그인이 `plugins` prop에서 활성화되어 있어야 합니다:
~~~tsx
<ReactGantt plugins={{ undo: true }} ... />
~~~
:::

## useZoom

타임라인의 확대/축소 레벨을 관리하고 현재 줌 상태를 추적합니다. 줌 확장 기능을 자동으로 초기화합니다.

~~~ts
import { useZoom } from '@dhx/react-gantt';
~~~

**시그니처:**
~~~ts
const zoom = useZoom(ganttRef, levels?)
~~~

**매개변수:**

- `ganttRef` - ReactGantt 컴포넌트에 대한 ref
- `levels` - *(선택적)* 줌 레벨 구성의 배열. 기본적으로 5개의 내장 레벨: Day, Week, Month, Quarter, Year.

**반환 값:**

- `currentLevel` - 활성 줌 레벨의 이름
- `levels` - 줌 레벨 구성
- `zoomIn()` - 더 상세한 레벨로 확대
- `zoomOut()` - 덜 상세한 레벨로 축소
- `setLevel(name)` - 이름으로 특정 줌 레벨로 이동

~~~tsx
import { useZoom } from '@dhx/react-gantt';

function ZoomControls({ ganttRef }) {
  const { currentLevel, levels, zoomIn, zoomOut, setLevel } = useZoom(ganttRef);

  return (
    <div>
      <button onClick={zoomOut}>-</button>
      <select value={currentLevel} onChange={e => setLevel(e.target.value)}>
        {levels.map(l => (
          <option key={l.name} value={l.name}>{l.label || l.name}</option>
        ))}
      </select>
      <button onClick={zoomIn}>+</button>
    </div>
  );
}
~~~

맞춤 줌 레벨을 제공할 수 있습니다:

~~~tsx
const customLevels = [
  {
    name: 'sprint',
    label: 'Sprint (2 weeks)',
    scale_height: 60,
    min_column_width: 70,
    scales: [
      { unit: 'month', step: 1, format: '%F %Y' },
      { unit: 'week', step: 2, format: 'Sprint %W' },
    ],
  },
  // ...더 많은 레벨
];

const zoom = useZoom(ganttRef, customLevels);
~~~

## useSelection

Gantt 차트에서 현재 선택된 태스크를 추적합니다.

~~~ts
import { useSelection } from '@dhx/react-gantt';
~~~

**반환 값:**

- `selectedId` - 현재 선택된 태스크의 ID, 아무 것도 선택되지 않으면 `null`

~~~tsx
import { useSelection } from '@dhx/react-gantt';

function TaskDetails({ ganttRef }) {
  const { selectedId } = useSelection(ganttRef);

  if (!selectedId) return <p>태스크를 선택해 세부 정보를 확인하세요.</p>;

  return <p>선택된 태스크: {selectedId}</p>;
}
~~~

## useWorkTime

Gantt의 내장 작업 시간 계산 기능에 연결합니다. 비작업 시간 하이라이트 및 작업 달력에 맞춘 날짜 연산에 사용합니다.

~~~ts
import { useWorkTime } from '@dhx/react-gantt';
~~~

**반환 값:**

- `isWorkTime({ date, unit?, task? })` - [](api/method/isworktime.md)으로의 브릿지
- `calculateEndDate({ start, duration, unit?, task? })` - [](api/method/calculateenddate.md)으로의 브릿지
- `calculateDuration({ start, end, task? })` - [](api/method/calculateduration.md)으로의 브릿지
- `getClosestWorkTime({ date, unit, task?, dir? })` - [](api/method/getclosestworktime.md)으로의 브릿지

~~~tsx
import ReactGantt, { GanttTemplates, ReactGanttRef, useWorkTime } from '@dhx/react-gantt';

function GanttWithWeekends() {
  const ganttRef = useRef<ReactGanttRef>(null);
  const { isWorkTime } = useWorkTime(ganttRef);

  const templates: GanttTemplates = {
    timeline_cell_class: (task, date) => {
      return isWorkTime({ date, task }) ? '' : 'weekend';
    }
  };

  return <ReactGantt ref={ganttRef} templates={templates} tasks={tasks} />;
}
~~~

## Composing hooks

도메인 특화 훅을 내장 훅을 조합해 만듭니다. 예를 들어 리소스 히스토그램 훅:

~~~ts
import { useMemo, useCallback } from 'react';
import { useGanttDatastore, useResourceAssignments, useWorkTime } from '@dhx/react-gantt';

export function useResourceHistogram(ganttRef) {
  const resourceStore = useGanttDatastore(ganttRef, 'resource');
  const { getResourceAssignments } = useResourceAssignments(ganttRef);
  const { isWorkTime } = useWorkTime(ganttRef);

  const isGroupResource = useCallback((resource) => {
    return resourceStore.hasChild(resource.id);
  }, [resourceStore]);

  const getAllocatedValue = useCallback((tasks, resource) => {
    return tasks.reduce((sum, task) => {
      const assignments = getResourceAssignments(resource.id, task.id);
      return sum + assignments.reduce((acc, a) => acc + Number(a.value), 0);
    }, 0);
  }, [getResourceAssignments]);

  const getCapacity = useCallback((date, resource) => {
    if (isGroupResource(resource)) return -1;
    return isWorkTime({ date }) ? 8 : 0;
  }, [isGroupResource, isWorkTime]);

  return { getAllocatedValue, getCapacity, isGroupResource };
}
~~~

## Direct access to Gantt instance

훅이 대부분의 고급 요구를 처리하더라도, ref를 통해 전체 Gantt 인스턴스에 직접 접근할 수 있습니다:

~~~tsx
import { useRef, useEffect } from 'react';
import ReactGantt, { ReactGanttRef } from '@dhx/react-gantt';

function DirectRefExample({ tasks, links }) {
  const ganttRef = useRef<ReactGanttRef>(null);

  useEffect(() => {
    const gantt = ganttRef.current?.instance;
    if (!gantt) return;
    gantt.showDate(new Date());
  }, []);

  return <ReactGantt ref={ganttRef} tasks={tasks} links={links} />;
}
~~~

:::note
직접 Gantt 인스턴스를 통해 작업이나 링크를 수정하는 동안 React props로 전달하는 경우, 두 소스의 상태를 동기화해 두는 것이 좋습니다. 그렇지 않으면 다음 React 리렌더링 시 수동 변경이 덮어씌워질 수 있습니다.
:::
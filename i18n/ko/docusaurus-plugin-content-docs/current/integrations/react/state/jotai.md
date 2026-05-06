--- 
title: React Gantt를 Jotai와 함께 사용하기  
sidebar_label: Jotai  
description: "Gantt 작업, 선, 리소스를 Jotai 원자에 저장하고 save 콜백을 통해 이를 업데이트하는 방법. React Gantt를 위한 최소한의 유연한 상태 관리 접근 방식." 
---

# React Gantt - Jotai 튜토리얼

이 튜토리얼은 Vite로 React TypeScript 애플리케이션을 만들고, DHTMLX React Gantt 컴포넌트를 통합하며, Jotai로 상태를 관리하는 과정을 안내합니다.

## 사전 준비

- React, TypeScript, Vite, 그리고 Jotai에 대한 기본 지식
- 권장: 데이터 바인딩 모드와 이 튜토리얼이 기반으로 하는 `data.save` 콜백을 이해하기 위해 [](integrations/react/state/state-management-basics.md) 를 읽으세요.

## 빠른 설정 - 프로젝트 생성

시작하기 전에 Node.js를 설치하세요: https://nodejs.org/en/

Vite React + TypeScript 프로젝트를 생성합니다:

~~~bash  
npm create vite@latest react-gantt-jotai-demo -- --template react-ts  
cd react-gantt-jotai-demo  
~~~

이제 필요한 의존성을 설치합니다.

* For **npm**: 

~~~bash
npm install jotai @mui/material @mui/icons-material @emotion/react @emotion/styled
~~~  

* For **yarn**:

~~~bash
yarn add jotai @mui/material @mui/icons-material @emotion/react @emotion/styled
~~~

그다음 React Gantt 패키지를 설치합니다. 

### Installing React Gantt

React Gantt 설치는 [React Gantt 설치 가이드](integrations/react/installation.md)에 설명되어 있습니다.

이 튜토리얼에서는 평가 패키지를 사용합니다:

~~~bash
npm install @dhtmlx/trial-react-gantt
~~~

또는

~~~bash
yarn add @dhtmlx/trial-react-gantt
~~~

Professional 패키지를 이미 사용 중인 경우 명령과 import에서 `@dhtmlx/trial-react-gantt`를 `@dhx/react-gantt`로 교체하십시오.

이제 dev 서버를 시작합니다:

~~~bash
npm run dev 
~~~

이제 (http://localhost:5173) 에서 React 프로젝트가 실행 중일 것입니다.

:::note
Gantt가 본문 전체 공간을 차지하도록 하려면 src 폴더에 있는 App.css의 기본 스타일을 제거하고 다음 스타일을 추가해야 합니다:

~~~css  
#root { 
  margin: 0; 
  padding: 0; 
  height: 100%; 
  width: 100%; 
} 
~~~  
:::
  
## 샘플 데이터 및 구성 설정

간트 차트용 초기 데이터를 포함하는 샘플 데이터를 `src/seed/Seed.ts`에 생성합니다:

~~~ts
import type { SerializedTask, Link, GanttConfig } from '@dhtmlx/trial-react-gantt';

export type ZoomLevel = 'day' | 'month' | 'year';

export const defaultZoomLevels: NonNullable<GanttConfig['zoom']> = { 
  current: 'day', 
  levels: [ 
  { name: 'day', scale_height: 27, min_column_width: 80, scales: [{ unit: 'day', step: 1, format: '%d %M' }] }, 
  { name: 'month', scale_height: 50, min_column_width: 120, scales: [{ unit: 'month', format: '%F, %Y' }, { unit: 'week', format: 'Week #%W' }] }, 
  { name: 'year', scale_height: 50, min_column_width: 30, scales: [{ unit: 'year', step: 1, format: '%Y' }] }, 
  ], 
};

export const seedTasks: SerializedTask[] = [ 
  { id: 1, text: 'Office itinerancy', type: 'project', start_date: new Date(2025, 3, 2).toISOString(), duration: 17, progress: 0.4, parent: 0, open: true }, 
  { id: 2, text: 'Office facing', type: 'project', start_date: new Date(2025, 3, 2).toISOString(), duration: 8, progress: 0.6, parent: 1, open: true }, 
  { id: 3, text: 'Furniture installation', type: 'project', start_date: new Date(2025, 3, 11).toISOString(), duration: 8, progress: 0.6, parent: 1, open: true }, 
  { id: 4, text: 'The employee relocation', type: 'project', start_date: new Date(2025, 3, 13).toISOString(), duration: 5, progress: 0.5, parent: 1, priority: 3, open: true }, 
  { id: 5, text: 'Interior office', type: 'task', start_date: new Date(2025, 3, 3).toISOString(), duration: 7, progress: 0.6, parent: 2, priority: 1 }, 
  { id: 6, text: 'Air conditioners check', type: 'task', start_date: new Date(2025, 3, 3).toISOString(), duration: 7, progress: 0.6, parent: 2, priority: 2 }, 
  { id: 7, text: 'Workplaces preparation', type: 'task', start_date: new Date(2025, 3, 12).toISOString(), duration: 8, progress: 0.6, parent: 3 }, 
  { id: 8, text: 'Preparing workplaces', type: 'task', start_date: new Date(2025, 3, 14).toISOString(), duration: 5, progress: 0.5, parent: 4, priority: 1 }, 
  { id: 9, text: 'Workplaces importation', type: 'task', start_date: new Date(2025, 3, 21).toISOString(), duration: 4, progress: 0.5, parent: 4 }, 
  { id: 10, text: 'Workplaces exportation', type: 'task', start_date: new Date(2025, 3, 27).toISOString(), duration: 3, progress: 0.5, parent: 4, priority: 2 }
];

export const seedLinks: Link[] = [ 
  { id: 2, source: 2, target: 3, type: '0' },
  { id: 3, source: 3, target: 4, type: '0' },
  { id: 7, source: 8, target: 9, type: '0' }
]; 
~~~  

## 제어 도구 모음(툴바) 컴포넌트 만들기

이제 `src/components/Toolbar.tsx`에 **Toolbar** 컴포넌트를 추가합니다.

이 컴포넌트는 사용자에게 간트 차트의 일반 컨트롤에 빠르게 접근할 수 있는 기능을 제공합니다. 예를 들어 *day*, *month*, 및 *year* 뷰 간의 확대/축소와 실행 취소/다시 실행 작업을 제공합니다.

~~~tsx
import Divider from '@mui/material/Divider';  
import ButtonGroup from '@mui/material/ButtonGroup';  
import UndoIcon from '@mui/icons-material/Undo';  
import RedoIcon from '@mui/icons-material/Redo';  
import Button from '@mui/material/Button';  
import type { ZoomLevel } from '../seed/Seed';

export interface ToolbarProps {  
  onUndo?: () => void;  
  onRedo?: () => void;  
  onZoom?: (level: ZoomLevel) => void;  
  currentZoom?: ZoomLevel;  
}

export default function Toolbar({ onUndo, onRedo, onZoom, currentZoom = 'month' }: ToolbarProps) {  
  return (  
    <div style={{ display: 'flex', justifyContent: 'start', padding: '10px 10px 20px', gap: '10px' }}>  
      <ButtonGroup>  
        <Button onClick={() => onUndo?.()}>  
          <UndoIcon />  
        </Button>  
        <Button onClick={() => onRedo?.()}>  
          <RedoIcon />  
        </Button>  
      </ButtonGroup>  
      <Divider orientation="vertical"></Divider>  
      <ButtonGroup>  
        <Button onClick={() => onZoom?.('day')} variant={currentZoom === 'day' ? 'contained' : 'outlined'}>  
          Day  
        </Button>  
        <Button onClick={() => onZoom?.('month')} variant={currentZoom === 'month' ? 'contained' : 'outlined'}>  
          Month  
        </Button>  
        <Button onClick={() => onZoom?.('year')} variant={currentZoom === 'year' ? 'contained' : 'outlined'}>  
          Year  
        </Button>  
      </ButtonGroup>  
    </div>  
  );  
}
~~~  

Material UI의 Button, ButtonGroup, Divider 및 아이콘을 사용해 간단하고 깔끔한 툴바 레이아웃을 만들어 간트 차트에 직관적인 컨트롤을 제공합니다.

툴바는 Jotai 기반 저장소와 매끄럽게 통합되도록 다음 선택적 속성들을 수락합니다:

- `onUndo`와 `onRedo` - 실행 취소/다시 실행 로직을 트리거하는 콜백  
- `onZoom` - 사용자가 확대/축소 버튼을 클릭할 때 확대/축소 수준을 업데이트하는 콜백  
- `currentZoom` - 현재 활성화된 확대/축소 수준을 나타내어 선택된 버튼을 강조 표시할 수 있게 합니다  

"Day", "Month", "Year" 버튼은 각각 `onZoom('day')`, `onZoom('month')`, `onZoom('year')`를 호출합니다. 선택된 확대/축소 레벨의 버튼은 `variant="contained"`를 사용하고, 나머지 버튼은 `outlined`로 표시되어 현재 상태를 명확하게 시각적으로 나타냅니다.

전체 예제에서는 이러한 콜백이 확대/축소 및 히스토리 업데이트를 처리하는 Jotai의 쓰기 전용 원자에 연결됩니다.

## 메인 간트 컴포넌트 만들기

지금은 Jotai를 상태 관리에 활용해 간트 차트를 호스팅하는 메인 컴포넌트를 만들어 봅시다. `src/components/GanttComponent.tsx`를 생성합니다.

먼저, 최적의 성능을 위한 필요한 React 훅과 DHTMLX에서 제공하는 메인 ReactGantt 컴포넌트 및 타입을 임포트합니다. 상태 관리를 위해 Jotai의 원자 접근법을 사용합니다:

~~~tsx
import { useEffect, useMemo, useRef } from 'react';  
import ReactGantt, {  
  type ReactGanttRef,  
  type ReactGanttProps,  
  type Link,  
  type SerializedTask,  
} from '@dhtmlx/trial-react-gantt';  
import '@dhtmlx/trial-react-gantt/dist/react-gantt.css';

import { useAtom, useSetAtom } from 'jotai';  
import {  
  ganttStateAtom,  
  undoAtom,  
  redoAtom,  
  setZoomAtom,  
  addTaskAtom,  
  updateTaskAtom,  
  deleteTaskAtom,  
  addLinkAtom,  
  updateLinkAtom,  
  deleteLinkAtom,  
} from '../store';

import Toolbar from './Toolbar';
~~~  

`useAtom`과 `useSetAtom` 훅은 컴포넌트를 원자 상태에 연결합니다.

다음으로 컴포넌트를 설정하고 Jotai 원자에 연결합니다:

~~~tsx
export default function DemoJotai() {  
  const ganttRef = useRef<ReactGanttRef>(null);

  const [ganttState] = useAtom(ganttStateAtom);  
  const { tasks, links, config } = ganttState;  
  const setZoomLevel = useSetAtom(setZoomAtom);  
  const undo = useSetAtom(undoAtom);  
  const redo = useSetAtom(redoAtom);  
  const addTask = useSetAtom(addTaskAtom);  
  const updateTask = useSetAtom(updateTaskAtom);  
  const deleteTask = useSetAtom(deleteTaskAtom);  
  const addLink = useSetAtom(addLinkAtom);  
  const updateLink = useSetAtom(updateLinkAtom);  
  const deleteLink = useSetAtom(deleteLinkAtom);

  useEffect(() => {  
    document.title = 'DHTMLX React Gantt | Jotai';  
  }, []);
}
~~~  

- `ganttRef`는 imperative한 작업을 위해 Gantt 인스턴스에 직접 접근합니다  
- `useAtom`을 사용하여 전체 gantt 상태를 읽고, `useSetAtom`으로 개별 작업들을 수행합니다  
- 각 작업(setZoom, undo, redo 등)은 독립적으로 사용할 수 있는 별도의 원자입니다  
- 컴포넌트가 마운트될 때 문서 제목을 설정하기 위해 `useEffect`를 사용합니다

Gantt 차트의 템플릿을 구성해 날짜 형식과 파싱을 정의하여 데이터 처리의 일관성을 확보합니다:

:::note
v9.1.3 이후로는 Gantt가 ISO 날짜 문자열을 자동으로 감지하므로 이러한 템플릿 오버라이드는 더 이상 필요하지 않습니다. 다만 이전 버전과의 호환성을 위해 여기서는 예제로 보여드립니다. ISO 형식의 날짜 로딩에 대해서는 [Loading dates in ISO format](guides/loading.md#loading-dates-in-iso-format)을 참조하세요.
:::

~~~tsx
const templates: ReactGanttProps['templates'] = useMemo(
  () => ({
    format_date: (date: Date) => date.toISOString(),
    parse_date: (value: string) => new Date(value),
  }),
  []
);
~~~  

가장 중요한 부분은 Gantt 데이터 변경을 Jotai 원자에 연결하는 것입니다:

~~~tsx
const data: ReactGanttProps['data'] = useMemo(  
  () => ({  
    save: (entity, action, item, id) => {  
      if (entity === 'task') {  
        const task = item as SerializedTask;  
        if (action === 'create') return addTask(task);  
        else if (action === 'update') updateTask(task);  
        else if (action === 'delete') deleteTask(id);  
      } else if (entity === 'link') {  
        const link = item as Link;  
        if (action === 'create') return addLink(link);  
        else if (action === 'update') updateLink(link);  
        else if (action === 'delete') deleteLink(id);  
      }  
    },  
  }),  
  [addTask, addLink, updateTask, updateLink, deleteTask, deleteLink]  
);
~~~  

- `data.save` 콜백은 Gantt 차트의 모든 데이터 수정을 처리합니다.  
- 다양한 연산(create, update, delete)을 해당 Jotai 원자 설정기에 전달합니다.  
- 각 원자 설정기는 자신의 상태 조각을 독립적으로 업데이트합니다.  
- 의존성 배열은 원자 설정기가 변경될 때 콜백이 업데이트되도록 보장합니다.

이 콜백에 대한 더 자세한 설명이 필요하면 기본 가이드의 [Handling changes with data.save](integrations/react/state/state-management-basics.md#handlingchangeswithdatasave) 를 참조하세요.

마지막으로 전체 컴포넌트를 렌더링합니다:

~~~tsx
return (  
  <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>  
    <Toolbar onUndo={undo} onRedo={redo} currentZoom={config.zoom.current} onZoom={setZoomLevel} />  
    <ReactGantt ref={ganttRef} tasks={tasks} links={links} config={config} templates={templates} data={data} />  
  </div>  
);  
~~~  

- `Toolbar`는 undo/redo 및 zoom 컨트롤에 대한 원자(setter)들을 받습니다  
- 각 속성(`tasks`, `links`, `config`)은 대응하는 원자가 변경될 때 자동으로 업데이트됩니다

그런 다음 `src/App.tsx`를 우리의 Gantt 컴포넌트를 사용하도록 업데이트합니다:

~~~tsx
import './App.css';  
import GanttComponent from './components/GanttComponent';

function App() {  
  return (  
    <div style={{ width: '95vw', height: '100vh' }}>  
      <GanttComponent />  
    </div>  
  );  
}  
export default App;
~~~  

## Jotai 원자로 상태 관리 만들기

이제 Jotai를 사용한 상태 관리 솔루션을 만들어 보겠습니다. `src/store.ts`를 만드세요:  

~~~tsx
import { atom, type Getter, type Setter } from 'jotai';  
import type { Link, GanttConfig, SerializedTask } from '@dhtmlx/trial-react-gantt';  
import { seedTasks, seedLinks, defaultZoomLevels } from './seed/Seed';  
import type { ZoomLevel } from './seed/Seed';

interface GanttState {  
  tasks: SerializedTask[];  
  links: Link[];  
  config: GanttConfig;  
}
~~~  

여기서는 Jotai의 `atom`, `Getter`, `Setter` 타입을 가져오고 우리의 Gantt 상태 구조에 대한 TypeScript 인터페이스를 정의합니다.

주요 상태 원자를 정의합니다. 이 원자들은 간트 데이터를 보유합니다:

~~~ts
export const ganttStateAtom = atom<GanttState>({  
  tasks: seedTasks,  
  links: seedLinks,  
  config: { zoom: defaultZoomLevels },  
});

const maxHistory = 50;

export const pastAtom = atom<GanttState[]>([]);  
export const futureAtom = atom<GanttState[]>([]);
~~~  

- `ganttStateAtom`은 작업, 링크, 구성 등을 포함한 현재 간트 상태를 보유합니다  
- `pastAtom`과 `futureAtom`은 실행 취소/다시 실행 히스토리 스택을 관리합니다  
- 메모리 이슈를 방지하기 위해 최대 히스토리 수를 설정합니다

다음으로 Jotai의 파생(atom)으로 실행 취소/다시 실행 기능을 구현합니다:

~~~ts
const pushHistory = (get: Getter, set: Setter, state: GanttState) => {  
  const past = [...get(pastAtom), state];  
  if (past.length > maxHistory) past.shift();  
  set(pastAtom, past);  
  set(futureAtom, []);  
};

export const undoAtom = atom(null, (get, set) => {  
  const past = get(pastAtom);  
  if (past.length === 0) return;  
  const previous = past[past.length - 1];  
  set(pastAtom, past.slice(0, -1));  
  set(futureAtom, [get(ganttStateAtom), ...get(futureAtom)]);  
  set(ganttStateAtom, previous);  
});

export const redoAtom = atom(null, (get, set) => {  
  const future = get(futureAtom);  
  if (future.length === 0) return;  
  const next = future[0];  
  set(futureAtom, future.slice(1));  
  set(pastAtom, [...get(pastAtom), get(ganttStateAtom)]);  
  set(ganttStateAtom, next);  
});
~~~  

- `pushHistory`는 현재 상태의 스냅샷을 만들어 히스토리 스택을 업데이트합니다  
- `undoAtom`과 `redoAtom`은 상태 전환을 관리하는 쓰기 전용 원자입니다  
- Jotai의 `get`과 `set` 함수는 다른 원자의 값에 접근할 수 있게 합니다  
- 각 히스토리 연산은 과거 스택과 미래 스택의 무결성을 유지합니다

다음으로 Jotai 원자로 Task를 위한 CRUD 연산을 구현합니다:

~~~ts
export const addTaskAtom = atom(null, (get, set, task: SerializedTask) => {  
  pushHistory(get, set, get(ganttStateAtom));  
  set(ganttStateAtom, {  
    ...get(ganttStateAtom),  
    tasks: [...get(ganttStateAtom).tasks, { ...task, id: `DB_ID:${task.id}` }],  
  });  
  return { ...task, id: `DB_ID:${task.id}` };  
});

export const updateTaskAtom = atom(null, (get, set, task: SerializedTask) => {  
  pushHistory(get, set, get(ganttStateAtom));  
  set(ganttStateAtom, {  
    ...get(ganttStateAtom),  
    tasks: get(ganttStateAtom).tasks.map((t) => (String(t.id) === String(task.id) ? { ...t, ...task } : t)),  
  });  
});

export const deleteTaskAtom = atom(null, (get, set, id: string | number) => {  
  pushHistory(get, set, get(ganttStateAtom));  
  set(ganttStateAtom, {  
    ...get(ganttStateAtom),  
    tasks: get(ganttStateAtom).tasks.filter((task) => String(task.id) !== String(id)),  
  });  
});
~~~  

- 각 원자는 `atom(null, (get, set, payload) => { ... })` 형식을 따라 쓰기 전용 원자로 구현됩니다  
- `addTaskAtom`은 데이터베이스ID를 시뮬레이션하는 방식으로 새 작업을 생성합니다  
- `updateTaskAtom`은 기존 작업을 업데이트합니다  
- `deleteTaskAtom`은 ID로 작업을 제거합니다  
- 모든 연산은 변경하기 전에 히스토리에 기록합니다  
- 링크에 대해서도 동일한 패턴으로 CRUD를 구현합니다

확대/축소 구성도 구현합니다:

~~~ts
export const setZoomAtom = atom(null, (get, set, level: ZoomLevel) => {  
  pushHistory(get, set, get(ganttStateAtom));  
  set(ganttStateAtom, {  
    ...get(ganttStateAtom),  
    config: { ...get(ganttStateAtom).config, zoom: { ...get(ganttStateAtom).config.zoom, current: level } },  
  });  
});
~~~  

`setZoomAtom`은 전체 히스토리 추적과 함께 확대/축소 레벨 변경을 처리합니다.

## 애플리케이션 실행

마지막으로 개발 서버를 실행하고 애플리케이션을 테스트할 수 있습니다: 

~~~bash
npm run dev
~~~  

또는

~~~bash
yarn dev 
~~~  

## 요약

이 튜토리얼에서 여러분은:

- Vite + React 프로젝트를 생성했습니다  
- React Gantt를 추가하고 이를 Jotai 원자 집합에 연결했습니다  
- 하나의 `ganttStateAtom`에 작업, 링크, 확대/축소 구성을 모델링했습니다  
- `pastAtom`/`futureAtom`과 공유 `pushHistory` 헬퍼를 사용한 스냅샷 기반의 실행 취소/다시 실행을 구현했습니다  
- Jotai 상태에서 확대/축소 구성, 작업 및 링크를 전적으로 관리했습니다  
- 변경이 있을 때마다 `data.save` 콜백을 사용해 Gantt 차트의 모든 변경이 Jotai 쓰기 전용 원자에 적용되도록 했습니다  

이를 통해 Gantt 컴포넌트는 선언적으로 유지되며, 모든 mutation 로직과 히스토리 처리는 Jotai 저장소 내부에 캡슐화됩니다.

## GitHub 데모 저장소

이 튜토리얼을 따라 만든 완전한 작동하는 프로젝트는 [GitHub](https://github.com/dhtmlx/react-gantt-jotai-starter)에서 제공됩니다.

## 다음 단계

다음으로 더 자세히 살펴볼 내용:

- 이 예제의 개념을 기본 가이드의 [](integrations/react/state/state-management-basics.md)에서 다시 살펴보기
- 고급 구성 및 템플레이팅과 함께 Jotai 기반 상태를 통합하는 방법은 [React Gantt 개요](integrations/react/overview.md)를 참조하십시오
- 동일한 패턴을 다른 상태 관리 도구와 함께 탐색해 보기:
  - [Using React Gantt with Redux Toolkit](integrations/react/state/redux-toolkit.md)
  - [Using React Gantt with MobX](integrations/react/state/mobx.md)
  - [Using React Gantt with XState](integrations/react/state/xstate.md)
  - [Using React Gantt with Zustand](integrations/react/state/zustand.md)
  - [Using React Gantt with Valtio](integrations/react/state/valtio.md)
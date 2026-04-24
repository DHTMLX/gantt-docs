---
title: React Gantt - Valtio 튜토리얼
sidebar_label: Valtio
description: "Valtio 프록시 상태와 함께 React Gantt를 통합하는 가이드입니다. 컴포넌트에 반응형 스냅샷을 노출하는 방법과 이 워크플로우에서 `save` 콜백으로 업데이트를 적용하는 방법을 관용적인 Valtio 방식으로 보여줍니다."
---


# React Gantt - Valtio 튜토리얼

이 튜토리얼은 React TypeScript 애플리케이션을 만들고, DHTMLX React Gantt 컴포넌트를 통합하며, Valtio로 상태를 관리하는 방법을 안내합니다.

## 사전 지식
- React, TypeScript, Vite, 및 Valtio에 대한 기본 지식
- 권장 사항: [](integrations/react/state/state-management-basics.md)를 읽어 데이터 바인딩 모드와 이 튜토리얼이 기반으로 하는 `data.save` 콜백을 이해하세요. 

## 빠른 설정 - 프로젝트 생성

시작하기 전에 Node.js를 설치하세요. https://nodejs.org/en/ 

다음과 같이 Vite React + TypeScript 프로젝트를 만듭니다: 

~~~bash  
npm create vite@latest react-gantt-valtio-demo -- --template react-ts  
cd react-gantt-valtio-demo  
~~~

다음으로 필요한 의존성을 설치합니다.

* npm용: 

~~~bash
npm install valtio @mui/material @mui/icons-material @emotion/react @emotion/styled
~~~

* yarn용:

~~~bash
yarn add valtio @mui/material @mui/icons-material @emotion/react @emotion/styled
~~~

그다음 React Gantt 패키지를 설치합니다. 

### React Gantt 설치

React Gantt 설치 방법은 [React Gantt 설치 가이드](integrations/react/installation.md)를 참고하세요. 

이 튜토리얼에서는 평가판 패키지를 사용합니다:

~~~bash
npm install @dhtmlx/trial-react-gantt
~~~

또는

~~~bash
yarn add @dhtmlx/trial-react-gantt
~~~

Professional 패키지를 이미 사용 중이라면 명령어와 import에서 `@dhtmlx/trial-react-gantt`를 `@dhx/react-gantt`로 교체하세요.


이제 개발 서버를 시작할 수 있습니다:

~~~bash
npm run dev 
~~~

이제 (http://localhost:5173) 에서 React 프로젝트가 실행 중이어야 합니다.

:::note
Gantt가 바디 전체 공간을 차지하도록 만들려면 `src` 폴더에 있는 `App.css`의 기본 스타일을 제거하고 다음 스타일을 추가해야 합니다:  

~~~css  
#root { 
  margin: 0; 
  padding: 0; 
  height: 100%; 
  width: 100%; 
} 
~~~
:::

## 샘플 데이터 및 설정 구성하기

Gantt 차트용 샘플 데이터를 `src/seed/Seed.ts`에 생성합니다. 이 파일에는 초기 데이터가 들어 있습니다:

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

## 컨트롤 도구 모음(툴바) 구성 컴포넌트 만들기

이제 Gantt 컨트롤의 빠른 접근을 제공하는 **Toolbar** 컴포넌트를 `src/components/Toolbar.tsx`에 추가합니다.

이 컴포넌트는 줌 between *day*, *month*, *year* 뷰처럼 자주 사용하는 Gantt 컨트롤에 빠르게 접근하고, **undo/redo** 동작을 수행할 수 있도록 해 줍니다.

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

Material UI의 Button, ButtonGroup, Divider, 아이콘을 사용해 Gantt 차트를 위한 간단하고 깔끔한 툴바 레이아웃을 만듭니다.

툴바는 Valtio 스토어에 쉽게 연결할 수 있도록 다음의 선택적 속성들을 받습니다:

- `onUndo` 및 `onRedo` - Valtio 액션에서 실행되는 undo/redo 로직을 트리거하는 콜백 함수들
- `onZoom` - 사용자가 줌 버튼을 클릭할 때 줌 레벨을 업데이트하는 콜백
- `currentZoom` - 현재 활성화된 줌 레벨을 나타내며, 선택된 버튼을 하이라이트하도록 합니다

"Day", "Month", "Year" 버튼은 각각 `onZoom('day')`, `onZoom('month')`, 또는 `onZoom('year')`를 호출합니다. 선택된 줌 레벨의 버튼은 `variant="contained"`를 사용하고, 다른 버튼은 `outlined`로 표시되어 현재 상태를 명확하게 시각적으로 나타냅니다.

전체 예제에서는 이 프로퍼티들에 Valtio 스토어의 `actions.undo`, `actions.redo`, `actions.setZoom`을 연결하여, 툴바가 스토어의 구현 세부사항을 알지 못한 채 히스토리와 줌 제어를 수행할 수 있도록 합니다.

## 메인 Gantt 컴포넌트 생성

이제 Valtio를 이용한 상태 관리로 Gantt 차트를 호스팅하는 메인 컴포넌트를 만들어 봅시다. `src/components/GanttComponent.tsx`를 생성합니다.

상태 관리를 위해 자동 스냅샷 트래킹을 제공하는 Valtio의 프록시 기반 반응형 스토어를 사용합니다:

~~~tsx
import { useEffect, useMemo } from 'react';  
import ReactGantt, { type ReactGanttProps, type Link, type SerializedTask } from '@dhtmlx/trial-react-gantt';  
import '@dhtmlx/trial-react-gantt/dist/react-gantt.css';  
import { useSnapshot } from 'valtio';  
import { ganttState, actions } from '../store';

import Toolbar from './Toolbar';
~~~

`useSnapshot`은 컴포넌트를 Valtio 프록시 상태에 연결하고 상태가 변경될 때 자동으로 재렌더링합니다.

이제 컴포넌트를 설정하고 Valtio 스토어에 연결해 봅시다:

~~~tsx
export default function DemoValtio() {  
  const snap = useSnapshot(ganttState);  
  const { tasks, links, config } = snap;  
  const { addTask, updateTask, deleteTask, addLink, updateLink, deleteLink, undo, redo, setZoom } = actions;

  useEffect(() => {  
    document.title = 'DHTMLX React Gantt | Valtio';  
  }, []);
}
~~~

- `useSnapshot`은 Valtio 프록시에서 반응형 상태를 읽고 상태가 변경될 때 자동으로 재렌더링합니다.
- `actions`에는 상태를 변경하는 모든 작업이 포함되어 있습니다(addTask, updateTask, undo, redo 등)
- `useEffect`는 마운트 시 문서 제목을 설정합니다.

이제 Gantt 차트의 템플릿을 구성해 데이터 형식화 및 파싱을 일관되게 처리하도록 설정합니다:

:::note
v9.1.3 버전 이후로 Gantt는 ISO 날짜 문자열을 자동으로 감지하므로 이러한 템플릿 재정의는 더 이상 필요하지 않습니다. 이전 버전과의 호환성을 위해 여기서는 예시로 남겨 두었습니다. ISO 형식의 날짜 로딩에 대한 내용은 [Loading dates in ISO format](guides/loading.md#loading-dates-in-iso-format)을 참조하십시오.
:::

~~~tsx
const templates: ReactGanttProps['templates'] = useMemo(
  () => ({
    format_date: (date: Date) => date.toISOString(),
    parse_date: (date: string) => new Date(date),
  }),
  []
);
~~~

가장 중요한 부분은 Gantt 데이터 변경을 Valtio 기반 상태에 연결하는 것입니다:

~~~tsx
const data: ReactGanttProps['data'] = useMemo(  
  () => ({  
    save: (entity, action, payload, id) => {  
      if (entity === 'task') {  
        const task = payload as SerializedTask;  
        if (action === 'create') return addTask(task);  
        else if (action === 'update') updateTask(task);  
        else if (action === 'delete') deleteTask(id);  
      } else if (entity === 'link') {  
        const link = payload as Link;  
        if (action === 'create') return addLink(link);  
        else if (action === 'update') updateLink(link);  
        else if (action === 'delete') deleteLink(id);  
      }  
    },  
  }),  
  [addTask, updateTask, deleteTask, addLink, updateLink, deleteLink]  
);
~~~

- `data.save` 콜백은 Gantt 차트에서 발생하는 모든 데이터 수정을 처리합니다
- 각 작업(create, update, delete)은 해당되는 Valtio 액션으로 전달됩니다
- Valtio는 프록시 상태를 내부적으로 업데이트하며, `useSnapshot`은 UI가 자동으로 재렌더링되도록 보장합니다

이 콜백에 대한 깊은 설명이 필요하면 Basics 가이드의 [data.save로 변경 사항 처리](integrations/react/state/state-management-basics.md#handlingchangeswithdatasave)를 참조하십시오.

마지막으로 전체 컴포넌트를 렌더링합니다:

~~~tsx
return (  
  <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>  
    <Toolbar  
      onUndo={undo}  
      onRedo={redo}  
      currentZoom={config.zoom.current}  
      onZoom={setZoom}  
    />  
    <ReactGantt tasks={tasks} links={links} config={config} templates={templates} data={data} />  
  </div>  
);  
~~~

- `Toolbar`는 Undo/Redo 및 줌 제어를 위한 Valtio 액션을 받습니다
- `tasks`, `links`, `config` 프로퍼티는 Valtio 상태가 변경될 때마다 자동으로 업데이트됩니다

그리고 나서 우리 Gantt 컴포넌트를 사용하도록 `src/App.tsx`를 업데이트합니다: 

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

## Valtio 저장소로 상태 관리 만들기

이제 Valtio를 사용하여 상태 관리 솔루션을 만들어 봅시다. `src/store.ts`를 생성합니다:



~~~ts
import { proxy } from 'valtio';  
import type { Link, GanttConfig, SerializedTask } from '@dhtmlx/trial-react-gantt';  
import { seedTasks, seedLinks, defaultZoomLevels, type ZoomLevel } from './seed/Seed';

interface Snapshot {  
  tasks: SerializedTask[];  
  links: Link[];  
  config: GanttConfig;  
}
~~~

- Valtio의 `proxy` 함수를 사용해 반응형 상태 객체를 만듭니다  
- 상태 구조와 히스토리 스냅샷에 대한 TypeScript 인터페이스를 정의합니다  
- 샘플 데이터와 기본 구성을 seed 파일에서 가져옵니다

다음은 Valtio의 프록시를 사용한 메인 반응형 상태 객체를 정의합니다:

~~~ts
export const ganttState = proxy<{  
  tasks: SerializedTask[];  
  links: Link[];  
  config: GanttConfig;  
  past: Snapshot[];  
  future: Snapshot[];  
  maxHistory: number;  
}>({  
  tasks: seedTasks,  
  links: seedLinks,  
  config: { zoom: { ...defaultZoomLevels } },  
  past: [],  
  future: [],  
  maxHistory: 50,  
});
~~~

- `ganttState`는 상태 변화를 자동으로 추적하는 반응형 프록시 객체입니다
- 상태에는 작업, 링크, 구성 및 undo/redo 히스토리 스택이 포함됩니다
- 메모리 이슈를 방지하기 위해 최대 히스토리 수를 설정합니다

Valtio를 사용하여 undo/redo 기능을 구현합니다:  

~~~ts
const recordHistory = () => {  
  const { tasks, links, config, past, maxHistory } = ganttState;  
  const snapshot = {  
    tasks: JSON.parse(JSON.stringify(tasks)),  
    links: JSON.parse(JSON.stringify(links)),  
    config: JSON.parse(JSON.stringify(config)),  
  };  
  ganttState.past = [...past.slice(-maxHistory + 1), snapshot];  
  ganttState.future = [];  
};

export const actions = {  
  undo() {  
    const { past, future, tasks, links, config } = ganttState;  
    if (past.length === 0) return;  
    const previous = past[past.length - 1];  
    ganttState.tasks = previous.tasks;  
    ganttState.links = previous.links;  
    ganttState.config = previous.config;  
    ganttState.past = past.slice(0, -1);  
    ganttState.future = [{ tasks, links, config }, ...future];  
  },  
  redo() {  
    const { past, future, tasks, links, config } = ganttState;  
    if (future.length === 0) return;  
    const next = future[0];  
    ganttState.tasks = next.tasks;  
    ganttState.links = next.links;  
    ganttState.config = next.config;  
    ganttState.past = [...past, { tasks, links, config }];  
    ganttState.future = future.slice(1);  
  },
}
~~~

- `recordHistory`는 현재 상태의 깊은 복제본을 히스토리 스냅샷으로 만듭니다  
- `undo`와 `redo` 액션은 히스토리 스택 간의 상태 전환을 관리합니다  
- Valtio의 업데이트는 자동으로 반응성을 트리거합니다

다음으로 태스크와 링크에 대한 CRUD 작업을 구현합니다:  

~~~ts
addTask(task: SerializedTask) {  
  recordHistory();  
  const newTask = { ...task, id: `DB_ID:${task.id}` };  
  ganttState.tasks = [...ganttState.tasks, newTask];  
  return newTask;  
},

updateTask(task: SerializedTask) {  
  recordHistory();  
  ganttState.tasks = ganttState.tasks.map((t) => (t.id === task.id ? { ...t, ...task } : t));  
},

deleteTask(id: string | number) {  
  recordHistory();  
  ganttState.tasks = ganttState.tasks.filter((t) => String(t.id) !== String(id));  
},

addLink(link: Link) {  
  recordHistory();  
  const newLink = { ...link, id: `DB_ID:${link.id}` };  
  ganttState.links = [...ganttState.links, newLink];  
  return newLink;  
},

updateLink(link: Link) {  
  recordHistory();  
  ganttState.links = ganttState.links.map((l) => (l.id === link.id ? { ...l, ...link } : l));  
},

deleteLink(id: string | number) {  
  recordHistory();  
  ganttState.links = ganttState.links.filter((l) => String(l.id) !== String(id));  
},  
~~~

- 각 작업은 변경을 수행하기 전에 `recordHistory`를 호출합니다  
- `addTask`, `addLink`는 시뮬레이션된 DB ID를 가진 새 작업과 링크를 생성합니다  
- `updateTask`/`updateLink` 및 `deleteTask`/`deleteLink`는 배열 메서드를 사용해 업데이트합니다

`setZoom`은 줌 구성을 직접 변경하며 자동 재활성화를 제공합니다:

~~~ts
setZoom(level: ZoomLevel) {  
  recordHistory();  
  ganttState.config.zoom.current = level;  
},
~~~

## 애플리케이션 실행

마지막으로 개발 서버를 실행하고 애플리케이션을 테스트해 봅시다: 

~~~bash
npm run dev
~~~

또는:
~~~bash
yarn dev 
~~~


## 요약

이 튜토리얼에서 여러분은 다음을 수행했습니다:

- Vite + React 프로젝트 생성
- React Gantt를 추가하고 이를 Valtio 프록시 스토어에 연결
- 태스크, 링크, 줌 구성을 단일 `ganttState` 프록시로 모델링
- `past`/`future` 스택과 공유된 `recordHistory` 헬퍼를 사용한 스냅샷 기반 undo/redo 구현
- Valtio 상태에서 모든 변경 및 줌 구동(구성) 관리
- Gantt 차트의 모든 변경이 Valtio 액션으로 라우팅되도록 `data.save` 콜백 사용

이를 통해 Gantt 컴포넌트는 완전히 선언형으로 유지되고, 모든 변이 로직과 히스토리 처리는 Valtio 스토어 안에 캡슐화됩니다.

## GitHub 데모 저장소

이 튜토리얼을 따라 완전히 작동하는 프로젝트는 [GitHub]에 제공됩니다. (https://github.com/dhtmlx/react-gantt-valtio-starter)

## 앞으로의 내용

더 알아보려면:

- 이 예제의 개념을 다시 살펴보기 위해 [](integrations/react/state/state-management-basics.md)
- 스토어 주도 상태와 고급 구성/템플릿화를 React Gantt 개요에서 결합하기 [React Gantt overview](integrations/react/overview.md)
- 같은 패턴을 다른 상태 관리자와 함께 사용하기:
  - [Using React Gantt with Redux Toolkit](integrations/react/state/redux-toolkit.md)
  - [Using React Gantt with MobX](integrations/react/state/mobx.md)
  - [Using React Gantt with XState](integrations/react/state/xstate.md)
  - [Using React Gantt with Jotai](integrations/react/state/jotai.md)
  - [Using React Gantt with Zustand](integrations/react/state/zustand.md)
---
title: React Gantt와 Zustand 사용하기
sidebar_label: Zustand
description: "가볍고 간단한 Zustand 저장소로 Gantt 데이터를 관리하고, 컴포넌트에 셀렉터를 연결하며, 예측 가능하고 최소한의 보일러플레이트 설정에서 data.save 콜백을 사용하여 업데이트를 처리하는 방법을 배웁니다."
---


# React Gantt - Zustand 튜토리얼

이 튜토리얼은 Vite로 React TypeScript 애플리케이션을 만들고, DHTMLX React Gantt 컴포넌트를 통합하며, Zustand로 상태를 관리하는 방법을 안내합니다.

## 전제 조건

- React, TypeScript, Vite, Zustand에 대한 기본 지식
- 권장: [](integrations/react/state/state-management-basics.md)를 읽어 데이터 바인딩 모드와 이 튜토리얼이 기반하는 `data.save` 콜백을 이해합니다.

## 빠른 설정 - 프로젝트 생성

시작하기 전에 Node.js를 설치합니다.  

Vite React + TypeScript 프로젝트를 생성합니다:

~~~bash  
npm create vite@latest react-gantt-zustand-demo -- --template react-ts  
cd react-gantt-zustand-demo  
~~~  

이제 필요한 의존성을 설치합니다.

* For **npm**: 

~~~bash
npm install zustand @mui/material @mui/icons-material @emotion/react @emotion/styled
~~~  

* For **yarn**:

~~~bash
yarn add zustand @mui/material @mui/icons-material @emotion/react @emotion/styled
~~~  

그다음 React Gantt 패키지를 설치합니다. 

### React Gantt 설치

React Gantt를 [React Gantt 설치 가이드](integrations/react/installation.md)에 따라 설치합니다.

이 튜토리얼에서는 평가 패키지를 사용합니다:

~~~bash
npm install @dhtmlx/trial-react-gantt
~~~

또는

~~~bash
yarn add @dhtmlx/trial-react-gantt
~~~

Professional 패키지를 이미 사용 중인 경우 명령과 import에서 `@dhtmlx/trial-react-gantt`를 `@dhx/react-gantt`로 교체하세요.

이제 개발 서버를 시작할 수 있습니다:

~~~bash
npm run dev 
~~~  

이제 `http://localhost:5173`에서 React 프로젝트가 실행 중이어야 합니다.

:::note
Gantt가 본문 전체를 차지하도록 하려면, `src` 폴더에 있는 `App.css`의 기본 스타일을 제거하고 아래 내용을 추가해야 합니다:

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

Gantt 차트용 샘플 데이터를 `src/seed/Seed.ts`에 생성합니다. 이 파일에는 초기 데이터가 담깁니다:

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

## 제어 도구 모음 컴포넌트 만들기

이제 `src/components/Toolbar.tsx`에 **Toolbar** 컴포넌트를 추가합시다.

이 컴포넌트는 Day/Month/Year 뷰 간 줌 전환과 같은 일반적인 Gantt 컨트롤에 사용자가 빠르게 접근할 수 있도록 제공합니다.

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

Material UI의 컴포넌트(Button, ButtonGroup, Divider, 아이콘)을 사용해 Gantt 차트에 직관적인 컨트롤을 제공하는 간단하고 깔끔한 도구 모음 레이아웃을 만듭니다.

툴바는 Zustand 저장소와 원활하게 통합되도록 다음의 선택적 props를 받습니다:

- `onUndo` 와 `onRedo` - Undo/Redo 동작용 콜백 함수들
- `onZoom` - 사용자가 줌 버튼을 클릭할 때 Zustand 저장소에서 줌 레벨을 업데이트하는 콜백
- `currentZoom` - 현재 활성화된 줌 레벨을 나타내며, 선택된 버튼을 강조 표시하도록 도와줍니다
- "Day", "Month", "Year" 버튼은 각각 `onZoom('day')`, `onZoom('month')`, `onZoom('year')`를 호출합니다. 선택된 줌 레벨 버튼은 `variant="contained"`를 사용하고, 다른 버튼은 `outlined`를 사용하여 현재 상태를 명확하게 시각적으로 표시합니다.

툴바는 Zustand 저장소의 액션에 직접 연결됩니다:

- 줌 컨트롤: 사용자가 "Day"를 클릭하면 Zustand 저장소의 `setZoom('day')`를 호출하여 Gantt 차트의 구성도 자동으로 업데이트하고 재렌더링을 트리거합니다  
- Undo 버튼은 저장소의 `undo()` 메서드를 트리거하여 이전 상태로 되돌립니다  
- Redo 버튼은 `redo()`를 호출해 변경 사항을 다시 적용합니다  
- 모든 상태 변경(작업 편집, 삭제, 줌 조정 등)은 우리의 커스텀 히스토리 시스템에 추적되어 원활하게 역전되거나 재적용될 수 있습니다  

## 메인 Gantt 컴포넌트 만들기

Gantt 차트를 호스팅할 메인 컴포넌트를 구축하는 것부터 시작합시다. `src/components/GanttComponent.tsx`를 만듭니다.

먼저 React의 `useEffect`, `useMemo`, `useRef`와 Gantt 패키지의 메인 `ReactGantt` 컴포넌트 및 타입, 커스텀 `Toolbar` 컴포넌트, Zustand 저장소의 `useGanttStore` 훅을 임포트합니다:

~~~tsx
import { useEffect, useMemo, useRef } from 'react';  
import ReactGantt, { ReactGanttProps, Link, ReactGanttRef, SerializedTask } from '@dhtmlx/trial-react-gantt';  
import '@dhtmlx/trial-react-gantt/dist/react-gantt.css';

import Toolbar from './Toolbar';
import { useGanttStore } from '../store';
~~~

이제 컴포넌트를 설정하고 Zustand 저장소에 연결해 봅시다:

~~~tsx
export default function DemoZustand() {  
  const ganttRef = useRef<ReactGanttRef>(null);

  const { tasks, links, config, setZoom, addTask, upsertTask, deleteTask, addLink, upsertLink, deleteLink, undo, redo } = useGanttStore();

  useEffect(() => {  
    document.title = 'DHTMLX React Gantt | Zustand';  
  }, []);
~~~

- `ganttRef`는 명령형 작업을 위한 Gantt 인스턴스에 직접 접근합니다  
- Zustand 저장소에서 상태와 액션을 한 번에 구조 분해로 추출합니다  
- `useEffect`가 컴포넌트가 마운트될 때 문서 제목을 설정합니다

Gantt 차트의 템플릿을 구성하여 일관된 데이터 처리에 필요한 날짜 포맷팅과 파싱을 정의해 봅시다:

:::note
v9.1.3 이후로 Gantt는 ISO 날짜 문자열을 자동으로 감지하므로 이 템플릿 재정의는 더 이상 필요하지 않습니다. 이전 Gantt 버전과의 호환성을 위해 여기에 보여 드립니다.
:::  

~~~ts
const templates: ReactGanttProps['templates'] = useMemo(
  () => ({
    format_date: (d) => d.toISOString(),
    parse_date: (s) => new Date(s),
  }),
  []
);
~~~

가장 중요한 부분은 Gantt 데이터 변경을 Zustand 저장소에 연결하는 것입니다:

~~~tsx
const data: ReactGanttProps['data'] = useMemo(  
  () => ({  
    save: (entity, action, item, id) => {  
      if (entity === 'task') {  
        const task = item as SerializedTask;  
        if (action === 'create') return addTask(task);  
        else if (action === 'update') upsertTask(task);  
        else if (action === 'delete') deleteTask(id);  
      } else if (entity === 'link') {  
        const link = item as Link;  
        if (action === 'create') return addLink(link);  
        else if (action === 'update') upsertLink(link);  
        else if (action === 'delete') deleteLink(id);  
      }  
    },  
  }),  
  [addTask, addLink, upsertTask, upsertLink, deleteTask, deleteLink]  
);
~~~

- `data.save` 콜백은 Gantt 차트의 모든 데이터 수정에 대해 작동합니다  
- 다양한 연산(create, update, delete)을 적절한 저장소 액션으로 라우팅합니다  
- 의존성 배열은 저장소 액션이 변경될 때 콜백이 업데이트되도록 보장합니다

이 콜백에 대한 더 자세한 설명이 필요하면 Basics 가이드의 [Handling changes with data.save](integrations/react/state/state-management-basics.md#handlingchangeswithdatasave) 부분을 참조하세요.

마지막으로 전체 컴포넌트를 렌더링합니다:

~~~tsx
return (  
  <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>  
    <Toolbar onUndo={undo} onRedo={redo} currentZoom={config.zoom.current} onZoom={setZoom} />  
    <ReactGantt ref={ganttRef} tasks={tasks} links={links} config={config} templates={templates} data={data} />  
  </div>  
);  
~~~

- `Toolbar`는 undo/redo 및 줌 컨트롤용 핸들러를 받습니다  
- `ReactGantt` 컴포넌트는 모든 데이터, 구성 및 콜백을 받습니다

그런 다음 `src/App.tsx`를 업데이트하여 우리의 Gantt 컴포넌트를 사용합니다:

~~~tsx
import './App.css';  
import GanttComponent from './components/GanttComponent';

function App() {  
  return (  
    <div style={{ height: '100vh', width: '95vw' }}>  
      <GanttComponent />  
    </div>  
  );  
}

export default App;
~~~

## Zustand 저장소 설정

이제 Zustand를 사용한 상태 관리 솔루션을 만들겠습니다. `src/store.ts`를 만듭니다:

~~~ts
import { create } from 'zustand';  
import type { Link, GanttConfig, SerializedTask } from '@dhtmlx/trial-react-gantt';  
import { seedTasks, seedLinks, defaultZoomLevels, type ZoomLevel } from './seed/Seed';

type Snapshot = { tasks: SerializedTask[]; links: Link[]; config: GanttConfig };  
type State = {  
  tasks: SerializedTask[];  
  links: Link[];  
  config: GanttConfig;  
  past: Snapshot[];  
  future: Snapshot[];  
  maxHistory: number;  
  recordHistory: () => void;  
  undo: () => void;  
  redo: () => void;

  setZoom: (level: ZoomLevel) => void;  
  addTask: (task: SerializedTask) => SerializedTask;  
  upsertTask: (task: SerializedTask) => void;  
  deleteTask: (id: string | number) => void;  
  addLink: (l: Link) => Link;  
  upsertLink: (l: Link) => void;  
  deleteLink: (id: string | number) => void;  
};
~~~

다음과 같이 선언합니다:

- 저장소에서 관리하는 주요 Gantt 데이터는 `tasks`, `links`, `config`입니다.  
- Undo/Redo 이력을 위한 배열로 `past`와 `future`를 사용합니다.  
- 변경 전 스냅샷을 생성하는 헬퍼 함수로 `recordHistory()`를 정의합니다.  
- 작업 및 링크에 대한 상태 수정을 위한 액션들로 `setZoom`, `addTask`, `upsertTask`, `deleteTask` 등을 제공합니다.

다음으로 상태 업데이트를 처리할 저장소 액션을 구현합니다:

~~~ts
export const useGanttStore = create<State>((set, get) => ({  
  tasks: seedTasks,  
  links: seedLinks,  
  config: { zoom: defaultZoomLevels },

  past: [],  
  future: [],  
  maxHistory: 50,

  recordHistory: () => {  
    const { tasks, links, config, past, maxHistory } = get();  
    const snapshot = {  
      tasks: JSON.parse(JSON.stringify(tasks)),  
      links: JSON.parse(JSON.stringify(links)),  
      config: JSON.parse(JSON.stringify(config)),  
    };  
    set({  
      past: [...past.slice(-maxHistory + 1), snapshot],  
      future: [],  
    });  
  },

  undo: () => {  
    const { past, future, tasks, links, config } = get();  
    if (past.length === 0) return;  
    const previous = past[past.length - 1];  
    set({  
      tasks: previous.tasks,  
      links: previous.links,  
      past: past.slice(0, -1),  
      future: [{ tasks, links, config }, ...future],  
      config: previous.config,  
    });  
  },

  redo: () => {  
    const { past, future, tasks, links, config } = get();  
    if (future.length === 0) return;  
    const next = future[0];  
    set({  
      tasks: next.tasks,  
      links: next.links,  
      past: [...past, { tasks, links, config }],  
      config: next.config,  
      future: future.slice(1),  
    });  
  },

  setZoom: (level) => {  
    get().recordHistory();  
    set({  
      config: { ...get().config, zoom: { ...get().config.zoom, current: level } },  
    });  
  },

  addTask: (task) => {  
    get().recordHistory();  
    const newTask = { ...task, id: `DB_ID:${task.id}` };  
    set({ tasks: [...get().tasks, newTask] });  
    return newTask;  
  },

  upsertTask: (task) => {  
    get().recordHistory();  
    const tasks = get().tasks;  
    const index = tasks.findIndex((x) => String(x.id) === String(task.id));  
    if (index !== -1) {  
      set({  
        tasks: [...tasks.slice(0, index), { ...tasks[index], ...task }, ...tasks.slice(index + 1)],  
      });  
    }  
  },

  deleteTask: (id) => {  
    get().recordHistory();  
    set({ tasks: get().tasks.filter((t) => String(t.id) !== String(id)) });  
  },

  addLink: (l) => {  
    get().recordHistory();  
    const newLink = { ...l, id: `DB_ID:${l.id}` };  
    set({ links: [...get().links, newLink] });  
    return newLink;  
  },

  upsertLink: (l) => {  
    get().recordHistory();  
    const links = get().links;  
    const index = links.findIndex((x) => String(x.id) === String(l.id));  
    if (index !== -1) {  
      set({  
        links: [...links.slice(0, index), { ...links[index], ...l }, ...links.slice(index + 1)],  
      });  
    }  
  },

  deleteLink: (id) => {  
    get().recordHistory();  
    set({ links: get().links.filter((l) => String(l.id) !== String(id)) });  
  },  
}));
~~~

- `set` 함수는 상태를 직접 업데이트합니다  
- `get` 함수로 현재 상태 값을 조회할 수 있습니다  
- `setZoom`은 Gantt 구성의 줌 레벨을 업데이트합니다  
- `addTask`는 시뮬레이션된 데이터베이스 ID를 가진 새 작업을 생성합니다  
- `upsertTask`는 ID로 기존 작업을 업데이트합니다  
- `deleteTask`는 ID로 작업을 제거합니다  
- 링크 작업도 동일한 패턴으로 처리합니다

### 히스토리 관리 (Undo/Redo)

Undo와 redo 기능을 활성화하려면 `recordHistory`, `undo`, `redo`를 정의합니다:

- `recordHistory()`는 수정하기 전에 현재 Gantt 상태의 깊은 복사본(스냅샷)을 생성합니다.  
- `undo()`는 `past`의 가장 최근 스냅샷으로 롤백하고, 현재 상태를 `future`에 저장합니다.  
- `redo()`는 `future`에서 사용할 수 있는 다음 스냅샷을 저장소에 다시 적용합니다.

이 메서드들은 사용자가 최근 Gantt 상태 변경을 앞뒤로 이동할 수 있도록 해 줍니다

각 수정 액션은 변경을 수행하기 전에 `recordHistory()`를 호출하여 모든 상태 전이가 저장되고 되돌릴 수 있도록 보장합니다.

## 애플리케이션 실행

마지막으로 개발 서버를 실행하고 애플리케이션을 테스트합니다:

~~~bash
npm run dev
~~~  

또는:
~~~bash
yarn dev 
~~~ 

## 요약

이 튜토리얼에서 배운 내용:

- Vite + React 프로젝트를 생성했습니다  
- React Gantt를 추가하고 Zustand 저장소에 연결했습니다  
- 저장소에서 `past`/`future` 이력 배열을 사용한 스냅샷 기반 Undo/Redo를 구현했습니다  
- Zustand 상태에서 줌 구성, 작업 및 링크를 완전히 관리했습니다  
- Gantt 차트의 모든 변경이 저장소 액션으로 전환되도록 `data.save` 콜백을 사용했습니다

이를 통해 Gantt 컴포넌트는 완전히 선언적으로 동작하고, 모든 변이 로직과 이력 처리는 Zustand 저장소 안에 캡슐화됩니다.

## GitHub 데모 저장소

이 튜토리얼에 따라 작동하는 완전한 프로젝트는 [GitHub에서 제공됩니다](https://github.com/dhtmlx/react-gantt-zustand-starter).

## 다음 단계

더 깊이 살펴보려면:

- [](integrations/react/state/state-management-basics.md)에서 이 예제의 개념 재검토하기
- 저장소 기반 상태를 고급 구성 및 템플레이팅과 함께 활용하기 – [React Gantt 개요](integrations/react/overview.md)
- 같은 패턴을 다른 상태 관리 도구와 함께 사용해 보기:
  - [Redux Toolkit으로 React Gantt 사용하기](integrations/react/state/redux-toolkit.md)
  - [MobX로 React Gantt 사용하기](integrations/react/state/mobx.md)
  - [XState로 React Gantt 사용하기](integrations/react/state/xstate.md)
  - [Jotai로 React Gantt 사용하기](integrations/react/state/jotai.md)
  - [Valtio로 React Gantt 사용하기](integrations/react/state/valtio.md)
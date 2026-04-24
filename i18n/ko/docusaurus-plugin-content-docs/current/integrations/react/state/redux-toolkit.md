---
title: Redux Toolkit으로 React Gantt 사용
sidebar_label: Redux Toolkit
description: "Redux Toolkit과 함께 React Gantt를 통합하는 단계별 가이드."
---

# React Gantt - Redux Toolkit 튜토리얼

이 튜토리얼은 Vite를 사용한 React TypeScript 애플리케이션을 생성하고, DHTMLX React Gantt 컴포넌트를 통합하며, Redux Toolkit으로 상태를 관리하는 방법을 안내합니다.

## 전제 조건

- React, TypeScript, 그리고 Redux에 대한 기본 지식
- 권장: [](integrations/react/state/state-management-basics.md)을 읽어 데이터 바인딩 방식과 이 튜토리얼이 기반으로 하는 `data.save` 콜백을 이해하세요.

## 빠른 설정 - 프로젝트 생성

시작하기 전에 Node.js를 설치합니다: [Node.js](https://nodejs.org/en/).

Vite React + TypeScript 프로젝트를 생성합니다:

~~~bash  
npm create vite@latest react-gantt-redux-demo -- --template react-ts  
cd react-gantt-redux-demo  
~~~

이제 필요한 의존성을 설치합니다.

* npm의 경우:

~~~bash
npm install @reduxjs/toolkit react-redux @mui/material @mui/icons-material @emotion/react @emotion/styled
~~~

* yarn의 경우:

~~~bash
yarn add @reduxjs/toolkit react-redux @mui/material @mui/icons-material @emotion/react @emotion/styled
~~~

그다음 React Gantt 패키지를 설치합니다.

### React Gantt 설치

[React Gantt 설치 가이드](integrations/react/installation.md)에 따라 React Gantt를 설치합니다.

이 튜토리얼에서는 체험 패키지를 사용합니다:

~~~bash
npm install @dhtmlx/trial-react-gantt
~~~

또는

~~~bash
yarn add @dhtmlx/trial-react-gantt
~~~

 Professional 패키지를 이미 사용하는 경우, 명령과 임포트에서 `@dhtmlx/trial-react-gantt`를 `@dhx/react-gantt`로 바꿉니다.


다음으로 개발 서버를 시작합니다:

~~~bash
npm run dev 
~~~

이제 (http://localhost:5173) 에서 React 프로젝트가 실행 중이어야 합니다.

:::note
Gantt가 본문 전체 공간을 차지하도록 하려면 `src` 폴더에 있는 `App.css`의 기본 스타일을 제거하고 다음 스타일을 추가해야 합니다:

~~~css  
#root {  
  margin: 0;  
  padding: 0;  
  height: 100%;  
  width: 100%;  
}  
~~~
:::

## Redux 저장소 구성

`src/redux/store.ts`를 생성합니다. 이 파일은 `gantt` 슬라이스를 Redux 저장소에 연결합니다:

~~~ts
import { configureStore } from '@reduxjs/toolkit';  
import ganttReducer from './ganttSlice';

export const store = configureStore({  
  reducer: {  
    gantt: ganttReducer,  
  },  
});

export type RootState = ReturnType<typeof store.getState>;  
export type AppDispatch = typeof store.dispatch;
~~~

`configureStore`는 DevTools, thunk 등 합리적인 기본값으로 Redux를 설정합니다. `RootState`와 `AppDispatch`의 타입 정의를 통해 앱 전역에서 `useSelector`와 `useDispatch`를 쉽게 타입화할 수 있습니다.

## Redux 슬라이스 생성

`src/redux/ganttSlice.ts`를 만들어 모든 Gantt 관련 데이터(작업, 링크(의존성), 확대/축소 설정 등)를 다룹니다.

이 슬라이스는 또한 스냅샷 이력 추적을 통해 **undo/redo 기능**을 도입합니다. 사용자가 차트에서 이전 변경을 되돌리거나 다시 적용할 수 있습니다.

~~~ts
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';  
import type { SerializedTask, Task, Link, GanttConfig } from '@dhtmlx/trial-react-gantt';  
import { defaultZoomLevels, seedLinks, seedTasks, type ZoomLevel } from '../common/Seed';  
import { type WritableDraft } from 'immer';

interface Snapshot {  
  tasks: SerializedTask[];  
  links: Link[];  
  config: GanttConfig;  
}

interface GanttState {  
  tasks: SerializedTask[];  
  links: Link[];  
  config: GanttConfig;  
  past: Snapshot[];  
  future: Snapshot[];  
  maxHistory: number;  
}

const initialState: GanttState = {  
  tasks: seedTasks,  
  links: seedLinks,  
  config: {  
    zoom: defaultZoomLevels,  
  },  
  past: [],  
  future: [],  
  maxHistory: 50,  
};

const createSnapshot = (state: GanttState): WritableDraft<Snapshot> => ({  
  tasks: JSON.parse(JSON.stringify(state.tasks)),  
  links: JSON.parse(JSON.stringify(state.links)),  
  config: JSON.parse(JSON.stringify(state.config)),  
});

const pushHistory = (state: GanttState) => {  
  state.past.push(createSnapshot(state) as Snapshot);  
  if (state.past.length > state.maxHistory) state.past.shift();  
  state.future = [];  
};

const ganttSlice = createSlice({  
  name: 'gantt',  
  initialState,  
  reducers: {  
    undo(state) {  
      if (state.past.length > 0) {  
        const previous = state.past[state.past.length - 1];  
        const newFuture = createSnapshot(state as GanttState);

        state.tasks = previous.tasks;  
        state.links = previous.links;  
        state.config = previous.config;  
        state.past = state.past.slice(0, -1);  
        state.future = [newFuture, ...state.future];  
      }  
    },  
    redo(state) {  
      if (state.future.length > 0) {  
        const next = state.future[0];  
        const newPast = createSnapshot(state as GanttState);

        state.tasks = next.tasks;  
        state.links = next.links;  
        state.config = next.config;  
        state.future = state.future.slice(1);  
        state.past = [...state.past, newPast];  
      }  
    },

    updateTask(state, action: PayloadAction<SerializedTask>) {  
      pushHistory(state);

      const updatedTask = action.payload;  
      const index = state.tasks.findIndex((task) => task.id === updatedTask.id);  
      if (index !== -1) {  
        state.tasks[index] = { ...state.tasks[index], ...updatedTask };  
      }  
    },  
    createTask(state, action: PayloadAction<SerializedTask>) {  
      pushHistory(state);

      state.tasks.push({ ...action.payload, id: `DB_ID:${action.payload.id}` });  
    },  
    deleteTask(state, action: PayloadAction<string>) {  
      pushHistory(state);

      state.tasks = state.tasks.filter((task) => String(task.id) !== action.payload);  
    },  
    updateLink(state, action: PayloadAction<Link>) {  
      pushHistory(state);

      const updatedLink = action.payload;  
      const index = state.links.findIndex((link) => link.id === updatedLink.id);  
      if (index !== -1) {  
        state.links[index] = { ...state.links[index], ...updatedLink };  
      }  
    },  
    createLink(state, action: PayloadAction<Link>) {  
      pushHistory(state);

      state.links.push({ ...action.payload, id: `DB_ID:${action.payload.id}` });  
    },  
    deleteLink(state, action: PayloadAction<string>) {  
      pushHistory(state);

      state.links = state.links.filter((link) => String(link.id) !== action.payload);  
    },  
    setZoom(state, action: PayloadAction<ZoomLevel>) {  
      pushHistory(state);

      state.config.zoom.current = action.payload;  
    },  
  },  
});

export const { undo, redo, updateTask, createTask, deleteTask, updateLink, createLink, deleteLink, setZoom } =  
  ganttSlice.actions;  
export default ganttSlice.reducer;
~~~

`GanttState`에는 세 가지 새로운 필드인 `past`, `future`, `maxHistory`가 포함되어 있으며, 이들이 함께 undo/redo를 위한 **타임 트래블 메커니즘**을 구현합니다.

undo/redo를 지원하기 위해 두 가지 보조 함수가 사용됩니다:

- **`createSnapshot(state)`** - 현재 Gantt 데이터를 깊은 복제로 만들어 특정 시점의 작업, 링크 및 구성을 정확히 보존합니다.

- **`pushHistory(state)`** - 수정 작업 전에 현재 스냅샷을 `past` 배열에 저장하고 `future` 스택을 지웁니다(그래서 redo가 최신 undo 시퀀스에만 적용됩니다).

아래에서 `ganttSlice.ts`에 대한 설명이 제공됩니다.
`createSlice` 함수는 자동으로 다음을 생성합니다:

1. The **reducers** (상태를 수정하는 함수).  
2. The **action creators** (UI에서 디스패치할 수 있는 함수).

각 리듀서는 Gantt 상태의 특정 부분을 업데이트합니다:

- **updateTask**: 기존 작업의 데이터를 업데이트합니다(예: 이름, 날짜, 지속 시간을 편집할 때).  
- **createTask:** 상태에 새 작업을 추가합니다. 가짜 `DB_ID:` 접두사는 실제 백엔드가 데이터베이스에 저장한 후 고유 ID를 할당하는 방식을 시뮬레이션합니다.  
- **deleteTask:** ID를 기반으로 저장소에서 작업을 제거합니다.  
- **updateLink, createLink, deleteLink:** 작업 리듀서와 동일하게 동작하지만, **links**(작업 간 의존성)에 적용됩니다.  
- **setZoom**: 구성 객체의 현재 확대/축소 수준을 업데이트하며 히스토리 추적이 포함됩니다.  
- **undo**: `past`에서 이전 스냅샷을 복원하고 현재 스냅샷을 `future`로 이동합니다.  
- **redo**: 이전에 되돌렸던 상태를 다시 적용하기 위해 `future`에서 스냅샷을 다시 `past`로 이동합니다.

모든 수정 작업은 먼저 `pushHistory(state)`를 호출하므로, 사용자는 어떤 작업, 링크 또는 구성 변경이든 안전하게 undo/redo 할 수 있습니다.

## 샘플 데이터 및 구성 설정

`src/common/Seed.ts`에서 우리의 Gantt 차트용 샘플 데이터를 생성합니다. 초기 데이터를 포함합니다:

~~~ts
import type { SerializedTask, Link, GanttConfig } from '@dhtmlx/trial-react-gantt';

export type ZoomLevel = 'day' | 'month' | 'year';

export const defaultZoomLevels: NonNullable<GanttConfig['zoom']> = {
  current: 'day',
  levels: [
    { 
      name: 'day',
      scale_height: 27,
      min_column_width: 80,
      scales: [{ unit: 'day', step: 1, format: '%d %M' }],
    },
    {
      name: 'month',
      scale_height: 50,
      min_column_width: 120,
      scales: [
        { unit: 'month', format: '%F, %Y' },
        { unit: 'week', format: 'Week #%W' },
      ],
    },
    {
      name: 'year',
      scale_height: 50,
      min_column_width: 30,
      scales: [{ unit: 'year', step: 1, format: '%Y' }],
    },
  ],
};

export const seedTasks: SerializedTask[] = [
  {
    id: 1,
    text: 'Office itinerancy',
    type: 'project',
    start_date: new Date(2025, 3, 2).toISOString(),
    duration: 17,
    progress: 0.4,
    parent: 0,
    open: true,
  }
  // ...
];

export const seedLinks: Link[] = [
  { id: 2, source: 2, target: 3, type: '0' },
  { id: 3, source: 3, target: 4, type: '0' },
  // ...
];
~~~

## 컨트롤 도구 모음 컴포넌트 만들기

이제 `src/common/Toolbar.tsx`에 **Toolbar** 컴포넌트를 추가합니다.

이 컴포넌트는 사용자가 확대/축소Between 남은 일반 컨트롤에 빠르게 접근할 수 있게 해줍니다.

~~~tsx
import Divider from '@mui/material/Divider';  
import ButtonGroup from '@mui/material/ButtonGroup';  
import UndoIcon from '@mui/icons-material/Undo';  
import RedoIcon from '@mui/icons-material/Redo';  
import Button from '@mui/material/Button';  
import type { ZoomLevel } from './Seed';

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

Material UI 컴포넌트(Button, ButtonGroup, Divider, 아이콘 등)를 사용해 간단하고 깔끔한 툴바 레이아웃을 만듭니다.

툴바는 아래의 선택적 props를 받습니다:

- `onUndo`와 `onRedo` - undo/redo 동작에 대한 콜백 함수.
- `onZoom` - 사용자가 확대/축소 버튼 중 하나를 클릭했을 때 호출되는 콜백.
- `currentZoom` - 현재 활성화된 확대/축소 레벨을 툴바에 알려주어 선택된 버튼을 하이라이트합니다.

"Day", "Month", "Year" 버튼은 각각 `onZoom('day')`, `onZoom('month')`, `onZoom('year')`를 호출합니다. 선택된 확대/축소 버튼은 `variant="contained"`를 사용하고, 나머지 버튼은 `outlined`로 현재 상태를 시각적으로 표시합니다.

이 튜토리얼의 이후 부분에서 이 툴바를 저장소의 액션과 연결할 예정입니다:

- 사용자가 "Day"를 클릭하면 저장소의 `setZoom('day')`를 호출합니다.  
- Undo 버튼은 슬라이스의 `undo()`를 트리거하여 이전 상태로 되돌립니다.  
- Redo 버튼은 `redo()`를 호출하여 변경 사항을 다시 적용합니다.  
- 모든 상태 변경(작업 편집, 삭제, 확대/축소 조정 등)은 우리만의 히스토리 시스템에 추적되며, 이를 되돌리거나 다시 적용할 수 있습니다.

이로써 Gantt 차트의 구성은 전역 상태에 반영되고, UI는 새로운 확대/축소 레벨로 자동으로 다시 렌더링됩니다.

이제 DHTMLX React Gantt를 Redux Toolkit 상태 관리와 함께 작동시키는 핵심 컴포넌트를 만들어 보겠습니다. 이 컴포넌트는 애플리케이션의 중앙 조각으로서 모든 Gantt 차트 상호 작용과 상태 업데이트를 처리합니다.

성능 최적화를 위해 `useMemo`와 `useCallback` 훅을 사용합니다. `useMemo`는 구성 객체와 같은 값을 캐시하고, `useCallback`은 콜백 함수를 메모이즈합니다. 이를 통해 의존성이 변경되지 않으면 객체와 함수가 매 렌더링마다 새로 생성되지 않도록 합니다.

이제 Redux 통합을 위한 핵심 컴포넌트를 구성하고 연결합니다:

~~~tsx
import React, { useRef, useEffect, useMemo, useCallback } from 'react';

import { useDispatch, useSelector } from 'react-redux';  
import ReactGantt, { GanttConfig, ReactGanttProps, Link, ReactGanttRef, SerializedTask } from '@dhtmlx/trial-react-gantt';  
import '@dhtmlx/trial-react-gantt/dist/react-gantt.css';

import {  
  undo,  
  redo,  
  updateTask,  
  createTask,  
  deleteTask,  
  updateLink,  
  createLink,  
  deleteLink,  
  setZoom,  
} from '../redux/ganttSlice';

import type { RootState, AppDispatch } from '../redux/store';  
import Toolbar from '../common/Toolbar';  
import { type ZoomLevel } from '../common/Seed';

const ReactGanttExample: React.FC = () => {  
  const ganttRef = useRef<ReactGanttRef>(null);  
  const dispatch = useDispatch<AppDispatch>();  
  const { tasks, links, config } = useSelector((state: RootState) => state.gantt);

  useEffect(() => {  
    document.title = 'DHTMLX React Gantt | Redux Toolkit';  
  }, []);
}
~~~

- `ganttRef`는 Undo/Redo와 같은 메서드를 호출하기 위해 Gantt 인스턴스에 직접 접근할 수 있게 해줍니다.  
- `dispatch`는 Redux 저장소에 액션을 보낼 때 사용하는 함수입니다.  
- `useSelector` 훅을 사용해 Redux 상태에서 작업, 링크 및 구성을 추출합니다.  
- 컴포넌트가 마운트될 때 문서 제목을 설정하기 위해 `useEffect`를 사용합니다.

툴바와 Gantt 차트에서의 사용자 동작을 처리하기 위해 핸들러 함수를 메모이즈하려고 `useCallback`을 사용합니다:

~~~tsx
const handleUndo = useCallback(() => {  
  dispatch(undo());  
}, [dispatch]);

const handleRedo = useCallback(() => {  
  dispatch(redo());  
}, [dispatch]);

const handleZoomIn = useCallback(  
  (newZoom: ZoomLevel) => {  
    dispatch(setZoom(newZoom));  
  },  
  [dispatch]  
);
~~~

- `handleZoomIn`은 Redux 상태의 확대/축소 수준을 업데이트하는 액션을 디스패치합니다.  
- `handleUndo`와 `handleRedo`는 `undo`/`redo` 액션을 디스패치하여 `past`나 `future`에서 이전 스냅샷을 복원하거나 다시 적용합니다.  
- 이 함수들은 나중에 Toolbar 컴포넌트에 콜백으로 전달됩니다.

이제 구성 객체를 캐시하기 위해 `useMemo`를 사용해 Gantt 차트를 구성합니다:

:::note
Since v9.1.3, Gantt automatically detects ISO date strings and these template overrides are no longer needed. They are shown here for compatibility with earlier Gantt versions. See [Loading dates in ISO format](guides/loading.md#loading-dates-in-iso-format).
:::

~~~tsx
const ganttConfig: GanttConfig = useMemo(() => ({ ...config }), [config]);

const templates: ReactGanttProps['templates'] = useMemo(
  () => ({
    format_date: (date: Date) => date.toISOString(),
    parse_date: (date: string) => new Date(date),
  }),
  []
);
~~~

또한 Gantt 차트의 모든 데이터 변경을 처리해야 합니다:

~~~tsx
const data: ReactGanttProps['data'] = useMemo(  
  () => ({  
    save: (entity, action, payload, id) => {  
      if (entity === 'task') {  
        const task = payload as SerializedTask;  
        if (action === 'update') {  
          dispatch(updateTask(task));  
        } else if (action === 'create') {  
          dispatch(createTask(task));  
        } else if (action === 'delete') {  
          dispatch(deleteTask(String(id)));  
        }  
      } else if (entity === 'link') {  
        const link = payload as Link;  
        if (action === 'update') {  
          dispatch(updateLink(link));  
        } else if (action === 'create') {  
          dispatch(createLink(link));  
        } else if (action === 'delete') {  
          dispatch(deleteLink(String(id)));  
        }  
      }  
    },  
  }),  
  [dispatch]  
);
~~~

`data.save` 콜백은 Gantt 차트에서 변경이 발생할 때마다 호출됩니다.

네 가지 매개변수를 받습니다:  
  - `entity`: 'task' 또는 'link'인지 여부  
  - `action`: 연산 유형('create', 'update', 'delete')  
  - `payload`: 수정 중인 실제 데이터  
  - `id`: 수정 중인 항목의 식별자  

엔티티와 액션에 따라 적절한 Redux 액션을 디스패치합니다. 이것은 Gantt 차트의 내부 상태와 Redux 저장소 간의 원활한 연결을 만듭니다.

이 콜백에 대한 더 자세한 설명이 필요하면 Basics 가이드의 [data.save로 변경사항 처리](integrations/react/state/state-management-basics.md#handlingchangeswithdatasave)를 확인하세요.

마지막으로 전체 컴포넌트를 렌더링합니다:

~~~tsx
return (  
  <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>  
    <Toolbar onUndo={handleUndo} onRedo={handleRedo} onZoom={handleZoomIn} currentZoom={config.zoom.current} />

    <ReactGantt tasks={tasks} links={links} config={ganttConfig} templates={templates} data={data} ref={ganttRef} />  
  </div>  
);  
~~~

## Redux Provider 연동

`src/main.tsx`를 업데이트하여 Redux Provider를 포함합니다:

~~~tsx
import React from 'react';  
import { createRoot } from 'react-dom/client';  
import { Provider } from 'react-redux';  
import { store } from './redux/store';  
import './index.css';  
import App from './App';

createRoot(document.getElementById('root')!).render(  
  <React.StrictMode>  
    <Provider store={store}>  
      <App />  
    </Provider>  
  </React.StrictMode>  
);
~~~

그다음 `src/App.tsx`를 우리의 Gantt 컴포넌트를 사용하도록 업데이트합니다:

~~~tsx
import './App.css'  
import GanttComponent from './components/GanttComponent'

function App() {  
  return (  
    <div style={{ height: '100vh', width: '95vw' }}>  
      <GanttComponent />  
    </div>  
  )  
}

export default App
~~~

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
- React Gantt를 추가하고 Redux Toolkit 저장소에 연결했습니다
- `ganttSlice`에서 스냅샷 기반 undo/redo를 구현했습니다
- Material UI 툴바를 확대/축소 및 히스토리 동작에 연결했습니다
- `data.save` 콜백을 사용하여 Gantt 차트의 모든 작업/링크 변경이 Redux 액션으로 변환되도록 했습니다

그 결과는 Redux 상태에 의해 작업, 링크 및 구성이 완전히 구동되는 Gantt 차트입니다.

## GitHub 데모 저장소

이 튜토리얼을 따라 만든 완전한 작동하는 프로젝트는 GitHub에 제공됩니다: [GitHub 데모 저장소](https://github.com/dhtmlx/react-gantt-redux-starter).

## 다음 단계

다음 단계를 진행해 보세요:

- 이 예제의 개념을 다시 살펴보기 위해 [](integrations/react/state/state-management-basics.md)을 참조
- React Gantt 개요에서 Redux 기반 상태와 고급 구성 및 템플레이트를 결합해 보기
- 동일한 패턴을 다른 상태 관리 도구로도 적용해 보기:
  - [Zustand와 함께하는 React Gantt 사용](integrations/react/state/zustand.md)
  - [MobX와 함께하는 React Gantt 사용](integrations/react/state/mobx.md)
  - [XState와 함께하는 React Gantt 사용](integrations/react/state/xstate.md)
  - [Jotai와 함께하는 React Gantt 사용](integrations/react/state/jotai.md)
  - [Valtio와 함께하는 React Gantt 사용](integrations/react/state/valtio.md)
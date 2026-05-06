---
title: React Gantt와 MobX 사용
sidebar_label: MobX
description: "React Gantt를 MobX observable 상태와 통합합니다. observable 모델 설정, Gantt 업데이트에 반응, 그리고 저장 핸들러를 통해 차트를 동기화하는 방법을 다룹니다."
---

# React Gantt - MobX 튜토리얼

이 튜토리얼은 Vite로 React TypeScript 애플리케이션을 만들고, DHTMLX React Gantt 컴포넌트를 통합하며, MobX로 상태를 관리하는 방법을 안내합니다.

## 필요 사전 지식

- React, TypeScript, Vite, 그리고 MobX의 기본 지식
- 권장: 데이터 바인딩 모드와 이 튜토리얼이 기반으로 하는 `data.save` 콜백을 이해하기 위해 아래 문서를 읽으십시오. [](integrations/react/state/state-management-basics.md)

## 빠른 설정 - 프로젝트 생성

시작하기 전에 [Node.js](https://nodejs.org/en/)를 설치합니다.

Vite React + TypeScript 프로젝트를 생성합니다:

~~~bash
npm create vite@latest react-gantt-mobx-demo -- --template react-ts  
cd react-gantt-mobx-demo  
~~~

이제 필요한 의존성을 설치합니다.

- **npm**의 경우:

~~~bash
npm install mobx mobx-react-lite @mui/material @mui/icons-material @emotion/react @emotion/styled
~~~

- **yarn**의 경우:

~~~bash
yarn add mobx mobx-react-lite @mui/material @mui/icons-material @emotion/react @emotion/styled
~~~

애플리케이션이 함수형 컴포넌트를 사용하기 때문에 전체 `mobx-react` 패키지 대신 `mobx-react-lite`를 사용합니다. “lite” 버전은 함수형 컴포넌트와 훅에 최적화되어 번들 크기를 줄이면서 필요한 MobX-React 통합 기능을 제공합니다.

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

Professional 패키지를 이미 사용 중이라면 명령어 및 임포트에서 `@dhtmlx/trial-react-gantt`를 `@dhx/react-gantt`로 교체합니다.

이제 개발 서버를 시작할 수 있습니다:

~~~bash
npm run dev 
~~~

이제 `http://localhost:5173`에서 React 프로젝트가 실행되고 있어야 합니다.

:::note
Gantt가 본문(body) 공간을 완전히 차지하도록 하려면 `src` 폴더에 있는 `App.css`의 기본 스타일을 제거하고 아래 스타일을 추가해야 합니다:

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

Gantt 차트의 초기 데이터를 담고 있는 `src/seed/Seed.ts`를 생성합니다:

~~~tsx
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

## 컨트롤 툴바 컴포넌트 구성

이제 `src/components/Toolbar.tsx`에 **Toolbar** 컴포넌트를 추가해 봅시다.

이 컴포넌트는 일간/day, 월/month, 연도/year 뷰 간의 확대/축소와 **undo/redo** 동작 등 Gantt 컨트롤에 빠르게 접근할 수 있도록 제공합니다.

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

Material UI 컴포넌트(Button, ButtonGroup, Divider 및 아이콘)을 사용해 간단하고 깔끔한 툴바 레이아웃을 구성하고 Gantt 차트에 직관적인 제어를 제공합니다.

툴바가 MobX 스토어와 원활하게 연결되도록 다음과 같은 선택적 props를 받습니다.

- `onUndo` 및 `onRedo` - undo/redo 동작에 대한 콜백 함수
- `onZoom` - 사용자가 확대/축소 버튼을 클릭할 때 스토어의 줌 레벨을 업데이트하는 콜백
- `currentZoom` - 현재 활성화된 줌 레벨을 나타내며, 선택된 버튼에 하이라이트를 적용

"Day", "Month", "Year" 버튼은 각각 `onZoom('day')`, `onZoom('month')`, `onZoom('year')`를 호출합니다. 선택된 줌 레벨의 버튼은 `variant="contained"`를 사용하고, 나머지 버튼은 `outlined`로 표시되어 현재 상태를 분명히 보여 줍니다.

툴바는 MobX 스토어의 액션에 직접 연결됩니다:

- 줌 컨트롤: 사용자가 "Day"를 클릭하면 MobX 스토어의 `setZoom('day')`를 호출하여 Gantt 차트의 구성을 자동으로 업데이트하고 재렌더링을 트리거합니다  
- Undo 버튼은 스토어의 `undo()` 메서드를 트리거하여 이전 상태로 되돌립니다  
- Redo 버튼은 `redo()`를 호출하여 변경 사항을 다시 적용합니다  
- 모든 상태 변경(작업 편집, 삭제, 줌 조정 등)은 커스텀 히스토리 시스템에 추적되며 원활하게 되돌리거나 다시 적용됩니다

## 메인 Gantt 컴포넌트 생성

이제 Gantt 차트를 호스트할 메인 컴포넌트를 구축해 봅시다. `src/components/GanttComponent.tsx`를 만들어 보겠습니다.

먼저 React의 `useEffect`, `useMemo`를 가져오고, Gantt 패키지의 메인 `ReactGantt` 컴퍼넌트와 타입들, 커스텀 `Toolbar` 컴포넌트, 그리고 곧 생성할 MobX 스토어 인스턴스를 임포트합니다:

~~~tsx
import React, { useEffect, useMemo } from 'react';
import { observer } from 'mobx-react-lite';
import ReactGantt, { type ReactGanttProps, type SerializedTask, type Link } from '@dhtmlx/trial-react-gantt';
import '@dhtmlx/trial-react-gantt/dist/react-gantt.css';

import Toolbar from './Toolbar';
import { store } from '../store';
~~~

이제 컴포넌트를 설정하고 MobX 스토어에 연결합니다:

~~~tsx
const DemoMobXBasic: React.FC = observer(() => {  
  const {  
    tasks,  
    links,  
    config,  
    setZoom,  
    addTask,  
    upsertTask,  
    deleteTask,  
    addLink,  
    upsertLink,  
    deleteLink,  
    undo,  
    redo,  
  } = store;

  useEffect(() => {  
    document.title = 'DHTMLX React Gantt | MobX';  
  }, []);
}
~~~

컴포넌트는 `mobx-react-lite`의 `observer()`로 감싸져 있어 관찰 가능한 상태 변경을 자동으로 추적합니다. 이는 저장소의 관련 속성(tasks, links, config)이 수정될 때 컴포넌트가 리렌더링되도록 합니다.

- 상태와 액션을 한 번의 구조 분해 할당으로 추출합니다  
- 컴포넌트가 마운트될 때 문서 제목을 설정합니다

다음으로 Gantt 차트의 템플릿을 구성하여 일관된 데이터 처리에 필요한 날짜 포맷팅과 구문 분석을 정의합니다:

:::note
v9.1.3부터 Gantt가 ISO 날짜 문자열을 자동으로 감지하므로 이 템플릿 재정의는 더 이상 필요하지 않습니다. 하지만 예전 Gantt 버전과의 호환성을 위해 여기에 보여 두었습니다.
::: 

~~~tsx
const templates: ReactGanttProps['templates'] = useMemo(
  () => ({
    format_date: (d) => d.toISOString(),
    parse_date: (s) => new Date(s),
  }),
  []
);
~~~

가장 중요한 부분인 Gantt 데이터 변경을 MobX 스토어와 연결하는 로직:

~~~tsx
const data: ReactGanttProps['data'] = useMemo(
  () => ({
    save: (entity, action, item, id) => {
      if (entity === 'task') {
        const task = item as SerializedTask;
        if (action === 'create') return addTask(task);
        if (action === 'update') return upsertTask(task);
        if (action === 'delete') return deleteTask(id);
      }
      if (entity === 'link') {
        const link = item as Link;
        if (action === 'create') return addLink(link);
        if (action === 'update') return upsertLink(link);
        if (action === 'delete') return deleteLink(id);
      }
    },
  }),
  [addTask, upsertTask, deleteTask, addLink, upsertLink, deleteLink]
);
~~~

- `data.save` 콜백은 Gantt 차트의 모든 데이터 수정 작업을 처리합니다  
- 서로 다른 작업(create, update, delete)을 적절한 스토어 액션으로 라우팅합니다  
- 의존성 배열은 스토어 액션이 변경될 때 콜백이 업데이트되도록 보장합니다

이 콜백에 대한 더 깊은 설명이 필요하다면 Basics 가이드의 [Handling changes with data.save](integrations/react/state/state-management-basics.md#handlingchangeswithdatasave)를 참조하십시오.

마지막으로 전체 컴포넌트를 렌더링합니다:

~~~tsx
return (
  <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>  
    <Toolbar onUndo={undo} onRedo={redo} currentZoom={config.zoom.current} onZoom={setZoom} />  
    <ReactGantt tasks={tasks} links={links} config={config} templates={templates} data={data} />  
  </div>  
);  

export default DemoMobXBasic;
~~~

- `Toolbar`는 undo/redo 및 줌 제어 핸들러를 받습니다  
- `ReactGantt` 컴포넌트는 모든 데이터, 구성 및 콜백을 전달받습니다

이제 Gantt 컴포넌트를 사용하는 `src/App.tsx`를 업데이트합니다:

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

## MobX 스토어 설정

이제 MobX를 사용해 상태 관리를 위한 솔루션을 만들어 봅시다. `src/store.ts`를 생성합니다:

~~~ts
import { makeAutoObservable } from 'mobx';  
import type { Task, Link, GanttConfig, SerializedTask } from '@dhtmlx/trial-react-gantt';  
import { seedTasks, seedLinks, defaultZoomLevels, type ZoomLevel } from './seed/Seed';

interface Snapshot {  
  tasks: SerializedTask[];  
  links: Link[];  
  config: GanttConfig;  
}

export class GanttStore {  
  tasks: SerializedTask[] = seedTasks;  
  links: Link[] = seedLinks;  
  config: GanttConfig = {  
    zoom: defaultZoomLevels,  
  };  
  past: Snapshot[] = [];  
  future: Snapshot[] = [];  
  maxHistory: number = 50;

  constructor() {  
    makeAutoObservable(this, {}, { autoBind: true });  
  }
}
~~~

- `GanttStore` 클래스는 Gantt 관련 상태와 로직을 캡슐화합니다  
- 스토어는 `tasks`, `links`, `config`를 관리합니다 — 핵심 Gantt 데이터 구조  
- `past`와 `future` 배열은 undo/redo 히스토리 트래킹을 구현합니다  
- `makeAutoObservable`은 필드를 관찰 가능으로, 게터를 계산값으로, 메서드를 액션으로 자동 표시합니다  
- `autoBind: true` 옵션으로 메서드가 항상 올바른 `this` 컨텍스트를 유지하도록 합니다

이제 상태 업데이트와 히스토리 관리를 처리하는 스토어 메서드를 구현합니다:

~~~ts
_snapshot(): Snapshot {  
  return {  
    tasks: JSON.parse(JSON.stringify(this.tasks)),  
    links: JSON.parse(JSON.stringify(this.links)),  
    config: JSON.parse(JSON.stringify(this.config)),  
  };  
}

_saveToHistory() {  
  this.past.push(this._snapshot());  
  if (this.past.length > this.maxHistory) this.past.shift();  
  this.future = [];  
}

undo() {  
  if (this.past.length === 0) return;  
  const previous = this.past.pop();  
  if (previous) {  
    this.future.unshift(this._snapshot());  
    this.tasks = previous.tasks;  
    this.links = previous.links;  
    this.config = previous.config;  
  }  
}

redo() {  
  if (this.future.length === 0) return;  
  const next = this.future.shift();  
  if (next) {  
    this.past.push(this._snapshot());  
    this.tasks = next.tasks;  
    this.links = next.links;  
    this.config = next.config;  
  }  
}
~~~

- `_snapshot()`는 현재 상태의 깊은 복사를 생성하여 히스토리 추적에 사용합니다  
- `_saveToHistory()`는 수정 전에 현재 상태를 보존하고 되돌리기 스택을 초기화합니다  
- `undo()`는 `past`에서 가장 최근 상태를 복원하고 현재 상태를 `future`로 이동합니다  
- `redo()`는 `future`에서 다음 상태를 재적용하고 현재 상태를 `past`에 저장합니다

이제 Gantt에 특화된 액션들을 구현합니다:

~~~ts
setZoom(level: ZoomLevel) {  
  this._saveToHistory();  
  this.config = { ...this.config, zoom: { ...this.config.zoom, current: level } };  
}

addTask(task: SerializedTask) {  
  this._saveToHistory();  
  const newTask = { ...task, id: `DB_ID:${task.id}` };  
  this.tasks.push(newTask);  
  return newTask;  
}

upsertTask(task: SerializedTask) {  
  this._saveToHistory();  
  const index = this.tasks.findIndex((t) => String(t.id) === String(task.id));  
  if (index !== -1) this.tasks[index] = { ...this.tasks[index], ...task };  
}

deleteTask(id: string | number) {  
  this._saveToHistory();  
  this.tasks = this.tasks.filter((t) => String(t.id) !== String(id));  
}

addLink(l: Link) {  
  this._saveToHistory();  
  const newLink = { ...l, id: `DB_ID:${l.id}` };  
  this.links.push(newLink);  
  return newLink;  
}

upsertLink(l: Link) {  
  this._saveToHistory();  
  const index = this.links.findIndex((link) => String(link.id) === String(l.id));  
  if (index !== -1) this.links[index] = { ...this.links[index], ...l };  
}

deleteLink(id: string | number) {  
  this._saveToHistory();  
  this.links = this.links.filter((l) => String(l.id) !== String(id));  
}  

export const store = new GanttStore();
~~~

- `setZoom`는 줌 레벨 구성을 업데이트하면서 히스토리를 유지합니다  
- `addTask`는 데이터베이스 ID를 시뮬레이션한 새로운 태스크를 생성하고 해당 작업을 기록합니다  
- `upsertTask`는 ID로 기존 태스크를 업데이트하고 히스토리를 보존합니다  
- `deleteTask`는 ID로 태스크를 제거하고 히스토리 추적을 수행합니다  
- 태스크 관련 작업(`addTask`, `upsertTask`, `deleteTask`)은 모두 변경 전에 `_saveToHistory()`를 호출하여 모든 상태 전환이 저장되고 되돌릴 수 있도록 합니다

## 애플리케이션 실행

마지막으로 개발 서버를 실행하고 애플리케이션을 테스트할 수 있습니다:

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
- React Gantt를 추가하고 MobX 스토어에 연결했습니다
- `GanttStore`에서 과거-미래(history) 기반 Undo/Redo를 구현했습니다
- observable MobX 상태로 줌 구성, 태스크 및 링크를 완전히 제어했습니다
- `data.save` 콜백을 사용하여 Gantt 차트의 모든 변경을 스토리 액션으로 전환했습니다

이로써 Gantt 컴포넌트는 완전히 선언적으로 작동하고, 모든 MUTATION 로직과 히스토리 처리는 MobX 상태 안에 캡슐화됩니다.

## GitHub 데모 저장소

이 튜토리얼을 따라 만든 완전한 작동 프로젝트는 [GitHub에 제공됩니다](https://github.com/dhtmlx/react-gantt-mobx-starter).

## 다음 단계

더 자세히 다루고 싶다면:

- [](integrations/react/state/state-management-basics.md) 이 예제 뒤의 개념을 다시 살펴보기
- [React Gantt 개요](integrations/react/overview.md)에서 스토어 기반 상태와 고급 구성 및 템플레이팅을 결합해 보기
- 같은 패턴을 다른 상태 관리 도구와 함께 살펴보기:
  - [Redux Toolkit을 사용한 React Gantt](integrations/react/state/redux-toolkit.md)
  - [Zustand를 사용한 React Gantt](integrations/react/state/zustand.md)
  - [XState를 사용한 React Gantt](integrations/react/state/xstate.md)
  - [Jotai를 사용한 React Gantt](integrations/react/state/jotai.md)
  - [Valto를 사용한 React Gantt](integrations/react/state/valtio.md)
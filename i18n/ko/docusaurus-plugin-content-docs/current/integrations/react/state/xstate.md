---
title: React Gantt - XState 튜토리얼
sidebar_label: XState
description: "React Gantt를 XState 기반 아키텍처에 통합하는 방법을 배우세요. 상태 머신에서 Gantt 데이터를 모델링하고, 저장 콜백의 이벤트를 처리하며, UI와 비즈니스 로직을 조정하는 방법을 다룹니다."
---


# React Gantt - XState 튜토리얼

이 튜토리얼은 Vite를 사용한 React TypeScript 애플리케이션을 만들고, DHTMLX React Gantt 컴포넌트를 통합하며, XState로 상태를 관리하는 방법을 안내합니다.

## 필수 지식

- React, TypeScript, Vite, 및 XState에 대한 기본 지식
- 권장: 데이터 바인딩 모드와 이 튜토리얼이 기반으로 하는 `data.save` 콜백을 이해하기 위해 [](integrations/react/state/state-management-basics.md)을 읽는 것이 좋습니다.

## 빠른 설정 - 프로젝트 생성

시작하기 전에 [Node.js](https://nodejs.org/en/)를 설치하세요.

Vite React + TypeScript 프로젝트를 생성합니다:

~~~bash  
npm create vite@latest react-gantt-xstate-demo -- --template react-ts  
cd react-gantt-xstate-demo  
~~~

이제 필요한 의존성을 설치합니다.

* For **npm**: 

~~~bash
npm install xstate @xstate/react @mui/material @mui/icons-material @emotion/react @emotion/styled
~~~

* For **yarn**:

~~~bash
yarn add xstate @xstate/react @mui/material @mui/icons-material @emotion/react @emotion/styled
~~~

그 다음 React Gantt 패키지를 설치해야 합니다. 

### Installing React Gantt

React Gantt를 [React Gantt 설치 가이드](integrations/react/installation.md)에 따라 설치합니다.

이번 튜토리얼에서는 평가 패키지를 사용합니다:

~~~bash
npm install @dhtmlx/trial-react-gantt
~~~

또는

~~~bash
yarn add @dhtmlx/trial-react-gantt
~~~

Professional 패키지를 이미 사용 중이라면 명령과 임포트에서 `@dhtmlx/trial-react-gantt`를 `@dhx/react-gantt`로 교체하세요.


Dev 서버를 이제 시작할 수 있습니다:

~~~bash
npm run dev 
~~~

이제 React 프로젝트가 `http://localhost:5173`에서 실행 중이어야 합니다.

:::note
Gantt가 body의 전체 공간을 차지하도록 하려면, `src` 폴더에 있는 `App.css`의 기본 스타일을 제거하고 아래 스타일을 추가해야 합니다:

~~~css  
#root { 
  margin: 0; 
  padding: 0; 
  height: 100%; 
  width: 100%; 
} 
~~~
:::

## 예제 데이터 및 구성 설정 설정

Gantt 차트용 초기 데이터를 담은 `src/seed/Seed.ts` 파일을 생성합니다:

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

## 제어 도구 모음 컴포넌트 구축

이제 `src/components/Toolbar.tsx`에서 **Toolbar** 컴포넌트를 추가합니다.

이 컴포넌트는 Day, Month, Year 뷰 간의 줌 조정과 **undo/redo** 동작 같은 일반적인 Gantt 컨트롤에 빠르게 접근할 수 있도록 합니다.

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

Material UI의 Button, ButtonGroup, Divider 및 아이콘을 사용해 간결하고 직관적인 Gantt 차트 도구 모음 레이아웃을 만듭니다.

도구 모음은 XState 머신과의 매끄러운 통합을 가능하게 하는 다음 선택적 props를 받습니다:

- `onUndo` 와 `onRedo` - 머신에 undo/redo 이벤트를 디스패치하는 콜백 함수들
- `onZoom` - 사용자가 줌 버튼을 클릭할 때 머신에 줌 업데이트 이벤트를 보내는 콜백
- `currentZoom` - 현재 활성화된 줌 레벨을 나타내며, 도구 모음에서 선택된 버튼을 하이라이트

"Day", "Month" 및 "Year" 버튼은 각각 `onZoom('day')`, `onZoom('month')`, `onZoom('year')`를 호출합니다. 선택된 줌 레벨 버튼은 `variant="contained"`를 사용하고, 나머지 버튼은 `outlined`로 표시되어 현재 상태를 명확하게 시각화합니다.

도구 모음은 이벤트 디스패치를 통해 XState 머신에 직접 연결됩니다:

- 줌 컨트롤: 사용자가 "Day"를 클릭하면 해당 레벨과 함께 `SET_ZOOM` 이벤트를 상태 머신에 보내고, 미리 정의된 동작을 통해 Gantt 차트의 구성을 업데이트합니다  
- Undo 버튼은 머신에 `UNDO` 이벤트를 보내 Undo 동작을 트리거하여 이전 상태로 되돌리고, Redo 버튼은 `REDO` 이벤트로 변경을 다시 적용합니다  
- 모든 상태 변경(작업 편집, 삭제, 줌 조정 등)은 상태 머신에서 개별 이벤트로 처리되며, 히스토리 시스템을 통해 되돌리거나 다시 적용될 수 있습니다  


## 메인 Gantt 컴포넌트 만들기

먼저 Gantt 차트를 호스팅할 메인 컴포넌트를 구축합니다. `src/components/GanttComponent.tsx`를 만드세요.

먼저 React의 `useEffect`, `useMemo`, `useRef`와 Gantt 패키지의 메인 컴포넌트 및 타입, 우리가 만든 커스텀 `Toolbar` 컴포넌트, XState 설정의 `ganttMachine`을 가져옵니다:

~~~tsx
import { useCallback, useEffect, useMemo } from 'react';
import { useMachine } from '@xstate/react';
import ReactGantt, {
  type ReactGanttRef,
  type ReactGanttProps,
  type Link,
  type SerializedTask,
} from '@dhtmlx/trial-react-gantt';
import '@dhtmlx/trial-react-gantt/dist/react-gantt.css';

import Toolbar from './Toolbar';
import { ganttMachine } from '../machine';
import { type ZoomLevel } from '../seed/Seed';
~~~

다음으로 컴포넌트를 설정하고 XState 머신에 연결합니다:

~~~tsx
export default function DemoXState() {  
  const [state, send] = useMachine(ganttMachine);  
  const ganttRef = useRef<ReactGanttRef>(null);

  useEffect(() => {  
    document.title = 'DHTMLX React Gantt | XState';  
  }, []);
}
~~~

- `@xstate/react`의 `useMachine` 훅을 사용해 컴포넌트를 상태 머신에 연결합니다  
- 훅은 현재의 `state`와 머신에 이벤트를 디스패치하기 위한 `send` 함수를 반환합니다  
- `ganttRef`는 명령형 연산을 위한 Gantt 인스턴스에 직접 접근할 수 있게 해 줍니다  
- `useEffect`는 컴포넌트가 마운트될 때 문서 제목을 설정합니다

Gantt 차트의 템플릿을 구성해 날짜 형식화 및 파싱을 정의하여 일관된 데이터 처리 및 이벤트 핸들러를 제공합니다:

:::note
버전 v9.1.3부터 Gantt는 ISO 날짜 문자열을 자동으로 감지합니다. 이 템플릿 재정의는 더 이상 필요하지 않습니다. 그러나 이전 버전과의 호환성을 위해 여기에서 보여 주고 있습니다. 
[Loading dates in ISO format](guides/loading.md#loading-dates-in-iso-format)을 참조하십시오.
:::

~~~tsx
const templates: ReactGanttProps['templates'] = useMemo(
  () => ({
    format_date: (d) => d.toISOString(),
    parse_date: (s) => new Date(s),
  }),
  []
);

const handleUndo = useCallback(() => {  
  send({ type: 'UNDO' });  
}, [send]);

const handleRedo = useCallback(() => {  
  send({ type: 'REDO' });  
}, [send]);

const handleZoom = useCallback(  
  (level: ZoomLevel) => {  
    send({ type: 'SET_ZOOM', level });  
  },  
  [send]  
);
~~~

여기서는 이벤트 핸들러를 `useCallback`으로 메모이즈하여 Undo, Redo 및 Zoom 작업이 컴포넌트가 업데이트될 때 하위 컴포넌트가 불필요하게 재렌더링되는 것을 방지합니다. 각 핸들러는 필요한 페이로드와 함께 특정 이벤트 타입을 상태 머신에 디스패치합니다.

그리고 가장 중요한 부분인 Gantt 데이터 변경을 XState 머신에 연결하는 부분:

~~~tsx
const data: ReactGanttProps['data'] = useMemo(  
  () => ({  
    save: (entity, action, item, id) => {  
      if (entity === 'task') {  
        const task = item as SerializedTask;  
        if (action === 'create') {  
          send({ type: 'ADD_TASK', task });  
        } else if (action === 'update') {  
          send({ type: 'UPSERT_TASK', task });  
        } else if (action === 'delete') {  
          send({ type: 'DELETE_TASK', id });  
        }  
      } else if (entity === 'link') {  
        const link = item as Link;  
        if (action === 'create') {  
          send({ type: 'ADD_LINK', link });  
        } else if (action === 'update') {  
          send({ type: 'UPSERT_LINK', link });  
        } else if (action === 'delete') {  
          send({ type: 'DELETE_LINK', id });  
        }  
      }  
    },  
  }),  
  [send]  
);
~~~

- `data.save` 콜백은 Gantt 차트의 모든 데이터 수정 작업을 처리합니다  
- Gantt 차트의 각 작업은 `send` 함수를 사용해 특정 머신 이벤트로 전달됩니다  
- 머신의 컨텍스트에 있는 모든 데이터 변경은 이벤트로 변환되어 처리됩니다  
- 의존성 배열은 `send` 함수가 변할 때 콜백이 업데이트되도록 보장합니다

이 콜백에 대한 더 깊은 설명이 필요하면 Basics 가이드의 [Handling changes with data.save](integrations/react/state/state-management-basics.md#handlingchangeswithdatasave)를 참조하세요.

마지막으로 전체 컴포넌트를 렌더링합니다:

~~~tsx
return (  
  <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>  
    <Toolbar  
      onUndo={handleUndo}  
      onRedo={handleRedo}  
      currentZoom={state.context.config.zoom.current}  
      onZoom={handleZoom}  
    />  
    <ReactGantt  
      ref={ganttRef}  
      tasks={state.context.tasks}  
      links={state.context.links}  
      config={state.context.config}  
      templates={templates}  
      data={data}  
    />  
  </div>  
);  
~~~

- Toolbar는 `UNDO`, `REDO`, `SET_ZOOM` 이벤트를 상태 머신으로 디스패치하는 이벤트 핸드러를 받습니다  
- ReactGantt 컴포넌트는 머신의 컨텍스트에서 가져온 모든 데이터(`tasks`, `links`, `config`)를 받습니다

그리고 이 Gantt 컴포넌트를 사용하도록 `src/App.tsx`를 업데이트합니다:

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

## XState 머신 설정

이제 XState를 사용해 상태 관리 솔루션을 만듭니다. `src/machine.ts`를 만드세요:

~~~ts
import { createMachine, assign } from 'xstate';  
import type { Link, GanttConfig, SerializedTask } from '@dhtmlx/trial-react-gantt';  
import { seedTasks, seedLinks, defaultZoomLevels, type ZoomLevel } from './seed/Seed';

export interface Snapshot {  
  tasks: SerializedTask[];  
  links: Link[];  
  config: GanttConfig;  
}

export interface ContextType {  
  tasks: SerializedTask[];  
  links: Link[];  
  config: GanttConfig;

  past: Snapshot[];  
  future: Snapshot[];  
  maxHistory: number;  
}
~~~

- 머신의 컨텍스트 및 스냅샷 구조에 대한 TypeScript 인터페이스를 정의합니다  
- `ContextType`은 작업, 링크, 구성 및 이력 추적에 관련된 모든 Gantt 관련 상태를 정의합니다  
- `Snapshot` 인터페이스는 Undo/Redo 기능을 위한 상태 구조를 나타냅니다

이제 머신이 처리할 이벤트 타입을 정의합니다:

~~~ts
type SetZoomEvent = { type: 'SET_ZOOM'; level: ZoomLevel };  
type UndoEvent = { type: 'UNDO' };  
type RedoEvent = { type: 'REDO' };  
type AddTaskEvent = { type: 'ADD_TASK'; task: SerializedTask };  
type UpsertTaskEvent = { type: 'UPSERT_TASK'; task: SerializedTask };  
type DeleteTaskEvent = { type: 'DELETE_TASK'; id: string | number };  
type AddLinkEvent = { type: 'ADD_LINK'; link: Link };  
type UpsertLinkEvent = { type: 'UPSERT_LINK'; link: Link };  
type DeleteLinkEvent = { type: 'DELETE_LINK'; id: string | number };

type EventType =  
  | SetZoomEvent  
  | UndoEvent  
  | RedoEvent  
  | AddTaskEvent  
  | UpsertTaskEvent  
  | DeleteTaskEvent  
  | AddLinkEvent  
  | UpsertLinkEvent  
  | DeleteLinkEvent;
~~~

- 각 사용자 상호작용은 특정 타입과 페이로드를 가진 개별 이벤트로 표현됩니다  
- 이벤트는 애플리케이션 전체에서 타입 안전성을 보장합니다

이제 머신 구성(configuration)을 정의합니다:

~~~ts
const createSnapshot = (ctx: ContextType): Snapshot => ({  
  tasks: structuredClone(ctx.tasks),  
  links: structuredClone(ctx.links),  
  config: structuredClone(ctx.config),  
});

export const ganttMachine = createMachine(  
  {  
    id: 'gantt',  
    types: {  
      context: {} as ContextType,  
      events: {} as EventType,  
    },  
    context: {  
      tasks: seedTasks,  
      links: seedLinks,  
      config: { zoom: defaultZoomLevels },  
      past: [],  
      future: [],  
      maxHistory: 50,  
    },  
    initial: 'ready',  
    states: {  
      ready: {  
        on: {  
          SET_ZOOM: { actions: ['pushHistory', 'setZoom'] },  
          UNDO: { actions: 'undo' },  
          REDO: { actions: 'redo' },

          ADD_TASK: { actions: ['pushHistory', 'addTask'] },  
          UPSERT_TASK: { actions: ['pushHistory', 'upsertTask'] },  
          DELETE_TASK: { actions: ['pushHistory', 'deleteTask'] },

          ADD_LINK: { actions: ['pushHistory', 'addLink'] },  
          UPSERT_LINK: { actions: ['pushHistory', 'upsertLink'] },  
          DELETE_LINK: { actions: ['pushHistory', 'deleteLink'] },  
        },  
      },  
    },  
  },  
)
~~~

머신 구성:

- 머신은 모든 Gantt 작업이 가능한 단일 `ready` 상태를 갖습니다  
- 각 이벤트는 머신의 컨텍스트를 업데이트하는 일련의 액션을 트리거합니다  
- `context`는 샘플 데이터와 빈 이력 배열로 초기 상태를 정의합니다  
- 이벤트 핸들러는 이벤트 수신 시 어떤 액션을 실행할지 명시합니다

다음으로 상태 업데이트를 처리하는 액션을 구현합니다:

~~~ts
{  
  actions: {  
    pushHistory: assign(({ context }) => {  
      const snap = createSnapshot(context);  
      const past = [...context.past, snap];  
      if (past.length > context.maxHistory) past.shift();

      return {  
        past,  
        future: [],  
      };  
    }),  
    setZoom: assign(({ context, event }) => ({  
      config: {  
        ...context.config,  
        zoom: { ...context.config.zoom, current: (event as SetZoomEvent).level },  
      },  
    })),

    undo: assign(({ context }) => {  
      if (context.past.length === 0) return {};

      const previous = context.past[context.past.length - 1];  
      const future = [createSnapshot(context), ...context.future];

      return {  
        ...previous,  
        past: context.past.slice(0, -1),  
        future,  
      };  
    }),

    redo: assign(({ context }) => {  
      if (context.future.length === 0) return {};

      const next = context.future[0];  
      const past = [...context.past, createSnapshot(context)];

      return {  
        ...next,  
        past,  
        future: context.future.slice(1),  
      };  
    }),
  }
}
~~~

히스토리 관리 액션:

* `pushHistory`는 현재 상태의 스냅샷을 생성해 히스토리 스택에 추가합니다  
* `undo`는 `past` 배열에서 이전 상태를 복원하고, 현재 상태를 `future`로 이동시킵니다  
* `redo`는 `future`에서 다음 상태를 재적용하고 현재 상태를 `past`에 저장합니다

그리고 Gantt에 특화된 데이터 작업을 구현합니다:

~~~ts
addTask: assign(({ context: ctx, event }) => ({  
  tasks: [...ctx.tasks, { ...(event as AddTaskEvent).task, id: `DB_ID:${(event as AddTaskEvent).task.id}` }],  
})),

upsertTask: assign(({ context: ctx, event }) => ({  
  tasks: ctx.tasks.map((task) =>  
    String(task.id) === String((event as UpsertTaskEvent).task.id)  
      ? { ...task, ...(event as UpsertTaskEvent).task }  
      : task  
  ),  
})),

deleteTask: assign(({ context, event }) => ({  
  tasks: context.tasks.filter((t) => String(t.id) !== String((event as DeleteTaskEvent).id)),  
})),

addLink: assign(({ context, event }) => ({  
  links: [...context.links, { ...(event as AddLinkEvent).link, id: `DB_ID:${(event as AddLinkEvent).link.id}` }],  
})),

upsertLink: assign(({ context, event }) => ({  
  links: context.links.map((l) =>  
    String(l.id) === String((event as UpsertLinkEvent).link.id) ? { ...l, ...(event as UpsertLinkEvent).link } : l  
  ),  
})),

deleteLink: assign(({ context, event }) => ({  
  links: context.links.filter((l) => String(l.id) !== String((event as DeleteLinkEvent).id)),  
})),  
~~~

- `addTask`는 데이터베이스 ID를 모사한 새 태스크를 생성해 태스크 목록에 추가합니다  
- `upsertTask`는 ID로 기존 태스크를 업데이트합니다 
- `deleteTask`는 ID로 태스크를 목록에서 제거합니다  
- 링크 작업(`addLink`, `upsertLink`, `deleteLink`)에도 비슷한 패턴이 적용됩니다  
- 각 데이터 수정 작업은 Undo/Redo 기능을 보장하기 위해 `pushHistory`와 함께 연결됩니다  
- XState의 `assign` 함수는 머신의 컨텍스트를 불변으로 업데이트하는 데 사용됩니다

## 애플리케이션 실행

마지막으로 개발 서버를 실행하고 애플리케이션을 테스트해 볼 수 있습니다:

~~~bash
npm run dev
~~~

또는:

~~~bash
yarn dev 
~~~ 


## 요약

이 튜토리얼에서 여러분은:

- Vite + React 프로젝트를 생성했습니다
- React Gantt를 추가하고 이를 `useMachine`을 통해 XState 머신에 연결했습니다
- 머신 컨텍스트에 작업, 링크 및 줌 구성을 모델링했습니다
- `past`/`future` 히스토리 배열과 `pushHistory` 액션을 사용한 스냅샷 기반 Undo/Redo를 구현했습니다
- Gantt 차트의 변경을 강하게 타입된 XState 이벤트로 만들기 위해 `data.save` 콜백을 사용했습니다

이를 통해 Gantt 컴포넌트는 선언적으로 유지되며, 모든 변이 로직과 히스토리 관리는 상태 머신 내부에 위치합니다.

## GitHub 데모 저장소

이 튜토리얼을 따라 작동하는 완전한 프로젝트는 GitHub에서 제공합니다: https://github.com/dhtmlx/react-gantt-xstate-starter

## 다음 단계

다음 단계로 진행하려면:

- [](integrations/react/state/state-management-basics.md)에서 이 예제의 개념을 다시 살펴보기
- [React Gantt 개요](integrations/react/overview.md)에서 XState 머신과 고급 구성 및 템플레이팅을 결합하기
- 이 XState 기반 아키텍처를 다른 상태 관리 도구와 비교하기:
  - [Redux Toolkit으로 React Gantt 사용](integrations/react/state/redux-toolkit.md)
  - [MobX로 React Gantt 사용](integrations/react/state/mobx.md)
  - [Zustand로 React Gantt 사용](integrations/react/state/zustand.md)
  - [Jotai로 React Gantt 사용](integrations/react/state/jotai.md)
  - [Valtio로 React Gantt 사용](integrations/react/state/valtio.md)
---
title: React Gantt와 TanStack Query 사용하기
sidebar_label: TanStack Query
description: 'TanStack Query로 Gantt 서버 상태를 관리하고, 데이터 저장(callback)에 뮤테이션을 연결하며, Undo/Redo 히스토리와 UI 구성을 위한 경량 Zustand 저장소와 결합하는 방법을 알아보세요.'
---

# React Gantt - TanStack Query 튜토리얼

이 튜토리얼은 Vite를 사용한 React TypeScript 애플리케이션을 만들고, DHTMLX React Gantt 컴포넌트를 통합하며, TanStack Query로 서버 상태를 관리하는 방법을 안내합니다. 로컬 UI 상태를 다루는 작은 Zustand 저장소는 Undo/Redo 이력과 줌 구성 같은 UI 상태를 처리합니다.

이 튜토리얼의 초점은 **클라이언트 측 통합**: TanStack Query가 데이터를 어떻게 가져오는지, 뮤테이션이 Gantt의 `data.save` 콜백에 어떻게 연결되는지, 그리고 쿼리 캐시가 Gantt 데이터의 단일 진실 소스로 어떻게 사용되는지에 관한 것입니다. 데모에 포함된 백엔드는 의도적으로 최소화되어 있습니다 - 실제 데이터베이스 대신 로컬 JSON 파일을 저장소로 사용합니다. 이는 관련 없는 인프라를 추가하지 않고 작동하는 REST API를 시연하기에 충분합니다. 프로덕션 애플리케이션에서는 원하는 영구 저장소 솔루션으로 이를 교체하면 됩니다.

## 선행 지식

- React, TypeScript, Vite 및 TanStack Query에 대한 기본 지식
- 권장: [](integrations/react/state/state-management-basics.md)를 읽어 데이터 바인딩 모드와 이 튜토리얼이 기반으로 하는 `data.save` 콜백을 이해하세요.

## 빠른 설정 - 프로젝트 생성

시작하기 전에 Node.js를 설치하세요.

Vite React + TypeScript 프로젝트를 생성합니다:

```bash
npm create vite@latest react-gantt-tanstack-query-demo -- --template react-ts
cd react-gantt-tanstack-query-demo
```

이제 필요한 의존성을 설치합니다.

- **npm**의 경우:

```bash
npm install @tanstack/react-query zustand @mui/material @mui/icons-material @emotion/react @emotion/styled express cors
```

- **yarn**의 경우:

```bash
yarn add @tanstack/react-query zustand @mui/material @mui/icons-material @emotion/react @emotion/styled express cors
```

또한 Express 백엔드 서버를 TypeScript로 실행하기 위한 Dev 의존성이 필요합니다:

- **npm**의 경우:

```bash
npm install -D tsx nodemon @types/express @types/node
```

- **yarn**의 경우:

```bash
yarn add -D tsx nodemon @types/express @types/node
```

그다음 React Gantt 패키지를 설치합니다.

### React Gantt 설치

[GReact Gantt 설치 가이드](integrations/react/installation.md)에 설명된 대로 React Gantt를 설치합니다.

이 튜토리얼에서는 평가 패키지를 사용합니다:

```bash
npm install @dhtmlx/trial-react-gantt
```

또는

```bash
yarn add @dhtmlx/trial-react-gantt
```

Professional 패키지를 이미 사용하는 경우 명령과 임포트에서 `@dhtmlx/trial-react-gantt`를 `@dhx/react-gantt`로 교체하십시오.

다음 스크립트를 `package.json`에 추가하여 백엔드와 프런트엔드를 각각 독립적으로 시작할 수 있게 합니다:

```json
"scripts": {
  "dev": "vite",
  "start:server": "nodemon --exec tsx src/server.ts"
}
```

:::note
Gantt가 본문(body)의 전체 공간을 차지하도록 하려면 `src` 폴더에 있는 `App.css`와 `index.css`의 기본 스타일을 제거하고 `index.css` 파일에 아래 내용을 추가해야 합니다:

```css
* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

#root {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
}
```

:::

## 샘플 데이터 및 구성 설정

Gantt의 줌 구성을 포함한 Seed를 생성합니다:

```ts
import type { GanttConfig } from '@dhtmlx/trial-react-gantt';

export type ZoomLevel = 'day' | 'month' | 'year';

export const defaultZoomLevels: NonNullable<GanttConfig['zoom']> = {
  current: 'day',
  levels: [
    { name: 'day', scale_height: 27, min_column_width: 80, scales: [{ unit: 'day', step: 1, format: '%d %M' }] },
    {
      name: 'month',
      scale_height: 50,
      min_column_width: 120,
      scales: [
        { unit: 'month', format: '%F, %Y' },
        { unit: 'week', format: 'Week #%W' },
      ],
    },
    { name: 'year', scale_height: 50, min_column_width: 30, scales: [{ unit: 'year', step: 1, format: '%Y' }] },
  ],
};
```

또한 백엔드가 제공할 초기 작업 및 링크를 포함하는 `src/seed/data.json`을 생성합니다:

```json
{
  "tasks": [
    {
      "id": 1,
      "text": "Office itinerancy",
      "type": "project",
      "start_date": "2025-04-02T00:00:00.000Z",
      "duration": 17,
      "progress": 0.4,
      "parent": 0,
      "open": true
    },
    {
      "id": 2,
      "text": "Office facing",
      "type": "project",
      "start_date": "2025-04-02T00:00:00.000Z",
      "duration": 8,
      "progress": 0.6,
      "parent": 1,
      "open": true
    },
    {
      "id": 3,
      "text": "Furniture installation",
      "type": "project",
      "start_date": "2025-04-11T00:00:00.000Z",
      "duration": 8,
      "progress": 0.6,
      "parent": 1,
      "open": true
    },
    {
      "id": 4,
      "text": "The employee relocation",
      "type": "project",
      "start_date": "2025-04-13T00:00:00.000Z",
      "duration": 5,
      "progress": 0.5,
      "parent": 1,
      "open": true
    },
    {
      "id": 5,
      "text": "Interior office",
      "type": "task",
      "start_date": "2025-04-03T00:00:00.000Z",
      "duration": 7,
      "progress": 0.6,
      "parent": 2
    },
    {
      "id": 6,
      "text": "Air conditioners check",
      "type": "task",
      "start_date": "2025-04-03T00:00:00.000Z",
      "duration": 7,
      "progress": 0.6,
      "parent": 2
    },
    {
      "id": 7,
      "text": "Workplaces preparation",
      "type": "task",
      "start_date": "2025-04-12T00:00:00.000Z",
      "duration": 8,
      "progress": 0.6,
      "parent": 3
    },
    {
      "id": 8,
      "text": "Preparing workplaces",
      "type": "task",
      "start_date": "2025-04-14T00:00:00.000Z",
      "duration": 5,
      "progress": 0.5,
      "parent": 4
    },
    {
      "id": 9,
      "text": "Workplaces importation",
      "type": "task",
      "start_date": "2025-04-21T00:00:00.000Z",
      "duration": 4,
      "progress": 0.5,
      "parent": 4
    },
    {
      "id": 10,
      "text": "Workplaces exportation",
      "type": "task",
      "start_date": "2025-04-27T00:00:00.000Z",
      "duration": 3,
      "progress": 0.5,
      "parent": 4
    }
  ],
  "links": [
    { "id": 2, "source": 2, "target": 3, "type": "0" },
    { "id": 3, "source": 3, "target": 4, "type": "0" },
    { "id": 7, "source": 8, "target": 9, "type": "0" }
  ]
}
```

## 백엔드 서버 구축

:::note
아래의 서버는 데모 편의를 위한 예시이며, 프로덕션 권고사항이 아닙니다. 모든 데이터를 하나의 JSON 파일에 저장하므로 데이터베이스를 설정하지 않아도 전체 튜토리얼을 실행할 수 있습니다. 프로덕션 애플리케이션을 구축할 때는 PostgreSQL, MongoDB, 클라우드 API 등과 같은 실제 지속 저장소 계층으로 대체하십시오. - 백엔드가 무엇을 사용하는지와 상관없이 클라이언트 사이드 TanStack Query 통합은 동일하게 작동합니다.
:::

`src/server.ts`를 생성합니다. 이 경량의 Express 서버는 REST API를 시뮬레이션하기 위해 JSON 파일을 읽고 씁니다:

```ts
import express from 'express';
import cors from 'cors';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import os from 'os';

const app = express();
app.use(express.json());
app.use(cors());

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const SEED_PATH = join(__dirname, 'seed', 'data.json');
const DB_PATH = join(os.tmpdir(), 'gantt-tanstack-demo-db.json');
const PORT = 3001;

// 시작 시 시드 데이터를 런타임 위치로 복사하여 시드를 원래대로 유지
if (!fs.existsSync(DB_PATH)) {
  fs.copyFileSync(SEED_PATH, DB_PATH);
}

interface Task {
  id: string | number;
  [key: string]: unknown;
}
interface Link {
  id: string | number;
  [key: string]: unknown;
}
interface DB {
  tasks: Task[];
  links: Link[];
}

const readDB = (): DB => JSON.parse(fs.readFileSync(DB_PATH, 'utf-8'));
const writeDB = (data: DB) => fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));

app.get('/data', (_req, res) => {
  res.json(readDB());
});

app.post('/tasks', (req, res) => {
  const db = readDB();
  const task = req.body as Task;
  const newTask = { ...task, id: `DB_ID:${task.id}` };
  db.tasks.push(newTask);
  writeDB(db);
  res.json(newTask);
});

app.put('/tasks/:id', (req, res) => {
  const db = readDB();
  db.tasks = db.tasks.map((t) => (String(t.id) === req.params.id ? { ...t, ...req.body } : t));
  writeDB(db);
  res.sendStatus(200);
});

app.delete('/tasks/:id', (req, res) => {
  const db = readDB();
  db.tasks = db.tasks.filter((t) => String(t.id) !== req.params.id);
  writeDB(db);
  res.sendStatus(200);
});

app.post('/links', (req, res) => {
  const db = readDB();
  const link = req.body as Link;
  const newLink = { ...link, id: `DB_ID:${link.id}` };
  db.links.push(newLink);
  writeDB(db);
  res.json(newLink);
});

app.put('/links/:id', (req, res) => {
  const db = readDB();
  db.links = db.links.map((l) => (String(l.id) === req.params.id ? { ...l, ...req.body } : l));
  writeDB(db);
  res.sendStatus(200);
});

app.delete('/links/:id', (req, res) => {
  const db = readDB();
  db.links = db.links.filter((l) => String(l.id) !== req.params.id);
  writeDB(db);
  res.sendStatus(200);
});

app.listen(PORT, () => console.log(`Server running on ${PORT}`));
```

서버는 다음 엔드포인트를 노출합니다:

| 메서드 | 경로 | 동작 |
| ------ | ------------ | -------------------------------------- |
| GET    | `/data`      | 모든 작업과 링크를 반환 |
| POST   | `/tasks`     | 작업을 생성하고 안정적인 DB id를 할당 |
| PUT    | `/tasks/:id` | 작업을 업데이트 |
| DELETE | `/tasks/:id` | 작업을 삭제 |
| POST   | `/links`     | 링크를 생성하고 안정적인 DB id를 할당 |
| PUT    | `/links/:id` | 링크를 업데이트 |
| DELETE | `/links/:id` | 링크를 삭제 |

작업이나 링크가 생성되면 서버는 클라이언트가 생성한 id에 `DB_ID:` 접두사를 붙여 새 레코드를 반환합니다. Gantt 컴포넌트는 반환된 id를 사용하여 내부 참조를 업데이트합니다.

## API 계층 만들기

`src/api.ts`를 생성하고 TanStack Query가 호출할 순수 `fetch` 기반 함수들을 정의합니다:

```ts
import { type Link, type SerializedTask } from '@dhtmlx/trial-react-gantt';

const BASE = window.location.origin;

async function request(url: string, options?: RequestInit) {
  const res = await fetch(url, options);
  if (!res.ok) {
    throw new Error(`${options?.method ?? 'GET'} ${url} failed: ${res.status}`);
  }
  return res;
}

export const fetchData = async () => {
  const res = await request(`${BASE}/data`);
  return await res.json();
};

export const createTask = async (task: SerializedTask) => {
  const res = await request(`${BASE}/tasks`, {
    method: 'POST',
    body: JSON.stringify(task),
    headers: { 'Content-Type': 'application/json' },
  });
  return await res.json();
};

export const updateTask = async (task: SerializedTask) => {
  await request(`${BASE}/tasks/${task.id}`, {
    method: 'PUT',
    body: JSON.stringify(task),
    headers: { 'Content-Type': 'application/json' },
  });
};

export const deleteTask = async (id: string | number) => {
  await request(`${BASE}/tasks/${id}`, { method: 'DELETE' });
};

export const createLink = async (link: Link) => {
  const res = await request(`${BASE}/links`, {
    method: 'POST',
    body: JSON.stringify(link),
    headers: { 'Content-Type': 'application/json' },
  });
  return await res.json();
};

export const updateLink = async (link: Link) => {
  await request(`${BASE}/links/${link.id}`, {
    method: 'PUT',
    body: JSON.stringify(link),
    headers: { 'Content-Type': 'application/json' },
  });
};

export const deleteLink = async (id: string | number) => {
  await request(`${BASE}/links/${id}`, { method: 'DELETE' });
};
```

각 함수는 2xx가 아닌 응답에 대해 예외를 throw하므로 TanStack Query가 에러를 잡아 `onError` 핸들러를 트리거합니다.

## 컨트롤 도구 모음 컴포넌트 만들기

`src/components/Toolbar.tsx`에 **Toolbar** 컴포넌트를 추가합니다:

```tsx
import Divider from '@mui/material/Divider';
import ButtonGroup from '@mui/material/ButtonGroup';
import UndoIcon from '@mui/icons-material/Undo';
import RedoIcon from '@mui/icons-material/Redo';
import Button from '@mui/material/Button';
import type { ZoomLevel } from '../seed/Seed';

export interface ToolbarProps {
  onUndo?: () => void;
  onRedo?: () => void;
  canUndo?: boolean;
  canRedo?: boolean;
  onZoom?: (level: ZoomLevel) => void;
  currentZoom?: ZoomLevel;
}

export default function Toolbar({
  onUndo,
  onRedo,
  canUndo = false,
  canRedo = false,
  onZoom,
  currentZoom = 'month',
}: ToolbarProps) {
  return (
    <div style={{ display: 'flex', justifyContent: 'start', padding: '0px 0px 20px', gap: '10px' }}>
      <ButtonGroup>
        <Button onClick={() => onUndo?.()} disabled={!canUndo}>
          <UndoIcon />
        </Button>
        <Button onClick={() => onRedo?.()} disabled={!canRedo}>
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
```

툴바는 다음 소품을 받습니다:

- `canUndo` / `canRedo` - Undo/Redo 버튼의 활성화 여부를 히스토리 스택 길이에 따라 제어하는 불리언 플래그
- `onUndo` / `onRedo` - 부모 컴포넌트의 Undo/Redo 로직을 트리거하는 콜백
- `onZoom` - 사용자가 줌 버튼을 클릭할 때 줌 레벨을 업데이트하는 콜백
- `currentZoom` - 현재 활성 줌 레벨을 나타내어 올바른 버튼이 `contained`로 표시되게 함

## main.tsx에서 TanStack Query 설정

애플리케이션을 `QueryClientProvider`로 래핑하여 모든 컴포넌트가 TanStack Query 클라이언트에 접근할 수 있게 합니다:

```tsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const client = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={client}>
      <App />
    </QueryClientProvider>
  </StrictMode>,
);
```

`QueryClient`는 렌더 트리 밖에서 한 번만 생성되어 매 렌더마다 재생성되지 않도록 합니다.

## 메인 Gantt 컴포넌트 만들기

`src/components/GanttComponent.tsx`를 생성합니다. 이 파일은 TanStack Query가 모든 데이터 작업을 주도하는 곳입니다.

### 임포트 및 초기 설정

```tsx
import { useMemo, useRef, useCallback } from 'react';
import ReactGantt, {
  type ReactGanttProps,
  type Link,
  type ReactGanttRef,
  type SerializedTask,
} from '@dhtmlx/trial-react-gantt';
import '@dhtmlx/trial-react-gantt/dist/react-gantt.css';

import Toolbar from './Toolbar';
import { fetchData, createTask, updateTask, deleteTask, createLink, updateLink, deleteLink } from '../api';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { type Snapshot, useGanttStore } from '../store';
import { type ZoomLevel } from '../seed/Seed';
```

### useQuery로 데이터 가져오기

```tsx
export default function DemoTanstackQuery() {
  const ganttRef = useRef<ReactGanttRef>(null);
  const queryClient = useQueryClient();

  const {
    data: fetchedData,
    isLoading,
    isError,
    error,
  } = useQuery<{ tasks: SerializedTask[]; links: Link[] }>({ queryKey: ['data'], queryFn: fetchData });

  const { tasks, links } = fetchedData || { tasks: [], links: [] };
```

useQuery는 컴포넌트가 마운트될 때 서버에서 모든 작업과 링크를 가져옵니다. 결과는 `['data']` 키 아래 TanStack Query 캐시에 저장됩니다.

- `isLoading` - 초기 페치가 진행 중일 때 true
- `isError` / `error` - 페치 실패 시 채워짐
- 첫 응답이 도달하기 전에도 Gantt가 유효한 props를 받도록 빈 배열(`fetchedData || { tasks: [], links: [] }`)로 폴백합니다.

### Zustand 상태 읽기

```tsx
const { undo, redo, setZoom, config, recordHistory, past, future } = useGanttStore();
```

UI 관련 상태만 Zustand에서 가져옵니다 - 줌 구성과 Undo/Redo 이력 스택입니다. 작업과 링크는 TanStack Query 캐시에 저장되며 Zustand에는 존재하지 않습니다.

### 스냅샷 도우미 생성

```tsx
const makeSnapshot = useCallback(
  (): Snapshot => ({
    tasks: structuredClone(tasks),
    links: structuredClone(links),
    config: structuredClone(config),
  }),
  [tasks, links, config],
);
```

`makeSnapshot`은 현재 작업, 링크, 구성의 깊은 복사를 하나의 `Snapshot` 객체로 캡처합니다. 변경 전에 호출되어 Undo로 이전 상태를 복원할 수 있게 합니다.

### 뮤테이션 정의

CRUD 작업 각각은 `useMutation` 훅으로 래핑됩니다. 여섯 개의 뮤테이션은 동일한 세 가지 수명 주기 훅을 공유합니다:

```tsx
const onError = useCallback((err: Error) => {
  console.error('Mutation failed:', err.message);
}, []);

const createTaskMutation = useMutation({
  mutationFn: createTask,
  onMutate: () => {
    recordHistory(makeSnapshot());
  },
  onSuccess: () => queryClient.invalidateQueries({ queryKey: ['data'] }),
  onError,
});

const updateTaskMutation = useMutation({
  mutationFn: updateTask,
  onMutate: () => {
    recordHistory(makeSnapshot());
  },
  onSuccess: () => queryClient.invalidateQueries({ queryKey: ['data'] }),
  onError,
});

const deleteTaskMutation = useMutation({
  mutationFn: deleteTask,
  onMutate: () => {
    recordHistory(makeSnapshot());
  },
  onSuccess: () => queryClient.invalidateQueries({ queryKey: ['data'] }),
  onError,
});

const createLinkMutation = useMutation({
  mutationFn: createLink,
  onMutate: () => {
    recordHistory(makeSnapshot());
  },
  onSuccess: () => queryClient.invalidateQueries({ queryKey: ['data'] }),
  onError,
});

const updateLinkMutation = useMutation({
  mutationFn: updateLink,
  onMutate: () => {
    recordHistory(makeSnapshot());
  },
  onSuccess: () => queryClient.invalidateQueries({ queryKey: ['data'] }),
  onError,
});

const deleteLinkMutation = useMutation({
  mutationFn: deleteLink,
  onMutate: () => {
    recordHistory(makeSnapshot());
  },
  onSuccess: () => queryClient.invalidateQueries({ queryKey: ['data'] }),
  onError,
});
```

- **`onMutate`** - API 호출 전에 동기적으로 실행됩니다. 변경 직전의 상태를 저장하기 위해 스냅샷을 기록합니다.
- **`onSuccess`** - `queryClient.invalidateQueries`를 호출하여 `['data']` 캐시를 오래된 것으로 표시하고 백그라운드에서 재패치를 트리거합니다. 재패치가 완료되면 Gantt가 새로운 서버 응답으로 다시 렌더링됩니다.
- **`onError`** - 실패를 로그에 남깁니다. 이 로직은 알림 표시나 낙관적 업데이트 롤백으로 확장할 수 있습니다.

### data.save를 통한 Gantt와 뮤테이션 연결

```tsx
const templates: ReactGanttProps['templates'] = useMemo(
  () => ({
    format_date: (d) => d.toISOString(),
    parse_date: (s) => new Date(s),
  }),
  [],
);

const data: ReactGanttProps['data'] = useMemo(
  () => ({
    save: (entity, action, payload, id) => {
      if (entity === 'task') {
        const task = payload as SerializedTask;
        if (action === 'create') return createTaskMutation.mutate(task);
        else if (action === 'update') updateTaskMutation.mutate(task);
        else if (action === 'delete') deleteTaskMutation.mutate(id);
      } else if (entity === 'link') {
        const link = payload as Link;
        if (action === 'create') return createLinkMutation.mutate(link);
        else if (action === 'update') updateLinkMutation.mutate(link);
        else if (action === 'delete') deleteLinkMutation.mutate(id);
      }
    },
  }),
  [
    createTaskMutation,
    updateTaskMutation,
    deleteTaskMutation,
    createLinkMutation,
    updateLinkMutation,
    deleteLinkMutation,
  ],
);
```

:::note
v9.1.3부터 Gantt는 ISO 날짜 문자열을 자동으로 감지하고, 더 이상 `templates` 재정의가 필요하지 않습니다. 이전 Gantt 버전과의 호환성을 위해 여기서는 이 과정을 보여줍니다. [Loading dates in ISO format](guides/loading.md#loading-dates-in-iso-format)을 참조하십시오.
:::

`data.save` 콜백은 Gantt 차트와 TanStack Query 사이의 다리 역할을 합니다. 사용자가 작업을 드래그하거나 텍스트를 편집하거나 링크를 생성하는 등 변경을 수행할 때마다:

1. Gantt가 엔티티 유형(`task` 또는 `link`), 작업(`create`, `update`, 또는 `delete`), 전체 항목 payload, 그리고 id를 가진 `data.save`를 호출합니다.
2. 이를 적절한 뮤테이션으로 라우팅합니다.
3. 뮤테이션은 API 함수를 호출하고 성공 시 캐시를 무효화합니다.

이 콜백에 대한 deeper한 설명이 필요하다면 Basics 가이드의 [data.save로 변경 사항 다루기](integrations/react/state/state-management-basics.md#handlingchangeswithdatasave)를 참조하십시오.

### Undo, redo 및 줌 핸들러

```tsx
const handleUndo = () => {
  const snapshot = undo(makeSnapshot());
  if (snapshot) {
    queryClient.setQueryData(['data'], snapshot);
  }
};

const handleRedo = () => {
  const snapshot = redo(makeSnapshot());
  if (snapshot) {
    queryClient.setQueryData(['data'], snapshot);
  }
};

const handleZoom = (level: ZoomLevel) => {
  recordHistory(makeSnapshot());
  setZoom(level);
};
```

- `handleUndo`는 현재 스냅샷을 Zustand의 `undo` 액션으로 넘겨 반대 스택에 push될 수 있도록 하고, 이전 스냅샷을 반환받아 `queryClient.setQueryData`로 TanStack Query 캐시에 바로 씁니다. 이렇게 하면 서버 왕복 없이 즉시 데이터가 복원되어 Gantt가 재렌더링됩니다.
- `handleRedo`는 반대 방향으로 동일하게 동작합니다.
- `handleZoom`은 먼저 히스토리 스냅샷을 기록한 뒤 Zustand의 `setZoom` 액션을 호출해 `config.zoom`를 업데이트합니다.

이 패턴은 클라이언트 측 캐시에서만 작동하기 때문에 Undo/Redo를 빠르고 오프라인으로 유지합니다.

### 렌더링

```tsx
  if (isLoading) {
    return <div style={{ padding: '20px' }}>Loading project data...</div>;
  }

  if (isError) {
    return <div style={{ padding: '20px', color: 'red' }}>Failed to load data: {error?.message}</div>;
  }

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', padding: '10px' }}>
      <Toolbar
        onUndo={handleUndo}
        onRedo={handleRedo}
        canUndo={past.length > 0}
        canRedo={future.length > 0}
        currentZoom={config.zoom.current}
        onZoom={handleZoom}
      />
      <ReactGantt ref={ganttRef} tasks={tasks} links={links} config={config} templates={templates} data={data} />
    </div>
  );
}
```

렌더링 전에 로딩 및 오류 상태를 처리합니다.
툴바의 Undo/Redo 가능 여부는 Zustand의 히스토리 스택에서 파생되며, HTTP 요청 없는 상태에서 즉시 반영됩니다.
작업(`tasks`)과 링크(`links`)는 항상 TanStack Query 캐시에서 받고, 구성(`config`)은 Zustand에서 가져옵니다.

### App.tsx 업데이트

`src/App.tsx`를 Gantt 컴포넌트를 사용하도록 업데이트합니다:

```tsx
import './App.css';
import GanttComponent from './components/GanttComponent';

function App() {
  return (
    <div style={{ height: '100dvh', width: '100dvw' }}>
      <GanttComponent />
    </div>
  );
}

export default App;
```

## Zustand 저장소 설정

Zustand는 로컬 UI 상태(줌 구성 및 Undo/Redo 이력 스택)만 관리합니다. 작업과 링크는 TanStack Query가 소유합니다.

`src/store.ts`를 생성합니다:

```ts
import { create } from 'zustand';
import type { Link, GanttConfig, SerializedTask } from '@dhtmlx/trial-react-gantt';
import { defaultZoomLevels, type ZoomLevel } from './seed/Seed';

export type Snapshot = {
  tasks: SerializedTask[];
  links: Link[];
  config: GanttConfig;
};

type State = {
  config: GanttConfig;

  past: Snapshot[];
  future: Snapshot[];
  maxHistory: number;

  recordHistory: (snapshot: Snapshot) => void;
  undo: (snapshot: Snapshot) => Snapshot | null;
  redo: (snapshot: Snapshot) => Snapshot | null;

  setZoom: (level: ZoomLevel) => void;
};

export const useGanttStore = create<State>((set, get) => ({
  config: { zoom: defaultZoomLevels },

  past: [],
  future: [],
  maxHistory: 50,

  recordHistory: (snapshot) => {
    const { past, maxHistory } = get();
    set({
      past: [...past.slice(-maxHistory + 1), snapshot],
      future: [],
    });
  },

  undo: (snapshot: Snapshot) => {
    const { past, future } = get();
    if (!past.length) return null;

    const previous = past[past.length - 1];
    set({
      past: past.slice(0, -1),
      future: [{ ...snapshot }, ...future],
      config: previous.config,
    });

    return previous;
  },

  redo: (snapshot: Snapshot) => {
    const { past, future } = get();
    if (!future.length) return null;

    const next = future[0];
    set({
      past: [...past, { ...snapshot }],
      future: future.slice(1),
      config: next.config,
    });

    return next;
  },

  setZoom: (level) => {
    set({
      config: {
        ...get().config,
        zoom: { ...get().config.zoom, current: level },
      },
    });
  },
}));
```

### 저장소가 관리하는 것

- **`config`** - `<ReactGantt>`의 `config` prop으로 직접 전달되는 Gantt 줌 구성
- **`past` / `future`** - Undo 및 Redo를 위한 스냅샷 스택. 각 스냅샷은 `tasks`, `links`, `config`를 포함하여 한 번에 모든 것을 롤백할 수 있도록 함
- **`maxHistory`** - 히스토리를 최근 50개의 스냅샷으로 제한

### Undo와 Redo가 스냅샷 매개변수를 받는 이유

순수 Zustand 튜토리얼에서 저장소가 작업과 링크를 소유하므로 `undo()`가 이전 스냅샷을 바로 교체하면 되었습니다. 여기서는 작업과 링크가 TanStack Query 캐시에 존재합니다. Zustand를 TanStack Query와 분리하기 위해 Undo/Redo 호출은 항상 다음과 같이 작동합니다:

1. 컴포넌트의 현재 스냅샷을 인수로 받아(저장소가 TanStack Query를 알 필요 없이 반대 스택에 푸시하도록) 반환합니다.
2. 반환된 타깃 스냅샷을 컴포넌트가 캐시에 기록하도록 합니다(`queryClient.setQueryData`).

이런 명확한 분리 덕분에 Zustand는 히스토리 관리만 담당하고, 서버 데이터에 대한 단일 진실 소스는 여전히 TanStack Query가 제공합니다.

## 애플리케이션 실행

한 터미널에서 Express 백엔드를 시작합니다:

```bash
npm run start:server
```

또는:

```bash
yarn start:server
```

다른 터미널에서 Vite 개발 서버를 시작합니다:

```bash
npm run dev
```

또는:

```bash
yarn dev
```

(http://localhost:3000) 을 열면 Gantt 차트가 백엔드에서 데이터를 로드하고, 사용자가 하는 모든 변경 사항이 서버에 자동으로 저장됩니다.

## 요약

이 튜토리얼에서 다음을 수행했습니다:

- TanStack Query와 Zustand를 사용한 Vite + React + TypeScript 프로젝트 설정
- JSON으로 작업과 링크를 제공하고 지속 저장하는 Express REST 백엔드 생성
- `useQuery`를 사용해 로드 시 서버로부터 모든 데이터 가져오기
- CRUD 작업 각각 하나씩의 `useMutation` 훅을 정의하고 이를 `data.save` 콜백에 연결
- Zustand에 히스토리를 저장하고 TanStack Query 캐시에 스냅샷을 복원해 Undo/Redo를 구현하는 방식으로 스냅샷 기반 Undo/Redo 구현

이로써 Gantt 컴포넌트는 완전히 선언형 상태를 유지합니다: 서버 상태는 TanStack Query가 소유하고, UI 상태는 Zustand가 소유하며, `data.save` 콜백은 사용자의 상호 작용을 뮤테이션으로 연결하되 컴포넌트가 지속 저장 로직을 알 필요가 없도록 합니다.

## GitHub 예제 저장소

이 튜토리얼을 따라 완성된 작동 프로젝트의 전체 예제는 GitHub에 제공합니다.

## 다음 단계

더 자세히 진행하려면:

- [](integrations/react/state/state-management-basics.md)에서 이 예제의 개념을 다시 살펴보기
- [React Gantt 개요](integrations/react/overview.md)에서 저장소 기반 상태와 고급 구성 및 템플릿을 결합하기
- 같은 패턴을 다른 상태 관리 도구로도 탐색하기:
  - [Using React Gantt with Zustand](integrations/react/state/zustand.md)
  - [Using React Gantt with Redux Toolkit](integrations/react/state/redux-toolkit.md)
  - [Using React Gantt with MobX](integrations/react/state/mobx.md)
  - [Using React Gantt with XState](integrations/react/state/xstate.md)
  - [Using React Gantt with Jotai](integrations/react/state/jotai.md)
  - [Using React Gantt with Valtio](integrations/react/state/valtio.md)
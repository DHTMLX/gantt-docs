---
title: React Gantt - TanStack Query + Supabase 튜토리얼
sidebar_label: TanStack Query + Supabase
description: 'TanStack Query로 구동되는 React Gantt에 실시간 다중 사용자 동기화를 추가하는 방법을 알아봅니다. 이 가이드는 Supabase Realtime 구독, pending-operations 중복 제거 패턴, 효율적인 CRUD를 위한 batchSave, 서버 측 sortorder 관리, 그리고 지속성 인식 실행 취소/다시 실행을 다룹니다.'
---

# React Gantt - TanStack Query + Supabase 튜토리얼

이 튜토리얼은 [TanStack Query로 React Gantt 사용하기](integrations/react/state/tanstack-query.md)를 확장하여 로컬 JSON 백엔드를 **Supabase**(PostgreSQL + Realtime)로 교체하고 실시간 다중 사용자 동기화를 추가합니다. 한 사용자가 작업을 생성, 편집 또는 삭제하면 다른 모든 열려 있는 탭에 즉시 반영되며, 페이지 새로고침이 필요하지 않습니다.

이 가이드는 기본 TanStack Query 튜토리얼과 비교했을 때 새롭고 다른 점에 초점을 맞춥니다.

- Supabase 데이터베이스 설정
- 실시간 구독
- Mutations를 그룹화하기 위한 `batchSave` 사용
- 지속성 있는 작업 정렬을 위한 서버 사이드 `sortorder` 관리
- 백엔드에서의 XSS 위생 처리
- `applySnapshotDiff`를 통한 지속성 인식된 실행 취소/되돌리기

기본 설정(Vite + React + TypeScript, TanStack Query, Zustand, 기본 CRUD 뮤테이션, 스냅샷 기반 실행 취소/되돌리기)을 처음 다루지 않았다면 먼저 [TanStack Query 튜토리얼](integrations/react/state/tanstack-query.md)을 읽어보십시오.

## 사전 요구사항

- 완료(또는 읽음)한 [TanStack Query 튜토리얼](integrations/react/state/tanstack-query.md)
- 프로젝트 URL과 anon 키를 가진 [Supabase](https://supabase.com) 프로젝트
- Node.js 16+

## 프로젝트 설정

```bash
npm create vite@latest react-gantt-tanstack-supabase-demo -- --template react-ts
cd react-gantt-tanstack-supabase-demo
```

의존성을 설치합니다. 이 데모는 **shadcn/ui**(Tailwind 기반)을 MUI 대신 사용합니다:

```bash
npm install @tanstack/react-query zustand @supabase/supabase-js \
  express cors dotenv \
  tailwindcss @tailwindcss/vite lucide-react \
  radix-ui class-variance-authority clsx tailwind-merge
```

개발 의존성:

```bash
npm install -D tsx nodemon @types/express @types/cors @types/node
```

React Gantt를 설치합니다:

```bash
npm install @dhtmlx/trial-react-gantt
```

`scripts`를 `package.json`에 추가합니다:

```json
"scripts": {
  "dev": "vite",
  "start:server": "nodemon --exec tsx src/server.ts"
}
```

## Supabase 환경 변수 구성

`.env`를(예시 기반으로) 만듭니다:

```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key
```

`VITE_` 접두사는 Vite 프런트엔드 번들에 변수를 노출합니다. 접두사가 없는 변수는 런타임에 Express 백엔드에서 `dotenv`로 사용됩니다.

## 데이터베이스 설정

Supabase의 **SQL Editor**에서 `setup.sql`의 마이그레이션을 실행합니다:

```sql
-- Create a table for the tasks for Supabase
CREATE TABLE tasks (
    id varchar(255) NOT NULL,
    text TEXT NOT NULL,
    start_date TIMESTAMPTZ NOT NULL,
    end_date TIMESTAMPTZ NOT NULL,
    duration INT NOT NULL,
    type TEXT,
    progress FLOAT,
    parent varchar(255),
    sortorder INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (parent) REFERENCES tasks(id) ON DELETE CASCADE
);

-- Create a table for the links for Supabase
CREATE TABLE links (
    id varchar(255) NOT NULL,
    source varchar(255) NOT NULL,
    target varchar(255) NOT NULL,
    type TEXT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (source) REFERENCES tasks(id) ON DELETE CASCADE,
    FOREIGN KEY (target) REFERENCES tasks(id) ON DELETE CASCADE
);

-- Clear existing data (optional)
DELETE FROM links;
DELETE FROM tasks;

-- Insert tasks
INSERT INTO tasks (id, text, start_date, end_date, duration, type, progress, parent, sortorder)
VALUES
  ('1', 'Project #1', '2026-04-01', '2026-04-10', 9, 'project', 0.4, NULL, 1),

  ('2', 'Task 1', '2026-04-01', '2026-04-03', 2, 'task', 0.6, '1', 2),
  ('3', 'Task 2', '2026-04-03', '2026-04-06', 3, 'task', 0.3, '1', 3),
  ('4', 'Task 3', '2026-04-06', '2026-04-10', 4, 'task', 0.1, '1', 4),

  ('5', 'Milestone', '2026-04-10', '2026-04-10', 0, 'milestone', 1, '1', 5);

-- Insert links (dependencies)
INSERT INTO links (id, source, target, type)
VALUES
  ('1', '2', '3', '0'),
  ('2', '3', '4', '0'),
  ('3', '4', '5', '0');
```

주요 설계 포인트:

- `sortorder`는 Gantt 격자에 표시되는 시각적 순서를 보존하는 서버 관리 정수입니다.
- `links.source`와 `links.target` 모두 `ON DELETE CASCADE`를 가지므로 작업을 삭제하면 의존하는 링크가 자동으로 제거됩니다.
- `tasks.parent`도 카스케이드되어 부모를 삭제하면 모든 자식이 함께 제거됩니다.

Supabase Realtime은 두 개의 테이블에 대해 활성화되어 있어야 합니다. Supabase 대시보드에서 **Database → Replication**으로 이동하여 `tasks`와 `links` 테이블을 복제 게시물에 추가합니다.

## Dual Supabase 클라이언트

데모에서는 프런트엔드와 백엔드가 서로 다른 환경에서 실행되기 때문에 두 개의 분리된 Supabase 클라이언트를 사용합니다.

`src/db/supabaseClient.ts` - 브라우저 클라이언트, `import.meta.env`를 통해 환경 변수를 읽습니다:

```ts
import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrlClient = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKeyClient = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrlClient || !supabaseAnonKeyClient) {
  throw new Error('Missing Supabase environment variables');
}

export const supabaseClient: SupabaseClient = createClient(supabaseUrlClient, supabaseAnonKeyClient);
```

`src/db/supabaseServer.ts` - 서버 측 클라이언트, `process.env`로 읽습니다(환경 변수 로드 via `dotenv`):

```ts
import { createClient } from '@supabase/supabase-js';
import 'dotenv/config';

const supabaseUrlServer = process.env.SUPABASE_URL;
const supabaseAnonKeyServer = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrlServer || !supabaseAnonKeyServer) {
  throw new Error('Missing Supabase environment variables');
}

export const supabaseServer = createClient(supabaseUrlServer, supabaseAnonKeyServer);
```

`supabaseClient`는 `GanttComponent.tsx`의 Realtime 구독에 독점적으로 사용됩니다. 데이터베이스 쓰기는 Express 계층의 `supabaseServer`를 통해서만 발생합니다.

:::note
이 스타터는 인증이 없고 스키마에 Row-Level Security 정책이 없기 때문에 서버 측에서 anon key를 사용합니다. 프로덕션에서 인증과 RLS를 사용하는 경우, 신뢰할 수 있는 연산을 우회하기 위해 서버가 프런트엔드에서 벗어난 서비스 역할 키(service role key)를 보유해야 합니다.
:::

## TypeScript 타입

`src/types/types.ts`는 데이터베이스 행 구조와 서비스 인터페이스를 정의합니다:

```ts
export interface TaskRow {
  id: string;
  text: string;
  start_date: string;
  end_date: string;
  duration: number;
  type?: string;
  progress?: number;
  parent: string | null;
  sortorder: number;
}

export interface LinkRow {
  id: string;
  source: string;
  target: string;
  type: string;
}

export interface ITaskService {
  createTask(task: Omit<TaskRow, 'sortorder'>): Promise<TaskRow>;
  updateTask(id: string, fields: Partial<TaskRow>, target?: string): Promise<TaskRow>;
  deleteTask(id: string): Promise<TaskRow>;
}

export interface ILinkService {
  createLink(link: LinkRow): Promise<LinkRow>;
  updateLink(id: string, fields: Partial<LinkRow>): Promise<LinkRow>;
  deleteLink(id: string): Promise<LinkRow>;
}

export interface IGanttDataService {
  getData(): Promise<{ tasks: TaskRow[]; links: LinkRow[] }>;
}
```

`ITaskService.updateTask`는 선택적 `target` 매개변수를 받습니다. 이는 사용자가 끌어다 놓기로 작업의 순서를 재배치할 때 Gantt가 보내는 droptarget 작업 ID이며 서버 측 재정렬 로직을 트리거합니다.

## 백엔드 서비스 구축

### ganttDataService

`src/services/ganttDataService.ts`는 모든 작업을 `sortorder`로 정렬하여 가져옵니다:

```ts
import { supabaseServer } from '@/db/supabaseServer';
import type { IGanttDataService, LinkRow, TaskRow } from '@/types/types';

class GanttDataService implements IGanttDataService {
  async getData(): Promise<{ tasks: TaskRow[]; links: LinkRow[] }> {
    const { data: tasks, error: tasksError } = await supabaseServer
      .from('tasks')
      .select('*')
      .order('sortorder', { ascending: true });
    if (tasksError) throw tasksError;

    const { data: links, error: linksError } = await supabaseServer.from('links').select('*');
    if (linksError) throw linksError;

    const normalizedTasks = tasks.map((t) => ({ ...t, parent: t.parent ?? '0' }));
    return { tasks: normalizedTasks, links };
  }
}

const ganttDataService = new GanttDataService();
export default ganttDataService;
```

`parent`는 DB에서 루트 수준의 작업에 대해 `NULL`로 저장됩니다. Gantt는 동일한 역할에 대해 문자열 `'0'`을 기대하므로 읽을 때 값을 표준화합니다.

### sanitize 헬퍼

`src/services/sanitize.ts`는 텍스트 필드를 데이터베이스에 도달하기 전에 HTML 이스케이프 처리합니다:

```ts
const TEXT_FIELDS: string[] = ['text'];

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export function sanitize<T extends object>(obj: T): T {
  const out = { ...obj } as Record<string, unknown>;
  for (const key of TEXT_FIELDS) {
    if (typeof out[key] === 'string') {
      out[key] = escapeHtml(out[key] as string);
    }
  }
  return out as T;
}
```

모든 쓰기 서비스는 삽입 또는 업데이트 전에 `sanitize()`를 호출합니다. 스키마에 추가적인 텍스트 열이 생기면 `TEXT_FIELDS`에 필드 이름을 추가하십시오.

### taskService - sortorder 관리

`src/services/taskService.ts`는 지속적인 작업 순서를 관리하는 가장 복잡한 서비스입니다.

```ts
import { supabaseServer } from '@/db/supabaseServer';
import { type TaskRow, type ITaskService } from '../types/types';
import { sanitize } from './sanitize';

class TaskService implements ITaskService {
  private normalizeParent<T extends { parent?: string | null }>(data: T): T {
    return { ...data, parent: data.parent === '0' ? null : data.parent };
  }

  async createTask(task: Omit<TaskRow, 'sortorder'>): Promise<TaskRow> {
    const cleanData = sanitize(this.normalizeParent(task));

    const { data: lastOrderIndex } = await supabaseServer
      .from('tasks')
      .select('sortorder')
      .order('sortorder', { ascending: false })
      .limit(1)
      .maybeSingle();

    const nextOrder = (lastOrderIndex?.sortorder ?? 0) + 1;
    const { data, error } = await supabaseServer
      .from('tasks')
      .insert({ ...cleanData, sortorder: nextOrder })
      .select()
      .single();

    if (error) throw error;
    return { ...data, parent: data.parent ?? '0' };
  }

  async updateTask(id: string, fields: Partial<TaskRow>, target?: string): Promise<TaskRow> {
    const cleanData = sanitize(this.normalizeParent(fields));

    const { data, error } = await supabaseServer
      .from('tasks')
      .update(cleanData)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    if (target) await this.reorder(id, target);
    return { ...data, parent: data.parent ?? '0' };
  }

  async deleteTask(id: string): Promise<TaskRow> {
    const { data, error } = await supabaseServer.from('tasks').delete().eq('id', id).select().single();
    if (error) throw error;
    return data;
  }

  private async reorder(taskId: string, target: string): Promise<void> {
    let nextTask = false;
    let targetId = target;

    if (targetId.startsWith('next:')) {
      targetId = targetId.slice('next:'.length);
      nextTask = true;
    }

    const { data: targetTask } = await supabaseServer
      .from('tasks')
      .select('sortorder')
      .eq('id', targetId)
      .single();

    if (!targetTask) return;

    let targetOrder = targetTask.sortorder;
    if (nextTask) targetOrder++;

    const { data: toShift } = await supabaseServer
      .from('tasks')
      .select('id, sortorder')
      .gte('sortorder', targetOrder)
      .neq('id', taskId)
      .order('sortorder', { ascending: false });

    for (const task of toShift ?? []) {
      await supabaseServer
        .from('tasks')
        .update({ sortorder: task.sortorder + 1 })
        .eq('id', task.id);
    }

    await supabaseServer.from('tasks').update({ sortorder: targetOrder }).eq('id', taskId);
  }
}

const taskService = new TaskService();
export default taskService;
```

이 `reorder` 메서드는 다음과 같이 동작합니다:

1. 드랍 대상의 `sortorder`를 읽습니다.
2. 대상 문자열이 `next:`로 접두되면 드래그한 작업을 대상 다음에 배치해야 하므로 순서를 한 칸 증가시킵니다.
3. `sortorder`가 `≥ targetOrder`인 모든 작업의 순서를 아래로 한 칸씩 밀어 갭을 만듭니다.
4. 드래그한 작업의 `sortorder`를 그 갭 위치로 설정합니다.

작업들은 고유 제약 조건 충돌을 피하기 위해 역순으로 순서를 조정합니다.

### linkService

`src/services/linkService.ts`는 Supabase를 기반으로 한 간단한 CRUD 서비스입니다:

```ts
import type { ILinkService, LinkRow } from '@/types/types';
import { sanitize } from './sanitize';
import { supabaseServer } from '@/db/supabaseServer';

class LinkService implements ILinkService {
  async createLink(link: LinkRow): Promise<LinkRow> {
    const cleanData = sanitize(link);
    const { data, error } = await supabaseServer.from('links').insert(cleanData).select().single();
    if (error) throw error;
    return data;
  }
  async updateLink(id: string, fields: Partial<LinkRow>): Promise<LinkRow> {
    const cleanData = sanitize(fields);
    const { data, error } = await supabaseServer.from('links').update(cleanData).eq('id', id).select().single();
    if (error) throw error;
    return data;
  }
  async deleteLink(id: string): Promise<LinkRow> {
    const { data, error } = await supabaseServer.from('links').delete().eq('id', id).select().single();
    if (error) throw error;
    return data;
  }
}

const linkService = new LinkService();
export default linkService;
```

## Express 백엔드 구축

`src/server.ts`는 서비스에 대한 얇은 HTTP 계층으로, 모든 경로를 적절한 서비스로 위임하고 공통 오류 핸들러를 사용합니다:

```ts
import express, { type Response, type Request } from 'express';
import cors from 'cors';
import 'dotenv/config';
import ganttDataService from './services/ganttDataService';
import taskService from './services/taskService';
import linkService from './services/linkService';

const app = express();
app.use(express.json());
app.use(cors());
const PORT = 3001;

app.get('/data', async (_req, res) => {
  try { res.json(await ganttDataService.getData()); }
  catch (error) { handleError(error as Error, res, 'Failed to fetch data'); }
});

app.post('/tasks', async (req, res) => {
  try { res.json(await taskService.createTask(req.body)); }
  catch (error) { handleError(error as Error, res, 'Failed to create task'); }
});

app.put('/tasks/:id', async (req, res) => {
  try {
    const { target, ...taskFields } = req.body;
    res.json(await taskService.updateTask(req.params.id, taskFields, target));
  } catch (error) { handleError(error as Error, res, 'Failed to update task'); }
});

app.delete('/tasks/:id', async (req, res) => {
  try { res.json(await taskService.deleteTask(req.params.id)); }
  catch (error) { handleError(error as Error, res, 'Failed to delete task'); }
});

// ... link routes follow the same pattern

function handleError(error: Error, res: Response, message: string) {
  console.error(error);
  res.status(500).json({ error: message });
}

app.listen(PORT, () => console.log(`Server running on ${PORT}`));
```

`PUT /tasks/:id` 핸들러는 요청 본문에서 `target`을 분해하여 `taskService.updateTask`로 전달하는 `taskFields`를 넘깁니다. `target`은 Gantt가 드래그 앤드롭 재정렬을 신호할 때만 존재합니다.

## API 계층 생성

`src/api.ts`는 기본 TanStack Query 데모와 유사한 단순 `fetch` 래퍼이지만, 차이점은 모든 뮤테이션이 이제 서버 응답 JSON(업데이트/삭제된 행)으로 반환된다는 점입니다. 반환된 `id`는 뮤테이션에서 대기 중인 작업을 중복 제거에 등록하는 데 사용됩니다.

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
  const res = await request(`${BASE}/tasks/${task.id}`, {
    method: 'PUT',
    body: JSON.stringify(task),
    headers: { 'Content-Type': 'application/json' },
  });
  return await res.json();
};

export const deleteTask = async (id: string | number) => {
  const res = await request(`${BASE}/tasks/${id}`, { method: 'DELETE' });
  return await res.json();
};

// createLink, updateLink, deleteLink follow the same pattern against /links
```

프런트엔드 요청은 Vite 개발 서버와 동일한 원본인 `http://localhost:3000`으로 전달됩니다. `/data`, `/tasks`, `/links`를 Express 백엔드로 전달하는 프록시는 `vite.config.ts`에 설정되어 있습니다:

```ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

const API_URL = 'http://localhost:3001';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: { alias: { '@': path.resolve(__dirname, './src') } },
  server: {
    port: 3000,
    open: true,
    proxy: { '/data': API_URL, '/tasks': API_URL, '/links': API_URL },
  },
});
```

## Zustand 스토어 변경

스토어(`src/store.ts`)는 기본 튜토리얼과 비교하여 두 가지가 추가됩니다:

1) 확장된 구성(드래그 앤 드롭으로 재정렬 가능한 Gantt 옵션):

```ts
config: {
  zoom: defaultZoomLevels,
  open_tree_initially: true,
  order_branch: true,       // 같은 부모 내 재정렬 활성화
  order_branch_free: true,  // 부모 간 재정렬 활성화
  cascade_delete: false,
  root_id: '0',
},
```

2) `diffSnapshots` 유틸리티: 두 스냅샷 간의 최소 차이를 계산합니다.

```ts
export type SnapshotDiff = {
  tasks: { created: SerializedTask[]; updated: SerializedTask[]; deleted: (string | number)[] };
  links: { created: Link[]; updated: Link[]; deleted: (string | number)[] };
};

  // Builds Maps for both snapshots and classifies each item as created/updated/deleted
  // by comparing JSON-serialized values
  export function diffSnapshots(from: Snapshot, to: Snapshot): SnapshotDiff {
  const fromTasksMap = new Map(from.tasks.map((t) => [t.id, t]));
  const toTasksMap = new Map(to.tasks.map((t) => [t.id, t]));
  const fromLinksMap = new Map(from.links.map((l) => [l.id, l]));
  const toLinksMap = new Map(to.links.map((l) => [l.id, l]));

  const tasksCreated: SerializedTask[] = [];
  const tasksUpdated: SerializedTask[] = [];
  const tasksDeleted: (string | number)[] = [];
  const linksCreated: Link[] = [];
  const linksUpdated: Link[] = [];
  const linksDeleted: (string | number)[] = [];

  for (const [id, task] of toTasksMap) {
    if (!fromTasksMap.has(id)) {
      tasksCreated.push(task);
    } else if (JSON.stringify(fromTasksMap.get(id)) !== JSON.stringify(task)) tasksUpdated.push(task);
  }
  for (const id of fromTasksMap.keys()) {
    if (!toTasksMap.has(id)) tasksDeleted.push(id);
  }

  for (const [id, link] of toLinksMap) {
    if (!fromLinksMap.has(id)) {
      linksCreated.push(link);
    } else if (JSON.stringify(fromLinksMap.get(id)) !== JSON.stringify(link)) linksUpdated.push(link);
  }
  for (const id of fromLinksMap.keys()) {
    if (!toLinksMap.has(id)) linksDeleted.push(id);
  }

  return {
    tasks: { created: tasksCreated, updated: tasksUpdated, deleted: tasksDeleted },
    links: { created: linksCreated, updated: linksUpdated, deleted: linksDeleted },
  };
}
```

`diffSnapshots`는 `GanttComponent.tsx`의 `applySnapshotDiff`에서 실행 취소/다시 실행 작업을 서버에 지속시키는 데 사용됩니다.

## Gantt 컴포넌트 구축

`src/components/GanttComponent.tsx`는 기본 튜토리얼에 세 가지 중요한 추가를 제공합니다: 실시간 구독, `batchSave`, 그리고 지속성 있는 실행 취소/되돌리기.

### 임포트 및 참조

```tsx
import { supabaseClient } from '../db/supabaseClient';
import type { RealtimePostgresChangesPayload } from '@supabase/supabase-js';
import { type Snapshot, diffSnapshots, useGanttStore } from '../store';

// ...컴포넌트 내부
const pendingOperationsRef = useRef<Set<string>>(new Set());
const isUndoRedoRef = useRef(false);
const prevSnapshotRef = useRef<Snapshot | null>(null);
```

- `pendingOperationsRef`는 로컬 사용자가 시작한 연산을 추적하여 Realtime 에코를 무시합니다.
- `isUndoRedoRef`는 되돌리기/다시 되돌리기 배치 중 캐시 무효화를 억제하여 서버 확인 전 역방향 롤백의 임의 업데이트가 손상되지 않도록 합니다.
- `prevSnapshotRef`는 `batchSave`가 발동하기 직전에 찍은 스냅샷으로, 되돌리기 스택에 올릴 기준 상태로 사용됩니다.

### 변이 전 스냅샷 추적

```tsx
useEffect(() => {
  if (!isUndoRedoRef.current) {
    prevSnapshotRef.current = makeSnapshot();
  }
}, [makeSnapshot]);
```

이 효과는 Undo/Redo 작업이 아닌 경우 매 렌더링 후에 실행되며, `prevSnapshotRef`를 최신 상태로 유지하여 `batchSave`가 발동할 때 항상 되돌리기에 올릴 올바른 기준을 갖추게 합니다.

### 실시간 구독

```tsx
useEffect(() => {
  const tasksChannel = supabaseClient
    .channel('gantt-tasks')
    .on('postgres_changes', { event: '*', schema: 'public', table: 'tasks' }, postgresChangesHandler<SerializedTask>)
    .subscribe();

  const linksChannel = supabaseClient
    .channel('gantt-links')
    .on('postgres_changes', { event: '*', schema: 'public', table: 'links' }, postgresChangesHandler<Link>)
    .subscribe();

  return () => {
    supabaseClient.removeChannel(tasksChannel);
    supabaseClient.removeChannel(linksChannel);
  };
}, [postgresChangesHandler]);
```

Supabase는 각 행 변경에 대해 Postgres CDC(Change Data Capture) 이벤트를 보냅니다. 구성 해제(cleanup) 함수는 구성 재로딩 시 중복 리스너를 피하기 위해 컴포넌트가 마운트 해제될 때 두 채널을 제거합니다.

### 자신이 만든 변경 에코의 중복 제거

로컬 사용자가 뮤테이션을 발생시킬 때마다 뮤테이션의 `onSuccess` 콜백은 해당 작업을 대기 중인 작업으로 등록합니다:

```tsx
const createOperationKey = useCallback((action: string, id: string) => {
  pendingOperationsRef.current.add(`${action}-${id}`);
}, []);

const createTaskMutation = useMutation({
  mutationFn: createTask,
  onSuccess: (data) => {
    createOperationKey(OperationType.INSERT, data.id);
    if (!isUndoRedoRef.current) queryClient.invalidateQueries({ queryKey: ['data'] });
  },
  onError,
});
// ... 다른 뮤테이션에도 동일한 패턴
```

`postgresChangesHandler`는 도착한 이벤트가 대기 중인 키와 일치하는지 확인하고, 일치하면 refetch를 트리거하지 않고 조용히 소비합니다:

```tsx
const postgresChangesHandler = useCallback(
  <T extends ItemWithId>(payload: RealtimePostgresChangesPayload<T>) => {
    const eventType = payload.eventType;
    const id = (payload.new as T)?.id || (payload.old as T)?.id;
    const operationKey = `${eventType}-${id}`;

    if (pendingOperationsRef.current.has(operationKey)) {
      pendingOperationsRef.current.delete(operationKey);
      return;
    }
    queryClient.invalidateQueries({ queryKey: ['data'] });
  },
  [pendingOperationsRef, queryClient],
);
```

이 패턴이 없으면 로컬 뮤테이션은 `onSuccess`로 인한 refetch와 Realtime 에코로 인해 두 번의 refetch를 트리거합니다. 이 패턴을 사용하면 로컬 변경은 정확히 한 번만 캐시를 무효화하고, 다른 클라이언트의 변경만 추가 refetch를 발생시킵니다.

:::note
드래그 앤 드롭 재정렬은 서버 측에서 여러 행의 `sortorder`를 업데이트하므로 타이밍에 따라 바인딩이 필요합니다. 주된 작업만 `pendingOperationsRef`에 등록하고, 다른 작업의 부수 효과로 발생하는 Realtime 이벤트는 추적되지 않는 것이 허용됩니다 - `sortorder`는 서버 측 상태이며, TanStack Query는 연쇄 무효화를 하나의 백그라운드 재요청으로 묶습니다.
:::

### `batchSave` 대신에 저장하기

이 데모는 `data.batchSave`를 사용합니다. 이는 단일 사용자 상호작용에서 발생하는 모든 변경을 하나의 콜백 실행으로 그룹화합니다:

```tsx
const data: ReactGanttProps['data'] = useMemo(
  () => ({
    batchSave: (changes: BatchChanges) => {
      const { tasks: tasksChanges, links: linksChanges } = changes;

      if (prevSnapshotRef.current) {
        recordHistory(prevSnapshotRef.current);
      }

      tasksChanges?.forEach((task) => {
        if (task.action === 'create') createTaskMutation.mutate(task.data);
        else if (task.action === 'update') updateTaskMutation.mutate(task.data);
        else if (task.action === 'delete') deleteTaskMutation.mutate(task.data.id);
      });

      linksChanges?.forEach((link) => {
        if (link.action === 'create') createLinkMutation.mutate(link.data);
        else if (link.action === 'update') updateLinkMutation.mutate(link.data);
        else if (link.action === 'delete') deleteLinkMutation.mutate(link.data.id);
      });
    },
  }),
  [ 
    createTaskMutation,
    updateTaskMutation,
    deleteTaskMutation,
    createLinkMutation,
    updateLinkMutation,
    deleteLinkMutation,
    recordHistory,
   ],
);
```

`save`와의 주요 차이점:

- 하나의 실행 취소 항목이 전체 배치를 커버합니다(개별 하위 작업이 아닙니다).
- 기록된 스냅샷은 `prevSnapshotRef.current`이며, 이 상태는 `batchSave`가 발동되기 직전에 캡처된 상태이므로 실행 취소가 전체 상호작용을 되돌립니다.
- Gantt는 사용자 제스처당 한 번씩 `batchSave`를 호출하므로 서버의 데이터베이스 다중 쓰기가 존재하더라도 하나의 단위로 취급됩니다.

더 자세한 내용은 [Data Binding & State Management Basics](integrations/react/state/state-management-basics.md)에서 `batchSave`를 확인하십시오.

### Persistence-aware Undo/Redo

기본 TanStack Query 튜토리얼에서, `handleUndo`와 `handleRedo`는 클라이언트 캐시에 `setQueryData`로 스냅샷을 저장하는 방식으로 구현되어 있었고, 변경 내용은 사용자가 다음 수동 편집을 할 때까지 지속되지는 않습니다.

이 데모에서는 Undo/Redo가 Supabase에 롤백도 지속해야 하므로, `applySnapshotDiff`를 사용해 서버에 반영합니다:

```tsx
const applySnapshotDiff = useCallback(
  async (from: Snapshot, to: Snapshot) => {
    const diff = diffSnapshots(from, to);

    const mutations: Promise<unknown>[] = [];
    const mutateAsync = <T,>(fn: (arg: T) => Promise<unknown>, arg: T) => {
      mutations.push(fn(arg));
    };

    isUndoRedoRef.current = true;

    // FK 제약으로 인해 작업보다 먼저 링크를 삭제해야 함
    diff.links.deleted.forEach((id) => mutateAsync(deleteLinkMutation.mutateAsync, id));
    diff.links.updated.forEach((link) => mutateAsync(updateLinkMutation.mutateAsync, link));
    const batch1 = await Promise.allSettled(mutations.splice(0));

    diff.tasks.deleted.forEach((id) => mutateAsync(deleteTaskMutation.mutateAsync, id));
    diff.tasks.created.forEach((task) => mutateAsync(createTaskMutation.mutateAsync, task));
    diff.tasks.updated.forEach((task) => mutateAsync(updateTaskMutation.mutateAsync, task));
    const batch2 = await Promise.allSettled(mutations.splice(0));

    diff.links.created.forEach((link) => mutateAsync(createLinkMutation.mutateAsync, link));
    const batch3 = await Promise.allSettled(mutations.splice(0));

    const results = [...batch1, ...batch2, ...batch3];
    const rejected = results.filter((result) => result.status === 'rejected');

    isUndoRedoRef.current = false;

    if (rejected.length) {
      console.error('Mutation failed:', rejected);
      queryClient.invalidateQueries({ queryKey: ['data'] });
    }
  },
  [
    createTaskMutation,
    updateTaskMutation,
    deleteTaskMutation,
    createLinkMutation,
    updateLinkMutation,
    deleteLinkMutation,
    queryClient,
  ],
);

const handleUndo = () => {
  const current = makeSnapshot();
  const snapshot = undo(current);
  if (snapshot) {
    queryClient.setQueryData(['data'], snapshot);   // 즉시 낙관적 업데이트
    applySnapshotDiff(current, snapshot);             // Supabase에 지속
  }
};

const handleRedo = () => {
  const current = makeSnapshot();
  const snapshot = redo(current);
  if (snapshot) {
    queryClient.setQueryData(['data'], snapshot);
    applySnapshotDiff(current, snapshot);
  }
};
```

세 가지 배치 실행 순서는 매우 중요합니다:

1. 배치 1 – 링크를 먼저 삭제하고 업데이트합니다(FK 제약으로 인해 링크가 먼저 필요합니다).  
2. 배치 2 – 작업을 삭제, 생성, 업데이트합니다.  
3. 배치 3 – 링크를 마지막으로 생성합니다(참조하는 작업이 있어야 하기 때문).

`isUndoRedoRef.current = true` 상태에서 개별 Mutation의 `onSuccess`가 `invalidateQueries`를 호출하는 것을 방지하여 서버 확정 전 낙관적 `setQueryData`가 덮어쓰이지 않도록 합니다.

## 줌 처리

기본 튜토리얼에서 `handleZoom`은 줌 레벨을 변경하기 전에 스냅샷을 기록합니다. 이 데모에서는 줌이 로컬 UI 설정일 뿐이며 지속되지 않으므로 스냅샷이 필요하지 않습니다:

```tsx
const handleZoom = (level: ZoomLevel) => {
  setZoom(level);
};
```

툴바는 MUI의 `ButtonGroup` 대신 shadcn/ui의 `ToggleGroup`을 사용합니다:

```tsx
<ToggleGroup type="single" value={currentZoom} onValueChange={(value) => value && onZoom?.(value as ZoomLevel)}>
  <ToggleGroupItem value="day">Day</ToggleGroupItem>
  <ToggleGroupItem value="month">Month</ToggleGroupItem>
  <ToggleGroupItem value="year">Year</ToggleGroupItem>
</ToggleGroup>
```

## 데모 실행

Express 백엔드를 시작합니다:

```bash
npm run start:server
```

Vite 개발 서버를 시작합니다:

```bash
npm run dev
```

웹 브라우저에서 `http://localhost:3000`을 엽니다. 다른 브라우저 탭에서 동일한 URL을 열면 실시간 동기화가 작동하며, 한 탭에서의 변경이 다른 탭에 즉시 반영됩니다.

## 요약

기본 TanStack Query 튜토리얼에 비해 이 데모가 추가한 기능:

| 기능 | 기본 튜토리얼 | 이 데모 |
|---|---|---|
| 백엔드 스토리지 | 로컬 JSON 파일 | Supabase(PostgreSQL) |
| 실시간 동기화 | 없음 | Supabase Realtime 구독 |
| 변경 그룹화 | `data.save`(항목별) | `data.batchSave`(제스처별) |
| Undo/Redo 지속성 | 클라이언트 측만 | `applySnapshotDiff`로 지속 저장 |

핵심 아키텍처 패턴은 **pending-operations 세트**입니다. 로컬 뮤테이션이 도착하기 전에 예상되는 Realtime 에코를 등록하여 핸들러가 원격 변경(재요청 필요)과 로컬 변경의 에코를 구분할 수 있게 합니다.

## GitHub 예제 저장소

전체 작동 프로젝트는 [GitHub에서 확인 가능](https://github.com/dhtmlx/react-gantt-tanstack-supabase-starter).

## 다음 단계

이것은 React Gantt 상태 관리 순서의 세 번째 튜토리얼입니다:

1. [Zustand](integrations/react/state/zustand.md) - 로컬 메모리 상태
2. [TanStack Query](integrations/react/state/tanstack-query.md) - JSON 파일 백엔드를 사용하는 서버 기반 상태
3. **TanStack Query + Supabase** - 실시간 다중 사용자 동기화(현재 위치)

여기서부터 다음을 할 수 있습니다:

- [Data Binding & State Management Basics](integrations/react/state/state-management-basics.md)에서 핵심 데이터 바인딩 개념을 다시 확인하기
- [Using React Gantt with TanStack Query](integrations/react/state/tanstack-query.md)에서 더 간단한 로컬 백엔드 버전과 비교
- 다른 백엔드로 Realtime 동기화를 탐색하고 싶다면 [Firebase Integration](integrations/react/firebase-integration.md)을 확인하십시오
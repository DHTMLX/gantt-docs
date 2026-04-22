--- 
title: Использование React Gantt с TanStack Query
sidebar_label: TanStack Query
description: 'Узнайте, как управлять состоянием сервера Gantt с TanStack Query, привязывать мутации к колбэку data.save и сочетать это с лёгким Zustand-хранилищем для истории отмены/повтора и настройки интерфейса.'
--- 

# React Gantt - Учебник по TanStack Query

Этот учебник проведет вас через создание приложения React TypeScript с Vite, интеграцию компонента DHTMLX React Gantt и управление состоянием сервера с TanStack Query. Небольшое хранилище Zustand обрабатывает локальное состояние UI — историю отмены/повтора и конфигурацию зума.

Акцент в этом руководстве сделан на интеграцию на стороне клиента: как TanStack Query получает данные, как мутации подключаются к колбэку Gantt's `data.save`, и как кэш запросов используется в качестве единственного источника правды для данных Gantt. В демонстрации бэкенд намеренно минимален — он использует локальный JSON-файл вместо реальной базы данных. Это позволяет продемонстрировать рабочий REST API без добавления непригодной инфраструктуры. В продакшн-приложении вы замените его на любое решение постоянного хранения по вашему выбору.

## Предварительные знания

- Базовые знания React, TypeScript, Vite и TanStack Query
- Рекомендуется: прочитать [](integrations/react/state/state-management-basics.md) для понимания режима привязки данных и этого учебника на основе колбэка `data.save`.

## Быстрая настройка - создание проекта

Перед началом установите [Node.js](https://nodejs.org/en/).

Создайте проект на Vite React + TypeScript:

```bash
npm create vite@latest react-gantt-tanstack-query-demo -- --template react-ts
cd react-gantt-tanstack-query-demo
```

Теперь установим необходимые зависимости.

- Для **npm**:

```bash
npm install @tanstack/react-query zustand @mui/material @mui/icons-material @emotion/react @emotion/styled express cors
```

- Для **yarn**:

```bash
yarn add @tanstack/react-query zustand @mui/material @mui/icons-material @emotion/react @emotion/styled express cors
```

Также понадобятся несколько dev-зависимостей, чтобы запустить Express-бэкенд-сервер с TypeScript:

- Для **npm**:

```bash
npm install -D tsx nodemon @types/express @types/node
```

- Для **yarn**:

```bash
yarn add -D tsx nodemon @types/express @types/node
```

Далее нужно установить пакет React Gantt.

### Установка React Gantt

Установите React Gantt согласно [руководству по установке React Gantt](integrations/react/installation.md).

В этом руководстве мы используем пакет evaluations:

```bash
npm install @dhtmlx/trial-react-gantt
```

или

```bash
yarn add @dhtmlx/trial-react-gantt
```

Если вы уже используете Professional пакет, вместо `@dhtmlx/trial-react-gantt` в командах и импортах используйте `@dhx/react-gantt`.

Добавьте следующие скрипты в `package.json`, чтобы можно было запускать бэкенд и фронтенд отдельно:

```json
"scripts": {
  "dev": "vite",
  "start:server": "nodemon --exec tsx src/server.ts"
}
```

:::note
Чтобы Gantt занимал все пространство тела страницы, необходимо убрать базовые стили из файлов `App.css` и `index.css` в папке `src` и добавить следующие стили в файл `index.css`:

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

## Настройка тестовых данных и конфигурации

Создайте файл `src/seed/Seed.ts` с конфигурацией зума для Gantt:

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

Также создайте `src/seed/data.json` с начальными задачами и ссылками, которые будет обслуживать бэкенд:

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

## Построение Backend-сервера

:::note
Сервер ниже — демонстрационная удобная утилита, а не продакшн-рекомендация. Он хранит все данные в одном JSON-файле, чтобы вы могли запустить полный учебник без настройки базы данных. Замените это любым реальным уровнем постоянного хранения — PostgreSQL, MongoDB, облачный API и т.д. — при создании продакшн-приложения. Клиентская интеграция TanStack Query остается той же независимо от того, что используется на бэкенде.
 :::

Создайте `src/server.ts`. Это легковесный Express-сервер, который читает и записывает JSON-файл для моделирования настоящего REST API:

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

// Copy seed data to a runtime location on startup so the seed stays pristine
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

Сервер предоставляет следующие эндпоинты:

| Метод | Путь         | Действие                                        |
| ------ | ------------ | ------------------------------------------------ |
| GET    | `/data`      | Возвращает все задачи и ссылки                   |
| POST   | `/tasks`     | Создает задачу, присваивает стабильный DB id     |
| PUT    | `/tasks/:id` | Обновляет задачу                                   |
| DELETE | `/tasks/:id` | Удаляет задачу                                     |
| POST   | `/links`     | Создает связь, присваивает стабильный DB id       |
| PUT    | `/links/:id` | Обновляет связь                                      |
| DELETE | `/links/:id` | Удаляет связь                                        |

Когда задача или связь создаются, сервер префиксирует сгенерированный клиентом id строкой `DB_ID:` и возвращает новую запись. Компонент Gantt использует возвращенный id для обновления своей внутренней ссылки.

## Создание слоя API

Создайте `src/api.ts` с простыми функциями на основе `fetch`, которые будет вызывать TanStack Query:

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

Каждая функция выбрасывает исключение при любом ответе, не являющемся 2xx, чтобы TanStack Query мог перехватить ошибку и запустить обработчик `onError`.

## Построение компонента панели управления

Добавьте компонент **Toolbar** в `src/components/Toolbar.tsx`:

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

Компонент toolbar принимает следующие свойства:

- `canUndo` / `canRedo` — булевые флаги, включающие или отключающие кнопки undo/redo в зависимости от длины стека истории.
- `onUndo` / `onRedo` — колбэки, вызываемые для реализации логики отмены/повтора на родительском уровне.
- `onZoom` — колбэк, который обновляет уровень зума при клике на кнопки.
- `currentZoom` — указывает активный уровень зума, чтобы соответствующая кнопка выглядела как активная.

## Настройка TanStack Query в main.tsx

Оборачиваем приложение в `QueryClientProvider`, чтобы каждое компонент могло получить доступ к клиенту TanStack Query:

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

`QueryClient` создаётся один раз за пределами дерева рендера, чтобы не пересоздавался на каждом рендере.

## Создание главного компонента Gantt

Создайте `src/components/GanttComponent.tsx`. Именно здесь TanStack Query управляет всеми операциями с данными.

### Импорты и начальная настройка

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

### Получение данных через useQuery

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

`useQuery` получает все задачи и ссылки с сервера при монтировании компонента. Результат хранится в кэше TanStack Query под ключом `['data']`.

- `isLoading` — true во время первой загрузки.
- `isError` / `error` — заполняются, если загрузка завершилась ошибкой.
- Значения по умолчанию: пустые массивы (`fetchedData || { tasks: [], links: [] }`), чтобы Gantt получал валидные пропсы до первого ответа.

### Чтение состояния Zustand

```tsx
const { undo, redo, setZoom, config, recordHistory, past, future } = useGanttStore();
```

Только UI-состояние приходит из Zustand — конфигурация зума и стеки истории undo/redo. Задачи и ссылки живут в кэше TanStack Query, а не в Zustand.

### Создание вспомогательной функции снимка состояния

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

`makeSnapshot` захватывает глубокую копию текущих задач, ссылок и конфигурации как единый объект `Snapshot`. Он вызывается перед каждой мутацией, чтобы предыдущую конфигурацию можно было вернуть откатом.

### Определение мутаций

Каждая операция CRUD оборачивается хуком `useMutation`. Все шесть мутаций используют одинаковые три жизненных хука:

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

- **`onMutate`** — вызывается синхронно перед API-вызовом. Здесь регистрируем снимок состояния, чтобы история undo захватывала состояние прямо до изменений.
- **`onSuccess`** — вызывает `queryClient.invalidateQueries`, что помечает кэш `['data']` как устаревший и инициирует фоновый повторный запрос. Гantt повторно отрисовывается после завершения повторного запроса.
- **`onError`** — регистрирует ошибку. Можно расширить этот обработчик, чтобы показать уведомление или откатить оптимистичные изменения.

### Подключение мутаций к Gantt через data.save

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
Н начиная с версии v9.1.3 Gantt автоматически распознаёт строки ISO date и пере overrides-templates больше не нужны. Здесь они приводятся для совместимости с более старыми версиями Gantt. См. [Loading dates in ISO format](guides/loading.md#loading-dates-in-iso-format).
:::

Колбэк `data.save` служит мостом между диаграммой Gantt и TanStack Query. При любом изменении пользователя:

1. Gantt вызывает `data.save` с типом сущности (`task` или `link`), действием (`create`, `update` или `delete`), полным payload-объектом и его id.
2. Мы направляем это к соответствующей мутации.
3. Мутация вызывает API-функцию и, в случае успеха, инвалидирует кэш.

Если нужна более глубокая запись об этом колбэке, смотрите раздел [Handling changes with data.save](integrations/react/state/state-management-basics.md#handlingchangeswithdatasave) в Руководстве по основам.

### Обработчики Undo, redo и zoom

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

- `handleUndo` передаёт текущий снимок в действие Zustand `undo` (чтобы его можно было поместить на противоположный стек) и возвращает предыдущий снимок. Затем он записывает этот снимок напрямую в кэш TanStack Query при помощи `setQueryData`. Реактивная перерисовка Gantt происходит немедленно — без обращения к серверу.
- `handleRedo` работает аналогично в обратном направлении.
- `handleZoom` сначала регистрирует снимок истории, затем вызывает действие Zustand `setZoom` для обновления `config.zoom`.

Эта схема обеспечивает быструю работу undo/redo и офлайн-режим, так как все операции выполняются на клиентском кэше.

### Рендеринг

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

- Загрузка и состояния ошибок обрабатываются до отрисовки графика.
- `canUndo` и `canRedo` берутся из стеков истории Zustand, поэтому кнопки панели инструментов отключаются, если нечего отменять или повторять.
- `tasks` и `links` всегда берутся из кэша TanStack Query; `config` — из Zustand.

### Обновление App.tsx

Обновите `src/App.tsx`, чтобы использовать компонент Gantt:

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

## Настройка Zustand Store

Zustand управляет только локальным UI-состоянием: конфигурацией зума и стеками undo/redo. Задачи и ссылки принадлежат TanStack Query.

Создайте `src/store.ts`:

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

### Что управляет store

- **`config`** — конфигурация зума Gantt, передаваемая напрямую в проп `config` компонента `<ReactGantt>`.
- **`past` / `future`** — стеки снимков истории для undo и redo. Каждый снимок включает `tasks`, `links` и `config`, чтобы полное откатиться можно было восстановить всё сразу.
- **`maxHistory`** — ограничивает историю последними 50 снимками.

### Почему undo и redo принимают параметр снимка

В чисто Zustand-уроке хранилище владеет задачами и связями, поэтому `undo()` может просто заменить предыдущий снимок. Здесь же задачи и связи живут в кэше TanStack Query. Чтобы сохранить хранение отдельно от TanStack Query, каждый вызов undo/redo:

1. Получает текущий снимок из компонента как аргумент (чтобы хранилище могло поместить его на противоположный стек, не зная о TanStack Query).
2. Возвращает целевой снимок, чтобы компонент мог записать его в кэш с помощью `queryClient.setQueryData`.

Такое разделение означает, что Zustand управляет только учётом истории, а TanStack Query остается единственным источником правды для данных сервера.

## Запуск приложения

Запустите Express-бэкенд в одном терминале:

```bash
npm run start:server
```

или:

```bash
yarn start:server
```

Затем запустите Vite dev-сервер в другом терминале:

```bash
npm run dev
```

или:

```bash
yarn dev
```

Откройте http://localhost:3000. Гantt-график загружает данные с бэкенда, и каждое ваше изменение сохраняется на сервере автоматически.

## Резюме

В этом руководстве вы сделали:

- настройку проекта на основе Vite + React + TypeScript с TanStack Query и Zustand
- создание Express REST-бэкенда, который обслуживает и сохраняет задачи и связи в виде JSON
- использование `useQuery` для загрузки всех данных Gantt с сервера при загрузке
- определение шести хуков `useMutation` — по одному на CRUD-операцию — и их подключение к колбэку `data.save`
- реализацию отката/повтора на основе снимков, сохранённых в Zustand, и восстановления снимков в кэш TanStack Query через `queryClient.setQueryData`

Это обеспечивает полную декларативность компонента Gantt: состояние сервера управляется TanStack Query, UI-состояние — Zustand, а колбэк `data.save` связывает взаимодействия пользователя с мутациями без знания компонентом о логике persistence.

## Репозиторий демонстрации на GitHub

Полноценный рабочий проект, идущий за этим руководством, доступен на GitHub: https://github.com/dhtmlx/react-gantt-tanstack-query-starter.

## Что дальше

Чтобы углубиться:

- повторно ознакомиться с концепциями, лежащими в основе примера, в [](integrations/react/state/state-management-basics.md)
- сочетать store-управляемое состояние с продвинутой конфигурацией и шаблонизацией в обзорe React Gantt: [React Gantt overview](integrations/react/overview.md)
- рассмотреть аналогичную схему с другими менеджерами состояния:
  - [Using React Gantt with Zustand](integrations/react/state/zustand.md)
  - [Using React Gantt with Redux Toolkit](integrations/react/state/redux-toolkit.md)
  - [Using React Gantt with MobX](integrations/react/state/mobx.md)
  - [Using React Gantt with XState](integrations/react/state/xstate.md)
  - [Using React Gantt with Jotai](integrations/react/state/jotai.md)
  - [Using React Gantt with Valtio](integrations/react/state/valtio.md)
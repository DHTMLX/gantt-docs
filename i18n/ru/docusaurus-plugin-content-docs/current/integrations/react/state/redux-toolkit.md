---
title: Использование React Gantt с Redux Toolkit
sidebar_label: Redux Toolkit
description: "Пошаговое руководство по интеграции React Gantt с Redux Toolkit."
---

# React Gantt — Руководство по Redux Toolkit

Это руководство проведет вас через создание приложения на React с TypeScript с использованием Vite, интеграцию компонента DHTMLX React Gantt и управление состоянием с Redux Toolkit.

## Предварительные требования

- Базовые знания React, TypeScript и Redux
- Рекомендуется: прочитать [](integrations/react/state/state-management-basics.md) чтобы понять режим привязки данных и колбек `data.save`, на котором основано данное руководство.

## Быстрая настройка - создание проекта

Перед началом установите [Node.js](https://nodejs.org/en/).

Создайте проект на базе Vite с React + TypeScript:

~~~bash  
npm create vite@latest react-gantt-redux-demo -- --template react-ts  
cd react-gantt-redux-demo  
~~~

Теперь установим необходимые зависимости.

* Для **npm**: 

~~~bash
npm install @reduxjs/toolkit react-redux @mui/material @mui/icons-material @emotion/react @emotion/styled
~~~

* Для **yarn**:

~~~bash
yarn add @reduxjs/toolkit react-redux @mui/material @mui/icons-material @emotion/react @emotion/styled
~~~

Затем нужно установить пакет React Gantt. 

### Установка React Gantt

Установите React Gantt согласно руководству по установке [React Gantt installation guide](integrations/react/installation.md).

В этом руководстве мы используем оценочный пакет (evaluation package):

~~~bash
npm install @dhtmlx/trial-react-gantt
~~~

или

~~~bash
yarn add @dhtmlx/trial-react-gantt
~~~

Если вы уже используете Professional пакет, замените `@dhtmlx/trial-react-gantt` на `@dhx/react-gantt` в командах и импортах.


Теперь можно запустить сервер разработки:

~~~bash
npm run dev 
~~~

Теперь ваш проект React должен работать на `http://localhost:5173`.

:::note
Чтобы Gantt занимал все доступное пространство body, нужно удалить стандартные стили из файла `App.css` в папке `src` и добавить следующий стиль:

~~~css  
#root {  
  margin: 0;  
  padding: 0;  
  height: 100%;  
  width: 100%;  
}  
~~~
:::

## Настройка Redux-хранилища

Создайте файл `src/redux/store.ts`. Это подключает срез `gantt` к Redux-хранилищу:

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

`configureStore` настраивает Redux со здравым набором значений по умолчанию (DevTools, thunk). Типизация `RootState` и `AppDispatch` упрощает типизацию `useSelector` и `useDispatch` по всему приложению. 

## Создание Redux-среза

Создайте файл `src/redux/ganttSlice.ts` для обработки всех данных, связанных с Gantt: задачи, связи (dependencies) и настройки конфигурации, такие как масштабирование (zoom).

В этот срез также встроена **функциональность undo/redo** через отслеживание истории снимков, что позволяет пользователям откатывать или повторно применять предыдущие изменения на графике. 

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

`GanttState` включает три новых поля: `past`, `future` и `maxHistory`, которые вместе реализуют механизм **«путешествия во времени»** для действий Undo/Redo.

Чтобы поддержать undo/redo, используются две вспомогательные функции:

- **`createSnapshot(state)`** — глубоко копирует текущие данные Gantt, чтобы сохранить точную копию задач, связей и конфигурации на данный момент времени.

- **`pushHistory(state)`** — сохраняет текущий снимок в массив `past` перед любым изменяющим действием, очищая стек `future` (чтобы redo применялся только к последнему Undo).

Ниже приведено объяснение файла `ganttSlice.ts`. Функция `createSlice` автоматически генерирует:

1. **Редьюсеры** — функции, которые изменяют состояние.  
2. **Создатели действий** — функции, которые можно отправлять из вашего UI.

Каждый редьюсер обновляет конкретную часть состояния Gantt:

- **updateTask**: обновляет данные существующей задачи (например, когда вы редактируете имя, дату или продолжительность).  
- **createTask**: добавляет новую задачу в состояние. Префикс `DB_ID:` имитирует то, как реальный бэкенд может присваивать уникальный идентификатор после сохранения в базе данных.  
- **deleteTask**: удаляет задачу из хранилища по её ID.  
- **updateLink, createLink, deleteLink**: работают так же, как редьюсеры задач, но для **связей** (dependencies между задачами).  
- **setZoom**: обновляет текущий уровень масштабирования в объекте конфигурации, с учётом истории.  
- **undo**: восстанавливает предыдущий снимок из `past`, перемещая текущий в `future`.  
- **redo**: повторно применяет ранее отмененное состояние, перемещая снимок из `future` обратно в `past`.

Каждое изменяющее действие сначала вызывает `pushHistory(state)`, что позволяет пользователю безопасно выполнять Undo или Redo для любой задачи, связи или изменения конфигурации.

## Настройка примерных данных и конфигурации

Создайте примерные данные для нашего Gantt-чарта в `src/common/Seed.ts`, которые будут содержать начальные данные:

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

## Создание компонента панели инструментов управления (Toolbar)

Теперь добавим компонент **Toolbar** в `src/common/Toolbar.tsx`.

Этот компонент дает пользователям быстрый доступ к обычным элементам управления Gantt, таким как переключение между представлениями *day*, *month* и *year*, а также выполнение действий **undo/redo**.

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

Мы используем компоненты Material UI (`Button`, `ButtonGroup`, `Divider` и иконки) для создания простого, чистого расположения панели инструментов.

Панель принимает следующие необязательные свойства (props):

- `onUndo` и `onRedo` — колбэки для действий undo/redo.  
- `onZoom` — колбэк, вызываемый при нажатии одной из кнопок масштабирования.  
- `currentZoom` — сообщает панели, какой уровень масштабирования активен в данный момент, чтобы выделенная кнопка была подсвечена. 

Кнопки "Day", "Month" и "Year" вызывают `onZoom('day')`, `onZoom('month')` или `onZoom('year')` соответственно. Активная кнопка масштаба помечена свойством `variant="contained"`, остальные — `outlined`, что обеспечивает явную визуальную подсказку текущего состояния. 

В дальнейшем в руководстве мы подключим эту панель к действиям нашего хранилища:

- При клике на "Day" мы вызовем `setZoom('day')` из нашего хранилища  
- Кнопка Undo вызовет метод `undo()` из хранилища, чтобы вернуть к предыдущим состояниям  
- Кнопка Redo вызовет `redo()` чтобы повторно применить изменения  
- Все изменения состояния (правки задач, удаления, изменения масштаба и т.д.) отслеживаются в нашей системе истории и могут быть отменены или повторно применены без сбоев

Это обновляет конфигурацию диаграммы Gantt в глобальном состоянии, и UI автоматически перерисуется с новым уровнем масштаба.

Давайте создадим главный компонент в `src/components/GanttComponent.tsx`, который объединит DHTMLX React Gantt с управлением состоянием через Redux Toolkit. Этот компонент станет центральной частью нашего приложения, обрабатывая все взаимодействия с диаграммой Gantt и обновления состояния.

Мы будем использовать хуки `useMemo` и `useCallback` для повышения производительности за счет предотвращения лишних повторных рендеров. `useMemo` кеширует вычисляемые значения (например, конфигурационные объекты), в то время как `useCallback` мемоизирует колбэки. Это обеспечивает, что эти объекты и функции не пересоздаются при каждом рендере, если их зависимости не изменились.

Создадим основной компонент и настроим интеграцию с Redux:

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

- `ganttRef` даёт прямой доступ к экземпляру Gantt для вызова методов вроде undo/redo  
- `dispatch` — функция для отправки действий в Redux-хранилище  
- Мы используем хуки `useSelector` для извлечения задач, связей и конфигурации из Redux-стана  
- `useEffect` устанавливает заголовок документа при монтировании компонента

Компонент должен обрабатывать действия пользователя из панели инструментов и самого Gantt. Мы используем `useCallback` для мемоизации функций-обработчиков:  
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

- `handleZoomIn` диспahltирует действие по обновлению уровня масштаба в Redux-стейте  
- `handleUndo` и `handleRedo` диспальтят действия `undo`/`redo` из среза, которые восстанавливают предыдущий снимок из `past` или `future`  
- Эти функции передаются в компонент Toolbar как колбэки

Теперь конфигурируем диаграмму Gantt, используя `useMemo` для кеширования объектов конфигурации:

:::note
С версии v9.1.3 Gantt автоматически распознаёт даты ISO-строк, и эти шаблоны overrides больше не нужны. Они приведены здесь для совместимости с более старыми версиями Gantt. См. [Loading dates in ISO format](guides/loading.md#loading-dates-in-iso-format).
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

Нам также нужно обработать все изменения данных из графика Gantt:

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

Колбек `data.save` вызывается каждый раз, когда в графике Gantt происходят какие-либо изменения.

Он принимает четыре параметра:  
  - `entity`: либо `'task'`, либо `'link'`  
  - `action`: тип операции ('create', 'update', 'delete')  
  - `payload`: сами изменяемые данные  
  - `id`: идентификатор редактируемого элемента  

Исходя из сущности и действия, мы диспатчим соответствующее Redux-действие. Это создаёт плавное соединение между внутренним состоянием графа и нашим Redux-хранилищем.

Если нужна более глубокая объяснение этого колбэка, см. [Handling changes with data.save](integrations/react/state/state-management-basics.md#handlingchangeswithdatasave) в руководстве Basics.

Наконец, отобразим полный компонент:  

~~~tsx
return (  
  <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>  
    <Toolbar onUndo={handleUndo} onRedo={handleRedo} onZoom={handleZoomIn} currentZoom={config.zoom.current} />

    <ReactGantt tasks={tasks} links={links} config={ganttConfig} templates={templates} data={data} ref={ganttRef} />  
  </div>  
);  
~~~

## Интеграция Redux Provider

Обновите ваш `src/main.tsx`, чтобы включить Redux Provider:  

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

Затем обновите ваш `src/App.tsx`, чтобы использовать наш компонент Gantt:

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

Наконец, можно запустить сервер разработки и протестировать приложение: 

~~~bash
npm run dev
~~~

или: 
~~~bash
yarn dev  
~~~  

## Резюме

В этом руководстве вы сделали следующее:

- создали проект на Vite + React  
- добавили React Gantt и связали его с хранилищем Redux Toolkit  
- реализовали undo/redo на основе снимков в `ganttSlice`  
- подключили панель инструментов Material UI к действиям масштабирования и истории  
- использовали колбек `data.save`, чтобы каждое изменение задачи/ссылки в графике Gantt становилось действием Redux.

Результат — диаграмма Gantt, чьи задачи, связи и конфигурация полностью управляются состоянием Redux.

## Демонстрационный репозиторий на GitHub

Полнофункциональный проект, следующую этому руководству, можно найти на GitHub: [https://github.com/dhtmlx/react-gantt-redux-starter](https://github.com/dhtmlx/react-gantt-redux-starter).

## Что дальше

Для дальнейшего углубления:

- Повторно изучите концепции, лежащие в основе этого примера, в [](integrations/react/state/state-management-basics.md)
- Соедините Redux-поддерживаемое состояние с продвинутой конфигурацией и темплейтами в обзорe React Gantt [React Gantt overview](integrations/react/overview.md)
- Исследуйте тот же паттерн с другими менеджерами состояния:
  - [Using React Gantt with Zustand](integrations/react/state/zustand.md)
  - [Using React Gantt with MobX](integrations/react/state/mobx.md)
  - [Using React Gantt with XState](integrations/react/state/xstate.md)
  - [Using React Gantt with Jotai](integrations/react/state/jotai.md)
  - [Using React Gantt with Valtio](integrations/react/state/valtio.md)
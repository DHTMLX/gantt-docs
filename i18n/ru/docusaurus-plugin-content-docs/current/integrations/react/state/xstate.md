---
title: Using React Gantt with XState
sidebar_label: XState
description: "Узнайте, как интегрировать React Gantt в архитектуру, управляемую XState. Рассматривает моделирование данных Gantt в машине состояний, обработку событий из callback сохранения и координацию UI и бизнес-логики."
---


# React Gantt - Руководство по XState

Этот руководствo проведёт вас через создание приложения на React с TypeScript и Vite, интеграцию компонента DHTMLX React Gantt и управление состоянием с помощью XState.

## prerequisites / Что нужно знать
- Базовые знания React, TypeScript, Vite и XState
- Рекомендуется: прочитать [](integrations/react/state/state-management-basics.md) чтобы понять режим привязки данных и колбэк `data.save`, на котором основано данное руководство.

## Быстрая настройка - создание проекта

Перед началом установите Node.js: https://nodejs.org/en/

Создайте проект на Vite с React + TypeScript:

~~~bash  
npm create vite@latest react-gantt-xstate-demo -- --template react-ts  
cd react-gantt-xstate-demo  
~~~

Теперь установим необходимые зависимости.

* Для **npm**: 

~~~bash
npm install xstate @xstate/react @mui/material @mui/icons-material @emotion/react @emotion/styled
~~~

* Для **yarn**:

~~~bash
yarn add xstate @xstate/react @mui/material @mui/icons-material @emotion/react @emotion/styled
~~~

Затем нужно установить пакет React Gantt. 

### Установка React Gantt

Установите React Gantt как указано в [руководстве по установке React Gantt](integrations/react/installation.md).

В этом руководстве мы используем пакет evaluation:

~~~bash
npm install @dhtmlx/trial-react-gantt
~~~

или

~~~bash
yarn add @dhtmlx/trial-react-gantt
~~~

Если вы уже используете Professional-пакет, замените `@dhtmlx/trial-react-gantt` на `@dhx/react-gantt` в командах и импортируемых сущностях.

Теперь можно запустить dev-сервер:

~~~bash
npm run dev 
~~~

Теперь ваш проект на React должен работать по адресу `http://localhost:5173`.

:::note
Чтобы Gantt занимал всё пространство body, нужно удалить дефолтные стили из файла `App.css` в папке `src` и добавить следующий стиль:

~~~css  
#root { 
  margin: 0; 
  padding: 0; 
  height: 100%; 
  width: 100%; 
} 
~~~
:::

## Настройка примерных данных и конфигурации

Создайте примерные данные для нашего Gantt-графика в `src/seed/Seed.ts`, которые будут содержать начальные данные:

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

## Создание панели управления — Toolbar

Теперь добавим компонент **Toolbar** в `src/components/Toolbar.tsx`.

Этот компонент даёт пользователям быстрый доступ к общим контролям Gantt, таким как зум между режимами *day*, *month* и *year*, а также выполнение действий **undo/redo**.

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

Мы используем компоненты Material UI (Button, ButtonGroup, Divider и иконки) для создания простого и чистого расположения панели инструментов, которая обеспечивает интуитивно понятное управление Gantt-графиком.

Панель принимает следующие необязательные свойства (props), которые обеспечивают бесшовную интеграцию с нашей машиной состояний XState:

- `onUndo` и `onRedo` — колбэк-функции, которые диспатчат события undo/redo в нашу машину состояний.
- `onZoom` — колбэк, который отправляет события обновления зума в нашу машину, когда пользователь нажимает кнопки зума.
- `currentZoom` — указывает, какой уровень зума сейчас активен, позволяя панели выделять выбранную кнопку.

Кнопки для "Day", "Month" и "Year" вызывают `onZoom('day')`, `onZoom('month')` или `onZoom('year')` соответственно. Активная кнопка зума использует `variant="contained"`, остальные — `outlined`, что обеспечивает ясный визуальный сигнал текущего состояния.

Панель напрямую подключается к нашей машине XState через отправку событий:

- Контроль зума: при нажатии пользователем "Day" мы отправляем событие `SET_ZOOM` с уровнем нашему state machine, что обновляет конфигурацию Gantt через заранее определённые действия  
- Кнопка Undo отправляет событие `UNDO` в машину, вызывая откат к предыдущим состояниям, а кнопка Redo отправляет `REDO` для повторного применения изменений  
- Все изменения состояния (правки задач, удаления, настройки зума и т. д.) обрабатываются как дискретные события в нашей машине состояний и могут быть отменены или повторно применены через систему истории


## Создание главного компонента Gantt

Начнём с построения основного компонента, который будет размещать Gantt-график. Создайте `src/components/GanttComponent.tsx`.

Сначала импортируем `useEffect`, `useMemo` и `useRef` из React, основной компонент `ReactGantt` и типы из пакета Gantt, наш пользовательский компонент `Toolbar` и определение `ganttMachine` из настройки XState:

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

Теперь настроим компонент и подключим его к нашей машине состояний:

~~~tsx
export default function DemoXState() {  
  const [state, send] = useMachine(ganttMachine);  
  const ganttRef = useRef<ReactGanttRef>(null);

  useEffect(() => {  
    document.title = 'DHTMLX React Gantt | XState';  
  }, []);
}
~~~

- Мы используем хук `useMachine` из `@xstate/react` для подключения компонента к машине состояний  
- Хук возвращает текущее состояние `state` и функцию `send` для отправки событий в машину  
- `ganttRef` обеспечивает прямой доступ к экземпляру Gantt для императивных операций  
- `useEffect` устанавливает заголовок документа при монтировании компонента

Давайте сконфигурируем шаблоны Gantt, которые определяют форматирование и разбор дат для единообразной обработки данных и обработки событий:

:::note
Начиная с версии v9.1.3 Gantt автоматически распознаёт строки даты в формате ISO, и эти переопределения шаблонов больше не нужны. Они приведены здесь для совместимости с более старыми версиями Gantt. См. [Loading dates in ISO format](guides/loading.md#loading-dates-in-iso-format).
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

Мы используем `useCallback`, чтобы мемоизировать обработчики событий undo, redo и zoom, что предотвращает лишние повторные рендеры дочерних компонентов при изменении компонента. Каждый обработчик диспатчит определённый тип события в машину состояний с необходимой нагрузкой.

Самая важная часть — связывание изменений данных Gantt с нашей машиной XState:

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

- Колбэк `data.save` обрабатывает все изменения данных из Gantt-графика  
- Он направляет разные операции (создание, обновление, удаление) в соответствующие события машины с использованием функции `send`  
- Каждое действие пользователя в Gantt-графике становится дискретным событием, отправляемым в машину состояний  
- Массив зависимостей обеспечивает обновление колбэка, когда меняется функция `send`

Если вам нужна более подробная расшифровка этого колбэка, смотрите раздел [Handling changes with data.save](integrations/react/state/state-management-basics.md#handlingchangeswithdatasave) в руководстве Basics.

Наконец, отрисуем полный компонент:

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

- Панель Toolbar получает обработчики событий, которые диспатчат `UNDO`, `REDO` и `SET_ZOOM` в машину состояний  
- Компонент ReactGantt получает все данные (`tasks`, `links`, `config`) из контекста машины

Затем обновите ваш `src/App.tsx`, чтобы использовать наш Gantt-компонент:

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

## Настройка машины XState

Теперь создадим решение по управлению состоянием с использованием XState. Создайте `src/machine.ts`:

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

- Мы определяем интерфейсы TypeScript для контекста машины и структуры снимков  
- `ContextType` описывает все данные, связанные с Gantt: задачи, связи, конфигурацию и историю изменений  
- `Snapshot` задаёт структуру состояния для функциональности undo/redo

Теперь определим типы событий, которые будет обрабатывать наша машина:

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

- Каждое взаимодействие пользователя представлено как дискретное событие с конкретным типом и полезной нагрузкой  
- События строго типизированы, обеспечивая безопасность типов на всём приложении

Давайте создадим конфигурацию машины состояния:

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

Конфигурация машины:

- Машина имеет одно состояние `ready`, в котором доступны все операции Gantt  
- Каждое событие инициирует последовательность действий, обновляющих контекст машины  
- `context` задаёт начальное состояние с примерами данных и пустыми массивами истории  
- Обработчики событий указывают, какие действия выполнять при получении событий

Теперь реализуем действия, которые обрабатывают обновления состояния:

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

История изменений (History Management Actions):

* `pushHistory` создаёт снимок текущего состояния и добавляет его в стек истории  
* `undo` восстанавливает предыдущее состояние из массива `past` и перемещает текущее состояние в `future`  
* `redo` повторно применяет следующее состояние из `future` и сохраняет текущее состояние в `past`

И давайте реализуем операции над данными Gantt:

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

- `addTask` создаёт новые задачи с имитацией идентификаторов базы данных и добавляет их в список задач  
- `upsertTask` обновляет существующие задачи по ID  
- `deleteTask` удаляет задачи по ID из списка задач  
- Аналогичные паттерны применяются к операциям с связями (`addLink`, `upsertLink`, `deleteLink`)  
- Каждое изменение данных сопровождается `pushHistory`, чтобы обеспечить Undo/Redo  
- Функция `assign` из XState используется для неизменяемого обновления контекста машины

## Запуск приложения

Наконец, запустим dev-сервер и протестируем приложение: 

~~~bash
npm run dev
~~~

или:

~~~bash
yarn dev 
~~~ 


## Резюме

В этом руководстве вы сделали:

- создали проект на Vite + React  
- добавили React Gantt и связали его с машиной состояний через `useMachine`  
- смоделировали задачи, связи и конфигурацию зума в контексте машины  
- реализовали undo/redo на основе снимков с использованием `past`/`future` и действия `pushHistory`  
- использовали колбэк `data.save`, чтобы каждое изменение в Gantt-графике становилось строго типизированным событием XState.

Это позволяет держать компонент Gantt полностью декларативным, в то время как вся логика мутации и обработка истории живут внутри машины состояний.

## GitHub демо-репозиторий

Полностью рабочий проект, следующее этому руководству, доступен на GitHub — [примеры на GitHub](https://github.com/dhtmlx/react-gantt-xstate-starter).

## Что дальше

Чтобы продолжить:

- пересмотреть концепции, лежащие в основе этого примера, в [](integrations/react/state/state-management-basics.md)
- сочетать машину XState с продвинутой конфигурацией и шаблонами в обзорe React Gantt: [React Gantt overview](integrations/react/overview.md)
- сравнить архитектуру, управляемую XState, с другими менеджерами состояний:
  - [Using React Gantt with Redux Toolkit](integrations/react/state/redux-toolkit.md)
  - [Using React Gantt with MobX](integrations/react/state/mobx.md)
  - [Using React Gantt with Zustand](integrations/react/state/zustand.md)
  - [Using React Gantt with Jotai](integrations/react/state/jotai.md)
  - [Using React Gantt with Valtio](integrations/react/state/valtio.md)
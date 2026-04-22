---
title: Использование React Gantt с Jotai
sidebar_label: Jotai
description: "Как хранить задачи, связи и ресурсы Gantt в атомах Jotai и обновлять их через обратный вызов сохранения. Минимальный, гибкий подход к управлению состоянием для React Gantt."
---


# React Gantt - Руководство по Jotai

Этот учебник проведет вас через создание приложения на React TypeScript с Vite, интеграцию компонента DHTMLX React Gantt и управление состоянием с помощью Jotai.

## Необходимые знания

- Базовые знания React, TypeScript, Vite и Jotai
- Рекомендуется: прочитать [](integrations/react/state/state-management-basics.md), чтобы понять режим привязки данных и обратный вызов `data.save`, на котором строится этот урок.

## Быстрая настройка - создание проекта

Перед началом установите [Node.js](https://nodejs.org/en/).

Создайте проект на Vite React + TypeScript:

~~~bash  
npm create vite@latest react-gantt-jotai-demo -- --template react-ts  
cd react-gantt-jotai-demo  
~~~

Теперь установим необходимые зависимости.

- Для **npm**: 

~~~bash
npm install jotai @mui/material @mui/icons-material @emotion/react @emotion/styled
~~~

- Для **yarn**:

~~~bash
yarn add jotai @mui/material @mui/icons-material @emotion/react @emotion/styled
~~~

Далее необходимо установить пакет React Gantt. 

### Установка React Gantt

Установите React Gantt, как описано в [руководстве по установке React Gantt](integrations/react/installation.md).

В этом руководстве мы используем пакет для оценки:

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

Теперь ваш проект на React должен работать по адресу `http://localhost:5173`.

:::note
Чтобы Gantt занимал всё пространство тела документа, нужно удалить стандартные стили из файла `App.css`, расположенного в папке `src`, и добавить следующий стиль:

~~~css  
#root { 
  margin: 0; 
  padding: 0; 
  height: 100%; 
  width: 100%; 
} 
~~~
:::

## Настройка образцов данных и конфигурации

Создайте образцы данных для нашего графика Gantt в `src/seed/Seed.ts`, которые будут содержать начальные данные:

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

## Построение компонента панели инструментов (Toolbar)

Теперь добавим компонент **Toolbar** в `src/components/Toolbar.tsx`.

Этот компонент предоставляет пользователям быстрый доступ к общим элементам управления Gantt, таким как изменение масштаба между представлениями *day*, *month* и *year*, а также выполнение действий undo/redo.

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

Мы используем компоненты Material UI (Button, ButtonGroup, Divider и иконки) для создания простой, аккуратной панели инструментов, которая обеспечивает интуитивно понятное управление графиком Gantt.

Панель инструментов принимает следующие необязательные свойства, которые позволяют бесшовно интегрироваться с хранилищем, управляемым через Jotai:

- `onUndo` и `onRedo` - колбэки, которые запускают логику отмены/повтора.
- `onZoom` - колбэк, обновляющий уровень масштаба при клике по кнопкам масштабирования
- `currentZoom` - указывает, какой уровень масштаба в данный момент активен, позволяя панели подсветить выбранную кнопку

Кнопки для "Day", "Month" и "Year" вызывают `onZoom('day')`, `onZoom('month')` или `onZoom('year')` соответственно. Выбранная кнопка масштаба использует `variant="contained"`, остальные — `outlined`, что обеспечивает явную визуальную подсказку текущего состояния. 

Во всем полном примере эти колбэки подключены к атомам-записям Jotai, отвечающим за зум и обновления истории.

## Создание основного компонента Gantt

Давайте построим наш основной компонент, который размещает график Gantt и использует Jotai для управления состоянием. Создайте `src/components/GanttComponent.tsx`.

Сначала импортируем необходимые хуки React для оптимальной производительности, а также основной компонент ReactGantt и типы из DHTMLX. Для управления состоянием используем атомарный подход Jotai:

~~~tsx
import { useEffect, useMemo, useRef } from 'react';  
import ReactGantt, {  
  type ReactGanttRef,  
  type ReactGanttProps,  
  type Link,  
  type SerializedTask,  
} from '@dhtmlx/trial-react-gantt';  
import '@dhtmlx/trial-react-gantt/dist/react-gantt.css';

import { useAtom, useSetAtom } from 'jotai';  
import {  
  ganttStateAtom,  
  undoAtom,  
  redoAtom,  
  setZoomAtom,  
  addTaskAtom,  
  updateTaskAtom,  
  deleteTaskAtom,  
  addLinkAtom,  
  updateLinkAtom,  
  deleteLinkAtom,  
} from '../store';

import Toolbar from './Toolbar';
~~~

`useAtom` и `useSetAtom` подключают наш компонент к атомарному состоянию.

Теперь давайте настроим компонент и свяжем его с атомами Jotai:

~~~tsx
export default function DemoJotai() {  
  const ganttRef = useRef<ReactGanttRef>(null);

  const [ganttState] = useAtom(ganttStateAtom);  
  const { tasks, links, config } = ganttState;  
  const setZoomLevel = useSetAtom(setZoomAtom);  
  const undo = useSetAtom(undoAtom);  
  const redo = useSetAtom(redoAtom);  
  const addTask = useSetAtom(addTaskAtom);  
  const updateTask = useSetAtom(updateTaskAtom);  
  const deleteTask = useSetAtom(deleteTaskAtom);  
  const addLink = useSetAtom(addLinkAtom);  
  const updateLink = useSetAtom(updateLinkAtom);  
  const deleteLink = useSetAtom(deleteLinkAtom);

  useEffect(() => {  
    document.title = 'DHTMLX React Gantt | Jotai';  
  }, []);
}
~~~

- `ganttRef` предоставляет прямой доступ к экземпляру Gantt для императивных операций  
- Мы используем `useAtom` для чтения полного состояния gantt и `useSetAtom` для отдельных действий  
- Каждое действие (setZoom, undo, redo и т. д.) — отдельный атом, который можно использовать независимо  
- `useEffect` устанавливает заголовок документа при монтировании компонента

Давайте настроим шаблоны Gantt, которые определяют форматирование и разбор дат для единообразной обработки данных:

:::note
С версии v9.1.3 Gantt автоматически распознаёт ISO-строки дат, и эти переопределения шаблонов больше не нужны. Они приведены здесь для совместимости с более старыми версиями Gantt. См. [Loading dates in ISO format](guides/loading.md#loading-dates-in-iso-format).
:::

~~~tsx
const templates: ReactGanttProps['templates'] = useMemo(
  () => ({
    format_date: (date: Date) => date.toISOString(),
    parse_date: (value: string) => new Date(value),
  }),
  []
);
~~~

Самое важное — связать изменения данных Gantt с нашими атомами Jotai:

~~~tsx
const data: ReactGanttProps['data'] = useMemo(  
  () => ({  
    save: (entity, action, item, id) => {  
      if (entity === 'task') {  
        const task = item as SerializedTask;  
        if (action === 'create') return addTask(task);  
        else if (action === 'update') updateTask(task);  
        else if (action === 'delete') deleteTask(id);  
      } else if (entity === 'link') {  
        const link = item as Link;  
        if (action === 'create') return addLink(link);  
        else if (action === 'update') updateLink(link);  
        else if (action === 'delete') deleteLink(id);  
      }  
    },  
  }),  
  [addTask, addLink, updateTask, updateLink, deleteTask, deleteLink]  
);
~~~

- Колбэк `data.save` обрабатывает все изменения данных из графика Gantt  
- Он направляет разные операции (создание, обновление, удаление) к соответствующим сеттерам атомов Jotai  
- Каждый сеттер атома независимо обновляет свою конкретную часть состояния  
- Массив зависимостей обеспечивает обновление колбэка при изменении сеттеров атомов

Если вам нужна более подробная информация об этом колбэке, смотрите [Handling changes with data.save](integrations/react/state/state-management-basics.md#handlingchangeswithdatasave) в руководстве Basics.

Наконец, отрисуем полный компонент:

~~~tsx
return (  
  <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>  
    <Toolbar onUndo={undo} onRedo={redo} currentZoom={config.zoom.current} onZoom={setZoomLevel} />  
    <ReactGantt ref={ganttRef} tasks={tasks} links={links} config={config} templates={templates} data={data} />  
  </div>  
);  
~~~

- `Toolbar` получает сеттеры атомов для undo/redo и управления зумом  
- Любой из пропсов (`tasks`, `links`, `config`) автоматически обновляется при изменении соответствующего атома

Затем обновим ваш файл `src/App.tsx`, чтобы использовать наш компонент Gantt:

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

## Создание атомов Jotai для управления состоянием

Теперь создадим наше решение по управлению состоянием с помощью Jotai. Создайте `src/store.ts`:  

~~~tsx
import { atom, type Getter, type Setter } from 'jotai';  
import type { Link, GanttConfig, SerializedTask } from '@dhtmlx/trial-react-gantt';  
import { seedTasks, seedLinks, defaultZoomLevels } from './seed/Seed';  
import type { ZoomLevel } from './seed/Seed';

interface GanttState {  
  tasks: SerializedTask[];  
  links: Link[];  
  config: GanttConfig;  
}
~~~

Мы импортируем типы `atom`, `Getter` и `Setter` из Jotai и определяем интерфейсы TypeScript для структуры состояния Gantt.

Давайте определим основные атомы состояния, которые держат наши данные Gantt:

~~~ts
export const ganttStateAtom = atom<GanttState>({  
  tasks: seedTasks,  
  links: seedLinks,  
  config: { zoom: defaultZoomLevels },  
});

const maxHistory = 50;

export const pastAtom = atom<GanttState[]>([]);  
export const futureAtom = atom<GanttState[]>([]);
~~~

- `ganttStateAtom` хранит текущее состояние Gantt, включая задачи, ссылки и конфигурацию  
- `pastAtom` и `futureAtom` управляют стеками истории undo/redo  
- Устанавливаем ограничение на историю, чтобы предотвратить проблемы с памятью

Здесь реализуем функциональность undo/redo с помощью производных атомов Jotai:

~~~ts
const pushHistory = (get: Getter, set: Setter, state: GanttState) => {  
  const past = [...get(pastAtom), state];  
  if (past.length > maxHistory) past.shift();  
  set(pastAtom, past);  
  set(futureAtom, []);  
};

export const undoAtom = atom(null, (get, set) => {  
  const past = get(pastAtom);  
  if (past.length === 0) return;  
  const previous = past[past.length - 1];  
  set(pastAtom, past.slice(0, -1));  
  set(futureAtom, [get(ganttStateAtom), ...get(futureAtom)]);  
  set(ganttStateAtom, previous);  
});

export const redoAtom = atom(null, (get, set) => {  
  const future = get(futureAtom);  
  if (future.length === 0) return;  
  const next = future[0];  
  set(futureAtom, future.slice(1));  
  set(pastAtom, [...get(pastAtom), get(ganttStateAtom)]);  
  set(ganttStateAtom, next);  
});
~~~

- `pushHistory` создает снимок текущего состояния и обновляет стек истории  
- `undoAtom` и `redoAtom` — это записывающие атомы, которые управляют переходами состояния  
- Функции `get` и `set` Jotai дают доступ к значениям других атомов  
- Каждая операция истории поддерживает целостность обоих стеков past и future

Давайте реализуем CRUD-операции для задач с использованием атомов Jotai:

~~~ts
export const addTaskAtom = atom(null, (get, set, task: SerializedTask) => {  
  pushHistory(get, set, get(ganttStateAtom));  
  set(ganttStateAtom, {  
    ...get(ganttStateAtom),  
    tasks: [...get(ganttStateAtom).tasks, { ...task, id: `DB_ID:${task.id}` }],  
  });  
  return { ...task, id: `DB_ID:${task.id}` };  
});

export const updateTaskAtom = atom(null, (get, set, task: SerializedTask) => {  
  pushHistory(get, set, get(ganttStateAtom));  
  set(ganttStateAtom, {  
    ...get(ganttStateAtom),  
    tasks: get(ganttStateAtom).tasks.map((t) => (String(t.id) === String(task.id) ? { ...t, ...task } : t)),  
  });  
});

export const deleteTaskAtom = atom(null, (get, set, id: string | number) => {  
  pushHistory(get, set, get(ganttStateAtom));  
  set(ganttStateAtom, {  
    ...get(ganttStateAtom),  
    tasks: get(ganttStateAtom).tasks.filter((task) => String(task.id) !== String(id)),  
  });  
});
~~~

- Каждый атом следует шаблону `atom(null, (get, set, payload) => { ... })`, создавая писательские атомы  
- `addTaskAtom` создает новые задачи с имитацией идентификаторов из базы данных  
- `updateTaskAtom` обновляет существующие задачи   
- `deleteTaskAtom` удаляет задачи по идентификатору  
- Все операции автоматически добавляют запись в историю перед изменениями  
- Такой же подход применяем и к CRUD-операциям для связей

Реализация настройки уровня зума:

~~~ts
export const setZoomAtom = atom(null, (get, set, level: ZoomLevel) => {  
  pushHistory(get, set, get(ganttStateAtom));  
  set(ganttStateAtom, {  
    ...get(ganttStateAtom),  
    config: { ...get(ganttStateAtom).config, zoom: { ...get(ganttStateAtom).config.zoom, current: level } },  
  });  
});
~~~

`setZoomAtom` обрабатывает смену уровня зума с полной историей.

## Запуск приложения

И, наконец, запустим сервер разработки и протестируем приложение: 

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
- добавили React Gantt и связали его с набором атомов Jotai
- смоделировали задачи, связи и конфигурацию масштаба в едином `ganttStateAtom`
- реализовали undo/redo на основе снимков с помощью `pastAtom`/`futureAtom` и общего помощника `pushHistory`
- управляли конфигурацией масштаба, задачами и связями полностью через состояние Jotai
- использовали обратный вызов `data.save`, чтобы каждое изменение в графике Gantt применялось к писательским атомам Jotai

Это обеспечивает полностью декларативное поведение компонента Gantt, в то время как вся логика мутаций и обработка истории заключены внутри вашего store на Jotai.

## Репозиторий демо на GitHub

Полнофункциональный рабочий проект, следующий этому руководству, доступен на GitHub: https://github.com/dhtmlx/react-gantt-jotai-starter

## Что дальше

Чтобы продолжить:

- Пересмотрите концепции, лежащие в основе этого примера, в [](integrations/react/state/state-management-basics.md) (решение Basics)
- Объедините состояние, управляемое Jotai, с расширенной конфигурацией и шаблонами в обзоре [React Gantt](integrations/react/overview.md)
- Исследуйте тот же образец с другими менеджерами состояний:
  - [Использование React Gantt с Redux Toolkit](integrations/react/state/redux-toolkit.md)
  - [Использование React Gantt с MobX](integrations/react/state/mobx.md)
  - [Использование React Gantt с XState](integrations/react/state/xstate.md)
  - [Использование React Gantt с Zustand](integrations/react/state/zustand.md)
  - [Использование React Gantt с Valtio](integrations/react/state/valtio.md)
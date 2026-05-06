---
title: React Gantt - Руководство по Valtio
sidebar_label: Valtio
description: "Руководство по интеграции React Gantt с прокси-состоянием Valtio. Показывает, как expose reactive snapshots в компонент и применять обновления из save callback в идиоматическом процессе Valtio."
---


# React Gantt - Руководство по Valtio

Это руководство проведет вас через создание приложения на React с TypeScript, интеграцию компонента DHTMLX React Gantt и управление состоянием с помощью Valtio.

## Требования

- Базовые знания React, TypeScript, Vite и Valtio
- Рекомендовано: прочитать [](integrations/react/state/state-management-basics.md), чтобы понять режим привязки данных и колбэк `data.save`, на котором строится данное руководство.

## Быстрая настройка - создание проекта

Перед началом установите [Node.js](https://nodejs.org/en/).

Создайте проект на базе Vite с React + TypeScript:

~~~bash  
npm create vite@latest react-gantt-valtio-demo -- --template react-ts  
cd react-gantt-valtio-demo  
~~~

Теперь установим необходимые зависимости.

* Для **npm**: 

~~~bash
npm install valtio @mui/material @mui/icons-material @emotion/react @emotion/styled
~~~

* Для **yarn**:

~~~bash
yarn add valtio @mui/material @mui/icons-material @emotion/react @emotion/styled
~~~

Затем нужно установить пакет React Gantt. 

### Установка React Gantt

Установите React Gantt, как описано в [руководстве по установке React Gantt](integrations/react/installation.md).

В этом руководстве мы используем evaluaton package:

~~~bash
npm install @dhtmlx/trial-react-gantt
~~~

или

~~~bash
yarn add @dhtmlx/trial-react-gantt
~~~

Если вы уже используете Professional пакет, замените `@dhtmlx/trial-react-gantt` на `@dhx/react-gantt` в командах и импортируемых путях.

Теперь можно запустить dev-сервер:

~~~bash
npm run dev 
~~~

Теперь у вас должно быть запущено ваше приложение на `http://localhost:5173`.

:::note
Чтобы Gantt занимал всё пространство body, нужно удалить дефолтные стили из файла `App.css`, который находится в папке `src`, и добавить следующий стиль:  

~~~css  
#root { 
  margin: 0; 
  padding: 0; 
  height: 100%; 
  width: 100%; 
} 
~~~
:::

## Установка образцов данных и конфигурации

Создайте образцы данных для нашего графика Gantt в `src/seed/Seed.ts`, который будет содержать начальные данные:

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

Этот компонент предоставляет пользователям быстрый доступ к общим элементам управления Gantt, таким как масштабирование между представлениями day, month и year, а также выполнение действий undo/redo.

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

Мы используем компоненты Material UI (Button, ButtonGroup, Divider и иконки) для создания простой и аккуратной панели инструментов с понятной навигацией по Gantt.

Панель принимает следующие необязательные пропсы, которые упрощают подключение к нашему хранилищу Valtio:

- `onUndo` и `onRedo` - функции обратного вызова, которые запускают логику undo/redo в действиях Valtio.
- `onZoom` - колбэк, который обновляет уровень зума при клике на кнопки масштабирования
- `currentZoom` - указывает, какой уровень зума сейчас активен, позволяя панели выделить выбранную кнопку

Кнопки для "Day", "Month" и "Year" вызывают `onZoom('day')`, `onZoom('month')` или `onZoom('year')` соответственно. Выбранная кнопка зума использует `variant="contained"`, а остальные — `outlined`, что обеспечивает явную визуальную подсказку о текущем состоянии.

В полном примере мы передаем `actions.undo`, `actions.redo` и `actions.setZoom` из нашего хранилища Valtio в эти пропсы, чтобы панель могла управлять историей и зумом, не зная деталей реализации хранилища.

## Создание основного компонента Gantt

Давайте построим наш основной компонент, который размещает график Gantt и использует Valtio для управления состоянием. Создайте файл `src/components/GanttComponent.tsx`.

Для управления состоянием используется прокси-основанное реактивное хранилище Valtio, которое обеспечивает автоматическое отслеживание снимков:

~~~tsx
import { useEffect, useMemo } from 'react';  
import ReactGantt, { type ReactGanttProps, type Link, type SerializedTask } from '@dhtmlx/trial-react-gantt';  
import '@dhtmlx/trial-react-gantt/dist/react-gantt.css';  
import { useSnapshot } from 'valtio';  
import { ganttState, actions } from '../store';

import Toolbar from './Toolbar';
~~~

`useSnapshot` подключает наш компонент к прокси-состоянию Valtio и автоматически перерисовывает его при изменении состояния.

Теперь настроим компонент и подключим его к нашему хранилищу Valtio:

~~~tsx
export default function DemoValtio() {  
  const snap = useSnapshot(ganttState);  
  const { tasks, links, config } = snap;  
  const { addTask, updateTask, deleteTask, addLink, updateLink, deleteLink, undo, redo, setZoom } = actions;

  useEffect(() => {  
    document.title = 'DHTMLX React Gantt | Valtio';  
  }, []);
}
~~~

- `useSnapshot` читает реактивное состояние из прокси Valtio
- `actions` содержит все операции, изменяющие состояние (addTask, updateTask, undo, redo и т. д.)
- `useEffect` устанавливает заголовок документа при монтировании

Давайте сконфигурируем шаблоны графика Gantt, которые определяют форматирование и разбор дат для единообразной обработки данных:

:::note
С версии v9.1.3 Gantt автоматически распознает ISO-строки дат, и эти переопределения шаблонов больше не требуются. Они приведены здесь ради совместимости с более ранними версиями Gantt. См. [Загрузка дат в формате ISO](guides/loading.md#loading-dates-in-iso-format).
:::

~~~tsx
const templates: ReactGanttProps['templates'] = useMemo(
  () => ({
    format_date: (date: Date) => date.toISOString(),
    parse_date: (date: string) => new Date(date),
  }),
  []
);
~~~

Самая важная часть — связать изменения данных Gantt с нашим состоянием на базе Valtio:

~~~tsx
const data: ReactGanttProps['data'] = useMemo(  
  () => ({  
    save: (entity, action, payload, id) => {  
      if (entity === 'task') {  
        const task = payload as SerializedTask;  
        if (action === 'create') return addTask(task);  
        else if (action === 'update') updateTask(task);  
        else if (action === 'delete') deleteTask(id);  
      } else if (entity === 'link') {  
        const link = payload as Link;  
        if (action === 'create') return addLink(link);  
        else if (action === 'update') updateLink(link);  
        else if (action === 'delete') deleteLink(id);  
      }  
    },  
  }),  
  [addTask, updateTask, deleteTask, addLink, updateLink, deleteLink]  
);
~~~

- Колбэк `data.save` обрабатывает все изменения данных, вызванные графиком Gantt  
- Каждая операция (создание, обновление, удаление) передается в соответствующее действие Valtio  
- Валтियो обновляет прокси-состояние внутри, и `useSnapshot` обеспечивает автоматическую перерисовку UI

Если нужен более подробный разбор этого колбэка, смотрите раздел [Обработка изменений через data.save](integrations/react/state/state-management-basics.md#handlingchangeswithdatasave) в руководстве Basics.

Наконец, отрисуем полный компонент:

~~~tsx
return (  
  <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>  
    <Toolbar  
      onUndo={undo}  
      onRedo={redo}  
      currentZoom={config.zoom.current}  
      onZoom={setZoom}  
    />  
    <ReactGantt tasks={tasks} links={links} config={config} templates={templates} data={data} />  
  </div>  
);  
~~~

- `Toolbar` получает действия Valtio для undo/redo и управления зумом  
- Свойства `tasks`, `links` и `config` автоматически обновляются при изменении состояния Valtio

Затем обновим `src/App.tsx`, чтобы использовать наш компонент Gantt:

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

## Создание хранилища Valtio для управления состоянием

Теперь создадим решение для управления состоянием с использованием Valtio. Создайте файл `src/store.ts`:

~~~ts
import { proxy } from 'valtio';  
import type { Link, GanttConfig, SerializedTask } from '@dhtmlx/trial-react-gantt';  
import { seedTasks, seedLinks, defaultZoomLevels, type ZoomLevel } from './seed/Seed';

interface Snapshot {  
  tasks: SerializedTask[];  
  links: Link[];  
  config: GanttConfig;  
}
~~~

- Мы импортируем функцию `proxy` из Valtio для создания реактивных объектов состояния  
- Определяем интерфейсы TypeScript для структуры состояния и снимков истории  
- Импортируем примеры данных и конфигураций по умолчанию из seed

Здесь мы определяем основное реактивное состояние с помощью прокси Valtio:  

~~~ts
export const ganttState = proxy<{  
  tasks: SerializedTask[];  
  links: Link[];  
  config: GanttConfig;  
  past: Snapshot[];  
  future: Snapshot[];  
  maxHistory: number;  
}>({  
  tasks: seedTasks,  
  links: seedLinks,  
  config: { zoom: { ...defaultZoomLevels } },  
  past: [],  
  future: [],  
  maxHistory: 50,  
});
~~~

- `ganttState` — реактивный прокси-объект, который автоматически отслеживает изменения состояния  
- Состояние включает задачи, связи, конфигурацию и стеки истории undo/redo  
- Мы устанавливаем ограничение по памяти на историю (maxHistory)  

Реализуем функциональность undo/redo с помощью Valtio:  

~~~ts
const recordHistory = () => {  
  const { tasks, links, config, past, maxHistory } = ganttState;  
  const snapshot = {  
    tasks: JSON.parse(JSON.stringify(tasks)),  
    links: JSON.parse(JSON.stringify(links)),  
    config: JSON.parse(JSON.stringify(config)),  
  };  
  ganttState.past = [...past.slice(-maxHistory + 1), snapshot];  
  ganttState.future = [];  
};

export const actions = {  
  undo() {  
    const { past, future, tasks, links, config } = ganttState;  
    if (past.length === 0) return;  
    const previous = past[past.length - 1];  
    ganttState.tasks = previous.tasks;  
    ganttState.links = previous.links;  
    ganttState.config = previous.config;  
    ganttState.past = past.slice(0, -1);  
    ganttState.future = [{ tasks, links, config }, ...future];  
  },  
  redo() {  
    const { past, future, tasks, links, config } = ganttState;  
    if (future.length === 0) return;  
    const next = future[0];  
    ganttState.tasks = next.tasks;  
    ganttState.links = next.links;  
    ganttState.config = next.config;  
    ganttState.past = [...past, { tasks, links, config }];  
    ganttState.future = future.slice(1);  
  },
}
~~~

- `recordHistory` создает глубокие копии текущего состояния для снимков истории  
- `undo` и `redo` управляют переходами состояний между стеками истории  
- Обновления Valtio автоматически запускают реактивность

Теперь реализуем CRUD-операции для задач и связей:  

~~~ts
addTask(task: SerializedTask) {  
  recordHistory();  
  const newTask = { ...task, id: `DB_ID:${task.id}` };  
  ganttState.tasks = [...ganttState.tasks, newTask];  
  return newTask;  
},

updateTask(task: SerializedTask) {  
  recordHistory();  
  ganttState.tasks = ganttState.tasks.map((t) => (t.id === task.id ? { ...t, ...task } : t));  
},

deleteTask(id: string | number) {  
  recordHistory();  
  ganttState.tasks = ganttState.tasks.filter((t) => String(t.id) !== String(id));  
},

addLink(link: Link) {  
  recordHistory();  
  const newLink = { ...link, id: `DB_ID:${link.id}` };  
  ganttState.links = [...ganttState.links, newLink];  
  return newLink;  
},

updateLink(link: Link) {  
  recordHistory();  
  ganttState.links = ganttState.links.map((l) => (l.id === link.id ? { ...l, ...link } : l));  
},

deleteLink(id: string | number) {  
  recordHistory();  
  ganttState.links = ganttState.links.filter((l) => String(l.id) !== String(id));  
},  
~~~

- Каждая операция вызывает `recordHistory` перед изменениями  
- `addTask, addLink` создают новые задачи и связи с симулированными идентификаторами БД  
- `updateTask/updateLink` и `deleteTask/deleteLink` используют стандартные методы массива для обновления

`setZoom` напрямую изменяет конфигурацию зума с автоматической реактивностью:

~~~ts
setZoom(level: ZoomLevel) {  
  recordHistory();  
  ganttState.config.zoom.current = level;  
},
~~~

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

В этом руководстве вы научились:

- создавать проект на Vite + React
- добавлять React Gantt и подключать его к прокси-хранилищу Valtio
- моделировать задачи, связи и конфигурацию зума в одном прокси `ganttState`
- реализовать undo/redo на основе снимков с помощью `past`/`future` и общего помощника `recordHistory`
- управлять зумом, задачами и связями полностью через состояние Valtio
- использовать колбэк `data.save`, чтобы каждое изменение в графике Gantt проходило через действия Valtio

Это держит компонент Gantt полностью декларативным, в то время как вся логика мутирования и обработка истории инкапсулированы внутри вашего хранилища Valtio.

## Демонстрационный репозиторий на GitHub

Полноценный рабочий проект, следующих этому руководству, доступен на GitHub: https://github.com/dhtmlx/react-gantt-valtio-starter.

## Что дальше

Чтобы продолжить:

- Вернуться к концепциям, лежащим в основе этого примера, в [](integrations/react/state/state-management-basics.md)
- Соединить состояние, управляемое хранилищем, с продвинутой конфигурацией и шаблонами в обзорe [React Gantt](integrations/react/overview.md)
- Исследовать тот же паттерн с использованием других менеджеров состояния:
  - [Использование React Gantt с Redux Toolkit](integrations/react/state/redux-toolkit.md)
  - [Использование React Gantt с MobX](integrations/react/state/mobx.md)
  - [Использование React Gantt с XState](integrations/react/state/xstate.md)
  - [Использование React Gantt с Jotai](integrations/react/state/jotai.md)
  - [Использование React Gantt с Zustand](integrations/react/state/zustand.md)
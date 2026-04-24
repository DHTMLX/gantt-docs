---
title: Использование React Gantt с Zustand
sidebar_label: Zustand
description: "Узнайте, как управлять данными Gantt с помощью легковесного хранилища Zustand, подключать селекторы к компоненту и обрабатывать обновления с использованием коллбэка data.save в предсказуемом, минимальном наборе шаблонного кода."
---


# React Gantt - Zustand Tutorial

Этот туториал проведет вас через создание приложения на React с TypeScript, используя Vite, интеграцию компонента DHTMLX React Gantt и управление состоянием с Zustand.

## Предварительные требования

- Базовые знания React, TypeScript, Vite и Zustand
- Рекомендуется: прочитать [](integrations/react/state/state-management-basics.md), чтобы понять режим привязки данных и коллбек `data.save`, на котором строится этот туториал.

## Быстрая настройка - создание проекта

Перед началом установите [Node.js](https://nodejs.org/en/).

Создайте проект на Vite с React + TypeScript:

~~~bash  
npm create vite@latest react-gantt-zustand-demo -- --template react-ts  
cd react-gantt-zustand-demo  
~~~

Теперь установим необходимые зависимости.

* Для **npm**: 

~~~bash
npm install zustand @mui/material @mui/icons-material @emotion/react @emotion/styled
~~~

* Для **yarn**:

~~~bash
yarn add zustand @mui/material @mui/icons-material @emotion/react @emotion/styled
~~~

Далее нужно установить пакет React Gantt. 

### Установка React Gantt

Установите React Gantt, как описано в [руководстве по установке React Gantt](integrations/react/installation.md).

В этом туториале мы используем оценочный пакет:

~~~bash
npm install @dhtmlx/trial-react-gantt
~~~

или

~~~bash
yarn add @dhtmlx/trial-react-gantt
~~~

Если вы уже используете профессиональный пакет, замените `@dhtmlx/trial-react-gantt` на `@dhx/react-gantt` в командах и импортируемых модулях.

Теперь можно запустить dev-сервер:

~~~bash
npm run dev 
~~~

Теперь ваш проект на React должен работать по адресу `http://localhost:5173`.

:::note
Чтобы Gantt занимал всё доступное пространство тела страницы, нужно удалить стандартные стили из файла `App.css`, расположенного в папке `src`, и добавить следующий стиль:

~~~css  
#root { 
  margin: 0; 
  padding: 0; 
  height: 100%; 
  width: 100%; 
} 
~~~
:::

## Настройка образца данных и конфигурации

Создайте образец данных для нашего графика Gantt в файле `src/seed/Seed.ts`, который будет содержать исходные данные:

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

## Построение компонента панели управления (Toolbar)

Теперь добавим компонент **Toolbar** в `src/components/Toolbar.tsx`.

Этот компонент предоставляет пользователям быстрый доступ к обычным элементам управления Gantt, таким как масштабирование между представлениями *day*, *month* и *year*, а также выполнение действий **undo/redo**.

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

Мы используем компоненты Material UI (Button, ButtonGroup, Divider иконки) для создания простой и чистой панели, которая предоставляет интуитивно понятные элементы управления для графика Gantt.

Панель принимает следующие необязательные свойства (props), которые обеспечивают бесшовную интеграцию с нашим хранилищем Zustand:

- `onUndo` и `onRedo` — функции-коллбеки для действий отмены/возврата  
- `onZoom` — коллбек, который обновляет уровень зума в нашем Zustand-хранилище при клике по кнопкам зума  
- `currentZoom` — указывает, какой уровень зума сейчас активен, что позволяет панели подсветить выбранную кнопку  
- Кнопки "Day", "Month" и "Year" вызывают `onZoom('day')`, `onZoom('month')` или `onZoom('year')` соответственно. Активная кнопка уровня зума помечается `variant="contained"`, а остальные — `outlined`, что даёт явный визуальный сигнал текущего состояния.  

Панель напрямую подключается к действиям хранилища Zustand:

- Элементы управления зумом: при нажатии на "Day" мы вызываем `setZoom('day')` из нашего Zustand-хранилища, что автоматически обновляет конфигурацию Gantt и вызывает повторную отрисовку  
- кнопка Undo запускает метод `undo()` хранилища чтобы вернуться к предыдущим состояниям  
- кнопка Redo вызывает `redo()` чтобы повторно применить изменения  
- Все изменения состояния (правки задач, удаления, настройки зума и т. д.) отслеживаются в нашей собственной истории и могут быть отменены или повторно применены без проблем

## Создание основного компонента Gantt

Начнем с создания нашего основного компонента, который будет размещать график Gantt. Создайте `src/components/GanttComponent.tsx`.

Сначала импортируем `useEffect`, `useMemo` и `useRef` из React, главный компонент `ReactGantt` и типы из пакета Gantt, наш собственный компонент `Toolbar` и хук `useGanttStore` из Zustand-хранилища:

~~~tsx
import { useEffect, useMemo, useRef } from 'react';  
import ReactGantt, { ReactGanttProps, Link, ReactGanttRef, SerializedTask } from '@dhtmlx/trial-react-gantt';  
import '@dhtmlx/trial-react-gantt/dist/react-gantt.css';

import Toolbar from './Toolbar';
import { useGanttStore } from '../store';
~~~

Теперь давайте настроим компонент и подключим его к нашему Zustand-хранилищу:

~~~tsx
export default function DemoZustand() {  
  const ganttRef = useRef<ReactGanttRef>(null);

  const { tasks, links, config, setZoom, addTask, upsertTask, deleteTask, addLink, upsertLink, deleteLink, undo, redo } = useGanttStore();

  useEffect(() => {  
    document.title = 'DHTMLX React Gantt | Zustand';  
  }, []);
~~~

- `ganttRef` обеспечивает прямой доступ к экземпляру Gantt для императивных операций  
- мы извлекаем состояние и действия напрямую из нашего Zustand-хранилища одним распаковкой  
- `useEffect` устанавливает заголовок документа при монтировании компонента

Давайте сконфигурируем шаблоны Gantt, которые определяют форматирование и разбор дат для единообразной обработки данных:

:::note
С версии v9.1.3 Gantt автоматически распознаёт даты в формате ISO, и эти переопределения шаблонов больше не требуются. Они приведены здесь для совместимости с более старыми версиями Gantt. См. [Loading dates in ISO format](guides/loading.md#loading-dates-in-iso-format).
:::

~~~ts
const templates: ReactGanttProps['templates'] = useMemo(
  () => ({
    format_date: (d) => d.toISOString(),
    parse_date: (s) => new Date(s),
  }),
  []
);
~~~

Наиболее критически важная часть — связывание изменений данных Gantt с нашим Zustand-хранилищем:

~~~tsx
const data: ReactGanttProps['data'] = useMemo(  
  () => ({  
    save: (entity, action, item, id) => {  
      if (entity === 'task') {  
        const task = item as SerializedTask;  
        if (action === 'create') return addTask(task);  
        else if (action === 'update') upsertTask(task);  
        else if (action === 'delete') deleteTask(id);  
      } else if (entity === 'link') {  
        const link = item as Link;  
        if (action === 'create') return addLink(link);  
        else if (action === 'update') upsertLink(link);  
        else if (action === 'delete') deleteLink(id);  
      }  
    },  
  }),  
  [addTask, addLink, upsertTask, upsertLink, deleteTask, deleteLink]  
);
~~~

- Вызов `data.save` обрабатывает все модификации данных из графика Gantt  
- Он направляет разные операции (create, update, delete) к соответствующим действиям хранилища  
- Массив зависимостей обеспечивает обновление коллбэка при изменении действий хранилища

Если вам нужна более подробная объяснение этого коллбэка, см. [Handling changes with data.save](integrations/react/state/state-management-basics.md#handlingchangeswithdatasave) в разделе Basics (Основы).

Наконец, отрисуем полный компонент:

~~~tsx
return (  
  <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>  
    <Toolbar onUndo={undo} onRedo={redo} currentZoom={config.zoom.current} onZoom={setZoom} />  
    <ReactGantt ref={ganttRef} tasks={tasks} links={links} config={config} templates={templates} data={data} />  
  </div>  
);  
~~~

- `Toolbar` получает обработчики для undo/redo и управления зумом  
- Компонент `ReactGantt` принимает все данные, конфигурацию и коллбэки

Затем обновите ваш `src/App.tsx`, чтобы использовать наш компонент Gantt:

~~~tsx
import './App.css';  
import GanttComponent from './components/GanttComponent';

function App() {  
  return (  
    <div style={{ height: '100vh', width: '95vw' }}>  
      <GanttComponent />  
    </div>  
  );  
}

export default App;
~~~

## Настройка Zustand-хранилища

Теперь создадим решение для управления состоянием с использованием Zustand. Создайте `src/store.ts`:

~~~ts
import { create } from 'zustand';  
import type { Link, GanttConfig, SerializedTask } from '@dhtmlx/trial-react-gantt';  
import { seedTasks, seedLinks, defaultZoomLevels, type ZoomLevel } from './seed/Seed';

type Snapshot = { tasks: SerializedTask[]; links: Link[]; config: GanttConfig };  
type State = {  
  tasks: SerializedTask[];  
  links: Link[];  
  config: GanttConfig;  
  past: Snapshot[];  
  future: Snapshot[];  
  maxHistory: number;  
  recordHistory: () => void;  
  undo: () => void;  
  redo: () => void;

  setZoom: (level: ZoomLevel) => void;  
  addTask: (task: SerializedTask) => SerializedTask;  
  upsertTask: (task: SerializedTask) => void;  
  deleteTask: (id: string | number) => void;  
  addLink: (l: Link) => Link;  
  upsertLink: (l: Link) => void;  
  deleteLink: (id: string | number) => void;  
};
~~~

Здесь мы объявляем:

- **tasks**, **links** и **config** — основные данные Gantt, управляемые хранилищем.  
- **past** и **future** — массивы для истории undo/redo.  
- **recordHistory()** — вспомогательная функция для создания снимков перед каждым изменением.  
- **setZoom**, **addTask**, **upsertTask**, **deleteTask** и т. д. — операции изменения состояния для задач и связей.

Теперь реализуем действия хранилища, которые будут обрабатывать обновления состояния:

~~~ts
export const useGanttStore = create<State>((set, get) => ({  
  tasks: seedTasks,  
  links: seedLinks,  
  config: { zoom: defaultZoomLevels },

  past: [],  
  future: [],  
  maxHistory: 50,

  recordHistory: () => {  
    const { tasks, links, config, past, maxHistory } = get();  
    const snapshot = {  
      tasks: JSON.parse(JSON.stringify(tasks)),  
      links: JSON.parse(JSON.stringify(links)),  
      config: JSON.parse(JSON.stringify(config)),  
    };  
    set({  
      past: [...past.slice(-maxHistory + 1), snapshot],  
      future: [],  
    });  
  },

  undo: () => {  
    const { past, future, tasks, links, config } = get();  
    if (past.length === 0) return;  
    const previous = past[past.length - 1];  
    set({  
      tasks: previous.tasks,  
      links: previous.links,  
      past: past.slice(0, -1),  
      future: [{ tasks, links, config }, ...future],  
      config: previous.config,  
    });  
  },

  redo: () => {  
    const { past, future, tasks, links, config } = get();  
    if (future.length === 0) return;  
    const next = future[0];  
    set({  
      tasks: next.tasks,  
      links: next.links,  
      past: [...past, { tasks, links, config }],  
      config: next.config,  
      future: future.slice(1),  
    });  
  },

  setZoom: (level) => {  
    get().recordHistory();  
    set({  
      config: { ...get().config, zoom: { ...get().config.zoom, current: level } },  
    });  
  },

  addTask: (task) => {  
    get().recordHistory();  
    const newTask = { ...task, id: `DB_ID:${task.id}` };  
    set({ tasks: [...get().tasks, newTask] });  
    return newTask;  
  },

  upsertTask: (task) => {  
    get().recordHistory();  
    const tasks = get().tasks;  
    const index = tasks.findIndex((x) => String(x.id) === String(task.id));  
    if (index !== -1) {  
      set({  
        tasks: [...tasks.slice(0, index), { ...tasks[index], ...task }, ...tasks.slice(index + 1)],  
      });  
    }  
  },

  deleteTask: (id) => {  
    get().recordHistory();  
    set({ tasks: get().tasks.filter((t) => String(t.id) !== String(id)) });  
  },

  addLink: (l) => {  
    get().recordHistory();  
    const newLink = { ...l, id: `DB_ID:${l.id}` };  
    set({ links: [...get().links, newLink] });  
    return newLink;  
  },

  upsertLink: (l) => {  
    get().recordHistory();  
    const links = get().links;  
    const index = links.findIndex((x) => String(x.id) === String(l.id));  
    if (index !== -1) {  
      set({  
        links: [...links.slice(0, index), { ...links[index], ...l }, ...links.slice(index + 1)],  
      });  
    }  
  },

  deleteLink: (id) => {  
    get().recordHistory();  
    set({ links: get().links.filter((l) => String(l.id) !== String(id)) });  
  },  
}));
~~~

- `set` напрямую обновляет состояние  
- `get` позволяет получить текущее состояние  
- `setZoom` обновляет уровень зума в конфигурации Gantt  
- `addTask` создает новые задачи с имитацией идентификаторов базы данных  
- `upsertTask` обрабатывает обновления существующей задачи по ID  
- `deleteTask` удаляет задачи по ID   
- Аналогичные подходы применяются к операциям со связями (links)

### Управление историей (Undo/Redo)

Чтобы включить функциональность undo и redo, мы определяем **recordHistory**, **undo** и **redo**:

* **recordHistory()** создаёт глубокую копию ("снимок") текущего состояния Gantt перед любым изменением.  
* **undo()** откатывается до самого недавнего снимка в `past`, сохраняя текущее состояние в `future`.  
* **redo()** повторно применяет следующий доступный снимок из `future` обратно в хранилище.

Эти методы позволяют пользователю перемещаться назад и вперёд по недавним изменениям состояния Gantt.

Каждое изменяющее состояние действие вызывает `recordHistory()` **перед** выполнением изменений, чтобы каждое переходование состояния было сохранено и обратимо.

## Запуск приложения

Наконец, можно запустить dev-сервер и протестировать приложение: 

~~~bash
npm run dev
~~~

или:
~~~
yarn dev 
~~~ 

## Итоги

В этом руководстве вы:

- создали проект Vite + React
- добавили React Gantt и связали его с хранилищем Zustand
- реализовали undo/redo на основе снимков в хранилище с использованием массивов `past`/`future`
- полностью управляете конфигурацией зума, задачами и связями через состояние Zustand
- используете коллбек `data.save`, чтобы каждое изменение в графике Gantt превращалось в действие хранилища

Это делает компонент Gantt полностью декларативным, в то время как все мутации и обработка истории инкапсулированы внутри Zustand-хранилища.

## Демонстрационное репо на GitHub

Полноценный рабочий проект, следующий этому руководству, доступен на GitHub: https://github.com/dhtmlx/react-gantt-zustand-starter

## Что дальше

Чтобы продолжить:

- Взять на заметку концепции, лежащие в основе этого примера, в [](integrations/react/state/state-management-basics.md)
- Соединить управление состоянием через хранилище с продвинутой конфигурацией и шаблонами в обзоре React Gantt: Lösungen/Overview (React Gantt overview)
- Исследовать тот же паттерн с другими менеджерами состояния:
  - Испльзование React Gantt с Redux Toolkit (integrations/react/state/redux-toolkit.md)
  - Использование React Gantt с MobX (integrations/react/state/mobx.md)
  - Использование React Gantt с XState (integrations/react/state/xstate.md)
  - Использование React Gantt с Jotai (integrations/react/state/jotai.md)
  - Использование React Gantt с Valtio (integrations/react/state/valtio.md)
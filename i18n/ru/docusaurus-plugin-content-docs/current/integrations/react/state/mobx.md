---
title: Использование React Gantt с MobX
sidebar_label: MobX
description: "Интеграция React Gantt с наблюдаемым состоянием MobX. Охватывает настройку наблюдаемых моделей, реагирование на обновления Gantt и синхронизацию диаграммы через обработчик сохранения."
---


# React Gantt и MobX: руководство

Этот руководитель проведет вас через создание приложения на React с TypeScript с использованием Vite, интеграцию компонента DHTMLX React Gantt и управление состоянием с MobX.

## Необходимые знания

- Базовые знания React, TypeScript, Vite и MobX
- Рекомендуется: прочитать [](integrations/react/state/state-management-basics.md), чтобы понять режим привязки данных и колбэк `data.save`, на котором строится данное руководство.

## Быстрая настройка - создание проекта

Прежде чем начать, установите [Node.js](https://nodejs.org/en/).

Создайте проект на Vite с React + TypeScript:

~~~bash
npm create vite@latest react-gantt-mobx-demo -- --template react-ts  
cd react-gantt-mobx-demo  
~~~

Теперь установим необходимые зависимости.

* Для **npm**: 

~~~bash
npm install mobx mobx-react-lite @mui/material @mui/icons-material @emotion/react @emotion/styled
~~~

* Для **yarn**:

~~~bash
yarn add mobx mobx-react-lite @mui/material @mui/icons-material @emotion/react @emotion/styled
~~~

Мы используем `mobx-react-lite` вместо полного пакета `mobx-react`, потому что наше приложение использует функциональные компоненты. Легковесная версия специально оптимизирована для функциональных компонентов и хуков, обеспечивает меньший размер сборки при сохранении всех необходимых интеграционных возможностей MobX-React, которые нам нужны.

Далее нужно установить пакет React Gantt. 

### Установка React Gantt

Установите React Gantt, как описано в [гайд по установке React Gantt](integrations/react/installation.md).

В этом руководстве мы используем пакет для оценки:

~~~bash
npm install @dhtmlx/trial-react-gantt
~~~

или

~~~bash
yarn add @dhtmlx/trial-react-gantt
~~~

Если вы уже используете Professional пакет, замените `@dhtmlx/trial-react-gantt` на `@dhx/react-gantt` в командах и импортируемых элементах.

Теперь можно запустить dev-сервер:

~~~bash
npm run dev 
~~~

Теперь ваш проект на React должен работать по адресу `http://localhost:5173`.

:::note
Чтобы Gantt занимал всё пространство тела страницы, нужно удалить стандартные стили из файла `App.css`, размещенного в папке `src`, и добавить следующий стиль:

~~~css  
#root { 
  margin: 0; 
  padding: 0; 
  height: 100%; 
  width: 100%; 
} 
~~~
:::

## Установка примерных данных и конфигурации

Создайте примеры данных для нашего графика Gantt в `src/seed/Seed.ts`, который будет содержать начальные данные:

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

## Создание компонента панели инструментов

Теперь добавим компонент **Toolbar** в `src/components/Toolbar.tsx`.

Этот компонент дает пользователям быстрый доступ к обычным контролям Gantt, таким как переключение между режимами *day*, *month* и *year*, а также выполнение действий **undo/redo**.

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

Мы используем компоненты Material UI (Button, ButtonGroup, Divider и иконки), чтобы создать простой, аккуратный макет панели инструментов с понятными контролями для диаграммы Gantt.

Панель инструментов принимает следующие необязательные свойства (props), обеспечивающие бесшовную интеграцию с нашим MobX-хранилищем:

- `onUndo` и `onRedo` — колбэк-функции для действий отмены/повтора.  
- `onZoom` — колбэк, который обновляет уровень масштабирования в нашем хранилище при клике по кнопкам зума  
- `currentZoom` — указывает, какой уровень зума сейчас активен, позволяя панели инструм. выделить выбранную кнопку

Кнопки "Day", "Month" и "Year" вызывают соответственно `onZoom('day')`, `onZoom('month')` или `onZoom('year')`. Ваша выбранная кнопка зума получает стиль `variant="contained"`, остальные — `outlined`, что дает четкое визуальное указание текущего состояния.

Панель инструментов напрямую связывается с действиями хранилища MobX:

- Контроль зума: при клике на "Day" вызывается `setZoom('day')` из нашего MobX-хранилища, что автоматически обновляет конфигурацию Gantt и вызывает повторный рендер  
- кнопка Undo вызывает метод хранилища `undo()` для возврата к предыдущим состояниям  
- кнопка Redo вызывает `redo()` для повторного применения изменений  
- Все изменения состояния (редактирование задач, удаления, настройки зума и т. д.) отслеживаются нашей собственной системой истории и могут быть reversible/повторены без проблем

## Создание основного компонента Gantt

Начнем с построения основного компонента, который будет размещать диаграмму Gantt. Создайте `src/components/GanttComponent.tsx`.

Сначала импортируем `useEffect`, `useMemo` из React, главный компонент `ReactGantt` и типы из пакета Gantt, наш пользовательский компонент `Toolbar` и экземпляр класса MobX-хранилища, который мы скоро создадим:

~~~tsx
import React, { useEffect, useMemo } from 'react';
import { observer } from 'mobx-react-lite';
import ReactGantt, { type ReactGanttProps, type SerializedTask, type Link } from '@dhtmlx/trial-react-gantt';
import '@dhtmlx/trial-react-gantt/dist/react-gantt.css';

import Toolbar from './Toolbar';
import { store } from '../store';
~~~

Теперь настроим компонент и подключим его к нашему MobX-хранилищу:

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

Мы оборачиваем наш компонент в `observer()` из `mobx-react-lite`, чтобы автоматически отслеживать изменения наблюдаемого состояния. Это обеспечивает повторный рендер компонента всякий раз, когда изменяются соответствующие свойства хранилища (задачи, связи, конфигурация). 

- Мы извлекаем состояние и действия напрямую из нашего MobX-хранилища в одном деструктурировании  
- `useEffect` устанавливает заголовок документа при монтировании компонента

Давайте сконфигурируем шаблоны диаграммы Gantt, которые определяют форматирование и разбор дат для единообразного обращения с данными:

:::note
Начиная с версии v9.1.3 Gantt автоматически распознает строки ISO-дат и эти переопределения шаблонов больше не требуются. Они приведены здесь для совместимости со старыми версиями Gantt. См. [Загрузка дат в ISO-формате](guides/loading.md#loading-dates-in-iso-format).
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

Самое важное — соединение изменений данных Gantt с нашим MobX-хранилищем:

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

- Колбэк `data.save` обрабатывает все модификации данных из диаграммы Gantt  
- Он направляет различные операции (create, update, delete) к соответствующим действиям хранилища  
- Массив зависимостей обеспечивает обновление колбэка, когда меняются действия хранилища

Если нужен более детальный разбор этого колбэка, смотрите [Обработка изменений с помощью data.save](integrations/react/state/state-management-basics.md#handlingchangeswithdatasave) в Руководстве по Основам.

Наконец, отобразим полный компонент:

~~~tsx
return (
  <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>  
    <Toolbar onUndo={undo} onRedo={redo} currentZoom={config.zoom.current} onZoom={setZoom} />  
    <ReactGantt tasks={tasks} links={links} config={config} templates={templates} data={data} />  
  </div>  
);  

export default DemoMobXBasic;
~~~

- `Toolbar` принимает обработчики для undo/redo и управления зумом  
- Компонент `ReactGantt` получает все данные, конфигурацию и колбэки

Далее обновим ваш файл `src/App.tsx`, чтобы использовать наш компонент Gantt:

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


## Настройка MobX-хранилища

Теперь создадим наше решение для управления состоянием с использованием MobX. Создайте `src/store.ts`:

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

- Мы определяем класс `GanttStore`, который инкапсулирует всё состояние и логику, связанную с Gantt  
- Хранилище управляет `tasks`, `links` и `config` — основными структурами данных Gantt  
- `past` и `future` массивы реализуют историю undo/redo  
- `makeAutoObservable` автоматически помечает поля как наблюдаемые, геттеры — как вычисляемые значения, и методы — как действия  
- Опция `autoBind: true` гарантирует, что методы сохраняют правильный контекст `this`

Далее реализуем методы хранилища, которые обрабатывают обновления состояния и управление историей:

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

- `_snapshot()` создаёт глубокие копии текущего состояния для отслеживания истории  
- `_saveToHistory()` сохраняет текущее состояние перед изменениями и очищает стек повторов  
- `undo()` восстанавливает последнее состояние из `past` и перемещает текущее состояние в `future`  
- `redo()` повторно применяет следующее состояние из `future` и сохраняет текущее состояние в `past`

Теперь реализуем действия Gantt, связанные с изменениями состояния:

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

- `setZoom` обновляет уровень зума в конфигурации, сохраняя историю  
- `addTask` создаёт новые задачи с имитацией идентификаторов базы данных и отслеживает операцию  
- `upsertTask` обновляет существующую задачу по ID, сохраняя историю  
- `deleteTask` удаляет задачи по ID с отслеживанием истории  
- Аналогичные паттерны применяются к операциям со связями (`addLink`, `upsertLink`, `deleteLink`)

Каждое изменяющее действие вызывает `this._saveToHistory()` **до** выполнения изменений, чтобы каждое переход состояния было сохранено и могло быть отменено.

## Запуск приложения

Наконец, можно запустить dev-сервер и протестировать приложение: 

~~~bash
npm run dev
~~~

или:
~~~bash
yarn dev 
~~~  


## Резюме

В этом руководстве вы:

- создали проект на Vite + React
- добавили React Gantt и соединили его с MobX-хранилищем
- реализовали откат/повтор в стиле снимков состояния в `GanttStore` с использованием массивов `past`/`future`
- управляли конфигурацией зума, задачами и связями полностью через наблюдаемое состояние MobX
- использовали колбэк `data.save`, чтобы каждое изменение в диаграмме Gantt превращалось в действие хранилища.

Это обеспечивает полностью декларативный компонент Gantt, в то время как вся логика мутирования и обработка истории инкапсулированы внутри состояния MobX.

## Демонстрационный репозиторий на GitHub

Полностью рабочий проект, следующее данному руководству, доступен на GitHub: https://github.com/dhtmlx/react-gantt-mobx-starter.

## Что дальше

Чтобы продолжить:

- Вернитесь к концепциям, лежащим в основе этого примера, в [](integrations/react/state/state-management-basics.md)
- Совместите состояние, управляемое хранилищем, с продвинутой конфигурацией и шаблонами в обзоре [React Gantt](integrations/react/overview.md)
- Исследуйте ту же схему с другими менеджерами состояния:
  - [Использование React Gantt с Redux Toolkit](integrations/react/state/redux-toolkit.md)
  - [Использование React Gantt с Zustand](integrations/react/state/zustand.md)
  - [Использование React Gantt с XState](integrations/react/state/xstate.md)
  - [Использование React Gantt с Jotai](integrations/react/state/jotai.md)
  - [Использование React Gantt с Valtio](integrations/react/state/valtio.md)
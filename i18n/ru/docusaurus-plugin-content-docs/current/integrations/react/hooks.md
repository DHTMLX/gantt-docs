--- 
title: "Хуки React Gantt" 
sidebar_label: "Хуки" 
description: "Встроенные хуки React для DHTMLX Gantt — подписки на события, назначения ресурсов, отмена/повтор, масштабирование, выбор, хранилища данных и расчёты рабочего времени." 
---

# Хуки React Gantt

Обёртка `@dhx/react-gantt` предоставляет набор хуков React, которые соединяют ваши компоненты с внутренними API Gantt, не требуя прямого доступа к экземпляру Gantt. Эти хуки автоматически управляют жизненным циклом — подписки создаются при монтировании и удаляются при размонтировании.

Все хуки принимают параметр `ganttRef` — ссылку React на компонент `ReactGantt`:

~~~tsx
import { useRef } from 'react';
import ReactGantt, { ReactGanttRef } from '@dhx/react-gantt';
 
function MyGanttApp() {
  const ganttRef = useRef<ReactGanttRef>(null);
 
  // pass ganttRef to any hook
  return <ReactGantt ref={ganttRef} tasks={tasks} links={links} />;
}
~~~

## useGanttEvent

Подписка на событие Gantt с автоматическим управлением жизненным циклом. Обработчик подключается при монтировании и отключается при размонтировании.

~~~ts
import { useGanttEvent } from '@dhx/react-gantt';
~~~

**Подпись:**
~~~ts
useGanttEvent(ganttRef, eventName, handler, options?)
~~~

**Параметры:**

- `ganttRef` - ссылка на компонент `ReactGantt`
- `eventName` - имя события Gantt (например, `'onAfterTaskUpdate'`, `'onStoreUpdated'`)
- `handler` - функция обратного вызова
- `options.target` - *(необязательно)* функция доступа, которая разрешает источник события из экземпляра Gantt. Если опция не указана, события привязываются к самому экземпляру Gantt.

Работает с любым объектом, который реализует `attachEvent`/`detachEvent` — экземпляром Gantt, расширениями, хранилищами данных и модулями UI:

~~~tsx
import { useGanttEvent } from '@dhx/react-gantt';
 
function MyComponent({ ganttRef }) {
  // События экземпляра Gantt (целевой объект по умолчанию)
  useGanttEvent(ganttRef, 'onAfterTaskUpdate', (id, task) => {
    console.log('Task updated:', id);
  });
 
  // События расширения - передайте целевой accessor
  useGanttEvent(ganttRef, 'onAfterZoom', (level) => {
    console.log('Zoomed to level:', level);
  }, { target: (gantt) => gantt.ext.zoom });
 
  // События datastore
  useGanttEvent(ganttRef, 'onStoreUpdated', () => {
    console.log('Resource store changed');
  }, { target: (gantt) => gantt.getDatastore('resource') });
 
  return null;
}
~~~

Если событие или целевой объект недоступны (например, плагин не включён), хук ничего не делает.

## useResourceAssignments

Доступ к методам назначения ресурсов и управления ресурсами Gantt.

~~~ts
import { useResourceAssignments } from '@dhx/react-gantt';
~~~

**Возвращает:**

- `getResourceAssignments(resourceId, taskId?)` - мост к [](api/method/getresourceassignments.md). Возвращает назначения для ресурса, при желании фильтруется по задаче.
- `getTaskResources(taskId)` - мост к [](api/method/gettaskresources.md). Возвращает уникальные ресурсы, назначенные на задачу.
- `getTaskAssignments(taskId)` - мост к [](api/method/gettaskassignments.md). Возвращает все назначения для задачи.
- `getAllResources()` - возвращает все элементы из хранилища данных ресурсов.
- `setTaskAssignments(taskId, assignments)` - заменяет все назначения для задачи. Каждое назначение должно содержать `resource_id` и при желании `value`.

~~~tsx
import { useResourceAssignments } from '@dhx/react-gantt';
 
function ResourcePanel({ ganttRef, taskId }) {
  const { getTaskAssignments, getAllResources, setTaskAssignments } = 
    useResourceAssignments(ganttRef);
 
  const assignments = getTaskAssignments(taskId);
  const resources = getAllResources();
 
  function reassign() {
    setTaskAssignments(taskId, [
      { resource_id: 1, value: 8 },
      { resource_id: 3, value: 4 }
    ]);
  }
 
  return (
    <div>
      <p>Assigned: {assignments.map(a => a.resource_id).join(', ')}</p>
      <p>Available: {resources.map(r => r.text).join(', ')}</p>
      <button onClick={reassign}>Reassign</button>
    </div>
  );
}
~~~

## useGanttDatastore

Только для чтения доступ к любому хранилищу данных Gantt — задачи, связи, ресурсы, назначения, базовые линии или пользовательские хранилища.

~~~ts
import { useGanttDatastore } from '@dhx/react-gantt';
~~~

**Подпись:**
~~~ts
const store = useGanttDatastore<T>(ganttRef, storeName)
~~~

**Возвращает:**

- `getItem(id)` - возвращает элемент по ID
- `getItems()` - возвращает все элементы
- `hasChild(id)` - проверяет, есть ли у элемента дети (дерево хран.) 
- `getChildren(id)` - возвращает дочерние ID (дерево хран.)
- `eachItem(callback)` - перебирает все элементы хранилища
- `find(filter)` - возвращает элементы, удовлетворяющие предикату
- `count()` - возвращает общее количество элементов
- `exists(id)` - проверяет, существует ли элемент

~~~tsx
import { useGanttDatastore, ResourceItem } from '@dhx/react-gantt';
 
function ResourceList({ ganttRef }) {
  const store = useGanttDatastore<ResourceItem>(ganttRef, 'resource');
 
  // Найдите все листья (без групп) ресурсов
  const individuals = store.find(r => !store.hasChild(r.id));
 
  // Итерация по всем ресурсам
  store.eachItem(resource => {
    console.log(resource.text, store.hasChild(resource.id) ? '(group)' : '');
  });
 
  return (
    <ul>
      {individuals.map(r => <li key={r.id}>{r.text}</li>)}
    </ul>
  );
}
~~~

## useUndoRedo

Отслеживание состояния стека отмены/возврата и предоставление действий. Автоматически подписывается на события изменения задач и связей, чтобы состояние оставалось актуальным.

~~~ts
import { useUndoRedo } from '@dhx/react-gantt';
~~~

**Возвращает:**

- `canUndo` — `boolean`, true, когда стек отмены не пустой
- `canRedo` — `boolean`, true, когда стек повторов не пустой
- `undo()` - выполняет операцию отмены
- `redo()` - выполняет операцию повторения

Возвращает состояние отключено (`canUndo: false, canRedo: false`), если плагин undo не включён.

~~~tsx
import { useUndoRedo } from '@dhx/react-gantt';
 
function UndoRedoButtons({ ganttRef }) {
  const { canUndo, canRedo, undo, redo } = useUndoRedo(ganttRef);
 
  return (
    <div>
      <button onClick={undo} disabled={!canUndo}>Undo</button>
      <button onClick={redo} disabled={!canRedo}>Redo</button>
    </div>
  );
}
~~~

:::note
Плагин undo должен быть включён в свойстве `plugins` для работы этого хука:
~~~tsx
<ReactGantt plugins={{ undo: true }} ... />
~~~
:::

## useZoom

Управление уровнями масштабирования временной шкалы и отслеживание текущего состояния зума. Автоматически инициализирует расширение масштабирования.

~~~ts
import { useZoom } from '@dhx/react-gantt';
~~~

**Подпись:**
~~~ts
const zoom = useZoom(ganttRef, levels?)
~~~

**Параметры:**

- `ganttRef` - ссылка на компонент `ReactGantt`
- `levels` - *(необязательно)* массив конфигураций уровней масштабирования. По умолчанию заданы 5 встроенных уровней: Day, Week, Month, Quarter, Year.

**Возвращает:**

- `currentLevel` - имя активного уровня масштабирования
- `levels` - конфигурации уровней масштабирования
- `zoomIn()` - увеличить масштаб до более детального уровня
- `zoomOut()` - уменьшить масштаб до менее детального уровня
- `setLevel(name)` - перейти к конкретному уровню масштабирования по имени

~~~tsx
import { useZoom } from '@dhx/react-gantt';
 
function ZoomControls({ ganttRef }) {
  const { currentLevel, levels, zoomIn, zoomOut, setLevel } = useZoom(ganttRef);
 
  return (
    <div>
      <button onClick={zoomOut}>-</button>
      <select value={currentLevel} onChange={e => setLevel(e.target.value)}>
        {levels.map(l => (
          <option key={l.name} value={l.name}>{l.label || l.name}</option>
        ))}
      </select>
      <button onClick={zoomIn}>+</button>
    </div>
  );
}
~~~

Вы можете задать собственные уровни масштабирования:

~~~tsx
const customLevels = [
  {
    name: 'sprint',
    label: 'Sprint (2 weeks)',
    scale_height: 60,
    min_column_width: 70,
    scales: [
      { unit: 'month', step: 1, format: '%F %Y' },
      { unit: 'week', step: 2, format: 'Sprint %W' },
    ],
  },
  // ...additional levels
];
 
const zoom = useZoom(ganttRef, customLevels);
~~~

## useSelection

Отслеживание того, какая задача в данный момент выбрана на диаграмме Gantt.

~~~ts
import { useSelection } from '@dhx/react-gantt';
~~~

**Возвращает:**

- `selectedId` - ID текущей выбранной задачи, или `null`, если ничего не выбрано

~~~tsx
import { useSelection } from '@dhx/react-gantt';
 
function TaskDetails({ ganttRef }) {
  const { selectedId } = useSelection(ganttRef);
 
  if (!selectedId) return <p>Выберите задачу, чтобы увидеть детали.</p>;
 
  return <p>Выбранная задача: {selectedId}</p>;
}
~~~

## useWorkTime

Мост к встроенным функциям расчета рабочего времени в Gantt. Используйте это для подсветки нерабочего времени и для арифметики дат, учитывающей рабочие календари.

~~~ts
import { useWorkTime } from '@dhx/react-gantt';
~~~

**Возвращает:**

- `isWorkTime({ date, unit?, task? })` - мост к [](api/method/isworktime.md)
- `calculateEndDate({ start, duration, unit?, task? })` - мост к [](api/method/calculateenddate.md)
- `calculateDuration({ start, end, task? })` - мост к [](api/method/calculateduration.md)
- `getClosestWorkTime({ date, unit, task?, dir? })` - мост к [](api/method/getclosestworktime.md)

~~~tsx
import ReactGantt, { GanttTemplates, ReactGanttRef, useWorkTime } from '@dhx/react-gantt';
 
function GanttWithWeekends() {
  const ganttRef = useRef<ReactGanttRef>(null);
  const { isWorkTime } = useWorkTime(ganttRef);
 
  const templates: GanttTemplates = {
    timeline_cell_class: (task, date) => {
      return isWorkTime({ date, task }) ? '' : 'weekend';
    }
  };
 
  return <ReactGantt ref={ganttRef} templates={templates} tasks={tasks} />;
}
~~~

## Composing hooks

Собирайте доменно-ориентированные хуки путем композиции встроенных хуков. Например, хук-гистограмма ресурсов:

~~~ts
import { useMemo, useCallback } from 'react';
import { useGanttDatastore, useResourceAssignments, useWorkTime } from '@dhx/react-gantt';
 
export function useResourceHistogram(ganttRef) {
  const resourceStore = useGanttDatastore(ganttRef, 'resource');
  const { getResourceAssignments } = useResourceAssignments(ganttRef);
  const { isWorkTime } = useWorkTime(ganttRef);
 
  const isGroupResource = useCallback((resource) => {
    return resourceStore.hasChild(resource.id);
  }, [resourceStore]);
 
  const getAllocatedValue = useCallback((tasks, resource) => {
    return tasks.reduce((sum, task) => {
      const assignments = getResourceAssignments(resource.id, task.id);
      return sum + assignments.reduce((acc, a) => acc + Number(a.value), 0);
    }, 0);
  }, [getResourceAssignments]);
 
  const getCapacity = useCallback((date, resource) => {
    if (isGroupResource(resource)) return -1;
    return isWorkTime({ date }) ? 8 : 0;
  }, [isGroupResource, isWorkTime]);
 
  return { getAllocatedValue, getCapacity, isGroupResource };
}
~~~

## Прямой доступ к экземпляру Gantt

Хотя хуки закрывают большую часть задач, вы всё ещё можете получить доступ ко всему экземпляру Gantt напрямую через ref:

~~~tsx
import { useRef, useEffect } from 'react';
import ReactGantt, { ReactGanttRef } from '@dhx/react-gantt';
 
function DirectRefExample({ tasks, links }) {
  const ganttRef = useRef<ReactGanttRef>(null);
 
  useEffect(() => {
    const gantt = ganttRef.current?.instance;
    if (!gantt) return;
    gantt.showDate(new Date());
  }, []);
 
  return <ReactGantt ref={ganttRef} tasks={tasks} links={links} />;
}
~~~

:::note
Если вы изменяете задачи или связи через прямой экземпляр Gantt, одновременно передавая их как пропсы React, держите их синхронизированными. В противном случае следующий повторный рендер React может перезаписать ваши ручные изменения.
:::
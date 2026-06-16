---
title: "React Gantt 钩子函数"
sidebar_label: "钩子"
description: "内置的 React 钩子，用于 DHTMLX Gantt：事件订阅、资源分配、撤销/重做、缩放、选中、数据存储以及工作时间计算。"
---

# React Gantt 钩子函数

`@dhx/react-gantt` 包装器提供了一组 React 钩子，用来将你的组件与 Gantt 的内部 API 连接，而无需直接访问 Gantt 实例。这些钩子会自动处理生命周期管理——订阅在挂载时创建，卸载时清理。

所有钩子都接收一个 `ganttRef` 参数 —— 指向 `ReactGantt` 组件的 React ref：

~~~tsx
import { useRef } from 'react';
import ReactGantt, { ReactGanttRef } from '@dhx/react-gantt';

function MyGanttApp() {
  const ganttRef = useRef<ReactGanttRef>(null);

  // 将 ganttRef 传递给任意一个 Hook
  return <ReactGantt ref={ganttRef} tasks={tasks} links={links} />;
}
~~~  

## useGanttEvent

订阅 Gantt 事件，并自动处理生命周期管理。挂载时附加处理函数，卸载时分离。

~~~ts
import { useGanttEvent } from '@dhx/react-gantt';
~~~

**签名（Signature）：**
~~~ts
useGanttEvent(ganttRef, eventName, handler, options?)
~~~

**参数（Parameters）：**

- `ganttRef` - 指向 ReactGantt 组件的引用
- `eventName` - Gantt 事件名称（例如 `'onAfterTaskUpdate'`, `'onStoreUpdated'`）
- `handler` - 回调函数
- `options.target` - *(可选)* 解析事件源的访问函数。若省略，事件将绑定到 Gantt 实例本身。

它适用于任何实现了 `attachEvent`/`detachEvent` 的对象——Gantt 实例、扩展、数据存储以及 UI 模块：

~~~tsx
import { useGanttEvent } from '@dhx/react-gantt';

function MyComponent({ ganttRef }) {
  // Gantt 实例事件（默认目标）
  useGanttEvent(ganttRef, 'onAfterTaskUpdate', (id, task) => {
    console.log('Task updated:', id);
  });

  // 扩展事件 - 传入目标访问函数
  useGanttEvent(ganttRef, 'onAfterZoom', (level) => {
    console.log('Zoomed to level:', level);
  }, { target: (gantt) => gantt.ext.zoom });

  // 数据存储事件
  useGanttEvent(ganttRef, 'onStoreUpdated', () => {
    console.log('Resource store changed');
  }, { target: (gantt) => gantt.getDatastore('resource') });

  return null;
}
~~~

如果事件或目标不可用（例如未启用的插件），该钩子将静默地不执行任何操作。

## useResourceAssignments

访问 Gantt 的资源分配和资源管理方法。

~~~ts
import { useResourceAssignments } from '@dhx/react-gantt';
~~~

**返回（Returns）：**

- `getResourceAssignments(resourceId, taskId?)` - 对应到 [](api/method/getresourceassignments.md)。返回一个资源的分配，可选按任务过滤。
- `getTaskResources(taskId)` - 对应到 [](api/method/gettaskresources.md)。返回分配给一个任务的唯一资源。
- `getTaskAssignments(taskId)` - 对应到 [](api/method/gettaskassignments.md)。返回一个任务的所有分配。
- `getAllResources()` - 返回资源数据存储中的所有项。
- `setTaskAssignments(taskId, assignments)` - 替换某个任务的所有分配。每个分配应包含 `resource_id`，以及可选的 `value`。

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

对任意 Gantt 数据存储进行只读访问 —— 任务、链接、资源、分配、基线或自定义存储。

~~~ts
import { useGanttDatastore } from '@dhx/react-gantt';
~~~

**签名（Signature）：**
~~~ts
const store = useGanttDatastore<T>(ganttRef, storeName)
~~~

**返回（Returns）：**

- `getItem(id)` - 按 ID 返回单个项
- `getItems()` - 返回所有项
- `hasChild(id)` - 检查某项是否有子项（树形数据存储）
- `getChildren(id)` - 返回子项的 ID（树形数据存储）
- `eachItem(callback)` - 遍历数据存储中的所有项
- `find(filter)` - 返回匹配谓词函数的项
- `count()` - 返回项的总数
- `exists(id)` - 检查项是否存在

~~~tsx
import { useGanttDatastore, ResourceItem } from '@dhx/react-gantt';

function ResourceList({ ganttRef }) {
  const store = useGanttDatastore<ResourceItem>(ganttRef, 'resource');

  // 查找所有叶子节点（非组资源）
  const individuals = store.find(r => !store.hasChild(r.id));

  // 遍历所有资源
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

跟踪撤销/重做栈的状态并提供操作。自动订阅任务和连线的变更事件以保持状态同步。

~~~ts
import { useUndoRedo } from '@dhx/react-gantt';
~~~

**返回（Returns）：**

- `canUndo` - `boolean`，当撤销栈非空时为 true
- `canRedo` - `boolean`，当重做栈非空时为 true
- `undo()` - 执行一次撤销操作
- `redo()` - 执行一次重做操作

如果未启用撤销插件，返回的状态将为禁用状态（`canUndo: false, canRedo: false`）。

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
要使此钩子工作，必须在 `plugins` 属性中启用撤销插件：
~~~tsx
<ReactGantt plugins={{ undo: true }} ... />
~~~
:::

## useZoom

管理时间线的缩放级别并跟踪当前的缩放状态。会自动初始化缩放扩展。

~~~ts
import { useZoom } from '@dhx/react-gantt';
~~~

**签名（Signature）：**
~~~ts
const zoom = useZoom(ganttRef, levels?)
~~~

**参数（Parameters）：**

- `ganttRef` - 指向 ReactGantt 组件的引用
- `levels` - *(可选)* 缩放级别配置的数组。内置默认提供 5 个级别： Day、Week、Month、Quarter、Year。

**返回（Returns）：**

- `currentLevel` - 活跃缩放级别的名称
- `levels` - 缩放级别的配置
- `zoomIn()` - 缩放到更细的级别
- `zoomOut()` - 缩放到更粗的级别
- `setLevel(name)` - 按名称跳转到特定的缩放级别

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

你也可以提供自定义的缩放级别：

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
  // ...更多级别
];

const zoom = useZoom(ganttRef, customLevels);
~~~

## useSelection

跟踪当前在 Gantt 图中被选中的任务。

~~~ts
import { useSelection } from '@dhx/react-gantt';
~~~

**返回（Returns）：**

- `selectedId` - 当前选中的任务的 ID，若未选中则为 `null`

~~~tsx
import { useSelection } from '@dhx/react-gantt';

function TaskDetails({ ganttRef }) {
  const { selectedId } = useSelection(ganttRef);

  if (!selectedId) return <p>请选择一个任务以查看详情。</p>;

  return <p>选中的任务：{selectedId}</p>;
}
~~~

## useWorkTime

桥接 Gantt 内置的工作时间计算函数。用于高亮非工作时间以及进行符合工作日历的日期运算。

~~~ts
import { useWorkTime } from '@dhx/react-gantt';
~~~

**返回（Returns）：**

- `isWorkTime({ date, unit?, task? })` - 对应到 [](api/method/isworktime.md)
- `calculateEndDate({ start, duration, unit?, task? })` - 对应到 [](api/method/calculateenddate.md)
- `calculateDuration({ start, end, task? })` - 对应到 [](api/method/calculateduration.md)
- `getClosestWorkTime({ date, unit, task?, dir? })` - 对应到 [](api/method/getclosestworktime.md)

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

通过组合内置钩子来构建领域特定的自定义钩子。例如，创建一个资源直方图钩子：

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

## 直接访问 Gantt 实例

虽然钩子能够满足大部分高级需求，但你仍然可以通过 ref 直接访问整个 Gantt 实例：

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
如果在直接 Gantt 实例上修改了 tasks 或 links，同时又通过 React props 提供它们，请保持同步。否则，下一次 React 重新渲染时可能会覆盖你手动的修改。
:::
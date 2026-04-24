---
title: React Gantt 数据绑定与状态管理基础
sidebar_label: Basics
description: "概述 React Gantt 中的两种数据绑定模型，以及在集成 Redux、Zustand、MobX、Jotai、XState 或 Valtio 之前，将 React state 作为真相来源的基线模式。"
---

# React Gantt 数据绑定与状态管理

React Gantt 支持 **两种数据绑定模式**：

1. **以 React state 为真相来源（推荐）** - _大多数 React 应用的首选_。
2. **以 Gantt 为真相来源** - _在某些专门场景下很有用_。

两种方式都有效，但应选择一种并持续遵循，以避免出现意外行为。

本文将解释这两种模式，并展示各自的基础示例。

如果你还没有渲染一个基础图表，请从 [Quick Start](integrations/react/quick-start.md) 开始。

## 数据模型

### 以 React state 为真相来源（推荐）

在这种模型中：

- 你将 `tasks`、`links`、`resources`、`resourceAssignments` 保存在 React state 或者某个状态库中
- 将它们作为 props 传递给 `<Gantt>`
- 当用户修改了什么时，ReactGantt 会调用你的 `data.save` 或 `data.batchSave` 回调
- 你更新 React state -> React 重新渲染 -> ReactGantt 重新读取最新的 props

这是在你的页面上还存在其他需要与 Gantt 看到同一数据的 React UI，且应用中还有使用相同数据的其他 React 组件，或使用依赖同一数据的状态管理器时的正确选择。

不过，它会带来对 Gantt 的重新解析或重新渲染的频率增加的问题。

### 以 Gantt 为真相来源

在这种做法中，你将 ReactGantt 和后端视为数据的主要所有者：

- ReactGantt 通过 `data.load`、或通过 props、或通过一个命令式 API 调用加载初始数据集
- ReactGantt 在内部应用用户更改，或将其发送到服务器
- 你**不保留一份在 React state 中的完整任务/链接镜像，并不断传回 props**

关键区别在于不存在完整的循环——用户更改不会更新 React state，且每次更改后 React 也不会重新应用更新后的 props。

当数据集非常大时，这种模型很有用，因为它减少了在 Gantt 数据变化时持续更新 React state 的开销，并简化大批量操作（如自动排程）而无需重复重新渲染。

另一方面，你会失去 Gantt 数据与 React state 之间的直接同步。如果你确实将任务/链接存储在 React state 中，则需要确保不会无意中覆盖 Gantt 的内部状态。

## 以 React state 为真相来源 {#reactstateasthesourceoftruth}

在此模式中，你将所有核心集合保存在状态中并将它们作为 props 传递（`tasks`、`links`、`resources`、`resourceAssignments`）。无论用户在 Gantt 中修改任务或链接（例如创建或删除任务），Gantt 都会触发一个回调。在这个回调中，你用新数据来更新你的 React state。一旦状态更新，React 会重新渲染 **ReactGantt** 组件，组件再从最新的 state 读取更新后的 props。

### 使用 React state 的最小示例

~~~tsx
import { useState } from 'react';
import Gantt, {
  Task,
  Link
} from "@dhtmlx/trial-react-gantt";
import "@dhtmlx/trial-react-gantt/dist/react-gantt.css";

import { demoData } from "./demoData";

export default function ReactStateGantt() {
  const [tasks, setTasks] = useState<Task[]>(demoData.tasks);
  const [links, setLinks] = useState<Link[]>(demoData.links);


  return (
    <div style={{ height: "100vh" }}>
      <Gantt
        tasks={tasks}
        links={links}
        data={{
          save: (entity, action, item, id) => {
            // 在这里更新 React state（下面的模式请参阅）
            console.log("Change:", { entity, action, id, item });
          },
        }}
      />
    </div>
  );
}

~~~

这为你提供了一个基础起点——React 通过 props 控制渲染，Gantt 通过 `save` 回调报告变更，并使 React 成为数据的权威所有者。

下文将展示在该回调中你通常实现的典型模式。

## 使用 `data.save` 处理变更 {#handlingchangeswithdatasave}

当你提供 `data.save` 时，ReactGantt 会在用户进行的**每一次变更**上调用它：

~~~ts
(entity: string, action: string, item: any, id: string|number) => {...}
~~~

其中：
 
- `entity` 是 `"task" | "link" | "resource" | "resourceAssignment"`
- `action` 是 `"create" | "update" | "delete"`
- `item` 是创建/更新/删除 的对象
- `id` 是对象的 id

下面是一个简单的示例，直接更新 React state：

~~~tsx
function handleSave(entity, action, item, id) {
  if (entity === "task") {
    setTasks((prev) => {
      if (action === "create") return [...prev, item];
      if (action === "update") return prev.map((t) => (t.id === id ? item : t));
      if (action === "delete") return prev.filter((t) => t.id !== id);
      return prev;
    });
  }

  if (entity === "link") {
    setLinks((prev) => {
      if (action === "create") return [...prev, item];
      if (action === "update") return prev.map((l) => (l.id === id ? item : l));
      if (action === "delete") return prev.filter((l) => l.id !== id);
      return prev;
    });
  }

  // 如有需要，你也可以对 resources / assignments 应用同样的思路
}
~~~

在实际应用中，几乎从不把这段逻辑直接内联：

- 在 Redux Toolkit 中，这会成为一个 reducer 或 thunk
- 在 Zustand/Jotai/MobX/Valtio 中，它会驻留在 store 中
- 对于服务器集成，你也可以在这里调用 API

状态管理的教程都是基于此模式构建的，这个示例仅展示了出发点。

## 使用 `data.batchSave` 进行批量更新

`data.save` 是捕获用户变更的最方便入口，但它也有一个缺点——自动排序（Auto Scheduling）等在大量任务拖动或对大项目执行大量操作时可能产生数百甚至数千次变更。

如果你预计你的应用会出现这种情况，可以通过提供 `data.batchSave` 来切换到**批量模式**。在此模式下，ReactGantt 会向你提供分组的变更：

~~~ts
type GanttBatchChanges = {
  tasks?: Array<DataCallbackChange<Task>>;
  links?: Array<DataCallbackChange<Link>>;
  resources?: Array<DataCallbackChange<Resource>>;
  resourceAssignments?: Array<DataCallbackChange<ResourceAssignment>>;
};

interface DataCallbackChange<T> {
  entity: string;
  action: string;
  data: T;
  id: number | string;
}

~~~

以下是最小的使用示例：

~~~tsx
<ReactGantt
  // ...具备 tasks/links/resources 等的 props
  data={{
    batchSave: (changes) => {
      console.log("Batch changes:", changes);

      if (changes.tasks) {
        setTasks((prev) => applyTaskBatch(prev, changes.tasks));
      }

      if (changes.links) {
        setLinks((prev) => applyLinkBatch(prev, changes.links));
      }

      // 如需同样处理 resources / assignments
    },
  }}
/>

~~~

其中 `applyTaskBatch` / `applyLinkBatch` 是对 `{ action, data, id }` 进行遍历并返回更新数组的小辅助函数。

作为经验法则：
- 当你预期一次会有大量变更，且/或你希望将所有变更一次性发送到后端时，使用 `batchSave`
- 当大多数编辑是单个任务/链接的修改，且/或你想要最简单的集成时，使用 `save`

## 将数据加载到 React state

在 React 驱动的模型中，Gantt 通过 React state 获取数据。该 state 的“来源”由你应用的体系结构决定。

开发者常用的三种方式来填充它们的 state：

- [本地组件状态](/#localstate)
- [状态管理器（Redux Toolkit、Zustand、MobX、Jotai、XState、Valtio）](/#statemanagers)
- [从 API 加载数据](/#loadingfromapi)

### 本地组件状态 {#localstate}

这对于快速演示、原型设计或小型应用非常有用。

数据常来自本地的种子文件，但也可以是计算或派生得来的。

~~~jsx
export default function GanttTemplatesDemo() {
  const [tasks, setTasks] = useState(projectData.tasks);
  const [links, setLinks] = useState(projectData.links);
  const [resources, setResources] = useState(projectData.resources);
  const [resourceAssignments, setResourceAssignments] = 
      useState(projectData.resourceAssignments);

  return (
    <div style={{height: '100vh'}}>
      <ReactGantt
        tasks={tasks}
        links={links}
        resources={resources}
        resourceAssignments={resourceAssignments}
      />
    </div>
  );
};
~~~

这种模式与使用状态管理器非常相似——唯一的区别在于状态存放的位置。


### 状态管理器（Redux Toolkit、Zustand、MobX、Jotai、XState、Valtio） {#statemanagers}

在许多生产应用中，Gantt 数据并不存放在组件内，而是存在一个全局 store 中。

ReactGantt 自然地与这些库集成。你通过选择器或 store 钩子从 store 读取数据并将其作为 props 传递给 `<Gantt>`，方式与本地状态完全相同。

以下是典型实现的几个示例。

**Redux Toolkit**

~~~ts
const { tasks, links } = useSelector((state: RootState) => state.gantt);
~~~

**Zustand**

~~~ts
const tasks = useGanttStore((state) => state.tasks);
~~~

**MobX**

~~~tsx
<Gantt tasks={store.tasks} links={store.links} />
~~~

尽管每个库有自己的 API，但集成模式是相同的——你将 `tasks`、`links`、`resources` 等作为 props 提供，通过 `data.save` 或 `data.batchSave` 处理用户更新，唯一区别是 state 的来源位置。

状态管理教程展示了如何在各自的库中实现相同的模式：

- [在 Redux Toolkit 中使用 React Gantt](integrations/react/state/redux-toolkit.md)
- [在 Zustand 中使用 React Gantt](integrations/react/state/zustand.md)
- [在 MobX 中使用 React Gantt](integrations/react/state/mobx.md)
- [在 XState 中使用 React Gantt](integrations/react/state/xstate.md)
- [在 Jotai 中使用 React Gantt](integrations/react/state/jotai.md)
- [在 Valtio 中使用 React Gantt](integrations/react/state/valtio.md)


### 从 API 加载数据 {#loadingfromapi}

在实际应用中，你通常从后端加载数据并放入 React state（本地或全局）。

下面是一个更完整的示例，反映了典型用法：

~~~tsx
import { useEffect, useState } from "react";
import Gantt, {
  Task,
  Link,
  Resource,
  ResourceAssignment,
  Calendar,
} from "@dhtmlx/trial-react-gantt";

interface GanttData {
  tasks: Task[];
  links: Link[];
  resources: Resource[];
  resourceAssignments: ResourceAssignment[];
}

export default function GanttWithApi() {
  const [data, setData] = useState<GanttData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const response = await fetch("/api/gantt-data");
        const raw = await response.json();

        const nextData: GanttData = {
          tasks: raw.tasks,
          links: raw.links,
          resources: raw.resources ?? [],
          resourceAssignments: raw.resourceAssignments ?? []
        };

        setData(nextData);
      } finally {
        setIsLoading(false);
      }
    }

    load();
  }, []);

  if (isLoading || !data) {
    return <div>Loading Gantt...</div>;
  }

  return (
    <ReactGantt
      tasks={data.tasks}
      links={data.links}
      resources={data.resources}
      resourceAssignments={data.resourceAssignments}
      data={{
        save: (entity, action, item, id) => {
          // 在这里更新状态并与后端同步
        },
      }}
    />
  );
}
~~~

这种方法与状态管理器的集成相得益彰：

- 在 effect 中加载数据，或在 thunk 中加载
- 将数据存入 Redux/Zustand/MobX 等
- 通过 props 将数据传递给 `<Gantt>`
- 使用 `save`/`batchSave` 处理更新

## Gantt 作为 React 应用中的真相来源 {#ganttasthesourceoftruth}

第二种绑定模式是 **Gantt 作为真相来源**，在该模式中 Gantt（以及可选地你的后端）被视为主要的数据持有者。

React 渲染组件但不会在每次更新后维护必须通过 props 回放的 canonical 状态（tasks/links/resources）。

这一模型完全消除了 `React state <-> Gantt` 的循环。

### 何时这种模型有意义

在以下情况下使用 **Gantt 作为真相来源**：

- 数据集非常大（成千上万条任务）
- 自动排程或大规模更新频繁发生
- React 不需要对每一次更新进行实时响应
- 页面主要以“Gantt 为中心”
  
React 仍然负责布局、路由和周边 UI，但 Gantt 拥有数据生命周期。

### 提供初始数据

即使在这个模型中，你仍然可以给 Gantt 一个初始数据集。关键区别在于你不再持续将变更回馈到 React state。

你可以通过以下任一方式初始化 Gantt：通过 URL 加载数据、通过自定义函数加载数据、通过 props 传递初始快照。详见下文。

#### 通过 URL 加载数据

Gantt 可以直接通过后端的 REST 端点加载所有数据：

~~~tsx
<Gantt
  data={{
    load: "/api/gantt/load",
    save: "/api/gantt/save",
  }}
/>
~~~

- `data.load` 在初始化时被调用一次
- 当用户修改任务/链接时，`data.save` 会被触发

#### 通过自定义函数加载数据

不使用 URL，而是使用异步函数：

~~~tsx
<Gantt
  data={{
    load: async () => {
      const res = await fetch("/api/gantt/load");
      return res.json();
    },
    save: async (entity, action, item, id) => {
      // 见下面的示例
    },
  }}
/>
~~~

#### 通过 props 传递初始快照（单向）

你仍然可以通过 props 提供初始数据：

~~~tsx
<Gantt tasks={initialTasks} links={initialLinks} />
~~~

在这种情况下，props 只是一个起点。初始化后，Gantt 会维护自己的内部存储并从那里继续。由于在此模型中 React 不被视为数据的规范所有者，因此你不会在每次编辑后将新数组重新注入 props。

### 更新工作原理

每当用户创建、编辑或删除数据时，Gantt 会触发 `save`（或 `batchSave`）回调。

Gantt 初始会为新创建的记录分配临时 ID。后端必须用真实的数据库 ID 取代它们。

此逻辑反映了 DataProcessor 模块在 JS Gantt 中的行为（请参阅 JS Docs 中的 [Server-Side Integration](guides/server-side.md)）。

当创建一个新的任务、链接、资源或分配时，`save` 调用必须返回一个 Promise，解析为：

~~~json
{ "id": "<database id>"}
~~~

例如：

~~~ts
data.save = async (entity, action, item, id) => {
  if (action === "create") {
    const response = await fetch(`/api/${entity}`, {
      method: "POST",
      body: JSON.stringify(item),
      headers: { "Content-Type": "application/json" }
    });

    const result = await response.json(); 
    // result 应包含 { id: newDatabaseId }
    return { id: result.id };
  }

  if (action === "update") {
    await fetch(`/api/${entity}/${id}`, {
      method: "PUT",
      body: JSON.stringify(item),
      headers: { "Content-Type": "application/json" }
    });
    return {};
  }

  if (action === "delete") {
    await fetch(`/api/${entity}/${id}`, { method: "DELETE" });
    return {};
  }
};
~~~

返回 `{id: newId}` 允许 Gantt 将临时 ID 替换为永久 ID。这确保后续的 update/delete 操作能够针对数据库中的正确记录。

#### 使用 `batchSave`

`batchSave` 将多次变更分组到单个回调中。由于有可能同时出现多条新记录，Gantt 不期望 `batchSave` 返回任何内容。

在使用 `batchSave` 时，你必须在后端创建新记录并获取它们的永久 ID，然后通过不可变 API 调用替换临时 ID 来更新 Gantt：

~~~ts
gantt.changeTaskId(tempId, realId);
gantt.changeLinkId(tempId, realId);
~~~

## 下一步

一旦你明确了这两种数据模型，就可以继续前往具体教程。

状态管理器：

- [在 Redux Toolkit 中使用 React Gantt](integrations/react/state/redux-toolkit.md)
- [在 Zustand 中使用 React Gantt](integrations/react/state/zustand.md)
- [在 MobX 中使用 React Gantt](integrations/react/state/mobx.md)
- [在 XState 中使用 React Gantt](integrations/react/state/xstate.md)
- [在 Jotai 中使用 React Gantt](integrations/react/state/jotai.md)
- [在 Valtio 中使用 React Gantt](integrations/react/state/valtio.md)

或者了解更多关于命令式 API 的用法和服务器端通信：

- [React Gantt Configuration](integrations/react/configuration-props.md)
- [Server-Side Integration](guides/server-side.md)
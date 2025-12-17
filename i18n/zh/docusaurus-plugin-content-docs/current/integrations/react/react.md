---
title: "React Gantt"
sidebar_label: "概览"
---

React Gantt
==================

:::note
React Gantt 适用于 [Commercial, Enterprise 和 Ultimate 许可证](https://dhtmlx.com/docs/products/licenses.shtml)。
对于 Gantt 的 Individual 或 GPL 版本用户，请参考 React 的 [快速开始指南](integrations/react/quick-start.md)。
:::

概述
--------------------

DHTMLX Gantt 是一个纯 JavaScript 组件，兼容所有主流浏览器环境。Commercial 及更高版本包含了一个 **React Gantt** 组件，该组件对 DHTMLX Gantt 进行了封装，使其能够更方便地原生集成到 React 应用中。

这个封装组件允许你通过 React 熟悉的 props 和 state 模型创建功能齐全的甘特图。组件内部会管理一个标准的 DHTMLX Gantt 实例，并将 React 的 props（如 tasks 和 config）转换为相应的 Gantt 初始化和数据结构。

**主要特性**

- 声明式数据管理:通过 props 传递任务、依赖、资源等数组。
- 高度可配置:可以将 React props 映射到 *gantt.config*、*gantt.templates*、*gantt.plugins* 等。
- 完整 Gantt API 访问:通过 ref 可调用如 [getTask](api/method/gettask.md)、[updateTask](api/method/updatetask.md) 或 [addTaskLayer](api/method/addtasklayer.md) 等方法。
- 简单自定义:可以用 React 组件实现模板、弹窗表单或内联编辑器。

如果你是 DHTMLX Gantt 新用户，[DHTMLX Gantt 文档](guides.md) 提供了包括 [작업 시간 계산](guides/working-time.md)、[자동 스케줄링](guides/auto-scheduling.md)、[리소스 관리](guides/resource-management.md) 等在内的功能概览。

安装与 NPM 获取
-------------------

**安装 React Gantt 试用版组件**

:::note
如需体验 React Gantt 试用版，请从[这里](https://dhtmlx.com/docs/products/dhtmlxGantt/download.shtml)下载 DHTMLX Gantt 试用包，并按照 README 文件中的说明操作。该包内也包含 React Gantt 示例。
请注意，试用版仅可使用 30 天。
:::

**安装 React Gantt PRO 版本组件**

:::note
通过 [Client's Area](https://dhtmlx.com/clients/) 可获取 DHTMLX 私有 npm 访问权限，你可以在此生成 npm 登录名和密码，详细安装指南也在其中。请注意，私有 npm 访问需拥有有效的专有 Gantt 许可证。
:::

版本要求
--------------------

- React `v18.0.0` 或更高

基础用法
-------------------

下面是一个导入并渲染甘特图的简单示例:

~~~js
import { useState } from 'react';
import ReactGantt from '@dhx/react-gantt';
import '@dhx/react-gantt/dist/react-gantt.css';
import { demoData } from './DemoData'

export default function BasicGantt() {
  const [theme, setTheme] = useState("terrace");
  const [tasks, setTasks] = useState(demoData.tasks);
  const [links, setLinks] = useState(demoData.links);

  return (
    <div style={{height: '500px' }}>
      <ReactGantt
        tasks="{tasks}"
        links="{links}"
        theme="{theme}"
      />
    </div>
  );
}
~~~

**demoData** 对象遵循此 [格式](guides/loading.md):

~~~
const demoData = {
  tasks: [
    { id: 1, text: "Product Launch", type: "project", open: true, parent: 0},
    { id: 2, text: "Planning Phase", type: "project", open: true, parent: 1},
    { id: 3, text: "Requirement Gathering", type: "task", progress: 0.2, 
      start_date: "2025-06-01", duration: 3, parent: 2},
    { id: 4, text: "Technical Feasibility", type: "task", progress: 0.4, 
      start_date: "2025-06-04", duration: 2, parent: 2},
    { id: 5, text: "Implementation Phase", type: "project", progress: 0.1, 
      open: true, start_date: "2025-06-08", duration: 10, parent: 1},
    { id: 6, text: "Prototype Development", type: "task", progress: 0.0, 
     start_date: "2025-06-08", duration: 4, parent: 5},
    { id: 7, text: "Feature Testing", type: "task", progress: 0.0, 
     start_date: "2025-06-12", duration: 4, parent: 5},
    { id: 8, text: "Go-Live Milestone", type: "milestone", progress: 0, 
     start_date: "2025-06-18", duration: 0, parent: 1}
  ],
  links: [
    { id: 1, source: 3, target: 4, type: "0" },
    { id: 2, source: 4, target: 5, type: "0" },
    { id: 3, source: 6, target: 7, type: "0" },
    { id: 4, source: 7, target: 8, type: "0" }
  ]
};
export demoData;
~~~

数据绑定
--------------------

**ReactGantt** 封装组件支持灵活的数据加载和保存方式。主要有两种处理 Gantt 数据变更的方法:

1. 使用 React state 作为数据唯一来源
2. 让 Gantt 自身作为数据唯一来源

两种方式都可行，但建议选定一种方式并始终如一，以避免出现意外问题。

### React state 作为数据唯一来源

在这种方式下，**ReactGantt** 会从你的 React state 读取所有任务和依赖数据。当用户在 Gantt 内修改任务或依赖（如新增或删除任务）时，会触发回调函数。在该回调中，你需要用变更内容更新 React state。state 更新后，React 会重新渲染 **ReactGantt**，它会从最新 state 重新加载数据。

~~~js
function MyGanttApp() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [links, setLinks] = useState<Link[]>(initialLinks);

  const data = {
    save: (entity: string, action: string, raw: any, id: string | number) => {
      if (entity === 'task') {
        if (action === 'create') {
          setTasks((prev) => [...prev, item]);
        } ...
      }
      ...
    }
  };

  return (
    <ReactGantt
      tasks="{tasks}"
      links="{links}"
      data="{data}"
      // ...other props
    />
  );
}
~~~

在此示例中，**ReactGantt** 在创建任务时会调用 **save** 回调，并据此更新 React state。state 变更会导致 ReactGantt 重新初始化 Gantt 数据。

这种模式让 React state 成为 UI 和服务端更新的唯一数据源，自然契合 React 或 Redux 的逻辑。

请注意，这可能导致 Gantt 更频繁地解析或重新渲染。

### Gantt 作为数据唯一来源

在此模式下，数据变更直接发生在 Gantt 实例内部，不一定与 React state 同步。你可以通过 props 或 Gantt 内置数据处理器初始加载任务和依赖，但运行后，Gantt 会在内部管理数据。如果设置了更新回调或内置数据传输，Gantt 会将变更同步到服务器或自定义函数，但不会自动更新或回滚 React state。

~~~js
<ReactGantt
  data="{" {
    load: "/api/data",     // gantt 从此处加载初始任务/依赖
    save: "/api/data"      // gantt 将变更同步到此处
  } }
/>
~~~

此配置下，Gantt 会自行处理数据的加载与保存，本地 Gantt 实例为数据唯一持有者。

这样可以减少 Gantt 变更时频繁更新 React state 的开销，并简化诸如自动排程等批量操作，无需多次重新渲染。

需要注意的是，这样做会失去 Gantt 数据与 React state 的直接同步。如果你仍在 React state 中保存任务/依赖，需注意不要无意中覆盖 Gantt 内部数据。

### 加载数据

如果代码中已存在数据，可以通过 state 变量和相应 props 传递给 Gantt:

~~~js
export default function GanttTemplatesDemo() {
  const [tasks, setTasks] = useState(projectData.tasks);
  const [links, setLinks] = useState(projectData.links);
  const [resources, setResources] = useState(projectData.resources);
  const [resourceAssignments, setResourceAssignments] = 
      useState(projectData.resourceAssignments);

  return (
    <div style="{" {height: '100vh'} }>
      <ReactGantt
        tasks="{tasks}"
        links="{links}"
        resources="{resources}"
        resourceAssignments="{resourceAssignments}"
      />
    </div>
  );
};
~~~

### 使用内置数据传输加载数据

你可以为 Gantt 指定一个数据加载的 URL 和一个变更保存的 URL:

~~~js
import React from 'react';
import ReactGantt from "@dhx/react-gantt";
import "@dhx/react-gantt/dist/react-gantt.css";

export default function BasicInitDemo() {

  const props = {
    data: {
      load: "/api/data",
      save: "/api/data"
    }
  }

  return (
    <ReactGantt ...{props} />
  );
}
~~~

内部会将 **load** URL 传递给 [load](api/method/load.md) 方法。接口返回的数据格式需参考 [데이터 로딩](guides/loading.md) 文章。

### 保存变更

**save** URL 会接收格式如本[文章](guides/server-side.md#jishushuoming:~:text="Request%20and%20response%20details)所述的变更数据。"

或者，你也可以将函数作为 **data** 对象的 **save** 属性传递。每当 Gantt 数据变更时，该函数会被调用，作为内部 [DataProcessor](guides/server-side.md#zidingyiluyou) 的路由处理器:

~~~js
import React from 'react';
import ReactGantt from "@dhx/react-gantt";
import "@dhx/react-gantt/dist/react-gantt.css";

export default function BasicInitDemo() {

  const props = {
    data: {
      load: "/api/data",
      save: (entity, action, data, id) => {
          console.log(`${entity} - ${action} - ${id}`, data);
      }
    }
  };

  return (
    <ReactGantt ...{props} />
  );
}
~~~

### 批量保存模式

在早期模式下，React Gantt 会为每个变更实体逐一触发回调，这与底层 Gantt 库的默认行为一致。但在 React 中，这在进行如自动排程等批量操作时，可能导致性能下降，因为此时可能会同时更新几十甚至上百个任务。每次变更都单独处理 state 并不是最高效的做法。

为提升性能，React Gantt 提供了专门用于批量操作的 **data.batchSave** 处理器。 
该处理器会在 Gantt 实例内发生批量变更时仅调用一次，并传递所有变更内容:

~~~

const [tasks, setTasks] = useState(data.tasks);
const [links, setLinks] = useState(data.links);

return <ReactGantt
  ref="{ganttRef}"
  tasks="{tasks}"
  links="{links}"

  data="{" {
    batchSave: (updates) => {
      if (updates.task) {
        setTasks(tasks => updateTasks(tasks, updates.task));
      }
      if (updates.link) {
        setLinks(links => updateLinks(links, updates.link));
      }

    }
  } }
/>
~~~

传递给 **batchSave** 回调的 `updates` 对象结构如下:

~~~js
{
  tasks: DataCallbackChange<Task>[],
  links: DataCallbackChange<Link>[],
  resources: DataCallbackChange<Resource>[],
  resourceAssignments: DataCallbackChange<ResourceAssignment>[],
}

interface DataCallbackChange<T> {
  entity: string;
  action: string;
  data: T;
  id: number | string;
}
~~~

配置与 Props
-------------------

React 封装组件支持一个 `config` prop（映射到 [gantt.config](api/overview/properties-overview.md)）和一个 `templates` prop（映射到 [gantt.templates](api/overview/templates-overview.md)）。

~~~js
<ReactGantt
  tasks="{tasks}"
  links="{links}"
  config= { {
    scales: [
      { unit: "year", step: 1, format: "%Y" },
      { unit: "month", step: 1, format: "%F, %Y" },
      { unit: "day", step: 1, format: "%d %M" },
    ],
    columns: [
      { name: "text", tree: true, width: "*", resize: true },
      { name: "start_date", align: "center", resize: true },
      { name: "duration", align: "center", resize: true },
      {
        name: "custom",
        align: "center",
        template: (task) => <AlertButton task="{task}" onClick="{handleButtonClick}" />,
        resize: true,
      },
      { name: "add", width: 44 },
    ],
  } }
  templates= { {
    task_text: (start, end, task) => `#${task.id}: ${task.text}`,
    task_class: (start, end, task) => {
      return task.priority === 'high' ? 'highlight-task' : '';
    },
  } }
/>
~~~

### 在模板中使用 React 组件

在 props 中定义模板时，可以从模板函数中返回 React 元素:

~~~js
function PriorityBadge({ priority }) {
  return <span style={{color: 'red' }}>{priority}</span>;
}

<ReactGantt
  templates="{" {
    task_text: (start, end, task) => {
      return <PriorityBadge priority="{task.priority}" />;
    }
  } }
/>
~~~

:::note
内部实现中，DHTMLX Gantt 以一种不直接使用 React 的方式操作 DOM。当模板中返回 React 组件时，这些组件会通过 portal 嵌入到 Gantt 的 HTML 中。请注意，对于大型数据集，如果频繁渲染复杂的 React 组件，可能会影响性能。
:::

模板可以用于自定义多个部分:

- [task_text](api/template/task_text.md), [task_class](api/template/task_class.md) 用于任务条
- [时间轴头部的格式化](guides/configuring-time-scale.md#riqigeshi)
- [左侧网格单元格的列模板](guides/specifying-columns.md#shujuyingsheyumoban)
- 以及更多内容。详细信息请参阅 [可用指南](guides.md)

React Gantt 支持的所有 props 列表详见:[](integrations/react/configuration-props.md)

主题与样式
-----------------

Gantt 提供了多种内置主题，可通过 **theme** prop 设置，并支持动态切换:

~~~js
import { useEffect, useRef } from 'react';
import ReactGantt from "@dhx/react-gantt";
import "@dhx/react-gantt/dist/react-gantt.css";

export default function BasicInitDemo() {
  const [theme, setTheme] = useState("terrace"); 
  const tasks = [...];
  const links = [...];

  const switchTheme = () => {
    setTheme((prevTheme) => (prevTheme === "terrace" ? "dark" : "terrace"));
  };


  return (
    <div style="{" {height: '600px'} }>
      <div>
        <button onClick="{switchTheme}">Switch Theme</button>
      </div>
      <ReactGantt
        tasks="{tasks}"
        links="{links}"
        theme="{theme}"  /*!*/
      />
    </div>
  );
};
~~~

可用主题的详细说明请参阅 [此文档](guides/skins.md)。

还可以通过自定义样式或覆盖 CSS 变量进一步定制主题:

~~~css
:root {
    --dhx-gantt-task-background: #d96c49;
    --dhx-gantt-task-color: #fff;
    --dhx-gantt-task-border-radius: 8px;
}
~~~

更多配置选项请参考 [스킨 커스터마이제이션](guides/custom-skins.md) 指南。

替换 Lightbox
------------------

DHTMLX Gantt 内置了一个可配置的任务编辑器 [Lightbox](guides/default-edit-form.md)。

如需替换，可以通过以下方式使用 React 模态框或其他组件:

### 通过 `customLightbox` prop 提供自定义组件

可以通过 **customLightbox** prop 传递一个组件:

~~~js
import React, { useState } from 'react';

export interface CustomLightboxProps {
  data: any;
  onSave: (task: any) => void;
  onCancel: () => void;
  onDelete: () => void;
}

const CustomLightbox: React.FC<CustomLightboxProps> = ({
  data,
  onSave,
  onCancel,
  onDelete
}) => {
  const [description, setDescription] = useState<string>(data.text || '');

  const handleSaveClick = () => {
    onSave({ ...data, text: description });
  };

  const modalStyles = {
   ...
  };

  return (
    <div>
      <div style="{modalStyles.overlay}" onClick="{onCancel}" />
      <div style="{modalStyles.content}">
        <h3>Edit Task</h3>
        <div>
          <label>Description:</label>
          <input
            type="text"
            value="{description}"
            onChange="{(e)" => setDescription(e.target.value)}
            style={{width: '100%', padding: '8px', marginTop: '10px' } }
          />
        </div>
        <div style="{modalStyles.buttonGroup}">
          <button onClick="{handleSaveClick}">Save</button>
          <button onClick="{onCancel}">Cancel</button>
          <button onClick="{onDelete}">Delete</button>
        </div>
      </div>
    </div>
  );
};

export default CustomLightbox;
~~~

然后可以如下使用该组件:

~~~js
import { useEffect, useRef } from 'react';
import ReactGantt from "@dhx/react-gantt";
import "@dhx/react-gantt/dist/react-gantt.css";
import CustomLightbox from "./EditorModal";

export default function BasicInitDemo() {
  const ganttRef = useRef(null);

  const tasks = [...];
  const links = [...];

  useEffect(() => {
    //const gantt = ganttRef.current?.instance;
    
  }, []);

  return (
    <ReactGantt 
      ref="{ganttRef}"
      tasks="{tasks}"
      links="{links}"
      customLightbox="{<CustomLightbox" />} />
  );
}
~~~

### 通过 onBeforeLightbox 事件 prop

对于更高级的场景，可以监听 [onBeforeLightbox](api/event/onbeforelightbox.md) 事件（Lightbox 打开时触发），并覆盖默认行为:

~~~js
import { useEffect, useRef } from 'react';
import ReactGantt from "@dhx/react-gantt";
import "@dhx/react-gantt/dist/react-gantt.css";
import { useNavigate } from 'react-router-dom';


export default function BasicInitDemo() {
  const ganttRef = useRef<any>(null);

  const tasks = [...];
  const links = [...];
  const navigate = useNavigate();

  const handleTaskEdit = (id: any) => {
    const ganttInstance = ganttRef.current?.instance;
    navigate(`/editor/${id}`, { state: { task: ganttInstance.getTask(id) } });
  };

  return (
    <ReactGantt 
      ref="{ganttRef}"
      tasks="{tasks}"
      links="{links}"
      onBeforeLightbox="{handleTaskEdit}" />
  );
}
~~~

### 通过 JS Gantt API

关于如何覆盖或扩展内置 Lightbox，请参阅 [Custom Lightbox](guides/custom-edit-form.md)。

替换内置弹窗
------------------

默认界面包含两个弹窗对话框:

- 删除任务前的确认对话框
- 删除链接前的确认对话框

这两者都可通过 ReactGantt 的 `modals` prop 自定义:

~~~js
<ReactGantt
  ...
  modals="{" {
    onBeforeTaskDelete: ({
      task,
      callback,
      ganttInstance,
    }: {
      task: Task;
      callback: () => void;
      ganttInstance: GanttStatic;
    }) => void,
    onBeforeLinkDelete: ({
      link,
      callback,
      ganttInstance,
    }: {
      link: Link;
      callback: () => void;
      ganttInstance: GanttStatic;
    }) => void,
  } }
  ...
/>

~~~

这些 props 允许你在 Gantt 请求确认时弹出自定义模态框。
调用提供的 `callback()` 将完成任务或链接的删除。若要取消，只需关闭模态框且不调用 callback 即可。

在网格中使用 React 组件
-------------------

### 用于表头

网格列的 **label** 属性可以是 `string` 或 `ReactElement`。这样可以直接在列头嵌入基于 React 的筛选器、按钮或其它 UI 元素:

~~~js
const config: GanttConfig = {
  columns: [
    { name: "text", label: "Name", tree: true, width: 180, 
        resize: true },
    // 直接嵌入 React 元素
    { name: "start_date", label: <DateFilter />, width: 150, 
        align: "center", resize: true },
    // 或者作为返回 React 元素的函数
    { name: "end_date", label: () => <DateFilter />, width: 150, 
        align: "center", resize: true },
    ...
  ],
  row_height: 40,
  grid_width: 550,
};
~~~

当封装器在 label 或其它模板属性中发现 React 元素时，会通过 React Portal 渲染到网格的表头单元格中。

### 用于单元格

网格单元格由列的 **template** 属性控制。该函数接收一个任务对象，应返回一个普通 `string` 或 `ReactElement`：

~~~
import { useRef } from 'react';

function AlertButton({ task, onClick }) {
  return <button onClick="{onClick}">{`Task ID: ${task.id}`}</button>;
}

export default function GanttWithGridCells({ handleButtonClick, ganttRef }) {
  const config = {
    columns: [
      { name: "text", tree: true, width: 180, resize: true },
      { name: "start_date", width: 150, align: "center", resize: true },
      { name: "duration", width: 80, align: "center", resize: true },
      {
        name: "custom",
        align: "center",
        label: <span>My Column</span>,
        width: 140,
        // 返回 React 元素
        template: (task) => (
          <AlertButton
            task="{task}"
            onClick="{()" => {
              handleButtonClick(task);
              // 如有需要，可触发任务重渲染
              ganttRef.current?.instance.updateTask(task.id);
            }}
          />
        ),
        resize: true,
      },
      { name: "add", width: 44 },
    ],
    row_height: 40,
    grid_width: 550,
  };

  return <ReactGantt ref="{ganttRef}" config="{config}" /* ...other props */ />;
}
~~~

从列模板返回 React 元素，使你能在每个 Gantt 网格单元格内构建完全交互式内容，如按钮、下拉框或徽章。封装器会通过 portal 将这些元素注入到 Gantt 管理的 DOM 节点中。

### 在内联编辑器中

DHTMLX Gantt 支持[网格单元格的内联编辑](guides/inline-editing.md)。在此 React 包装器中，可以通过在**列**配置中定义编辑器对象，并通过 `inlineEditors` 属性将编辑器名称关联到 React 组件，从而添加自定义 React 编辑器。下面的示例演示了这一设置。

定义一个基于 React 的内联编辑器组件:

~~~js
import React, {
    useState,
    forwardRef,
    useImperativeHandle
} from 'react';
import { InlineEditorMethods, InlineEditorProps } from '@dhx/react-gantt';


const MyInlineEditor = forwardRef<InlineEditorMethods, InlineEditorProps>(
    ({ initialValue, task, save, cancel, ganttInstance }, ref) => {
        const [value, setValue] = useState(initialValue || "");

        useImperativeHandle(ref, (): InlineEditorMethods => ({
            getValue: () => value,
            setValue: (val: any) => setValue(val),
            isValid: () => true, 
            focus: () => {

            },
            isChanged: (originalValue: any) => {
                return originalValue !== value;
            },

            save: () => {  }
        }));

        return (
            <input
                type="text"
                value="{value}"
                onChange="{e" => setValue(e.target.value)}
                autoFocus
            />
        );
    }
);

export default MyInlineEditor;
~~~

在 Gantt 配置中使用自定义编辑器:

~~~js
import ReactGantt from "@dhx/react-gantt";
import MyInlineEditor from "./CustomInlineEditor";

function Demo() {
  const config = {
    columns: [
      { name: "text", tree: true, width: 180, resize: true },
      {
        name: "duration",
        width: 80,
        align: "center",
        editor: { type: "customInputEditor", map_to: "text" }, /*!*/
        resize: true
      },
      { name: "start_date", width: 150 },
      { name: "add", width: 44 }
    ]
  };

  return (
    <ReactGantt
      config="{config}"
      inlineEditors="{" {
        customInputEditor: MyInlineEditor  /*!*/
      } }
      tasks="{[/*...*/]}"
      links="{[/*...*/]}"
    />
  );
}
~~~

当用户双击某一列单元格时，Gantt 图会将其替换为你的编辑器组件。包装器会在内部调用你通过 `useImperativeHandle(ref, ...)` 提供的方法（如 getValue、setValue 等），以保持 Gantt 实例与组件更改的同步。

编辑器对象中的 `type` 值应与 `inlineEditors` 中的键对应。

`map_to` 属性指明编辑器将读取和写入 Task 对象的哪个属性。更多信息请参见[内联编辑](guides/inline-editing.md)一文。

如果你的编辑器除了简单地更新任务属性外还需要执行更复杂的操作，请在 **save** 函数中实现所需逻辑，并将 `map_to` 选项设置为 **"auto"**。此模式下，Gantt 图不会自动更新任务对象，而是在需要应用更改时调用 **save** 函数。此时编辑器会收到 `null` 作为 `initialValue`。

:::note
注意，非 React 内联编辑器也可以通过 **config** 中的 [editor_types](guides/inline-editing.md#zidingyineilianbianjiqi) 属性进行定义。
:::

#### 编辑器组件属性

- <span class="subproperty">**initialValue**</span> - (*any*) - 编辑器的初始值
- <span class="subproperty">**task**</span> - (*Task*) - 当前正在编辑的任务
- <span class="subproperty">**save**</span> - (*function*) - 触发 gantt 保存并关闭编辑器
- <span class="subproperty">**cancel**</span> - (*function*) - 关闭编辑器但不保存
- <span class="subproperty">**ganttInstance**</span> - (*GanttStatic*) - 当前的 Gantt 实例


过滤
-----------------

`filter` 属性允许你指定一个函数来控制哪些任务可见:

~~~js
const [filter, setFilter] = useState<((task: Task) => boolean) | null>(null);

function showCompleted() {
  setFilter(() => (task: Task) => task.progress === 1);
}
function resetFilter() {
  setFilter(null);
}

return (
  <ReactGantt
    ...
    filter="{filter}"
    ...
  />
);

~~~

要在[资源面板](guides/resource-management.md)中过滤资源，请使用 `resourceFilter` 属性:

~~~js
function handleResourceSelectChange(resourceId: string | null) {
  setSelectedResource(resourceId);
  if (resourceId === null) {
    setResourceFilter(null);
  } else {
    setResourceFilter(
      () => (resource: ResourceItem) => String(resource.id) === String(resourceId)
    );
  }
}

return (
  <ReactGantt
    ref="{ganttRef}"
    tasks="{tasks}"
    links="{links}"
    resources="{resources}"
    resourceFilter="{resourceFilter}"
    config="{config}"
    templates="{templates}"
    plugins={{auto_scheduling: true } }
  />
);

~~~

工作日历
------------------

要在 **ReactGantt** 中启用工时计算，请在配置中激活工时功能:

~~~js
  const config: GanttConfig = {
    ...
    work_time: true
  };
~~~

可以通过 `calendars` 属性将工作日历传递给 **ReactGantt**:

~~~jsx
const calendars: Calendar[] = [
  {
    id: "global",
    hours: ["8:00-12:00", "13:00-17:00"], // 工作日的全局工作时间
    days: {
      weekdays: {
        0: false, // 0 = 周日, 6 = 周六
        1: true,
        2: true,
        3: true,
        4: true,
        5: true,
        6: false
      },
      dates: {
        "2025-04-06": true,  // 覆盖特定日期的工作时间
        "2025-04-08": false
      }
    }
  }
];

return (
  <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
    <ReactGantt
      ...
      calendars="{calendars}"
      ...
    />
  </div>
);

~~~

要在 Gantt 时间线中高亮工作时间或执行工时计算，可以使用提供的 `useWorkTime` hook:

~~~js
import ReactGantt, { useWorkTime, Calendar } from "@dhx/react-gantt";

export default function GanttTemplatesDemo() {
  const ganttRef = useRef<ReactGanttRef>(null);

  const { isWorkTime } = useWorkTime(ganttRef);
  const templates: GanttTemplates = {
    timeline_cell_class: (task: Task, date: Date) => {
      return isWorkTime({ date, task }) ? "" : "weekend";
    }
  };

  const calendars: Calendar[] = [
    {
      id: "global",
      hours: ["8:00-12:00", "13:00-17:00"], // 工作日的全局工作时间
      days: {
        weekdays: {
          0: false, // 0 = 周日, 6 = 周六
          1: true,
          2: true,
          3: true,
          4: true,
          5: true,
          6: false
        },
        dates: {
          "2025-04-06": true,  // 覆盖特定日期的工作时间
          "2025-04-08": false
        }
      }
    }
  ];

  return (
    <div style="{ { height: '100%', display: 'flex', flexDirection: 'column' }}>
      <ReactGantt
        ...
        calendars="{calendars}"
        templates="{templates}"
        config="{config}"
        ref="{ganttRef}"
      />
    </div>
  );
};

~~~

另外，也可以访问[底层 Gantt 对象](#accessingtheunderlyingganttapi)以直接使用[工时](../../guides/working-time.md)方法。

任务分组
-----------------

可以通过 `groupTasks` 属性按任意任务属性对任务进行分组:

~~~js
  const [grouping, setGrouping] = useState<GroupConfig | boolean>({
    relation_property: 'status',
    groups:[
      {id: 1, name: "New"},
      {id: 2, name: "In Progress"},
      {id: 3, name: "Done"}
    ],
    group_id: "key",
    group_text: "label"
  });

  return (
  <ReactGantt
    ref="{ganttRef}"
    tasks="{tasks}"
    links="{links}"
    groupTasks="{grouping}"
  />
);
~~~

如需关闭分组，将 `groupTasks` 设为 `false`：

~~~js
setGrouping(false);
~~~


时间线区域中的垂直标记
-----------------

可以通过 `markers` 属性为 **ReactGantt** 添加垂直标记:

~~~js
  const projectStartMarker = {
    id: "marker1",
    start_date: new Date(2025, 3, 2),
    text: "Project start!",
    css: "project-start"
  };
  const projectEndMarker = {
    id: "marker2",
    start_date: new Date(2025, 3, 16),
    text: "Project end",
    css: "project-end"
  };

  const [markers, setMarkers] = useState<Marker[]>([
    projectStartMarker,
    projectEndMarker
  ]);

  return (
    <div style={{height: '100%', display: 'flex', flexDirection: 'column' }}>
      <ReactGantt
        ...
        markers="{markers}"
        ...
      />
    </div>
  );
~~~

:::note
注意，Marker 对象的 **text** 属性支持 HTML 字符串或 React Element
:::

访问底层 Gantt API
------------------

虽然 ReactGantt 的属性覆盖了大多数配置需求，但对于如工时计算、gantt.showDate、gantt.unselectTask 或自定义缩放等高级功能，有时需要直接访问 DHTMLX Gantt API。

### 使用内置 hooks

ReactGantt 提供了可暴露部分 Gantt API 的 hooks。详情请参阅相关文档 [](integrations/react/configuration-props.md)。

### 使用 Ref

当声明式属性和 hooks 不足以满足需求时，可以通过 `ref` 访问内部 Gantt 实例:

~~~js
import React, { useRef, useEffect } from 'react';
import ReactGantt, { ReactGanttRef } from '@dhx/react-gantt';

export function DirectRefExample({ tasks, links }) {
  const ganttRef = useRef<ReactGanttRef>(null);

  useEffect(() => {
    const gantt = ganttRef.current?.instance;
    if (!gantt) return;

    // 这里可以调用任意 Gantt API 方法
    console.log('All tasks:', gantt.getTaskByTime());
    gantt.showDate(new Date());
  }, []);

  return (
    <ReactGantt
      ref="{ganttRef}"
      tasks="{tasks}"
      links="{links}"
    />
  );
}
~~~


完整方法列表请参考 DHTMLX Gantt [API 参考](api/overview/methods-overview.md)。

#### 避免与 React 属性冲突

- 如果你手动调用 `gantt.parse(( tasks, links ))` 或 `gantt.addTask()`，请注意 React 属性可能会不同步。否则，React 的下一次渲染可能会覆盖你的手动更改。
- 最好通过包装器的属性或 React 状态管理任务和链接，让包装器自动处理重新解析。


与 SSR 框架（Next.js、Remix）兼容性
--------------

:::note
由于 DHTMLX Gantt 仅为浏览器端小部件，直接操作 DOM，无法在 Node/SSR 环境下渲染。因此，任何使用 ReactGantt 的路由或组件都必须禁用或延迟服务端渲染。
:::

#### Next.js

对于 Next.js 用户，建议通过动态导入并禁用 SSR 的方式加载 ReactGantt 组件:

~~~js
import dynamic from 'next/dynamic';

const GanttDemo = dynamic(() => import('../components/GanttDemo'), {
  ssr: false
});

export default function GanttPage() {
  return (
    <div style={{height: '100vh' }}>
      <GanttDemo />
    </div>
  );
}
~~~
这样可确保 Gantt 图仅在浏览器端加载，避免服务端渲染错误。

#### Remix

在 Remix 中，建议仅在客户端条件渲染 Gantt 组件:

~~~js
import { ClientOnly } from 'remix-utils/client-only';
import ReactGantt from '@dhx/react-gantt';

export default function GanttPage() {

  return (
    <div style={{height: '100vh' }}>
      <ClientOnly fallback="{<p">Loading...</p>}>
        {() => <ReactGantt
          tasks={{/* ... */]}
          links={{/* ... */]}
        />}
      </ClientOnly>
    </div>
  );
}
~~~

这种模式会延迟渲染，直到组件在浏览器端被 hydrate，从而避免 SSR 问题。

下一步
-------------------

- 有关 ReactGantt 配置的更多细节，请参见[本文](integrations/react/configuration-props.md)
- 有关高级用法，请参考 [DHTMLX Gantt 文档](guides.md) 

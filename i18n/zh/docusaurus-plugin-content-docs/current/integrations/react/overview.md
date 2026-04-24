---  
title: React Gantt 概览  
sidebar_label: 概览  
description: "对官方 React 封装器的概览：特性、props、主题、事件，以及访问底层 Gantt API"  

---  

# React Gantt 概览

:::note  
React Gantt 在 [Commercial、Enterprise 和 Ultimate 许可](https://dhtmlx.com/docs/products/licenses.shtml) 下可用。  
如果你使用的是 Gantt 的 Individual 或 GPL 版本，请参考 React 的 [入门指南](integrations/react/js-gantt-react.md) 文章。  
:::  

## 概览

DHTMLX Gantt 是一个纯 JavaScript 组件，可以在任何浏览器环境中工作。Gantt 的 Commercial 及更高版本包括一个 **React Gantt** 组件，它对 DHTMLX Gantt 进行了封装，允许你在 React 中原生地使用它。

这个封装器让你在 React 应用中使用熟悉的 props/state 模型来创建一个功能完备的 Gantt 图。在内部，它管理一个标准的 DHTMLX Gantt 实例，将你的 React props（如任务、配置等）转换成相应的 Gantt 初始化和数据结构。

**关键特性**

- 声明式数据处理：把任务、链接、资源等作为 props 传递的数组处理。
- 配置性强：将 React props 映射到底层的 *gantt.config*、*gantt.templates*、*gantt.plugins* 等。
- 访问完整的 Gantt API：通过 ref 调用诸如 [getTask](api/method/gettask.md)、[updateTask](api/method/updatetask.md)、或 [addTaskLayer](api/method/addtasklayer.md) 等方法。
- 易于定制：使用 React 组件实现模板、轻量表单或内联编辑器等。

如果你是 DHTMLX Gantt 的新用户，请参阅 [DHTMLX Gantt 文档](guides.md) 以了解诸如 [Work Time Calculation](guides/working-time.md)、[Auto Scheduling](guides/auto-scheduling.md)、[Resource Management](guides/resource-management.md) 等特性概览。

:::tip AI 辅助开发  
如果你使用 AI 代码助手，[DHTMLX React Gantt agent skill](integrations/ai-tools/agent-skills.md#available-skills) 可以帮助它遵循正确的集成模式并避免常见错误。要获取实时 API 参考，请连接 [DHTMLX MCP 服务器](integrations/ai-tools/mcp-server.md)。  
:::

## 安装与 NPM 访问

关于 Evaluation 和 Professional 构建的最新安装说明（包括 npm registry 配置和离线示例），请参阅 [安装指南](integrations/react/installation.md)。

安装包后，你可以在 React 代码中按如下方式导入封装器：

~~~ts
// Evaluation 构建（公共 npm）
import ReactGantt from '@dhtmlx/trial-react-gantt';
import '@dhtmlx/trial-react-gantt/dist/react-gantt.css';

// Professional 构建（私有 npm）
import ReactGantt from '@dhx/react-gantt';
import '@dhx/react-gantt/dist/react-gantt.css';
~~~

## 版本要求

- React v18.0.0 或更高

## 基本用法

下方是一段最小的代码片段，展示如何导入并渲染 Gantt 图：

~~~jsx
import { useState } from 'react';
import ReactGantt from '@dhx/react-gantt';
import '@dhx/react-gantt/dist/react-gantt.css';
import { demoData } from './DemoData'

export default function BasicGantt() {
  const [theme, setTheme] = useState("terrace");
  const [tasks, setTasks] = useState(demoData.tasks);
  const [links, setLinks] = useState(demoData.links);

  return (
    <div style={ { height: '500px' }}>
      <ReactGantt
        tasks={tasks}
        links={links}
        theme={theme}
      />
    </div>
  );
}
~~~

请注意，上面这段代码片段展示的是商业版 Gantt 的用法。若要使用试用代码源，请按如下方式包含包：

~~~js
import ReactGantt from '@dhtmlx/trial-react-gantt';
import '@dhtmlx/trial-react-gantt/dist/react-gantt.css';
~~~

其中 **demoData** 的格式如下 [format](guides/loading.md)：

~~~js
export const demoData = {
  tasks: [
    { id: 1, text: "Product Launch", type: "project", open: true, parent: 0},
    { id: 2, text: "Planning Phase", type: "project", open: true, parent: 1},
   	{ id: 3, text: "Requirement Gathering", type: "task", progress: 0.2, 
      start_date: "01-06-2025", duration: 3, parent: 2},
    { id: 4, text: "Technical Feasibility", type: "task", progress: 0.4, 
      start_date: "04-06-2025", duration: 2, parent: 2},
    { id: 5, text: "Implementation Phase", type: "project", progress: 0.1, 
      open: true, start_date: "08-06-2025", duration: 10, parent: 1},
    { id: 6, text: "Prototype Development", type: "task", progress: 0.0, 
     start_date: "08-06-2025", duration: 4, parent: 5},
    { id: 7, text: "Feature Testing", type: "task", progress: 0.0, 
     start_date: "12-06-2025", duration: 4, parent: 5},
    { id: 8, text: "Go-Live Milestone", type: "milestone", progress: 0, 
     start_date: "18-06-2025", duration: 0, parent: 1}
  ],
  links: [
    { id: 1, source: 3, target: 4, type: "0" },
    { id: 2, source: 4, target: 5, type: "0" },
    { id: 3, source: 6, target: 7, type: "0" },
    { id: 4, source: 7, target: 8, type: "0" }
  ]
};
export {demoData};
~~~


## 绑定数据 {#bindingdata}

**React Gantt** 封装器提供了加载和保存数据的灵活方法。从概念上讲，有两种主要的更改绑定模型：

- **React（或一个状态管理器）作为真实数据源**  
- **Gantt 作为真实数据源**

任一方法都是有效的，但你应该选择一种并始终如一地遵循，以避免出现意外行为。

:::info 需要更深的解释吗？

本节提供两种绑定模型的高级概览。若需要更详细的指南（包含完整示例），请参阅 [](integrations/react/state/state-management-basics.md)。
::: 

### 以 React（或状态管理器）作为真实数据源

在这种模式下，**ReactGantt** 通过 props 接收所有任务/链接数据（来自 `useState`、Redux、Zustand 等）。每当用户在图表中修改任务或链接时，Gantt 会调用 `data.save` 回调。在该回调中，你更新应用的状态。当状态变化时，React 会重新渲染 **ReactGantt**，并让 Gantt 实例与最新数据同步。

~~~tsx
import { useMemo, useState } from 'react';
import ReactGantt, { type Task, type Link } from '@dhtmlx/trial-react-gantt';
import '@dhtmlx/trial-react-gantt/dist/react-gantt.css';

export function MyGanttApp({ initialTasks, initialLinks }: {
  initialTasks: Task[];
  initialLinks: Link[];
}) {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [links, setLinks] = useState<Link[]>(initialLinks);

  const data = useMemo(
    () => ({
      save: (entity: string, action: string, item: any, id: string | number) => {
        if (entity === 'task') {
          setTasks((prev) => {
            if (action === 'create') return [...prev, item as Task];
            if (action === 'update') return prev.map((task) =>
              task.id === id ? (item as Task) : task
            );
            if (action === 'delete') return prev.filter((task) => task.id !== id);
            return prev;
          });
        }

        if (entity === 'link') {
          setLinks((prev) => {
            if (action === 'create') return [...prev, item as Link];
            if (action === 'update') return prev.map((link) =>
              link.id === id ? (item as Link) : link
            );
            if (action === 'delete') return prev.filter((link) => link.id !== id);
            return prev;
          });
        }
      },
    })),
    []
  );

  return (
    <ReactGantt
      tasks={tasks}
      links={links}
      data={data}
    />
  );
}
~~~

这种方式使你的 React（或全局）状态成为唯一的数据来源。它与 Redux Toolkit、Zustand、MobX、Jotai、XState 或 Valtio 等状态管理工具天然协作——你只需用你的商店钩子/选择器替换 `useState`，并将更新逻辑移入到商店中。

更多示例（包括与特定管理器的集成）请参阅 [React 状态作为真相来源](integrations/react/state/state-management-basics.md#reactstateasthesourceoftruth)。

### 将 Gantt 作为真实数据源

在这种方法中，**Gantt 本身** 持有数据的权威副本。你仍然通过 props 或 URL 初始化或加载任务和链接，但一旦图表运行，Gantt 会在内部处理变更并将更新转发到你的后端或自定义处理程序，而不是在每次编辑时通过 React 状态进行。

~~~tsx
import ReactGantt from '@dhtmlx/trial-react-gantt';
import '@dhtmlx/trial-react-gantt/dist/react-gantt.css';

export function GanttTransportExample() {
  return (
    <ReactGantt
      data={{
        load: '/api/gantt/data',  // Gantt 通过该端点加载任务/链接
        save: '/api/gantt/data',  // Gantt 将变更发送回这里
      }}
    />
  );
}
~~~

在这种模式下：

- 本地 Gantt 实例保留当前数据的权威拷贝
- React 不会在每次任务/链接变动时重新渲染
- 像自动排程这样的批量操作成本更低，因为它们不会触发重复的 React 更新

如果你仍然在 React 状态中保留某些任务/链接的表示，请小心不要用过时的数据覆盖 Gantt 的内部状态。

更多细节请参阅 [Gantt 作为真相来源](integrations/react/state/state-management-basics.md#ganttasthesourceoftruth)。

## 配置与 Props

React 封装器接收 `config` prop（映射到 [gantt.config](api/overview/properties-overview.md)）以及 `templates` prop（映射到 [gantt.templates](api/overview/templates-overview.md)）。

~~~js
<ReactGantt
  tasks={tasks}
  links={links}
  config= {{
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
        template: (task) => <AlertButton task={task} onClick={handleButtonClick} />,
        resize: true,
      },
      { name: "add", width: 44 },
    ],
  }}
  templates= {{
    task_text: (start, end, task) => `#${task.id}: ${task.text}`,
    task_class: (start, end, task) => {
      return task.priority === 'high' ? 'highlight-task' : '';
    },
  }}
/>
~~~

### 在模板中使用 React 组件

在属性中指定模板时，你可以从模板函数返回 React 元素：

~~~js
function PriorityBadge({ priority }) {
  return <span style={{color: 'red' }}>{priority}</span>;
}

<ReactGantt
  templates={{
    task_text: (start, end, task) => {
      return <PriorityBadge priority={task.priority} />;
    }
  }}
/>
~~~

:::note  
内部而言，DHTMLX Gantt 以非 React 的方式操作 DOM。当你从模板返回 React 组件时，它们通过门户（portals）嵌入到 Gantt 的 HTML 中。请记住，对于大型数据集，呈现大量的复杂 React 组件可能影响性能。  
:::  

你可以通过模板覆盖许多方面：

- [task_text](api/template/task_text.md)、[task_class](api/template/task_class.md) 用于柱形条  
- 给时间刻度头能“格式化”的[刻度格式化](guides/configuring-time-scale.md#dateformat)  
- 左侧网格单元的[列模板](guides/specifying-columns.md#datamappingandtemplates)  
- 以及更多。请参考 Gantt 的 [可用指南](guides.md)

你可以在以下文章中找到 React Gantt 支持的全部 prop 列表：[Configuring props](integrations/react/configuration-props.md)  

## 主题与样式

Gantt 附带了多种内置主题，可以通过 **theme** prop 启用并动态切换：

~~~jsx
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
    <div style={{height: '600px'}}>
      <div>
        <button onClick={switchTheme}>切换主题</button>
      </div>
      <ReactGantt
        tasks={tasks}
        links={links}
        theme={theme}  /*!*/
      />
    </div>
  );
}
~~~

你可以在 [此文章](guides/skins.md) 中找到现有主题的详细描述。

主题还可以通过自定义样式和覆盖 CSS 变量来进一步定制：

~~~css
:root {
    --dhx-gantt-task-background: #d96c49;
    --dhx-gantt-task-color: #fff;
    --dhx-gantt-task-border-radius: 8px;
}
~~~

如需更多配置，请查看 [Skins Customization](guides/custom-skins.md) 指南。

## 替换 Lightbox

DHTMLX Gantt 自带一个内置的可配置任务编辑器，称为 [Lightbox](guides/default-edit-form.md)。

如有需要，你可以通过以下任一方式将其替换为基于 React 的模态框或其他组件：

### 通过 `customLightbox` 属性提供自定义组件

要实现，请通过 **customLightbox** prop 传递一个组件：

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
      <div style={modalStyles.overlay} onClick={onCancel} />
      <div style={modalStyles.content}>
        <h3>Edit Task</h3>
        <div>
          <label>Description:</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={{width: '100%', padding: '8px', marginTop: '10px' }}
          />
        </div>
        <div style={modalStyles.buttonGroup}>
          <button onClick={handleSaveClick}>Save</button>
          <button onClick={onCancel}>Cancel</button>
          <button onClick={onDelete}>Delete</button>
        </div>
      </div>
    </div>
  );
};

export default CustomLightbox;
~~~

之后，你可以在如下方式使用新增的组件：

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
      ref={ganttRef}
      tasks={tasks}
      links={links}
      customLightbox={<CustomLightbox />} />
  );
}
~~~

### 使用 onBeforeLightbox 事件属性

对于更复杂的场景，你可以捕捉 [onBeforeLightbox](api/event/onbeforelightbox.md) 事件（Lightbox 被调用时触发）并覆盖默认行为：

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
      ref={ganttRef}
      tasks={tasks}
      links={links}
      onBeforeLightbox={handleTaskEdit} />
  );
}
~~~

### 使用 JS Gantt API

请参考 [Custom Lightbox](guides/custom-edit-form.md) 以获取覆盖或扩展内置 Lightbox 的更多细节。

## 替换内置模态框

默认 UI 包含两个模态弹窗：

- 删除任务前出现的确认对话框
- 删除链接前出现的确认对话框

两者都可以通过 ReactGantt 的 `modals` 参数进行覆盖：

~~~js
<ReactGantt
  ...
  modals={{
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
  }}
  ...
/>

~~~

你可以使用这些参数在 Gantt 调用确认对话框时激活自定义模态框。调用参数中的 `callback()` 将最终完成相应任务或链接的删除。若要取消删除，只需在不调用回调的情况下关闭模态框。

## 在网格中使用 React 组件

### 在表头中

网格列的 **label** 属性可以是一个 `string` 或一个 `ReactElement`。这让你直接在列头中嵌入基于 React 的过滤器、按钮或其他 UI：

~~~js
const config: GanttConfig = {
  columns: [
    { name: "text", label: "Name", tree: true, width: 180, 
        resize: true },
    // 直接嵌入 React 元素
    { name: "start_date", label: <DateFilter />, width: 150, 
        align: "center", resize: true },
    // 或使用返回 React 元素的函数：
    { name: "end_date", label: () => <DateFilter />, width: 150, 
        align: "center", resize: true },
    ...
  ],
  row_height: 40,
  grid_width: 550,
};
~~~

当封装器在标签或任何其他模板属性中检测到 React 元素时，它会使用 React Portal 将该元素渲染到网格头单元格中。

### 在单元格中

网格单元格由列的 **template** 属性定义。该模板函数接收一个任务对象，必须返回一个纯字符串或一个 ReactElement：

~~~jsx
import { useRef } from 'react';

function AlertButton({ task, onClick }) {
  return <button onClick={onClick}>{`Task ID: ${task.id}`}</button>;
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
            task={task}
            onClick={() => {
              handleButtonClick(task);
              // 如有需要，强制重新渲染该任务
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

  return <ReactGantt ref={ganttRef} config={config} /* ...other props */ />;
}
~~~

通过从列模板返回一个 React 元素，你可以在 Gantt 网格的每个单元格中创建完全交互的内容（按钮、下拉框、徽标等）。内部，封装器会通过门户将这些元素注入到 Gantt 管理的 DOM 节点中。

### 在内联编辑器中

DHTMLX Gantt 支持网格单元格的 [Inline Editing](guides/inline-editing.md)。在这个 React 封装中，你可以通过在 **column** 配置中指定一个编辑器对象，然后在 `inlineEditors` prop 中将编辑器名称映射到一个 React 组件来提供你自己的自定义编辑器。请看下面的示例。

定义一个基于 React 的内联编辑器组件：

~~~jsx
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
                value={value}
                onChange={e => setValue(e.target.value)}
                autoFocus
            />
        );
    }
);

export default MyInlineEditor;
~~~

在你的 Gantt 配置中使用自定义编辑器：

~~~jsx
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
      config={config}
      inlineEditors={{
        customInputEditor: MyInlineEditor  /*!*/
      } }
      tasks={[/*...*/]}
      links={[/*...*/]}
    />
  );
}
~~~

当用户双击列单元格时，Gantt 将在原地显示你的编辑器组件。封装器内部的代码会调用你通过 `useImperativeHandle(ref, ...)` 暴露的方法（如 getValue、setValue 等），确保 Gantt 实例与组件中的变更保持同步。

编辑器对象的 `type` 值必须与 `inlineEditors` 中的键对应。

`map_to` 属性指定编辑器将读取并写入 Task 对象中的哪一个属性。请参阅覆盖或扩展内置 Lightbox 的相关文章以获取进一步细节。

如果你实现一个编辑器，使其不仅仅是向任务对象的某个属性写入值，而是执行更复杂的逻辑，则需要在 **save** 函数中实现必需的逻辑，并将输入的 `map_to` 选项设为 **"auto"**。在这种情况下，Gantt 不会修改任务对象，而是在需要应用编辑器更改时调用 save 函数。编辑器的 `initialValue` 将作为 `null` 传递。

:::note  
你可以通过 config 属性的 [editor_types](guides/inline-editing.md#custominlineeditor) 来定义非 React 的内联编辑器。  
:::  

#### 编辑器组件属性

- <span class="subproperty">**initialValue**</span> - (*any*) - 编辑器的初始值  
- <span class="subproperty">**task**</span> - (*Task*) - 正在编辑的任务  
- <span class="subproperty">**save**</span> - (*function*) - 指示 Gantt 保存并关闭编辑器的函数  
- <span class="subproperty">**cancel**</span> - (*function*) - 指示 Gantt 关闭编辑器但不保存  
- <span class="subproperty">**ganttInstance**</span> - (*GanttStatic*) - 底层 Gantt 对象的当前实例  

## 过滤

使用 `filter` prop 指定应该显示的任务的过滤条件：

~~~jsx
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
    filter={filter}
    ...
  />
);

~~~

要在 [Resource Panel](guides/resource-management.md) 中过滤资源，请使用 `resourceFilter` prop：

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
    ref={ganttRef}
    tasks={tasks}
    links={links}
    resources={resources}
    resourceFilter={resourceFilter}
    config={config}
    templates={templates}
    plugins={{auto_scheduling: true }}
  />
);
~~~

## 工作日历

要在 **ReactGantt** 中启用工作时间计算，请确保开启 [work_time](api/config/work_time.md)：

~~~js
  const config: GanttConfig = {
    ...
    work_time: true
  };
~~~

工作日历可以通过 `calendars` prop 传递给 **ReactGantt**：

~~~jsx
const calendars: Calendar[] = [
  {
    id: "global",
    hours: ["8:00-12:00", "13:00-17:00"], // 工作日全球工作时间
    days: {
      weekdays: {
        0: false, // 0 = Sunday，6 = Saturday
        1: true,
        2: true,
        3: true,
        4: true,
        5: true,
        6: false
      },
      dates: {
        "2025-04-06": true,  // 为特定日期覆盖工作时间
        "2025-04-08": false
      }
    }
  }
];

return (
  <div style={{height: '100%', display: 'flex', flexDirection: 'column' }}>
    <ReactGantt
      ...
      calendars={calendars}
      ...
    />
  </div>
);
~~~

为了在 Gantt 时间线中突出显示工作时间或进行工作时间计算，你可以使用提供的 `useWorkTime` 钩子：

~~~jsx
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
      hours: ["8:00-12:00", "13:00-17:00"], // 全局工作时间
      days: {
        weekdays: {
          0: false, // 0 = Sunday
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
    <div style={{height: '100%', display: 'flex', flexDirection: 'column' }}>
      <ReactGantt
        ...
        calendars={calendars}
        templates={templates}
        config={config}
        ref={ganttRef}
      />
    </div>
  );
};

~~~

或者，你可以访问 [inner Gantt object](#accessingtheunderlyingganttapi) 并直接使用 [working time](guides/working-time.md) 方法。

## 任务分组 {#groupingtasks}

使用 `groupTasks` prop 可以按任务的任一属性对任务进行分组：

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
    ref={ganttRef}
    tasks={tasks}
    links={links}
    groupTasks={grouping}
  />
);
~~~

要禁用分组，将 `groupTasks` 设置为 `false`：

~~~js
setGrouping(false);
~~~


## 时间线区域的垂直标记

可以通过 `markers` 属性向 **ReactGantt** 添加 [Vertical markers](guides/markers.md)：

~~~jsx
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
        markers={markers}
        ...
      />
    </div>
  );
~~~

:::note  
请注意，Marker 对象的 **text** 属性可以是 HTML 字符串或 React Element  
:::

## 访问底层 Gantt API {#accessingtheunderlyingganttapi}

在绝大多数情况下，ReactGantt 的 props 已足以配置你的图表。然而，有时你需要直接访问 DHTMLX Gantt API 以执行高级操作（例如工作时间计算、gantt.showDate、gantt.unselectTask、或自定义缩放等）。

### 使用内置钩子

ReactGantt 提供现成的钩子，暴露 Gantt API 的某些方法。请查看相关文档 [](integrations/react/configuration-props.md)。

### 使用引用（Ref）

当声明式 props 和内置钩子不足以满足需求时，封装器允许使用 `ref` 访问内部 Gantt 实例：

~~~js
import React, { useRef, useEffect } from 'react';
import ReactGantt, { ReactGanttRef } from '@dhx/react-gantt';

export function DirectRefExample({ tasks, links }) {
  const ganttRef = useRef<ReactGanttRef>(null);

  useEffect(() => {
    const gantt = ganttRef.current?.instance;
    if (!gantt) return;

    // 在这里你可以调用任何 Gantt API 方法
    console.log('All tasks:', gantt.getTaskByTime());
    gantt.showDate(new Date());
  }, []);

  return (
    <ReactGantt
      ref={ganttRef}
      tasks={tasks}
      links={links}
    />
  );
}
~~~

请参阅 DHTMLX Gantt 的 [API Reference](api/overview/methods-overview.md) 获取完整的方法清单。

#### 避免与 React props 冲突

- 如果你从代码中手动调用 `gantt.parse({ tasks, links })` 或 `gantt.addTask()`，请注意你可能需要让 React 的 props 保持同步。否则，下一次 React 重新渲染时，可能会覆盖你手动的修改。
- 推荐的方法是依赖封装器的任务与链接 props，或在你的 React 状态中进行管理。然后让封装器处理重新解析。

## 与 SSR 框架（Next.js、Remix）的兼容性

:::note  
自 ReactGantt v9.0.12 起，封装器已具备 SSR 就绪能力。你可以在 Next.js 或 Remix 中直接使用，无需关闭 SSR。如果你使用的是较早版本——你必须在使用 ReactGantt 的任何路由或组件上禁用或延迟服务端渲染。  
:::  

:::note  
在服务器渲染期间，组件只输出一个占位 `<div>`，实际的 Gantt 标记在浏览器端 hydration 阶段创建。  
:::  

#### Next.js

ReactGantt 具有 SSR 兼容性，但在大多数实际场景中，你自己的组件必须是客户端组件。

你需要在组件顶部添加 `"use client"`，当你使用引用（ref）访问 Gantt 实例、传递事件处理程序或回调、从模板返回 React 元素时，这个标记尤其重要。

这是一个典型配置：

~~~jsx
'use client';

import "@dhx/react-gantt/dist/react-gantt.css";
import ReactGantt from '@dhx/react-gantt';

export default function GanttPage() {
  return (
    <div style={{ height: '100vh' }}>
      <ReactGantt tasks={/* ... */} links={/* ... */} />
    </div>
  );
}
~~~

如果你使用的是较旧版本（v9.0.11 或更早），你需要在客户端动态导入你的 ReactGantt 组件并禁用 SSR：

~~~jsx
import dynamic from 'next/dynamic';

const GanttDemo = dynamic(() => import('../components/GanttDemo'), {
  ssr: false
});

export default function GanttPage() {
  return (
    <div style={{ height: '100vh' }}>
      <GanttDemo />
    </div>
  );
}
~~~


#### Remix

从 v9.0.12 起，不再需要 `<ClientOnly>` 包裹：

~~~js

import "@dhx/react-gantt/dist/react-gantt.css";
import ReactGantt from '@dhx/react-gantt';

export default function GanttPage() {
  return (
    <div style={{ height: '100vh' }}>
      <ReactGantt tasks={/* ... */} links={/* ... */} />
    </div>
  );
}
~~~


如果你使用的是较旧版本（v9.0.11 或更早），你需要在客户端有条件地渲染 Gantt 组件：

~~~jsx
import { ClientOnly } from 'remix-utils/client-only';
import ReactGantt from '@dhx/react-gantt';

export default function GanttPage() {

  return (
    <div style={{height: '100vh' }}>
      <ClientOnly fallback={<p>Loading...</p>}>
        {() => <ReactGantt
          tasks={/* ... */}
          links={/* ... */}
        />}
      </ClientOnly>
    </div>
  );
}
~~~  

## 下一步

- 如需了解更多关于如何配置 ReactGantt 的信息，请参阅 [本文章](integrations/react/configuration-props.md)  
- 如需高级用法，请参阅 [DHTMLX Gantt 文档](guides.md)
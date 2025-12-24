---
title: "dhtmlxGantt 与 React 集成"
sidebar_label: "底层集成"
---

# dhtmlxGantt 与 React 集成


:::note
本教程演示如何在 React 应用中使用 JS 版本的 DHTMLX Gantt。如需了解官方 React Gantt 组件，请参阅 [React Gantt](integrations/react.md) 文章。
:::

在学习本指南前，建议您具备 [React](https://react.dev/) 的基本概念和模式。如果您是 React 新手，可以先阅读 [React 文档](https://reactjs.org/docs/getting-started.html) 以获得入门指导。

DHTMLX Gantt 与 React 配合良好。您可以在 GitHub 上找到相关示例:[DHTMLX Gantt with React Demo](https://github.com/DHTMLX/react-gantt-demo)。

## 创建项目

在创建新项目之前，请确保已安装 [Node.js](https://nodejs.org/en/)。

要快速搭建一个基础的 React 项目，请运行以下命令:

~~~
npx create-vite my-react-gantt-app --template react
~~~

### 安装依赖

接下来，进入您的项目文件夹。假设项目名为 **my-react-gantt-app**，请执行:

~~~
cd my-react-gantt-app
~~~

然后安装依赖并启动开发服务器。根据您的包管理器，选择以下命令:

- 使用 **yarn**:

~~~
yarn install
yarn dev
~~~

- 使用 **npm**:

~~~
npm install
npm run dev
~~~

您的 React 应用现在应可通过 [http://localhost:5173](http://localhost:5173) 访问。

![Gantt React app running](/img/gantt_react_app_run.png)

## 创建 Gantt

接下来，我们获取 DHTMLX Gantt 的代码。首先，在终端按 **Ctrl+C** 停止正在运行的应用。然后安装 Gantt 包。

## 步骤 1. 安装包

库的 PRO 版本可通过 **npm/yarn** 从我们的私有仓库获取。请按照
[此说明](guides/installation.md#npmpinggubanyuzhuanyeban) 获取访问权限。

获得 Evaluation 版本后，使用以下命令进行安装:

- 使用 npm:

~~~
npm install @dhx/trial-gantt
~~~

- 使用 yarn:

~~~
yarn add @dhx/trial-gantt
~~~

另外，由于库的 zip 包结构为 **npm** 模块，您也可以
[从本地文件夹安装](guides/installation.md#installfromlocalfolder)。

## 步骤 2. 创建组件

现在，创建一个 React 组件，将 Gantt 集成到您的应用中。在 ***src/*** 目录下添加新文件 ***Gantt.jsx***。

### 引入源文件

打开 ***Gantt.jsx*** 并引入 Gantt 源文件。注意以下内容:

- 如果您是从本地文件夹安装 Gantt 包，您的引入方式如下:

**Gantt.jsx**
~~~
import { Gantt} from "dhtmlx-gantt";
import "dhtmlx-gantt/codebase/dhtmlxgantt.css";
~~~ 

- 如果您安装的是 trial 版本，请使用以下路径引入:

**Gantt.jsx**
~~~
import { Gantt} from "@dhx/trial-gantt";
import "@dhx/trial-gantt/codebase/dhtmlxgantt.css";
~~~

本指南将使用 **trial** 版本。

### 设置容器并添加 Gantt

要在页面上渲染 Gantt，需要一个容器元素。***Gantt.jsx*** 文件应包含以下内容:

**Gantt.jsx**
~~~
import { useEffect, useRef } from "react"; /*!*/
import { Gantt } from "@dhx/trial-gantt";
import "@dhx/trial-gantt/codebase/dhtmlxgantt.css";

export default function GanttView() { /*!*/
  let container = useRef(); /*!*/

  useEffect(() => { /*!*/
    let gantt = Gantt.getGanttInstance(); /*!*/
    gantt.init(container.current); /*!*/

    return () => { /*!*/
      gantt.destructor(); /*!*/
      container.current.innerHTML = ""; /*!*/
    }; /*!*/
  }, []); /*!*/

  return <div ref="{container}" style="{" {width: "100%", height: "100%"} }></div>; /*!*/
} /*!*/
~~~

## 步骤 3. 将 Gantt 添加到应用中

接下来，将 Gantt 组件引入到您的应用中。打开 ***src/app.jsx*** 并替换默认内容为:

**src/app.jsx**
~~~
import Gantt from "./Gantt";

function App() {
  return <Gantt/>;
}

export default App;
~~~

为确保 Gantt 容器填满整个页面主体，请删除 ***src/*** 下 ***index.css*** 的默认样式，并添加:

**src/index.css**
~~~
html,
body,
#root {
  height: 100%;
  padding: 0;
  margin: 0;
}
~~~

重新启动应用后，您将看到页面上显示一个空的 Gantt 图表:

![Gantt React init](/img/gantt_init.png)

## 步骤 4. 提供数据

要在 Gantt 中展示任务，需要提供数据集。在 ***src/*** 下创建 ***data.js*** 文件，内容如下:

**src/data.js**
~~~
export function getData() {
  const tasks = {
    data: [
      {
        id: "10",
        text: "Project #1",
        start_date: "01-04-2025",
        duration: 3,
        order: 10,
        progress: 0.4,
        open: true,
      },
      {
        id: "1",
        text: "Task #1",
        start_date: "01-04-2025",
        duration: 1,
        order: 10,
        progress: 0.6,
        parent: "10",
      },
      {
        id: "2",
        text: "Task #2",
        start_date: "02-04-2025",
        duration: 2,
        order: 20,
        progress: 0.6,
        parent: "10",
      },
    ],
    links: [{ id: 1, source: 1, target: 2, type: "0" }],
  };
  return tasks;
}
~~~

在 ***App.jsx*** 中，将此数据作为 props 传递给 Gantt 组件:

**App.jsx**
~~~
import Gantt from "./Gantt";
import { getData } from "./data.js";

function App() {
  return <Gantt tasks="{getData()}" />;
}

export default App;
~~~

然后，在 Gantt 组件内通过 **gantt.parse()** 方法使用该 props:

**Gantt.jsx**
~~~
import { useEffect, useRef } from "react";
import { Gantt } from "@dhx/trial-gantt";
import "@dhx/trial-gantt/codebase/dhtmlxgantt.css";

export default function GanttView(props) {
  let container = useRef();

  useEffect(() => {
    let gantt = Gantt.getGanttInstance();
    gantt.init(container.current);
    gantt.parse(props.tasks); /*!*/

    return () => {
      gantt.destructor();
      container.current.innerHTML = "";
    };
  }, []);

  return <div ref="{container}" style="{" {width: "100%", height: "100%"} }></div>;
}
~~~

重新加载应用后，您将看到 Gantt 图表已经填充了任务数据:

![Gantt tasks](/img/gantt_tasks.png)

## 步骤 5. 保存数据

要处理 Gantt 中的更改，可以使用 [dataProcessor](api/method/dataprocessor.md) 实现与后端的通信。dataProcessor 可以定义为函数或路由对象。dhtmlxGantt 支持 handler 返回 Promise，以便正确处理操作。

通过 **createDataProcessor()** 创建 **DataProcessor** 并监听更改，如下所示:

~~~
gantt.createDataProcessor(function(entity, action, data, id) {​
    gantt.message(`${​entity} ${​action}`);
});
~~~

如果后端在创建记录后分配了新的 id（常见行为），确保 Promise 返回的对象包含 **(id: databaseId)** 或 **(tid: databaseId)**，以便 Gantt 能正确更新记录。更多信息请参阅 [server side integration](guides/server-side.md)。

至此，您的 React Gantt 已准备就绪。欢迎在 GitHub 上查看完整演示:[https://github.com/DHTMLX/react-gantt-demo](https://github.com/DHTMLX/react-gantt-demo)。

## XSS、CSRF 和 SQL 注入攻击

请注意，Gantt 本身不负责防护 SQL 注入、XSS 或 CSRF 等安全威胁。确保应用安全是后端开发者的责任。

请参考 [Application Security](guides/app-security.md) 文章，了解常见漏洞及提升应用安全性的建议。

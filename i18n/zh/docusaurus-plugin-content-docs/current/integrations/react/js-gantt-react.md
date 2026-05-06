---
title: dhtmlxGantt 与 React
sidebar_label: 低级集成
description: "在不使用包装器的情况下在 React 中使用 Gantt 的逐步指南"
---

# dhtmlxGantt 与 React

:::note
本教學介紹如何在 React 應用中使用 JS DHTMLX Gantt 元件。如果您想使用官方的 React Gantt 元件，請參閱 [React Gantt](integrations/react.md) 文章。
:::

要使用本文档，你应熟悉 [React](https://react.dev/) 的基本概念和模式。如果你还不熟悉，请参考 [React 文档](https://react.dev/learn) 以获取入门教程。

DHTMLX Gantt 与 React 兼容。你可以在 GitHub 上查看相应的示例：[DHTMLX Gantt with React Demo](https://github.com/DHTMLX/react-gantt-demo)。

## 创建一个项目

在开始创建新项目之前，请先安装 [Node.js](https://nodejs.org/en/)。

你可以通过以下命令创建一个基本的 React 项目：

~~~
npx create-vite my-react-gantt-app --template react
~~~

### 依赖安装

接下来你应该进入应用目录。让我们把项目命名为 **my-react-gantt-app** 并运行：

~~~
cd my-react-gantt-app
~~~

之后你应该安装依赖并启动开发服务器。为此，需要使用包管理器：

- 如果你使用 **yarn**，需要执行以下命令：

~~~
yarn install
yarn dev
~~~

- 如果你使用 **npm**，需要执行以下命令：

~~~
npm install
npm run dev
~~~

现在你的 React 项目应该在 **http://localhost:5173** 运行。

![Gantt React app running](/img/gantt_react_app_run.png)

## 创建 Gantt

现在我们应该获取 DHTMLX Gantt 的代码。首先，在命令行中按下 **Ctrl+C** 以停止应用程序。然后我们可以继续安装 Gantt 包。

## 第一步。包安装

Gantt 库的 PRO 版本可通过我们的私有仓库以 **npm/yarn** 方式安装，请按照 [本说明](guides/installation.md#npmevaluationandproversions) 以获取访问权限。

在获得 Gantt 的评估版后，可以使用以下命令进行安装：

- 对于 npm：

~~~
npm install @dhx/trial-gantt
~~~

- 对于 yarn：

~~~
yarn add @dhx/trial-gantt
~~~

另外，由于库的 zip 包被结构化为一个 **npm** 模块，你也可以 [从本地文件夹安装](guides/installation.md#installfromlocalfolder)。

## 第二步。创建组件

现在我们应该创建一个 React 组件，将 Gantt 添加到应用中。让我们在 ***src/*** 目录下创建 ***Gantt.jsx*** 文件。

### 导入源文件

打开新创建的 ***Gantt.jsx*** 文件并导入 Gantt 的源文件。请注意：

- 如果你已从本地文件夹安装了 Gantt 包，你的导入路径将如下所示：

~~~js title="Gantt.jsx"
import { Gantt} from "dhtmlx-gantt";
import "dhtmlx-gantt/codebase/dhtmlxgantt.css";
~~~ 

- 如果你选择安装试用版，导入路径应为如下所示：

~~~js title="Gantt.jsx"
import { Gantt} from "@dhx/trial-gantt";
import "@dhx/trial-gantt/codebase/dhtmlxgantt.css";
~~~

在本教程中，我们将使用 **trial** 版本的 Gantt。

### 设置容器并添加 Gantt

要在页面上显示 Gantt，我们需要设置容器以在其中渲染该组件。***Gantt.jsx*** 文件应包含以下代码：

~~~js title="Gantt.jsx"
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

## 第三步。将 Gantt 添加到应用中

现在是将组件添加到应用中的时机。打开 ***src/app.jsx***，使用 Gantt 组件替代默认内容，并插入以下代码：


~~~js title="src/app.jsx"
import Gantt from "./Gantt";

function App() {
  return <Gantt/>;
}

export default App;
~~~

为了让 Gantt 容器占据页面的全部空间，你需要从 ***src/*** 文件夹中的 ***index.css*** 删除默认样式，并添加以下样式：


~~~css title="src/index.css"
html,
body,
#root {
  height: 100%;
  padding: 0;
  margin: 0;
}
~~~

之后启动应用时，页面上应该会看到一个空的 Gantt：

![Gantt React init](/img/gantt_init.png)

## 第四步。提供数据

要向 Gantt 添加数据，我们需要提供一个数据集。让我们在 ***src/*** 目录下创建 ***data.js*** 文件并添加一些数据：


~~~js title="src/data.js"
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

我们应该对 Gantt 组件在 ***App.jsx*** 传递 props（我们的数据）：

~~~js title="Gantt.jsx"
import Gantt from "./Gantt";
import { getData } from "./data.js";

function App() {
  return <Gantt tasks="{getData()}" />;
}

export default App;
~~~

并在 Gantt 组件中的 **gantt.parse()** 方法使用这些 props：

~~~js title="Gantt.jsx"
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

现在如果你重新打开应用页面，你应该能看到带有任务的 Gantt：

![Gantt tasks](/img/gantt_tasks.png)

## 第五步。保存数据

要捕捉 Gantt 中的变更，你可以使用 [dataProcessor](api/method/dataprocessor.md) 处理程序，它允许与服务器端后端进行“通信”。处理程序既可以声明为一个函数，也可以声明为一个路由对象。dhtmlxGantt 接受来自处理程序的 Promise 响应，因此你的 Gantt 将正确处理操作的完成。

你可以通过 **createDataProcessor()** API 方法创建一个 **DataProcessor**，并这样捕捉变更：

~~~
gantt.createDataProcessor(function(entity, action, data, id) {​
    gantt.message(`${​entity} ${​action}`);
});
~~~

如果你的服务在创建新记录后更改了任务 id（通常会这样做），请确保 Promise 返回一个对象，其结果为 **(id: databaseId)** 或 **(tid: databaseId)**，以便 Gantt 能将新的数据库 id 应用于记录。有关服务器端的更多信息，请参阅 [服务器端指南](guides/server-side.md)。

好了，React Gantt 已就绪，欢迎在 GitHub 上查看完整演示： [完整演示](https://github.com/DHTMLX/react-gantt-demo)。

## XSS、CSRF 与 SQL 注入攻击

请注意，Gantt 并不提供防止应用程序免受各种威胁的手段，例如 SQL 注入、XSS 与 CSRF 攻击。确保应用安全的责任在于实现后端的开发人员。

请查看 [应用程序安全](guides/app-security.md) 文章，了解组件最易受到攻击的点以及你可以采取的措施来提高应用的安全性。
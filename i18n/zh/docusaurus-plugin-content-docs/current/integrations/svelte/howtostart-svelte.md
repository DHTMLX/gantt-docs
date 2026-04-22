---
title: "dhtmlxGantt 与 Svelte"
sidebar_label: "Svelte"
---

# dhtmlxGantt 与 Svelte

要使用本教程，您需要熟悉 Svelte 的基本概念和模式。如果您还不熟悉，请参考 [Svelte 文档](https://svelte.dev/) 的入门教程。

DHTMLX Gantt 与 Svelte 兼容。您可以在 GitHub 上查看对应示例：[DHTMLX Gantt with Svelte Demo](https://github.com/DHTMLX/svelte-gantt-demo)。

## 创建项目

在开始创建新项目之前，安装 [Vite](https://vite.dev/)（可选）和 [Node.js](https://nodejs.org/en/)。

要创建一个 Svelte 项目，我们将使用 Svelte 与 Vite，并运行以下命令：

~~~
npm create vite@latest
~~~

有关详细信息，请参阅 [相关文章](https://svelte.dev/docs/svelte/overview)。

### 依赖项安装

接下来应进入应用目录。将我们的项目命名为 **gantt-svelte**，选择 **svelte** 选项，然后运行：

~~~
cd gantt-svelte
~~~

之后应安装依赖并运行应用。为此，您需要使用包管理器：

- 如果您使用 **yarn**，请执行以下命令：

~~~
yarn install
yarn dev
~~~

- 如果您使用 **npm**，请执行以下命令：

~~~
npm install
npm run dev
~~~

现在，您的 Svelte 项目应在 **http://localhost:5173** 运行。

![Gantt Svelte app running](/img/gantt_svelte_app_run.png)

## 创建 Gantt

现在我们应获取 DHTMLX Gantt 代码。首先，在命令行中按下 **Ctrl+C** 停止应用。
然后可以继续安装 Gantt 包。

## 步骤 1. 包安装

Gantt 库的专业版可通过私有仓库的 **npm/yarn** 安装获得，请按照 [此说明](guides/installation.md#npmevaluationandproversions) 以获取访问权限。

获得 Gantt 的评估版本后，可以使用以下命令进行安装：

- 对于 npm：

~~~
npm install @dhx/trial-gantt
~~~

- 对于 yarn：

~~~
yarn add @dhx/trial-gantt
~~~

或者，由于库的 zip 包结构为一个 **npm** 模块，您可以 [从本地文件夹安装](guides/installation.md#installfromlocalfolder)。

## 步骤 2. 组件创建

现在应创建一个 Svelte 组件，将 Gantt 添加到应用中。让我们在 ***src/*** 目录中新建一个文件并命名为 ***Gantt.svelte***。

### 导入源文件

打开新创建的 ***Gantt.svelte*** 文件并导入 Gantt 源文件。请注意：

- 如果您从本地文件夹安装了 Gantt 包，您的导入路径将如下所示：

~~~js title="Gantt.svelte"
import { Gantt} from "dhtmlx-gantt";
import "dhtmlx-gantt/codebase/dhtmlxgantt.css";
~~~

- 如果您选择安装试用版，导入路径应为：

~~~js title="Gantt.svelte"
import { Gantt} from "@dhx/trial-gantt";
import "@dhx/trial-gantt/codebase/dhtmlxgantt.css";
~~~

在本教程中，我们将使用 **trial** 版本的 Gantt。

### 设置容器并添加 Gantt

要在页面上显示 Gantt，我们需要设置容器以在其中渲染组件。请查看下面的代码：

~~~html title="Gantt.svelte"
<script>
    import "@dhx/trial-gantt/codebase/dhtmlxgantt.css";
    import { onMount } from "svelte";
    import { Gantt } from "@dhx/trial-gantt";
      
    let container;
    onMount(() => {
        let gantt = Gantt.getGanttInstance();
        gantt.init(container);

        return () => {
            gantt.destructor();
        };
    });
</script>

<div bind:this="{container}" style="width: 100%; height: 100%;"></div>
~~~

要让 Gantt 容器占满 body 的整个空间，您需要移除 ***src/*** 文件夹中的默认样式并添加以下样式：

~~~css title="src/app.css"
body, #app {
  margin: 0;
  padding: 0;
  height: 100vh;
  width: 100%;
}
~~~

## 步骤 3. 将 Gantt 添加到应用中

现在是将组件添加到应用中的时刻。打开 ***src/App.svelte***，通过插入以下代码来用 Gantt 组件替换默认内容：

~~~js title="src/App.svelte"
<script>
  import Gantt from "./Gantt.svelte";
</script>

<Gantt/>
~~~

之后，当启动应用时，页面将显示一个空的 Gantt：

![Gantt Svelte init](/img/gantt_init.png)

## 步骤 4. 提供数据

要向 Gantt 添加数据，我们需要提供一个数据集。让我们在 ***src/*** 目录中创建 ***data.js*** 文件并添加一些数据：

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

我们应在 **App.svelte** 文件中 [传递 props（我们的数据）](https://svelte.dev/tutorial/svelte/declaring-props) 给 Gantt 组件：

~~~html title="App.svelte"
<script>
  import Gantt from "./Gantt.svelte";
  import { getData } from "./data.js";
</script>

<Gantt tasks="{getData()}" />
~~~

并在 Gantt 组件中的 **gantt.parse()** 方法中使用这些 props：

~~~html title="Gantt.svelte"
<script>
    import "@dhx/trial-gantt/codebase/dhtmlxgantt.css";
    import { onMount } from "svelte";
    import { Gantt } from "@dhx/trial-gantt";
    
    export let tasks;
    
    let container;
    onMount(() => {
        let gantt = Gantt.getGanttInstance();
        gantt.init(container);
        gantt.parse(tasks);

        return () => {
            gantt.destructor();
        };
    });
</script>

<div bind:this="{container}" style="width: 100%; height: 100%;"></div>
~~~

现在，如果重新打开应用页面，您应该会看到带有任务的 Gantt：

![Gantt tasks](/img/gantt_tasks.png)

## 步骤 5. 保存数据

要捕获在 Gantt 中所做的更改，您可以使用一个 [dataProcessor](api/method/dataprocessor.md) 处理程序来与服务器端后端进行“通信”。处理程序可以声明为函数，也可以声明为路由对象。dhtmlxGantt 接受来自处理程序的 Promise 响应，因此您的 Gantt 将正确处理操作完成。

您可以通过 API 方法 **createDataProcessor()** 创建一个 **DataProcessor** 并这样捕获更改：

~~~
gantt.createDataProcessor(function(entity, action, data, id) {​
    gantt.message(`${​entity} ${​action}`);
});
~~~

如果在创建新记录后服务更改了任务 id（通常会这样），请确保您的 Promise 返回一个对象，其结果为 **(id: databaseId)** 或 **(tid: databaseId)**，以便 Gantt 将新的数据库 id 应用于记录。有关服务器端的更多信息，请参阅 [服务器端指南](guides/server-side.md)。

好了，Svelte Gantt 已就绪，欢迎在 GitHub 上查看完整演示：[在 GitHub 上查看完整演示](https://github.com/DHTMLX/svelte-gantt-demo)。

## XSS、CSRF 与 SQL 注入攻击

请注意，Gantt 不提供任何防止应用程序免受各种威胁的手段，例如 SQL 注入、XSS 与 CSRF 攻击。确保应用程序安全的责任在于实现后端的开发人员。

请查看 [应用程序安全性](guides/app-security.md) 文章，以了解组件最易受到攻击的点以及可采取的措施来提高应用程序的安全性。
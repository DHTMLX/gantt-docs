---
title: "dhtmlxGantt 与 Svelte 集成"
sidebar_label: "Svelte"
---

# dhtmlxGantt 与 Svelte 集成


本指南假设你已具备 Svelte 的基本概念和使用模式。如果还不熟悉，可以参考 [Svelte 官方文档](https://svelte.dev/) 的入门教程。

DHTMLX Gantt 与 Svelte 配合良好。你可以在 GitHub 上查看完整示例:[DHTMLX Gantt with Svelte Demo](https://github.com/DHTMLX/svelte-gantt-demo)。

## 创建项目

在开始新项目之前，建议先安装 [Vite](https://vite.dev/)（可选）和 [Node.js](https://nodejs.org/en/)。

我们将通过 Vite 来搭建 Svelte 项目。请运行以下命令:

~~~
npm create vite@latest
~~~

更多详细内容可参考 [相关文档](https://svelte.dev/docs/introduction#start-a-new-project-alternatives-to-sveltekit)。

### 安装依赖

接下来，进入你的应用目录。假设项目名为 **gantt-svelte**，并选择 **svelte** 选项。然后运行:

~~~
cd gantt-svelte
~~~

现在使用你喜欢的包管理器安装依赖并启动应用:

- 对于 **yarn**，执行:

~~~
yarn install
yarn dev
~~~

- 对于 **npm**，执行:

~~~
npm install
npm run dev
~~~

此时，Svelte 项目应已在 [http://localhost:5173](http://localhost:5173) 运行。

![Gantt Svelte app running](/img/gantt_svelte_app_run.png)

## 创建 Gantt

要添加 DHTMLX Gantt，首先在终端按 **Ctrl+C** 停止应用，然后安装 Gantt 组件包。

## 步骤 1. 安装包

PRO 版本的库可通过我们的私有仓库使用 **npm/yarn** 安装。请按照
[此说明](guides/installation.md#npmpinggubanyuzhuanyeban) 获取访问权限。

获得 Evaluation 版本后，使用以下命令安装:

- 使用 npm:

~~~
npm install @dhx/trial-gantt
~~~

- 使用 yarn:

~~~
yarn add @dhx/trial-gantt
~~~

或者，由于库的 zip 包结构为 **npm** 模块，你也可以
[从本地文件夹安装](guides/installation.md#installfromlocalfolder)。

## 步骤 2. 创建组件

接下来，创建一个 Svelte 组件用于在应用中集成 Gantt。在 ***src/*** 文件夹下新建 ***Gantt.svelte*** 文件。

### 导入源文件

打开 ***Gantt.svelte*** 并导入 Gantt 源文件。注意:

- 如果你是从本地文件夹安装的 Gantt 包，导入方式如下:

**Gantt.svelte**
~~~
import { Gantt} from "dhtmlx-gantt";
import "dhtmlx-gantt/codebase/dhtmlxgantt.css";
~~~

- 如果你安装的是 trial 版本，导入方式如下:

**Gantt.svelte**
~~~
import { Gantt} from "@dhx/trial-gantt";
import "@dhx/trial-gantt/codebase/dhtmlxgantt.css";
~~~

本文档以 **trial** 版本为例。

### 设置容器并添加 Gantt

要在页面上显示 Gantt，需要定义一个用于渲染组件的容器。示例如下:

**Gantt.svelte**
~~~html
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

如果希望 Gantt 容器填满整个页面，请在 ***src/*** 文件夹下的 ***app.css*** 中移除默认样式，并添加如下内容:

**src/app.css**
~~~
body, #app {
  margin: 0;
  padding: 0;
  height: 100vh;
  width: 100%;
}
~~~

## 步骤 3. 将 Gantt 加入应用

现在，将 Gantt 组件引入应用。在 ***src/App.svelte*** 中用以下内容替换默认内容:

**src/App.svelte**
~~~
<script>
  import Gantt from "./Gantt.svelte";
</script>

<Gantt/>
~~~

此时启动应用会显示一个空的 Gantt 图表:

![Gantt Svelte init](/img/gantt_init.png)

## 步骤 4. 提供数据

要为 Gantt 填充数据，新建 ***src/data.js*** 文件并添加如下内容:

**src/data.js**
~~~js
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

在 **App.svelte** 中将此数据作为 props 传递给 Gantt 组件:

**App.svelte**
~~~html
<script>
  import Gantt from "./Gantt.svelte";
  import { getData } from "./data.js";
</script>

<Gantt tasks="{getData()}" />
~~~

然后在 Gantt 组件中通过 **gantt.parse()** 使用该 props:

**Gantt.svelte**
~~~html
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

重新加载应用后，Gantt 图表将会显示任务数据:

![Gantt tasks](/img/gantt_tasks.png)

## 步骤 5. 数据保存

要跟踪 Gantt 中的数据变化，可以使用 [dataProcessor](api/method/dataprocessor.md) 处理器。它用于与后端通信，可以定义为函数或 router 对象。dhtmlxGantt 支持 Promise 响应，确保操作被正确处理。

通过 **createDataProcessor()** 创建 **DataProcessor**，捕获数据变更示例:

~~~
gantt.createDataProcessor(function(entity, action, data, id) {​
    gantt.message(`${​entity} ${​action}`);
});
~~~

如果后端在创建新记录后会更改任务 ID，确保 Promise 返回对象形如 **(id: databaseId)** 或 **(tid: databaseId)**，以便 Gantt 能正确更新记录。更多服务端集成细节见[这里](guides/server-side.md)。

至此，你的 Svelte Gantt 集成已准备就绪。欢迎在 GitHub 上查看完整演示:[https://github.com/DHTMLX/svelte-gantt-demo](https://github.com/DHTMLX/svelte-gantt-demo)。

## XSS、CSRF 和 SQL 注入攻击

需要注意，Gantt 本身不包含针对 SQL 注入、XSS 或 CSRF 等威胁的内置防护。保护应用免受这些风险是后端开发者的责任。

关于潜在安全漏洞和推荐安全实践，请参阅 [应用安全](guides/app-security.md) 文章。

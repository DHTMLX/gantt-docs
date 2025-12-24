---
title: "dhtmlxGantt 与 Vue.js 集成"
sidebar_label: "Vue.js"
---

# dhtmlxGantt 与 Vue.js 集成


本指南假设你已经具备了 [Vue](https://vuejs.org/) 的基本概念和使用模式。如果你是 Vue 新手，建议先查阅 [Vue 3 文档](https://vuejs.org/guide/introduction.html) 以快速入门。

DHTMLX Gantt 能很好地与 Vue 集成。你可以在 GitHub 上找到相关示例:[DHTMLX Gantt with Vue Demo](https://github.com/DHTMLX/vue-gantt-demo)。

## 创建项目

在开始新项目之前，请确保已经安装了 [Node.js](https://nodejs.org/en/)。

要创建一个 Vue 项目，请运行以下命令:

~~~
npm create vue@latest
~~~

该命令会安装并运行 **create-vue**，这是 Vue 官方的项目脚手架工具。更多细节可参考 [Vue.js 快速开始](https://vuejs.org/guide/quick-start.html#creating-a-vue-application)。

### 安装依赖

接下来，进入你的应用目录。假设项目名为 **gantt-vue**:

~~~
cd gantt-vue
~~~

然后使用你的包管理器安装依赖并启动开发服务器:

- 对于 **yarn**，运行:

~~~
yarn install
yarn dev
~~~

- 对于 **npm**，运行:

~~~
npm install
npm run dev
~~~

你的 Vue 项目现在应当运行在 [http://localhost:5173](http://localhost:5173)。

![Gantt Vue app running](/img/gantt_vue_app_run.png)

## 创建 Gantt

要将 DHTMLX Gantt 添加到项目中，首先在终端中按 **Ctrl+C** 停止正在运行的应用。然后继续安装 Gantt 包。

## 步骤 1. 安装包

该库的 PRO 版本可以通过 **npm/yarn** 从我们的私有仓库安装。请按照
[此说明](guides/installation.md#npmpinggubanyuzhuanyeban) 获取访问权限。

获得 Evaluation 版本后，可使用以下命令安装:

- 使用 npm:

~~~
npm install @dhx/trial-gantt
~~~

- 使用 yarn:

~~~
yarn add @dhx/trial-gantt
~~~

另外，由于该库的 zip 包结构为 **npm** 模块，你也可以
[从本地文件夹安装](guides/installation.md#installfromlocalfolder)。

## 步骤 2. 创建组件

创建一个 Vue 组件，将 Gantt 嵌入到你的应用中。在 ***src/components/*** 目录下新建文件 ***Gantt.vue***。

### 导入源文件

打开 ***Gantt.vue*** 并导入 Gantt 源文件。根据你的安装方式，导入方式有所不同:

- 如果你是从本地文件夹安装，使用:

**Gantt.vue**
~~~
import { Gantt} from "dhtmlx-gantt";
import "dhtmlx-gantt/codebase/dhtmlxgantt.css";
~~~

- 如果你安装的是 trial 版本，使用:

**Gantt.vue**
~~~
import { Gantt} from "@dhx/trial-gantt";
import "@dhx/trial-gantt/codebase/dhtmlxgantt.css";
~~~

本指南采用 **trial** 版本。

### 设置容器并添加 Gantt

为了在页面上渲染 Gantt，需要指定容器元素。如下所示:

**Gantt.vue**
~~~html
<script>
import { Gantt } from "@dhx/trial-gantt";
import "@dhx/trial-gantt/codebase/dhtmlxgantt.css";

export default {
  mounted() {
    let gantt = Gantt.getGanttInstance();
    gantt.init(this.$refs.cont);

    this.gantt = gantt;
  },
  unmounted() {
    this.gantt.destructor();
    this.$refs.cont.innerHTML = "";
  },
};
</script>

<template>
  <div ref="cont" style="width: 100%; height: 100%"></div>
</template>
~~~

若需让 Gantt 容器填满整个 body，请移除 ***src/assets*** 下 ***main.css*** 的默认样式，并添加:

**src/assets/main.css**
~~~
body, #app {
  margin: 0;
  padding: 0;
  height: 100vh;
  width: 100%;
}
~~~

## 步骤 3. 将 Gantt 添加到应用

接下来，将 Gantt 组件引入到应用中。打开 ***src/App.vue***，用以下内容替换默认内容:

**src/App.vue**
~~~html
<script>
import Gantt from "./components/Gantt.vue";

export default {
  components: { Gantt }
};
</script>

<template>
  <Gantt/>
</template>
~~~

启动应用后，你会看到一个空的 Gantt 显示:

![Gantt Vue init](/img/gantt_init.png)

## 步骤 4. 提供数据

要在 Gantt 中显示任务，需要提供数据集。在 ***src/*** 目录下创建 ***data.js*** 文件，并填入以下数据:

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

在 ***App.vue*** 中，将该数据作为 props 传递给 Gantt 组件:

**App.vue**
~~~html
<script>
import Gantt from "./components/Gantt.vue";
import { getData } from "./data";

export default {
  components: { Gantt },
  data() {
    return {
      tasks: getData(),
    };
  },
};
</script>

<template>
  <Gantt :tasks="tasks" />
</template>
~~~

然后在 Gantt 组件中，使用 **gantt.parse()** 处理这些 props:

**Gantt.vue**
~~~html
<script>
import { Gantt } from "@dhx/trial-gantt";
import "@dhx/trial-gantt/codebase/dhtmlxgantt.css";

export default {
  props: ["tasks"],

  mounted() {
    let gantt = Gantt.getGanttInstance();
    gantt.init(this.$refs.cont);
    gantt.parse(this.tasks);

    this.gantt = gantt;
  },
  unmounted() {
    this.gantt.destructor();
    this.$refs.cont.innerHTML = "";
  },
};
</script>

<template>
  <div ref="cont" style="width: 100%; height: 100%"></div>
</template>
~~~

重新加载应用页面，现在你会看到带有任务的 Gantt:

![Gantt tasks](/img/gantt_tasks.png)

## 步骤 5. 保存数据

要追踪在 Gantt 中的更改，可以使用 [dataProcessor](api/method/dataprocessor.md) 处理器来管理与后端的通信。该处理器可以是一个函数或路由对象。dhtmlxGantt 支持 handler 返回 Promise，以确保操作完成时得到正确处理。

通过 **createDataProcessor()** 创建 **DataProcessor** 并捕获更改，如下所示:

~~~
gantt.createDataProcessor(function(entity, action, data, id) {​
    gantt.message(`${​entity} ${​action}`);
});
~~~

如果你的后端在创建新记录后会更改任务 ID（许多系统都这样），请确保你的 Promise 返回包含 **(id: databaseId)** 或 **(tid: databaseId)** 的对象。这样 Gantt 就能用新的数据库 ID 更新记录。更多详情请参阅 [服务端集成](guides/server-side.md)。

至此，你的 Vue Gantt 集成已完成。你可以在 GitHub 上查看完整 demo:[https://github.com/DHTMLX/vue-gantt-demo](https://github.com/DHTMLX/vue-gantt-demo)。

## XSS、CSRF 和 SQL 注入攻击

需要注意的是，Gantt 本身并不提供针对 SQL 注入、XSS 或 CSRF 等威胁的保护。确保应用安全是后端开发者的责任。

你可以参阅 [应用安全](guides/app-security.md) 文章，了解常见漏洞及如何增强应用防御能力。

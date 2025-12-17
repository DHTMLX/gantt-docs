---
title: "在服务器端使用 Gantt"
sidebar_label: "Node.js Gantt"
---

在服务器端使用 Gantt
=================================

有时，您可能需要单独使用 dhtmlxGantt 的专用逻辑，而不依赖于甘特图本身，例如:

- 从其他来源（如移动应用）接收任务更新，并运行自动调度以调整相关任务时间
- 处理多个用户同时进行更改，需要对日程进行同步和校验
- 使用服务器端代码进行计算和日程分析

为满足这些需求，dhtmlxGantt 提供了可在 Node.js 环境下运行的服务器端独立版本。

DHTMLX Gantt for Node.js 提供与 Commercial/Enterprise/Ultimate 套餐相同的功能，包括通过 **Gantt.getGanttInstance** 方法创建新的 gantt 实例。

使用条款
--------------

DHTMLX Gantt 的 Node.js 服务器端模块是客户端版本的附加组件。您可以在购买任何商业授权（[Individual](https://dhtmlx.com/docs/products/dhtmlxGantt/individual/)、[Commercial](https://dhtmlx.com/docs/products/dhtmlxGantt/commercial/)、[Enterprise](https://dhtmlx.com/docs/products/dhtmlxGantt/enterprise/)）时，额外付费添加该模块。[Ultimate](https://dhtmlx.com/docs/products/dhtmlxGantt/ultimate/) 授权默认包含此模块。

如果您已拥有主 dhtmlxGantt 库，可以[单独购买](https://store.payproglobal.com/checkout?currency=USD&products[1][id]=58429) Node.js 模块，并获取服务器端版本的下载链接。

版本管理
-------------------

dhtmlxGantt 的 Node.js 包采用与浏览器端相同的版本号规则（例如，v7.0.0 是 Node.js 的首个版本）。

:::note
建议在客户端和服务器端使用相同版本的 gantt 库。
:::

将库添加到项目中
----------------------------------

可以在本地安装 dhtmlxGantt for Node.js 包:

~~~js
"dependencies": {
    "@dhtmlx/gantt-node": "file:../../gantt_7.0.0_node"
    ...
}
~~~

或者，您也可以像下面这样直接在代码中引入 dhtmlxgantt.node.js:

~~~js
import { Gantt } from "@dhtmlx/gantt-node";

const gantt = Gantt.getGanttInstance({
    plugins:{
        auto_scheduling: true,
    },
    config: {
        work_time: true,
        duration_unit: "hour",
        auto_scheduling: true,
        auto_scheduling_strict: true,
        auto_scheduling_initial: false
    },
    data: {
        tasks: [
            { id: 1, text: "Project #1", type: "project", parent: 0 },
            { id: 2, start_date: "05-04-2020 00:00", text: "Task #1", duration: 1, 
            parent: 1, type: "task" },
            { id: 3, start_date: "05-04-2020 00:00", text: "Task #2", duration: 3, 
            parent: 1, type: "task" },
            { id: 4, start_date: "05-04-2020 00:00", text: "Task #3", duration: 3, 
            parent: 1, type: "task" },
            { id: 5, start_date: "05-04-2020 00:00", text: "Task #4", duration: 3, 
            parent: 1, type: "task" },
            { id: 6, start_date: "05-04-2020 00:00", text: "Task #5", duration: 1, 
            parent: 1, type: "task" }
        ], 
        links: [
            { id: 1, source: 1, target: 2, type: "0" },
            { id: 2, source: 2, target: 3, type: "0" },
            { id: 3, source: 3, target: 4, type: "0" },
            { id: 4, source: 4, target: 5, type: "0" },
            { id: 5, source: 5, target: 6, type: "0" }
        ]
    },
    events:{
        onAfterAutoSchedule: function(taskId, updatedTasks) {
            console.log("Following tasks were auto scheduled:");
            console.table(updatedTasks.map((taskId) => {
                return {
                    id: taskId,
                    text: this.getTask(taskId).text
                };
            }));
        },
        onParse: function() {
            console.log("Loaded data:")
            console.table(this.serialize().data);
        },
        onGanttReady: () => {
            console.log("Running dhtmlxGantt on the backend");
        }
    }
});

console.table(gantt.serialize());
~~~

限制
------------

dhtmlxGantt 的 Node.js 版本提供与浏览器端相同的核心 API。

但部分客户端方法在服务器端库中不可用或无效，包括:

- 不支持服务器端渲染。像 [gantt.render](api/method/render.md)、[gantt.refreshData](api/method/refreshdata.md)、[gantt.refreshTask](api/method/refreshtask.md) 等方法不会生成 HTML，但仍会触发相关的 API 事件，如 [onBeforeGanttRender](api/event/onbeforeganttrender.md) 和 [onGanttRender](api/event/onganttrender.md)。
- 不包含 [Popup messages API](guides/message-boxes.md)。如 gantt.message、gantt.alert 和 gantt.confirm 方法未定义。
- 内置的 ajax 助手未移植到 Node.js，因此 gantt ajax API、[gantt.load](api/method/load.md) 和默认的 dataProcessor 路由将无法使用。请改用 [gantt.parse](api/method/parse.md) 并实现[自定义 dataProcessor 路由](guides/server-side.md#zidingyiluyou)。

:::note
dhtmlxGantt for Node.js 的评估版功能有限，最多可加载 75 个任务或链接。
如加载的数据集超过此数量，仅处理前 75 条数据。
:::


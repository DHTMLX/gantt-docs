---
title: "在服务器上使用 dhtmlxGantt"
sidebar_label: "Node.js Gantt"
---

# 在服务器上使用 dhtmlxGantt

在某些情况下，您可能需要将 dhtmlxGantt 的专用逻辑单独用于甘特图之外的场景，例如：

- 当您从其他来源（例如移动应用）接收任务更新时，需要运行自动排程以更新相关任务的时间安排
- 当同一应用有多位用户同时进行修改时，您需要对日程进行同步和验证
- 当您需要在服务器端的代码中进行计算并分析日程

因此，我们提供一个可在 Node.js 环境中服务器端运行的独立构建版本的 dhtmlxGantt。

DHTMLX Gantt for Node.js 的功能与 Commercial/Enterprise/Ultimate 套件相同，这意味着可用的 **Gantt.getGanttInstance** 方法可以创建一个新的 gantt 实例。

## 使用条款

DHTMLX Gantt 的 Node.js 服务器模块作为 Gantt 客户端版本的附加包提供。因此，在购买 Gantt 的任一商业许可下，您可以支付额外费用添加 Node.js 构建；商业许可包括 [Individual]、[Commercial]、[Enterprise]。而 [Ultimate] 许可默认包含它。

如果您已经获得了 dhtmlxGantt 的主库，您可以单独 [购买 Node.js 模块]，我们将向您发送服务器端版本 Gantt 的链接。

## 版本控制

dhtmlxGantt 对 Node.js 包采用与浏览器包相同的版本编号方案（例如，v7.0.0 是 Node.js 包的第一个版本）。

:::note
我们建议在客户端和服务器端使用相同版本的 gantt 库。
:::

## 将库添加到项目中

您可以将 dhtmlxGantt for Node.js 作为本地包安装：

~~~js
"dependencies": {
    "@dhtmlx/gantt-node": "file:../../gantt_7.0.0_node"
    ...
}
~~~

或您也可以直接从代码中导入 dhtmlxgantt.node.js，如下所示：

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

## 限制

dhtmlxGantt 为 Node.js 提供了与浏览器版本相同的核心 API。

然而，在客户端版本 Gantt 中可用的一些方法在服务器库中要么不起作用，要么未定义，即：

- 服务器端渲染尚未实现。调用诸如 [gantt.render](api/method/render.md)、[gantt.refreshData](api/method/refreshdata.md)、[gantt.refreshTask](api/method/refreshtask.md) 等方法不会生成 HTML，但会触发相关 API 事件，例如 [onBeforeGanttRender](api/event/onbeforeganttrender.md)、[onGanttRender](api/event/onganttrender.md) 等。
- [Popup messages API](guides/message-boxes.md) 未包含在 Node 包中。gantt.message、gantt.alert、gantt.confirm 方法将未定义。
- [Built-in ajax helpers](api/other/ajax.md) 未移植到 Node.js，因此无论是 gantt 的 ajax API，还是 [gantt.load](api/method/load.md) 以及默认 dataProcessor 路由都将无法工作。您需要使用 [gantt.parse](api/method/parse.md) 和 [custom routing of the dataProcessor](guides/server-side.md#customrouting)。

:::note
dhtmlxGantt for Node.js 的评估版本具有有限的功能，最多允许加载 75 个任务或连线。如果尝试加载更大的数据集，将只加载前 75 项。
:::
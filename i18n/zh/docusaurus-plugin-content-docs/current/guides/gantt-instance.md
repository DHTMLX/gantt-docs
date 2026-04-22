---
title: "Gantt 实例的特性"
sidebar_label: "Gantt 实例的特性"
---

# Gantt 实例的特性

本文介绍使用 Gantt 实例的主要特性。

让我们考虑最常见的场景——构建一个包含多个页面/标签页/视图的应用程序。

以下方法适用于基于 Angular 的（或基于 React 的）应用程序，并且仅在 dhtmlxGantt 的 Commercial、Enterprise 或 Ultimate 版本中可用（在 GPL 或 Individual 版本中不可用）：

- 当你用 Gantt 打开一个页面/标签页/视图时，需要创建一个新的 Gantt 实例；
- 当你切换到不同的页面/标签页/视图时，需要 [destroy the Gantt instance](guides/multiple-gantts.md#destructorofganttanddataprocessorinstances)。


**替代方法**（适用于所有版本）是自行手动重置一切。


:::note
请查看 [example](https://snippet.dhtmlx.com/5/abec296e0) 以了解如何实现该方法。


当你点击 **Recreate Gantt** 按钮时，Gantt 将初始化、加载任务并附加事件。如果你销毁 Gantt，事件将被解除绑定。
:::

在使用此方法时，需要记住以下几点：

## 自定义事件

当你加载带有 Gantt 的页面时，需要在添加事件之前，将事件的 ID 手动保存到一个数组中：

~~~js
const onTaskClick = gantt.attachEvent('onTaskClick', (id) => {
    gantt.message(`onTaskClick: Task ID: ${id}`);
    return true;
}, '');
eventIDs.push(onTaskClick);
~~~

当你切换到另一个页面时，需要使用你保存到数组中的 ID 手动分离事件：

~~~js
eventIDs.forEach(event => gantt.detachEvent(event));
eventIDs = [];
~~~

有关更多细节，请参见 [Detaching events](guides/handling-events.md#detaching-events) 小节。

## 数据处理器

你需要手动销毁 [dataProcessor](api/method/dataprocessor.md) ：

~~~js
dp.destructor();
~~~

请注意，你只需要销毁 dataProcessor，而不是 Gantt。否则，在重新加载页面之前将无法使用 Gantt。

## 任务、连线、资源数据、标记、自定义快捷键

你可以使用 [clearAll()](api/method/clearall.md) 方法安全地从 Gantt 实例中移除这些数据。

## Gantt 配置

没有内建的方法可以保存它或将 Gantt 配置重置为默认值。大多数 Gantt 配置保存在 [gantt.config](api/overview/properties-overview.md) 对象中。

## CSS

如果你添加了自定义 CSS，若导致问题，需要手动移除。

## 日历设置

你需要使用 [gantt.deleteCalendar()](api/method/deletecalendar.md) 方法手动删除它们。

## 其他情况

除了上面描述的几点，你可能还需要实现其他选项，但我们尚未测试此方法的所有可能场景。
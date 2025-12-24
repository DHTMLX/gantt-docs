---
title: "Gantt 实例的特殊性"
sidebar_label: "Gantt 实例的特殊性"
---

# Gantt 实例的特殊性


本文介绍了使用 Gantt 实例的关键方面。

让我们来看一个常见场景--构建包含多个页面、标签或视图的应用程序。

以下方法适用于基于 Angular（或 React）的应用程序，并且仅在 dhtmlxGantt 的 Commercial、Enterprise 或 Ultimate 版本中可用（不支持 GPL 或 Individual 版本）:

- 当打开包含 Gantt 图的页面、标签或视图时，应创建一个新的 Gantt 实例。
- 当切换到不同的页面、标签或视图时，必须[销毁](guides/multiple-gantts.md#gantthedataprocessorshilidexigouhanshu)当前的 Gantt 实例。

**另外，**（此方法适用于所有版本）你也可以手动重置所有内容。


:::note
请查看[示例](https://snippet.dhtmlx.com/5/abec296e0)，了解如何实现这种方法。


点击 **Recreate Gantt** 按钮将初始化 Gantt、加载任务并绑定事件。销毁 Gantt 时将解除这些事件的绑定。
:::

使用这种手动重置方法时，请注意以下重要事项:

## 自定义事件

当加载包含 Gantt 的页面时，在添加事件之前，将事件 ID 保存到数组中:

~~~js
const onTaskClick = gantt.attachEvent('onTaskClick', (id) => {
    gantt.message(`onTaskClick: Task ID: ${id}`);
    return true;
}, '');
eventIDs.push(onTaskClick);
~~~

切换到其他页面时，使用保存的 ID 手动解除事件绑定:

~~~js
eventIDs.forEach(event => gantt.detachEvent(event));
eventIDs = [];
~~~

更多信息请参考 [Detaching events](guides/handling-events.md#shijianjiebang) 部分。

## Data Processor

需要手动销毁 [dataProcessor](api/method/dataprocessor.md):

~~~js
dp.destructor();
~~~

请注意，只应销毁 dataProcessor，而不是 Gantt 实例本身。销毁 Gantt 后，将无法继续使用，除非重新加载页面。

## 任务、链接、资源数据、标记、自定义快捷键

可以使用 [clearAll()](api/method/clearall.md) 方法安全地从 Gantt 实例中清除这些内容。

## Gantt 配置

没有内置选项可以保存或重置 Gantt 配置为默认值。大多数设置都存储在 [gantt.config](api/overview/properties-overview.md) 对象中。

## CSS

如果添加了自定义 CSS 并引发问题，则需要手动移除这些样式。

## 日历设置

日历设置应通过 [gantt.deleteCalendar()](api/method/deletecalendar.md) 方法手动移除。

## 其他情况

除了上述提到的内容外，可能还存在其他需要额外处理的场景。然而，使用此方法的所有可能情况尚未完全测试。


---
sidebar_label: getGanttInstance
title: getGanttInstance
description: "一個可用於建立 dhtmlxGantt 圖表新實例的工廠對象"
---

# getGanttInstance

:::info
该功能在 Gantt PRO 版本中提供，适用于 Commercial（自 2021 年 10 月 6 日起）、Enterprise 与 Ultimate 许可。
:::

### Description

@short: 一个可用于创建 dhtmlxGantt 图表新实例的工厂对象

@signature: Gantt: object

### Example

~~~jsx
// can be used as a global object
const myGantt = Gantt.getGanttInstance();

// or imported from `dhtmlxgantt.js` as a module
import { Gantt } from 'dhtmlx-gantt';
...
const myGantt = Gantt.getGanttInstance();
~~~

## 方法

- **getGanttInstance(ganttConfig)** - 用于创建一个新的 dhtmlxGantt 实例。参数如下：
    - **ganttConfig** - (*object*) 可选，用于新建甘特图实例的 [配置对象](guides/multiple-gantts.md#gantt-instance-configuration)。

Example:

~~~js
const myGantt = Gantt.getGanttInstance();
~~~

当不再需要时，可以使用该实例的 `destructor()` 方法销毁 gantt 实例，例如：

~~~js
const myGantt = Gantt.getGanttInstance();
...
myGantt.destructor();
~~~
---
sidebar_label: root_id
title: root_id 配置
description: "设置虚拟根元素的 ID"
---

# root_id

### Description

@short: 设置虚拟根元素的 ID

@signature: root_id: string | number

### Example

~~~jsx
gantt.config.root_id = "root"; /*!*/

var tasks =  {
    data:[
      {id:1, text:"Project #2", start_date:"01-04-2013", duration:18, parent:"root"}, /*!*/
      {id:2, text:"Task #1",     start_date:"02-04-2013", duration:8,  parent:1},
      {id:3, text:"Task #2",    start_date:"11-04-2013", duration:8,  parent:1}
    ],
    links:[]
};

gantt.init("gantt_here");

gantt.parse(tasks);
~~~

**默认值:** "0"

### Details

**root_id** 指的是任务树的虚拟根节点。
如果任务的 *parent* 属性的值被设为 **root_id** 配置的值，则该任务将显示在甘特图树的顶层。

- 任务的 [parent](guides/loading.md#dataproperties) 属性应包含任务树中父任务的 ID。
- 任务的 *parent* 值包含一个 [existing task](api/method/istaskexists.md) 的 ID，将作为所引用项目的子任务显示。
- 任务的 *parent* 值等于 *gantt.config.root_id*（默认为数字 0）或未定义时，将位于任务树的顶层。
- 任务的 *parent* 包含一个不存在的任务 ID 的 [non-existing task id](api/method/istaskexists.md)，并且与 **root_id** 不严格相等，将不会显示在任务树中。
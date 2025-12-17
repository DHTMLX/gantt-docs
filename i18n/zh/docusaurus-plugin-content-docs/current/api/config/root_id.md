---
sidebar_label: root_id
title: root_id config
description: "设置虚拟根元素的 id"
---

# root_id

### Description

@short: 设置虚拟根元素的 id

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

**Default value:** "0"

### Details

**root_id** 定义任务树中的虚拟根节点。
当任务的 *parent* 属性与 **root_id** 值匹配时，该任务会显示在 gantt 树的顶层。

- 任务的 [parent](guides/loading.md#shujushuxing) 属性应指定其在任务树中父任务的 id。
- parent 值匹配某个[存在的任务](api/method/istaskexists.md)时，该任务会作为子任务显示在该父任务下。
- parent 值等于 *gantt.config.root_id*（默认是数字 0）或未定义的任务，将显示在任务树的顶层。
- parent 值指向[不存在的任务 id](api/method/istaskexists.md)且[不严格等于](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Strict_equality) **root_id** 的任务，将不会显示在任务树中。


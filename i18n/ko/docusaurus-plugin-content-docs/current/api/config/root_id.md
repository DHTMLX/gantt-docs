---
sidebar_label: root_id
title: root_id 구성
description: "가상 루트 요소의 ID를 설정합니다"
---

# root_id

### Description

@short: 가상 루트 요소의 ID를 설정합니다

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

**root_id**는 작업 트리의 가상 루트 노드를 가리킵니다.
작업의 *parent* 속성 값이 **root_id** 구성 값으로 설정되면, 해당 작업은 간트 차트 트리의 최상위 레벨에 표시됩니다.

- The [parent](guides/loading.md#dataproperties) property of a task should contain the id of the parent task in a task tree.
- Tasks, whose parent value contains the id of an [existing task](api/method/istaskexists.md), will appear as subtasks of the referred items.
- Tasks, whose parent value equals *gantt.config.root_id* (numeric 0 by default) or is undefined, will be located at the top level of the tasks tree.
- Tasks, whose parent contains a [non-existing task id](api/method/istaskexists.md) and is [not strictly equal](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Strict_equality) to the **root_id**, won't be displayed in the tasks tree.
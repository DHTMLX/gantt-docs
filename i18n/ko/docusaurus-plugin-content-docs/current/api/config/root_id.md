---
sidebar_label: root_id
title: root_id config
description: "가상 루트 요소의 id를 설정합니다"
---

# root_id

### Description

@short: 가상 루트 요소의 id를 설정합니다

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

**root_id**는 작업 트리 내의 가상 루트 노드를 정의합니다.  
작업의 *parent* 속성이 **root_id** 값과 일치할 경우, 해당 작업은 간트 트리의 최상위 레벨에 표시됩니다.

- 작업의 [parent](guides/loading.md#dataproperties) 속성은 작업 트리 내 상위 작업의 id를 지정해야 합니다.
- 부모 값이 [존재하는 작업](api/method/istaskexists.md)과 일치하는 작업은 그 작업의 하위 작업으로 표시됩니다.
- 부모 값이 *gantt.config.root_id* (기본값은 숫자 0)와 같거나 정의되지 않은 작업은 작업 트리 최상위 레벨에 나타납니다.
- 부모 값이 [존재하지 않는 작업 id](api/method/istaskexists.md)를 참조하며 **root_id**와 [엄격히 같지 않은 경우](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Strict_equality), 해당 작업은 작업 트리에 표시되지 않습니다.


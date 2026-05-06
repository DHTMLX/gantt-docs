---
sidebar_label: getSlack
title: getSlack 메서드
description: "현재 지속 시간 단위로 작업이 다른 작업에 영향을 주기 시작하기까지 남은 시간을 확인합니다"
---

# getSlack

:::info
The **getSlack** 메서드는 PRO 에디션에서만 사용 가능합니다. 
:::

### Description

@short: 현재 지속 시간 단위로 작업이 다른 작업에 영향을 주기 시작하기까지 남은 시간을 확인합니다

### Parameters

- `task1` - (필수) *object* - 슬랙을 확인할 첫 번째 작업의 객체
- `task2` - (필수) *object* - 슬랙을 확인할 두 번째 작업의 객체

### Returns
- `slack` - (number|string) - 현재 지속 시간 단위로 두 작업 간의 여유, 또는 연결되지 않은 경우 'Infinity'

### Example

~~~jsx
const tasks = {
    data:[
       {id:1, text:"Project #1", start_date:"01-04-2013", duration:18, type:"project"},
       {id:2, text:"Task #1", start_date:"02-04-2013",duration:8, parent:1},
       {id:3, text:"Task #2", start_date:"13-04-2013",duration:8, parent:1}
    ],
    links:[
       {id:1, source:1, target:2, type:"1"},
       {id:2, source:2, target:3, type:"0"}
    ]
};
 
gantt.config.highlight_critical_path = true; 
gantt.init("gantt_here");
gantt.parse(tasks);

gantt.getSlack(gantt.getTask(2), gantt.getTask(3)); // -> 1  /*!*/
~~~

### Related samples
- [Critical path](https://docs.dhtmlx.com/gantt/samples/02_extensions/03_critical_path.html)

### Details

:::warning
The **getSlack** 메서드는 더 이상 사용되지 않습니다. 작업의 자유 여유(free slack)와 총 여유(total slack)를 얻으려면 아래의 메서드를 사용하세요:
::: 

~~~js
gantt.getFreeSlack(task);

gantt.getTotalSlack(task);
~~~

:::note
이 메서드는 **critical_path** 확장에서 정의되어 있으므로 페이지에 포함해야 합니다. [Critical Path](guides/critical-path.md) 문서의 상세 정보를 참조하십시오. 
:::

### Related API
- [highlight_critical_path](api/config/highlight_critical_path.md)
- [isCriticalTask](api/method/iscriticaltask.md)
- [isCriticalLink](api/method/iscriticallink.md)

### Related Guides
- [Critical Path](guides/critical-path.md)
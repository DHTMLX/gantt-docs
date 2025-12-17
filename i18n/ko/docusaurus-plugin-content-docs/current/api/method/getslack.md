---
sidebar_label: getSlack
title: getSlack method
description: "현재 기간 단위로 작업이 다른 작업에 영향을 미치기 전까지 남은 시간을 결정합니다."
---

# getSlack
:::info
이 기능은 PRO 에디션에서만 사용할 수 있습니다. 
:::
### Description

@short: 현재 기간 단위로 작업이 다른 작업에 영향을 미치기 전까지 남은 시간을 결정합니다.

### Parameters

- `task1` - (required) *object* - 슬랙을 확인할 첫 번째 작업 객체
- `task2` - (required) *object* - 슬랙을 확인할 두 번째 작업 객체

### Returns
- ` slack` - (number,string) - 현재 기간 단위로 작업 간의 슬랙 값 또는 작업이 연결되어 있지 않으면 'Infinity'

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

:::note
 **getSlack** 메서드는 더 이상 사용되지 않습니다. 대신 작업의 자유 슬랙 또는 총 슬랙을 얻기 위해 다음 메서드를 사용하세요:  
:::

~~~js
gantt.getFreeSlack(task);

gantt.getTotalSlack(task);
~~~

<br>

:::note
 이 메서드는 **critical_path** 확장 기능의 일부이므로, 페이지에 포함시켜야 합니다. 자세한 내용은 [Critical Path](guides/critical-path.md) 문서를 참고하세요. 
:::

![iscritical_path](/img/iscritical_path.png)

### Related API
- [highlight_critical_path](api/config/highlight_critical_path.md)
- [isCriticalTask](api/method/iscriticaltask.md)
- [isCriticalLink](api/method/iscriticallink.md)

### Related Guides
- [Critical Path](guides/critical-path.md)


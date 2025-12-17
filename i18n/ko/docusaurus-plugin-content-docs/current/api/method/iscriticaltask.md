---
sidebar_label: isCriticalTask
title: isCriticalTask method
description: "주어진 작업이 크리티컬한지 확인합니다"
---

# isCriticalTask
:::info
이 기능은 PRO 에디션에서만 사용할 수 있습니다. 
:::
### Description

@short: 주어진 작업이 크리티컬한지 확인합니다

@signature: isCriticalTask: (task: Task) =\> boolean

### Parameters

- `task` - (required) *Task* - 확인할 작업 객체

### Returns
- ` value` - (boolean) - 작업이 크리티컬한 경우 'true'를 반환하며, 그렇지 않으면 'false'를 반환합니다.

### Example

~~~jsx
const tasks = {
    data:[
       {id:1, text:"Project #1", start_date:"01-04-2023", duration:18, type:"project"},
       {id:2, text:"Task #1", start_date:"02-04-2023", duration:8, parent:1},
       {id:3, text:"Task #2", start_date:"13-04-2023", duration:8, parent:1}
    ],
    links:[
       {id:1, source:1, target:2, type:"1"},
       {id:2, source:2, target:3, type:"0"}
    ]
};

gantt.config.highlight_critical_path = true; /*!*/
gantt.init("gantt_here");
gantt.parse(tasks);

gantt.isCriticalTask(gantt.getTask(2));// ->'false' /*!*/
gantt.isCriticalTask(gantt.getTask(3));// ->'true' /*!*/
~~~

### Related samples
- [Critical path](https://docs.dhtmlx.com/gantt/samples/02_extensions/03_critical_path.html)

### Details

:::note
이 메서드는 **critical_path** 확장 기능의 일부이므로 [critical_path](guides/extensions-list.md#criticalpath) 플러그인을 활성화해야 합니다. 자세한 내용은 [Critical Path](guides/critical-path.md) 문서를 참조하세요. 
:::


![iscritical_path](/img/iscritical_path.png)

### Related API
- [highlight_critical_path](api/config/highlight_critical_path.md)
- [isCriticalLink](api/method/iscriticallink.md)
- [getSlack](api/method/getslack.md)

### Related Guides
- [Critical Path](guides/critical-path.md)


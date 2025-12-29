---
sidebar_label: getTask
title: getTask method
description: "작업 객체를 반환합니다"
---

# getTask

### Description

@short: 작업 객체를 반환합니다

@signature: getTask: (id: string | number) =\> Task

### Parameters

- `id` - (required) *string | number* -    작업 ID

### Returns
- ` obj` - (Task) - 작업 객체

### Example

~~~jsx
gantt.addTask({
    id:7,
    text:"Task #5",
    start_date:"02-09-2013",
    duration:28
}, "pr_2");

gantt.getTask(7);
//->{id:7, text:"Task #5", start_date:"02-09-2013", duration:28, 
//   parent:"pr_2", $source:[1,5], $target:[8,13], ...}
~~~

### Details

**getTask()**를 호출하면 해당 작업과 관련된 링크를 식별하는 데 유용한 두 가지 속성을 포함하는 작업 객체를 반환합니다:

- **$source** - 작업에서 시작하는 링크입니다.
- **$target** - 작업을 가리키는 링크입니다.

이 속성들은 자동으로 생성되며 작업에서 나가는 링크와 작업으로 들어오는 링크의 ID를 보유합니다.

~~~js
const taskObj = gantt.getTask("t1");
 
const sourceLinks = taskObj.$source;        //-> ["l1","l4"] - 나가는 링크의 ID  
const targetLinks = taskObj.$target;       //-> ["l5","l8"] - 들어오는 링크의 ID
~~~


## Error

**getTask** 메서드는 지정된 "id"를 가진 작업이 이미 Gantt 차트에 로드되어 있어야 합니다. 해당 "id"를 가진 작업이 없으면 "Task not found id = ID"라는 오류 메시지를 발생시킵니다.

~~~js
const task = gantt.getTask("fake-id");
...
~~~

![gettask_error](/img/gettask_error.png)

이 오류를 방지하려면, 먼저 [isTaskExists](api/method/istaskexists.md) 메서드를 사용하여 작업이 존재하는지 확인하는 것이 좋습니다:

~~~js
if(gantt.isTaskExists("fake-id")){
   const task = gantt.getTask("fake-id");
   ...
}
~~~

또는, 앱 배포 전에 [이 오류 메시지를 끌 수 있습니다](faq.md#anerroralertappearsintherighttopcorner) 설정 옵션 [show_errors](api/config/show_errors.md)를 사용하여:

~~~js
gantt.config.show_errors = false;
~~~

### Related API
- [getTaskByTime](api/method/gettaskbytime.md)
- [getTaskNode](api/method/gettasknode.md)
- [isTaskExists](api/method/istaskexists.md)

### Related Guides
- [Task Object/Id](guides/task-object-operations.md)
- [링크 객체/ID 가져오기](guides/link-object-operations.md#gettingthelinksrelatedtoacertaintask)


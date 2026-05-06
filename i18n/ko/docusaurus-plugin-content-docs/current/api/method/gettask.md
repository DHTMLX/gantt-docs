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

- `id` - (필수) *string | number* - 작업 ID

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

getTask() 메서드가 반환하는 작업 객체에는 작업과 관련된 링크를 얻는 데 사용할 수 있는 2개의 중요한 속성이 있습니다:

- **$source** - 작업에서 나오는 링크들.
- **$target** - 작업으로 들어오는 링크들.

다음은 예시 코드입니다:

~~~js
const taskObj = gantt.getTask("t1");
 
const sourceLinks = taskObj.$source;        //-> ["l1","l4"] - 나오는 링크의 ID  
const targetLinks = taskObj.$target;       //-> ["l5","l8"] - 들어오는 링크의 ID
~~~

## Error

**getTask** 메서드는 지정된 "id"를 가진 작업이 이미 Gantt 차트에 로드되어 있어야 합니다. 해당 "id"를 가진 작업이 없으면 "Task not found id = ID"라는 오류 메시지를 발생시킵니다.

~~~js
const task = gantt.getTask("fake-id");
...
~~~

이 오류의 원인을 해결한 후에 작업 객체를 얻으려 시도하십시오. 이를 위해서는 [isTaskExists](api/method/istaskexists.md) 메서드로 작업의 존재 여부를 확인해야 합니다:

~~~js
if(gantt.isTaskExists("fake-id")){
   const task = gantt.getTask("fake-id");
   ...
}
~~~

또한 [show_errors](api/config/show_errors.md) 설정을 통해 애플리케이션을 최종 사용자에게 배포하기 전에 이러한 메시지를 비활성화할 수 있습니다:

~~~js
gantt.config.show_errors = false;
~~~

### Related API
- [getTaskByTime](api/method/gettaskbytime.md)
- [getTaskNode](api/method/gettasknode.md)
- [isTaskExists](api/method/istaskexists.md)

### Related Guides
- [Task Object/Id](guides/task-object-operations.md)
- [Getting the Link Object/Id](guides/link-object-operations.md#getting-the-links-related-to-a-certain-task)
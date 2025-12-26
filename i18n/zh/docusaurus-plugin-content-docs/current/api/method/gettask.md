---
sidebar_label: getTask
title: getTask method
description: "返回任务对象"
---

# getTask

### Description

@short: 返回任务对象

@signature: getTask: (id: string | number) =\> Task

### Parameters

- `id` - (required) *string | number* -    任务ID

### Returns
- ` obj` - (Task) - 任务对象

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

调用 **getTask()** 时，它会返回任务对象，该对象包含两个非常实用的属性，帮助你识别与该任务相关的链接:

- **$source** - 从该任务出发的链接。
- **$target** - 指向该任务的链接。

这些属性是自动生成的，保存了从任务发出的链接ID和指向任务的链接ID。

~~~js
const taskObj = gantt.getTask("t1");
 
const sourceLinks = taskObj.$source;        //-> ["l1","l4"] - 出站链接的ID  
const targetLinks = taskObj.$target;       //-> ["l5","l8"] - 入站链接的ID
~~~


## 错误

**getTask** 方法要求指定的 "id" 任务已经加载在甘特图中。如果不存在该 "id" 的任务，它将抛出错误信息:"Task not found id = ID"。

~~~js
const task = gantt.getTask("fake-id");
...
~~~

![gettask_error](/img/gettask_error.png)

为避免此错误，最好先通过 [isTaskExists](api/method/istaskexists.md) 方法检查任务是否存在:

~~~js
if(gantt.isTaskExists("fake-id")){
   const task = gantt.getTask("fake-id");
   ...
}
~~~

或者，你也可以在发布应用前[关闭这些错误提示](faq.md)，通过设置 [show_errors](api/config/show_errors.md) 配置选项:

~~~js
gantt.config.show_errors = false;
~~~

### Related API
- [getTaskByTime](api/method/gettaskbytime.md)
- [getTaskNode](api/method/gettasknode.md)
- [isTaskExists](api/method/istaskexists.md)

### Related Guides
- [任务对象/Id](guides/task-object-operations.md)
- [获取 Link 对象/ID](guides/link-object-operations.md)


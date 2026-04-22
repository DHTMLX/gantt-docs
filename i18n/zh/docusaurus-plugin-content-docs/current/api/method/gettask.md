---
sidebar_label: getTask
title: getTask 方法
description: "返回任务对象"
---

# getTask

### Description

@short: 返回任务对象

@signature: getTask: (id: string | number) =\> Task

### Parameters

- `id` - (必填) *string | number* -    任务 ID

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

由 **getTask()** 方法返回的任务对象包含两个重要属性，您可以用它们来获取与该任务相关的链接：

- **$source** - 从该任务发出的链接。
- **$target** - 进入该任务的链接。

这些属性由系统自动生成，存储进入和离开该任务的链接的 id。

~~~js
const taskObj = gantt.getTask("t1");
 
const sourceLinks = taskObj.$source;        //-> ["l1","l4"] - 来自任务的链接 id  
const targetLinks = taskObj.$target;       //-> ["l5","l8"] - 进入任务的链接 id
~~~

## Error

**getTask** 方法需要一个已经加载到 Gantt 中、带有必填字段 "id" 的任务。因此，如果找不到具有该 "id" 的任务，该方法将返回错误信息： "Task not found id = ID"。

~~~js
const task = gantt.getTask("fake-id");
...
~~~

我们建议您在尝试获取任务对象之前，先排查导致此错误的原因。要做到这一点，您需要通过 [isTaskExists](api/method/istaskexists.md) 方法检查任务是否存在：

~~~js
if(gantt.isTaskExists("fake-id")){
   const task = gantt.getTask("fake-id");
   ...
}
~~~

但您也可以通过 [show_errors](api/config/show_errors.md) 配置，在将应用程序发布给最终用户之前，[禁用这些提示信息](faq.md#an-error-alert-appears-in-the-right-top-corner)：

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
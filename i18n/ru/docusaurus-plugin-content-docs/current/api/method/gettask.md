---
sidebar_label: getTask
title: метод getTask
description: "возвращает объект задачи"
---

# getTask

### Description

@short: Возвращает объект задачи

@signature: getTask: (id: string | number) =\> Task

### Parameters

- `id` - (required) *string | number* - идентификатор задачи

### Returns
- `obj` - (Task) - объект задачи

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

Объект задачи, возвращаемый методом **getTask()**, содержит 2 важных свойства, которые можно использовать для получения связей, связанных с задачей:

- **$source** - связи, исходящие из задачи.
- **$target** - связи, входящие в задачу.

Эти свойства генерируются автоматически и содержат идентификаторы входящих и исходящих связей.

~~~js
const taskObj = gantt.getTask("t1");
 
const sourceLinks = taskObj.$source;        //-> ["l1","l4"] - ids of coming-out links  
const targetLinks = taskObj.$target;       //-> ["l5","l8"] - ids of coming-into links
~~~


## Error

Метод **getTask** ожидает, что в Gantt загружена задача с обязательным полем "id". therefore, if no task with this "id" is found, the method will produce an error message: "Task not found id = ID". 

~~~js
const task = gantt.getTask("fake-id");
...
~~~


Мы рекомендуем устранить причины этой ошибки, прежде чем пытаться получить объект задачи. Для этого нужно проверить, существует ли задача через метод [isTaskExists](api/method/istaskexists.md):

~~~js
if(gantt.isTaskExists("fake-id")){
   const task = gantt.getTask("fake-id");
   ...
}
~~~

Но также можно [отключить эти сообщения перед выпуском вашего приложения для конечных пользователей](faq.md#an-error-alert-appears-in-the-right-top-corner) через конфигурацию [show_errors](api/config/show_errors.md):

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
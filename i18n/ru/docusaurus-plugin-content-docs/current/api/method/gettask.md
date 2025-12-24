---
sidebar_label: getTask
title: getTask method
description: "возвращает объект задачи"
---

# getTask

### Description

@short: Возвращает объект задачи

@signature: getTask: (id: string | number) =\> Task

### Parameters

- `id` - (required) *string* - | number    идентификатор задачи

### Returns
- ` obj` - (Task) - объект задачи

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

При вызове **getTask()** возвращается объект задачи, который содержит две удобные свойства, помогающие определить связи, связанные с этой задачей:

- **$source** - ссылки, исходящие из задачи.
- **$target** - ссылки, указывающие на задачу.

Эти свойства генерируются автоматически и содержат ID ссылок, исходящих из задачи и входящих в неё.

~~~js
const taskObj = gantt.getTask("t1");
 
const sourceLinks = taskObj.$source;        //-> ["l1","l4"] - ID исходящих ссылок  
const targetLinks = taskObj.$target;       //-> ["l5","l8"] - ID входящих ссылок
~~~


## Ошибка


Метод **getTask** требует, чтобы задача с указанным "id" уже была загружена в диаграмме Ганта. Если задачи с таким "id" не существует, будет выброшено сообщение об ошибке: "Task not found id = ID". 

~~~js
const task = gantt.getTask("fake-id");
...
~~~

![gettask_error](/img/gettask_error.png)

Чтобы избежать этой ошибки, лучше сначала проверить наличие задачи с помощью метода [isTaskExists](api/method/istaskexists.md):

~~~js
if(gantt.isTaskExists("fake-id")){
   const task = gantt.getTask("fake-id");
   ...
}
~~~

Также можно [отключить эти сообщения об ошибках перед публикацией приложения](faq.md#anerroralertappearsintherighttopcorner), установив конфигурационный параметр [show_errors](api/config/show_errors.md):

~~~js
gantt.config.show_errors = false;
~~~

### Related API
- [getTaskByTime](api/method/gettaskbytime.md)
- [getTaskNode](api/method/gettasknode.md)
- [isTaskExists](api/method/istaskexists.md)

### Related Guides
- [Task Object/Id](guides/task-object-operations.md)
- [Получение объекта/ID связи](guides/link-object-operations.md#gettingthelinksrelatedtoacertaintask)


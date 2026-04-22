---
sidebar_label: createDataProcessor
title: createDataProcessor 方法
description: "创建一个新的 dataProcessor 实例并将其附加到 gantt"
---

# createDataProcessor

### Description

@short: 创建一个新的 dataProcessor 实例并将其附加到 gantt

@signature: createDataProcessor: (config: DataProcessorConfig | RouterFunction | RouterConfig) =\> any

### Parameters

- `config` - (required) *DataProcessorConfig | RouterFunction | RouterConfig* -         dataProcessor 配置对象

### Returns
- ` dataProcessor` - (object) - dataProcessor 对象

### Example

~~~jsx
var dp = gantt.createDataProcessor({
   url: "/api",
   mode: "REST",
   deleteAfterConfirmation: true
});
~~~

### Related samples
- [自定义数据 API - 使用本地存储](https://docs.dhtmlx.com/gantt/samples/08_api/22_data_processor.html)

### Details

此方法接受以下类型之一的参数:

- **DataProcessorConfig** - (*object*) - 对象，指定数据发送的预定义模式之一
    - **_url_** - (*string*) - 指向服务器端的 URL
    - **_mode?_** - (*string*) - 可选，向服务器发送数据的模式： "JSON" | "REST-JSON" | "JSON" | "POST" | "GET"
    - **_deleteAfterConfirmation?_** - (*boolean*) - 可选，定义是否仅在服务器返回成功响应后才从 gantt 中删除任务。依赖关系链接和子任务将在确认删除父任务后被删除。


~~~js
var dp = gantt.createDataProcessor({
   url: "/api",
   mode: "REST",
   deleteAfterConfirmation: true
});
~~~


- **RouterFunction (entity, action, data, id): Promise | object | void** - 处理 Gantt 变更的路由函数
    - **_entity_** - (*string*) - 相关实体的名称。可能的取值为: "task"|"link"|"resource"|"assignment"
    - **_action_** - (*string*) - 相关动作的名称。可能的取值为:  "create"|"update"|"delete"
    - **_data_** - (*Task | Link | ResourceAssignment | CustomObject*) - 处理后的对象
    - **_id_** - (*string | number*) - 处理对象的 id


~~~js
// entity - "task"|"link"|"resource"|"assignment"
// action - "create"|"update"|"delete"
// data - 包含任务或链接数据的对象
// id – 被处理对象（任务或链接）的 id
var dp = gantt.createDataProcessor(function(entity, action, data, id) { 
    switch(action) {
        case "create":
           return gantt.ajax.post(
                server + "/" + entity,
                data
           );
        break;
        case "update":
           return gantt.ajax.put(
                 server + "/" + entity + "/" + id,
                 data
            );
        break;
        case "delete":
           return gantt.ajax.del(
                 server + "/" + entity + "/" + id
           );
         break;
   }
});
~~~


- **RouterConfig** - (*object*) - 针对不同实体的路由配置
    - **_task?_** - (*RouterForEntity*) - 任务的路由对象
    - **_link?_** - (*RouterForEntity*) - 链接的路由对象
    - **_resource?_** - (*RouterForEntity*) - 资源的路由对象
    - **_assignment?_** - (*RouterForEntity*) - 分配的路由对象


**RouterForEntity** 对象包含以下方法:

- **create (data): Promise** - 处理添加项的函数
    - **_data_** - (*Task | Link | ResourceAssignment | CustomObject*) - 处理后的项
- **update (data, id): Promise** - 处理更新项的函数
    - **_data_** - (*Task | Link | ResourceAssignment | CustomObject*) - 处理后的项
    - **_id_** - (*string | number*) - 处理项的 id
- **delete (id): Promise** - 处理删除项的函数
    - **_id_** - (*string | number*) - 处理项的 id


~~~js
var dp = gantt.createDataProcessor({ 
   task: {
      create: function(data) {},
      update: function(data, id) {},
      delete: function(id) {}
   },
   link: {
      create: function(data) {},
      update: function(data, id) {},
      delete: function(id) {}
   }
});
~~~

所有路由函数应返回 Promise 或数据响应对象。这样 dataProcessor 才能更新数据库中的 id 并触发 **onAfterUpdate** 事件。

~~~js
router = function(entity, action, data, id) {
    return new gantt.Promise(function(resolve, reject) {
        // … some logic
        return resolve({tid: databaseId});
     });
}
~~~

这种方式允许您使用 DataProcessor 将数据保存到 localStorage 或其他不依赖特定 URL 的存储，或者当不同服务器处理对象的创建和删除时使用。


## 保存资源和资源分配

默认情况下，DataProcessor 不会接收资源和资源分配的更新。
然而，您可以通过 [单独的配置](guides/server-side.md#resources_crud) 启用此功能。

### 相关指南
- [服务端集成](guides/server-side.md)

### 变更日志
- 在 v8.0 中新增了 deleteAfterConfirmation 参数
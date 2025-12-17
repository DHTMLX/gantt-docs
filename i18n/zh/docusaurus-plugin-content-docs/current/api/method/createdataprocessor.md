---
sidebar_label: createDataProcessor
title: createDataProcessor method
description: "创建一个新的 dataProcessor 实例并将其链接到甘特图"
---

# createDataProcessor

### Description

@short: 创建一个新的 dataProcessor 实例并将其链接到甘特图

@signature: createDataProcessor: (config: DataProcessorConfig | RouterFunction | RouterConfig) =\> any

### Parameters

- `config` - (required) *DataProcessorConfig | RouterFunction | RouterConfig* -         dataProcessor 的配置对象

### Returns
- ` dataProcessor` - (object) - 创建的 dataProcessor 实例

### Example

~~~jsx
var dp = gantt.createDataProcessor({
   url: "/api",
   mode: "REST",
   deleteAfterConfirmation: true
});
~~~

### Related samples
- [Custom data api - using local storage](https://docs.dhtmlx.com/gantt/samples/08_api/22_data_processor.html)

### Details

此方法接受以下类型之一的参数:

- **DataProcessorConfig** - (*object*) - 定义预设数据发送模式之一的对象
    - **_url_** - (*string*) - 服务器 URL
    - **_mode?_** - (*string*) - 可选，指定数据发送方式:"JSON" | "REST-JSON" | "JSON" | "POST" | "GET"
    - **_deleteAfterConfirmation?_** - (*boolean*) - 可选，确定任务是否仅在服务器确认删除后才从甘特图中移除。依赖链接和子任务会在父任务删除确认后被删除。


~~~js
var dp = gantt.createDataProcessor({
   url: "/api",
   mode: "REST",
   deleteAfterConfirmation: true
});
~~~


- **RouterFunction (entity, action, data, id): Promise | object | void** - 用于处理甘特图变化的路由函数
    - **_entity_** - (*string*) - 相关实体名称，如 "task"、"link"、"resource" 或 "assignment"
    - **_action_** - (*string*) - 操作类型:"create"、"update" 或 "delete"
    - **_data_** - (*Task | Link | ResourceAssignment | CustomObject*) - 正在处理的对象
    - **_id_** - (*string | number*) - 正在处理对象的 id


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


- **RouterConfig** - (*object*) - 配置不同实体路由的对象
    - **_task?_** - (*RouterForEntity*) - 任务的路由配置
    - **_link?_** - (*RouterForEntity*) - 链接的路由配置
    - **_resource?_** - (*RouterForEntity*) - 资源的路由配置
    - **_assignment?_** - (*RouterForEntity*) - 分配的路由配置


**RouterForEntity** 对象包含以下方法:

- **create (data): Promise** - 处理添加项的函数
    - **_data_** - (*Task | Link | ResourceAssignment | CustomObject*) - 要添加的项
- **update (data, id): Promise** - 处理更新项的函数
    - **_data_** - (*Task | Link | ResourceAssignment | CustomObject*) - 要更新的项
    - **_id_** - (*string | number*) - 项的 id
- **delete (id): Promise** - 处理删除项的函数
    - **_id_** - (*string | number*) - 项的 id


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
        // … 一些逻辑
        return resolve({tid: databaseId});
     });
}
~~~

这种方式允许您使用 DataProcessor 将数据保存到 localStorage 或其他不依赖特定 URL 的存储，或者当不同服务器处理对象的创建和删除时使用。


## 保存资源和资源分配

默认情况下，DataProcessor 不处理资源和资源分配的更新。 
您可以通过[单独配置](guides/server-side.md)启用此功能。

### Related Guides
- [服务器端集成](guides/server-side.md)

### Change log
- 在 v8.0 中添加了 **deleteAfterConfirmation** 选项

---
title: "服务器端集成"
sidebar_label: "服务器端集成"
---

# 服务器端集成



将 dhtmlxGantt 与后端连接的最佳方式是，在服务器端搭建一个 RESTful API，并在客户端使用 [dataprocessor](api/other/dataprocessor.md) 模块。

DataProcessor 是一个内置功能，用于跟踪 Gantt 数据的更改，并以所需格式将更新发送到 REST API。这使得[与服务器端平台集成](integrations/howtostart-guides.md)变得非常简单。当使用对象数据源时，DataProcessor 可以设置回调函数来处理数据更改，这对于数据绑定非常有用。

此外，还有一个视频教程，演示了如何创建 Gantt 图表并加载数据，以 Node.js 为例。

<iframe width="704" height="400" src="https://www.youtube.com/embed/D8YzyzBfyP8" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## 技术说明


通常，要通过 REST API 从服务器加载数据，你需要:

### 客户端

1) 使用 [load](api/method/load.md) 方法，通过提供返回 [JSON](guides/supported-data-formats.md#json) 格式数据的 URL 来加载 Gantt 数据。

2) 有两种方式创建 DataProcessor 实例:

- 初始化 DataProcessor 并将其关联到 dhtmlxGantt 对象:

~~~js
gantt.init("gantt_here");
gantt.load("apiUrl");

// 保持以下代码行的顺序
const dp = new gantt.dataProcessor("apiUrl");
dp.init(gantt);
dp.setTransactionMode("REST");
dp.deleteAfterConfirmation = true;
~~~

:::note
推荐使用第二种方法。
:::

- 通过传递包含配置选项的对象，使用 [createDataProcessor](api/method/createdataprocessor.md) 方法:

~~~js
const dp = gantt.createDataProcessor({
    url: "apiUrl",
    mode: "REST",
    deleteAfterConfirmation: true
});
~~~

更多详情请参阅下文相关章节。


### 创建 DataProcessor {#createdp}

通过 API 方法 [createDataProcessor](api/method/createdataprocessor.md) 创建 DataProcessor 时，有几种传递参数的方式。

1. 使用预定义的请求模式之一，例如:

~~~js
const dp = gantt.createDataProcessor({
    url: "/api",
    mode: "REST",
    deleteAfterConfirmation: true
});
~~~

其中:

- **url** - 服务器端的接口地址
- **mode** - 发送数据到服务器的方法:"GET" | "POST" | "REST" | "JSON" | "REST-JSON"
- **deleteAfterConfirmation** - 仅在服务器确认删除后才从 gantt 中移除任务。依赖关系和子任务将在父任务删除确认后一并删除。

2. 提供自定义的 **router** 对象:

~~~js
const dp = gantt.createDataProcessor(router);
~~~

- 其中 **router** 可以是一个函数:

~~~js
// entity - "task"|"link"|"resource"|"assignment"
// action - "create"|"update"|"delete"
// data - 包含任务或链接数据的对象
// id – 被处理对象（任务或链接）的 id
const dp = gantt.createDataProcessor((entity, action, data, id) => { 
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

- 或者是如下结构的对象:

~~~js
const dp = gantt.createDataProcessor({
    task: {
        create: (data) => {},
        update: (data, id) => {},
        delete: (id) => {}
    },
    link: {
        create: (data) => {},
        update: (data, id) => {},
        delete: (id) => {}
    }
});
~~~

**router** 对象中的所有函数应返回一个 Promise 或数据响应对象。这样 dataProcessor 可以应用数据库 id 并触发 **onAfterUpdate** 事件。

~~~js
const router = (entity, action, data, id) => {
    return new gantt.Promise((resolve, reject) => {
        // … 相关逻辑
        return resolve({ tid: databaseId });
    });
};
~~~

这种方式使你可以将 DataProcessor 用于 localStorage 等本地存储，或其他不依赖于特定 URL 的存储方式，或在创建和删除分别由不同服务器处理的场景下使用。


[Custom data api - using local storage](https://docs.dhtmlx.com/gantt/samples/08_api/22_data_processor.html)


### 请求与响应详情 {#requestresponsedetails}

URL 遵循如下模式:

- api/link/id
- api/task/id
- api/resource/id
- api/assignment/id

其中 "api" 是 dataProcessor 配置中设置的 URL。

以下是可能的请求和响应列表:

<table class="dp_table">
  <tr>
  <th><b>操作</b></th><th><b>HTTP 方法</b></th><th><b>URL</b></th><th><b>响应</b></th>
  </tr>
  <tr>
  <td>加载数据</td>
  <td>GET</td>
  <td>/apiUrl</td>
  <td>[JSON 格式](guides/supported-data-formats.md#json)</td>
  </tr>
  <tr><td colspan="4" style="font-weight:bold">任务</td></tr>
  <tr>
  <td>新增任务</td>
  <td>POST</td>
  <td>/apiUrl/task</td>
  <td>("action":"inserted","tid":"id")</td>
  </tr>
  <tr>
  <td>更新任务</td>
  <td>PUT</td>
  <td>/apiUrl/task/id</td>
  <td>("action":"updated")</td>
  </tr>
  <tr>
  <td>删除任务</td>
  <td>DELETE</td>
  <td>/apiUrl/task/id</td>
  <td>("action":"deleted")</td>
  </tr>
  <tr><td colspan="4" style="font-weight:bold">链接</td></tr>
  <tr>
  <td>新增链接</td>
  <td>POST</td>
  <td>/apiUrl/link</td>
  <td>("action":"inserted","tid":"id")</td>
  </tr>
  <tr>
  <td>更新链接</td>
  <td>PUT</td>
  <td>/apiUrl/link/id</td>
  <td>("action":"updated")</td>
  </tr>
  <tr>
  <td>删除链接</td>
  <td>DELETE</td>
  <td>/apiUrl/link/id</td>
  <td>("action":"deleted")</td>
  </tr>
  <tr><td colspan="4" style="font-weight:bold">资源</td></tr>
  <tr>
  <td>新增资源</td>
  <td>POST</td>
  <td>/apiUrl/resource</td>
  <td>("action":"inserted","tid":"id")</td>
  </tr>
  <tr>
  <td>更新资源</td>
  <td>PUT</td>
  <td>/apiUrl/resource/id</td>
  <td>("action":"updated")</td>
  </tr>
  <tr>
  <td>删除资源</td>
  <td>DELETE</td>
  <td>/apiUrl/resource/id</td>
  <td>("action":"deleted")</td>
  </tr>
  <tr><td colspan="4" style="font-weight:bold">资源分配</td></tr>
  <tr>
  <td>新增分配</td>
  <td>POST</td>
  <td>/apiUrl/assignment</td>
  <td>("action":"inserted","tid":"id")</td>
  </tr>
  <tr>
  <td>更新分配</td>
  <td>PUT</td>
  <td>/apiUrl/assignment/id</td>
  <td>("action":"updated")</td>
  </tr>
  <tr>
  <td>删除分配</td>
  <td>DELETE</td>
  <td>/apiUrl/assignment/id</td>
  <td>("action":"deleted")</td>
  </tr>
</table>

:::note
默认情况下，资源和资源分配不会包含在 DataProcessor 的请求中。如需包含，需要显式启用。详情请参考 [此处](guides/server-side.md#resources_crud)。
:::


### 请求参数 {#requestparams}

新增、更新和删除请求会包含客户端任务或链接对象的所有公开属性:

任务:

- **start_date**: 2025-04-08 00:00:00
- **duration**: 4
- **text**: Task #2.2
- **parent**: 3
- **end_date**: 2025-04-12 00:00:00

链接:

- **source**: 1
- **target**: 2
- **type**: 0

注意:

- **start_date** 和 **end_date** 的格式由 [date_format](api/config/date_format.md) 配置项设置。
- 客户端会发送任务或链接的所有公开属性，因此请求中可能包含额外参数。
- 如果你在数据模型中添加了新的列或属性，gantt 会自动将它们发送到后端。

:::note
公开属性指名称不以下划线（**_**）或美元符号（**$**）开头的属性，因此像 **task._owner** 或 **link.$state** 这样的属性不会被发送到后端。
:::


### REST-JSON 模式 {#restjson}

除了 "POST"、"GET"、"REST" 和 "JSON" 模式外，Gantt DataProcessor 还支持 "REST-JSON" 模式。

~~~js
gantt.load("apiUrl");

const dp = gantt.createDataProcessor({
    url: "/apiUrl",
    mode: "REST-JSON"
});
~~~

它使用相同的 [请求 URL](#requestresponsedetails)，但参数的发送方式不同。

在 REST 模式下，数据以表单数据形式发送:

~~~
Content-Type: application/x-www-form-urlencoded
~~~

而在 REST-JSON 模式下，数据以 JSON 形式发送:

**Headers**
~~~
Content-type: application/json
~~~

参数以 JSON 对象的形式发送:

**请求载荷**

- 任务

~~~
{
    "start_date": "20-09-2025 00:00",
    "text": "New task",
    "duration": 1,
    "end_date": "21-09-2025 00:00",
    "parent": 0,
    "usage": [
        { "id": "1", "value": "30" },
        { "id": "2", "value": "20" }
    ]
}
~~~

- 链接

~~~js
{
    "source": 1,
    "target": 2,
    "type": "0"
}
~~~

这种格式简化了服务器端对复杂记录的处理。


### 服务器端 {#loadserverside}

每当 Gantt 中发生变化（添加、更新或删除任务或链接）时，dataProcessor 会向服务器发送 AJAX 请求。

每个请求都包含更新数据库所需的全部数据。
由于 dataProcessor 设置为 REST 模式，因此会根据操作类型使用不同的 HTTP 动词。

使用 REST API 可以用多种框架和语言实现服务器端。
以下是可用于 Gantt 后端集成的服务器端实现示例:

- [dhtmlxGantt 与 ASP.NET Core 2 集成](integrations/dotnet/howtostart-dotnet-core.md)
- [dhtmlxGantt 与 PHP: Slim 集成](integrations/php/howtostart-php-slim4.md)
- [dhtmlxGantt 与 PHP: Laravel 集成](integrations/php/howtostart-php-laravel.md)
- [dhtmlxGantt 与 Node.js 集成](integrations/node/howtostart-nodejs.md)
- [dhtmlxGantt 与 ASP.NET MVC 集成](integrations/dotnet/howtostart-dotnet.md)
- [dhtmlxGantt 与 Ruby on Rails 集成](integrations/other/howtostart-ruby.md)


## 任务顺序的存储


Gantt 会按照数据源中的顺序显示任务。如果用户可以[手动调整任务顺序](guides/reordering-tasks.md#kuazhenggeganttjiegoutuofang)，
你需要将这种顺序保存到数据库，并确保数据源返回的任务已按此顺序排序。

客户端设置:

~~~js
// 在整个 gantt 内拖动任务排序
gantt.config.order_branch = true;
gantt.config.order_branch_free = true;
 
gantt.init("gantt_here");
gantt.load("/api");

const dp = gantt.createDataProcessor({
    url: "/api",
    mode: "REST"
});
~~~

保存顺序有多种方式，这里举一个例子。

- 在任务表中添加一个数值类型的列，例如 'sortorder'。
- 处理 GET 请求时，按此列升序排序任务。
- 新增任务时，赋值为 `MAX(sortorder) + 1`。
- 当客户端顺序发生变化时，gantt 会发送一个 PUT（或未启用 REST 模式时为 POST），请求中包含所有任务属性以及描述任务在项目树中位置的参数。

<table class="dp_table">
  <tr>
  <th><b>HTTP 方法</b></th><th><b>URL</b></th><th><b>参数</b></th><th><b>响应</b></th>
  </tr>
  <tr>
  <td>PUT</td>
  <td>/apiUrl/task/taskId</td>
  <td><b>target=</b>adjacentTaskId</td>
  <td>("action":"updated")</td>
  </tr>
</table>

<b>target</b> 参数包含当前任务紧邻的前一个或后一个任务的 id。

其值有两种格式:

 - *target="targetId*"  - 将当前任务放在 targetId 任务<b>之前</b>
 - *target="next:targetId*" - 将当前任务放在 targetId 任务<b>之后</b>

更改顺序通常需要更新多个任务。以下是伪代码示例:

~~~js
const target = request["target"];
const currentTaskId = request["id"];
let nextTask;
let targetTaskId;

// 判断更新的任务是在相邻任务之前还是之后
if (target.startsWith("next:")) {
  targetTaskId = target.substr("next:".length);
  nextTask = true;
} else {
  targetTaskId = target;
  nextTask = false;
}

const currentTask = tasks.getById(currentTaskId);
const targetTask = tasks.getById(targetTaskId);

if (!targetTaskId) return;

// 将相邻任务的 sortorder 赋给当前任务
let targetOrder = targetTask.sortorder;

// 如果放在相邻任务之后，则递增 sortorder
if (nextTask) targetOrder++;

// 递增所有在当前任务之后的任务的 sortorder
tasks.where(task => task.sortorder >= targetOrder)
    .update(task => task.sortorder++);

// 更新当前任务的 sortorder
currentTask.sortorder = targetOrder;

tasks.save(currentTask);
~~~

你可以在以下平台查找关于任务顺序存储的详细示例:
[plain PHP](integrations/php/howtostart-php.md#baocunrenwushunxu)、[Laravel](integrations/php/howtostart-php-laravel.md#renwushunxudecunchu)、
[Node.js](integrations/node/howtostart-nodejs.md#renwushunxudecunchu)、[ASP.NET Web API](integrations/dotnet/howtostart-dotnet.md#cunchurenwushunxu) 以及
[Rails](integrations/other/howtostart-ruby.md#renwushunxudecunchu)。


## 自定义请求头和参数


### 添加自定义请求头

可以在发送到后端的请求中包含额外的请求头。例如，您可能希望在请求中添加授权令牌:

~~~js
gantt.init("gantt_here");
gantt.load("/api");
 
const dp = gantt.createDataProcessor({
    url: "/api",
    mode:"REST",
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": "Token 9944b09199c62bcf9418ad846dd0e4bbdfc6ee4b"
    }
});
~~~

目前，[load](api/method/load.md) 不支持在 GET 请求中添加 header 或 payload 参数，因此如果您需要包含这些内容，必须手动发送 xhr，然后通过 [parse](api/method/parse.md) 将数据加载到 gantt，如下所示:

~~~js
gantt.ajax.get({
    url: "/api",
    headers: {
        "Authorization": "Token 9944b09199c62bcf9418ad846dd0e4bbdfc6ee4b"
    }
}).then(xhr => {
    gantt.parse(xhr.responseText);
});
~~~


### 向请求中添加自定义参数

有几种方式可以在请求中包含额外的参数。

由于 gantt 会将数据对象的所有属性发送到后端，您可以直接在数据对象中添加额外属性，这些属性会自动包含在请求中:

~~~js
gantt.attachEvent("onTaskCreated", (task) => {
    task.userId = currentUser;
    return true;
});
~~~

另一种方式是通过 **payload** 属性，为 data processor 发送的每个请求添加自定义参数:

~~~js
gantt.init("gantt_here");
gantt.load("/api");

const dp = gantt.createDataProcessor({
    url: "/api",
    mode: "REST",
    payload: {
        token: "9944b09199c62bcf9418ad846dd0e4bbdfc6ee4b"
    }
});
~~~

您还可以通过 DataProcessor 的 [onBeforeUpdate](api/other/dataprocessor.md#onbeforeupdate) 事件为请求添加自定义参数:

~~~js
const dp = gantt.createDataProcessor({
    url: "/api",
    mode: "REST",
});

dp.attachEvent("onBeforeUpdate", (id, state, data) => {
    data.projectId = "1";
    return true;
});
~~~


## 从脚本触发数据保存


当 dataProcessor 初始化后，用户通过界面或脚本进行的任何更改都会自动保存到数据源。

如果要通过脚本更新某个特定任务或依赖关系，通常可使用 [updateTask](api/method/updatetask.md) 和 [updateLink](api/method/updatelink.md) 方法:

~~~js
gantt.parse([
    { id: 1, text: "Task 1", start_date: "2025-05-13 06:00", duration: 2 },
    { id: 2, text: "Task 2", start_date: "2025-05-19 08:00", duration: 3 }
]);

const task = gantt.getTask(1);
task.text = "Task 37"; // 更新任务数据
gantt.updateTask(1); // 重新渲染已更新的任务
~~~

其他会触发向后端发送更新的方法包括:

- [addTask](api/method/addtask.md)
- [updateTask](api/method/updatetask.md)
- [deleteTask](api/method/deletetask.md)
- [addLink](api/method/addlink.md)
- [updateLink](api/method/updatelink.md)
- [deleteLink](api/method/deletelink.md)


## 自定义路由


如果 RESTful AJAX API 不满足您的后端需求，或者您希望完全控制发送到服务器的数据内容，可以使用自定义路由。

例如，在 Angular 或 React 等框架中，一个组件可能不会直接将更改发送到服务器，而是传递给另一个负责保存数据的组件。

要为 DataProcessor 设置自定义路由，请使用 [**createDataProcessor()**](#createdp) 方法:

~~~js
gantt.createDataProcessor(function(entity, action, data, id) {
    const services = {
        "task": this.taskService,
        "link": this.linkService
    };
    const service = services[entity];

    switch (action) {
        case "update":
            return service.update(data);
        case "create":
            return service.insert(data);
        case "delete":
            return service.remove(id);
    }
});
~~~


[Custom data api - using local storage](https://docs.dhtmlx.com/gantt/samples/08_api/22_data_processor.html)


### 使用 AJAX 设置自定义路由

[Gantt AJAX 模块](api/other/ajax.md) 在设置自定义路由时非常有用。Gantt 期望自定义路由返回一个 Promise 对象，这样可以检测操作何时完成。 
AJAX 模块支持 promise，非常适合在自定义路由中使用。Gantt 会处理该 Promise，并在其被 resolve 后处理内容。

在下面的示例中，创建了一个新任务。如果服务器响应包含新任务的 id，Gantt 会相应地应用该 id。

~~~js
gantt.createDataProcessor((entity, action, data, id) => {
    ...
    switch (action) {
        case "create":
            return gantt.ajax.post({
                headers: {
                    "Content-Type": "application/json"
                },
                url: `${server}/task`,
                data: JSON.stringify(data)
            });
    }
});
~~~


<span id="resources_crud"></span>

## 资源及资源分配的 CRUD 路由 {#resources_crud}

从 v8.0 开始，资源分配的更改可以作为带有持久 ID 的单独条目发送到 DataProcessor，这简化了后端 API 集成。资源对象本身的更改也可以发送到 DataProcessor。

请注意，此功能默认关闭。默认情况下，DataProcessor 只接收任务和链接的更改。要启用资源处理，请进行如下设置:

~~~js
gantt.config.resources = {
    dataprocessor_assignments: true,
    dataprocessor_resources: true,
};
~~~

当资源模式启用且 DataProcessor 处于 REST 模式时，资源及资源分配会分别以独立请求发送到后端。

如果 DataProcessor 使用自定义路由模式，您可以在处理函数中捕获资源分配和资源的更改:

~~~js
gantt.createDataProcessor({
    task: {
        create: (data) => {
            return createRecord({type: "task", ...data}).then((res) => {
                return { tid: res.id, ...res };
            });
        },
        update: (data, id) => {
            return updateRecord({type: "task", ...data}).then(() => ({}));
        },
        delete: (id) => {
            return deleteRecord({type: "task:", id: id}).then(() => ({}));
        }
    },
    link: {
        create: (data) => {
            ...
        },
        update: (data, id) => {
            ...
        },
        delete: (id) => {
            ...
        }
    },
    assignment: {
        create: (data) => {
            ...
        },
        update: (data, id) => {
            ...
        },
        delete: (id) => {
            ...
        }
    },
    resource: {
        create: (data) => {
            ...
        },
        update: (data, id) => {
            ...
        },
        delete: (id) => {
            ...
        }
    }
});
~~~

或者，使用函数声明方式:

~~~js
gantt.createDataProcessor((entity, action, data, id) => {
    switch (entity) {
        case "task":
            break;
        case "link":
            break;
        case "resource":
            break;
        case "assignment":
            break;
    }
});
~~~


## 错误处理


如果服务器报告某个操作失败，可以返回如下内容:

~~~js
{"action":"error"}
~~~

可以在客户端通过 gantt.dataProcessor 捕获这样的响应:

~~~js
const dp = gantt.createDataProcessor({
    url: "/api",
    mode: "REST"
});

dp.attachEvent("onAfterUpdate", (id, action, tid, response) => {
    if (action === "error") {
        // 在这里处理错误
    }
});
~~~

响应对象可能包含其他属性，可通过 onAfterUpdate 事件中的 `response` 参数访问。

:::note
该事件仅对如上所示返回 JSON 响应的已管理错误触发。
如需处理 HTTP 错误，请参考 [onAjaxError](api/event/onajaxerror.md) API 事件。
:::

如果服务器响应为错误但客户端更改已保存，最佳同步方式是清除客户端状态并从服务器重新加载正确数据:

~~~js
dp.attachEvent("onAfterUpdate", (id, action, tid, response) => {
    if (action === "error") {
        gantt.clearAll();
        gantt.load("url1");
    }
});
~~~

如果希望在不与服务器通信的情况下同步客户端和服务器状态，可使用 [silent()](api/method/silent.md) 方法，在操作期间阻止内部事件或服务器请求:

~~~js
gantt.silent(() => {
    gantt.deleteTask(item.id);
});

gantt.render();
~~~


## 级联删除


默认情况下，删除任务会触发其嵌套任务及相关链接的级联删除。Gantt 会为每个被移除的任务和链接发送 *delete* 请求。 
这意味着无需手动维护后端数据完整性，Gantt 会自动处理。

但这种方式可能会导致大量 AJAX 请求发送到后端，因为 dhtmlxGantt 不支持批量请求，并且任务和链接数量可能很多。

如有需要，可以通过 [cascade_delete](api/config/cascade_delete.md) 配置禁用级联删除。 
禁用后，删除项目分支只会为顶层项发送删除请求，后端需自行处理相关链接和子任务的删除。


## XSS、CSRF 和 SQL 注入攻击


需要注意的是，Gantt 并未内置防护 SQL 注入、XSS 或 CSRF 等安全威胁的机制。 
确保应用安全是后端开发者的责任。

请参阅 [애플리케이션 보안](guides/app-security.md) 文章，了解组件最易受攻击的点及推荐的安全增强措施。 


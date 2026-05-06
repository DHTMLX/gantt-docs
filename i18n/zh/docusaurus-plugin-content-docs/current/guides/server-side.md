---
title: "服务端集成"
sidebar_label: "服务端集成"
---

# 服务端集成

将 dhtmlxGantt 连接到后端的推荐方法是在服务器上实现一个 RESTful API，并在客户端使用 [](api/other/dataprocessor.md) 模块。

DataProcessor 是一个内置模块，能够监控 Gantt 的数据变动并以指定格式将更新发送到 REST API，从而便于与 [服务器端平台的集成](integrations/howtostart-guides.md)。当使用对象数据源时，可以配置 DataProcessor 以提供数据变更的回调，您可以利用它进行数据绑定。

您可以查看一个视频指南，展示如何在页面上创建一个 Gantt 图并以 Node.js 平台为例将数据加载到其中。

<iframe width="704" height="400" src="https://www.youtube.com/embed/D8YzyzBfyP8" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


## 技术要点

通常，要使用 REST API 从服务器端加载数据，您需要：

### 客户端

1) 调用 [](api/method/load.md) 方法，作为参数指定返回符合 [JSON](/guides/supported-data-formats/) 格式的 Gantt 数据的 URL。

2) 使用以下两种方式之一创建 DataProcessor 实例：

- 初始化 DataProcessor 并将其附加到 dhtmlxGantt 对象：
  
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
建议使用第二种方法。
:::

- 调用 [](api/method/createdataprocessor.md) 方法并传入一个包含配置选项的对象作为参数：

~~~js
const dp = gantt.createDataProcessor({
    url: "apiUrl",
    mode: "REST",
    deleteAfterConfirmation: true
});
~~~

请在下一节中查看详细信息。


###  创建 DataProcessor {#createdp}

通过 API 方法 [](api/method/createdataprocessor.md) 创建 DataProcessor 时，您在传参方面有几种可选项。 
  
1. 使用预定义的请求模式之一，如下所示：

~~~js
const dp = gantt.createDataProcessor({
    url: "/api",
    mode: "REST",
    deleteAfterConfirmation: true
});
~~~

其中：

- **url** - 服务器端的 URL
- **mode** - 发送数据到服务器的模式：  "GET" | "POST" | "REST" | "JSON" | "REST-JSON"
- **deleteAfterConfirmation** - 定义是否只有在服务器返回成功响应后才从甘特图中删除该任务。依赖链接和子任务将在父任务删除确认后被删除。

2. 提供一个自定义的 **router** 对象：

~~~js
const dp = gantt.createDataProcessor(router);
~~~

- where **router** 要么是一个函数：

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

- 或者是具备以下结构的对象：

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

**router** 对象的所有函数都应返回一个 Promise 或数据响应对象。这是 dataProcessor 应用数据库 ID 并 Hook data processor 的 **onAfterUpdate** 事件所必需的。

~~~js
const router = (entity, action, data, id) => {
    return new gantt.Promise((resolve, reject) => {
        // … some logic
        return resolve({ tid: databaseId });
    });
};
~~~

因此，您可以使用 DataProcessor 将数据保存到 localStorage，或保存到任何其他与特定 URL 无关的存储，或者在存在两个不同服务器（URL）分别负责创建和删除对象的情况下使用。


**相关示例**： [自定义数据 API - 使用本地存储](https://docs.dhtmlx.com/gantt/samples/08_api/22_data_processor.html)


### 请求与响应细节 {#requestresponsedetails}

URL 的格式规则如下：

- api/link/id
- api/task/id
- api/resource/id
- api/assignment/id

其中 "api" 是您在 dataProcessor 配置中指定的 URL。

可能的请求与响应列表为：

<table class="dp_table">
  <tr>
  <th><b>Action</b></th><th><b>HTTP Method</b></th><th><b>URL</b></th><th><b>Response</b></th>
  </tr>
  <tr>
  <td>load data</td>
  <td>GET</td>
  <td>/apiUrl</td>
  <td>[JSON format](/guides/supported-data-formats/)</td>
  </tr>
  <tr><td colspan="4" style="font-weight:bold">Tasks</td></tr>
  <tr>
  <td>add a new task</td>
  <td>POST</td>
  <td>/apiUrl/task</td>
  <td>("action":"inserted","tid":"id")</td>
  </tr>
  <tr>
  <td>update a task</td>
  <td>PUT</td>
  <td>/apiUrl/task/id</td>
  <td>("action":"updated")</td>
  </tr>
  <tr>
  <td>delete a task</td>
  <td>DELETE</td>
  <td>/apiUrl/task/id</td>
  <td>("action":"deleted")</td>
  </tr>
  <tr><td colspan="4" style="font-weight:bold">Links</td></tr>
  <tr>
  <td>add a new link</td>
  <td>POST</td>
  <td>/apiUrl/link</td>
  <td>("action":"inserted","tid":"id")</td>
  </tr>
  <tr>
  <td>update a link</td>
  <td>PUT</td>
  <td>/apiUrl/link/id</td>
  <td>("action":"updated")</td>
  </tr>
  <tr>
  <td>delete a link</td>
  <td>DELETE</td>
  <td>/apiUrl/link/id</td>
  <td>("action":"deleted")</td>
  </tr>
  <tr><td colspan="4" style="font-weight:bold">Resources</td></tr>
  <tr>
  <td>add a new resource</td>
  <td>POST</td>
  <td>/apiUrl/resource</td>
  <td>("action":"inserted","tid":"id")</td>
  </tr>
  <tr>
  <td>update a resource</td>
  <td>PUT</td>
  <td>/apiUrl/resource/id</td>
  <td>("action":"updated")</td>
  </tr>
  <tr>
  <td>delete a resource</td>
  <td>DELETE</td>
  <td>/apiUrl/resource/id</td>
  <td>("action":"deleted")</td>
  </tr>
  <tr><td colspan="4" style="font-weight:bold">Resource Assignments</td></tr>
  <tr>
  <td>add a new assignment</td>
  <td>POST</td>
  <td>/apiUrl/assignment</td>
  <td>("action":"inserted","tid":"id")</td>
  </tr>
  <tr>
  <td>update an assignment</td>
  <td>PUT</td>
  <td>/apiUrl/assignment/id</td>
  <td>("action":"updated")</td>
  </tr>
  <tr>
  <td>delete an assignment</td>
  <td>DELETE</td>
  <td>/apiUrl/assignment/id</td>
  <td>("action":"deleted")</td>
  </tr>
</table>

:::note
默认情况下，Resources 和 Resource Assignments 不会发送到 DataProcessor。如果需要，可以显式开启此行为。
请在这里阅读 [guides/server-side.md#resources_crud](guides/server-side.md#resources_crud)。
:::


### 请求参数 {#requestparams}

创建/更新/删除请求将包含客户端任务或链接对象的所有公共属性：

Task:

- **start_date**: 2025-04-08 00:00:00
- **duration**: 4
- **text**: Task #2.2
- **parent**: 3
- **end_date**: 2025-04-12 00:00:00

Link:

- **source**: 1
- **target**: 2
- **type**: 0

注释：

- **start_date** 和 **end_date** 参数的格式由 [](api/config/date_format.md) 配置定义。
- 客户端会发送任务或链接对象的所有公共属性。因此，请求可能包含任意数量的附加参数。
- 如果通过向数据模型中添加新的列/属性来扩展数据模型，则不需要执行额外操作即可让 gantt 将它们发送到后端。

:::note
这里所说的公共属性指的是名称不以下划线 (_) 或美元符号 ($) 开头的属性，例如名为 **task._owner** 或 **link.$state** 的属性不会发送到后端。
:::


### REST-JSON 模式 {#restjson}

除了 "POST","GET","REST" 和 "JSON" 交易模式之外，Gantt DataProcessor 还可以在 "REST-JSON" 模式下使用。

~~~js
gantt.load("apiUrl");

const dp = gantt.createDataProcessor({
    url: "/apiUrl",
    mode: "REST-JSON"
});
~~~

它使用与 [请求的 URL](#requestresponsedetails) 相同的 URL，但任务和链接的 [请求参数](#requestparams) 以及发送到服务器的形式不同。

在 REST 模式中，数据以表单形式发送到服务器：

~~~jsx
Content-Type: application/x-www-form-urlencoded
~~~

而在 REST-JSON 模式中，数据以 JSON 格式发送：

~~~jsx title="Headers"
Content-type: application/json
~~~

因此，参数作为 JSON 对象发送：

- Task

~~~jsx
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

- Link

~~~jsx
{
    "source": 1,
    "target": 2,
    "type": "0"
}
~~~

这种格式使在任何服务器端平台上处理复杂记录更加方便。


### 服务端 {#loadserverside}

在甘特图执行的每个操作（添加、更新或删除任务或链接）时，dataProcessor 会通过向服务器发送 AJAX 请求来作出响应。

每个请求都包含在数据库中保存变更所需的所有数据。由于我们在 REST 模式下初始化 dataProcessor，因此它会为每种操作使用不同的 HTTP 动词。

由于使用 REST API，可以使用不同的框架和编程语言来实现服务端。下面是可用于 Gantt 后端集成的现成服务端实现列表：

- [dhtmlxGantt with ASP.NET Core 2](integrations/dotnet/howtostart-dotnet-core.md)
- [dhtmlxGantt with PHP: Slim](integrations/php/howtostart-php-slim4.md)
- [dhtmlxGantt with PHP: Laravel](integrations/php/howtostart-php-laravel.md)
- [dhtmlxGantt with Node.js](integrations/node/howtostart-nodejs.md)
- [dhtmlxGantt with ASP.NET MVC](integrations/dotnet/howtostart-dotnet.md)
- [dhtmlxGantt with Ruby on Rails](integrations/other/howtostart-ruby.md)


### 存储任务顺序 {#storingtheorderoftasks}

Gantt 按数据源返回的顺序显示任务。如果您允许用户手动重新排序任务，您还需要在数据库中存储此顺序，并确保数据源返回的数据按正确顺序排序。

客户端配置：

~~~js
// 在整个 gantt 内重新排序任务
gantt.config.order_branch = true;
gantt.config.order_branch_free = true;
 
gantt.init("gantt_here");
gantt.load("/api");

const dp = gantt.createDataProcessor({
    url: "/api",
    mode: "REST"
});
~~~

保存排序的实现方式有多种，我们将展示其中一种。

- 您在任务表中添加一个数值列，称之为 'sortorder'。
- 在处理 GET 操作时，按该列进行升序排序。
- 当新任务被添加时，应该将 sortorder 设置为 `MAX(sortorder) + 1`。
- 当客户端改变顺序时，gantt 将发送带有任务所有属性以及描述任务在项目树中位置的值的 PUT（如果不使用 REST 模式则为 POST）请求。

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

它的值可能以以下两种格式出现：

 - *target="targetId"*  - 当前任务应紧挨着 <b>在 targetId 任务之前</b>
 - *target="next:targetId"* - 当前任务应紧挨着 <b>在 targetId 任务之后</b>

应用排序变更通常涉及更新多个任务，以下是实现的伪代码示例：

~~~js
const target = request["target"];
const currentTaskId = request["id"];
let nextTask;
let targetTaskId;

// 获取相邻任务的 id，并检查更新的任务应在它之前还是之后
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

// 更新的任务将获得相邻任务的 sortorder 值
let targetOrder = targetTask.sortorder;

// 如果应在相邻任务之后，则应获得更大的 sortorder
if (nextTask) targetOrder++;

// 将应在更新任务之后的任务的 sortorder 提高
tasks.where(task => task.sortorder >= targetOrder)
    .update(task => task.sortorder++);

// 并将更新任务的 sortorder 设置为新的值
currentTask.sortorder = targetOrder;

tasks.save(currentTask);
~~~

您可以查看某些服务器端平台上实现存储任务顺序的详细示例：
[plain PHP](integrations/php/howtostart-php.md#storingtheorderoftasks)，[Laravel](integrations/php/howtostart-php-laravel.md#storingtheorderoftasks)，
[Node.js](integrations/node/howtostart-nodejs.md#storingtheorderoftasks)、[ASP.NET Web API](integrations/dotnet/howtostart-dotnet.md#storingtheorderoftasks) 与
[Rails](integrations/other/howtostart-ruby.md#storingtheorderoftasks)。


## 自定义请求头与参数

### 添加自定义请求头

您可以向后端发送额外的头信息。比如，假设需要在请求中添加授权令牌：

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

当前，[](api/method/load.md) 尚不支持头部/负载参数，因此如果您需要在 GET 请求中使用它们，您将需要手动发送 xhr 并使用 [](api/method/parse.md) 将数据加载到 gantt 中，例如：

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


### 向请求添加自定义参数

有几种方式向请求中添加额外参数。

如您所知，gantt 会将数据对象的所有属性发送回后端。因此，您可以直接向数据对象添加一个额外属性，它将被发送到后端：

~~~js
gantt.attachEvent("onTaskCreated", (task) => {
    task.userId = currentUser;
    return true;
});
~~~

或者，您可以通过使用数据处理器发送的所有请求来添加自定义参数，使用 **payload** 属性：

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

还有一种向请求添加自定义参数的方式是使用 DataProcessor 的 [onBeforeUpdate](api/other/dataprocessor.md) 事件：

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

如果您已经初始化了 dataProcessor，用户或程序性所做的任何变更都将自动保存到数据源中。

通常，要以编程方式更新特定任务或依赖项，请分别使用 [](api/method/updatetask.md) 和 [](api/method/updatelink.md) 方法：

~~~js
gantt.parse([
    { id: 1, text: "Task 1", start_date: "2025-05-13 06:00", duration: 2 },
    { id: 2, text: "Task 2", start_date: "2025-05-19 08:00", duration: 3 }
]);

const task = gantt.getTask(1);
task.text = "Task 37"; //修改任务的数据
gantt.updateTask(1); // 渲染更新后的任务
~~~

触发向后端发送更新的其他方法有：
- [addTask](api/method/addtask.md)
- [updateTask](api/method/updatetask.md)
- [deleteTask](api/method/deletetask.md)
- [addLink](api/method/addlink.md)
- [updateLink](api/method/updatelink.md)
- [deleteLink](api/method/deletelink.md)


## 自定义路由 {#customrouting}

如果后端的 RESTful AJAX API 不是您需要的，或者您想手动控制发送到服务器的内容，可以使用自定义路由。

例如，如果您使用 Angular、React 或其他框架，页面上的组件不会直接将变更发送到服务器，而是将变更传递给负责数据保存的另一个组件。

要为 DataProcessor 提供自定义路由选项，您应当使用 [**createDataProcessor()**](#createdp) 方法：

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


**相关示例**： [自定义数据 API - 使用本地存储](https://docs.dhtmlx.com/gantt/samples/08_api/22_data_processor.html)


### 使用 AJAX 设置自定义路由器

[Gantt AJAX 模块](api/other/ajax.md) 在设置自定义路由时很有用。Gantt 希望自定义路由器在操作结束时返回一个 Promise 对象，这样可以捕捉到操作的结束。

AJAX 模块支持 Promise，适用于自定义路由中的使用。当 Promise 被解析时，Gantt 将获取 Promise 的内容并处理。

下面的示例中创建了一个新任务。如果服务器返回的新任务 id，Gantt 将能够应用它。

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


## 对资源和资源分配的路由 CRUD 操作 {#resources_crud}

从 v8.0 开始，可以将修改后的资源分配作为带有持久化 ID 的单独条目发送到 DataProcessor，从而方便地连接到后端 API。对资源对象的修改也可以发送给 DataProcessor。

注意，该功能默认是禁用的。默认情况下，DataProcessor 只接收对任务和链接所做的变更。要启用该功能，请使用以下设置：

~~~js
gantt.config.resources = {
    dataprocessor_assignments: true,
    dataprocessor_resources: true,
};
~~~

一旦 DataProcessor 的资源模式启用，如果 DataProcessor 配置为 REST 模式——资源和资源分配将以单独的请求发送到后端。

如果您在 Custom Routing 模式下使用 DataProcessor，您将能够在处理程序中捕获资源分配和资源的变更：

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

或者，使用函数声明的方式：

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

服务器可以通过返回 "action":"error" 的响应来通知 Gantt 某个操作失败：

~~~js
{"action":"error"}
~~~

这种响应可以通过 gantt.dataProcessor 在客户端捕获：

~~~js
const dp = gantt.createDataProcessor({
    url: "/api",
    mode: "REST"
});

dp.attachEvent("onAfterUpdate", (id, action, tid, response) => {
    if (action === "error") {
        // 在此处执行某些操作
    }
});
~~~

响应对象可以包含任意数量的附加属性，可以通过 onAfterUpdate 处理程序的 response 参数来访问。

:::note
该事件仅在返回如上所示的 JSON 响应的托管错误时被调用。如果您需要处理 HTTP 错误，请查看 [api/event/onajaxerror.md] API 事件。
:::

如果服务器对某些操作返回了错误，但客户端已保存了变更，最好的同步它们状态的方法是清空客户端状态，并从服务器端重新加载正确的数据：

~~~js
dp.attachEvent("onAfterUpdate", (id, action, tid, response) => {
    if (action === "error") {
        gantt.clearAll();
        gantt.load("url1");
    }
});
~~~

如果您想在同步客户端-服务器端但又不想进行任何服务器调用时，可以使用 [silent()](api/method/silent.md) 方法，它会让其中的代码不触发内部事件或服务器调用：

~~~js
gantt.silent(() => {
    gantt.deleteTask(item.id);
});

gantt.render();
~~~


## 级联删除

默认情况下，删除任务会触发其嵌套任务及相关链接的级联删除。Gantt 会为每个被删除的任务和链接发送一个 *delete* 请求。 因此，您不需要在后端维护数据一致性，Gantt 处理得相当妥当。

另一方面，这种策略可能会向后端 API 产生大量的 AJAX 调用，因为 dhtmlxGantt 不支持 AJAX 的批量请求，且任务和链接的数量没有上限。 

在这种情况下，可以通过配置 [cascade_delete](api/config/cascade_delete.md) 禁用级联删除。 因此，当一个项目分支被删除时，客户端将仅为顶层项发送删除请求，并期望后端删除相关的链接和子任务。


## XSS、CSRF 与 SQL 注入攻击

请注意，Gantt 不提供任何机制来防止应用程序受到诸如 SQL 注入、XSS 与 CSRF 攻击等威胁。确保应用安全的责任在实现后端的开发人员身上。

请查阅 [](guides/app-security.md) 文章，了解组件的最易受攻击点，以及可以采取的措施以提升应用程序的安全性。
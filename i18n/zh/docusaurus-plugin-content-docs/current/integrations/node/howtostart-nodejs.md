---
title: "Node.js 的 dhtmlxGantt"
sidebar_label: "Node.js"
---

# Node.js 的 dhtmlxGantt

当前教程旨在在服务器端使用 Node.js 和 REST API 创建 Gantt。  
如果你使用其他技术，请查看下方可用的集成变体列表：

- [dhtmlxGantt 与 ASP.NET Core](integrations/dotnet/howtostart-dotnet-core.md)
- [dhtmlxGantt 与 ASP.NET MVC](integrations/dotnet/howtostart-dotnet.md)
- [dhtmlxGantt 与 Python](integrations/other/howtostart-python.md)
- [dhtmlxGantt 与 PHP: Laravel](integrations/php/howtostart-php-laravel.md)
- [dhtmlxGantt 与 PHP:Slim](integrations/php/howtostart-php-slim4.md)
- [dhtmlxGantt 与 Salesforce LWC](integrations/salesforce/howtostart-salesforce.md)
- [dhtmlxGantt 与 Ruby on Rails](integrations/other/howtostart-ruby.md)

我们基于 REST API 来实现 Node.js 的 Gantt，与服务器通信。  
Node.js 拥有一系列现成的解决方案，因此我们不必从头开始编写所有代码。我们还将使用 MySQL 作为数据存储。

:::note
完整源代码可在 [GitHub 上获得](https://github.com/DHTMLX/gantt-howto-node)。
:::

你也可以查看展示如何使用 Node.js 创建 Gantt 图的视频教程。

<iframe width="704" height="400" src="https://www.youtube.com/embed/D8YzyzBfyP8" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## 第1步。创建一个项目

首先，我们将创建一个项目文件夹，然后添加所需的依赖项。将使用以下模块：

- [Express](https://expressjs.com/) - 一个用于 Node.js 的小型框架
- [body-parser](https://www.npmjs.com/package/body-parser) - Node.js 解析工具

因此，让我们创建一个名为 "dhx-gantt-app" 的项目文件夹并进入其中：

~~~js
mkdir dhx-gantt-app
cd dhx-gantt-app
~~~

### 添加依赖

现在我们将创建 *package.json* 文件，并用以下命令在其中指定依赖项：

~~~js
npm init -y
~~~

文件准备好后，打开它并将上述依赖项放入其中。结果将类似于下面这样：


~~~js title="package.json"
{
  "name": "dhx-gantt-app",
  "version": "1.0.3",
  "description": "",
  "main": "server.js",
  "dependencies": {
    "body-parser": "^2.2.1",
    "express": "^5.2.1"
  },
  "scripts": {
    "test": "echo "Error: no test specified" && exit 1",
    "start": "node server.js"
  },
  "keywords": [],
  "author": "",
  "license": "MIT"
}
~~~

最后，我们需要使用下面的命令安装所添加的依赖项：

~~~js
npm install
~~~

### 准备后端

我们将遵循一个基本的 [express](https://expressjs.com/) 设置：应用的后端将有一个单独的 JS 文件（我们称之为 "server.js"），一个用于静态文件的文件夹（命名为 "public"）以及一个单独的 HTML 页面。  

整个项目结构将如下所示：

~~~html
dhx-gantt-app
├── node_modules
├── server.js 
├── package.json 
└── public 
    └── index.html 
~~~

创建一个名为 <b>server.js</b> 的新文件，并将以下代码写入其中：

~~~js title="server.js"
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const port = 1337;
const app = express();

app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(port, () =>{
    console.log("Server is running on port "+port+"...");
});
~~~

这段代码中我们完成了以下工作：

- 指定静态文件将从 'public' 文件夹提供
- 将应用绑定到本地主机的 1337 端口

下一步我们将创建 "public" 文件夹。该文件夹将包含我们应用的主页面 - *index.html*。

:::note
该文件夹也是放置 dhtmlxGantt 的 js/css 文件的正确位置。不过，在本教程中我们将从 CDN 加载 gantt，因此这里只放置一个 HTML 页面。
:::

## 第2步。将 Gantt 添加到页面

让我们创建 *public* 文件夹并在其中添加一个 *index.html* 文件。然后打开 *index.html* 文件，填入以下内容：

~~~html title="index.html"
<!DOCTYPE html>
<head>
  <meta http-equiv="Content-type" content="text/html; charset="utf-8"">

  <script src="https://cdn.dhtmlx.com/gantt/edge/dhtmlxgantt.js"></script>
  <link href="https://cdn.dhtmlx.com/gantt/edge/dhtmlxgantt.css" rel="stylesheet">

  <style type="text/css">
    html, body{
      height:100%;
      padding:0px;
      margin:0px;
      overflow: hidden;
    }
  </style>
</head>
<body>
  <div id="gantt_here" style='width:100%; height:100%;'></div>
  <script type="text/javascript">
    gantt.init("gantt_here");
  </script>
</body>
~~~

现在来检查我们目前的情况。进入项目文件夹，并从命令行执行以下命令：

~~~js
node server.js
~~~

然后在浏览器中打开 [http://127.0.0.1:1337](http://127.0.0.1:1337)。你应该会看到一个空的 gantt 页面，如下所示：

![gantt_init](/img/gantt_init.png)

## 第3步。准备数据库

下一步是创建数据库。我们将创建一个包含两个表的简单数据库：一个用于任务，一个用于链接：

~~~js
CREATE TABLE `gantt_links` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `source` int(11) NOT NULL,
  `target` int(11) NOT NULL,
  `type` varchar(1) NOT NULL,
  PRIMARY KEY (`id`)
);
CREATE TABLE `gantt_tasks` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `text` varchar(255) NOT NULL,
  `start_date` datetime NOT NULL,
  `duration` int(11) NOT NULL,
  `progress` float NOT NULL,
  `parent` int(11) NOT NULL,
  PRIMARY KEY (`id`)
);
~~~

并添加一些测试数据：
~~~js
INSERT INTO `gantt_tasks` VALUES ('1', 'Project #1', '2026-04-01 00:00:00', 
  '5', '0.8', '0');
INSERT INTO `gantt_tasks` VALUES ('2', 'Task #1', '2026-04-06 00:00:00', 
  '4', '0.5', '1');
INSERT INTO `gantt_tasks` VALUES ('3', 'Task #2', '2026-04-05 00:00:00', 
  '6', '0.7', '1');
INSERT INTO `gantt_tasks` VALUES ('4', 'Task #3', '2026-04-07 00:00:00', 
  '2', '0', '1');
INSERT INTO `gantt_tasks` VALUES ('5', 'Task #1.1', '2026-04-05 00:00:00', 
  '5', '0.34', '2');
INSERT INTO `gantt_tasks` VALUES ('6', 'Task #1.2', '2026-04-11 13:22:17', 
  '4', '0.5', '2');
INSERT INTO `gantt_tasks` VALUES ('7', 'Task #2.1', '2026-04-07 00:00:00',
  '5', '0.2', '3');
INSERT INTO `gantt_tasks` VALUES ('8', 'Task #2.2', '2026-04-06 00:00:00', 
  '4', '0.9', '3');
~~~

查看更详细的示例请参阅此处 [guides/loading.md#databasestructure](guides/loading.md#databasestructure)。

## 第4步。加载数据

现在我们需要实现数据加载。

由于我们使用 MySQL，因此需要安装可用于访问数据库的必要模块。本教程中的 CRUD 操作将基于 Promise 的方法实现。因此，我们将使用 [promise-mysql](https://www.npmjs.com/package/promise-mysql)——一个使用 Promise 操作 MySQL 的 Node.js 包，以及 [bluebird](https://www.npmjs.com/package/bluebird) Promise 库。

要安装它们，我们可以在控制台中执行以下命令。请指定以下组件的版本，因为较新的版本彼此之间不兼容，或没有旧函数：

~~~js
npm install bluebird@3.7.2 --save
npm install promise-mysql@5.1.0 --save
npm install date-format-lite@17.7.0 --save
~~~

你也可以选择其他合适的模块。代码相当简单，可以使用不同工具集实现相同逻辑。

客户端期望的数据为 [JSON 格式](guides/supported-data-formats.md)。因此，我们将创建一个路由来返回这类数据。

正如你可能提到的，数据中有一个 "start_date" 属性，它被保留为日期对象。因此，应该以正确的格式传递给客户端。为此，我们将使用另一个模块 - [date-format-lite](https://github.com/litejs/date-format-lite)。

~~~js
npm install date-format-lite --save
~~~

现在你应该打开 *server.js* 文件，并用以下代码更新它：


~~~js title="server.js"
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const port = 1337;
const app = express();

app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(port, () =>{
    console.log("Server is running on port "+port+"...");
});

const Promise = require('bluebird');
require("date-format-lite");

const mysql = require('promise-mysql');
async function serverСonfig() {
    const db = await mysql.createPool({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'gantt_howto_node'
    });
    app.get("/data", (req, res) => {
        Promise.all([
            db.query("SELECT * FROM gantt_tasks"),
            db.query("SELECT * FROM gantt_links")
        ]).then(results => {
            let tasks = results[0],
                links = results[1];

            for (let i = 0; i < tasks.length; i++) {
              tasks[i].start_date = tasks[i].start_date.format("YYYY-MM-DD hh:mm:ss");
            }

            res.send({
                data: tasks,
                collections: { links }
            });

        }).catch(error => {
            sendResponse(res, "error", null, error);
        });
    });

    function sendResponse(res, action, tid, error) {

        if (action == "error")
            console.log(error);

        let result = {
            action: action
        };
        if (tid !== undefined && tid !== null)
            result.tid = tid;

        res.send(result);
    }
};
serverСonfig();
~~~



我们在这段代码中所做的事情：

- 打开了与数据库的 MySql 连接
- 定义对于 <b>GET /data</b> 请求，我们将从 tasks 和 links 表中读取数据，并将其格式化以便客户端解析

现在，我们可以从客户端调用这个路由：

~~~js title="public/index.html"
gantt.config.date_format = "%Y-%m-%d %H:%i:%s";/*!*/
gantt.config.open_tree_initially = true;
  
gantt.init("gantt_here");

gantt.load("/data");/*!*/
~~~

注意，日期格式配置 [date_format](api/config/date_format.md) 指定了来自服务器的日期（任务的 <b>start_date</b>）的格式。配置项 [gantt.config.open_tree_initially](api/config/open_tree_initially.md) 设置为 `true`，以确保开始时任务树是展开的。

现在通过打开 [http://127.0.0.1:1337](http://127.0.0.1:1337) 来运行应用程序。Gantt 将加载我们之前向数据库中添加的测试数据。

![load_data_nodejs](/img/load_data_nodejs.png)

## 第5步。保存变更

最后一步是实现数据保存。  
为此，我们需要一段代码，将客户端上的更新发送回服务器。前往 *public/index.html* 并在页面中加入 [gantt.createDataProcessor](guides/server-side.md#technique)：

~~~js title="public/index.html"
gantt.config.date_format = "%Y-%m-%d %H:%i:%s";
  
gantt.init("gantt_here");

gantt.load("/data");
  
const dp = gantt.createDataProcessor({ /*!*/
  url: '/data', /*!*/
  mode: 'REST', /*!*/
}); /*!*/
~~~


让我们深入了解它的作用。

### 请求和响应

在每次用户操作（添加、修改或删除任务或链接）时，DataProcessor 将通过 AJAX 请求响应相应的 URL。请求将包含用于将变更保存到数据库所需的所有参数。

由于 DataProcessor 以 REST 模式初始化，它对每种操作类型将使用不同的 HTTP 动词。带有请求和响应细节的 HTTP 动词列表请参阅 [Server-Side Integration](guides/server-side.md#technique) 文章。

现在需要做的是在 *server.js* 文件中添加所需的路由和处理程序，以将客户端所做的更改写入数据库。生成的代码将相当冗长：

~~~js title="server.js"
// add a new task
app.post("/data/task", (req, res) => {
    let task = getTask(req.body);
    const { text, start_date, duration, progress, parent } = task;

    db.query("INSERT INTO gantt_tasks(text, start_date, duration, progress, parent)"
        + " VALUES (?,?,?,?,?)",
        [text, start_date, duration, progress, parent])
    .then(result => {
        sendResponse(res, "inserted", result.insertId);
    })
    .catch(error => {
        sendResponse(res, "error", null, error);
    });
});

// update a task
app.put("/data/task/:id", (req, res) => {
    let sid = req.params.id,
        task = getTask(req.body);
    const { text, start_date, duration, progress, parent } = task;

    db.query("UPDATE gantt_tasks SET text = ?, start_date = ?, "
        + "duration = ?, progress = ?, parent = ? WHERE id = ?",
        [text, start_date, duration, progress, parent, sid])
    .then(result => {
        sendResponse(res, "updated");
    })
    .catch(error => {
        sendResponse(res, "error", null, error);
    });
});

// delete a task
app.delete("/data/task/:id", (req, res) => {
    let sid = req.params.id;
    db.query("DELETE FROM gantt_tasks WHERE id = ?", [sid])
    .then(result => {
        sendResponse(res, "deleted");
    })
    .catch(error => {
        sendResponse(res, "error", null, error);
    });
});

// add a link
app.post("/data/link", (req, res) => {
    let link = getLink(req.body);
    const { source, target, type } = link;

    db.query("INSERT INTO gantt_links(source, target, type) VALUES (?,?,?)",
        [source, target, type])
    .then(result => {
        sendResponse(res, "inserted", result.insertId);
    })
    .catch(error => {
        sendResponse(res, "error", null, error);
    });
});

// update a link
app.put("/data/link/:id", (req, res) => {
    let sid = req.params.id,
        link = getLink(req.body);
    const { source, target, type, sid } = link;

    db.query("UPDATE gantt_links SET source = ?, target = ?, type = ? WHERE id = ?",
        [source, target, type, sid])
    .then(result => {
        sendResponse(res, "updated");
    })
    .catch(error => {
        sendResponse(res, "error", null, error);
    });
});

// delete a link
app.delete("/data/link/:id", (req, res) => {
    let sid = req.params.id;
    db.query("DELETE FROM gantt_links WHERE id = ?", [sid])
    .then(result => {
        sendResponse(res, "deleted");
    })
    .catch(error => {
        sendResponse(res, "error", null, error);
    });
}


function getTask(data) {
    return {
        text: data.text,
        start_date: data.start_date.date("YYYY-MM-DD"),
        duration: data.duration,
        progress: data.progress || 0,
        parent: data.parent
    };
}

function getLink(data) {
    return {
        source: data.source,
        target: data.target,
        type: data.type
    };
}
~~~

我们创建了两组路由：一组用于 *tasks* 实体，另一组用于 *links* 实体。  
因此，*"/data/task"* URL 将用于与任务相关的请求，*"/data/link"* URL 将用于包含与链接相关操作的数据的请求。

请求类型相当简单：

- POST - 向数据库中插入新项
- PUT - 更新现有记录
- DELETE - 删除项

响应将是一个包含所执行操作类型的 JSON 对象，或在代码失败时返回 "error"。

POST 请求的响应还将包含新记录在数据库中的 ID。它将应用于客户端，因此可以将新项目映射到数据库实体。

就这些。打开 [http://127.0.0.1:1337](http://127.0.0.1:1337)，你将看到一个完全可运行的甘特图。

![ready_gantt_nodejs](/img/ready_gantt_nodejs.png)


## 存储任务的顺序 {#storingtheorderoftasks}

客户端的甘特图允许通过拖放来对任务进行重新排序。因此，如果你使用此功能，你需要将其顺序存储在数据库中。你可以在这里查看通用描述 [guides/server-side.md#storingtheorderoftasks](guides/server-side.md#storingtheorderoftasks)。

现在让我们将此功能添加到我们的应用中。

### 在客户端启用任务重新排序

首先，我们需要允许用户在 UI 中更改任务的顺序。打开 "Index" 视图并更新 gantt 的配置：

~~~js title="public/index.html"
gantt.config.order_branch = true;/*!*/
gantt.config.order_branch_free = true;/*!*/

gantt.init("gantt_here");
~~~


现在，在后端反映这些更改。我们将把顺序存储在名为 "sortorder" 的列中，更新后的 *gantt_tasks* 表声明可能如下所示：

~~~js
CREATE TABLE `gantt_tasks` (
  `id` int(11) NOT NULL  AUTO_INCREMENT PRIMARY KEY,
  `text` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `start_date` datetime NOT NULL,
  `duration` int(11) NOT NULL,
  `progress` float NOT NULL DEFAULT 0,
  `parent` int(11) NOT NULL,
  `sortorder` int(11) NOT NULL /*!*/
) ENGINE="InnoDB" DEFAULT CHARSET="utf8" COLLATE="utf8_unicode_ci;"
~~~

或者在你已有的表中添加该列：

~~~js
ALTER TABLE `gantt_tasks` ADD COLUMN `sortorder` int(11) NOT NULL;
~~~

之后，我们需要更新 *server.js* 文件：

1 . <b>GET /data</b> 必须按 `sortorder` 列排序返回任务： 

~~~js title="server.js"
app.get("/data", (req, res) => {
    Promise.all([
        db.query("SELECT * FROM gantt_tasks ORDER BY sortorder ASC"), /*!*/
        db.query("SELECT * FROM gantt_links")
    ]).then(results => {
        let tasks = results[0],
            links = results[1];

        for (let i = 0; i < tasks.length; i++) {
            tasks[i].start_date = tasks[i].start_date.format("YYYY-MM-DD hh:mm:ss");
            tasks[i].open = true;
        }

        res.send({
            data: tasks,
            collections: { links }
        });

    }).catch(error => {
        sendResponse(res, "error", null, error);
    });
});
~~~


2 . 新增的任务必须获得初始值 `sortorder`： 

~~~js title="server.js"
app.post("/data/task", (req, res) => { // adds new task to database
    let task = getTask(req.body);

    db.query("SELECT MAX(sortorder) AS maxOrder FROM gantt_tasks")
    .then(result => { /*!*/ 
        // assign max sort order to new task
        let orderIndex = (result[0].maxOrder || 0) + 1; /*!*/
        return db.query("INSERT INTO gantt_tasks(text, start_date, duration," 
          + "progress, parent, sortorder) VALUES (?,?,?,?,?,?)",
          [task.text, task.start_date, task.duration, task.progress, task.parent, 
            orderIndex]); /*!*/
    })
    .then(result => {
        sendResponse(res, "inserted", result.insertId);
    })
    .catch(error => {
        sendResponse(res, "error", null, error);
    });
});
~~~


3 . 最后，当用户对任务重新排序时，任务顺序必须被 [更新](guides/server-side.md#storingtheorderoftasks)：

~~~js title="server.js"
 // update task
app.put("/data/task/:id", (req, res) => {
  let sid = req.params.id,
    target = req.body.target,
    task = getTask(req.body);

  Promise.all([
    db.query("UPDATE gantt_tasks SET text = ?, start_date = ?," 
      + "duration = ?, progress = ?, parent = ? WHERE id = ?",
      [task.text, task.start_date, task.duration, task.progress, 
        task.parent, sid]),
    updateOrder(sid, target) /*!*/
  ])
    .then(result => {
      sendResponse(res, "updated");
    })
    .catch(error => {
      sendResponse(res, "error", null, error);
    });
});

function updateOrder(taskId, target) {
  let nextTask = false;
  let targetOrder;

  target = target || "";

  if (target.startsWith("next:")) {
    target = target.substr("next:".length);
    nextTask = true;
  }

  return db.query("SELECT * FROM gantt_tasks WHERE id = ?", [target])
    .then(result => {
      if (!result[0])
        return Promise.resolve();

      targetOrder = result[0].sortorder;
      if (nextTask)
        targetOrder++;

      return db.query("UPDATE gantt_tasks SET sortorder"+
        " = sortorder + 1 WHERE sortorder >= ?", [targetOrder])
      .then(result => {
        return db.query("UPDATE gantt_tasks SET sortorder = ? WHERE id = ?",
          [targetOrder, taskId]);
      });
    });
}
~~~

你可以在 GitHub 上查看一个现成的演示 https://github.com/DHTMLX/gantt-howto-node。

## 应用安全

Gantt 本身并不提供防御各种威胁（如 SQL 注入、XSS 和 CSRF 攻击）的手段。实现应用安全的责任在于实现后端的开发人员。请在相应文章中了解详细信息 [在此处](guides/app-security.md)。

## 故障排除

如果你完成了上述将 Gantt 与 Node.js 集成的步骤，但在页面上没有呈现任务和链接，请查看 [Troubleshooting Backend Integration Issues](guides/troubleshooting.md) 文章。它描述了识别问题根源的方法。

## 下一步

现在你已经拥有一个功能完善的甘特图。你可以在 [GitHub](https://github.com/DHTMLX/gantt-howto-node) 查看完整代码，克隆或下载它并将其用于你的项目。

你也可以查看 [关于甘特图众多功能的指南](guides.md) 或关于 [将 Gantt 与其他后端框架集成的教程](integrations/howtostart-guides.md)。
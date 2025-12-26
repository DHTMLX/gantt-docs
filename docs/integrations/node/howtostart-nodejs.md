---
title: "dhtmlxGantt with Node.js"
sidebar_label: "Node.js"
---

# dhtmlxGantt with Node.js 

The current tutorial is intended for creating Gantt with Node.js and REST API on the server side. 
If you use some other technology, check the list of available integration variants below:

- [dhtmlxGantt with ASP.NET Core](integrations/dotnet/howtostart-dotnet-core.md)
- [dhtmlxGantt with ASP.NET MVC](integrations/dotnet/howtostart-dotnet.md)
- [dhtmlxGantt with Python](integrations/other/howtostart-python.md)
- [dhtmlxGantt with PHP: Laravel](integrations/php/howtostart-php-laravel.md)
- [dhtmlxGantt with PHP:Slim](integrations/php/howtostart-php-slim4.md)
- [dhtmlxGantt with Salesforce LWC](integrations/salesforce/howtostart-salesforce.md)
- [dhtmlxGantt with Ruby on Rails](integrations/other/howtostart-ruby.md)

Our implementation of Gantt with Node.js will be based on REST API that will be used for communication with a server. 
Node.js has a set of ready-made solutions, so we won't have to code everything from the very beginning. We will also use MySQL as a data storage.

:::note
The complete source code is [available on GitHub](https://github.com/DHTMLX/gantt-howto-node).
:::


You can have a look at the video guide that shows how to create a Gantt chart using Node.js.

<iframe width="704" height="400" src="https://www.youtube.com/embed/D8YzyzBfyP8" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Step 1. Creating a project

To begin with, we'll create a project folder and then add the required dependencies. We'll make use of the following modules:

- [Express](https://expressjs.com/) - a tiny framework for Node.js
- [body-parser](https://www.npmjs.com/package/body-parser) - a Node.js parsing tool


So, let's create a project folder and name it "dhx-gantt-app":

~~~js
mkdir dhx-gantt-app
cd dhx-gantt-app
~~~


### Adding the dependencies

Now we will create the *package.json* file. We'll specify the dependencies in it with the following command:

~~~js
npm init -y
~~~

When the file is ready, open it and put the above listed dependencies into it. The result will look similar to this one:


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

Finally, we need to install the added dependencies using the command below:

~~~js
npm install
~~~

### Preparing the backend

We'll follow a basic [express](https://expressjs.com/) setup: we'll have a single js file for our app backend (let's call it "server.js"),
a folder for static files (named "public") and a single html page. 

The whole project structure will be as follows:

~~~html
dhx-gantt-app
├── node_modules
├── server.js 
├── package.json 
└── public 
    └── index.html 
~~~


Create a new file named <b>server.js</b> and add the following code into it:


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

What we have done in this code:

- defined that static files will be served from the 'public' folder 
- attached the application to 1337 port of the localhost


On the next step we will create the "public" folder. This folder will contain the main page of our application - *index.html*.

:::note
This folder is also the right place to put js/css files of dhtmlxGantt. However, in this tutorial we're going to load gantt from CDN, so we'll only have an html page there.
:::

## Step 2. Adding Gantt to the page

Let's create the *public* folder and add an *index.html* file into it. Then open the *index.html* file and fill it with the following content:


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

Let's check what we have got at the moment. Go to the project folder and run the following command from the command line:

~~~js
node server.js
~~~

Then open http://127.0.0.1:1337 in a browser. You should see a page with an empty gantt like the one shown here:

![gantt_init](/img/gantt_init.png)

## Step 3. Preparing a database

The next step is to create a database. We'll make a simple database with two tables for tasks and links:

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

and add some test data:
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

Check a detailed example [here](guides/loading.md#databasestructure).


## Step 4. Loading data

Now we need to implement data loading. 

Since we use MySQL, we need to install necessary modules that we could use to access it. In this tutorial CRUD operations will be implemented based on the promises approach.
So, we will use [promise-mysql](https://www.npmjs.com/package/promise-mysql) - a Node.js package for working with MySQL using promises and 
the [bluebird](https://www.npmjs.com/package/bluebird) promise library.

To install them we can use the console. We need to specify the following component versions as the newer ones aren't compatible with one another or don't have old functions:

~~~js
npm install bluebird@3.7.2 --save
npm install promise-mysql@5.1.0 --save
npm install date-format-lite@17.7.0 --save
~~~

You can choose any other appropriate modules. The code is fairly simple and you can implement the same logic using a different set of tools.

The client side expects data in the [JSON format](guides/supported-data-formats.md). So, we'll create a route which will return this kind of data.

As you've probably mentioned, there is the "start_date" property in the data, which is kept as a date object. Therefore, it should be passed to the client in the 
proper format. For this purpose, we will use another module - [date-format-lite](https://github.com/litejs/date-format-lite). 

~~~js
npm install date-format-lite --save
~~~

Now you should open the *server.js* file and update its code with the following:


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

What we have done in this code:

- opened MySql connection to our database 
- defined that on the <b>GET /data</b> request we'll read data from tasks and links tables and format them so they could be parsed on the client

Now, we can call this route from the client:

~~~js title="public/index.html"
gantt.config.date_format = "%Y-%m-%d %H:%i:%s";/*!*/
gantt.config.open_tree_initially = true;
  
gantt.init("gantt_here");

gantt.load("/data");/*!*/
~~~

Note that [date_format](api/config/date_format.md) config specifies the format of dates (<b>start_date</b> of the task) that comes from the server. The [gantt.config.open_tree_initially](api/config/open_tree_initially.md) config is set to `true` to ensure that the tasks tree will be initially expanded.

Let's run the application now by opening http://127.0.0.1:1337. The gantt will be loaded with the test data that we have previously added into the database.

![load_data_nodejs](/img/load_data_nodejs.png)

## Step 5. Saving changes

The last thing that we should implement is data saving. 
For this we need a code that will send updates happening on the client side back to the server.
Go to *public/index.html* and add [gantt.createDataProcessor](guides/server-side.md#technique) to the page:


~~~js title="public/index.html"
gantt.config.date_format = "%Y-%m-%d %H:%i:%s";
  
gantt.init("gantt_here");

gantt.load("/data");
  
const dp = gantt.createDataProcessor({ /*!*/
  url: '/data', /*!*/
  mode: 'REST', /*!*/
}); /*!*/
~~~

Let's go deeper and see what role it plays. 

### Requests and responses

On each user action: adding, changing or removing a new task or link, DataProcessor will react by sending an AJAX request to
the corresponding URL. The request will contain all the parameters necessary for saving changes in the database.

Since DataProcessor is initialized in the REST mode, it will use different HTTP verbs for each type of operation. 
The list of HTTP verbs together with request and response details is given in the [Server-Side Integration](guides/server-side.md#technique) article.

Well, what we need to do now is to add the required routes and handlers, that will put changes made on the client to the database, into the *server.js* file.
The resulting code will be rather spacious:


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
});


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

We have created two sets of routes: one for the *tasks* entity and another one for the *links* one. 
Correspondingly, the *"/data/task"* URL will serve for requests related 
to the operations with tasks and the *"/data/link"* URL will be used to handle requests containing data for operations with links.

The requests types are pretty simple:

- POST - to insert a new item into the database
- PUT - to update an existing record
- DELETE - to remove an item

The response will be a JSON object with the type of performed operation or "error" in case the code fails.

The response for the POST request will also contain the database id of the new record.
It will be applied on the client side, so it will be possible to map a new item to the database entity.

That's all. Open http://127.0.0.1:1337 and you will see a fully operational gantt chart.

![ready_gantt_nodejs](/img/ready_gantt_nodejs.png)


## Storing the order of tasks {#storingtheorderoftasks}

The client-side gantt allows [reordering tasks](guides/reordering-tasks.md) using drag and drop. So if you use this feature, you'll have to store this order in the database. 
You can [check the common description here](guides/server-side.md#storingtheorderoftasks).

Let's now add this feature to our app.

### Enable tasks reordering on the client

Firstly, we need to allow users to change the tasks order in the UI. Open the "Index" view and update the configuration of gantt:


~~~js title="public/index.html"
gantt.config.order_branch = true;/*!*/
gantt.config.order_branch_free = true;/*!*/

gantt.init("gantt_here");
~~~

Now, let's reflect these changes on the backend. We are going to store the order in the column named "sortorder", 
the updated *gantt_tasks* table declaration may look as follows:

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

Or add the column to the table you already have:

~~~js
ALTER TABLE `gantt_tasks` ADD COLUMN `sortorder` int(11) NOT NULL;
~~~

After that we need to update the *server.js* file: 

1 . <b>GET /data</b> must return tasks ordered by the `sortorder` column: 

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


2 . Newly added tasks must receive the initial value `sortorder`: 

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

3 . Finally, when a user reorders tasks, task orders must be [updated](guides/server-side.md#storingtheorderoftasks):

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

You can check [a ready demo](https://github.com/DHTMLX/gantt-howto-node) on GitHub.


## Application security

Gantt doesn't provide any means of preventing an application from various threats, such as SQL injections or XSS and CSRF attacks. It is important that responsibility for keeping an application safe is on the developers implementing the backend. Read the details [in the corresponding article](guides/app-security.md).

## Trouble shooting

In case you've completed the above steps to implement Gantt integration with Node.js, but Gantt doesn't render tasks and links on a page, have a look at the [Troubleshooting Backend Integration Issues](guides/troubleshooting.md) article. It describes 
the ways of identifying the roots of the problems.


## What's next

Now you have a fully functioning gantt. You can view the full code on [GitHub](https://github.com/DHTMLX/gantt-howto-node), clone or download it and use it for your projects.

You can also check [guides on the numerous features of gantt](guides.md) or tutorials on [integrating Gantt with other backend frameworks](integrations/howtostart-guides.md).


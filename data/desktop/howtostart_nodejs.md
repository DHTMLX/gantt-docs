dhtmlxGantt with Node.js 
===================================

The current tutorial is intended for creating Gantt with Node.js and REST API on the server side. 
If you use some other technology, check the list of available integration variants below:

- desktop/howtostart_php.md
- desktop/howtostart_dotnet.md
- desktop/howtostart_ruby.md

Our implementation of Gantt with Node.js will be based on REST API that will be used for communication with server. 
Node.js has a set of ready-made solutions, so we won’t have to code everything from the very beginning.

Have a look at the [demo](https://github.com/DHTMLX/gantt-node-mysql) on GitHub.

Step 1. Making Preparations
-------------------------------

To begin with, we'll create a project folder and then add the required dependencies. We'll make use of the following modules:

- [Express](http://expressjs.com/) - a tiny framework for Node.js
- [body-parser](https://www.npmjs.com/package/body-parser) - a Node.js parsing tool
- [date-format-lite](https://github.com/litejs/date-format-lite) - a small library that will help us to convert dates of Gantt entries into the proper format
- [promise-mysql](https://www.npmjs.com/package/promise-mysql) - a Node.js package for working with MySQL using promises
- [bluebird](https://www.npmjs.com/package/bluebird) - and a promise library itself.

So, let's create a project folder and name it "dhx-gantt-node-mysql":

~~~js
mkdir dhx-gantt-app
cd dhx-gantt-app
~~~

After that create a file *package.json*. We'll specify the dependencies in it with the following command:

~~~js
npm init -y
~~~

When the file is ready, open it and put the above listed dependencies into it. The result will look similar to this one:

~~~js
{
  "name": "dhx-gantt-app",
  "version": "1.0.0",
  "description": "",
  "main": "server.js",
  "dependencies": {
    "body-parser": "^1.15.0",
    "date-format-lite": "^0.7.4",
    "express": "^4.13.4",
    "bluebird": "^3.5.0",
    "promise-mysql": "^3.0.2"
  },
  "devDependencies": {},
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
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

Step 2. Initializing Gantt 
-----------------------

Firstly, create a folder with the name "public". This folder will contain the dhtmlxGantt codebase and the main page of the application - *index.html*.

Let's add the *index.html* file into the *public* folder. Thus, the folder structure will be as follows:

~~~js
dhx-gantt-app
├── node_modules
├── package.json
└── public
    └── index.html
~~~

Now, open the *index.html* file and fill it with the following content:

{{snippet "index.html" file}}
~~~html
<!DOCTYPE html>
<head>
  <meta http-equiv="Content-type" content="text/html; charset=utf-8">

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
    gantt.config.xml_date = "%Y-%m-%d %H:%i:%s";
  
    gantt.init("gantt_here");
    gantt.load("/data");
  
    var dp = new gantt.dataProcessor("/data");
    dp.init(gantt);
    dp.setTransactionMode("REST");
  </script>
</body>
~~~

The above code initializes a gantt chart together with dataProcessor and sets the necessary configuration settings. 
It also enables data loading for the gantt.

The “/data” URL will serve as a data source and the entry point for dataProcessor requests, we’ll consider it a bit later.
The important point is that dataProcessor should be initialized in the REST mode. To get more information, read the desktop/server_side.md#savingdatafromrestserver
article.

Step 3. Implementing a backend
--------------------------
Now we need to create a backend for our page. 
Create a new file named <b>server.js</b> and add the following code into it:

~~~js
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var Promise = require('bluebird');
require("date-format-lite");

var port = 1337;
var app = express();

app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(port, function(){
    console.log("Server is running on port "+port+"...");
});
~~~

What we have done in this code:

- specified the “public” folder as the root directory of an application
- attached the application to 1337 port of the localhost

Let's check what we have got at the moment. Go to the project folder and run the following command from the command line:

~~~js
node server.js
~~~

Then open http://127.0.0.1:1337 in a browser. You should see a page with an empty gantt like the one shown here:

<img src="desktop/gantt_init.png">

Step 4. Preparing a Database
----------------------------

The next step is to create a database. We'll make a simple database with two tables. 

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
INSERT INTO `gantt_tasks` VALUES ('1', 'Project #1', '2017-04-01 00:00:00', 
  '5', '0.8', '0');
INSERT INTO `gantt_tasks` VALUES ('2', 'Task #1', '2017-04-06 00:00:00', 
  '4', '0.5', '1');
INSERT INTO `gantt_tasks` VALUES ('3', 'Task #2', '2017-04-05 00:00:00', 
  '6', '0.7', '1');
INSERT INTO `gantt_tasks` VALUES ('4', 'Task #3', '2017-04-07 00:00:00', 
  '2', '0', '1');
INSERT INTO `gantt_tasks` VALUES ('5', 'Task #1.1', '2017-04-05 00:00:00', 
  '5', '0.34', '2');
INSERT INTO `gantt_tasks` VALUES ('6', 'Task #1.2', '2017-04-11 13:22:17', 
  '4', '0.5', '2');
INSERT INTO `gantt_tasks` VALUES ('7', 'Task #2.1', '2017-04-07 00:00:00',
  '5', '0.2', '3');
INSERT INTO `gantt_tasks` VALUES ('8', 'Task #2.2', '2017-04-06 00:00:00', 
  '4', '0.9', '3');
~~~

Check a detailed example [here](desktop/server_side.md#thedatabasesstructure).


Step 5. Loading data into the gantt
--------------------------

Now we need to implement data loading. 

On the client side we've already added <b>gantt.load("/data")</b> call, which will send ajax GET to the */data* url 
and will expect to get a [JSON](desktop/supported_data_formats.md#json) object with gantt data in response.

So, we need to add a server route for the URL which will generate an appropriate response. Open the *server.js* file and add the code below into it:

~~~js

var mysql = require('promise-mysql');
var db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'gantt'
});

app.get("/data", function (req, res) {
  Promise.all([
    db.query("SELECT * FROM gantt_tasks"),
    db.query("SELECT * FROM gantt_links")
  ]).then(function(results){
    var tasks = results[0],
    links = results[1];
    
    for (var i = 0; i < tasks.length; i++) {
      tasks[i].start_date = tasks[i].start_date.format("YYYY-MM-DD hh:mm:ss");
      tasks[i].open = true;
    }

    res.send({
      data: tasks,
      collections: { links: links }
    });

  }).catch(function(error) {
    sendResponse(res, "error", null, error);
  });
});
~~~

What we have done in this code:

- opened MySql connection to our database 
- on <b>GET /data</b> request we'll read data from tasks and links tables and format them so they could be parsed on the client. 
Note that we also add the *open* property to ensure that the tasks tree will be initially expanded.
After that we'll send the collected data to the HTTP response.

Let's run the application now by opening http://127.0.0.1:1337. The gantt will be loaded with the test data that we have previously added into the database.

<img src="desktop/load_data.png">

Step 6. Saving Data
---------------------

The last thing that we should implement is data saving. 
For this we need a code that will send updates happening on the client side back to the server.

The good news is that we already have such a code in the *index.html* file. Right here:

~~~js
var dp = new gantt.dataProcessor("/data");
dp.init(gantt);
dp.setTransactionMode("REST");
~~~

Let's go deeper and see what role it plays. 

###Requests and responses

On each user action: adding, changing or removing a new task or link DataProcessor will react by sending an AJAX request to
the corresponding URL. The request will contain all the parameters necessary for saving changes in the database.

Since DataProcessor is initialized in the REST mode, it will use different HTTP verbs for each type of operation. 
The list of HTTP verbs together with request and response details is given in the desktop/server_side.md#technique article.

Well, what we need to do now is to add the required routes and handlers that will put the changes into the database into the *server.js* file.
The resulting code will be rather spacious:

~~~js

// add new task
app.post("/data/task", function (req, res) { 
  var task = getTask(req.body);  

  db.query("INSERT INTO gantt_tasks(text, start_date, duration, progress, parent)"
    + " VALUES (?,?,?,?,?)", 
    [task.text, task.start_date, task.duration, task.progress, task.parent])
  .then (function (result) {
    sendResponse(res, "inserted", result.insertId);
  })
  .catch(function(error) {
    sendResponse(res, "error", null, error); 
  });
});

// update task
app.put("/data/task/:id", function (req, res) {
  var sid = req.params.id,
    task = getTask(req.body);

  db.query("UPDATE gantt_tasks SET text = ?, start_date = ?, "
    + "duration = ?, progress = ?, parent = ? WHERE id = ?",
    [task.text, task.start_date, task.duration, task.progress, task.parent, sid])
  .then (function(result) {
    sendResponse(res, "updated");
  })
  .catch(function(error) {
    sendResponse(res, "error", null, error); 
  });
});

// delete task
app.delete("/data/task/:id", function (req, res) {
  var sid = req.params.id;
  db.query("DELETE FROM gantt_tasks WHERE id = ?", [sid])
  .then (function (result) {
    sendResponse(res, "deleted");
  })
  .catch(function(error) {
    sendResponse(res, "error", null, error); 
  });
});

// add link
app.post("/data/link", function (req, res) {
  var link = getLink(req.body);

  db.query("INSERT INTO gantt_links(source, target, type) VALUES (?,?,?)", 
    [link.source, link.target, link.type])
  .then (function (result) {
    sendResponse(res, "inserted", result.insertId);
  })
  .catch(function(error) {
    sendResponse(res, "error", null, error); 
  });
});

// update link
app.put("/data/link/:id", function (req, res) {
  var sid = req.params.id,
    link = getLink(req.body);

  db.query("UPDATE gantt_links SET source = ?, target = ?, type = ? WHERE id = ?", 
    [link.source, link.target, link.type, sid])
  .then (function (result) {
    sendResponse(res, "updated");
  })
  .catch(function(error) {
    sendResponse(res, "error", null, error); 
  });
});

// delete link
app.delete("/data/link/:id", function (req, res) {
  var sid = req.params.id;
  db.query("DELETE FROM gantt_links WHERE id = ?", 
    [sid])
  .then (function (result) {
    sendResponse(res, "deleted");
  })
  .catch(function(error) {
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

function sendResponse(res, action, tid, error) {

  if (action == "error")
    console.log(error);

  var result = {
    action: action
  };
  if (tid !== undefined && tid !== null)
    result.tid = tid;

  res.send(result);
}
~~~

We have created two sets of routes: one for the *tasks* entity and one for the *links* one. Correspondingly, the *“/data/task”* URL will serve for requests related 
to the operations with tasks and the *“/data/link”* URL will be used to handle requests containing data for operations with links.

The requests types are pretty simple:

- POST - to insert a new item into the database
- PUT - to update an existing record
- DELETE - to remove an item

The response will be a JSON object with the type of performed operation or "error" in case the code fails.

The response for the POST request will also contain the database id of the new record.
It will be applied on the client side, so it will be possible to map a new item to the database entity.

That's all. Open http://127.0.0.1:1337 and you will see a fully operational gantt chart.

<img src="desktop/ready_gantt.png">


Storing the Order of Tasks
---------------------

The client-side gantt allows [reordering tasks](desktop/reodering_tasks.md) using drag and drop. So if you use this feature, you'll have to store this order in the database. You can check the common description here.

Let's now add this feature to our app.

###Enable tasks reordering on the client

Firstly, we need to allow users to change task order in the UI. Open Index view and update configuration of gantt:

~~~js
//index.html
gantt.config.order_branch = true;/*!*/
gantt.config.order_branch_free = true;/*!*/

gantt.init("gantt_here");
~~~

Now, let's reflect these changes on the backend. We are going to store the order in the column named sortorder, the updated *gantt_tasks* table declaration may look following:
~~~js
CREATE TABLE `gantt_tasks` (
  `id` int(11) NOT NULL  AUTO_INCREMENT PRIMARY KEY,
  `text` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `start_date` datetime NOT NULL,
  `duration` int(11) NOT NULL,
  `progress` float NOT NULL DEFAULT 0,
  `parent` int(11) NOT NULL,
  `sortorder` int(11) NOT NULL /*!*/
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
~~~

Or add the column to the table you already have:
~~~js
ALTER TABLE `gantt_tasks` ADD COLUMN `sortorder` int(11) NOT NULL;
~~~

After then, need to update server.js 

1. <b>GET /data</b> must return tasks ordered by the `sortorder` column: 

~~~js
app.get("/data", function (req, res) {
  Promise.all([
    db.query("SELECT * FROM gantt_tasks ORDER BY sortorder ASC"),/*!*/
    db.query("SELECT * FROM gantt_links")
  ]).then(function(results){
    var tasks = results[0],
      links = results[1];

    for (var i = 0; i < tasks.length; i++) {
      tasks[i].start_date = tasks[i].start_date.format("YYYY-MM-DD hh:mm:ss");
      tasks[i].open = true;
    }

    res.send({
      data: tasks,
      collections: { links: links }
    });

  }).catch(function(error) {
    sendResponse(res, "error", null, error);
  });
});

~~~


2. Newly added tasks must receive the initial `sortorder` value: 

~~~js
app.post("/data/task", function (req, res) { // adds new task to database
  var task = getTask(req.body);  

  db.query("SELECT MAX(sortorder) AS maxOrder FROM gantt_tasks")
  .then (function(result) {  
    // assign max sort order to the new task
    var orderIndex = (result[0].maxOrder || 0) + 1;/*!*/
    
    return db.query("INSERT INTO gantt_tasks(text, start_date, duration, progress, "
      +"parent, sortorder) VALUES (?,?,?,?,?,?)",
      [task.text, task.start_date, task.duration, task.progress, task.parent, 
        orderIndex]);/*!*/
  })
  .then (function (result) {
    sendResponse(res, "inserted", result.insertId);
  })
  .catch(function(error) {
    sendResponse(res, "error", null, error); 
  });
});
~~~

3. Finally, when user reorders tasks, task orders must be [updated](desktop/server_side.md#storingtheorderoftasks):

~~~js
// update task
app.put("/data/task/:id", function (req, res) {
  var sid = req.params.id,
    target = req.body.target,
    task = getTask(req.body);

  Promise.all([
    db.query("UPDATE gantt_tasks SET text = ?, start_date = ?, duration = ?, progress = ?, parent = ? WHERE id = ?",
      [task.text, task.start_date, task.duration, task.progress, task.parent, sid]),
    updateOrder(sid, target)/*!*/
  ])
    .then (function(result) {
      sendResponse(res, "updated");
    })
    .catch(function(error) {
      sendResponse(res, "error", null, error);
    });
});

function updateOrder(taskId, target){
  var nextTask = false;
  var targetOrder;

  if(target.startsWith("next:")) {
    target = target.substr("next:".length);
    nextTask = true;
  }

  return db.query("SELECT * FROM gantt_tasks WHERE id = ?", [target])
    .then (function(result) {
      if (!result[0])
        return Promise.resolve();

      targetOrder = result[0].sortorder;
      if(nextTask)
        targetOrder++;

      return db.query("UPDATE gantt_tasks SET sortorder = sortorder + 1 "
        +" WHERE sortorder >= ?", [targetOrder])
      .then (function(result) {
        return db.query("UPDATE gantt_tasks SET sortorder = ? WHERE id = ?",
          [targetOrder, taskId]);
      });
    });
}

~~~

You can check [a ready demo](https://github.com/DHTMLX/gantt-node-mysql) on GitHub.

@todo:
  check, update images
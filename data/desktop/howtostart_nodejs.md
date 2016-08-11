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

Step 1. Making preparations
-------------------------------

To begin with, we'll create a project folder and then add the required dependencies. We'll make use of the following modules:

- [Express](http://expressjs.com/) - a tiny framework for Node.js
- [body-parser](https://www.npmjs.com/package/body-parser) - a Node.js parsing tool
- [date-format-lite](https://github.com/litejs/date-format-lite) - a small library that will help us to convert dates of Gantt entries into the proper format
- [node-mysql](https://github.com/felixge/node-mysql) - a Node.js client for working with MySQL

So, let's create a project folder and name it “gantt-node-mysql”:

~~~js
mkdir gantt-node-mysql
cd gantt-node-mysql
~~~

After that create a file *package.json*. We'll specify the dependencies in it with the following command:

~~~js
npm init -y
~~~

When the file is ready, open it and put the above listed dependencies into it. The result will look similar to this one:

~~~js
{
  "name": "gantt-node-mysql",
  "version": "1.0.0",
  "description": "",
  "main": "server.js",
  "dependencies": {
    "body-parser": "^1.15.0",
    "date-format-lite": "^0.7.4",
    "express": "^4.13.4",
    "mysql": "^2.10.2"
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

Finally, we need to install the added dependencies using the comman below:

~~~js
npm install
~~~

One more thing we should do at this step is to create an empty file *server.js*. We will need it later.

Step 2. Initializing Gantt 
-----------------------

Firstly, create a folder with the name "public". This folder will contain the dhtmlxGantt codebase and the main page of the application - *index.html*.

Let's add the *index.html* file into the *public* folder. Thus, the folder structure will be as follows:

<img src="desktop/folder_structure.png">

Now, open the *index.html* file and fill it with the following content:

{{snippet "index.html" file}}
~~~html
<!DOCTYPE html>
<head>
    <meta http-equiv="Content-type" content="text/html; charset=utf-8">
</head>
	<script src="./codebase/sources/dhtmlxgantt.js" type="text/javascript" 
    	charset="utf-8"></script>
    <link rel="stylesheet" href="./codebase/dhtmlxgantt.css" type="text/css" 
    	charset="utf-8">
    <style type="text/css">
        html, body{ height:100%; padding:0px; margin:0px; overflow: hidden;}
    </style>
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

The “/data” url will serve as a datasource and the entry point for dataProcessor requests, we’ll consider it a bit later.
The important point is that dataProcessor should be initialized in the REST mode. To get more information, read the desktop/server_side.md#savingdatafromrestserver
article.

Step 3. Preparing a database
----------------------------

The next step is to create a database. We'll make a simple database with two tables. 

Check a detailed example [here](desktop/howtostart_connector.md#step5createadatabase).


Step 4. Making connection to database
--------------------------

Now we need to connect to the database. Open the *server.js* file that we have added at the [Step 1](desktop/howtostart_nodejs.md#step1makingpreparations) and add
the following code into it:

~~~js
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
require("date-format-lite");

var port = 1337;
var app = express();
var mysql = require('mysql');
var db = mysql.createConnection({
  host     : 'localhost',
  user     : 'sampleUser',
  password : 'samplePassword',
  database : 'sampleGanttBase'
});

app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(port, function(){
    console.log("Server is running on port "+port+"...");
});
~~~

What we have done in this code:

- opened MySql connection to our database (we’ll need it later, for now just make sure you’ve specified actual connection parameters)
- specified the “public” folder as the root directory of an application
- attached the application to 1337 port of the localhost

Let's check what we have got at the moment. Go to the project folder and run the following command from the command line:

~~~js
node server.js
~~~


Then open http://127.0.0.1:1337 in a browser. You should see a page with an empty gantt like the one shown here:

<img src="desktop/gantt_init.png">

Step 5. Loading tasks into chart
------------------------

From now on we are ready to implement data loading. To begin with, add test data into the *gantt_tasks* table.
You can make use of the following SQL sample:

~~~js
INSERT INTO `gantt_tasks` VALUES ('1', 'Project #1', '2013-04-01 00:00:00', 
	'5', '0.8', '20', '0');
INSERT INTO `gantt_tasks` VALUES ('2', 'Task #1', '2013-04-06 00:00:00', 
	'4', '0.5', '10', '1');
INSERT INTO `gantt_tasks` VALUES ('3', 'Task #2', '2013-04-05 00:00:00', 
	'6', '0.7', '20', '1');
INSERT INTO `gantt_tasks` VALUES ('4', 'Task #3', '2013-04-07 00:00:00', 
	'2', '0', '30', '1');
INSERT INTO `gantt_tasks` VALUES ('5', 'Task #1.1', '2013-04-05 00:00:00', 
	'5', '0.34', '10', '2');
INSERT INTO `gantt_tasks` VALUES ('6', 'Task #1.2', '2013-04-11 13:22:17', 
	'4', '0.491477', '20', '2');
INSERT INTO `gantt_tasks` VALUES ('7', 'Task #2.1', '2013-04-07 00:00:00',
	'5', '0.2', '10', '3');
INSERT INTO `gantt_tasks` VALUES ('8', 'Task #2.2', '2013-04-06 00:00:00', 
	'4', '0.9', '20', '3');
~~~

After that we need to enable data loading. Technically, we have done it at the [Step 2](desktop/howtostart_nodejs.md#step2initializinggantt) during gantt initialization
by adding the line:

~~~js
gantt.load("/data");
~~~

This command will send an AJAX request to the specified URL ([see the details](desktop/server_side.md#technique)) 
and will expect to get a [JSON](desktop/supported_data_formats.md#json) object with gantt data in response.

So, we need to add a server route for the URL which will generate an appropriate response. Open the *server.js* file and add the code below into it:

~~~js
app.get("/data", function(req, res){
    db.query("SELECT * FROM gantt_tasks", function(err, rows){
        if (err) console.log(err);
        db.query("SELECT * FROM gantt_links", function(err, links){
            if (err) console.log(err);

            for (var i = 0; i < rows.length; i++){
                rows[i].start_date = rows[i].start_date.format("YYYY-MM-DD");
                rows[i].open = true;
            }


            res.send({ data:rows, collections: { links : links } });
        });
    });
});
~~~

The code reads tasks and links from the database tables (note that since we haven't added any data into the *gantt_links* table, it will be empty)
and formats dates so that the client side could parse them. 

We have also specified the *open* property to ensure that the tasks tree will be initially expanded.
After that we have sent the collected data to the HTTP response.

Let's run the application now by opening http://127.0.0.1:1337. The gantt will be loaded with the test data that we have previously added into the database.

<img src="desktop/load_data.png">

Step 6. Saving data
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

On each user action: adding, changing or removing a new task or link dataprocessor will react by sending an AJAX request to
the corresponding URL.The request will contain all the parameters necessary for saving changes in the database.

Since dataprocessor is initialized in the REST mode, it will use different HTTP verbs for each type of operation. 
The list of HTTP verbs together with request and response details is given in the desktop/server_side.md#technique article.

Well, what we need to do now is to add the required routes and handlers that will put the changes into the database into the *server.js* file.
The resulting code will be rather spacious:

~~~js
app.post("/data/task", function(req, res){
    var task = getTask(req.body);
    
    db.query("INSERT INTO gantt_tasks(text, start_date, duration, progress, parent) VALUES (?,?,?,?,?)",
    [task.text, task.start_date, task.duration, task.progress, task.parent],
    function(err, result){
    	sendResponse(res, "inserted", result ?result.insertId:null, err);
    });
});

app.put("/data/task/:id", function(req, res){
    var sid = req.params.id,
        task = getTask(req.body);
        
    
    db.query("UPDATE gantt_tasks SET text = ?, start_date = ?, duration = ?, progress = ?, parent = ? WHERE id = ?",
    [task.text, task.start_date, task.duration, task.progress, task.parent, sid],
    function(err, result){
    	sendResponse(res, "updated", null, err);
    });
});

app.delete("/data/task/:id", function(req, res){
    var sid = req.params.id;
    db.query("DELETE FROM gantt_tasks WHERE id = ?", [sid], 
    function(err, result){
    	sendResponse(res, "deleted", null, err);
    });
});

app.post("/data/link", function(req, res){
    var link = getLink(req.body);
        
    db.query("INSERT INTO gantt_links(source, target, type) VALUES (?,?,?)",
    [link.source, link.target, link.type],
    function(err, result){
    	sendResponse(res, "inserted", result ?result.insertId:null, err);
    });
});

app.put("/data/link/:id", function(req, res){
    var sid = req.params.id,
        link = getLink(req.body);
        
    db.query("UPDATE gantt_links SET source = ?, target = ?, type = ? WHERE id = ?",
    [link.source, link.target, link.type, sid],
    function(err, result){
    	sendResponse(res, "updated", null, err);
    });
});

app.delete("/data/link/:id", function(req,res){
    var sid = req.params.id;
    db.query("DELETE FROM gantt_links WHERE id = ?", [sid], 
    function(err, result){
    	sendResponse(res, "deleted", null, err);
    });
});

function getTask(data){
    return {
        text: data.text,
        start_date: data.start_date.date("YYYY-MM-DD"),
        duration: data.duration,
        progress: data.progress || 0,
        parent: data.parent
    };
}

function getLink(data){
    return {
        source: data.source,
        target: data.target,
        type: data.type
    };
}

function sendResponse(res, action, tid, error){
    if(error) {
        console.log(error);
        action = "error";
    }
    
    var result = {
        action: action
    };
    if(tid !== undefined && tid !== null)
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

<img src="desktop/ready_gantt_node.png">

You can check [a ready demo](https://github.com/DHTMLX/gantt-node-mysql) on GitHub.
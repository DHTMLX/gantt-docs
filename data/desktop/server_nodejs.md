Node.js Code Samples
==============================

The current article describes the steps that should be completed on the server side implemented with Node.js and REST API
for loading data into Gantt and storing changes on the server. 

You can find more information in the [full tutorial](desktop/howtostart_nodejs.md) on using Gantt with Node.js.

If you use some other technology, check the list of available integration variants below:

- desktop/server_php.md
- desktop/server_dotnet.md
- desktop/server_ruby.md

Making preparations
---------------------

We need to begin with adding some dependencies on the server side.
The necessary dependencies are:

- [Express](http://expressjs.com/) module
- [body-parser](https://www.npmjs.com/package/body-parser) module
- [date-format-lite](https://www.npmjs.com/package/date-format-lite) - a small module that will be used to convert dates of Gantt entries into the format 
compatible with the client-side Gantt API

~~~js
var express = require('express');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.urlencoded({ extended: true }));

require("date-format-lite");
~~~

Loading data
--------------

[On the client side](desktop/server_side.md#technique) we've initialized gantt and added the following line:

~~~js
gantt.load("apiUrl");
~~~

It will send an AJAX request to the specified [URL](desktop/server_side.md#requestresponsedetails), expecting to get a JSON response with Gantt data. 

So, on the server side we should add a server route for this URL. It will generate the corresponding response.
For this purpose, add the following code on the server side:

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

In the above code we read tasks and links from database tables, format dates so the client side could parse them and specify the “open”
property to ensure that tasks tree will be initially expanded. After that we'll send the collected data to the HTTP response.

Saving data
-------------

The following [client-side](desktop/server_side.md#technique) code is responsible for sending updates that happen on the client side back to the server:

~~~js
var dp = new gantt.dataProcessor("/data");
dp.init(gantt);
dp.setTransactionMode("REST");
~~~

Each time data is added to, changed or deleted from Gantt, dataProcessor will send an AJAX request containing all the necessary details for saving changes into the database.
dataProcessor in the REST mode will use different HTTP verbs for each type of operation. 

You can find the details in the [list](desktop/server_side.md#requestresponsedetails) of HTTP methods and the related URLs.

To apply the changes in the database, we need to add the required routes and handlers on the server side:

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

In the above code we've specified two sets of routes: one for the "tasks" entity and another one for the "links" entity.

The “/data/task” url will be used for requests that contain operations performed with tasks. Requests related to links will be sent to the “/data/link” url.

###Types of requests

- POST request implies that a new item should be inserted into database
- PUT updates an existing record
- DELETE performs deleting

###Responses

All the actions return a JSON response containing the type of the performed operation or “error” if something went wrong.

A response for the "insert" action will also contain the database id of the new record. It will be applied on the client side, so the new item could be mapped to the database entity.

---
title: "dhtmlxGantt with dhtmlxConnector"
sidebar_label: "dhtmlxGantt with dhtmlxConnector"
---

dhtmlxGantt with dhtmlxConnector 
================================

This tutorial will teach you how to create a basic Gantt chart on a page that will be able to save and update tasks in the database (i.e. on the server).


The current tutorial is intended for creating Gantt with [dhtmlxConnector](https://docs.dhtmlx.com/connector__php__index.html).
If you want to use some server-side technology instead, check the list of tutorials describing available integration variants below:

- [dhtmlxGantt with ASP.NET MVC](integrations/dotnet/howtostart-dotnet.md)
- [dhtmlxGantt with Node.js](integrations/node/howtostart-nodejs.md)
- [dhtmlxGantt with Python](integrations/other/howtostart-python.md)
- [dhtmlxGantt with PHP:Slim3](integrations/php/howtostart-php.md)
- [dhtmlxGantt with PHP: Laravel](integrations/php/howtostart-php-laravel.md)
- [dhtmlxGantt with Salesforce LWC](integrations/salesforce/howtostart-salesforce.md)
- [dhtmlxGantt with Ruby on Rails](integrations/other/howtostart-ruby.md)

![gantt_basic](/img/gantt_basic.png)


**Related sample**: [Basic initialization](https://docs.dhtmlx.com/gantt/samples/01_initialization/01_basic_init.html)


### Step 1. Downloading dhtmlxGantt Package

Let's start the tutorial with getting the library package on your computer.

**Do the following:**

<ul>
  <li>Download the dhtmlxGantt package <a href='https://github.com/DHTMLX/connector-php' title='dhtmlxConnector for PHP repository' target='_blank'>here</a>, if you haven't done it yet. </li>
  <li>Extract the package to the root directory of your local web server. The extracted files will be stored in a folder with the same name as the package file - dhtmlxGantt.</li>
</ul>


## Step 2. Including dhtmlxGantt Code Files

Then, we need to include dhtmlxGantt code files in your HTML file (to be able to use the functionality of the library). 
The dhtmlxGantt code files are:

- `dhtmlxgantt.js`
- `dhtmlxgantt.css`

**Do the following:**

1. Create an HTML file in the `dhtmlxGantt` folder (the folder with the dhtmlxGantt files). Name it, for example, `myGantt.html`.
2. Include dhtmlxGantt code files to **myGantt.html** (both files reside in the `codebase` folder). See myGantt.html:

~~~html
<!DOCTYPE html>
<html>
<head>
  <title>How to Start with dhtmlxGantt</title>
  <script src="codebase/dhtmlxgantt.js"></script> <!-- important -->
  <link href="codebase/dhtmlxgantt.css" rel="stylesheet"> <!-- important -->
</head>
<body>
  <!-- your code will be here -->
</body>
</html>
~~~

## Step 3. Initializing dhtmlxGantt

<div>

Then, we need to create a DIV container and initialize dhtmlxGantt in it.

Beware, dhtmlxGantt is a static object and can be instantiated on the page once. 
To refer to the dhtmlxGantt's instance you can use **dhtmlxGantt** or simply **gantt**.

<div>
  <span>Do the following:</span>
</div>

- Define a DIV container in the **myGantt.html** file.
- Initialize dhtmlxGantt with the <code>gantt.init("gantt_here")</code> command.  
  As a parameter, the method takes an HTML container where a Gantt chart will be placed.

~~~html title="myGantt.html"
<!DOCTYPE html>
<html>
<head>
   <title>How to Start with dhtmlxGantt</title>
   <script src="codebase/dhtmlxgantt.js"></script>
   <link href="codebase/dhtmlxgantt.css" rel="stylesheet">
</head>
<body>
	<div id="gantt_here" style='width:1000px; height:400px;'></div>
    <script type="text/javascript">
		gantt.init("gantt_here"); /*!*/  
	</script>
</body>
</html>
~~~

</div>
Note, if you use the full-screen mode, specify the current style to guarantee correct behavior:

~~~js
<style type="text/css" media="screen">
    html, body{
        margin:0px;
        padding:0px;
        height:100%;
        overflow:hidden;
    }   
</style>
~~~

## Step 4. Loading Data to the Gantt Chart

Then, we need to populate the Gantt chart with the data from a sample data source. We will use the easiest of the ways and specify the data source as an inline object. 
To load data, we will use 
the [parse](api/method/parse.md) method that takes the name of the data source as a parameter. 
The properties of the object are:
<ul>
  <li><b>data</b> - specifies the gantt tasks</li>
  <ul>
  <li><b>id</b> - (<i>string, number</i>) the event id.</li>
  <li><b>start_date</b> - (<i>Date</i>) the date when an event is scheduled to begin. </li>
  <li><b>text</b> - (<i>string</i>) the task description.</li>
  <li><b>progress</b> - (<i>number</i>) a number from 0 to 1 that shows what percent of the task is complete. </li>
  <li><b>duration</b> - (<i>number</i>) the task duration in the units of the current time scale. </li>
  <li><b>parent</b> - (<i>number</i>) the id of the parent task. </li>
  </ul>
  <li><b>links</b> - specifies the gantt dependency links</li>
  <ul>
  <li><b>id</b>-(<i>string, number</i>) the event id.</li>
  <li><b>source</b>-(<i>number</i>) the id of the source task. </li>
  <li><b>target</b>-(<i>number</i>) the id of the target task. </li>
  <li><b>type</b>-(<i>string</i>) the type of the dependency: 0 - 'finish to start', 1 - 'start to start', 2 - 'finish to finish'. </li>
  </ul>
</ul> 

<div> <span>Do the following:</span></div>


Declare the 'tasks' variable in the <b>myGantt.html</b> file: 


~~~js title="myGantt.html"
var tasks = {
    data:[
        {id:1, text:"Project #1",start_date:"01-04-2013", duration:11,
        progress: 0.6, open: true},
        {id:2, text:"Task #1",     start_date:"03-04-2013", duration:5, 
        progress: 1,   open: true, parent:1},
        {id:3, text:"Task #2",   start_date:"02-04-2013", duration:7, 
        progress: 0.5, open: true, parent:1},
        {id:4, text:"Task #2.1", start_date:"03-04-2013", duration:2, 
        progress: 1,   open: true, parent:3},
        {id:5, text:"Task #2.2", start_date:"04-04-2013", duration:3, 
        progress: 0.8, open: true, parent:3},
        {id:6, text:"Task #2.3", start_date:"05-04-2013", duration:4, 
        progress: 0.2, open: true, parent:3}
    ],
    links:[
        {id:1, source:1, target:2, type:"1"},
        {id:2, source:1, target:3, type:"1"},
        {id:3, source:3, target:4, type:"1"},
        {id:4, source:4, target:5, type:"0"},
        {id:5, source:5, target:6, type:"0"}
    ]
};
~~~

Call the <code>gantt.parse(tasks)</code> command after the <code>gantt.init("gantt_here")</code> line:

~~~js title="myGantt.html"
gantt.init("gantt_here"); 
gantt.parse (tasks);/*!*/  
~~~

**Related sample**: [Basic initialization](https://docs.dhtmlx.com/gantt/samples/01_initialization/01_basic_init.html)


## Step 5. Creating a Database

:::note
Read this and further steps if you want to load data from a database instead of from an inline object.
:::

Then, we need to create a database with 2 tables to store tasks and dependencies. 
<i><b>sortorder</b> is a property used only while loading data from a database. The property sets the index of a task among siblings.</i>
<span>Do the following:</span>
Create a new database with the name - <i>gantt</i>.
Execute the following code to create 2 tables in it: <i>gantt_tasks</i> and <i>gantt_links</i>.

~~~sql
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
  `duration` int(11) NOT NULL DEFAULT 0,
  `progress` float NOT NULL DEFAULT 0,
  `sortorder` int(11) NOT NULL DEFAULT 0,
  `parent` int(11) NOT NULL,
  PRIMARY KEY (`id`)
);
~~~


To be able to save tasks in the database when some column has an empty value, add the following code to the **myGantt.html** file:

~~~js title="myGantt.html"
gantt.attachEvent("onBeforeTaskAdd", function(id,task){
    task.sortorder = 0;
    return true;
});
~~~

## Step 6. Loading Data from the Database

:::note
In the next 2 steps we will use the PHP platform to implement the server-client integration.

 If you use another platform, please, read the article [](guides/loading.md) to know how to 
implement the server script yourself.
:::


Then, we need to provide the ability to display data from the database in the chart. We'll do it with the [load](api/method/load.md) method, that takes the URL to the data source as a parameter. 
In case of a database, it's a PHP file which realizes connection to the server side. 
We will use the PHP platform and the <a href="https://docs.dhtmlx.com/connector__php__index.html">dhtmlxConnector</a> library, 
as this is the easiest way to implement the server-side logic for dhtmlxGantt.
<span>Do the following:</span>
Create a PHP file in the 'dhtmlxGantt' folder and name it, for example, <b>data.php</b>.
Open the <b>data.php</b> file and add the following server-side code to it:

~~~php title="data.php"
<?php

include ('codebase/connector/gantt_connector.php');

$res = new PDO("mysql:host=localhost;dbname=gantt", "root", "");

$gantt = new JSONGanttConnector($res);
$gantt->render_links("gantt_links","id","source,target,type");
$gantt->render_table(
    "gantt_tasks",
    "id",
    "start_date,duration,text,progress,sortorder,parent"
);
?>
~~~

Switch to the <b>myGantt.html</b> file and set the <code>gantt.config.date_format</code> property to <i> "%Y-%m-%d %H:%i"</i>, to make the format of output data compatible with the format of dhtmlxGantt.

~~~js title="myGantt.html"
gantt.config.date_format = "%Y-%m-%d %H:%i";/*!*/ 
gantt.init("gantt_here");
~~~

Call the <code>gantt.load('data.php')</code> command to load data from the database to the Gantt chart.

~~~js title="myGantt.html"
gantt.config.date_format = "%Y-%m-%d %H:%i";
gantt.init("gantt_here");
gantt.load('data.php');//loads data to Gantt from the database  /*!*/  
~~~

### Mapping database columns

Please note that the order of columns in **$connector->render_table** is important. The first three columns in the columns list are mapped to *start_date/duration/text* or *start_date/end_date/text* properties of the
client-side task object respectively, no matter what column names you specify. The logic of mapping columns is described below. 
 
The second column is mapped to *task.duration*, if you specify 'duration' in the configuration:

~~~js
$gantt->render_table("gantt_tasks","id","Start,duration,Name,progress,parent","");
~~~

or, using alias:

~~~js
$gantt->render_table("gantt_tasks","id","Start,Length(duration),Name,progress,parent","");
// JS: task.start_date, task.duration, task.text, task.progress, task.parent
~~~

If any other column name is set, the second column will be mapped to the *end_date* property:

~~~js
$gantt->render_table("gantt_tasks","id","Start,End,Name,progress,parent","");
// JS: task.start_date, task.end_date, task.text, task.progress, task.parent
~~~

#### Mapping other columns

All other columns will be mapped by their names without changes:

~~~js
$gantt->render_table("gantt_tasks","id","start_date,duration,text,custom,parent","");
// JS: task.start_date, task.duration, task.text, task.custom, task.parent
~~~

Aliases can be used for other columns as well:

~~~js
$gantt->render_table("gantt_tasks","id",
    "start_date,duration,text,custom_column(customProperty),parent","");
// JS: task.start_date, task.duration, task.text, task.customProperty, task.parent
~~~


## Step 7. Updating Data in the Database

Then, we need to provide the ability to save the changes made in the Gantt chart to the database. For this purpose, we'll use the 
[](api/method/dataprocessor.md) helper library. All we need to do is to initialize DataProcessor and
attach it to the dhtmlxGantt object.

<span>Do the following:</span>

Open the <b>myGantt.html</b> file and initialize dhtmlxDataProcessor with the <code>dataProcessor("data.php")</code> command.
Attach the dhtmlxDataProcessor object to the dhtmlxGantt object with the <code>dp.init(gantt)</code> command.


~~~js title="myGantt.html"
gantt.init("gantt_here");
gantt.load('data.php');
        
var dp="new" gantt.dataProcessor("data.php"); /*!*/ 
dp.init(gantt); /*!*/ 
~~~

## Logging errors

In case you've completed the above steps but something still is not working, enable logging in Gantt to detect an error.

First of all, make sure, that there are write permissions on the directory where the HTML file is located. Then add the following line into the **data.php** file:


~~~php title="data.php"
$gantt = new JSONGanttConnector($res);

$gantt->enable_log("log.txt"); /*!*/
~~~

After that, you can view logs in the **log.txt** file.

What's Next?
-----------------------------------------------------------
That's all. A basic but functional Gantt chart that can load data from the database and save it back is ready.
Now you may configure and customize it to meet all your needs.

We recommend you to read these articles as your next step:

- [Configuration](guides/common-configuration.md)
- [Event handling](guides/handling-events.md)
- [Data loading](guides/loading.md)


dhtmlxGantt with PHP 
=====================

In this tutorial you will find necessary information on how to create a Gantt Chart using PHP and REST API on the server side.

There are tutorials intended for building server-side integration with the help of other platforms:

- desktop/howtostart_nodejs.md
- desktop/howtostart_dotnet.md
- desktop/howtostart_ruby.md

It seems obvious that while developing an application with PHP one will use a ready framework instead of creating everything from scratch.<br>
We will use the [Slim](http://www.slimframework.com/) framework together with REST API on the server side and MySQL as a data storage to create a Gantt Chart.

You can have a look at the [ready demo on GitHub](https://github.com/DHTMLX/gantt-slim-mysql). Follow the step-by-step guide to create such an aaplication.

Step1. Creating a project
--------------------------

We will make use of a [skeleton application](https://github.com/slimphp/Slim-Skeleton) for the Slim framework.

Firstly, we need to import the project and install it. You can easily do it with the help of composer:

~~~php
php composer.phar create-project slim/slim-skeleton gantt-rest-php
~~~

If you have composer installed globally, you can apply the following command:

~~~php
composer create-project slim/slim-skeleton gantt-rest-php`
~~~

Then you should check if everything works fine. For this, go to the application folder and run webserver:

~~~php
cd gantt-rest-php
php -S 0.0.0.0:8080 -t public public/index.php
~~~

After that you can open http://127.0.0.1:8080 in a browser and you will see the default Slim page.

Step 2. Downloading DHTMLX Gantt
---------------------

Now you need to [download dhtmlxGantt](http://dhtmlx.com/docs/products/dhtmlxGantt/download.shtml). 
Then extract the content of the archive into the public folder of the created project. You will have the following structure of folders:

<img src="desktop/folder_structure_php.png">

There are two more ways of installing Gantt:

- from Bower by running the next command:

~~~php
bower install gantt
~~~

- from NPM by using the command below:

~~~js
npm install dhtmlx-gantt
~~~

Step 3. Initializing Gantt and dataProcessor
--------------------------------------

The next step is to initialize a gantt and connect it to a dataProcessor instance.

Find the *index.phtml* file in the *gantt-rest-php/templates* directory and complete several simple steps:

- include *dhtmlxgantt.js* and *dhtmlxgantt.css* files on the page
- initialize gantt and enable loading data into it
- set the date format that will be used to parse data from the data set with the api/gantt_xml_date_config.md property
- initialize dataProcessor
- attach the dhtmlxDataProcessor object to the dhtmlxGantt one
- set dataProcessor to the REST mode

The full code looks as follows:

~~~html
<!DOCTYPE html>
<html>
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
</html>
~~~

Run http://127.0.0.1:8080/ in a browser and you will see that a grid is rendered on the page.

Step 4. Configuring a database
------------------------------

It's high time to prepare tables for our database. You can find a simple instrunction on database creation 
in [this tutorial](desktop/howtostart_connector.md#step5createadatabase).

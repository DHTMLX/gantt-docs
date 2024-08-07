dhtmlxGantt in Plain JS/HTML
==================

When you develop an application with dhtmlxGantt, the first thing you need is to initialize or, simply speaking, to display the Gantt chart on the page.

This guide tells about initialization of dhtmlxScheduler in plain JS and HTML. You can also check the guides on integration with front-end frameworks:

- desktop/howtostart_angular.md
- desktop/howtostart_react.md
- desktop/howtostart_vue.md
- desktop/howtostart_svelte.md

Creating basic Gantt chart
-----------------------

To display a basic Gantt on the page, follow 3 steps: 

1. Include the [dhtmlxGantt code files](desktop/initializing_gantt_chart.md#howtoaddganttsourcefilesintoaproject) on the page.
2. Create a DIV container on the page.
3. Initialize dhtmlxGantt in the newly created container with the api/gantt_init.md method. As a parameter the method takes an HTML container (or its id)  that the Gantt chart will be  displayed in.

~~~html
<!DOCTYPE html>
<html>
<head>
   <script src="codebase/dhtmlxgantt.js"></script>
   <link href="codebase/dhtmlxgantt.css" rel="stylesheet">
</head>
<body>
    <div id="gantt_here" style='width:1000px; height:400px;'></div>
    <script type="text/javascript"> 
        gantt.init("gantt_here");   /*!*/                        
    </script>
</body>
</html>
~~~

![desktop/init_gantt_front.png](desktop/init_gantt_front.png)

{{sample
	01_initialization/01_basic_init.html
}}
 
 
How to add Gantt source files into a project
------------------------------------------------------------

You can add Gantt code file into your project in several ways, depending on the type of an application you create:

- [Include files via the &#60;script&#62; tag](#scripttag)
- [Import files into ES6/7 and TypeScript apps](#moduleimport)
- [Include files into a RequireJS-based app](#requirejsimport)


Include files via the &#60;script&#62; tag
--------------------------------------------

The dhtmlxGantt requires including 2 code files on the page:

- **dhtmlxgantt.js**
- **dhtmlxgantt.css**

~~~html
<script src="codebase/dhtmlxgantt.js"></script>
<link href="codebase/dhtmlxgantt.css" rel="stylesheet">
~~~

Let's quickly explore the structure of the dhtmlxGantt package to find out where to look for the files. 

Main folders and files that make up the dhtmlxGantt package are:

- <b>sources</b> - the source code files of the library. The files are not minified and easy-to-read. The package is mostly intended to be used for components' debugging.
- <b>samples</b> - the code samples.
- <b>docs</b> - the full documentation of the component.
- <b>codebase</b> - the packed code files of the library. These files have much smaller size and intended to be used in production. <b>In your apps you need to use files from this folder.</b>

Import files into ES6/7 and TypeScript apps
---------------------------------------------

Use the following command to import files:

~~~js
import { gantt } from 'dhtmlx-gantt';
~~~

For the Commercial, Enterprise or Ultimate version the command look like this:

~~~js
import { gantt, Gantt } from 'dhtmlx-gantt';
~~~

Using Gantt with Vite
--------------------------

If you use Vite in your project, the following setting is required for the **vite.config.js** file to ensure that Gantt is correctly included into the app:

{{snippet vite.config.js}}
~~~js 
optimizeDeps: {
	include: [
		'dhtmlx-gantt',
	]
}
~~~

### Svelte production build

If you use [Gantt in a Svelte app](desktop/howtostart_svelte.md), you need to add the following setting into the **vite.config.js** file for the production build, 
replacing the *gantt_8.0.6_evaluation* folder with the path to your Gantt folder:

{{snippet vite.config.js}}
~~~js 
build: {
	commonjsOptions: {
		include: [
			"node_modules",
			"gantt_8.0.6_evaluation/codebase/dhtmlxgantt.js"
		]
	},
}
~~~

Include files into a RequireJS-based app
------------------------------------------- 

To include dhtmlxGantt files into a RequireJS-based app, you need to follow the logic shown in the example below:

~~~js
requirejs(["codebase/dhtmlxgantt"], function(dhx){
  var gantt = dhx.gantt;
  var Gantt = dhx.Gantt;// for Enterprise builds
 
  gantt.init("gantt_here");
  gantt.parse({
    data: [
      { id:1, text:"Project #2", start_date:"01-04-2018", 
      	duration:18, progress:0.4, open:true },
      { id:2, text:"Task #1", start_date:"02-04-2018", 
      	duration:8, progress:0.6, parent:1 },
      { id:3, text:"Task #2", start_date:"11-04-2018", 
      	duration:8, progress:0.6, parent:1 }
    ],
    links: [
      { id:1, source:1, target:2, type:"1" },
      { id:2, source:2, target:3, type:"0" }
    ]
  });
});
~~~

The dhtmlxGantt library will return an object with fields `gantt` and `Gantt` (in Commercial, Enterprise or Ultimate versions) - the *gantt* and *Gantt* objects described [here](desktop/multiple_gantts.md).

{{note  When using Gantt with custom extensions in RequireJS, you should specify the `shim` config for RequireJS and directly set the dependency of extensions from Gantt in it.}}

The example below demonstrates how a custom extension file *custom_tooltip_plugin.js* can be set in the correct way:

~~~js
requirejs.config({
  paths: {
    "dhtmlxgantt": "../../codebase/dhtmlxgantt",
    "ext/dhtmlxgantt_custom_tooltip": "../custom_tooltip_plugin"
  },
  shim: {
    "ext/dhtmlxgantt_custom_tooltip": ["dhtmlxgantt"]
  }
});
 
requirejs(["dhtmlxgantt"], 
function (dhx) {
  var gantt = dhx.gantt;

  var date_to_str = gantt.date.date_to_str(gantt.config.task_date);
  var today = new Date(2018, 3, 5);
  gantt.addMarker({
    start_date: today,
    css: "today",
    text: "Today",
    title: "Today: " + date_to_str(today)
  });
 
  gantt.init("gantt_here");
  gantt.parse({
    data: [
      { id:1, text:"Project #2", start_date:"01-04-2018",
      	duration:18, progress:0.4, open:true },
      { id:2, text:"Task #1", start_date:"02-04-2018", 
      	duration:8, progress:0.6, parent:1 },
      { id:3, text:"Task #2", start_date:"11-04-2018", 
      	duration:8, progress:0.6, parent:1 }
    ],
    links: [
      { id:1, source:1, target:2, type:"1" },
      { id:2, source:2, target:3, type:"0" }
    ]
  });
});
~~~

Check that the module name for any file inside the package is specified as *a relative path inside the 'codebase' folder of the package* plus *the filename*, for instance:

**core library:**

- "dhtmlxgantt": "./vendor/dhtmlxgantt/dhtmlxgantt"


Full screen mode
---------------------------------

To correctly display a Gantt chart in the full-screen mode in different browsers, define the following style on the page:

~~~html
<style type="text/css" media="screen">
    html, body{
        margin:0px;
        padding:0px;
        height:100%;
        overflow:hidden;
    }   
</style>
~~~



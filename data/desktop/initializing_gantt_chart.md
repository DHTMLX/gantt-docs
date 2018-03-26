Initializing Gantt Chart on a Page
================================================

When you develop an application with dhtmlxGantt, the first thing you need is to initialize or, simply speaking, to display the Gantt chart on the page.

To display a basic Gantt on the page, follow 3 steps: 

1. Include the [dhtmlxGantt code files](desktop/initializing_gantt_chart.md#requiredcodefiles) on the page.
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
 
 
Required code files 
------------------------------------------------------------
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



Fullscreen-mode
------------------------------------------------------------
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


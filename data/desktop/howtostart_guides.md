How to Start with dhtmlxGantt
===============================

This section is dedicated to the very beginning of [work with Gantt chart and its communication with a server using different technologies](#integrationwithserversideplatforms).

Basic initialization
-----------------------

Before you start learning [how to build your application with Gantt on the server-side](#integrationwithserversideplatforms), take a look at how to initialize or, simply speaking, to display the Gantt chart on the page.

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

{{note For mode details, check the desktop/initializing_gantt_chart.md article.}}

Integration with server-side platforms
---------------------------------------

You can watch the video guide that shows how to create a Gantt chart on the page and load the data into it on the example of a Node.js platform.

<iframe width="704" height="400" src="https://www.youtube.com/embed/D8YzyzBfyP8" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

<br>

Below you will find a brief overview of the guides which tell you about basic Gantt initialization on different server-side platforms to suit all tastes and preferences.<br>

<table style='border-left:none !important;' cellspacing="0" cellpadding="5" border="0">
	<tbody>
    <tr>
        <td>
		    <span style="font-size:15px;">desktop/howtostart_dotnet_core.md</span>
            <br>
         	A comprehensive tutorial that describes how to use Gantt together with ASP.Net Core. 
        </td> 
         <td>
        	<a href="desktop/howtostart_dotnet_core.md"><img src="desktop/asp_dotnet_core_tutorial.png"></a>
        </td>
    </tr>	
    <tr>
        <td>
		    <span style="font-size:15px;">desktop/howtostart_nodejs.md</span>  
            <br>
            A detailed tutorial which dwells on Gantt chart implementation on a Node.js platform. 
        </td>
        <td>
        	<a href="desktop/howtostart_nodejs.md"><img src="desktop/node_tutorial.png"></a>
        </td>
    </tr>
    <tr>
        <td>
		    <span style="font-size:15px;">desktop/howtostart_dotnet.md</span>
            <br>
            An elaborated tutorial that explores the specificity of implementing a Gantt chart with ASP.NET MVC and ASP.NET WebAPI 2. 
        </td>
        <td>
        	<a href="desktop/howtostart_dotnet.md"><img src="desktop/asp_dotnet_mvc_tutorial.png"></a>
        </td>
    </tr>
    <tr>
    	<td>
    		<span style="font-size:15px;">desktop/howtostart_php_laravel.md</span>
            <br>            
            A comprehensive tutorial that discusses how to add Gantt into a Laravel app. 
        </td>
        <td>
            <a href="desktop/howtostart_php_laravel.md"><img src="desktop/how_to_start_laravel.png"></a>
        </td>
        </tr>
    <tr>
    	<td>
    		<span style="font-size:15px;">desktop/howtostart_php_slim4.md</span>
            <br>            
            A comprehensive tutorial that discusses how to implement a PHP-based Gantt using Slim 4 Framework.
        </td>
        <td>
            <a href="desktop/howtostart_php_slim4.md"><img src="desktop/php_tutorial.png"></a>
        </td>
        </tr>
    <tr>
        <td>
		    <span style="font-size:15px;">desktop/howtostart_ruby.md</span>
            <br>
         	An easy to reproduce tutorial that will walk you through the stages of implementing a Gantt chart on the base of Ruby on Rails. 
        </td> 
         <td>
        	<a href="desktop/howtostart_ruby.md"><img src="desktop/ruby_tutorial.png"></a>
        </td>
    </tr>	
    </tbody>
</table>


@index:
- desktop/howtostart_dotnet_core.md
- desktop/howtostart_nodejs.md
- desktop/howtostart_dotnet.md
- desktop/howtostart_php_laravel.md
- desktop/howtostart_php_slim4.md
- desktop/howtostart_ruby.md
- desktop/howtostart_php.md


FAQ
==============

The Gantt chart isn't rendered correctly
-----------------------------------------
If the Gantt chart wasn't rendered on the page properly, please, check a CSS style for the chart's container - it must have a valid size in pixels or percents.<br>

- If the size defined in percents - make sure that the parent container has some height specified as well. 
- If the Gantt chart was placed directly in the body - specify the following css style to use a percent-based height correctly:

~~~js
html, body{
	margin:0px;
	padding:0px;
	height:100%; /*mandatory*/
	overflow:hidden;
}
~~~


The Gantt chart isn't rendered in Internet Explorer correctly
---------------------------------------------------------
If the Gantt chart wasn't rendered on the page properly only in the Internet Explorer browser, please, make sure that your page uses a full DOCTYPE declaration.
dhtmlxGantt can work correctly in the standard modes of IE6, IE7 and IE8 but isn't purposed to be used with the quirks modes of IE.

For example, HTML5 DOCTYPE is:

~~~html
<!DOCTYPE html>
~~~

An error alert appears in the right top corner
-----------------------------------------

<img src="desktop/error_alert.png">

Firstly, you need to find out what causes the error. 

The messages appear when the component can not perform properly. 
They usually indicate a real issue with the data or with the application logic. So simply hiding them will only camouflage the issue while it can appear in other parts of the app.

However, you may want to disable these messages before shipping your application to end users. In this case you can use the api/gantt_show_errors_config.md config:

~~~js
gantt.config.show_errors = false;
~~~


Gantt doesn't show anything
--------------------------

There are two most obvious scenarios:

1\. You try to implement the backend API either manually or following our [tutorials](desktop/howtostart_guides.md), but Gantt doesn't show any tasks or links when you open the page.

or

2\. You have troubles with saving changes to the backend.

Read the desktop/troubleshooting.md article that gives instructions on how to identify the reasons of the problems.

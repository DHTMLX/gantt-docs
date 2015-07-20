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

For example,  HTML5 DOCTYPE is:

~~~html
<!DOCTYPE html>
~~~

An error alert appears during data loading
-----------------------------------------

An error alerts signals that there were some problems while loading data. 

<img src="desktop/error_alert.png">

So firstly, try to find out what causes this error.
If you want to make sure that such an alert won't be displayed in any case, use the *show_errors:false* in the gantt configuration. 


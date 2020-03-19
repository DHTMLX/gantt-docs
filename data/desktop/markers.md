Adding Vertical Markers
=========================================================

The library provides the **ext/dhtmlxgantt_marker.js** extension that allows you to mark (highlight) certain dates or date ranges.

<div style="text-align:center;"><img src="desktop/today_marker.png"/></div>

{{note
To start using the extension, enable the **marker** plugin using the [gantt.plugins](api/gantt_plugins.md) method.
}}

~~~js
<!DOCTYPE html>
<html>
<head>
   <script src="codebase/dhtmlxgantt.js"></script>   
   <link href="codebase/dhtmlxgantt.css" rel="stylesheet">   
</head>
<body>
    gantt.plugins({ /*!*/
        marker: true /*!*/
    }); /*!*/
    //your code will be here
</body>
</html>
~~~
{{sample
02_extensions/05_today_line.html
}}


##Adding a marker
To add a marker to the timeline area, e.g. the today's marker, call the api/gantt_addmarker.md method:

~~~js
var markerId = gantt.addMarker({
	start_date: new Date(), //a Date object that sets the marker's date
	css: "today", //a CSS class applied to the marker
	text: "Now", //the marker title
	title:date_to_str( new Date()) // the marker's tooltip
});
~~~
{{sample
02_extensions/05_today_line.html
}}

{{note
Note, as the value of the 'text' property, the method can take any HTML
}}


To get an object of the added marker, use the api/gantt_getmarker.md method:

~~~js
var markerId = gantt.addMarker({  /*!*/
	start_date: new Date(), 
	css: "today", 
	text: "Now", 
	title:date_to_str( new Date()) 
});
gantt.getMarker(markerId); //->{css:"today", text:"Now", id:...}
~~~
{{sample
02_extensions/05_today_line.html
}}

## Removing a marker

To remove once added marker, use the api/gantt_deletemarker.md method: 

~~~js
var markerId = gantt.addMarker({  /*!*/
	start_date: new Date(), 
	css: "today", 
	text: "Now", 
	title:date_to_str( new Date()) 
});

gantt.deleteMarker(markerId); /*!*/
~~~

##Hiding markers
To hide all added markers, set the api/gantt_show_markers_config.md configuration option to 'false': 

~~~js
var marker1 = gantt.addMarker({ ...}); 
var marker2 = gantt.addMarker({ ...}); 
var marker3 = gantt.addMarker({ ...}); 

gantt.config.show_markers = false;// hides all 3 markers
~~~

##Updating a marker

To update a marker, use the  api/gantt_updatemarker.md method:

~~~js
var markerId = gantt.addMarker({  /*!*/
	start_date: new Date(), 
	css: "today", 
	text: "Now", 
	title:date_to_str( new Date()) 
});

gantt.getMarker(markerId).css = "today_new";
gantt.updateMarker(markerId); /*!*/
~~~

To update all added markers, use the 	api/gantt_rendermarkers.md method: 

~~~js
var marker1 = gantt.addMarker({ ...}); 
var marker2 = gantt.addMarker({ ...}); 
var marker3 = gantt.addMarker({ ...}); 

gantt.renderMarkers(); /*!*/
~~~

Styling markers
----------------------------

To style markers, use the **gantt.templates.marker_class** template:

~~~js
var showAdvancedMarkers;
gantt.templates.marker_class = function(marker){
	if (showAdvancedMarkers)
    return "advanced_marker";
    return "hidden";
}
~~~

Today's marker
-------------------------------------

Let's assume that you want to have the today's marker in your Gantt chart. In this case you need both: to add a marker on the page and to provide a function that will move the marker as the time changes. You can do this with the following code:

~~~js
var date_to_str = gantt.date.date_to_str(gantt.config.task_date);

var id = gantt.addMarker({ 
	start_date: new Date(), 
    css: "today", 
    title:date_to_str( new Date())
});
setInterval(function(){
	var today = gantt.getMarker(id);
	today.start_date = new Date();
	today.title = date_to_str(today.start_date);
	gantt.updateMarker(id);
}, 1000*60);
~~~
{{sample
02_extensions/05_today_line.html
}}


addMarker
=============

@short:adds a marker to the timeline area

@params:
- marker	object	the marker's configuration object

@returns:
- markerId	string	the marker's id


@example:
var todayMarker = gantt.addMarker({
	start_date: new Date(),
    css: "today",
    title:date_to_str( new Date())
});
setInterval(function(){
	var today = gantt.getMarker(todayMarker);
	today.start_date = new Date();
	today.title = date_to_str(today.start_date);
	gantt.updateMarker(todayMarker);
}, 1000*60);

@template:	api_method
@descr:

{{note This method is defined in the **ext/dhtmlxgantt_marker.js** extension, so you need to include it on the page. Read the details in the desktop/markers.md article.}}



The configuration object has the following properties:

- **id** - the marker id
- **start_date** - a Date object that sets the marker's start date
- **end_date** - a Date object that sets the marker's end date
- **css** - a CSS class applied to the marker
- **text** - the marker title
- **title** - the marker's tooltip


@related:
	desktop/markers.md
@relatedapi:
	api/gantt_getmarker.md
	api/gantt_updatemarker.md
	api/gantt_rendermarkers.md
	api/gantt_deletemarker.md
    api/gantt_show_markers_config.md
@relatedsample:
	02_extensions/05_today_line.html


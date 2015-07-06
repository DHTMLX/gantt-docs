deleteMarker
=============

@short:deletes the specified marker 
@edition: pro
@params:
- markerId	string	the marker's id


@example:
var todayMarker = gantt.addMarker({ 
	start_date: new Date(), 
    css: "today", 
    title:date_to_str( new Date())
});
gantt.deleteMarker(todayMarker);/*!*/

    
@template:	api_method
@descr:

    

@related:
	desktop/markers.md
@relatedapi:
	api/gantt_addmarker.md
	api/gantt_getmarker.md
	api/gantt_updatemarker.md
	api/gantt_rendermarkers.md
    api/gantt_show_markers_config.md
@relatedsample:
	02_extensions/05_today_line.html

deleteMarker
=============

@short:deletes the specified marker

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
{{pronote This functionality is available in the PRO edition only.}}


{{note This method is defined in the **ext/dhtmlxgantt_marker.js** extension, so you need to include it on the page. Read the details in the desktop/markers.md article.}}




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

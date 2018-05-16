show_markers
=============

@short:shows/hides markers on the page
	
@edition: pro
@type: boolean
@default:true
@example:
var marker1 = gantt.addMarker({ ...}); 
var marker2 = gantt.addMarker({ ...}); 
var marker3 = gantt.addMarker({ ...}); 

gantt.config.show_markers = false;// hides all 3 markers

@template:	api_config
@descr:
{{pronote This functionality is available in the PRO edition only.}}

@related:
	desktop/markers.md
@relatedapi:
    api/gantt_addmarker.md
	api/gantt_getmarker.md
	api/gantt_updatemarker.md
	api/gantt_rendermarkers.md
	api/gantt_deletemarker.md
@relatedsample:
	02_extensions/05_today_line.html


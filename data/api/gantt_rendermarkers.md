renderMarkers
=============

@short:updates all markers on the page

@example:
var marker1 = gantt.addMarker({ ...});
var marker2 = gantt.addMarker({ ...});
var marker3 = gantt.addMarker({ ...});

gantt.renderMarkers(); /*!*/

@template:	api_method
@descr:

{{note This method is defined in the **marker** extension, so you need to enable the [marker](desktop/extensions_list.md#verticalmarker) plugin. Read the details in the desktop/markers.md article.}}




@related:
	desktop/markers.md
@relatedapi:
	api/gantt_updatemarker.md
	api/gantt_addmarker.md
	api/gantt_getmarker.md
	api/gantt_deletemarker.md
    api/gantt_show_markers_config.md
@relatedsample:
	02_extensions/05_today_line.html

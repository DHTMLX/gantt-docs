getMarker
=============


@short:gets the marker's object

@params:
- markerId	string |number	the marker's id

@returns:
- marker	object	the marker's configuration object

@example:
const todayMarker = gantt.addMarker({
	start_date: new Date(),
    css: "today",
    text:"Now"
    title:date_to_str( new Date())
});
gantt.getMarker(todayMarker); //->{css:"today", text:"Now", id:...}

@template:	api_method
@descr:

{{note This method is defined in the **marker** extension, so you need to enable the [marker](desktop/extensions_list.md#verticalmarker) plugin. Read the details in the desktop/markers.md article.}}



@related:
	desktop/markers.md
@relatedapi:
	api/gantt_addmarker.md
	api/gantt_updatemarker.md
	api/gantt_rendermarkers.md
	api/gantt_deletemarker.md
    api/gantt_show_markers_config.md
@relatedsample:
	02_extensions/05_today_line.html


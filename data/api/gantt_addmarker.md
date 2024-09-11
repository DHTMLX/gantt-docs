addMarker
=============

@short:adds a marker to the timeline area

@params:
- marker	MarkerConfig	the marker's configuration object

@returns:
* markerId	number|string	optional, the marker's id


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

{{note This method is defined in the **marker** extension, so you need to enable the [marker](desktop/extensions_list.md#verticalmarker) plugin. Read the details in the desktop/markers.md article.}}



The configuration object has the following properties:

- <span class=subproperty>**id?**</span> - (*string | number*) - the marker id
- <span class=subproperty>**start_date**</span> - (*Date*) - a Date object that sets the marker's start date
- <span class=subproperty>**end_date?**</span> - (*Date*) - a Date object that sets the marker's end date
- <span class=subproperty>**css?**</span> - (*string*) - a CSS class applied to the marker
- <span class=subproperty>**text?**</span> - (*string | number*) - the marker title
- <span class=subproperty>**title?**</span> - (*string | number*) - the marker's tooltip




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


marker_class
=============

@short: specifies the CSS class that will be applied to markers
	

@params:
- marker	object	the marker's configuration object

@example:
var showAdvancedMarkers;
gantt.templates.marker_class = function(marker){
    if (showAdvancedMarkers) {
        return "advanced_marker";
    }
    return "hidden";
}

@template:	api_template
@descr:

@related: desktop/markers.md#stylingmarkers


---
sidebar_label: addMarker
title: addMarker method
description: "adds a marker to the timeline area"
---

# addMarker

### Description

@short: Adds a marker to the timeline area

@signature: addMarker: (marker: MarkerConfig) =\> number | string

### Parameters

- `marker` - (required) *MarkerConfig* - the marker's configuration object

### Returns
- `markerId` - (number|string) - optional, the marker's id

### Example

~~~jsx
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
~~~

### Related samples
- [Today and Status lines in Gantt (vertical markers)](https://docs.dhtmlx.com/gantt/samples/02_extensions/05_today_line.html)

### Details

:::note
This method is defined in the **marker** extension, so you need to enable the [marker](guides/extensions-list.md#vertical-marker) plugin. Read the details in the [Adding Vertical Markers](guides/markers.md) article. 
:::


The configuration object has the following properties:

- **id?** - (*string | number*) - the marker id
- **start_date** - (*Date*) - a Date object that sets the marker's start date
- **end_date?** - (*Date*) - a Date object that sets the marker's end date
- **css?** - (*string*) - a CSS class applied to the marker
- **text?** - (*string | number*) - the marker title
- **title?** - (*string | number*) - the marker's tooltip

### Related API
- [getMarker](api/method/getmarker.md)
- [updateMarker](api/method/updatemarker.md)
- [renderMarkers](api/method/rendermarkers.md)
- [deleteMarker](api/method/deletemarker.md)
- [show_markers](api/config/show_markers.md)

### Related Guides
- [Adding Vertical Markers](guides/markers.md)


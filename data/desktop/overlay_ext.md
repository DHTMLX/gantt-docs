Overlay Extension
======================

The **overlay.js** extension contains a set of API methods to simplify work with overlays. Read details about the Overlay extension in the article desktop/baselines.md#extraoverlayforthechart.

Methods
------------

The following methods are available via the **gantt.ext.overlay** object:

### addOverlay

adds a new overlay into the Gantt Chart and returns its id. Takes a container with custom content as a parameter.

~~~js
var overlay = gantt.ext.overlay.addOverlay(function(container){});
~~~

### deleteOverlay

removes an overlay by its id

~~~js
gantt.ext.overlay.deleteOverlay(id);
~~~

### getOverlaysIds 

returns an array with ids of overlays added into the chart

~~~js
var ids = gantt.ext.overlay.getOverlaysIds();
~~~

### refreshOverlay

repaints the specified overlay. Takes the id of an overlay as a parameter.

~~~js
gantt.ext.overlay.refreshOverlay(id);
~~~

### showOverlay

shows an overlay by its id. Takes the id of an overlay as a parameter.

~~~js
gantt.ext.overlay.showOverlay(id);
~~~

### hideOverlay

hides an overlay by its id

~~~js
gantt.ext.overlay.hideOverlay(id);
~~~

### isOverlayVisible

checks visibility of the specified overlay. Returns *true* if the overlay is visible.

~~~js
var isVisible = gantt.ext.overlay.isOverlayVisible(id);
~~~

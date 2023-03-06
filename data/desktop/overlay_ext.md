Overlay Extension
======================

{{pronote This functionality is available in the PRO edition only.}}

The **overlay** extension contains a set of API methods to simplify work with overlays. Read details about the Overlay extension in the article desktop/baselines.md#extraoverlayforthechart.

Methods
------------

The following methods are available via the **gantt.ext.overlay** object:

### addOverlay

- <span class=submethod>**addOverlay (render, id): string | number**</span> - adds a new overlay into the Gantt Chart and returns its id
	- **_render_** - (*Function*) - the render function. Takes a container with custom content as a parameter
	- **_id?_** - (*number | string*) - optional, the ID of the overlay

~~~js
var overlay = gantt.ext.overlay.addOverlay(function(container){});
~~~

### deleteOverlay

- <span class=submethod>**deleteOverlay (id): boolean**</span> - removes an overlay by its id
	- **_id_** - (*number | string*) - the ID of the overlay

~~~js
gantt.ext.overlay.deleteOverlay(id);
~~~

### getOverlaysIds 

- <span class=submethod>**getOverlaysIds (): Array&lt;string&gt;**</span> - returns an array with ids of overlays added into the chart

~~~js
var ids = gantt.ext.overlay.getOverlaysIds();
~~~

### refreshOverlay

- <span class=submethod>**refreshOverlay (id): undefined**</span> - repaints the specified overlay.
	- **_id_** - (*number | string*) - the ID of the overlay

~~~js
gantt.ext.overlay.refreshOverlay(id);
~~~

### showOverlay

- <span class=submethod>**showOverlay (id): undefined**</span> - shows an overlay by its id.
	- **_id_** - (*number | string*) - the ID of the overlay

~~~js
gantt.ext.overlay.showOverlay(id);
~~~

### hideOverlay

- <span class=submethod>**hideOverlay (id): undefined**</span> - hides an overlay by its id
	- **_id_** - (*number | string*) - the ID of the overlay

~~~js
gantt.ext.overlay.hideOverlay(id);
~~~

### isOverlayVisible

- <span class=submethod>**isOverlayVisible (id): boolean**</span> - checks visibility of the specified overlay. Returns *true* if the overlay is visible.
	- **_id_** - (*number | string*) - the ID of the overlay

~~~js
var isVisible = gantt.ext.overlay.isOverlayVisible(id);
~~~

@edition: pro
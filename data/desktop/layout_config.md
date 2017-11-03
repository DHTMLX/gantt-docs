Using Gantt Layout
==============================

Starting from version 5.0, Gantt provides the possibility to specify a configurable layout and arrange the elements of the component inside the layout as inner views.
It allows you to use additional timelines and grids to make a flexible gantt chart structure and define various schemes of arranging elements.

For example, you can place one more grid to the right side of the timeline or to add another grid and a timeline below the default ones.

<img src="desktop/gantt_resource_panel.png">

Applying Default Layout
------------------

The layout is set through the **layout** configuration option of the **gantt.config** object. The default configuration of the layout is the following:

~~~js
gantt.config.layout = {
	css: "gantt_container",
  	rows:[
   		{
    	   cols: [
     		{
        	  view: "tasksGrid", 
              width: 320, 
              id: "grid", 
              scrollX:"scrollHor", 
              scrollY:"scrollVer"
         	},
     		{ resizer: true, width: 1 },
     		{
        	  view: "tasksTimeline", 
              id: "timeline", 
              scrollX:"scrollHor", 
              scrollY:"scrollVer"
        	},
     	    {
              view: "scrollbar", 
              scroll: "y", 
              id:"scrollVer", 
              width:20
           	}
	    ]},
   	 	{
        	view: "scrollbar", 
            scroll: "x", 
            id:"scrollHor", 
            height:20
        }
  	]
}
~~~

The layout of Gantt consists of cells which are occupied by views. The main and helper gantt elements are presented by **views**, which are: 

- **grid** - defines the grid part of the Gantt chart. *tasksGrid* view is used by default. It is a grid predefined for showing tasks;
- **timeline** - defines the timeline part of the Gantt chart. *tasksTimeline* view is used by default. It is a timeline predefined for showing tasks;
- **resizer** - defines the resizer line. To enable a resizer, you need to set the *resizer* property to true;
- **scrollbar** - defines scrollbars used in the Gantt chart. Grid and timeline views can be bound to particular scrollbars. Read details below.

The view configuration is specified as an object with the corresponding properties. You can set custom configuration options for the **grid** and **timeline** views. 
The default options are taken from the global **gantt.config** object.


Binding Views to Scrollbar
-----------

Layout scrollbars are specified by the "scrollbar" view. You can set both a horizontal and vertical scrollbar. 

To use a scrollbar in the layout, you need to bind it to a corresponding view via the *scrollX* or *scrollY* property. It is possible to bind several views to the same 
scrollbar. In order to bind a view to a scrollbar:

- set a scrollbar with the necessary scrolling direction and assign an ID to it
- use the id of the scrollbar as a value of the *scrollX/scrollY* property inside the view configuration object

In the default layout the grid and timeline views are bound to both the horizontal and vertical scrolls:

~~~js
gantt.config.layout = {
	css: "gantt_container",
  	rows:[
   		{
    	   cols: [
     		{
        	  view: "tasksGrid", 
              id: "grid", 
              scrollY:"scrollVer"
         	},
     		{ resizer: true, width: 1 },
     		{
        	  view: "tasksTimeline", 
              id: "timeline", 
              scrollY:"scrollVer"
        	},
            {
              view: "scrollbar", 
              scroll: "y", 
              id:"scrollVer", 
              width:20
            }
     	]}
    ]
}
~~~

When you scroll the vertical scrollbar, the grid and timeline are scrolled together.


Configuring Gantt Layout
-------------------

You can change the default layout configuration and specify a necessary scheme of arranging the elements of Gantt chart on a page, using the default layout views.

For example, you can create additional grid and timeline views that will make a bottom resource panel for the main gantt chart. The steps to implement such a 
layout are:

- specify the default gantt configuration in the first row of the layout
- specify a custom gantt configuration for the resource panel in the second row of the layout
- place a resizer line between the two rows with the "resizer" view
- define the settings of scrollbars common for both charts

~~~js
gantt.config.layout = {
	css: "gantt_container",
	rows:[
		{
          // the default layout
		  cols: [
			{view: "tasksGrid", id: "grid", 
                config: mainGridConfig, scrollY:"scrollVer"},
			{resizer: true, width: 1},
			{view: "tasksTimeline", id: "timeline", 
                scrollX:"scrollHor", scrollY:"scrollVer"},
			{view: "scrollbar", scroll: "y", id:"scrollVer", width:20}
		  ]
		},
		{resizer: true, width: 1, mode:"y"},
		{
          // a custom layout
		  cols: [
			{view: "grid", id: "resourceGrid", width:435, bind:"resource", 
                config:resourceGridConfig, scrollY:"resourceVScroll"},
			{resizer: true, width: 1},
			{view:"timeline", id:"resourceTimeline", scrollX:"scrollHor", 
            	bind:"resource", bindLinks: null, layers: resourceLayers, 
                scrollY:"resourceVScroll"},
			{view: "scrollbar", scroll: "y", id:"resourceVScroll", width:20}
		  ]
		},
		{view: "scrollbar", scroll: "x", id:"scrollHor", height:20}
	]
};
~~~

###Setting custom grid and timeline

For custom grid and timeline you should specify additional properties:

- **bind** - (*string*) sets the id of a data source to take data from. It is set both for the grid and timeline;
- **bindLinks** - () points to the source of links
- **layers** - (*array*) an array the elements of which describe the way of styling data



Working with Global Gantt API
-------------------

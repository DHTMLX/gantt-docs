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
              // the default grid view	
        	  view: "tasksGrid", 
              width: 320, 
              id: "grid", 
              scrollX:"scrollHor", 
              scrollY:"scrollVer"
         	},
     		{ resizer: true, width: 1 },
     		{
              // the default timeline view
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

The view configuration is specified as an object with the corresponding properties. 
You can [set custom configuration options](desktop/layout_config.md#configuringganttlayout) for the **grid** and **timeline** views. 
The default options are taken from the global **gantt.config** object.


Binding Views to Scrollbar
-----------

Layout scrollbars are specified by the **"scrollbar"** view. You can set both a horizontal and vertical scrollbar. 

To use a scrollbar in the layout, you need to bind it to a corresponding view via the *scrollX* or *scrollY* property. It is possible to bind several views to the same 
scrollbar. In order to bind a view to a scrollbar:

- set a scrollbar with the necessary scrolling direction and assign an ID to it
- use the id of the scrollbar as a value of the *scrollX/scrollY* property inside the view configuration object

Let's bind custom grid and timeline views to the vertical scroll:

~~~js
gantt.config.layout = {
	css: "gantt_container",
  	rows:[
   		{
    	   cols: [
     		{
        	  view: "grid", 
              id: "newGrid", 
              scrollY:"scrollVer"
         	},
     		{ resizer: true, width: 1 },
     		{
        	  view: "timeline", 
              id: "newTimeline", 
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
In the default layout the grid and timeline views are bound to both the horizontal and vertical scrolls.


Configuring Gantt Layout
-------------------

You can change the default layout configuration and specify a necessary scheme of arranging the elements of Gantt chart on a page, using the default layout views.

For example, you can create additional grid and timeline views that will make a bottom resource panel for the main gantt chart. The steps to implement such a 
custom layout are:

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

In the above example, we have added an extra grid view that contains the list of resources and their personal and general workload. We've also created an extra
timeline view which displays the distribution of working hours and indicates standard and overtime hours.

###Properties of custom grid and timeline

For custom grid and timeline you should specify additional properties:

- **bind** - (*string*) sets the id of a data source to take data from. It is set both for the grid and timeline;
- **bindLinks** - (*string*?) points to the source of links. *null*, if there are no related links
- **layers** - (*array*) an array the elements of which describe the way of styling data


Working with Global Gantt API
-------------------

There are methods of the global Gantt API that are bound to the default grid, timeline and scrollbar views. In order to adjust these methods to work properly with 
inner views of the layout (including custom views), you need to bind them to the views using their ids. The methods that depend on the grid or on the timeline will look for
the views with the specified id.

For example, to get the position of a task, you should use the api/gantt_gettaskposition.md and the id of the corresponding timeline view:

~~~js
// the default timeline configuration
{view: "tasksTimeline", id: "timeline", 
	scrollX:"scrollHor", scrollY:"scrollVer"}

// getting the position of a task from the default timeline
gantt.getTaskPosition(task,from,to);
~~~


The same logic is true for scrollbars. The methods that depend on scrollbars will search for the "scrollbar" views with a certain id.

Thus, to get the current position of a custom scroll, you need to pass the id of the necessary scrollbar to the api/gantt_getscrollstate.md method:

~~~js
// a custom scrollbar configuration
{view: "scrollbar", scroll: "y", id:"resourceVScroll", width:20}

// getting the state of a custom scroll
var customScrollPos = gantt.getScrollState("resourceVScroll");
~~~



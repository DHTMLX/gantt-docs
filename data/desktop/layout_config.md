Using Gantt Layout
==============================


Starting from version 5.0, Gantt provides the possibility to specify a configurable layout and arrange the elements of the component as inner views of a layout.
It allows you to use additional timelines and grids to make a flexible gantt chart structure and define various schemes of arranging elements.

For example, you can place one more grid to the right side of the timeline:

<img src="desktop/gantt_two_grids.png">

{{sample 10_layout/01_rightside_columns.html}}

or add another grid and a timeline below the default ones.

<img src="desktop/gantt_resource_panel.png">

{{sample 10_layout/02_resource_panel.html}}

Default Layout
------------------

The layout is set through the api/gantt_layout_config.md configuration option of the **gantt.config** object. The default configuration of the layout is the following:

~~~js
gantt.config.layout = {
	css: "gantt_container",
  	rows:[
   		{
    	   cols: [
     		{
              // the default grid view	
        	  view: "grid",  
              scrollX:"scrollHor", 
              scrollY:"scrollVer"
         	},
     		{ resizer: true, width: 1 },
     		{
              // the default timeline view
        	  view: "timeline", 
              scrollX:"scrollHor", 
              scrollY:"scrollVer"
        	},
     	    {
              view: "scrollbar", 
              id:"scrollVer"
           	}
	    ]},
   	 	{
        	view: "scrollbar", 
            id:"scrollHor"
        }
  	]
}
~~~

The layout of Gantt consists of cells which are occupied by views. The main and helper gantt elements are presented by **views**, which are: 

- **grid** - defines the grid part of the Gantt chart. The main grid predefined for showing tasks has the *id:"grid"*;
- **timeline** - defines the timeline part of the Gantt chart. The main timeline predefined for showing tasks has the *id:"timeline"*;
- **resizer** - defines the resizer line. To enable a resizer, you need to set the **resizer** property to *true*;
- **scrollbar** - defines scrollbars used in the Gantt chart. Grid and timeline views can be bound to particular scrollbars. Read details below.
- **resourceGrid** - preconfigured grid for a resource panel. Available in the PRO edition only. See more details [here](desktop/resource_management.md).
- **resourceTimeline** - preconfigured timeline for a resource panel. Available in the PRO edition only. See more details [here](desktop/resource_management.md).

The view configuration is specified as an object with the corresponding properties. 
You can [set custom configuration options](desktop/layout_config.md#configuringganttlayout) for the **grid** and **timeline** views. 
The default options are taken from the global **gantt.config** object.

{{note Note that you should specify the configuration of layout before Gantt initialization. If you make changes in the layout, you need to reinitialize Gantt.}}

Scrollbar
-----------

Layout scrollbars are specified by the **"scrollbar"** view. You can set both a horizontal and vertical scrollbar. 

To use a scrollbar in the layout, you need to bind it to a corresponding view with the help of the **scrollX** or **scrollY** properties via the id of the necessary scrollbar. 
It is possible to bind several views to the same scrollbar. In order to bind a view to a scrollbar:

- set a scrollbar with the necessary scrolling direction and assign an ID to it
- use the id of the scrollbar as a value of the **scrollX/scrollY** property inside the view configuration object

Defining a scrollbar inside the `cols` array will create a vertical scrollbar, defining one in the `rows` array will make a horizontal scrollbar.
Alternatively, you can define the scroll mode explicitly using the **scroll** parameter:

~~~js
{ view: "scrollbar", id:"scroller", scroll: "x"	} // horizontal
~~~
or:
~~~js
{ view: "scrollbar", id:"scroller", scroll: "y"	} // vertical
~~~

Let's bind custom grid and timeline views to the vertical scroll:

~~~js
gantt.config.layout = {
	css: "gantt_container",
  	rows:[
   		{
    	   cols: [
     		{             
        	  view: "grid", 
              scrollY:"scrollVer"
         	},
     		{ resizer: true, width: 1 },
     		{
        	  view: "timeline", 
              scrollY:"scrollVer"
        	},
     	    {
              view: "scrollbar", 
              id:"scrollVer"
           	}
	    ]}
  	]
}
~~~

When you scroll the vertical scrollbar, the grid and timeline are scrolled together.
In the default layout the grid and timeline views are bound to both the horizontal and vertical scrolls.

It is also possible to specify a separate horizontal scrollbar for the Grid view. [Read the details](desktop/specifying_columns.md#horizontalscrollbar) in the corresponding section.

Layout Customization
-------------------

You can change the default layout configuration and specify a necessary scheme of arranging the elements of Gantt chart on a page, using additional layout views.

For example, you can create additional grid and timeline views that will make a bottom resource panel for the main gantt chart. The steps to implement such a 
custom layout are:

- create a multi-row layout
- add a default grid and a timeline to the first row of the layout
- add an additional grid and timeline to the next row and bind them to a custom datasource
- add a resizer between these rows
- add a scrollbar to the last row and bind it to both the default and the resource timeline

~~~js
gantt.config.layout = {
	css: "gantt_container",
	rows:[
		{
          // the default layout
		  cols: [
			{view: "grid",
                config: mainGridConfig, scrollY:"scrollVer"},
			{resizer: true, width: 1},
			{view: "timeline", 
                scrollX:"scrollHor", scrollY:"scrollVer"},
			{view: "scrollbar", id:"scrollVer"}
		  ]
		},
		{resizer: true, width: 1},
		{
          // a custom layout
		  cols: [
			{view: "grid", id: "resourceGrid", bind:"resource", 
                config:resourceGridConfig, scrollY:"resourceVScroll"},
			{resizer: true, width: 1},
			{view:"timeline", id:"resourceTimeline", scrollX:"scrollHor", 
            	bind:"resource", bindLinks: null, layers: resourceLayers, 
                scrollY:"resourceVScroll"},
			{view: "scrollbar", id:"resourceVScroll"}
		  ]
		},
		{view: "scrollbar", id:"scrollHor"}
	]
};
~~~

In the above example, an extra grid view has been added. It contains the list of resources and their workload. There is also an extra
timeline view which displays the distribution of working hours during the month and indicates standard and overtime hours.

###Properties of custom grid and timeline

Custom grid and timeline have additional properties:

####For the grid and timeline views

- **bind** - (*string*) sets the id of a datastore to take data from ("resource" in the example)

####For the timeline view

- **bindLinks** - (*string*) points to the source of links. *null*, if there are no related links;
- **layers** - (*array*) a configuration option defined as a set of **addLayer()** functions that describe the way of styling data.

###Adding a datastore for custom views

To populate custom views with corresponding data, you need to add a separate datastore. To create a new datastore, use the method 
api/gantt_createdatastore.md and specify the configuration of the datastore:

~~~js
var resourcesStore = gantt.createDatastore({
	name:"resource",
	initItem: function(item){
		item.id = item.key || gantt.uid();
		return item;
	}
});
~~~

In the above example a datastore named "resource" is added.

To load data into custom views from the datastore, use the api/gantt_parse.md method:

~~~js
resourcesStore.parse([// resources
	{key:'0', label: "N/A"},
	{key:'1', label: "John"},
	{key:'2', label: "Mike"},
	{key:'3', label: "Anna"}
]);
~~~

To return a configuration object of the necessary datastore, use the api/gantt_getdatastore.md method:

~~~js
var tasksStore = gantt.getDatastore("task");
~~~

The method takes the name of the datastore as a parameter.

HTML as Inner View
------------------------

You can also use some custom HTML as inner views of the Gantt layout. For example:

~~~js
gantt.config.layout = {
 css: "gantt_container",
  rows: [
  	{
   	  cols: [
    	{view: "grid",scrollX: "scrollHor", scrollY: "scrollVer"},
    	{ html:"<div class='custom-content'>custom content</div>", 
    		css:"custom-content", width:50},
    	{view: "timeline", scrollX: "scrollHor", scrollY: "scrollVer"},
    	{ html:"<div class='custom-content'>custom content</div>", 
    		css:"custom-content", width:50},
    	{view: "scrollbar", id: "scrollVer"}
   	  ]
    },
    {view: "scrollbar", scroll: "x", id: "scrollHor"}
 ]
}
~~~


Required views and settings
-------------------

The public API of the gantt object contains methods that are derived from specific layout views, e.g. api/gantt_gettaskposition.md, api/gantt_gettasknode.md, api/gantt_getscrollstate.md. 

In order for these methods to work as expected, the layout must contain the default grid, timeline, scrollbars and the gantt should be able to locate them. 
It is done by assigning specific ids to the default views:

~~~js
gantt.config.layout = {
 css: "gantt_container",
  rows: [
  {
   cols: [
    {view: "grid", id: "grid", scrollX: "scrollHor", scrollY: "scrollVer"},
    {view: "timeline", id: "timeline", scrollX: "scrollHor", scrollY: "scrollVer"},
    {view: "scrollbar", id: "scrollVer"}
   ]
  },
  {view: "scrollbar", id: "scrollHor"}
 ]
};
~~~

The required views and their ids are:

- view: "grid", id: "grid"
- view: "timeline", id: "timeline"
- view: "scrollbar", id: "scrollHor"
- view: "scrollbar", id: "scrollVer"

Note that if the id is not specified, gantt will either use the view name as a default view id, or auto generate a unique id.
Thus, in case of the default grid and timeline, the "id" parameter can be ommited:

~~~js
gantt.config.layout = {
 css: "gantt_container",
  rows: [
  {
   cols: [
    {view: "grid", scrollX: "scrollHor", scrollY: "scrollVer"},
    {view: "timeline", scrollX: "scrollHor", scrollY: "scrollVer"},
    {view: "scrollbar", id: "scrollVer"}
   ]
  },
  {view: "scrollbar", id: "scrollHor"}
 ]
};
~~~

The layout can contain any additional number of views.

Configs and templates of views
-------------------

Grid and Timeline views reuse the templates and configs from the global gantt.config/gantt.templates. However, these settings can be overridden for the specific views at the layout level.

For example: 

~~~js
var secondGridColumns = {
  columns: [
	{
		name: "status", label: "Status", width: 60, align: "center", 
        template: function (task) {
			var progress = task.progress || 0;
			return Math.floor(progress * 100) + "";
		}
	},
	{
	    name: "impact", width: 80, label: "Impact", template: function (task) {
			return (task.duration * 1000).toLocaleString("en-US", {
              style: 'currency', currency: 'USD'
          });
		}
	}
  ]
};

gantt.config.layout = {
  css: "gantt_container",
  rows: [
	{
	  cols: [
		{view: "grid", id: "grid", width: 320, scrollY: "scrollVer"},
		{resizer: true, width: 1},
	    {view: "timeline", id: "timeline", scrollX: "scrollHor", scrollY: "scrollVer"},
		{resizer: true, width: 1},
		{view: "grid", width: 120, bind:"task", 
        	scrollY:"scrollVer", config:secondGridColumns},   /*!*/
		{view: "scrollbar", scroll: "y", id: "scrollVer"}
	  ]
	},
	{view: "scrollbar", id: "scrollHor", height: 20}
  ]
};
~~~


Views can inherit configs and templates from the parent layout:

~~~js
var resourceConfig = {    /*!*/
	scale_height: 30	  /*!*/
};						  /*!*/

gantt.config.layout = {
  css: "gantt_container",
  rows: [
	{
	  cols: [
		{view: "grid", group:"grids", scrollY: "scrollVer"},
		{resizer: true, width: 1},
		{view: "timeline", scrollX: "scrollHor", scrollY: "scrollVer"},
		{view: "scrollbar", id: "scrollVer", group:"vertical"}
	  ],
	  gravity:2
	},
	{resizer: true, width: 1},
	{
	  config: resourceConfig,   /*!*/
	  cols: [
		{view: "resourceGrid", group:"grids", width: 435, scrollY: "resourceVScroll" },
		{resizer: true, width: 1},
		{view: "resourceTimeline", scrollX: "scrollHor", scrollY: "resourceVScroll"},
		{view: "scrollbar", id: "resourceVScroll", group:"vertical"}
	  ],
	  gravity:1
	},
	{view: "scrollbar", id: "scrollHor"}
  ]
};
~~~


Visibility groups
-----------------

Sometimes you need to synchronize visibility of some elements in the layout. For example, if you have horizontal scrollbars in the adjacent cells, you may want both of them to be displayed or hidden at the same time.

<img src="desktop/scrollable_grid.png">

{{sample 07_grid/10_scrollable_grid.html}}

<br>

Let's consider another example. You have several grids in different rows of the timeline and want them to have the same width. If one of the grids is resized, another should match its size.

<img src="desktop/grid_group_width.png">

{{sample 11_resources/04_resource_usage_diagram.html}}

Both these issues can be solved using the **group** property of the view. The property takes an arbitrary string value, the views with the same group value will be synchronized. 

- For scrollbars it means that their visibility will be synchronized. If at least one of the scrollbars of the group is visible, all scrollbars of the group will be visible. 

- For other cells it means that they'll have the same width/height, depending on the layout.

Synchronizing the visibility of scrollbars:

~~~js
gantt.config.layout = {
  css: "gantt_container",
  cols: [
	{
	   width:400,
	   min_width: 300,
	   rows:[
		 {view: "grid", scrollX: "gridScroll", scrollable: true, scrollY: "scrollVer"},
		 {view: "scrollbar", id: "gridScroll", group:"horizontal"}    /*!*/
		]
	},
	{resizer: true, width: 1},
	{
	  rows:[
		{view: "timeline", scrollX: "scrollHor", scrollY: "scrollVer"},
		{view: "scrollbar", id: "scrollHor", group:"horizontal"}      /*!*/
	  ]
	},
	{view: "scrollbar", id: "scrollVer"}
  ]
};
~~~

Synchronizing the width of grids:

~~~js
gantt.config.layout = {
  css: "gantt_container",
  rows: [
	{
	  cols: [
		{view: "grid", group:"grids", scrollY: "scrollVer"},
		{resizer: true, width: 1},
		{view: "timeline", scrollX: "scrollHor", scrollY: "scrollVer"},
		{view: "scrollbar", id: "scrollVer", group:"vertical"}    /*!*/
	  ],
	  gravity:2
	},
	{resizer: true, width: 1},
	{
	  config: resourceConfig,
	  cols: [
		{view: "resourceGrid", group:"grids", width: 435, scrollY: "resourceVScroll" },
		{resizer: true, width: 1},
		{view: "resourceTimeline", scrollX: "scrollHor", scrollY: "resourceVScroll"},
		{view: "scrollbar", id: "resourceVScroll", group:"vertical"}   /*!*/
	  ],
	  gravity:1
	},
	{view: "scrollbar", id: "scrollHor"}
  ]
};
~~~








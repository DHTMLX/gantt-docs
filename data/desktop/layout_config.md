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
        	  view: "grid", 
              id: "grid", 
              scrollX:"scrollHor", 
              scrollY:"scrollVer"
         	},
     		{ resizer: true, width: 1 },
     		{
              // the default timeline view
        	  view: "timeline", 
              id: "timeline", 
              scrollX:"scrollHor", 
              scrollY:"scrollVer"
        	},
     	    {
              view: "scrollbar", 
              scroll: "y", 
              id:"scrollVer"
           	}
	    ]},
   	 	{
        	view: "scrollbar", 
            scroll: "x", 
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

The view configuration is specified as an object with the corresponding properties. 
You can [set custom configuration options](desktop/layout_config.md#configuringganttlayout) for the **grid** and **timeline** views. 
The default options are taken from the global **gantt.config** object.


Binding Views to Scrollbar
-----------

Layout scrollbars are specified by the **"scrollbar"** view. You can set both a horizontal and vertical scrollbar. 

To use a scrollbar in the layout, you need to bind it to a corresponding view with the help of the **scrollX** or **scrollY** properties via the id of the necessary scrollbar. 
It is possible to bind several views to the same scrollbar. In order to bind a view to a scrollbar:

- set a scrollbar with the necessary scrolling direction and assign an ID to it
- use the id of the scrollbar as a value of the **scrollX/scrollY** property inside the view configuration object

Let's bind custom grid and timeline views to the vertical scroll:

~~~js
gantt.config.layout = {
	css: "gantt_container",
  	rows:[
   		{
    	   cols: [
     		{             
        	  view: "grid", 
              id: "grid", 
              scrollY:"scrollVer"
         	},
     		{ resizer: true, width: 1 },
     		{
        	  view: "timeline", 
              id: "timeline", 
              scrollY:"scrollVer"
        	},
     	    {
              view: "scrollbar", 
              scroll: "y", 
              id:"scrollVer"
           	}
	    ]}
  	]
}
~~~

When you scroll the vertical scrollbar, the grid and timeline are scrolled together.
In the default layout the grid and timeline views are bound to both the horizontal and vertical scrolls.


Configuring Gantt Layout
-------------------

You can change the default layout configuration and specify a necessary scheme of arranging the elements of Gantt chart on a page, using additional layout views.

For example, you can create additional grid and timeline views that will make a bottom resource panel for the main gantt chart. The steps to implement such a 
custom layout are:

- specify the default gantt configuration in the first row of the layout
- specify a custom gantt configuration for the resource panel in the second row of the layout
- place a resizer line between the two rows with the "resizer" view
- specify individual and common scrollbars for the default and the resource gantt

~~~js
gantt.config.layout = {
	css: "gantt_container",
	rows:[
		{
          // the default layout
		  cols: [
			{view: "grid", id: "grid", 
                config: mainGridConfig, scrollY:"scrollVer"},
			{resizer: true, width: 1},
			{view: "timeline", id: "timeline", 
                scrollX:"scrollHor", scrollY:"scrollVer"},
			{view: "scrollbar", scroll: "y", id:"scrollVer"}
		  ]
		},
		{resizer: true, width: 1, mode:"y"},
		{
          // a custom layout
		  cols: [
			{view: "grid", id: "resourceGrid", bind:"resource", 
                config:resourceGridConfig, scrollY:"resourceVScroll"},
			{resizer: true, width: 1},
			{view:"timeline", id:"resourceTimeline", scrollX:"scrollHor", 
            	bind:"resource", bindLinks: null, layers: resourceLayers, 
                scrollY:"resourceVScroll"},
			{view: "scrollbar", scroll: "y", id:"resourceVScroll"}
		  ]
		},
		{view: "scrollbar", scroll: "x", id:"scrollHor"}
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

Using HTML as Inner View
------------------------

You can also use some custom HTML as inner views of the Gantt layout. For example:

~~~js
gantt.config.layout = {
 css: "gantt_container",
  rows: [
  	{
   	  cols: [
    	{view: "grid", id: "grid", scrollX: "scrollHor", scrollY: "scrollVer"},
    	{ html:"<div class='custom-content'>custom content</div>", 
    		css:"custom-content", width:50},
    	{view: "timeline", id: "timeline", scrollX: "scrollHor", scrollY: "scrollVer"},
    	{ html:"<div class='custom-content'>custom content</div>", 
    		css:"custom-content", width:50},
    	{view: "scrollbar", scroll: "y", id: "scrollVer"}
   	  ]
    },
    {view: "scrollbar", scroll: "x", id: "scrollHor"}
 ]
}
~~~


Working with Global Gantt API
-------------------

The public API of the gantt object contains methods that rely on a certain layout configuration. 
Currently, in order for layout to work as expected, it must contain a grid and a timeline with fixed ids and a pair of scrollbars:

~~~js
gantt.config.layout = {
 css: "gantt_container",
  rows: [
  {
   cols: [
    {view: "grid", id: "grid", scrollX: "scrollHor", scrollY: "scrollVer"},
    {view: "timeline", id: "timeline", scrollX: "scrollHor", scrollY: "scrollVer"},
    {view: "scrollbar", scroll: "y", id: "scrollVer"}
   ]
  },
  {view: "scrollbar", scroll: "x", id: "scrollHor"}
 ]
};
~~~

The layout can contain any additional number of views.

###Adjusting the height of rows

You can set the height of rows in the gantt layout with the help of the api/gantt_row_height_config.md configuration option.
Note that the height of the timeline area will be modified together with the height of the Gantt rows.





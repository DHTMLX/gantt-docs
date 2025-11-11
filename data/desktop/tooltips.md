Tooltips for Gantt Elements
===========================

Tooltips allow you to add extra information for users without overflowing the screen with text. By default, tooltips are added to Gantt tasks.

<img src="desktop/task_tooltip.png"/>

You can [add tooltips to any Gantt element](#tooltipsfordifferentelements) via the corresponding API. 



Activation
---------------

To activate tooltips for tasks, enable the **tooltip** plugin using the [gantt.plugins](api/gantt_plugins.md) method:

~~~js
<script>
	gantt.plugins({ /*!*/
		tooltip: true /*!*/
	}); /*!*/

	gantt.init("gantt_here");
</script>
~~~

{{sample
	02_extensions/02_tooltip.html
}}

Once the extension is activated, tooltips will be automatically displayed with the default settings.



Custom text 
----------------

By default, tooltips display 3 properties of a task:

1. The start date of a task.
2. The end date of a task.
3. The task name.

To set a custom text for tooltips, use the api/gantt_tooltip_text_template.md template:

~~~js
gantt.templates.tooltip_text = (start, end, task) => 
	`<b>Task:</b> ${task.text}<br/><b>Duration:</b> ${task.duration}`;
~~~



Tooltip API
-----------

###Tooltip object

You can access the object of tooltip as **gantt.ext.tooltips.tooltip**. This object allows manipulating the position, content and visibility of tooltip via a set of methods:

- **getNode()** - returns the HTML element of the tooltip  
- **setViewport()** - locks the position of tooltip to the boundaries of the specified HTML element
	- **node** - (*HTMLElement*) the HTML element under the question
- **show()** - displays the tooltip at specific coordinates (relative to document.body). The method can take different parameters, depending on the position your want show tooltip at:
	- To display tooltip at specific coordinates (relative to document.body), pass: 
    	- **left** - (*number*) the X coordinate
    	- **top** - (*number*) the Y coordinate 
	- To display tooltip at the mouse event coordinates (*tooltip_offset_x/y* and viewport will be taken into account), pass:
		- **event** - (*Event*) the mouse event object  
- **hide()** - hides the tooltip element
- **setContent()**- puts HTML content into the tooltip. Takes as a parameter:
	- **html** - (*string*) a string with HTML content for the tooltip



###Methods

There are several methods that allow controlling behavior of the tooltip while hovering over DOM elements.

<h4 id="attach">gantt.ext.tooltips.attach()</h4>

adds tooltip with extended configuration. The method takes an object with tooltip settings as a parameter. The settings that can be adjusted via the method are the following:

- **selector** - (*string*) defines CSS-selector for the elements to listen to mouse events on
- **onmouseenter** - (*function*) a handler called when the mouse pointer enters the element. The parameters are:
 	- **event** - (*Event*) a native mouse event
    - **node** -  (*HTMLElement*) the HTML node
- **onmousemove** - (*function*) a handler called when the mouse pointer moves inside the element. The parameters are:
    - **event** - (*Event*) a native mouse event
    - **node** -  (*HTMLElement*) the HTML node
- **onmouseleave** - (*function*) a handler called when the mouse pointer leaves the element. The parameters are:	
	- **event** - (*Event*) a native mouse event
    - **node** -  (*HTMLElement*) the HTML node
- **global** - (*boolean*) defines whether the module listens to mouse events on the whole page (*true*) or only inside a gantt element (*false*). By default the option is set to *false*.

<h4 id="tooltipfor">gantt.ext.tooltips.tooltipFor()</h4>

adds a tooltip for the specified Gantt element. It is a more simplified version of the **attach()** method. The method takes as a parameter *an object with tooltip details*. This object has the following properties:

- **selector** - (*string*) a CSS-selector of the Gantt element to add a tooltip to
- **html** - (*function*) a template for the tooltip. The template function takes two parameters in its turn:
	- **event** - (*Event*) a native mouse event
    - **node** -  (*HTMLElement*) the HTML node
	and returns a string with a template.
- **global** - (*boolean*) optional, defines whether the module listens to mouse events on the whole page (*true*) or only inside a gantt element (*false*). By default the option is set to *false*. 

<h4 id="detach">gantt.ext.tooltips.detach()</h4> 

removes tooltip. As a parameter the method takes:

- **selector** - (*string*) the CSS selector of a Gantt element



Tooltips for different elements
-------------------------

By default, tooltips are added just to the Gantt tasks, but you can also set tooltips for any other Gantt element. For example, for a resource marker:

![Resource marker tooltip](desktop/resource_marker_tooltip.png)


There are two corresponding methods in the [tooltip API](#tooltipapi) for this purpose:

- the [**gantt.ext.tooltips.tooltipFor()**](#tooltipfor) method 

For example, this is how you can add tooltips for cells of the timeline scale:

~~~js
const domHelper = gantt.utils.dom;
const pos = domHelper .getRelativeEventPosition(event, gantt.$task_scale);
return gantt.templates.task_date(gantt.dateFromPos(pos.x));
~~~

Note, the [gantt.ext.tooltips.tooltipFor()](#tooltipfor) method must be called after the Gantt initialization is complete. For instance, you can specify the method inside the [onGanttReady](api/gantt_onganttready_event.md) event handler like this:

~~~js
gantt.attachEvent("onGanttReady", () => {
	const tooltips = gantt.ext.tooltips;

	tooltips.tooltipFor({
		selector: ".gantt_task_link",
		html: (event, node) => {
			// ...
		}
	});

	gantt.init("gantt_here");
});
~~~

{{sample 02_extensions/22_tooltip_api.html}}

Or you can use the way as in:

~~~js
gantt.init("gantt_here");
gantt.parse(tasks);

gantt.ext.tooltips.tooltipFor({
	selector: ".gantt_task_cell",
	html: (event, domElement) => {
		const id = event.target.parentNode.getAttribute("task_id");
		const task = gantt.getTask(id);
		return task.text;
	}
});
~~~

{{editor	https://snippet.dhtmlx.com/6kb5gm39	Gantt. Custom tooltips for cells}}

A tooltip added in this way will follow the mouse pointer and use the settings *api/gantt_tooltip_offset_x_config.md*, *api/gantt_tooltip_offset_y_config.md*, *api/gantt_tooltip_timeout_config.md*,
api/gantt_tooltip_hide_timeout_config.md.

- the [**gantt.ext.tooltips.attach()**](#attach) method 

This method allows adding a tooltip with an extended configuration to adjust tooltip behavior to the movement of the mouse pointer.



Customization of tooltip behavior
------------------------------

There is a possibility to modify the default behavior of tooltip. It can be achieved by removing the default tooltip handler and adding a custom one:

- Remove the built-in tooltip handler from tasks with the [**gantt.ext.tooltips.detach**](#detach) method:

~~~js
// remove the built-in tooltip handler from tasks
gantt.ext.tooltips.detach(`[${gantt.config.task_attribute}]:not(.gantt_task_row)`);
~~~

- Add the desired tooltip behavior via the [**gantt.ext.tooltips.attach()**](#attach) method. In the example below tooltip is shown only above the table:

~~~js
gantt.ext.tooltips.tooltipFor({
	selector: `.gantt_grid [${gantt.config.task_attribute}]`,
	html: (event) => {
		if (gantt.config.touch && !gantt.config.touch_tooltip) {
			return;
		}

		const targetTaskId = gantt.locate(event);
		if (gantt.isTaskExists(targetTaskId)) {
			const task = gantt.getTask(targetTaskId);
			return gantt.templates.tooltip_text(task.start_date, task.end_date, task);
		}

		return null;
	},
	global: false
});
~~~



Timeout
------------------

You can configure the time of tooltips showing and hiding via the related settings.

To specify the time period in milliseconds before a tooltip for a task will appear, use the api/gantt_tooltip_timeout_config.md:

~~~js
gantt.config.tooltip_timeout = 50;
gantt.init("gantt_here");
~~~


To define how long (in milliseconds) a tooltip will be shown after the user moves the cursor to another position, use the api/gantt_tooltip_hide_timeout_config.md property:

~~~js
gantt.config.tooltip_hide_timeout = 5000;
gantt.init("gantt_here");
~~~



Position
----------

The position of a tooltip can be configured by changing offsets of its default position via the two configuration properties:

- api/gantt_tooltip_offset_x_config.md - sets the horizontal offset of the tooltip position
- api/gantt_tooltip_offset_y_config.md - sets the vertical offset of the tooltip position

~~~js
gantt.config.tooltip_offset_x = 30;
gantt.config.tooltip_offset_y = 40;
 
gantt.init("gantt_here");
~~~



Displaying area
-------------

Before version 6.1 tooltips have been displayed only inside the timeline area. After v6.1 release tooltips displaying isn't limited, and a tooltip follows the movement of the mouse pointer.

If necessary, you can restore the previous behavior by using the code below before initialization of Gantt:

~~~js
gantt.attachEvent("onGanttReady", () => {
	const tooltips = gantt.ext.tooltips;
	tooltips.tooltip.setViewport(gantt.$task_data);
});

gantt.init("gantt_here");
gantt.parse(demo_tasks);
~~~

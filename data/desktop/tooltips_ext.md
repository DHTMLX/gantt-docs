Tooltips Extension
======================

Read details about the Tooltips extension in the article desktop/tooltips.md.

##Tooltip object

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

##Methods

There are several methods that allow controlling behavior of the tooltip while hovering over DOM elements.

###gantt.ext.tooltips.attach()

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

###gantt.ext.tooltips.tooltipFor()

adds a tooltip for the specified Gantt element. It is a more simplified version of the **attach()** method. The method takes as a parameter *an object with tooltip details*. This object has the following properties:

- **selector** - (*string*) a CSS-selector of the Gantt element to add a tooltip to
- **html** - (*function*) a template for the tooltip. The template function takes two parameters in its turn:
	- **event** - (*Event*) a native mouse event
    - **node** -  (*HTMLElement*) the HTML node
	and returns a string with a template.
- **global** - (*boolean*) optional, defines whether the module listens to mouse events on the whole page (*true*) or only inside a gantt element (*false*). By default the option is set to *false*. 

###gantt.ext.tooltips.detach()

removes tooltip. As a parameter the method takes:

- **selector** - (*string*) the CSS selector of a Gantt element
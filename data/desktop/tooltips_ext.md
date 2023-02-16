Tooltips Extension
======================

Read details about the Tooltips extension in the article desktop/tooltips.md.

##Tooltip object

You can access the object of tooltip as **gantt.ext.tooltips.tooltip**. This object allows manipulating the position, content and visibility of tooltip via a set of methods:

- <span class=submethod>**getNode (): HTMLElement**</span> - returns the HTML element of the tooltip  
- <span class=submethod>**setViewport (node): object**</span> - locks the position of tooltip to the boundaries of the specified HTML element
    - **_node_** - (*HTMLElement*) - the HTML element under the question
- <span class=submethod>**show (config, top): object**</span> - displays the tooltip at specific coordinates (relative to document.body). The method can take different parameters, depending on the position your want show tooltip at. To display tooltip at specific coordinates (relative to document.body), pass x,y coordinates. To display tooltip at the mouse event coordinates pass the Event object. The *tooltip_offset_x/y* and viewport will be taken into account.
    - **_config?_** - (*number | Event*) - the X coordinate or the mouse event object
    - **_top?_** - (*number*) - the Y coordinate 
- <span class=submethod>**hide (): object**</span> - hides the tooltip element
- <span class=submethod>**setContent (html): object**</span> - puts HTML content into the tooltip. Takes as a parameter:
    - **_html_** - (*string*) - a string with HTML content for the tooltip

##Methods

There are several methods that allow controlling behavior of the tooltip while hovering over DOM elements.

###gantt.ext.tooltips.attach()

- <span class=submethod>**attach (config): undefined**</span> - adds tooltip with extended configuration. The method takes an object with tooltip settings as a parameter. The settings that can be adjusted via the method are the following:
    - **_config_** - (*object*) - an object with the tooltip settings.
        - **_selector_** - (*string*) - defines CSS-selector for the elements to listen to mouse events on
        - **_onmouseenter_** - (*Function*) - a handler called when the mouse pointer enters the element. The parameters are:
            - **_event_** - (*Event*) - a native mouse event
            - **_node_** -  (*HTMLElement*) - the HTML node
        - **_onmousemove?_** - (*Function*) - a handler called when the mouse pointer moves inside the element. The parameters are:
            - **_event_** - (*Event*) - a native mouse event
            - **_node_** -  (*HTMLElement*) - the HTML node
        - **_onmouseleave_** - (*Function*) - a handler called when the mouse pointer leaves the element. The parameters are:	
            - **_event_** - (*Event*) - a native mouse event
            - **_node_** -  (*HTMLElement*) - the HTML node
        - **_global?_** - (*boolean*) - defines whether the module listens to mouse events on the whole page (*true*) or only inside a gantt element (*false*). By default the option is set to *false*.

###gantt.ext.tooltips.tooltipFor()

- <span class=submethod>**tooltipFor (config): undefined**</span> - adds a tooltip for the specified Gantt element. It is a more simplified version of the **attach()** method. The method takes as a parameter *an object with tooltip details*. This object has the following properties:
    - **_config_** - (*object*) - an object with the tooltip settings.
        - **_selector_** - (*string*) - a CSS-selector of the Gantt element to add a tooltip to
        - **_html_** - (*Function*) - a template for the tooltip. The template function takes two parameters in its turn:
            - **_event_** - (*Event*) - a native mouse event
            - **_node_** -  (*HTMLElement*) - the HTML node and returns a string with a template.
        - **_global?_** - (*boolean*) - optional, defines whether the module listens to mouse events on the whole page (*true*) or only inside a gantt element (*false*). By default the option is set to *false*. 

###gantt.ext.tooltips.detach()

- <span class=submethod>**detach (selector): undefined**</span> - removes tooltip. As a parameter the method takes:

	- **_selector_** - (*string*) - the CSS selector of a Gantt element
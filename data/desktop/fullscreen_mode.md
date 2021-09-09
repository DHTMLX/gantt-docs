Full Screen Mode
================

Starting from the version 3.3, the library includes the **fullscreen** extension. 

This extension provides an API that expands the component to the fullscreen mode, by using FullScreen API whenever possible
([the list of supported browsers](https://developer.mozilla.org/en-US/docs/Web/API/Fullscreen_API)).

<div style="text-align:center;"><img src="desktop/full_screen.png"></div>

For older browsers it simply allows extending Gantt to 100% of window size.

To activate the fullscreen support, enable the **fullscreen** plugin via the [gantt.plugins](api/gantt_plugins.md) method:

~~~js
gantt.plugins({
	fullscreen: true
});
~~~

The component itself doesn't have a UI control that toggles this mode, you need to add it somewhere to your page or copy the one from example:

~~~js
<input id="fullscreen_button" type="button" value="Toggle Fullscreen"/>

<script>
var button = document.getElementById("fullscreen_button");
 	button.addEventListener("click", function(){
  		if (!gantt.getState().fullscreen) {
        	// expanding the gantt to full screen
   			gantt.expand();
  		}
  		else {
        	// collapsing the gantt to the normal mode
   			gantt.collapse();
  		}
 	}, false);
</script>
~~~

A click on the ready icon will change the gantt's size from original to 'full screen' and vice versa.

{{sample
	02_extensions/11_full_screen.html
}}

API overview
---------------
There are two methods that are used to manipulate the gantt's display mode:

- api/gantt_expand.md - expands gantt to the full screen mode

~~~js
gantt.expand();
~~~

- api/gantt_collapse.md - collapses gantt from the full screen mode to the normal mode

~~~js
gantt.collapse();
~~~

The list of events
-------------------

The supported events are enumerated below:

- api/gantt_onbeforeexpand_event.md
- api/gantt_onbeforecollapse_event.md
- api/gantt_onexpand_event.md
- api/gantt_oncollapse_event.md

~~~js
// before gantt is expanded to full screen
gantt.attachEvent("onBeforeExpand",function(){
    // any custom logic here    
    return true;
});

// before gantt exits the fullscreen mode
gantt.attachEvent("onBeforeCollapse",function(){
    // any custom logic here    
    return true;
});

// when gantt is expended to full screen
gantt.attachEvent("onExpand", function (){
    // any custom logic here
});

// when gantt exited the full screen mode
gantt.attachEvent("onCollapse", function (){
    // any custom logic here
});
~~~

Fullscreen API
------------------

There are four methods of the [fullscreen](desktop/fullscreen_ext.md) object that are used to manipulate the gantt's display mode together with additional elements:

- **expand()** - expands gantt to the full screen mode

~~~js
gantt.ext.fullscreen.expand();
~~~

- **collapse()** - collapses gantt from the fullscreen mode to the normal mode

~~~js
gantt.ext.fullscreen.collapse();
~~~

- **toggle()** -  calls the **collapse()** method if gantt is expanded to full screen, and the **expand()** method otherwise

~~~js
gantt.ext.fullscreen.toggle();
~~~

- **getFullscreenElement()** - returns a DOM element that will be expanded to full screen by the **expand()** method. 

~~~js
gantt.ext.fullscreen.getFullscreenElement();
~~~

By default the **getFullscreenElement()** method returns an HTML container of the Gantt chart. You can redefine this method [to extend the gannt with additional elements to the fullscreen mode](desktop/fullscreen_mode.md#ganttwiththeheadertoolbarinthefullscreen).

Gantt with the header/toolbar in the Fullscreen
--------------------------------------------------

Gantt API provides a possibility to extend the gantt to the fullscreen mode via the **getFullscreenElement()** method of the *fullscreen* object:

~~~js
gantt.ext.fullscreen.getFullscreenElement();
~~~

{{note By default this method returns an HTML container of the Gantt chart. It means that only Gantt will be expanded to full screen.}}

In case you want to display the gantt with additional elements (such as a header or toolbar) in the full screen, you need to add a custom container on the page, as in:

~~~html
<div id="myCover">
	<div class="gantt_control">
		<button id="toggle_fullscreen" 
				onclick="gantt.ext.fullscreen.toggle();">toggle fullscreen</button>
	</div>
		<div id="gantt_here"></div>
</div>
~~~


After that you have to redefine the **getFullscreenElement()** method to return a custom root node that will be expanded to full screen:

~~~js
gantt.ext.fullscreen.getFullscreenElement = function() {
	return document.getElementById("myCover");
}
gantt.init("gantt_here");
~~~

{{sample 02_extensions/26_full_screen_with_additional_elements.html}}



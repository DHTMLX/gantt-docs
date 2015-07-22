Full Screen Mode
================

Starting from the version 3.3, the library includes the **ext/dhtmlxgantt_fullscreen.js** extension. 

This extension provides an API that expands the component to the fullscreen mode, by using FullScreen API whenever possible
([the list of supported browsers](https://developer.mozilla.org/en-US/docs/Web/Guide/API/DOM/Using_full_screen_mode#Browser_compatibility)).

<div style="text-align:center;"><img src="desktop/full_screen.png"></div>

For older browsers it simply allows extending Gantt to 100% of window size.

To enable fullscreen support, include the *dhtmlxgantt_fullscreen.js* extension on the page:

~~~html
<script src="../codebase/ext/dhtmlxgantt_fullscreen.js"></script>
~~~

The component itself doesn’t have a UI control that toggles this mode, you need to add it somewhere to your page or copy the one from example:

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


Full Screen Mode
================

Starting from the version 3.3, the library includes the **ext/dhtmlxgantt_fullscreen.js** extension. 

This extension provides an API that expands the component to the fullscreen mode, by using FullScreen API whenever possible
([the list of supported browsers](https://developer.mozilla.org/en-US/docs/Web/Guide/API/DOM/Using_full_screen_mode#Browser_compatibility)).
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
        	// expanding the gantt to fullscreen
   			gantt.expand();
  		}
  		else {
        	// collapsing the gantt
   			gantt.collapse();
  		}
 	}, false);
</script>
~~~

A click on the ready icon will change the gantt's size from original to 'full screen' and vice versa.

{{sample
	02_extensions/11_full_screen.html
}}
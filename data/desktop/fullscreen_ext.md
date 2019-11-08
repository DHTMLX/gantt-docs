Fullscreen Extension
========================

Read details about the Fullscreen extension in the desktop/fullscreen_mode.md#fullscreenapi article. <br> The *fullscreen* object possesses the following API:

##Methods

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

By default the **getFullscreenElement()** method returns an HTML container of the Gantt chart.
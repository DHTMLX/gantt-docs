---
title: "Fullscreen Extension"
sidebar_label: "Fullscreen Extension"
---

# Fullscreen Extension


Read details about the Fullscreen extension in the [Full Screen Mode](guides/fullscreen-mode.md#fullscreen-api) article. 

 The *fullscreen* object possesses the following API:

## Methods

- <span class="submethod">**expand (): void**</span> - expands gantt to the full screen mode

~~~js
gantt.ext.fullscreen.expand();
~~~

- <span class="submethod">**collapse (): void**</span> - collapses gantt from the fullscreen mode to the normal mode

~~~js
gantt.ext.fullscreen.collapse();
~~~

- <span class="submethod">**toggle (): void**</span> -  calls the **collapse()** method if gantt is expanded to full screen, and the **expand()** method otherwise

~~~js
gantt.ext.fullscreen.toggle();
~~~

- <span class="submethod">**getFullscreenElement (): HTMLElement**</span> - returns a DOM element that will be expanded to full screen by the **expand()** method. 

~~~js
gantt.ext.fullscreen.getFullscreenElement();
~~~

By default the **getFullscreenElement()** method returns an HTML container of the Gantt chart.

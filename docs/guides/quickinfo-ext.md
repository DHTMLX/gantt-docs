---
title: "quickInfo Extension"
sidebar_label: "quickInfo Extension"
---

quickInfo Extension
=======================

Read details about the quickInfo extension in the [Quick Info (Touch Support)](guides/quick-info.md) article.


The *quickInfo* object possesses the following API:

Methods
----------------

- <span class="submethod">**show (id): void**</span> - displays the quick info popup for a specified element
    - **_id_** - (*number | string*) - the task ID
 
~~~js
gantt.ext.quickInfo.show("1");
~~~

- <span class="submethod">**show (x, y): void**</span>  - displays the quick info popup at specific coordinates
    - **_x_** - (*number | string*) - horizontal coordinate
    - **_y_** - (*number | string*) - vertical coordinate

~~~js
gantt.ext.quickInfo.show(10,30);
~~~

- <span class="submethod">**hide (force): HTMLElement**</span> - hides the quick info popup. When **gantt.config.quick_info_detached** is set to *false*, the quick info will not disappear immediately, but after a short animation. Providing *true* value as an argument will cancel the animation and will remove the popup immediately.
    - **_force?_** - (*boolean*) - defines whether the quick info popup will be hidden immediately without animation


~~~js
gantt.config.quick_info_detached = false;
gantt.init("gantt_here");
 
// hide the popup after a short animation
gantt.ext.quickInfo.hide();
 
// hide the popup immediately
gantt.ext.quickInfo.hide(true);
~~~

- <span class="submethod">**setContainer (container): void**</span> - sets a container where the quick info will be displayed. If no custom container specified, QuickInfo will be placed into the first of the found nodes: **gantt.$task, gantt.$grid, gantt.$root**
    - **_container_** - (*HTMLElement | string*) - container element or its ID

~~~js
gantt.ext.quickInfo.setContainer(document.body);
gantt.ext.quickInfo.show(1300,100);

~~~

- <span class="submethod">**getNode (): HTMLElement | null**</span> - returns the HTMLElement of the quick info popup. Returns *null* if the quick info is not initialized

~~~js
const node = gantt.ext.quickInfo.getNode();
~~~

The returned DOM element of the shown quick info looks like:

![quick_node](/img/quick_node.png)

- <span class="submethod">**setContent (config): void**</span> - puts the content into the quick info
    - **_config?_** - (*object*) - optional, the configuration object of a quick info which can include the following attributes:
        - **_taskId?_** - (*string | number*) - optional, the id of the task to which the action buttons of the quick info will be connected
        - **_header?_** - (*object*) - optional, the header of the pop-up edit form which may include:
            - **_title?_** - (*string*) - optional, the title of the pop-up edit form
            - **_date?_** - (*string*) - optional, the date of the pop-up edit form
        - **_content?_** - (*string*) - optional, the content of the pop-up edit form
        - **_buttons?_** - (*string[]*) - optional, buttons to be placed in the pop-up edit form
  


If neither header nor buttons are specified, the related areas of the quick info popup will be hidden.

Here is what the configuration object of the **setContent** method can look like:

~~~js
const quickInfo = gantt.ext.quickInfo;
var task = gantt.getTask(10);
quickInfo.show(task.id);
quickInfo.setContent({
    taskId: task.id,
    header: {
        title: gantt.templates.quick_info_title(task.start_date, task.end_date, task),
        date: gantt.templates.quick_info_date(task.start_date, task.end_date, task)
    },
    content: gantt.templates.quick_info_content(task.start_date, task.end_date, task),
    buttons: gantt.config.quickinfo_buttons
});
~~~

or

You can create a custom pop-up without a header and buttons:

~~~js
const quickInfo = gantt.ext.quickInfo;
quickInfo.show(100, 100);
quickInfo.setContent({
    content: "my custom html",
    buttons: []
});
~~~

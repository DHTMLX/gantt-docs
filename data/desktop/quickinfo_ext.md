quickInfo Extension
=======================

Read details about the quickInfo extension in the desktop/quick_info.md article.<br>
The *quickInfo* object possesses the following API:

Methods
----------------

- **show(id)** - displays the quick info popup for a specified element
 
~~~js
gantt.ext.quickInfo.show("1");
~~~

- **show(x,y)**  - displays the quick info popup at specific coordinates

~~~js
gantt.ext.quickInfo.show(10,30);
~~~

- **hide([force: boolean])** - hides the quick info popup. When **gantt.config.quick_info_detached** is set to *false*, the quick info will not disappear immediately, but after a short animation. Providing *true* value as an argument will cancel the animation and will remove the popup immediately.

~~~js
gantt.config.quick_info_detached = false;
gantt.init("gantt_here");
 
// hide the popup after a short animation
gantt.ext.quickInfo.hide();
 
// hide the popup immediately
gantt.ext.quickInfo.hide(true);
~~~

- **setContainer(container)** - sets a container where the quick info will be displayed. If no custom container specified, QuickInfo will be placed into the first of the found nodes: **gantt.$task, gantt.$grid, gantt.$layout**

~~~js
gantt.ext.quickInfo.setContainer(document.body);
gantt.ext.quickInfo.show(1300,100);

~~~

- **getNode()** - returns the HTMLElement of the quick info popup. Returns *null* if the quick info is not initialized

~~~js
const node = gantt.ext.quickInfo.getNode();
~~~

The returned DOM element of the shown quick info looks like:

<img src="desktop/quick_node.png">

- **setContent(config)** - (*object*) puts the content into the quick info. It takes a configuration object of a quick info as a parameter. <br>
The configuration object has the following structure:
    - **taskId** - (*string|number*) optional, the id of the task to which the action buttons of the quick info will be connected
    - **header** - optional, the header of the pop-up edit form which may include:
        - **title** - (*string*) optional, the title of the pop-up edit form
        - **date** - (*string*) optional, the date of the pop-up edit form
    - **content** - (*string*) optional, the content of the pop-up edit form
    - **buttons** - (*string[]*) optional, buttons to be placed in the pop-up edit form<br>
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
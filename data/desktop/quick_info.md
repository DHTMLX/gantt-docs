Quick Info (Touch Support)
==============================

The library includes the **ext/dhtmlxgantt_quick_info.js** extension that allows displaying a popup with details about the task when a user touches the task on the screen. 

{{note This functionality requires [Touch Support](api/gantt_touch_config.md) to be enabled.}}


<img src="desktop/quick_info.png">


To start using the extension, include the ["Quick Info"](desktop/extensions_list.md#quickinfo) file on the page.

~~~js
<script src="../codebase/ext/dhtmlxgantt_quick_info.js"></script>
~~~

API overview
----------------

The Quick Info extension provides a set of API that allows you to manipulate the settings of Quick Info, to control its behavior or modify the appearance of a popup:

**Methods**

- api/gantt_showquickinfo.md - displays the pop-up task form for the specified task
- api/gantt_hidequickinfo.md - hides the pop-up task form (if it's currently active)

**Events**

- api/gantt_onquickinfo_event.md - fires when the pop-up edit form appears
- api/gantt_onafterquickinfo_event.md - fires after the pop-up edit form is closed

**Properties**

- api/gantt_quick_info_detached_config.md - defines whether the task form will appear from the left/right side of the screen or near the selected task
- api/gantt_quickinfo_buttons_config.md - stores a collection of buttons resided in the pop-up task's details form

**Templates**

- api/gantt_quick_info_class_template.md - specifies the CSS class that will be applied to the pop-up edit form
- api/gantt_quick_info_content_template.md - specifies the content of the pop-up edit form
- api/gantt_quick_info_date_template.md - specifies the date of the pop-up edit form
- api/gantt_quick_info_title_template.md - specifies the title of the pop-up edit form

QuickInfo object
----------------------

The default behavior of the **ext/dhtmlxgantt_quick_info.js** extension implies that the popup will appear over a selected task automatically.

Starting from v7.0, the functionality of the Quick Info is extended; the [gantt.ext.quickInfo]() object, that provides methods for control of the popup manually, is added. 

The methods available via the **gantt.ext.quickInfo** object are:

- **show()** - displays the quick info popup for a specified task. It takes one parameter:
    - **id** - (*string|number*) the if of a task/link/resource
- **show()**  - displays the quick info popup at specific coordinates. The parameters are:
    - **top** - (*number*) the X coordinate
    - **left** - (*number*) the Y coordinate
- **hide([force: boolean])** - hides the quick info popup. When **gantt.config.quick_info_detached** is set to *false*, the quick info will not disappear immediately, but after a short animation.
Providing *true* will cancel the animation and will remove the popup immediately.
- **setContainer**() - sets a container where the quick info will be displayed. 
    - **container** - (*string|HTMLElement*) a QuickInfo container. If no custom container specified, QuickInfo will be placed into the first found node of these ones: **gantt.$task, gantt.$grid, gantt.$layout**
- **getNode()** - return the HTMLElement of the quick info popup. Returns *null* if the quick info is not initialized
- **setContent(config)** - (*object*) puts the content into the quick info. It takes a configuration object of a quick info as a parameter. <br>
The configuration object has the following structure:
    - **taskId** - (*string|number*) optional, the id of the task to which the action buttons of the quick info will be connected
    - **header** - optional, the header of the pop-up edit form which may include:
        - **title** - (*string*) optional, the title of the pop-up edit form
        - **date** - (*string*) optional, the date of the pop-up edit form
    - **content** - (*string*) optional, the content of the pop-up edit form
    - **buttons** - (*string[]*) optional, buttons to be placed in the pop-up edit form<br>
If neither header nor buttons are specified, the related areas of the quick info popup will be hidden.

####**Showing/Hiding Quick Info**

You can show the popup for a specified task, link, resource panel or define another position on the screen where the popup will be displayed via the **gantt.ext.quickInfo.show()** method:

~~~js
// show the popup for the specified task
var task = gantt.getTask(10);
gantt.ext.quickInfo.show(task.id);

// show the popup for the specified link
var link = gantt.getLink(10);
gantt.ext.quickInfo.show(link.id);

// show the popup for the resource


// show the popup at specific coordinates
gantt.ext.quickInfo.show(100, 200);
~~~

To hide a pop-up edit form, make use of the **gantt.ext.quickInfo.hide()** method:

~~~js
gantt.config.quick_info_detached = false;
gantt.init("gantt_here");

// hide the popup after a short animation
gantt.ext.quickInfo.hide();

or

// hide the popup immediately
gantt.ext.quickInfo.hide(true);
~~~

####**Setting a container for QuickInfo** 

You can use the **gantt.ext.quickInfo.setContainer()** method to make the quick info popup to be displayed in a custom container:

~~~js
const quickInfo = gantt.ext.quickInfo;
quickInfo.setContainer(document.body); /*!*/
var task = gantt.getTask(10);
gantt.ext.quickInfo.show(task.id);
~~~

####**Specifying Quick Info content**

- setContent(config: object) - fills the quick info popup.
    - config object has the following structure:

~~~js
{
      	taskId: string|number
	header: {
		title: string,
		date: string
	},
	content: string,
	buttons: string[]
}
~~~


http://prntscr.com/qxdtgv

All properties are optional. If no header or buttons are specified, the related areas of the quick info popup will be hidden.

If the taskId is specified, the specified task will be connected to the action buttons in the popup http://prntscr.com/qxdsds

Пример

~~~js
const quickInfo = gantt.ext.quickInfo;
quickInfo.show(100, 100);
quickInfo.setContent({
	header: {
		title: gantt.templates.quick_info_title(task.start_date, task.end_date, task),
		date: gantt.templates.quick_info_date(task.start_date, task.end_date, task)
	},
	content: gantt.templates.quick_info_content(task.start_date, task.end_date, task),
	buttons: gantt.config.quickinfo_buttons
});
~~~

Or

~~~js
const quickInfo = gantt.ext.quickInfo;
quickInfo.show(100, 100);
quickInfo.setContent({
	content: "my custom html"
});
~~~

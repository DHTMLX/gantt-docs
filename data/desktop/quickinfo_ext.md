quickInfo Extension
=======================

Read details about the quickInfo extension in the desktop/quick_info.md article.<br>
The *quickInfo* object possesses the following API:

Methods
----------------

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
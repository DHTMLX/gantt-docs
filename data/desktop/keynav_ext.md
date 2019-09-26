Keyboard Navigation Extension
==========================

Read details about the Keyboard navigation extension in the article desktop/keyboard_navigation.md. <br>
The *keyboardNavigation* object possesses the following API:

Methods
----------

- **focus()** - allows selecting any cell in the grid. Works only if the Grid already has the focus

~~~js
gantt.ext.keyboardNavigation.focus({type:"taskCell",id:"taskId",column:"columnName"});
~~~

{{editor 	https://snippet.dhtmlx.com/689d096b7		Selecting a grid cell}}

- **getActiveNode()** - allows obtaining information about the active cell

~~~js
var active_node = gantt.ext.keyboardNavigation.getActiveNode();
// -> {type: "taskCell", id: "10", column: "text"}
~~~

{{editor	https://snippet.dhtmlx.com/a889c6e9c		Getting the active cell}}

@todo: check and improve